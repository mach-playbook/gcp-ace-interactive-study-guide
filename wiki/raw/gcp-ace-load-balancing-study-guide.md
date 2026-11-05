# Guía de Estudio y Referencia de Comandos: Implementing Cloud Load Balancing for Compute Engine

Esta guía de estudio proporciona el marco conceptual, la arquitectura detallada y el catálogo completo de comandos para el curso de Google Skills **Implementing Cloud Load Balancing for Compute Engine** (Course Template ID: 648). El contenido está diseñado para integrarse directamente en el repositorio interactivo de preparación para la certificación Google Cloud Associate Cloud Engineer (ACE).

---

## 1. Visión General del Curso y Arquitectura de Cloud Load Balancing

Google Cloud Load Balancing permite distribuir el tráfico entrante entre múltiples instancias de máquinas virtuales (VM) en Compute Engine para garantizar alta disponibilidad, tolerancia a fallos y autoescalado dinámico. La plataforma opera mediante una dirección IP única global (Anycast IP) o regional, redirigiendo las peticiones únicamente hacia instancias que respondan positivamente a las verificaciones de estado (Health Checks).

Para determinar la solución de balanceo adecuada según los requerimientos del sistema o las preguntas del examen ACE, es fundamental clasificar los balanceadores en función de tres ejes principales: la capa del modelo OSI (Capa 4 Transport vs. Capa 7 Application), el alcance geográfico (Global vs. Regional) y el origen del tráfico (External vs. Internal).

### 1.1 Matriz de Clasificación de Balanceadores en Google Cloud

La siguiente tabla resume las diferencias operativas y arquitectónicas de las opciones de balanceo de carga en Compute Engine:

| Tipo de Balanceador | Capa OSI | Alcance | Esquema de Tráfico | Arquitectura | Casos de Uso Principales |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **External Application Load Balancer** | Capa 7 (HTTP/HTTPS) | Global o Regional | Exterior a Interior | Proxy basado en Envoy / Google Front End (GFE) | Aplicaciones web, APIs REST, microservicios con enrutamiento por URL, integración con Cloud CDN y Cloud Armor. |
| **Internal Application Load Balancer** | Capa 7 (HTTP/HTTPS) | Regional | Interior (VPC a VPC) | Proxy regional (requiere subnet Proxy-Only) | Arquitecturas de microservicios internos, comunicación privada entre capas web y de backend sin IP pública. |
| **External Passthrough Network Load Balancer** | Capa 4 (TCP/UDP) | Regional | Exterior a Interior | Passthrough directo (Maglev) sin terminación de proxy | Tráfico TCP/UDP no HTTP, protocolos personalizados, preservación de la IP origen del cliente. |
| **Internal Passthrough Network Load Balancer** | Capa 4 (TCP/UDP) | Regional | Interior (VPC privada) | Passthrough basado en enrutamiento virtual de VPC | Base de datos interna, balanceo de capas intermedias TCP con rendimiento de velocidad de línea. |

> **Regla de Examen ACE**: Los balanceadores de Capa 7 (HTTP/HTTPS) funcionan como proxies (terminan la conexión TCP del cliente y abren una nueva hacia el backend), mientras que los balanceadores de Capa 4 Passthrough inspeccionan únicamente los encabezados de transporte y entregan los paquetes directamente a la VM backend conservando la dirección IP fuente original.

---

## 2. Lab 1: Configure a Passthrough Network Load Balancer

El primer laboratorio práctico del curso se enfoca en la implementación de un balanceador de carga de red passthrough externo de Capa 4 (Network Load Balancer). Este balanceador distribuye tráfico TCP/UDP entre un conjunto de máquinas virtuales dentro de la misma región.

### 2.1 Conceptos Clave del Laboratorio
* **Target Pools**: Grupo de instancias de Compute Engine que reciben el tráfico balanceado de Capa 4. Solo pueden contener instancias en la misma región y zona asociada.
* **Forwarding Rules**: Reglas de reenvío que inspeccionan la IP y el puerto de destino entrante para dirigir el paquete hacia el Target Pool correspondiente.
* **Legacy HTTP Health Checks**: Verificaciones de estado regionales que monitorean la disponibilidad de las instancias en el puerto definido (por defecto HTTP 80).

### 2.2 Flujo de Comandos gcloud para el Lab 1

A continuación se detalla la secuencia ordenada de comandos de la CLI `gcloud` para configurar un Passthrough Network Load Balancer con dos instancias web:

#### Paso 1: Creación de las Instancias de Backend y Configuración del Servidor Web
```bash
# Crear dos instancias VM en la zona us-central1-a con script de inicio Apache
gcloud compute instances create www1 \
    --zone=us-central1-a \
    --tags=network-lb-tag \
    --machine-type=e2-medium \
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "Page served from www1" | tee /var/www/html/index.html'

gcloud compute instances create www2 \
    --zone=us-central1-a \
    --tags=network-lb-tag \
    --machine-type=e2-medium \
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "Page served from www2" | tee /var/www/html/index.html'
```

#### Paso 2: Configuración de Reglas de Cortafuegos
```bash
# Permitir tráfico entrante HTTP en el puerto 80 para las instancias con la etiqueta asignada
gcloud compute firewall-rules create www-firewall-network-lb \
    --network=default \
    --action=ALLOW \
    --direction=INGRESS \
    --rules=tcp:80 \
    --target-tags=network-lb-tag
```

#### Paso 3: Creación del Health Check y el Target Pool
```bash
# Crear el chequeo de estado HTTP heredado
gcloud compute http-health-checks create basic-check

# Crear el Target Pool asociado a la región us-central1 vinculado al Health Check
gcloud compute target-pools create www-pool \
    --region=us-central1 \
    --http-health-check=basic-check

# Agregar las instancias creadas al Target Pool
gcloud compute target-pools add-instances www-pool \
    --instances=www1,www2 \
    --instances-zone=us-central1-a
```

#### Paso 4: Creación de la Regla de Reenvío (Forwarding Rule) y Verificación
```bash
# Crear la regla de reenvío asignando una dirección IP pública externa
gcloud compute forwarding-rules create www-rule \
    --region=us-central1 \
    --ports=80 \
    --target-pool=www-pool

# Obtener la IP pública asignada a la regla de reenvío
gcloud compute forwarding-rules describe www-rule \
    --region=us-central1 \
    --format="json(IPAddress)"

# Probar la respuesta del balanceador ejecutando peticiones repetidas
EXTERNAL_IP=$(gcloud compute forwarding-rules describe www-rule --region=us-central1 --format="value(IPAddress)")
while true; do curl -m 1 http://$EXTERNAL_IP; sleep 1; done
```

---

## 3. Lab 2: Set Up Application Load Balancers

El segundo laboratorio trata la configuración de un balanceador de carga de aplicación global de Capa 7 (External Application Load Balancer). A diferencia del balanceador de red, el HTTP(S) Load Balancer evalúa la capa de aplicación, permitiendo enrutamiento basado en URL, terminación SSL/TLS y escalado automático mediante Grupos de Instancias Administrados (MIGs).

### 3.1 Componentes Arquitectónicos de Capa 7
1. **Instance Template**: Plantilla de configuración que define las especificaciones del hardware, imagen base y scripts de arranque para las VMs.
2. **Managed Instance Group (MIG)**: Grupo de instancias homogéneas creadas desde una plantilla que se autoescala y autorrepara mediante Health Checks.
3. **Backend Service**: Componente central que gestiona el balanceo entre los grupos de instancias de backend, configurando políticas de capacidad, sesiones persistentes y verificaciones de estado.
4. **URL Map**: Objeto de enrutamiento que define reglas basadas en rutas de URL (host/path) para enviar peticiones a distintos Backend Services.
5. **Target HTTP Proxy**: Componente que recibe la petición del cliente, la evalúa contra el URL Map y encamina el tráfico.
6. **Global Forwarding Rule**: Regla de entrada que expone una IP pública Anycast y dirige el tráfico entrante en el puerto 80/443 hacia el Target Proxy.

### 3.2 Flujo de Comandos gcloud para el Lab 2

#### Paso 1: Crear la Plantilla de Instancia y el Grupo Administrado (MIG)
```bash
# 1. Crear la plantilla de instancia con la etiqueta de servicio web
gcloud compute instance-templates create lb-backend-template \
    --region=us-central1 \
    --network=default \
    --subnet=default \
    --tags=allow-health-check \
    --machine-type=e2-medium \
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "HTTP Load Balancer Backend from $(hostname)" | tee /var/www/html/index.html'

# 2. Crear el Grupo de Instancias Administrado (MIG) zonal con 2 instancias
gcloud compute instance-groups managed create lb-backend-group \
    --template=lb-backend-template \
    --size=2 \
    --zone=us-central1-a

# 3. Configurar los puertos nombrados (named ports) en el grupo de instancias
gcloud compute instance-groups managed set-named-ports lb-backend-group \
    --named-ports=http:80 \
    --zone=us-central1-a
```

#### Paso 2: Crear la Regla de Cortafuegos para Rangos de Health Check de Google
```bash
# Los sondajes de verificación de estado de los balanceadores globales provienen de rangos IP específicos de Google
gcloud compute firewall-rules create fw-allow-health-check \
    --network=default \
    --action=ALLOW \
    --direction=INGRESS \
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \
    --target-tags=allow-health-check \
    --rules=tcp:80
```

#### Paso 3: Configurar el Health Check Global y el Backend Service
```bash
# 1. Crear el chequeo de estado de salud HTTP global
gcloud compute health-checks create http http-basic-check \
    --port=80

# 2. Crear el servicio de backend global
gcloud compute backend-services create web-backend-service \
    --protocol=HTTP \
    --port-name=http \
    --health-checks=http-basic-check \
    --global

# 3. Vincular el Grupo de Instancias Administrado como backend del Backend Service
gcloud compute backend-services add-backend web-backend-service \
    --instance-group=lb-backend-group \
    --instance-group-zone=us-central1-a \
    --balancing-mode=UTILIZATION \
    --max-utilization=0.8 \
    --global
```

#### Paso 4: Crear el URL Map, Target Proxy y la Regla de Reenvío Global
```bash
# 1. Crear el mapa de URL predeterminado asociado al backend service
gcloud compute url-maps create web-map-http \
    --default-service=web-backend-service

# 2. Crear el Target HTTP Proxy vinculado al URL Map
gcloud compute target-http-proxies create http-lb-proxy \
    --url-map=web-map-http

# 3. Crear la regla de reenvío global con IP Anycast en el puerto 80
gcloud compute forwarding-rules create http-content-rule \
    --global \
    --target-http-proxy=http-lb-proxy \
    --ports=80
```

---

## 4. Lab 3: Use an Internal Application Load Balancer

El tercer laboratorio profundiza en el **Internal Application Load Balancer (ILB)** de Capa 7. A diferencia del balanceador externo, un ILB distribuye tráfico HTTP/HTTPS dentro de una red VPC privada sin exponer las máquinas virtuales a Internet.

### 4.1 La Subred Proxy-Only (Requisito Obligatorio)
Los balanceadores de carga de aplicación internos de Google Cloud están basados en un conjunto de proxies Envoy administrados. Para operar, el ILB exige la creación de una **Proxy-Only Subnet** dedicada en la región objetivo.

> **Definición para el examen ACE**: La subred Proxy-Only almacena exclusivamente las direcciones IP privadas que los proxies de Google utilizan para conectarse a las instancias de backend. No se pueden desplegar instancias de VM de usuario dentro de una subred Proxy-Only.

### 4.2 Flujo de Comandos gcloud para el Lab 3

#### Paso 1: Configuración de la Subred Proxy-Only
```bash
# Crear la subred reservada exclusivamente para los proxies Envoy regionales en us-central1
gcloud compute networks subnets create proxy-only-subnet \
    --purpose=REGIONAL_MANAGED_PROXY \
    --role=ACTIVE \
    --region=us-central1 \
    --network=default \
    --range=10.129.0.0/23
```

#### Paso 2: Creación de las Reglas de Cortafuegos Internas
```bash
# 1. Permitir que los proxies Envoy (10.129.0.0/23) envíen tráfico a los backends en el puerto 80
gcloud compute firewall-rules create fw-allow-ilb-proxy \
    --network=default \
    --action=ALLOW \
    --direction=INGRESS \
    --source-ranges=10.129.0.0/23 \
    --target-tags=ilb-backend \
    --rules=tcp:80,tcp:443

# 2. Permitir que las verificaciones de estado de Google lleguen a los backends internos
gcloud compute firewall-rules create fw-allow-ilb-health-check \
    --network=default \
    --action=ALLOW \
    --direction=INGRESS \
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \
    --target-tags=ilb-backend \
    --rules=tcp:80
```

#### Paso 3: Creación de Backends e Instance Template
```bash
# Crear plantilla de instancias para los backends internos
gcloud compute instance-templates create ilb-backend-template \
    --region=us-central1 \
    --network=default \
    --subnet=default \
    --tags=ilb-backend \
    --machine-type=e2-medium \
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "Internal App Load Balancer Response from $(hostname)" | tee /var/www/html/index.html'

# Crear el MIG privado zonal
gcloud compute instance-groups managed create ilb-backend-group \
    --template=ilb-backend-template \
    --size=2 \
    --zone=us-central1-a

# Asignar puerto nombrado
gcloud compute instance-groups managed set-named-ports ilb-backend-group \
    --named-ports=http:80 \
    --zone=us-central1-a
```

#### Paso 4: Creación del Balanceador Interno (Regional)
```bash
# 1. Crear el chequeo de salud regional
gcloud compute health-checks create http ilb-health-check \
    --region=us-central1 \
    --port=80

# 2. Crear el Backend Service regional especificando esquema INTERNAL_MANAGED
gcloud compute backend-services create ilb-backend-service \
    --load-balancing-scheme=INTERNAL_MANAGED \
    --protocol=HTTP \
    --health-checks=ilb-health-check \
    --health-checks-region=us-central1 \
    --region=us-central1

# 3. Agregar el grupo de instancias al servicio de backend regional
gcloud compute backend-services add-backend ilb-backend-service \
    --instance-group=ilb-backend-group \
    --instance-group-zone=us-central1-a \
    --region=us-central1

# 4. Crear el URL Map regional
gcloud compute url-maps create ilb-map \
    --default-service=ilb-backend-service \
    --region=us-central1

# 5. Crear el Target HTTP Proxy regional
gcloud compute target-http-proxies create ilb-target-proxy \
    --url-map=ilb-map \
    --region=us-central1

# 6. Crear la regla de reenvío interna asignando una IP privada estática de la subred default
gcloud compute forwarding-rules create ilb-forwarding-rule \
    --load-balancing-scheme=INTERNAL_MANAGED \
    --network=default \
    --subnet=default \
    --address=10.128.0.99 \
    --ports=80 \
    --target-http-proxy=ilb-target-proxy \
    --target-http-proxy-region=us-central1 \
    --region=us-central1
```

#### Paso 5: Prueba de Acceso Privado desde una VM Cliente
```bash
# Crear VM de pruebas sin exposición pública necesaria
gcloud compute instances create client-vm \
    --zone=us-central1-a \
    --machine-type=e2-micro

# Conectarse vía SSH a la instancia cliente e interrogar la IP privada del balanceador interno
# (Reemplazar $INTERNAL_LB_IP por la IP privada asignada a la regla de reenvío)
gcloud compute ssh client-vm --zone=us-central1-a
curl http://$INTERNAL_LB_IP
```

---

## 5. Lab 4: Implement Load Balancing on Compute Engine — Challenge Lab

El Challenge Lab (Lab ID: 613025) evalúa de forma práctica la capacidad del estudiante para resolver un escenario del mundo real sin instrucciones paso a paso. Se deben aplicar las destrezas adquiridas en los laboratorios previos bajo restricciones específicas de nombres, regiones y parámetros.

### 5.1 Caso de Estudio Típico del Challenge Lab
Un cliente requiere desplegar una aplicación web tolerante a fallos en Compute Engine con las siguientes especificaciones:
1. Crear una plantilla de instancia web con un servidor web Apache configurado.
2. Configurar un Grupo de Instancias Administrado (MIG) con autoescalado basado en uso de CPU.
3. Crear una regla de cortafuegos para permitir las verificaciones de estado desde los rangos IP oficiales de Google.
4. Configurar un HTTP External Load Balancer que exponga la aplicación a través de una dirección IP pública.

### 5.2 Plantilla de Solución Paso a Paso (Workflow Completo)

```bash
# Configuración de variables del reto
export REGION="us-central1"
export ZONE="us-central1-a"
export TEMPLATE_NAME="lb-backend-template"
export MIG_NAME="lb-backend-group"
export HC_NAME="http-basic-check"
export BS_NAME="web-backend-service"
export URL_MAP_NAME="web-map-http"
export PROXY_NAME="http-lb-proxy"
export FW_NAME="fw-allow-health-check"

# 1. Crear plantilla de instancia
gcloud compute instance-templates create $TEMPLATE_NAME \
    --region=$REGION \
    --network=default \
    --subnet=default \
    --tags=allow-health-check \
    --machine-type=e2-medium \
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "Challenge Lab Completed Successfully on $(hostname)" | tee /var/www/html/index.html'

# 2. Crear el MIG y establecer autoescalado
gcloud compute instance-groups managed create $MIG_NAME \
    --template=$TEMPLATE_NAME \
    --size=2 \
    --zone=$ZONE

gcloud compute instance-groups managed set-named-ports $MIG_NAME \
    --named-ports=http:80 \
    --zone=$ZONE

gcloud compute instance-groups managed set-autoscaling $MIG_NAME \
    --max-num-replicas=5 \
    --min-num-replicas=2 \
    --target-cpu-utilization=0.8 \
    --cool-down-period=60 \
    --zone=$ZONE

# 3. Cortafuegos de Health Check
gcloud compute firewall-rules create $FW_NAME \
    --network=default \
    --action=ALLOW \
    --direction=INGRESS \
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \
    --target-tags=allow-health-check \
    --rules=tcp:80

# 4. Health Check, Backend Service y ensamblaje del Load Balancer
gcloud compute health-checks create http $HC_NAME --port=80

gcloud compute backend-services create $BS_NAME \
    --protocol=HTTP \
    --port-name=http \
    --health-checks=$HC_NAME \
    --global

gcloud compute backend-services add-backend $BS_NAME \
    --instance-group=$MIG_NAME \
    --instance-group-zone=$ZONE \
    --balancing-mode=UTILIZATION \
    --max-utilization=0.8 \
    --global

gcloud compute url-maps create $URL_MAP_NAME --default-service=$BS_NAME

gcloud compute target-http-proxies create $PROXY_NAME --url-map=$URL_MAP_NAME

gcloud compute forwarding-rules create http-content-rule \
    --global \
    --target-http-proxy=$PROXY_NAME \
    --ports=80
```

---

## 6. Cuadro Comparativo y Matriz de Decisión para el Examen ACE

En las preguntas del examen Associate Cloud Engineer, es común que se presenten escenarios hipotéticos donde se debe seleccionar la infraestructura de red o diagnosticar fallos de conectividad.

### 6.1 Matriz de Decisión de Selección de Balanceador

El siguiente esquema conceptual permite identificar la opción correcta según el enunciado del problema:

* **Tráfico Externo (Internet)**:
  * Requiere inspección HTTP/HTTPS, enrutamiento por rutas/hosts o SSL ➔ **External Application Load Balancer** (Capa 7 Global/Regional).
  * Tráfico TCP/UDP puro, protocolo propio o preservación de IP cliente ➔ **External Passthrough Network Load Balancer** (Capa 4 Regional).
* **Tráfico Interno (VPC / On-Premises)**:
  * Tráfico HTTP/HTTPS privado entre microservicios internos ➔ **Internal Application Load Balancer** (Capa 7 Regional + Subnet Proxy-Only).
  * Tráfico de base de datos TCP/UDP interno de alto rendimiento ➔ **Internal Passthrough Network Load Balancer** (Capa 4 Regional).

### 6.2 Rangos IP Oficiales de Health Check y Reglas Críticas
Para que las verificaciones de estado funcionen correctamente en los balanceadores de Google Cloud, los cortafuegos de la VPC deben permitir el tráfico entrante desde los siguientes rangos de red propiedad de Google:

* **130.211.0.0/22**: Rango de verificadores de estado de HTTP(S), SSL Proxy, TCP Proxy y balanceadores internos.
* **35.191.0.0/16**: Rango complementario de sondaje para verificaciones de estado globales y regionales.
* **209.85.152.0/22** y **209.85.204.0/22**: Rangos de sondaje para balanceadores passthrough y legacy checks.

---

## 7. Cuestionario de Repaso y Autoevaluación (Quiz)

Utiliza este cuestionario para comprobar tu nivel de preparación sobre balanceo de carga en Compute Engine antes de rendir el examen.

### Preguntas
1. ¿Cuál es la diferencia principal entre la arquitectura de un balanceador External Application Load Balancer y un External Passthrough Network Load Balancer?
2. Al configurar un Internal Application Load Balancer en una subred de VPC, intentas crearlo pero la CLI devuelve un error de subred faltante. ¿Qué recurso obligatorio olvidaste aprovisionar?
3. ¿Por qué es necesario especificar la opción `--source-ranges=130.211.0.0/22,35.191.0.0/16` en las reglas de cortafuegos de los backends de un HTTP Load Balancer?
4. ¿Qué parámetro de `gcloud` permite vincular un puerto lógico (ej. `http:80`) a un Grupo de Instancias Administrado para que el Backend Service pueda enrutar el tráfico?
5. En un Managed Instance Group (MIG), ¿cuál es la diferencia funcional entre el campo `--cool-down-period` de autoescalado y el `--initial-delay` del Health Check?
6. Quieres implementar una arquitectura web donde el tráfico a `example.com/images/*` vaya a un grupo de instancias optimizado para almacenamiento y `example.com/api/*` a un grupo compute-optimized. ¿Qué objeto del balanceador administra esta lógica?
7. Un balanceador Passthrough Network Load Balancer entrega paquetes a las VMs backend. ¿Conserva este balanceador la dirección IP origen original del cliente externo?
8. ¿Qué comando de la CLI `gcloud` se utiliza para actualizar la plantilla de un MIG existente para iniciar un despliegue sin interrupción de servicio (Rolling Update)?
9. Si un balanceador HTTP global no está dirigiendo tráfico a las instancias de un MIG a pesar de que las VMs están encendidas, ¿cuál es la causa más probable?
10. ¿Puede desplegarse una máquina virtual Compute Engine normal del usuario dentro de una subred de tipo `--purpose=REGIONAL_MANAGED_PROXY`?

---

### Clave de Respuestas (Answer Key)

1. **Respuesta**: El External Application Load Balancer actúa como un proxy de Capa 7 (termina la conexión TCP en la infraestructura de Google y abre una nueva hacia el backend), permitiendo inspección de URL y SSL. El Passthrough Network Load Balancer actúa en Capa 4 a nivel de transporte sin terminación proxy, enrutando paquetes TCP/UDP directamente a la VM.
2. **Respuesta**: Olvidaste crear una **Proxy-Only Subnet** (`--purpose=REGIONAL_MANAGED_PROXY`), que es requerida por los proxies Envoy para asignar direcciones IP internas al balanceador regional de Capa 7.
3. **Respuesta**: Porque esos dos bloques CIDR pertenecen a los sistemas automatizados de verificadores de estado (Health Check Probes) de Google Cloud. Si el cortafuegos bloquea estos rangos, las instancias se marcarán como UNHEALTHY y no recibirán tráfico.
4. **Respuesta**: El comando `gcloud compute instance-groups managed set-named-ports <GRUPO> --named-ports=http:80`.
5. **Respuesta**: El `--cool-down-period` le indica al autoescalador cuántos segundos esperar a que la aplicación inicie antes de recolectar métricas de CPU. El `--initial-delay` le indica al chequeo de autorreparación (autohealing) cuánto tiempo esperar antes de marcar una VM como fallida durante su arranque.
6. **Respuesta**: El **URL Map** (Mapa de URL), que contiene las reglas de coincidencia de host y ruta (`pathMatchers`) asociadas a diferentes Backend Services.
7. **Respuesta**: Sí. Al ser un balanceador de tipo Passthrough (sin proxy), los paquetes no sufren traducción de dirección de red (NAT) en la IP fuente, por lo que las VMs backend reciben la IP pública real del usuario.
8. **Respuesta**: `gcloud compute instance-groups managed rolling-action start-update <MIG_NAME> --version=template=<NUEVA_PLANTILLA>`.
9. **Respuesta**: Que las instancias están fallando el Health Check (estado UNHEALTHY) debido a una regla de cortafuegos faltante o a que el servidor web (ej. Apache/NGINX) no está ejecutándose en el puerto 80.
10. **Respuesta**: No. Las subredes Proxy-Only están reservadas exclusivamente para los proxies Envoy regionales administrados por Google Cloud. No se permite crear VMs de usuario en ellas.

---

## 8. Preguntas de Síntesis y Discusión Arquitectónica

Estas preguntas requieren integrar múltiples conceptos de la guía para resolver dilemas de diseño de sistemas en Google Cloud:

1. **Escenario de Alta Disponibilidad Regional vs. Global**:
   Una empresa necesita desplegar un servicio web transaccional expuesto públicamente. Tienen grupos de instancias en la región `us-central1` y en `europe-west1`. ¿Cómo debe estructurarse el balanceador de carga para que los usuarios de cada continente se dirijan automáticamente a la región más cercana con menor latencia y con conmutación por error (failover) transparente?
2. **Migración de Arquitectura Privada**:
   Una organización exige que el tráfico entre el frontend web y la capa de lógica de negocio se mantenga 100% privado en la VPC, pero requiere inspección de encabezados HTTP y reglas de enrutamiento por microservicio. Explica los componentes necesarios para construir este diseño asegurando que no exista exposición a la red pública.
3. **Optimización de Despliegues Canary en MIGs**:
   Describe la secuencia exacta de comandos `gcloud` que ejecutarías para desplegar la versión v2 de una aplicación web únicamente en el 10% de las instancias de un MIG, manteniendo el 90% restante en la versión v1.
4. **Diagnóstico de Conectividad en Balanceador Interno L7**:
   Un desarrollador reporta que la VM cliente no puede conectarse a la IP del Internal Application Load Balancer. Al revisar la consola, el Backend Service muestra las instancias como `HEALTHY`. ¿Qué elementos de red y cortafuegos se deben auditar?
5. **Elección de Estrategia de Salud y Tiempos de Inicialización**:
   Una aplicación heredada basada en Java requiere 180 segundos para cargar en memoria antes de poder responder a peticiones HTTP. ¿Cómo se deben configurar las políticas de autohealing del MIG y del balanceador para evitar un bucle de reinicios continuos?

---

## 9. Glosario Técnico de Términos

* **Anycast IP**: Dirección IP pública única asignada a los balanceadores globales de Google Cloud que anuncia la misma IP desde múltiples ubicaciones Edge (Pop) alrededor del mundo, enrutando al usuario al punto de presencia más cercano.
* **Backend Service**: Objeto de configuración de balanceo que define el protocolo de comunicación, las políticas de distribución de carga, las verificaciones de estado y los grupos de instancias (MIGs) objetivo.
* **Forwarding Rule**: Regla que vincula una dirección IP y un rango de puertos objetivo con un Target Proxy o un Target Pool.
* **Health Check**: Consulta periódica enviada por Google Cloud a las instancias backend (vía HTTP, HTTPS o TCP) para verificar que el servicio responde activamente.
* **Instance Template**: Recursos de configuración de Compute Engine de solo lectura que sirven como molde para aprovisionar instancias individuales o grupos MIG.
* **Managed Instance Group (MIG)**: Colección de instancias de máquinas virtuales idénticas creadas a partir de una plantilla común, que soporta autorreparación, autoescalado y actualizaciones graduales.
* **Named Port**: Nombre lógico asignado a un número de puerto dentro de un grupo de instancias (ej. `http:80`, `custom-api:8080`), permitiendo que el Backend Service abstraiga los puertos reales.
* **Passthrough Load Balancer**: Balanceador de carga de red que enruta los paquetes de datos directamente a las máquinas virtuales backend sin terminar la conexión del cliente ni modificar los encabezados IP originales.
* **Proxy-Only Subnet**: Subred en una red VPC reservada explícitamente para proporcionar direcciones IP a los proxies Envoy regionales empleados por los balanceadores de aplicación internos y regionales.
* **Target HTTP Proxy**: Objeto de la arquitectura de Capa 7 que recibe solicitudes HTTP entrantes del cliente y las contrasta contra un URL Map para seleccionar el Backend Service adecuado.
* **URL Map**: Estructura de reglas de enrutamiento basada en patrones de coincidencia de dominios (hosts) y rutas de acceso (paths) que dirige el tráfico a diferentes servicios de backend.

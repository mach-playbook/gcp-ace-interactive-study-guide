# 📘 Curso: Implementing Cloud Load Balancing for Compute Engine (Course ID: 648)

Este documento sintetiza de forma modular los conceptos, arquitectura, flujos de comandos de la CLI `gcloud` y consideraciones clave para el examen Google Cloud Associate Cloud Engineer (ACE), derivados del curso oficial de Google Cloud Skills.

---

## 🧭 1. Resumen Ejecutivo y Clasificación

Google Cloud Load Balancing distribuye tráfico de red entre instancias de máquinas virtuales (VMs) en Compute Engine para garantizar alta disponibilidad, tolerancia a fallos y autoescalado dinámico. Opera mediante una dirección IP única (Anycast global o regional) y redirige las peticiones exclusivamente a instancias que superen las comprobaciones de salud (Health Checks).

### Matriz Canónica de Clasificación

| Tipo de Balanceador | Capa OSI | Alcance | Esquema de Tráfico | Arquitectura Subyacente | Casos de Uso Clave en Examen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **External Application Load Balancer** | Capa 7 (HTTP/HTTPS) | Global o Regional | Exterior a Interior | Proxy basado en Envoy / Google Front End (GFE) | Enrutamiento basado en URL (host/path), terminación SSL/TLS, Cloud Armor, Cloud CDN. |
| **Internal Application Load Balancer** | Capa 7 (HTTP/HTTPS) | Regional | Interior (VPC a VPC) | Proxy regional (requiere subnet Proxy-Only) | Microservicios privados, comunicación interna web-a-backend sin IPs públicas. |
| **External Passthrough Network Load Balancer** | Capa 4 (TCP/UDP) | Regional | Exterior a Interior | Passthrough directo (Maglev) sin terminación proxy | Protocolos TCP/UDP personalizados, videojuegos, VoIP, preservación de IP origen del cliente. |
| **Internal Passthrough Network Load Balancer** | Capa 4 (TCP/UDP) | Regional | Interior (VPC privada) | Passthrough basado en enrutamiento virtual VPC | Capas de base de datos internas (MySQL, PostgreSQL), rendimiento a velocidad de línea de red. |

> 📌 **Regla de Oro para el Examen ACE**:
> * **Capa 7 (HTTP/HTTPS)** = Actúa como un **proxy** (termina la sesión TCP del cliente y crea una nueva hacia el backend; la VM ve la IP del proxy a menos que use encabezados `X-Forwarded-For`).
> * **Capa 4 Passthrough (TCP/UDP)** = Enruta los paquetes directamente sin terminación proxy; la VM backend **conserva la IP pública original del cliente**.

---

## 🛠️ 2. Laboratorios Prácticos del Curso

### Lab 1: Configure a Passthrough Network Load Balancer (L4 Regional)

* **Objetivo**: Configurar un balanceador de red externo L4 que distribuya tráfico HTTP/TCP entre 2 instancias en `us-central1`.
* **Componentes clave**:
  * **Target Pool**: Objeto de configuración regional que agrupa instancias de Compute Engine destinatarias.
  * **Forwarding Rule**: Regla de reenvío que expone una IP pública regional y dirige el tráfico TCP hacia el Target Pool.
  * **Legacy HTTP Health Check**: Comprobador de salud regional creado con `gcloud compute http-health-checks create`.
* **Comandos gcloud esenciales**:
  ```bash
  # 1. Crear Target Pool con health check
  gcloud compute target-pools create www-pool \
      --region=us-central1 \
      --http-health-check=basic-check

  # 2. Agregar instancias al Target Pool
  gcloud compute target-pools add-instances www-pool \
      --instances=www1,www2 \
      --instances-zone=us-central1-a

  # 3. Crear regla de reenvío regional
  gcloud compute forwarding-rules create www-rule \
      --region=us-central1 \
      --ports=80 \
      --target-pool=www-pool
  ```

---

### Lab 2: Set Up Application Load Balancers (L7 Global HTTP/HTTPS)

* **Objetivo**: Desplegar un balanceador de aplicación global HTTP con soporte para escalado automático y autorreparación.
* **Componentes y jerarquía de Capa 7**:
  1. **Instance Template**: Molde inmutable que define tipo de máquina, imagen y startup script.
  2. **Managed Instance Group (MIG)**: Grupo homogéneo de VMs que escala según carga y repara instancias degradadas.
  3. **Named Ports**: Mapeo de nombre lógico a puerto (`--named-ports=http:80`).
  4. **Health Check**: Sonda periódica para verificar disponibilidad (`gcloud compute health-checks create http`).
  5. **Backend Service**: Configura protocolo, health check, tiempo de vaciado de conexiones (draining) y vincula los MIGs.
  6. **URL Map**: Reglas de enrutamiento por host o path (`--default-service=web-backend-service`).
  7. **Target HTTP Proxy**: Evalúa peticiones entrantes contra el URL Map.
  8. **Global Forwarding Rule**: Publica la IP Anycast global y dirige peticiones al Target Proxy.
* **Comandos gcloud esenciales**:
  ```bash
  # Asignar puerto nombrado en el MIG
  gcloud compute instance-groups managed set-named-ports lb-backend-group \
      --named-ports=http:80 \
      --zone=us-central1-a

  # Crear Backend Service global
  gcloud compute backend-services create web-backend-service \
      --protocol=HTTP \
      --port-name=http \
      --health-checks=http-basic-check \
      --global

  # Agregar MIG al Backend Service
  gcloud compute backend-services add-backend web-backend-service \
      --instance-group=lb-backend-group \
      --instance-group-zone=us-central1-a \
      --balancing-mode=UTILIZATION \
      --max-utilization=0.8 \
      --global

  # Ensamblaje: URL Map → Target Proxy → Forwarding Rule
  gcloud compute url-maps create web-map-http --default-service=web-backend-service
  gcloud compute target-http-proxies create http-lb-proxy --url-map=web-map-http
  gcloud compute forwarding-rules create http-content-rule \
      --global \
      --target-http-proxy=http-lb-proxy \
      --ports=80
  ```

---

### Lab 3: Use an Internal Application Load Balancer (L7 Regional Privado)

* **Objetivo**: Distribuir tráfico HTTP/HTTPS dentro de una VPC privada sin conexión pública a Internet.
* **Requisito Crítico — Proxy-Only Subnet**:
  * Los balanceadores L7 internos emplean proxies Envoy gestionados por Google.
  * Exigen una subred reservada con `--purpose=REGIONAL_MANAGED_PROXY` y `--role=ACTIVE`.
  * **Trampa de Examen**: No se pueden crear máquinas virtuales de usuario en una subred Proxy-Only. Solo aloja las direcciones IP privadas que usan los proxies Envoy para conectarse a las VMs de backend.
* **Comandos gcloud esenciales**:
  ```bash
  # 1. Crear Proxy-Only Subnet regional
  gcloud compute networks subnets create proxy-only-subnet \
      --purpose=REGIONAL_MANAGED_PROXY \
      --role=ACTIVE \
      --region=us-central1 \
      --network=default \
      --range=10.129.0.0/23

  # 2. Cortafuegos permitiendo tráfico de proxies Envoy a los backends
  gcloud compute firewall-rules create fw-allow-ilb-proxy \
      --network=default \
      --action=ALLOW \
      --direction=INGRESS \
      --source-ranges=10.129.0.0/23 \
      --target-tags=ilb-backend \
      --rules=tcp:80,tcp:443

  # 3. Crear Backend Service interno
  gcloud compute backend-services create ilb-backend-service \
      --load-balancing-scheme=INTERNAL_MANAGED \
      --protocol=HTTP \
      --health-checks=ilb-health-check \
      --health-checks-region=us-central1 \
      --region=us-central1
  ```

---

### Lab 4: Challenge Lab (Lab ID: 613025)

* **Escenario de Evaluación Práctica**: Despliegue de servicio web tolerante a fallos sin guía paso a paso.
* **Pasos de resolución secuencial**:
  1. Crear `instance-template` con Apache y etiqueta `allow-health-check`.
  2. Crear `instance-group managed` zonal con 2 réplicas y configurar `set-named-ports http:80`.
  3. Configurar autoescalado en el MIG (`--max-num-replicas=5 --target-cpu-utilization=0.8`).
  4. Crear regla de cortafuegos para Health Check (`130.211.0.0/22,35.191.0.0/16`).
  5. Crear `health-checks create http`, `backend-services create`, vincular el MIG, crear `url-maps`, `target-http-proxies` y `forwarding-rules create --global`.

---

## 🎯 3. Rangos Oficiales de Health Check de Google Cloud

Para que las instancias backend sean marcadas como `HEALTHY`, el cortafuegos de la red VPC debe autorizar obligatoriamente el ingreso desde estos rangos CIDR propiedad de Google:

* **`130.211.0.0/22`**: Sondas para HTTP(S), SSL Proxy, TCP Proxy y balanceadores internos.
* **`35.191.0.0/16`**: Sondas complementarias para verificaciones de estado globales y regionales.
* **`209.85.152.0/22` y `209.85.204.0/22`**: Sondas para balanceadores passthrough y legacy checks.

---

## 💡 4. Trampas Típicas en el Examen ACE

1. **Error de instancias UNHEALTHY con servidor web activo**: Si Apache o NGINX responde localmente pero el balanceador marca la VM como UNHEALTHY, la causa más común es que la regla de firewall no permite los rangos `130.211.0.0/22` y `35.191.0.0/16`.
2. **Error al crear Internal Application Load Balancer**: Falla inmediatamente si no existe previamente una subred con `--purpose=REGIONAL_MANAGED_PROXY` en la región del balanceador.
3. **Pérdida de IP cliente en balanceador Passthrough**: Si una pregunta afirma que un Passthrough Network Load Balancer hace NAT a la IP del cliente, es **FALSO**. Solo los proxies de Capa 7 sustituyen la IP origen.
4. **Autoescalado vs Autohealing**:
   * `--cool-down-period`: Tiempo que el autoescalador espera antes de medir métricas de CPU de una instancia nueva.
   * `--initial-delay`: Tiempo que el health check de autohealing espera antes de reiniciar una VM que esté arrancando.


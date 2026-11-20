import { CourseItem } from '../types';

export const coursesData: CourseItem[] = [
  {
    id: 'gcp-course-648',
    slug: 'implementing-cloud-load-balancing-compute-engine',
    templateId: '648',
    title: 'Implementing Cloud Load Balancing for Compute Engine',
    shortDescription:
      'Aprende a diseñar, aprovisionar y solucionar problemas con balanceadores de carga L4 (Passthrough) y L7 (Application) tanto externos como internos, Managed Instance Groups (MIGs) y subredes Proxy-Only.',
    duration: '2 Horas 30 Minutos',
    level: 'Intermedio / ACE Especializado',
    category: 'Compute & Networking',
    badge: 'Google Cloud Skills Course',
    overview:
      'Google Cloud Load Balancing permite distribuir el tráfico entrante entre múltiples instancias de máquinas virtuales (VM) en Compute Engine para garantizar alta disponibilidad, tolerancia a fallos y autoescalado dinámico. Opera mediante una dirección IP única global (Anycast IP) o regional, redirigiendo peticiones únicamente a instancias que respondan positivamente a las verificaciones de estado (Health Checks).',
    classificationMatrix: [
      {
        lbType: 'External Application Load Balancer',
        layer: 'Capa 7 (HTTP/HTTPS)',
        scope: 'Global o Regional',
        trafficScheme: 'Exterior a Interior',
        architecture: 'Proxy basado en Envoy / Google Front End (GFE)',
        useCase: 'Aplicaciones web, APIs REST, microservicios con enrutamiento por URL, Cloud CDN y Cloud Armor.',
      },
      {
        lbType: 'Internal Application Load Balancer',
        layer: 'Capa 7 (HTTP/HTTPS)',
        scope: 'Regional',
        trafficScheme: 'Interior (VPC a VPC)',
        architecture: 'Proxy regional gestionado (requiere Proxy-Only Subnet)',
        useCase: 'Microservicios privados, comunicación privada web-a-backend sin IPs públicas.',
      },
      {
        lbType: 'External Passthrough Network Load Balancer',
        layer: 'Capa 4 (TCP/UDP)',
        scope: 'Regional',
        trafficScheme: 'Exterior a Interior',
        architecture: 'Passthrough directo (Maglev) sin terminación proxy',
        useCase: 'Tráfico TCP/UDP no HTTP, protocolos personalizados, preservación obligatoria de IP origen del cliente.',
      },
      {
        lbType: 'Internal Passthrough Network Load Balancer',
        layer: 'Capa 4 (TCP/UDP)',
        scope: 'Regional',
        trafficScheme: 'Interior (VPC privada)',
        architecture: 'Passthrough basado en enrutamiento virtual de VPC',
        useCase: 'Bases de datos internas, capas intermedias TCP con rendimiento de velocidad de línea.',
      },
    ],
    healthCheckRanges: [
      {
        cidr: '130.211.0.0/22',
        purpose: 'Sondas de salud para HTTP(S), SSL Proxy, TCP Proxy y balanceadores internos.',
      },
      {
        cidr: '35.191.0.0/16',
        purpose: 'Sondas complementarias para verificaciones de estado globales y regionales de Google Cloud.',
      },
      {
        cidr: '209.85.152.0/22',
        purpose: 'Sondas para balanceadores passthrough y legacy health checks.',
      },
      {
        cidr: '209.85.204.0/22',
        purpose: 'Sondas complementarias para balanceadores passthrough y legacy health checks.',
      },
    ],
    examTraps: [
      {
        trap: 'Instancias UNHEALTHY a pesar de que el servicio web está levantado',
        solution:
          'Verificar que la regla de firewall permita el ingreso de los rangos oficiales de health check (130.211.0.0/22 y 35.191.0.0/16) en el puerto correcto (ej. TCP 80).',
      },
      {
        trap: 'Fallo al desplegar Internal Application Load Balancer por falta de subred',
        solution:
          'Asegurarse de aprovisionar previamente una subred Proxy-Only (--purpose=REGIONAL_MANAGED_PROXY) en la región destino antes de crear la regla de reenvío o el backend service.',
      },
      {
        trap: 'Creer que un balanceador Passthrough modifica la IP origen',
        solution:
          'En Capa 4 Passthrough (Network Load Balancer), los paquetes se entregan directamente a la VM sin NAT; el backend ve la IP real del cliente exterior. Solo los proxies L7 reemplazan la IP origen.',
      },
      {
        trap: 'Confusión entre cool-down-period e initial-delay',
        solution:
          'cool-down-period pertenece a la política de autoescalado (espera antes de medir CPU); initial-delay pertenece al health check de autohealing del MIG (espera antes de reiniciar la VM).',
      },
    ],
    labs: [
      {
        id: 'lab-1',
        labNumber: 1,
        title: 'Configure a Passthrough Network Load Balancer',
        durationMinutes: 40,
        type: 'guided',
        description:
          'Aprende a configurar un balanceador de carga de red passthrough externo de Capa 4 (Network Load Balancer) que distribuye tráfico TCP entre instancias en la misma región mediante Target Pools y Forwarding Rules.',
        keyConcepts: [
          'Target Pools: Grupos regionales de instancias para balanceo de Capa 4.',
          'Forwarding Rules: Enrutamiento de IP y puerto público hacia el pool.',
          'Legacy HTTP Health Checks: Monitoreo periódico del puerto 80.',
          'Preservación de IP cliente nativa.',
        ],
        steps: [
          {
            id: 'lab1-step-1',
            stepNumber: 1,
            title: 'Crear instancias de backend web (www1 y www2)',
            description:
              'Aprovisiona dos instancias de Compute Engine con Apache preinstalado y scripts de inicio en us-central1-a.',
            command: `gcloud compute instances create www1 \\
    --zone=us-central1-a \\
    --tags=network-lb-tag \\
    --machine-type=e2-medium \\
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "Page served from www1" | tee /var/www/html/index.html'

gcloud compute instances create www2 \\
    --zone=us-central1-a \\
    --tags=network-lb-tag \\
    --machine-type=e2-medium \\
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "Page served from www2" | tee /var/www/html/index.html'`,
            tip: 'La etiqueta network-lb-tag vinculará las instancias a la regla de firewall en el siguiente paso.',
          },
          {
            id: 'lab1-step-2',
            stepNumber: 2,
            title: 'Crear regla de cortafuegos para tráfico HTTP',
            description:
              'Permite la entrada de tráfico TCP en el puerto 80 hacia las instancias identificadas con la etiqueta network-lb-tag.',
            command: `gcloud compute firewall-rules create www-firewall-network-lb \\
    --network=default \\
    --action=ALLOW \\
    --direction=INGRESS \\
    --rules=tcp:80 \\
    --target-tags=network-lb-tag`,
          },
          {
            id: 'lab1-step-3',
            stepNumber: 3,
            title: 'Configurar Health Check y Target Pool regional',
            description:
              'Crea el health check HTTP regional, inicializa el Target Pool y asocia las dos máquinas virtuales.',
            command: `gcloud compute http-health-checks create basic-check

gcloud compute target-pools create www-pool \\
    --region=us-central1 \\
    --http-health-check=basic-check

gcloud compute target-pools add-instances www-pool \\
    --instances=www1,www2 \\
    --instances-zone=us-central1-a`,
          },
          {
            id: 'lab1-step-4',
            stepNumber: 4,
            title: 'Crear la regla de reenvío regional y verificar tráfico',
            description:
              'Publica la regla de reenvío para exponer una dirección IP pública externa y prueba la alternancia entre servidores.',
            command: `gcloud compute forwarding-rules create www-rule \\
    --region=us-central1 \\
    --ports=80 \\
    --target-pool=www-pool

EXTERNAL_IP=$(gcloud compute forwarding-rules describe www-rule --region=us-central1 --format="value(IPAddress)")
curl -m 1 http://$EXTERNAL_IP`,
          },
        ],
      },
      {
        id: 'lab-2',
        labNumber: 2,
        title: 'Set Up Application Load Balancers',
        durationMinutes: 45,
        type: 'guided',
        description:
          'Implementa un balanceador de carga global de Capa 7 (HTTP/HTTPS) con autoescalado dinámico mediante Managed Instance Groups (MIGs), Backend Services, URL Maps y Target Proxies.',
        keyConcepts: [
          'Instance Templates y Managed Instance Groups (MIGs).',
          'Named Ports (puertos nombrados) para mapeo lógico.',
          'Rangos de sondaje de Google: 130.211.0.0/22 y 35.191.0.0/16.',
          'Cadena L7: Forwarding Rule → Target Proxy → URL Map → Backend Service → MIG.',
        ],
        steps: [
          {
            id: 'lab2-step-1',
            stepNumber: 1,
            title: 'Crear plantilla de instancia y Managed Instance Group (MIG)',
            description:
              'Define la plantilla para los servidores web y genera un MIG zonal con 2 réplicas y puerto nombrado http:80.',
            command: `gcloud compute instance-templates create lb-backend-template \\
    --region=us-central1 \\
    --network=default \\
    --subnet=default \\
    --tags=allow-health-check \\
    --machine-type=e2-medium \\
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "HTTP Load Balancer Backend from $(hostname)" | tee /var/www/html/index.html'

gcloud compute instance-groups managed create lb-backend-group \\
    --template=lb-backend-template \\
    --size=2 \\
    --zone=us-central1-a

gcloud compute instance-groups managed set-named-ports lb-backend-group \\
    --named-ports=http:80 \\
    --zone=us-central1-a`,
          },
          {
            id: 'lab2-step-2',
            stepNumber: 2,
            title: 'Autorizar las sondas oficiales de Health Check de Google',
            description:
              'Crea la regla de cortafuegos que habilita a los verificadores de Google a consultar el estado del servicio web.',
            command: `gcloud compute firewall-rules create fw-allow-health-check \\
    --network=default \\
    --action=ALLOW \\
    --direction=INGRESS \\
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \\
    --target-tags=allow-health-check \\
    --rules=tcp:80`,
            tip: 'Sin esta regla de firewall, los backends aparecerán en estado UNHEALTHY permanentemente.',
          },
          {
            id: 'lab2-step-3',
            stepNumber: 3,
            title: 'Crear Health Check y Backend Service global',
            description:
              'Inicializa el health check global, define el servicio de backend y asocia el grupo administrado.',
            command: `gcloud compute health-checks create http http-basic-check --port=80

gcloud compute backend-services create web-backend-service \\
    --protocol=HTTP \\
    --port-name=http \\
    --health-checks=http-basic-check \\
    --global

gcloud compute backend-services add-backend web-backend-service \\
    --instance-group=lb-backend-group \\
    --instance-group-zone=us-central1-a \\
    --balancing-mode=UTILIZATION \\
    --max-utilization=0.8 \\
    --global`,
          },
          {
            id: 'lab2-step-4',
            stepNumber: 4,
            title: 'Ensamblar URL Map, Target Proxy y Regla Global',
            description:
              'Construye la tubería de enrutamiento completa y expone la IP Anycast global.',
            command: `gcloud compute url-maps create web-map-http --default-service=web-backend-service

gcloud compute target-http-proxies create http-lb-proxy --url-map=web-map-http

gcloud compute forwarding-rules create http-content-rule \\
    --global \\
    --target-http-proxy=http-lb-proxy \\
    --ports=80`,
          },
        ],
      },
      {
        id: 'lab-3',
        labNumber: 3,
        title: 'Use an Internal Application Load Balancer',
        durationMinutes: 45,
        type: 'guided',
        description:
          'Implementa un balanceador interno regional de Capa 7 dentro de una red VPC privada utilizando una subred Proxy-Only obligatoria y proxies Envoy gestionados.',
        keyConcepts: [
          'Proxy-Only Subnet (--purpose=REGIONAL_MANAGED_PROXY).',
          'Aislamiento privado: Tráfico HTTP/HTTPS sin IP pública.',
          'Esquema INTERNAL_MANAGED en Backend Services y Forwarding Rules.',
          'Pruebas privadas mediante VM cliente interna.',
        ],
        steps: [
          {
            id: 'lab3-step-1',
            stepNumber: 1,
            title: 'Aprovisionar la Subred Proxy-Only obligatoria',
            description:
              'Crea el espacio de direccionamiento IP exclusivo para los proxies Envoy regionales de Google.',
            command: `gcloud compute networks subnets create proxy-only-subnet \\
    --purpose=REGIONAL_MANAGED_PROXY \\
    --role=ACTIVE \\
    --region=us-central1 \\
    --network=default \\
    --range=10.129.0.0/23`,
            tip: 'No intentes crear VMs en esta subred; está reservada para el balanceador.',
          },
          {
            id: 'lab3-step-2',
            stepNumber: 2,
            title: 'Configurar cortafuegos para Proxies y Health Checks',
            description:
              'Permite el tráfico desde el rango de proxies (10.129.0.0/23) y desde los verificadores de Google hacia los backends internos.',
            command: `gcloud compute firewall-rules create fw-allow-ilb-proxy \\
    --network=default \\
    --action=ALLOW \\
    --direction=INGRESS \\
    --source-ranges=10.129.0.0/23 \\
    --target-tags=ilb-backend \\
    --rules=tcp:80,tcp:443

gcloud compute firewall-rules create fw-allow-ilb-health-check \\
    --network=default \\
    --action=ALLOW \\
    --direction=INGRESS \\
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \\
    --target-tags=ilb-backend \\
    --rules=tcp:80`,
          },
          {
            id: 'lab3-step-3',
            stepNumber: 3,
            title: 'Crear plantilla e Instance Group privado',
            description:
              'Aprovisiona las máquinas virtuales internas etiquetadas como ilb-backend.',
            command: `gcloud compute instance-templates create ilb-backend-template \\
    --region=us-central1 \\
    --network=default \\
    --subnet=default \\
    --tags=ilb-backend \\
    --machine-type=e2-medium \\
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "Internal App Load Balancer Response from $(hostname)" | tee /var/www/html/index.html'

gcloud compute instance-groups managed create ilb-backend-group \\
    --template=ilb-backend-template \\
    --size=2 \\
    --zone=us-central1-a

gcloud compute instance-groups managed set-named-ports ilb-backend-group \\
    --named-ports=http:80 \\
    --zone=us-central1-a`,
          },
          {
            id: 'lab3-step-4',
            stepNumber: 4,
            title: 'Desplegar componentes del balanceador regional interno',
            description:
              'Configura el health check regional, el Backend Service con esquema INTERNAL_MANAGED y la regla interna con IP privada.',
            command: `gcloud compute health-checks create http ilb-health-check \\
    --region=us-central1 \\
    --port=80

gcloud compute backend-services create ilb-backend-service \\
    --load-balancing-scheme=INTERNAL_MANAGED \\
    --protocol=HTTP \\
    --health-checks=ilb-health-check \\
    --health-checks-region=us-central1 \\
    --region=us-central1

gcloud compute backend-services add-backend ilb-backend-service \\
    --instance-group=ilb-backend-group \\
    --instance-group-zone=us-central1-a \\
    --region=us-central1

gcloud compute url-maps create ilb-map --default-service=ilb-backend-service --region=us-central1

gcloud compute target-http-proxies create ilb-target-proxy --url-map=ilb-map --region=us-central1

gcloud compute forwarding-rules create ilb-forwarding-rule \\
    --load-balancing-scheme=INTERNAL_MANAGED \\
    --network=default \\
    --subnet=default \\
    --address=10.128.0.99 \\
    --ports=80 \\
    --target-http-proxy=ilb-target-proxy \\
    --target-http-proxy-region=us-central1 \\
    --region=us-central1`,
          },
        ],
      },
      {
        id: 'lab-4',
        labNumber: 4,
        title: 'Implement Load Balancing on Compute Engine — Challenge Lab',
        durationMinutes: 60,
        type: 'challenge',
        description:
          'Evaluación práctica en tiempo real (Lab ID: 613025). Resuelve un escenario de alta disponibilidad configurando plantillas, autoescalado de CPU en MIGs, cortafuegos de salud y un External Application Load Balancer sin asistencia paso a paso.',
        keyConcepts: [
          'Autoescalado reactivo con set-autoscaling (--target-cpu-utilization=0.8).',
          'Ensamblado completo bajo restricciones de tiempo y nombres fijos.',
          'Verificación de entrega en balanceo multi-instancia.',
        ],
        steps: [
          {
            id: 'lab4-step-1',
            stepNumber: 1,
            title: 'Definir variables de entorno del reto',
            description:
              'Establece las variables con los nombres exactos asignados por la consola de pruebas.',
            command: `export REGION="us-central1"
export ZONE="us-central1-a"
export TEMPLATE_NAME="lb-backend-template"
export MIG_NAME="lb-backend-group"
export HC_NAME="http-basic-check"
export BS_NAME="web-backend-service"
export URL_MAP_NAME="web-map-http"
export PROXY_NAME="http-lb-proxy"
export FW_NAME="fw-allow-health-check"`,
          },
          {
            id: 'lab4-step-2',
            stepNumber: 2,
            title: 'Ejecutar script integral de aprovisionamiento',
            description:
              'Aprovisiona la plantilla web, el MIG con autoescalado entre 2 y 5 réplicas, las reglas de firewall y el balanceador global.',
            command: `gcloud compute instance-templates create $TEMPLATE_NAME \\
    --region=$REGION \\
    --network=default \\
    --subnet=default \\
    --tags=allow-health-check \\
    --machine-type=e2-medium \\
    --metadata=startup-script='#!/bin/bash
        apt-get update
        apt-get install -y apache2
        systemctl restart apache2
        echo "Challenge Lab Completed on $(hostname)" | tee /var/www/html/index.html'

gcloud compute instance-groups managed create $MIG_NAME \\
    --template=$TEMPLATE_NAME \\
    --size=2 \\
    --zone=$ZONE

gcloud compute instance-groups managed set-named-ports $MIG_NAME \\
    --named-ports=http:80 \\
    --zone=$ZONE

gcloud compute instance-groups managed set-autoscaling $MIG_NAME \\
    --max-num-replicas=5 \\
    --min-num-replicas=2 \\
    --target-cpu-utilization=0.8 \\
    --cool-down-period=60 \\
    --zone=$ZONE

gcloud compute firewall-rules create $FW_NAME \\
    --network=default \\
    --action=ALLOW \\
    --direction=INGRESS \\
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \\
    --target-tags=allow-health-check \\
    --rules=tcp:80

gcloud compute health-checks create http $HC_NAME --port=80

gcloud compute backend-services create $BS_NAME \\
    --protocol=HTTP \\
    --port-name=http \\
    --health-checks=$HC_NAME \\
    --global

gcloud compute backend-services add-backend $BS_NAME \\
    --instance-group=$MIG_NAME \\
    --instance-group-zone=$ZONE \\
    --balancing-mode=UTILIZATION \\
    --max-utilization=0.8 \\
    --global

gcloud compute url-maps create $URL_MAP_NAME --default-service=$BS_NAME
gcloud compute target-http-proxies create $PROXY_NAME --url-map=$URL_MAP_NAME
gcloud compute forwarding-rules create http-content-rule \\
    --global \\
    --target-http-proxy=$PROXY_NAME \\
    --ports=80`,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        question:
          '¿Cuál es la diferencia fundamental en arquitectura entre un External Application Load Balancer y un External Passthrough Network Load Balancer?',
        options: [
          'External Application actúa como proxy L7 (termina la conexión TCP en la infraestructura de Google y abre una nueva al backend); External Passthrough es de Capa 4 y enruta paquetes directamente a la VM sin terminación proxy.',
          'External Application no permite reglas de cortafuegos; External Passthrough exige Cloud Armor obligatoriamente.',
          'External Application es exclusivamente zonal; External Passthrough es global con dirección IP Anycast.',
          'External Application conserva la IP origen del cliente nativamente sin encabezados; External Passthrough utiliza NAT para ocultarla.',
        ],
        correctIndex: 0,
        explanation:
          'Los balanceadores de Capa 7 operan como proxies inversos que procesan HTTP/HTTPS y terminan la conexión TCP. Los balanceadores de Capa 4 Passthrough (basados en Maglev) entregan los paquetes TCP/UDP directamente al backend preservando la IP del cliente.',
        examTrapTip: 'Recuerda: Si el examen pregunta por "conservar IP cliente original sin encabezados HTTP", la respuesta es un balanceador Passthrough L4.',
      },
      {
        id: 'q2',
        question:
          'Al configurar un Internal Application Load Balancer en una subred de VPC, intentas crearlo pero la CLI devuelve un error de recurso obligatorio faltante. ¿Qué elemento falta aprovisionar?',
        options: [
          'Una subred de tipo Proxy-Only (--purpose=REGIONAL_MANAGED_PROXY) en la región destino.',
          'Un bucket de Cloud Storage para almacenar logs de acceso.',
          'Un certificado SSL gestionado por Google con validez global.',
          'Un túnel Cloud VPN activo hacia la red local.',
        ],
        correctIndex: 0,
        explanation:
          'Los balanceadores de aplicación internos regionales exigen una subred Proxy-Only dedicada para que los proxies Envoy gestionados obtengan direcciones IP privadas con las que comunicarse con los backends.',
      },
      {
        id: 'q3',
        question:
          '¿Por qué es indispensable incluir los rangos 130.211.0.0/22 y 35.191.0.0/16 en las reglas de cortafuegos de los backends de un HTTP Load Balancer?',
        options: [
          'Son los bloques CIDR oficiales desde donde operan los sondajes de verificación de estado (Health Checks) de Google Cloud.',
          'Son las direcciones IP asignadas a las cuentas de servicio de Compute Engine.',
          'Son los servidores DNS raíz que resuelven los nombres de dominio de la VPC.',
          'Son los rangos reservados para el tráfico de la consola web de Google Cloud.',
        ],
        correctIndex: 0,
        explanation:
          'Las sondas de health check de Google provienen de estos bloques IP. Si el firewall los bloquea, los backends se considerarán UNHEALTHY y el balanceador no les enviará tráfico.',
      },
      {
        id: 'q4',
        question:
          '¿Qué comando de la CLI gcloud permite asociar un puerto lógico (ej. http:80) a un Managed Instance Group para que el Backend Service pueda direccionar peticiones?',
        options: [
          'gcloud compute instance-groups managed set-named-ports <GRUPO> --named-ports=http:80',
          'gcloud compute forwarding-rules create --port-map=http:80',
          'gcloud compute firewall-rules update --open-named-port=http:80',
          'gcloud compute url-maps set-port <GRUPO> --port=80',
        ],
        correctIndex: 0,
        explanation:
          'El comando set-named-ports mapea el nombre lógico del puerto (declarado en el backend-service con --port-name) al puerto TCP físico en el que escuchan las instancias.',
      },
      {
        id: 'q5',
        question:
          'En un Managed Instance Group (MIG), ¿cuál es la diferencia funcional entre el parámetro --cool-down-period y el parámetro --initial-delay?',
        options: [
          '--cool-down-period le indica al autoescalador cuántos segundos esperar tras el inicio antes de medir métricas de CPU; --initial-delay le indica al health check de autohealing cuánto esperar antes de marcar una VM como fallida durante su arranque.',
          '--cool-down-period apaga las VMs en la noche; --initial-delay retrasa el tráfico entrante durante ataques DDoS.',
          '--cool-down-period es solo para balanceadores L4; --initial-delay es exclusivo de balanceadores L7.',
          'Son sinónimos intercambiables dentro de la configuración del Target Pool.',
        ],
        correctIndex: 0,
        explanation:
          'El cool-down-period previene escalados precipitados mientras la aplicación arranca. El initial-delay evita que el proceso de autorreparación (autohealing) reinicie innecesariamente una instancia que aún se encuentra ejecutando scripts de inicio.',
      },
      {
        id: 'q6',
        question:
          'Quieres diseñar una arquitectura web donde el tráfico hacia example.com/images/* se dirija a un grupo de VMs con almacenamiento optimizado y example.com/api/* a un grupo compute-optimized. ¿Qué objeto del balanceador administra esta lógica?',
        options: [
          'URL Map (Mapa de URL)',
          'Forwarding Rule (Regla de Reenvío)',
          'Target Pool',
          'Health Check',
        ],
        correctIndex: 0,
        explanation:
          'El URL Map evalúa el host y el path de la solicitud HTTP entrante y define reglas (pathMatchers) para despachar la petición al Backend Service correspondiente.',
      },
      {
        id: 'q7',
        question:
          'Un balanceador Passthrough Network Load Balancer entrega paquetes TCP a las máquinas backend. ¿Conserva este balanceador la dirección IP origen del cliente?',
        options: [
          'Sí, porque opera en Capa 4 sin terminación proxy ni traducción NAT en la IP fuente.',
          'No, sustituye la IP por la dirección del Google Front End.',
          'No, sustituye la IP por la IP privada de la regla de reenvío.',
          'Solo si la solicitud incluye un encabezado HTTP X-Forwarded-For.',
        ],
        correctIndex: 0,
        explanation:
          'Al ser passthrough de transporte directo, los paquetes conservan los encabezados IP originales del cliente.',
      },
      {
        id: 'q8',
        question:
          '¿Qué comando de la CLI gcloud se utiliza para actualizar la plantilla de un MIG existente e iniciar una actualización gradual sin caída de servicio (Rolling Update)?',
        options: [
          'gcloud compute instance-groups managed rolling-action start-update <MIG> --version=template=<PLANTILLA>',
          'gcloud compute instances replace <MIG> --force',
          'gcloud compute instance-groups recreate <MIG> --now',
          'gcloud compute templates deploy-all <MIG>',
        ],
        correctIndex: 0,
        explanation:
          'El subcomando rolling-action start-update permite orquestar reemplazos continuos controlando el número máximo de instancias no disponibles y el porcentaje de actualización.',
      },
      {
        id: 'q9',
        question:
          'Si un balanceador HTTP global no está entregando tráfico a las instancias de un MIG a pesar de que las VMs están encendidas y el servidor web activo, ¿cuál es la causa más probable?',
        options: [
          'Las instancias están en estado UNHEALTHY debido a una regla de cortafuegos faltante para los rangos de sondas de Google (130.211.0.0/22 y 35.191.0.0/16).',
          'El balanceador no tiene cuota asignada en Compute Engine.',
          'El navegador del usuario no tiene habilitado QUIC/HTTP3.',
          'La VPC no cuenta con un Cloud NAT activo.',
        ],
        correctIndex: 0,
        explanation:
          'Si el cortafuegos bloquea los sondajes periódicos de salud, el Backend Service asume que todas las instancias están caídas y no les envía tráfico.',
      },
      {
        id: 'q10',
        question:
          '¿Puede desplegarse una máquina virtual Compute Engine de usuario normal dentro de una subred creada con --purpose=REGIONAL_MANAGED_PROXY?',
        options: [
          'No, las subredes Proxy-Only están reservadas exclusivamente para los proxies Envoy regionales de Google Cloud.',
          'Sí, siempre y cuando la VM tenga instalada la extensión Ops Agent.',
          'Sí, pero únicamente si tiene una dirección IP estática pública.',
          'Sí, hasta un límite máximo de 5 instancias concurrentes.',
        ],
        correctIndex: 0,
        explanation:
          'Las subredes Proxy-Only no permiten la creación de instancias de usuario; su propósito exclusivo es proporcionar IPs internas a los proxies Envoy de los balanceadores regionales L7.',
      },
    ],
    glossary: [
      {
        term: 'Anycast IP',
        definition:
          'Dirección IP pública única asignada a balanceadores globales de Google Cloud que se anuncia desde múltiples puntos de presencia (PoPs) en el mundo, enrutando al usuario al punto más cercano.',
      },
      {
        term: 'Backend Service',
        definition:
          'Componente central de balanceo que agrupa backends (MIGs o NEGs), define el protocolo, las políticas de distribución de carga, tiempos de draining y las comprobaciones de estado.',
      },
      {
        term: 'Forwarding Rule',
        definition:
          'Regla de entrada que asocia una dirección IP y puerto con un Target Proxy (Capa 7) o un Target Pool / Backend Service (Capa 4).',
      },
      {
        term: 'Health Check',
        definition:
          'Mecanismo de sondeo periódico de Google Cloud hacia las instancias para asegurar que el servicio está activo antes de dirigirle peticiones.',
      },
      {
        term: 'Managed Instance Group (MIG)',
        definition:
          'Conjunto de máquinas virtuales idénticas creadas a partir de una plantilla común, que admite escalado automático, autorreparación y actualizaciones graduales.',
      },
      {
        term: 'Named Port',
        definition:
          'Nombre lógico asociado a un número de puerto en un grupo de instancias (ej. http:80), permitiendo que el Backend Service abstraiga la configuración física.',
      },
      {
        term: 'Passthrough Load Balancer',
        definition:
          'Balanceador de Capa 4 que entrega paquetes directamente a las VMs backend sin intermediación de proxy ni modificación de la IP origen del cliente.',
      },
      {
        term: 'Proxy-Only Subnet',
        definition:
          'Subred VPC reservada explícitamente para suministrar direcciones IP a los proxies Envoy gestionados que ejecutan los balanceadores regionales de aplicación.',
      },
      {
        term: 'Target HTTP Proxy',
        definition:
          'Componente de Capa 7 que recibe las peticiones del cliente y las contrasta contra el URL Map para dirigirlas al Backend Service correspondiente.',
      },
      {
        term: 'URL Map',
        definition:
          'Objeto de enrutamiento que define reglas basadas en hosts y rutas (paths) para dirigir solicitudes HTTP a diferentes servicios de backend.',
      },
    ],
  },
  {
    id: 'gcp-course-60',
    slug: 'google-cloud-fundamentals-core-infrastructure',
    templateId: '60',
    title: 'Google Cloud Fundamentals: Core Infrastructure',
    shortDescription:
      'Comprende los fundamentos de Google Cloud: jerarquía de recursos, IAM, redes VPC personalizadas, Compute Engine, almacenamiento en la nube (Cloud Storage, Cloud SQL, Spanner) y cómputo serverless con Cloud Run.',
    duration: '3 Horas 00 Minutos',
    level: 'Fundamental / Cimientos ACE',
    category: 'Foundations & Core Infrastructure',
    badge: 'Google Cloud Core Course',
    overview:
      'El curso Google Cloud Fundamentals: Core Infrastructure establece los cimientos conceptuales y operativos indispensables para navegar, desplegar y gobernar soluciones en Google Cloud Platform. Estructurado en 7 objetivos clave oficiales, abarca el modelo de responsabilidad compartida, jerarquía organizacional, redes VPC personalizadas, Compute Engine, taxonomía de almacenamiento, GKE, cómputo serverless con Cloud Run y la asistencia operativa de Gemini mediante prompt engineering para el examen Associate Cloud Engineer.',
    videos: [
      {
        id: 'vid-60-1',
        title: 'Course Introduction',
        moduleName: 'Introducción al Curso',
        youtubeUrl: 'https://www.youtube.com/watch?v=xVmam01f4Fw',
        youtubeId: 'xVmam01f4Fw',
        duration: '2:02',
        summary:
          'Visión general del curso Google Cloud Fundamentals: Core Infrastructure. Presenta las cinco categorías de servicios de Google Cloud (cómputo, almacenamiento, big data, machine learning y servicios de aplicación) y define los siete objetivos clave de aprendizaje para la certificación ACE.',
        keyTakeaways: [
          '5 categorías fundamentales de Google Cloud: Cómputo, Almacenamiento, Big Data, Machine Learning y Servicios de Aplicación.',
          'Audiencia principal: Desarrolladores, SysOps, Ingenieros Cloud y Arquitectos de Soluciones orientados al examen ACE.',
          '7 objetivos de aprendizaje clave: Organización jerárquica, infraestructura básica, almacenamiento, GKE, serverless y optimización asistida por IA con Gemini.',
        ],
      },
      {
        id: 'vid-60-2',
        title: 'Cloud Computing Overview',
        moduleName: 'Módulo 1: Introducción a Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=ph5hjgOAf40',
        youtubeId: 'ph5hjgOAf40',
        duration: '3:16',
        summary:
          'Definición formal de Cloud Computing según el NIST y evolución histórica en tres olas tecnológicas: desde la coubicación (colocation) y la virtualización tradicional hasta la tercera ola elástica y basada en contenedores de Google Cloud.',
        keyTakeaways: [
          '5 características esenciales de la nube (NIST): Autoservicio bajo demanda, acceso amplio a la red, asignación común de recursos (resource pooling), elasticidad rápida y servicio medido (pago por uso).',
          'Primera ola (Colocation): Ahorro financiero rentando espacio físico en lugar de construir centros de datos.',
          'Segunda ola (Virtualización): Servidores, discos y redes virtualizadas, pero manteniendo administración pesada de infraestructura.',
          'Tercera ola (Google Cloud): Arquitectura basada en contenedores, servicios completamente automatizados, escalabilidad elástica y enfoque de datos.',
        ],
      },
      {
        id: 'vid-60-3',
        title: 'IaaS and PaaS',
        moduleName: 'Módulo 1: Introducción a Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=C7cb6kFhNmw',
        youtubeId: 'C7cb6kFhNmw',
        duration: '2:27',
        summary:
          'Comparación entre los modelos de servicio en la nube: Infrastructure as a Service (IaaS con Compute Engine) y Platform as a Service (PaaS con App Engine). Analiza la evolución hacia servicios serverless completamente gestionados (Cloud Run y Cloud Run Functions) y Software as a Service (SaaS con Google Workspace).',
        keyTakeaways: [
          'IaaS (Compute Engine): Aprovisiona recursos crudos de cómputo, almacenamiento y redes; se paga por los recursos reservados por adelantado.',
          'PaaS (App Engine): Enlaza código con librerías e infraestructura gestionada, enfocándose en la lógica de negocio; se paga por los recursos efectivamente utilizados.',
          'Serverless (Cloud Run & Cloud Run Functions): Elimina completamente la gestión de servidores y escala a cero; Cloud Run aloja contenedores de microservicios y Cloud Run Functions ejecuta código orientado a eventos.',
          'SaaS (Google Workspace): Entrega la pila completa de la aplicación en la nube para ser consumida directamente por usuarios finales a través de internet.',
        ],
      },
      {
        id: 'vid-60-4',
        title: 'The Google Cloud Network',
        moduleName: 'Módulo 1: Introducción a Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=SDGJqKIE5yY',
        youtubeId: 'SDGJqKIE5yY',
        duration: '2:56',
        summary:
          'Explora la infraestructura de red global de Google Cloud: cables submarinos de alta velocidad, más de 100 nodos de caché perimetrales (PoPs), 7 regiones geográficas mundiales, zonas independientes de disponibilidad y arquitecturas multi-región para alta disponibilidad y baja latencia.',
        keyTakeaways: [
          'Red privada global: Enlaces dedicados de fibra óptica y cables submarinos que maximizan el throughput y minimizan la latencia evitando la Internet pública.',
          'Puntos de presencia (PoPs): Más de 100 nodos de caché de contenido perimetral para acelerar la entrega estática (Cloud CDN) y terminación Anycast IP.',
          'Regiones vs Zonas: Las regiones son áreas geográficas independientes compuestas por al menos 3 zonas; las zonas son dominios de aislamiento de fallos eléctricos y de hardware.',
          'Arquitecturas Multi-Región: Replicación síncrona en múltiples regiones para servicios críticos como Cloud Spanner o Cloud Storage Multi-Regional.',
        ],
      },
      {
        id: 'vid-60-5',
        title: 'Environmental Impact',
        moduleName: 'Módulo 1: Introducción a Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=MwZiq-DRGFo',
        youtubeId: 'MwZiq-DRGFo',
        duration: '1:31',
        summary:
          'Sostenibilidad y eficiencia energética en los centros de datos de Google Cloud. Examina la certificación ambiental ISO 14001, la refrigeración con agua de mar en Hamina (Finlandia), la neutralidad de carbono y la meta 2030 de energía 100% libre de carbono (CFE).',
        keyTakeaways: [
          'Eficiencia de centros de datos: Los datacenters representan ~2% de la electricidad mundial; Google fue el primero en obtener la certificación ISO 14001.',
          'Refrigeración marina ecológica: El centro de datos de Hamina en Finlandia emplea agua de mar para reducir dramáticamente el consumo energético.',
          'Meta Carbon-Free Energy 2030: Operar con energía 100% libre de carbono (CFE) las 24 horas del día, los 7 días de la semana.',
          'Criterio de arquitectura ACE: Evaluación del indicador CFE% al seleccionar regiones en el diseño de infraestructura.',
        ],
      },
      {
        id: 'vid-60-6',
        title: 'Security',
        moduleName: 'Módulo 1: Introducción a Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=BggWZl8qTzk',
        youtubeId: 'BggWZl8qTzk',
        duration: '5:41',
        summary:
          'Arquitectura integral de seguridad de Google Cloud organizada en 6 capas progresivas: infraestructura de hardware (chips Titan y Secure Boot), despliegue de servicios (RPC cifrado), identidad (desafíos adaptativos y llaves U2F), almacenamiento (cifrado en reposo por defecto), comunicación por internet (Google Front End y protección DoS) y seguridad operacional (Red Team y revisión de código por dos pares).',
        keyTakeaways: [
          'Capa de Hardware: Chips de seguridad propietarios Titan y validación criptográfica Secure Boot de la BIOS, kernel y SO base.',
          'Capa de Despliegue: Cifrado automático por defecto de todo el tráfico RPC entre centros de datos.',
          'Capa de Identidad: Desafíos contextuales por riesgo y obligatoriedad de llaves físicas de seguridad U2F.',
          'Capa de Almacenamiento: Cifrado en reposo por defecto (AES-256) antes de la escritura física y cifrado por hardware en discos.',
          'Capa de Internet: Terminación TLS con Perfect Forward Secrecy en el Google Front End (GFE) y absorción masiva de ataques DoS/DDoS.',
          'Capa Operacional: Auditorías continuas con Red Team, reducción de privilegios internos y revisión obligatoria por dos pares.',
        ],
      },
      {
        id: 'vid-60-7',
        title: 'Open Source Ecosystems',
        moduleName: 'Módulo 1: Introducción a Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=gYZGSrNffF8',
        youtubeId: 'gYZGSrNffF8',
        duration: '0:56',
        summary:
          'Estrategia de código abierto e interoperabilidad en Google Cloud para prevenir el bloqueo de proveedor (vendor lock-in). Destaca Kubernetes y GKE para portabilidad de microservicios, TensorFlow para inteligencia artificial y Google Cloud Observability para monitorizar cargas híbridas y multinube.',
        keyTakeaways: [
          'Prevención de Vendor Lock-in: Publicación de software con licencias abiertas para permitir portabilidad total a otras nubes o entornos locales.',
          'Kubernetes & GKE: Estándar de la industria en orquestación de contenedores creado por Google y transferido a la CNCF.',
          'TensorFlow: Ecosistema libre y abierto líder para entrenamiento y despliegue de modelos de Machine Learning.',
          'Google Cloud Observability: Monitorización y diagnóstico centralizado que abarca cargas de trabajo en GCP, AWS y on-premises.',
        ],
      },
      {
        id: 'vid-60-8',
        title: 'Pricing and Billing',
        moduleName: 'Módulo 1: Introducción a Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=OTD61ZfnO28',
        youtubeId: 'OTD61ZfnO28',
        duration: '3:20',
        summary:
          'Estructura de precios, modelos de facturación y gobernanza financiera en Google Cloud. Explica la facturación por segundo en Compute Engine y GKE, descuentos por uso continuo (SUD automáticos > 25%), Custom Machine Types, presupuestos con alertas y cuotas de proyecto (Rate Quotas vs Allocation Quotas).',
        keyTakeaways: [
          'Facturación por segundo: Aplicada en Compute Engine, GKE, Dataproc y App Engine Flex, optimizando el coste por segundo real de consumo.',
          'Sustained-Use Discounts (SUD): Descuentos automáticos de hasta el 30% aplicados al ejecutar VMs durante más del 25% del mes sin contratos.',
          'Custom Machine Types: Permite configurar cantidades exactas de vCPU y memoria para ajustar milimétricamente el presupuesto.',
          'Presupuestos y Alertas: Se configuran en la cuenta de facturación o proyecto con alertas típicas al 50%, 90% y 100% (¡las alertas NO apagan recursos automáticamente!).',
          'Cuotas de proyecto: Rate Quotas (límite de llamadas API con reinicio periódico) y Allocation Quotas (número máximo de recursos como 15 VPCs por proyecto).',
        ],
      },
      {
        id: 'vid-60-9',
        title: 'Google Cloud Resource Hierarchy',
        moduleName: 'Módulo 2: Recursos y Acceso en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=ecVv1L_TEo8',
        youtubeId: 'ecVv1L_TEo8',
        duration: '5:25',
        summary:
          'Estructura funcional de 4 niveles en Google Cloud: Recursos, Proyectos, Carpetas y Nodo de Organización. Detalla la herencia descendente de políticas de IAM, los tres identificadores de proyecto (ID inmutable, Nombre mutable, Número generado por Google), la API Resource Manager y la creación del nodo organización vía Google Workspace o Cloud Identity.',
        keyTakeaways: [
          '4 niveles jerárquicos (de abajo hacia arriba): Recursos → Proyectos → Carpetas (opcionales) → Nodo de Organización.',
          'Herencia descendente de políticas: Las políticas aplicadas a una carpeta u organización se heredan automáticamente en todos los proyectos y recursos subordinados (herencia aditiva e irrevocable en niveles inferiores).',
          'Identificadores de proyecto: Project ID (globalmente único e inmutable), Project Name (creado por el usuario, mutable, no requiere ser único) y Project Number (número asignado internamente por Google).',
          'Resource Manager API: Herramienta programática (RPC y REST) para listar, crear, actualizar, eliminar y recuperar (undelete) proyectos eliminados.',
          'Carpetas (Folders): Permiten agrupar proyectos por departamento o entorno (dev/prod) y delegar derechos administrativos a equipos independientes.',
          'Nodo de Organización (Organization Node): Nodo raíz del que cuelgan todas las carpetas y proyectos; roles clave incluyen Organization Policy Administrator y Project Creator. Se genera automáticamente con Google Workspace o mediante Cloud Identity.',
        ],
      },
      {
        id: 'vid-60-10',
        title: 'Identity and Access Management (IAM)',
        moduleName: 'Módulo 2: Recursos y Acceso en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=Di1T4RyO9yg',
        youtubeId: 'Di1T4RyO9yg',
        duration: '4:23',
        summary:
          'Control de acceso con Identity and Access Management (IAM). Define quién (principal: usuario, grupo, service account o dominio de Cloud Identity) puede hacer qué (roles con permisos agrupados) sobre cuáles recursos. Profundiza en políticas Deny (evaluadas antes que las Allow), roles básicos (Owner, Editor, Viewer, Billing Admin), roles predefinidos y roles personalizados bajo el principio de mínimo privilegio con sus restricciones de nivel.',
        keyTakeaways: [
          'Definición de IAM: Quién (Principal: cuenta Google, grupo, service account, dominio Cloud Identity) + Puede hacer qué (Rol: conjunto de permisos) + Sobre cuál recurso.',
          'Reglas Deny: IAM siempre evalúa las políticas Deny antes que las políticas Allow; si existe una regla Deny coincidente, el acceso se bloquea independientemente de los roles concedidos.',
          'Roles Básicos / Primitivos: Owner, Editor, Viewer y Billing Administrator. Tienen alcance amplio a nivel de proyecto (desaconsejados para entornos con datos sensibles por violar el principio de mínimo privilegio).',
          'Roles Predefinidos: Ofrecidos y mantenidos por Google para servicios específicos (ej. roles/compute.instanceAdmin). Se pueden aplicar a nivel de Organización, Carpeta o Proyecto.',
          'Roles Personalizados (Custom Roles): Diseñados para mínimo privilegio estricto (ej. permitir iniciar/detener VMs sin reconfigurarlas).',
          'Regla de oro ACE para Custom Roles: Solo se pueden aplicar a nivel de Proyecto o de Organización; NUNCA a nivel de Carpeta (Folder).',
        ],
      },
      {
        id: 'vid-60-11',
        title: 'Service Accounts',
        moduleName: 'Módulo 2: Recursos y Acceso en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=xoo5NfLqePY',
        youtubeId: 'xoo5NfLqePY',
        duration: '1:40',
        summary:
          'Autenticación y autorización máquina a máquina mediante Service Accounts. Permiten a las instancias de Compute Engine y aplicaciones acceder a servicios de Google Cloud (como Cloud Storage) sin intervención humana ni contraseñas. Explora su doble naturaleza fundamental: una Service Account es a la vez una Identidad (principal) y un Recurso asegurable con políticas IAM propias.',
        keyTakeaways: [
          'Doble naturaleza crítica en el examen ACE: Una Service Account actúa como IDENTIDAD (se le otorgan roles sobre recursos como Storage) y simultáneamente como RECURSO (se le adjuntan políticas de IAM para gobernar quién puede usarla o impersonarla).',
          'Identificador y autenticación: Se identifican mediante formato de correo electrónico (@<proyecto>.iam.gserviceaccount.com) y utilizan llaves criptográficas o tokens efímeros OAuth2 provistos por el servidor de metadatos de la VM, nunca contraseñas en código.',
          'Gobernanza de cuentas de servicio: Usuarios como administradores pueden tener roles como roles/iam.serviceAccountUser (para adjuntarla a VMs o actuar como ella) o Service Account Admin/Viewer (para listar y auditar).',
          'Eliminación de credenciales estáticas: Las mejores prácticas de Google Cloud exigen vincular service accounts a VMs en lugar de incrustar credenciales o claves privadas en discos locales.',
        ],
      },
      {
        id: 'vid-60-12',
        title: 'Cloud Identity',
        moduleName: 'Módulo 2: Recursos y Acceso en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=EZccX9nFaiI',
        youtubeId: 'EZccX9nFaiI',
        duration: '1:15',
        summary:
          'Gestión centralizada de identidades con Cloud Identity (IDaaS). Resuelve los riesgos de usar cuentas personales @gmail.com permitiendo a las organizaciones gobernar usuarios y grupos desde Google Admin Console, sincronizar con Active Directory o LDAP existente, y revocar accesos de inmediato cuando un empleado abandona la empresa.',
        keyTakeaways: [
          'IDaaS (Identity as a Service): Plataforma para gestionar usuarios, grupos y políticas de acceso mediante la consola Google Admin Console (admin.google.com).',
          'Riesgo de cuentas @gmail.com personales: Sin Cloud Identity, no existe desaprovisionamiento centralizado; si un colaborador sale de la empresa, retiene acceso a los recursos.',
          'Federación con Active Directory y LDAP: Permite a los usuarios acceder a Google Cloud con sus credenciales corporativas habituales usando Google Cloud Directory Sync (GCDS) y SAML 2.0 para Single Sign-On (SSO).',
          'Ediciones Free vs Premium: La edición Free incluye gestión básica de identidades y MFA; la edición Premium añade gestión de dispositivos móviles (MDM), acceso contextual y reglas avanzadas.',
          'Integración con Google Workspace: Si la organización ya utiliza Google Workspace, la infraestructura de Cloud Identity ya se encuentra integrada y habilitada en su consola de administración.',
        ],
      },
      {
        id: 'vid-60-13',
        title: 'Interacting with Google Cloud',
        moduleName: 'Módulo 2: Recursos y Acceso en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=lkchDTTMrZ8',
        youtubeId: 'lkchDTTMrZ8',
        duration: '3:40',
        summary:
          'Las 4 formas fundamentales de acceder e interactuar con Google Cloud: Google Cloud Console (GUI web con SSH en navegador y presupuestos), Google Cloud SDK y Cloud Shell (entorno Debian con 5 GB de almacenamiento persistente en $HOME y gcloud preinstalado), APIs REST con Google APIs Explorer y Client Libraries en 8 lenguajes, y la aplicación móvil Google Cloud App para supervisión, alertas e incidencias.',
        keyTakeaways: [
          'Google Cloud Console (Web GUI): Interfaz gráfica para desplegar, escalar y diagnosticar recursos, con buscador global, terminal SSH web para VMs y gestión de presupuestos.',
          'Google Cloud SDK: Suite de herramientas CLI alojadas en el directorio bin/ (incluye gcloud para infraestructura y bq para BigQuery).',
          'Cloud Shell (Pregunta obligada ACE): Entorno Linux Debian efímero pero con 5 GB de almacenamiento persistente en el directorio $HOME, pre-autenticado con las credenciales del usuario y con el SDK actualizado listo para usar sin instalación local.',
          'APIs & Client Libraries: Google APIs Explorer para probar endpoints de forma interactiva en la consola; librerías idiomáticas oficiales Cloud Client Libraries en 8 lenguajes (Java, Python, PHP, C#, Go, Node.js, Ruby, C++).',
          'Google Cloud Mobile App: Permite encender/apagar VMs de Compute Engine y bases de datos Cloud SQL, conectar por SSH a VMs, inspeccionar métricas y alertas de presupuesto, y gestionar App Engine (reversión de versiones y división de tráfico).',
        ],
      },
      {
        id: 'vid-60-14',
        title: 'Virtual Private Cloud networking',
        moduleName: 'Módulo 3: Máquinas Virtuales y Redes en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=SFRCZvJN650',
        youtubeId: 'SFRCZvJN650',
        duration: '2:17',
        summary:
          'Fundamentos de la red Virtual Private Cloud (VPC) en Google Cloud: arquitectura privada aislada sobre nube pública global, alcance global nativo de las redes VPC, subredes regionales que abarcan todas las zonas de una región, comunicación interna entre VMs en distintas zonas de una misma subred, expansión dinámica del rango CIDR sin afectar instancias en ejecución y control mediante reglas de cortafuegos y rutas estáticas.',
        keyTakeaways: [
          'VPC con Alcance Global (Global Scope): Las redes VPC en Google Cloud no están confinadas a una sola región; son recursos globales que interconectan servicios en todo el mundo sin necesidad de túneles VPN inter-región dentro del mismo proyecto.',
          'Subredes Regionales Multi-Zonales: Cada subred pertenece a una región geográfica concreta, pero abarca de forma transparente todas las zonas de disponibilidad de dicha región.',
          'Instancias en Distintas Zonas en la Misma Subred: Máquinas virtuales ubicadas en zonas físicas diferentes (ej. us-east1-b y us-east1-c) pueden ser vecinas en la misma subred e IP interna, facilitando alta disponibilidad sin complejidad de enrutamiento.',
          'Expansión Dinámica de Espacio IP (Subnet Expansion): El rango de direcciones IP de una subred puede incrementarse (expandirse a un prefijo de máscara menor como /24 -> /20) en caliente sin reiniciar ni interrumpir las VMs activas. Regla ACE: Solo se puede agrandar, nunca encoger.',
          'Aislamiento y Reglas de Cortafuegos: Reglas de firewall con estado (stateful) aplicables por etiquetas de red (network tags), cuentas de servicio o rangos CIDR para segmentar el tráfico con precisión.',
        ],
      },
      {
        id: 'vid-60-15',
        title: 'Compute Engine',
        moduleName: 'Módulo 3: Máquinas Virtuales y Redes en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=90pyGSKyPDQ',
        youtubeId: '90pyGSKyPDQ',
        duration: '3:45',
        summary:
          'Exploración integral de Compute Engine como solución de Infraestructura como Servicio (IaaS) en Google Cloud: aprovisionamiento de máquinas virtuales (Linux, Windows o imágenes personalizadas), despliegues con un clic mediante Cloud Marketplace, alto rendimiento por defecto con Persistent Disks, dimensionamiento a medida con Custom Machine Types y las cuatro palancas clave de facturación y optimización de costes (por segundo, Sustained-Use Discounts automáticos, Committed-Use Discounts por 1/3 años y Spot VMs con hasta 90% de ahorro).',
        keyTakeaways: [
          'Compute Engine IaaS: Capacidad de cómputo elástica con control total del sistema operativo y configuración de hardware virtualizado sin inversión inicial de capital (CapEx -> OpEx).',
          'Sustained-Use Discounts (SUD): Descuentos automáticos aplicados por Compute Engine cuando una VM se ejecuta por más del 25% de un mes de facturación, sin necesidad de compromiso previo.',
          'Committed-Use Discounts (CUD): Descuentos de hasta el 57% para cargas de trabajo predecibles y continuas a cambio de compromisos de uso a 1 o 3 años.',
          'Spot VMs vs Preemptible (Pregunta Crítica ACE): Las Spot VMs ofrecen hasta un 90% de ahorro y NO tienen el límite de 24 horas que tenían las Preemptible clásicas. Pueden correr indefinidamente siempre que haya capacidad excedente, con una notificación de revocación previa de 30 segundos si Google necesita la capacidad.',
          'Custom Machine Types: Permite seleccionar la cantidad exacta de vCPUs y memoria RAM requeridas por la aplicación, evitando pagar por recursos sobredimensionados de familias estándar.',
        ],
      },
      {
        id: 'vid-60-16',
        title: 'Scaling virtual machines',
        moduleName: 'Módulo 3: Máquinas Virtuales y Redes en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=YQK8u563me4',
        youtubeId: 'YQK8u563me4',
        duration: '1:15',
        summary:
          'Mecanismos de escalado y elasticidad en Compute Engine: autoscaling dinámico basado en métricas de carga, integración obligatoria con Cloud Load Balancing en Google VPC para distribuir tráfico, contraste arquitectónico entre Scale-out (escalado horizontal recomendado) y Scale-up (escalado vertical con VMs gigantes para bases de datos en memoria), y la restricción de cuotas de vCPU dependientes de la zona (zone-dependent quotas) que rigen el dimensionamiento de las familias de máquinas.',
        keyTakeaways: [
          'Autoscaling en Compute Engine: Agrega o retira instancias automáticamente según la carga (uso de CPU, capacidad de balanceo de carga o métricas de Cloud Monitoring).',
          'Sinergia con Cloud Load Balancing: El escalado horizontal requiere balanceo de carga en VPC para repartir el tráfico entrante uniformemente y dirigir peticiones solo a VMs saludables.',
          'Scale-out vs Scale-up: Aunque Compute Engine permite configurar VMs masivas (cientos de vCPUs y terabytes de RAM para analítica y bases de datos en memoria), el enfoque recomendado y estándar en Google Cloud es el escalado horizontal (scale-out) con grupos de instancias para maximizar resiliencia y optimizar costes.',
          'Familias de Máquinas y Cuotas por Zona (Regla ACE): El límite de vCPUs por VM está ligado a su familia de máquina y fuertemente condicionado por la cuota asignada al proyecto en cada zona específica (zone-dependent quota).',
        ],
      },
      {
        id: 'vid-60-17',
        title: 'Important VPC compatibilities',
        moduleName: 'Módulo 3: Máquinas Virtuales y Redes en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=UtNlJbm8s2Q',
        youtubeId: 'UtNlJbm8s2Q',
        duration: '1:30',
        summary:
          'Capacidades clave de compatibilidad e interconexión en Google Virtual Private Cloud (VPC): tablas de enrutamiento distribuidas nativas sin routers virtuales ni físicos, cortafuegos global con estado y filtrado flexible mediante Network Tags, comunicación privada inter-VPC con VPC Network Peering (no transitivo) y arquitectura empresarial centralizada con Shared VPC (separación de Host Project administrado por redes y Service Projects para desarrolladores con roles IAM granulares).',
        keyTakeaways: [
          'Enrutamiento Nativo sin Routers: Las VPCs disponen de tablas de enrutamiento globales automáticas que reenvían tráfico internamente entre instancias, subredes y zonas sin requerir IP externa.',
          'Firewall Global y Network Tags: Reglas de firewall con estado aplicadas a nivel de red virtual que permiten filtrar tráfico entrante y saliente por etiquetas de red (ej. permitir HTTP/HTTPS solo a VMs con tag "web") o por Service Accounts.',
          'VPC Network Peering: Interconecta directamente dos redes VPC para intercambiar tráfico interno privado con mínima latencia sin pasar por internet. Regla ACE: Es no transitivo y los rangos CIDR no deben solaparse.',
          'Shared VPC (VPC Compartida): Permite a una organización designar un Host Project que posee la red y subredes, y asociar Service Projects donde los desarrolladores despliegan instancias usando el rol compute.networkUser sin poder alterar la arquitectura de red ni los firewalls.',
        ],
      },
      {
        id: 'vid-60-18',
        title: 'Cloud Load Balancing',
        moduleName: 'Módulo 3: Máquinas Virtuales y Redes en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=HWJQ3LNagXc',
        youtubeId: 'HWJQ3LNagXc',
        duration: '2:55',
        summary:
          'Fundamentos de Cloud Load Balancing en Google Cloud: servicio distribuido definido por software (SDN) sin máquinas virtuales que administrar y sin necesidad de pre-calentamiento (no pre-warming), failover multi-región automático con IP Anycast global única, Application Load Balancers (Capa 7 HTTP/HTTPS como reverse proxy con enrutamiento de contenido) y Network Load Balancers (Capa 4 divididos en Proxy para terminación TCP/SSL y Passthrough para preservación de IP origen del cliente y Direct Server Return).',
        keyTakeaways: [
          'Sin Pre-calentamiento (No Pre-warming): Cloud Load Balancing escala de manera instantánea ante aumentos súbitos de carga sin necesidad de solicitar tickets de calentamiento previo a Google.',
          'Failover Multi-Región Automático: Provee una única dirección IP Anycast global que redirige el tráfico fraccionalmente hacia regiones sanas si los backends locales se degradan.',
          'Application Load Balancers (L7): Operan como reverse proxies a nivel de aplicación (HTTP/HTTPS) soportando enrutamiento por URL, terminación SSL administrada y backends externos o internos.',
          'Proxy vs Passthrough Network Load Balancers (L4): Los Proxy NLBs terminan la conexión TCP/SSL y admiten backends híbridos (NEGs); los Passthrough NLBs no alteran los paquetes, preservando la IP origen del cliente con Direct Server Return (DSR).',
        ],
      },
      {
        id: 'vid-60-19',
        title: 'Cloud DNS and Cloud CDN',
        moduleName: 'Módulo 3: Máquinas Virtuales y Redes en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=TYB1cur47mk',
        youtubeId: 'TYB1cur47mk',
        duration: '1:45',
        summary:
          'Servicios de aceleración y resolución de red en Google Cloud: Cloud DNS como servicio autoritativo global 100% gestionado (Anycast con 100% SLA, zonas públicas y privadas programables vía CLI, API y consola) y Cloud CDN para acelerar la entrega de contenido web estático y dinámico mediante Edge Caches en más de 100 PoPs de Google, reduciendo latencia, aliviando la carga en servidores de origen y ahorrando en costes de egress con activación directa sobre External Application Load Balancers.',
        keyTakeaways: [
          'Cloud DNS Autoritativo (100% SLA): A diferencia de 8.8.8.8 (resolvedor recursivo público), Cloud DNS aloja las zonas y registros autoritativos de tus aplicaciones sobre la red Anycast mundial de Google.',
          'Zonas Públicas vs Privadas: Soporta zonas públicas visibles en internet y zonas privadas restringidas a redes VPC específicas para resolver nombres de dominios internos sin exponer IPs.',
          'Cloud CDN y Edge Caching: Almacena en caché contenido estático y dinámico en los más de 100 puntos de presencia (PoPs) globales de Google para minimizar la latencia del cliente.',
          'Descarga de Origen y Ahorro en Egress: Alivia la carga en instancias Compute Engine / Cloud Storage y reduce significativamente los costes de transferencia de datos de salida.',
          'Habilitación con 1 Clic y CDN Interconnect: Se activa con una sola casilla de verificación en el backend service de un External ALB, y soporta CDN Interconnect para clientes con CDNs de terceros.',
        ],
      },
      {
        id: 'vid-60-20',
        title: 'Connecting networks to Google VPC',
        moduleName: 'Módulo 3: Máquinas Virtuales y Redes en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=g24UStCvpQg',
        youtubeId: 'g24UStCvpQg',
        duration: '5:45',
        summary:
          'Opciones de interconexión híbrida y multi-cloud con Google Virtual Private Cloud (VPC): Cloud VPN con Cloud Router para enrutamiento dinámico BGP sobre túneles IPsec, Direct Peering y Carrier Peering para acceso optimizado a IPs públicas de Google (sin SLA), Dedicated Interconnect (circuitos directos de 10G/100G) y Partner Interconnect (circuitos sub-10G a través de proveedores) para tráfico privado RFC 1918 con hasta 99.99% de SLA, y Cross-Cloud Interconnect para enlaces directos con AWS, Azure u otros proveedores cloud sin hardware intermedio.',
        keyTakeaways: [
          'Cloud VPN y Cloud Router (BGP): Proporciona conectividad privada sobre internet mediante IPsec; Cloud Router intercambia rutas dinámicamente con BGP, propagando nuevas subredes automáticamente sin intervención manual ni cortes.',
          'Direct vs Carrier Peering (Sin SLA): Conexión directa a IPs públicas de Google (Workspace y APIs). No da acceso a IPs privadas de VPCs y carece de SLA por parte de Google.',
          'Dedicated Interconnect (10G/100G): Conexión de fibra física directa en colocación; garantiza hasta 99.99% SLA en topología de alta disponibilidad recomendada con 4 circuitos en 2 áreas metropolitanas.',
          'Partner Interconnect (Sub-10G): Extensión de VPC mediante un operador asociado, ideal para empresas sin presencia física en colocaciones de Google o con demandas de 50 Mbps a 10 Gbps.',
          'Cross-Cloud Interconnect: Enlace físico dedicado gestionado por Google entre su red y la de otro proveedor cloud (AWS/Azure) con capacidades de 10G o 100G.',
        ],
      },
      {
        id: 'vid-60-21',
        title: 'Google Cloud storage options',
        moduleName: 'Módulo 4: Almacenamiento en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=8Dn-RAP7fzA',
        youtubeId: '8Dn-RAP7fzA',
        duration: '0:45',
        summary:
          'Apertura del Módulo 4 de Almacenamiento en Google Cloud. Clasificación integral de soluciones según el tipo de datos (estructurados, no estructurados, relacionales, transaccionales y analíticos) y presentación de los 5 servicios núcleo: Cloud Storage (objetos y binarios no estructurados), Cloud SQL (bases de datos relacionales gestionadas MySQL/PostgreSQL/SQL Server), Cloud Spanner (base de datos relacional global con consistencia fuerte y autoescalado horizontal ilimitado), Firestore (base de datos de documentos NoSQL en tiempo real serverless) y Cloud Bigtable (base de datos NoSQL columnar de baja latencia para analítica masiva y series temporales).',
        keyTakeaways: [
          'Taxonomía Universal de Datos: Google Cloud ofrece soluciones optimizadas para datos estructurados (tablas/documentos), no estructurados (archivos binarios/multimedia), relacionales (SQL), transaccionales (ACID) y analíticos (series temporales/grandes volúmenes).',
          'Los 5 Servicios Núcleo: Cloud Storage (objetos), Cloud SQL (relacional regional), Cloud Spanner (relacional global masivo), Firestore (documentos NoSQL para apps móviles/web) y Cloud Bigtable (NoSQL columnar sub-10ms).',
          'Persistencia Políglota (Polyglot Persistence): Las arquitecturas empresariales combinan múltiples motores de almacenamiento complementarios para maximizar eficiencia de coste y rendimiento técnico.',
          'Regla de Decisión para el Examen ACE: Diferenciar entre datos no estructurados (Cloud Storage), relacionales con transacciones ACID (Cloud SQL vs Spanner), documentos en tiempo real (Firestore) y petabytes analíticos de baja latencia (Bigtable).',
        ],
      },
      {
        id: 'vid-60-22',
        title: 'Cloud Storage',
        moduleName: 'Módulo 4: Almacenamiento en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=pLMkOa4FbwI',
        youtubeId: 'pLMkOa4FbwI',
        duration: '4:23',
        summary:
          'Arquitectura y fundamentos de Cloud Storage como solución totalmente gestionada de almacenamiento de objetos (BLOBs) de alta durabilidad y disponibilidad. Diferenciación entre almacenamiento de objetos (paquetes con datos binarios, metadatos y clave URL global única), almacenamiento en bloques y sistemas de archivos. Organización en buckets con nombres únicos a nivel mundial y selección de ubicación geográfica para minimizar latencia. Inmutabilidad de los objetos y gestión de versiones (Object Versioning para registro histórico, restauración y eliminación selectiva). Mecanismos de seguridad y control de accesos: IAM (herencia de proyecto a bucket a objeto con Uniform Bucket-Level Access) vs ACLs (granularidad por objeto con scope y permission). Políticas de ciclo de vida (Object Lifecycle Management) para optimizar costes automáticamente eliminando versiones antiguas o transicionando clases.',
        keyTakeaways: [
          'Almacenamiento de Objetos vs Bloques vs Archivos: Los objetos son paquetes de datos binarios, metadatos y una clave única en formato URL, a diferencia de los bloques de disco formateados o las jerarquías de directorios compartidos.',
          'Buckets con Espacio de Nombres Global Único: Los buckets deben tener nombres únicos en todo Google Cloud a escala mundial y su ubicación geográfica debe seleccionarse estratégicamente para minimizar la latencia de acceso de los usuarios.',
          'Inmutabilidad y Object Versioning: Los objetos no se editan in-situ; las modificaciones crean versiones. Por defecto se sobrescriben, pero al activar Object Versioning se preserva el historial de cambios, permitiendo restaurar o listar versiones anteriores.',
          'Control de Acceso: IAM vs ACLs: Para la mayoría de los casos se recomienda IAM con Uniform Bucket-Level Access (UBLA), donde las políticas se heredan por jerarquía. Las ACLs se reservan para control fino por objeto individual mediante scope y permission.',
          'Políticas de Ciclo de Vida (Lifecycle Management): Automatizan la eliminación o degradación de clases de objetos basándose en condiciones como antigüedad (age > 365 días), fecha de creación o retención de un número específico de versiones.',
        ],
      },
      {
        id: 'vid-60-23',
        title: 'Cloud Storage: Storage classes and data transfer',
        moduleName: 'Módulo 4: Almacenamiento en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=A5a8sPL6PjY',
        youtubeId: 'A5a8sPL6PjY',
        duration: '4:35',
        summary:
          'Exploración detallada de las cuatro clases de almacenamiento en Cloud Storage (Standard, Nearline, Coldline y Archive), sus perfiles de frecuencia de acceso y plazos de permanencia mínima. Homogeneidad técnica de todas las clases: latencia de milisegundos sin descongelación previa, durabilidad de 11 nueves y geo-redundancia en ubicaciones multi-región o dual-region. Optimización autónoma de costes mediante Autoclass (transición bidireccional entre clases según lectura de objetos). Seguridad integral con cifrado automático del lado del servidor (GMEK/CMEK) en reposo y HTTPS/TLS en tránsito. Opciones de ingestión y transferencia de datos: operaciones diarias con gcloud storage, cargas web en Cloud Console, Storage Transfer Service para importaciones batch masivas por red desde otros proveedores cloud (AWS/Azure) o buckets, y Transfer Appliance para migraciones físicas seguras de hasta petabytes sin saturar el ancho de banda.',
        keyTakeaways: [
          'Las 4 Clases de Almacenamiento: Standard (hot data, sin permanencia mínima), Nearline (acceso mensual, mínimo 30 días), Coldline (acceso trimestral, mínimo 90 días) y Archive (acceso anual, mínimo 365 días con las tarifas más bajas de reposo).',
          'Latencia en Milisegundos Universal: A diferencia de otros proveedores cloud, en Cloud Storage todas las clases (incluyendo Coldline y Archive) devuelven el primer byte en milisegundos sin tiempo de espera para descongelar datos.',
          'Autoclass para Optimización de Costes: Ajusta dinámicamente la clase de cada objeto degradándolo a clases frías por inactividad y promoviéndolo de inmediato a Standard al ser accedido, sin necesidad de definir complejas reglas manuales.',
          'Cifrado Transparente: Todo dato se cifra automáticamente en reposo del lado del servidor antes de escribirse en disco y viaja cifrado en tránsito por HTTPS/TLS sin coste extra.',
          'Transferencia de Datos a Escala: gcloud storage para tareas operativas comunes; Storage Transfer Service para transferencias online programadas desde AWS/Azure/buckets; Transfer Appliance (hasta 1 PB) para envíos físicos de petabytes cuando el ancho de banda es el cuello de botella.',
        ],
      },
      {
        id: 'vid-60-24',
        title: 'Cloud SQL',
        moduleName: 'Módulo 4: Almacenamiento en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=yE-k0odGRzk',
        youtubeId: 'yE-k0odGRzk',
        duration: '2:01',
        summary:
          'Presentación técnica y operativa de Cloud SQL como servicio gestionado de bases de datos relacionales (MySQL, PostgreSQL y SQL Server). Descarga integral de responsabilidades operativas hacia Google: aplicación de parches, copias de seguridad continuas y configuración de replicación de datos sin instalación ni mantenimiento manual de software. Capacidades máximas de escalabilidad vertical (hasta 128 vCPUs, 864 GB de RAM y 64 TB de almacenamiento con auto-incremento). Escenarios de replicación automatizada (réplicas de lectura, réplicas externas e integración con primarios externos). Gobernanza de respaldos gestionados con 7 copias automáticas incluidas en el coste base. Cifrado integral de datos en reposo, en redes internas y en tránsito. Conectividad segura e interoperabilidad con App Engine (mediante drivers estándar Connector/J o MySQLdb), Compute Engine (co-ubicación en la misma zona para latencia mínima y Private IP) y herramientas de administración estándar como SQL Workbench y Toad.',
        keyTakeaways: [
          'Bases de Datos Relacionales Totalmente Administradas: Soporta motores estándar del mercado (MySQL, PostgreSQL y SQL Server), eliminando tareas de mantenimiento del SO, parches y administración de infraestructura.',
          'Límites de Escalado Vertical: Escala hasta 128 vCPUs, 864 GB de memoria RAM y 64 TB de almacenamiento con discos persistentes y auto-incremento dinámico de capacidad.',
          'Replicación y Respaldos Automatizados: Incluye 7 copias de seguridad automáticas en el coste base de la instancia y soporta réplicas de lectura para descarga de tráfico, replicación entre regiones y replicación con bases de datos externas.',
          'Seguridad y Cifrado de Extremo a Extremo: Cifrado en reposo para tablas, archivos temporales y copias de seguridad; cifrado en tránsito en redes internas de Google; y control de acceso mediante cortafuegos de red, Redes Autorizadas y Private IP.',
          'Conectividad con GCP y Co-ubicación: Conexión nativa con Compute Engine y App Engine; se recomienda co-ubicar la instancia de Cloud SQL en la misma zona que las VMs clientes para minimizar la latencia de red.',
        ],
      },
      {
        id: 'vid-60-25',
        title: 'Spanner',
        moduleName: 'Módulo 4: Almacenamiento en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=uxmBbmv7Av0',
        youtubeId: 'uxmBbmv7Av0',
        duration: '0:45',
        summary:
          'Fundamentos de Cloud Spanner como servicio de base de datos relacional global distribuida y totalmente gestionada. Combina la potencia del modelo relacional con lenguaje SQL estándar (consultas JOIN complejas e índices secundarios) y la escalabilidad horizontal masiva sin límites de capacidad. Garantiza consistencia externa estricta respaldada por la tecnología TrueTime de Google y ofrece alta disponibilidad nativa de hasta 99.999% en configuraciones multi-región. Diseñado y probado en los sistemas de misión crítica de Google para soportar decenas de miles a millones de operaciones de lectura y escritura por segundo (IOPS) con latencias de un solo dígito de milisegundo.',
        keyTakeaways: [
          'Relacional con Escalado Horizontal: Supera las restricciones de las bases de datos relacionales tradicionales al permitir escalabilidad horizontal elástica (scale-out) sin sharding manual ni tiempo de inactividad.',
          'Consistencia Fuerte Externa: Proporciona consistencia estricta en transacciones distribuidas globales respaldada por la API TrueTime de sincronización horaria de Google.',
          'Soporte SQL Estándar: Ofrece capacidades completas de RDBMS con transacciones ACID distribuidas, esquemas relacionales, joins y secondary indexes.',
          'Rendimiento de Misión Crítica: Soporta decenas de miles de IOPS de lectura/escritura por segundo y disponibilidad de hasta 99.999% (cinco nueves) en despliegues multi-región.',
          'Regla de Oro ACE: Elegir Cloud Spanner cuando los requerimientos exijan una base de datos relacional (SQL/ACID) que deba operar a escala multi-región o global con más de 64 TB o alta concurrencia de escrituras.',
        ],
      },
      {
        id: 'vid-60-26',
        title: 'Firestore',
        moduleName: 'Módulo 4: Almacenamiento en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=Q1kSFl1LYMc',
        youtubeId: 'Q1kSFl1LYMc',
        duration: '1:21',
        summary:
          'Arquitectura y fundamentos de Firestore como base de datos de documentos NoSQL completamente sin servidor (serverless) y de autoescalado horizontal para desarrollo móvil, web y backend. Estructuración jerárquica de datos en documentos (pares clave-valor y objetos anidados) organizados en colecciones y subcolecciones. Consultas NoSQL avanzadas con filtrado encadenado e indexación automática por defecto, asegurando que el rendimiento de consulta sea proporcional al tamaño del conjunto de resultados devuelto y no al volumen total de la base de datos. Capacidades reactivas de sincronización bidireccional de datos en tiempo real entre dispositivos conectados y persistencia en caché local offline con sincronización automática al reconectar. Infraestructura con replicación multi-región, consistencia fuerte, operaciones atómicas en lote y transacciones ACID reales.',
        keyTakeaways: [
          'Base de Datos de Documentos NoSQL Serverless: Almacena información en documentos con pares clave-valor y objetos jerárquicos agrupados en colecciones y subcolecciones sin gestión de servidores.',
          'Indexación Automática y Rendimiento Predecible: Todos los campos se indexan automáticamente; el tiempo de consulta depende estrictamente del número de resultados devueltos, no del volumen total de datos en la colección.',
          'Sincronización en Tiempo Real y Modo Offline: Ofrece listeners reactivos para actualizar clientes conectados instantáneamente y caché local persistente que permite a la app operar sin conexión y sincronizar cambios automáticamente al reconectarse.',
          'Garantías Transaccionales Fuertes: A diferencia de otros motores NoSQL tradicionales, Firestore proporciona consistencia fuerte, escrituras atómicas en lote (batched writes) y soporte completo para transacciones ACID.',
          'Caso Predilecto de Examen ACE: Elegir Firestore para aplicaciones móviles y web con usuarios concurrentes que requieran sincronización en vivo, soporte offline local y almacenamiento de perfiles de usuario o catálogos flexibles.',
        ],
      },
      {
        id: 'vid-60-27',
        title: 'Bigtable',
        moduleName: 'Módulo 4: Almacenamiento en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=bfztO0_4fhw',
        youtubeId: 'bfztO0_4fhw',
        duration: '2:01',
        summary:
          'Exploración integral de Cloud Bigtable como servicio de base de datos NoSQL de columnas anchas para cargas masivas de Big Data. Motor probado que sustenta servicios críticos de Google como Search, Analytics, Maps y Gmail. Diseñado para ofrecer latencia consistente inferior a 10 ms y altísimo rendimiento de lectura/escritura (throughput). Criterios oficiales de selección: grandes volúmenes de datos (> 1 TB), alta velocidad y cambios rápidos, transacciones NoSQL simples a nivel de fila, series temporales u ordenación semántica natural, procesamiento batch/streaming concurrente y entrenamiento de machine learning. Integración con el ecosistema analítico mediante la API estándar de Apache HBase, Dataflow Streaming, Spark Streaming, Hadoop MapReduce y exportaciones hacia almacenes analíticos aguas abajo.',
        keyTakeaways: [
          'Base de Datos NoSQL Columnar para Big Data: Diseñada específicamente para manejar petabytes de datos estructurados y semiestructurados con latencias predecibles sub-10 milisegundos.',
          'Regla de Decisión del Umbral de 1 TB: Bigtable es costo-eficiente para conjuntos de datos que superan 1 TB; para volúmenes menores, Firestore o Cloud SQL resultan más adecuados económicamente.',
          'Series Temporales y Streaming IoT: Ideal para telemetría de sensores, cotizaciones financieras y logs continuos que requieren ingesta masiva con alto throughput de escrituras ordenadas secuencialmente.',
          'Desacoplamiento de Cómputo y Almacenamiento: El cómputo (nodos que enrutan peticiones) está separado del almacenamiento (Colossus), permitiendo escalar el procesamiento en segundos sin mover datos.',
          'Compatibilidad con Apache HBase y Ecosistema Big Data: Admite la API estándar de HBase y se integra bidireccionalmente con Dataflow, Apache Spark y Apache Storm para flujos analíticos batch y streaming.',
        ],
      },
      {
        id: 'vid-60-28',
        title: 'Comparing storage options',
        moduleName: 'Módulo 4: Almacenamiento en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=jAPJ_aVxCbQ',
        youtubeId: 'jAPJ_aVxCbQ',
        duration: '2:15',
        summary:
          'Comparativa integral de las opciones de almacenamiento en Google Cloud para seleccionar el servicio óptimo según el caso de uso y restricciones arquitectónicas. Cloud Storage para blobs inmutables mayores a 10 MB con capacidad en petabytes y objetos de hasta 5 TB. Criterio de selección entre Cloud SQL (hasta 64 TB para aplicaciones transaccionales y web estándar) y Cloud Spanner (escalabilidad horizontal en petabytes para OLTP global). Firestore para aplicaciones móviles y web con documentos de hasta 1 MB, sincronización reactiva en tiempo real y soporte offline. Cloud Bigtable para Big Data estructurado en petabytes con límites de 10 MB por celda y 100 MB por fila, sin soporte SQL ni transacciones multifila. Rol de BigQuery como almacén de datos y motor analítico masivo interactivo (OLAP).',
        keyTakeaways: [
          'Restricciones por Unidad: Cloud Storage admite objetos de hasta 5 TB (ideal > 10 MB); Firestore tiene un límite estricto de 1 MB por documento; Bigtable permite hasta 10 MB por celda y 100 MB por fila.',
          'Cloud SQL vs Cloud Spanner: Cloud SQL soporta hasta 64 TB para OLTP en una región; Cloud Spanner escala horizontalmente a escala de petabytes con transacciones ACID globales y disponibilidad 99.999%.',
          'Firestore para Apps Clientes: Solución óptima para desarrollo móvil/web que requiera sincronización en tiempo real y persistencia local sin conexión a internet.',
          'Cloud Bigtable para Analítica Pesada NoSQL: Motor columnar diseñado para ingesta masiva de IoT y AdTech sin operaciones JOIN ni transacciones multi-fila.',
          'Rol de BigQuery: Posicionado en la frontera entre almacenamiento y computación analítica, seleccionado exclusivamente para analítica OLAP y consultas complejas sobre grandes volúmenes.',
        ],
      },
      {
        id: 'vid-60-29',
        title: 'Introduction to containers',
        moduleName: 'Módulo 5: Contenedores en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=fkyu-gVr4IU',
        youtubeId: 'fkyu-gVr4IU',
        duration: '2:56',
        summary:
          'Apertura del Módulo 5 sobre contenedores y Kubernetes en Google Cloud. Comparativa técnica entre la virtualización de hardware en IaaS (VMs pesadas con sistema operativo invitado completo y arranque en minutos) y la virtualización del sistema operativo mediante contenedores (empaquetado ligero de código y dependencias compartiendo el kernel del host con arranque en segundos). Beneficios clave de los contenedores: portabilidad extrema de código (del desarrollo local a producción sin recompilar), alta densidad de empaquetado en un solo host y habilitación de arquitecturas de microservicios con escalado horizontal independiente. Introducción a Google Kubernetes Engine (GKE) como el puente que une la automatización declarativa de PaaS con el control granular de infraestructura de IaaS.',
        keyTakeaways: [
          'Virtualización de SO vs Hardware: Los contenedores virtualizan el sistema operativo compartiendo el kernel del host mediante namespaces y cgroups, arrancando en segundos como un proceso ordinario frente a los minutos que requiere una VM en IaaS.',
          'Portabilidad Extrema: Un contenedor empaqueta el código y todas sus dependencias en una caja lógica aislada, permitiendo ejecutar la misma imagen idéntica desde la laptop hasta entornos de producción cloud sin cambios.',
          'Alta Densidad y Eficiencia: Al no duplicar el sistema operativo invitado, un único host puede ejecutar decenas o cientos de contenedores concurrentes maximizando el aprovechamiento de CPU y RAM.',
          'Arquitectura de Microservicios: Facilita descomponer aplicaciones complejas en componentes modulares que escalan independientemente y se comunican a través de la red.',
          'GKE como Puente IaaS/PaaS: Google Kubernetes Engine combina la facilidad de autoescalado, auto-reparación y orquestación de PaaS con la personalización profunda de recursos y redes de IaaS.',
        ],
      },
      {
        id: 'vid-60-30',
        title: 'Kubernetes',
        moduleName: 'Módulo 5: Contenedores en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=4NTyB0eEB_A',
        youtubeId: '4NTyB0eEB_A',
        duration: '5:09',
        summary:
          'Exploración profunda de la plataforma open-source Kubernetes y su implementación administrada en Google Cloud a través de Google Kubernetes Engine (GKE). Análisis de la arquitectura de clúster dividida en el Plano de Control (Control Plane) y los Nodos de trabajo (VMs de Compute Engine en GKE). Definición del Pod como la unidad atómica mínima desplegable que envuelve uno o más contenedores estrechamente interdependientes (patrón sidecar) compartiendo IP única, puertos y almacenamiento. Funcionamiento de los Deployments para garantizar resiliencia, auto-reparación de réplicas ante fallos de nodos y autoescalado horizontal (HPA). Rol crucial de los Services como abstracciones de red que proporcionan direcciones IP y endpoints estables frente a la naturaleza efímera de los Pods, desacoplando frontend de backend y aprovisionando automáticamente Network Load Balancers (NLB) externos con IP pública en GKE. Comparativa entre el paradigma imperativo (kubectl run/scale) y declarativo (manifiestos YAML con kubectl apply) y gestión de Rolling Updates para despliegues continuos sin tiempo de inactividad (zero downtime).',
        keyTakeaways: [
          'Arquitectura de Clúster en GKE: Se compone del Control Plane (gestión centralizada y reconciliación de estado) y Nodos de trabajo, los cuales en Google Cloud son máquinas virtuales de Compute Engine gestionadas por el clúster.',
          'El Pod como Unidad Atómica: Es la unidad básica mínima de despliegue en Kubernetes. Envuelve contenedores que comparten la misma dirección IP de red, rango de puertos y volúmenes montados; solo se agrupan múltiples contenedores si existe dependencia estricta (sidecars).',
          'Deployments y Resiliencia (Self-Healing): Gestionan conjuntos de réplicas idénticas de Pods; si un nodo de cómputo falla, el Deployment reprograma automáticamente los Pods perdidos en otros nodos sanos del clúster.',
          'Services y Desacoplamiento de Red: Abstracción que asigna un endpoint y dirección IP estable (inmutable) a un conjunto dinámico de Pods efímeros; al exponer un Service como LoadBalancer en GKE, se crea automáticamente un Network Load Balancer (NLB) de Google Cloud con IP pública.',
          'Enfoque Declarativo y Rolling Updates: En producción se utiliza la especificación declarativa en manifiestos YAML aplicados con kubectl apply; las actualizaciones de versiones se realizan progresivamente mediante Rolling Updates garantizando cero tiempo de inactividad.',
        ],
      },
      {
        id: 'vid-60-31',
        title: 'Google Kubernetes Engine',
        moduleName: 'Módulo 5: Contenedores en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=HMcFwcqNjOY',
        youtubeId: 'HMcFwcqNjOY',
        duration: '3:03',
        summary:
          'Presentación formal de Google Kubernetes Engine (GKE) como el servicio gestionado de Kubernetes en Google Cloud. Análisis de la abstracción del Control Plane, administrado íntegramente por Google para garantizar alta disponibilidad y respaldos sin complejidad operativa. Comparativa exhaustiva entre los modos de operación: GKE Autopilot (modo recomendado por Google, gestión desatendida de infraestructura, seguridad robusta por defecto y facturación exclusiva por recursos solicitados por Pods) y GKE Standard (control granular sobre nodos individuales, configuración manual y facturación por VMs de Compute Engine). Exploración de capacidades empresariales avanzadas de clúster: integración nativa con Cloud Load Balancing, segmentación en Node pools heterogéneos, autoescalado automático de nodos (Cluster Autoscaler), actualizaciones automáticas (Node auto-upgrades), auto-reparación de VMs degradadas (Node auto-repair) y observabilidad integrada con Google Cloud Observability. Sintaxis esencial de gcloud para la creación de clústeres Autopilot y Standard.',
        keyTakeaways: [
          'Control Plane Administrado: GKE elimina la complejidad de gestionar etcd y los componentes maestros de Kubernetes, ofreciendo un endpoint seguro con SLAs de alta disponibilidad respaldados por Google Cloud.',
          'Autopilot vs Standard: Autopilot es el modo recomendado para producción donde Google gestiona nodos, actualizaciones, autoescalado y seguridad base, cobrando únicamente por Pods solicitados. Standard ofrece control granular a costa de gestionar manualmente las VMs de los nodos.',
          'Cluster Autoscaler: Incrementa o reduce automáticamente la cantidad de máquinas virtuales (nodos) del clúster en función de la demanda y capacidad requerida por los Pods pendientes de programación.',
          'Auto-Repair y Auto-Upgrade: GKE monitorea la salud de los nodos y reemplaza automáticamente aquellos que fallen los chequeos de salud (auto-repair), manteniendo el software del nodo parcheado y actualizado (auto-upgrades).',
          'Comando CLI create-auto: Para desplegar un clúster Autopilot en producción se utiliza `gcloud container clusters create-auto <nombre> --region <region>`.',
        ],
      },
      {
        id: 'vid-60-32',
        title: 'Cloud Run',
        moduleName: 'Módulo 6: Desarrollo de Aplicaciones en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=R3Ec_4tC3oc',
        youtubeId: 'R3Ec_4tC3oc',
        duration: '3:50',
        summary:
          'Introducción a Cloud Run como plataforma de cómputo serverless administrada para ejecutar contenedores sin estado (stateless) activados por solicitudes web HTTP/HTTPS o eventos de Cloud Pub/Sub. Construida sobre Knative (estándar abierto de Kubernetes), ofrece portabilidad absoluta entre Cloud Run gestionado en GCP, clústeres de GKE o entornos híbridos. Resalta su autoescalado instantáneo a cero réplicas en inactividad, su modelo de facturación por uso real con granularidad de 100 milisegundos más tarifa por millón de peticiones (coste cero en reposo), certificados SSL/TLS automáticos y el flujo de desarrollo en 3 pasos: codificación de la aplicación web escuchando en PORT, empaquetado en contenedor (Dockerfile o Cloud Buildpacks) y despliegue hacia Artifact Registry y Cloud Run. Admite cualquier binario compilado para Linux de 64 bits en lenguajes modernos y tradicionales.',
        keyTakeaways: [
          'Plataforma Serverless sobre Knative: Cloud Run abstrae totalmente la infraestructura y balanceadores de carga, permitiendo ejecutar contenedores sin estado con portabilidad multi-nube gracias al estándar abierto Knative.',
          'Escalado a Cero y Cobro por 100 ms: En ausencia de tráfico las instancias se reducen a 0 réplicas con costo cero; los cargos aplican exclusivamente por vCPU y memoria utilizados mientras se procesan peticiones, calculados al intervalo de 100 ms más cercano.',
          'Flujo de 3 Pasos y Buildpacks: Permite flujos basados en contenedor (con Dockerfile propio) o basados en código fuente (Source-based con Google Cloud Buildpacks) que empaquetan la aplicación de forma automática y consistente.',
          'HTTPS Automático: Cada servicio desplegado recibe una URL pública segura con cifrado TLS/HTTPS gestionado y aprovisionado automáticamente por Google.',
          'Binarios Linux de 64 bits Políglotas: Compatible con cualquier lenguaje (Node.js, Python, Java, Go, C++, PHP, COBOL, Haskell, etc.) siempre que la aplicación escuche en el puerto web definido por la variable PORT.',
        ],
      },
      {
        id: 'vid-60-33',
        title: 'Development in the cloud',
        moduleName: 'Módulo 6: Desarrollo de Aplicaciones en la Nube',
        youtubeUrl: 'https://www.youtube.com/watch?v=zoq8Lajo7dE',
        youtubeId: 'zoq8Lajo7dE',
        duration: '1:44',
        summary:
          'Exploración de arquitecturas dirigidas por eventos y cómputo ligero sin servidor mediante Cloud Run functions (antes Cloud Functions). Análisis de cómo desacoplar tareas asíncronas de propósito único (como el procesamiento y redimensionamiento de imágenes subidas por usuarios) de la aplicación principal para evitar el sobredimensionamiento de servidores. Detalla las dos modalidades de activación: disparadores asíncronos desde Cloud Storage y Pub/Sub, e invocaciones síncronas mediante solicitudes HTTP. Explica el modelo de cobro por milisegundo (redondeado a 100 ms) exclusivo durante el tiempo de ejecución y el soporte de código fuente en Node.js, Python, Go, Java, .NET Core, Ruby y PHP.',
        keyTakeaways: [
          'Cómputo FaaS Orientado a Eventos: Cloud Run functions permite escribir funciones pequeñas de propósito único para actuar como "pegamento en la nube" (glue code) conectando y extendiendo servicios de GCP sin gestionar servidores ni runtimes.',
          'Desacoplamiento de Flujos de Negocio: Evita mantener servidores sobredimensionados para picos esporádicos de procesamiento (ej. manipulación de imágenes tras upload en Cloud Storage o ingesta masiva en Pub/Sub).',
          'Disparadores Asíncronos vs Síncronos: Soporta ejecución asíncrona disparada por eventos de Cloud Storage y Pub/Sub, así como invocación síncrona mediante endpoints HTTP estándar.',
          'Facturación al Milisegundo: El cobro se calcula redondeando a los 100 milisegundos más cercanos únicamente mientras el código de la función se encuentra en ejecución activa; coste cero en estado inactivo.',
          'Soporte Políglota de Código Fuente: Permite escribir directamente en Node.js, Python, Go, Java, .NET Core, Ruby y PHP sin necesidad de gestionar archivos Dockerfile.',
        ],
      },
      {
        id: 'vid-60-34',
        title: 'Prompt Engineering',
        moduleName: 'Módulo 7: Asistencia con Gemini y Prompt Engineering',
        youtubeUrl: 'https://www.youtube.com/watch?v=5zoKVf-cnf4',
        youtubeId: '5zoKVf-cnf4',
        duration: '12:50',
        summary:
          'Guía oficial de Google Cloud sobre Prompt Engineering e integración con Gemini. Comienza definiendo la taxonomía entre IA, Gen AI (auge desde 2021) y Large Language Models (LLMs), analizando su arquitectura: tamaño en petabytes, miles de millones o billones de parámetros (memoria del modelo) y capacidades de propósito general basadas en las reglas comunes del lenguaje humano. Detalla el ciclo de entrenamiento mediante pre-training (cálculo probabilístico no supervisado de la siguiente palabra) y fine-tuning (ajuste supervisado con datasets curados). Examina el fenómeno de las alucinaciones y sus cuatro causas (datos insuficientes, datos sucios, falta de contexto y ausencia de restricciones), así como las limitaciones intrínsecas de los LLMs. Presenta a Gemini como un colaborador permanente (always-on collaborator) integrado en Cloud Console y Cloud Shell capaz de sugerir arquitecturas (ej. VPC hub-and-spoke para Cymbal Bank) y redactar comandos de la CLI gcloud. Clasifica las cuatro categorías de prompts: zero-shot, one-shot, few-shot y role prompts (adopción de personas técnicas). Disecciona los dos componentes estructurales de un prompt: preamble (contexto, rol y restricciones) e input (solicitud central). Finalmente, establece las cinco mejores prácticas de prompt engineering para operaciones cloud: instrucciones detalladas y explícitas, definición de límites positivos, salidas de contingencia (fallback outputs), adopción de roles profesionales y redacción de oraciones breves y tareas simples encadenadas.',
        keyTakeaways: [
          'Gen AI vs LLMs: Generative AI abarca cualquier modelo que genere contenido multimodal (texto, imágenes, audio, video); los LLMs son un subconjunto enfocado específicamente en tareas lingüísticas y generación de código.',
          'Parámetros y Pre-training: Los parámetros representan el conocimiento y memoria adquirida por la red neuronal durante el pre-entrenamiento, operando como un motor probabilístico sofisticado que calcula el token más probable.',
          'Causas de Alucinaciones: Se originan por falta de datos suficientes, datos ruidosos o sucios, y principalmente por la carencia de contexto explícito o restricciones delimitadas en el prompt del usuario.',
          '4 Tipos de Prompts: Zero-shot (sin ejemplos), One-shot (un ejemplo guía), Few-shot (dos o más ejemplos para patrones estrictos) y Role Prompts (asignación de personas o roles profesionales como Arquitecto Cloud).',
          'Preamble vs Input y Buenas Prácticas: Todo prompt robusto combina un preámbulo (contexto, rol, restricciones y fallbacks) con un input claro, empleando oraciones concisas y definiendo instrucciones sobre qué hacer en lugar de qué no hacer.',
        ],
      },
      {
        id: 'vid-60-35',
        title: 'Course summary',
        moduleName: 'Cierre Curricular: Resumen del Curso',
        youtubeUrl: 'https://www.youtube.com/watch?v=9lbfxj-K3Qo',
        youtubeId: '9lbfxj-K3Qo',
        duration: '3:56',
        summary:
          'Lección de clausura oficial del curso Google Cloud Fundamentals: Core Infrastructure. Sintetiza los aprendizajes clave de los siete módulos del temario: la introducción a modelos cloud (IaaS/PaaS) y redes troncales en el Módulo 1; jerarquía de recursos, políticas descendentes e IAM en el Módulo 2; máquinas virtuales de Compute Engine, autoescalado dinámico, compatibilidades avanzadas de VPC y Cloud Load Balancing en el Módulo 3; taxonomía de los 5 motores troncales de almacenamiento (Cloud Storage con sus 4 clases, Cloud SQL, Spanner, Firestore y Bigtable) en el Módulo 4; contenedorización y orquestación administrada con Kubernetes y GKE en el Módulo 5; desarrollo serverless en la nube mediante Cloud Run y Cloud Run functions en el Módulo 6; y prompt engineering aplicado a la asistencia con Gemini en el Módulo 7. Concluye trazando la hoja de ruta técnica hacia la certificación Google Cloud Associate Cloud Engineer (ACE).',
        keyTakeaways: [
          'Recapitulación Curricular: Consolidación de los fundamentos de cómputo, almacenamiento, redes virtuales, seguridad por capas y gobierno organizacional requeridos para operar en Google Cloud.',
          'Pilar de Cómputo y Contenedores: Comprensión transversal del espectro de cómputo, desde IaaS granular con Compute Engine hasta CaaS orquestado con GKE y CaaS/FaaS serverless con Cloud Run.',
          'Pilar de Redes y Almacenamiento: Dominio de la arquitectura global de VPC, balanceadores L4/L7, conectividad híbrida y la taxonomía de persistencia políglota para bases de datos relacionales y NoSQL.',
          'Asistencia con Inteligencia Artificial: Integración de Gemini y técnicas de prompt engineering para acelerar el prototipado y la generación de comandos gcloud en Cloud Shell.',
          'Hoja de Ruta hacia la Certificación ACE: Articulación de los conocimientos del curso con los cuatro dominios evaluados en el examen de certificación oficial Google Cloud Associate Cloud Engineer.',
        ],
      },
    ],
    classificationMatrix: [
      {
        lbType: 'Cloud Storage',
        layer: 'Almacenamiento de Objetos',
        scope: 'Global / Multi-Región / Región',
        trafficScheme: 'REST API / gsutil / gcloud',
        architecture: 'Objetos binarios inmutables con clases Standard, Nearline, Coldline, Archive',
        useCase: 'Archivos multimedia, respaldos, data lakes y distribución de contenido estático web.',
      },
      {
        lbType: 'Cloud SQL',
        layer: 'Base de Datos Relacional',
        scope: 'Regional (Failover HA automático)',
        trafficScheme: 'Conexión privada VPC / Proxy SQL',
        architecture: 'Motor MySQL, PostgreSQL o SQL Server completamente gestionado (< 64 TB)',
        useCase: 'Aplicaciones web empresariales, ERP, CRM y transacciones ACID en una sola región.',
      },
      {
        lbType: 'Cloud Spanner',
        layer: 'Base de Datos Relacional Global',
        scope: 'Multi-Región / Global',
        trafficScheme: 'Conexión cliente Spanner',
        architecture: 'Escalado horizontal transparente con consistencia estricta externa (TrueTime)',
        useCase: 'Sistemas bancarios mundiales, cadenas de suministro globales y transacciones de misión crítica.',
      },
      {
        lbType: 'Firestore',
        layer: 'Base de Datos NoSQL Documental',
        scope: 'Multi-Región / Regional',
        trafficScheme: 'SDKs cliente / REST / gRPC',
        architecture: 'Estructura en colecciones y documentos con sincronización en tiempo real y modo offline',
        useCase: 'Aplicaciones móviles, perfiles de usuario, juegos y estado de sesiones en vivo.',
      },
      {
        lbType: 'Cloud Bigtable',
        layer: 'Base de Datos NoSQL Columnar Ancho',
        scope: 'Regional / Zonal con replicación',
        trafficScheme: 'API HBase / gRPC de alta velocidad',
        architecture: 'Almacenamiento columnar optimizado para millones de operaciones por segundo',
        useCase: 'Ingesta masiva de sensores IoT, series temporales financieras y telemetría analítica en tiempo real.',
      },
      {
        lbType: 'BigQuery',
        layer: 'Data Warehouse Analítico (OLAP)',
        scope: 'Multi-Región (US/EU) o Regional',
        trafficScheme: 'SQL ANSI / Jobs / API REST',
        architecture: 'Arquitectura desacoplada de cómputo y almacenamiento (Dremel + Colossus)',
        useCase: 'Análisis masivo de petabytes, dashboards de BI y modelos predictivos integrados (BQML).',
      },
    ],
    healthCheckRanges: [
      {
        cidr: '10.128.0.0/9',
        purpose: 'Bloque predeterminado asignado a las subredes automáticas en Auto Mode VPC.',
      },
      {
        cidr: '10.130.0.0/20',
        purpose: 'Subred regional personalizada en us-central1 (Lab 2).',
      },
      {
        cidr: '10.140.0.0/20',
        purpose: 'Subred regional personalizada en us-east1 (Lab 2).',
      },
      {
        cidr: '0.0.0.0/0',
        purpose: 'Rango de origen comodín para reglas de ingreso público de cortafuegos (SSH, HTTP, ICMP).',
      },
    ],
    examTraps: [
      {
        trap: 'Uso de Roles Básicos (Owner, Editor, Viewer) en entornos de producción',
        solution:
          'Los roles básicos otorgan permisos masivos a nivel de proyecto y violan el principio de mínimo privilegio. Para el examen ACE, siempre se deben seleccionar Roles Predefinidos específicos (ej. roles/storage.objectViewer).',
      },
      {
        trap: 'Descargar y almacenar archivos de claves JSON de Service Accounts en discos de VMs',
        solution:
          'Es un grave riesgo de seguridad. La buena práctica recomendada por Google Cloud es asociar directamente la Service Account a la VM y permitir que la aplicación obtenga credenciales efímeras mediante el servidor de metadatos.',
      },
      {
        trap: 'Suponer que una red VPC en Modo Personalizado (Custom Mode) crea subredes automáticamente',
        solution:
          'Las redes Custom Mode inician con 0 subredes; los ingenieros deben definir manualmente cada subred, rango CIDR y región asociada.',
      },
      {
        trap: 'Intentar anular permisos concedidos a nivel de Organización o Carpeta desde un Proyecto hijo',
        solution:
          'La herencia de políticas en la jerarquía de recursos de Google Cloud es aditiva. Si un usuario tiene un rol en la carpeta o nodo raíz, dicho acceso se propaga hacia abajo y no puede restringirse en el proyecto hijo mediante IAM tradicional.',
      },
    ],
    labs: [
      {
        id: 'core-lab-1',
        labNumber: 1,
        title: 'Getting Started with Cloud Marketplace',
        durationMinutes: 25,
        type: 'guided',
        description:
          'Despliega una solución web completa con la pila LAMP (Linux, Apache, MySQL, PHP y phpMyAdmin) en Compute Engine mediante un solo clic utilizando paquetes certificados de Cloud Marketplace gestionados por Infrastructure Manager.',
        keyConcepts: [
          'Cloud Marketplace: Aprovisionamiento automatizado de soluciones de software empaquetadas y verificadas para GCP.',
          'Pila LAMP: Linux (SO), Apache HTTP Server (Web), MySQL (Base de datos relacional) y PHP/phpMyAdmin (Framework y administración web).',
          'APIs habilitadas automáticamente: Compute Engine API e Infrastructure Manager API.',
          'Dimensionamiento: Serie E2, tipo de máquina e2-medium (2 vCPU, 4 GB RAM) con interfaz de red IP pública.',
        ],
        steps: [
          {
            id: 'c-lab1-step-1',
            stepNumber: 1,
            title: 'Buscar e iniciar LAMP Stack en Cloud Marketplace',
            description:
              'En Cloud Console, abre el menú de navegación, entra a Marketplace, busca "LAMP", selecciona "LAMP Stack Server on Ubuntu 26.04" (por Cloud Infrastructure Services), acepta los términos de servicio y haz clic en DEPLOY.',
            command: `# Navegación en Google Cloud Console:
# Navigation menu > Marketplace > Buscar "LAMP"
# Seleccionar "LAMP Stack Server on Ubuntu 26.04" > GET STARTED > Aceptar términos > DEPLOY`,
            tip: 'Marketplace verifica compatibilidad y permite aprovisionar todo el stack de software sin instalar manualmente paquetes por SSH.',
          },
          {
            id: 'c-lab1-step-2',
            stepNumber: 2,
            title: 'Habilitar APIs y configurar parámetros de la instancia VM',
            description:
              'Si se solicita, habilita las APIs de Compute Engine e Infrastructure Manager. En Zone selecciona la zona asignada, en Machine Type elige Serie E2 con tipo e2-medium, conserva las demás opciones predeterminadas y haz clic en Deploy.',
            command: `# Parámetros de despliegue en consola:
# APIs requeridas: Compute Engine API, Infrastructure Manager API
# Zone: <ZONA_ASIGNADA> (ej. us-central1-a)
# Machine Series: E2 | Machine Type: e2-medium (2 vCPU, 4 GB memoria)`,
          },
          {
            id: 'c-lab1-step-3',
            stepNumber: 3,
            title: 'Verificar despliegue y validar página web de Apache',
            description:
              'Espera hasta que el estado cambie a "lamp-1 has been deployed". Entra en lamp-1-vm > Details, haz clic en Site Url o copia la External IP asignada e ingresa en una pestaña del navegador para validar la pantalla de felicitaciones de Apache HTTP Server.',
            command: `# Validación en navegador web:
# Abrir enlace: http://<EXTERNAL_IP_DE_LAMP_1_VM>
# Verificar mensaje de felicitaciones y servidor Apache HTTP activo en puerto 80`,
            tip: 'Si la web no responde de inmediato, espera 30 segundos mientras los servicios de Apache y MySQL completan el arranque inicial.',
          },
        ],
      },
      {
        id: 'core-lab-2',
        labNumber: 2,
        title: 'Get Started with VPC Networking and Compute Engine',
        durationMinutes: 40,
        type: 'guided',
        description:
          'Explora y elimina la red predeterminada para verificar la dependencia obligatoria de VPC en Compute Engine. Aprovisiona una red VPC con reglas de cortafuegos (allow-custom, allow-icmp, allow-ssh), despliega VMs en regiones distintas y valida conectividad privada y pública.',
        keyConcepts: [
          'Dependencia de VPC: Imposibilidad de aprovisionar instancias VM sin una red VPC activa.',
          'Redes Auto vs Custom: Asignación automática de subredes en 10.128.0.0/9 vs control granular manual.',
          'Reglas de cortafuegos e implícitas: Evaluación de deny-all-ingress (65535) y distinción entre allow-icmp (0.0.0.0/0) y allow-custom (10.128.0.0/9).',
          'IPs efímeras vs estáticas: Liberación de IPs públicas dinámicas al detener VMs vs reserva fija.',
        ],
        steps: [
          {
            id: 'c-lab2-step-1',
            stepNumber: 1,
            title: 'Crear red VPC personalizada (Custom Mode)',
            description:
              'Inicializa la red virtual especificando modo personalizado y enrutamiento regional.',
            command: `gcloud compute networks create my-custom-vpc \\
    --subnet-mode=custom \\
    --bgp-routing-mode=regional`,
          },
          {
            id: 'c-lab2-step-2',
            stepNumber: 2,
            title: 'Crear subredes en us-central1 y us-east1',
            description:
              'Segmenta dos subredes con bloques CIDR independientes en distintas regiones de Estados Unidos.',
            command: `gcloud compute networks subnets create subnet-us-central \\
    --network=my-custom-vpc \\
    --region=us-central1 \\
    --range=10.130.0.0/20

gcloud compute networks subnets create subnet-us-east \\
    --network=my-custom-vpc \\
    --region=us-east1 \\
    --range=10.140.0.0/20`,
          },
          {
            id: 'c-lab2-step-3',
            stepNumber: 3,
            title: 'Configurar regla de cortafuegos de ingreso (Ingress)',
            description:
              'Habilita protocolos de diagnóstico (ICMP/ping) y administración remota (SSH puerto 22 y RDP puerto 3389).',
            command: `gcloud compute firewall-rules create my-custom-vpc-allow-icmp-ssh-rdp \\
    --network=my-custom-vpc \\
    --direction=INGRESS \\
    --priority=1000 \\
    --action=ALLOW \\
    --rules=icmp,tcp:22,tcp:3389 \\
    --source-ranges=0.0.0.0/0`,
          },
          {
            id: 'c-lab2-step-4',
            stepNumber: 4,
            title: 'Aprovisionar instancias VM y verificar ping interno',
            description:
              'Crea una VM en cada subred regional y verifica la conectividad de red a través del backbone interno de Google.',
            command: `gcloud compute instances create vm-internal-1 \\
    --zone=us-central1-a \\
    --machine-type=e2-micro \\
    --network=my-custom-vpc \\
    --subnet=subnet-us-central

gcloud compute instances create vm-internal-2 \\
    --zone=us-east1-b \\
    --machine-type=e2-micro \\
    --network=my-custom-vpc \\
    --subnet=subnet-us-east

gcloud compute ssh vm-internal-1 --zone=us-central1-a --command="ping -c 3 10.140.0.2"`,
            tip: 'Las VMs en diferentes subredes de la misma VPC se comunican por IP privada sin necesidad de Cloud VPN ni gateways adicionales.',
          },
        ],
      },
      {
        id: 'core-lab-3',
        labNumber: 3,
        title: 'Getting Started with Cloud Storage and Cloud SQL',
        durationMinutes: 50,
        type: 'guided',
        description:
          'Aprovisiona una instancia VM en Compute Engine con servidor web Apache y PHP, crea un bucket en Cloud Storage con activos públicos de lectura y despliega una instancia administrada de Cloud SQL for MySQL co-ubicada para enlazar la aplicación web completa.',
        keyConcepts: [
          'Compute Engine con Startup Script: Aprovisionamiento automatizado de Apache2, PHP y php-mysql en el arranque de la VM.',
          'Cloud Storage con ACL pública: Creación de bucket globalmente único nombrado según el Project ID y distribución de banners con gsutil acl ch.',
          'Cloud SQL for MySQL: Instancia gestionada Enterprise Sandbox con usuario de aplicación y redes autorizadas para conexión de clientes.',
          'Co-ubicación zonal: Ubicación de la base de datos en la misma zona que la VM web para lograr latencias inferiores a 1 ms.',
          'Mejores prácticas de producción vs laboratorio: Sustitución de IPs públicas por Private IP / Auth Proxy y credenciales protegidas con Secret Manager.',
        ],
        steps: [
          {
            id: 'c-lab3-step-1',
            stepNumber: 1,
            title: 'Aprovisionar servidor web VM bloghost con script de inicio',
            description:
              'Crea la instancia bloghost en Compute Engine (e2-standard-2, Debian 12 bookworm), habilita tráfico HTTP y configura el script de automatización para instalar Apache y módulos PHP.',
            command: `gcloud compute instances create bloghost \\
    --zone=us-central1-a \\
    --machine-type=e2-standard-2 \\
    --image-family=debian-12 \\
    --image-project=debian-cloud \\
    --tags=http-server \\
    --metadata=startup-script='#!/bin/bash
apt-get update
apt-get install apache2 php php-mysql -y
service apache2 restart'

# Registrar IPs de la instancia
gcloud compute instances describe bloghost --zone=us-central1-a --format="get(networkInterfaces[0].accessConfigs[0].natIP)"`,
            tip: 'El startup script instala Apache2 y los conectores MySQL de PHP automáticamente sin necesidad de acceder primero por SSH.',
          },
          {
            id: 'c-lab3-step-2',
            stepNumber: 2,
            title: 'Crear bucket en Cloud Storage y publicar imagen de banner',
            description:
              'En Cloud Shell, crea un bucket con nombre único global igual al Project ID, descarga el banner del curso y hazlo públicamente legible mediante ACL.',
            command: `export LOCATION=US
gcloud storage buckets create -l $LOCATION gs://$DEVSHELL_PROJECT_ID

gcloud storage cp gs://cloud-training/gcpfci/my-excellent-blog.png my-excellent-blog.png
gcloud storage cp my-excellent-blog.png gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png

gsutil acl ch -u allUsers:R gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png`,
            tip: 'Los nombres de los buckets comparten un espacio de nombres global en todo Google Cloud, por lo que usar $DEVSHELL_PROJECT_ID garantiza su unicidad.',
          },
          {
            id: 'c-lab3-step-3',
            stepNumber: 3,
            title: 'Crear la instancia gestionada Cloud SQL MySQL blog-db',
            description:
              'Aprovisiona una base de datos Cloud SQL MySQL en la misma región y zona que la VM bloghost para garantizar máxima proximidad y latencia mínima.',
            command: `gcloud sql instances create blog-db \\
    --database-version=MYSQL_8_0 \\
    --tier=db-n1-standard-1 \\
    --region=us-central1 \\
    --zone=us-central1-a \\
    --root-password="Passw0rd1!"

# Obtener la IP pública asignada a la base de datos
gcloud sql instances describe blog-db --format="value(ipAddresses[0].ipAddress)"`,
            tip: 'Co-ubicar la instancia de base de datos en la misma zona de Compute Engine reduce drásticamente el tiempo de respuesta de las consultas SQL.',
          },
          {
            id: 'c-lab3-step-4',
            stepNumber: 4,
            title: 'Configurar usuario de aplicación y autorizar IP de bloghost',
            description:
              'Crea el usuario blogdbuser y autoriza la dirección IP externa de la VM bloghost (/32) en la configuración de cortafuegos de Cloud SQL.',
            command: `gcloud sql users create blogdbuser \\
    --instance=blog-db \\
    --password="Passw0rd1!"

export BLOGHOST_IP=$(gcloud compute instances describe bloghost --zone=us-central1-a --format="value(networkInterfaces[0].accessConfigs[0].natIP)")
gcloud sql instances patch blog-db --authorized-networks="\${BLOGHOST_IP}/32"`,
            tip: 'Para el examen ACE recuerda que en producción se debe priorizar Private IP sobre VPC Peering o Cloud SQL Auth Proxy antes que redes autorizadas públicas.',
          },
          {
            id: 'c-lab3-step-5',
            stepNumber: 5,
            title: 'Conectar la aplicación PHP en bloghost con Cloud SQL',
            description:
              'Edita /var/www/html/index.php en bloghost con los datos de conexión PDO de Cloud SQL, reinicia Apache y valida la conexión en el navegador.',
            command: `# En la sesión SSH de bloghost:
cat <<'EOF' | sudo tee /var/www/html/index.php
<html>
  <head><title>Welcome to my excellent blog</title></head>
  <body>
    <h1>Welcome to my excellent blog</h1>
    <?php
    $dbserver = "CLOUDSQL_PUBLIC_IP";
    $dbuser = "blogdbuser";
    $dbpassword = "Passw0rd1!";
    try {
        $conn = new PDO("mysql:host=$dbserver;dbname=mysql", $dbuser, $dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully";
    } catch(PDOException $e) {
        echo "Database connection failed: " . $e->getMessage();
    }
    ?>
  </body>
</html>
EOF

sudo service apache2 restart`,
            tip: 'Al acceder a http://<BLOGHOST_EXTERNAL_IP>/index.php se debe visualizar el mensaje "Connected successfully".',
          },
          {
            id: 'c-lab3-step-6',
            stepNumber: 6,
            title: 'Integrar y renderizar el banner gráfico de Cloud Storage',
            description:
              'Inserta la etiqueta img con la URL pública del objeto de Cloud Storage antes del título h1 en index.php y reinicia el servicio web.',
            command: `# Actualizar index.php para incluir el banner gráfico de Cloud Storage:
export BUCKET_URL="https://storage.googleapis.com/\${DEVSHELL_PROJECT_ID}/my-excellent-blog.png"
# La etiqueta resultante en HTML es: <img src='\${BUCKET_URL}'>

sudo service apache2 restart`,
            tip: 'Cloud Storage distribuye activos multimedia directamente a los navegadores de los usuarios finales, descargando de tráfico al servidor de aplicación.',
          },
        ],
      },
      {
        id: 'core-lab-4',
        labNumber: 4,
        title: 'Hello Cloud Run',
        durationMinutes: 60,
        type: 'guided',
        description:
          'Desarrolla, conteneriza y despliega una aplicación web ligera Express en Node.js sobre Cloud Run de forma totalmente serverless, utilizando Artifact Registry para el almacenamiento seguro de imágenes Docker y Cloud Build para la compilación desatendida en la nube.',
        keyConcepts: [
          'Cloud Run Serverless: Cómputo administrado basado en Knative para contenedores stateless con escalado automático a cero y cobro por 100 ms.',
          'Artifact Registry (*.pkg.dev): Repositorio central de artefactos e imágenes Docker con autenticación gcloud auth configure-docker.',
          'Cloud Build (gcloud builds submit): Compilación desatendida y empaquetado de contenedores en la nube sin requerir demonio Docker local.',
          'Inyección de variable PORT: Los contenedores deben escuchar en el puerto inyectado por el entorno (por defecto 8080).',
          'Acceso público: Bandera --allow-unauthenticated para otorgar roles/run.invoker al miembro allUsers.',
        ],
        steps: [
          {
            id: 'c-lab4-step-1',
            stepNumber: 1,
            title: 'Habilitar APIs de Cloud Run y Artifact Registry y configurar entorno',
            description:
              'Habilita las APIs necesarias en el proyecto de GCP y configura la región predeterminada y la variable de entorno LOCATION.',
            command: `gcloud services enable run.googleapis.com artifactregistry.googleapis.com
gcloud config set compute/region us-central1
export LOCATION=us-central1`,
            tip: 'Habilitar las APIs por CLI prepara el proyecto para aceptar peticiones de despliegue y creación de repositorios.',
          },
          {
            id: 'c-lab4-step-2',
            stepNumber: 2,
            title: 'Escribir la aplicación web Node.js con Express',
            description:
              'Crea el directorio helloworld, inicializa el manifiesto package.json con Express y codifica index.js escuchando en la variable de entorno PORT.',
            command: `mkdir helloworld && cd helloworld

cat <<'EOF' > package.json
{
  "name": "helloworld",
  "description": "Simple hello world sample in Node",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Google LLC",
  "license": "Apache-2.0",
  "dependencies": {
    "express": "^4.17.1"
  }
}
EOF

cat <<'EOF' > index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(\`Hello \${name}!\`);
});

app.listen(port, () => {
  console.log(\`helloworld: listening on port \${port}\`);
});
EOF`,
            tip: 'Es un requisito estricto en Cloud Run que la aplicación escuche en el puerto indicado por la variable PORT (por defecto 8080).',
          },
          {
            id: 'c-lab4-step-3',
            stepNumber: 3,
            title: 'Crear repositorio en Artifact Registry y autenticar Docker',
            description:
              'Aprovisiona un repositorio Docker en Artifact Registry en la región seleccionada y configura las credenciales de autenticación para Docker.',
            command: `gcloud artifacts repositories create my-repository \\
    --repository-format=docker \\
    --location=$LOCATION \\
    --description="Docker repository"

gcloud auth configure-docker $LOCATION-docker.pkg.dev`,
            tip: 'Artifact Registry es el reemplazo oficial moderno de Container Registry (gcr.io) para almacenar imágenes OCI.',
          },
          {
            id: 'c-lab4-step-4',
            stepNumber: 4,
            title: 'Crear Dockerfile y compilar imagen con Cloud Build',
            description:
              'Diseña un Dockerfile optimizado para Node.js y envía el código a Cloud Build para construir y publicar la imagen en Artifact Registry en un solo comando.',
            command: `cat <<'EOF' > Dockerfile
FROM node:20-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD [ "npm", "start" ]
EOF

gcloud builds submit --tag $LOCATION-docker.pkg.dev/$DEVSHELL_PROJECT_ID/my-repository/helloworld`,
            tip: 'gcloud builds submit empaqueta el directorio local y lo compila en la nube sin requerir un motor Docker local.',
          },
          {
            id: 'c-lab4-step-5',
            stepNumber: 5,
            title: 'Desplegar contenedor en Cloud Run con acceso público',
            description:
              'Despliega el servicio en Cloud Run especificando la imagen de Artifact Registry, la región y la opción --allow-unauthenticated.',
            command: `gcloud run deploy helloworld \\
    --image $LOCATION-docker.pkg.dev/$DEVSHELL_PROJECT_ID/my-repository/helloworld \\
    --allow-unauthenticated \\
    --region=$LOCATION

gcloud run services describe helloworld --region=$LOCATION --format="value(status.url)"`,
            tip: 'Cloud Run entrega una URL única asegurada con certificado HTTPS/TLS gestionado automáticamente por Google.',
          },
          {
            id: 'c-lab4-step-6',
            stepNumber: 6,
            title: 'Limpiar recursos para evitar costes de almacenamiento',
            description:
              'Elimina la imagen de contenedor del repositorio en Artifact Registry y borra el servicio desplegado en Cloud Run.',
            command: `gcloud artifacts docker images delete $LOCATION-docker.pkg.dev/$DEVSHELL_PROJECT_ID/my-repository/helloworld --quiet
gcloud run services delete helloworld --region=$LOCATION --quiet`,
            tip: 'Aunque Cloud Run no factura en inactividad, las imágenes almacenadas en Artifact Registry generan cargos continuos si no se eliminan.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'c-m1-q1',
        question:
          '¿Qué tipo de servicio de computación en la nube te permite enlazar el código de tu aplicación a bibliotecas que otorgan acceso automático a la infraestructura que la aplicación requiere (Platform as a Service)?',
        options: [
          'Platform as a service (PaaS)',
          'Software as a service (SaaS)',
          'Infrastructure as a service (IaaS)',
          'Hybrid cloud',
        ],
        correctIndex: 0,
        explanation:
          'PaaS (ej. Google App Engine) abstrae por completo los servidores y el sistema operativo, permitiendo al desarrollador vincular su código a librerías y APIs de plataforma sin administrar infraestructura.',
        examTrapTip: 'En IaaS el usuario administra el SO; en PaaS el desarrollador solo gestiona el código de aplicación.',
      },
      {
        id: 'c-m1-q2',
        question:
          '¿Por qué una organización cliente de Google Cloud desplegaría recursos en diversas regiones alrededor del mundo?',
        options: [
          'Para ofrecer versiones localizadas de la aplicación en diferentes regiones.',
          'Para acercar sus aplicaciones a los usuarios en todo el mundo y mejorar la tolerancia a fallos.',
          'Para mejorar la seguridad perimetral.',
          'Para obtener descuentos comerciales adicionales.',
        ],
        correctIndex: 1,
        explanation:
          'Desplegar en múltiples regiones reduce la latencia de tránsito de paquetes al servir a los usuarios desde ubicaciones geográficas próximas y protege contra caídas totales de una región provocadas por desastres naturales.',
      },
      {
        id: 'c-m1-q3',
        question:
          '¿Cuál es el beneficio primordial para un cliente de Google Cloud al distribuir recursos entre diversas zonas dentro de una misma región?',
        options: [
          'Mejorar el rendimiento del procesamiento.',
          'Obtener descuentos por uso en otras zonas.',
          'Expandir los servicios a clientes en nuevas áreas geográficas.',
          'Mejorar la tolerancia a fallos ante caídas zonales aisladas.',
        ],
        correctIndex: 3,
        explanation:
          'Las zonas son dominios de fallo independientes con infraestructura física, energía y redes redundantes. Distribuir instancias entre zonas de la misma región (ej. con MIGs regionales) asegura alta disponibilidad si una zona falla.',
      },
      {
        id: 'c-m2-q1',
        question:
          'Completa la afirmación: En Google Cloud, los servicios y las APIs se habilitan a nivel de _________ (Services and APIs are enabled on a per-__________ basis).',
        options: [
          'Carpeta (Folder)',
          'Proyecto (Project)',
          'Organización (Organization)',
          'Cuenta de facturación (Billing account)',
        ],
        correctIndex: 1,
        explanation:
          'Las APIs y los servicios se habilitan a nivel de Proyecto (Project). Cada proyecto funciona como el contenedor aislado donde se activan las APIs requeridas, se consumen las cuotas y se vincula la facturación.',
        examTrapTip:
          'No se pueden habilitar APIs a nivel de carpeta ni de organización; siempre se hace por proyecto con gcloud services enable.',
      },
      {
        id: 'c-m2-q2',
        question:
          '¿Cuál de los siguientes identificadores de un proyecto de Google Cloud es globalmente único, permanente e inmutable, pero puede ser personalizado y elegido por el usuario durante la creación?',
        options: [
          'El número de tarjeta de crédito de facturación',
          'El nombre del proyecto (Project Name)',
          'El número de proyecto (Project Number)',
          'El ID del proyecto (Project ID)',
        ],
        correctIndex: 3,
        explanation:
          'El Project ID es globalmente único en todo Google Cloud e inmutable tras su creación, pero el cliente puede definirlo y personalizarlo al crear el proyecto. El Project Number lo genera Google y el Project Name es mutable.',
        examTrapTip:
          'Project ID = inmutable y personalizable en creación. Project Number = inmutable y generado por Google. Project Name = mutable y no único.',
      },
      {
        id: 'c-m2-q3',
        question:
          'Selecciona la lista de tipos de roles de IAM ordenados desde el alcance más amplio (general) hacia el más granular y específico (finest-grained):',
        options: [
          'Roles básicos, roles predefinidos, roles personalizados',
          'Roles personalizados, roles predefinidos, roles básicos',
          'Roles predefinidos, roles personalizados, roles básicos',
          'Roles básicos, roles personalizados, roles predefinidos',
        ],
        correctIndex: 0,
        explanation:
          'Los roles básicos (Owner, Editor, Viewer) aplican de forma amplia a todos los recursos del proyecto. Los roles predefinidos están delimitados a servicios específicos (ej. Compute Instance Admin). Los roles personalizados (Custom Roles) permiten granularidad atómica para mínimo privilegio estricto.',
        examTrapTip:
          'Orden de especificidad: Basic roles (más amplio) → Predefined roles → Custom roles (más específico/granular).',
      },
      {
        id: 'c-m3-q1',
        question: 'In Google Cloud VPCs, what scope do subnets have?',
        options: ['Zonal', 'Multi-regional', 'Regional', 'Global'],
        correctIndex: 2,
        explanation:
          'En Google Cloud las redes VPC son globales, pero las subredes (subnets) son estrictamente regionales: cada subred se aloja en una región específica y abarca de forma transparente todas las zonas de disponibilidad de dicha región.',
        examTrapTip:
          'Las VPCs son Globales; las Subredes son Regionales; las Instancias de VM son Zonales.',
      },
      {
        id: 'c-m3-q2',
        question:
          'How does global Cloud Load Balancing allow you to balance HTTP-based traffic?',
        options: [
          'Across multiple Compute Engine regions.',
          'Across multiple physical machines in a single data center.',
          'Across multiple virtual machine instances in a single Compute Engine region.',
          'Across multiple Google Cloud services.',
        ],
        correctIndex: 0,
        explanation:
          'El Global External Application Load Balancer opera en Capa 7 utilizando una IP Anycast global única para recibir peticiones en el PoP de Google más cercano al usuario y enrutarlas entre backends distribuidos en múltiples regiones de Compute Engine.',
        examTrapTip:
          'Si el examen menciona "una sola IP global para backends en EE.UU., Europa y Asia", se refiere al Global External Application Load Balancer.',
      },
      {
        id: 'c-m3-q3',
        question:
          'For which of these interconnect options is a Service Level Agreement available?',
        options: [
          'Dedicated Interconnect',
          'Direct Peering',
          'Standard Network Tier',
          'Carrier Peering',
        ],
        correctIndex: 0,
        explanation:
          'Dedicated Interconnect y Partner Interconnect son servicios oficiales empresariales de Google Cloud para conectividad privada RFC 1918 que ofrecen SLAs garantizados (99.9% o 99.99%). Direct Peering y Carrier Peering acceden a IPs públicas de Google y no cuentan con SLA.',
        examTrapTip:
          'Direct Peering y Carrier Peering = IPs públicas sin SLA. Dedicated y Partner Interconnect = IPs privadas RFC 1918 con SLA empresarial.',
      },
      {
        id: 'c-m3-q4',
        question: 'What is the main reason customers choose Spot VMs?',
        options: [
          'To reduce cost on premium operating systems.',
          'To reduce cost.',
          'To use custom machine types.',
          'To improve performance.',
        ],
        correctIndex: 1,
        explanation:
          'La ventaja definitiva de las Spot VMs es la reducción de costes, con descuentos del 60% al 91% respecto al precio bajo demanda habitual, a cambio de tolerar interrupciones con 30 segundos de aviso previo.',
        examTrapTip:
          'Spot VMs para procesos batch y computación tolerante a fallos; nunca para aplicaciones de misión crítica de un solo nodo sin tolerancia a interrupciones.',
      },
      {
        id: 'c-m3-q5',
        question:
          'Which of the following describes a Virtual Private Cloud (VPC)?',
        options: [
          'A fully distributed, software-defined, managed service for traffic distribution.',
          'An option that allows one or more direct, private connections to Google.',
          'A service that routes traffic through a Google Point of Presence (PoP).',
          'A secure, individual, private cloud-computing model hosted within a public cloud.',
        ],
        correctIndex: 3,
        explanation:
          'Una VPC es un modelo de red privado, individual y seguro alojado sobre la nube pública de Google Cloud, que suministra aislamiento completo, direccionamiento IP personalizado, cortafuegos con estado y enrutamiento definido por software.',
        examTrapTip:
          'A fully distributed service for traffic distribution describe a Cloud Load Balancing; una VPC es el entorno de red aislado y privado.',
      },
      {
        id: 'c-m4-q1',
        question:
          'Which storage use case is best suited for Google Cloud Storage?',
        options: [
          'Running transactional relational database management system (RDBMS) workloads.',
          'Serving as an enterprise data warehouse for complex SQL analytics.',
          'Storing unstructured data that requires high durability and availability.',
          'Hosting the root file system of a Compute Engine virtual machine instance.',
        ],
        correctIndex: 2,
        explanation:
          'Cloud Storage es el servicio de almacenamiento de objetos (BLOBs) no estructurados en Google Cloud, diseñado para proporcionar una durabilidad anual del 99.999999999% (11 nueves) y alta disponibilidad global sin aprovisionamiento de capacidad previa.',
        examTrapTip:
          'Las cargas RDBMS transaccionales requieren Cloud SQL o Spanner, los data warehouses requieren BigQuery, y el disco raíz de una VM requiere almacenamiento en bloques (Persistent Disk).',
      },
      {
        id: 'c-m4-q2',
        question:
          'For what primary use case should an organization choose the Coldline storage class in Cloud Storage?',
        options: [
          'To minimize overall costs for data that is read and updated frequently.',
          'To minimize monthly storage costs for data accessed less than once a quarter.',
          'To execute faster data transfers using a dedicated storage API.',
          'To apply stricter access control and encryption mechanisms to sensitive data.',
        ],
        correctIndex: 1,
        explanation:
          'La clase Coldline Storage está diseñada para minimizar las tarifas de almacenamiento en reposo de datos leídos como máximo una vez cada 90 días (menos de una vez por trimestre). Todas las clases comparten la misma API, cifrado y latencias en milisegundos.',
        examTrapTip:
          'No asumas que las clases frías tienen cifrado o APIs diferentes; la diferencia entre clases de Cloud Storage es exclusivamente financiera (coste de reposo vs recuperación y permanencia mínima).',
      },
      {
        id: 'c-m4-q3',
        question:
          'A company requires a relational database service that can scale horizontally to petabytes of data while maintaining high availability. Which Google Cloud service meets this requirement?',
        options: [
          'Spanner',
          'Firestore',
          'Cloud SQL',
          'Bigtable',
        ],
        correctIndex: 0,
        explanation:
          'Cloud Spanner es el servicio de base de datos relacional distribuida globalmente que proporciona escalabilidad horizontal elástica a escala de petabytes con consistencia externa fuerte (TrueTime API) y soporte completo para transacciones ACID y SQL ANSI.',
        examTrapTip:
          'Cloud SQL es relacional pero escala verticalmente hasta 64 TB; Bigtable y Firestore escalan horizontalmente pero no son bases de datos relacionales.',
      },
      {
        id: 'c-m5-q1',
        question: 'What is a Kubernetes pod in the context of Google Kubernetes Engine (GKE)?',
        options: [
          'A group of containers',
          'A group of nodes',
          'A group of VMs',
          'A group of clusters',
        ],
        correctIndex: 0,
        explanation:
          'Un Pod es la unidad básica y mínima desplegable en Kubernetes. Encapsula uno o más contenedores estrechamente interdependientes (sidecars) que comparten la misma interfaz de red IP, puertos y almacenamiento.',
        examTrapTip:
          'El Pod es la unidad mínima desplegable, no el contenedor individual ni la máquina virtual.',
      },
      {
        id: 'c-m5-q2',
        question:
          'Where do the resources used to build Google Kubernetes Engine (GKE) clusters come from?',
        options: [
          'App Engine',
          'Compute Engine',
          'Bare-metal servers',
          'Cloud Storage',
        ],
        correctIndex: 1,
        explanation:
          'Los clústeres de GKE están compuestos por un grupo de máquinas virtuales de Compute Engine que actúan como los nodos de cómputo del clúster.',
        examTrapTip:
          'Los nodos de GKE provienen de Compute Engine, mientras que el Control Plane es administrado directamente por Google Cloud.',
      },
      {
        id: 'c-m6-q1',
        question: 'Why might a Google Cloud customer choose to use Cloud Run functions?',
        options: [
          'Their application has a legacy monolithic structure that they want to separate into microservices.',
          'Cloud Run functions is a free service for hosting compute operations.',
          'Their application contains event-driven code that they do not want to provision compute resources for.',
          'Cloud Run functions is the primary way to run C++ applications in Google Cloud.',
        ],
        correctIndex: 2,
        explanation:
          'Cloud Run functions es una plataforma serverless orientada a eventos diseñada para ejecutar lógica puntual ante cambios en recursos (como subidas a Cloud Storage o mensajes en Pub/Sub) sin pagar por infraestructura ociosa.',
        examTrapTip:
          'Cloud Run functions no mantiene VMs aprovisionadas; escala de 0 a miles bajo demanda y apaga instancias cuando concluye el evento.',
      },
      {
        id: 'c-m6-q2',
        question:
          'Which of these statements about Cloud Run functions are correct? (Select the statement accurately describing its capabilities)',
        options: [
          'Is a scalable functions-as-a-service platform, is integrated with Cloud Logging, and can be used to extend Cloud services.',
          'Require servers or VMs to be provisioned prior to deployment.',
          'Can only be invoked by sending HTTP requests and does not support asynchronous triggers.',
          'Charges a fixed monthly flat rate regardless of whether functions run.',
        ],
        correctIndex: 0,
        explanation:
          'Cloud Run functions es una solución FaaS escalable que canaliza registros de forma nativa a Cloud Logging, admite tanto invocación HTTP como triggers de Cloud Storage y Pub/Sub, y se cobra por 100 ms de uso activo.',
        examTrapTip:
          'Cloud Run functions no requiere VMs dedicadas y no está restringida a HTTP; reacciona a eventos asíncronos del ecosistema cloud.',
      },
      {
        id: 'c-m6-q3',
        question:
          'Which scenario is best suited for using Cloud Run instead of Cloud Run functions?',
        options: [
          'Generating thumbnails for images uploaded to a Cloud Storage bucket.',
          'Sending an email notification whenever a new document is added to a specific folder in Cloud Storage.',
          'Hosting a dynamic web application that allows users to upload and share photos.',
          'Resizing images on demand when requested by a user through a web interface webhook.',
        ],
        correctIndex: 2,
        explanation:
          'Una aplicación web dinámica completa con interfaz interactiva, enrutamiento múltiple y gestión de sesiones requiere un servidor web empaquetado en un contenedor (Cloud Run). Las tareas aisladas disparadas por eventos de archivos son idóneas para Cloud Run functions.',
        examTrapTip:
          'Aplica la regla: Aplicación web completa o API REST con contenedor -> Cloud Run. Tarea de propósito único disparada por un evento -> Cloud Run functions.',
      },
      {
        id: 'c-m7-q1',
        question:
          'You need a large language model (LLM) to convert unstructured text into a rigid, custom JSON structure. Which prompting technique should you implement?',
        options: [
          'A role prompt that instructs the model to adopt a specific persona.',
          'A zero-shot prompt with no guidance or context.',
          'An open-ended creative prompt with minimal constraints.',
          'A few-shot prompt that includes illustrative output examples.',
        ],
        correctIndex: 3,
        explanation:
          'El few-shot prompting proporciona dos o más ejemplos representativos de pares entrada-salida para que el modelo replique con exactitud un esquema estricto (como una estructura JSON personalizada) sin desviarse del formato.',
        examTrapTip:
          'Para formatos estrictos o esquemas fijos de salida (JSON, YAML), few-shot prompting es la técnica recomendada; zero-shot no garantiza consistencia en las claves.',
      },
      {
        id: 'c-m7-q2',
        question: 'What is the primary defining function of generative AI?',
        options: [
          'Generate original text, images, code, or other media using generative models.',
          'Generate responses based strictly on real-time data.',
          'Perform complex calculations and mathematical operations.',
          'Make predictions about future events based on historical data.',
        ],
        correctIndex: 0,
        explanation:
          'La IA Generativa (Gen AI) se define por la capacidad de sintetizar contenido nuevo y original (texto, imágenes, código, video o audio) a partir de modelos generativos que aprenden patrones de datos masivos.',
        examTrapTip:
          'Los LLMs no son calculadoras analíticas ni tienen acceso por defecto a datos en tiempo real sin grounding externo.',
      },
      {
        id: 'c-m7-q3',
        question:
          'You are designing prompts to guide a large language model (LLM) toward clear and reliable responses. Which practice aligns with Google-recommended guidelines for prompt construction?',
        options: [
          'Maintain concise phrasing and direct instructions.',
          'Avoid providing context or specific parameters.',
          'Draft lengthy, complex sentences with multiple embedded clauses.',
          'Rely exclusively on default parameters without testing alternative variations.',
        ],
        correctIndex: 0,
        explanation:
          'Las directrices oficiales de Google recomiendan redactar oraciones concisas, instrucciones directas y explícitas, dividiendo solicitudes complejas en tareas simples.',
        examTrapTip:
          'Oraciones largas con múltiples cláusulas subordinadas confunden al modelo y aumentan el riesgo de alucinaciones.',
      },
      {
        id: 'c-m7-q4',
        question:
          'How can you avoid hallucinations when training or prompting a large language model (LLM)?',
        options: [
          'Train the LLM on a smaller dataset.',
          'Train the model on a clean, curated dataset.',
          'Omit context from your prompts.',
          'Train the model to operate with very few constraints.',
        ],
        correctIndex: 1,
        explanation:
          'Entrenar el modelo con un conjunto de datos limpio y curado, combinado con prompts que incluyan suficiente contexto y restricciones delimitadas, es la mejor estrategia para mitigar alucinaciones.',
        examTrapTip:
          'Omitir contexto o reducir restricciones son causas directas de alucinaciones en los LLMs.',
      },
      {
        id: 'c-q1',
        question:
          'Una empresa requiere una base de datos relacional para una aplicación web que admita sintaxis estándar de MySQL, proporcione conmutación por error regional automática (Alta Disponibilidad) y sus datos se mantengan en una sola región. ¿Qué servicio debes elegir?',
        options: [
          'Cloud Spanner',
          'Cloud SQL',
          'Cloud Bigtable',
          'Firestore',
        ],
        correctIndex: 1,
        explanation:
          'Cloud SQL ofrece motores relacionales gestionados (MySQL, PostgreSQL, SQL Server) en una región con replicación síncrona y conmutación automática de alta disponibilidad. Cloud Spanner es para bases de datos relacionales distribuidas globalmente a través de múltiples regiones.',
        examTrapTip: 'Si el requerimiento menciona "relacional en una sola región con alta disponibilidad", la respuesta óptima por costo y función es Cloud SQL.',
      },
      {
        id: 'c-q2',
        question:
          'Debes otorgar a un desarrollador junior acceso de solo lectura a los objetos de Cloud Storage en un proyecto específico, sin permitirle crear ni eliminar buckets. Aplicando el principio de menor privilegio, ¿qué rol debes asignarle?',
        options: [
          'roles/owner',
          'roles/editor',
          'roles/viewer',
          'roles/storage.objectViewer',
        ],
        correctIndex: 3,
        explanation:
          'roles/storage.objectViewer es un rol predefinido que permite leer objetos sin otorgar permisos de modificación sobre los buckets ni visibilidad excesiva sobre otros recursos del proyecto. Los roles básicos como Viewer son demasiado amplios.',
      },
      {
        id: 'c-q3',
        question:
          'Una aplicación en una VM de Compute Engine necesita leer datos de un bucket de Cloud Storage sin almacenar claves de acceso permanentes en el código ni en el disco. ¿Cuál es la práctica de seguridad recomendada por Google Cloud?',
        options: [
          'Descargar un archivo de clave JSON de una cuenta de servicio al disco de la máquina virtual.',
          'Incrustar las credenciales de la cuenta personal de Google del usuario en la configuración.',
          'Adjuntar una Service Account personalizada a la instancia de VM con el rol roles/storage.objectViewer.',
          'Configurar los permisos del bucket de Cloud Storage como allUsers (Público).',
        ],
        correctIndex: 2,
        explanation:
          'Vincular una Service Account a la VM permite que la aplicación obtenga tokens efímeros mediante el servidor de metadatos de Compute Engine, eliminando el riesgo de claves comprometidas.',
      },
      {
        id: 'c-q4',
        question:
          'Estás desplegando un microservicio web sin estado empaquetado en un contenedor Docker. La aplicación experimenta picos de tráfico impredecibles y debe escalar a cero durante horas de inactividad para minimizar costos. ¿Qué servicio de cómputo es el más adecuado?',
        options: [
          'Compute Engine con grupo de instancias no administrado',
          'GKE Standard Cluster con número fijo de nodos',
          'Cloud Run',
          'Cloud SQL',
        ],
        correctIndex: 2,
        explanation:
          'Cloud Run es una plataforma serverless para contenedores HTTP que escala automáticamente de cero a miles de instancias según la demanda, cobrando solo por el tiempo exacto de procesamiento.',
      },
      {
        id: 'c-q5',
        question:
          'Un ingeniero crea una nueva red VPC en Modo Personalizado (Custom Mode). ¿Qué sucede con las subredes al crear una red en este modo?',
        options: [
          'Se crea automáticamente una subred por región con rangos CIDR predeterminados.',
          'No se crea ninguna subred automáticamente; el ingeniero debe definir explícitamente las subredes y rangos IP.',
          'Se crea una única subred en la región predeterminada del proyecto.',
          'Las redes en Modo Personalizado no utilizan subredes.',
        ],
        correctIndex: 1,
        explanation:
          'Las redes Custom Mode inician sin subredes, permitiendo al administrador diseñar la topología de red y evitar solapamientos de IP. El modo Auto es el que genera una subred por región.',
      },
      {
        id: 'c-q6',
        question:
          '¿Qué clase de almacenamiento en Cloud Storage tiene un compromiso de retención mínima de 90 días y está optimizada para datos a los que se accede menos de una vez por trimestre?',
        options: [
          'Standard',
          'Nearline',
          'Coldline',
          'Archive',
        ],
        correctIndex: 2,
        explanation:
          'Coldline Storage requiere una permanencia mínima de 90 días y está pensado para accesos infrecuentes (trimestrales). Nearline tiene un mínimo de 30 días y Archive de 365 días.',
      },
      {
        id: 'c-q7',
        question:
          '¿Qué comando debes ejecutar antes de utilizar la herramienta kubectl contra un clúster de Google Kubernetes Engine (GKE) recién creado desde Cloud Shell?',
        options: [
          'gcloud auth login',
          'gcloud container clusters get-credentials <NOMBRE_CLUSTER>',
          'kubectl init cluster',
          'gcloud compute ssh <NOMBRE_CLUSTER>',
        ],
        correctIndex: 1,
        explanation:
          'gcloud container clusters get-credentials descarga el endpoint y las credenciales de autenticación del clúster y las registra en el archivo local ~/.kube/config.',
      },
      {
        id: 'c-q8',
        question:
          'Deseas ejecutar un proceso de procesamiento por lotes (batch) en Compute Engine que puede tolerar terminaciones imprevistas de instancias. ¿Qué tipo de VM proporciona el mayor ahorro de costos?',
        options: [
          'Instancias reservadas (Reserved)',
          'Máquinas virtuales Spot / Preemptible',
          'Instancias E2 Standard con Sustained Use Discounts',
          'Nodos de inquilino exclusivo (Sole-tenant)',
        ],
        correctIndex: 1,
        explanation:
          'Las VMs Spot (preemptibles) ofrecen entre un 60% y un 91% de descuento respecto al precio estándar para cargas de trabajo tolerantes a interrupciones.',
      },
      {
        id: 'c-q9',
        question:
          'Un equipo necesita recolectar datos de sensores IoT que transmiten millones de escrituras por segundo con latencias inferiores a 10 milisegundos. ¿Qué base de datos de Google Cloud está diseñada para este patrón?',
        options: [
          'Cloud SQL MySQL',
          'Firestore',
          'Cloud Bigtable',
          'BigQuery',
        ],
        correctIndex: 2,
        explanation:
          'Cloud Bigtable es una base de datos NoSQL columnar masivamente escalable optimizada para escrituras continuas de alto rendimiento y latencias sub-10ms en series temporales e IoT.',
      },
      {
        id: 'c-q10',
        question:
          'Si se aplica una política de IAM que otorga roles/storage.admin a un usuario en el nivel de Carpeta de la jerarquía de recursos, ¿cuál es el efecto de dicha política en los proyectos dentro de esa carpeta?',
        options: [
          'El usuario tiene permisos de administrador de Storage en todos los buckets de todos los proyectos de esa carpeta, y este permiso no puede revocarse a nivel de proyecto.',
          'La política solo aplica a la carpeta física, no a los proyectos hijos.',
          'La política debe ser aprobada explícitamente en cada proyecto antes de surtir efecto.',
          'El propietario del proyecto puede anular y eliminar el rol asignado en la carpeta.',
        ],
        correctIndex: 0,
        explanation:
          'La herencia de IAM es jerárquica y aditiva. Los permisos otorgados en un nodo superior se heredan automáticamente en todos los recursos hijos y no pueden ser restringidos en un nivel inferior.',
      },
    ],
    glossary: [
      {
        term: 'Cloud Identity',
        definition:
          'Plataforma de Identidad como Servicio (IDaaS) que administra usuarios, grupos y políticas de seguridad para Google Cloud sin requerir licencias de Google Workspace.',
      },
      {
        term: 'Compute Engine',
        definition:
          'Servicio IaaS de Google Cloud para aprovisionar y gestionar máquinas virtuales sobre la infraestructura física global de Google.',
      },
      {
        term: 'Google Kubernetes Engine (GKE)',
        definition:
          'Servicio administrado de Kubernetes para desplegar, orquestar y escalar aplicaciones contenerizadas con opciones Standard y Autopilot.',
      },
      {
        term: 'Cloud Run',
        definition:
          'Plataforma serverless basada en Knative que ejecuta contenedores sin estado respondiendo a solicitudes HTTP y escalando a cero automáticamente.',
      },
      {
        term: 'Instance Template',
        definition:
          'Molde reutilizable de configuración de Compute Engine que define las especificaciones para crear instancias homogéneas en MIGs.',
      },
      {
        term: 'Managed Instance Group (MIG)',
        definition:
          'Grupo de máquinas virtuales idénticas gestionadas como una sola entidad que proporciona autoescalado, autorreparación y distribución multizona.',
      },
      {
        term: 'Service Account',
        definition:
          'Identidad no humana de IAM utilizada por aplicaciones y cargas de trabajo para autenticarse y acceder a las APIs de Google Cloud.',
      },
      {
        term: 'Virtual Private Cloud (VPC)',
        definition:
          'Red virtual definida por software de alcance global que interconecta recursos de Google Cloud mediante subredes regionales.',
      },
      {
        term: 'Predefined Role',
        definition:
          'Rol de IAM creado y administrado por Google que agrupa un conjunto granular de permisos adecuados para una función laboral concreta.',
      },
      {
        term: 'Ops Agent',
        definition:
          'Agente principal de telemetría instalado en VMs de Compute Engine que recolecta logs, métricas del sistema y procesos para Google Cloud Observability.',
      },
      {
        term: 'Autoscaling (Compute Engine)',
        definition:
          'Capacidad elástica de Compute Engine para añadir o sustraer automáticamente instancias de máquinas virtuales en un Managed Instance Group según métricas de carga (CPU, peticiones HTTP o Cloud Monitoring).',
      },
      {
        term: 'Shared VPC',
        definition:
          'Funcionalidad de red centralizada que permite a una organización compartir una red VPC y sus subredes desde un Host Project común con múltiples Service Projects administrados de forma independiente.',
      },
      {
        term: 'Cloud DNS',
        definition:
          'Servicio de DNS autoritativo global 100% administrado que ofrece resolución de nombres de dominio de baja latencia con 100% de disponibilidad sobre la infraestructura Anycast de Google.',
      },
      {
        term: 'Cloud CDN',
        definition:
          'Red de distribución de contenidos que utiliza los más de 100 puntos de presencia (PoPs / Edge Caches) de Google para almacenar en caché contenido estático y dinámico cerca de los usuarios finales.',
      },
      {
        term: 'Cloud VPN',
        definition:
          'Servicio de red que conecta de forma segura una red on-premises con una red VPC de Google a través de túneles IPsec sobre la internet pública con soporte de Cloud Router para BGP.',
      },
      {
        term: 'Cloud Interconnect',
        definition:
          'Solución de conectividad física privada y de alta velocidad (Dedicated o Partner) que conecta redes locales con Google VPC con hasta 99.99% de SLA sin circular por la internet pública.',
      },
    ],
  },
  {
    id: 'gcp-course-637',
    slug: 'set-up-an-app-dev-environment-google-cloud',
    templateId: '637',
    title: 'Set Up an App Dev Environment on Google Cloud',
    shortDescription:
      'Construye y conecta infraestructura cloud centrada en almacenamiento utilizando Cloud Storage, IAM, Cloud Run Functions y Cloud Pub/Sub mediante la consola y la CLI gcloud.',
    duration: '1 Hora 15 Minutos',
    level: 'Introductorio / Skill Badge',
    category: 'Application Development & Storage',
    badge: 'Google Cloud Skill Badge Course',
    overview:
      'El curso Set Up an App Dev Environment on Google Cloud capacita en la creación, administración y conexión de servicios de almacenamiento de objetos, control de acceso basado en identidad, cómputo serverless orientado a eventos y mensajería distribuida asíncrona. Incluye 9 laboratorios guiados y 1 desafío práctico evaluado (Challenge Lab), fundamentales para los dominios 1, 2, 3 y 4 de la certificación Associate Cloud Engineer.',
    classificationMatrix: [
      {
        lbType: 'Cloud Storage',
        layer: 'Almacenamiento de Objetos',
        scope: 'Global / Multi-Región / Región',
        trafficScheme: 'REST API / gcloud storage',
        architecture: 'Buckets inmutables con soporte Uniform Bucket-Level Access y clases escalonadas',
        useCase: 'Almacén central para activos de aplicación, pipelines de procesamiento y respaldos.',
      },
      {
        lbType: 'Cloud IAM',
        layer: 'Control de Acceso y Seguridad',
        scope: 'Organización / Proyecto / Recurso',
        trafficScheme: 'Políticas IAM centralizadas',
        architecture: 'Tríada Principal + Rol + Recurso con evaluación aditiva y menor privilegio',
        useCase: 'Aislamiento de permisos entre desarrolladores, operadores y cuentas de servicio.',
      },
      {
        lbType: 'Cloud Run functions',
        layer: 'Cómputo Serverless FaaS',
        scope: 'Regional',
        trafficScheme: 'Triggers HTTP y Eventos (Storage / Pub/Sub)',
        architecture: 'Contenedores efímeros basados en Knative con autoescalado a cero y cobro a 100 ms',
        useCase: 'Lógica reactiva puntual (glue code), redimensionamiento de imágenes y webhooks.',
      },
      {
        lbType: 'Cloud Pub/Sub',
        layer: 'Mensajería Asíncrona Distribuida',
        scope: 'Global con almacenamiento regional',
        trafficScheme: 'Suscripciones Pull / Push',
        architecture: 'Patrón publicador-suscriptor escalable con confirmación de mensajes (ACK/NACK)',
        useCase: 'Desacoplamiento de componentes, buffers de ingesta masiva y arquitecturas de microservicios.',
      },
      {
        lbType: 'Cloud Monitoring',
        layer: 'Observabilidad y Operaciones',
        scope: 'Espacio de trabajo (Metrics Workspace)',
        trafficScheme: 'Ops Agent / Hypervisor Telemetry',
        architecture: 'Recolección de métricas de sistema, procesos, paneles y políticas de alerta',
        useCase: 'Monitoreo de VMs Compute Engine (RAM, disco, CPU) y salud de aplicaciones.',
      },
      {
        lbType: 'Google Cloud CLI (gcloud)',
        layer: 'Gestión por Línea de Comandos',
        scope: 'Global',
        trafficScheme: 'REST APIs de Google Cloud',
        architecture: 'CLI pre-autenticada en Cloud Shell con soporte de gcloud storage y gcloud pubsub',
        useCase: 'Automatización de despliegues, administración de recursos y scripts operativos.',
      },
    ],
    healthCheckRanges: [
      {
        cidr: '10.128.0.0/9',
        purpose: 'Rango de subredes predeterminado en VPCs de proyectos de laboratorio.',
      },
      {
        cidr: '0.0.0.0/0',
        purpose: 'Acceso comodín para llamadas públicas autorizadas a Cloud Run Functions.',
      },
    ],
    examTraps: [
      {
        trap: 'Intentar consultar métricas de uso de memoria RAM en Cloud Monitoring sin instalar el Ops Agent',
        solution:
          'El hipervisor de Compute Engine solo mide CPU externa y tráfico de red. Para monitorear memoria RAM y espacio en disco a nivel de SO, es obligatorio instalar el Google Cloud Ops Agent en la VM.',
      },
      {
        trap: 'Confundir las herramientas de CLI: gsutil frente a gcloud storage',
        solution:
          'Aunque gsutil sigue siendo funcional por compatibilidad histórica, el estándar moderno oficial promovido por Google y evaluado en ACE es gcloud storage, el cual ofrece transferencias más veloces mediante paralelismo nativo.',
      },
      {
        trap: 'Mensajes reenviados continuamente en suscripciones Pull de Cloud Pub/Sub',
        solution:
          'Si el suscriptor procesa el mensaje pero no envía una confirmación explícita (ack) antes de que venza el ack_deadline, Pub/Sub volverá a entregar el mensaje a otro consumidor.',
      },
      {
        trap: 'Asignar roles básicos (Owner/Editor) a usuarios para permitirles ver objetos de Cloud Storage',
        solution:
          'Viola el principio de menor privilegio. Para el examen ACE se deben utilizar siempre roles predefinidos granulares como roles/storage.objectViewer.',
      },
    ],
    labs: [
      {
        id: 'appdev-lab-1',
        labNumber: 1,
        title: 'Manage Cloud Storage with the Google Cloud Console',
        durationMinutes: 10,
        type: 'guided',
        description:
          'Aprende a realizar tareas fundamentales de administración en Cloud Storage a través de la consola web: creación de buckets con reglas de nomenclatura globales, subida y organización de objetos en carpetas virtuales, y concesión de acceso público a objetos mediante IAM.',
        keyConcepts: [
          'Espacio de nombres global: Todo bucket debe poseer un nombre único a nivel mundial entre 3 y 63 caracteres.',
          'Control de acceso uniforme (UBLA): Deshabilita ACLs individuales a nivel de objeto para unificar la gobernanza en IAM.',
          'Prevención de acceso público (PAP): Control de seguridad que impide la exposición accidental a internet.',
          'Estructura de objetos plana: Las carpetas son prefijos delimitados por / en la clave del objeto dentro de un namespace plano.',
        ],
        steps: [
          {
            id: 'appdev-l1-s1',
            stepNumber: 1,
            title: 'Crear un bucket en Cloud Storage mediante la Consola Web',
            description:
              'En Cloud Console, navega a Cloud Storage > Buckets, haz clic en + Create. Asigna como nombre tu PROJECT_ID para garantizar unicidad global, selecciona clase Standard, tipo Region y desmarca la prevención de acceso público.',
            command: `# Navegación en Google Cloud Console:
# Navigation menu > Cloud Storage > Buckets > + Create
# Name: <PROJECT_ID> (namespace global único)
# Location type: Region (ej. us-central1)
# Storage class: Standard
# Access control: Uniform (UBLA)
# Public access prevention: Desmarcar "Enforce public access prevention on this bucket"`,
            tip: 'Los nombres de bucket no pueden ser direcciones IP, ni comenzar con "goog", ni contener "google". Nombres con puntos requieren verificación de dominio.',
          },
          {
            id: 'appdev-l1-s2',
            stepNumber: 2,
            title: 'Subir un objeto al bucket (kitten.png)',
            description:
              'Dentro del bucket, haz clic en Upload > Upload files y selecciona la imagen kitten.png. Verifica sus metadatos (tamaño, tipo MIME image/png).',
            command: `# En la consola:
# Entrar al bucket creado > Pestaña "Objects"
# Clic en "Upload" > "Upload files" > Seleccionar kitten.png`,
            tip: 'Los nombres de los objetos solo deben ser únicos dentro de su propio bucket; múltiples buckets pueden contener un objeto con el mismo nombre.',
          },
          {
            id: 'appdev-l1-s3',
            stepNumber: 3,
            title: 'Compartir el objeto públicamente con allUsers',
            description:
              'Ve a la pestaña Permissions del bucket, haz clic en Grant access. En New principals escribe allUsers y selecciona el rol Cloud Storage > Storage Object Viewer (roles/storage.objectViewer). Confirma en Allow public access.',
            command: `# En la consola:
# Pestaña "Permissions" > "Grant access"
# New principals: allUsers
# Role: Cloud Storage > Storage Object Viewer (roles/storage.objectViewer)
# Guardar y confirmar en "Allow public access"
# URL generada: https://storage.googleapis.com/<BUCKET_NAME>/kitten.png`,
            tip: 'allUsers representa a cualquier persona en internet (sin autenticación requerida). Para el examen ACE, conceder permisos con roles predefinidos de Storage es la práctica recomendada sobre roles básicos.',
          },
          {
            id: 'appdev-l1-s4',
            stepNumber: 4,
            title: 'Crear carpetas y subcarpetas lógicas (folder1/folder2/)',
            description:
              'En la pestaña Objects, haz clic en Create folder, nombra folder1. Entra a folder1, crea folder2 y sube un archivo para constatar la simulación de rutas jerárquicas.',
            command: `# En la consola:
# Pestaña "Objects" > "Create folder" > Name: folder1
# Entrar a folder1 > "Create folder" > Name: folder2
# Entrar a folder2 > "Upload files" > Subir archivo de prueba`,
            tip: 'Cloud Storage no es un sistema de archivos tradicional; las carpetas son abstracciones gráficas del delimitador / en la clave del objeto (folder1/folder2/archivo.png).',
          },
          {
            id: 'appdev-l1-s5',
            stepNumber: 5,
            title: 'Eliminar una carpeta y confirmar la acción destructiva',
            description:
              'Regresa al nivel superior del bucket, selecciona folder1 y haz clic en Delete. Escribe la palabra DELETE para confirmar la eliminación recursiva permanente de todos los objetos contenidos.',
            command: `# En la consola:
# Seleccionar casilla de folder1 > Clic en "Delete"
# En el cuadro de diálogo escribir: DELETE > Clic en "Delete"`,
          },
        ],
      },
      {
        id: 'appdev-lab-2',
        labNumber: 2,
        title: 'Manage Cloud Storage with the Google Cloud CLI',
        durationMinutes: 15,
        type: 'guided',
        description:
          'Administra buckets y objetos en Cloud Storage desde Cloud Shell utilizando el conjunto de comandos modernos gcloud storage: creación de buckets, carga/descarga de archivos, carpetas lógicas, metadatos y control de acceso con ACLs públicas.',
        keyConcepts: [
          'gcloud storage CLI: Sintaxis moderna y optimizada que sustituye formalmente a gsutil en el examen ACE v4.0.',
          'Control de acceso con ACLs: Asignación granular por objeto mediante banderas --add-acl-grant y --remove-acl-grant.',
          'Listados detallados: Uso de gcloud storage ls -l para auditar tamaño en bytes, marcas de tiempo y tipos MIME.',
          'Operaciones jerárquicas simuladas: Copia de objetos hacia prefijos virtuales delimitados por barra oblicua (image-folder/).',
        ],
        steps: [
          {
            id: 'appdev-l2-s1',
            stepNumber: 1,
            title: 'Crear bucket con gcloud storage buckets create',
            description:
              'Establece la región de cómputo en la configuración de gcloud y crea un nuevo bucket respetando las reglas de nomenclatura universal.',
            command: `gcloud config set compute/region "<REGION>"
gcloud storage buckets create gs://<YOUR-BUCKET-NAME>`,
            tip: 'Si el nombre de bucket ya está ocupado en la infraestructura global de Google Cloud, el comando retornará un error 409 Bucket already exists.',
          },
          {
            id: 'appdev-l2-s2',
            stepNumber: 2,
            title: 'Subir y descargar objetos (ada.jpg)',
            description:
              'Descarga la imagen de Ada Lovelace en Cloud Shell, cárgala al bucket con gcloud storage cp y pruébala descargándola localmente.',
            command: `# Descargar imagen en Cloud Shell
curl https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg --output ada.jpg

# Subir al bucket y limpiar copia local
gcloud storage cp ada.jpg gs://<YOUR-BUCKET-NAME>
rm ada.jpg

# Descargar desde el bucket
gcloud storage cp -r gs://<YOUR-BUCKET-NAME>/ada.jpg .`,
          },
          {
            id: 'appdev-l2-s3',
            stepNumber: 3,
            title: 'Copiar a carpetas virtuales y listar metadatos con ls -l',
            description:
              'Copia la imagen a una ruta con prefijo image-folder/ y audita los metadatos detallados del objeto.',
            command: `# Copiar objeto a carpeta simulada
gcloud storage cp gs://<YOUR-BUCKET-NAME>/ada.jpg gs://<YOUR-BUCKET-NAME>/image-folder/

# Listar contenido del bucket
gcloud storage ls gs://<YOUR-BUCKET-NAME>

# Inspeccionar metadatos detallados (tamaño, fecha ISO)
gcloud storage ls -l gs://<YOUR-BUCKET-NAME>/ada.jpg`,
            tip: 'Cloud Storage no tiene directorios físicos; image-folder/ es una clave de objeto con prefijo interpretada jerárquicamente por la consola y la CLI.',
          },
          {
            id: 'appdev-l2-s4',
            stepNumber: 4,
            title: 'Publicar el objeto en internet mediante ACLs (--add-acl-grant)',
            description:
              'Otorga permiso de lectura a todos los usuarios de internet mediante el identificador entity=allUsers y el rol READER.',
            command: `gcloud storage objects update gs://<YOUR-BUCKET-NAME>/ada.jpg --add-acl-grant=entity=allUsers,role=READER

# URL generada para acceso web público:
# https://storage.googleapis.com/<YOUR-BUCKET-NAME>/ada.jpg`,
            tip: 'Las ACLs solo son aplicables si el bucket tiene activo el control de acceso granular (Fine-Grained). Con UBLA habilitado, las ACLs están bloqueadas.',
          },
          {
            id: 'appdev-l2-s5',
            stepNumber: 5,
            title: 'Revocar acceso público (--remove-acl-grant) y eliminar objeto',
            description:
              'Retira el acceso público eliminando la entrada de allUsers y borra el archivo mediante gcloud storage rm.',
            command: `# Revocar permiso público a allUsers
gcloud storage objects update gs://<YOUR-BUCKET-NAME>/ada.jpg --remove-acl-grant=allUsers

# Eliminar el objeto del bucket
gcloud storage rm gs://<YOUR-BUCKET-NAME>/ada.jpg`,
          },
        ],
      },
      {
        id: 'appdev-lab-3',
        labNumber: 3,
        title: 'Manage Access Control with IAM',
        durationMinutes: 15,
        type: 'guided',
        description:
          'Configura y audita políticas de Identity and Access Management (IAM) con dos identidades concurrentes: explora los 4 roles básicos frente a roles predefinidos, revoca accesos de proyecto y aplica el principio de menor privilegio con Storage Object Viewer.',
        keyConcepts: [
          'Tríada de IAM: Principal (Identidad), Rol (Colección de permisos) y Recurso.',
          '4 Roles Básicos (Primitivos): roles/browser, roles/viewer, roles/editor y roles/owner a nivel de proyecto.',
          'Propagación de Políticas: Los cambios de membresía en IAM pueden tardar hasta 80 segundos en replicarse.',
          'Menor Privilegio (Least Privilege): Reemplazar roles básicos amplios por roles predefinidos específicos de servicio.',
        ],
        steps: [
          {
            id: 'appdev-l3-s1',
            stepNumber: 1,
            title: 'Explorar roles de IAM a nivel de proyecto (Owner vs Viewer)',
            description:
              'Inicia sesión con Username 1 (Owner) y Username 2 (Viewer). Constata que Username 2 tiene deshabilitado el botón Grant access al carecer del permiso resourcemanager.projects.setIamPolicy.',
            command: `# Inspeccionar las vinculaciones de IAM del proyecto actual:
gcloud projects get-iam-policy $GOOGLE_CLOUD_PROJECT \\
  --format="table(bindings.role, bindings.members)"`,
            tip: 'Los 4 roles básicos establecen permisos amplios sobre todos los servicios del proyecto; su uso en entornos productivos está desaconsejado.',
          },
          {
            id: 'appdev-l3-s2',
            stepNumber: 2,
            title: 'Preparar bucket de Cloud Storage y verificar lectura de Viewer',
            description:
              'Username 1 crea un bucket y sube sample.txt. Username 2 accede a Cloud Storage y confirma que puede listar el bucket gracias a su rol de proyecto roles/viewer.',
            command: `# Con Username 1:
gcloud storage buckets create gs://<PROJECT_ID>-iam-test --location=us
echo "Test file for IAM" > sample.txt
gcloud storage cp sample.txt gs://<PROJECT_ID>-iam-test/sample.txt`,
          },
          {
            id: 'appdev-l3-s3',
            stepNumber: 3,
            title: 'Revocar el rol Project Viewer a Username 2',
            description:
              'Username 1 elimina la vinculación del rol Viewer de Username 2. Tras el tiempo de propagación (hasta 80s), Username 2 recibe error de permisos denegados al intentar consultar el bucket.',
            command: `# Revocar rol Viewer a Username 2:
gcloud projects remove-iam-policy-binding $GOOGLE_CLOUD_PROJECT \\
  --member="user:<USERNAME_2_EMAIL>" \\
  --role="roles/viewer"`,
            tip: 'Las actualizaciones de políticas IAM pueden demorar hasta 80 segundos en propagarse globalmente por la red de Google Cloud.',
          },
          {
            id: 'appdev-l3-s4',
            stepNumber: 4,
            title: 'Conceder rol predefinido Storage Object Viewer y validar en Cloud Shell',
            description:
              'Username 1 asigna el rol predefinido roles/storage.objectViewer a Username 2. Username 2 abre Cloud Shell y lista exitosamente los objetos del bucket sin tener visibilidad sobre el resto del proyecto.',
            command: `# Asignar rol predefinido específico a Username 2:
gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT \\
  --member="user:<USERNAME_2_EMAIL>" \\
  --role="roles/storage.objectViewer"

# Verificar desde Cloud Shell con Username 2:
gcloud storage ls gs://<PROJECT_ID>-iam-test/`,
            tip: 'El rol predefinido roles/storage.objectViewer otorga acceso exclusivo a nivel de objetos en Storage, aislando el resto de los servicios de la infraestructura.',
          },
        ],
      },
      {
        id: 'appdev-lab-4',
        labNumber: 4,
        title: 'Monitor a Compute Engine Instance with Cloud Monitoring',
        durationMinutes: 20,
        type: 'guided',
        description:
          'Aprende a monitorizar la salud y rendimiento de una VM en Compute Engine: instala el Google Cloud Ops Agent para telemetría interna de SO, configura comprobaciones de tiempo de actividad (Uptime Checks), políticas de alerta por umbral y paneles personalizados.',
        keyConcepts: [
          'Google Cloud Ops Agent: Agente de telemetría unificado (Fluent Bit + OpenTelemetry) para recolección de métricas internas y logs.',
          'Métricas internas de SO: La memoria RAM y el espacio en disco requieren obligatoriamente el Ops Agent; el hipervisor no puede medirlos.',
          'Uptime Checks: Verificación periódica de disponibilidad y latencia HTTP desde múltiples sondas distribuidas mundialmente.',
          'Políticas de Alerta y Notificación: Disparo de avisos por correo o Slack al sobrepasar umbrales de tráfico o consumo.',
        ],
        steps: [
          {
            id: 'appdev-l4-s1',
            stepNumber: 1,
            title: 'Crear VM lamp-1-vm e instalar servidor web Apache2',
            description:
              'Aprovisiona una instancia Compute Engine e2-medium con la etiqueta de cortafuegos Allow HTTP traffic, conéctate por SSH e instala Apache2 y PHP.',
            command: `# En la VM por SSH:
sudo apt-get update
sudo apt-get install -y apache2 php
sudo service apache2 restart`,
            tip: 'Habilitar "Allow HTTP traffic" en la consola aplica automáticamente la etiqueta de red http-server y su correspondiente regla de firewall en la VPC.',
          },
          {
            id: 'appdev-l4-s2',
            stepNumber: 2,
            title: 'Instalar y validar el Google Cloud Ops Agent',
            description:
              'Ejecuta el script oficial de instalación del Ops Agent dentro del sistema operativo invitado para habilitar la telemetría interna.',
            command: `curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
sudo systemctl status google-cloud-ops-agent"*"`,
            tip: 'El Ops Agent sustituye tanto al antiguo Stackdriver Monitoring Agent como al Logging Agent en una única solución ligera.',
          },
          {
            id: 'appdev-l4-s3',
            stepNumber: 3,
            title: 'Crear Uptime Check para monitorizar disponibilidad web',
            description:
              'Configura un Uptime Check en Cloud Monitoring de tipo HTTP apuntando a la IP externa de la VM con frecuencia de sondeo de 1 minuto.',
            command: `# En Google Cloud Console:
# Monitoring > Uptime checks > + Create Uptime Check
# Protocol: HTTP | Resource Type: URL | Hostname: <EXTERNAL_IP>
# Check Frequency: 1 minute | Title: Lamp Uptime Check`,
          },
          {
            id: 'appdev-l4-s4',
            stepNumber: 4,
            title: 'Configurar política de alertas (Alerting Policy)',
            description:
              'Define una alerta basada en la métrica agent.googleapis.com/interface/traffic con umbral superior a 500 y canal de notificación por email.',
            command: `# En Google Cloud Console:
# Monitoring > Alerting > + Create Policy
# Metric: VM instance > Interface > Network traffic (agent.googleapis.com/interface/traffic)
# Condition: Above threshold (500) | Retest window: 1 min
# Notification channel: Email | Alert name: Inbound Traffic Alert`,
          },
          {
            id: 'appdev-l4-s5',
            stepNumber: 5,
            title: 'Diseñar Dashboard personalizado y revisar logs',
            description:
              'Crea el panel "Cloud Monitoring LAMP Qwik Start Dashboard" con gráficos de CPU Load (1m) y Received Packets, y audita eventos en Logs Explorer.',
            command: `# En Google Cloud Console:
# Monitoring > Dashboards > + Create Custom Dashboard
# Add Widget 1: Line Chart > CPU load (1m)
# Add Widget 2: Line Chart > Received packets
# Logging > Logs Explorer > Filtrar por lamp-1-vm`,
            tip: 'En el examen ACE, Cloud Logging y Cloud Monitoring permiten realizar diagnósticos de causas raíz inspeccionando registros de parada y arranque de VMs.',
          },
        ],
      },
      {
        id: 'appdev-lab-5',
        labNumber: 5,
        title: 'Deploy a Cloud Run Function via the Google Cloud Console',
        durationMinutes: 15,
        type: 'guided',
        description:
          'Aprende a crear y desplegar una función serverless de 2ª generación activada por solicitudes HTTPS en Google Cloud Console: configura límites de escalado (máximo 5 instancias), despliega código Node.js y prueba la ejecución con Cloud Logging.',
        keyConcepts: [
          'Cloud Run functions (2nd gen): Cómputo serverless FaaS basado en contenedores Knative gestionados por Cloud Run.',
          'Trigger HTTPS: Activación síncrona mediante peticiones web sin autenticación (roles/run.invoker para allUsers).',
          'Límites de Escalabilidad (Max Instances): Control de concurrencia y prevención de sobrecarga en sistemas backend.',
          'Observabilidad Integrada: Inspección de latencia a nivel de 100 ms y trazas de ejecución en Cloud Logging.',
        ],
        steps: [
          {
            id: 'appdev-l5-s1',
            stepNumber: 1,
            title: 'Crear función gcfunction en Cloud Run Services',
            description:
              'En Cloud Console navega a Serverless > Cloud Run > Services, haz clic en WRITE A FUNCTION, nombra el servicio gcfunction, selecciona 2da generación, permite acceso público y fija el máximo de instancias en 5.',
            command: `# Parámetros en Google Cloud Console:
# Service name: gcfunction | Region: <REGION>
# Authentication: Allow public access
# Execution environment: Second generation
# Revision scaling: Maximum number of instances: 5`,
            tip: 'Limitar el número máximo de instancias concurrentes previene que picos repentinos de tráfico agoten las conexiones a bases de datos relacionales como Cloud SQL.',
          },
          {
            id: 'appdev-l5-s2',
            stepNumber: 2,
            title: 'Desplegar la implementación base helloHttp',
            description:
              'En el editor en línea integrado, conserva la implementación predeterminada de index.js con el framework de funciones de Google y haz clic en SAVE and REDEPLOY.',
            command: `# Código fuente en index.js:
const functions = require('@google-cloud/functions-framework');
functions.http('helloHttp', (req, res) => {
  res.send(\`Hello \${req.query.name || req.body.name || 'World'}!\`);
});`,
          },
          {
            id: 'appdev-l5-s3',
            stepNumber: 3,
            title: 'Probar la función con carga útil JSON',
            description:
              'En la pestaña TEST, envía el evento desencadenante {"message":"Hello World!"} o invoca la URL pública directamente desde Cloud Shell con curl.',
            command: `curl -X POST https://<REGION>-<PROJECT_ID>.cloudfunctions.net/gcfunction \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Hello World!"}'`,
          },
          {
            id: 'appdev-l5-s4',
            stepNumber: 4,
            title: 'Inspeccionar registros de ejecución en Cloud Logging',
            description:
              'En la pestaña Observability > Logs, valida los tiempos de ejecución, arranque en frío y confirmaciones de respuesta HTTP 200.',
            command: `# En Google Cloud Console:
# Service Details > Observability > Logs
# O por CLI en Cloud Shell:
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=gcfunction" --limit=10`,
          },
        ],
      },
      {
        id: 'appdev-lab-6',
        labNumber: 6,
        title: 'Deploy a Cloud Run Function via the Command Line',
        durationMinutes: 15,
        type: 'guided',
        description:
          'Escribe y despliega una Cloud Run function de 2ª generación orientada a eventos mediante la CLI de gcloud: decodifica mensajes de Pub/Sub en Base64 con CloudEvents, vincula un disparador de topic y audita registros en Cloud Logging.',
        keyConcepts: [
          'gcloud functions deploy: Banderas troncales (--gen2, --trigger-topic, --entry-point, --service-account).',
          'Decodificación Base64: Los mensajes de Cloud Pub/Sub empaquetan los datos en buffers codificados en Base64.',
          'Eventarc en 2ª Generación: Los eventos no HTTP se transmiten como CloudEvents estructurados mediante Eventarc.',
          'Cuentas de Servicio Dedicadas: Asignación de identidades de ejecución con privilegios mínimos en lugar de credenciales por defecto.',
        ],
        steps: [
          {
            id: 'appdev-l6-s1',
            stepNumber: 1,
            title: 'Preparar código fuente gcf_hello_world con CloudEvents',
            description:
              'Crea el directorio de trabajo, el archivo index.js para decodificar mensajes Pub/Sub en base64 y el archivo package.json con Functions Framework.',
            command: `gcloud config set run/region REGION
mkdir -p gcf_hello_world && cd gcf_hello_world

cat <<'EOF' > index.js
const functions = require('@google-cloud/functions-framework');

functions.cloudEvent('helloPubSub', cloudEvent => {
  const base64name = cloudEvent.data.message.data;
  const name = base64name ? Buffer.from(base64name, 'base64').toString() : 'World';
  console.log(\`Hello, \${name}!\`);
});
EOF

cat <<'EOF' > package.json
{
  "name": "gcf_hello_world",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0"
  }
}
EOF
npm install`,
          },
          {
            id: 'appdev-l6-s2',
            stepNumber: 2,
            title: 'Desplegar función reactiva con disparador Pub/Sub',
            description:
              'Ejecuta el despliegue especificando el entorno de 2da generación (--gen2), el disparador de topic (--trigger-topic=cf-demo) y la cuenta de servicio dedicada.',
            command: `gcloud functions deploy nodejs-pubsub-function \\
  --gen2 \\
  --runtime=nodejs20 \\
  --region=REGION \\
  --source=. \\
  --entry-point=helloPubSub \\
  --trigger-topic=cf-demo \\
  --stage-bucket=$PROJECT_ID-bucket \\
  --service-account=cloudfunctionsa@$PROJECT_ID.iam.gserviceaccount.com \\
  --allow-unauthenticated`,
            tip: 'En 2ª generación, --trigger-topic aprovisiona automáticamente un trigger de Eventarc y una suscripción a nivel de Pub/Sub.',
          },
          {
            id: 'appdev-l6-s3',
            stepNumber: 3,
            title: 'Verificar estado del servicio con gcloud functions describe',
            description:
              'Consulta la configuración activa y corrobora que el estado de la función reporte State: ACTIVE.',
            command: `gcloud functions describe nodejs-pubsub-function --region=REGION`,
          },
          {
            id: 'appdev-l6-s4',
            stepNumber: 4,
            title: 'Publicar mensaje en Pub/Sub y leer logs en Cloud Logging',
            description:
              'Envía un mensaje de prueba al topic cf-demo para activar la ejecución de la función y consulta las trazas emitidas.',
            command: `# Publicar mensaje:
gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"

# Leer logs generados:
gcloud functions logs read nodejs-pubsub-function --region=REGION`,
            tip: 'En el examen ACE, verificar la entrega y procesamiento de mensajes en la combinación Pub/Sub + Cloud Run functions es un patrón de microservicios estándar.',
          },
        ],
      },
      {
        id: 'appdev-lab-7',
        labNumber: 7,
        title: 'Manage Pub/Sub in the Google Cloud Console',
        durationMinutes: 10,
        type: 'guided',
        description:
          'Aprende a crear temas (Topics) y suscripciones de tipo Pull en Google Cloud Pub/Sub utilizando la interfaz web de la consola: publica mensajes de prueba y extráelos confirmando su recepción desde Cloud Shell.',
        keyConcepts: [
          'Modelo Publicador-Suscriptor: Desacoplamiento asíncrono entre productores y consumidores de datos.',
          'Topics de Pub/Sub: Canales de mensajería con retención duradera multi-zonal de hasta 7 días.',
          'Suscripciones Pull: Mecanismo de sondeo activo donde el consumidor solicita los mensajes a su propio ritmo.',
          'Confirmación de Mensajes (ACK): Prevención de reenvíos al confirmar la recepción dentro del plazo ack_deadline.',
        ],
        steps: [
          {
            id: 'appdev-l7-s1',
            stepNumber: 1,
            title: 'Crear el topic MyTopic en la consola de Pub/Sub',
            description:
              'En Cloud Console navega a Analytics > Pub/Sub > Topics, haz clic en Create topic y asigna el Topic ID MyTopic.',
            command: `# Navegación en Google Cloud Console:
# Navigation menu > Analytics > Pub/Sub > Topics > Create topic
# Topic ID: MyTopic (genera el recurso projects/<PROJECT_ID>/topics/MyTopic)`,
          },
          {
            id: 'appdev-l7-s2',
            stepNumber: 2,
            title: 'Crear suscripción de tipo Pull (MySub)',
            description:
              'En el menú de opciones de MyTopic, selecciona Create subscription, nombra la suscripción MySub y elige el Delivery Type Pull.',
            command: `# Parámetros en Google Cloud Console:
# Topic: projects/<PROJECT_ID>/topics/MyTopic
# Subscription ID: MySub
# Delivery Type: Pull (Sondeo activo)
# Acknowledgment deadline: 10 seconds`,
            tip: 'Las suscripciones Pull son recomendadas para cargas de trabajo en lote y servicios que ejecutan en Compute Engine o GKE detrás de cortafuegos.',
          },
          {
            id: 'appdev-l7-s3',
            stepNumber: 3,
            title: 'Publicar mensaje de prueba en MyTopic',
            description:
              'En los detalles de MyTopic, ve a la pestaña Messages, haz clic en Publish Message, ingresa "Hello World" y publica.',
            command: `# En Google Cloud Console:
# Topics > MyTopic > Pestaña "Messages" > Clic en "Publish Message"
# Message: Hello World > Clic en "Publish"`,
          },
          {
            id: 'appdev-l7-s4',
            stepNumber: 4,
            title: 'Consumir el mensaje con confirmación automática en Cloud Shell',
            description:
              'Ejecuta el comando gcloud pubsub subscriptions pull con la bandera --auto-ack para extraer el mensaje y confirmar su recepción.',
            command: `gcloud pubsub subscriptions pull --auto-ack MySub`,
            tip: 'La bandera --auto-ack envía automáticamente el acuse de recibo a Pub/Sub, eliminando el mensaje de la cola de la suscripción para evitar retransmisiones.',
          },
        ],
      },
      {
        id: 'appdev-lab-8',
        labNumber: 8,
        title: 'Pub/Sub: Qwik Start - Command Line',
        durationMinutes: 10,
        type: 'guided',
        description:
          'Domina las operaciones completas de mensajería asíncrona mediante la CLI gcloud pubsub: creación y depuración de temas y suscripciones, publicación concurrente y extracción unitaria y por lotes con --limit y --auto-ack.',
        keyConcepts: [
          'gcloud pubsub topics: Comandos de creación, listado y eliminación de canales de mensajería.',
          'gcloud pubsub subscriptions: Configuración de suscripciones Pull asociadas a topics específicos.',
          'Bandera --auto-ack: Confirmación automática inmediata del mensaje en la lectura para sacarlo de la cola.',
          'Bandera --limit: Extracción de múltiples mensajes en una sola invocación por lotes para control de flujo.',
        ],
        steps: [
          {
            id: 'appdev-l8-s1',
            stepNumber: 1,
            title: 'Crear, listar y eliminar temas con gcloud pubsub topics',
            description:
              'Aprovisiona los temas myTopic, Test1 y Test2, visualízalos en formato descriptivo y elimina los temas temporales.',
            command: `gcloud pubsub topics create myTopic
gcloud pubsub topics create Test1
gcloud pubsub topics create Test2
gcloud pubsub topics list
gcloud pubsub topics delete Test1
gcloud pubsub topics delete Test2`,
          },
          {
            id: 'appdev-l8-s2',
            stepNumber: 2,
            title: 'Crear y gestionar suscripciones asociadas a un tema',
            description:
              'Crea suscripciones vinculadas a myTopic, lista las suscripciones activas del tema y depura las suscripciones de prueba.',
            command: `gcloud pubsub subscriptions create --topic myTopic mySubscription
gcloud pubsub subscriptions create --topic myTopic Test1
gcloud pubsub subscriptions create --topic myTopic Test2
gcloud pubsub topics list-subscriptions myTopic
gcloud pubsub subscriptions delete Test1
gcloud pubsub subscriptions delete Test2`,
            tip: 'Los mensajes enviados a un tema sin suscripciones activas se descartan permanentemente; las suscripciones deben crearse antes de iniciar la publicación.',
          },
          {
            id: 'appdev-l8-s3',
            stepNumber: 3,
            title: 'Publicar mensajes y extraerlos unitariamente con --auto-ack',
            description:
              'Envía varios mensajes al tema y extrae uno por uno con confirmación automática hasta vaciar la cola.',
            command: `gcloud pubsub topics publish myTopic --message "Hello"
gcloud pubsub topics publish myTopic --message "Publisher likes to eat Pizza"
gcloud pubsub subscriptions pull mySubscription --auto-ack`,
          },
          {
            id: 'appdev-l8-s4',
            stepNumber: 4,
            title: 'Extracción concurrente por lotes con la bandera --limit',
            description:
              'Publica un lote de mensajes y recupéralos simultáneamente en una única llamada especificando el límite máximo.',
            command: `gcloud pubsub topics publish myTopic --message "Batch Message 1"
gcloud pubsub topics publish myTopic --message "Batch Message 2"
gcloud pubsub topics publish myTopic --message "Batch Message 3"
gcloud pubsub subscriptions pull mySubscription --limit=3`,
            tip: 'En el examen ACE, la bandera --limit optimiza la eficiencia de red al reducir el número de peticiones pull necesarias para procesar colas masivas.',
          },
        ],
      },
      {
        id: 'appdev-lab-9',
        labNumber: 9,
        title: 'Publish and Subscribe to Messages in Pub/Sub Using Python',
        durationMinutes: 10,
        type: 'guided',
        description:
          'Desarrolla flujos de mensajería asíncrona en Python con la librería cliente oficial google-cloud-pubsub: crea temas y suscripciones programáticamente, publica eventos y consúmelos mediante streaming pull asíncrono con callbacks y acuse explícito.',
        keyConcepts: [
          'google-cloud-pubsub SDK: Librería de alto rendimiento sobre gRPC bidireccional para publicación y consumo.',
          'PublisherClient: Generación de topic_path y publicación de cargas útiles obligatoriamente codificadas en bytes.',
          'SubscriberClient y Streaming Pull: Escucha concurrente de mensajes con función callback y acuse explícito message.ack().',
          'Aislamiento con Entornos Virtuales: Uso de venv para control estricto de dependencias en Cloud Shell.',
        ],
        steps: [
          {
            id: 'appdev-l9-s1',
            stepNumber: 1,
            title: 'Configurar entorno virtual e instalar el SDK oficial',
            description:
              'Inicializa el entorno virtual de Python, instala la librería google-cloud-pubsub y clona los snippets oficiales.',
            command: `python3 -m venv venv && source venv/bin/activate
pip install --upgrade google-cloud-pubsub
git clone https://github.com/googleapis/python-pubsub.git
cd python-pubsub/samples/snippets`,
          },
          {
            id: 'appdev-l9-s2',
            stepNumber: 2,
            title: 'Crear y listar temas con el SDK de Python',
            description:
              'Ejecuta el script publisher.py para invocar PublisherClient.create_topic() y listar los topics del proyecto.',
            command: `# Crear topic MyTopic:
python publisher.py $GOOGLE_CLOUD_PROJECT create MyTopic

# Listar topics registrados:
python publisher.py $GOOGLE_CLOUD_PROJECT list`,
            tip: 'En el SDK de Python, las cargas útiles a publicar deben enviarse siempre codificadas como bytes (ej. data.encode("utf-8")).',
          },
          {
            id: 'appdev-l9-s3',
            stepNumber: 3,
            title: 'Crear suscripción Pull con subscriber.py',
            description:
              'Aprovisiona la suscripción MySub vinculada a MyTopic mediante SubscriberClient.create_subscription().',
            command: `# Crear suscripción MySub:
python subscriber.py $GOOGLE_CLOUD_PROJECT create MyTopic MySub

# Listar suscripciones del proyecto:
python subscriber.py $GOOGLE_CLOUD_PROJECT list-in-project`,
          },
          {
            id: 'appdev-l9-s4',
            stepNumber: 4,
            title: 'Publicar mensajes y consumirlos con streaming pull asíncrono',
            description:
              'Publica mensajes con gcloud pubsub topics publish y recíbelos en tiempo real mediante la función de callback de subscriber.py.',
            command: `# Publicar mensajes de prueba:
gcloud pubsub topics publish MyTopic --message "Hello"
gcloud pubsub topics publish MyTopic --message "Publisher likes to eat Pizza"

# Escuchar y procesar mensajes con callback y message.ack():
python subscriber.py $GOOGLE_CLOUD_PROJECT receive MySub`,
            tip: 'Omitir message.ack() en el callback del suscriptor provoca que Pub/Sub reenvíe el mensaje al vencer el ack_deadline (at-least-once delivery).',
          },
        ],
      },
      {
        id: 'appdev-lab-10',
        labNumber: 10,
        title: 'Set Up an App Dev Environment on Google Cloud: Challenge Lab',
        durationMinutes: 25,
        type: 'challenge',
        description:
          'Pon a prueba tus habilidades resolviendo un escenario integral para Jooli Inc. (proyecto Memories): crea un bucket de Cloud Storage, un topic de Cloud Pub/Sub, despliega una Cloud Run Function de 2ª generación en Node.js 22 con trigger de Storage y librería sharp para generar miniaturas de 64x64, y revoca el acceso de IAM al ingeniero anterior.',
        keyConcepts: [
          'Evaluación Práctica Desatendida: Resolución autónoma de requerimientos arquitectónicos bajo tiempo límite de 25 minutos.',
          'Pipeline Serverless Integrado: Cloud Storage (Eventarc) -> Cloud Run Functions (gen2 Node.js 22 + sharp) -> Cloud Pub/Sub.',
          'Gobernanza IAM: Revocación estricta de accesos obsoletos (roles/viewer) en cumplimiento del principio de menor privilegio.',
        ],
        steps: [
          {
            id: 'appdev-l10-s1',
            stepNumber: 1,
            title: 'Crear el bucket de Cloud Storage para almacenar fotografías',
            description:
              'Aprovisiona un bucket en la región asignada por el reto utilizando la CLI gcloud storage.',
            command: `export REGION="<REGION_DEL_LAB>"
export BUCKET_NAME="<BUCKET_NAME_ASIGNADO>"
gcloud storage buckets create gs://$BUCKET_NAME --location=$REGION`,
          },
          {
            id: 'appdev-l10-s2',
            stepNumber: 2,
            title: 'Crear el topic de Cloud Pub/Sub para notificaciones',
            description:
              'Crea el topic de Pub/Sub especificado donde la función publicará el nombre de las miniaturas generadas.',
            command: `export TOPIC_NAME="<TOPIC_NAME_ASIGNADO>"
gcloud pubsub topics create $TOPIC_NAME`,
          },
          {
            id: 'appdev-l10-s3',
            stepNumber: 3,
            title: 'Desplegar Cloud Run Function (gen2, Node.js 22, trigger Cloud Storage) y probar procesamiento',
            description:
              'Prepara package.json e index.js con sharp, despliega la función con trigger en el evento object.v1.finalized y sube una imagen de prueba.',
            command: `export FUNCTION_NAME="<FUNCTION_NAME_ASIGNADA>"
mkdir -p ~/thumbnail-func && cd ~/thumbnail-func

# Despliegue en 2ª generación con Node.js 22
gcloud functions deploy $FUNCTION_NAME \\
  --gen2 \\
  --runtime=nodejs22 \\
  --region=$REGION \\
  --source=. \\
  --entry-point=$FUNCTION_NAME \\
  --trigger-event-filters="type=google.cloud.storage.object.v1.finalized" \\
  --trigger-event-filters="bucket=$BUCKET_NAME"

# Probar subiendo imagen de prueba
curl -O https://storage.googleapis.com/cloud-training/gsp315/map.jpg
gcloud storage cp map.jpg gs://$BUCKET_NAME/map.jpg`,
            tip: 'Verifica que la función filtre archivos con sufijo 64x64_thumbnail para evitar bucles de ejecución infinitos en Cloud Storage.',
          },
          {
            id: 'appdev-l10-s4',
            stepNumber: 4,
            title: 'Revocar el acceso del ingeniero anterior en IAM',
            description:
              'Elimina el rol básico Viewer asignado a la cuenta Username 2 en la política IAM del proyecto.',
            command: `export USER2_EMAIL="<USERNAME_2_DEL_LAB>"
gcloud projects remove-iam-policy-binding $GOOGLE_CLOUD_PROJECT \\
  --member="user:$USER2_EMAIL" \\
  --role="roles/viewer"`,
            tip: 'En el examen ACE, la revocación oportuna de privilegios innecesarios o de cuentas inactivas es un principio de seguridad crítico evaluado en el Dominio 4.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'c637-q1',
        question:
          '¿Cuál es la herramienta de línea de comandos moderna y oficial recomendada por Google Cloud para la administración rápida y concurrente de Cloud Storage?',
        options: [
          'gsutil',
          'gcloud storage',
          'gcloud compute storage',
          'cloud-storage-cli',
        ],
        correctIndex: 1,
        explanation:
          'gcloud storage es la CLI moderna que aprovecha paralelismo y concurrencia nativa, superando ampliamente en rendimiento a la herramienta histórica gsutil.',
        examTrapTip: 'Aunque gsutil existe por compatibilidad, las nuevas preguntas del examen ACE apuntan a gcloud storage.',
      },
      {
        id: 'c637-q2',
        question:
          'Un operador desea monitorizar el porcentaje de utilización de memoria RAM de una máquina virtual Compute Engine en Cloud Monitoring, pero la métrica no aparece en Metrics Explorer. ¿Qué acción debe realizar?',
        options: [
          'Cambiar el tipo de máquina a una serie N2 con memoria extendida.',
          'Instalar el Google Cloud Ops Agent dentro de la máquina virtual.',
          'Habilitar el modo de red avanzada en la interfaz de la VPC.',
          'Reiniciar la máquina virtual con acceso a la Cloud Logging API.',
        ],
        correctIndex: 1,
        explanation:
          'El hipervisor de Compute Engine solo observa métricas externas (CPU, bytes de red). La memoria RAM reside dentro del espacio de usuario del sistema operativo y exige la presencia del Ops Agent para ser recolectada.',
        examTrapTip: 'Memoria RAM y espacio libre en disco en VMs = Ops Agent siempre.',
      },
      {
        id: 'c637-q3',
        question:
          '¿Qué ocurre en Cloud Pub/Sub si un suscriptor de tipo Pull recibe un mensaje pero no envía una confirmación (ack) antes de que expire el ack_deadline?',
        options: [
          'El mensaje se elimina permanentemente de la cola de la suscripción.',
          'El topic se pausa automáticamente hasta que el suscriptor responda.',
          'Pub/Sub vuelve a poner el mensaje a disposición para ser entregado a otro suscriptor.',
          'El mensaje se envía a una cuenta de facturación de penalización.',
        ],
        correctIndex: 2,
        explanation:
          'Si no se recibe un ack dentro del plazo límite establecido (ack_deadline), Pub/Sub asume que el consumidor falló y reintenta la entrega para garantizar la entrega de al menos una vez (at-least-once delivery).',
      },
      {
        id: 'c637-q4',
        question:
          'Para cumplir con el principio de menor privilegio al otorgar permisos de lectura de archivos a un desarrollador en un bucket de Cloud Storage, ¿qué tipo de rol de IAM debes seleccionar?',
        options: [
          'El rol básico Viewer (roles/viewer) a nivel de proyecto.',
          'El rol básico Editor (roles/editor) a nivel de organización.',
          'El rol predefinido Storage Object Viewer (roles/storage.objectViewer).',
          'El rol Owner (roles/owner) a nivel de bucket.',
        ],
        correctIndex: 2,
        explanation:
          'Los roles predefinidos como roles/storage.objectViewer otorgan únicamente los permisos necesarios sobre los objetos sin exponer el resto de los recursos del proyecto, a diferencia de los roles básicos.',
      },
    ],
    glossary: [
      {
        term: 'Cloud Storage Bucket',
        definition:
          'Contenedor básico de Google Cloud que aloja datos en forma de objetos binarios (blobs), con nombres únicos a nivel global y alcance geográfico regional, bi-regional o multi-regional.',
      },
      {
        term: 'Uniform Bucket-Level Access (UBLA)',
        definition:
          'Mecanismo de gobernanza que unifica el control de acceso a Cloud Storage exclusivamente mediante políticas de IAM a nivel de bucket, deshabilitando el uso de listas de control de acceso (ACLs) individuales por objeto.',
      },
      {
        term: 'Cloud Pub/Sub Topic',
        definition:
          'Canal de mensajería asíncrona nombrado al cual los publicadores envían mensajes para que sean distribuidos de forma desacoplada hacia una o múltiples suscripciones.',
      },
      {
        term: 'Pull Subscription',
        definition:
          'Modalidad de suscripción en Cloud Pub/Sub donde los clientes consumidores inician solicitudes activas para recibir lotes de mensajes desde la cola y enviar confirmaciones (ack).',
      },
      {
        term: 'Cloud Run functions (2nd gen)',
        definition:
          'Solución de cómputo serverless de propósito único basada en eventos que corre sobre la infraestructura de Cloud Run, permitiendo mayor tiempo de ejecución, concurrencia y despliegues con gcloud functions deploy.',
      },
      {
        term: 'Google Cloud Ops Agent',
        definition:
          'Software de telemetría de sistema unificado que se instala dentro de instancias de Compute Engine para enviar logs a Cloud Logging y métricas de memoria RAM y disco a Cloud Monitoring.',
      },
      {
        term: 'IAM Policy Binding',
        definition:
          'Asociación formal dentro de una política de Identity and Access Management que vincula a uno o más miembros (principals) con un rol específico sobre un recurso de Google Cloud.',
      },
    ],
  },
  {
    id: 'gcp-course-50',
    slug: 'essential-google-cloud-infrastructure-foundation',
    templateId: '50',
    title: 'Essential Google Cloud Infrastructure: Foundation',
    shortDescription:
      'Aprende a diseñar, aprovisionar y operar componentes troncales de infraestructura en Google Cloud: Compute Engine, VPCs en modo personalizado, subredes, cortafuegos, Private Google Access, Cloud NAT y almacenamiento persistente.',
    duration: '6 Horas 45 Minutos',
    level: 'Intermedio / Infraestructura Troncal ACE',
    category: 'Compute & Networking',
    badge: 'Google Cloud Skills Course',
    overview:
      'Este curso acelerado profundiza en los servicios medulares de infraestructura y plataforma de Google Cloud, centrándose de forma intensiva en Compute Engine y Virtual Private Cloud (VPC). A través de conferencias y 6 laboratorios prácticos requeridos, los participantes exploran y despliegan redes virtuales personalizadas, subredes regionales, reglas de firewall, rutas, Private Google Access, Cloud NAT, y máquinas virtuales con almacenamiento en discos persistentes.',
    classificationMatrix: [
      {
        lbType: 'VPC Custom Mode',
        layer: 'Capa 3 / Red SDN',
        scope: 'Global',
        trafficScheme: 'Interior / Híbrido',
        architecture: 'Red virtual definida por software con Andromeda',
        useCase: 'Control total de direccionamiento IP sin solapamiento para arquitecturas empresariales seguras e híbridas.',
      },
      {
        lbType: 'Private Google Access',
        layer: 'Capa 3 / Transporte interno',
        scope: 'Regional (por subred)',
        trafficScheme: 'VPC privada hacia APIs de Google',
        architecture: 'Enrutamiento interno hacia VIPs públicas de Google Cloud',
        useCase: 'Permite que VMs sin IP externa accedan a Cloud Storage, BigQuery y APIs de Google sin salir a internet público.',
      },
      {
        lbType: 'Cloud NAT',
        layer: 'Capa 3 / 4 (Salida de red)',
        scope: 'Regional (con Cloud Router)',
        trafficScheme: 'Egress exclusivo (Inside a Outside)',
        architecture: 'NAT administrado definido por software y sin servidores proxy intermedios',
        useCase: 'Salida a internet para parches, actualizaciones y APIs externas sin exponer VMs a tráfico entrante no solicitado.',
      },
      {
        lbType: 'Persistent Disk (Zonal / Regional)',
        layer: 'Almacenamiento en bloque',
        scope: 'Zonal o Regional (2 zonas)',
        trafficScheme: 'Adjunto a Compute Engine vía red de almacenamiento Colossus',
        architecture: 'Bloques de almacenamiento en red desacoplados del ciclo de vida de la VM',
        useCase: 'Sistemas de archivos de SO y datos persistentes con soporte para snapshots incrementales y modo Read-Only compartido.',
      },
    ],
    healthCheckRanges: [
      {
        cidr: '35.235.240.0/20',
        purpose: 'Rango de Identity-Aware Proxy (IAP) para túneles SSH y RDP seguros hacia VMs sin IP externa.',
      },
      {
        cidr: '199.36.153.8/30',
        purpose: 'Rango restringido de Google Cloud (restricted.googleapis.com) para Private Google Access compatible con VPC Service Controls.',
      },
      {
        cidr: '199.36.153.4/30',
        purpose: 'Rango privado de Google Cloud (private.googleapis.com) para acceso interno a la mayoría de APIs de Google.',
      },
    ],
    examTraps: [
      {
        trap: 'Creer que una subred en Google Cloud se puede reducir de tamaño modificando su máscara CIDR.',
        solution:
          'Las subredes en Google Cloud solo se pueden expandir hacia prefijos numéricamente menores (ej. /24 a /20). Nunca se pueden reducir; para achicarla es obligatorio crear una nueva subred y migrar los recursos.',
      },
      {
        trap: 'Confundir el alcance geográfico de una red VPC con el de una subred o una máquina virtual.',
        solution:
          'La red VPC tiene alcance GLOBAL (abarca todas las regiones del mundo sin necesidad de routers). Las subredes son REGIONALES y pueden asociar recursos en cualquier zona de la región. Las VMs y los discos persistentes estándar son ZONALES.',
      },
      {
        trap: 'Pensar que Cloud NAT permite que usuarios externos de internet se conecten a servicios dentro de una VM sin IP pública.',
        solution:
          'Cloud NAT es estrictamente de salida (egress-only). Permite conexiones originadas dentro de la VPC hacia internet, pero descarta cualquier intento de conexión entrante no solicitada desde el exterior.',
      },
      {
        trap: 'Asumir que Private Google Access habilita el acceso general a internet para una VM sin IP pública.',
        solution:
          'Private Google Access solo otorga conectividad hacia las APIs y servicios públicos de Google (*.googleapis.com como Cloud Storage). No permite navegar por internet ni descargar paquetes desde repositorios externos como GitHub.',
      },
      {
        trap: 'Olvidar la regla de prioridad en los cortafuegos de Compute Engine al resolver conflictos.',
        solution:
          'Las reglas de cortafuegos de Google Cloud se evalúan de menor a mayor valor numérico de prioridad (0 es la máxima prioridad y 65535 es la más baja). La primera regla coincidente que se encuentre determina la acción (ALLOW o DENY).',
      },
    ],
    labs: [
      {
        id: 'infra-lab-1',
        labNumber: 1,
        title: 'Explore the Google Cloud Console and Cloud Shell',
        durationMinutes: 45,
        type: 'guided',
        description:
          'Familiarización práctica con el entorno de gestión web de Google Cloud (Cloud Console) y la interfaz de línea de comandos basada en navegador (Cloud Shell), configurando identidades activas, proyectos y variables de entorno.',
        keyConcepts: [
          'Cloud Console GUI Navigation',
          'Cloud Shell 5 GB Persistent Storage ($HOME)',
          'gcloud config list & set',
          'Cloud Shell Ephemeral VM Lifecycle',
        ],
        steps: [
          {
            id: 'infra-lab1-step1',
            stepNumber: 1,
            title: 'Verificar la cuenta activa y el proyecto predeterminado en Cloud Shell',
            description:
              'Abre Cloud Shell e inspecciona las credenciales activas del SDK y el identificador de proyecto actual.',
            command: 'gcloud auth list && gcloud config list project',
            tip: 'Cloud Shell viene pre-autenticado con las credenciales de la sesión actual de la consola.',
          },
          {
            id: 'infra-lab1-step2',
            stepNumber: 2,
            title: 'Configurar la región y la zona por defecto de Compute Engine',
            description:
              'Fija las variables de configuración de compute/region y compute/zone para evitar tener que especificarlas en cada comando CLI subsecuente.',
            command: 'gcloud config set compute/region us-central1 && gcloud config set compute/zone us-central1-a',
            tip: 'Los valores fijados con gcloud config set compute/zone aplican como defaults solo en la sesión del entorno local.',
          },
          {
            id: 'infra-lab1-step3',
            stepNumber: 3,
            title: 'Explorar las variables de entorno predefinidas en Cloud Shell',
            description:
              'Comprueba la variable GOOGLE_CLOUD_PROJECT y el directorio persistente de usuario.',
            command: 'echo $GOOGLE_CLOUD_PROJECT && pwd && ls -la ~',
            tip: 'El directorio home persiste en un disco de 5 GB respaldado entre sesiones de Cloud Shell.',
          },
        ],
      },
      {
        id: 'infra-lab-2',
        labNumber: 2,
        title: 'Deploy a LAMP Stack with Google Cloud Marketplace',
        durationMinutes: 40,
        type: 'guided',
        description:
          'Aprovisionamiento ágil de una arquitectura web clásica LAMP (Linux, Apache, MySQL, PHP) en Compute Engine mediante las plantillas automatizadas de Google Cloud Marketplace.',
        keyConcepts: [
          'Google Cloud Marketplace',
          'Automated IaaS Provisioning',
          'Firewall Rule Auto-creation (HTTP/HTTPS)',
          'LAMP Stack Administration',
        ],
        steps: [
          {
            id: 'infra-lab2-step1',
            stepNumber: 1,
            title: 'Buscar y seleccionar la solución LAMP Stack en Cloud Marketplace',
            description:
              'En el menú de navegación de Cloud Console, accede a Marketplace y busca "LAMP Stack packaged by Bitnami" o la versión certificada de Google Click to Deploy.',
            tip: 'Marketplace muestra el costo estimado mensual de infraestructura y licenciamiento antes de iniciar el despliegue.',
          },
          {
            id: 'infra-lab2-step2',
            stepNumber: 2,
            title: 'Configurar e iniciar el despliegue de la solución',
            description:
              'Selecciona la zona geográfica, el tipo de máquina (ej. e2-medium), el tamaño del disco persistente y asegúrate de marcar las casillas para permitir tráfico HTTP y HTTPS.',
            tip: 'Marketplace genera automáticamente las reglas de cortafuegos correspondientes con etiquetas de red aplicadas a la VM.',
          },
          {
            id: 'infra-lab2-step3',
            stepNumber: 3,
            title: 'Verificar el servidor web y acceder a la página de inicio',
            description:
              'Copia la dirección IP externa de la instancia creada e ingrésala en una nueva pestaña del navegador para validar que Apache responde con éxito.',
            tip: 'Las credenciales de administrador de MySQL y la contraseña de la aplicación se proporcionan en la pantalla de resumen del despliegue.',
          },
        ],
      },
      {
        id: 'infra-lab-3',
        labNumber: 3,
        title: 'Create and Configure VPC Networks',
        durationMinutes: 60,
        type: 'guided',
        description:
          'Diseño y creación de redes virtuales personalizadas (Custom Mode VPCs) con subredes en múltiples regiones, implementación de reglas de cortafuegos para SSH e ICMP y validación de conectividad inter-red.',
        keyConcepts: [
          'Custom Mode VPC vs Auto Mode',
          'Subnet CIDR Non-overlapping Design',
          'Firewall Rules (Ingress, Egress, Priority, Tags)',
          'Cross-Subnet Internal Routing',
        ],
        steps: [
          {
            id: 'infra-lab3-step1',
            stepNumber: 1,
            title: 'Crear la red VPC personalizadamanagementnet y su subred',
            description:
              'Aprovisiona una nueva red en modo personalizado para aislar las cargas de gestión con un bloque CIDR dedicado.',
            command: 'gcloud compute networks create managementnet --subnet-mode=custom && gcloud compute networks subnets create managementsubnet-us --network=managementnet --region=us-central1 --range=10.130.0.0/20',
            tip: 'El modo custom no crea subredes automáticamente, dando control total sobre el espacio de direccionamiento IP.',
          },
          {
            id: 'infra-lab3-step2',
            stepNumber: 2,
            title: 'Crear la red VPC privatenet con dos subredes regionales',
            description:
              'Crea una segunda VPC con subredes en regiones distintas (us-central1 y europe-west1) para simular conectividad multi-región.',
            command: 'gcloud compute networks create privatenet --subnet-mode=custom && gcloud compute networks subnets create privatesubnet-us --network=privatenet --region=us-central1 --range=172.16.0.0/24 && gcloud compute networks subnets create privatesubnet-eu --network=privatenet --region=europe-west1 --range=172.20.0.0/20',
            tip: 'Los rangos privados dentro de la misma VPC no pueden solaparse.',
          },
          {
            id: 'infra-lab3-step3',
            stepNumber: 3,
            title: 'Configurar reglas de cortafuegos para permitir SSH, RDP e ICMP',
            description:
              'Permite el tráfico de administración hacia las instancias dentro de las redes personalizadas creadas.',
            command: 'gcloud compute firewall-rules create managementnet-allow-icmp-ssh-rdp --direction=INGRESS --priority=1000 --network=managementnet --action=ALLOW --rules=icmp,tcp:22,tcp:3389 --source-ranges=0.0.0.0/0',
            tip: 'La prioridad 1000 es la habitual para reglas personalizadas y tiene precedencia sobre las reglas implícitas (65535).',
          },
        ],
      },
      {
        id: 'infra-lab-4',
        labNumber: 4,
        title: 'Implement Private Google Access and Cloud NAT',
        durationMinutes: 50,
        type: 'guided',
        description:
          'Configuración de Private Google Access a nivel de subred para acceder a buckets de Cloud Storage sin IP externa, y aprovisionamiento de Cloud NAT para habilitar salida a internet segura para parches de software.',
        keyConcepts: [
          'Private Google Access (Subnet Level)',
          'Cloud Router for BGP/NAT Coordination',
          'Cloud NAT Egress-Only Architecture',
          'Internal IP Only VM Operations',
        ],
        steps: [
          {
            id: 'infra-lab4-step1',
            stepNumber: 1,
            title: 'Habilitar Private Google Access en la subred de la instancia privada',
            description:
              'Modifica la subred existente para que las VMs sin IP pública puedan resolver y comunicarse con las APIs de Google Cloud.',
            command: 'gcloud compute networks subnets update privatesubnet-us --region=us-central1 --enable-private-ip-google-access',
            tip: 'Private Google Access no tiene costo de servicio adicional y no requiere Cloud NAT ni Internet Gateway.',
          },
          {
            id: 'infra-lab4-step2',
            stepNumber: 2,
            title: 'Crear un Cloud Router en la región de la VPC',
            description:
              'Aprovisiona un Cloud Router regional requerido como plano de control para gestionar la traducción de direcciones de red.',
            command: 'gcloud compute routers create nat-router-us --network=privatenet --region=us-central1',
            tip: 'Cloud Router no procesa los paquetes de datos; solo programa las tablas NAT en el kernel virtual de Andromeda.',
          },
          {
            id: 'infra-lab4-step3',
            stepNumber: 3,
            title: 'Aprovisionar la pasarela Cloud NAT sobre el Cloud Router',
            description:
              'Configura la puerta de enlace NAT para asignar IPs externas automáticamente y dar salida a todas las subredes de la región.',
            command: 'gcloud compute routers nats create nat-config-us --router=nat-router-us --region=us-central1 --auto-allocate-nat-external-ips --nat-all-subnet-ip-ranges --enable-logging',
            tip: 'Cloud NAT proporciona conectividad 1 a muchos estrictamente saliente (egress). Bloquea conexiones entrantes desde internet.',
          },
        ],
      },
      {
        id: 'infra-lab-5',
        labNumber: 5,
        title: 'Create Virtual Machines',
        durationMinutes: 45,
        type: 'guided',
        description:
          'Creación de máquinas virtuales en Compute Engine mediante Cloud Console y gcloud CLI, analizando machine types, zonas de disponibilidad, asociación de subredes e instalación automatizada mediante Startup Scripts.',
        keyConcepts: [
          'Compute Engine Machine Families (E2, N2)',
          'Zonal Placement and Availability Zones',
          'Startup Scripts via Metadata',
          'Internal vs External IP Allocation',
        ],
        steps: [
          {
            id: 'infra-lab5-step1',
            stepNumber: 1,
            title: 'Crear una máquina virtual en us-central1-a mediante Cloud Console',
            description:
              'Crea una instancia my-vm-1 de tipo e2-medium asociada a la subred default, con disco Debian 12 de 10 GB.',
            tip: 'Verifica los costos estimados por hora y por mes que se actualizan dinámicamente en el panel derecho de la consola.',
          },
          {
            id: 'infra-lab5-step2',
            stepNumber: 2,
            title: 'Crear una segunda máquina virtual mediante gcloud con script de inicio',
            description:
              'Aprovisiona my-vm-2 en una zona distinta mediante la línea de comandos, inyectando un script de inicio para instalar Nginx.',
            command: 'gcloud compute instances create my-vm-2 --machine-type=e2-medium --zone=us-central1-b --metadata=startup-script=\'#! /bin/bash\napt-get update\napt-get install -y nginx\' --tags=http-server',
            tip: 'El script de inicio se ejecuta con privilegios de root cada vez que la máquina virtual arranca.',
          },
          {
            id: 'infra-lab5-step3',
            stepNumber: 3,
            title: 'Verificar la conectividad interna entre ambas instancias',
            description:
              'Conéctate por SSH a my-vm-1 y ejecuta ping hacia la IP interna y el nombre DNS de my-vm-2.',
            command: 'ping -c 3 my-vm-2.us-central1-b.c.$GOOGLE_CLOUD_PROJECT.internal',
            tip: 'Google Cloud proporciona resolución DNS interna automática para todas las VMs dentro de la misma red VPC.',
          },
        ],
      },
      {
        id: 'infra-lab-6',
        labNumber: 6,
        title: 'Create and Configure Virtual Machines (Minecraft Server)',
        durationMinutes: 60,
        type: 'guided',
        description:
          'Construcción de un servidor de juegos con estado (stateful Minecraft server) en Compute Engine, separando el disco de arranque del disco de datos persistente dedicado, configurando montaje ext4 con nofail y abriendo puertos en el cortafuegos.',
        keyConcepts: [
          'Stateful Architecture with Dedicated Persistent Disks',
          'Disk Attachment & Linux Mount Configuration (/etc/fstab)',
          'Custom Firewall Ports (TCP 25565)',
          'Data Preservation across VM Re-creations',
        ],
        steps: [
          {
            id: 'infra-lab6-step1',
            stepNumber: 1,
            title: 'Crear una instancia VM y un disco persistente adicional dedicado',
            description:
              'Aprovisiona una instancia mc-server y crea un disco persistente SSD de 50 GB en la misma zona para alojar los mundos del juego.',
            command: 'gcloud compute instances create mc-server --machine-type=e2-medium --zone=us-central1-a --tags=minecraft-server && gcloud compute disks create minecraft-disk --size=50GB --zone=us-central1-a --type=pd-ssd',
            tip: 'El disco y la VM deben residir exactamente en la misma zona para poder asociarse.',
          },
          {
            id: 'infra-lab6-step2',
            stepNumber: 2,
            title: 'Adjuntar, formatear y montar el disco persistente en Linux',
            description:
              'Asocia el disco a la VM en caliente, dale formato ext4 y agrégalo a /etc/fstab utilizando el UUID del disco.',
            command: 'gcloud compute instances attach-disk mc-server --disk=minecraft-disk --zone=us-central1-a --device-name=minecraft-disk',
            tip: 'Usar nofail en /etc/fstab previene que la máquina falle en arrancar si el disco de datos llegara a estar ausente.',
          },
          {
            id: 'infra-lab6-step3',
            stepNumber: 3,
            title: 'Crear la regla de firewall para el puerto TCP 25565',
            description:
              'Permite el tráfico entrante al puerto del servidor de Minecraft asociándolo a la etiqueta de red especificada.',
            command: 'gcloud compute firewall-rules create allow-minecraft --direction=INGRESS --priority=1000 --action=ALLOW --rules=tcp:25565 --target-tags=minecraft-server --source-ranges=0.0.0.0/0',
            tip: 'Las etiquetas de destino (target tags) aseguran que la regla aplique únicamente a las VMs con la etiqueta minecraft-server.',
          },
        ],
      },
    ],
    videos: [
      {
        id: 'infra-lesson-intro',
        title: 'Course Introduction',
        moduleName: 'Módulo 1: Interacting with Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=-zTJk_MbmBg',
        youtubeId: '-zTJk_MbmBg',
        duration: '9m 10s',
        summary:
          'Bienvenida oficial a la serie "Architecting with Google Compute Engine" por Rekha Niveda. Presenta el ecosistema global de Google Cloud, la analogía urbana de la infraestructura, el espectro de soluciones desde IaaS hasta SaaS y el continuo de opciones de cómputo.',
        keyTakeaways: [
          'La infraestructura tecnológica es el marco de soporte fundamental (redes, fibra, centros de datos) equivalente a las carreteras y servicios de una ciudad.',
          'Google Cloud ofrece un continuo de cómputo: Compute Engine (IaaS flexible), GKE (contenedores orquestados), Cloud Run (contenedores serverless Knative) y Cloud Run Functions (FaaS por eventos).',
          'La serie curricular troncal comprende 3 cursos: Foundation (este curso), Core Services (IAM, Storage, Facturación, Monitoreo) y Elastic Infrastructure (Redes Híbridas, Balanceo de Carga, Terraform).',
        ],
      },
      {
        id: 'infra-mod1-overview',
        title: 'Module Overview: Interacting with Google Cloud',
        moduleName: 'Módulo 1: Interacting with Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=P9UusGOfEEk',
        youtubeId: 'P9UusGOfEEk',
        duration: '0m 35s',
        summary:
          'Panorama introductorio del Módulo 1 sobre cómo interactuar con Google Cloud: exploración práctica de la interfaz gráfica (Cloud Console) y la línea de comandos (Cloud Shell), despliegue automatizado en Cloud Marketplace sin configuración manual de software, VMs, almacenamiento o red, y demostración de Projects.',
        keyTakeaways: [
          'El Módulo 1 se centra en interactuar con GCP combinando la interfaz gráfica web (Cloud Console) y la interfaz de línea de comandos (Cloud Shell / gcloud CLI).',
          'Google Cloud Marketplace permite desplegar soluciones completas sin configurar manualmente el software, instancias de VM, almacenamiento ni parámetros de red.',
          'Los Projects en Google Cloud organizan recursos, facturación y controles de acceso como unidad base de trabajo en la consola y la CLI.',
        ],
      },
      {
        id: 'infra-mod1-using-gcp',
        title: 'Using Google Cloud',
        moduleName: 'Módulo 1: Interacting with Google Cloud',
        youtubeUrl: 'https://www.youtube.com/watch?v=DvOb1yWbTcw',
        youtubeId: 'DvOb1yWbTcw',
        duration: '3m 12s',
        summary:
          'Recorrido por las cuatro formas oficiales de interactuar con Google Cloud: Cloud Console (GUI web en console.cloud.google.com), Cloud Shell y Google Cloud CLI (gcloud), Client Libraries (App APIs y Admin APIs) y la Google Cloud App para dispositivos Android e iOS.',
        keyTakeaways: [
          'Cloud Shell proporciona una VM temporal en el navegador con 5 GB de disco persistente y el Google Cloud CLI (gcloud) preinstalado (ej. gcloud compute instances list).',
          'Las Google Cloud Client Libraries distinguen dos categorías: App APIs (acceso a servicios optimizado por lenguaje como Node.js o Python) y Admin APIs (gestión de recursos y automatización).',
          'Al ejecutar comandos CLI en laboratorios, ciertos recursos como los buckets de Cloud Storage exigen modificar el comando para asignar nombres globalmente únicos.',
          'La Google Cloud App (Android/iOS) permite iniciar, detener y hacer SSH a VMs de Compute Engine, consultar logs, visualizar gráficas de métricas (CPU, red, RPS, errores), gestionar incidentes y recibir alertas de presupuesto.',
        ],
      },
      {
        id: 'infra-mod2-vpc',
        title: 'Module 2: Virtual Networks',
        moduleName: 'Módulo 2: Virtual Networks',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '2h 45m',
        summary:
          'Inmersión en la red troncal de Google: Virtual Private Cloud (VPC) global, subredes regionales, reglas de cortafuegos basadas en etiquetas y prioridades, Private Google Access y Cloud NAT.',
        keyTakeaways: [
          'Las redes VPC tienen alcance global; las subredes son regionales y pueden extenderse a lo largo de todas las zonas de una región.',
          'El tamaño de una subred se puede expandir (ej. /24 a /20) pero nunca se puede reducir.',
          'Private Google Access permite alcanzar servicios de Google (*.googleapis.com) sin IP externa.',
          'Cloud NAT proporciona salida segura a internet (egress-only) para parches sin exponer puertos entrantes.',
        ],
      },
      {
        id: 'infra-mod3-compute',
        title: 'Module 3: Virtual Machines',
        moduleName: 'Módulo 3: Virtual Machines',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '2h 45m',
        summary:
          'Exploración a fondo de Compute Engine: familias de máquinas (E2, N2, C2, M2), ciclo de vida de VMs, opciones de almacenamiento en Persistent Disk vs Local SSD, Spot VMs e imágenes personalizadas.',
        keyTakeaways: [
          'Los Persistent Disks están desacoplados del cómputo y se pueden redimensionar en caliente sin reiniciar la VM.',
          'Un disco persistente se puede adjuntar en modo Read-Only a múltiples máquinas simultáneamente en la misma zona.',
          'Las Spot VMs ofrecen ahorros sustanciales (60-91%) a cambio de la posibilidad de ser revocadas con 30 segundos de aviso.',
          'Los scripts de inicio (startup scripts) se ejecutan con privilegios de root durante cada arranque del sistema operativo.',
        ],
      },
    ],
    quiz: [
      {
        id: 'infra-q1',
        question:
          'Un equipo de operaciones necesita que una máquina virtual sin dirección IP externa descargue paquetes y actualizaciones de seguridad desde repositorios públicos en internet, sin permitir que atacantes externos inicien conexiones hacia dicha VM. ¿Qué componente debes implementar?',
        options: [
          'Habilitar Private Google Access en la subred de la máquina virtual.',
          'Configurar Cloud NAT junto con un Cloud Router en la región de la VPC.',
          'Crear una regla de firewall de ingreso con prioridad 0 para todo el tráfico de internet.',
          'Asignar una dirección IP externa estática y bloquear los puertos con iptables.',
        ],
        correctIndex: 1,
        explanation:
          'Cloud NAT permite que instancias sin IP externa inicien conexiones salientes hacia internet para descargar paquetes o acceder a servicios externos, garantizando que ninguna entidad externa pueda iniciar tráfico hacia la VM.',
        examTrapTip:
          'Private Google Access solo da acceso a servicios y APIs de Google (como Cloud Storage), no a repositorios de internet general.',
      },
      {
        id: 'infra-q2',
        question:
          'Estás planificando el espacio de direccionamiento IP de una subred de producción en una VPC en modo Custom. La subred se creó inicialmente con el rango CIDR 10.10.1.0/24 y la empresa necesita cuadruplicar el número de direcciones disponibles. ¿Qué acción es permitida por Google Cloud?',
        options: [
          'Reducir el prefijo expandiendo el rango a 10.10.0.0/22 mediante el comando gcloud compute networks subnets expand-ip-range.',
          'Modificar la máscara de la subred existente a 10.10.1.0/26.',
          'Eliminar la VPC completa ya que las subredes en modo Custom son inmutables.',
          'Crear una ruta personalizada con una métrica inferior a 100.',
        ],
        correctIndex: 0,
        explanation:
          'Google Cloud permite expandir el rango de IP principal de una subred modificando el prefijo hacia un número menor (ej. de /24 a /22), siempre que el nuevo rango no se traslape con otras subredes de la VPC.',
        examTrapTip:
          'Recuerda la regla de oro: las subredes se pueden expandir, pero NUNCA se pueden reducir.',
      },
      {
        id: 'infra-q3',
        question:
          '¿Cuál es la diferencia fundamental entre un disco persistente (Persistent Disk) estándar y un disco SSD local (Local SSD) en Compute Engine?',
        options: [
          'Los discos Local SSD persisten los datos permanentemente cuando la VM se detiene, mientras que los Persistent Disks se borran.',
          'Los Local SSD se encuentran físicamente conectados al servidor host que ejecuta la VM ofreciendo altísimas IOPS y muy baja latencia, pero sus datos se pierden si la VM se detiene.',
          'Los Persistent Disks solo pueden montarse en una única máquina en modo Read-Only.',
          'Los Local SSD se pueden redimensionar dinámicamente sin apagar la VM.',
        ],
        correctIndex: 1,
        explanation:
          'Los discos Local SSD están conectados físicamente al host del servidor, proporcionando altísimo rendimiento pero con naturaleza efímera (los datos se pierden si la instancia se detiene o termina). Los Persistent Disks se almacenan en red y sus datos se conservan independientemente del ciclo de vida de la VM.',
        examTrapTip:
          'Para el examen ACE: Si una carga de trabajo requiere altísimas IOPS para caché efímera o espacio swap, elige Local SSD. Si requiere persistencia de datos y snapshots, usa Persistent Disk.',
      },
      {
        id: 'infra-q4',
        question:
          'Tienes dos reglas de firewall de ingreso en una red VPC que aplican a la misma instancia: la Regla A (Prioridad 1000) permite el puerto 80 desde 0.0.0.0/0, y la Regla B (Prioridad 500) deniega el puerto 80 desde 0.0.0.0/0. ¿Qué ocurrirá con el tráfico entrante al puerto 80?',
        options: [
          'El tráfico será permitido porque la acción ALLOW siempre tiene precedencia sobre DENY.',
          'El tráfico será denegado porque la Regla B tiene un valor numérico de prioridad menor (500), lo que significa una precedencia más alta.',
          'El tráfico se distribuirá de forma aleatoria al 50% entre ambas reglas.',
          'El sistema arrojará un error de conflicto de cortafuegos y bloqueará todo el tráfico de la red.',
        ],
        correctIndex: 1,
        explanation:
          'Las reglas de cortafuegos en Google Cloud se evalúan en orden estricto de menor a mayor valor numérico de prioridad. 500 se evalúa antes que 1000, por lo que la regla de denegación (Regla B) se aplica primero.',
        examTrapTip:
          'En cortafuegos de GCP: Menor número = Mayor prioridad.',
      },
    ],
    glossary: [
      {
        term: 'Virtual Private Cloud (VPC)',
        definition:
          'Red virtual global definida por software que conecta de forma aislada y segura recursos de Compute Engine y GKE a través de la infraestructura troncal de Google.',
      },
      {
        term: 'Custom Mode VPC',
        definition:
          'Modalidad de red VPC recomendada para entornos de producción donde no se crean subredes automáticas, otorgando al administrador control estricto sobre el direccionamiento IP y regiones.',
      },
      {
        term: 'Private Google Access',
        definition:
          'Funcionalidad a nivel de subred que permite a instancias de Compute Engine sin direcciones IP externas comunicarse con APIs y servicios de Google utilizando sus direcciones IP internas.',
      },
      {
        term: 'Cloud NAT',
        definition:
          'Servicio administrado de traducción de direcciones de red que proporciona salida a internet altamente disponible para instancias privadas sin exponerlas a conexiones entrantes.',
      },
      {
        term: 'Persistent Disk (PD)',
        definition:
          'Dispositivo de almacenamiento en bloque virtualizado y duradero en red, desacoplado del ciclo de vida de las máquinas virtuales y respaldable mediante snapshots incrementales.',
      },
      {
        term: 'Spot VM / Preemptible VM',
        definition:
          'Instancia de Compute Engine que aprovecha capacidad excedente de cómputo con descuentos significativos (60-91%), con la condición de que Compute Engine puede reclamarla en cualquier momento.',
      },
      {
        term: 'Identity-Aware Proxy (IAP)',
        definition:
          'Servicio de seguridad que permite establecer túneles cifrados TCP (SSH/RDP) hacia VMs de Compute Engine sin direcciones IP públicas a través del rango 35.235.240.0/20.',
      },
    ],
  },
];


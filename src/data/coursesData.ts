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
      'El curso Google Cloud Fundamentals: Core Infrastructure establece los cimientos conceptuales y operativos indispensables para navegar, desplegar y gobernar soluciones en Google Cloud Platform. Cubre el modelo de responsabilidad compartida, jerarquía organizacional, redes globales y selección de cómputo y bases de datos para el examen Associate Cloud Engineer.',
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
        durationMinutes: 30,
        type: 'guided',
        description:
          'Despliega una solución web completa con la pila LAMP (Linux, Apache, MySQL, PHP) en Compute Engine mediante un solo clic utilizando paquetes certificados de Cloud Marketplace.',
        keyConcepts: [
          'Cloud Marketplace: Despliegue automatizado de software certificado sobre GCP.',
          'Deployment Manager: Orquestación declarativa de infraestructura subyacente.',
          'Parámetros de máquina: e2-medium en zona us-central1-a con firewall HTTP/HTTPS abierto.',
        ],
        steps: [
          {
            id: 'c-lab1-step-1',
            stepNumber: 1,
            title: 'Buscar solución LAMP en Cloud Marketplace',
            description:
              'Accede al catálogo de Google Cloud Marketplace y selecciona la solución empaquetada LAMP Stack (Bitnami o certificada de Google).',
            command: '# Navegar en Cloud Console: Menú de navegación > Marketplace > Buscar "LAMP Stack"',
            tip: 'Verifica que la solución indique compatibilidad con Compute Engine.',
          },
          {
            id: 'c-lab1-step-2',
            stepNumber: 2,
            title: 'Configurar parámetros de despliegue y máquina virtual',
            description:
              'Establece la zona en us-central1-a, selecciona machine-type e2-medium (2 vCPU, 4GB RAM) y marca las casillas de tráfico HTTP y HTTPS.',
            command: '# Configuración en la interfaz gráfica del Marketplace: Zona: us-central1-a, Machine: e2-medium, Networking: Allow HTTP/HTTPS',
          },
          {
            id: 'c-lab1-step-3',
            stepNumber: 3,
            title: 'Desplegar y obtener credenciales administrativas',
            description:
              'Haz clic en Desplegar, espera la inicialización de recursos y copia la dirección IP externa y las credenciales del usuario root de MySQL desde el resumen.',
            command: '# Acceder en el navegador: http://<EXTERNAL_IP_ASIGNADA>',
            tip: 'Comprueba que se cargue la página de bienvenida de Bitnami / Apache.',
          },
        ],
      },
      {
        id: 'core-lab-2',
        labNumber: 2,
        title: 'Get Started with VPC Networking and Compute Engine',
        durationMinutes: 45,
        type: 'guided',
        description:
          'Aprovisiona una red Virtual Private Cloud (VPC) en modo personalizado, segmenta subredes en us-central1 y us-east1, aplica reglas de firewall y valida conectividad privada entre instancias mediante ICMP.',
        keyConcepts: [
          'VPC Custom Mode: Control granular total de direccionamiento CIDR.',
          'Subredes regionales: Subred central (10.130.0.0/20) y subred este (10.140.0.0/20).',
          'Cloud NGFW: Reglas de ingreso para tráfico ICMP, SSH (22) y RDP (3389).',
          'Enrutamiento global de VPC: Comunicación interna privada entre regiones sin IP pública.',
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
        durationMinutes: 45,
        type: 'guided',
        description:
          'Aprende a gestionar almacenamiento de objetos no estructurado con Cloud Storage y bases de datos relacionales administradas con Cloud SQL MySQL, autorizando la conexión de clientes web.',
        keyConcepts: [
          'Cloud Storage: Creación de buckets globales con acceso uniforme a nivel de bucket.',
          'Cloud SQL: Aprovisionamiento de instancia administrada MySQL 8.0.',
          'Autorización de red: Concesión de acceso por IP pública de la VM a la instancia de base de datos.',
        ],
        steps: [
          {
            id: 'c-lab3-step-1',
            stepNumber: 1,
            title: 'Crear un bucket en Cloud Storage con acceso uniforme',
            description:
              'Aprovisiona un bucket regional con clase Standard y Uniform Bucket-Level Access para gobernanza estricta.',
            command: `export PROJECT_ID=$(gcloud config get-value project)
export REGION="us-central1"
export BUCKET_NAME="\${PROJECT_ID}-media-bucket"

gcloud storage buckets create gs://\${BUCKET_NAME} \\
    --location=\${REGION} \\
    --default-storage-class=STANDARD \\
    --uniform-bucket-level-access`,
          },
          {
            id: 'c-lab3-step-2',
            stepNumber: 2,
            title: 'Subir archivo de prueba y otorgar permiso de lectura',
            description:
              'Crea un objeto de prueba local y súbelo al bucket recién aprovisionado.',
            command: `echo "Google Cloud Fundamentals Storage Test" > sample.txt
gcloud storage cp sample.txt gs://\${BUCKET_NAME}/sample.txt`,
          },
          {
            id: 'c-lab3-step-3',
            stepNumber: 3,
            title: 'Aprovisionar instancia de Cloud SQL MySQL 8.0',
            description:
              'Despliega una base de datos relacional gestionada con credencial administrativa segura.',
            command: `gcloud sql instances create my-db-instance \\
    --database-version=MYSQL_8_0 \\
    --cpu=1 \\
    --memory=3840MiB \\
    --region=\${REGION} \\
    --root-password="SuperSecurePassword123!"

gcloud sql databases create app_db --instance=my-db-instance
gcloud sql users create app_user --instance=my-db-instance --password="UserPassword123!"`,
          },
          {
            id: 'c-lab3-step-4',
            stepNumber: 4,
            title: 'Autorizar IP de la VM web en Cloud SQL',
            description:
              'Extrae la IP pública de la máquina virtual web y agrégala a las redes autorizadas de la base de datos.',
            command: `export VM_IP=$(gcloud compute instances describe web-app-vm --zone=us-central1-a --format="value(networkInterfaces[0].accessConfigs[0].natIP)" 2>/dev/null || echo "34.120.50.10")
gcloud sql instances patch my-db-instance --authorized-networks=\${VM_IP}`,
            tip: 'En entornos de producción se recomienda conectar mediante Cloud SQL Auth Proxy o dirección IP privada interna en la VPC.',
          },
        ],
      },
      {
        id: 'core-lab-4',
        labNumber: 4,
        title: 'Hello Cloud Run',
        durationMinutes: 30,
        type: 'guided',
        description:
          'Despliega un microservicio web contenerizado en Cloud Run de forma totalmente serverless, escalando automáticamente desde cero bajo demanda.',
        keyConcepts: [
          'Cloud Run: Cómputo serverless basado en Knative para contenedores stateless.',
          'Escalado a cero: Costo nulo cuando no existen peticiones HTTP activas.',
          'Acceso público: Opción --allow-unauthenticated para endpoints web.',
        ],
        steps: [
          {
            id: 'c-lab4-step-1',
            stepNumber: 1,
            title: 'Configurar región predeterminada para Cloud Run',
            description:
              'Establece la región de ejecución de Cloud Run en la configuración de gcloud.',
            command: `gcloud config set run/region us-central1`,
          },
          {
            id: 'c-lab4-step-2',
            stepNumber: 2,
            title: 'Desplegar contenedor de ejemplo en Cloud Run',
            description:
              'Despliega la imagen hello-app desde Google Container Registry permitiendo acceso público sin autenticación.',
            command: `gcloud run deploy hello-cloudrun \\
    --image=gcr.io/google-samples/hello-app:1.0 \\
    --region=us-central1 \\
    --allow-unauthenticated`,
          },
          {
            id: 'c-lab4-step-3',
            stepNumber: 3,
            title: 'Inspeccionar endpoint público y validar servicio',
            description:
              'Consulta la URL HTTPS autogenerada por Cloud Run y lista los servicios activos en el proyecto.',
            command: `gcloud run services describe hello-cloudrun --region=us-central1 --format="value(status.url)"
gcloud run services list`,
            tip: 'Cloud Run asigna automáticamente certificados SSL gestionados por Google a cada servicio.',
          },
        ],
      },
    ],
    quiz: [
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
    ],
  },
];


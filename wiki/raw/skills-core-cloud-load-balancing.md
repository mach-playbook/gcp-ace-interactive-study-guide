# Google Cloud Fundamentals: Core Infrastructure - Cloud Load Balancing

- **Fuente Original:** Google Skills (Course Template 60, Video 689564)
- **URL Lección:** https://www.skills.google/course_templates/60/video/689564
- **URL Video YouTube:** https://www.youtube.com/watch?v=HWJQ3LNagXc
- **Duración:** 02:55
- **Módulo:** Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)
- **Fecha de Ingesta:** 2026-11-09

---

## Transcripción Limpia y Completa

Previously, we explored how virtual machines can autoscale to respond to changing loads.

But how do your customers get to your application when it might be provided by four VMs one moment, and by 40 VMs at another?

That’s done through Cloud Load Balancing.

The job of a load balancer is to distribute user traffic across multiple instances of an application. By spreading the load, load balancing reduces the risk that applications experience performance issues.

Cloud Load Balancing is a fully distributed, software-defined, managed service for all your traffic. And because the load balancers don’t run in VMs that you have to manage, you don’t have to worry about scaling or managing them.

You can put Cloud Load Balancing in front of all of your traffic: HTTP or HTTPS, other TCP and SSL traffic, and UDP traffic too.

Cloud Load Balancing provides cross-region load balancing, including automatic multi-region failover, which gently moves traffic in fractions if backends become unhealthy. Cloud Load Balancing reacts quickly to changes in users, traffic, network, backend health, and other related conditions.

And what if you anticipate a huge spike in demand? Say, your online game is already a hit; do you need to file a support ticket to warn Google of the incoming load? No. No so-called “pre-warming” is required.

Google Cloud offers a range of load balancing solutions that can be classified based on the OSI model layer they operate at and their specific functionalities.

Application Load Balancers operate at the application layer and are designed to handle HTTP and HTTPS traffic, making them ideal for web applications and services that require advanced features like content-based routing and SSL/TLS termination. Application Load Balancers operate as reverse proxies, distributing incoming traffic across multiple backend instances based on rules you define. They are highly flexible and can be configured for both internet-facing (external) and internal applications.

Network Load Balancers operate at the transport layer and efficiently handle TCP, UDP, and other IP protocols.

They can be further classified into two types: Proxy Network Load Balancers also function as reverse proxies, terminating client connections and establishing new ones to backend services. They offer advanced traffic management capabilities and support backends located both on-premises and in various cloud environments.

Unlike proxy Network Load Balancers, passthrough Network Load Balancers do not modify or terminate connections. Instead, they directly forward traffic to the backend while preserving the original source IP address. This type is well-suited for applications that require direct server return or need to handle a wider range of IP protocols.

---

## Síntesis Técnica y Puntos Clave para el Examen ACE

### 1. Arquitectura SDN Totalmente Gestionada y Sin Pre-calentamiento (*No Pre-warming*)
- **Software-Defined Load Balancing:** Cloud Load Balancing no se ejecuta en máquinas virtuales convencionales que el usuario deba mantener, parchear o escalar. Está implementado directamente en el plano de control y red distribuida por software de Google (Andromeda y Google Front End - GFE).
- **Regla Crítica de Examen (No Pre-warming):** A diferencia de otros proveedores en la nube tradicionales donde se requiere solicitar un pre-calentamiento (*pre-warming ticket*) antes de picos masivos de tráfico, en Google Cloud el balanceador absorbe incrementos instantáneos de cientos de miles de peticiones por segundo sin aviso previo ni configuración especial.

### 2. Balanceo Multi-Región y Conmutación por Error Automática (*Cross-region Failover*)
- **IP Anycast Global Única:** Los balanceadores externos globales proporcionan una única dirección IP pública accesible a nivel mundial. El tráfico entra a la red de Google por el Punto de Presencia (PoP) más cercano al cliente y viaja por el backbone privado.
- **Failover Fraccional Suave:** Si un conjunto de backends en una región se satura o degrada su salud (*Health Check* negativo), el tráfico se redirige suave y progresivamente en fracciones hacia la región geográfica saludable más cercana sin interrumpir a los usuarios.

### 3. Application Load Balancers (Capa 7 - HTTP/HTTPS)
- **Naturaleza:** Opera como un *Reverse Proxy* en la capa de aplicación del modelo OSI.
- **Capacidades Avanzadas:**
  - Enrutamiento basado en contenido (*content-based / URL map routing*): `/api/*` hacia un grupo de instancias y `/static/*` hacia depósitos de Cloud Storage o Cloud CDN.
  - Terminación y descarga de certificados SSL/TLS administrados por Google con renovación automática.
  - Soporte para arquitecturas públicas hacia internet (*External Application Load Balancer*) e internas entre microservicios VPC (*Internal Application Load Balancer*).

### 4. Proxy Network Load Balancers (Capa 4 - TCP/SSL)
- **Naturaleza:** Opera como *Reverse Proxy* en la capa de transporte (OSI L4), terminando la sesión del cliente en el balanceador y abriendo una conexión nueva hacia los backends.
- **Casos de Uso:** Tráfico TCP no HTTP (ej. WebSockets, protocolos IoT, proxies de correo, bases de datos no HTTP) y descarga de cifrado SSL/TLS.
- **Flexibilidad Híbrida:** Admite grupos de endpoints de red (NEGs) apuntando a backends locales on-premises o en otras nubes conectados mediante Cloud VPN / Cloud Interconnect.

### 5. Passthrough Network Load Balancers (Capa 4 - TCP/UDP)
- **Naturaleza:** Balanceador de paso que **NO actúa como proxy**. No termina las conexiones ni altera los paquetes TCP/UDP.
- **Preservación de IP Origen y Direct Server Return (DSR):**
  - Los backends reciben los paquetes conservando la dirección IP pública real del cliente de forma nativa sin necesidad de cabeceras `X-Forwarded-For` ni proxy protocol.
  - Con **Direct Server Return (DSR)**, las respuestas de los servidores viajan directamente al cliente a través de la salida de internet sin atravesar de regreso el balanceador, eliminando cuellos de botella y maximizando el rendimiento en cargas de descarga masiva o streaming.


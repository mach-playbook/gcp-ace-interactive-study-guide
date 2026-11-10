# Google Cloud Fundamentals: Core Infrastructure - Connecting networks to Google VPC

- **Fuente Original:** Google Skills (Course Template 60, Video 689566)
- **URL Lección:** https://www.skills.google/course_templates/60/video/689566
- **URL Video YouTube:** https://www.youtube.com/watch?v=g24UStCvpQg
- **Duración:** 05:45
- **Módulo:** Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)
- **Fecha de Ingesta:** 2026-11-09

---

## Transcripción Limpia y Completa

Many Google Cloud customers want to connect their Google Virtual Private Cloud networks to other networks in their system, such as on-premises networks or networks in other clouds.

There are several effective ways to accomplish this.

One option is to start with a Virtual Private Network connection over the internet and use Cloud VPN to create a “tunnel” connection. To make the connection dynamic, a Google Cloud feature called Cloud Router can be used. Cloud Router lets other networks and Google VPC, exchange route information over the VPN using the Border Gateway Protocol. Using this method, if you add a new subnet to your Google VPC, your on-premises network will automatically get routes to it.

But using the internet to connect networks isn't always the best option for everyone, either because of security concerns or because of bandwidth reliability.

So, a second option is to consider “peering” with Google using Direct Peering. Peering means putting a router in the same public data center as a Google point of presence and using it to exchange traffic between networks. Google has points of presence around the world. Customers who aren’t already in a point of presence can work with a partner in the Carrier Peering program to get connected. Carrier Peering gives you direct access from your on-premises network through a service provider's network to Google Workspace and to Google Cloud products that can be exposed through one or more public IP addresses. One downside of peering though, is that it isn’t covered by a Google Service Level Agreement.

If getting the highest uptimes for interconnection is important, using Dedicated Interconnect would be a good solution. This option allows for one or more direct, private connections to Google. If these connections have topologies that meet Google’s specifications, they can also be covered by an SLA of up to 99.99%. Also, these connections can be backed up by a VPN for even greater reliability.

Another option we’ll explore is Partner Interconnect, which provides connectivity between an on-premises network and a VPC network through a supported service provider. A Partner Interconnect connection is useful if a data center is in a physical location that can't reach a Dedicated Interconnect colocation facility, or if the data needs don’t warrant an entire 10 Gigabytes per second connection. Depending on availability needs, Partner Interconnect can be configured to support mission-critical services or applications that can tolerate some downtime. As with Dedicated Interconnect, if these connections have topologies that meet Google’s specifications, they can be covered by an SLA of up to 99.99%, but note that Google isn’t responsible for any aspects of Partner Interconnect provided by the third-party service provider, nor any issues outside of Google's network.

And the final option is Cross-Cloud Interconnect. Cross-Cloud Interconnect helps you establish high-bandwidth dedicated connectivity between Google Cloud and another cloud service provider. Google provisions a dedicated physical connection between the Google network and that of another cloud service provider. You can use this connection to peer your Google Virtual Private Cloud network with your network that's hosted by a supported cloud service provider. Cross-Cloud Interconnect supports your adoption of an integrated multicloud strategy. In addition to supporting various cloud service providers, Cross-Cloud Interconnect offers reduced complexity, site-to-site data transfer, and encryption. Cross-Cloud Interconnect connections are available in two sizes: 10 gigabits per second, or 100 gigabits per second.

Choosing a network option depends on your applications and business requirements. You can assess those requirements by answering three simple questions:

1. Do any of your on-premises servers or user computers with private addressing need to connect to Google Cloud resources with private addressing?
2. Do the bandwidth and performance of your current connection to Google services currently meet your business requirements?
3. And do you already have, or are you willing to install and manage, access and routing equipment in one of Google’s point of presence locations?

- If you need private-to-private connectivity and your internet connection meets your business requirements, then building a Cloud VPN is your best bet.
- If you don’t need private access and your Internet connection is meeting your business requirements, then you can simply use public IP addresses to connect to Google services.
- If you don’t need private address connectivity and your current connection to Google Cloud isn’t performing well, then peering may be your best connectivity option. Direct Peering is a good option if you already have a footprint in one of Google’s points of presence, or you’re willing to lease co-location space and install and support routing equipment. If installing equipment isn’t an option, or you would prefer to work with a service provider partner as an intermediary to peer with Google, then Carrier Peering is the way to go.
- If you need private, high-performance connectivity to Google Cloud, but installing equipment isn’t an option, or you would prefer to work with a service provider partner as an intermediary, then Partner Interconnect would be the recommended option.
- Last but not least, there’s Dedicated Interconnect, which provides you with a private circuit direct to Google. This is a good option if you already have a footprint or are willing to lease co-lo space and install and support routing equipment, in a Google point of presence.

---

## Síntesis Técnica y Puntos Clave para el Examen ACE

### 1. Cloud VPN y Cloud Router (Túneles IPsec sobre Internet)
- **Túneles Seguros IPsec:** Conecta redes on-premises u otras nubes con Google VPC utilizando internet pública cifrada.
- **Enrutamiento Dinámico con Cloud Router (BGP):**
  - Utiliza el protocolo Border Gateway Protocol (BGP v4) para anunciar prefijos CIDR de forma dinámica.
  - **Ventaja de Operación:** Si se añade una nueva subred a la VPC en Google Cloud, Cloud Router la propaga automáticamente a los routers on-premises sin requerir reconfiguración manual de rutas estáticas ni reinicio de túneles.
- **SLA:** HA VPN garantiza un SLA del 99.99% cuando se configuran dos interfaces en topología activa/activa.

### 2. Conectividad Pública: Direct Peering vs Carrier Peering (Pregunta Crítica de Examen)
- **Propósito:** Conexión directa a **direcciones IP públicas de Google** (servicios de Google Workspace, YouTube y APIs públicas de Google Cloud). **NO** proporciona acceso directo por IPs privadas (RFC 1918) a máquinas virtuales dentro de una VPC.
- **Direct Peering:** El cliente coloca sus propios routers físicamente en un Punto de Presencia (PoP) de Google y establece sesiones BGP directas.
- **Carrier Peering:** Conexión a través de un operador de telecomunicaciones asociado para clientes sin presencia física en un PoP.
- **Regla Crítica de Examen ACE (Ausencia de SLA):** Google **NO ofrece ningún acuerdo de nivel de servicio (SLA)** para Direct Peering ni Carrier Peering.

### 3. Conectividad Privada Empresarial: Dedicated Interconnect vs Partner Interconnect
- **Propósito:** Extiende redes privadas on-premises hacia Google VPC mediante circuitos físicos directos de capa 2/3 (tráfico privado RFC 1918 sin transitar por internet pública).
- **Dedicated Interconnect:**
  - Circuito físico directo de fibra óptica entre el router del cliente y el router de Google en una instalación de colocación designada.
  - Capacidades fijas: Circuitos de **10 Gbps** o **100 Gbps**.
  - SLA de hasta el **99.99%** para producción crítica cuando se implementa la topología de alta disponibilidad recomendada por Google (4 conexiones distribuidas en 2 áreas metropolitanas y 2 zonas de borde).
- **Partner Interconnect:**
  - Conexión privada gestionada a través de un proveedor de servicios de red asociado.
  - **Casos de uso ideales:**
    - El centro de datos corporativo no puede alcanzar físicamente una instalación de colocación de Google.
    - El volumen de tráfico no justifica una conexión completa de 10 Gbps (admite capacidades sub-10G: desde 50 Mbps hasta 10 Gbps).
  - SLA de hasta el 99.99% en topología de alta disponibilidad, aunque Google no se responsabiliza de incidencias originadas en la infraestructura del proveedor externo.

### 4. Conectividad Multi-Cloud: Cross-Cloud Interconnect
- **Conectividad Física Directa Cloud-to-Cloud:** Enlaces dedicados de alta velocidad y baja latencia provisionados directamente por Google entre su red troncal y otros proveedores cloud (AWS, Microsoft Azure, Oracle Cloud Infrastructure).
- **Ventajas:** Elimina la necesidad de que la empresa adquiera, aloje o gestione hardware intermedio en instalaciones de colocación de terceros; simplifica transferencias masivas de datos y ofrece cifrado integrado.
- **Capacidades Disponibles:** Puertos de **10 Gbps** o **100 Gbps**.

### 5. Matriz y Árbol de Decisión de Conectividad Híbrida (Guía Definitiva ACE)

| Requisito de Acceso | Rendimiento de Internet | Presencia en PoP / Hardware | Solución Recomendada en Google Cloud |
| :--- | :--- | :--- | :--- |
| **IP Privada (VPC RFC 1918)** | Suficiente / Tolerable | No requerida | **Cloud VPN (con Cloud Router)** |
| **IP Privada (VPC RFC 1918)** | Insuficiente (Alto Rendimiento) | Sí (capacidad de colocación 10G/100G) | **Dedicated Interconnect** |
| **IP Privada (VPC RFC 1918)** | Insuficiente (Alto Rendimiento) | No (requiere socio o ancho de banda sub-10G) | **Partner Interconnect** |
| **IP Privada (VPC a VPC Cloud)** | Alta velocidad dedicada | No requiere hardware (Cloud-to-Cloud) | **Cross-Cloud Interconnect** |
| **IP Pública (Workspace / APIs)** | Suficiente | No requerida | **Internet Pública directa** |
| **IP Pública (Workspace / APIs)** | Insuficiente (Optimización BGP) | Sí (router propio en PoP) | **Direct Peering (Sin SLA)** |
| **IP Pública (Workspace / APIs)** | Insuficiente (Optimización BGP) | No (a través de operador) | **Carrier Peering (Sin SLA)** |


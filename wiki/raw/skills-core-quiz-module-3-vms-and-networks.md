# Ingesta Cruda: Quiz del Módulo 3 - Virtual Machines and Networks in the Cloud

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Quiz 689568](https://www.skills.google/course_templates/60/quizzes/689568)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 3: Virtual Machines and Networks in the Cloud  
**Quiz ID**: `689568`  
**Passing Score**: 80% (4 de 5 preguntas correctas)  
**Estado**: Evaluado y Aprobado con 100%  

---

## 📋 Preguntas, Opciones y Respuestas Oficiales

### Pregunta 1
* **Enunciado**: *In Google Cloud VPCs, what scope do subnets have?*
* **Opciones**:
  1. Zonal
  2. Multi-regional
  3. Regional
  4. Global
* **Respuesta Correcta**: **Regional**
* **Justificación Técnica & Enfoque ACE**:
  * En Google Cloud, las redes VPC (`networks`) tienen alcance **global**, lo que significa que una sola VPC puede albergar recursos en cualquier región del mundo sin requerir túneles VPN ni gateways de interconexión.
  * Sin embargo, las **subredes** (`subnets`) son estrictamente **REGIONALES**.
  * Cada subred reside en una región específica (ej. `us-central1`, `europe-west1`) y define un rango contiguo de direcciones IP privadas (CIDR RFC 1918).
  * Aunque la subred es regional, abarca de forma transparente **todas las zonas** de disponibilidad dentro de dicha región (por ejemplo, `us-central1-a`, `us-central1-b`, `us-central1-c`), permitiendo que instancias en diferentes zonas se comuniquen dentro de la misma subred sin enrutadores adicionales.

---

### Pregunta 2
* **Enunciado**: *How does global Cloud Load Balancing allow you to balance HTTP-based traffic?*
* **Opciones**:
  1. Across multiple Compute Engine regions.
  2. Across multiple physical machines in a single data center.
  3. Across multiple virtual machine instances in a single Compute Engine region.
  4. Across multiple Google Cloud services.
* **Respuesta Correcta**: **Across multiple Compute Engine regions.**
* **Justificación Técnica & Enfoque ACE**:
  * El **Global External Application Load Balancer** opera en la Capa 7 (HTTP/HTTPS) mediante una única dirección IP virtual Anycast global.
  * Cuando un cliente envía una solicitud HTTP, la petición ingresa a la red de fibra privada de Google a través del Punto de Presencia (PoP) de Google Front End (GFE) más cercano geográficamente al usuario.
  * Desde allí, el balanceador distribuye el tráfico entre grupos de instancias administrados (MIGs) o Network Endpoint Groups (NEGs) ubicados en **múltiples regiones de Compute Engine alrededor del mundo**.
  * Si los servidores de una región se saturan o quedan fuera de servicio, el balanceador redirige automáticamente las solicitudes hacia la siguiente región más cercana sin cambiar de IP ni interrumpir a los clientes.

---

### Pregunta 3
* **Enunciado**: *For which of these interconnect options is a Service Level Agreement available?*
* **Opciones**:
  1. Dedicated Interconnect
  2. Direct Peering
  3. Standard Network Tier
  4. Carrier Peering
* **Respuesta Correcta**: **Dedicated Interconnect**
* **Justificación Técnica & Enfoque ACE**:
  * **Dedicated Interconnect** y **Partner Interconnect** son servicios oficiales de Google Cloud para interconexión privada RFC 1918 que ofrecen Acuerdos de Nivel de Servicio empresariales (**SLA de 99.9%** para topología de producción y **SLA de 99.99%** para configuraciones de misión crítica con doble router en dos áreas metropolitanas).
  * **Direct Peering** y **Carrier Peering** conectan redes de clientes directamente a la infraestructura pública de Google (para acceder a Google Workspace, YouTube y APIs públicas de GCP con IPs públicas), pero **NO cuentan con un SLA garantizado por Google Cloud**.
  * **Standard Network Tier** es un nivel de enrutamiento de red de bajo costo que utiliza la internet pública en lugar de la red troncal privada de Google, y no constituye un mecanismo de interconexión física o privada.

---

### Pregunta 4
* **Enunciado**: *What is the main reason customers choose Spot VMs?*
* **Opciones**:
  1. To reduce cost on premium operating systems.
  2. To reduce cost.
  3. To use custom machine types.
  4. To improve performance.
* **Respuesta Correcta**: **To reduce cost.**
* **Justificación Técnica & Enfoque ACE**:
  * La principal razón para elegir **Spot VMs** (anteriormente denominadas Preemptible VMs) es la **reducción dramática de costos**, ofreciendo descuentos de entre el **60% y el 91%** en comparación con el precio de las instancias bajo demanda estándar.
  * A cambio del descuento, Compute Engine puede terminar o reclamar la instancia en cualquier momento si Google necesita recuperar la capacidad de cómputo para clientes bajo demanda, proporcionando un preaviso de solo 30 segundos.
  * Son ideales para cargas de trabajo por lotes (*batch processing*), renderizado, análisis genómico, simulación financiera y tareas tolerantes a fallos donde una instancia interrumpida puede reiniciarse automáticamente en otro nodo sin pérdida de consistencia.

---

### Pregunta 5
* **Enunciado**: *Which of the following describes a Virtual Private Cloud (VPC)?*
* **Opciones**:
  1. A fully distributed, software-defined, managed service for traffic distribution.
  2. An option that allows one or more direct, private connections to Google.
  3. A service that routes traffic through a Google Point of Presence (PoP).
  4. A secure, individual, private cloud-computing model hosted within a public cloud.
* **Respuesta Correcta**: **A secure, individual, private cloud-computing model hosted within a public cloud.**
* **Justificación Técnica & Enfoque ACE**:
  * Una **Virtual Private Cloud (VPC)** representa una red virtual aislada, segura e individualizada aprovisionada dentro de la infraestructura compartida de la nube pública de Google Cloud.
  * Proporciona aislamiento lógico completo a nivel de tenant/proyecto, control sobre los espacios de direccionamiento IP (CIDR), tablas de enrutamiento distribuidas por software (SDN Andromeda), reglas de cortafuegos de inspección de estado y conectividad privada interna entre VMs sin exponer tráfico a la internet pública.
  * La opción 1 describe a *Cloud Load Balancing*. La opción 2 describe a *Cloud Interconnect*. La opción 3 describe a *Cloud CDN / Google Edge Network*.


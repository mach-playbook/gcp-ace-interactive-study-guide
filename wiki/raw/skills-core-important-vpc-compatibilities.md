# Google Cloud Fundamentals: Core Infrastructure - Important VPC compatibilities

- **Fuente Original:** Google Skills (Course Template 60, Video 689563)
- **URL Lección:** https://www.skills.google/course_templates/60/video/689563
- **URL Video YouTube:** https://www.youtube.com/watch?v=UtNlJbm8s2Q
- **Duración:** 01:30
- **Módulo:** Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)
- **Fecha de Ingesta:** 2026-11-09

---

## Transcripción Limpia y Completa

Now let’s explore some of the most important Virtual Private Cloud compatibility features.

Much like physical networks, VPCs have routing tables. VPC routing tables are built-in so you don’t have to provision or manage a router. They’re used to forward traffic from one instance to another within the same network, across subnetworks, or even between Google Cloud zones, without requiring an external IP address.

Another thing you don’t have to provision or manage for Google Cloud is a firewall. VPCs provide a global distributed firewall, which can be controlled to restrict access to instances through both incoming and outgoing traffic.

Firewall rules can be defined through network tags on Compute Engine instances, which is really convenient. For example, you can tag all your web servers with, say, “WEB,” and write a firewall rule saying that traffic on ports 80 or 443 is allowed into all VMs with the “WEB” tag, no matter what their IP address happens to be.

You’ll remember that VPCs belong to Google Cloud projects, but what if your company has several Google Cloud projects, and the VPCs need to talk to each other? With VPC Peering, a relationship between two VPCs can be established to exchange traffic.

Alternatively, to use the full power of Identity and Access Management (IAM) to control who and what in one project can interact with a VPC in another, you can configure a Shared VPC.

---

## Síntesis Técnica y Puntos Clave para el Examen ACE

### 1. Tablas de Enrutamiento Nativas y Arquitectura SDN Andromeda
- **Enrutamiento sin routers físicos ni virtuales:** Las redes VPC integran tablas de enrutamiento gestionadas por software (Software-Defined Networking sobre el plano de control Andromeda de Google).
- **Conectividad Interna Privada:** Permiten enviar paquetes entre instancias de la misma red, entre distintas subredes de la misma VPC y entre zonas geográficas separadas utilizando direcciones IP privadas internas (RFC 1918), sin requerir puertas de enlace (*gateways*) adicionales ni IPs externas públicas.

### 2. Firewall Global Distribuido y Network Tags
- **Firewall con Estado (*Stateful*):** Las reglas de firewall se aplican a nivel de interfaz de red virtual en cada máquina, pero se configuran de forma centralizada a nivel de red VPC global. Si el tráfico entrante es permitido, la respuesta saliente se autoriza automáticamente sin requerir regla simétrica.
- **Filtrado por Etiquetas de Red (*Network Tags*):**
  - Permite desacoplar las reglas de seguridad de las direcciones IP de las instancias.
  - Ejemplo canónico de examen: Asignar la etiqueta `web-server` a un grupo de VMs y crear una regla de firewall entrante (*ingress*) que abra los puertos TCP 80 y 443 únicamente a instancias con dicha etiqueta. Cualquier VM creada con ese tag hereda la protección de inmediato sin reconfigurar subredes.
  - Alternativa de máxima seguridad: Utilizar *Service Accounts* asociadas a las VMs en lugar de etiquetas para evitar que usuarios sin permisos de red eludan políticas modificando tags.

### 3. Interconexión Directa: VPC Network Peering
- **Comunicación Privada Inter-VPC:** Conecta dos redes VPC (del mismo o de diferentes proyectos u organizaciones) para que intercambien tráfico con direcciones IP internas y latencia ultra-baja a través del backbone privado de Google.
- **Reglas Críticas de Examen:**
  - **No transitivo (*Non-transitive*):** Si VPC-A está conectada con VPC-B y VPC-B está conectada con VPC-C, VPC-A **NO** puede comunicarse con VPC-C a través de VPC-B.
  - **Sin solapamiento de CIDRs:** Los rangos de IP de las dos redes emparejadas no deben solaparse.
  - La configuración debe ser bidireccional (ambos administradores deben aceptar la relación de emparejamiento).

### 4. Gobernanza Empresarial Centralizada: Shared VPC (VPC Compartida)
- **Separación de Responsabilidades y Principio de Menor Privilegio:**
  - **Host Project (Proyecto Host):** Proyecto central gobernado por los administradores de redes (`Shared VPC Admin` / `roles/compute.xpnAdmin`). Contiene la red VPC compartida, las subredes y las reglas de firewall corporativas.
  - **Service Projects (Proyectos de Servicio):** Proyectos vinculados gestionados por equipos de desarrollo de aplicaciones. Los desarrolladores pueden aprovisionar instancias VM y clusters GKE utilizando las subredes compartidas mediante el rol `roles/compute.networkUser`, pero no pueden modificar rutas ni alterar reglas de cortafuegos.
- **Restricción Organizacional:** Shared VPC requiere obligatoriamente pertenecer a la misma **Organización** de Google Cloud (Cloud Identity / Workspace).

### 5. Cuadro Comparativo de Examen ACE: VPC Peering vs Shared VPC

| Criterio | VPC Network Peering | Shared VPC (VPC Compartida) |
| :--- | :--- | :--- |
| **Control Administrativo** | Descentralizado (cada proyecto mantiene su propia red y administración independiente) | Centralizado (un equipo de red gestiona la VPC en el Proyecto Host) |
| **Pertenencia Organizacional** | Puede conectar VPCs dentro de la misma organización o entre **organizaciones distintas** | Requiere que todos los proyectos pertenezcan a la **misma organización** |
| **Tránsito de Red** | No transitivo (A ↔ B) | Tráfico interno nativo entre todas las instancias de los proyectos de servicio en la VPC |
| **Gestión de IAM** | Limitada a las conexiones de red entre proyectos | Granular por subred: se asigna `roles/compute.networkUser` sobre subredes específicas |


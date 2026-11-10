# Google Cloud Fundamentals: Core Infrastructure - Virtual Private Cloud Networking

- **Fuente Original:** Google Skills (Course Template 60, Video 689560)
- **URL Lección:** https://www.skills.google/course_templates/60/video/689560
- **URL Video YouTube:** https://www.youtube.com/watch?v=SFRCZvJN650
- **Duración:** 02:17
- **Módulo:** Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)
- **Fecha de Ingesta:** 2026-11-09

---

## Transcripción Limpia y Completa

In this section of the course, we’re going to explore how Google Compute Engine works with a focus on virtual networking.

Many users start with Google Cloud by defining their own virtual private cloud inside their first Google Cloud project or by starting with the default virtual private cloud.

So, what is a virtual private cloud?

A virtual private cloud, or VPC, is a secure, individual, private cloud-computing model hosted within a public cloud – like Google Cloud!

On a VPC, customers can run code, store data, host websites, and do anything else they could do in an ordinary private cloud, but this private cloud is hosted remotely by a public cloud provider.

This means that VPCs combine the scalability and convenience of public cloud computing with the data isolation of private cloud computing.

VPC networks connect Google Cloud resources to each other and to the internet. This includes segmenting networks, using firewall rules to restrict access to instances, and creating static routes to forward traffic to specific destinations.

Here's something that tends to surprise a lot of new Google Cloud users: Google VPC networks are global.

They can also have subnets, which is a segmented piece of the larger network, in any Google Cloud region worldwide.

Subnets can span the zones that make up a region. This architecture makes it easy to define network layouts with global scope.

Resources can even be in different zones on the same subnet.

The size of a subnet can be increased by expanding the range of IP addresses allocated to it, and doing so won’t affect virtual machines that are already configured.

For example, let’s take a VPC network named vpc1 that has two subnets defined in the asia-east1 and us-east1 regions. If the VPC has three Compute Engine VMs attached to it, it means they’re neighbors on the same subnet even though they’re in different zones.

This capability can be used to build solutions that are resilient to disruptions yet retain a simple network layout.

---

## Síntesis Técnica y Puntos Clave para el Examen ACE

1. **VPC como Recurso Global**:
   - En Google Cloud, una red VPC no está atada a un centro de datos o región física particular: es un recurso de alcance **global**.
   - Permite interconectar recursos distribuidos por todo el planeta a través de la red troncal privada de Google sin transitar por la Internet pública.

2. **Subredes Regionales (Regional Subnets)**:
   - Las subredes se crean dentro de una región geográfica específica (ej. `us-east1`, `asia-east1`).
   - Una subred **abarca automáticamente todas las zonas de disponibilidad** de esa región (ej. `us-east1-b`, `us-east1-c`, `us-east1-d`).

3. **Instancias en Distintas Zonas dentro de la Misma Subred**:
   - Múltiples máquinas virtuales pueden residir en diferentes zonas de una misma región compartiendo el mismo segmento de red y espacio de direccionamiento IP privado.
   - Proporciona tolerancia a fallos zonal sin necesidad de configurar routers virtuales intermedios ni túneles complejos.

4. **Expansión Dinámica de Espacio IP (Subnet Expansion)**:
   - Se puede expandir el rango CIDR de una subred existente (por ejemplo, de `/24` a `/20`) en caliente sin interrumpir ni reiniciar las VMs que ya están operando.
   - *Restricción ACE:* Solo se puede agrandar el rango (hacer la máscara más pequeña / prefijo menor), nunca encogerlo.

5. **Aislamiento y Conectividad Controlada**:
   - Segmentación lógica del tráfico mediante **reglas de firewall con estado (stateful)** aplicables por tags, etiquetas o cuentas de servicio.
   - Rutas estáticas (*static routes*) para dirigir tráfico hacia destinos específicos, gateways de Internet o appliances virtuales (NVAs).


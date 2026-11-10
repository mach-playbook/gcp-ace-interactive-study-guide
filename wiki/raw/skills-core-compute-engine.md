# Google Cloud Fundamentals: Core Infrastructure - Compute Engine

- **Fuente Original:** Google Skills (Course Template 60, Video 689561)
- **URL Lección:** https://www.skills.google/course_templates/60/video/689561
- **URL Video YouTube:** https://www.youtube.com/watch?v=90pyGSKyPDQ
- **Duración:** 03:45
- **Módulo:** Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)
- **Fecha de Ingesta:** 2026-11-09

---

## Transcripción Limpia y Completa

Earlier in the course, we explored infrastructure as a service, or IaaS. Now let’s explore Google Cloud’s IaaS solution: Compute Engine.

With Compute Engine, users can create and run virtual machines on Google infrastructure.

There are no upfront investments, and thousands of virtual CPUs can run on a system that’s designed to be fast and to offer consistent performance.

Each virtual machine contains the power and functionality of a full-fledged operating system. This means a virtual machine can be configured much like a physical server: by specifying the amount of CPU power and memory needed, the amount and type of storage needed, and the operating system.

A virtual machine instance can be created via the Google Cloud console, which is a web-based tool to manage Google Cloud projects and resources, the Google Cloud CLI, or the Compute Engine API.

The instance can run Linux and Windows Server images provided by Google or any customized versions of these images. You can also build and run images of other operating systems and flexibly reconfigure virtual machines.

A quick way to get started with Google Cloud is through the Cloud Marketplace, which offers solutions from both Google and third-party vendors. With these solutions, there’s no need to manually configure the software, virtual machine instances, storage, or network settings, although many of them can be modified before launch if that’s required.

Most software packages in Cloud Marketplace are available at no additional charge beyond the normal usage fees for Google Cloud resources. Some Cloud Marketplace images charge usage fees, particularly those published by third parties with commercially licensed software, but they all show estimates of their monthly charges before they’re launched.

At this point, you might be wondering about Compute Engine’s pricing and billing structure.

For the use of virtual machines, Compute Engine bills by the second with a one-minute minimum, and sustained-use discounts start to apply automatically to virtual machines the longer they run. So, for each VM that runs for more than 25% of a month, Compute Engine automatically applies a discount for every additional minute.

Compute Engine also offers committed-use discounts. This means that for stable and predictable workloads, a specific amount of vCPUs and memory can be purchased for up to a 57% discount off of normal prices in return for committing to a usage term of one year or three years.

Then there are Spot VMs. These are perfect for workloads that don't require immediate human oversight—like a batch job analyzing a large dataset. By opting for Spot VMs, you can save up to 90% compared to standard pricing.

Unlike the older 'Preemptible' model, Spot VMs have no maximum runtime; they can run as long as the capacity is available. The primary trade-off is that Google Cloud reserves the right to terminate the instance if those resources are needed elsewhere. While the savings are significant, you must ensure your workload is designed to be stopped and restarted without losing progress.

In terms of storage, Compute Engine doesn’t require a particular option or machine type to get high throughput between processing and persistent disks. That’s the default, and it comes to you at no extra cost.

And finally, you’ll only pay for what you need with custom machine types. Compute Engine lets you choose the machine properties of your instances, like the number of virtual CPUs and the amount of memory, by using a set of predefined machine types or by creating your own custom machine types.

---

## Síntesis Técnica y Puntos Clave para el Examen ACE

1. **Compute Engine como Solución IaaS Central**:
   - Aprovisionamiento bajo demanda de máquinas virtuales (VMs) en la infraestructura hiper-escalable de Google sin inversión inicial de capital (CapEx → OpEx).
   - Control total sobre el sistema operativo (distribuciones Linux y Windows Server oficiales o imágenes personalizadas del cliente).

2. **Modelos de Facturación y Optimización de Costes (Crucial en ACE Domain 1 y 2)**:
   - **Facturación por segundo con mínimo de 1 minuto:** Las VMs se facturan al segundo exacto transcurrido el primer minuto de ejecución.
   - **Sustained-Use Discounts (SUD):** Descuentos automáticos de hasta un 30% adicionales que no requieren reserva previa; se activan automáticamente en cuanto la instancia opera más del 25% del mes.
   - **Committed-Use Discounts (CUD):** Descuentos de hasta el 57% sobre CPU y memoria a cambio de compromisos contractuales de 1 o 3 años para cargas estables y predecibles.
   - **Spot VMs (Evolución de Preemptible VMs):**
     - Descuentos de hasta el 90% sobre el precio de lista bajo demanda.
     - A diferencia de las *Preemptible VMs* tradicionales (que tenían una ventana máxima de 24 horas y luego se apagaban forzosamente), las **Spot VMs no tienen límite máximo de ejecución de 24 horas**; corren indefinidamente mientras exista capacidad ociosa en el centro de datos.
     - **Trade-off crítico:** Google Cloud puede revocarlas en cualquier momento con un aviso de 30 segundos si la capacidad se requiere para clientes bajo demanda.
     - **Caso de uso idóneo:** Cargas tolerantes a interrupciones (procesamiento por lotes / *batch jobs*, análisis distribuido, renderizado, entornos CI/CD) con checkpoints periódicos.

3. **Custom Machine Types (Tipos de Máquina Personalizados)**:
   - Permiten desacoplar y dimensionar con exactitud el número de vCPUs y los gigabytes de RAM necesarios para una aplicación.
   - Evitan el sobredimensionamiento obligatorio de pagar por tipos predefinidos con más CPU o memoria de la que la carga de trabajo requiere.

4. **Almacenamiento Persistente y Rendimiento Predeterminado**:
   - Alto ancho de banda (*throughput*) predeterminado y sin coste de licencia adicional entre los núcleos de procesamiento de la VM y los volúmenes de Persistent Disks (PD).


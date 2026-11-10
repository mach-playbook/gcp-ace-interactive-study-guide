# Google Cloud Fundamentals: Core Infrastructure - Scaling virtual machines

- **Fuente Original:** Google Skills (Course Template 60, Video 689562)
- **URL Lección:** https://www.skills.google/course_templates/60/video/689562
- **URL Video YouTube:** https://www.youtube.com/watch?v=YQK8u563me4
- **Duración:** 01:15
- **Módulo:** Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)
- **Fecha de Ingesta:** 2026-11-09

---

## Transcripción Limpia y Completa

As we’ve just seen, with Compute Engine, you can choose the most appropriate machine properties for your instances, like the number of virtual CPUs and the amount of memory, by using a set of predefined machine types, or by creating custom machine types.

To do this, Compute Engine has a feature called Autoscaling, where VMs can be added to or subtracted from an application based on load metrics.

The other part of making that work is balancing the incoming traffic among the VMs. Google’s Virtual Private Cloud (VPC) supports several different kinds of load balancing, which we’ll explore shortly.

With Compute Engine, you can in fact configure very large VMs, which are great for workloads such as in-memory databases and CPU-intensive analytics, but most Google Cloud customers start off with scaling out, not up.

The maximum number of CPUs per VM is tied to its “machine family” and is also constrained by the quota available to the user, which is zone-dependent.

Specifications for currently available VM machine types can be found at cloud.google.com/compute/docs/machine-types.

---

## Síntesis Técnica y Puntos Clave para el Examen ACE

### 1. Autoscaling en Compute Engine y Managed Instance Groups (MIGs)
- **Definición Operativa:** Capacidad de elasticidad dinámica para incrementar (*scale out*) o reducir (*scale in*) de forma automática el número de instancias VM en respuesta a fluctuaciones en la demanda real.
- **Métricas de Escalado:** El autoescalado en Compute Engine puede dispararse en función de:
  - Utilización promedio de CPU (ej. mantener CPU al 60%).
  - Capacidad de atención del balanceador de carga HTTP(S) (solicitudes por segundo / target utilization).
  - Métricas personalizadas recolectadas por Cloud Monitoring (ej. longitud de colas de mensajes en Pub/Sub).
  - Programación temporal basada en calendario (*schedule-based autoscaling*).

### 2. Balanceo de Carga en Google VPC (Cloud Load Balancing)
- **Sinergia Indispensable:** El autoescalado horizontal requiere de forma obligatoria un mecanismo que reparta de manera homogénea y fiable las peticiones de los clientes entre las instancias activas.
- **Tipos de Balanceadores en VPC:**
  - Balanceadores Globales L7 (HTTP/HTTPS externos e internos) mediante proxies de Google Front End (GFE).
  - Balanceadores Regionales L4 (TCP/UDP Passthrough y TCP/SSL Proxy).
  - Verificaciones de estado (*Health Checks*) periódicas para excluir automáticamente del enrutamiento a instancias degradadas o fallidas.

### 3. Scaling Out (Horizontal) vs Scaling Up (Vertical)
- **Scale-Up (Escalado Vertical):**
  - Consiste en incrementar los recursos de hardware (vCPUs y memoria RAM) en una única instancia virtual o utilizar máquinas de gran envergadura (familias Memory-Optimized como M2/M3 con cientos de vCPUs y varios terabytes de RAM).
  - Caso de uso específico: Bases de datos relacionales en memoria (SAP HANA) o procesos monolíticos de análisis masivo fuertemente acoplados.
- **Scale-Out (Escalado Horizontal - Enfoque Recomendado ACE):**
  - Consiste en distribuir la carga entre múltiples instancias más pequeñas coordinadas bajo un Managed Instance Group (MIG).
  - **Ventajas Arquitectónicas en Google Cloud:**
    - Alta disponibilidad y tolerancia a fallos multi-zonal (si una zona falla, el MIG regional redistribuye las VMs a las zonas restantes).
    - Elasticidad de costes: Solo se paga por las instancias adicionales durante los picos de carga.
    - Actualizaciones continuas sin tiempo de inactividad (*rolling updates* e implementaciones *canary*).

### 4. Familias de Máquinas y Gobernanza de Cuotas por Zona
- **Familias de Máquinas en Compute Engine:**
  - *General-purpose* (E2, N2, N2D, C3, C4): Equilibrio optimizado precio/rendimiento para la mayoría de cargas.
  - *Compute-optimized* (C2, C2D): Máximo rendimiento de CPU por núcleo para gaming y computación científica.
  - *Memory-optimized* (M1, M2, M3): Ratios de memoria ultra-altos para bases de datos en memoria masivas.
  - *Accelerator-optimized* (A2, A3, G2): GPUs NVIDIA H100, A100 y L4 para IA/ML y entrenamiento de modelos profundos.
- **Restricción Crítica para el Examen ACE (Zone-dependent Quotas):**
  - El aprovisionamiento de vCPUs y tipos de máquina no solo está limitado por la arquitectura de la familia, sino por las **cuotas de proyecto a nivel zonal** (*zone-dependent quota*).
  - Si una aplicación necesita autoescalar más allá del límite predeterminado en una zona concreta, el ingeniero Cloud debe solicitar proactivamente una elevación de cuota en la consola (`IAM & Admin → Quotas & System Limits`) antes de que el MIG alcance el umbral de bloqueo.


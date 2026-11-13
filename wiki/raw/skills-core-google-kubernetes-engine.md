# Ingesta Cruda: Lección 31 - Google Kubernetes Engine (GKE)

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Módulo 5: Contenedores en la Nube y Kubernetes (Containers in the Cloud)
* **ID de Lección (Skills Google):** `689581`
* **URL Skills Google:** [Skills Google - Google Kubernetes Engine](https://www.skills.google/paths/8/course_templates/60/video/689581)
* **URL YouTube:** [YouTube - Google Kubernetes Engine (Video ID: HMcFwcqNjOY)](https://www.youtube.com/watch?v=HMcFwcqNjOY)
* **Puntaje Actual:** ⭐ 14,250 puntos
* **Fecha de Ingesta:** 2026-11-13
* **Tipo de Contenido:** Video formativo con transcripción oficial

---

## 📝 Transcripción Oficial Completa

```text
00:00 So now that we have a basic understanding of containers and Kubernetes, let’s talk about Google Kubernetes Engine, or GKE.
00:08 GKE is a Google-hosted managed Kubernetes service in the cloud.
00:12 The GKE environment consists of multiple machines, specifically Compute Engine instances, grouped together to form a cluster.
00:21 You can create a Kubernetes cluster with GKE, but how is GKE different from Kubernetes?
00:27 From the user’s perspective, it’s a lot simpler.
00:30 GKE manages all the control plane components for us.
00:34 It still exposes an IP address to which we send all of our Kubernetes API requests, but GKE is responsible for provisioning and managing all the control plane infrastructure behind it.
00:45 It also eliminates the need for a separate control plane.
00:49 Node configuration and management depends on the type of GKE mode you use.
00:54 With the Autopilot mode, which is recommended, GKE manages the underlying infrastructure such as node configuration, autoscaling, auto- upgrades, baseline security configurations, and baseline networking configuration.
01:09 With the Standard mode, you manage the underlying infrastructure, including configuring the individual nodes.
01:16 Let’s examine the benefits and functionality of Autopilot in more detail.
01:21 Autopilot is optimized for production.
01:24 Autopilot helps produce a strong security posture.
01:28 And Autopilot also promotes operational efficiency.
01:32 The GKE Standard mode has the same functionality as Autopilot, but you’re responsible for the configuration, management, and optimization of the cluster.
01:41 Unless you require the specific level of configuration control offered by GKE standard, it’s recommended that you use Autopilot mode.
01:50 You can create a Kubernetes cluster with GKE by using the Google Cloud console or the gcloud command that's provided by the Cloud software development kit.
02:00 GKE clusters can be customized, and they support different machine types, number of nodes, and network settings.
02:07 Kubernetes provides the mechanisms through which you interact with your cluster.
02:12 Kubernetes commands and resources are used to deploy and manage applications, perform administration tasks, set policies, and monitor the health of deployed workloads.
02:23 Running a GKE cluster comes with the benefit of advanced cluster management features that Google Cloud provides.
02:30 These include Google Cloud's load-balancing for Compute Engine instances; Node pools to designate subsets of nodes within a cluster for additional flexibility; Automatic scaling of your cluster's node instance count; Automatic upgrades for your cluster's node software; Node auto-repair to maintain node health and availability; And logging and monitoring with Google Cloud Observability for visibility into your cluster.
02:56 To start up Kubernetes on a cluster in GKE, all you do is run this command: gcloud container clusters create-auto k1 --region, specifying the cluster region.
```

---

## 🔬 Síntesis Técnica y Desglose Arquitectónico

### 1. ¿Qué es Google Kubernetes Engine (GKE)?
* **Definición Formal:** GKE es el servicio administrado por Google para la orquestación de clústeres de Kubernetes alojados en Google Cloud.
* **Infraestructura Subyacente:** Un clúster GKE está compuesto por un conjunto de máquinas virtuales de **Compute Engine** agrupadas de manera coordinada para ejecutar contenedores.
* **Diferencia Fundamental frente a Kubernetes Open-Source:**
  * En Kubernetes vainilla (*self-managed* o desplegado manualmente en VMs/on-premises), el usuario debe instalar, configurar, parchear, asegurar y escalar todos los componentes del Plano de Control (*kube-apiserver*, *etcd*, *kube-scheduler*, *kube-controller-manager*).
  * **En GKE:** Google administra íntegramente el Plano de Control (*Control Plane*), garantizando alta disponibilidad, respaldos de *etcd* y resiliencia. GKE expone un endpoint seguro (IP pública o privada) hacia el cual el administrador o desarrollador dirige sus solicitudes habituales con la API de Kubernetes y `kubectl`.

### 2. Modos Operativos de GKE: Autopilot vs Standard

Google Cloud ofrece dos modos de operación para los clústeres de GKE:

| Característica / Dimensión | GKE Autopilot (Modo Recomendado) | GKE Standard |
| :--- | :--- | :--- |
| **Filosofía de Gestión** | Infraestructura totalmente administrada por Google. Enfoque centrado en cargas de trabajo (*workload-first*). | Gestión compartida de infraestructura. Enfoque centrado en clúster y nodos (*node-first*). |
| **Control Plane** | Administrado 100% por Google Cloud con SLA empresarial incluido. | Administrado por Google Cloud (con tarifa fija por clúster/hora). |
| **Gestión de Nodos** | Totalmente automatizada: aprovisionamiento dinámico, dimensionamiento, autoescalado, auto-upgrades y auto-reparación. | Responsabilidad del usuario: selección de tipos de máquina, tamaño de discos, configuración de node pools y políticas de mantenimiento. |
| **Seguridad de Nodos** | Endurecimiento predeterminado (*baseline security* estricta), sin acceso SSH a nodos, ejecución de prácticas recomendadas de CIS Benchmark. | El usuario debe configurar manualmente políticas de seguridad de nodos, blindaje de SO y reglas de acceso. |
| **Configuración de Red** | Redes VPC nativas y optimizadas por defecto con enrutamiento de IPs de Pods (*VPC-native clusters*). | El usuario decide entre modo basado en rutas (*route-based*) o nativo de VPC (*VPC-native*). |
| **Modelo de Facturación** | **Se paga únicamente por los recursos solicitados por los Pods** (vCPU, memoria RAM y almacenamiento efímero). | **Se paga por las instancias de Compute Engine subyacentes** que componen los nodos del clúster, sin importar si los Pods las aprovechan al 100%. |
| **Comando CLI de Creación** | `gcloud container clusters create-auto <nombre> --region <region>` | `gcloud container clusters create <nombre> --zone <zona>` (o `--region`) |
| **Recomendación Oficial** | **Modo predeterminado para casi todas las cargas de producción**, optimizando seguridad, costos y eficiencia operativa. | Solo recomendado cuando se requiere control estricto a nivel de hardware, demonios en nodos del sistema o tipos de máquina exóticos no soportados en Autopilot. |

### 3. Funcionalidades Avanzadas de Gestión de Clústeres en GKE
GKE se diferencia de implementaciones autogestionadas al integrarse de forma nativa con los servicios de infraestructura de Google Cloud:

1. **Balanceo de Carga Integrado (Google Cloud Load Balancing):**
   * Creación automática de balanceadores de carga de red (NLB) o de aplicaciones (ALB/Ingress) al declarar objetos `Service` (`type: LoadBalancer`) o `Ingress` en Kubernetes, con IPs públicas Anycast globales.
2. **Node Pools (Grupos de Nodos):**
   * Permite subdividir los nodos de un clúster en subconjuntos homogéneos para ejecutar cargas con requerimientos específicos (por ejemplo, un node pool con aceleradores GPU NVIDIA para Machine Learning y otro node pool con instancias estándar para APIs web).
3. **Autoescalado de Nodos (Cluster Autoscaler):**
   * Ajusta de forma automática la cantidad de VMs en el clúster cuando los Pods no pueden programarse por falta de capacidad o cuando los nodos quedan ociosos.
4. **Actualizaciones Automáticas de Software (Node Auto-Upgrades):**
   * Mantiene los nodos del clúster alineados con las versiones más recientes y seguras de Kubernetes sin intervención manual.
5. **Auto-reparación de Nodos (Node Auto-Repair):**
   * Realiza chequeos de salud continuos sobre los nodos de cómputo; si un nodo deja de responder o falla sus verificaciones de salud, GKE lo drena, destruye y recrea automáticamente.
6. **Observabilidad Integral (Google Cloud Observability):**
   * Integración nativa con Cloud Logging y Cloud Monitoring para recopilar métricas de clúster, eventos del sistema y registros de contenedores (*stdout/stderr*) sin necesidad de instalar agentes de terceros manualmente.

### 4. Creación y Despliegue de Clústeres vía CLI

* **Creación de un Clúster GKE Autopilot (Recomendado):**
  ```bash
  gcloud container clusters create-auto k1 --region us-central1
  ```
* **Creación de un Clúster GKE Standard (Ejemplo regional con 3 nodos por zona):**
  ```bash
  gcloud container clusters create k1-standard \
      --region us-central1 \
      --num-nodes 1 \
      --enable-autoscaling --min-nodes 1 --max-nodes 5
  ```
* **Obtención de Credenciales de Autenticación para `kubectl`:**
  ```bash
  gcloud container clusters get-credentials k1 --region us-central1
  ```

---

## 🎯 Puntos Clave y Trampas de Examen Google Cloud ACE

1. **GKE Autopilot vs GKE Standard en el Examen:**
   * *Pregunta de escenario:* "Una organización desea desplegar microservicios en contenedores en Kubernetes minimizando el esfuerzo administrativo de gestión de infraestructura, optimizando los costos pagando únicamente por los recursos que consumen los Pods y garantizando una configuración de seguridad robusta por defecto".
   * *Respuesta correcta:* **GKE Autopilot**.
   * *Contraste:* Si la pregunta exige acceso administrativo a nivel de sistema operativo del nodo de trabajo, instalación de controladores de kernel específicos o gestión personalizada de demonios en el host, la respuesta es **GKE Standard**.
2. **Control Plane en GKE:**
   * En ambos modos (Autopilot y Standard), el Control Plane está gestionado por Google. El usuario nunca tiene acceso SSH a las máquinas virtuales del Control Plane ni debe preocuparse por la base de datos `etcd`.
3. **Mantenimiento Automatizado:**
   * Recordar los roles complementarios de **Node Auto-Upgrade** (actualización de versión de Kubernetes/SO del nodo) y **Node Auto-Repair** (reemplazo automático de nodos no saludables). Ambos son esenciales para alta disponibilidad operativa en producción.
4. **Cluster Autoscaler vs Horizontal Pod Autoscaler (HPA):**
   * *HPA (Kubernetes):* Escala el número de **Pods** dentro de los nodos existentes en base a CPU/memoria.
   * *Cluster Autoscaler (GKE):* Escala la cantidad de **Máquinas Virtuales (Nodos de Compute Engine)** en el clúster cuando no hay suficiente espacio para albergar nuevos Pods.


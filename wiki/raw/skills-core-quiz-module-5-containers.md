# Ingesta Cruda: Cuestionario Oficial: Quiz Módulo 5 (Containers in the Cloud)

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Quiz Módulo 5](https://www.skills.google/paths/8/course_templates/60/)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 5: Containers in the Cloud / Kubernetes  
**Evaluación**: Quiz Módulo 5  
**Puntaje Mínimo de Aprobación (Passing Score)**: 50%  
**Puntos Acumulados**: 14,250  
**Fecha de Ingesta**: 2026-11-13  

---

## 📝 Banco de Preguntas y Respuestas Oficiales Sanitizadas

### Pregunta 1
* **Enunciado**: What is a Kubernetes pod?
* **Opciones**:
  * A group of nodes
  * A group of VMs
  * A group of clusters
  * **A group of containers**
* **Respuesta Correcta**: **A group of containers**
* **Justificación Oficial**: En la arquitectura de Kubernetes, un Pod es la unidad atómica mínima de computación que se puede crear, programar y desplegar. Actúa como un contenedor lógico (*wrapper*) alrededor de uno o más contenedores estrechamente interdependientes (por ejemplo, el patrón *sidecar*). Los contenedores que residen dentro del mismo Pod comparten la misma dirección de red IP, el mismo espacio de puertos (comunicándose mediante `localhost`) y los mismos volúmenes de almacenamiento.
* **Análisis de Opciones Incorrectas**:
  * *A group of nodes*: Un conjunto de nodos forma un **clúster de Kubernetes**, no un Pod.
  * *A group of VMs*: Las máquinas virtuales representan los nodos de trabajo (*Worker Nodes*) que ejecutan los Pods en GKE o Compute Engine, pero no son un Pod.
  * *A group of clusters*: En entornos multi-clúster, esto corresponde a un *fleet* o malla de servicios multi-clúster (como Anthos/GKE Enterprise), nunca a un Pod.

---

### Pregunta 2
* **Enunciado**: Where do the resources used to build Google Kubernetes Engine clusters come from?
* **Opciones**:
  * App Engine
  * Bare-metal servers
  * **Compute Engine**
  * Cloud Storage
* **Respuesta Correcta**: **Compute Engine**
* **Justificación Oficial**: El entorno de Google Kubernetes Engine (GKE) está compuesto por múltiples instancias de máquinas virtuales que provienen directamente de **Compute Engine**, agrupadas de forma coordinada para formar los nodos de trabajo (*Worker Nodes*) del clúster. GKE automatiza el ciclo de vida, aprovisionamiento, escalado y reparación de estas instancias de Compute Engine.
* **Análisis de Opciones Incorrectas**:
  * *App Engine*: Es la plataforma serverless PaaS de Google Cloud orientada a ejecutar aplicaciones web y microservicios sin control sobre la infraestructura de VMs ni de orquestación de clústeres K8s.
  * *Bare-metal servers*: Si bien Google Cloud ofrece soluciones Bare Metal para casos especializados, los clústeres estándar de GKE en la nube pública utilizan máquinas virtuales virtualizadas sobre Compute Engine.
  * *Cloud Storage*: Es un servicio de almacenamiento de objetos binarios no estructurados (blobs), no un proveedor de recursos de cómputo para ejecutar nodos de clúster.

---

## 🎯 Relevancia para el Examen Google Cloud ACE

1. **Definición de Pods:**
   * Pregunta típica de certificación: "¿Cuál es la unidad más pequeña que Kubernetes puede programar en un nodo?". La respuesta siempre es el **Pod**, nunca el contenedor individual.
2. **Infraestructura de GKE en Compute Engine:**
   * Entender que los nodos de trabajo de GKE consumen cuotas de vCPU, memoria y discos persistentes de Compute Engine en el proyecto del cliente (especialmente relevante en el modo GKE Standard). En el modo GKE Autopilot, Google abstrae la gestión directa de esas VMs y cobra únicamente por los recursos de Pods solicitados.


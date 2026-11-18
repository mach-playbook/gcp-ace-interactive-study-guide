# Ingesta Cruda: Lección 35 - Course Summary (Course 60)

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Cierre Curricular: Resumen del Curso (Course Summary)
* **ID de Lección (Skills Google):** `689589`
* **URL Skills Google:** [Skills Google - Course summary](https://www.skills.google/paths/8/course_templates/60/video/689589)
* **URL YouTube:** [YouTube - Course summary (Video ID: 9lbfxj-K3Qo)](https://www.youtube.com/watch?v=9lbfxj-K3Qo)
* **Puntaje Actual:** ⭐ 16,246 puntos (Racha: 2)
* **Fecha de Ingesta:** 2026-11-18
* **Tipo de Contenido:** Video formativo con transcripción oficial

---

## 📝 Transcripción Oficial Completa

```text
00:00 Congratulations on completing the Google Cloud Fundamentals: Core Infrastructure training course.
00:05 Before you go, let’s take a few minutes to review what we’ve covered.
00:10 In module 1, you were introduced to Google Cloud and cloud computing.
00:14 Specifically, you explored: The concept of managed infrastructure and managed services, through IaaS, infrastructure as a service, and PaaS, platform as a service.
00:24 The Google Cloud network.
00:26 Google Cloud’s focus on security throughout our infrastructure.
00:30 How Google publishes key elements of technology using open source licenses.
00:35 And Google Cloud’s pricing structure and billing tools.
00:39 In module 2, you learned about the Google Cloud Resource Hierarchy, which is made up of four levels: resources, projects, folders, and an organization node.
00:50 You also learned about: Defining policies and their downward inheritance.
00:54 When to use Identity and Access Management, or IAM, And the four ways to access and interact with Google Cloud: through the Google Cloud console, the Cloud SDK and Cloud Shell, APIs, and the Google Cloud App.
01:09 In module 3, you explored how Compute Engine works, with a focus on virtual machines and virtual networking.
01:15 You were introduced to: The VPC, or virtual private cloud.
01:20 Compute Engine’s Autoscaling feature.
01:23 And important Google Virtual Private Cloud compatibility features, like routing tables, firewalls, VPC peering, and shared VPC, all of which result in the need for less network management.
01:36 You also explored Cloud Load Balancing, a fully distributed, software-defined, managed service for all your traffic.
01:44 Finally, you compared how on-premises or other-cloud networks can be interconnected with a Google VPC.
01:51 In module 4, you explored Google Cloud's five core storage options: Cloud Storage, Bigtable, Cloud SQL, Spanner, and Firestore.
02:02 You also examined the four storage classes that make up Cloud Storage: Standard Storage, which is used for frequently accessed hot data, Nearline Storage and Coldline Storage, which are used for less-frequently accessed cool data, and Archive Storage.
02:17 In module 5, you learned about containers, which are invisible boxes around your code and its dependencies.
02:24 You were introduced to containers, along with: Kubernetes, an open-source platform for managing containerized workloads and services.
02:31 And Google Kubernetes Engine (GKE), a Google-hosted managed Kubernetes service in the cloud.
02:39 In module 6, the focus was on developing applications in the cloud.
02:44 You explored: Cloud Run, a managed compute platform that lets you run stateless containers via web requests or Pub/Sub events.
02:52 And Cloud Run functions, a lightweight, event-based, asynchronous compute solution to create single-purpose functions.
03:01 Finally, in module 7, you explored how to combine Google Cloud knowledge with prompt engineering to improve Gemini responses.
03:09 You discovered answers to the following questions: What is generative AI?
03:14 What is a large language model?
03:16 And what is prompt engineering?
03:20 You ended the module by identifying prompt engineering best practices.
03:25 We hope that this course is just the beginning of your Google Cloud journey.
03:29 For more training and hands-on practice, explore the different learning paths available at cloud.google.com/training.
03:38 And if you’re interested in validating your expertise and showcasing your ability to transform businesses with Google Cloud technology, you might consider working toward a Google Cloud certification.
03:48 You can learn more about Google Cloud’s certification offerings at cloud.google.com/certification.
03:55 Thanks for completing this course.
03:56 We’ll see you next time!
```

---

## 🔬 Síntesis Técnica y Desglose Arquitectónico

### 1. Resumen Estructural de los 7 Módulos del Curso
1. **Módulo 1: Introducción a Google Cloud y Cloud Computing**
   * Modelos IaaS vs PaaS vs Serverless vs SaaS.
   * Red troncal física privada global de Google (100+ PoPs, Anycast IP, baja latencia).
   * Modelo de seguridad en 6 capas progresivas (hardware Titan hasta seguridad operacional).
   * Prevención de vendor lock-in mediante estándares de código abierto (Kubernetes, TensorFlow).
   * Facturación por segundo, Sustained Use Discounts (> 25% automático), presupuestos, alertas y cuotas de proyecto.
2. **Módulo 2: Recursos y Acceso en Google Cloud**
   * Jerarquía de recursos de 4 niveles: Organización → Carpetas → Proyectos → Recursos.
   * Herencia aditiva descendente de políticas IAM.
   * Identidades corporativas con Cloud Identity y federación LDAP/Active Directory.
   * Service Accounts y principio de menor privilegio.
   * Las 4 vías de interacción: Cloud Console, Cloud SDK/Cloud Shell, APIs cliente y Cloud Mobile App.
3. **Módulo 3: Redes y Cómputo en Compute Engine**
   * Redes Virtual Private Cloud (VPC) globales y subredes regionales.
   * Máquinas virtuales en Compute Engine, Custom Machine Types y Spot VMs.
   * Autoscaling de VMs y compatibilidades clave de VPC: rutas estáticas, cortafuegos con estado y network tags, VPC Peering y Shared VPC.
   * Cloud Load Balancing: ALB (L7 HTTP/HTTPS reverse proxy) y NLB (L4 Maglev passthrough).
   * Conectividad híbrida: Cloud VPN + Cloud Router (BGP) e Interconnect dedicado/asociado.
4. **Módulo 4: Almacenamiento y Bases de Datos**
   * Los 5 motores troncales: Cloud Storage, Cloud SQL, Cloud Spanner, Firestore y Cloud Bigtable.
   * Las 4 clases de Cloud Storage: Standard, Nearline (30 días), Coldline (90 días) y Archive (365 días), con latencia uniforme en milisegundos.
   * Selección relacional: Cloud SQL (< 64 TB regional) vs Cloud Spanner (escala horizontal petabytes con ACID global y TrueTime).
5. **Módulo 5: Contenedores y Kubernetes**
   * Virtualización del sistema operativo mediante namespaces y cgroups frente a virtualización de hardware.
   * Kubernetes open-source: Pods (unidad atómica mínima), Deployments resilientes, Services y Rolling Updates.
   * Google Kubernetes Engine (GKE): Control Plane administrado, comparación de modos Autopilot vs Standard, Node pools heterogéneos y Cluster Autoscaler.
6. **Módulo 6: Desarrollo y Cómputo Serverless**
   * Cloud Run: Cómputo serverless administrado basado en Knative para contenedores stateless activados por HTTP o Pub/Sub, autoescalado a cero y facturación con granularidad de 100 ms.
   * Cloud Run functions: FaaS ligero orientado a eventos ("pegamento en la nube") disparado por Cloud Storage, Pub/Sub o peticiones HTTP.
7. **Módulo 7: Gemini y Prompt Engineering**
   * Taxonomía IA → Gen AI → LLMs.
   * Arquitectura de LLMs: Parámetros, pre-training probabilístico y fine-tuning supervisado.
   * Mitigación de alucinaciones con datos limpios y restricciones en el prompt.
   * Gemini en Cloud Console y Cloud Shell como asistente y colaborador continuo.
   * 4 tipos de prompts (zero-shot, one-shot, few-shot, role prompts), preamble vs input y 5 mejores prácticas.

### 2. Hoja de Ruta para la Certificación Google Cloud Associate Cloud Engineer (ACE)
* **Objetivo de Certificación:** Validar la capacidad para desplegar aplicaciones, monitorear operaciones y gestionar soluciones empresariales en Google Cloud.
* **Cobertura Temática Fundamental:**
  * Dominio 1: Configuración del entorno de nube (~23%).
  * Dominio 2: Planificación e implementación de soluciones (~30%).
  * Dominio 3: Operación exitosa de soluciones (~27%).
  * Dominio 4: Acceso y seguridad (~20%).
* **Recursos Oficiales Recomendados:**
  * Capacitación oficial: `cloud.google.com/training`
  * Guía y registro del examen: `cloud.google.com/certification/cloud-engineer`

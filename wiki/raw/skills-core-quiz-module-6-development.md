# Ingesta Cruda: Cuestionario Oficial: Quiz Módulo 6 - Development in the Cloud (Course 60)

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Módulo 6: Desarrollo de Aplicaciones en la Nube (Development in the Cloud)
* **Tipo de Evaluación:** Quiz oficial de módulo
* **Puntuación Mínima de Aprobación (Passing Score):** 66%
* **Puntos Acumulados:** ⭐ 16,020 puntos
* **Fecha de Ingesta:** 2026-11-17

---

## 📝 Banco Oficial de Preguntas y Respuestas Sanitizadas

### Pregunta 1
**Why might a Google Cloud customer choose to use Cloud Run functions?**
* [ ] Their application has a legacy monolithic structure that they want to separate into microservices.
* [ ] Cloud Run functions is a free service for hosting compute operations.
* [x] **Their application contains event-driven code that they don't want to provision compute resources for.**
* [ ] Cloud Run functions is the primary way to run C++ applications in Google Cloud.

> **Justificación Oficial & Examen ACE:**
> Cloud Run functions (antes Cloud Functions) está diseñado para cargas ligeras guiadas por eventos (*event-driven*). Permite ejecutar código en respuesta a cambios en buckets de Cloud Storage o mensajes en Pub/Sub sin tener que aprovisionar ni mantener instancias o servidores de cómputo dedicados de forma permanente.

---

### Pregunta 2
**Which of these statements about Cloud Run functions are correct? Select three. 'Cloud Run functions:'**
* [x] **Is integrated with Cloud Logging.**
* [ ] Require servers or VMs to be provisioned.
* [ ] Can only be invoked by sending HTTP requests.
* [x] **Is a scalable functions-as-a-service platform.**
* [x] **Can be used to extend Cloud services.**

> **Justificación Oficial & Examen ACE:**
> 1. **Integración nativa con Cloud Logging:** Los registros de ejecución (*stdout* y *stderr*) se canalizan de forma automática a Cloud Logging sin agentes adicionales.
> 2. **Plataforma FaaS escalable:** Escala de manera automática desde cero a miles de invocaciones concurrentes bajo demanda.
> 3. **Extensión de servicios Cloud:** Conecta y complementa servicios de Google Cloud como Cloud Storage, Firestore o Pub/Sub mediante lógica de negocio reactiva (*cloud glue code*).
> *Distractores:* Es serverless (no requiere aprovisionar VMs) y no solo admite HTTP, sino también disparadores asíncronos de eventos.

---

### Pregunta 3
**Which scenario is best suited for using Cloud Run instead of Cloud Run functions?**
* [ ] Generating thumbnails for images uploaded to a Cloud Storage bucket.
* [ ] Sending an email notification whenever a new document is added to a specific folder in Cloud Storage.
* [x] **Hosting a dynamic web application that allows users to upload and share photos.**
* [ ] Resizing images on demand when requested by a user through a web interface.

> **Justificación Oficial & Examen ACE:**
> Una aplicación web dinámica completa que gestiona autenticación, renderizado de páginas HTML/UI, enrutamiento complejo y permite a los usuarios interactuar, subir y compartir fotografías es un servicio web completo basado en contenedores, escenario natural para **Cloud Run**. Las otras tareas (generación de miniaturas al subir a un bucket o envío de correos tras crear un documento) son funciones aisladas de propósito único disparadas por eventos, idóneas para **Cloud Run functions**.

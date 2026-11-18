# Ingesta Cruda: Lección 32 - Cloud Run

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Módulo 6: Desarrollo de Aplicaciones en la Nube (Developing Applications in the Cloud)
* **ID de Lección (Skills Google):** `689583`
* **URL Skills Google:** [Skills Google - Cloud Run](https://www.skills.google/paths/8/course_templates/60/video/689583)
* **URL YouTube:** [YouTube - Cloud Run (Video ID: R3Ec_4tC3oc)](https://www.youtube.com/watch?v=R3Ec_4tC3oc)
* **Puntaje Actual:** ⭐ 15,990 puntos (Racha: 2)
* **Fecha de Ingesta:** 2026-11-17
* **Tipo de Contenido:** Video formativo con transcripción oficial

---

## 📝 Transcripción Oficial Completa

```text
00:00 So far in this course, we’ve provided an introduction to Google Cloud and explored the options and benefits related to using virtual machines, networks, storage, and containers in the Cloud.
00:12 In the final section of the course, we’ll turn our attention to developing applications in the Cloud.
00:17 We’ll begin with Cloud Run, which is a managed compute platform that runs stateless containers via web requests or Pub/Sub events.
00:27 Cloud Run is serverless.
00:29 That means it removes all infrastructure management tasks so you can focus on developing applications.
00:34 It’s built on Knative, an open API and runtime environment built on Kubernetes.
00:42 It can be fully managed on Google Cloud, on Google Kubernetes Engine, or anywhere Knative runs.
00:49 Cloud Run is fast.
00:50 It can automatically scale up and down from zero almost instantaneously, and it charges only for the resources used, calculated down to the nearest 100 milliseconds, so you’ll never pay for over-provisioned resources.
01:05 The Cloud Run developer workflow is a straightforward three-step process.
01:10 First, you write your application using your favorite programming language. This application should start a server that listens for web requests.
01:19 Second, you build and package your application into a container image.
01:25 And third, the container image is pushed to Artifact Registry, where Cloud Run will deploy it.
01:32 Once you’ve deployed your container image, you’ll get a unique HTTPS URL back.
01:38 Cloud Run then starts your container on demand to handle requests, and ensures that all incoming requests are handled by dynamically adding and removing containers.
01:48 Because Cloud Run is serverless, it means that you, as a developer, can focus on building your application and not on building and maintaining the infrastructure that powers it.
01:58 For some use cases, a container-based workflow is great, because it gives you a great amount of transparency and flexibility.
02:04 Sometimes, you’re just looking for a way to turn source code into an HTTPS endpoint, and you want your vendor to make sure your container image is secure, well-configured and built in a consistent way.
02:17 With Cloud Run, you can do both.
02:19 You can use a container-based workflow, as well as a source-based workflow.
02:24 The source-based approach will deploy source code instead of a container image.
02:28 Cloud Run then builds the source and packages the application into a container image.
02:34 Cloud Run does this using Buildpacks - an open source project.
02:39 Cloud Run handles HTTPS serving for you.
02:42 That means you only have to worry about handling web requests, and you can let Cloud Run take care of adding the encryption.
02:49 The pricing model on Cloud Run is unique; as you only pay for the system resources you use while a container is handling web requests, with a granularity of 100ms, and when it’s starting or shutting down.
03:02 You don’t pay for anything if your container doesn’t handle requests.
03:05 Additionally, there is a small fee for every one million requests you serve.
03:10 The price of container time increases with CPU and memory.
03:14 A container with more vCPU and memory is more expensive.
03:19 You can use Cloud Run to run any binary, as long as it’s compiled for Linux sixty-four bit.
03:24 Now, this means you can use Cloud Run to run web applications written using popular languages, such as: Java, Python, Node.js, PHP, Go, and C++.
03:39 You can also run code written in less popular languages, such as: Cobol, Haskell, and Perl.
03:47 As long as your app handles web requests, you’re good to go.
```

---

## 🔬 Síntesis Técnica y Desglose Arquitectónico

### 1. ¿Qué es Cloud Run?
* **Definición Formal:** Plataforma de cómputo administrada y completamente *serverless* que ejecuta contenedores sin estado (*stateless*) activados por solicitudes HTTP/HTTPS o eventos de Google Cloud Pub/Sub.
* **Basado en Estándares Abiertos (Knative):** Cloud Run está construido sobre **Knative**, una API y entorno de ejecución de código abierto desarrollado originalmente por Google sobre Kubernetes. Esto evita el bloqueo de proveedor (*vendor lock-in*), permitiendo ejecutar las mismas cargas en Cloud Run administrado, en clústeres de GKE o en cualquier infraestructura donde se ejecute Knative.
* **Abstracción Total de Servidores:** Elimina la necesidad de aprovisionar instancias VM, configurar clústeres, parchear sistemas operativos o gestionar balanceadores de carga.

### 2. Flujo de Trabajo del Desarrollador (Developer Workflow)
El despliegue en Cloud Run sigue un proceso directo de 3 etapas fundamentales:
1. **Escribir la Aplicación:** Desarrollar el código en cualquier lenguaje de programación. El único requisito es que la aplicación inicie un servidor web que escuche peticiones en el puerto asignado (especificado por la variable de entorno `PORT`, por defecto `8080`).
2. **Empaquetar en Contenedor (Containerize):**
   * **Enfoque basado en Contenedor (*Container-based*):** El desarrollador define su propio `Dockerfile` para empaquetar binarios y dependencias.
   * **Enfoque basado en Código Fuente (*Source-based*):** El desarrollador envía directamente el código fuente y Cloud Run utiliza el proyecto de código abierto **Buildpacks** para detectar el lenguaje, empaquetar el contenedor y securizar la imagen de forma automatizada.
3. **Despliegue y Endpoint HTTPS:** La imagen resultante se almacena en **Artifact Registry** y se despliega en Cloud Run. La plataforma entrega de vuelta una URL única asegurada con cifrado **HTTPS/TLS automático**, sin requerir aprovisionar certificados ni configurar zonas DNS.

### 3. Modelo Operativo y de Facturación (Pricing & Granularity)
* **Escalado Instantáneo a Cero (Scale-to-zero):** Cuando no hay tráfico entrante, Cloud Run reduce la cantidad de réplicas a 0 instancias.
* **Costo Cero en Inactividad:** Si el contenedor no procesa peticiones, el cargo por cómputo es exactamente \$0.
* **Granularidad de 100 Milisegundos:** Los recursos de vCPU y memoria se facturan redondeando al intervalo de 100 ms más cercano, exclusivamente mientras el contenedor atiende peticiones web o durante sus fases breves de inicio y terminación.
* **Tarifa por Millón de Peticiones:** Además de los recursos vCPU/RAM consumidos, se cobra una tarifa mínima por cada millón de solicitudes HTTP atendidas.
* **Flexibilidad de Hardware:** El coste por segundo varía según la asignación de vCPUs y memoria solicitada para el contenedor.

### 4. Soporte Políglota y Requisitos de Ejecución
* **Binarios Linux de 64 bits:** Cloud Run admite cualquier código, librería o ejecutable siempre que compile para arquitectura Linux x86_64.
* **Lenguajes Populares y Heredados:** Soporta oficialmente ecosistemas modernos (Node.js, Python, Java, Go, C++, PHP, Ruby, .NET) y lenguajes tradicionales o de nicho (COBOL, Perl, Haskell, Rust, Fortran).
* **Regla de Oro:** Siempre que la aplicación levante un servidor web y atienda peticiones HTTP, es compatible con Cloud Run.

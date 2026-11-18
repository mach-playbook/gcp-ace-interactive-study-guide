# Ingesta Cruda: Lección 33 - Development in the Cloud (Cloud Run Functions)

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Módulo 6: Desarrollo de Aplicaciones en la Nube (Developing Applications in the Cloud)
* **ID de Lección (Skills Google):** `689584`
* **URL Skills Google:** [Skills Google - Development in the cloud](https://www.skills.google/paths/8/course_templates/60/video/689584)
* **URL YouTube:** [YouTube - Development in the cloud (Video ID: zoq8Lajo7dE)](https://www.youtube.com/watch?v=zoq8Lajo7dE)
* **Puntaje Actual:** ⭐ 16,000 puntos (Racha: 2)
* **Fecha de Ingesta:** 2026-11-17
* **Tipo de Contenido:** Video formativo con transcripción oficial

---

## 📝 Transcripción Oficial Completa

```text
00:00 Many applications contain event-driven parts.
00:03 For example, an application that lets users upload images.
00:07 When that event takes place, the image might need to be processed in a few different ways, like converting the image to a standard format, converting a thumbnail into different sizes, and storing each new file in a repository.
00:22 This function could be integrated into the application, but then you’d have to provide compute resources for it–whether it happens once a millisecond or once a day.
00:31 With Cloud Run functions, you write a single-purpose function that completes the necessary image manipulations and then arrange for it to automatically run whenever a new image is uploaded.
00:43 Cloud Run functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions that respond to cloud events, without the need to manage a server or a runtime environment.
00:57 These functions can be used to construct application workflows from individual business logic tasks.
01:03 Cloud Run functions can also connect and extend cloud services.
01:08 You’re billed to the nearest 100 milliseconds, but only while your code is running.
01:14 Cloud Run functions supports writing source code in a number of programming languages.
01:19 These include Node.js, Python, Go, Java, .NET Core, Ruby, and PHP.
01:29 For more information about the supported specific version, refer to the runtimes documentation.
01:36 Events from Cloud Storage and Pub/Sub can trigger Cloud Run functions asynchronously, or you can use HTTP invocation for synchronous execution.
```

---

## 🔬 Síntesis Técnica y Desglose Arquitectónico

### 1. ¿Qué es Cloud Run Functions?
* **Definición Formal:** Solución de cómputo ligera (*lightweight*), orientada a eventos y asíncrona (Function-as-a-Service o FaaS) que permite ejecutar funciones pequeñas y de propósito único (*single-purpose functions*) sin gestionar servidores físicos ni entornos de ejecución subyacentes.
* **Evolución de Nombre (Google Cloud Branding):** Anteriormente conocida como **Cloud Functions**, Google Cloud integró su infraestructura bajo el paraguas unificado de **Cloud Run functions**, manteniendo la experiencia FaaS pero beneficiándose de la velocidad, concurrencia y estándares de contenedores subyacentes.
* **Pegamento en la Nube (*Cloud Glue Code*):** Diseñada específicamente para conectar, orquestar y extender servicios gestionados de Google Cloud mediante lógica empresarial reactiva.

### 2. Arquitecturas Dirigidas por Eventos (Event-Driven Workflows)
* **Caso de Uso Paradigmático:** Procesamiento de archivos multimedia.
  * *Escenario Tradicional:* Un usuario sube una imagen y la aplicación monolítica debe redimensionarla, generar miniaturas y persistir los archivos. Esto obliga a sobredimensionar la infraestructura de la aplicación principal para soportar picos ocasionales de procesamiento.
  * *Escenario Event-Driven con Funciones:* La subida del archivo emite un evento en **Cloud Storage**, el cual dispara automáticamente una función de propósito único. La función escala de inmediato, procesa las variantes y se apaga.
* **Desacoplamiento Operativo:** No se desperdician recursos fijos de servidor; la infraestructura existe y consume coste únicamente durante el ciclo de vida del evento (ya ocurra una vez al día o miles de veces por segundo).

### 3. Modos de Invocación y Disparadores (Triggers)
Cloud Run functions admite dos modalidades fundamentales de activación:
1. **Disparadores Asíncronos Basados en Eventos (Event Triggers):**
   * **Cloud Storage:** Activación inmediata ante la creación, modificación, eliminación o archivado de objetos en buckets (ej. generación de thumbnails, extracción de metadatos OCR, ingesta ETL).
   * **Pub/Sub:** Activación ante la publicación de mensajes en temas (*topics*) para ingesta masiva de telemetría IoT, procesamiento distribuido de eventos y colas de tareas desacopladas.
2. **Invocación Síncrona vía HTTP (HTTP Triggers):**
   * Respuestas inmediatas a solicitudes web entrantes mediante métodos HTTP estándar (GET, POST, PUT, DELETE). Idóneo para webhooks de terceros (Stripe, GitHub), APIs REST ligeras y micro-servicios de autenticación.

### 4. Runtimes y Lenguajes Soportados
Permite escribir código fuente directamente en los lenguajes más extendidos del ecosistema de desarrollo:
* **Node.js**
* **Python**
* **Go**
* **Java**
* **.NET Core (C#)**
* **Ruby**
* **PHP**

### 5. Modelo de Facturación y Métricas Financieras
* **Facturación al Milisegundo:** El cómputo se tasa redondeando al intervalo de **100 milisegundos** más próximo.
* **Cobro Exclusivamente en Ejecución:** A diferencia de máquinas virtuales o clústeres siempre activos, solo se factura mientras el código de la función se encuentra en ejecución activa. En estado inactivo o reposo, el coste es cero.

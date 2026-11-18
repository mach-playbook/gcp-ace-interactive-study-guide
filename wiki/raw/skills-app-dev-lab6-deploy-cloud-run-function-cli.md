# 📝 Insumo en Bruto: Deploy a Cloud Run Function via the Command Line (Lab GSP080 / 592546)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 6 (ID: `GSP080`, Skills ID: `592546`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592546
* **Puntos Acumulados**: 16,466 estrellas
* **Duración / Créditos**: 15 minutos / 1 Crédito
* **Nivel**: Introductory
* **Última Actualización / Test**: 28 de octubre de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Escribir y estructurar una función asíncrona orientada a eventos (*event-driven*) basada en CloudEvents y Node.js con `@google-cloud/functions-framework`.
2. Decodificar cargas útiles en Base64 transmitidas por Google Cloud Pub/Sub.
3. Desplegar una función de 2ª generación mediante `gcloud functions deploy` vinculada a un topic de Pub/Sub (`--trigger-topic=cf-demo`) con una cuenta de servicio dedicada.
4. Inspeccionar el estado de despliegue mediante `gcloud functions describe` y verificar la compilación en Artifact Registry y Cloud Build.
5. Probar el flujo reactivo publicando mensajes con `gcloud pubsub topics publish` y auditar la salida en los registros mediante `gcloud functions logs read`.

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Create a Function Codebase
* Configurar la región predeterminada:
  ```bash
  gcloud config set run/region REGION
  ```
* Crear el directorio del proyecto:
  ```bash
  mkdir gcf_hello_world && cd gcf_hello_world
  ```
* Archivo de código fuente `index.js`:
  ```javascript
  const functions = require('@google-cloud/functions-framework');

  // Registrar callback CloudEvent con Functions Framework
  // Se ejecuta cada vez que el topic de Pub/Sub recibe un mensaje
  functions.cloudEvent('helloPubSub', cloudEvent => {
    // La carga útil del mensaje Pub/Sub viaja codificada en base64
    const base64name = cloudEvent.data.message.data;
    const name = base64name ? Buffer.from(base64name, 'base64').toString() : 'World';
    console.log(`Hello, ${name}!`);
  });
  ```
* Archivo de manifiesto `package.json`:
  ```json
  {
    "name": "gcf_hello_world",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "start": "node index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "dependencies": {
      "@google-cloud/functions-framework": "^3.0.0"
    }
  }
  ```
* Instalación de dependencias locales:
  ```bash
  npm install
  ```

---

### Task 2. Deploy Your Function
* Despliegue en 2ª generación con disparador Pub/Sub:
  ```bash
  gcloud functions deploy nodejs-pubsub-function \
    --gen2 \
    --runtime=nodejs20 \
    --region=REGION \
    --source=. \
    --entry-point=helloPubSub \
    --trigger-topic=cf-demo \
    --stage-bucket=$PROJECT_ID-bucket \
    --service-account=cloudfunctionsa@$PROJECT_ID.iam.gserviceaccount.com \
    --allow-unauthenticated
  ```
* **Banderas Clave de `gcloud functions deploy`**:
  * `--gen2`: Fuerza el uso de Cloud Run functions de 2ª generación sobre la infraestructura de Cloud Run.
  * `--trigger-topic`: Crea automáticamente una suscripción Eventarc/Pub/Sub hacia el topic `cf-demo`.
  * `--stage-bucket`: Bucket temporal de Cloud Storage utilizado por Cloud Build para empaquetar el código fuente.
  * `--service-account`: Cuenta de servicio administrada que asume la función para ejecutar y acceder a recursos.
* Verificación del estado de despliegue:
  ```bash
  gcloud functions describe nodejs-pubsub-function --region=REGION
  ```
  * El estado debe reflejar `State: ACTIVE`.

---

### Task 3. Test the Function via Pub/Sub
* Publicar un mensaje con carga útil en el topic `cf-demo`:
  ```bash
  gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
  ```
* Salida esperada:
  ```
  messageIds:
  - '11927162971409664'
  ```

---

### Task 4. View Logs
* Leer los registros de ejecución desde la línea de comandos:
  ```bash
  gcloud functions logs read nodejs-pubsub-function --region=REGION
  ```
* Salida esperada en los logs:
  ```
  LEVEL:   NAME: nodejs-pubsub-function EXECUTION_ID: h4v6akxf4sxt LOG: Hello, Cloud Function Gen2!
  ```

---

### Task 5. Test Your Understanding
* **Pregunta**: *Serverless lets you write and deploy code without the hassle of managing the underlying infrastructure.*
* **Respuesta**: **True** (El paradigma serverless abstrae el aprovisionamiento, parcheo y escalado de máquinas virtuales).

---

## 📌 Relevancia y Trampas de Examen Google Cloud ACE
1. **Decodificación Base64 Obligatoria en Pub/Sub**:
   * En Cloud Pub/Sub, los mensajes transmiten la carga útil (*payload*) en el campo `data` como una cadena de texto codificada en **Base64**. Si una función lee directamente `event.data.message.data` sin decodificar (`Buffer.from(data, 'base64').toString()`), obtendrá una cadena binaria ilegible.
2. **Cuentas de Servicio en Funciones Serverless**:
   * Por defecto, las funciones de 1ª generación utilizaban la cuenta de servicio App Engine default (`PROJECT_ID@appspot.gserviceaccount.com`), la cual posee el rol altamente permisivo `Editor`.
   * En el examen ACE y en la 2ª generación, **es mandatorio asignar una cuenta de servicio dedicada** mediante la bandera `--service-account`, otorgándole únicamente los roles mínimos necesarios (*least privilege*).
3. **Mecanismo de Disparo de 2ª Generación**:
   * En 2ª generación, todos los eventos no HTTP (Pub/Sub, Storage, Firestore) se enrutan a través del servicio **Eventarc**. Al ejecutar `--trigger-topic`, gcloud aprovisiona internamente un canal Eventarc que transforma el mensaje Pub/Sub en una especificación estándar **CloudEvent**.

# 📝 Insumo en Bruto: Pub/Sub: Qwik Start - Command Line (Lab GSP095 / 592548)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 8 (ID: `GSP095`, Skills ID: `592548`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592548
* **Puntos Acumulados**: 16,466 estrellas
* **Duración / Créditos**: 10 minutos / No cost
* **Nivel**: Introductory
* **Última Actualización / Test**: 11 de noviembre de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Administrar el ciclo de vida de temas (*topics*) en Cloud Pub/Sub mediante la CLI `gcloud pubsub topics` (creación, listado y eliminación).
2. Crear, listar y depurar suscripciones asociadas a un tema mediante `gcloud pubsub subscriptions`.
3. Publicar mensajes individuales y múltiples hacia un tema con `gcloud pubsub topics publish`.
4. Ejecutar extracciones individuales de mensajes con confirmación automática (`--auto-ack`).
5. Extraer lotes (*batches*) de mensajes concurrentes utilizando la bandera `--limit`.

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Create and Manage Pub/Sub Topics
* **Creación de temas**:
  ```bash
  gcloud pubsub topics create myTopic
  gcloud pubsub topics create Test1
  gcloud pubsub topics create Test2
  ```
* **Listado de temas**:
  ```bash
  gcloud pubsub topics list
  ```
* **Eliminación de temas temporales**:
  ```bash
  gcloud pubsub topics delete Test1
  gcloud pubsub topics delete Test2
  ```
* Verificación: `gcloud pubsub topics list` solo muestra `myTopic`.

---

### Task 2. Create and Manage Pub/Sub Subscriptions
* **Creación de suscripciones vinculadas a `myTopic`**:
  ```bash
  gcloud pubsub subscriptions create --topic myTopic mySubscription
  gcloud pubsub subscriptions create --topic myTopic Test1
  gcloud pubsub subscriptions create --topic myTopic Test2
  ```
* **Listado de suscripciones de un tema específico**:
  ```bash
  gcloud pubsub topics list-subscriptions myTopic
  ```
* **Evaluación Formativa**:
  * *Pregunta*: To receive messages published to a topic, you must create a subscription to that topic.
  * *Respuesta*: **True** (Los mensajes enviados a un topic sin suscripciones activas se descartan de inmediato).
* **Eliminación de suscripciones**:
  ```bash
  gcloud pubsub subscriptions delete Test1
  gcloud pubsub subscriptions delete Test2
  ```

---

### Task 3. Publish and Pull a Single Message
* **Publicación de mensajes**:
  ```bash
  gcloud pubsub topics publish myTopic --message "Hello"
  gcloud pubsub topics publish myTopic --message "Publisher's name is Student"
  gcloud pubsub topics publish myTopic --message "Publisher likes to eat Pizza"
  gcloud pubsub topics publish myTopic --message "Publisher thinks Pub/Sub is awesome"
  ```
* **Extracción unitaria con auto-confirmación (`--auto-ack`)**:
  ```bash
  gcloud pubsub subscriptions pull mySubscription --auto-ack
  ```
  * Comportamiento predeterminado: Sin banderas adicionales, `pull` solo entrega **1 mensaje**.
  * Al incluir `--auto-ack`, el mensaje es confirmado y eliminado de la suscripción.
  * Al repetirlo 4 veces hasta vaciar la cola, el comando retorna: `Listed 0 items.`.

---

### Task 4. Pull All Messages from a Subscription in Batch
* Publicación de 3 nuevos mensajes:
  ```bash
  gcloud pubsub topics publish myTopic --message "Message A"
  gcloud pubsub topics publish myTopic --message "Message B"
  gcloud pubsub topics publish myTopic --message "Message C"
  ```
* **Extracción por lotes con la bandera `--limit`**:
  ```bash
  gcloud pubsub subscriptions pull mySubscription --limit=3
  ```
* Salida en formato tabular con los 3 mensajes recibidos en una única llamada de API.

---

## 📌 Relevancia y Trampas de Examen Google Cloud ACE
1. **Descarte de Mensajes sin Suscripción**:
   * *Trampa Clásica ACE*: "Se publicaron miles de eventos a un topic de Pub/Sub antes de que el equipo de desarrollo configurara las suscripciones de los consumidores. ¿Cómo recuperar los mensajes?".
   * *Respuesta*: **Los mensajes no se pueden recuperar**. Si un mensaje se publica en un topic que no tiene ninguna suscripción activa en ese instante, el mensaje se pierde irreversiblemente (a menos que el topic tenga configurada retención de topic dedicada).
2. **Bandera `--auto-ack` frente a ACK Explícito**:
   * En entornos productivos y en el SDK de Pub/Sub, el acuse de recibo solo debe enviarse **después** de que el consumidor ha procesado y guardado los datos exitosamente. El uso de `--auto-ack` confirma el mensaje en el instante de la lectura; si el proceso se cae a mitad del cómputo, el mensaje se pierde.
3. **Control de Flujo con `--limit`**:
   * La bandera `--limit` establece el tamaño máximo del lote que el trabajador está dispuesto a recibir por petición pull, evitando saturar la memoria del consumidor.

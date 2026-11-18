# 📝 Insumo en Bruto: Publish and Subscribe to Messages in Pub/Sub Using Python (Lab GSP094 / 592549)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 9 (ID: `GSP094`, Skills ID: `592549`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592549
* **Puntos Acumulados**: 16,466 estrellas
* **Duración / Créditos**: 10 minutos / 1 Crédito
* **Nivel**: Introductory
* **Última Actualización / Test**: 30 de octubre de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Configurar un entorno virtual aislado en Python (`venv`) e instalar la librería cliente oficial `google-cloud-pubsub`.
2. Clonar y analizar los ejemplos oficiales de Google Cloud para publicadores y suscriptores (`python-pubsub/samples/snippets`).
3. Administrar temas programáticamente con `publisher.py` (`PublisherClient.create_topic`, `list_topics`).
4. Aprovisionar suscripciones de extracción (*Pull*) programáticamente con `subscriber.py` (`SubscriberClient.create_subscription`).
5. Publicar mensajes en el topic con `gcloud pubsub topics publish` y consumirlos de forma asíncrona mediante streaming pull con funciones de callback (`subscriber.py receive`).

---

## 🛠️ Desglose de Tareas Operativas

### Task 1 & 2. Virtual Environment and Client Library Installation
* **Construcción y activación del entorno virtual**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```
* **Instalación de la librería SDK oficial**:
  ```bash
  pip install --upgrade google-cloud-pubsub
  ```
* **Repositorio de snippets oficiales**:
  ```bash
  git clone https://github.com/googleapis/python-pubsub.git
  cd python-pubsub/samples/snippets
  ```

---

### Task 3 & 4. Create and List Topics with Python SDK
* Comprobar variable de entorno del proyecto:
  ```bash
  echo $GOOGLE_CLOUD_PROJECT
  ```
* **Crear tema `MyTopic` con el script de Python**:
  ```bash
  python publisher.py $GOOGLE_CLOUD_PROJECT create MyTopic
  ```
  * Salida confirmada:
    `Topic created: name: "projects/<PROJECT_ID>/topics/MyTopic"`
* **Listar temas del proyecto**:
  ```bash
  python publisher.py $GOOGLE_CLOUD_PROJECT list
  ```
* **Mapeo al SDK (`pubsub_v1.PublisherClient`)**:
  ```python
  from google.cloud import pubsub_v1

  publisher = pubsub_v1.PublisherClient()
  topic_path = publisher.topic_path(project_id, topic_id)
  topic = publisher.create_topic(request={"name": topic_path})
  ```

---

### Task 5. Create and List Subscriptions with Python SDK
* **Crear suscripción `MySub` vinculada a `MyTopic`**:
  ```bash
  python subscriber.py $GOOGLE_CLOUD_PROJECT create MyTopic MySub
  ```
* **Listar suscripciones en el proyecto**:
  ```bash
  python subscriber.py $GOOGLE_CLOUD_PROJECT list-in-project
  ```
  * Salida confirmada:
    `projects/<PROJECT_ID>/subscriptions/MySub`
* **Mapeo al SDK (`pubsub_v1.SubscriberClient`)**:
  ```python
  from google.cloud import pubsub_v1

  subscriber = pubsub_v1.SubscriberClient()
  topic_path = subscriber.topic_path(project_id, topic_id)
  subscription_path = subscriber.subscription_path(project_id, subscription_id)
  subscription = subscriber.create_subscription(
      request={"name": subscription_path, "topic": topic_path}
  )
  ```

---

### Task 6. Publish Messages via gcloud CLI
* Publicar mensajes de prueba en `MyTopic`:
  ```bash
  gcloud pubsub topics publish MyTopic --message "Hello"
  gcloud pubsub topics publish MyTopic --message "Publisher's name is Student"
  gcloud pubsub topics publish MyTopic --message "Publisher likes to eat Pizza"
  gcloud pubsub topics publish MyTopic --message "Publisher thinks Pub/Sub is awesome"
  ```

---

### Task 7. Receive Messages via Asynchronous Streaming Pull
* **Consumir mensajes con `subscriber.py`**:
  ```bash
  python subscriber.py $GOOGLE_CLOUD_PROJECT receive MySub
  ```
* Salida esperada en consola (recepción no determinista concurrente):
  ```
  Listening for messages on projects/<PROJECT_ID>/subscriptions/MySub
  Received message: Message { data: 'Publisher thinks Pub/Sub is awesome' attributes: {} }
  Received message: Message { data: 'Hello' attributes: {} }
  Received message: Message { data: "Publisher's name is Student" attributes: {} }
  Received message: Message { data: 'Publisher likes to eat Pizza' attributes: {} }
  ```
* Finalizar con `Ctrl+C`.
* **Mapeo al SDK (Streaming Pull asíncrono con Callbacks)**:
  ```python
  def callback(message: pubsub_v1.subscriber.message.Message) -> None:
      print(f"Received message: {message.data.decode('utf-8')}")
      message.ack()  # Confirmación explícita obligatoria

  streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
  with subscriber:
      try:
          streaming_pull_future.result(timeout=timeout)
      except TimeoutError:
          streaming_pull_future.cancel()
          streaming_pull_future.result()
  ```

---

### Task 8. Test Your Understanding
1. **Pregunta**: *Google Cloud Pub/Sub service allows applications to exchange messages reliably, quickly, and asynchronously.*
   * **Respuesta**: **True** (Servicio escalable y tolerante a fallos para comunicación asíncrona desacoplada).
2. **Pregunta**: *A _____ is a shared string that allows applications to connect with one another.*
   * **Respuesta**: **topic** (Canal nombrado compartido donde los publicadores emiten mensajes).

---

## 📌 Relevancia y Trampas de Examen Google Cloud ACE
1. **Confirmación Obligatoria `message.ack()` en Python SDK**:
   * En el SDK de Python, recibir un mensaje a través de una función callback **no lo confirma automáticamente**. El desarrollador debe invocar explícitamente `message.ack()`.
   * Si la función lanza una excepción o termina sin ejecutar `ack()`, Pub/Sub considerará vencido el `ack_deadline` y reenviará el mensaje (*at-least-once delivery*).
2. **Codificación de Cargas Útiles (`bytes`)**:
   * Al publicar con `publisher.publish(topic_path, data)`, el argumento `data` **debe ser un objeto tipo `bytes`** (ej. `data = "Hola".encode("utf-8")`). Si se pasa un string plano, el SDK arrojará un `TypeError`.
3. **Streaming Pull frente a Synchronous Pull**:
   * `SubscriberClient.subscribe()` abre un flujo gRPC bidireccional de alto rendimiento (*Streaming Pull*) gestionado en segundo plano por hilos de ejecución.
   * `SubscriberClient.pull()` es síncrono y se utiliza principalmente en procesamiento por lotes (*batch*).

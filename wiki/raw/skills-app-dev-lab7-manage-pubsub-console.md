# 📝 Insumo en Bruto: Manage Pub/Sub in the Google Cloud Console (Lab GSP096 / 592547)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 7 (ID: `GSP096`, Skills ID: `592547`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592547
* **Puntos Acumulados**: 16,466 estrellas
* **Duración / Créditos**: 10 minutos / No cost
* **Nivel**: Introductory
* **Última Actualización / Test**: 23 de marzo de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Crear un tema (*topic*) en Google Cloud Pub/Sub mediante la consola gráfica (`MyTopic`).
2. Configurar una suscripción de extracción (*Pull subscription*) vinculada al tema (`MySub`).
3. Publicar mensajes de texto de prueba desde la interfaz web de la consola.
4. Consumir y confirmar la recepción del mensaje utilizando Cloud Shell con `gcloud pubsub subscriptions pull --auto-ack`.
5. Comprender los fundamentos del patrón arquitectónico Publicador-Suscriptor para el desacoplamiento de microservicios y pipelines asíncronos.

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Setting up Pub/Sub (Create a Topic)
* **Navegación**: `Navigation menu` → `Analytics` → `Pub/Sub` → `Topics`.
* **Configuración del Topic**:
  * Clic en `Create topic`.
  * **Topic ID**: `MyTopic` (crea el recurso canónico `projects/<PROJECT_ID>/topics/MyTopic`).
  * Conservar opciones predeterminadas (cifrado administrado por Google, retención estándar).
  * Clic en `Create`.

---

### Task 2. Add a Subscription
* **Navegación**: En la página de detalles de `MyTopic` o desde la lista de temas, clic en el menú contextual (tres puntos) → `Create subscription`.
* **Configuración de la Suscripción**:
  * **Subscription ID**: `MySub`.
  * **Topic name**: `projects/<PROJECT_ID>/topics/MyTopic`.
  * **Delivery Type**: `Pull` (el consumidor solicita activamente los mensajes; a diferencia de `Push`, que despacha solicitudes HTTPS POST a un endpoint webhook).
  * Parámetros predeterminados: Plazo de acuse de recibo (*Acknowledgment deadline*) de 10 segundos, retención de mensajes no confirmados de 7 días.
  * Clic en `Create`.

---

### Task 3. Test Your Understanding
1. **Pregunta**: *A publisher application creates and sends messages to a ____. Subscriber applications create a ____ to a topic to receive messages from it.*
   * **Respuesta**: **topic, subscription** (Los publicadores envían a un topic; los suscriptores reciben a través de una suscripción vinculada).
2. **Pregunta**: *Cloud Pub/Sub is an asynchronous messaging service designed to be highly reliable and scalable.*
   * **Respuesta**: **True** (Servicio global administrado con redundancia multi-zonal y alta disponibilidad).

---

### Task 4. Publish a Message to the Topic
* Navegar a `Pub/Sub` → `Topics` → Seleccionar `MyTopic`.
* Pestaña `Messages` → Clic en `Publish Message`.
* En el campo **Message**, ingresar: `Hello World`.
* Clic en `Publish`.

---

### Task 5. View and Consume the Message
* En Cloud Shell, ejecutar el comando de extracción con confirmación automática (*auto-ack*):
  ```bash
  gcloud pubsub subscriptions pull --auto-ack MySub
  ```
* Salida esperada en consola:
  ```
  ┌─────────────┬───────────────────┬─────────────┬───────────┬────────────┐
  │    DATA     │     MESSAGE_ID    │ ORDERING_KEY│ ATTRIBUTES│DELIVERY_ATT│
  ├─────────────┼───────────────────┼─────────────┼───────────┼────────────┤
  │ Hello World │ 11927384918237461 │             │           │ 1          │
  └─────────────┴───────────────────┴─────────────┴───────────┴────────────┘
  ```
* **Efecto de `--auto-ack`**: Confirma de inmediato la entrega ante Pub/Sub, eliminando el mensaje de la cola de suscripción para evitar retransmisiones.

---

## 📌 Relevancia y Trampas de Examen Google Cloud ACE
1. **Pull vs Push Subscriptions**:
   * **Pull**: Ideal para clientes que procesan lotes a su propio ritmo, trabajadores en segundo plano (Compute Engine, GKE, Kubernetes workers) o cuando los suscriptores están detrás de un cortafuegos o NAT sin IP pública.
   * **Push**: Ideal para arquitecturas serverless dirigidas por webhooks (Cloud Run, Cloud Run Functions, App Engine) que requieren invocar URLs HTTPS públicas seguras con autenticación OIDC.
2. **Semántica de Entrega y ack_deadline**:
   * Pub/Sub garantiza entrega **al menos una vez** (*at-least-once delivery*).
   * Si un suscriptor no envía la confirmación (*ACK*) dentro del plazo configurado (`ack_deadline`, ajustable de 10 a 600 segundos), el mensaje vuelve a la cola y será entregado a otro suscriptor disponible. Las aplicaciones consumidoras deben ser **idempotentes**.
3. **Persistencia y Retención**:
   * Los topics almacenan mensajes en almacenamiento no volátil en múltiples zonas de la región. La retención de mensajes sin confirmar es de hasta 7 días (configurable).

# 📘 Curso: Set Up an App Dev Environment on Google Cloud (Course ID: 637)

Este documento sintetiza la arquitectura técnica, comandos de la CLI `gcloud`, directrices de configuración de identidades y prácticas de laboratorio requeridas para obtener el **Skill Badge: Set Up an App Dev Environment on Google Cloud**, alineado directamente con las competencias prácticas del examen **Google Cloud Associate Cloud Engineer (ACE v4.0)**.

---

## 🧭 1. Resumen Curricular y Pilares Técnicos

El curso oficial **Set Up an App Dev Environment on Google Cloud** (Course Template ID: `637`) proporciona una inmersión práctica en la creación, configuración y enlace de infraestructura cloud centrada en almacenamiento y desarrollo de aplicaciones. A través de 9 laboratorios guiados y 1 laboratorio de evaluación (*Challenge Lab*), capacita al ingeniero cloud en el uso fluido tanto de la **Google Cloud Console** como de la herramienta de línea de comandos **Google Cloud CLI (`gcloud`)**.

### 🎯 4 Pilares Tecnológicos Troncales

1. **Almacenamiento de Objetos (Cloud Storage):** Creación y administración de buckets, jerarquía de carpetas lógicas, subida y descarga de objetos, permisos Uniform vs Fine-grained, y sincronización mediante la CLI moderna `gcloud storage`.
2. **Control de Acceso y Seguridad (Cloud IAM):** Gestión centralizada de identidades (*principals*), asignación de roles básicos vs predefinidos, principio de menor privilegio e inspección de políticas de acceso.
3. **Cómputo Ligero sin Servidor (Cloud Run Functions):** Despliegue de funciones basadas en eventos y solicitudes HTTP mediante la consola y el comando `gcloud functions deploy`, gestión de variables de entorno y runtimes de ejecución.
4. **Mensajería Asíncrona Distribuida (Cloud Pub/Sub):** Desacoplamiento de sistemas mediante arquitectura publicador-suscriptor, creación de temas (*topics*), suscripciones de extracción (*pull subscriptions*), ingestión mediante CLI y scripts en Python utilizando la librería oficial `google-cloud-pubsub`.

---

## 🏗️ 2. Arquitectura de Infraestructura Centrada en Almacenamiento

El patrón arquitectónico central de este curso conecta la persistencia de datos no estructurados con la lógica de negocio y la mensajería asíncrona:

```
[ Cliente / App ]
       │ (1. Carga de Objeto / HTTP)
       ▼
┌───────────────────────────────┐
│     Cloud Storage Bucket      │
│  gs://app-dev-bucket-12345/   │
└──────────────┬────────────────┘
               │ (2. Evento de Objeto Creado: object.finalize)
               ▼
┌───────────────────────────────┐
│       Cloud Pub/Sub Topic     │
│       projects/.../topics/    │
└──────────────┬────────────────┘
               │ (3. Mensaje Asíncrono / Pull o Push)
               ▼
┌───────────────────────────────┐
│     Cloud Run Functions       │
│  (Procesamiento de Negocio)   │
└──────────────┬────────────────┘
               │ (4. Métricas y Logs del Agente)
               ▼
┌───────────────────────────────┐
│       Cloud Monitoring        │
│   (Alertas, Dashboards, Ops)  │
└───────────────────────────────┘
```

---

## 🛠️ 3. Catálogo de los 10 Laboratorios Oficiales Paso a Paso

### Lab 1: Manage Cloud Storage with the Google Cloud Console (Lab ID: GSP073 / 592541)
* **Objetivo Oficial:** Realizar tareas fundamentales de aprovisionamiento, organización y compartición pública de objetos en Cloud Storage utilizando la consola gráfica de Google Cloud.
* **Metadatos:** Nivel Introductorio | Duración: 10 minutos | Créditos: 1 | ID Oficial: `GSP073`.
* **Tareas Operativas Detalladas:**
  1. **Creación del Bucket**:
     * Ruta: `Cloud Storage` → `Buckets` → `+ Create`.
     * Nombre: `$PROJECT_ID` (cumple con la restricción de unicidad global en todo Google Cloud).
     * Reglas de nomenclatura para el examen: 3 a 63 caracteres (letras minúsculas, números, guiones y puntos con verificación previa de dominio), sin prefijo `goog`, sin la palabra `google`, y no puede ser una dirección IP.
     * Ubicación: *Region* (ej. `us-central1`).
     * Clase predeterminada: *Standard* (acceso frecuente, latencia en milisegundos).
     * Control de acceso: *Uniform* (UBLA habilitado) y desmarcar *Enforce public access prevention on this bucket* para permitir permisos públicos.
  2. **Carga de Objetos (`kitten.png`)**:
     * Subida desde la máquina local mediante `Upload` → `Upload files`.
     * Unicidad de objetos: Los nombres de objeto solo requieren ser únicos dentro de su propio bucket (`gs://BUCKET_NAME/OBJECT_NAME`).
  3. **Compartición Pública y Políticas de Acceso**:
     * Pestaña `Permissions` → `Grant access`.
     * Asignación del principal especial `allUsers` (acceso anónimo global por internet).
     * Rol predefinido asignado: `Storage Object Viewer` (`roles/storage.objectViewer`).
     * Verificación de la columna *Public access* (*Access granted to public principals*) y acceso mediante URL pública estructurada: `https://storage.googleapis.com/YOUR_BUCKET_NAME/kitten.png`.
  4. **Creación de Carpetas y Subcarpetas (`folder1/folder2/`)**:
     * Creación de estructura jerárquica mediante la interfaz web.
     * Naturaleza técnica: Cloud Storage es un almacenamiento plano de objetos (clave-valor); las "carpetas" son solo prefijos en la clave del objeto separados por el delimitador `/`.
  5. **Eliminación Segura**:
     * Eliminación de carpeta y objetos contenidos requiriendo confirmación mediante la palabra clave `DELETE`.
* **Preguntas Formativas del Laboratorio (Knowledge Check):**
  * *¿Cada bucket debe tener un nombre único en todo el espacio de nombres de Cloud Storage?* → **Verdadero** (El namespace de buckets es universal en toda la infraestructura de Google Cloud).
  * *¿Los nombres de los objetos deben ser únicos únicamente dentro de un bucket determinado?* → **Verdadero** (La clave completa incluye el nombre del bucket como prefijo raíz).
* **Concepto Clave ACE:** Para publicar contenido estático o permitir descargas directas en internet, se debe otorgar `roles/storage.objectViewer` a `allUsers`. Si la organización o el bucket tienen activa la política *Public Access Prevention (PAP)*, cualquier intento de hacer público el bucket será bloqueado aunque se asigne el rol.

---

### Lab 2: Manage Cloud Storage with the Google Cloud CLI (Lab ID: GSP074 / 592542)
* **Objetivo Oficial:** Gestionar buckets y objetos de Cloud Storage utilizando el conjunto de comandos modernos `gcloud storage` en Cloud Shell: creación, carga, descarga, carpetas virtuales, metadatos y asignación de ACLs públicas.
* **Metadatos:** Nivel Introductorio | Duración: 15 minutos | Créditos: 1 | ID Oficial: `GSP074`.
* **Tareas Operativas Detalladas:**
  1. **Configuración Inicial y Creación del Bucket**:
     ```bash
     gcloud config set compute/region "<REGION>"
     gcloud storage buckets create gs://<YOUR-BUCKET-NAME>
     ```
     * El nombre debe respetar las reglas de unicidad universal de 3 a 63 caracteres. Si ya existe, Google Cloud arroja el error `409 Bucket already exists`.
  2. **Carga de Objetos (`ada.jpg`)**:
     * Descarga de imagen pública y transferencia al bucket:
     ```bash
     curl https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg --output ada.jpg
     gcloud storage cp ada.jpg gs://<YOUR-BUCKET-NAME>
     rm ada.jpg
     ```
  3. **Descarga de Objetos en Cloud Shell**:
     ```bash
     gcloud storage cp -r gs://<YOUR-BUCKET-NAME>/ada.jpg .
     ```
  4. **Copia hacia Carpetas Virtuales en el Bucket**:
     ```bash
     gcloud storage cp gs://<YOUR-BUCKET-NAME>/ada.jpg gs://<YOUR-BUCKET-NAME>/image-folder/
     ```
  5. **Listado de Recursos del Bucket**:
     ```bash
     gcloud storage ls gs://<YOUR-BUCKET-NAME>
     ```
  6. **Inspección de Metadatos Detallados**:
     ```bash
     gcloud storage ls -l gs://<YOUR-BUCKET-NAME>/ada.jpg
     ```
     * Muestra tamaño exacto en bytes, fecha de creación ISO 8601 y URI canónico.
  7. **Habilitación de Lectura Pública mediante ACLs**:
     ```bash
     gcloud storage objects update gs://<YOUR-BUCKET-NAME>/ada.jpg --add-acl-grant=entity=allUsers,role=READER
     ```
     * URL pública directa: `https://storage.googleapis.com/<YOUR-BUCKET-NAME>/ada.jpg`.
  8. **Revocación de Acceso Público y Eliminación de Objetos**:
     ```bash
     # Revocar permiso público a allUsers
     gcloud storage objects update gs://<YOUR-BUCKET-NAME>/ada.jpg --remove-acl-grant=allUsers

     # Eliminar objeto del bucket
     gcloud storage rm gs://<YOUR-BUCKET-NAME>/ada.jpg
     ```
* **Preguntas Formativas del Laboratorio (Knowledge Check):**
  * *¿Cada bucket tiene una clase de almacenamiento predeterminada que puedes especificar al crearlo?* → **Verdadero** (Bandera `--default-storage-class`).
  * *¿Una lista de control de acceso (ACL) es un mecanismo para definir quién tiene acceso a tus buckets y objetos?* → **Verdadero** (Permite granularidad fina por objeto cuando UBLA está inactivo).
  * *¿Cómo puedes dejar de compartir públicamente un objeto?* → **Eliminando la entrada de permiso correspondiente a allUsers** (`--remove-acl-grant=allUsers`).
* **Concepto Clave ACE:** `gcloud storage` es el estándar moderno en la certificación ACE v4.0 que reemplaza al binario `gsutil`. Asimismo, cuando un bucket utiliza control de acceso granular (*Fine-Grained*), es posible aplicar ACLs individuales con `--add-acl-grant`, mientras que con *Uniform Bucket-Level Access* (UBLA), las ACLs quedan deshabilitadas y se debe utilizar `gcloud storage buckets add-iam-policy-binding`.

---

### Lab 3: Manage Access Control with IAM (Lab ID: GSP064 / 592543)
* **Objetivo Oficial:** Experimentar el funcionamiento de Identity and Access Management (IAM) mediante dos identidades simultáneas, explorando los roles básicos a nivel de proyecto frente a roles predefinidos de servicio para aplicar el principio de menor privilegio (*least privilege*).
* **Metadatos:** Nivel Introductorio | Duración: 15 minutos | Créditos: 1 | ID Oficial: `GSP064`.
* **Tareas Operativas Detalladas:**
  1. **Exploración de la Consola IAM y los 4 Roles Básicos (Primitivos)**:
     * Sesión con dos usuarios en ventanas de incógnito paralelas: `Username 1` (Owner) y `Username 2` (Viewer).
     * En `IAM & Admin > IAM`, Username 1 posee el botón *Grant access* habilitado gracias al permiso `resourcemanager.projects.setIamPolicy`, mientras que en Username 2 dicho botón está deshabilitado.
     * Taxonomía de roles básicos:
       * `roles/browser`: Explorar la jerarquía de recursos (proyectos, carpetas, organizaciones) sin ver datos internos.
       * `roles/viewer`: Permisos de solo lectura sobre recursos existentes sin modificar su estado.
       * `roles/editor`: Todos los permisos de Viewer más acciones que modifican estado (creación, edición y borrado de recursos).
       * `roles/owner`: Todos los permisos de Editor más gestión de políticas IAM y administración de facturación (*Billing*).
  2. **Aprovisionamiento de Bucket y Prueba de Visibilidad de Proyecto**:
     * Username 1 crea un bucket (`Multi-region`) y sube el archivo `sample.txt`.
     * Username 2 entra a `Cloud Storage > Buckets` y constata que puede listar y ver el bucket debido a que su rol `roles/viewer` opera de forma aditiva sobre todos los servicios a nivel de proyecto.
  3. **Revocación de Acceso de Proyecto y Propagación**:
     * Username 1 edita la vinculación de Username 2 y elimina el rol `roles/viewer`.
     * **Tiempo de Propagación**: Los cambios en políticas IAM pueden demorar hasta **80 segundos** en propagarse en los servidores de Google Cloud a nivel mundial.
     * Username 2 refresca Cloud Storage tras 1-2 minutos y recibe un error de acceso denegado (*Permission error / 403 Forbidden*).
  4. **Concesión de Permiso Predefinido Específico (Menor Privilegio)**:
     * Username 1 otorga a Username 2 el rol predefinido `Cloud Storage > Storage Object Viewer` (`roles/storage.objectViewer`).
     * Username 2 abre Cloud Shell y ejecuta:
       ```bash
       gcloud storage ls gs://[YOUR_BUCKET_NAME]
       ```
     * Salida confirmada: `gs://[YOUR_BUCKET_NAME]/sample.txt`.
     * Validación arquitectónica: Username 2 no tiene acceso general al proyecto (no puede inspeccionar Compute Engine ni VPCs), pero cuenta con permisos específicos y suficientes para su labor con objetos en Cloud Storage.
* **Comandos gcloud Equivalentes para Automatización:**
  ```bash
  # Otorgar rol predefinido de visor de objetos
  gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
    --member="user:student-02@qwiklabs.net" \
    --role="roles/storage.objectViewer"

  # Revocar rol básico de visor
  gcloud projects remove-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
    --member="user:student-02@qwiklabs.net" \
    --role="roles/viewer"
  ```
* **Concepto Clave ACE:** Los roles básicos (Viewer, Editor, Owner) son incompatibles con arquitecturas corporativas seguras porque otorgan un radio de impacto masivo. En el examen ACE, la respuesta correcta siempre descarta los roles básicos en favor de roles predefinidos que limitan el acceso al servicio exacto y a las acciones requeridas (*least privilege*).

---

### Lab 4: Monitor a Compute Engine Instance with Cloud Monitoring (Lab ID: GSP089 / 592544)
* **Objetivo Oficial:** Monitorizar la salud y rendimiento de una máquina virtual de Compute Engine mediante Cloud Monitoring, instalando el Google Cloud Ops Agent, configurando comprobaciones de tiempo de actividad (Uptime Checks), políticas de alerta y paneles personalizados de métricas.
* **Metadatos:** Nivel Introductorio | Duración: 20 minutos | Créditos: 1 | ID Oficial: `GSP089`.
* **Tareas Operativas Detalladas:**
  1. **Aprovisionamiento de la Instancia de Cómputo**:
     * Crear VM `lamp-1-vm` tipo `e2-medium` en la región y zona asignadas.
     * Activar regla de cortafuegos *Allow HTTP traffic* (etiqueta de red `http-server`, puerto TCP 80).
  2. **Instalación de Pila LAMP y Google Cloud Ops Agent**:
     * Conexión por SSH a la VM e instalación del servidor web:
       ```bash
       sudo apt-get update && sudo apt-get install -y apache2 php
       sudo service apache2 restart
       ```
     * Verificar acceso HTTP público navegando a la IP externa de la VM.
     * Inicializar el espacio de métricas en `Cloud Console > Monitoring`.
     * Instalar el Google Cloud Ops Agent dentro del sistema operativo:
       ```bash
       curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
       sudo bash add-google-cloud-ops-agent-repo.sh --also-install
       sudo systemctl status google-cloud-ops-agent"*"
       ```
  3. **Configuración de Comprobación de Tiempo de Actividad (Uptime Check)**:
     * En `Monitoring > Uptime checks > + Create Uptime Check`:
       * Protocolo: HTTP | Tipo de recurso: URL | Hostname: IP externa de `lamp-1-vm`.
       * Frecuencia de verificación: 1 minuto | Título: `Lamp Uptime Check`.
     * Las sondas de Google verifican latencia y disponibilidad global de la aplicación web.
  4. **Creación de Política de Alertas (Alerting Policy)**:
     * En `Monitoring > Alerting > + Create Policy`:
       * Métrica: `VM instance > Interface > Network traffic` (`agent.googleapis.com/interface/traffic`).
       * Condición: *Above threshold*, valor umbral: `500`, ventana de retest: `1 min`.
       * Canal de notificación: Email configurado en *Manage Notification Channels*.
       * Nombre de alerta: `Inbound Traffic Alert`.
  5. **Diseño de Paneles de Visualización Personalizados (Dashboards)**:
     * Crear panel: `Cloud Monitoring LAMP Qwik Start Dashboard`.
     * Widget 1: Line chart con métrica `VM instance > Cpu > CPU load (1m)`.
     * Widget 2: Line chart con métrica `VM instance > Instance > Received packets`.
  6. **Auditoría de Ciclo de Vida en Cloud Logging**:
     * En `Logging > Logs Explorer`, filtrar por recurso `VM Instance > lamp-1-vm`.
     * Detener (`Stop`) y reanudar (`Start`) la máquina virtual para observar la telemetría en tiempo real y el registro de eventos del sistema.
  7. **Evaluación de Alertas e Incidentes**:
     * Verificar en `Uptime checks` la reactivación de sondas geográficas y revisar en `Alerting` los incidentes generados por la detención de la VM.
* **Concepto Clave ACE:** Sin el Ops Agent instalado, Cloud Monitoring únicamente tiene visibilidad externa provista por el hipervisor (CPU básica y paquetes de red). La recolección de memoria RAM libre/usada, espacio en disco del sistema de archivos y métricas internas de procesos requiere obligatoriamente el **Google Cloud Ops Agent**.

---

### Lab 5: Deploy a Cloud Run Function via the Google Cloud Console (Lab ID: GSP081 / 592545)
* **Objetivo Oficial:** Crear, configurar y desplegar una Cloud Run function de 2ª generación activada por solicitudes HTTPS utilizando la interfaz web de Google Cloud Console, implementando límites de escalado y analizando trazas de ejecución en Cloud Logging.
* **Metadatos:** Nivel Introductorio | Duración: 15 minutos | Créditos: 1 | ID Oficial: `GSP081`.
* **Tareas Operativas Detalladas:**
  1. **Configuración del Servicio Serverless**:
     * Ruta: `Serverless > Cloud Run > Services` → Clic en `WRITE A FUNCTION`.
     * Nombre del servicio: `gcfunction`.
     * Región: `<REGION>` (ej. `us-central1`).
     * Autenticación: *Allow public access* (permite llamadas no autenticadas asociando `allUsers` con el rol `roles/run.invoker`).
     * Entorno de ejecución: *Second generation* (2nd gen).
     * Escalado de revisiones (*Revision scaling*): Configurar *Maximum number of instances* en `5`.
     * Habilitación automática de APIs requeridas (Cloud Run Admin API, Cloud Build API, Artifact Registry API).
  2. **Despliegue del Código Fuente**:
     * Editor en línea (*Inline editor*) con código predeterminado Node.js implementando `helloHttp` con `@google-cloud/functions-framework`.
     * Clic en `SAVE and REDEPLOY`.
  3. **Pruebas de Invocación**:
     * En la pestaña `TEST`, enviar carga útil JSON:
       ```json
       {
         "message": "Hello World!"
       }
       ```
     * Invocación alternativa por CLI / curl:
       ```bash
       curl -X POST https://<REGION>-<PROJECT_ID>.cloudfunctions.net/gcfunction \
         -H "Content-Type: application/json" \
         -d '{"message":"Hello World!"}'
       ```
     * Respuesta esperada: `Hello World!`.
  4. **Supervisión de Trazas en Cloud Logging**:
     * En `Observability > Logs`, auditar registros de arranque en frío (*cold start*), tiempos de procesamiento y códigos de respuesta HTTP 200.
* **Preguntas Formativas del Laboratorio (Knowledge Check):**
  * *¿Cloud Run functions es un entorno de ejecución serverless para servicios orientados a eventos en Google Cloud?* → **Verdadero** (Ejecuta código en respuesta a eventos sin aprovisionar servidores).
  * *¿Qué tipo de disparador se utiliza en este laboratorio?* → **HTTPS** (Invocación directa síncrona vía URL pública).
* **Concepto Clave ACE:** Las Cloud Run functions de 2ª generación ejecutan sobre contenedores gestionados por Cloud Run. En preguntas de examen que buscan mitigar sobrecargas en sistemas backend (como agotar el pool de conexiones de una base de datos Cloud SQL), el parámetro arquitectónico que debe ajustarse es el número máximo de instancias concurrentes (`max-instances`).

---

### Lab 6: Deploy a Cloud Run Function via the Command Line (Lab ID: GSP080 / 592546)
* **Objetivo Oficial:** Desplegar una Cloud Run function de 2ª generación orientada a eventos (*event-driven*) mediante la línea de comandos de `gcloud`, configurando un disparador de Pub/Sub (`--trigger-topic`), decodificando cargas útiles en Base64 con CloudEvents y auditando registros en Cloud Logging.
* **Metadatos:** Nivel Introductorio | Duración: 15 minutos | Créditos: 1 | ID Oficial: `GSP080`.
* **Tareas Operativas Detalladas:**
  1. **Preparación del Entorno y Código Fuente (`gcf_hello_world`)**:
     * Establecer región de cómputo:
       ```bash
       gcloud config set run/region REGION
       mkdir gcf_hello_world && cd gcf_hello_world
       ```
     * Código `index.js` (manejador CloudEvent para mensajes de Pub/Sub):
       ```javascript
       const functions = require('@google-cloud/functions-framework');

       functions.cloudEvent('helloPubSub', cloudEvent => {
         const base64name = cloudEvent.data.message.data;
         const name = base64name ? Buffer.from(base64name, 'base64').toString() : 'World';
         console.log(`Hello, ${name}!`);
       });
       ```
     * Manifiesto `package.json` con dependencia de `@google-cloud/functions-framework` e instalación con `npm install`.
  2. **Despliegue de la Función con gcloud functions deploy**:
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
     * Banderas evaluadas: `--gen2` (arquitectura Cloud Run), `--trigger-topic` (suscripción Eventarc automática hacia el topic), `--service-account` (ejecución con menor privilegio).
  3. **Verificación de Estado**:
     ```bash
     gcloud functions describe nodejs-pubsub-function --region=REGION
     ```
     * Confirmar que el estado del servicio reporte `State: ACTIVE`.
  4. **Pruebas de Invocación Asíncrona vía Pub/Sub**:
     * Publicar un mensaje en el topic `cf-demo`:
       ```bash
       gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
       ```
  5. **Lectura de Logs por Línea de Comandos**:
     ```bash
     gcloud functions logs read nodejs-pubsub-function --region=REGION
     ```
     * Salida registrada: `Hello, Cloud Function Gen2!`.
* **Preguntas Formativas del Laboratorio (Knowledge Check):**
  * *¿Serverless te permite escribir y desplegar código sin la molestia de administrar la infraestructura subyacente?* → **Verdadero** (Abstracción completa del aprovisionamiento y escalado de máquinas).
* **Concepto Clave ACE:** Los mensajes de Pub/Sub empaquetan su carga útil en Base64 dentro del atributo `message.data`. En la certificación ACE, las arquitecturas desacopladas FaaS + Pub/Sub requieren que la función procese el CloudEvent decodificando el buffer y ejecute bajo una cuenta de servicio dedicada (`--service-account`) con permisos restringidos.

---

### Lab 7: Manage Pub/Sub in the Google Cloud Console (Lab ID: GSP096 / 592547)
* **Objetivo Oficial:** Implementar el patrón de mensajería asíncrona mediante la consola web de Google Cloud Pub/Sub: creación de temas (`MyTopic`), configuración de suscripciones de extracción (`MySub`), publicación de mensajes en formato texto y consumo validado desde Cloud Shell con `gcloud pubsub subscriptions pull --auto-ack`.
* **Metadatos:** Nivel Introductorio | Duración: 10 minutos | Créditos: No cost | ID Oficial: `GSP096`.
* **Tareas Operativas Detalladas:**
  1. **Creación del Tema (Topic)**:
     * Ruta: `Analytics > Pub/Sub > Topics` → Clic en `Create topic`.
     * Topic ID: `MyTopic` (genera el recurso `projects/<PROJECT_ID>/topics/MyTopic`).
     * Esquema y retención: Valores predeterminados gestionados por Google Cloud.
  2. **Configuración de Suscripción Pull**:
     * En el menú contextual de `MyTopic`, seleccionar `Create subscription`.
     * Subscription ID: `MySub`.
     * Tipo de entrega (*Delivery Type*): `Pull` (el suscriptor sondea y extrae los mensajes proactivamente).
     * Parámetros de acuse: Plazo de acuse de recibo (*ack_deadline*) de 10 segundos y retención de mensajes no confirmados de 7 días.
  3. **Publicación de Mensajes de Prueba**:
     * En `MyTopic > Messages > Publish Message`, redactar el mensaje `Hello World` y publicar.
  4. **Extracción y Confirmación Automática**:
     * En Cloud Shell, consumir y confirmar el mensaje en cola:
       ```bash
       gcloud pubsub subscriptions pull --auto-ack MySub
       ```
     * Salida confirmada en la columna `DATA`: `Hello World`.
* **Preguntas Formativas del Laboratorio (Knowledge Check):**
  * *Una aplicación publicadora crea y envía mensajes a un ____. Las aplicaciones suscriptoras crean una ____ a un tema para recibir mensajes.* → **topic, subscription**.
  * *¿Cloud Pub/Sub es un servicio de mensajería asíncrona diseñado para ser altamente confiable y escalable?* → **Verdadero** (Garantiza entrega al menos una vez con autoescalado global).
* **Concepto Clave ACE:** La distinción entre suscripciones **Pull** y **Push** es fundamental:
  * **Pull**: Adecuada para cargas de trabajo en lote y servicios que gestionan su propia velocidad de consumo o están detrás de firewalls sin IP pública (Compute Engine / GKE).
  * **Push**: Ideal para invocar endpoints webhooks públicos (Cloud Run / Cloud Run Functions / App Engine) mediante solicitudes HTTPS POST con tokens OIDC.
  * Si el suscriptor no confirma el mensaje antes de vencer el `ack_deadline`, Pub/Sub volverá a despacharlo, exigiendo que los consumidores implementen **idempotencia**.

---

### Lab 8: Pub/Sub: Qwik Start - Command Line (Lab ID: GSP095 / 592548)
* **Objetivo Oficial:** Dominar las operaciones de ciclo de vida completo en Google Cloud Pub/Sub mediante la CLI `gcloud pubsub`: creación, listado y eliminación de temas y suscripciones, publicación masiva de mensajes y extracción unitaria y por lotes con `--limit` y `--auto-ack`.
* **Metadatos:** Nivel Introductorio | Duración: 10 minutos | Créditos: No cost | ID Oficial: `GSP095`.
* **Tareas Operativas Detalladas:**
  1. **Administración de Temas (Topics)**:
     ```bash
     # Crear tema principal y secundarios
     gcloud pubsub topics create myTopic
     gcloud pubsub topics create Test1
     gcloud pubsub topics create Test2

     # Listar temas del proyecto
     gcloud pubsub topics list

     # Eliminar temas temporales
     gcloud pubsub topics delete Test1
     gcloud pubsub topics delete Test2
     ```
  2. **Administración de Suscripciones**:
     ```bash
     # Crear suscripciones vinculadas a myTopic
     gcloud pubsub subscriptions create --topic myTopic mySubscription
     gcloud pubsub subscriptions create --topic myTopic Test1
     gcloud pubsub subscriptions create --topic myTopic Test2

     # Listar suscripciones asociadas al tema
     gcloud pubsub topics list-subscriptions myTopic

     # Eliminar suscripciones temporales
     gcloud pubsub subscriptions delete Test1
     gcloud pubsub subscriptions delete Test2
     ```
  3. **Publicación y Extracción Unitaria (`--auto-ack`)**:
     ```bash
     # Publicar mensajes
     gcloud pubsub topics publish myTopic --message "Hello"
     gcloud pubsub topics publish myTopic --message "Publisher likes to eat Pizza"

     # Extraer un mensaje individual con acuse automático
     gcloud pubsub subscriptions pull mySubscription --auto-ack
     ```
     * Sin banderas adicionales, `pull` procesa un único mensaje a la vez. Al vaciar la cola, el comando retorna `Listed 0 items.`.
  4. **Extracción por Lotes con la Bandera `--limit`**:
     ```bash
     # Publicar varios mensajes
     gcloud pubsub topics publish myTopic --message "Batch 1"
     gcloud pubsub topics publish myTopic --message "Batch 2"
     gcloud pubsub topics publish myTopic --message "Batch 3"

     # Extraer el lote completo de hasta 3 mensajes en una única petición
     gcloud pubsub subscriptions pull mySubscription --limit=3
     ```
* **Preguntas Formativas del Laboratorio (Knowledge Check):**
  * *¿Para recibir mensajes publicados en un tema, debes crear una suscripción a ese tema?* → **Verdadero** (Los mensajes enviados a un tema sin suscripciones activas se pierden de forma permanente).
* **Concepto Clave ACE:** En el examen ACE, un error común consiste en asumir que Pub/Sub retiene mensajes antes de que existan suscripciones; la retención estándar solo opera para mensajes publicados **después** de que la suscripción ha sido creada. Para procesamiento por lotes eficiente, la bandera `--limit` controla el tamaño de la ventana de recepción en el consumidor.

---

### Lab 9: Publish and Subscribe to Messages in Pub/Sub Using Python (Lab ID: GSP094 / 592549)
* **Objetivo Oficial:** Automatizar la creación de temas, suscripciones y el intercambio de mensajes en Google Cloud Pub/Sub utilizando la librería cliente oficial `google-cloud-pubsub` en Python bajo un entorno virtual aislado.
* **Metadatos:** Nivel Introductorio | Duración: 10 minutos | Créditos: 1 | ID Oficial: `GSP094`.
* **Tareas Operativas Detalladas:**
  1. **Configuración del Entorno Virtual e Instalación**:
     ```bash
     python3 -m venv venv && source venv/bin/activate
     pip install --upgrade google-cloud-pubsub
     git clone https://github.com/googleapis/python-pubsub.git
     cd python-pubsub/samples/snippets
     ```
  2. **Creación y Listado de Temas con `publisher.py`**:
     ```bash
     # Crear tema MyTopic mediante el script SDK
     python publisher.py $GOOGLE_CLOUD_PROJECT create MyTopic

     # Listar temas del proyecto
     python publisher.py $GOOGLE_CLOUD_PROJECT list
     ```
     * En el SDK, `pubsub_v1.PublisherClient` utiliza `create_topic(request={"name": topic_path})`.
  3. **Creación y Listado de Suscripciones con `subscriber.py`**:
     ```bash
     # Crear suscripción MySub para MyTopic
     python subscriber.py $GOOGLE_CLOUD_PROJECT create MyTopic MySub

     # Listar suscripciones en el proyecto
     python subscriber.py $GOOGLE_CLOUD_PROJECT list-in-project
     ```
     * En el SDK, `pubsub_v1.SubscriberClient` invoca `create_subscription(request={"name": sub_path, "topic": topic_path})`.
  4. **Publicación de Mensajes vía CLI**:
     ```bash
     gcloud pubsub topics publish MyTopic --message "Hello"
     gcloud pubsub topics publish MyTopic --message "Publisher likes to eat Pizza"
     ```
  5. **Recepción Asíncrona con Streaming Pull y Callbacks**:
     ```bash
     python subscriber.py $GOOGLE_CLOUD_PROJECT receive MySub
     ```
     * Arquitectura del SDK: `subscriber.subscribe(subscription_path, callback=callback)`. El consumidor mantiene abierto un canal gRPC bidireccional y cada mensaje procesado debe confirmarse explícitamente mediante `message.ack()`.
* **Preguntas Formativas del Laboratorio (Knowledge Check):**
  * *¿El servicio Google Cloud Pub/Sub permite a las aplicaciones intercambiar mensajes de manera confiable, rápida y asíncrona?* → **Verdadero**.
  * *Un ____ es una cadena compartida que permite que las aplicaciones se conecten entre sí.* → **topic**.
* **Concepto Clave ACE:**
  * En el SDK de Python, las cargas útiles a publicar **deben ser siempre objetos de tipo `bytes`** (`message.encode('utf-8')`).
  * En el suscriptor, **el acuse de recibo no es automático**: omitir `message.ack()` en la función de callback provocará que Pub/Sub reenvíe el mensaje periódicamente al vencer el `ack_deadline`.

---

### Lab 10: Set Up an App Dev Environment on Google Cloud: Challenge Lab (Lab ID: GSP315 / 592550)
* **Objetivo Oficial:** Evaluación práctica sin guía paso a paso. Configurar el entorno de desarrollo para el proyecto de gestión fotográfica "Memories" de Jooli Inc., integrando Cloud Storage, Cloud Pub/Sub, Cloud Run Functions de 2ª generación y control de acceso IAM bajo restricciones de tiempo y evaluación automatizada.
* **Metadatos:** Nivel Introductorio / Challenge Lab | Duración: 25 minutos | Créditos: 1 | ID Oficial: `GSP315`.
* **Escenario de Negocio (Jooli Inc. — Memories Project):**
  * Como ingeniero cloud junior recién incorporado, debes configurar la infraestructura para procesar fotografías de usuarios:
    1. Aprovisionar un bucket en la región asignada para almacenar las imágenes.
    2. Crear un topic de Pub/Sub para despachar notificaciones de miniaturas procesadas.
    3. Desplegar una Cloud Run Function gen2 en Node.js 22 con trigger de Cloud Storage (`google.cloud.storage.object.v1.finalized`) que procesa la imagen original con la librería `sharp`, genera una miniatura de 64x64 (`_64x64_thumbnail.<ext>`), la guarda en el bucket y publica el nombre del archivo en el topic de Pub/Sub.
    4. Revocar el acceso de IAM al ingeniero anterior (`Username 2`, rol básico `Viewer`).
* **Solución Rápida y Automatizada con Google Cloud CLI:**
  ```bash
  # 1. Definir variables dinámicas provistas por el laboratorio
  export REGION="<REGION_DEL_LAB>"
  export BUCKET_NAME="<BUCKET_NAME_ASIGNADO>"
  export TOPIC_NAME="<TOPIC_NAME_ASIGNADO>"
  export FUNCTION_NAME="<FUNCTION_NAME_ASIGNADA>"
  export USER2_EMAIL="<USERNAME_2_DEL_LAB>"

  # 2. Tarea 1: Crear el Bucket de Cloud Storage
  gcloud storage buckets create gs://$BUCKET_NAME --location=$REGION

  # 3. Tarea 2: Crear el Topic de Pub/Sub
  gcloud pubsub topics create $TOPIC_NAME

  # 4. Tarea 3: Preparar código fuente y dependencias de la función
  mkdir -p ~/thumbnail-func && cd ~/thumbnail-func

  cat > package.json << 'EOF'
  {
    "name": "thumbnails",
    "version": "1.0.0",
    "description": "Create Thumbnail of uploaded image",
    "main": "index.js",
    "scripts": { "start": "node index.js" },
    "dependencies": {
      "@google-cloud/functions-framework": "^3.0.0",
      "@google-cloud/pubsub": "^2.0.0",
      "@google-cloud/storage": "^6.11.0",
      "sharp": "^0.32.1"
    },
    "devDependencies": {},
    "engines": { "node": ">=4.3.2" }
  }
  EOF

  cat > index.js << EOF
  const functions = require('@google-cloud/functions-framework');
  const { Storage } = require('@google-cloud/storage');
  const { PubSub } = require('@google-cloud/pubsub');
  const sharp = require('sharp');

  functions.cloudEvent('$FUNCTION_NAME', async cloudEvent => {
    const event = cloudEvent.data;
    console.log(\`Event: \${JSON.stringify(event)}\`);
    console.log(\`Hello \${event.bucket}\`);
    const fileName = event.name;
    const bucketName = event.bucket;
    const bucket = new Storage().bucket(bucketName);
    const topicName = "$TOPIC_NAME";
    const pubsub = new PubSub();

    if (fileName.search("64x64_thumbnail") === -1) {
      const filename_split = fileName.split('.');
      const filename_ext = filename_split[filename_split.length - 1].toLowerCase();
      const filename_without_ext = fileName.substring(0, fileName.length - filename_ext.length - 1);

      if (filename_ext === 'png' || filename_ext === 'jpg' || filename_ext === 'jpeg') {
        console.log(\`Processing Original: gs://\${bucketName}/\${fileName}\`);
        const gcsObject = bucket.file(fileName);
        const newFilename = \`\${filename_without_ext}_64x64_thumbnail.\${filename_ext}\`;
        const gcsNewObject = bucket.file(newFilename);

        try {
          const [buffer] = await gcsObject.download();
          const resizedBuffer = await sharp(buffer)
            .resize(64, 64, { fit: 'inside', withoutEnlargement: true })
            .toFormat(filename_ext)
            .toBuffer();

          await gcsNewObject.save(resizedBuffer, {
            metadata: { contentType: \`image/\${filename_ext}\` }
          });
          console.log(\`Success: \${fileName} -> \${newFilename}\`);

          await pubsub.topic(topicName).publishMessage({ data: Buffer.from(newFilename) });
          console.log(\`Message published to \${topicName}\`);
        } catch (err) {
          console.error(\`Error: \${err}\`);
        }
      } else {
        console.log(\`gs://\${bucketName}/\${fileName} is not an image I can handle\`);
      }
    } else {
      console.log(\`gs://\${bucketName}/\${fileName} already has a thumbnail\`);
    }
  });
  EOF

  # 5. Desplegar la función en Cloud Run Functions gen2
  gcloud functions deploy $FUNCTION_NAME \
    --gen2 \
    --runtime=nodejs22 \
    --region=$REGION \
    --source=. \
    --entry-point=$FUNCTION_NAME \
    --trigger-event-filters="type=google.cloud.storage.object.v1.finalized" \
    --trigger-event-filters="bucket=$BUCKET_NAME"

  # 6. Probar subiendo una imagen de muestra
  curl -O https://storage.googleapis.com/cloud-training/gsp315/map.jpg
  gcloud storage cp map.jpg gs://$BUCKET_NAME/map.jpg

  # 7. Tarea 4: Revocar acceso IAM de Username 2
  gcloud projects remove-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
    --member="user:$USER2_EMAIL" \
    --role="roles/viewer"
  ```
* **Puntos Críticos de Aprobación (Check my progress):**
  * `Task 1`: Bucket creado en la región requerida (`gs://$BUCKET_NAME`).
  * `Task 2`: Topic de Pub/Sub existente con el nombre exacto.
  * `Task 3`: Función desplegada en gen2, runtime Node.js 22, trigger Eventarc conectado al evento `object.v1.finalized` y comprobación de subida exitosa de una imagen para verificar el trigger.
  * `Task 4`: Vinculación del rol `roles/viewer` eliminada para la cuenta de `Username 2`.

---

## 🎯 4. Relevancia y Trampas de Examen para Google Cloud ACE

1. **gcloud storage vs gsutil:** En las versiones modernas del examen ACE, `gcloud storage` es la sintaxis preferida oficial para operaciones de almacenamiento por CLI.
2. **Métricas de Memoria en VMs:** Pregunta clásica de examen: *"Deseas configurar alertas basadas en el porcentaje de uso de memoria RAM de una VM en Compute Engine, pero la métrica no aparece en Cloud Monitoring"*. Solución: Instalar el **Google Cloud Ops Agent** dentro del sistema operativo.
3. **Confirmación de Mensajes en Pub/Sub (ACK):** Si un suscriptor no confirma (*acknowledge*) un mensaje dentro del plazo `ack_deadline`, Pub/Sub volverá a entregar el mensaje a otro suscriptor.
4. **Cloud Run Functions de 2da Generación:** Las funciones de 2da generación corren sobre la infraestructura de Cloud Run, lo que permite mayor tiempo de ejecución (hasta 60 minutos para HTTP), mayor concurrencia por instancia y mayor tamaño de memoria.

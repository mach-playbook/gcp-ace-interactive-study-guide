# 📝 Insumo en Bruto: Deploy a Cloud Run Function via the Google Cloud Console (Lab GSP081 / 592545)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 5 (ID: `GSP081`, Skills ID: `592545`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592545
* **Puntos Acumulados**: 16,466 estrellas
* **Duración / Créditos**: 15 minutos / 1 Crédito
* **Nivel**: Introductory
* **Última Actualización / Test**: 5 de noviembre de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Crear y configurar una Cloud Run function (antes Cloud Functions) de 2ª generación mediante la consola gráfica de Google Cloud.
2. Definir parámetros de escalabilidad y contención de costes (máximo de 5 instancias concurrentes).
3. Configurar autenticación pública (*Allow public access / unauthenticated*) y trigger HTTP.
4. Desplegar la implementación base `helloHttp` en Node.js y verificar el ciclo de compilación con Cloud Build y empaquetado en Artifact Registry.
5. Probar la función mediante cargas útiles JSON (`{"message":"Hello World!"}`) y auditar los registros de ejecución en Cloud Logging.

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Create a Function
* **Navegación**: `Navigation menu` → `Serverless` → `Cloud Run` → `Services` → Clic en `WRITE A FUNCTION`.
* **Parámetros de Configuración**:
  * **Service name**: `gcfunction`.
  * **Region**: `<REGION>` (ej. `us-central1`).
  * **Authentication**: `Allow public access` (habilita el rol `roles/run.invoker` para el principal `allUsers`).
  * **Execution environment**: `Second generation` (2nd gen).
  * **Revision scaling**: Configurar *Maximum number of instances* en `5` (control de costes y prevención de saturación de backends).
* Habilitación automática de APIs requeridas (Cloud Run Admin API, Cloud Build API, Artifact Registry API).

---

### Task 2. Deploy the Function
* Editor en línea (*Inline editor*):
  * Código predeterminado `index.js` implementando `functions.http('helloHttp', (req, res) => ...)` mediante `@google-cloud/functions-framework`.
* Clic en `SAVE and REDEPLOY`.
* El icono de carga (*spinner*) se reemplaza por una marca de verificación verde (*check mark*) una vez finalizado el despliegue del servicio.

---

### Task 3. Test the Function
* En el panel de detalles del servicio, pestaña `TEST`.
* Carga útil del evento desencadenante (*Triggering event*):
  ```json
  {
    "message": "Hello World!"
  }
  ```
* Ejecución desde Cloud Shell o mediante `curl`:
  ```bash
  curl -X POST https://<REGION>-<PROJECT_ID>.cloudfunctions.net/gcfunction \
    -H "Content-Type: application/json" \
    -d '{"message":"Hello World!"}'
  ```
* Salida esperada: `Hello World!`.

---

### Task 4. View Logs
* Pestaña `Observability` → `Logs`.
* Visualización de trazas en Cloud Logging:
  * Registro de inicio de contenedor frío/caliente.
  * Tiempos de ejecución con granularidad a 100 ms.
  * Códigos de respuesta HTTP 200 OK.

---

### Task 5. Test Your Understanding
1. **Pregunta**: *Cloud Run functions is a serverless execution environment for event driven services on Google Cloud.*
   * **Respuesta**: **True** (Plataforma FaaS orientada a eventos con escalado a cero).
2. **Pregunta**: *Which type of trigger is used while creating Cloud Run functions in the lab?*
   * **Respuesta**: **HTTPS** (Invocación directa síncrona vía URL pública).

---

## 📌 Relevancia y Trampas de Examen Google Cloud ACE
1. **Cloud Run Functions de 2da Generación**:
   * Construidas sobre la infraestructura unificada de Cloud Run y Knative.
   * Ventajas clave sobre 1st gen:
     * Tiempos de ejecución de hasta **60 minutos** para peticiones HTTP (frente a los 9 minutos de 1st gen).
     * Soporte de **concurrencia** (múltiples solicitudes simultáneas por instancia, hasta 1000).
     * Mayor capacidad de memoria (hasta 32 GiB) y hasta 8 vCPUs.
     * Integración nativa con Eventarc para más de 90 orígenes de eventos de Google Cloud.
2. **Control de Concurrencia y Escalado (Max Instances)**:
   * En preguntas de examen ACE donde se requiere proteger una base de datos relacional (ej. Cloud SQL) de un aluvión masivo de conexiones concurrentes provenientes de una función serverless, la solución consiste en restringir el parámetro **Maximum number of instances** (`--max-instances`).
3. **Acceso no Autenticado**:
   * Permitir llamadas públicas sin autenticación aplica automáticamente la política IAM que vincula `allUsers` con el rol `roles/run.invoker`.

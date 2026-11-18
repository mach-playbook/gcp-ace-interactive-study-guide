# 📝 Insumo en Bruto: Manage Access Control with IAM (Lab GSP064 / 592543)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 3 (ID: `GSP064`, Skills ID: `592543`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592543
* **Puntos Acumulados**: 16,466 estrellas
* **Duración / Créditos**: 15 minutos / 1 Crédito
* **Nivel**: Introductory
* **Última Actualización / Test**: 30 de octubre de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Explorar los roles a nivel de proyecto en la consola de IAM y distinguir los 4 roles básicos (primitivos).
2. Comprender la diferencia de privilegios entre identidades operando simultáneamente con dos usuarios (`Username 1` = Owner vs `Username 2` = Viewer).
3. Desplegar un bucket en Cloud Storage con un archivo `sample.txt` y constatar la visibilidad heredada por el rol de proyecto `roles/viewer`.
4. Revocar el rol `Viewer` y verificar la propagación de la revocación (hasta 80 segundos) provocando error de acceso en la consola.
5. Aplicar el principio de menor privilegio (*least privilege*) asignando el rol predefinido `Storage Object Viewer` (`roles/storage.objectViewer`) a `Username 2` y validando la lectura de objetos desde Cloud Shell mediante `gcloud storage ls`.

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Explore the IAM Console and Project-Level Roles
* Sesión con dos identidades independientes en pestañas de incógnito:
  * **Username 1**: Rol `roles/owner` (capacidad de gestionar IAM mediante el permiso `resourcemanager.projects.setIamPolicy` y facturación).
  * **Username 2**: Rol `roles/viewer` (lectura global sin modificar estado; botón *Grant access* deshabilitado).
* **Taxonomía de los 4 Roles Básicos (Primitivos)**:
  * `roles/browser`: Permite examinar la jerarquía de recursos (carpetas, proyectos, organizaciones y políticas IAM) sin ver los datos o recursos internos.
  * `roles/viewer`: Permisos de solo lectura sobre recursos existentes sin afectar su estado.
  * `roles/editor`: Incluye todos los permisos de visor más modificación de estado (creación, edición y borrado de recursos).
  * `roles/owner`: Incluye todos los permisos de editor más administración de roles/políticas IAM y configuración de cuentas de facturación (*Billing*).

---

### Task 2. Prepare a Cloud Storage Bucket for Access Testing
* Desde la consola de **Username 1**:
  * Crear bucket con nombre único global, tipo de ubicación `Multi-region` y confirmación de prevención de acceso público.
  * Subir un archivo de texto o HTML y renombrarlo a `sample.txt`.
* Desde la consola de **Username 2**:
  * Navegar a `Cloud Storage` → `Buckets`.
  * Constatar que `Username 2` visualiza el bucket y su contenido gracias al rol de proyecto `roles/viewer`.

---

### Task 3. Remove Project Access
* Desde la consola de **Username 1**:
  * Navegar a `IAM & Admin` → `IAM`.
  * Localizar la fila de `Username 2` y hacer clic en el icono de edición (*Edit principal* / lápiz).
  * Eliminar el rol `Viewer` haciendo clic en el icono de papelera. Guardar cambios.
* **Propagación de Permisos**:
  * Las modificaciones de políticas en IAM pueden demorar hasta **80 segundos** en replicarse en todos los centros de datos globales de Google Cloud.
* Desde la consola de **Username 2**:
  * Refrescar la página de `Cloud Storage` tras 1-2 minutos.
  * Comprobar que aparece un error de permisos denegados (*Permission error / 403 Forbidden*).

---

### Task 4. Add Cloud Storage Permissions
* Desde la consola de **Username 1**:
  * Ir a `IAM & Admin` → `IAM` → `Grant access`.
  * En *New principals*, pegar el correo de `Username 2`.
  * En *Select a role*, asignar el rol predefinido: `Cloud Storage` → `Storage Object Viewer` (`roles/storage.objectViewer`). Guardar.
* Desde la sesión de **Username 2**:
  * Abrir Cloud Shell y ejecutar:
    ```bash
    gcloud storage ls gs://[YOUR_BUCKET_NAME]
    ```
  * Salida esperada:
    ```
    gs://[YOUR_BUCKET_NAME]/sample.txt
    ```
  * Conclusión: `Username 2` ya no tiene acceso general de visor sobre todo el proyecto (no puede inspeccionar Compute Engine, VPCs ni otros servicios), pero posee acceso granular y seguro para listar y leer objetos en Cloud Storage.

---

## 📌 Relevancia y Trampas de Examen Google Cloud ACE
1. **Roles Básicos (Primitivos) Prohibidos en Producción**:
   * En preguntas de examen ACE, cualquier opción que proponga asignar `Owner`, `Editor` o `Viewer` a un desarrollador o cuenta de servicio para que realice una tarea puntual en Cloud Storage, Compute Engine o BigQuery debe ser **descartada de inmediato**. La respuesta correcta siempre favorece un **rol predefinido específico** (ej. `roles/storage.objectViewer`, `roles/compute.instanceAdmin.v1`).
2. **Permiso para Administrar IAM**:
   * Para conceder o revocar roles en un proyecto, la identidad requiere el permiso específico `resourcemanager.projects.setIamPolicy` (incluido en `roles/resourcemanager.projectIamAdmin` y `roles/owner`).
3. **Equivalentes en CLI gcloud**:
   ```bash
   # Otorgar rol predefinido
   gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
     --member="user:student-02@qwiklabs.net" \
     --role="roles/storage.objectViewer"

   # Revocar rol
   gcloud projects remove-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
     --member="user:student-02@qwiklabs.net" \
     --role="roles/viewer"
   ```

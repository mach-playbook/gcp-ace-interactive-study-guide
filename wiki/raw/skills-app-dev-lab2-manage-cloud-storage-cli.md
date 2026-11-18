# 📝 Insumo en Bruto: Manage Cloud Storage with the Google Cloud CLI (Lab GSP074 / 592542)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 2 (ID: `GSP074`, Skills ID: `592542`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592542
* **Puntos Acumulados**: 16,466 estrellas
* **Duración / Créditos**: 15 minutos / 1 Crédito
* **Nivel**: Introductory
* **Última Actualización / Test**: 17 de febrero de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Crear un bucket de Cloud Storage mediante la CLI moderna `gcloud storage`.
2. Cargar objetos al bucket (`ada.jpg`) y descargarlos en Cloud Shell.
3. Copiar objetos hacia carpetas virtuales simuladas (`image-folder/`).
4. Listar contenidos y metadatos detallados de objetos con flags específicos (`gcloud storage ls -l`).
5. Modificar listas de control de acceso (ACLs) a nivel de objeto para habilitar lectura pública anónima (`--add-acl-grant=entity=allUsers,role=READER`).
6. Revocar accesos públicos mediante `--remove-acl-grant=allUsers` y eliminar objetos con `gcloud storage rm`.

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Create a Bucket with gcloud storage
* **Comando**:
  ```bash
  gcloud config set compute/region "REGION"
  gcloud storage buckets create gs://<YOUR-BUCKET-NAME>
  ```
* **Reglas de Nomenclatura del Namespace Global**:
  * Visible universalmente.
  * 3 a 63 caracteres (minúsculas, números, guiones, puntos con verificación).
  * No direcciones IP, no prefijo `goog`, no palabra `google`.
  * Si el nombre ya está ocupado: `ServiceException: 409 Bucket YOUR-BUCKET-NAME already exists`.
* **Evaluación Formativa**:
  * *Pregunta*: Each bucket has a default storage class, which you can specify when you create your bucket.
  * *Respuesta*: **True** (Se puede especificar con banderas como `--default-storage-class=STANDARD|NEARLINE|COLDLINE|ARCHIVE`).

---

### Task 2. Upload an Object into Your Bucket
* Descarga de imagen histórica de Ada Lovelace:
  ```bash
  curl https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg --output ada.jpg
  ```
* Subida con la CLI moderna:
  ```bash
  gcloud storage cp ada.jpg gs://<YOUR-BUCKET-NAME>
  rm ada.jpg
  ```

---

### Task 3. Download an Object from Your Bucket
* Descarga recursiva o individual hacia el directorio local actual:
  ```bash
  gcloud storage cp -r gs://<YOUR-BUCKET-NAME>/ada.jpg .
  ```

---

### Task 4. Copy an Object to a Folder in the Bucket
* Copia del archivo hacia una clave con prefijo de carpeta simulada:
  ```bash
  gcloud storage cp gs://<YOUR-BUCKET-NAME>/ada.jpg gs://<YOUR-BUCKET-NAME>/image-folder/
  ```

---

### Task 5. List Contents of a Bucket or Folder
* Listado simple de recursos contenidos:
  ```bash
  gcloud storage ls gs://<YOUR-BUCKET-NAME>
  ```
* Salida esperada:
  ```
  gs://YOUR-BUCKET-NAME/ada.jpg
  gs://YOUR-BUCKET-NAME/image-folder/
  ```

---

### Task 6. List Details for an Object
* Listado extendido con metadatos de tamaño en bytes y fecha ISO 8601:
  ```bash
  gcloud storage ls -l gs://<YOUR-BUCKET-NAME>/ada.jpg
  ```

---

### Task 7. Make Your Object Publicly Accessible
* Otorgar permiso de lectura pública mediante ACL en modo Fine-Grained:
  ```bash
  gcloud storage objects update gs://<YOUR-BUCKET-NAME>/ada.jpg --add-acl-grant=entity=allUsers,role=READER
  ```
* **Evaluación Formativa**:
  * *Pregunta*: An access control list (ACL) is a mechanism you can use to define who has access to your buckets and objects.
  * *Respuesta*: **True** (Las ACLs permiten control fino por objeto individual cuando el bucket no tiene forzado UBLA).
* **URL Pública**:
  `https://storage.googleapis.com/<YOUR-BUCKET-NAME>/ada.jpg`

---

### Task 8. Remove Public Access and Delete Objects
* Revocación inmediata del acceso público:
  ```bash
  gcloud storage objects update gs://<YOUR-BUCKET-NAME>/ada.jpg --remove-acl-grant=allUsers
  ```
* **Evaluación Formativa**:
  * *Pregunta*: You can stop publicly sharing an object by removing the permission entry that has:
  * *Respuesta*: **allUsers**
* Eliminación definitiva del objeto:
  ```bash
  gcloud storage rm gs://<YOUR-BUCKET-NAME>/ada.jpg
  ```

---

## 📌 Relevancia y Trampas de Examen Google Cloud ACE
1. **gcloud storage vs gsutil**: `gcloud storage` sustituye formalmente a `gsutil` en el temario moderno de certificación ACE v4.0. Ofrece mejoras de rendimiento de hasta 2x a 8x en transferencias masivas gracias a sharding y paralelismo nativo.
2. **ACLs (`--add-acl-grant`) vs UBLA**: Este laboratorio utiliza un bucket configurado con control de acceso granular (Fine-Grained), permitiendo modificar ACLs individuales de objetos. Si el bucket tuviera activo *Uniform Bucket-Level Access* (UBLA), el comando `--add-acl-grant` fallaría, ya que UBLA desactiva completamente las ACLs a favor de políticas centralizadas de IAM.
3. **Estructura Plana de Claves**: El uso de `image-folder/` no crea un inodo ni un directorio en disco físico; crea un prefijo de clave de objeto delimitado por `/`.

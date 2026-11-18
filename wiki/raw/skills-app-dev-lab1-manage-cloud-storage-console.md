# 📝 Insumo en Bruto: Manage Cloud Storage with the Google Cloud Console (Lab GSP073 / 592541)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 1 (ID: `GSP073`, Skills ID: `592541`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592541
* **Puntos Acumulados**: 16,246 estrellas
* **Duración / Créditos**: 10 minutos / 1 Crédito
* **Nivel**: Introductory
* **Última Actualización / Test**: 23 de enero de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Crear un bucket de Cloud Storage mediante Google Cloud Console respetando las reglas de nombres y políticas globales.
2. Subir objetos al bucket (`kitten.png`).
3. Compartir objetos públicamente otorgando el rol predefinido `Storage Object Viewer` (`roles/storage.objectViewer`) al principal `allUsers`.
4. Crear carpetas y subcarpetas (`folder1/`, `folder2/`) entendiendo la simulación de directorios sobre un namespace plano de objetos clave-valor.
5. Eliminar carpetas y objetos confirmando la acción de borrado destructivo.

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Create a Bucket
* **Ruta en Consola**: `Navigation Menu` → `Cloud Storage` → `Buckets` → `+ Create`.
* **Reglas de Nombrado de Buckets (Críticas para el Examen ACE)**:
  * El espacio de nombres de buckets es **global** y visible públicamente a nivel mundial.
  * Solo letras minúsculas, números, guiones (`-`), guiones bajos (`_`) y puntos (`.`).
  * Nombres que contienen puntos requieren verificación de dominio.
  * Longitud: 3 a 63 caracteres (hasta 222 si usa puntos, con componentes individuales ≤ 63).
  * No pueden representarse como direcciones IP (ej. `192.168.5.4`).
  * No pueden comenzar con el prefijo `goog` ni contener la palabra `google` o variaciones tipográficas.
  * Por compatibilidad DNS, no se recomienda usar guiones bajos ni puntos adyacentes (`..` o `.-`).
* **Configuración del Bucket**:
  * Nombre: `$PROJECT_ID` (garantiza unicidad global).
  * Location type: `Region`.
  * Default storage class: `Standard`.
  * Access control: `Uniform` (UBLA - Uniform Bucket-Level Access).
  * Public access prevention: Desmarcar / Desactivar ("Enforce public access prevention on this bucket" -> off).

#### Evaluación Formativa (Test Your Understanding):
* **Pregunta**: *Every bucket must have a unique name across the entire Cloud Storage namespace.*
* **Respuesta**: **True** (El espacio de nombres de Cloud Storage es universal en toda la infraestructura de Google Cloud).

---

### Task 2. Upload an Object into the Bucket
* Descarga de imagen de muestra (`kitten.png`).
* Ruta: Bucket Details → Pestaña `Objects` → `Upload` → `Upload files`.
* Selección del archivo `kitten.png`.
* Verificación de metadatos: Nombre, tamaño, Content-Type (`image/png`), fecha de creación.

#### Evaluación Formativa (Test Your Understanding):
* **Pregunta**: *Object names must be unique only within a given bucket.*
* **Respuesta**: **True** (El identificador completo de un objeto es `gs://BUCKET_NAME/OBJECT_NAME`; dos buckets distintos pueden tener objetos con el mismo nombre).

---

### Task 3. Share a Bucket Publicly
* Selección de la pestaña `Permissions`.
* Vista: `View by principals` → Clic en `Grant access`.
* En el panel `Add principals`:
  * **New principals**: `allUsers` (identificador especial de IAM que representa a cualquier entidad en internet, autenticada o no).
  * **Select a role**: `Cloud Storage` → `Storage Object Viewer` (`roles/storage.objectViewer`).
  * Clic en `Save` → Confirmar advertencia en ventana emergente: `Allow public access`.
* Verificación en la pestaña `Objects`: la columna *Public access* muestra *Access granted to public principals*.
* URL pública formateada: `https://storage.googleapis.com/YOUR_BUCKET_NAME/kitten.png`.

---

### Task 4. Create Folders
* En la pestaña `Objects` → Clic en `Create folder`.
* Nombre: `folder1` → Clic en `Create`.
* Entrar a `folder1` → Clic en `Create folder`.
* Nombre: `folder2` → Clic en `Create`.
* Entrar a `folder2` → Clic en `Upload files` y subir archivo.
* **Fundamento Arquitectónico**: Cloud Storage no implementa un sistema jerárquico de archivos nativo; utiliza un almacenamiento plano de objetos donde las carpetas son una abstracción sintáctica basada en el delimitador `/` en el nombre de la clave del objeto (`folder1/folder2/kitten.png`).

---

### Task 5. Delete a Folder
* Navegar a nivel de bucket.
* Seleccionar la carpeta a eliminar.
* Clic en el botón `Delete`.
* Confirmar escribiendo `DELETE`.
* Se eliminan permanentemente la carpeta simulada y todos los objetos contenidos bajo ese prefijo.

---

## 📌 Relevancia para la Certificación GCP ACE
* **UBLA vs Fine-Grained**: El laboratorio utiliza control de acceso uniforme (UBLA), que es la recomendación oficial de Google para simplificar auditorías y deshabilitar ACLs individuales por objeto.
* **Public Access Prevention (PAP)**: Característica de seguridad a nivel de bucket u organización que bloquea preventivamente cualquier concesión pública (`allUsers` o `allAuthenticatedUsers`), incluso si se aplican roles en IAM.
* **allUsers vs allAuthenticatedUsers**: `allUsers` = cualquier persona en la red pública; `allAuthenticatedUsers` = cualquier cuenta con autenticación Google válida (no restringido a la organización del proyecto).

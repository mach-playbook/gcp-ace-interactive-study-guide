# Ingesta Cruda: Cloud Storage

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689570](https://www.skills.google/paths/8/course_templates/60/video/689570)  
**Video YouTube Oficial**: [Cloud Storage (pLMkOa4FbwI)](https://www.youtube.com/watch?v=pLMkOa4FbwI)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Lección**: 22 (Skills Video ID: `689570` | YouTube ID: `pLMkOa4FbwI`)  
**Puntos Acumulados**: 14,030  

---

## 📝 Transcripción Oficial Sanitizada

```text
00:00 Let’s begin with Cloud Storage, which is a service that offers developers and IT organizations durable and highly available object storage.
00:09 But what is object storage?
00:12 Object storage is a computer data storage architecture that manages data as “objects” and not as a file and folder hierarchy (file storage), or as chunks of a disk (block storage).
00:24 These objects are stored in a packaged format which contains the binary form of the actual data itself, as well as relevant associated meta-data (such as date created, author, resource type, and permissions), and a globally unique identifier.
00:40 These unique keys are in the form of URLs, which means object storage interacts well with web technologies.
00:47 Data commonly stored as objects include video, pictures, and audio recordings.
00:53 Cloud Storage is Google’s object storage product.
00:56 It allows customers to store any amount of data, and to retrieve it as often as needed.
01:00 It’s a fully managed scalable service that has a wide variety of uses.
01:05 A few examples include serving website content, storing data for archival and disaster recovery, and distributing large data objects to end users via Direct Download.
01:17 Cloud Storage’s primary use is whenever binary large-object storage (also known as a “BLOB”) is needed for online content such as videos and photos, for backup and archived data and for storage of intermediate results in processing workflows.
01:31 Cloud Storage files are organized into buckets.
01:35 A bucket needs a globally unique name and a specific geographic location for where it should be stored, and an ideal location for a bucket is where latency is minimized.
01:46 For example, if most of your users are in Europe, you probably want to pick a European location, so either a specific Google Cloud region in Europe, or else the EU multi-region.
01:57 The storage objects offered by Cloud Storage are immutable, which means that you do not edit them, but instead a new version is created with every change made.
02:07 Administrators have the option to either allow each new version to completely overwrite the older one, or to keep track of each change made to a particular object by enabling “versioning” within a bucket.
02:19 If you choose to use versioning, Cloud Storage will keep a detailed history of modifications -- that is, overwrites or deletes -- of all objects contained in that bucket.
02:29 If you don’t turn on object versioning, by default new versions will always overwrite older versions.
02:36 With object versioning enabled, you can list the archived versions of an object, restore an object to an older state, or permanently delete a version of an object, as needed.
02:47 In many cases, personally identifiable information may be contained in data objects, so controlling access to stored data is essential to ensuring security and privacy are maintained.
02:59 Using IAM roles and, where needed, access control lists (ACLs), organizations can conform to security best practices, which require each user to have access and permissions to only the resources they need to do their jobs, and no more than that.
03:15 There are a couple of options to control user access to objects and buckets.
03:20 For most purposes, IAM is sufficient.
03:23 Roles are inherited from project to bucket to object.
03:27 If you need finer control, you can create access control lists.
03:31 Each access control list consists of two pieces of information.
03:36 The first is a scope, which defines who can access and perform an action. This can be a specific user or group of users.
03:40 The second is a permission, which defines what actions can be performed, like read or write.
03:50 Because storing and retrieving large amounts of object data can quickly become expensive, Cloud Storage also offers lifecycle management policies.
04:00 For example, you could tell Cloud Storage to delete objects older than 365 days; or to delete objects created before January 1, 2013; or to keep only the 3 most recent versions of each object in a bucket that has versioning enabled.
04:16 Having this control ensures that you’re not paying for more than you actually need.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

### 1. Paradigma de Almacenamiento de Objetos (Object Storage)
* **Definición**: Arquitectura de almacenamiento de datos informáticos que gestiona la información como entidades atómicas empaquetadas denominadas **objetos**, en lugar de fragmentos de sectores de disco (**block storage** como Persistent Disk) o jerarquías de directorios con árboles de archivos (**file storage** como Filestore).
* **Anatomía de un Objeto**:
  1. **Payload Binario**: Datos reales en formato binario (imágenes, videos, audio, archivos comprimidos, volcados de bases de datos).
  2. **Metadatos Asociados**: Información contextual clave (fecha de creación, autor, tipo MIME/Content-Type, permisos de acceso y metadatos personalizados).
  3. **Identificador Global Único**: Clave direccionable en formato URL RESTful (ej. `https://storage.googleapis.com/<bucket>/<objeto>`), lo que proporciona interoperabilidad nativa e instantánea con la web y APIs HTTP.
* **Casos de Uso Principales**:
  * Distribución de contenido estático web (HTML, CSS, JavaScript, multimedia).
  * Repositorio de backups, copias de seguridad y recuperación ante desastres (Disaster Recovery).
  * Descargas directas a clientes de archivos de gran tamaño (Direct Download).
  * Almacenamiento intermedio de resultados en pipelines de procesamiento analítico y Big Data (Data Lakehouse).

### 2. Estructura y Organización: Buckets y Ubicación Geográfica
* **Buckets**: Contenedores fundamentales de objetos en Cloud Storage.
  * **Nombre Único Global**: El nombre de un bucket comparte un único espacio de nombres global en todo Google Cloud (similar a un nombre de dominio DNS). No puede repetirse en ningún proyecto ni organización a nivel mundial.
  * **Selección Geográfica de Ubicación**: Se fija en el momento de creación del bucket y determina dónde residirán físicamente los datos.
  * **Criterio de Latencia**: Debe seleccionarse para minimizar la distancia con los usuarios o aplicaciones que consumirán el servicio (ej. región específica en Europa como `europe-west1` o multi-región `EU` si los clientes están repartidos por todo el continente europeo).

### 3. Inmutabilidad y Versionado de Objetos (Object Versioning)
* **Principio de Inmutabilidad**: Los objetos almacenados en Cloud Storage son inmutables. Nunca se editan in-situ (*in-place*). Cualquier modificación genera un objeto nuevo.
* **Comportamiento por Defecto**:
  * Sin versionado: Toda nueva subida con la misma clave sobrescribe por completo la versión anterior sin conservar histórico.
* **Object Versioning Activado**:
  * Mantiene un historial detallado de todas las modificaciones (sobrescrituras y eliminaciones lógicas).
  * La versión activa se conoce como versión viva (*live version*).
  * Las versiones anteriores se conservan como versiones archivadas (*noncurrent/archived versions*) con un identificador de generación (`generation number`).
  * Permite listar versiones archivadas, restaurar un objeto a un estado previo exacto o eliminar versiones definitivamente.

### 4. Gobernanza de Seguridad y Control de Acceso: IAM vs ACLs
* **Principio de Mínimo Privilegio**: Restringir el acceso para que cada usuario o proceso posea exclusivamente los permisos necesarios para cumplir sus funciones operativas.
* **IAM (Identity and Access Management)**:
  * Mecanismo recomendado y suficiente para la gran mayoría de casos de uso empresariales.
  * Los roles se heredan de forma descendente en la jerarquía: **Proyecto → Bucket → Objeto**.
  * Con **Uniform Bucket-Level Access (UBLA)** se desactivan las ACLs individuales, unificando la administración de seguridad mediante IAM a nivel de bucket.
* **ACLs (Access Control Lists)**:
  * Proporcionan control fino y granular a nivel de objeto individual.
  * Cada entrada de ACL consta de dos componentes:
    1. **Scope (Ámbito)**: Define la entidad (usuario individual, grupo de Google, cuenta de servicio o dominio).
    2. **Permission (Permiso)**: Define la acción autorizada (ej. `READER`, `WRITER`, `OWNER`).

### 5. Políticas de Ciclo de Vida (Object Lifecycle Management)
* **Objetivo de Negocio**: Optimización continua de costos de almacenamiento para evitar pagar por datos redundantes o caducos.
* **Mecanismo**: Reglas declarativas evaluadas periódicamente que ejecutan acciones basadas en condiciones predefinidas:
  * *Acciones*: `Delete` (eliminar objeto) o `SetStorageClass` (degradar a Nearline, Coldline o Archive).
  * *Condiciones*:
    * Antigüedad del objeto (ej. objetos con más de 365 días: `Age > 365`).
    * Fecha de creación específica (ej. creados antes del 1 de enero de 2013: `createdBefore: 2013-01-01`).
    * Retención de versiones (ej. conservar únicamente las 3 versiones más recientes en buckets con versionado activado: `numNewerVersions: 3`).
    * Estado de la versión (versión viva vs versión archivada).

---

## 💡 Preguntas y Trampas Clave para el Examen Google Cloud ACE

1. **¿Qué sucede al modificar un objeto en Cloud Storage sin versionado habilitado?**
   * *Trampa de Examen*: Pensar que Cloud Storage actualiza fragmentos o bloques modificados dentro del archivo.
   * *Realidad Técnica*: Los objetos son inmutables; toda escritura con el mismo nombre reemplaza y destruye la versión anterior por completo a menos que `Object Versioning` esté explícitamente habilitado en el bucket.
2. **IAM vs ACLs en Cloud Storage**:
   * *Práctica Recomendada*: Habilitar **Uniform Bucket-Level Access (UBLA)**. Esto desactiva el uso de ACLs individuales y asegura que todos los permisos se gestionen uniformemente a nivel de bucket mediante políticas IAM heredadas.
3. **Restricción de Nombres de Buckets**:
   * El nombre de un bucket debe ser único a escala global en toda la plataforma Google Cloud, cumplir con estándares de nombrado DNS (minúsculas, números, guiones) y no contener información confidencial.


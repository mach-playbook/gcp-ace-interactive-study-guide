# Ingesta Cruda: Comparing storage options

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689576](https://www.skills.google/paths/8/course_templates/60/video/689576)  
**Video YouTube Oficial**: [Comparing storage options (jAPJ_aVxCbQ)](https://www.youtube.com/watch?v=jAPJ_aVxCbQ)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Lección**: 28 (Skills Video ID: `689576` | YouTube ID: `jAPJ_aVxCbQ`)  
**Puntos Acumulados**: 14,090  

---

## 📝 Transcripción Oficial Sanitizada

```text
00:00 Now that we’ve covered Google Cloud’s core storage options, let’s do a comparison to help highlight the most suitable service for a specific application or workflow.
00:10 Consider using Cloud Storage if you need to store immutable blobs larger than 10 megabytes, such as large images or movies.
00:18 This storage service provides petabytes of capacity with a maximum unit size of 5 terabytes per object.
00:26 Consider using Cloud SQL or Spanner if you need full SQL support for an online transaction processing system.
00:32 Cloud SQL provides up to 64 terabytes, depending on machine type, and Spanner provides petabytes.
00:39 Cloud SQL is best for web frameworks and existing applications, like storing user credentials and customer orders.
00:47 If Cloud SQL doesn’t fit your requirements because you need horizontal scalability, not just through read replicas, consider using Spanner.
00:57 Consider Firestore if you need massive scaling and predictability together with real time query results and offline query support.
01:05 This storage service provides terabytes of capacity with a maximum unit size of 1 megabyte per entity.
01:11 Firestore is best for storing, syncing, and querying data for mobile and web apps.
01:18 Finally, consider using Bigtable if you need to store a large number of structured objects.
01:24 Bigtable doesn’t support SQL queries, nor does it support multi-row transactions.
01:29 This storage service provides petabytes of capacity with a maximum unit size of 10 megabytes per cell and 100 megabytes per row.
01:38 Bigtable is best for analytical data with heavy read and write events, like AdTech, financial, or IoT data.
01:46 Depending on your application, it’s possible that you might use one, or several, of these services to do the job.
01:53 You may have noticed that BigQuery hasn’t been mentioned in this section of the course.
01:57 This is because it sits on the edge between data storage and data processing, and is covered in more depth in other courses.
02:04 The usual reason to store data in BigQuery is so you can use its big data analysis and interactive querying capabilities, but it’s not purely a data storage product.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

### 1. Matriz Canónica de Selección de Almacenamiento en Google Cloud

| Servicio | Tipo de Datos | Capacidad Máxima | Tamaño Máximo por Unidad | Modelo de Consulta / Transacciones | Caso de Uso Predilecto ACE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cloud Storage** | Binarios no estructurados (BLOBs inmutables > 10 MB) | Petabytes | **5 TB** por objeto | RESTful HTTP / SDK / gcloud (Sin SQL) | Imágenes de alta resolución, videos, copias de seguridad, data lakes. |
| **Cloud SQL** | Estructurados relacionales (OLTP) | Hasta **64 TB** (según máquina) | Limitado por tamaño de tabla del motor | SQL estándar (MySQL, PostgreSQL, SQL Server); ACID regional | CMS, ERP, CRM, comercio electrónico tradicional, credenciales de usuarios y pedidos. |
| **Cloud Spanner** | Estructurados relacionales (OLTP masivo) | Petabytes | Tablas distribuidas sin límite práctico | SQL ANSI 2011; ACID distribuido globalmente | Banca multinacional, sistemas de reservas globales y aplicaciones con más de 64 TB relacionales. |
| **Firestore** | Semi-estructurados (Documentos NoSQL) | Terabytes | **1 MB** por entidad/documento | NoSQL (Filtros, ordenación, listeners reactivos); ACID en transacciones | Aplicaciones móviles y web, perfiles de usuario, carritos de compra, sincronización offline. |
| **Cloud Bigtable** | Semi-estructurados / estructurados (NoSQL Columnar) | Petabytes | **10 MB** por celda / **100 MB** por fila | NoSQL (HBase API, búsquedas por Row Key); Atomicidad por fila única | Telemetría IoT, AdTech, cotizaciones financieras, series temporales de alta velocidad. |
| **BigQuery** | Estructurados / semi-estructurados (OLAP Analítico) | Petabytes | Particiones y tablas masivas | SQL ANSI; procesamiento distribuido interactivo masivo | Data warehousing empresarial, analítica de negocio, consultas interactivas complejas y ML. |

### 2. Dimensionamiento y Restricciones Técnicas por Unidad
* **Cloud Storage**: Tamaño máximo de **5 TB** por objeto individual. Aconsejado prioritariamente para blobs inmutables superiores a **10 MB** (imágenes pesadas, video, artefactos).
* **Firestore**: Límite estricto de **1 MB** por documento/entidad. Excelente para estructuras JSON compactas y árboles de subcolecciones.
* **Cloud Bigtable**: Límite de **10 MB por celda** individual y hasta **100 MB por fila completa**. No admite SQL ni transacciones que involucren múltiples filas (*multi-row transactions*).
* **Cloud SQL**: Techo físico de **64 TB** por instancia. Escalado horizontal limitado a réplicas de lectura de solo lectura.
* **Cloud Spanner**: Capacidad ilimitada de petabytes relacionales con escalado horizontal real (*scale-out*) tanto para lecturas como para escrituras concurrentes.

### 3. El Rol Especial de BigQuery
* **Frontera Almacenamiento vs Procesamiento**: BigQuery no es un producto de almacenamiento operativo puro; se ubica en la intersección entre almacenamiento masivo columnar y procesamiento analítico masivo paralelo (MPP).
* **Razón Primordial de Elección**: Se almacena información en BigQuery cuando el objetivo primordial es ejecutar **análisis de Big Data, minería de datos, BI y consultas SQL interactivas agregadas** sobre terabytes o petabytes, y no para servir peticiones transaccionales concurrentes de usuarios en una aplicación web/móvil.

---

## 💡 Preguntas y Trampas Clave para el Examen Google Cloud ACE

1. **Árbol de Decisión Rápido para el Examen ACE**:
   * *¿Los datos son relacionales con soporte transaccional ACID y SQL?*
     * Si requiere escala regional y < 64 TB → **Cloud SQL**.
     * Si requiere escala global multi-región, > 64 TB o escalado horizontal de escrituras → **Cloud Spanner**.
   * *¿Los datos son no estructurados (archivos, imágenes, backups, logs)?*
     * Objetos inmutables de hasta 5 TB accesibles vía URL → **Cloud Storage**.
   * *¿Los datos son NoSQL para aplicaciones web/móviles con sincronización?*
     * Documentos < 1 MB con listeners en tiempo real y soporte offline → **Firestore**.
   * *¿Los datos son NoSQL analíticos/operacionales de ultra-alta velocidad (> 1 TB)?*
     * Series temporales, IoT, sub-10ms sin joins ni multi-row ACID → **Cloud Bigtable**.
   * *¿Se requiere análisis exploratorio masivo o consultas OLAP ad-hoc con SQL?*
     * Data warehouse y analítica distribuida → **BigQuery**.

2. **Trampa de Tamaño por Documento en Firestore**:
   * Intentar guardar imágenes de 5 MB directamente como strings Base64 en un documento de Firestore falla porque el límite por documento es de **1 MB**. La arquitectura recomendada es almacenar la imagen en **Cloud Storage** y guardar en Firestore únicamente la URL y sus metadatos.


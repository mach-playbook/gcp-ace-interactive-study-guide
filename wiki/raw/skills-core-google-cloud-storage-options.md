# Ingesta Cruda: Google Cloud storage options

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689569](https://www.skills.google/course_templates/60/video/689569)  
**Video YouTube Oficial**: [Google Cloud storage options (8Dn-RAP7fzA)](https://www.youtube.com/watch?v=8Dn-RAP7fzA)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Lección**: 21 (Skills Video ID: `689569` | YouTube ID: `8Dn-RAP7fzA`)  
**Puntos Acumulados**: 14,020  

---

## 📝 Transcripción Oficial Sanitizada

```text
Every application needs to store data, like media to be streamed or perhaps even sensor data from devices, and different applications and workloads require different storage database solutions.
Google Cloud has storage options for structured, unstructured, transactional, and relational data.
In this section of the course, we’ll explore Google Cloud’s five core storage products: Cloud Storage, Cloud SQL, Spanner, Firestore, and Bigtable.
Depending on your application, you might use one or several of these services to do the job.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

1. **Propósito Universal del Almacenamiento en la Nube**:
   * Toda aplicación empresarial o de usuario final requiere persistir información: desde contenido multimedia de transmisión en continuo (*streaming*) hasta flujos masivos de telemetría de sensores IoT.
   * Diferentes perfiles de carga de trabajo (*workloads*), requisitos de latencia, consistencia y volumen demandan motores de almacenamiento especializados.

2. **Taxonomía de Datos en Google Cloud**:
   * **Datos No Estructurados (Unstructured Data):** Archivos binarios sin esquema rígido (imágenes, audio, video, instaladores, backups, logs en bruto).
   * **Datos Estructurados (Structured Data):** Información organizada bajo un esquema formal con tipos de campos bien delimitados (tablas relacionales, documentos jerárquicos).
   * **Datos Relacionales (Relational Data):** Tablas normalizadas con relaciones de claves foráneas y consultas complejas mediante lenguaje SQL estándar.
   * **Datos Transaccionales (Transactional Data):** Operaciones que exigen garantías estrictas ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad) para evitar inconsistencias financieras o de estado.
   * **Datos Analíticos y Series Temporales:** Grandes volúmenes de eventos secuenciales con escrituras masivas continuas y lecturas agregadas de ultra-alta velocidad.

3. **Los 5 Servicios Núcleo de Almacenamiento en Google Cloud**:
   * **Cloud Storage**: Almacenamiento de objetos binarios no estructurados escalable globalmente con durabilidad del 99.999999999% (11 nueves) y 4 clases de almacenamiento según frecuencia de acceso (Standard, Nearline, Coldline, Archive).
   * **Cloud SQL**: Base de datos relacional gestionada (MySQL, PostgreSQL, SQL Server) para transacciones ACID en un ámbito regional con conmutación por error automática (High Availability).
   * **Cloud Spanner**: Base de datos relacional distribuida a nivel planetario que combina consistencia externa fuerte con escala horizontal infinita para sistemas bancarios y multinacionales de misión crítica.
   * **Firestore**: Base de datos de documentos NoSQL serverless optimizada para desarrollo móvil y web con sincronización en tiempo real y soporte offline automático.
   * **Cloud Bigtable**: Base de datos NoSQL de columnas anchas (*wide-column*) de baja latencia consistente (< 10 ms) diseñada para petabytes de datos analíticos, streaming IoT y series temporales.

4. **Diseño Multi-Servicio (*Polyglot Persistence*)**:
   * Una arquitectura en Google Cloud raramente depende de un único motor de almacenamiento. Las soluciones modernas combinan múltiples servicios para optimizar costo y rendimiento:
     * *Ejemplo Arquitectónico:* Almacenar archivos multimedia en **Cloud Storage**, metadatos de usuarios y transacciones en **Cloud SQL**, y registros de telemetría en tiempo real en **Cloud Bigtable**.


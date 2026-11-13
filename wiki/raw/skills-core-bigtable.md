# Ingesta Cruda: Bigtable

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689575](https://www.skills.google/paths/8/course_templates/60/video/689575)  
**Video YouTube Oficial**: [Bigtable (bfztO0_4fhw)](https://www.youtube.com/watch?v=bfztO0_4fhw)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Lección**: 27 (Skills Video ID: `689575` | YouTube ID: `bfztO0_4fhw`)  
**Puntos Acumulados**: 14,080  

---

## 📝 Transcripción Oficial Sanitizada

```text
00:00 The last of Google Cloud’s core storage options we’re going to explore is Bigtable.
00:06 Bigtable is Google's NoSQL big data database service.
00:11 It's the same database that powers many core Google services, including Search, Analytics, Maps, and Gmail.
00:18 Bigtable is designed to handle massive workloads at consistent low latency and high throughput, so it's a great choice for both operational and analytical applications, including Internet of Things, user analytics, and financial data analysis.
00:33 When deciding which storage option is best, customers often choose Bigtable if: They’re working with more than 1TB of semi-structured or structured data.
00:43 Data is fast with high throughput, or it’s rapidly changing.
00:46 They’re working with NoSQL data.
00:49 This usually means transactions where strong relational semantics are not required.
00:54 Data is a time-series or has natural semantic ordering.
00:57 They’re working with big data, running asynchronous batch or synchronous real-time processing on the data.
01:04 Or they’re running machine learning algorithms on the data.
01:08 Bigtable can interact with other Google Cloud services and third-party clients.
01:14 Using APIs, data can be read from and written to Bigtable through a data service layer like Managed VMs, the HBase REST Server, or a Java Server using the HBase client.
01:27 Typically this is used to serve data to applications, dashboards, and data services.
01:34 Data can also be streamed in through a variety of popular stream processing frameworks like Dataflow Streaming, Spark Streaming, and Storm.
01:43 And if streaming is not an option, data can also be read from and written to Bigtable through batch processes like Hadoop MapReduce, Dataflow, or Spark.
01:53 Often, summarized or newly calculated data is written back to Bigtable or to a downstream database.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

### 1. Definición y Arquitectura de Cloud Bigtable
* **Definición**: Motor de base de datos NoSQL de columnas anchas (*wide-column store*), totalmente gestionado, masivamente escalable y optimizado para cargas de trabajo analíticas y operacionales de Big Data con ultra-baja latencia y alto rendimiento (*throughput*).
* **Infraestructura Probada de Google**: Es la tecnología de persistencia subyacente que alimenta los servicios más demandantes de Google, incluidos **Google Search**, **Google Analytics**, **Google Maps** y **Gmail**.
* **Latencia Predecible y Alto Throughput**: Proporciona latencias de lectura y escritura predecibles inferiores a **10 milisegundos (sub-10ms)** a escala de petabytes.
* **Separación de Cómputo y Almacenamiento**: Los nodos de cómputo de Bigtable (que enrutan y gestionan peticiones) están desacoplados del almacenamiento persistente (Colossus), lo que permite escalar el procesamiento en segundos sin mover ni reequilibrar datos físicamente.

### 2. Los 6 Criterios de Selección Oficiales para Bigtable (Reglas de Decisión ACE)
Se recomienda elegir Cloud Bigtable cuando se cumplen las siguientes condiciones de diseño:
1. **Volumen de Datos Mayor a 1 TB**: Bigtable está optimizado para grandes volúmenes de datos (más de 1 TB hasta petabytes). Para conjuntos de datos inferiores a 1 TB, el costo base por clúster no resulta costo-eficiente frente a otras opciones como Firestore o Cloud SQL.
2. **Alta Velocidad y Elevado Rendimiento (*High Throughput*)**: Flujos masivos y continuos de escrituras y lecturas que cambian rápidamente (cientos de miles a millones de operaciones por segundo).
3. **Datos NoSQL sin Semántica Relacional Rígida**: Transacciones simples por clave de fila (*row key*); no requiere soporte de transacciones multi-tabla ACID complejas ni operaciones JOIN relacionales.
4. **Datos de Series Temporales u Ordenación Semántica Natural**: Telemetría continua, eventos de sensores IoT, cotizaciones financieras por segundo, clics web donde la información se ordena naturalmente de forma cronológica o secuencial.
5. **Procesamiento Híbrido (Batch y Streaming en Tiempo Real)**: Soporte integrado para ingesta continua en tiempo real y lectura masiva por lotes para analítica.
6. **Entrenamiento y Ejecución de Modelos de Machine Learning**: Servir características (*feature store*) a modelos de ML con latencias ultrabajas de inferencia.

### 3. Interoperabilidad con el Ecosistema Open Source y Google Cloud
* **Compatibilidad con Apache HBase**: Bigtable es compatible a nivel de API con el estándar abierto **Apache HBase**, lo que permite migrar aplicaciones existentes desarrolladas para el ecosistema Hadoop/HBase sin reescribir la lógica de datos.
* **Ingesta en Tiempo Real (*Streaming*)**: Integración nativa con pipelines de streaming como **Cloud Dataflow**, **Apache Spark Streaming** y **Apache Storm**.
* **Procesamiento por Lotes (*Batch*)**: Soporte para análisis distribuido masivo con **Cloud Dataproc (Hadoop MapReduce / Apache Spark)** y **Dataflow Batch**.
* **Capa de Servicios y Servido a Clientes**: Lectura y escritura rápida mediante APIs REST, clientes Java y servidores intermedios para alimentar paneles de control (*dashboards*), microservicios en Compute Engine/GKE y almacenamiento aguas abajo (*downstream databases* como BigQuery o Cloud Storage).

---

## 💡 Preguntas y Trampas Clave para el Examen Google Cloud ACE

1. **La Regla del Límite de 1 TB**:
   * *Trampa de Examen*: Un escenario plantea una aplicación que recopila 150 GB de registros de telemetría de dispositivos y pregunta si debe usarse Cloud Bigtable para maximizar el rendimiento.
   * *Respuesta Correcta*: **No**. Para conjuntos de datos inferiores a 1 TB, Bigtable es desaconsejado por costo; se debe evaluar **Firestore** o **Cloud SQL**. Bigtable es la opción correcta cuando el volumen supera **1 TB a Petabytes** con escrituras masivas sub-10ms.
2. **Diseño de la Clave de Fila (Row Key) y Prevención de Puntos Calientes (Hotspotting)**:
   * *Clave de Examen*: En Bigtable, las filas se ordenan lexicográficamente por la clave de fila (*row key*).
   * *Antipatrón*: Usar una marca de tiempo secuencial pura (`timestamp`) como clave de fila provoca que todas las escrituras se concentren en un solo nodo del clúster (*hotspotting*).
   * *Mejor Práctica*: Prefijar la clave de fila con un identificador o hash de dispositivo (ej. `sensorId#timestamp`) para distribuir uniformemente la carga entre todos los nodos del clúster.
3. **Bigtable vs BigQuery**:
   * *Cloud Bigtable*: Base de datos NoSQL operacional y analítica de ultra-baja latencia (< 10 ms) para ingesta masiva de IoT y servido de datos a aplicaciones en vivo.
   * *BigQuery*: Data warehouse empresarial completamente administrado para análisis SQL ad-hoc, consultas OLAP complejas, agregaciones sobre petabytes e inteligencia de negocio, con latencias de segundos a minutos (no orientado a servir transacciones operacionales sub-10ms).


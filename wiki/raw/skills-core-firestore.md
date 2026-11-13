# Ingesta Cruda: Firestore

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689574](https://www.skills.google/paths/8/course_templates/60/video/689574)  
**Video YouTube Oficial**: [Firestore (Q1kSFl1LYMc)](https://www.youtube.com/watch?v=Q1kSFl1LYMc)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Lección**: 26 (Skills Video ID: `689574` | YouTube ID: `Q1kSFl1LYMc`)  
**Puntos Acumulados**: 14,070  

---

## 📝 Transcripción Oficial Sanitizada

```text
00:00 Google Cloud’s fourth core storage option is Firestore.
00:04 Firestore is a flexible, horizontally scalable, NoSQL cloud database for mobile, web, and server development.
00:13 With Firestore, data is stored in documents and then organized into collections.
00:18 Documents can contain complex nested objects in addition to subcollections.
00:21 Each document contains a set of key-value pairs.
00:22 For example, a document to represent a user has the keys for the firstname and lastname with the associated values.
00:26 Firestore’s NoSQL queries can then be used to retrieve individual, specific documents or to retrieve all the documents in a collection that match your query parameters.
00:34 Queries can include multiple, chained filters and combine filtering and sorting options.
00:39 They're also indexed by default, so query performance is proportional to the size of the result set, not the dataset.
00:47 Firestore uses data synchronization to update data on any connected device.
00:52 However, it's also designed to make simple, one-time fetch queries efficiently.
00:58 It caches data that an app is actively using, so the app can write, read, listen to, and query data even if the device is offline.
01:07 When the device comes back online, Firestore synchronizes any local changes back to Firestore.
01:13 Firestore leverages Google Cloud’s powerful infrastructure: automatic multi-region data replication, strong consistency guarantees, atomic batch operations, and real transaction support.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

### 1. Definición y Modelo de Datos de Firestore
* **Definición**: Base de datos NoSQL serverless orientada a documentos, elástica y escalable horizontalmente de forma automática, optimizada para desarrollo de aplicaciones móviles, web y backend.
* **Modelo Jerárquico de Documentos**:
  * **Documentos**: Registros ligeros que contienen pares clave-valor (tipos de datos primitivos como cadenas, números, booleanos, marcas de tiempo, arrays y objetos anidados complejos).
  * **Colecciones**: Contenedores ordenados de documentos. Un documento no puede existir de forma huérfana; siempre debe pertenecer a una colección.
  * **Subcolecciones**: Colecciones anidadas dentro de un documento individual para modelar relaciones jerárquicas y estructuras de datos relacionales sin desnormalizaciones extremas.

### 2. Consultas NoSQL e Indexación Automática
* **Rendimiento Proporcional al Conjunto de Resultados**:
  * En Firestore, **todos los campos de un documento se indexan automáticamente por defecto**.
  * El rendimiento de cualquier consulta depende estrictamente del **tamaño del conjunto de resultados devuelto**, y **NO** del tamaño total de la base de datos (una consulta sobre 10 resultados tarda exactamente lo mismo si la colección tiene 100 documentos o 100 millones de documentos).
* **Filtros Encadenados y Ordenación**: Permite consultas con múltiples filtros combinados (`where`), límites (`limit`) y ordenación ascendente/descendente (`orderBy`).

### 3. Sincronización en Tiempo Real y Modo Offline
* **Escucha de Cambios en Tiempo Real (Real-time Listeners)**: Los clientes web y móviles pueden suscribirse a documentos o consultas mediante listeners reactivos; cualquier cambio en la base de datos se transmite instantáneamente a todos los dispositivos conectados mediante WebSockets/HTTP2.
* **Soporte Offline Nativo**:
  * Firestore incluye una capa de caché local persistente en el dispositivo cliente.
  * La aplicación puede leer, escribir, consultar y escuchar cambios sin conexión a internet.
  * Al restablecerse la conectividad, Firestore sincroniza automáticamente las escrituras locales pendientes con los servidores en la nube mediante resolución de conflictos.
* **Consultas Puntuales (One-time fetch)**: Además de streaming reactivo en tiempo real, soporta consultas HTTP REST/gRPC tradicionales eficientes de bajo consumo para backends de servidor.

### 4. Infraestructura, Resiliencia y Garantías ACID
* **Replicación Multi-Región Automática**: Sincronización transparente de datos en múltiples zonas geográficas con disponibilidad de hasta el 99.999% en configuraciones multi-región.
* **Consistencia Fuerte (Strong Consistency)**: A diferencia de otros motores NoSQL que solo garantizan consistencia eventual, Firestore ofrece consistencia fuerte en lecturas y consultas.
* **Transacciones y Operaciones Atómicas**:
  * **Operaciones por Lotes (Batched Writes)**: Permite agrupar múltiples escrituras que se confirman de forma atómica (todas se completan o ninguna se aplica).
  * **Transacciones ACID Reales**: Lecturas y escrituras atómicas protegidas contra condiciones de carrera mediante bloqueos optimistas.

---

## 💡 Preguntas y Trampas Clave para el Examen Google Cloud ACE

1. **La Regla de Decisión "Móvil / Web + Tiempo Real + Modo Offline"**:
   * *Pregunta Clave de Certificación*: "Una empresa está desarrollando una aplicación móvil para repartidores en ruta que a menudo transitan por zonas rurales sin cobertura celular. La app requiere guardar datos de entregas localmente y sincronizarlos automáticamente en cuanto recuperen señal, además de notificar cambios en tiempo real al panel central. ¿Qué servicio de almacenamiento debe implementarse?"
   * *Respuesta Correcta*: **Firestore**.
2. **Indexación y Rendimiento en Firestore**:
   * *Trampa de Examen*: Pensar que a medida que la base de datos crece en millones de registros, las consultas simples se vuelven lentas y requieren mantenimiento manual de índices o sharding.
   * *Realidad Técnica*: Gracias a la indexación automática por defecto, el tiempo de respuesta de una consulta depende del número de resultados solicitados, no del tamaño de la colección.
3. **Firestore vs Cloud Bigtable**:
   * *Firestore*: Orientado a aplicaciones cliente móviles/web, documentos JSON jerárquicos, sincronización offline y transacciones ACID.
   * *Cloud Bigtable*: Orientado a petabytes de analítica masiva, series temporales, eventos de sensores IoT continuos y latencias sub-10ms con la API de Apache HBase (sin soporte nativo de listeners cliente en tiempo real ni sincronización offline).


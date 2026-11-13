# Ingesta Cruda: Cloud Storage: Storage classes and data transfer

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689571](https://www.skills.google/paths/8/course_templates/60/video/689571)  
**Video YouTube Oficial**: [Cloud Storage: Storage classes and data transfer (A5a8sPL6PjY)](https://www.youtube.com/watch?v=A5a8sPL6PjY)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Lección**: 23 (Skills Video ID: `689571` | YouTube ID: `A5a8sPL6PjY`)  
**Puntos Acumulados**: 14,040  

---

## 📝 Transcripción Oficial Sanitizada

```text
00:00 There are four primary storage classes in Cloud Storage.
00:04 The first is Standard Storage.
00:07 Standard Storage is considered best for frequently accessed, or “hot,” data.
00:11 It’s also great for data that’s stored for only brief periods of time.
00:16 The second storage class is Nearline Storage.
00:19 This is best for storing infrequently accessed data, like reading or modifying data on average once a month or less.
00:26 Examples might include data backups, long-tail multimedia content, or data archiving.
00:34 The third storage class is Coldline Storage.
00:37 This is also a low-cost option for storing infrequently accessed data.
00:41 However, as compared to Nearline Storage, Coldline Storage is meant for reading or modifying data, at most, once every 90 days.
00:50 And the fourth storage class is Archive Storage.
00:54 This is the lowest-cost option, used ideally for data archiving, online backup, and disaster recovery.
01:01 It’s the best choice for data that you plan to access less than once a year, because it has higher costs for data access and operations and a 365-day minimum storage duration.
01:13 Although each of these four classes has differences, it’s worth noting there are several characteristics that apply across all of these storage classes.
01:23 These include: Unlimited storage with no minimum object size requirement, worldwide accessibility and locations, low latency and high durability, a uniform experience, which extends to security, tools, and APIs, and geo-redundancy if data is stored in a multi-region or dual-region.
01:46 This means placing physical servers in geographically diverse data centers to protect against catastrophic events and natural disasters, and load-balancing traffic for optimal performance.
01:58 Cloud Storage also provides a feature called Autoclass, which automatically transitions objects to appropriate storage classes based on each object's access pattern.
02:09 The feature moves data that is not accessed to colder storage classes to reduce storage cost and moves data that is accessed to Standard storage to optimize future accesses.
02:20 Autoclass simplifies and automates cost saving for your Cloud Storage data.
02:26 Cloud Storage has no minimum fee because you pay only for what you use, and prior provisioning of capacity isn’t necessary.
02:34 And from a security perspective, Cloud Storage always encrypts data on the server side, before it’s written to disk, at no additional charge.
02:43 Data traveling between a customer’s device and Google is encrypted by default using HTTPS/TLS, which is Transport Layer Security.
02:53 Regardless of which storage class you choose, there are several ways to bring data into Cloud Storage.
02:58 Many customers simply carry out their own online transfer using gcloud storage, which is the Cloud Storage command from the Cloud SDK.
03:07 Data can also be moved in by using a drag and drop option in the Cloud Console, if accessed through the Google Chrome web browser.
03:15 But what if you have to upload terabytes or even petabytes of data?
03:20 Storage Transfer Service enables you to import large amounts of online data into Cloud Storage quickly and cost-effectively.
03:28 The Storage Transfer Service lets you schedule and manage batch transfers to Cloud Storage from another cloud provider, from a different Cloud Storage region, or from an HTTP(S) endpoint.
03:38 And then there is the Transfer Appliance, which is a rackable, high-capacity storage server that you lease from Google Cloud.
03:47 You connect it to your network, load it with data, and then ship it to an upload facility where the data is uploaded to Cloud Storage.
03:55 You can transfer up to a petabyte of data on a single appliance.
04:00 Cloud Storage’s tight integration with other Google Cloud products and services means that there are many additional ways to move data into the service.
04:08 For example, you can import and export tables to and from both BigQuery and Cloud SQL.
04:15 You can also store App Engine logs, Firestore backups, and objects used by App Engine applications, like images.
04:24 Cloud Storage can also store instance startup scripts, Compute Engine images, and objects used by Compute Engine applications.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

### 1. Las 4 Clases de Almacenamiento en Cloud Storage

| Clase de Almacenamiento | Frecuencia de Acceso | Permanencia Mínima | Coste de Reposo vs Operación | Casos de Uso Predilectos ACE |
| :--- | :--- | :--- | :--- | :--- |
| **Standard Storage** | Frecuente (*Hot Data*) o periodos muy breves de tiempo | Sin compromiso mínimo (0 días) | Coste de almacenamiento por GB más alto; coste de lectura/operación más bajo; sin coste por recuperación (*retrieval fee*) | Sitios web activos, streaming continuo, juegos online, datos en procesamiento activo. |
| **Nearline Storage** | Infrecuente: promedio de 1 vez al mes o menos | 30 días | Coste de reposo bajo; aplica tarifa por recuperación y penalización por borrado antes de 30 días | Copias de seguridad mensuales, contenido multimedia de cola larga (*long-tail*), informes periódicos. |
| **Coldline Storage** | Muy infrecuente: promedio de 1 vez cada 90 días o menos | 90 días | Coste de reposo muy bajo; tarifa por recuperación más alta; penalización por borrado antes de 90 días | Backups trimestrales, recuperación ante desastres (DR) secundaria, archivado intermedio. |
| **Archive Storage** | Rara vez: menos de 1 vez al año | 365 días | Coste de reposo ultrabajo (el menor de todos); coste de lectura y operaciones más elevado; penalización antes de 365 días | Preservación regulatoria a largo plazo (cumplimiento legal/fiscal), copias de seguridad forenses históricas. |

### 2. Atributos Universales Compartidos por Todas las Clases
A diferencia de otros proveedores cloud donde las clases frías tienen latencias de horas para recuperar datos (como AWS S3 Glacier tradicional), en Google Cloud Storage **todas las clases comparten características clave idénticas**:
* **Capacidad Ilimitada**: Sin límites de tamaño total ni cuotas fijas previas de aprovisionamiento.
* **Sin Tamaño Mínimo de Objeto**: No se impone un tamaño de archivo mínimo para su almacenamiento.
* **Baja Latencia de Acceso**: Latencia de primer byte en el rango de milisegundos (ms) para **todas** las clases, incluyendo Coldline y Archive (¡no requiere proceso de descongelación ni precalentamiento!).
* **Durabilidad Extrema**: 99.999999999% (11 nueves) anual en todas las clases.
* **Experiencia y APIs Uniformes**: Misma API RESTful, mismas herramientas (`gcloud storage`), mismos permisos IAM y políticas de seguridad sin importar la clase del objeto.
* **Geo-redundancia**: Si el bucket es Multi-Region o Dual-Region, los datos se distribuyen automáticamente en centros de datos físicamente separados para soportar desastres naturales y optimizar el enrutamiento.

### 3. Autoclass: Optimización Automática de Costos
* **Definición**: Funcionalidad nativa a nivel de bucket que automatiza la transición de clases de almacenamiento basándose en el historial de accesos de cada objeto individual.
* **Mecánica Bidireccional**:
  * **Datos inactivos / no leídos**: Se degradan progresivamente a clases más frías (Nearline → Coldline → Archive) para reducir drásticamente el costo de almacenamiento por GB/mes.
  * **Datos accedidos / leídos**: Si un objeto en clase fría es consultado, Autoclass lo promueve inmediatamente a **Standard Storage** para optimizar futuros accesos sin penalizaciones continuas de recuperación.
* **Valor de Negocio**: Elimina la necesidad de diseñar, ajustar y auditar complejas reglas manuales de ciclo de vida en buckets con patrones de acceso variables o impredecibles.

### 4. Seguridad y Cifrado por Defecto
* **Cifrado en Reposo (Server-Side Encryption)**: Todos los objetos se cifran automáticamente del lado del servidor antes de escribirse a disco mediante claves gestionadas por Google (Google-Managed Encryption Keys - GMEK) sin coste adicional. Opcionalmente admite Customer-Managed Encryption Keys (CMEK con Cloud KMS) o Customer-Supplied Encryption Keys (CSEK).
* **Cifrado en Tránsito**: Todo el tráfico entre clientes y los endpoints de Google viaja cifrado por defecto mediante protocolos seguros HTTPS / TLS (Transport Layer Security).

### 5. Mecanismos de Transferencia de Datos hacia Cloud Storage

| Mecanismo de Transferencia | Ancho de Banda / Volumen Recomendado | Origen Soportado | Características Operativas |
| :--- | :--- | :--- | :--- |
| **`gcloud storage` / CLI Cloud SDK** | Operaciones diarias, pipelines ad-hoc, volúmenes de megabytes a pocos terabytes | Local, scripts, VMs | Transferencia paralela multi-hilo nativa por línea de comandos; soporta `cp`, `rsync`, `mv`. |
| **Cloud Console (Drag and Drop)** | Pruebas rápidas, desarrollo interactivo, pocos gigabytes | Navegador Google Chrome | Carga visual directa desde el explorador arrastrando archivos o carpetas. |
| **Storage Transfer Service** | Grandes volúmenes online (Terabytes a Petabytes masivos) | AWS S3, Azure Blob Storage, otros buckets/regiones de Cloud Storage, endpoints HTTP(S), on-premises vía agentes | Servicio administrado para programar y automatizar transferencias batch recurrentes a gran escala; no consume recursos de computación del cliente. |
| **Transfer Appliance** | Migraciones masivas offline cuando el ancho de banda de red es insuficiente (decenas de Terabytes a Petabytes) | Datacenter on-premises local | Servidor físico montable en rack arrendado a Google Cloud; se conecta a la red corporativa, se cargan los datos (hasta 1 PB por equipo) y se envía físicamente por paquetería segura a un centro de carga de Google. |

### 6. Integración Transversal de Cloud Storage en el Ecosistema GCP
Cloud Storage actúa como el sustrato central (*data backbone*) para múltiples servicios:
* **BigQuery & Cloud SQL**: Exportación e importación de volcados de datos, tablas SQL y archivos Parquet/CSV.
* **Compute Engine**: Almacenamiento centralizado de scripts de inicio (*startup scripts*), imágenes personalizadas del sistema operativo y metadatos de aprovisionamiento.
* **App Engine & Cloud Run**: Almacenamiento de archivos multimedia estáticos, dependencias y logs del sistema.
* **Firestore**: Repositorio de backups periódicos y exportaciones de colecciones completas de documentos.

---

## 💡 Trampas de Examen y Claves para la Certificación Google Cloud ACE

1. **Latencia de Recuperación en Clases Frías**:
   * *Trampa de Examen*: Asumir que Archive o Coldline requieren horas para desbloquear los datos (como en servicios de la competencia).
   * *Realidad Técnica*: En Google Cloud, la latencia de acceso a objetos en Archive o Coldline es de **milisegundos**, idéntica a Standard Storage. La penalización es puramente financiera (coste por GB recuperado y permanencia mínima).
2. **Cuándo usar Storage Transfer Service vs Transfer Appliance**:
   * *Storage Transfer Service*: Ideal para transferir datos online desde AWS S3, Azure o entre buckets de GCP por red.
   * *Transfer Appliance*: Opción obligatoria cuando el volumen de datos (Petabytes) tardaría semanas o meses en transferirse por el enlace de internet corporativo disponible (transferencia física segura).
3. **Penalización por Borrado Prematuro (Early Deletion Fee)**:
   * Si eliminas o sobrescribes un objeto en Nearline antes de 30 días, en Coldline antes de 90 días o en Archive antes de 365 días, Google Cloud factura el prorrateo de los días restantes hasta completar el plazo mínimo estipulado.


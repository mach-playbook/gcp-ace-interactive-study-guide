# Ingesta Cruda: Cuestionario Oficial: Quiz Módulo 4 (Storage in the Cloud)

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Quiz 689578](https://www.skills.google/paths/8/course_templates/60/quizzes/689578)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Evaluación**: Quiz Módulo 4 (Quiz ID: `689578`)  
**Puntaje Mínimo de Aprobación (Passing Score)**: 66%  
**Puntos Acumulados**: 14,100  

---

## 📝 Banco de Preguntas y Respuestas Oficiales Sanitizadas

### Pregunta 1
* **Enunciado**: Which storage use case is best suited for Google Cloud Storage?
* **Opciones**:
  * Running transactional relational database management system (RDBMS) workloads.
  * Serving as an enterprise data warehouse for complex SQL analytics.
  * Storing unstructured data that requires high durability and availability.
  * Hosting the root file system of a Compute Engine virtual machine instance.
* **Respuesta Correcta**: Storing unstructured data that requires high durability and availability.
* **Justificación Oficial**: Cloud Storage es el servicio de almacenamiento de objetos no estructurados de Google Cloud diseñado para proporcionar una durabilidad anual del 99.999999999% (11 nueves) y alta disponibilidad global, ideal para archivos multimedia, copias de seguridad y lagos de datos.
* **Análisis de Opciones Incorrectas**:
  * *RDBMS workloads*: Requiere Cloud SQL o Cloud Spanner para soporte transaccional ACID relacional.
  * *Enterprise data warehouse*: Requiere BigQuery para análisis y consultas SQL analíticas sobre petabytes.
  * *Root file system de Compute Engine*: Requiere almacenamiento en bloques mediante Persistent Disk o Hyperdisk.

---

### Pregunta 2
* **Enunciado**: For what primary use case should an organization choose the Coldline storage class in Cloud Storage?
* **Opciones**:
  * To minimize overall costs for data that is read and updated frequently.
  * To minimize monthly storage costs for data accessed less than once a quarter.
  * To execute faster data transfers using a dedicated storage API.
  * To apply stricter access control and encryption mechanisms to sensitive data.
* **Respuesta Correcta**: To minimize monthly storage costs for data accessed less than once a quarter.
* **Justificación Oficial**: La clase Coldline Storage ofrece tarifas de reposo sustancialmente más bajas por gigabyte al mes para datos que se prevé consultar a lo sumo una vez cada 90 días (menos de una vez por trimestre). Aplica un compromiso de permanencia mínima de 90 días y tarifas de recuperación.
* **Análisis de Opciones Incorrectas**:
  * *Data read/updated frequently*: Demanda Standard Storage, que no cobra tarifas de recuperación ni impone permanencias mínimas.
  * *Faster data transfers / dedicated API*: Falso; todas las clases de Cloud Storage utilizan la misma API RESTful, las mismas herramientas CLI (`gcloud storage`) y devuelven el primer byte con latencia en milisegundos.
  * *Stricter access control / encryption*: Falso; las políticas de seguridad (IAM, ACLs, UBLA) y los mecanismos de cifrado en reposo (GMEK/CMEK) son idénticos y homogéneos para todas las clases de almacenamiento.

---

### Pregunta 3
* **Enunciado**: A company requires a relational database service that can scale horizontally to petabytes of data while maintaining high availability. Which Google Cloud service meets this requirement?
* **Opciones**:
  * Spanner
  * Firestore
  * Cloud SQL
  * Bigtable
* **Respuesta Correcta**: Spanner
* **Justificación Oficial**: Cloud Spanner es el único motor relacional completamente gestionado de Google Cloud que proporciona compatibilidad con lenguaje SQL y garantías transaccionales ACID distribuidas con escalado horizontal real (*scale-out*) capaz de gestionar petabytes de datos, junto con una disponibilidad líder de hasta 99.999% en configuraciones multi-región.
* **Análisis de Opciones Incorrectas**:
  * *Firestore*: Es una base de datos NoSQL de documentos, no una base de datos relacional.
  * *Cloud SQL*: Es un motor relacional tradicional que escala verticalmente (*scale-up*) y posee un límite estricto de capacidad de 64 TB por instancia.
  * *Bigtable*: Es una base de datos NoSQL columnar de baja latencia para analítica masiva y series temporales, pero carece de modelo relacional y de soporte SQL estándar.


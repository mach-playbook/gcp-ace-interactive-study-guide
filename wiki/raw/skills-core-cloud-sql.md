# Ingesta Cruda: Cloud SQL

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689572](https://www.skills.google/paths/8/course_templates/60/video/689572)  
**Video YouTube Oficial**: [Cloud SQL (yE-k0odGRzk)](https://www.youtube.com/watch?v=yE-k0odGRzk)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Lección**: 24 (Skills Video ID: `689572` | YouTube ID: `yE-k0odGRzk`)  
**Puntos Acumulados**: 14,050  

---

## 📝 Transcripción Oficial Sanitizada

```text
00:00 Google Cloud’s second core storage option is Cloud SQL.
00:04 Cloud SQL offers fully managed relational databases, including Cloud SQL for MySQL, Cloud SQL for PostgreSQL, and Cloud SQL for SQL Server as a service.
00:15 It’s designed to hand off mundane, but necessary and often time-consuming, tasks to Google— like applying patches and updates, managing backups, and configuring replications—so your focus can be on building great applications.
00:31 Cloud SQL doesn't require any software installation or maintenance.
00:35 It can scale up to 128 processor cores, 864 GB of RAM, and 64 TB of storage.
00:44 It supports automatic replication scenarios, such as from a Cloud SQL primary instance, an external primary instance, and external MySQL instances.
00:56 Cloud SQL supports managed backups, so backed-up data is securely stored and accessible if a restore is required.
01:03 The cost of an instance covers seven backups.
01:06 Cloud SQL encrypts customer data when on Google’s internal networks and when stored in database tables, temporary files, and backups.
01:15 And it includes a network firewall, which controls network access to each database instance.
01:22 A benefit of Cloud SQL instances is that they are accessible by other Google Cloud services, and even external services.
01:29 Cloud SQL can be used with App Engine using standard drivers like Connector/J for Java or MySQLdb for Python.
01:38 Compute Engine instances can be authorized to access Cloud SQL instances and configure the Cloud SQL instance to be in the same zone as your virtual machine.
01:48 Cloud SQL also supports other applications and tools that you might use, like SQL Workbench, Toad, and other external applications using standard MySQL drivers.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

### 1. Definición y Propósito Arquitectónico de Cloud SQL
* **Definición**: Servicio de base de datos relacional completamente gestionado (*Database-as-a-Service - DBaaS*) que soporta tres motores líderes del mercado:
  1. **Cloud SQL for MySQL** (5.6, 5.7, 8.0, 8.4)
  2. **Cloud SQL for PostgreSQL** (9.6 hasta versiones actuales 15/16/17)
  3. **Cloud SQL for SQL Server** (2017, 2019, 2022 en ediciones Express, Web, Standard, Enterprise)
* **Descarga de Responsabilidad Operativa (Managed Service)**:
  * Google Cloud asume las tareas administrativas rutinarias de infraestructura: aplicación de parches de seguridad y actualizaciones del motor, gestión automatizada de copias de seguridad (backups), aprovisionamiento de almacenamiento, configuración de conmutación por error (*High Availability failover*) y réplicas de lectura.
  * No requiere instalación de software, aprovisionamiento manual de SO ni mantenimiento de licencias (en MySQL/PostgreSQL; SQL Server incluye licenciamiento administrado).

### 2. Capacidad y Límites de Escalado Vertical (*Scale-up*)
* **Cómputo Máximo**: Hasta **128 núcleos vCPU**.
* **Memoria RAM**: Hasta **864 GB de RAM**.
* **Almacenamiento Máximo**: Hasta **64 TB de almacenamiento** (discos Persistent Disk SSD o HDD, con capacidad de auto-incremento de almacenamiento automático sin tiempo de inactividad cuando el espacio libre cae por debajo de umbrales críticos).

### 3. Escenarios de Replicación y Alta Disponibilidad (HA)
* **Replicación Automática**:
  * **Réplicas de lectura (Read Replicas)**: Distribuyen el tráfico de consultas de solo lectura para descargar a la instancia primaria y pueden ubicarse en la misma región o entre regiones (*Cross-Region Replicas*) para reducir latencias globales o servir como recuperación ante desastres (DR).
  * **Replicación desde instancias externas**: Admite flujos de migración y réplica continua desde bases de datos primarias externas (on-premises u otras nubes) hacia Cloud SQL mediante Database Migration Service (DMS).
  * **Replicación hacia instancias externas**: Cloud SQL puede actuar como servidor primario y replicar cambios hacia bases de datos MySQL/PostgreSQL externas.
* **Alta Disponibilidad Regional (High Availability - HA)**:
  * Despliegue de una instancia primaria en una zona y una instancia en espera (*standby replica*) en una zona diferente dentro de la misma región con replicación síncrona a nivel de disco persistente regional.
  * Failover automático en menos de 60 segundos si la zona primaria sufre una degradación.

### 4. Gestión de Respaldos (Managed Backups) y Retención
* **Copias de Seguridad Automatizadas**:
  * Cloud SQL realiza copias incrementales diarias sin interrumpir las transacciones ni bloquear las tablas.
  * **Inclusión en el coste**: El coste base de la instancia cubre un historial predeterminado de **7 respaldos automatizados** retenidos de forma segura.
* **Restauración a un Punto en el Tiempo (PITR - Point-in-Time Recovery)**:
  * Mediante el registro de transacciones (*binary logs* en MySQL, *write-ahead logs - WAL* en PostgreSQL), permite restaurar el estado exacto de la base de datos hasta un segundo específico.

### 5. Seguridad, Cifrado y Control de Red
* **Cifrado Integral**:
  * **En reposo**: Todos los datos almacenados en tablas de base de datos, archivos temporales y copias de seguridad se cifran automáticamente mediante claves gestionadas por Google o llaves CMEK (Cloud KMS).
  * **En tránsito**: El tráfico a través de las redes internas de Google y conexiones de clientes viaja cifrado de forma predeterminada mediante SSL/TLS.
* **Cortafuegos de Red y Mecanismos de Conexión**:
  1. **Redes Autorizadas (Authorized Networks)**: Reglas de firewall a nivel de instancia que permiten el acceso únicamente a bloques de direcciones IP públicas específicas (requiere IP pública en la instancia).
  2. **Acceso Privado a Servicios (Private Service Access / Private IP)**: Conexión privada directa dentro de la red VPC mediante rangos RFC 1918 sin exponer la base de datos a internet (estándar recomendado de seguridad).
  3. **Cloud SQL Auth Proxy**: Conector de seguridad ligero local que autentica automáticamente a clientes contra la API de Cloud SQL mediante identidades IAM y levanta un túnel mTLS cifrado sin necesidad de gestionar certificados estáticos ni abrir puertos en cortafuegos.

### 6. Conectividad con el Ecosistema GCP y Herramientas Externas
* **Compute Engine**: Las VMs pueden autorizarse para conectarse mediante Private IP o Cloud SQL Auth Proxy; se recomienda desplegar la instancia de base de datos en la misma zona que la VM para minimizar la latencia de red.
* **App Engine & Cloud Run**: Conexión nativa mediante sockets Unix / Cloud SQL Connector y librerías estándar como `Connector/J` (Java), `MySQLdb` / `SQLAlchemy` (Python), `pgx` (Go), `mysql2` (Node.js).
* **Herramientas de Administración**: Compatibilidad total con clientes SQL estándar del mercado (SQL Workbench/J, DBeaver, Toad, MySQL Workbench, pgAdmin, SQL Server Management Studio - SSMS).

---

## 💡 Preguntas y Trampas Clave para el Examen Google Cloud ACE

1. **Límite de Escalabilidad de Cloud SQL vs Cloud Spanner**:
   * *Trampa de Examen*: Proponer Cloud SQL para una base de datos relacional global distribuida de 150 TB con escrituras concurrentes simultáneas en América, Europa y Asia.
   * *Realidad Técnica*: Cloud SQL es estrictamente regional y escala verticalmente hasta un límite de **64 TB**. Para cargas planetarias con transacciones ACID distribuidas multi-región o mayores a 64 TB, el servicio exigido es **Cloud Spanner**.
2. **Método Recomendado para Conectar VMs de Compute Engine a Cloud SQL**:
   * *Antipatrón*: Abrir `0.0.0.0/0` en redes autorizadas o utilizar credenciales incrustadas sin cifrar.
   * *Práctica Recomendada ACE*: Usar **Private IP** sobre VPC Peering (Private Services Access) o ejecutar el **Cloud SQL Auth Proxy** autenticado mediante la Service Account adjunta a la máquina virtual.
3. **Optimización de Latencia en Compute Engine + Cloud SQL**:
   * Para aplicaciones de alto rendimiento donde cada milisegundo de respuesta cuenta, configurar la instancia de Cloud SQL en la **misma zona** donde residen las máquinas virtuales de la capa de aplicación.


# 🚀 Dominio 2: Planificación e Implementación de Soluciones Cloud (~30% del Examen)

El Dominio 2 es el de mayor peso en la certificación ACE (30%). Comprende la selección e implementación de cómputo, almacenamiento y bases de datos, redes VPC e Infraestructura como Código (IaC).

---

## 1. Opciones de Cómputo (Compute Selection)

| Servicio | Nivel de Abstracción | Escalabilidad | Caso de Uso Principal |
| :--- | :--- | :--- | :--- |
| **Compute Engine** | IaaS (Mantenimiento de SO) | Manual / MIGs (Managed Instance Groups) | Cargas heredadas (legacy), licencias propietarias, control de kernel |
| **Google Kubernetes Engine (GKE)** | CaaS (Contenedores orquestados) | Horizontal Pod Autoscaler (HPA) + Cluster Autoscaler | Microservicios complejos, portabilidad multicloud, control fino de red |
| **Cloud Run** | Serverless / PaaS (Contenedores HTTP/gRPC) | Automática a cero instancias (Scale-to-zero) | APIs web, microservicios stateless, procesamiento de eventos |
| **Cloud Run Functions** | FaaS (Funciones basadas en eventos) | Automática por evento | Glue code, transformaciones de Cloud Storage/Pub/Sub |

### Modos de GKE:
* **GKE Autopilot**: Google administra los nodos de trabajo, la seguridad y el aprovisionamiento. Cobro por recurso solicitado por Pod (CPU, memoria, almacenamiento). Recomendado por defecto.
* **GKE Standard**: Control total sobre los Node Pools y tipos de máquinas virtuales. Cobro por instancias subyacentes de Compute Engine.

---

## 2. Almacenamiento y Bases de Datos (Storage & Databases)

### Cloud Storage (Almacenamiento de Objetos no Estructurados):
* **Clases de almacenamiento**:
  * **Standard**: Datos de acceso frecuente, sin cargo por recuperación ni permanencia mínima.
  * **Nearline**: Acceso infrecuente (< 1 vez al mes). Mínimo 30 días de permanencia.
  * **Coldline**: Acceso muy infrecuente (< 1 vez al año). Mínimo 90 días de permanencia.
  * **Archive**: Archivado a largo plazo / cumplimiento legal (< 1 vez cada varios años). Mínimo 365 días de permanencia.
* **Lifecycle Rules**: Reglas automatizadas para transicionar clases de almacenamiento o eliminar versiones antiguas de objetos.

### Comparativa de Bases de Datos Gestionadas:
* **Cloud SQL**: RDBMS gestionado (MySQL, PostgreSQL, SQL Server). Cargas transaccionales estándar (hasta 64 TB por instancia).
* **Cloud Spanner**: RDBMS globalmente distribuido con consistencia fuerte y escalabilidad horizontal masiva (ACID global).
* **Cloud Bigtable**: Base de datos NoSQL clave-valor / columnar ancha. Diseñada para alto rendimiento de lectura/escritura (series temporales, IoT, analítica en tiempo real). Mínimo práctico: > 1 TB.
* **Firestore**: Base de datos NoSQL documental con sincronización en tiempo real para aplicaciones móviles y web.
* **BigQuery**: Almacén de datos analítico (Data Warehouse) empresarial sin servidor para consultas SQL a escala de petabytes.

---

## 3. Redes VPC (Virtual Private Cloud)

* **Alcance Global**: Las redes VPC en Google Cloud son globales por defecto; las subredes son estrictamente regionales.
* **Modos de Subred**:
  * **Auto Mode**: Crea automáticamente una subred por región con rangos IP predeterminados (`/20`). No recomendado para producción empresarial.
  * **Custom Mode**: El ingeniero define manualmente los rangos CIDR de las subredes por región. Requerido para entornos de producción.
* **Shared VPC**: Permite centralizar la administración de la red en un proyecto Host y compartir subredes con proyectos de servicio.
* **Firewall Rules (Cloud NGFW)**:
  * Reglas con estado (Stateful): Si se permite el tráfico de entrada, la respuesta saliente se permite automáticamente.
  * Regla por defecto: Todo el tráfico entrante se bloquea; todo el tráfico saliente se permite.
  * Filtrado mediante Target Tags, Network Service Accounts o rangos de IP de origen.

---

## 4. Infraestructura como Código (IaC)

* **Terraform**: Estándar de facto para aprovisionar recursos mediante proveedores oficiales de Google Cloud (`google` y `google-beta`).
* **Helm**: Gestor de paquetes para desplegar aplicaciones y configuraciones en clusters de GKE.


# 📘 Curso: Google Cloud Fundamentals: Core Infrastructure (Course ID: 60)

Este documento sintetiza de forma modular los fundamentos conceptuales, arquitecturas de referencia, flujos de comandos de la CLI `gcloud` y directrices para el examen Google Cloud Associate Cloud Engineer (ACE), derivados del curso oficial de Google Cloud Skills.

---

## 🧭 1. Resumen Curricular y Pilares Técnicos

El curso **Google Cloud Fundamentals: Core Infrastructure** establece los cimientos necesarios para aprovisionar, gobernar y operar recursos en Google Cloud Platform (GCP). Compara los paradigmas de computación, almacenamiento, redes y gestión de identidades, alineándose con los dominios 1, 2 y 4 de la certificación ACE.

### Matriz de Módulos y Laboratorios Prácticos

| Módulo | Foco Técnico Principal | Laboratorio Práctico Incluido |
| :--- | :--- | :--- |
| **M1: Introducción a Google Cloud** | IaaS vs PaaS vs Serverless, red global de fibra óptica, seguridad en capas y modelos de facturación | Cuestionario de Fundamentos |
| **M2: Recursos y Acceso** | Jerarquía de recursos (Organización → Carpetas → Proyectos → Recursos), IAM y Service Accounts | **Lab 1:** Getting Started with Cloud Marketplace |
| **M3: Máquinas Virtuales y Redes** | Redes VPC (Auto vs Custom), Compute Engine, MIGs, Load Balancing, Cloud DNS y Cloud CDN | **Lab 2:** Get Started with VPC Networking and Compute Engine |
| **M4: Almacenamiento en la Nube** | Taxonomía de almacenamiento: Cloud Storage, Cloud SQL, Cloud Spanner, Firestore, Bigtable y BigQuery | **Lab 3:** Getting Started with Cloud Storage and Cloud SQL |
| **M5: Contenedores en la Nube** | Máquinas Virtuales vs Contenedores, arquitectura Kubernetes, GKE Standard vs GKE Autopilot | Cuestionario de Arquitectura GKE |
| **M6: Aplicaciones en la Nube** | Cómputo serverless con Cloud Run, Cloud Run Functions y Google App Engine (Standard vs Flexible) | **Lab 4:** Hello Cloud Run |

---

## 🏛️ 2. Fundamentos de Arquitectura y Gobernanza

### 2.1 Jerarquía de Recursos e IAM

La administración de recursos en GCP se organiza en una jerarquía estricta de 4 niveles con herencia aditiva (las políticas concedidas arriba no pueden ser revocadas en niveles inferiores):

```
🏢 Nodo Organización (Dominio Cloud Identity / Workspace - Políticas Org)
   │
   ├── 📁 Carpeta: Departamento / Entorno (Prod, Staging, Dev)
   │    │
   │    └── 📦 Proyecto (Unidad fundamental de cuota, facturación y propiedad)
   │         │
   │         └── ⚙️ Recursos (VMs, Buckets, Tablas, Subredes)
```

#### Tipos de Roles en IAM
1. **Roles Básicos / Primitivos (`Owner`, `Editor`, `Viewer`)**: Creados antes de IAM. Conceden permisos excesivamente amplios a nivel de proyecto. *Regla ACE: Prohibidos en entornos productivos para cumplir con mínimo privilegio.*
2. **Roles Predefinidos (Recomendados)**: Diseñados por Google para funciones laborales específicas (ej. `roles/compute.instanceAdmin.v1`, `roles/storage.objectViewer`).
3. **Roles Personalizados**: Colecciones a medida de permisos individuales para casos donde los roles predefinidos son demasiado permisivos.
4. **Cuentas de Servicio (Service Accounts)**: Identidades especiales asignadas a aplicaciones y VMs para autenticarse con APIs de Google Cloud sin requerir credenciales humanas permanentes.

---

### 2.2 Redes VPC y Reglas de Conectividad

* **Auto Mode VPC**: Genera automáticamente una subred por región con rangos IP predeterminados (`10.128.0.0/9`). Adecuado para pruebas o prototipado rápido.
* **Custom Mode VPC**: Comienza con cero subredes. Los administradores definen explícitamente los rangos CIDR y regiones. *Obligatorio en producción y recomendado en el examen ACE.*
* **Firewall NGFW**: Reglas de inspección basadas en prioridad (menor número = mayor prioridad), puertos, etiquetas de red (`target-tags`) y rangos origen (`source-ranges`).

---

### 2.3 Taxonomía de Almacenamiento y Bases de Datos

| Servicio | Tipo de Dato | Modelo | Ámbito | Casos de Uso Predominantes en Examen |
| :--- | :--- | :--- | :--- | :--- |
| **Cloud Storage** | No estructurado | Objetos binarios (Blobs) | Global / Multi-Región / Región | Almacén multimedia, backups, data lakes, sitios web estáticos. Clases: Standard, Nearline (30d), Coldline (90d), Archive (365d). |
| **Cloud SQL** | Estructurado | Relacional (MySQL, Postgres, SQL Server) | Regional (Failover HA) | Aplicaciones web estándar, ERP, CRM, transacciones ACID con volumen menor a 64 TB. |
| **Cloud Spanner** | Estructurado | Relacional (ANSI SQL, escalado horizontal) | Global / Multi-Región | Transacciones bancarias globales, alta disponibilidad (99.999%), consistencia fuerte sin límites de escala. |
| **Firestore** | Semi-estructurado | Documental NoSQL (Colecciones y Documentos) | Regional / Multi-Región | Aplicaciones móviles y web en tiempo real, sincronización offline, catálogos de usuario. |
| **Cloud Bigtable** | Semi-estructurado | Columnar ancho NoSQL (HBase API) | Regional / Global | Ingesta masiva IoT, series temporales, telemetría financiera con escrituras sub-10ms. |
| **BigQuery** | Estructurado | Data Warehouse analítico (OLAP) | Multi-Región / Región | Análisis masivo SQL en petabytes, reportería BI, machine learning integrado (BQML). |

---

## 🛠️ 3. Laboratorios Prácticos del Curso

### Lab 1: Getting Started with Cloud Marketplace
* **Objetivo**: Desplegar una solución web LAMP (Linux, Apache, MySQL, PHP) en Compute Engine mediante un solo clic usando soluciones empaquetadas por Bitnami.
* **Aspectos clave**:
  * Configuración de zona (`us-central1-a`) y tipo de máquina (`e2-medium`).
  * Apertura de tráfico HTTP/HTTPS mediante etiquetas de firewall.
  * Extracción de credenciales de administrador MySQL desde el panel de Deployment Manager.

---

### Lab 2: Get Started with VPC Networking and Compute Engine
* **Objetivo**: Crear una red VPC en modo personalizado, definir subredes en regiones separadas, configurar reglas de cortafuegos y verificar conectividad privada entre VMs.
* **Comandos gcloud**:
  ```bash
  # 1. Crear red VPC personalizada
  gcloud compute networks create my-custom-vpc \
      --subnet-mode=custom \
      --bgp-routing-mode=regional

  # 2. Crear subredes en us-central1 y us-east1
  gcloud compute networks subnets create subnet-us-central \
      --network=my-custom-vpc \
      --region=us-central1 \
      --range=10.130.0.0/20

  gcloud compute networks subnets create subnet-us-east \
      --network=my-custom-vpc \
      --region=us-east1 \
      --range=10.140.0.0/20

  # 3. Crear regla de firewall para ICMP, SSH y RDP
  gcloud compute firewall-rules create my-custom-vpc-allow-icmp-ssh-rdp \
      --network=my-custom-vpc \
      --direction=INGRESS \
      --priority=1000 \
      --action=ALLOW \
      --rules=icmp,tcp:22,tcp:3389 \
      --source-ranges=0.0.0.0/0

  # 4. Aprovisionar instancias en subredes separadas y validar ping interno
  gcloud compute instances create vm-internal-1 \
      --zone=us-central1-a \
      --machine-type=e2-micro \
      --network=my-custom-vpc \
      --subnet=subnet-us-central

  gcloud compute instances create vm-internal-2 \
      --zone=us-east1-b \
      --machine-type=e2-micro \
      --network=my-custom-vpc \
      --subnet=subnet-us-east
  ```

---

### Lab 3: Getting Started with Cloud Storage and Cloud SQL
* **Objetivo**: Crear un bucket en Cloud Storage con control uniforme de acceso, aprovisionar una instancia gestionada de Cloud SQL MySQL y vincular una VM web como cliente autorizado.
* **Comandos gcloud**:
  ```bash
  # 1. Crear bucket en Cloud Storage con acceso uniforme
  export PROJECT_ID=$(gcloud config get-value project)
  gcloud storage buckets create gs://${PROJECT_ID}-media-bucket \
      --location=us-central1 \
      --default-storage-class=STANDARD \
      --uniform-bucket-level-access

  # 2. Subir objeto de prueba
  echo "Google Cloud Fundamentals Storage Test" > sample.txt
  gcloud storage cp sample.txt gs://${PROJECT_ID}-media-bucket/sample.txt

  # 3. Crear instancia MySQL en Cloud SQL
  gcloud sql instances create my-db-instance \
      --database-version=MYSQL_8_0 \
      --cpu=1 \
      --memory=3840MiB \
      --region=us-central1 \
      --root-password="SuperSecurePassword123!"

  # 4. Crear base de datos y usuario de aplicación
  gcloud sql databases create app_db --instance=my-db-instance
  gcloud sql users create app_user --instance=my-db-instance --password="UserPassword123!"

  # 5. Autorizar la IP pública de la VM en la instancia de Cloud SQL
  export VM_IP=$(gcloud compute instances describe web-app-vm --zone=us-central1-a --format="value(networkInterfaces[0].accessConfigs[0].natIP)")
  gcloud sql instances patch my-db-instance --authorized-networks=${VM_IP}
  ```

---

### Lab 4: Hello Cloud Run
* **Objetivo**: Desplegar una aplicación web contenerizada en Cloud Run de forma serverless con autoescalado a cero.
* **Comandos gcloud**:
  ```bash
  # 1. Establecer región predeterminada
  gcloud config set run/region us-central1

  # 2. Desplegar contenedor oficial
  gcloud run deploy hello-cloudrun \
      --image=gcr.io/google-samples/hello-app:1.0 \
      --region=us-central1 \
      --allow-unauthenticated

  # 3. Describir servicio y obtener URL pública
  gcloud run services describe hello-cloudrun --region=us-central1
  ```

---

## 🎯 4. Árbol de Decisión de Cómputo para el Examen ACE

```
¿La carga requiere acceso al kernel, controladores legados o SO personalizado?
├── SÍ ───> Compute Engine (VMs)
└── NO
    ├── ¿Es una aplicación contenerizada con orquestación compleja y plugins de red?
    │   ├── SÍ (Control total de nodos) ────────> GKE Standard
    │   └── SÍ (Operación serverless de nodos) ─> GKE Autopilot
    └── NO
        ├── ¿Es un contenedor o microservicio web sin estado (HTTP / Eventos)?
        │   └── SÍ ───> Cloud Run
        └── ¿Es una función de propósito único disparada por Storage o Pub/Sub?
            └── SÍ ───> Cloud Run Functions
```

---

## 💡 5. Trampas Frecuentes en el Examen ACE

1. **Uso de Roles Básicos en Producción**: Las opciones que recomiendan asignar `roles/editor` o `roles/viewer` para otorgar acceso a buckets o VMs violan el principio de mínimo privilegio. Siempre preferir roles predefinidos (ej. `roles/storage.objectViewer`).
2. **Archivos de Clave JSON en VMs**: Descargar archivos JSON de cuentas de servicio en el disco de una máquina virtual es un antipatrón de seguridad crítico. La práctica oficial recomendada es adjuntar la cuenta de servicio directamente a la VM mediante el Compute Engine Metadata Server.
3. **Subredes en VPC Modo Personalizado**: A diferencia del modo Auto (que crea una subred por región), el modo Custom inicia con 0 subredes; deben ser aprovisionadas explícitamente.
4. **Herencia Aditiva en IAM**: Los permisos concedidos en niveles superiores (Organización o Carpeta) no pueden ser denegados ni restringidos en proyectos o recursos hijos mediante políticas IAM tradicionales.


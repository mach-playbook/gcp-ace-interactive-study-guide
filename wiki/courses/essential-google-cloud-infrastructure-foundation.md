# 🎓 Essential Google Cloud Infrastructure: Foundation (Course Template ID: 50)

- **Nombre Oficial:** Essential Google Cloud Infrastructure: Foundation
- **ID de Plantilla Skills:** `50`
- **URL Oficial:** [https://www.skills.google/course_templates/50](https://www.skills.google/course_templates/50)
- **Duración Estimada:** 6 Horas 45 Minutos
- **Nivel:** Intermedio / Infraestructura Troncal ACE
- **Insumo Crudo Asociado:** [skills-course-50-essential-cloud-infrastructure-foundation.md](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-essential-cloud-infrastructure-foundation.md)

---

## 🧭 Visión General del Curso

Este curso acelerado profundiza en los servicios medulares de infraestructura y plataforma de Google Cloud, centrándose de forma intensiva en **Compute Engine** y **Virtual Private Cloud (VPC)**. Los profesionales que se preparan para la certificación **Google Cloud Associate Cloud Engineer (ACE)** dominan aquí la planificación, el despliegue, la configuración y la resolución de incidencias en redes virtuales globales, subredes regionales, políticas de firewall, enrutamiento, servicios de acceso privado (Private Google Access y Cloud NAT), familias de máquinas virtuales, almacenamiento en disco persistente e imágenes de arranque.

### 🌐 La Trilogía "Architecting with Google Compute Engine"
Impartida por Rekha Niveda (Cloud Learning Services), esta serie conforma la columna vertebral técnica del track de Cloud Engineer:
1. **Essential Cloud Infrastructure: Foundation (Este Curso):** Interacción (Console/Cloud Shell), Redes VPC (subredes, cortafuegos, PGA, Cloud NAT) y Compute Engine.
2. **Essential Cloud Infrastructure: Core Services:** IAM y control de acceso, servicios de almacenamiento de datos, gestión y facturación de recursos, y monitoreo con Google Cloud Monitoring.
3. **Elastic Cloud Infrastructure: Scaling and Automation:** Interconexión de redes híbridas, Cloud Load Balancing, autoscaling y automatización declarativa con Terraform.

### 🚗 Analogía Urbana de la Infraestructura Cloud
* **Infraestructura:** El marco subyacente de instalaciones fundamentales (carreteras, agua, energía, telecomunicaciones) = Redes VPC, centros de datos globales, fibra óptica y Compute Engine.
* **Aplicaciones:** Los automóviles, bicicletas y edificios = Cargas de trabajo, microservicios, bases de datos y servidores web.
* **Usuarios:** Los ciudadanos que hacen uso de los servicios = Clientes y empleados.

### ⚙️ El Continuo de Soluciones de Cómputo
Google Cloud ofrece un espectro progresivo de abstracción y control:
* **Compute Engine (IaaS):** Máximo control y flexibilidad administrativa. Máquinas virtuales bajo demanda para gestionar el sistema operativo, parches y configuraciones de red.
* **Google Kubernetes Engine - GKE (CaaS):** Orquestación de contenedores sobre clústeres gestionados por Google, combinando portabilidad y eficiencia.
* **Cloud Run (Serverless Containers):** Plataforma gestionada basada en Knative; ejecuta contenedores sin estado activados por peticiones web o eventos Pub/Sub con escalado automático a cero.
* **Cloud Run Functions (FaaS):** Código orientado a eventos que se ejecuta sin servidores dedicados, con cobro por milisegundo de ejecución efectiva.

### 🎬 Videoteca Oficial Ingestada (Módulo 1)
1. **Course Introduction** (`Video 690256` | [YouTube](https://www.youtube.com/watch?v=-zTJk_MbmBg)): Bienvenida a la trilogía *Architecting with Google Compute Engine*, analogía urbana y espectro IaaS → FaaS.
2. **Module Overview — Interacting with Google Cloud** (`Video 690258` | [YouTube](https://www.youtube.com/watch?v=P9UusGOfEEk)): Introducción al Módulo 1 enfocada en las formas prácticas de interactuar con GCP:
   * **Interfaz Gráfica (GUI)** mediante Google Cloud Console e **Interfaz de Línea de Comandos (CLI)** mediante Cloud Shell en los laboratorios prácticos.
   * **Google Cloud Marketplace:** Despliegue acelerado de soluciones completas sin necesidad de configurar manualmente el software, las instancias de Virtual Machine, el almacenamiento o los ajustes de red.
   * **Demo de Proyectos (Projects):** Demostración práctica sobre cómo los proyectos actúan como frontera organizativa, de facturación y de permisos para los recursos de Google Cloud.
3. **Using Google Cloud** (`Video 690259` | [YouTube](https://www.youtube.com/watch?v=DvOb1yWbTcw)): Las 4 vías oficiales de interacción con Google Cloud:
   * **Google Cloud Console:** Interfaz gráfica web en `console.cloud.google.com` con menú de navegación por productos y submenús (ej. `Compute Engine > VM instances`).
   * **Cloud Shell y Google Cloud CLI (`gcloud`):** Terminal interactiva basada en navegador ejecutada en una VM temporal con **5 GB de almacenamiento en disco persistente** y Google Cloud CLI preinstalado (ej. `gcloud compute instances list`).
   * **Client Libraries y APIs:** Divididas en **App APIs** (acceso a servicios optimizado por lenguaje como Node.js o Python) y **Admin APIs** (gestión programática de recursos y construcción de herramientas de automatización).
   * **Google Cloud App (Android / iOS):** Gestión móvil para iniciar, detener y conectarse por SSH a instancias de Compute Engine, ver logs, configurar gráficas personalizables (CPU, red, RPS, errores de servidor), gestionar incidentes y recibir alertas de facturación sobre presupuestos.
4. **Lab Intro: Explore the Google Cloud Console and Cloud Shell** (`Video 690260` | [YouTube](https://www.youtube.com/watch?v=tGD5dD8I5dQ)): Preparación del primer laboratorio práctico comparando la creación de un bucket en **Cloud Storage** (almacenamiento unificado de objetos) primero mediante la interfaz gráfica (**Google Cloud Console**) y luego replicando la misma operación desde la línea de comandos (**Cloud Shell**) para ganar fluidez alternando entre ambos entornos.
5. **Lab Review: Explore the Google Cloud Console and Cloud Shell** (`Video 690262` | [YouTube](https://www.youtube.com/watch?v=aYVwJ-_-pyg)): Revisión y walkthrough completo del Lab 1 (9m 02s). Refuerza que **Cloud Console** (contexto de configuración y validación dinámica vía Cloud API) y **Cloud Shell** (control preciso y automatización por scripts) forman una sola interfaz complementaria. Incluye demostración paso a paso de nomenclatura global de buckets usando `[PROJECT_ID]` / `[PROJECT_ID]-shell`, equivalencia entre `gsutil mb`/`cp` (heredado en video) y `gcloud storage buckets create`/`cp` (estándar moderno), y recarga automática de variables en `~/.profile` al reiniciar la sesión de Cloud Shell.
6. **Lab Intro: Deploy a LAMP Stack with Google Cloud Marketplace** (`Video 690263` | [YouTube](https://www.youtube.com/watch?v=JxfUJ2J5MHY)): Introducción al Laboratorio 2 destacando el poder de la automatización de **Google Cloud Marketplace** para aprovisionar un entorno completo de desarrollo web **LAMP** (Linux, Apache, MySQL, PHP) en pocos minutos (frente a horas o días de configuración manual), verificando el despliegue y el estado activo de Apache HTTP Server mediante el enlace **Site URL**.

---

## 🏛️ Desglose Modular y Arquitectura de Aprendizaje

```
[ Essential Google Cloud Infrastructure: Foundation ]
       |
       +---> Módulo 1: Interacting with Google Cloud
       |       * Cloud Console (GUI) vs Cloud Shell (CLI con 5 GB persistentes)
       |       * Google Cloud SDK (`gcloud`, `gsutil`, `bq`) y variables de entorno
       |       * Cloud Marketplace y despliegue automatizado de software (LAMP Stack)
       |       * Identificadores de proyecto: Project ID, Name y Number
       |
       +---> Módulo 2: Virtual Networks (VPC)
       |       * VPC Global vs Subredes Regionales
       |       * Expansión dinámica de rangos CIDR (solo expansión, nunca reducción)
       |       * Direccionamiento IP: Internas (RFC 1918), Externas efímeras vs estáticas
       |       * DNS interno gestionado (`[INSTANCE_NAME].[ZONE].c.[PROJECT_ID].internal`)
       |       * Reglas de cortafuegos (0 a 65535, default allow egress, default deny ingress)
       |       * Private Google Access (habilitado por subred) y Cloud NAT (solo outbound)
       |
       +---> Módulo 3: Virtual Machines (Compute Engine)
               * Familias de máquinas: General purpose (E2, N2), Compute-optimized (C2), Memory-optimized (M2)
               * Ciclo de vida: PROVISIONING → STAGING → RUNNING → STOPPING → TERMINATED
               * Discos Persistentes (Standard, Balanced, SSD, Extreme) vs Local SSD (efímero)
               * Discos multiasociados en modo Read-Only
               * Preemptible y Spot VMs para cargas tolerantes a fallos (hasta 91% ahorro)
               * Imágenes públicas, imágenes personalizadas y snapshots incrementales
```

---

## 🧪 Laboratorios Prácticos Requeridos

### 1. Lab 1: Explore the Google Cloud Console and Cloud Shell (Lab ID: CBL006 / 690261)
* **Objetivo:** Dominar las dos interfaces integradas de Google Cloud —la interfaz gráfica web (**Cloud Console**) y la línea de comandos en navegador (**Cloud Shell**)— creando buckets de Cloud Storage en ambos entornos, subiendo archivos y estableciendo un estado persistente de variables de entorno entre reinicios de la VM efímera.
* **Duración Oficial:** 20 minutos (5 créditos, nivel Introductory).
* **Tareas y Comandos Clave:**
  ```bash
  # Task 3: Crear un bucket en Cloud Storage desde Cloud Shell
  gcloud storage buckets create gs://[BUCKET_NAME]

  # Task 4: Subir un archivo desde la VM de Cloud Shell al bucket
  gcloud storage cp [MY_FILE] gs://[BUCKET_NAME]

  # Task 5: Listar regiones y persistir variables en ~/infraclass/config y ~/.profile
  gcloud compute regions list
  mkdir infraclass && touch infraclass/config
  echo INFRACLASS_REGION=$INFRACLASS_REGION >> ~/infraclass/config
  echo INFRACLASS_PROJECT_ID=$INFRACLASS_PROJECT_ID >> ~/infraclass/config
  echo "source infraclass/config" >> ~/.profile
  ```
* **Comparativa Operativa (Task 6):**
  * **Cloud Console:** Ejecución rápida en pocos clics, menús guiados con solo opciones válidas y validación dinámica *behind-the-scenes* mediante el SDK antes de enviar cambios.
  * **Cloud Shell:** Control granular, acceso completo a opciones avanzadas/recientes y automatización repetible mediante scripts Bash o PowerShell. Incluye `gcloud`, `gcloud storage`, `kubectl`, `bq`, Web Preview y autorización integrada.
* **Trampa ACE:** Cloud Shell se recicla tras **1 hora de inactividad** (o al cerrar el terminal), perdiendo configuraciones del sistema y variables de entorno en memoria; únicamente persiste el disco de **5 GB en `/home`**, por lo que cargar configuraciones desde **`~/.profile`** garantiza estado persistente automático en cada nueva sesión.

---

### 2. Lab 2: Deploy a LAMP Stack with Google Cloud Marketplace (Lab ID: CBL011 / 690264)
* **Objetivo:** Desplegar una pila web completa **LAMP** (Linux Debian 12, Apache HTTP Server, MySQL, PHP y **phpMyAdmin**) en Compute Engine mediante Google Cloud Marketplace utilizando **Infrastructure Manager API** (basado en **Terraform**).
* **Duración Oficial:** 15 minutos (5 créditos, nivel Introductory).
* **Componentes y Parámetros Aprovisionados:**
  * Solución: *LAMP Stack on Debian12* (Apps4Rent LLC).
  * APIs habilitadas: `Compute Engine API` e `Infrastructure Manager API`.
  * Instancia VM `lamp-1-vm` (`E2` / `e2-medium`) con despliegue `lamp-1` y salida `Instance Nat Ip` en la pestaña *Details → Outputs*.
  * Reglas de firewall automáticas que habilitan tráfico web para verificar Apache en `http://<External IP>`.
* **Conceptos ACE:** Las soluciones VM de Cloud Marketplace se orquestan mediante **Terraform** (a través de **Infrastructure Manager**, sucesor de Deployment Manager) y se despliegan en la infraestructura del cliente; las licencias se integran en la misma factura de Google Cloud, pero el mantenimiento del sistema operativo y parches recaen en el cliente (modelo IaaS).

---

### 3. Lab 3: Create and Configure VPC Networks (Lab ID: 690279)
* **Objetivo:** Diseñar y aprovisionar redes VPC en modo personalizado (Custom Mode), creando subredes en distintas regiones geográficas y configurando reglas de cortafuegos para permitir tráfico ICMP, SSH y HTTP.
* **Comandos Clave:**
  ```bash
  # Crear red VPC en modo custom (sin subredes automáticas)
  gcloud compute networks create managementnet --subnet-mode=custom
  
  # Crear subred en una región específica
  gcloud compute networks subnets create managementsubnet-us \
      --network=managementnet \
      --region=us-central1 \
      --range=10.130.0.0/20
  
  # Crear regla de firewall para SSH e ICMP usando network tags
  gcloud compute firewall-rules create managementnet-allow-icmp-ssh-rdp \
      --direction=INGRESS \
      --priority=1000 \
      --network=managementnet \
      --action=ALLOW \
      --rules=icmp,tcp:22,tcp:3389 \
      --source-ranges=0.0.0.0/0
  ```
* **Trampa ACE:** Las redes en modo automático (Auto Mode) crean una subred por cada región con prefijos `/20` predeterminados (`10.128.0.0/9`), lo que puede causar traslape si se busca conectar con redes locales mediante VPN o Interconnect. En producción y en el examen, se recomienda **Custom Mode VPC**.

---

### 4. Lab 4: Implement Private Google Access and Cloud NAT (Lab ID: 690283)
* **Objetivo:** Conectar máquinas virtuales sin direcciones IP externas a servicios de Google (mediante Private Google Access) y a repositorios públicos de internet para descargas y parches (mediante Cloud NAT).
* **Comandos Clave:**
  ```bash
  # 1. Habilitar Private Google Access a nivel de subred
  gcloud compute networks subnets update privatenet-us \
      --region=us-central1 \
      --enable-private-ip-google-access
  
  # 2. Crear Cloud Router para BGP / NAT
  gcloud compute routers create nat-router \
      --network=privatenet \
      --region=us-central1
  
  # 3. Configurar Cloud NAT para salida exclusiva hacia internet
  gcloud compute routers nats create nat-config \
      --router=nat-router \
      --region=us-central1 \
      --auto-allocate-nat-external-ips \
      --nat-all-subnet-ip-ranges \
      --enable-logging
  ```
* **Diferenciador Arquitectónico Clave:**
  * **Private Google Access:** Permite que VMs sin IP externa accedan a APIs públicas de Google (Cloud Storage, BigQuery, etc.) usando la dirección interna de la subred mediante enrutamiento privado interno de Google.
  * **Cloud NAT:** Permite que VMs sin IP externa inicien conexiones salientes hacia internet general (para actualizaciones `apt-get`, APIs de terceros), pero **bloquea cualquier conexión entrante no solicitada** desde internet.

---

### 5. Lab 5: Create Virtual Machines (Lab ID: 690292)
* **Objetivo:** Crear y parametrizar instancias de Compute Engine utilizando Cloud Console y `gcloud`, analizando tipos de máquina (Machine Types), discos de arranque persistentes, asignación de IPs y metadatos de inicio (Startup Scripts).
* **Comandos Clave:**
  ```bash
  gcloud compute instances create my-vm-1 \
      --machine-type=e2-medium \
      --zone=us-central1-a \
      --subnet=privatenet-us \
      --no-address \
      --metadata=startup-script='#! /bin/bash
  apt-get update
  apt-get install -y nginx'
  ```
* **Trampa ACE:** Si se utiliza la bandera `--no-address`, la VM no recibe dirección IP externa. Para conectarse por SSH sin IP externa se debe usar **IAP (Identity-Aware Proxy)** mediante el rango `35.235.240.0/20` o un bastión intermedio.

---

### 6. Lab 6: Create and Configure Virtual Machines (Minecraft Server) (Lab ID: 690301)
* **Objetivo:** Implementar una aplicación con estado (stateful) en Compute Engine, separando el disco de arranque del sistema operativo del disco de datos persistente dedicado, configurando formateo ext4, montaje automático en `/etc/fstab` y reglas de cortafuegos personalizadas para puertos específicos.
* **Pasos Operativos:**
  1. Crear un disco persistente adicional: `gcloud compute disks create minecraft-disk --size=50GB --zone=us-central1-a --type=pd-ssd`.
  2. Adjuntar el disco a la VM: `gcloud compute instances attach-disk mc-server --disk=minecraft-disk --zone=us-central1-a`.
  3. Formatear y montar en Linux con `UUID` en `/etc/fstab` con opción `discard,defaults,nofail`.
  4. Abrir puerto de juego específico (TCP:25565) en el cortafuegos de la VPC.
* **Concepto ACE:** Los discos persistentes zonales se pueden desacoplar y adjuntar a otra VM en la misma zona sin pérdida de datos en caso de fallo de la instancia original.

---

## ⚡ Trampas y Claves Críticas para el Examen ACE

1. **Expansión de Subredes:**
   * En una VPC de Google Cloud, el rango de IP principal de una subred se puede **expandir** (por ejemplo, de `/24` a `/20`), pero **nunca se puede reducir**.
   * Para expandir una subred, el nuevo rango CIDR no debe traslaparse con ninguna otra subred de la misma VPC ni de redes con VPC Peering.

2. **Alcance Geográfico:**
   * **VPC:** Global (abarca todas las regiones del mundo dentro del proyecto).
   * **Subred:** Regional (sus IPs se pueden asignar a VMs en cualquier zona de esa región).
   * **VM / Disco Persistente Zonal:** Zonal (limitado a una zona de disponibilidad física, ej. `us-central1-a`).

3. **Reglas de Cortafuegos por Omisión:**
   * Cada red VPC tiene dos reglas implícitas:
     * **Default Allow Egress:** Prioridad 65535, permite todo el tráfico saliente (`0.0.0.0/0`).
     * **Default Deny Ingress:** Prioridad 65535, bloquea todo el tráfico entrante no solicitado (`0.0.0.0/0`).
   * No se pueden eliminar las reglas implícitas, pero se pueden sobreescribir con reglas de prioridad menor (0 a 65534).

4. **Acceso Privado vs Cloud NAT:**
   * Si la pregunta del examen menciona que una VM sin IP pública necesita subir datos a un bucket de **Cloud Storage**, la respuesta es **Private Google Access** en la subred.
   * Si la VM necesita descargar paquetes desde un repositorio de software en **GitHub o Debian**, la respuesta es **Cloud NAT**.

5. **Spot VMs y Preemptible VMs:**
   * Ofrecen descuentos de hasta un 60-91% respecto al precio bajo demanda.
   * Compute Engine puede reclamar la instancia en cualquier momento con un aviso previo de **30 segundos**.
   * Diseñadas para cargas de trabajo sin estado, procesamiento por lotes, renderizado o clusters tolerantes a fallos (no bases de datos transaccionales monolíticas).

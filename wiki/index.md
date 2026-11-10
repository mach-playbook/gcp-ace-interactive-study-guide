# 📖 LLM Knowledge Base & Wiki — GCP ACE Prep

Bienvenido a la **Wiki Modular del Proyecto**, diseñada siguiendo el patrón arquitectónico **LLM Wiki** formulado por **Andrej Karpathy** ([Gist de Referencia](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)).

Esta wiki actúa como un cerebro externo modular, persistente e interconectado que recopila, sintetiza y formaliza todo el conocimiento del temario del examen **Google Cloud Associate Cloud Engineer (ACE v4.0)**, así como las especificaciones funcionales y técnicas de la aplicación interactiva.

---

## 🗺️ Mapa Modular de Navegación

### 1. 📂 Materiales en Bruto (`wiki/raw/`)
* [README de Insumos](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/README.md): Repositorio inmutable (*append-only*) para notas crudas, transcripciones, volcados de preguntas oficiales y fuentes no estructuradas.
* [Guía de Estudio en Bruto: Load Balancing (Course 648)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/gcp-ace-load-balancing-study-guide.md): Insumo sin procesar sobre balanceadores L4/L7, laboratorios 1 a 4 y cuestionarios.
* [Guía de Estudio en Bruto: Fundamentals Core Infrastructure (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/gcp-fundamentals-core-infrastructure-study-guide.md): Insumo sin procesar sobre jerarquía, IAM, VPC, cómputo, almacenamiento y Cloud Run.
* [Transcripción: Introducción al Curso y Objetivos de Aprendizaje (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-course-introduction.md): Transcripción sanitizada de la lección introductoria oficial con los 7 objetivos de aprendizaje de Google Cloud y Gemini.
* [Transcripción: Cloud Computing Overview (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-computing-overview.md): Definición NIST de las 5 características del cloud y las 3 olas tecnológicas de infraestructura.
* [Transcripción: IaaS and PaaS (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-iaas-and-paas.md): Comparativa entre modelos de servicio: IaaS (Compute Engine), PaaS (App Engine), Serverless (Cloud Run, Cloud Run Functions) y SaaS (Workspace).
* [Transcripción: The Google Cloud Network (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-the-google-cloud-network.md): Topología de red global de Google, 100+ nodos de caché / PoPs, regiones, zonas y despliegues multi-región.
* [Transcripción: Environmental Impact (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-environmental-impact.md): Sostenibilidad, certificación ISO 14001, refrigeración marina en Hamina y objetivo de energía 100% libre de carbono (CFE) para 2030.
* [Transcripción: Security (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-security.md): Arquitectura de seguridad en 6 capas progresivas: hardware (Titan, Secure Boot), despliegue de servicios (RPC cifrado), identidad (U2F), almacenamiento (cifrado en reposo), internet (GFE, DoS) y operaciones.
* [Transcripción: Open Source Ecosystems (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-open-source-ecosystems.md): Prevención de vendor lock-in, ecosistemas de código abierto (Kubernetes, TensorFlow) e interoperabilidad multi-nube con Google Cloud Observability.
* [Transcripción: Pricing and Billing (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-pricing-and-billing.md): Facturación por segundo, Sustained-Use Discounts (automáticos > 25%), Custom Machine Types, presupuestos, alertas y cuotas de proyecto (Rate vs Allocation).
* [Cuestionario Oficial: Quiz Módulo 1 (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-module-1-quiz.md): Evaluación del primer módulo sobre modelos cloud, regiones y tolerancia a fallos por zonas.
* [Transcripción: Google Cloud Resource Hierarchy (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-google-cloud-resource-hierarchy.md): Estructura funcional de 4 niveles (Recursos, Proyectos, Carpetas, Organización), identificadores de proyecto (ID, Nombre, Número), Resource Manager API y roles clave.
* [Transcripción: Identity and Access Management - IAM (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-identity-and-access-management-iam.md): Control de acceso con IAM (Principals, roles básicos/predefinidos/personalizados, políticas Deny y restricción de custom roles).
* [Transcripción: Service Accounts (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-service-accounts.md): Autenticación máquina a máquina para VMs y aplicaciones, llaves criptográficas y doble naturaleza (Identidad vs Recurso con roles como serviceAccountUser).
* [Transcripción: Cloud Identity (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-identity.md): Identidades corporativas centralizadas (IDaaS), Google Admin Console, sincronización con Active Directory/LDAP (GCDS) y ediciones Free vs Premium.
* [Transcripción: Interacting with Google Cloud (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-interacting-with-google-cloud.md): Las 4 vías de acceso: Cloud Console (GUI), Google Cloud SDK y Cloud Shell (5 GB persistentes), APIs Explorer y librerías cliente en 8 lenguajes, y Cloud Mobile App.
* [Laboratorio Oficial: Getting Started with Cloud Marketplace (Lab 689558)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-google-cloud-fundamentals-getting-started-with-cloud-marketplace.md): Guía de despliegue de pila LAMP (Linux, Apache, MySQL, PHP) en Compute Engine con Infrastructure Manager.
* [Cuestionario Oficial: Quiz Módulo 2 (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-module-2-quiz.md): Evaluación oficial de Recursos y Acceso (habilitación de APIs en proyectos, inmutabilidad del Project ID y roles IAM de mayor a menor amplitud).
* [Transcripción: Virtual Private Cloud networking (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-virtual-private-cloud-networking.md): Alcance global de las VPC, subredes regionales multi-zonal, comunicación entre zonas en la misma subred, expansión dinámica de rangos CIDR y reglas de firewall.
* [Transcripción: Compute Engine (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-compute-engine.md): IaaS en GCP, aprovisionamiento de VMs, Cloud Marketplace, optimización financiera (por segundo, SUD automático >25%, CUD 1/3 años, Spot VMs sin límite 24h) y Custom Machine Types.
* [Transcripción: Scaling virtual machines (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-scaling-virtual-machines.md): Autoscaling en Compute Engine, balanceo de carga en VPC, comparativa arquitectónica Scale-out vs Scale-up y límites de cuota por zona para familias de máquinas.
* [Transcripción: Important VPC compatibilities (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-important-vpc-compatibilities.md): Tablas de enrutamiento nativas sin routers, firewall global con Network Tags, interconexión privada con VPC Peering y gobierno centralizado con Shared VPC.
* [Transcripción: Cloud Load Balancing (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-load-balancing.md): Servicio administrado definido por software, sin pre-calentamiento, failover multi-región, Application Load Balancers (L7) y Network Load Balancers (L4 Proxy vs Passthrough DSR).
* [Transcripción: Cloud DNS and Cloud CDN (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-dns-and-cloud-cdn.md): Cloud DNS autoritativo gestionado (Anycast SLA 100%, zonas públicas y privadas), Cloud CDN con Edge Caches en 100+ PoPs para baja latencia, descarga de origen y ahorro en egress, y CDN Interconnect.
* [Transcripción: Connecting networks to Google VPC (Course 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-connecting-networks-to-google-vpc.md): Conectividad híbrida y multi-cloud: Cloud VPN + Cloud Router (BGP), Direct/Carrier Peering (público sin SLA), Dedicated vs Partner Interconnect (privado RFC 1918 con SLA 99.99%) y Cross-Cloud Interconnect.

### 2. 🏛️ Dominios del Examen GCP ACE (`wiki/domains/`)
* [Dominio 1: Configuración del Entorno Cloud](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/domains/domain-1-cloud-environment.md) (~23%): Jerarquía de recursos, Billing, Cloud Identity, cuotas y observabilidad inicial.
* [Dominio 2: Planificación e Implementación de Soluciones](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/domains/domain-2-solution-planning.md) (~30%): Compute Engine, GKE, Cloud Run, bases de datos, redes VPC e Infraestructura como Código (IaC).
* [Dominio 3: Operación Exitosa de Soluciones](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/domains/domain-3-solution-operations.md) (~27%): OS Login, snapshots, backups, Cloud Monitoring, Cloud Logging y Ops Agent.
* [Dominio 4: Acceso y Seguridad](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/domains/domain-4-security-access.md) (~20%): IAM (roles predefinidos vs personalizados), Service Accounts, Workload Identity y auditoría.

### 3. 🧩 Componentes Interactivos de la Aplicación (`wiki/components/`)
* [Quiz Interactivo de Sintaxis gcloud](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/components/gcloud-cli-quiz.md): Gramática CLI y mecánicas de evaluación.
* [Matriz de Decisión (Storage & Compute)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/components/decision-matrix.md): Flujos de selección guiados por restricciones.
* [Flashcards & Trampas Frecuentes](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/components/flashcards-traps.md): Tarjetas de repaso rápido y trampas típicas del examen.
* [Tracker de Preparación por Dominio](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/components/readiness-tracker.md): Medición de progreso ponderado según pesos oficiales.

### 4. ⚡ Tablas de Referencia Rápida & Árboles (`wiki/cheatsheets/`)
* [Árbol de Decisión de Almacenamiento](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/cheatsheets/storage-decision-tree.md): Cloud Storage vs Cloud SQL vs Spanner vs Bigtable vs Firestore vs BigQuery.
* [Árbol de Decisión de Cómputo](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/cheatsheets/compute-decision-tree.md): VMs vs GKE Autopilot/Standard vs Cloud Run vs Cloud Run Functions.
* [Árbol de Decisión de Load Balancing](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/cheatsheets/load-balancing-decision-tree.md): External vs Internal, Capa 7 (HTTP/HTTPS) vs Capa 4 (TCP/UDP Passthrough) y reglas de cortafuegos.
* [Reglas de Jerarquía e IAM](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/cheatsheets/iam-hierarchy-rules.md): Herencia de permisos, políticas Deny y tipos de miembros.
* [Comandos Esenciales gcloud](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/cheatsheets/gcloud-syntax-cheatsheet.md): Chuleta de comandos de alta frecuencia de examen.

### 5. 🎓 Cursos y Laboratorios Prácticos (`wiki/courses/`)
* [Implementing Cloud Load Balancing for Compute Engine (Course ID: 648)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/implementing-cloud-load-balancing.md): Passthrough Network Load Balancer, Global External Application Load Balancer, Internal Application Load Balancer y Challenge Lab 613025.
* [Google Cloud Fundamentals: Core Infrastructure (Course ID: 60)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md): Jerarquía de recursos, IAM, VPC personalizadas, Cloud Storage, Cloud SQL, GKE y Cloud Run.

### 6. 🏗️ Arquitectura y Modelado de Datos (`wiki/architecture/`)
* [Visión General del Sistema](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/architecture/system-overview.md): Stack tecnológico, arquitectura de frontend, SSG Next.js 16, About page y Footer unificado.
* [Modelos y Esquemas de Datos](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/architecture/data-models.md): Estructuras TypeScript para preguntas, matrices y progreso.
* [Telemetría, Indexación y Validación SEO](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/architecture/telemetry-and-indexing.md): GA4 (G-9GESMZMDPB), Google Search Console, Bing Webmaster Tools y sitemaps.

### 7. 👤 Autoría y Ecosistema
* **Autor Principal**: Lenin Meza (`merolhack`) — Arquitecto de Software & Autor Técnico.
* **Portafolio Oficial**: [https://merolhack.github.io/](https://merolhack.github.io/)
* **Perfil Profesional**: [LinkedIn de Lenin Meza](https://www.linkedin.com/in/leninmezazarco)
* **Publicación Matriz**: [MACH Playbook](https://mach-playbook.github.io/) y libro *Playbook de Arquitectura MACH* (Amazon KDP 2026).
* **Página Institucional**: `/about/` (Acerca de la Plataforma & Misión Educativa).

### 8. 📜 Bitácora de Síntesis y Cambios (`wiki/log/`)
* [Changelog de la Wiki](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/log/changelog.md): Historial cronológico de ingestión y refactorización del conocimiento.

---

## 🛠️ Directrices de Mantenimiento para Agentes

1. **Modularidad**: Cada concepto principal debe poseer su propio documento o sección delimitada; evitar archivos monolíticos de más de 500 líneas.
2. **Enlaces Cruzados**: Conectar siempre conceptos relacionados usando enlaces markdown relativos o URI `file://`.
3. **Validación de Cero LaTeX**: Nunca emplear delimitadores de dólares ni macros TeX. Usar símbolos Unicode (`→`, `≤`, `≥`, `×`, `≠`) y emojis descriptivos.
4. **Actualización del Índice**: Al crear un nuevo archivo dentro de `wiki/`, añadir su referencia inmediatamente a este `index.md`.


# 📖 LLM Knowledge Base & Wiki — GCP ACE Prep

Bienvenido a la **Wiki Modular del Proyecto**, diseñada siguiendo el patrón arquitectónico **LLM Wiki** formulado por **Andrej Karpathy** ([Gist de Referencia](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)).

Esta wiki actúa como un cerebro externo modular, persistente e interconectado que recopila, sintetiza y formaliza todo el conocimiento del temario del examen **Google Cloud Associate Cloud Engineer (ACE v4.0)**, así como las especificaciones funcionales y técnicas de la aplicación interactiva.

---

## 🗺️ Mapa Modular de Navegación

### 1. 📂 Materiales en Bruto (`wiki/raw/`)
* [README de Insumos](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/README.md): Repositorio inmutable (*append-only*) para notas crudas, transcripciones, volcados de preguntas oficiales y fuentes no estructuradas.
* [Guía de Estudio en Bruto: Load Balancing (Course 648)](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/gcp-ace-load-balancing-study-guide.md): Insumo sin procesar sobre balanceadores L4/L7, laboratorios 1 a 4 y cuestionarios.

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

### 6. 🏗️ Arquitectura y Modelado de Datos (`wiki/architecture/`)
* [Visión General del Sistema](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/architecture/system-overview.md): Stack tecnológico, arquitectura de frontend y gestión de estado.
* [Modelos y Esquemas de Datos](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/architecture/data-models.md): Estructuras TypeScript para preguntas, matrices y progreso.
* [Telemetría, Indexación y Validación SEO](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/architecture/telemetry-and-indexing.md): GA4 (G-9GESMZMDPB), Google Search Console, Bing Webmaster Tools y sitemaps.

### 7. 📜 Bitácora de Síntesis y Cambios (`wiki/log/`)
* [Changelog de la Wiki](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/log/changelog.md): Historial cronológico de ingestión y refactorización del conocimiento.

---

## 🛠️ Directrices de Mantenimiento para Agentes

1. **Modularidad**: Cada concepto principal debe poseer su propio documento o sección delimitada; evitar archivos monolíticos de más de 500 líneas.
2. **Enlaces Cruzados**: Conectar siempre conceptos relacionados usando enlaces markdown relativos o URI `file://`.
3. **Validación de Cero LaTeX**: Nunca emplear delimitadores de dólares ni macros TeX. Usar símbolos Unicode (`→`, `≤`, `≥`, `×`, `≠`) y emojis descriptivos.
4. **Actualización del Índice**: Al crear un nuevo archivo dentro de `wiki/`, añadir su referencia inmediatamente a este `index.md`.


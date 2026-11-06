# 📜 Bitácora de Síntesis y Cambios de la Wiki (`wiki/log/`)

Registro cronológico de evoluciones, ingestas de contenido y mantenimiento estructural de la LLM Wiki siguiendo las pautas de Andrej Karpathy.

---

## [2026-11-06] - Regla de Evaluación Completa Obligatoria en Quizzes de Cursos

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Regla General de Examen**: Implementación de validación estricta en [`src/components/CourseDetailView.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/components/CourseDetailView.tsx) impidiendo calificar el examen si existen preguntas sin responder.
* **Interfaz de Validación**: Despliegue de banner de alerta explicativo con lista de preguntas pendientes (`#N`), indicador de progreso de respuestas (`X / Y`) y resaltado de tarjeta con etiqueta `Respuesta requerida`.
* **Ampliación de Pruebas BDD**: Actualización de escenarios en [`tests/bdd/courses-load-balancing.feature.test.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/bdd/courses-load-balancing.feature.test.tsx) y [`tests/bdd/core-infrastructure-course.feature.test.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/bdd/core-infrastructure-course.feature.test.tsx) verificando el bloqueo ante cuestionarios incompletos y la calificación tras completar el 100% de las respuestas.
* **Aprobación de Suite**: 30 pruebas unitarias y BDD aprobadas al 100%.

---

## [2026-11-06] - Ingesta de Curso: Google Cloud Fundamentals: Core Infrastructure (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta en Bruto**: Registro de `wiki/raw/gcp-fundamentals-core-infrastructure-study-guide.md` como insumo inmutable sobre fundamentos de infraestructura, jerarquía de recursos, IAM, redes VPC y cómputo serverless.
* **Síntesis Modular del Curso**: Creación de [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md) estructurando los 6 módulos teóricos y los 4 laboratorios prácticos (Marketplace LAMP, VPC Networking, Cloud Storage/SQL y Cloud Run).
* **Actualización del Catálogo Central**: Enlace del nuevo curso e insumo bruto en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).
* **Validación de Formato**: Cumplimiento del estándar Cero LaTeX / MathJax en todas las secciones.

---

## [2026-11-05] - Ingesta de Curso: Implementing Cloud Load Balancing for Compute Engine (Course 648)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta en Bruto**: Registro de `wiki/raw/gcp-ace-load-balancing-study-guide.md` como fuente inmutable sobre balanceo de carga L4/L7 en Compute Engine.
* **Síntesis de Curso**: Creación del módulo sintetizado [`wiki/courses/implementing-cloud-load-balancing.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/implementing-cloud-load-balancing.md) con detalles de los Laboratorios 1 a 4 (Target Pools, MIGs, subred Proxy-Only, Challenge Lab 613025).
* **Hoja de Referencia Rápida**: Creación de [`wiki/cheatsheets/load-balancing-decision-tree.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/cheatsheets/load-balancing-decision-tree.md) con el árbol de decisión L4 vs L7, IPs de health check (`130.211.0.0/22`, `35.191.0.0/16`) y reglas clave de examen.
* **Actualización del Catálogo**: Incorporación de los nuevos módulos en el índice principal [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).
* **Garantía de Estándar**: Verificación rigurosa de Cero LaTeX / MathJax.

---

## [2026-11-05] - Inicialización y Estructuración Modular de la Wiki

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* Creación de la estructura modular de directorios en `wiki/`:
  * `wiki/raw/`: Directorio inmutable append-only para fuentes e insumos en bruto.
  * `wiki/domains/`: Síntesis conceptual de los 4 dominios del examen ACE v4.0.
  * `wiki/components/`: Especificación funcional de los 4 componentes interactivos de la aplicación.
  * `wiki/cheatsheets/`: Árboles de decisión (Compute & Storage), reglas de IAM y comandos de `gcloud`.
  * `wiki/architecture/`: Visión del sistema y esquemas TypeScript de datos.
  * `wiki/log/`: Bitácora histórica de mantenimiento.
* Generación del índice central [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) con mapas de navegación bidireccionales.
* Creación de la propiedad GA4 `p562558808` con Measurement ID `G-9GESMZMDPB` bajo la cuenta `a389930119` (Github Pages).
* Vinculación oficial entre Google Analytics y la propiedad de Google Search Console `https://mach-playbook.github.io/gcp-ace-interactive-study-guide/`.
* Configuración de validación para Bing Webmaster Tools (`856757614FFC2C5582FBCB81B1B4E4CA`), sitemaps y robots.txt.
* Creación del documento [`wiki/architecture/telemetry-and-indexing.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/architecture/telemetry-and-indexing.md).
* Cumplimiento estricto de la directriz de Cero LaTeX/MathJax en todos los documentos generados.


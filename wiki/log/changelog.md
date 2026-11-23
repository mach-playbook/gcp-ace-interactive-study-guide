# 📜 Bitácora de Síntesis y Cambios de la Wiki (`wiki/log/`)

Registro cronológico de evoluciones, ingestas de contenido y mantenimiento estructural de la LLM Wiki siguiendo las pautas de Andrej Karpathy.

---

## [2026-11-23] - Actualización de Nota Operativa en Lab 6 (Course 637 / Lab GSP080 / 592546)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Actualización Raw (`wiki/raw/skills-app-dev-lab6-deploy-cloud-run-function-cli.md`)**:
  * Actualizada la fecha de revisión oficial al 22 de noviembre de 2026 (16,579 estrellas).
  * Incorporada la nota operativa en Task 2 sobre la preconfiguración del *Pub/Sub service agent* y el binding `roles/iam.serviceAccountTokenCreator` (responder `n` si llegara a mostrarse el prompt) y la nota de latencia (~10 min) en Task 4 con alternativa vía **Logging → Logs Explorer**.

---

## [2026-11-23] - Ingesta de Laboratorio 2: Deploy a LAMP Stack with Google Cloud Marketplace (Course 50 / Lab CBL011 / 690264)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-lab2-deploy-lamp-stack-marketplace.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-lab2-deploy-lamp-stack-marketplace.md) con las instrucciones oficiales del laboratorio `CBL011` (Skills ID: `690264`, 15 minutos, 5 créditos, Introductory, Last Tested Nov 16, 2026, Puntos acumulados: 16,568), detallando la pila LAMP + phpMyAdmin (*LAMP Stack on Debian12* de Apps4Rent LLC), habilitación de `Compute Engine API` e `Infrastructure Manager API` (**Terraform**), aprovisionamiento en `e2-medium` (`lamp-1` / `lamp-1-vm`) y validación vía `http://<External IP>`.
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Actualizada la sección **2. Lab 2: Deploy a LAMP Stack with Google Cloud Marketplace (Lab ID: CBL011 / 690264)** especificando la orquestación con Terraform / Infrastructure Manager API, los componentes exactos (incluido phpMyAdmin) y la duración oficial de 15 minutos.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Actualizado `infra-lab-2` ajustando `durationMinutes` a `15` minutos, actualizando `keyConcepts` y detallando los 3 pasos oficiales del laboratorio CBL011.
* **Pruebas y Verificación**:
  * Actualizada la suite `tests/unit/essentialInfrastructureCourse.test.ts` validando la duración (`15` min) y pasos (`3`) de `infra-lab-2`.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-23] - Ingesta de Lección en Video: Lab Intro: Deploy a LAMP Stack with Google Cloud Marketplace (Course 50 / Video 690263)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-lesson-lab2-intro-lamp-marketplace.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-lesson-lab2-intro-lamp-marketplace.md) con la transcripción oficial de *Lab Intro: Deploy a LAMP Stack with Google Cloud Marketplace* (Video ID: `690263`, YouTube: `JxfUJ2J5MHY`, duración `0m 32s`, Puntos acumulados: 16,557), resaltando la automatización de Cloud Marketplace para desplegar un entorno LAMP en minutos y la verificación de Apache HTTP Server vía Site URL.
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Añadida la lección `690263` a la **Videoteca Oficial Ingestada (Módulo 1)**.
* **Modelo de Datos y UI (`src/data/coursesData.ts`)**:
  * Añadida la lección `infra-mod1-lab2-intro` dentro de `gcp-course-50` con reproductor oficial de YouTube (`https://www.youtube.com/watch?v=JxfUJ2J5MHY`), duración (`0m 32s`), resumen y puntos clave.
* **Pruebas y Verificación**:
  * Actualizada la suite `tests/unit/essentialInfrastructureCourse.test.ts` validando el título, `youtubeId` (`JxfUJ2J5MHY`) y `youtubeUrl`.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-23] - Ingesta de Lección en Video: Lab Review: Explore the Google Cloud Console and Cloud Shell (Course 50 / Video 690262)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-lesson-lab1-review-console-cloud-shell.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-lesson-lab1-review-console-cloud-shell.md) con la transcripción y walkthrough oficial de *Lab Review: Explore the Google Cloud Console and Cloud Shell* (Video ID: `690262`, YouTube: `aYVwJ-_-pyg`, duración `9m 02s`, Puntos acumulados: 16,546), documentando la visión unificada de Cloud Console + Cloud Shell, el uso del Project ID para garantizar unicidad global de buckets, la equivalencia `gsutil` → `gcloud storage` y el reinicio de sesión requerido para ejecutar `~/.profile`.
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Añadida la lección `690262` a la **Videoteca Oficial Ingestada (Módulo 1)**.
* **Modelo de Datos y UI (`src/data/coursesData.ts`)**:
  * Añadida la lección `infra-mod1-lab1-review` dentro de `gcp-course-50` con reproductor oficial de YouTube (`https://www.youtube.com/watch?v=aYVwJ-_-pyg`), duración (`9m 02s`), resumen y 4 puntos clave para el examen ACE.
* **Pruebas y Verificación**:
  * Actualizada la suite `tests/unit/essentialInfrastructureCourse.test.ts` validando el título, `youtubeId` (`aYVwJ-_-pyg`) y `youtubeUrl`.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-20] - Ingesta de Laboratorio 1: Explore the Google Cloud Console and Cloud Shell (Course 50 / Lab CBL006 / 690261)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-lab1-explore-console-and-cloud-shell.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-lab1-explore-console-and-cloud-shell.md) con las instrucciones oficiales completas del laboratorio `CBL006` (Skills ID: `690261`, 20 minutos, 5 créditos, Introductory, Puntos acumulados: 16,546), detallando las 6 tareas operativas (creación de bucket en Cloud Console y en Cloud Shell con `gcloud storage buckets create`, subida y copia de archivos con `gcloud storage cp`, persistencia de variables en `~/infraclass/config` y `~/.profile`, y comparativa GUI vs CLI) así como las 2 preguntas de comprobación formativa.
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Actualizada la sección **1. Lab 1: Explore the Google Cloud Console and Cloud Shell (Lab ID: CBL006 / 690261)** con los comandos exactos del laboratorio, la comparativa Cloud Console vs Cloud Shell y la corrección de precisión sobre el reciclaje de la VM de Cloud Shell tras **1 hora de inactividad** (resolución proactiva de contradicción frente a los 20 minutos previos).
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Actualizado `infra-lab-1` ajustando `durationMinutes` a `20` minutos, refinando `keyConcepts` y desglosando los 5 pasos operativos oficiales con comandos reproducibles y tips de examen ACE.
* **Pruebas y Verificación**:
  * Actualizada la suite `tests/unit/essentialInfrastructureCourse.test.ts` verificando la duración (`20` min) y la estructura de los 5 pasos de `infra-lab-1`.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-20] - Ingesta de Lección en Video: Lab Intro: Explore the Google Cloud Console and Cloud Shell (Course 50 / Video 690260)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-lesson-lab1-intro-console-cloud-shell.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-lesson-lab1-intro-console-cloud-shell.md) con la transcripción oficial de *Lab Intro: Explore the Google Cloud Console and Cloud Shell* (Video ID: `690260`, YouTube: `tGD5dD8I5dQ`, Puntos acumulados: 16,536), introduciendo la práctica comparativa de creación de un bucket en Cloud Storage mediante Cloud Console (GUI) y Cloud Shell (CLI).
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Añadida la lección `690260` a la **Videoteca Oficial Ingestada (Módulo 1)**.
* **Modelo de Datos y UI (`src/data/coursesData.ts`)**:
  * Añadida la lección `infra-mod1-lab1-intro` dentro de `gcp-course-50` con reproductor oficial de YouTube (`https://www.youtube.com/watch?v=tGD5dD8I5dQ`), duración (`0m 36s`), resumen y puntos clave.
* **Pruebas y Verificación**:
  * Actualizada la suite `tests/unit/essentialInfrastructureCourse.test.ts` validando el título, `youtubeId` (`tGD5dD8I5dQ`) y `youtubeUrl`.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-20] - Ingesta de Lección en Video: Using Google Cloud (Course 50 / Video 690259)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-lesson-using-google-cloud.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-lesson-using-google-cloud.md) con la transcripción oficial completa de la lección *Using Google Cloud* del Módulo 1 (Video ID: `690259`, YouTube: `DvOb1yWbTcw`, Puntos acumulados: 16,526), detallando las 4 formas de interacción: Cloud Console (`console.cloud.google.com`), Cloud Shell (VM efímera con 5 GB persistentes y CLI preinstalado) + `gcloud`, Client Libraries (**App APIs** vs **Admin APIs**) y Google Cloud App para Android/iOS.
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Expandida la **Videoteca Oficial Ingestada (Módulo 1)** incorporando la lección `690259` y el desglose técnico de las 4 interfaces de administración.
* **Modelo de Datos y UI (`src/data/coursesData.ts`)**:
  * Añadida la lección `infra-mod1-using-gcp` (*Using Google Cloud*) dentro de `gcp-course-50` con reproductor oficial de YouTube (`https://www.youtube.com/watch?v=DvOb1yWbTcw`), duración (`3m 12s`), resumen y puntos clave orientados al examen ACE.
* **Pruebas y Verificación**:
  * Actualizada la suite `tests/unit/essentialInfrastructureCourse.test.ts` validando el título, `youtubeId` (`DvOb1yWbTcw`) y `youtubeUrl` de *Using Google Cloud*.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-20] - Ingesta de Lección en Video: Module Overview — Módulo 1 (Course 50 / Video 690258)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-lesson-mod1-overview.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-lesson-mod1-overview.md) con la transcripción oficial completa de la lección *Module Overview* del Módulo 1 (*Interacting with Google Cloud*, Video ID: `690258`, YouTube: `P9UusGOfEEk`, Puntos acumulados: 16,516), detallando el enfoque práctico en GUI (Cloud Console), CLI (Cloud Shell), despliegue automatizado en Cloud Marketplace sin configuración manual de software/VM/almacenamiento/red y demostración de Projects.
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Añadida la subsección **Videoteca Oficial Ingestada (Módulo 1)** consolidando las lecciones `690256` y `690258` y los pilares operativos de interacción con GCP.
* **Modelo de Datos y UI (`src/data/coursesData.ts`)**:
  * Actualizada la entrada `infra-mod1-overview` dentro de `gcp-course-50` reemplazando el enlace provisional por el video oficial de YouTube (`https://www.youtube.com/watch?v=P9UusGOfEEk`), título *Module Overview: Interacting with Google Cloud*, duración (`0m 35s`), resumen y puntos clave alineados con la transcripción.
* **Pruebas y Verificación**:
  * Actualizada la suite `tests/unit/essentialInfrastructureCourse.test.ts` validando el título, `youtubeId` (`P9UusGOfEEk`) y `youtubeUrl` de la lección *Module Overview: Interacting with Google Cloud*.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Lección en Video: Course Introduction (Course 50 / Video 690256)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-lesson-course-introduction.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-lesson-course-introduction.md) con la transcripción completa de la lección inaugural presentada por Rekha Niveda (Cloud Learning Services), detallando la trilogía *Architecting with Google Compute Engine*, la analogía urbana de la infraestructura tecnológica y el continuo de opciones de cómputo en Google Cloud (Compute Engine, GKE, Cloud Run, Cloud Run Functions).
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Enriquecida la visión general del curso incorporando la arquitectura de la trilogía curricular de Compute Engine, la analogía urbana y el espectro de soluciones desde IaaS hasta FaaS.
* **Modelo de Datos y UI (`src/data/coursesData.ts`)**:
  * Actualizada la lista de lecciones en video de `gcp-course-50` incorporando la lección inaugural con enlace directo a YouTube (`https://www.youtube.com/watch?v=-zTJk_MbmBg`), duración oficial (9m 10s) y puntos clave de examen.
* **Pruebas y Verificación**:
  * Actualizada la suite `tests/unit/essentialInfrastructureCourse.test.ts` validando la presencia y atributos del video `Course Introduction`.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Nuevo Curso: Essential Google Cloud Infrastructure: Foundation (Course Template ID: 50)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-course-50-essential-cloud-infrastructure-foundation.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-50-essential-cloud-infrastructure-foundation.md) con el temario oficial completo del curso Template ID 50 (6 horas 45 minutos, nivel Intermedio, 192 estrellas), detallando los 3 módulos:
    * Módulo 1: Interacting with Google Cloud (Cloud Console, Cloud Shell, SDK, Marketplace LAMP stack, Projects).
    * Módulo 2: Virtual Networks (VPC global, subredes regionales, expansión de subredes, direccionamiento IP, DNS interno, rutas, cortafuegos, Private Google Access y Cloud NAT).
    * Módulo 3: Virtual Machines (Compute Engine, familias de máquinas, ciclo de vida, discos persistentes, Local SSD, imágenes, Spot VMs y configuración de servidor dedicado Minecraft).
* **Síntesis Curricular (`wiki/courses/essential-google-cloud-infrastructure-foundation.md`)**:
  * Creado el documento maestro del curso con arquitectura visual ASCII, especificaciones operativas de los 6 laboratorios requeridos (Labs 690261, 690264, 690279, 690283, 690292 y 690301) y las 5 trampas clave para el examen Associate Cloud Engineer (ACE).
* **Índice General**:
  * Registradas las referencias modulares en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Secciones 1 y 5).

---

## [2026-11-18] - Ingesta de Laboratorio 9: Publish and Subscribe to Messages in Pub/Sub Using Python (Lab GSP094 / 592549)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab9-pubsub-python-sdk.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab9-pubsub-python-sdk.md) con las instrucciones completas del laboratorio oficial GSP094 (Skills ID: `592549`, 1 crédito, 10 min, 16,466 estrellas), detallando las 8 tareas operativas: entorno virtual aislado (`venv`), instalación de `google-cloud-pubsub`, gestión programática de temas con `publisher.py` (`PublisherClient`), aprovisionamiento de suscripciones con `subscriber.py` (`SubscriberClient`), publicación con `gcloud` y recepción asíncrona concurrente mediante streaming pull con funciones callback y confirmación explícita `message.ack()`.
  * Documentadas las 2 evaluaciones formativas: naturaleza asíncrona fiable del servicio (True) y definición de topic como canal compartido.
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 9: Publish and Subscribe to Messages in Pub/Sub Using Python (Lab ID: GSP094 / 592549)** detallando los contratos de la librería cliente (cargas útiles obligatoriamente codificadas en bytes, canal gRPC bidireccional streaming pull y necesidad estricta de invocar `message.ack()` para evitar reentregas por expiración de `ack_deadline`).
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Ajustada la duración a 10 minutos en `appdev-lab-9` y actualizados los 4 pasos formativos con scripts Python SDK y tips de examen ACE.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Laboratorio 8: Pub/Sub: Qwik Start - Command Line (Lab GSP095 / 592548)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab8-pubsub-command-line.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab8-pubsub-command-line.md) con las instrucciones completas del laboratorio oficial GSP095 (Skills ID: `592548`, No cost, 10 min, 16,466 estrellas), detallando las 4 tareas operativas: ciclo de vida de topics (`create`, `list`, `delete`), ciclo de vida de suscripciones (`create --topic`, `list-subscriptions`, `delete`), publicación individual y extracción unitaria con confirmación (`--auto-ack`), y extracción de lotes concurrentes con la bandera `--limit`.
  * Documentada la evaluación formativa sobre la obligatoriedad de suscripciones para recibir mensajes publicados (True).
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 8: Pub/Sub: Qwik Start - Command Line (Lab ID: GSP095 / 592548)** documentando la trampa de examen ACE sobre descarte irreversible de mensajes publicados antes de crear suscripciones, y el uso de la bandera `--limit` para optimización de consumo de red y buffers.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Ajustada la duración a 10 minutos en `appdev-lab-8` e integrados los 4 pasos formativos con comandos gcloud CLI y tips de examen ACE.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Laboratorio 7: Manage Pub/Sub in the Google Cloud Console (Lab GSP096 / 592547)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab7-manage-pubsub-console.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab7-manage-pubsub-console.md) con las instrucciones completas del laboratorio oficial GSP096 (Skills ID: `592547`, No cost, 10 min, 16,466 estrellas), detallando las 5 tareas operativas: creación del topic `MyTopic`, suscripción de tipo Pull `MySub` (plazo de acuse de 10s y retención de 7 días), publicación de mensajes en texto plano y extracción con confirmación automática (`gcloud pubsub subscriptions pull --auto-ack MySub`).
  * Registradas las 2 evaluaciones formativas: relación publicador/topic y suscriptor/suscripción, y la naturaleza asíncrona altamente escalable de Pub/Sub (True).
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 7: Manage Pub/Sub in the Google Cloud Console (Lab ID: GSP096 / 592547)** contrastando la semántica operativa de las suscripciones Pull (para procesos batch y trabajadores detrás de NAT) frente a Push (para invocación de webhooks HTTPS serverless), la garantía de entrega al menos una vez (*at-least-once*) y la necesidad de idempotencia en consumidores al vencer `ack_deadline`.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Ajustada la duración a 10 minutos en `appdev-lab-7` e integrados los 4 pasos formativos con comandos gcloud CLI y tips de examen ACE.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Laboratorio 6: Deploy a Cloud Run Function via the Command Line (Lab GSP080 / 592546)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab6-deploy-cloud-run-function-cli.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab6-deploy-cloud-run-function-cli.md) con las instrucciones completas del laboratorio oficial GSP080 (Skills ID: `592546`, 1 crédito, 15 min, 16,466 estrellas), detallando las 5 tareas operativas: estructuración de código `gcf_hello_world` en Node.js, procesamiento de CloudEvents con decodificación Base64 de cargas útiles Pub/Sub, despliegue mediante `gcloud functions deploy` (`--gen2`, `--trigger-topic=cf-demo`, `--service-account`), verificación de estado activo con `describe`, publicación de mensajes asíncronos y lectura de logs mediante `gcloud functions logs read`.
  * Documentada la evaluación formativa sobre las ventajas operativas del modelo serverless (True).
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 6: Deploy a Cloud Run Function via the Command Line (Lab ID: GSP080 / 592546)** detallando la integración de Eventarc en funciones de 2ª generación, el patrón obligatorio de decodificación Base64 en buffers de Pub/Sub y la asignación obligatoria de cuentas de servicio con privilegios mínimos en producción.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Ajustada la duración a 15 minutos en `appdev-lab-6` y actualizados los 4 pasos formativos con comandos gcloud CLI y tips de examen ACE.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Laboratorio 5: Deploy a Cloud Run Function via the Google Cloud Console (Lab GSP081 / 592545)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab5-deploy-cloud-run-function-console.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab5-deploy-cloud-run-function-console.md) con las instrucciones completas del laboratorio oficial GSP081 (Skills ID: `592545`, 1 crédito, 15 min, 16,466 estrellas), detallando las 5 tareas operativas: creación del servicio serverless `gcfunction` en Cloud Run Services, habilitación de entorno de 2ª generación, configuración de acceso público (`allUsers` + `roles/run.invoker`), fijación de límite de escalabilidad a 5 instancias concurrentes, despliegue de `helloHttp` en Node.js, pruebas de invocación con carga útil JSON (`{"message":"Hello World!"}`) y supervisión de trazas en Cloud Logging.
  * Documentadas las 2 evaluaciones formativas: naturaleza serverless orientada a eventos (True) y tipo de disparador utilizado (HTTPS).
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 5: Deploy a Cloud Run Function via the Google Cloud Console (Lab ID: GSP081 / 592545)** vinculando la arquitectura Knative de 2ª generación con las preguntas de examen ACE sobre contención de costes y protección de bases de datos backend mediante el parámetro `--max-instances`.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Ajustada la duración a 15 minutos en `appdev-lab-5` e integrados los 4 pasos formativos con comandos gcloud CLI y tips de examen ACE.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Laboratorio 4: Monitor a Compute Engine Instance with Cloud Monitoring (Lab GSP089 / 592544)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab4-monitor-compute-cloud-monitoring.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab4-monitor-compute-cloud-monitoring.md) con las instrucciones completas del laboratorio oficial GSP089 (Skills ID: `592544`, 1 crédito, 20 min, 16,466 estrellas), detallando las 7 tareas operativas: creación de VM `lamp-1-vm` con HTTP permitido, instalación de Apache/PHP, despliegue del Google Cloud Ops Agent, Uptime Checks de frecuencia a 1 minuto, políticas de alertas con métricas `agent.googleapis.com/interface/traffic` y notificación por email, diseño de panel personalizado con widgets de CPU Load y Received Packets, y auditoría de eventos de parada y arranque en Cloud Logging.
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 4: Monitor a Compute Engine Instance with Cloud Monitoring (Lab ID: GSP089 / 592544)** con la resolución exhaustiva de la trampa clásica del examen ACE respecto a la ceguera del hipervisor sobre la memoria RAM y particiones de disco de la VM sin el Ops Agent.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Ajustada la duración a 20 minutos en `appdev-lab-4` e integrados los 5 pasos operativos con sus comandos específicos y tips de examen ACE.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Laboratorio 3: Manage Access Control with IAM (Lab GSP064 / 592543)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab3-manage-access-control-iam.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab3-manage-access-control-iam.md) con las instrucciones completas del laboratorio oficial GSP064 (Skills ID: `592543`, 1 crédito, 15 min, 16,466 estrellas), detallando las 4 tareas operativas: exploración de roles básicos (`roles/browser`, `roles/viewer`, `roles/editor`, `roles/owner`) y permisos administrativos (`resourcemanager.projects.setIamPolicy`), creación de bucket de prueba con `sample.txt`, revocación del rol `Viewer` y ventana de propagación de hasta 80 segundos, y concesión de permisos de menor privilegio con `roles/storage.objectViewer` verificados mediante `gcloud storage ls`.
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 3: Manage Access Control with IAM (Lab ID: GSP064 / 592543)** detallando la comparativa entre roles básicos (primitivos) y roles predefinidos, la ventana de latencia de propagación de políticas y los comandos equivalentes `gcloud projects add-iam-policy-binding` y `remove-iam-policy-binding`.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Actualizada la duración oficial a 15 minutos en `appdev-lab-3` y desglosados los 4 pasos formativos con comandos gcloud CLI y tips de examen ACE.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Laboratorio 2: Manage Cloud Storage with the Google Cloud CLI (Lab GSP074 / 592542)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab2-manage-cloud-storage-cli.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab2-manage-cloud-storage-cli.md) con las instrucciones completas del laboratorio oficial GSP074 (Skills ID: `592542`, 1 crédito, 15 min, 16,466 estrellas), detallando los comandos `gcloud storage` para creación de buckets, subida (`ada.jpg`), descarga (`cp -r`), prefijos de carpetas virtuales (`image-folder/`), listado detallado (`ls -l`), asignación de ACLs públicas (`--add-acl-grant=entity=allUsers,role=READER`), revocación de acceso (`--remove-acl-grant=allUsers`) y borrado destructivo (`rm`).
  * Registradas las 3 preguntas formativas: clase de almacenamiento predeterminada configurable (True), definición de ACLs para control de buckets/objetos (True) y revocación de permisos públicos eliminando `allUsers`.
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 2: Manage Cloud Storage with the Google Cloud CLI (Lab ID: GSP074 / 592542)** contrastando el estándar moderno `gcloud storage` frente a la herramienta heredada `gsutil`, las implicaciones de aplicar ACLs granulares frente a UBLA, y la persistencia de objetos en claves planas delimitadas por `/`.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Ajustada la duración a 15 minutos en `appdev-lab-2` e integrados los 5 pasos operativos con sus comandos específicos y tips de examen ACE.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Challenge Lab: Set Up an App Dev Environment on Google Cloud (Lab GSP315 / 592550)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-challenge-lab-gsp315.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-challenge-lab-gsp315.md) detallando el escenario completo del proyecto Memories de Jooli Inc. (Lab GSP315, Skills ID: `592550`, 25 minutos, 1 crédito, 16,246 estrellas), las 4 tareas evaluadas, el código Node.js 22 con `@google-cloud/functions-framework`, `@google-cloud/storage`, `@google-cloud/pubsub`, `sharp` y el script de resolución automatizada con gcloud CLI.
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Actualizada la sección **Lab 10: Set Up an App Dev Environment on Google Cloud: Challenge Lab (Lab ID: GSP315 / 592550)** documentando la arquitectura de procesamiento reactivo en 4 fases, parámetros de despliegue gen2, solución al bug de filtrado de miniaturas para evitar bucles infinitos en Cloud Storage, y revocación estricta de privilegios IAM (`roles/viewer`).
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Actualizado `appdev-lab-10` ajustando la duración a 25 minutos y desglosando los 4 pasos operativos específicos del reto con comandos CLI listos para ejecución y validación.
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Laboratorio 1: Manage Cloud Storage with the Google Cloud Console (Lab GSP073 / 592541)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-lab1-manage-cloud-storage-console.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-lab1-manage-cloud-storage-console.md) con las instrucciones completas del laboratorio oficial GSP073 (Skills ID: `592541`, 1 crédito, 10 min, 16,246 estrellas), cubriendo las 5 tareas operativas de Cloud Storage: creación de bucket con restricciones globales DNS, subida de objetos (`kitten.png`), compartición pública con `allUsers` (`roles/storage.objectViewer`), carpetas virtuales (`folder1/folder2/`) y eliminación segura con confirmación `DELETE`.
  * Documentadas las 2 evaluaciones formativas: unicidad global de nombres de bucket (True) y unicidad local de nombres de objeto (True).
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Enriquecida la sección **Lab 1: Manage Cloud Storage with the Google Cloud Console (Lab ID: GSP073 / 592541)** con el desglose exhaustivo de las 5 tareas, reglas de nomenclatura para el examen ACE (3-63 caracteres, sin IP, sin `goog` o `google`), UBLA vs Fine-Grained, desactivación de *Public Access Prevention (PAP)* y URL pública formateada.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Ajustada la duración oficial del Lab 1 a 10 minutos e integrados los 5 pasos operativos con sus respectivos tips de examen y comandos explicativos para la interfaz web.
* **Índice General**:
  * Registrada la referencia en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Sección 1).

---

## [2026-11-18] - Ingesta de Curso 637: Set Up an App Dev Environment on Google Cloud

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-app-dev-environment-overview.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-app-dev-environment-overview.md) estructurando el temario del Skill Badge oficial (Template ID: `637`, 20 estrellas, 1 hora 15 minutos), con el desglose de sus 9 laboratorios guiados y el Challenge Lab integrador.
* **Síntesis Curricular (`wiki/courses/set-up-an-app-dev-environment-on-google-cloud.md`)**:
  * Creada la guía integral del curso que consolida:
    1. *Arquitectura troncal orientada a almacenamiento*: Cloud Storage, IAM, Cloud Run Functions, Pub/Sub y Cloud Monitoring.
    2. *Matriz técnica de los 10 laboratorios*: IDs de laboratorio (592541 a 592550), tecnologías evaluadas y comandos clave.
    3. *Desglose operativo paso a paso*: CLI moderno `gcloud storage` vs legacy `gsutil`, control granular con IAM (roles predefinidos vs básicos), monitoreo con Ops Agent en Compute Engine, despliegue de Cloud Run Functions gen2 y arquitectura de colas con Cloud Pub/Sub (CLI y Python SDK).
    4. *Challenge Lab (592550) Pre-flight & Solución Arquitectónica*: Checklist de verificación para la creación de infraestructura completa bajo restricciones de tiempo y validación automática.
    5. *Trampas frecuentes en el examen ACE*: ACLs vs UBLA, visibilidad de métricas de memoria de VMs con Ops Agent, expiración de acuse (`ack_deadline`) en Pub/Sub y banderas `gcloud functions deploy`.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Registrado el curso `gcp-course-637` (`set-up-an-app-dev-environment-google-cloud`) con 10 laboratorios detallados, enlaces directos a la plataforma de Google Skills, matriz de tecnologías evaluadas, trampas de examen, cuestionario interactivo de 4 preguntas y glosario especializado.
* **Pruebas Unitarias (`tests/unit/appDevEnvironmentCourse.test.ts`)**:
  * Creada una nueva suite con 7 pruebas unitarias verificando la integridad del catálogo, los 10 laboratorios, preguntas de evaluación y glosario.
  * Suite completa ejecutada en WSL: 52/52 pruebas superadas (100% éxito en 8 suites).
* **Índice General**:
  * Registradas las referencias modulares en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) (Secciones 1 y 5).

---

## [2026-11-18] - Ingesta de Lección 35: Course Summary y Cierre Curricular (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-course-summary.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-course-summary.md) con la transcripción completa de la sesión final de clausura (Video ID: `689589`, YouTube: `9lbfxj-K3Qo`, Puntos acumulados: 16,246), síntesis recapitulativa de los 7 módulos del curso (IaaS/PaaS, Jerarquía/IAM, Redes/Compute Engine/Load Balancing, Almacenamiento políglota, Contenedores/GKE, Serverless Cloud Run/Functions y Gemini/Prompt Engineering) y hoja de ruta hacia la certificación Google Cloud ACE.
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la Lección 35 (*Course summary*).
  * Redactada la sección **🎓 8. Resumen Curricular Consolidado y Hoja de Ruta de Certificación ACE**:
    1. *8.1 Matriz de Competencias Adquiridas*: Tabla integradora de los 7 módulos oficiales cruzando foco tecnológico, competencias troncales y herramientas clave.
    2. *8.2 Mapeo Directo a los 4 Dominios del Examen ACE*: Distribución porcentual y temática (Configuración del entorno ~23%, Planificación e implementación ~30%, Operación exitosa ~27%, Acceso y seguridad ~20%).
    3. *8.3 Recursos Oficiales de Certificación y Próximos Pasos*: Enlaces a la guía de examen de Google Cloud, rutas formativas y simuladores de examen.
  * Renumeradas coherentemente las secciones finales (**🛠️ 9. Laboratorios Prácticos del Curso**, **🎯 10. Árbol de Decisión de Cómputo para el Examen ACE** y **💡 11. Trampas Frecuentes en el Examen ACE**).
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Añadida la lección `vid-60-35` (*Course summary*) al curso `google-cloud-fundamentals-core-infrastructure` con su reproductor oficial de YouTube (`9lbfxj-K3Qo`), duración (`3:56`), resumen ejecutivo y 5 conclusiones clave para la certificación ACE.
* **Verificación y Pruebas**:
  * Actualizada la suite de pruebas unitarias (`tests/unit/coreInfrastructureCourse.test.ts`) verificando la presencia de 'Course summary' en los videos catalogados.
  * Ejecutada la suite completa de pruebas unitarias y BDD en WSL con 45/45 pruebas aprobadas (100% de éxito).
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-18] - Ingesta de Cuestionario Oficial: Quiz Módulo 7 - Prompt Engineering (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-quiz-module-7-prompt-engineering.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-quiz-module-7-prompt-engineering.md) con el banco oficial de preguntas, respuestas oficiales y justificaciones técnicas para el Módulo 7 (Passing score: 75%, Puntos acumulados: 16,070):
    1. *You need an LLM to convert unstructured text into a rigid, custom JSON structure. Which prompting technique should you implement?* -> **A few-shot prompt that includes illustrative output examples.** (provisión de ejemplos demostrativos para forzar esquemas deterministas y sin desviaciones).
    2. *What is the primary defining function of generative AI?* -> **Generate original text, images, code, or other media using generative models.** (creación de nuevo contenido original sintetizado a partir de patrones estadísticos aprendidos).
    3. *Which practice aligns with Google-recommended guidelines for prompt construction?* -> **Maintain concise phrasing and direct instructions.** (instrucciones claras, precisas y oraciones concisas para maximizar atención y fiabilidad).
    4. *How can you avoid hallucinations when training or prompting a large language model (LLM)?* -> **Train the model on a clean, curated dataset.** (datos limpios y curados en el entrenamiento, junto con contexto y restricciones delimitadas en inferencia).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Redactada e integrada la subsección **7.4 Evaluación y Conceptos de Examen del Módulo 7 (Quiz de Prompt Engineering y Gemini)** detallando los fundamentos arquitectónicos evaluados.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Incorporadas las 4 preguntas oficiales (`c-m7-q1`, `c-m7-q2`, `c-m7-q3`, `c-m7-q4`) al banco de evaluación interactiva del curso `google-cloud-fundamentals-core-infrastructure`.
* **Verificación y Pruebas**:
  * Ejecutada la suite completa de pruebas unitarias y BDD en WSL con 45/45 pruebas aprobadas (100% de éxito).
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-17] - Ingesta de Lección 34: Prompt Engineering (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-prompt-engineering.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-prompt-engineering.md) con la transcripción completa oficial de la Lección 34 (Video ID: `689587`, YouTube: `5zoKVf-cnf4`, Puntos: 16,060), taxonomía comparativa entre IA, Gen AI y LLMs, escala masiva en petabytes y parámetros, pre-training (autocompletado probabilístico) frente a fine-tuning, diagnóstico exhaustivo de alucinaciones (datos insuficientes, datos sucios, falta de contexto o restricciones), integración nativa de Gemini en Google Cloud Console y Cloud Shell, taxonomía de 4 tipos de prompts (zero-shot, one-shot, few-shot, role prompts), anatomía estructural (preamble e input) y las 5 mejores prácticas para ingenieros cloud.
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la Lección 34 (*Prompt Engineering*).
  * Redactada la sección **🤖 7. Módulo 7: Gemini y Prompt Engineering en Google Cloud (Google Cloud: Prompt Engineer Guide)**:
    1. *7.1 Fundamentos de Gen AI, Arquitectura de LLMs y Gemini en Google Cloud*: Diagrama jerárquico de IA a LLMs, parámetros como memoria aprendida, pre-training probabilístico, fine-tuning y causas de alucinaciones.
    2. *7.2 Anatomía del Prompt: Preamble vs Input y los 4 Tipos de Prompts*: Distinción entre preámbulo (contexto, persona, restricciones) e input (solicitud central), y características de zero-shot, one-shot, few-shot y role prompts.
    3. *7.3 Las 5 Mejores Prácticas de Prompt Engineering para Operaciones Cloud*: Instrucciones explícitas, enfoque positivo, respuestas de contingencia (fallback outputs), personas técnicas y oraciones concisas.
  * Renumeradas coherentemente las secciones posteriores (**🛠️ 8. Laboratorios Prácticos**, **🎯 9. Árbol de Decisión de Cómputo** y **💡 10. Trampas Frecuentes en el Examen ACE**), añadiendo trampas específicas de IA generativa (grounding con datos corporativos, alucinaciones en sintaxis CLI y contraste entre few-shot y fine-tuning).
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Añadida la lección `vid-60-34` (*Prompt Engineering*) al curso `google-cloud-fundamentals-core-infrastructure` con su reproductor de YouTube oficial (`5zoKVf-cnf4`), resumen técnico completo y 5 conclusiones clave orientadas a la certificación ACE.
* **Verificación y Pruebas**:
  * Actualizada la suite de pruebas unitarias (`tests/unit/coreInfrastructureCourse.test.ts`) asegurando la presencia de 'Prompt Engineering' en los videos catalogados.
  * Ejecutada la suite completa de pruebas unitarias y BDD con 45/45 pruebas aprobadas (100% de éxito).
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-17] - Ingesta de Cuestionario Oficial: Quiz Módulo 6 - Development in the Cloud (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-quiz-module-6-development.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-quiz-module-6-development.md) con el banco oficial de preguntas, respuestas oficiales y justificaciones técnicas para el Módulo 6 (Passing score: 66%, Puntos acumulados: 16,020):
    1. *Why might a Google Cloud customer choose to use Cloud Run functions?* -> **Their application contains event-driven code that they don't want to provision compute resources for.** (ejecución puntual ante eventos sin aprovisionar ni pagar por servidores dedicados en reposo).
    2. *Which of these statements about Cloud Run functions are correct? Select three.* -> **Is integrated with Cloud Logging**, **Is a scalable functions-as-a-service platform**, **Can be used to extend Cloud services** (integración sin agentes en observabilidad, autoescalado elástico a cero y código de enlace reactivo para Storage, Firestore y Pub/Sub).
    3. *Which scenario is best suited for using Cloud Run instead of Cloud Run functions?* -> **Hosting a dynamic web application that allows users to upload and share photos.** (las aplicaciones web dinámicas completas con UI, autenticación y múltiples rutas requieren contenedores en Cloud Run, a diferencia de tareas atómicas de eventos).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Redactada e integrada la subsección **6.4 Evaluación y Conceptos de Examen del Módulo 6 (Quiz de Desarrollo en la Nube y Serverless)** detallando los fundamentos arquitectónicos y los criterios de discriminación entre FaaS y CaaS evaluados en el examen ACE.
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Incorporadas las preguntas del Módulo 5 (`c-m5-q1`, `c-m5-q2`) y Módulo 6 (`c-m6-q1`, `c-m6-q2`, `c-m6-q3`) al banco de evaluación interactiva del curso.
* **Verificación y Pruebas**:
  * Verificada la suite completa de pruebas unitarias y BDD en WSL con 45/45 pruebas aprobadas (100% de éxito).
* **Índice General**:
  * Registrada la referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-17] - Ingesta de Lecciones Finales Módulo 6: Serverless en Cloud Run, Cloud Run Functions y Laboratorio Hello Cloud Run (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada y Modularización**:
  * Procesado el insumo en bruto [`wiki/raw/gcp-fundamentals-core-infrastructure-last-lessons.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/gcp-fundamentals-core-infrastructure-last-lessons.md).
  * Ingestado [`wiki/raw/skills-core-cloud-run.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-run.md) con la transcripción oficial de la Lección 32 (Video ID: `689583`, YouTube: `R3Ec_4tC3oc`, Puntos: 15,990), principios serverless, Knative, autoescalado instantáneo a cero, modelo de cobro a 100 ms + tarifa por millón de solicitudes, flujo de trabajo en 3 etapas (código, Dockerfile/Buildpacks, Artifact Registry) y soporte para binarios Linux de 64 bits.
  * Ingestado [`wiki/raw/skills-core-development-in-the-cloud.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-development-in-the-cloud.md) con la transcripción oficial de la Lección 33 (Video ID: `689584`, YouTube: `zoq8Lajo7dE`, Puntos: 16,000), concepto de pegamento en la nube (*cloud glue code*), arquitectura orientada a eventos (desacoplamiento de procesamiento multimedia en Cloud Storage y colas en Pub/Sub), invocación síncrona HTTP y runtimes soportados (Node.js, Python, Go, Java, .NET Core, Ruby, PHP).
  * Ingestado [`wiki/raw/skills-core-hello-cloud-run.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-hello-cloud-run.md) con la guía técnica completa del Laboratorio 4 (Lab ID: `CBL333` / `689585`, Puntos: 16,010), abarcando habilitación de APIs (`run.googleapis.com`, `artifactregistry.googleapis.com`), aplicación Express en Node.js, repositorios Docker en Artifact Registry, compilación en la nube con Cloud Build (`gcloud builds submit`), despliegue con `--allow-unauthenticated` y limpieza preventiva de costes.
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la Lección 32 (*Cloud Run*) y la Lección 33 (*Development in the cloud*).
  * Redactada la sección **⚡ 6. Módulo 6: Desarrollo y Cómputo Serverless en la Nube (Developing Applications in the Cloud)**:
    1. *6.1 Cloud Run: Contenedores Serverless, Knative y Arquitectura Stateless*: Diagrama ASCII de flujo cliente-GFE-Knative-contenedores, portabilidad Knative, autoescalado a 0, facturación con granularidad a 100 ms y certificados HTTPS automáticos.
    2. *6.2 Cloud Run Functions: Cómputo Ligero Orientado a Eventos (FaaS)*: Desacoplamiento de tareas operativas y de negocio, disparadores asíncronos (Cloud Storage, Pub/Sub) vs invocación síncrona HTTP y modelos de tarificación al milisegundo.
    3. *6.3 Comparativa Arquitectónica de Cómputo*: Matriz evaluativa multidimensional contrastando Compute Engine (IaaS), GKE (CaaS), Cloud Run (Serverless CaaS) y Cloud Run Functions (Serverless FaaS).
  * Renumerada y expandida la sección de Laboratorios Oficiales (**🛠️ 7. Laboratorios Prácticos del Curso**), actualizando el **Lab 4: Hello Cloud Run** con las 6 tareas operativas completas, comandos de CLI y consideraciones críticas de examen.
  * Renumeradas las secciones finales (**🎯 8. Árbol de Decisión de Cómputo** y **💡 9. Trampas Frecuentes en el Examen ACE**) incorporando trampas de examen específicas para arquitecturas serverless (naturaleza *stateless*, requerimiento de escuchar en variable `PORT`, bandera `--allow-unauthenticated` y uso de Google Cloud Buildpacks sin Dockerfile).
* **Catálogo y UI de Cursos (`src/data/coursesData.ts`)**:
  * Incorporadas las lecciones `vid-60-32` (*Cloud Run*) y `vid-60-33` (*Development in the cloud*) en el curso `google-cloud-fundamentals-core-infrastructure` con sus respectivos reproductores de YouTube oficiales (`R3Ec_4tC3oc` y `zoq8Lajo7dE`), resúmenes técnicos y conclusiones clave para la certificación ACE.
  * Actualizado el laboratorio práctico `core-lab-4` (*Hello Cloud Run*) a 60 minutos con sus 6 pasos de laboratorio detallados y comandos reproducibles.
* **Verificación y Pruebas**:
  * Actualizada la suite de pruebas unitarias (`tests/unit/coreInfrastructureCourse.test.ts`) verificando la presencia de los videos 32 y 33 y la consistencia de los 6 pasos del laboratorio 4.
  * Ejecutada la suite completa de pruebas unitarias y BDD resultando en 45/45 pruebas aprobadas (100% éxito).
* **Índice General**:
  * Registradas las referencias modulares en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-13] - Ingesta de Cuestionario Oficial: Quiz Módulo 5 - Containers in the Cloud (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-quiz-module-5-containers.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-quiz-module-5-containers.md) con el banco oficial de preguntas, respuestas oficiales y justificaciones técnicas para el Módulo 5 (Passing score: 50%, Puntos acumulados: 14,250):
    1. *What is a Kubernetes pod?* -> **A group of containers** (unidad atómica mínima desplegable que encapsula uno o más contenedores compartiendo IP única de red, puertos y volúmenes).
    2. *Where do the resources used to build Google Kubernetes Engine clusters come from?* -> **Compute Engine** (los clústeres de GKE aprovisionan instancias de máquinas virtuales de Compute Engine como nodos de trabajo).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Creada la subsección **5.4 Evaluación y Conceptos de Examen del Módulo 5 (Quiz de Contenedores y GKE)** detallando los fundamentos arquitectónicos evaluados en la certificación ACE.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-13] - Ingesta de Lección 31: Google Kubernetes Engine (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-google-kubernetes-engine.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-google-kubernetes-engine.md) con la transcripción completa oficial, simplificación operativa de GKE frente a K8s autogestionado (Control Plane administrado por Google sin coste de mantenimiento), matriz comparativa detallada entre **GKE Autopilot** (modo recomendado, gestión desatendida, endurecimiento de seguridad CIS y pago por Pods solicitados) y **GKE Standard** (gestión manual de VMs de nodos, pago por infraestructura de Compute Engine), capacidades avanzadas de clúster (Node pools heterogéneos, Cluster Autoscaler, Node auto-upgrades, Node auto-repair, balanceo de carga integrado y observabilidad nativa) y comandos CLI esenciales (`create-auto`, `create`, `get-credentials`) para la lección 31 (Video ID: `689581`, YouTube: `HMcFwcqNjOY`, Puntos acumulados: 14,250).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso integrando la Lección 31 (*Google Kubernetes Engine*).
  * Redactada e integrada la subsección **5.3 Google Kubernetes Engine (GKE): Modos Operativos (Autopilot vs Standard) y Gestión Avanzada**:
    1. Diferenciación de GKE frente a K8s puro: Control Plane completamente administrado por Google Cloud con alta disponibilidad y endpoint seguro para `kubectl`.
    2. Tabla comparativa: GKE Autopilot vs GKE Standard (enfoque, gestión de nodos, seguridad, red, facturación por Pods vs por VMs y recomendaciones oficiales).
    3. Capacidades avanzadas de clúster: Cloud Load Balancing (NLB/ALB), Node pools heterogéneos (aceleradores GPU/Compute), Cluster Autoscaler, actualizaciones automáticas de versión y auto-reparación continua ante fallos.
    4. Guía de comandos `gcloud container clusters` (`create-auto`, `create`, `get-credentials`, `list`).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-31` (*Google Kubernetes Engine*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor oficial de YouTube (`HMcFwcqNjOY`) y 5 conclusiones clave para la certificación ACE.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-13] - Ingesta de Lección 30: Kubernetes (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-kubernetes.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-kubernetes.md) con la transcripción completa oficial, arquitectura del clúster (Control Plane y Nodos Worker en VMs de Compute Engine), abstracción atómica del Pod (red e IP compartida, puertos, volúmenes y patrón multi-contenedor sidecar), Deployments y resiliencia (*self-healing*, autoescalado), Services como endpoints estables (desacoplamiento frontend/backend y aprovisionamiento automático de Cloud Network Load Balancer en GKE), contraste entre paradigmas declarativo e imperativo, y estrategia de *Rolling Updates* sin caída de servicio para la lección 30 (Video ID: `689580`, YouTube: `4NTyB0eEB_A`, Puntos acumulados: 14,230).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso integrando la Lección 30 (*Kubernetes*).
  * Redactada e integrada la subsección **5.2 Kubernetes: Arquitectura de Clúster, Pods, Deployments, Services y Rollouts**:
    1. Arquitectura de Clúster: Control Plane centralizado (100% gestionado en GKE) frente a Nodos de trabajo (instancias VM de Compute Engine ejecutando `kubelet`, `kube-proxy` y `containerd`).
    2. El Pod como unidad mínima de despliegue: regla de oro 1:1, excepción de contenedores sidecar por dependencia estricta, IP compartida y comunicación por `localhost`.
    3. Deployments: réplicas homogéneas, auto-reparación ante fallo de nodos físicos/VMs y escalado horizontal con HPA.
    4. Services: resolución del problema de las IPs efímeras de los Pods, asignación de IP fija interna (*ClusterIP*), desacoplamiento arquitectónico frontend-backend y aprovisionamiento automático de Network Load Balancer (NLB) de Google Cloud para servicios tipo `LoadBalancer`.
    5. Comparativa entre modos imperativo (`kubectl run/scale`) y declarativo (`kubectl apply -f`) junto a comandos clave de inspección (`get`, `describe`).
    6. Estrategia de Rolling Update: actualización gradual de Pods sin tiempo de inactividad (*zero downtime*) y capacidad de rollback instantáneo.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-30` (*Kubernetes*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`4NTyB0eEB_A`) y 5 conclusiones clave orientadas al examen de certificación ACE.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Lección 29: Introduction to containers (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-introduction-to-containers.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-introduction-to-containers.md) con la transcripción oficial, análisis de la virtualización de hardware (VMs) frente a la virtualización de sistema operativo (contenedores), principios de portabilidad extrema ("de la laptop a la nube"), densidad de empaquetado, arquitectura de microservicios y rol de GKE como puente entre IaaS y PaaS para la lección 29 (Video ID: `689579`, YouTube: `fkyu-gVr4IU`, Puntos acumulados: 14,220).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso con la Lección 29 (*Introduction to containers*).
  * Creado el apartado **5. Módulo 5: Contenedores en la Nube y Kubernetes (Containers in the Cloud)** y la subsección **5.1 Introducción a los Contenedores: Virtualización del SO, Eficiencia y Microservicios**:
    1. Tabla comparativa: IaaS vs PaaS vs Contenedores (nivel de abstracción, unidad mínima, tiempo de arranque y flexibilidad).
    2. Anatomía de un contenedor (namespaces, cgroups, kernel compartido del host y arranque instantáneo).
    3. Portabilidad y consistencia entre entornos heterogéneos.
    4. Arquitectura de microservicios con escalabilidad y tolerancia a fallos desacopladas.
    5. GKE como puente operativo entre la automatización de PaaS y el control granular de IaaS.
  * Renumeradas coherentemente las secciones posteriores (6. Laboratorios Prácticos, 7. Árbol de Decisión de Cómputo, 8. Trampas Frecuentes).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-29` (*Introduction to containers*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`fkyu-gVr4IU`) y conclusiones clave para el examen ACE.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Quiz Módulo 4: Storage in the Cloud (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-quiz-module-4-storage.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-quiz-module-4-storage.md) con las 3 preguntas oficiales, opciones, respuestas correctas, justificaciones técnicas y análisis de opciones distractoras del Quiz 689578 (*Passing Score: 66%*, Puntos acumulados: 14,100).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Creado el apartado **4.9 Cuestionario Oficial de Evaluación: Módulo 4 (Syllabus Quiz)** integrando las 3 preguntas oficiales con su enfoque específico para la certificación Google Cloud ACE:
    1. Idoneidad canónica de Cloud Storage para almacenar datos no estructurados con 11 nueves de durabilidad y alta disponibilidad.
    2. Adopción de Coldline Storage para minimizar costos mensuales de datos leídos como máximo una vez por trimestre (< 90 días).
    3. Selección de Cloud Spanner como único motor relacional gestionado con escalabilidad horizontal masiva a petabytes y disponibilidad del 99.999%.
* **Catálogo y Banco de Preguntas (`src/data/coursesData.ts`)**:
  * Incorporadas las preguntas oficiales (`c-m4-q1`, `c-m4-q2` y `c-m4-q3`) al array `quiz` del curso 60 con sus trampas de examen (`examTrapTip`) y explicaciones pedagógicas.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Laboratorio Oficial: Getting Started with Cloud Storage and Cloud SQL (Lab 689577)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-getting-started-with-cloud-storage-and-cloud-sql.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-getting-started-with-cloud-storage-and-cloud-sql.md) con la guía oficial completa de laboratorio, parámetros de aprovisionamiento de la VM `bloghost` (startup script para Apache/PHP/MySQL), creación de bucket y asignación de ACL pública al banner gráfico con `gcloud storage` / `gsutil acl ch`, aprovisionamiento de Cloud SQL MySQL `blog-db` con usuario `blogdbuser` y red autorizada (`/32`), script PHP de conexión PDO y trampas clave de examen ACE (co-ubicación zonal, Secret Manager vs hardcoded passwords, Private IP vs Authorized Networks y UBLA vs ACLs) (Lab ID: `689577`, Puntos acumulados: 14,100).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizado en profundidad el apartado **Lab 3: Getting Started with Cloud Storage and Cloud SQL (Lab ID: 689577)** en la Sección 5 con la arquitectura completa, comandos CLI reales, código fuente de la aplicación PHP y directrices arquitectónicas para el examen ACE.
* **Catálogo y UI de Cursos**:
  * Actualizado el laboratorio `core-lab-3` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con 6 pasos detallados, duración de 50 minutos, comandos precisos y consejos técnicos (*tips*).
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Lección 28: Comparing storage options (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-comparing-storage-options.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-comparing-storage-options.md) con la transcripción oficial, matriz comparativa de almacenamiento, restricciones de tamaño por unidad (Cloud Storage 5 TB, Firestore 1 MB, Bigtable 10 MB/celda), Cloud SQL (< 64 TB) vs Spanner (petabytes horizontales), rol analítico OLAP de BigQuery y trampas de examen ACE para la lección 28 (Video ID: `689576`, YouTube: `jAPJ_aVxCbQ`, Puntos acumulados: 14,090).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso incorporando la fila para la Lección 28 (*Comparing storage options*).
  * Creado el apartado **4.8 Comparativa Integral de Opciones de Almacenamiento y Matriz de Decisión (Storage Decision Blueprint)**:
    1. Matriz de síntesis comparativa canónica: naturaleza del dato, capacidades máximas, límites por unidad, modelo de consulta y casos predilectos de examen.
    2. Restricciones técnicas por unidad críticas (5 TB en Cloud Storage, 1 MB por doc en Firestore, 10 MB/celda y 100 MB/fila en Bigtable).
    3. Posicionamiento arquitectónico de BigQuery en la frontera entre almacenamiento y computación analítica masiva (OLAP).
    4. Árbol de decisión rápido para la certificación Google Cloud ACE.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-28` (*Comparing storage options*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`jAPJ_aVxCbQ`) y conclusiones de examen.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Lección 27: Bigtable (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-bigtable.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-bigtable.md) con la transcripción oficial, arquitectura de desacoplamiento cómputo/almacenamiento (Colossus), los 6 criterios de selección de Bigtable (> 1 TB, high throughput, NoSQL, series temporales/IoT, batch/streaming, machine learning), compatibilidad con la API de Apache HBase y trampas clave de examen ACE para la lección 27 (Video ID: `689575`, YouTube: `bfztO0_4fhw`, Puntos acumulados: 14,080).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso incorporando la fila para la Lección 27 (*Bigtable*).
  * Creado el apartado **4.7 Cloud Bigtable: Base de Datos NoSQL Columnar Masiva, Latencia Sub-10ms y Streaming IoT**:
    1. Tecnología de persistencia probada (Search, Analytics, Maps, Gmail) y arquitectura desacoplada de cómputo y almacenamiento (Colossus).
    2. Los 6 criterios oficiales de decisión para Bigtable (umbral > 1 TB, alta frecuencia de escritura, atomicidad de fila única y series temporales).
    3. Ecosistema de ingestión y analítica: compatibilidad HBase API, streaming con Dataflow/Spark/Storm, batch con Dataproc Hadoop y sincronización downstream.
    4. Flujo de comandos CLI con `gcloud bigtable`.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-27` (*Bigtable*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`bfztO0_4fhw`) y conclusiones técnicas de examen.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Lección 26: Firestore (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-firestore.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-firestore.md) con la transcripción oficial, análisis del modelo de documentos/colecciones, indexación automática (rendimiento proporcional al resultado y no al total de datos), sincronización reactiva en tiempo real, soporte y caché offline con resolución de conflictos, transacciones ACID y trampas de examen ACE para la lección 26 (Video ID: `689574`, YouTube: `Q1kSFl1LYMc`, Puntos acumulados: 14,070).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso incorporando la fila para la Lección 26 (*Firestore*).
  * Creado el apartado **4.6 Firestore: Base de Datos de Documentos NoSQL Serverless, Sincronización en Tiempo Real y Modo Offline**:
    1. Modelo jerárquico de documentos (pares clave-valor, objetos anidados), colecciones y subcolecciones.
    2. Consultas NoSQL con indexación automática por defecto y latencia dependiente exclusivamente del tamaño del resultado.
    3. Sincronización en vivo mediante listeners reactivos y soporte de persistencia local offline.
    4. Resiliencia de infraestructura con replicación multi-región, consistencia fuerte y transacciones atómicas.
    5. Flujo de comandos CLI con `gcloud firestore`.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-26` (*Firestore*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`Q1kSFl1LYMc`) y conclusiones pedagógicas.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Lección 25: Spanner (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-spanner.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-spanner.md) con la transcripción oficial, análisis de los 3 pilares técnicos (escala horizontal, consistencia fuerte con TrueTime API y soporte ANSI SQL 2011), rendimiento masivo de IOPS, comparativa frente a Cloud SQL y trampas de examen ACE para la lección 25 (Video ID: `689573`, YouTube: `uxmBbmv7Av0`, Puntos acumulados: 14,070).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso incorporando la fila para la Lección 25 (*Spanner*).
  * Creado el apartado **4.5 Cloud Spanner: Base de Datos Relacional Distribuida Global, Consistencia Fuerte y Escala Horizontal**:
    1. Los tres pilares de Spanner: escalabilidad horizontal ilimitada (*scale-out* sin paradas), consistencia fuerte externa (*TrueTime API*) y sintaxis SQL estándar con transacciones ACID distribuidas.
    2. Cargas de trabajo de misión crítica, rendimiento de decenas de miles a millones de IOPS y disponibilidad del 99.99% (Regional) y 99.999% (Multi-Región).
    3. Matriz de decisión comparativa: Cloud Spanner vs Cloud SQL (escala, almacenamiento, alcance geográfico y costos).
    4. Flujo de comandos CLI con `gcloud spanner`.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-25` (*Spanner*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`uxmBbmv7Av0`) y conclusiones clave para el examen ACE.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Lección 24: Cloud SQL (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-sql.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-sql.md) con la transcripción oficial, análisis técnico de DBaaS (MySQL, PostgreSQL, SQL Server), límites de escalado vertical (128 vCPUs, 864 GB RAM, 64 TB), replicación automática y Alta Disponibilidad regional (HA), políticas de respaldos gestionados (7 copias incluidas y PITR), seguridad con Private Service Access / Cloud SQL Auth Proxy y trampas de examen ACE para la lección 24 (Video ID: `689572`, YouTube: `yE-k0odGRzk`, Puntos acumulados: 14,050).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso incorporando la fila para la Lección 24 (*Cloud SQL*).
  * Creado el apartado **4.4 Cloud SQL: Bases de Datos Relacionales Gestionadas, Escalabilidad, Replicación y Conectividad**:
    1. Motores soportados y descarga de tareas administrativas rutinarias de infraestructura (parches, backups, replicación).
    2. Límites máximos de escalado vertical (128 vCPUs, 864 GB RAM, 64 TB con auto-incremento automático).
    3. Replicación (réplicas de lectura, réplicas externas y fuentes externas) y Alta Disponibilidad (HA regional con failover automático < 60s).
    4. Respaldos gestionados con 7 copias automáticas incluidas y PITR mediante registros binarios/WAL.
    5. Cifrado integral en reposo/tránsito y opciones de acceso a la red: Private IP (VPC Peering), Cloud SQL Auth Proxy y co-ubicación zonal con Compute Engine.
    6. Flujo de comandos prácticos con `gcloud sql` para la certificación ACE.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-24` (*Cloud SQL*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`yE-k0odGRzk`) y conclusiones de examen.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Lección 23: Cloud Storage: Storage classes and data transfer (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-storage-classes-and-data-transfer.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-storage-classes-and-data-transfer.md) con la transcripción oficial, desglose de las 4 clases de almacenamiento (Standard, Nearline, Coldline, Archive), atributos universales (latencia en ms, durabilidad de 11 nueves, sin mínimos de tamaño), Autoclass para ahorro dinámico de costes, cifrado en reposo/tránsito, herramientas de migración (gcloud, Storage Transfer Service, Transfer Appliance de hasta 1 PB) y trampas de examen ACE para la lección 23 (Video ID: `689571`, YouTube: `A5a8sPL6PjY`, Puntos acumulados: 14,040).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial del curso con la Lección 23 (*Cloud Storage: Storage classes and data transfer*).
  * Creado el apartado **4.3 Clases de Almacenamiento, Autoclass y Mecanismos de Transferencia de Datos**:
    1. Tabla comparativa detallada de las 4 clases de almacenamiento, tiempos de permanencia mínima y costos asociados.
    2. Atributos universales compartidos: latencia en milisegundos idéntica para todas las clases y durabilidad extrema del 99.999999999%.
    3. Autoclass: degradación automática a clases frías por inactividad y promoción inmediata a Standard al recibir accesos.
    4. Cifrado por defecto en reposo (GMEK/CMEK) y en tránsito (HTTPS/TLS).
    5. Opciones de transferencia de datos: `gcloud storage`, Cloud Console, Storage Transfer Service y Transfer Appliance físico.
    6. Integración transversal con BigQuery, Cloud SQL, Compute Engine, App Engine y Firestore.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-23` (*Cloud Storage: Storage classes and data transfer*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`A5a8sPL6PjY`) y conclusiones clave para el examen ACE.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-12] - Ingesta de Lección 22: Cloud Storage (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-storage.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-storage.md) con la transcripción oficial, análisis arquitectónico de almacenamiento de objetos frente a bloques y archivos, inmutabilidad, Object Versioning, IAM vs ACLs (Uniform Bucket-Level Access), políticas de ciclo de vida (Object Lifecycle Management) y trampas de examen ACE para la lección 22 (Video ID: `689570`, YouTube: `pLMkOa4FbwI`, Puntos acumulados: 14,030).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la tabla de la Videoteca Oficial incorporando las filas para la Lección 21 (*Google Cloud storage options*) y Lección 22 (*Cloud Storage*).
  * Creado el apartado **4.2 Cloud Storage: Fundamentos, Inmutabilidad, Versionado, Control de Acceso y Ciclo de Vida**:
    1. Comparativa técnica de paradigmas de almacenamiento: Object Storage vs Block Storage vs File Storage.
    2. Anatomía de objetos y organización en buckets con nombres globalmente únicos y selección geográfica para minimizar latencia.
    3. Inmutabilidad de objetos y funcionamiento de Object Versioning (versión viva vs versiones archivadas con generation number).
    4. Modelos de seguridad y control de acceso: IAM heredado (Proyecto → Bucket → Objeto) con Uniform Bucket-Level Access vs ACLs granulares (scope + permission).
    5. Políticas automatizadas de ciclo de vida (Object Lifecycle Management: acciones `Delete` y `SetStorageClass` con filtros de edad, fecha y versiones más recientes).
    6. Flujo de comandos prácticos con `gcloud storage` para el examen ACE.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-22` (*Cloud Storage*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial (`pLMkOa4FbwI`) y conclusiones técnicas de examen.
* **Índice General**:
  * Registrada la nueva referencia modular en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 21: Google Cloud storage options (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-google-cloud-storage-options.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-google-cloud-storage-options.md) con la transcripción oficial y análisis comparativo para el examen ACE de la lección 21 (Video ID: `689569`, YouTube: `8Dn-RAP7fzA`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Creada la sección **4. Módulo 4: Almacenamiento en la Nube (Storage in the Cloud)** y el apartado **4.1 Opciones de Almacenamiento en Google Cloud (Google Cloud storage options)**:
    1. Taxonomía de datos: no estructurados, estructurados, relacionales (ACID), documentos semiestructurados y series temporales analíticas.
    2. Matriz de selección rápida para el Examen ACE (*Storage Decision Matrix*) de los 5 servicios núcleo (Cloud Storage, Cloud SQL, Cloud Spanner, Firestore, Cloud Bigtable).
    3. Principio de arquitectura de persistencia políglota (*Polyglot Persistence*).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-21` (*Google Cloud storage options*) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con su reproductor de YouTube oficial y sus conclusiones clave de examen.
* **Índice General**:
  * Enlazada la nueva nota en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Quiz Módulo 3: Virtual Machines and Networks in the Cloud (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-quiz-module-3-vms-and-networks.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-quiz-module-3-vms-and-networks.md) con las 5 preguntas oficiales, opciones, respuestas correctas y justificaciones técnicas del Quiz 689568 (*Passing Score: 80%*).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Creada la sección **3.8 Cuestionario Oficial de Evaluación: Módulo 3 (Syllabus Quiz)** integrando las 5 preguntas de evaluación con su enfoque para la certificación Google Cloud ACE:
    1. Alcance estrictamente regional de las subredes en Google Cloud VPCs.
    2. Distribución global de tráfico HTTP entre múltiples regiones de Compute Engine con Cloud Load Balancing.
    3. Acuerdos de Nivel de Servicio (SLA 99.9% / 99.99%) disponibles exclusivamente en Dedicated Interconnect y Partner Interconnect (vs Direct/Carrier Peering sin SLA).
    4. Reducción sustancial de costos (60% a 91%) como justificación primordial para adoptar Spot VMs.
    5. Definición canónica de Virtual Private Cloud (VPC) como modelo privado, individual y seguro en la nube pública.
* **Catálogo y Banco de Preguntas (`src/data/coursesData.ts`)**:
  * Incorporadas las preguntas oficiales (`c-m3-q1` a `c-m3-q5`) al array `quiz` del curso 60 con sus trampas de examen (`examTrapTip`) y explicaciones pedagógicas.
* **Índice General**:
  * Registrada la nueva nota cruda en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Laboratorio 2: Get Started with Virtual Private Cloud Networking and Compute Engine (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-get-started-with-vpc-networking-and-compute-engine.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-get-started-with-vpc-networking-and-compute-engine.md) con la guía oficial del Lab 689567 (5 créditos, 40 minutos).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la sección del **Lab 2** con las 4 tareas oficiales:
    1. Exploración y eliminación de la red `default` (comprobando que no es posible crear VMs sin una red VPC).
    2. Creación de red VPC en modo automático (`mynetwork`) y dos VMs multi-región (`mynet-us-vm` y `mynet-r2-vm`).
    3. Pruebas de conectividad ICMP interna vs externa y eliminación progresiva de reglas de cortafuegos (`allow-icmp`, `allow-custom`, `allow-ssh`) con la pregunta de evaluación oficial y su justificación.
  * Incorporados los comandos de `gcloud` equivalentes para reproducción automatizada.
* **Catálogo y UI de Cursos**:
  * Actualizada la especificación del Lab 2 en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) (duración oficial de 40 minutos, key concepts enriquecidos sobre reglas implícitas e IPs efímeras vs estáticas).
* **Pruebas y Verificación**:
  * Ejecución exitosa de los 45 tests unitarios y BDD.
* **Índice General**:
  * Enlazado el nuevo laboratorio en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 20: Connecting networks to Google VPC (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-connecting-networks-to-google-vpc.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-connecting-networks-to-google-vpc.md) con la transcripción oficial limpia del video 689566 (YouTube `g24UStCvpQg`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 20: Connecting networks to Google VPC**.
  * Creada la sección **3.7: Conectividad Híbrida y Multi-Cloud (Connecting Networks to Google VPC)** con:
    1. Cloud VPN y Cloud Router (BGP dinámico para anuncio automático de subredes sin tiempo de inactividad, HA VPN con 99.99% SLA).
    2. Conectividad pública con Direct Peering y Carrier Peering hacia IPs públicas de Google (Workspace y APIs) y su regla crítica de examen: ausencia de SLA garantizado por Google.
    3. Conectividad privada empresarial con Dedicated Interconnect (circuitos directos de 10G/100G) y Partner Interconnect (circuitos sub-10G a través de operadores) con SLA de hasta 99.99% en topología de alta disponibilidad.
    4. Cross-Cloud Interconnect para enlaces directos cloud-to-cloud (AWS, Azure, OCI) de 10G/100G sin gestionar hardware intermedio.
    5. Matriz y árbol de decisión de conectividad híbrida para preguntas de examen ACE.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-20` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (5:45), resumen analítico y 5 puntos clave de examen.
  * Incorporados los términos `Cloud VPN` y `Cloud Interconnect` al glosario oficial del curso.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 20 lecciones en video y los términos del glosario.
  * Ejecución exitosa de los 45 tests unitarios y BDD.
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 19: Cloud DNS and Cloud CDN (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-dns-and-cloud-cdn.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-dns-and-cloud-cdn.md) con la transcripción oficial limpia del video 689565 (YouTube `TYB1cur47mk`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 19: Cloud DNS and Cloud CDN**.
  * Creada la sección **3.6: Servicios de Aceleración y Resolución: Cloud DNS y Cloud CDN** con:
    1. Distinción conceptual entre Google Public DNS (`8.8.8.8`, resolvedor recursivo) y Cloud DNS (servicio autoritativo gestionado con 100% SLA sobre Anycast).
    2. Zonas DNS públicas (visibles en internet) vs privadas (resolución restringida a VPCs sin publicar IPs internas).
    3. Almacenamiento en caché de borde (*Edge Caching*) con Cloud CDN en más de 100 PoPs globales: baja latencia, descarga en el backend y reducción sustancial de costos de salida (*egress*).
    4. Integración nativa con External Application Load Balancers mediante una sola casilla de verificación y compatibilidad con CDNs de terceros vía CDN Interconnect.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-19` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (1:45), resumen pedagógico y 5 puntos clave de examen.
  * Incorporados los términos `Cloud DNS` y `Cloud CDN` al glosario oficial del curso.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 19 lecciones en video y los términos del glosario.
  * Ejecución exitosa de los 45 tests unitarios y BDD.
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 18: Cloud Load Balancing (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-load-balancing.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-load-balancing.md) con la transcripción oficial limpia del video 689564 (YouTube `HWJQ3LNagXc`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 18: Cloud Load Balancing**.
  * Creada la sección **3.5: Cloud Load Balancing (Balanceo de Carga en la Nube)** con:
    1. Servicio definido por software (SDN) completamente administrado sin VMs dedicadas ni necesidad de pre-calentamiento (*no pre-warming*).
    2. Balanceo multi-región con dirección Anycast global y conmutación por error suave (*cross-region failover*).
    3. Application Load Balancers (Capa 7 - HTTP/HTTPS) como reverse proxies con enrutamiento de contenido basado en URLs y terminación SSL.
    4. Proxy Network Load Balancers (Capa 4 - TCP/SSL) para terminación de sesiones y soporte de backends híbridos (NEGs).
    5. Passthrough Network Load Balancers (Capa 4 - TCP/UDP) que no actúan como proxy, preservando la IP real del cliente y habilitando Direct Server Return (DSR).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-18` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (2:55), resumen analítico y 4 puntos clave de examen.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 18 lecciones en video.
  * Ejecución exitosa de los 45 tests unitarios y BDD.
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 17: Important VPC compatibilities (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-important-vpc-compatibilities.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-important-vpc-compatibilities.md) con la transcripción oficial limpia del video 689563 (YouTube `UtNlJbm8s2Q`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 17: Important VPC compatibilities**.
  * Creada la sección **3.4: Capacidades y Compatibilidades Clave de VPC (VPC Compatibilities)** con:
    1. Tablas de enrutamiento globales distribuidas nativas sin necesidad de routers virtuales ni físicos.
    2. Firewall global con estado y filtrado elástico desacoplado de IPs mediante Network Tags.
    3. Conectividad privada inter-VPC mediante VPC Network Peering (no transitivo, latencia de red interna).
    4. Arquitectura de Shared VPC (Host Project centralizado para redes y Service Projects para desarrolladores con roles IAM granulares `roles/compute.networkUser` y `roles/compute.xpnAdmin`).
    5. Cuadro comparativo riguroso de certificación ACE: VPC Network Peering vs Shared VPC.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-17` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (1:30), resumen analítico y 4 puntos clave de examen.
  * Incorporado el término técnico `Shared VPC` al glosario oficial del curso.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 17 lecciones en video y los términos del glosario.
  * Ejecución exitosa de los tests unitarios y BDD.
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 16: Scaling virtual machines (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-scaling-virtual-machines.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-scaling-virtual-machines.md) con la transcripción oficial limpia del video 689562 (YouTube `YQK8u563me4`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 16: Scaling virtual machines**.
  * Creada la sección **3.3: Escalado de Máquinas Virtuales (Scaling Virtual Machines)**.
  * Análisis de los 4 ejes temáticos de certificación ACE:
    1. Autoscaling en Compute Engine y Managed Instance Groups (MIGs) basado en métricas de CPU, capacidad de balanceo de carga, métricas personalizadas de Cloud Monitoring y horarios.
    2. Sinergia indispensable con Cloud Load Balancing en Google VPC para distribuir tráfico uniformemente y excluir instancias degradadas mediante Health Checks.
    3. Contraste arquitectónico entre Scale-out (escalado horizontal recomendado para alta disponibilidad multi-zonal y cero downtime) y Scale-up (escalado vertical para analítica intensiva o bases de datos en memoria masivas como SAP HANA).
    4. Familias de máquinas (General-purpose, Compute-optimized, Memory-optimized, Accelerator-optimized) y gobernanza de cuotas de proyecto por zona geográfica (*zone-dependent quotas*).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-16` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (1:15), resumen analítico y 4 puntos clave de examen.
  * Incorporado el término técnico `Autoscaling (Compute Engine)` al glosario oficial del curso.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 16 lecciones en video y los términos del glosario.
  * Ejecución exitosa de los 45 tests (unitarios y BDD).
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 15: Compute Engine (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-compute-engine.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-compute-engine.md) con la transcripción oficial limpia del video 689561 (YouTube 90pyGSKyPDQ).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Creada la sección 3.2: Compute Engine y Modelos de Cómputo IaaS.
  * Detalladas las 4 palancas de optimización de costos: facturación por segundo con mínimo de 1 minuto, Sustained-Use Discounts (automáticos >25% de uso mensual), Committed-Use Discounts (1 o 3 años, hasta 57%) y Spot VMs (hasta 90% de descuento).
  * Análisis comparativo de examen: Spot VMs vs Preemptible VMs (sin límite de 24 horas, revocación por demanda con 30 segundos de aviso).
  * Custom Machine Types (ajuste milimétrico de vCPU y memoria) y alto ancho de banda por defecto con Persistent Disks.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-15` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (3:45), resumen y 5 puntos clave de examen.
* **Índice General**:
  * Actualizado [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) con el enlace correspondiente.

---

## [2026-11-09] - Ingesta de Lección 14: Virtual Private Cloud networking (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Apertura del Módulo 3**:
  * Iniciado el Módulo 3 de Google Cloud Fundamentals (*Virtual Machines and Networks in the Cloud* / *Máquinas Virtuales y Redes en la Nube*).
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-virtual-private-cloud-networking.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-virtual-private-cloud-networking.md) con la transcripción oficial limpia del video 689560 (YouTube SFRCZvJN650).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Creada la sección 3.1: Arquitectura de redes VPC y subredes regionales.
  * Conceptos clave sintetizados: alcance global de las VPC, subredes regionales multi-zonal, comunicación entre zonas de la misma subred, expansión dinámica del bloque CIDR sin impacto en VMs activas, y reglas de cortafuegos con estado y rutas estáticas.
  * Tabla comparativa entre VPC Modo Automático vs Modo Personalizado (obligatorio en producción y examen ACE).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-14` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (2:17), resumen y 5 puntos clave de examen.
* **Índice General**:
  * Actualizado [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) con el enlace modular correspondiente.

---

## [2026-11-09] - Ingesta de Evaluación Oficial: Quiz Módulo 2 (Resources and Access in the Cloud)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-module-2-quiz.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-module-2-quiz.md) con las 3 preguntas oficiales de evaluación del Módulo 2 de Google Cloud Fundamentals.
* **Síntesis Curricular (Cierre del Módulo 2)**:
  * Pregunta 1: Ámbito de activación de servicios y APIs a nivel de Proyecto (*per-Project basis*).
  * Pregunta 2: Atributos del Project ID (globalmente único e inmutable, con capacidad de personalización por el cliente durante su creación).
  * Pregunta 3: Jerarquía de especificidad de roles en IAM desde el alcance más amplio al más granular (*Basic roles → Predefined roles → Custom roles*).
* **Catálogo y UI de Cursos**:
  * Añadidas las 3 preguntas (`c-m2-q1`, `c-m2-q2`, `c-m2-q3`) al cuestionario interactivo de `gcp-course-60` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts), elevando el banco a 16 preguntas.
* **Validación**:
  * Suites unitarias y BDD validadas al 100%.

---

## [2026-11-09] - Ingesta de Laboratorio 1: Getting Started with Cloud Marketplace (Lab 689558)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-google-cloud-fundamentals-getting-started-with-cloud-marketplace.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-google-cloud-fundamentals-getting-started-with-cloud-marketplace.md) a partir del contenido oficial de Skills Google (`labs/689558`).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Documentada la arquitectura completa de la pila LAMP: Linux (Ubuntu 26.04), Apache HTTP Server (puerto 80/443), MySQL y PHP/phpMyAdmin.
  * Habilitación de APIs requeridas: Compute Engine API e Infrastructure Manager API.
  * Flujo de tareas guiadas: navegación en Marketplace, aceptación de términos, selección de zona y tipo de máquina `e2-medium` (Serie E2), y validación web con `Site Url` / External IP.
  * Relevancia para el examen ACE: despliegues declarativos empaquetados mediante Marketplace y automatización con Infrastructure Manager.
* **Catálogo y UI de Cursos**:
  * Actualizado `core-lab-1` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con metadatos oficiales (25 min, 5 créditos) y comandos de validación precisos.
* **Validación**:
  * Suites unitarias y BDD validadas al 100%.

---

## [2026-11-09] - Ingesta de Lección 13: Interacting with Google Cloud (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-interacting-with-google-cloud.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-interacting-with-google-cloud.md) a partir del video oficial de YouTube `lkchDTTMrZ8` y contenido de Skills Google (`video/689557`).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Las 4 vías de acceso e interacción con Google Cloud:
    1. Google Cloud Console (GUI web, buscador, terminal SSH en navegador, presupuestos).
    2. Google Cloud SDK y Cloud Shell (entorno Debian efímero con 5 GB persistentes en `$HOME`, preinstalado y pre-autenticado; CLI `gcloud` y `bq` en directorio `bin/`).
    3. APIs REST y Client Libraries (herramienta interactiva Google APIs Explorer; Cloud Client Libraries idiomáticas en 8 lenguajes).
    4. Google Cloud Mobile App (control operativo de VMs y Cloud SQL, reversión y traffic splitting en App Engine, y alertas de presupuesto/incidentes).
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 13 (`vid-60-13`) a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).
* **Validación**:
  * Suites unitarias y BDD actualizadas y validadas al 100%.

---

## [2026-11-09] - Ingesta de Lección 12: Cloud Identity (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-identity.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-identity.md) a partir del video oficial de YouTube `EZccX9nFaiI` y contenido de Skills Google (`video/689556`).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Centralización de identidades corporativas con Cloud Identity (IDaaS) gestionadas en Google Admin Console (`admin.google.com`).
  * Mitigación del riesgo de cuentas personales `@gmail.com`: resolución del problema de desaprovisionamiento y revocación inmediata de accesos al desvincular empleados.
  * Federación e interoperabilidad híbrida: sincronización desde Microsoft Active Directory o servidores LDAP locales con Google Cloud Directory Sync (GCDS) y Single Sign-On (SSO con SAML 2.0).
  * Comparativa de ediciones: Cloud Identity Free (directorio, SSO, MFA) vs Premium (gestión de dispositivos móviles MDM, borrado remoto, acceso contextual).
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 12 (`vid-60-12`) a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).
* **Validación**:
  * Suites unitarias y BDD actualizadas y validadas al 100%.

---

## [2026-11-09] - Ingesta de Lección 11: Service Accounts (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-service-accounts.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-service-accounts.md) a partir del video oficial de YouTube `xoo5NfLqePY` y contenido de Skills Google (`video/689555`).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Autenticación máquina a máquina para VMs y aplicaciones sin contraseñas interactivas ni intervención humana.
  * Doble naturaleza fundamental de las Service Accounts: como Identidad (principal al que se asignan roles en recursos) y simultáneamente como Recurso asegurable (con políticas IAM para gobernar quién puede usarlas o impersonarlas, e.g., `roles/iam.serviceAccountUser`).
  * Buenas prácticas de seguridad ACE: rotación automática de tokens efímeros mediante el servidor de metadatos de Compute Engine en lugar de descargar claves privadas JSON a disco.
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 11 (`vid-60-11`) a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).
* **Validación**:
  * Suites unitarias y BDD actualizadas y validadas al 100%.

---

## [2026-11-08] - Ingesta de Lección 10: Identity and Access Management - IAM (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-identity-and-access-management-iam.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-identity-and-access-management-iam.md) a partir del video oficial de YouTube `Di1T4RyO9yg` y el contenido de Skills Google (`video/689554`).
* **Actualización Lección 9**:
  * Actualizado identificador de YouTube oficial para la Lección 9 (`ecVv1L_TEo8`) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) y en la videoteca de [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Tríada de IAM: Quién (Principals: usuarios, grupos, service accounts, dominios Cloud Identity) + Puede hacer qué (Roles: agrupaciones de permisos) + Sobre cuál recurso.
  * Reglas Deny: evaluación previa e indiscutible antes que las reglas Allow; propagación descendente por la jerarquía.
  * Taxonomía de roles: Básicos (Owner, Editor, Viewer, Billing Admin), Predefinidos (mantenidos por Google y aplicables a Org, Carpeta o Proyecto) y Personalizados (Custom Roles).
  * Regla crítica de examen ACE: Los roles personalizados **solo pueden aplicarse a nivel de Proyecto o de Organización; NUNCA a nivel de Carpeta**.
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 10 a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor responsive incrustado.
* **Validación**:
  * Actualizadas suites de pruebas unitarias y BDD pasando al 100%.

---

## [2026-11-08] - Ingesta de Lección 9: Google Cloud Resource Hierarchy (Course 60) & Evaluación Módulo 1

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-module-1-quiz.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-module-1-quiz.md) con las 3 preguntas oficiales de evaluación del Módulo 1.
  * Ingestado [`wiki/raw/skills-core-google-cloud-resource-hierarchy.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-google-cloud-resource-hierarchy.md) a partir del contenido oficial de Skills Google (`video/689553`).
* **Síntesis Curricular (Apertura de Módulo 2: Recursos y Acceso en la Nube)**:
  * Jerarquía funcional de 4 niveles: Recursos → Proyectos → Carpetas (opcionales) → Nodo de Organización.
  * Atributos de proyecto: Project ID (globalmente único e inmutable), Project Name (mutable y legible) y Project Number (asignado por Google para agentes internos).
  * API Resource Manager: Gestión programática (REST/RPC) para creación, listado, actualización, eliminación y recuperación (*undelete*) de proyectos.
  * Gobernanza y herencia de políticas descendente: delegación por departamentos y entornos mediante carpetas, roles privilegiados a nivel de Organización (`roles/orgpolicy.policyAdmin`, `roles/resourcemanager.projectCreator`) y aprovisionamiento con Google Workspace o Cloud Identity.
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 9 a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).
  * Añadido soporte dinámico en [`src/components/CourseDetailView.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/components/CourseDetailView.tsx) para reproducción embebida o enlace directo a Skills Google.
* **Validación**:
  * Actualizada suite de pruebas unitarias en `tests/unit/coreInfrastructureCourse.test.ts`.

---

## [2026-11-08] - Ingesta de Lecciones 7 y 8: Open Source Ecosystems & Pricing/Billing (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generados [`wiki/raw/skills-core-open-source-ecosystems.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-open-source-ecosystems.md) (video `gYZGSrNffF8`) y [`wiki/raw/skills-core-pricing-and-billing.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-pricing-and-billing.md) (video `OTD61ZfnO28`).
* **Síntesis Curricular (Cierre de Módulo 1)**:
  * Ecosistemas abiertos e interoperabilidad multi-nube: Kubernetes/GKE, TensorFlow y Google Cloud Observability para prevenir vendor lock-in.
  * Estructura de precios: facturación por segundo, Sustained-Use Discounts (> 25% automático), Custom Machine Types y calculadora de costes.
  * Gobernanza financiera y operativa: presupuestos con alertas (regla ACE: no detienen recursos automáticamente) y cuotas de proyecto (Rate Quotas vs Allocation Quotas).
* **Catálogo y UI de Cursos**: Incorporadas las Lecciones 7 y 8 a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts), completando las 8 lecciones oficiales del Módulo 1.

---

## [2026-11-08] - Ingesta de Lecciones 5 y 6: Environmental Impact & Security (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generados [`wiki/raw/skills-core-environmental-impact.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-environmental-impact.md) (video `MwZiq-DRGFo`) y [`wiki/raw/skills-core-security.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-security.md) (video `BggWZl8qTzk`).
* **Síntesis Curricular**:
  * Sostenibilidad (ISO 14001, enfriamiento marino en Hamina, meta 2030 de energía 100% CFE libre de carbono y selección de regiones verdes para el examen ACE).
  * Arquitectura integral de seguridad en 6 capas progresivas: Hardware (chips Titan, Secure Boot), Despliegue (cifrado RPC inter-datacenter), Identidad (U2F, desafíos adaptativos), Almacenamiento (cifrado en reposo por defecto), Internet (Google Front End, mitigación DoS masiva) y Operaciones (Red Team, bug bounty, revisión de dos pares).
* **Catálogo y UI de Cursos**: Incorporadas las Lecciones 5 y 6 al reproductor de video en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).

---

## [2026-11-08] - Ingesta de Lección 4: The Google Cloud Network (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generado [`wiki/raw/skills-core-the-google-cloud-network.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-the-google-cloud-network.md) a partir del video oficial de YouTube `SDGJqKIE5yY` y la transcripción de la Lección 4.
* **Síntesis Curricular**: Documentada la infraestructura global de red de Google Cloud (7 ubicaciones mundiales, cables submarinos, 100+ PoPs, Regiones, Zonas independientes y arquitecturas multi-región con Cloud Spanner y Cloud Storage) en [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md).
* **Catálogo y UI de Cursos**: Incorporada la Lección 4 al reproductor interactivo en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).

---

## [2026-11-08] - Ingesta de Lección 3: IaaS and PaaS (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generado [`wiki/raw/skills-core-iaas-and-paas.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-iaas-and-paas.md) a partir del video oficial de YouTube `C7cb6kFhNmw` y la transcripción de la Lección 3.
* **Síntesis Curricular**: Mapeada la taxonomía completa de modelos de servicio cloud (IaaS: Compute Engine, PaaS: App Engine, Serverless: Cloud Run y Cloud Run Functions, SaaS: Google Workspace) con matriz comparativa de responsabilidad compartida y esquemas de facturación en [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md).
* **Catálogo y UI de Cursos**: Incorporada la Lección 3 al reproductor de video y lista de lecciones en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).

---

## [2026-11-08] - Pestaña de Videoteca Interactiva y Lección 2 (Cloud Computing Overview)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generado [`wiki/raw/skills-core-cloud-computing-overview.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-computing-overview.md) a partir del contenido de `skills.google/course_templates/60/video/689545` y el video oficial de YouTube `ph5hjgOAf40`.
* **Síntesis Curricular**: Mapeadas las 5 características esenciales de computación en la nube según el NIST y las 3 olas tecnológicas de infraestructura en [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md).
* **Modelado de Tipos TypeScript**: Definida la interfaz [`CourseLessonVideo`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/types/index.ts) con soporte para identificadores de YouTube, duración, resúmenes y puntos clave ACE.
* **Componente Interactivo `CourseDetailView`**: Añadida la pestaña reactiva **Videos & Lecciones** con reproductor embebido responsivo de YouTube (`youtube-nocookie.com`), notas pedagógicas y selector de lecciones.
* **Catálogo de Cursos**: Incorporadas las lecciones 1 y 2 en el dataset de [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).

---

## [2026-11-08] - Ingestor Automatizado de Google Skills y Mapeo de Objetivos Clave

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Script de Ingestión Modular (`scripts/ingest-skills-content.mjs`)**: Creación de un script en Node.js ESM para sanitizar el volcado del portapapeles proveniente de `skills.google`. Filtra de forma determinista la interfaz de usuario (menús de navegación, advertencias de plataforma, contadores de puntos, timestamps de video tipo `00:00`) y extrae metadatos (URLs de YouTube, enlaces de Skills, objetivos de aprendizaje).
* **Comando npm**: Adición del script `npm run ingest:skills` en `package.json` para facilitar la ingesta repetible de transcripciones y lecturas hacia `wiki/raw/`.
* **Insumo Raw Sanitizado**: Creación de `wiki/raw/skills-core-course-introduction.md` conteniendo la transcripción limpia y los 7 objetivos clave de aprendizaje del curso ID 60 (incluyendo Gemini en Google Cloud y Prompt Engineering).
* **Enlace en Índice**: Registro del nuevo insumo inmutable en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-06] - Acreditación del Autor Lenin Meza, Página About y Footer Unificado

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Análisis de Proyectos Previos**: Inspección en Codebase Memory (`mach-playbook`, `merolhack.github.io`, `cadensa-web`) para estandarizar la biografía, enlaces y reconocimientos de autoría de Lenin Meza (`merolhack`).
* **Componente `Footer` Unificado**: Creación de [`src/components/Footer.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/components/Footer.tsx) con soporte para variantes clara y oscura (`light` / `dark`), enlace directo al portafolio de GitHub Pages (`https://merolhack.github.io/`), LinkedIn oficial, MACH Playbook, repositorio de GitHub y aviso de exención de responsabilidad educativa. Integrado en todas las páginas (`/`, `/courses/`, `/courses/[slug]/` y `/about/`).
* **Página Institucional About**: Despliegue de [`src/app/about/page.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/app/about/page.tsx) exponiendo la misión técnica del proyecto, pilares pedagógicos (Hands-On First, emulación gcloud, detección de trampas de examen), perfil y trayectoria de Lenin Meza (17+ años en arquitectura distribuida, autor del *Playbook de Arquitectura MACH* Amazon KDP 2026) y enlaces a redes.
* **Navegación y Sitemap**: Adición de accesos a `/about/` en [`src/components/Navbar.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/components/Navbar.tsx) y en el catálogo [`public/sitemap.xml`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/public/sitemap.xml).
* **Suite de Pruebas Unitarias y BDD**: Creación de [`tests/bdd/author-and-about.feature.test.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/bdd/author-and-about.feature.test.tsx) y [`tests/unit/footerAndAbout.test.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/footerAndAbout.test.tsx), alcanzando 40/40 pruebas aprobadas (100% de éxito).

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


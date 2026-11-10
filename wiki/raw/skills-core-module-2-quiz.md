---
title: "Quiz: Resources and Access in the Cloud (Module 2)"
course: "Google Cloud Fundamentals: Core Infrastructure"
date_ingested: "2026-11-09"
type: "quiz"
source_url: "https://www.skills.google/course_templates/60"
---

# Quiz: Resources and Access in the Cloud (Google Cloud Fundamentals: Core Infrastructure - Módulo 2)

## 📝 Contenido Sanitizado y Evaluación Oficial (Passing score: 66%)

### 1. Choose the correct completion: Services and APIs are enabled on a per-__________ basis.
* **Opciones:**
  * Folder
  * ✅ **Project** (Respuesta Correcta)
  * Organization
  * Billing account
* **Explicación & Justificación ACE:** En Google Cloud, los servicios y las APIs se habilitan a nivel de **Proyecto** (e.g. `gcloud services enable <API> --project=<PROJECT_ID>`). El proyecto es el límite de aislamiento donde se administran cuotas, APIs activas y la vinculación a la cuenta de facturación.

---

### 2. Which of these values is globally unique, permanent, and unchangeable, but can be modified by the customer during creation?
* **Opciones:**
  * The project's billing credit-card number
  * The project name
  * The project number
  * ✅ **The project ID** (Respuesta Correcta)
* **Explicación & Justificación ACE:**
  * **Project ID:** Es globalmente único en todo Google Cloud, permanente e **inmutable** tras su creación, pero el usuario puede elegirlo y personalizarlo **durante la creación** del proyecto.
  * **Project Name:** Es mutable (se puede cambiar en cualquier momento) y no es globalmente único.
  * **Project Number:** Es asignado automáticamente por Google, el usuario no puede modificarlo ni personalizarlo durante la creación.

---

### 3. Select the list of IAM role types that are ordered from broadest to finest-grained.
* **Opciones:**
  * ✅ **Basic roles, predefined roles, custom roles** (Respuesta Correcta)
  * Custom roles, predefined roles, basic roles
  * Predefined roles, custom roles, basic roles
* **Explicación & Justificación ACE:**
  * **Basic roles (Más amplios):** Aplican permisos masivos (Owner, Editor, Viewer) a todos los recursos del proyecto.
  * **Predefined roles (Granularidad media):** Diseñados y mantenidos por Google para servicios y tareas concretas (ej. `roles/compute.instanceAdmin`).
  * **Custom roles (Más específicos / finest-grained):** Permiten al administrador definir listas atómicas de permisos individuales para cumplir el principio de mínimo privilegio estricto.

---
*Ingestado automáticamente para la LLM Wiki del proyecto GCP ACE Interactive Study Guide.*

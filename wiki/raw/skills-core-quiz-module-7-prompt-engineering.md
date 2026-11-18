# Ingesta Cruda: Cuestionario Oficial: Quiz Módulo 7 - Prompt Engineering (Course 60)

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Módulo 7: Asistencia con Gemini y Prompt Engineering (Google Cloud: Prompt Engineer Guide)
* **Tipo de Evaluación:** Quiz oficial de módulo
* **Puntuación Mínima de Aprobación (Passing Score):** 75%
* **Puntos Acumulados:** ⭐ 16,070 puntos (Racha: 2)
* **Fecha de Ingesta:** 2026-11-18

---

## 📝 Banco Oficial de Preguntas y Respuestas Sanitizadas

### Pregunta 1
**You need a large language model (LLM) to convert unstructured text into a rigid, custom JSON structure. Which prompting technique should you implement?**
* [ ] A role prompt that instructs the model to adopt a specific persona.
* [ ] A zero-shot prompt with no guidance or context.
* [ ] An open-ended creative prompt with minimal constraints.
* [x] **A few-shot prompt that includes illustrative output examples.**

> **Justificación Oficial & Examen ACE:**
> La técnica de **few-shot prompting** proporciona dos o más ejemplos representativos de pares entrada-salida dentro del contexto del prompt. Cuando se requiere que un LLM genere una estructura determinista y estricta (como un esquema JSON personalizado o manifiestos YAML), los ejemplos ilustrativos guían al modelo para replicar con exactitud los tipos de datos, nombres de claves y formato sin desviaciones.

---

### Pregunta 2
**What is the primary defining function of generative AI?**
* [x] **Generate original text, images, code, or other media using generative models.**
* [ ] Generate responses based strictly on real-time data.
* [ ] Perform complex calculations and mathematical operations.
* [ ] Make predictions about future events based on historical data.

> **Justificación Oficial & Examen ACE:**
> La función primaria que define a la **Inteligencia Artificial Generativa (Gen AI)** es la capacidad de crear contenido original nuevo (texto, imágenes, código fuente, audio o video) mediante modelos generativos entrenados para aprender patrones y estructuras a partir de grandes conjuntos de datos.
> *Distractores:* Los LLMs no operan con datos en tiempo real por defecto (requieren *grounding*), ni son calculadoras analíticas deterministas.

---

### Pregunta 3
**You are designing prompts to guide a large language model (LLM) toward clear and reliable responses. Which practice aligns with Google-recommended guidelines for prompt construction?**
* [x] **Maintain concise phrasing and direct instructions.**
* [ ] Avoid providing context or specific parameters.
* [ ] Draft lengthy, complex sentences with multiple embedded clauses.
* [ ] Rely exclusively on default parameters without testing alternative variations.

> **Justificación Oficial & Examen ACE:**
> Las guías oficiales de Google Cloud para ingeniería de prompts recomiendan **redactar instrucciones directas, explícitas y mantener oraciones breves y concisas**. Las oraciones excesivamente largas o ambiguas incrementan la probabilidad de respuestas subóptimas o alucinaciones.

---

### Pregunta 4
**How can you avoid hallucinations when training or prompting a large language model (LLM)?**
* [ ] Train the LLM on a smaller dataset.
* [ ] **Train the model on a clean, curated dataset.**
* [ ] Omit context from your prompts.
* [ ] Train the model to operate with very few constraints.

> **Justificación Oficial & Examen ACE:**
> Las alucinaciones se producen principalmente cuando los modelos son entrenados con datos sucios (*noisy or dirty data*), datos insuficientes, o cuando se formulan prompts sin suficiente contexto ni restricciones. **Entrenar al modelo sobre datos limpios y curados**, junto con suministrar restricciones y contexto explícitos en los prompts, es la estrategia fundamental para minimizar alucinaciones.

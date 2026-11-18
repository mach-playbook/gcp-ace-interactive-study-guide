# Ingesta Cruda: Lección 34 - Prompt Engineering (Course 60)

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Módulo 7: Asistencia con Gemini y Prompt Engineering (Google Cloud: Prompt Engineer Guide)
* **ID de Lección (Skills Google):** `689587`
* **URL Skills Google:** [Skills Google - Prompt Engineering](https://www.skills.google/paths/8/course_templates/60/video/689587)
* **URL YouTube:** [YouTube - Prompt Engineering (Video ID: 5zoKVf-cnf4)](https://www.youtube.com/watch?v=5zoKVf-cnf4)
* **Puntaje Actual:** ⭐ 16,060 puntos (Racha: 1)
* **Fecha de Ingesta:** 2026-11-17
* **Tipo de Contenido:** Video formativo con transcripción oficial

---

## 📝 Transcripción Oficial Completa

```text
00:00 Generative AI and large language models are proving to be powerful tools, but to leverage their capabilities, it's important to understand their architecture.
00:09 It's also important to consider recommended practices when implementing these technologies.
00:13 The goal of this module, titled Google Cloud: Prompt Engineer Guide, is to help with these important steps.
00:20 In this guide to prompt engineering, you’ll get answers to the questions: What is generative AI?
00:26 What is a large language model?
00:28 What is prompt engineering?
00:29 You’ll also explore prompt engineering best practices.
00:34 Before we delve into this lesson, let's define the interchangeably used terms such as 'generative AI' and 'Large Language Model' (LLM).
00:42 While both terms describe AI models capable of generating human-like responses based on input prompts in many references, it's important to note they're not identical.
00:53 Generative AI encompasses a broader range of models capable of generating various types of content beyond just text, while LLM specifically refers to a subset of generative AI models focusing on language tasks.
01:07 We'll thoroughly explore each term in this lesson.
01:10 So let's begin with an important question: What is generative AI?
01:16 Generative artificial intelligence, which is commonly referred to as gen AI, is a subset of artificial intelligence that is capable of creating text, images, or other data using generative models, often in response to prompts.
01:30 It has grown in popularity hugely since 2021 but artificial intelligence has been around since the mid 1950s.
01:37 By the way, a prompt is a specific instruction, question, or cue given to a computer program or user to initiate a specific action or response, but we examine this more later.
01:48 In its current format, gen AI models are like conversational programs that can generate content based on the inputs supplied.
01:56 Gen AI models learn the patterns and structure from input training data and then create new data with similar characteristics.
02:04 Generative AI has uses across a wide range of industries, including software development, healthcare, finance, entertainment, customer service, and sales.
02:13 However, rather than exploring all generative AI applications, this training will specifically focus on articulating prompts to harness the power of gen AI effectively.
02:24 Let me introduce a scenario that we’ll make reference to throughout this section of the training.
02:29 We’ve included it to help put some of this theory into practice.
02:32 Meet Sasha, a cloud architect, who needs to create a prototype design of Google Cloud VPC network architecture for Cymbal Bank.
02:41 Sasha wants to save time by combining her existing knowledge of cloud architecture and generative AI tools to create a usable prototype design.
02:49 Sasha was excited to learn about Gemini, since having the tool inside the Google Cloud Console means that she can access it without any additional installs.
02:59 We’ll check back in with Sasha later.
03:02 Let’s spend some time exploring large language models, which are a highly sophisticated computer programs trained on gigantic amounts of data that can be text or images.
03:12 But how are they trained?
03:14 And why do they need training at all?
03:17 Large language models refer to large, general-purpose language models that can be pre-trained and then fine-tuned for specific purposes.
03:26 In this context, large refers to: The size of the training dataset, which can sometimes be at the petabyte scale.
03:33 And the number of parameters.
03:35 Parameters are the memories and knowledge that the machine has learned during model training.
03:40 They determine the ability of a model to solve a problem, such as predicting text, and can reach billions or even trillions in size.
03:48 General-purpose means that the models can sufficiently solve common problems.
03:52 This is thanks to the commonality of a human language, regardless of the specific tasks.
03:58 Saying LLMs are pre-trained and fine-tuned, means that they have been pre-trained for a general purpose with a large dataset and then fine-tuned for specific goals with a much smaller dataset.
04:11 But how are LLMs trained?
04:14 When you submit a prompt to an LLM, it calculates the probability of the correct answer from its pre-trained model.
04:21 The probability is determined through a task called pre-training.
04:25 Pre-training an LLM involves feeding a massive dataset of text, images, and code to the model so that it can learn the underlying structure and patterns of the language.
04:35 This process helps the model to understand and generate human language more effectively.
04:40 In this way, the LLM works like a fancy autocomplete, suggesting the most common correct response to the prompt.
04:47 But sometimes the LLM gives a completely wrong answer.
04:51 This is called a hallucination.
04:53 Hallucinations are words or phrases that are generated by the model that are often nonsensical or grammatically incorrect.
05:01 This happens because LLMs can only understand the information they were trained on.
05:06 This means that they might not be aware of your business's proprietary or domain-specific data.
05:11 Also, they do not have access to real-time information.
05:14 To make matters worse, LLMs only understand the information that is explicitly given to them in the prompt.
05:22 In other words, they often assume that the prompt is true.
05:25 They also do not have the ability to ask for more context information.
05:27 Ultimately, an LLM does not know anything outside of what it was trained on, and it cannot truly know if that information is accurate.
05:33 But what causes a hallucination.
05:37 Hallucinations can be caused by a number of factors, including: The model is not trained on enough data.
05:43 The model is trained on noisy or dirty data.
05:47 The model is not given enough context.
05:50 The model is not given enough constraints.
05:53 Hallucinations can be a problem for LLMs because they can make the output text difficult to understand.
05:59 They can also make the model more likely to generate incorrect or misleading information.
06:04 But we will see in the Prompt Engineering section that there are things we can do to minimize this problem.
06:11 OK, but knowing where the sun is will not help Sasha with her current task.
06:17 Lucky for Sasha, Google Cloud offers a generative AI model called Gemini, which can act as an always-on collaborator.
06:28 This gen AI-powered assistant can help a wide range of Google Cloud users, including developers, data scientists, and operators.
06:36 To provide an integrated assistance experience, Gemini is embedded in many Google Cloud products.
06:42 Gemini has access to a massive range of data, including Google Cloud documentation, tutorials, and samples.
06:50 With the right prompts, it can produce detailed suggestions and guides on what resources will best suit Sasha’s current challenge and their configuration.
06:57 Gemini can even create detailed gcloud commands and insert them into Cloud Shell for her.
07:03 She just needs to articulate her needs in a way that gets the best response from Gemini.
07:08 For example, if she uses the prompt “How can I create a network that uses IPv4 and IPv6 addresses?”, she will get a response that details how to do just that.
07:20 You’ve learned that a large language model is a huge object model containing a massive dataset of text.
07:27 But how can you extract the information you need from this dataset?
07:31 This is where prompt engineering comes in.
07:35 A prompt is the text that you feed to the model, and prompt engineering is a way of articulating your prompts to get the best response from the model.
07:43 The better structured a prompt is, the better the output from the model will be.
07:44 Let’s explore what this means.
07:45 Prompts can be in the form of a question, and are categorized into four categories: zero-shot, one-shot, few-shot, and role prompts.
07:55 Zero-shot prompts do not contain any context or examples to assist the model.
08:00 For example, the prompt “What’s the capital of France?” does not provide any examples of what a capital is.
08:08 Clearly, that is not too important for this example.
08:12 But for more specific and technical prompts, an example would help refine the scope of the response from Gemini.
08:19 One-shot prompts, however, provide one example to the model for context.
08:22 Here, we ask for the capital of France again, but we provide Italy and Rome as an example.
08:29 And few-shot prompts provide at least two examples to the model for context.
08:33 Here, our prompt is updated to also include Japan and Tokyo in our examples.
08:40 And then, there are role prompts which require a frame of reference for the model to work from as it answers the questions.
08:47 In our example, we state “I want you to act as a business professor. I’ll give you a term, and you will correctly explain its meaning. Make sure your answers are always right. What is ROI? “
08:58 For Sasha’s needs, using role prompts might be the best solution. She can define what is required and in what context. This means that the LLM will have a clear point of reference when supplying an answer.
09:11 Now that you’ve seen the types of prompts you can create, let’s explore the two elements of a prompt: the preamble and the input.
09:21 The preamble refers to the introductory text you provide to give the model context and instructions before your main question or request.
09:29 Think of it as setting the stage for the LLM to better understand what you want. It can include the context for the task, the task itself, and some examples to guide the model.
09:37 The input is the central request you're making to the LLM. It’s what the instruction or task will act upon, for example “Comment: I don’t know what to think about the video. The review is:”
09:50 Based on the preamble, Gemini reviews the input and suggests if the review is positive, neutral, or negative.
10:01 It is worth noting that not all the components are required for a prompt, and the format can change depending on the task at hand.
10:10 The element order can also change.
10:13 Let's amend Sasha’s original prompt “How can I create a network that uses IPv4 and IPv6 addresses?” and add a role context to the input fed into Gemini.
10:24 She also adds the detail of needing a dual stack subnet.
10:29 The new prompt is “I want you to act as a cloud architect in Google Cloud. How can I use gcloud to create a network that uses IPv4 and IPv6 subnets?”
10:40 But since Gemini maintains its own interaction context, she could have just asked “I want you to act as a cloud architect in Google Cloud. How can I adjust the gcloud command provided to create a subnet to ensure the subnet is dual stack?”
10:54 Now that you’ve had a chance to explore what Gen AI is, what large language models are and how they’re trained, and what prompt engineering is, it’s time to explore some prompt engineering best practices.
11:07 The first best practice is to write detailed and explicit instructions.
11:12 The more vague the prompt, the more chance that the model will produce a result that is not usable.
11:18 Be clear and concise in the prompts that you feed into the model.
11:22 Next, be sure to define boundaries for the prompt.
11:26 It’s better to instruct the model on what to do rather than what not to do.
11:31 If the model gets stuck, give it a few 'fallback' outputs that work in various situations.
11:36 For example, something like "I'm still learning about that" to use when unsure.
11:41 Another best practice is to adopt a persona for your input.
11:46 Adding a persona for the model can provide meaningful context to help it focus on related questions, which can help improve accuracy.
11:54 This prompt would help Sasha, the cloud architect, get started with prototyping a network architecture for Cymbal Bank.
12:01 And finally, it’s a recommended practice to keep each sentence concise.
12:05 Longer sentences can sometimes produce suboptimal results.
12:09 It’s best to break long sentences in a prompt into a series of shorter sentences and simpler tasks.
12:15 So, let’s return to Sasha, and use what we have learned so far.
12:21 Sasha updates her prompt to: “You're a cloud architect. You want to build a Google Cloud VPC network that can be centrally managed. You also connect to other VPC networks in your company's other regions. You don't want to have many different sets of firewall policies to maintain. What sort of network architecture would you recommend?”
12:42 With this new prompt, Gemini proposes a hub-and-spoke network architecture, which fits Sasha’s needs exactly.
12:50 By refining and amending her prompts, Sasha has articulated her requirements in a way that Gemini can respond with the correct focus and level of detail.
```

---

## 🔬 Síntesis Técnica y Desglose Arquitectónico

### 1. Taxonomía: Inteligencia Artificial vs Generative AI vs LLMs
* **Inteligencia Artificial (IA):** Campo fundado a mediados de la década de 1950 orientado a crear sistemas capaces de realizar tareas cognitivas humanas.
* **IA Generativa (Gen AI):** Subconjunto de la IA en auge exponencial desde 2021 capaz de generar nuevo contenido (texto, imágenes, código, audio, video) a partir de patrones y estructuras aprendidas de datos de entrenamiento.
* **Large Language Models (LLMs):** Subconjunto específico de Gen AI especializado en comprensión y generación de lenguaje natural y código fuente.

### 2. Anatomía de los Large Language Models
* **Significado de "Large" (Grande):**
  1. *Tamaño del Dataset:* Datos de entrenamiento en escalas masivas de petabytes.
  2. *Número de Parámetros:* Miles de millones (*billions*) o billones (*trillions*) de pesos aprendidos que actúan como la memoria del modelo.
* **Significado de "General-Purpose":** Capacidad para resolver problemas generales gracias a las reglas compartidas de los lenguajes humanos.
* **Pre-training vs Fine-tuning:**
  * *Pre-training:* Entrenamiento auto-supervisado sobre volúmenes gigantescos de texto para aprender sintaxis, gramática y probabilidad estadística de la siguiente palabra ("fancy autocomplete").
  * *Fine-tuning:* Ajuste supervisado con datasets más pequeños y curados para especializar el modelo en objetivos o dominios específicos.

### 3. Alucinaciones (Hallucinations): Diagnóstico y Causas
* **Definición:** Respuestas generadas por el modelo que parecen coherentes pero son tácticamente falsas, inventadas o sin sentido.
* **Causas Fundamentales:**
  1. Datos insuficientes durante el entrenamiento.
  2. Datos de entrenamiento sucios o ruidosos.
  3. Falta de contexto explícito en el prompt.
  4. Falta de límites o restricciones (*constraints*) en el prompt.
* **Limitaciones Críticas para el Ingeniero Cloud:**
  * El LLM asume que el contenido del prompt es verdadero.
  * No tiene acceso inherente a datos privados de la empresa ni a eventos en tiempo real sin herramientas de *grounding*.
  * No puede pedir proactivamente más contexto si el usuario no se lo suministra.

### 4. Gemini en Google Cloud: Colaborador Siempre Activo
* Asistente de IA generativa incrustado de forma nativa en Google Cloud Console, Cloud Shell y Cloud Workstations sin requerir software adicional.
* Entrenado sobre la documentación oficial de Google Cloud, tutoriales de arquitectura y repositorios de código.
* Capaz de generar comandos `gcloud` precisos e insertarlos con un solo clic directamente en la terminal de Cloud Shell.

### 5. Categorización de Prompts
1. **Zero-shot:** Sin ejemplos ni contexto previo. Adecuado para tareas generales y simples.
2. **One-shot:** Incluye exactamente un ejemplo que modela el formato y la respuesta deseada.
3. **Few-shot:** Incluye dos o más ejemplos para definir patrones complejos de clasificación o extracción.
4. **Role prompts (Personas):** Asigna un marco de referencia profesional ("Actúa como un arquitecto cloud de Google Cloud...") para delimitar el tono, rigor y profundidad de la respuesta.

### 6. Estructura del Prompt: Preamble vs Input
* **Preamble (Preámbulo):** Establece el escenario, el rol (*persona*), las restricciones y los ejemplos.
* **Input (Entrada):** La petición o dato concreto sobre el que debe operar la instrucción.

### 7. 5 Mejores Prácticas de Prompt Engineering para GCP
1. **Instrucciones Detalladas y Explícitas:** Evitar términos ambiguos; especificar versión de APIs, región o flags requeridos.
2. **Delimitar Límites y Enfoque Positivo:** Instruir qué debe hacer el modelo en lugar de qué no hacer.
3. **Mecanismos de Salida de Contingencia (Fallback Outputs):** Definir respuestas de seguridad si el modelo tiene incertidumbre.
4. **Adoptar una Persona Técnica:** Delimitar la perspectiva operativa ("Eres un ingeniero SRE de Google Cloud...").
5. **Frases Concisas y Tareas Simples:** Dividir requerimientos complejos en oraciones breves y tareas encadenadas secuencialmente.

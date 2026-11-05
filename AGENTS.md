# 🤖 Directrices Operativas para Agentes de IA (AGENTS.md)

Este documento define el protocolo de actuación obligatorio y estricto para cualquier agente de inteligencia artificial (incluyendo asistentes de codificación, agentes autónomos y subagentes) que interactúe con este repositorio.

---

## 📌 Reglas de Cumplimiento Estricto

### 1. 🧠 Regla Obligatoria: Siempre usar Codebase Memory (`codebase-memory-mcp`)

Este proyecto utiliza **codebase-memory-mcp** para mantener y navegar el grafo de conocimiento del código fuente y su arquitectura.
**SIEMPRE** se deben priorizar las herramientas de grafo sobre búsquedas basadas en grep, glob o listados recursivos directos para descubrimiento y análisis de código.

#### Jerarquía y Prioridad de Herramientas de Grafo:
1. **`search_graph`**: Localizar funciones, clases, componentes, rutas, tipos y variables por patrones de nombre o regex.
2. **`trace_path`**: Rastrear quién llama a una función o qué funciones/métodos son invocados (análisis de flujo entrante y saliente).
3. **`get_code_snippet`**: Leer el código fuente exacto y focalizado de funciones, clases o interfaces mediante su nombre calificado.
4. **`query_graph`**: Ejecutar consultas Cypher avanzadas para patrones topológicos complejos o dependencias intermodulares.
5. **`get_architecture`**: Obtener un resumen estructural de alto nivel de los módulos del proyecto.

#### Criterios de Excepción (Cuándo usar grep/glob):
* Búsqueda de literales de texto exactos, mensajes de error o cadenas de interfaz de usuario.
* Inspección de archivos sin soporte de grafo AST (archivos de configuración `.json`, `.yaml`, `.env`, Dockerfiles, scripts bash/powershell).
* Cuando las herramientas de grafo devuelvan información insuficiente o el índice requiera actualización.

---

### 2. ⚡ Regla Obligatoria: Siempre usar Ollama Local (`consultar_modelo_local`)

Cuando una tarea sea mecánica, repetitiva o de bajo riesgo, **DEBE** delegarse a modelos secundarios mediante la herramienta `consultar_modelo_local` en lugar de consumirse directamente en el modelo orquestador principal.

#### Casos de Uso para Delegación:
* Generación de docstrings, comentarios JSDoc/TSDoc y documentación inline.
* Formateo de datos, conversión de esquemas simples o JSON de ejemplo.
* Escritura de boilerplate repetitivo, mocks de prueba unitaria y plantillas.
* Resúmenes puntuales de fragmentos de texto o preguntas mecánicas directas sin impacto arquitectónico.

#### Jerarquía Estricta de Modelos en `consultar_modelo_local`:
1. **PRIMERO — `gemma4:cloud`**: Usar prioritariamente este modelo cloud siempre que haya suficiente cuota semanal disponible (< 90%).
2. **POSTERIORMENTE — `qwen3:8b-8k`**: Si la cuota semanal no es suficiente, o si la llamada a la nube falla por cualquier motivo, caer automáticamente al modelo local `qwen3:8b-8k` (~5.2 GB en memoria).

#### Prohibición de Delegación (Resolver directamente en el Agente Principal):
* Decisiones arquitectónicas, diseño de sistemas y contratos de API.
* Modificaciones que involucren múltiples archivos o dependencias cruzadas.
* Comprensión profunda de lógica de negocio, reglas de examen o algoritmos críticos.
* Cualquier cambio donde un fallo pueda provocar regresiones o pérdida de datos.

---

### 3. 📚 Regla Obligatoria: Siempre usar LLM Wiki de Forma Modular

Este repositorio implementa el patrón **LLM Wiki** propuesto por **Andrej Karpathy** ([referencia oficial](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)), estructurado de forma modular dentro del directorio [`wiki/`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki).

La LLM Wiki funciona como la **memoria externa persistente, modular y auto-mantenida** del proyecto, sirviendo como fuente canónica de verdad tanto para humanos como para agentes.

#### Principios Fundamentales del Patrón Karpathy:
* **Separación de Insumos (`wiki/raw/`)**: Los materiales de origen (notas de estudio, enlaces, especificaciones oficiales, volcados de preguntas) se almacenan de manera inmutable y apilable (*append-only*).
* **Síntesis Continua (`wiki/`)**: El contenido procesado no es un vertedero de texto; es una red interconectada de documentos markdown modulares, concisos y estructurados temáticamente.
* **Navegación e Índices Bidireccionales**: Toda página pertenece a una taxonomía clara y se encuentra referenciada en el catálogo general [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).
* **Resolución Proactiva de Contradicciones**: Al ingresar nueva información, el agente debe cotejar las páginas existentes, actualizar los conceptos que hayan cambiado y dejar registro de la evolución.

#### Flujo Operativo del Agente con la Wiki:
1. **Fase de Consulta Previa (Lectura)**:
   Antes de generar nuevo código, crear preguntas para los quizes o diseñar componentes, el agente **DEBE** consultar la sección relevante en `wiki/` para asegurar consistencia conceptual y técnica con el temario del examen GCP ACE.
2. **Fase de Ingesta y Actualización (Escritura)**:
   Cuando se agregue nuevo conocimiento, fuentes o decisiones de diseño:
   * Colocar la fuente original o notas crudas en `wiki/raw/`.
   * Sintetizar la información en el módulo correspondiente (`wiki/domains/`, `wiki/components/`, `wiki/cheatsheets/` o `wiki/architecture/`).
   * Mantener los enlaces markdown relativos entre documentos relacionados.
   * Actualizar el índice general en `wiki/index.md`.
3. **Fase de Registro (Auditoría)**:
   Añadir una entrada sintética en `wiki/log/changelog.md` detallando la modificación, la fecha y la justificación.

---

### 4. 🚫 Regla de Formato: Cero LaTeX / MathJax en Antigravity IDE

**PROHIBICIÓN ESTRICTA DE SINTAXIS LATEX / MATHJAX EN CHAT, DOCUMENTOS Y ARTEFACTOS:**
Antigravity IDE no cuenta con motor de renderizado LaTeX/MathJax en la interfaz de chat. Por lo tanto, el uso de delimitadores `$...$` o comandos TeX/LaTeX (como `\rightarrow`, `\le`, etc.) aparece roto e ilegible como texto sin procesar.

1. **PROHIBIDO:** Usar `$...$`, `$$...$$`, `\( ... \)`, `\[ ... \]` o comandos de barra invertida (`\rightarrow`, `\leftarrow`, `\le`, `\ge`, `\times`, `\neq`, `\to`, etc.).
2. **OBLIGATORIO - Reemplazo por Unicode, ASCII o Emojis:**
   * **Flechas y transiciones:** Usar flechas Unicode (`→`, `←`, `↔`, `⇒`), ASCII (`->`, `-->`, `=>`) o emojis (`➡️`, `⬅️`, `🔄`, `👉`). NUNCA `$\rightarrow$`.
   * **Comparaciones y rangos:** Usar símbolos Unicode (`≤`, `≥`, `≠`, `≈`) o ASCII (`<=`, `>=`, `!=`, `~`). NUNCA `$\le$`, `$\ge$`.
   * **Operaciones:** Usar `×` (o `x`, `*`), `/`, `±` (o `+/-`). NUNCA `\times`, `\pm`.
   * **Estados y viñetas:** Usar emojis (`✅`, `❌`, `⚠️`, `⏳`, `📌`, `💡`) o viñetas estándar (`-`, `*`).
3. **Verificación previa:** Revisa siempre antes de enviar una respuesta o crear un documento markdown que no contenga ningún símbolo `$` utilizado para notación matemática o comandos LaTeX.


# 🤖 Directrices Operativas para Agentes de IA (AGENTS.md)

Este documento define el protocolo de actuación obligatorio y estricto para cualquier agente de inteligencia artificial (incluyendo asistentes de codificación, agentes autónomos y subagentes) que interactúe con este repositorio.

---

## 1. 🧠 Descubrimiento de Código y Auto-Indexación en Codebase Memory (`codebase-memory`)

Este proyecto utiliza el servidor MCP **`codebase-memory`** para mantener un grafo de conocimiento semántico (LSP, AST, dependencias y rutas de llamada).

### Auto-Indexación Obligatoria:
1. Antes de iniciar cualquier tarea, verifica el estado de indexación con `index_status` o `list_projects`.
2. **Si el proyecto NO está indexado, es MANDATORIO ejecutar `index_repository` de inmediato.**
3. Tras añadir, renombrar o refactorizar archivos de código o servicios, es OBLIGATORIO refrescar el grafo ejecutando `index_repository`.

### Jerarquía Estricta de Herramientas de Grafo:
1. **`search_graph`**: Localizar funciones, clases, componentes, rutas, tipos y variables mediante regex.
2. **`trace_path`**: Análisis de impacto y trazado de llamadas entrantes (`inbound`) o salientes (`outbound`).
3. **`get_code_snippet`**: Lectura precisa de la definición y cuerpo de un símbolo sin sobrecargar el contexto.
4. **`detect_changes`**: Detección del impacto semántico de las modificaciones respecto a Git `HEAD`.
5. **`query_graph`** / **`get_architecture`**: Consultas Cypher complejas y visión estructural de alto nivel.

### Criterios de Excepción (Cuándo usar grep/read_file):
* Búsqueda de literales de texto exactos, mensajes de error o cadenas de interfaz de usuario.
* Inspección de archivos sin soporte de grafo LSP (`.json`, `.yaml`, `.env`, Dockerfiles, scripts bash/powershell).
* Cuando las herramientas de grafo devuelvan información insuficiente o el índice requiera actualización.

---

## 2. ⚡ Gobernanza Tripartita de Inferencia Secundaria (MCPs de IA)

Para optimizar recursos de cómputo, latencia y costos, delega tareas auxiliares, de razonamiento masivo, visión o respuestas rápidas en los 3 servidores MCP de IA según el caso de uso exacto:

| Servidor MCP | Herramienta Principal | Modelos Clave | Casos de Uso Estrictos |
| :--- | :--- | :--- | :--- |
| **`ollama-local`** | `consultar_modelo_local(prompt)` | `gemma4:cloud` (31B, < 90% cuota) → fallback local `qwen3:8b-8k` (~5.2 GB) | **Salvaguarda 100% Offline y Privacidad:** Obligatorio sin conexión a internet o al procesar secretos, credenciales (`.env`), tokens, claves privadas SSH o datos sensibles que jamás deben salir de la máquina local. |
| **`nvidia-nim`** | `consultar_modelo_nvidia(prompt, modelo)` / `analizar_imagen_nvidia(image_path, question)` | `moonshotai/kimi-k3.1-pro` (1M ctx), `nvidia/nemotron-3.5-super-vl-120b`, `nvidia/nemotron-3.5-lightning-30b` | **Visión Multimodal, Contexto Masivo y Precisión:** Obligatorio para inspeccionar imágenes/capturas/mockups con Nemotron 120B (0 MB de VRAM local), analizar bases de código masivas con Kimi K3.1 Pro (1M de tokens) y consultas de arquitectura compleja en la nube. |
| **`groq-cloud`** | `consultar_modelo_groq(prompt, modelo)` | `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b` | **Inferencia Ultra-Rápida LPU (~500 tok/s):** Respuestas instantáneas (< 1s), generación de boilerplate, docstrings, refactorizaciones sintácticas directas y explicaciones técnicas de alta velocidad. |

### Prohibición de Delegación (Resolver directamente en el Agente Principal):
* Decisiones arquitectónicas, diseño de sistemas y contratos de API críticos.
* Modificaciones que involucren múltiples archivos o dependencias cruzadas.
* Comprensión profunda de lógica de negocio, reglas de examen o algoritmos críticos.
* Cualquier cambio donde un fallo pueda provocar regresiones o pérdida de datos.

---

## 3. 📚 Memoria Agéntica Viva: Patrón Karpathy LLM Wiki + Google OKF v0.2

Este repositorio implementa el estándar de conocimiento compilado combinando el **Patrón LLM Wiki de Andrej Karpathy** ([referencia oficial](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)) y la especificación **Google Open Knowledge Format (OKF v0.2)** ([okf.md](https://okf.md/)) dentro de [`wiki/`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki).

### Arquitectura Modular:
* **Insumos Inmutables (`wiki/raw/`):** Notas crudas, transcripciones, volcados de laboratorios, cuestionarios y especificaciones oficiales (*append-only*).
* **Síntesis Modular (`wiki/`):** Artículos temáticos interconectados en `wiki/domains/`, `wiki/courses/`, `wiki/components/`, `wiki/cheatsheets/`, `wiki/architecture/` (y, para módulos técnicos adicionales, `wiki/systems/`, `wiki/concepts/`, `wiki/entities/`).
* **Frontmatter YAML Canónico (OKF v0.2):** Todo nuevo artículo sintetizado en `wiki/` debe iniciar con metadatos OKF:
  ```yaml
  ---
  title: Nombre del Componente, Curso o Protocolo
  type: system | concept | entity | course | domain
  tags: [tag1, tag2, tag3]
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  status: draft | stable | deprecated
  ---
  ```

### Flujo Operativo del Agente con la Wiki:
1. **Lectura Previa Obligatoria:** Antes de modificar código, diseñar componentes o redactar preguntas, consulta [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) y los artículos relacionados en `wiki/` para evitar regresiones conceptuales.
2. **Ingesta y Síntesis:** Guarda la fuente cruda en `wiki/raw/`, sintetiza en el módulo correspondiente manteniendo enlaces markdown navegables y resuelve proactivamente cualquier contradicción.
3. **Índice y Bitácora Continua:** Registra cada nuevo archivo en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) y añade una entrada cronológica en [`wiki/log/changelog.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/log/changelog.md) detallando fecha, contexto, decisiones técnicas y archivos modificados.

---

## 4. 🛡️ Reglas Inmutables de Ejecución y DevSecOps

### 4.1 🚫 Cero Sintaxis LaTeX / MathJax
Antigravity IDE, NotebookLM y las consolas CLI no renderizan comandos TeX/LaTeX.
1. **PROHIBIDO:** Usar `$...$`, `$$...$$`, `\( ... \)`, `\[ ... \]` o comandos de barra invertida (`\rightarrow`, `\leftarrow`, `\le`, `\ge`, `\times`, `\neq`, `\pm`, `\frac`, etc.).
2. **OBLIGATORIO:** Usar caracteres Unicode (`→`, `←`, `↔`, `⇒`, `≤`, `≥`, `≠`, `≈`, `×`, `±`), ASCII estándar (`->`, `<=`, `>=`, `*`) o emojis (`✅`, `❌`, `⚠️`, `⏳`, `📌`, `💡`).

### 4.2 ⏱️ Prevención de Bloqueos por Timeout (Anti-Hang)
* Todo comando de red o prueba de conectividad (`curl`, `requests`, sockets) **DEBE** incluir un timeout explícito y corto (máximo 5 a 10 segundos).
* Prohibido lanzar procesos de red indefinidos en segundo plano sin guardia de tiempo.

### 4.3 🔐 Cero Secretos en el Repositorio (Zero Secrets in VCS)
* Nunca realices commit de claves reales (`gsk_...`, `nvapi-...`, tokens JWT, contraseñas o credenciales).
* Los secretos residen exclusivamente en `.env` (ignorado por `.gitignore`); en Git solo se versiona `.env.example` con valores de plantilla.

### 4.4 🧹 Eliminación Estricta de Archivos Windows `Zone.Identifier` Previo a Cualquier Commit
1. **PROHIBICIÓN:** Está terminantemente prohibido incluir o commitear archivos con sufijo `:Zone.Identifier` o `.Zone.Identifier`.
2. **ACCIÓN OBLIGATORIA PRE-COMMIT:** Antes de cualquier `git add` o `git commit`, ejecuta:
   ```bash
   find . -name "*:Zone.Identifier" -type f -delete
   # o alternativamente:
   npm run clean:zone
   ```
3. Verifica con `git status` que no quede ningún archivo residual staged o untracked.

### 4.5 🧪 Ejecución Integral de Pruebas Unitarias y BDD Previo a Push a `main`
La rama `main` está enlazada directamente con el despliegue automático de GitHub Pages.
1. **OBLIGATORIEDAD:** Previo a ejecutar `git push origin main`, ejecuta sin excepción la suite completa de pruebas unitarias y escenarios BDD:
   ```bash
   npm test
   # o específicamente:
   npm run test:unit && npm run test:bdd
   ```
2. **CRITERIO DE BLOQUEO:** Si alguna prueba unitaria o escenario BDD falla, **QUEDA ESTRICTAMENTE PROHIBIDO** realizar el push a `main` hasta diagnosticar y resolver el fallo.

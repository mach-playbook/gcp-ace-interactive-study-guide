# 📥 Materiales e Insumos en Bruto (`wiki/raw/`)

Siguiendo el principio de **LLM Wiki** de Andrej Karpathy, este directorio almacena los datos de origen de manera **inmutable** y de **solo anexado** (*append-only*).

---

## 🎯 Propósito
* Guardar notas de estudio sin depurar, transcripciones de cursos oficiales (Google Cloud Skills Boost, Coursera), dumps de preguntas de práctica y extractos normativos de Google Cloud.
* Servir como punto de partida para que los agentes analicen, depuren y sinteticen el contenido en los módulos formales de `wiki/domains/`, `wiki/cheatsheets/` y `wiki/components/`.

---

## 📋 Protocolo de Adición de Insumos

1. **Nombrado de Archivos**:
   Utilizar prefijos de fecha o procedencia:
   * `YYYY-MM-DD-fuente-descripcion.md` (ejemplo: `2026-11-05-skills-boost-iam-notes.md`)
   * `dump-sample-questions-official.md`
2. **Inmutabilidad**:
   * Una vez guardado un archivo en `raw/`, **no se debe modificar ni reescribir**.
   * Si se descubre nueva información contradictoria, se agrega un archivo nuevo con fecha posterior y se actualiza la página sintetizada en `wiki/domains/`.
3. **Flujo de Procesamiento del Agente**:
   * Paso 1: Leer el documento en `wiki/raw/`.
   * Paso 2: Extraer conceptos clave, tablas comparativas y comandos `gcloud`.
   * Paso 3: Integrar la información en los módulos correspondientes en `wiki/domains/` o `wiki/cheatsheets/`.
   * Paso 4: Registrar la síntesis en `wiki/log/changelog.md`.


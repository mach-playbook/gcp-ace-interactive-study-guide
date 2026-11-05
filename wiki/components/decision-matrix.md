# 🌲 Componente: Matriz y Árbol de Decisión Interactivo

Especificación funcional y lógica para los módulos interactivos de selección de almacenamiento, bases de datos y cómputo en Google Cloud.

---

## 🎯 Objetivo de Aprendizaje

Gran parte de las preguntas del examen ACE presentan un caso de negocio con restricciones específicas (latencia, costo, modelo de datos, soporte SQL, transaccionalidad global, escalabilidad horizontal) y exigen elegir la solución óptima recomendada por Google Cloud.

---

## 🗂️ Módulos de Decisión Soportados

### 1. Árbol de Decisión de Almacenamiento y Datos
Preguntas guía para el usuario a través del widget interactivo:
1. **¿Qué tipo de datos almacenas?**
   * Objetos binarios / Archivos no estructurados (imágenes, backups, multimedia) → **Cloud Storage**.
   * Datos estructurados / tabulares relacionales con transacciones ACID:
     * ¿Requiere escalabilidad horizontal y distribución global multirregión con consistencia fuerte?
       * SÍ → **Cloud Spanner**.
       * NO (hasta 64 TB, soporte PostgreSQL/MySQL/SQL Server estándar) → **Cloud SQL**.
   * Datos semiestructurados / NoSQL:
     * ¿Altísima tasa de lectura/escritura (>10,000 QPS) con petabytes de datos y baja latencia de milisegundos (IoT, series temporales)?
       * SÍ → **Cloud Bigtable**.
     * ¿Aplicaciones móviles/web con sincronización en tiempo real y soporte offline?
       * SÍ → **Firestore**.
   * Analítica empresarial / OLAP a escala de Petabytes con SQL masivo:
     * SÍ → **BigQuery**.

### 2. Árbol de Decisión de Cómputo
1. **¿Requiere acceso al sistema operativo, control de kernel o software propietario no contenerizado?**
   * SÍ → **Compute Engine**.
2. **¿Carga contenerizada?**
   * ¿Requiere orquestación compleja, redes avanzadas, mallas de servicios (Istio), GPU compartida o compatibilidad nativa con Kubernetes?
     * SÍ:
       * ¿Desea gestión completa de nodos por Google Cloud? → **GKE Autopilot**.
       * ¿Desea control de tipos de instancias y SO del nodo? → **GKE Standard**.
   * ¿Microservicio web stateless HTTP/gRPC o worker que escala a cero?
     * SÍ → **Cloud Run**.
3. **¿Código ligero disparado por eventos de nube (Pub/Sub, Storage) sin servidor HTTP continuo?**
   * SÍ → **Cloud Run Functions**.

---

## 🖥️ Interfaz de Usuario Sugerida
* **Modo Cuestionario Paso a Paso**: 3-4 preguntas con tarjetas seleccionables que van filtrando opciones descartadas en tiempo real.
* **Modo Matriz Comparativa**: Tabla dinámica con filtros activables por características (Consistencia Fuerte, Scale-to-Zero, Soporte SQL, etc.).


# Ingesta Cruda: Spanner

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689573](https://www.skills.google/paths/8/course_templates/60/video/689573)  
**Video YouTube Oficial**: [Spanner (uxmBbmv7Av0)](https://www.youtube.com/watch?v=uxmBbmv7Av0)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Lección**: 25 (Skills Video ID: `689573` | YouTube ID: `uxmBbmv7Av0`)  
**Puntos Acumulados**: 14,070  

---

## 📝 Transcripción Oficial Sanitizada

```text
00:00 The third core storage option offered by Google Cloud is Spanner.
00:04 Spanner is a fully managed relational database service that scales horizontally, is strongly consistent, and speaks SQL.
00:12 Battle tested by Google’s own mission-critical applications and services, Spanner is the service that powers Google’s $400 billion business.
00:22 Spanner is especially suited for applications that require a SQL relational database management system with joins and secondary indexes, built-in high availability, external consistency, and high numbers of input and output operations per second.
00:39 We’re talking tens of thousands of reads and writes per second or more.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

### 1. Definición y Características Distintivas de Cloud Spanner
* **Definición**: Servicio de base de datos relacional distribuida a escala planetaria, totalmente administrado (*DBaaS*), que rompe la dicotomía tradicional del teorema CAP al combinar las garantías ACID y el lenguaje SQL estándar de las bases de datos relacionales tradicionales con la escalabilidad horizontal ilimitada y alta disponibilidad de los sistemas NoSQL.
* **Los 3 Pilares Técnicos de Spanner**:
  1. **Escalabilidad Horizontal Ilimitada**: A diferencia de los motores RDBMS tradicionales (como Cloud SQL) que dependen de escalado vertical (*scale-up* mediante hardware más grande), Spanner escala horizontalmente añadiendo nodos de cómputo de manera transparente y sin tiempo de inactividad.
  2. **Consistencia Fuerte Externa (External Consistency)**: Garantiza que cualquier transacción se registre y sea visible en orden secuencial estricto en todas las réplicas del mundo, respaldada por la tecnología de relojes atómicos y GPS de Google (**TrueTime API**).
  3. **Habla SQL Estándar (ANSI SQL 2011)**: Soporta esquemas relacionales formales, transacciones distribuidas ACID completas, operaciones complejas de JOIN y creación de índices secundarios (*Secondary Indexes*).

### 2. Rendimiento y Cargas de Trabajo de Misión Crítica
* **Capacidad de IOPS Masiva**: Diseñado para soportar decenas de miles a millones de operaciones de lectura y escritura por segundo (*IOPS*) con latencias predecibles de un solo dígito de milisegundos.
* **Infraestructura Probada en Producción**: Es el motor central que soporta la infraestructura de negocio multimillonaria de Google (Google Ads, Google Play, Gmail, YouTube, etc.).
* **Alta Disponibilidad Integrada**:
  * **Configuraciones Regionales**: Disponibilidad garantizada del 99.99% (cuatro nueves).
  * **Configuraciones Multi-Región**: Disponibilidad líder en la industria del **99.999%** (cinco nueves, lo que equivale a menos de 5 minutos de inactividad al año) con replicación síncrona sin intervención manual.

### 3. Cuándo Elegir Cloud Spanner vs Cloud SQL (Criterios ACE)

| Característica | Cloud SQL | Cloud Spanner |
| :--- | :--- | :--- |
| **Modelo de Escalado** | Vertical (*Scale-up* cambiando de tipo de máquina) | Horizontal (*Scale-out* añadiendo nodos de cómputo) |
| **Límite de Almacenamiento** | Hasta 64 TB por instancia | Prácticamente ilimitado (Petabytes de datos relacionales) |
| **Alcance Geográfico** | Regional (Failover multi-zona) | Regional o Multi-Región (Transacciones ACID globales) |
| **Disponibilidad (SLA)** | Hasta 99.95% (en configuración HA regional) | 99.99% (Regional) hasta 99.999% (Multi-Regional) |
| **Patrón de Carga** | Aplicaciones web estándar, ERP/CRM departamentales | Banca internacional, pasarelas de pago globales, sistemas de reservas en tiempo real masivos |
| **Estructura de Costes** | Coste por instancia (vCPU/RAM) y almacenamiento | Coste por nodo de computación / processing units y almacenamiento |

---

## 💡 Preguntas y Trampas Clave para el Examen Google Cloud ACE

1. **La Regla de Decisión "Relacional + Multi-Región + Consistencia Fuerte"**:
   * *Pregunta Clave del Examen*: "Una empresa global de servicios financieros requiere una base de datos relacional con soporte transaccional ACID, consultas JOIN complejas, consistencia externa estricta y replicación síncrona con disponibilidad del 99.999% a través de América del Norte y Europa. ¿Qué servicio debe seleccionar?"
   * *Respuesta Correcta*: **Cloud Spanner**.
   * *Trampa Clave*: Nunca seleccionar Cloud SQL con réplicas de lectura cross-region, porque las réplicas en Cloud SQL son asíncronas (consistencia eventual, no fuerte) y no admiten escrituras transaccionales globales.
2. **Escala de Rendimiento sin Paradas**:
   * Para absorber picos masivos de tráfico imprevistos (como un evento de Black Friday), se incrementa dinámicamente el número de nodos o *Processing Units* en Cloud Spanner sin interrupciones operativas ni necesidad de rediseñar las tablas o sharding manual.


# 🗄️ Árbol de Decisión: Almacenamiento y Bases de Datos en GCP

Guía mnemotécnica y comparativa rápida para resolver preguntas de selección de almacenamiento en el examen Google Cloud ACE.

---

## 🧭 Diagrama de Flujo Lógico

```
                        ¿Tipo de Datos?
                               │
            ┌──────────────────┴──────────────────┐
     No Estructurados                      Estructurados
            │                                     │
      [Cloud Storage]                     ¿Modelo de Datos?
            │                                     │
    ¿Frecuencia Acceso?            ┌──────────────┴──────────────┐
     • Diario       → Standard  Relacional (SQL)           NoSQL / Analítico
     • Mensual      → Nearline     │                             │
     • Trimestral   → Coldline     │                             │
     • Plurianual   → Archive      │                             │
                                   │                             │
        ┌──────────────────────────┘                             │
        │                                                        │
 ¿Alcance y Escala?                                   ¿Caso de Uso NoSQL?
  • Regional / Única Instancia (hasta 64 TB)             • Millones de ops/seg,
    → [Cloud SQL] (MySQL/PostgreSQL/SQL Server)            baja latencia, IoT,
  • Multirregional / Global, transacciones ACID            >1 TB datos
    con escalabilidad horizontal masiva                    → [Cloud Bigtable]
    → [Cloud Spanner]                                    • Apps móviles/web,
                                                           sincronización en vivo,
                                                           documentos jerárquicos
                                                           → [Firestore]
                                                         • Analítica masiva,
                                                           Data Warehouse OLAP
                                                           → [BigQuery]
```

---

## 📋 Resumen Rápido para el Examen

| Servicio | Modelo | Máx. Tamaño / Carga | Característica Distintiva |
| :--- | :--- | :--- | :--- |
| **Cloud Storage** | Objetos (Blob) | Objetos hasta 5 TB | Bucket global/regional, inmutable, políticas de ciclo de vida |
| **Cloud SQL** | RDBMS (MySQL, Postgres, SQL Server) | Hasta 64 TB | Fácil migración desde On-Premises, réplicas de lectura, failover automático |
| **Cloud Spanner** | RDBMS Global | Ilimitado (PB) | Consistencia fuerte global, 99.999% SLA multirregión, caro para cargas pequeñas |
| **Cloud Bigtable** | NoSQL Columnar / Key-Value | Petabytes | Cargas IoT, series de tiempo, integración directa con Apache HBase / Hadoop |
| **Firestore** | NoSQL Documental | Terabytes | Modo Datastore vs Native; soporte offline nativo en clientes móviles y web |
| **BigQuery** | Analítico (OLAP / DWH) | Petabytes / Exabytes | Motor SQL sin servidor, columnas optimizadas (Capacitor), BigQuery ML |


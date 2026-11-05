# ⚙️ Dominio 3: Operación Exitosa de Soluciones Cloud (~27% del Examen)

El Dominio 3 evalúa la gestión del ciclo de vida de los recursos en ejecución: mantenimiento de instancias de cómputo, operaciones sobre datos, supervisión con Google Cloud Operations Suite y gestión de incidentes.

---

## 1. Operaciones de Cómputo (Compute Operations)

### Conexión y Gestión de Acceso:
* **OS Login**:
  * Vincula el acceso SSH a la identidad de Cloud IAM del usuario en lugar de usar claves SSH manuales en metadatos.
  * Habilita autenticación multifactor (MFA) y cumplimiento empresarial.
  * Activación a nivel de proyecto o instancia mediante metadatos: `enable-oslogin=TRUE`.
  * Roles IAM necesarios: `roles/compute.osLogin` o `roles/compute.osAdminLogin`.

### Resiliencia de Discos y Almacenamiento:
* **Snapshots de Persistent Disk**:
  * Copias de seguridad incrementales de bloques de datos en un disco persistente.
  * Se pueden programar automáticamente mediante Snapshot Schedules.
  * Permiten restaurar discos en cualquier zona de la misma región o en regiones diferentes.
* **Custom Images (Imágenes Personalizadas)**:
  * Empaquetan el sistema operativo, dependencias y binarios para arranque rápido en grupos de instancias (MIGs).

### Operaciones con GKE y kubectl:
* Obtener credenciales de cluster:
  `gcloud container clusters get-credentials NOMBRE_CLUSTER --region REGION`
* Escalar un Deployment:
  `kubectl scale deployment/mi-app --replicas=5`
* Actualizar la versión de imagen de un contenedor:
  `kubectl set image deployment/mi-app mi-contenedor=gcr.io/proyecto/imagen:v2`

---

## 2. Operaciones sobre Bases de Datos y Almacenamiento

* **Cloud SQL**:
  * Backups automáticos y retención de registros de transacciones (point-in-time recovery, PITR).
  * Creación de Read Replicas para descargar tráfico de lectura y conmutación por error (Failover).
  * Exportación e importación de volcados SQL a Cloud Storage mediante `gcloud sql export/import`.
* **Cloud Storage Lifecycle Management**:
  * Depuración periódica de objetos antiguos y transición automatizada hacia clases de menor costo (Standard → Nearline → Coldline → Archive).

---

## 3. Google Cloud Operations Suite (Observabilidad)

### Cloud Monitoring:
* **Métricas y Dashboards**: Supervisión de utilización de CPU, memoria, I/O de disco y latencia de red.
* **Ops Agent**:
  * Agente unificado para Compute Engine que recolecta tanto métricas de sistema (memoria, procesos) como logs de aplicaciones.
  * Reemplazo de los agentes heredados de Monitoring y Logging.
* **Alerting Policies**:
  * Configuración de condiciones de umbral, canales de notificación (Email, SMS, Slack, PagerDuty, Webhooks) y documentación de remediación.

### Cloud Logging:
* **Log Sinks (Receptores de Registros)**:
  * Exportación de registros en tiempo real a destinos externos:
    * **Cloud Storage**: Retención y archivado legal a largo plazo.
    * **BigQuery**: Análisis e investigación forense con SQL.
    * **Pub/Sub**: Procesamiento en tiempo real por pipelines externos o SIEMs.
* **Filtros de Exclusión**: Permiten descartar logs de depuración de alto volumen para reducir costos de ingesta.


# 🔒 Dominio 4: Configuración de Acceso y Seguridad (~20% del Examen)

El Dominio 4 se enfoca en la gestión de identidades, permisos de acceso mediante IAM, cuentas de servicio (Service Accounts), Workload Identity y registro de auditoría.

---

## 1. Cloud Identity and Access Management (IAM)

El modelo de control de acceso en Google Cloud responde a la pregunta: **¿Quién (Member) puede hacer qué (Role/Permission) sobre qué recurso (Resource)?**

### Tipos de Roles en IAM:
1. **Roles Básicos / Primitivos (Legacy)**:
   * `Owner` (Propietario): Control total sobre recursos, facturación y gestión de roles.
   * `Editor` (Editor): Modificación y despliegue de recursos; no puede modificar permisos ni facturación.
   * `Viewer` (Lector): Acceso de solo lectura.
   * *Regla de examen*: **EVITAR** los roles primitivos en producción; violan el principio de menor privilegio.
2. **Roles Predefinidos (Predefined Roles)**:
   * Diseñados por Google Cloud por servicio (ej. `roles/compute.instanceAdmin.v1`, `roles/storage.objectViewer`).
   * *Buenas prácticas*: Es la opción recomendada para la gran mayoría de escenarios.
3. **Roles Personalizados (Custom Roles)**:
   * Conjuntos específicos de permisos (`service.resource.verb`) agrupados manualmente por el administrador.
   * *Limitación*: No se pueden aplicar a nivel de carpeta (Folder) en algunas versiones de organización, solo a nivel de Proyecto u Organización. No aplican sobre permisos de servicios administrados no compatibles.

---

## 2. Cuentas de Servicio (Service Accounts)

Una cuenta de servicio es una identidad especial utilizada por aplicaciones, procesos o máquinas virtuales para autenticarse contra las APIs de Google Cloud.

* **Dirección de correo**: `nombre-sa@ID_PROYECTO.iam.gserviceaccount.com`.
* **Cuentas de Servicio por Defecto (Default Service Accounts)**:
  * Creadas automáticamente al habilitar ciertas APIs (ej. Compute Engine default SA).
  * Por defecto históricamente poseían el rol primitivo `Editor`. En entornos seguros se debe desactivar este comportamiento o retirar el rol `Editor`.
* **Impersonation (Suplantación de Identidad)**:
  * En lugar de descargar claves privadas JSON (riesgo de fuga de credenciales), los usuarios o servicios asumen roles temporales mediante el permiso `iam.serviceAccounts.actAs` y `roles/iam.serviceAccountTokenCreator`.

---

## 3. GKE Workload Identity Federation

Es la mejor práctica recomendada por Google para permitir que los Pods de Kubernetes accedan a los recursos de Google Cloud sin requerir claves de cuentas de servicio montadas como secretos.

* Vincula una **Kubernetes Service Account (KSA)** dentro del namespace del cluster a una **Google Service Account (GSA)** de Cloud IAM.
* La KSA intercambia tokens con la infraestructura de metadatos de GKE para recibir un token de acceso OAuth2 temporal de la GSA correspondiente.

---

## 4. Auditoría y Seguridad Perimetral

### Cloud Audit Logs:
* **Admin Activity Logs**: Registran llamadas que modifican la configuración o metadatos de recursos. Habilitados por defecto; no se pueden deshabilitar y son gratuitos.
* **Data Access Logs**: Registran llamadas que leen o escriben datos proporcionados por el usuario (ej. leer un objeto de Cloud Storage o consultar BigQuery). Deshabilitados por defecto (excepto BigQuery) debido a volumen de almacenamiento.
* **System Event Logs**: Registran acciones automáticas del sistema de Google Cloud (ej. migraciones en vivo de VMs).

### VPC Service Controls (Perímetros de Seguridad):
* Aíslan los servicios sensibles de Google Cloud (Cloud Storage, BigQuery) dentro de un perímetro seguro para evitar la exfiltración de datos a internet o proyectos externos.


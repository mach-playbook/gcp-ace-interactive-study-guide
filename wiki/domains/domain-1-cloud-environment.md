# 🌐 Dominio 1: Configuración del Entorno Cloud (~23% del Examen)

El Dominio 1 del examen **Associate Cloud Engineer (ACE)** evalúa la capacidad de planificar y configurar los componentes fundamentales del entorno en Google Cloud Platform: jerarquía de recursos, facturación, identidad, cuotas y observabilidad inicial.

---

## 1. Jerarquía de Recursos en Google Cloud

La jerarquía organiza los recursos de forma lógica y gobierna el control de acceso y las políticas de la organización:

```
[Organización (dominio.com)]
           │
     ┌─────┴────────┐
  [Folder A]    [Folder B]
     │              │
[Proyecto 1]   [Proyecto 2]
     │              │
[Recursos]     [Recursos]
(VMs, Buckets, Redes VPC, etc.)
```

### Reglas Clave de Herencia:
* **Herencia hacia abajo**: Los permisos y roles asignados en un nivel superior (ej. Organización o Folder) se heredan automáticamente hacia abajo (Proyectos y Recursos).
* **Unión de permisos**: Los permisos son aditivos. No se pueden revocar permisos heredados en un nivel inferior mediante políticas IAM normales (a excepción de las políticas explícitas *Deny* de IAM v2).
* **ID vs Nombre vs Número de Proyecto**:
  * **Project ID**: Globalmente único, asignado al crear, inmutable (6 a 30 caracteres alfanuméricos y guiones).
  * **Project Name**: Asignado por el usuario, editable, no necesariamente único.
  * **Project Number**: Generado automáticamente por Google Cloud, único numérico, inmutable.

---

## 2. Facturación y FinOps (Cloud Billing)

### Conceptos Fundamentales:
* **Billing Account (Cuenta de Facturación)**: Gestiona el pago de recursos. Puede estar vinculada a uno o varios proyectos.
* **Proyectos Huérfanos**: Un proyecto sin cuenta de facturación vinculada no puede consumir recursos de pago (Compute Engine, Cloud SQL, etc.).
* **Presupuestos y Alertas (Budgets & Alerts)**:
  * Los presupuestos se configuran en umbrales porcentuales del gasto previsto o real (ej. 50%, 90%, 100%).
  * **Trampa típica de examen**: Por defecto, un presupuesto y una alerta **NO apagan** los recursos ni detienen el gasto; solo envían notificaciones por email o eventos a Pub/Sub.
  * Para detener recursos automáticamente ante un sobrecoste, se requiere conectar el topic de Pub/Sub con una Cloud Run Function que deshabilite la facturación o apague instancias.
* **Exportación de Facturación a BigQuery**:
  * Habilita el análisis detallado de costos diarios, SKU, etiquetas (labels) y precios con descuento mediante consultas SQL.

---

## 3. Identidad, Acceso y Cuotas

### Cloud Identity y Google Workspace:
* Gestiona identidades corporativas (usuarios, grupos y unidades organizacionales).
* Permite federación con Microsoft Entra ID (Azure AD), Okta y proveedores SAML 2.0.

### Cuotas y Límites de Recursos:
* **Cuotas de Tasa (Rate Quotas)**: Restricciones de llamadas API por minuto (ej. 600 solicitudes/minuto). Se resetean automáticamente con el tiempo.
* **Cuotas de Asignación (Allocation Quotas)**: Límite absoluto de recursos físicos en un proyecto/región (ej. 24 CPUs en us-central1). Requieren una solicitud formal de incremento mediante la consola o la API.
* **Comandos gcloud**:
  * Listar proyectos: `gcloud projects list`
  * Vincular facturación: `gcloud billing projects link MI_PROYECTO --billing-account=0X0X0X-0X0X0X-0X0X0X`
  * Describir cuotas de una región: `gcloud compute regions describe us-central1 --format="value(quotas)"`

---

## 4. Observabilidad y Herramientas Asistidas por IA

* **Cloud Asset Inventory**: Búsqueda histórica y en tiempo real de metadatos de recursos, políticas IAM y configuraciones a nivel organizacional.
* **Gemini Cloud Assist**: Recomendaciones contextuales de arquitectura, resolución de problemas e inspección de recursos en la consola de Google Cloud.


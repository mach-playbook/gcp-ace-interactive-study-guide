# 🔐 Reglas de Jerarquía de Recursos e IAM en GCP

Resumen mnemotécnico de reglas de herencia, políticas de acceso y tipos de miembros en Google Cloud IAM.

---

## 🏛️ Jerarquía Canónica de Recursos

1. **Organización** (Dominio de Cloud Identity / Workspace, ej: `empresa.com`)
2. **Carpetas (Folders)** (Opcionales, anidables hasta varios niveles de profundidad)
3. **Proyectos (Projects)** (Contenedores base para todos los recursos)
4. **Recursos individuales** (VMs, Buckets, Datasets, etc.)

---

## ⚖️ Principios Clave de IAM

* **Herencia Descendente Estricta**:
  * Un permiso asignado en la Organización aplica en todas sus Carpetas, Proyectos y Recursos.
  * No es posible "desmarcar" o retirar un rol asignado en un nivel superior desde un nivel inferior.
* **Aditividad (Unión de Permisos)**:
  * Si un usuario tiene `Viewer` a nivel de Proyecto y se le asigna `Storage Admin` en un Bucket específico, tendrá acceso de administración sobre ese Bucket y de solo lectura en el resto del proyecto.
* **Políticas Deny (Políticas de Denegación)**:
  * Introducidas en IAM v2 para bloquear permisos específicos a identidades independientemente de los roles concedidos (*Deny siempre gana sobre Allow*).

---

## 👥 Tipos de Miembros (Principals)

| Prefijo de Miembro | Formato / Ejemplo | Descripción |
| :--- | :--- | :--- |
| `user:` | `user:ana@empresa.com` | Cuenta de Google individual o cuenta de Cloud Identity |
| `group:` | `group:devops@empresa.com` | Grupo de Google; mejor práctica para asignar roles a equipos |
| `serviceAccount:` | `serviceAccount:sa-app@proy.iam.gserviceaccount.com` | Identidad no humana para aplicaciones y cargas |
| `domain:` | `domain:empresa.com` | Todos los usuarios administrados bajo ese dominio |
| `allAuthenticatedUsers` | Valor literal `allAuthenticatedUsers` | Cualquier usuario con cuenta de Google válida |
| `allUsers` | Valor literal `allUsers` | Acceso público sin autenticación (ej. web hosting en GCS) |


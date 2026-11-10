# 📜 Bitácora de Síntesis y Cambios de la Wiki (`wiki/log/`)

Registro cronológico de evoluciones, ingestas de contenido y mantenimiento estructural de la LLM Wiki siguiendo las pautas de Andrej Karpathy.

---

## [2026-11-09] - Ingesta de Lección 20: Connecting networks to Google VPC (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-connecting-networks-to-google-vpc.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-connecting-networks-to-google-vpc.md) con la transcripción oficial limpia del video 689566 (YouTube `g24UStCvpQg`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 20: Connecting networks to Google VPC**.
  * Creada la sección **3.7: Conectividad Híbrida y Multi-Cloud (Connecting Networks to Google VPC)** con:
    1. Cloud VPN y Cloud Router (BGP dinámico para anuncio automático de subredes sin tiempo de inactividad, HA VPN con 99.99% SLA).
    2. Conectividad pública con Direct Peering y Carrier Peering hacia IPs públicas de Google (Workspace y APIs) y su regla crítica de examen: ausencia de SLA garantizado por Google.
    3. Conectividad privada empresarial con Dedicated Interconnect (circuitos directos de 10G/100G) y Partner Interconnect (circuitos sub-10G a través de operadores) con SLA de hasta 99.99% en topología de alta disponibilidad.
    4. Cross-Cloud Interconnect para enlaces directos cloud-to-cloud (AWS, Azure, OCI) de 10G/100G sin gestionar hardware intermedio.
    5. Matriz y árbol de decisión de conectividad híbrida para preguntas de examen ACE.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-20` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (5:45), resumen analítico y 5 puntos clave de examen.
  * Incorporados los términos `Cloud VPN` y `Cloud Interconnect` al glosario oficial del curso.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 20 lecciones en video y los términos del glosario.
  * Ejecución exitosa de los 45 tests unitarios y BDD.
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 19: Cloud DNS and Cloud CDN (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-dns-and-cloud-cdn.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-dns-and-cloud-cdn.md) con la transcripción oficial limpia del video 689565 (YouTube `TYB1cur47mk`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 19: Cloud DNS and Cloud CDN**.
  * Creada la sección **3.6: Servicios de Aceleración y Resolución: Cloud DNS y Cloud CDN** con:
    1. Distinción conceptual entre Google Public DNS (`8.8.8.8`, resolvedor recursivo) y Cloud DNS (servicio autoritativo gestionado con 100% SLA sobre Anycast).
    2. Zonas DNS públicas (visibles en internet) vs privadas (resolución restringida a VPCs sin publicar IPs internas).
    3. Almacenamiento en caché de borde (*Edge Caching*) con Cloud CDN en más de 100 PoPs globales: baja latencia, descarga en el backend y reducción sustancial de costos de salida (*egress*).
    4. Integración nativa con External Application Load Balancers mediante una sola casilla de verificación y compatibilidad con CDNs de terceros vía CDN Interconnect.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-19` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (1:45), resumen pedagógico y 5 puntos clave de examen.
  * Incorporados los términos `Cloud DNS` y `Cloud CDN` al glosario oficial del curso.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 19 lecciones en video y los términos del glosario.
  * Ejecución exitosa de los 45 tests unitarios y BDD.
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 18: Cloud Load Balancing (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-load-balancing.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-load-balancing.md) con la transcripción oficial limpia del video 689564 (YouTube `HWJQ3LNagXc`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 18: Cloud Load Balancing**.
  * Creada la sección **3.5: Cloud Load Balancing (Balanceo de Carga en la Nube)** con:
    1. Servicio definido por software (SDN) completamente administrado sin VMs dedicadas ni necesidad de pre-calentamiento (*no pre-warming*).
    2. Balanceo multi-región con dirección Anycast global y conmutación por error suave (*cross-region failover*).
    3. Application Load Balancers (Capa 7 - HTTP/HTTPS) como reverse proxies con enrutamiento de contenido basado en URLs y terminación SSL.
    4. Proxy Network Load Balancers (Capa 4 - TCP/SSL) para terminación de sesiones y soporte de backends híbridos (NEGs).
    5. Passthrough Network Load Balancers (Capa 4 - TCP/UDP) que no actúan como proxy, preservando la IP real del cliente y habilitando Direct Server Return (DSR).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-18` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (2:55), resumen analítico y 4 puntos clave de examen.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 18 lecciones en video.
  * Ejecución exitosa de los 45 tests unitarios y BDD.
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 17: Important VPC compatibilities (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-important-vpc-compatibilities.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-important-vpc-compatibilities.md) con la transcripción oficial limpia del video 689563 (YouTube `UtNlJbm8s2Q`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 17: Important VPC compatibilities**.
  * Creada la sección **3.4: Capacidades y Compatibilidades Clave de VPC (VPC Compatibilities)** con:
    1. Tablas de enrutamiento globales distribuidas nativas sin necesidad de routers virtuales ni físicos.
    2. Firewall global con estado y filtrado elástico desacoplado de IPs mediante Network Tags.
    3. Conectividad privada inter-VPC mediante VPC Network Peering (no transitivo, latencia de red interna).
    4. Arquitectura de Shared VPC (Host Project centralizado para redes y Service Projects para desarrolladores con roles IAM granulares `roles/compute.networkUser` y `roles/compute.xpnAdmin`).
    5. Cuadro comparativo riguroso de certificación ACE: VPC Network Peering vs Shared VPC.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-17` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (1:30), resumen analítico y 4 puntos clave de examen.
  * Incorporado el término técnico `Shared VPC` al glosario oficial del curso.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 17 lecciones en video y los términos del glosario.
  * Ejecución exitosa de los tests unitarios y BDD.
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 16: Scaling virtual machines (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-scaling-virtual-machines.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-scaling-virtual-machines.md) con la transcripción oficial limpia del video 689562 (YouTube `YQK8u563me4`).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Actualizada la Videoteca Oficial incorporando la **Lección 16: Scaling virtual machines**.
  * Creada la sección **3.3: Escalado de Máquinas Virtuales (Scaling Virtual Machines)**.
  * Análisis de los 4 ejes temáticos de certificación ACE:
    1. Autoscaling en Compute Engine y Managed Instance Groups (MIGs) basado en métricas de CPU, capacidad de balanceo de carga, métricas personalizadas de Cloud Monitoring y horarios.
    2. Sinergia indispensable con Cloud Load Balancing en Google VPC para distribuir tráfico uniformemente y excluir instancias degradadas mediante Health Checks.
    3. Contraste arquitectónico entre Scale-out (escalado horizontal recomendado para alta disponibilidad multi-zonal y cero downtime) y Scale-up (escalado vertical para analítica intensiva o bases de datos en memoria masivas como SAP HANA).
    4. Familias de máquinas (General-purpose, Compute-optimized, Memory-optimized, Accelerator-optimized) y gobernanza de cuotas de proyecto por zona geográfica (*zone-dependent quotas*).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-16` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (1:15), resumen analítico y 4 puntos clave de examen.
  * Incorporado el término técnico `Autoscaling (Compute Engine)` al glosario oficial del curso.
* **Pruebas y Verificación**:
  * Actualizada la suite de pruebas unitarias en [`tests/unit/coreInfrastructureCourse.test.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/coreInfrastructureCourse.test.ts) validando las 16 lecciones en video y los términos del glosario.
  * Ejecución exitosa de los 45 tests (unitarios y BDD).
* **Índice General**:
  * Enlazada la nueva transcripción en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-09] - Ingesta de Lección 15: Compute Engine (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-compute-engine.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-compute-engine.md) con la transcripción oficial limpia del video 689561 (YouTube 90pyGSKyPDQ).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Creada la sección 3.2: Compute Engine y Modelos de Cómputo IaaS.
  * Detalladas las 4 palancas de optimización de costos: facturación por segundo con mínimo de 1 minuto, Sustained-Use Discounts (automáticos >25% de uso mensual), Committed-Use Discounts (1 o 3 años, hasta 57%) y Spot VMs (hasta 90% de descuento).
  * Análisis comparativo de examen: Spot VMs vs Preemptible VMs (sin límite de 24 horas, revocación por demanda con 30 segundos de aviso).
  * Custom Machine Types (ajuste milimétrico de vCPU y memoria) y alto ancho de banda por defecto con Persistent Disks.
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-15` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (3:45), resumen y 5 puntos clave de examen.
* **Índice General**:
  * Actualizado [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) con el enlace correspondiente.

---

## [2026-11-09] - Ingesta de Lección 14: Virtual Private Cloud networking (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Apertura del Módulo 3**:
  * Iniciado el Módulo 3 de Google Cloud Fundamentals (*Virtual Machines and Networks in the Cloud* / *Máquinas Virtuales y Redes en la Nube*).
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-virtual-private-cloud-networking.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-virtual-private-cloud-networking.md) con la transcripción oficial limpia del video 689560 (YouTube SFRCZvJN650).
* **Síntesis Curricular (`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`)**:
  * Creada la sección 3.1: Arquitectura de redes VPC y subredes regionales.
  * Conceptos clave sintetizados: alcance global de las VPC, subredes regionales multi-zonal, comunicación entre zonas de la misma subred, expansión dinámica del bloque CIDR sin impacto en VMs activas, y reglas de cortafuegos con estado y rutas estáticas.
  * Tabla comparativa entre VPC Modo Automático vs Modo Personalizado (obligatorio en producción y examen ACE).
* **Catálogo y UI de Cursos**:
  * Añadida la lección `vid-60-14` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor embed, duración (2:17), resumen y 5 puntos clave de examen.
* **Índice General**:
  * Actualizado [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) con el enlace modular correspondiente.

---

## [2026-11-09] - Ingesta de Evaluación Oficial: Quiz Módulo 2 (Resources and Access in the Cloud)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-module-2-quiz.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-module-2-quiz.md) con las 3 preguntas oficiales de evaluación del Módulo 2 de Google Cloud Fundamentals.
* **Síntesis Curricular (Cierre del Módulo 2)**:
  * Pregunta 1: Ámbito de activación de servicios y APIs a nivel de Proyecto (*per-Project basis*).
  * Pregunta 2: Atributos del Project ID (globalmente único e inmutable, con capacidad de personalización por el cliente durante su creación).
  * Pregunta 3: Jerarquía de especificidad de roles en IAM desde el alcance más amplio al más granular (*Basic roles → Predefined roles → Custom roles*).
* **Catálogo y UI de Cursos**:
  * Añadidas las 3 preguntas (`c-m2-q1`, `c-m2-q2`, `c-m2-q3`) al cuestionario interactivo de `gcp-course-60` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts), elevando el banco a 16 preguntas.
* **Validación**:
  * Suites unitarias y BDD validadas al 100%.

---

## [2026-11-09] - Ingesta de Laboratorio 1: Getting Started with Cloud Marketplace (Lab 689558)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-google-cloud-fundamentals-getting-started-with-cloud-marketplace.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-google-cloud-fundamentals-getting-started-with-cloud-marketplace.md) a partir del contenido oficial de Skills Google (`labs/689558`).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Documentada la arquitectura completa de la pila LAMP: Linux (Ubuntu 26.04), Apache HTTP Server (puerto 80/443), MySQL y PHP/phpMyAdmin.
  * Habilitación de APIs requeridas: Compute Engine API e Infrastructure Manager API.
  * Flujo de tareas guiadas: navegación en Marketplace, aceptación de términos, selección de zona y tipo de máquina `e2-medium` (Serie E2), y validación web con `Site Url` / External IP.
  * Relevancia para el examen ACE: despliegues declarativos empaquetados mediante Marketplace y automatización con Infrastructure Manager.
* **Catálogo y UI de Cursos**:
  * Actualizado `core-lab-1` en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con metadatos oficiales (25 min, 5 créditos) y comandos de validación precisos.
* **Validación**:
  * Suites unitarias y BDD validadas al 100%.

---

## [2026-11-09] - Ingesta de Lección 13: Interacting with Google Cloud (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-interacting-with-google-cloud.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-interacting-with-google-cloud.md) a partir del video oficial de YouTube `lkchDTTMrZ8` y contenido de Skills Google (`video/689557`).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Las 4 vías de acceso e interacción con Google Cloud:
    1. Google Cloud Console (GUI web, buscador, terminal SSH en navegador, presupuestos).
    2. Google Cloud SDK y Cloud Shell (entorno Debian efímero con 5 GB persistentes en `$HOME`, preinstalado y pre-autenticado; CLI `gcloud` y `bq` en directorio `bin/`).
    3. APIs REST y Client Libraries (herramienta interactiva Google APIs Explorer; Cloud Client Libraries idiomáticas en 8 lenguajes).
    4. Google Cloud Mobile App (control operativo de VMs y Cloud SQL, reversión y traffic splitting en App Engine, y alertas de presupuesto/incidentes).
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 13 (`vid-60-13`) a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).
* **Validación**:
  * Suites unitarias y BDD actualizadas y validadas al 100%.

---

## [2026-11-09] - Ingesta de Lección 12: Cloud Identity (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-cloud-identity.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-identity.md) a partir del video oficial de YouTube `EZccX9nFaiI` y contenido de Skills Google (`video/689556`).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Centralización de identidades corporativas con Cloud Identity (IDaaS) gestionadas en Google Admin Console (`admin.google.com`).
  * Mitigación del riesgo de cuentas personales `@gmail.com`: resolución del problema de desaprovisionamiento y revocación inmediata de accesos al desvincular empleados.
  * Federación e interoperabilidad híbrida: sincronización desde Microsoft Active Directory o servidores LDAP locales con Google Cloud Directory Sync (GCDS) y Single Sign-On (SSO con SAML 2.0).
  * Comparativa de ediciones: Cloud Identity Free (directorio, SSO, MFA) vs Premium (gestión de dispositivos móviles MDM, borrado remoto, acceso contextual).
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 12 (`vid-60-12`) a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).
* **Validación**:
  * Suites unitarias y BDD actualizadas y validadas al 100%.

---

## [2026-11-09] - Ingesta de Lección 11: Service Accounts (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-service-accounts.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-service-accounts.md) a partir del video oficial de YouTube `xoo5NfLqePY` y contenido de Skills Google (`video/689555`).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Autenticación máquina a máquina para VMs y aplicaciones sin contraseñas interactivas ni intervención humana.
  * Doble naturaleza fundamental de las Service Accounts: como Identidad (principal al que se asignan roles en recursos) y simultáneamente como Recurso asegurable (con políticas IAM para gobernar quién puede usarlas o impersonarlas, e.g., `roles/iam.serviceAccountUser`).
  * Buenas prácticas de seguridad ACE: rotación automática de tokens efímeros mediante el servidor de metadatos de Compute Engine en lugar de descargar claves privadas JSON a disco.
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 11 (`vid-60-11`) a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).
* **Validación**:
  * Suites unitarias y BDD actualizadas y validadas al 100%.

---

## [2026-11-08] - Ingesta de Lección 10: Identity and Access Management - IAM (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-identity-and-access-management-iam.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-identity-and-access-management-iam.md) a partir del video oficial de YouTube `Di1T4RyO9yg` y el contenido de Skills Google (`video/689554`).
* **Actualización Lección 9**:
  * Actualizado identificador de YouTube oficial para la Lección 9 (`ecVv1L_TEo8`) en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) y en la videoteca de [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md).
* **Síntesis Curricular (Módulo 2: Recursos y Acceso en la Nube)**:
  * Tríada de IAM: Quién (Principals: usuarios, grupos, service accounts, dominios Cloud Identity) + Puede hacer qué (Roles: agrupaciones de permisos) + Sobre cuál recurso.
  * Reglas Deny: evaluación previa e indiscutible antes que las reglas Allow; propagación descendente por la jerarquía.
  * Taxonomía de roles: Básicos (Owner, Editor, Viewer, Billing Admin), Predefinidos (mantenidos por Google y aplicables a Org, Carpeta o Proyecto) y Personalizados (Custom Roles).
  * Regla crítica de examen ACE: Los roles personalizados **solo pueden aplicarse a nivel de Proyecto o de Organización; NUNCA a nivel de Carpeta**.
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 10 a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts) con reproductor responsive incrustado.
* **Validación**:
  * Actualizadas suites de pruebas unitarias y BDD pasando al 100%.

---

## [2026-11-08] - Ingesta de Lección 9: Google Cloud Resource Hierarchy (Course 60) & Evaluación Módulo 1

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**:
  * Ingestado [`wiki/raw/skills-core-module-1-quiz.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-module-1-quiz.md) con las 3 preguntas oficiales de evaluación del Módulo 1.
  * Ingestado [`wiki/raw/skills-core-google-cloud-resource-hierarchy.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-google-cloud-resource-hierarchy.md) a partir del contenido oficial de Skills Google (`video/689553`).
* **Síntesis Curricular (Apertura de Módulo 2: Recursos y Acceso en la Nube)**:
  * Jerarquía funcional de 4 niveles: Recursos → Proyectos → Carpetas (opcionales) → Nodo de Organización.
  * Atributos de proyecto: Project ID (globalmente único e inmutable), Project Name (mutable y legible) y Project Number (asignado por Google para agentes internos).
  * API Resource Manager: Gestión programática (REST/RPC) para creación, listado, actualización, eliminación y recuperación (*undelete*) de proyectos.
  * Gobernanza y herencia de políticas descendente: delegación por departamentos y entornos mediante carpetas, roles privilegiados a nivel de Organización (`roles/orgpolicy.policyAdmin`, `roles/resourcemanager.projectCreator`) y aprovisionamiento con Google Workspace o Cloud Identity.
* **Catálogo y UI de Cursos**:
  * Incorporada la Lección 9 a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).
  * Añadido soporte dinámico en [`src/components/CourseDetailView.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/components/CourseDetailView.tsx) para reproducción embebida o enlace directo a Skills Google.
* **Validación**:
  * Actualizada suite de pruebas unitarias en `tests/unit/coreInfrastructureCourse.test.ts`.

---

## [2026-11-08] - Ingesta de Lecciones 7 y 8: Open Source Ecosystems & Pricing/Billing (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generados [`wiki/raw/skills-core-open-source-ecosystems.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-open-source-ecosystems.md) (video `gYZGSrNffF8`) y [`wiki/raw/skills-core-pricing-and-billing.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-pricing-and-billing.md) (video `OTD61ZfnO28`).
* **Síntesis Curricular (Cierre de Módulo 1)**:
  * Ecosistemas abiertos e interoperabilidad multi-nube: Kubernetes/GKE, TensorFlow y Google Cloud Observability para prevenir vendor lock-in.
  * Estructura de precios: facturación por segundo, Sustained-Use Discounts (> 25% automático), Custom Machine Types y calculadora de costes.
  * Gobernanza financiera y operativa: presupuestos con alertas (regla ACE: no detienen recursos automáticamente) y cuotas de proyecto (Rate Quotas vs Allocation Quotas).
* **Catálogo y UI de Cursos**: Incorporadas las Lecciones 7 y 8 a la videoteca interactiva en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts), completando las 8 lecciones oficiales del Módulo 1.

---

## [2026-11-08] - Ingesta de Lecciones 5 y 6: Environmental Impact & Security (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generados [`wiki/raw/skills-core-environmental-impact.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-environmental-impact.md) (video `MwZiq-DRGFo`) y [`wiki/raw/skills-core-security.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-security.md) (video `BggWZl8qTzk`).
* **Síntesis Curricular**:
  * Sostenibilidad (ISO 14001, enfriamiento marino en Hamina, meta 2030 de energía 100% CFE libre de carbono y selección de regiones verdes para el examen ACE).
  * Arquitectura integral de seguridad en 6 capas progresivas: Hardware (chips Titan, Secure Boot), Despliegue (cifrado RPC inter-datacenter), Identidad (U2F, desafíos adaptativos), Almacenamiento (cifrado en reposo por defecto), Internet (Google Front End, mitigación DoS masiva) y Operaciones (Red Team, bug bounty, revisión de dos pares).
* **Catálogo y UI de Cursos**: Incorporadas las Lecciones 5 y 6 al reproductor de video en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).

---

## [2026-11-08] - Ingesta de Lección 4: The Google Cloud Network (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generado [`wiki/raw/skills-core-the-google-cloud-network.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-the-google-cloud-network.md) a partir del video oficial de YouTube `SDGJqKIE5yY` y la transcripción de la Lección 4.
* **Síntesis Curricular**: Documentada la infraestructura global de red de Google Cloud (7 ubicaciones mundiales, cables submarinos, 100+ PoPs, Regiones, Zonas independientes y arquitecturas multi-región con Cloud Spanner y Cloud Storage) en [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md).
* **Catálogo y UI de Cursos**: Incorporada la Lección 4 al reproductor interactivo en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).

---

## [2026-11-08] - Ingesta de Lección 3: IaaS and PaaS (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generado [`wiki/raw/skills-core-iaas-and-paas.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-iaas-and-paas.md) a partir del video oficial de YouTube `C7cb6kFhNmw` y la transcripción de la Lección 3.
* **Síntesis Curricular**: Mapeada la taxonomía completa de modelos de servicio cloud (IaaS: Compute Engine, PaaS: App Engine, Serverless: Cloud Run y Cloud Run Functions, SaaS: Google Workspace) con matriz comparativa de responsabilidad compartida y esquemas de facturación en [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md).
* **Catálogo y UI de Cursos**: Incorporada la Lección 3 al reproductor de video y lista de lecciones en [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).

---

## [2026-11-08] - Pestaña de Videoteca Interactiva y Lección 2 (Cloud Computing Overview)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta Raw Sanitizada**: Generado [`wiki/raw/skills-core-cloud-computing-overview.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-core-cloud-computing-overview.md) a partir del contenido de `skills.google/course_templates/60/video/689545` y el video oficial de YouTube `ph5hjgOAf40`.
* **Síntesis Curricular**: Mapeadas las 5 características esenciales de computación en la nube según el NIST y las 3 olas tecnológicas de infraestructura en [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md).
* **Modelado de Tipos TypeScript**: Definida la interfaz [`CourseLessonVideo`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/types/index.ts) con soporte para identificadores de YouTube, duración, resúmenes y puntos clave ACE.
* **Componente Interactivo `CourseDetailView`**: Añadida la pestaña reactiva **Videos & Lecciones** con reproductor embebido responsivo de YouTube (`youtube-nocookie.com`), notas pedagógicas y selector de lecciones.
* **Catálogo de Cursos**: Incorporadas las lecciones 1 y 2 en el dataset de [`src/data/coursesData.ts`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/data/coursesData.ts).

---

## [2026-11-08] - Ingestor Automatizado de Google Skills y Mapeo de Objetivos Clave

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Script de Ingestión Modular (`scripts/ingest-skills-content.mjs`)**: Creación de un script en Node.js ESM para sanitizar el volcado del portapapeles proveniente de `skills.google`. Filtra de forma determinista la interfaz de usuario (menús de navegación, advertencias de plataforma, contadores de puntos, timestamps de video tipo `00:00`) y extrae metadatos (URLs de YouTube, enlaces de Skills, objetivos de aprendizaje).
* **Comando npm**: Adición del script `npm run ingest:skills` en `package.json` para facilitar la ingesta repetible de transcripciones y lecturas hacia `wiki/raw/`.
* **Insumo Raw Sanitizado**: Creación de `wiki/raw/skills-core-course-introduction.md` conteniendo la transcripción limpia y los 7 objetivos clave de aprendizaje del curso ID 60 (incluyendo Gemini en Google Cloud y Prompt Engineering).
* **Enlace en Índice**: Registro del nuevo insumo inmutable en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).

---

## [2026-11-06] - Acreditación del Autor Lenin Meza, Página About y Footer Unificado

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Análisis de Proyectos Previos**: Inspección en Codebase Memory (`mach-playbook`, `merolhack.github.io`, `cadensa-web`) para estandarizar la biografía, enlaces y reconocimientos de autoría de Lenin Meza (`merolhack`).
* **Componente `Footer` Unificado**: Creación de [`src/components/Footer.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/components/Footer.tsx) con soporte para variantes clara y oscura (`light` / `dark`), enlace directo al portafolio de GitHub Pages (`https://merolhack.github.io/`), LinkedIn oficial, MACH Playbook, repositorio de GitHub y aviso de exención de responsabilidad educativa. Integrado en todas las páginas (`/`, `/courses/`, `/courses/[slug]/` y `/about/`).
* **Página Institucional About**: Despliegue de [`src/app/about/page.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/app/about/page.tsx) exponiendo la misión técnica del proyecto, pilares pedagógicos (Hands-On First, emulación gcloud, detección de trampas de examen), perfil y trayectoria de Lenin Meza (17+ años en arquitectura distribuida, autor del *Playbook de Arquitectura MACH* Amazon KDP 2026) y enlaces a redes.
* **Navegación y Sitemap**: Adición de accesos a `/about/` en [`src/components/Navbar.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/components/Navbar.tsx) y en el catálogo [`public/sitemap.xml`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/public/sitemap.xml).
* **Suite de Pruebas Unitarias y BDD**: Creación de [`tests/bdd/author-and-about.feature.test.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/bdd/author-and-about.feature.test.tsx) y [`tests/unit/footerAndAbout.test.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/unit/footerAndAbout.test.tsx), alcanzando 40/40 pruebas aprobadas (100% de éxito).

---

## [2026-11-06] - Regla de Evaluación Completa Obligatoria en Quizzes de Cursos

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Regla General de Examen**: Implementación de validación estricta en [`src/components/CourseDetailView.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/src/components/CourseDetailView.tsx) impidiendo calificar el examen si existen preguntas sin responder.
* **Interfaz de Validación**: Despliegue de banner de alerta explicativo con lista de preguntas pendientes (`#N`), indicador de progreso de respuestas (`X / Y`) y resaltado de tarjeta con etiqueta `Respuesta requerida`.
* **Ampliación de Pruebas BDD**: Actualización de escenarios en [`tests/bdd/courses-load-balancing.feature.test.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/bdd/courses-load-balancing.feature.test.tsx) y [`tests/bdd/core-infrastructure-course.feature.test.tsx`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/tests/bdd/core-infrastructure-course.feature.test.tsx) verificando el bloqueo ante cuestionarios incompletos y la calificación tras completar el 100% de las respuestas.
* **Aprobación de Suite**: 30 pruebas unitarias y BDD aprobadas al 100%.

---

## [2026-11-06] - Ingesta de Curso: Google Cloud Fundamentals: Core Infrastructure (Course 60)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta en Bruto**: Registro de `wiki/raw/gcp-fundamentals-core-infrastructure-study-guide.md` como insumo inmutable sobre fundamentos de infraestructura, jerarquía de recursos, IAM, redes VPC y cómputo serverless.
* **Síntesis Modular del Curso**: Creación de [`wiki/courses/google-cloud-fundamentals-core-infrastructure.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/google-cloud-fundamentals-core-infrastructure.md) estructurando los 6 módulos teóricos y los 4 laboratorios prácticos (Marketplace LAMP, VPC Networking, Cloud Storage/SQL y Cloud Run).
* **Actualización del Catálogo Central**: Enlace del nuevo curso e insumo bruto en [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).
* **Validación de Formato**: Cumplimiento del estándar Cero LaTeX / MathJax en todas las secciones.

---

## [2026-11-05] - Ingesta de Curso: Implementing Cloud Load Balancing for Compute Engine (Course 648)

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* **Ingesta en Bruto**: Registro de `wiki/raw/gcp-ace-load-balancing-study-guide.md` como fuente inmutable sobre balanceo de carga L4/L7 en Compute Engine.
* **Síntesis de Curso**: Creación del módulo sintetizado [`wiki/courses/implementing-cloud-load-balancing.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/courses/implementing-cloud-load-balancing.md) con detalles de los Laboratorios 1 a 4 (Target Pools, MIGs, subred Proxy-Only, Challenge Lab 613025).
* **Hoja de Referencia Rápida**: Creación de [`wiki/cheatsheets/load-balancing-decision-tree.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/cheatsheets/load-balancing-decision-tree.md) con el árbol de decisión L4 vs L7, IPs de health check (`130.211.0.0/22`, `35.191.0.0/16`) y reglas clave de examen.
* **Actualización del Catálogo**: Incorporación de los nuevos módulos en el índice principal [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md).
* **Garantía de Estándar**: Verificación rigurosa de Cero LaTeX / MathJax.

---

## [2026-11-05] - Inicialización y Estructuración Modular de la Wiki

### Agente Responsable:
* Antigravity AI Orchestrator

### Acciones Realizadas:
* Creación de la estructura modular de directorios en `wiki/`:
  * `wiki/raw/`: Directorio inmutable append-only para fuentes e insumos en bruto.
  * `wiki/domains/`: Síntesis conceptual de los 4 dominios del examen ACE v4.0.
  * `wiki/components/`: Especificación funcional de los 4 componentes interactivos de la aplicación.
  * `wiki/cheatsheets/`: Árboles de decisión (Compute & Storage), reglas de IAM y comandos de `gcloud`.
  * `wiki/architecture/`: Visión del sistema y esquemas TypeScript de datos.
  * `wiki/log/`: Bitácora histórica de mantenimiento.
* Generación del índice central [`wiki/index.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/index.md) con mapas de navegación bidireccionales.
* Creación de la propiedad GA4 `p562558808` con Measurement ID `G-9GESMZMDPB` bajo la cuenta `a389930119` (Github Pages).
* Vinculación oficial entre Google Analytics y la propiedad de Google Search Console `https://mach-playbook.github.io/gcp-ace-interactive-study-guide/`.
* Configuración de validación para Bing Webmaster Tools (`856757614FFC2C5582FBCB81B1B4E4CA`), sitemaps y robots.txt.
* Creación del documento [`wiki/architecture/telemetry-and-indexing.md`](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/architecture/telemetry-and-indexing.md).
* Cumplimiento estricto de la directriz de Cero LaTeX/MathJax en todos los documentos generados.


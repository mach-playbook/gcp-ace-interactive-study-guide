# 📘 Curso: Google Cloud Fundamentals: Core Infrastructure (Course ID: 60)

Este documento sintetiza de forma modular los fundamentos conceptuales, arquitecturas de referencia, flujos de comandos de la CLI `gcloud` y directrices para el examen Google Cloud Associate Cloud Engineer (ACE), derivados del curso oficial de Google Cloud Skills.

---

## 🧭 1. Resumen Curricular y Pilares Técnicos

El curso **Google Cloud Fundamentals: Core Infrastructure** establece los cimientos necesarios para aprovisionar, gobernar y operar recursos en Google Cloud Platform (GCP). Compara los paradigmas de computación, almacenamiento, redes y gestión de identidades, alineándose con los dominios 1, 2 y 4 de la certificación ACE.

### 🎯 7 Objetivos Oficiales de Aprendizaje (Official Learning Objectives)
1. **Propósito y Valor de Google Cloud**: Identificar el valor estratégico, modelo de responsabilidad compartida y arquitectura global de los productos de Google Cloud.
2. **Organización y Control de Infraestructura**: Definir la jerarquía de recursos (Organización → Carpetas → Proyectos) y el control de accesos con IAM y Service Accounts.
3. **Aprovisionamiento de Infraestructura Básica**: Explicar la creación y administración de máquinas virtuales en Compute Engine y redes virtuales VPC en modo personalizado.
4. **Opciones de Almacenamiento en la Nube**: Evaluar y seleccionar el motor adecuado entre Cloud Storage, Cloud SQL, Cloud Spanner, Firestore, Bigtable y BigQuery.
5. **Contenedores y Kubernetes**: Comprender el propósito, arquitectura y valor de Google Kubernetes Engine (GKE Autopilot y Standard).
6. **Arquitecturas Serverless**: Identificar casos de uso idóneos para cómputo sin servidor mediante Cloud Run y Cloud Functions.
7. **Gemini e Ingeniería de Prompts en GCP**: Combinar el conocimiento de Google Cloud con técnicas de prompt engineering para potenciar la asistencia operativa de Gemini en Cloud Console y Cloud Shell.

### 📺 Videoteca Oficial del Curso (Skills Google Videos)

| Lección | Módulo | Enlace Oficial YouTube | Conceptos Clave & Enfoque ACE |
| :--- | :--- | :--- | :--- |
| **Lección 1: Course Introduction** | Introducción | [Ver en YouTube (xVmam01f4Fw)](https://www.youtube.com/watch?v=xVmam01f4Fw) | 5 pilares de Google Cloud (compute, storage, big data, ML, app services), los 7 objetivos clave de certificación y asistencia de Gemini. |
| **Lección 2: Cloud Computing Overview** | M1: Introducción a GCP | [Ver en YouTube (ph5hjgOAf40)](https://www.youtube.com/watch?v=ph5hjgOAf40) | Definición NIST (5 características esenciales) y las 3 olas tecnológicas (Colocation → Virtualización → Tercera Ola elástica y de contenedores de Google). |
| **Lección 3: IaaS and PaaS** | M1: Introducción a GCP | [Ver en YouTube (C7cb6kFhNmw)](https://www.youtube.com/watch?v=C7cb6kFhNmw) | Comparativa técnica de modelos cloud: IaaS (Compute Engine), PaaS (App Engine), Serverless (Cloud Run, Cloud Run Functions) y SaaS (Google Workspace). Diferencias en modelos de cobro y foco operativo. |
| **Lección 4: The Google Cloud Network** | M1: Introducción a GCP | [Ver en YouTube (SDGJqKIE5yY)](https://www.youtube.com/watch?v=SDGJqKIE5yY) | Red física global privada de Google, 100+ puntos de presencia (PoPs / nodos de caché), 7 ubicaciones continentales, regiones geográficas, zonas de fallo y arquitecturas multi-región. |
| **Lección 5: Environmental Impact** | M1: Introducción a GCP | [Ver en YouTube (MwZiq-DRGFo)](https://www.youtube.com/watch?v=MwZiq-DRGFo) | Eficiencia energética de centros de datos (~2% consumo eléctrico mundial), certificación ISO 14001, refrigeración marina en Hamina y objetivo de energía 100% libre de carbono (CFE) para 2030. |
| **Lección 6: Security** | M1: Introducción a GCP | [Ver en YouTube (BggWZl8qTzk)](https://www.youtube.com/watch?v=BggWZl8qTzk) | Arquitectura de seguridad en 6 capas progresivas: hardware (Titan, Secure Boot), despliegue de servicios (RPC cifrado), identidad (U2F, context-aware), almacenamiento (cifrado en reposo por defecto), comunicación por internet (Google Front End, protección DoS) y seguridad operacional (Red Team, bug bounty, revisión de dos pares). |
| **Lección 7: Open Source Ecosystems** | M1: Introducción a GCP | [Ver en YouTube (gYZGSrNffF8)](https://www.youtube.com/watch?v=gYZGSrNffF8) | Prevención de Vendor Lock-in, estándares abiertos de Google (Kubernetes, TensorFlow) e interoperabilidad híbrida/multi-cloud con Google Cloud Observability. |
| **Lección 8: Pricing and Billing** | M1: Introducción a GCP | [Ver en YouTube (OTD61ZfnO28)](https://www.youtube.com/watch?v=OTD61ZfnO28) | Facturación por segundo (Compute Engine, GKE, Dataproc, App Engine Flex), Sustained-Use Discounts (> 25% automático), Custom Machine Types, presupuestos con alertas y cuotas de proyecto (Rate vs Allocation). |
| **Lección 9: Google Cloud Resource Hierarchy** | M2: Recursos y Acceso | [Ver en YouTube (ecVv1L_TEo8)](https://www.youtube.com/watch?v=ecVv1L_TEo8) | Estructura de 4 niveles (Recursos, Proyectos, Carpetas, Organización), herencia descendente de políticas, atributos de proyecto (ID inmutable vs Nombre mutable vs Número), Resource Manager API, roles especiales (`Organization Policy Administrator`, `Project Creator`) y aprovisionamiento con Workspace o Cloud Identity. |
| **Lección 10: Identity and Access Management (IAM)** | M2: Recursos y Acceso | [Ver en YouTube (Di1T4RyO9yg)](https://www.youtube.com/watch?v=Di1T4RyO9yg) | Control de acceso con IAM (Tríada: Quién/Principal + Puede hacer qué/Rol + Sobre qué recurso), políticas Deny (evaluadas antes que Allow), roles básicos vs predefinidos vs personalizados (principio de menor privilegio y restricción crítica ACE: solo a nivel proyecto u organización, ¡NUNCA a nivel de carpeta!). |
| **Lección 11: Service Accounts** | M2: Recursos y Acceso | [Ver en YouTube (xoo5NfLqePY)](https://www.youtube.com/watch?v=xoo5NfLqePY) | Autenticación máquina a máquina para VMs y aplicaciones, llaves criptográficas vs contraseñas, y la doble naturaleza de las Service Accounts (Identidad como principal vs Recurso asegurable con políticas IAM propias como `serviceAccountUser`). |
| **Lección 12: Cloud Identity** | M2: Recursos y Acceso | [Ver en YouTube (EZccX9nFaiI)](https://www.youtube.com/watch?v=EZccX9nFaiI) | Identidades centralizadas (IDaaS), Google Admin Console, federación con Active Directory/LDAP (GCDS y SSO SAML 2.0), desaprovisionamiento inmediato de usuarios al salir de la empresa y diferencias Free vs Premium (MDM). |
| **Lección 13: Interacting with Google Cloud** | M2: Recursos y Acceso | [Ver en YouTube (lkchDTTMrZ8)](https://www.youtube.com/watch?v=lkchDTTMrZ8) | Las 4 vías de interacción: Cloud Console (GUI web, SSH browser, presupuestos), Cloud SDK & Cloud Shell (Debian, 5 GB $HOME persistente, gcloud y bq en bin/), APIs & Client Libraries (APIs Explorer, 8 lenguajes) y Google Cloud Mobile App (control de VMs, SQL, App Engine y alertas). |
| **Lección 14: Virtual Private Cloud networking** | M3: Redes y VMs | [Ver en YouTube (SFRCZvJN650)](https://www.youtube.com/watch?v=SFRCZvJN650) | Alcance global de las redes VPC, subredes regionales multi-zonal, comunicación entre zonas en la misma subred, expansión de rangos CIDR sin reinicio ni afectación a VMs, y segmentación con firewall rules y static routes. |
| **Lección 15: Compute Engine** | M3: Redes y VMs | [Ver en YouTube (90pyGSKyPDQ)](https://www.youtube.com/watch?v=90pyGSKyPDQ) | IaaS en GCP, configuración de VMs (SO Linux/Windows, custom images, Cloud Marketplace), facturación por segundo (mínimo 1 min), Sustained-Use Discounts (> 25%), Committed-Use Discounts (1 o 3 años, hasta 57%), Spot VMs (hasta 90% ahorro, sin límite de 24h, revocación por demanda) y Custom Machine Types. |
| **Lección 16: Scaling virtual machines** | M3: Redes y VMs | [Ver en YouTube (YQK8u563me4)](https://www.youtube.com/watch?v=YQK8u563me4) | Autoscaling de VMs basado en métricas de carga, Scale-out vs Scale-up, familias de máquinas, límites de cuota por zona e integración indispensable con Cloud Load Balancing. |
| **Lección 17: Important VPC compatibilities** | M3: Redes y VMs | [Ver en YouTube (UtNlJbm8s2Q)](https://www.youtube.com/watch?v=UtNlJbm8s2Q) | Tablas de enrutamiento nativas sin routers, firewall global distribuido con Network Tags, interconexión privada mediante VPC Peering y gobernanza corporativa centralizada con Shared VPC. |
| **Lección 18: Cloud Load Balancing** | M3: Redes y VMs | [Ver en YouTube (HWJQ3LNagXc)](https://www.youtube.com/watch?v=HWJQ3LNagXc) | Servicio administrado distribuido (sin pre-warming), failover multi-región, Application Load Balancers (L7 HTTP/HTTPS reverse proxy) y Network Load Balancers (L4 Proxy vs Passthrough con preservación de IP y DSR). |
| **Lección 19: Cloud DNS and Cloud CDN** | M3: Redes y VMs | [Ver en YouTube (TYB1cur47mk)](https://www.youtube.com/watch?v=TYB1cur47mk) | Cloud DNS autoritativo gestionado (Anycast SLA 100%, zonas públicas/privadas), Cloud CDN con Edge Caches para baja latencia y ahorro de egress, integración con ALB y CDN Interconnect. |
| **Lección 20: Connecting networks to Google VPC** | M3: Redes y VMs | [Ver en YouTube (g24UStCvpQg)](https://www.youtube.com/watch?v=g24UStCvpQg) | Conectividad híbrida y multi-cloud: Cloud VPN + Cloud Router (BGP), Direct/Carrier Peering (IPs públicas sin SLA), Dedicated vs Partner Interconnect (privado RFC 1918, SLA 99.99%) y Cross-Cloud Interconnect. |
| **Lección 21: Google Cloud storage options** | M4: Almacenamiento | [Ver en YouTube (8Dn-RAP7fzA)](https://www.youtube.com/watch?v=8Dn-RAP7fzA) | Clasificación de soluciones de almacenamiento por tipo de dato (estructurado, no estructurado, relacional, transaccional, analítico), los 5 servicios núcleo y persistencia políglota. |
| **Lección 22: Cloud Storage** | M4: Almacenamiento | [Ver en YouTube (pLMkOa4FbwI)](https://www.youtube.com/watch?v=pLMkOa4FbwI) | Almacenamiento de objetos (BLOBs), buckets con nombres únicos a escala global y ubicación geográfica, inmutabilidad de objetos, Object Versioning, control de acceso IAM vs ACLs y Object Lifecycle Management. |
| **Lección 23: Cloud Storage: Storage classes and data transfer** | M4: Almacenamiento | [Ver en YouTube (A5a8sPL6PjY)](https://www.youtube.com/watch?v=A5a8sPL6PjY) | Las 4 clases de almacenamiento (Standard, Nearline, Coldline, Archive), baja latencia universal en ms, optimización con Autoclass, cifrado en reposo/tránsito y mecanismos de transferencia (gcloud, Storage Transfer Service, Transfer Appliance). |
| **Lección 24: Cloud SQL** | M4: Almacenamiento | [Ver en YouTube (yE-k0odGRzk)](https://www.youtube.com/watch?v=yE-k0odGRzk) | Bases de datos relacionales gestionadas (MySQL, PostgreSQL, SQL Server), límites de escala (128 vCPUs, 864 GB RAM, 64 TB), replicación y HA, respaldos automáticos incluidos, cifrado integral y conectividad segura. |
| **Lección 25: Spanner** | M4: Almacenamiento | [Ver en YouTube (uxmBbmv7Av0)](https://www.youtube.com/watch?v=uxmBbmv7Av0) | Base de datos relacional distribuida globalmente, consistencia externa fuerte (TrueTime API), escalado horizontal masivo (decenas de miles de IOPS), transacciones ACID multi-región y disponibilidad hasta 99.999%. |
| **Lección 26: Firestore** | M4: Almacenamiento | [Ver en YouTube (Q1kSFl1LYMc)](https://www.youtube.com/watch?v=Q1kSFl1LYMc) | Base de datos de documentos NoSQL serverless para desarrollo web/móvil, modelo de colecciones y documentos, indexación automática (rendimiento proporcional a resultados), listeners en tiempo real, soporte offline y transacciones ACID. |
| **Lección 27: Bigtable** | M4: Almacenamiento | [Ver en YouTube (bfztO0_4fhw)](https://www.youtube.com/watch?v=bfztO0_4fhw) | Base de datos NoSQL de columnas anchas para Big Data (> 1 TB), latencia predecible sub-10ms, alto rendimiento, series temporales/IoT, compatibilidad con API Apache HBase y streaming con Dataflow/Spark. |
| **Lección 28: Comparing storage options** | M4: Almacenamiento | [Ver en YouTube (jAPJ_aVxCbQ)](https://www.youtube.com/watch?v=jAPJ_aVxCbQ) | Matriz comparativa de almacenamiento: Cloud Storage (blobs inmutables > 10 MB, máx 5 TB), Cloud SQL (OLTP < 64 TB) vs Spanner (OLTP horizontal petabytes), Firestore (NoSQL móvil/web < 1 MB por doc), Bigtable (NoSQL analítico petabytes) y rol analítico de BigQuery. |
| **Lección 29: Introduction to containers** | M5: Contenedores | [Ver en YouTube (fkyu-gVr4IU)](https://www.youtube.com/watch?v=fkyu-gVr4IU) | Virtualización del SO vs hardware (VMs), empaquetado de dependencias, arranque en segundos, portabilidad extrema (laptop a la nube), densidad de microservicios y GKE como puente entre IaaS y PaaS. |
| **Lección 30: Kubernetes** | M5: Contenedores | [Ver en YouTube (4NTyB0eEB_A)](https://www.youtube.com/watch?v=4NTyB0eEB_A) | Plataforma open source de orquestación, arquitectura de clúster (Control Plane y Nodos Compute Engine), Pods (IP compartida y sidecars), Deployments (réplicas y auto-reparación), Services (IP fija y Cloud NLB automático), enfoque declarativo (`kubectl apply`) y Rolling Updates sin inactividad. |
| **Lección 31: Google Kubernetes Engine** | M5: Contenedores | [Ver en YouTube (HMcFwcqNjOY)](https://www.youtube.com/watch?v=HMcFwcqNjOY) | Servicio gestionado de Kubernetes en GCP, Control Plane administrado, comparación de modos Autopilot (recomendado, pago por pod, seguridad y gestión desatendida) vs Standard (control de nodos), Node pools, Cluster Autoscaler, Auto-upgrades, Auto-repair y observabilidad nativa. |

---

### 🌐 1.1 Definición Formal de Cloud Computing (NIST) y Evolución Histórica

De acuerdo con el National Institute of Standards and Technology (NIST), el cloud computing se define mediante **5 características esenciales e interdependientes**:

1. **Autoservicio Bajo Demanda (On-demand Self-service)**: El cliente aprovisiona capacidad de cómputo, almacenamiento y red a través de interfaces web o APIs sin requerir interacción humana con el proveedor.
2. **Acceso Amplio a la Red (Broad Network Access)**: Los recursos están disponibles a través de la red global y se accede a ellos mediante mecanismos estándar y plataformas heterogéneas (laptops, servidores, dispositivos móviles).
3. **Agrupación de Recursos Comunes (Resource Pooling)**: Los recursos del proveedor se agrupan para dar servicio a múltiples consumidores mediante un modelo multi-inquilino (*multi-tenant*), asignando y reasignando dinámicamente recursos físicos y virtuales según la demanda, sin que el usuario necesite conocer su ubicación física exacta.
4. **Elasticidad Rápida (Rapid Elasticity)**: Las capacidades se pueden aprovisionar y liberar de manera elástica y en algunos casos automática, escalando horizontalmente hacia afuera o hacia adentro en respuesta a la carga.
5. **Servicio Medido (Measured Service / Pay-as-you-go)**: Los sistemas controlan y optimizan automáticamente el uso de recursos aprovechando una capacidad de medición adecuada al tipo de servicio (horas de CPU, almacenamiento utilizado, ancho de banda, peticiones procesadas).

#### Las 3 Olas de la Infraestructura en la Nube
* **Primera Ola (Coubicación / Colocation)**: Renta de espacio físico en racks, energía y refrigeración dentro de un datacenter externo, eliminando la inversión en bienes raíces pero manteniendo hardware propio.
* **Segunda Ola (Centros de Datos Virtualizados)**: Abstracción de servidores, redes y almacenamiento en máquinas virtuales (VMs). Aumenta la densidad y flexibilidad, pero la empresa sigue operando y configurando manualmente las capas de infraestructura.
* **Tercera Ola (Nube Elástica de Google Cloud)**: Arquitectura completamente automatizada basada en contenedores y servicios gestionados de datos. La infraestructura se autogestiona y autoescala bajo demanda, permitiendo a las empresas centrarse en el software y en la explotación de datos de alta calidad.

---

### ⚙️ 1.2 Taxonomía de Modelos de Servicio Cloud (IaaS vs PaaS vs Serverless vs SaaS)

| Modelo | Ejemplos en Google Cloud | Responsabilidad del Cliente | Responsabilidad de Google | Modelo de Cobro |
| :--- | :--- | :--- | :--- | :--- |
| **IaaS (Infrastructure as a Service)** | Compute Engine, VPC, Persistent Disks | Sistema operativo, parches de seguridad, runtime de aplicación, código, firewall | Infraestructura física, virtualización, red física de fibra óptica | Cobro por **recursos asignados con antelación** (CPU/RAM aprovisionadas por hora/segundo) |
| **PaaS (Platform as a Service)** | App Engine (Standard / Flexible) | Código de la aplicación, configuración de librerías y dependencias | Sistema operativo subyacente, aprovisionamiento de VMs, parches del SO, escalado de instancias | Cobro por **recursos efectivamente utilizados** por la aplicación |
| **Serverless / CaaS / FaaS** | Cloud Run (contenedores Knative), Cloud Run Functions | Contenedor o función de código (lógica de negocio pura) | Toda la gestión de servidores, orquestación, balanceo, escalado a cero (0 réplicas) | Cobro estrictamente por **tiempo de ejecución de peticiones** (milisegundos) |
| **SaaS (Software as a Service)** | Google Workspace (Gmail, Google Docs, Google Drive) | Configuración de usuarios y datos de negocio | Pila completa de software, infraestructura, actualizaciones, seguridad y alta disponibilidad | Cobro por suscripción o licencia de usuario |

---

### 🌐 1.3 Infraestructura Global y Topología de Red de Google Cloud

La red física de Google Cloud es una de las redes troncales de fibra óptica y cables submarinos privados más extensas y veloces del mundo. Su diseño busca maximizar el rendimiento (*throughput*), minimizar la latencia de tránsito y aislar el tráfico de los clientes fuera de la Internet pública siempre que sea posible.

#### Componentes Clave de la Red y Topología Geográfica

1. **7 Grandes Ubicaciones Geográficas**:
   * Norteamérica, Sudamérica, Europa, África, Medio Oriente, Asia y Australia.
2. **Nodos de Caché de Contenido y Puntos de Presencia (PoPs / Edge Locations)**:
   * Más de 100 ubicaciones perimetrales repartidas en todo el mundo donde se almacena en caché contenido de alta demanda (Cloud CDN) y se termina la conexión SSL/TCP cerca del usuario mediante direcciones Anycast IP.
3. **Regiones (Geographic Regions)**:
   * Áreas geográficas independientes (ej. `us-central1` en Iowa, `europe-west2` en Londres).
   * Almacenan recursos regionales y proporcionan aislamiento total ante incidentes climáticos o fallos eléctricos a gran escala.
4. **Zonas (Availability Zones)**:
   * Dominios de implementación y de tolerancia a fallos independientes dentro de una misma región.
   * Cada región cuenta con al menos 3 zonas (ej. `europe-west2-a`, `europe-west2-b`, `europe-west2-c`).
   * Están conectadas entre sí mediante enlaces de fibra óptica dedicados de altísimo ancho de banda y latencia menor a 1 milisegundo.
5. **Configuraciones Multi-Región**:
   * Servicios como **Cloud Spanner** y **Cloud Storage Multi-Regional** permiten replicar datos automáticamente a través de múltiples zonas distribuidas en diferentes regiones geográficas (ej. Estados Unidos, Europa o Asia).
   * Beneficio crítico para el examen ACE: Máxima disponibilidad (hasta 99.999%), durabilidad extrema y lecturas con ultra-baja latencia desde múltiples puntos cercanos a los usuarios.

---

### 🌱 1.4 Sostenibilidad e Impacto Ambiental en Google Cloud

Los centros de datos a nivel global consumen aproximadamente el 2% de la electricidad mundial. Google Cloud implementa políticas e innovaciones de ingeniería pioneras para mitigar este impacto y ayudar a sus clientes a alcanzar sus propios objetivos de sostenibilidad:

1. **Certificación ISO 14001**:
   * Google fue la primera empresa tecnológica en certificar sus centros de datos bajo el estándar internacional ISO 14001, que establece marcos rigurosos para optimizar la eficiencia de recursos y reducir desechos.
2. **Innovación en Enfriamiento (Caso Hamina, Finlandia)**:
   * Instalación pionera a nivel mundial que utiliza agua de mar cruda del Golfo de Finlandia para enfriar los servidores, reduciendo drásticamente el consumo de energía eléctrica y eliminando el uso de refrigerantes dañinos.
3. **Trayectoria Histórica y Metas Climáticas**:
   * *Década 1:* Primera gran corporación en ser neutra en emisiones de carbono (Carbon Neutral).
   * *Década 2:* 100% de la energía consumida igualada anualmente con compras de energía renovable.
   * *Meta 2030:* Operar con **energía 100% libre de carbono (Carbon-Free Energy - CFE)** en todas sus regiones, las 24 horas del día, los 7 días de la semana, los 365 días del año.
4. **Criterio de Arquitectura para el Examen ACE**:
   * Al planificar la ubicación de cargas de trabajo (*Domain 2: Solution Planning*), los ingenieros de Google Cloud deben considerar la puntuación **CFE%** (porcentaje de energía libre de carbono por hora) visible en la consola y selector de regiones, equilibrando la latencia, costo y cumplimiento ambiental.

---

### 🛡️ 1.5 Arquitectura de Seguridad en Capas Progresivas (Defense-in-Depth)

La seguridad en Google Cloud no es una capa superficial perimetral, sino un diseño integral en **6 capas progresivas** que protegen los datos de los clientes desde el silicio físico hasta los procesos operativos humanos:

1. **Capa de Infraestructura de Hardware**:
   * *Procedencia y diseño propio:* Placas base de servidores y equipos de red diseñados a medida por Google sin componentes innecesarios.
   * *Chips de seguridad dedicados (Titan):* Microchips criptográficos integrados que validan la raíz de confianza (*Root of Trust*).
   * *Secure Boot Stack:* Verificación estricta de firmas criptográficas sobre el BIOS, bootloader, kernel del SO y la imagen base antes de permitir el arranque del servidor.
   * *Seguridad física en instalaciones:* Centros de datos propios con seguridad biométrica en múltiples anillos perimetrales y acceso restringido a menos del 1% de los empleados de Google.
2. **Capa de Despliegue de Servicios**:
   * *Cifrado de comunicación entre servicios:* Todas las llamadas a procedimiento remoto (RPC) entre centros de datos se cifran automáticamente en tránsito.
   * *Aceleradores criptográficos por hardware:* Expansión del cifrado por defecto al tráfico interno intra-datacenter sin degradar el rendimiento.
3. **Capa de Identidad de Usuario**:
   * *Servicio central de identidad:* Desafíos inteligentes adaptativos basados en factores de riesgo (ubicación atípica, dispositivo nuevo).
   * *Autenticación multifactor fuerte (U2F):* Soporte obligatorio de llaves de seguridad físicas basadas en el estándar abierto FIDO / U2F.
4. **Capa de Servicios de Almacenamiento**:
   * *Cifrado en reposo por defecto (Encryption at Rest):* Todos los datos almacenados en Cloud Storage, discos persistentes y bases de datos se fragmentan y cifran automáticamente con algoritmo AES-256 antes de escribirse a disco físico.
   * *Cifrado por hardware:* Los discos duros y unidades de estado sólido (SSD) en los centros de datos incorporan controladores con cifrado por hardware integrado.
5. **Capa de Comunicación con Internet**:
   * *Google Front End (GFE):* Servicio perimetral que termina las conexiones TLS en el borde de la red con certificados X.509 y soporte de *Perfect Forward Secrecy*.
   * *Protección masiva contra DoS/DDoS:* La escala planetaria de la red de Google absorbe volúmenes masivos de tráfico malicioso junto con sistemas multicapa de mitigación automática.
6. **Capa de Seguridad Operacional**:
   * *Detección de intrusiones con Machine Learning:* Monitoreo automatizado continuo y ejercicios de simulación de ataques dirigidos por el equipo rojo (*Red Team*).
   * *Reducción del riesgo interno:* Principio de mínimo privilegio extremo para administradores de Google y auditoría de accesos.
   * *Uso de U2F para empleados:* Protección del 100% de los empleados de Google contra ataques de phishing mediante llaves de seguridad físicas.
   * *Prácticas estrictas de desarrollo de software:* Control centralizado de código fuente, revisión obligatoria de código por dos pares (*two-party review*), librerías que previenen errores de memoria/inyección y el programa *Vulnerability Rewards Program* (Bug Bounty).

---

### 🔓 1.6 Ecosistemas de Código Abierto e Interoperabilidad Multi-Cloud

Para mitigar el temor al bloqueo de proveedor (*Vendor Lock-in*), Google Cloud basa su estrategia en publicar tecnologías clave bajo licencias de código abierto, asegurando la portabilidad de aplicaciones entre diferentes nubes o entornos locales:

* **Kubernetes & Google Kubernetes Engine (GKE)**: Orquestador estándar de contenedores creado por Google y donado a la Cloud Native Computing Foundation (CNCF). Permite ejecutar microservicios de manera idéntica en GCP, otras nubes públicas o centros de datos privados on-premises.
* **TensorFlow**: Librería de código abierto para Machine Learning y Deep Learning desarrollada por Google, permitiendo entrenar modelos en GCP y desplegarlos en cualquier otra plataforma o dispositivo edge.
* **Google Cloud Observability**: Permite supervisar y rastrear métricas, logs y trazas de cargas de trabajo híbridas y multi-proveedor (Google Cloud, AWS y servidores físicos).

---

### 💳 1.7 Estructura de Precios, Facturación, Presupuestos y Cuotas en Google Cloud

#### 1. Modelos de Facturación y Descuentos Automáticos
* **Facturación por Segundo (Per-second Billing)**: Introducida pioneramente por Google Cloud para Compute Engine, GKE, Dataproc (Managed Service for Apache Spark) y entornos flexibles de App Engine. Se paga únicamente por los segundos que la máquina está encendida (mínimo de 1 minuto).
* **Descuentos por Uso Continuo (Sustained-Use Discounts - SUD)**: Se aplican **automáticamente sin compromiso previo** cuando una máquina virtual Compute Engine opera durante más del 25% del mes de facturación. Cada minuto incremental recibe un descuento progresivo (de hasta el 30%).
* **Tipos de Máquina Personalizados (Custom Machine Types)**: Permiten configurar la cantidad exacta de vCPU y memoria RAM requerida por la aplicación, evitando pagar por vCPUs o gigabytes de memoria sobredimensionados en tipos estándar prefijados.
* **Calculadora de Precios Oficial**: `cloud.google.com/products/calculator` para estimar costes de arquitecturas completas previo al despliegue.

#### 2. Gobernanza de Presupuestos y Alertas de Facturación
* **Ámbito del Presupuesto**: Se configuran a nivel de Cuenta de Facturación (*Cloud Billing Account*) o a nivel de Proyecto individual.
* **Tipos de Límite**: Límite fijo (ej. 20,000 USD) o dinámico (porcentaje del gasto del mes anterior).
* **Umbrales de Alerta**: Por defecto al 50%, 90% y 100% del presupuesto (personalizables).
* **Regla de Oro para el Examen ACE**:
  * ⚠️ *Las alertas de presupuesto NO detienen ni apagan recursos automáticamente*. Su única función es enviar notificaciones por correo electrónico a administradores o disparar mensajes a temas de Cloud Pub/Sub (donde una Cloud Function o Cloud Run puede opcionalmente automatizar acciones de apagado si se programa expresamente).

#### 3. Cuotas de Recursos a Nivel de Proyecto (Quotas)
Las cuotas protegen contra consumos imprevistos derivados de errores de código, bucles infinitos o ataques maliciosos:
* **Cuotas de Tasa (Rate Quotas)**: Limitan el número de llamadas a una API en una ventana temporal y se reinician automáticamente al concluir el período (ej. máximo 3,000 llamadas API a GKE por proyecto cada 100 segundos).
* **Cuotas de Asignación (Allocation Quotas)**: Gobiernan la cantidad máxima de recursos simultáneos que pueden coexistir en un proyecto (ej. máximo de 15 redes Virtual Private Cloud por proyecto de forma predeterminada).
* **Ampliación de Cuotas**: Si un proyecto requiere más recursos o mayor tasa de llamadas API, se puede solicitar un aumento de cuota directamente desde la consola de Google Cloud sin coste adicional.

---

### 📝 1.8 Cuestionario Oficial de Evaluación: Módulo 1 (Syllabus Quiz)

Evaluación oficial del Módulo 1 (*Passing Score: 66%*):

#### Pregunta 1
* **Enunciado:** *What type of cloud computing service lets you bind your application code to libraries that give access to the infrastructure your application needs?*
* **Opciones:**
  * ✅ **Platform as a service (PaaS)** *(Respuesta Correcta)*
  * Software as a service
  * Infrastructure as a service
  * Hybrid cloud
  * Virtualized data centers
* **Justificación Oficial & Enfoque ACE:** PaaS (ej. App Engine) abstrae la gestión del sistema operativo y los servidores, enlazando el código de la aplicación con librerías y APIs que acceden a la infraestructura automáticamente. Permite al desarrollador concentrarse en la lógica de negocio y se factura por los recursos consumidos.

#### Pregunta 2
* **Enunciado:** *Why might a Google Cloud customer use resources in several regions around the world?*
* **Opciones:**
  * To offer localized application versions in different regions.
  * ✅ **To bring their applications closer to users around the world, and for improved fault tolerance** *(Respuesta Correcta)*
  * To improve security
  * To earn discounts
* **Justificación Oficial & Enfoque ACE:** Desplegar recursos en múltiples regiones geográficas minimiza la latencia de red al atender a los usuarios desde ubicaciones cercanas y provee tolerancia a fallos ante catástrofes o cortes que afecten a una región entera.

#### Pregunta 3
* **Enunciado:** *What is the primary benefit to a Google Cloud customer of using resources in several zones within a region?*
* **Opciones:**
  * For better performance
  * For getting discounts on other zones
  * For expanding services to customers in new areas
  * ✅ **For improved fault tolerance** *(Respuesta Correcta)*
* **Justificación Oficial & Enfoque ACE:** Las zonas dentro de una misma región son dominios de fallo independientes con energía, refrigeración y redes aisladas. Distribuir instancias entre múltiples zonas (ej. mediante Managed Instance Groups regionales) garantiza que un corte en una sola zona no derribe el servicio.

---

### Matriz de Módulos y Laboratorios Prácticos

| Módulo | Foco Técnico Principal | Laboratorio Práctico Incluido |
| :--- | :--- | :--- |
| **M1: Introducción a Google Cloud** | IaaS vs PaaS vs Serverless, red global de fibra óptica, seguridad en capas y modelos de facturación | Cuestionario de Fundamentos |
| **M2: Recursos y Acceso** | Jerarquía de recursos (Organización → Carpetas → Proyectos → Recursos), IAM y Service Accounts | **Lab 1:** Getting Started with Cloud Marketplace |
| **M3: Máquinas Virtuales y Redes** | Redes VPC (Auto vs Custom), Compute Engine, MIGs, Load Balancing, Cloud DNS, CDN y conectividad híbrida | **Lab 2:** Get Started with Virtual Private Cloud Networking and Compute Engine |
| **M4: Almacenamiento en la Nube** | Taxonomía de almacenamiento: Cloud Storage, Cloud SQL, Cloud Spanner, Firestore, Bigtable y BigQuery | **Lab 3:** Getting Started with Cloud Storage and Cloud SQL |
| **M5: Contenedores en la Nube** | Máquinas Virtuales vs Contenedores, arquitectura Kubernetes, GKE Standard vs GKE Autopilot | Cuestionario de Arquitectura GKE |
| **M6: Aplicaciones en la Nube** | Cómputo serverless con Cloud Run, Cloud Run Functions y Google App Engine (Standard vs Flexible) | **Lab 4:** Hello Cloud Run |

---

## 🏛️ 2. Fundamentos de Arquitectura y Gobernanza

### 2.1 Jerarquía Funcional de Recursos e IAM

La administración de recursos en Google Cloud se estructura mediante un árbol jerárquico estricto de **4 niveles** (de abajo hacia arriba: Recursos → Proyectos → Carpetas → Organización). Esta jerarquía determina la administración centralizada, la facturación y la **herencia descendente de políticas** (*downward policy inheritance*).

```
🏢 Nodo Organización (Dominio Cloud Identity / Workspace - Raíz de gobierno)
   │
   ├── 📁 Carpetas (Opcionales: Departamentos, Líneas de Negocio o Entornos Prod/Dev)
   │    │
   │    └── 📦 Proyectos (Contenedor base obligatorio para habilitar APIs, cobros y recursos)
   │         │
   │         └── ⚙️ Recursos (Instancias Compute Engine, Buckets, Tablas BigQuery, etc.)
```

#### Los 4 Niveles de la Jerarquía en Detalle:

1. **Nivel 1: Recursos (Resources)**:
   * Representan los objetos individuales aprovisionados en Google Cloud: máquinas virtuales de Compute Engine, depósitos de Cloud Storage, tablas analíticas en BigQuery, bases de datos Cloud SQL o instancias de Cloud Run.
   * **Regla estricta:** Todo recurso pertenece obligatoriamente a **exactamente un proyecto**.

2. **Nivel 2: Proyectos (Projects)**:
   * Constituyen la base operativa indispensable para habilitar y consumir servicios de Google Cloud (habilitar APIs, vincular cuentas de facturación y gestionar colaboradores).
   * Cada proyecto es una entidad independiente que posee **3 atributos identificadores**:
     * **Project ID (ID de Proyecto)**: Cadena alfanumérica globalmente única asignada por Google (o personalizada por el usuario al momento de la creación). Es **inmutable** (no puede modificarse jamás tras su creación) y se usa como identificador unívoco ante la CLI `gcloud` y las APIs.
     * **Project Name (Nombre de Proyecto)**: Nombre legible asignado libremente por el usuario. Es **mutable** (puede cambiarse en cualquier momento desde la consola) y no necesita ser único.
     * **Project Number (Número de Proyecto)**: Número entero único asignado automáticamente por Google. Es inmutable y se emplea primariamente para referencias internas del sistema y agentes de servicio.
   * **Resource Manager API**: API programática disponible a través de REST y RPC que permite listar todos los proyectos vinculados a una cuenta, crear nuevos proyectos, actualizarlos, eliminarlos y **recuperar proyectos eliminados** (*undelete*) dentro de su ventana de gracia (30 días).

3. **Nivel 3: Carpetas (Folders - Opcionales)**:
   * Proporcionan agrupación lógica flexible para organizar proyectos o subcarpetas anidadas bajo el nodo organización.
   * Permiten modelar la estructura de la empresa por departamentos (ej. Finanzas, Ingeniería, Marketing) o por etapas de ciclo de vida (ej. Desarrollo, Staging, Producción).
   * **Delegación administrativa:** Permiten conceder permisos administrativos a equipos específicos sobre una carpeta para que operen de forma autónoma.
   * **Prevención de errores y duplicación:** Evitan la tarea tediosa de duplicar políticas de IAM en decenas de proyectos individuales.

4. **Nivel 4: Nodo de Organización (Organization Node - Raíz)**:
   * Es el elemento superior de la jerarquía que engloba la totalidad de carpetas, proyectos y recursos de la empresa. Tanto las carpetas como los proyectos se consideran formalmente "hijos" (*children*) del nodo organización.
   * **Aprovisionamiento del Nodo:**
     * Si la organización es cliente de **Google Workspace**, el nodo organización se genera automáticamente vinculado a su dominio verificado.
     * Si la organización no utiliza Workspace, se aprovisiona mediante **Cloud Identity** (plataforma de gestión de identidades y accesos de Google).
   * **Roles Clave a Nivel de Organización para el Examen ACE:**
     * `roles/orgpolicy.policyAdmin` (**Organization Policy Administrator**): Rol privilegiado que define y restringe políticas de organización en toda la empresa (ej. impedir IPs públicas, restringir regiones geográficas).
     * `roles/resourcemanager.projectCreator` (**Project Creator**): Controla quién tiene autorización para crear nuevos proyectos dentro de la organización y, por ende, quién puede originar gastos financieros.

#### Reglas de Oro de Herencia de Políticas (IAM Policy Inheritance):
* **Herencia Descendente y Aditiva:** Las políticas aplicadas a un nivel superior se propagan automáticamente hacia todos los niveles inferiores (Organización → Carpetas → Proyectos → Recursos).
* **Imposibilidad de Revocación Inferior:** Si a un usuario se le otorga `roles/storage.admin` a nivel de Carpeta, ese permiso se hereda en todos los proyectos de esa carpeta y **no puede ser restringido ni revocado** desde la consola de un proyecto hijo.
* **Mínimo Privilegio:** Siempre se deben asignar roles con el menor alcance posible y en el nivel jerárquico más específico que resuelva la necesidad del negocio.

#### La Estructura y Funcionamiento de IAM (Identity and Access Management)

IAM responde de forma unificada a la pregunta fundamental de seguridad: **¿Quién puede hacer qué sobre cuál recurso?**

1. **¿Quién? (Principals / Miembros)**:
   * **Cuentas de usuario de Google**: Cuentas individuales administradas (`usuario@gmail.com` o `usuario@miempresa.com`).
   * **Grupos de Google (Google Groups)**: Colección de cuentas (`dev-team@miempresa.com`). *Práctica recomendada por Google: asignar roles a grupos, no a individuos.*
   * **Cuentas de Servicio (Service Accounts)**: Identidades no humanas para que aplicaciones, scripts y VMs se autentiquen ante las APIs (`app@proyecto.iam.gserviceaccount.com`).
   * **Dominios de Cloud Identity / Google Workspace**: Todos los usuarios pertenecientes al dominio corporativo.

2. **¿Puede hacer qué? (Roles y Permisos)**:
   * Un **permiso** es la unidad atómica de autorización (ej. `compute.instances.create`, `storage.buckets.get`). No se asignan permisos directamente a los usuarios; se agrupan en **roles**.
   * Un **rol** es una colección de permisos afines para desempeñar una función laboral.

3. **Políticas Deny (Reglas de Denegación)**:
   * Reglas que impiden a ciertos principales utilizar permisos específicos, sin importar los roles de concesión (*allow*) que tengan otorgados.
   * **Orden de evaluación crítico para el examen ACE:** IAM evalúa **primero las políticas Deny aplicables**. Si existe una coincidencia de denegación, el acceso es bloqueado de inmediato antes de inspeccionar las políticas Allow.
   * Al igual que las políticas Allow, las políticas Deny se heredan en sentido descendente por toda la jerarquía de recursos.

#### Los 3 Tipos de Roles en IAM

1. **Roles Básicos / Primitivos (Legacy)**:
   * Diseñados antes de la introducción de IAM. Su alcance es muy amplio y afecta a **todos los recursos del proyecto**:
     * **Viewer (`roles/viewer`)**: Acceso de solo lectura a recursos. No puede realizar modificaciones.
     * **Editor (`roles/editor`)**: Acceso de lectura y modificación sobre todos los recursos, pero no puede administrar roles ni cambiar la facturación.
     * **Owner (`roles/owner`)**: Control total: modificar recursos, gestionar permisos de IAM y configurar la facturación.
     * **Billing Administrator**: Rol enfocado exclusivamente en gestionar la facturación del proyecto sin otorgar permisos para modificar los recursos técnicos.
   * *Advertencia de examen ACE:* Desaconsejados en entornos de producción con datos sensibles porque violan el principio de mínimo privilegio.

2. **Roles Predefinidos (Recomendados por Google)**:
   * Diseñados y mantenidos por Google para productos y funciones laborales específicas (ej. `roles/compute.instanceAdmin.v1`, `roles/storage.objectViewer`, `roles/resourcemanager.organizationAdmin`).
   * Proporcionan granularidad y se actualizan automáticamente cuando Google agrega nuevas características a un servicio.
   * **Ámbito de aplicación:** Se pueden vincular a nivel de **Organización**, **Carpeta**, **Proyecto** o, en algunos servicios, a nivel de **Recurso individual** (ej. un bucket específico de Cloud Storage).

3. **Roles Personalizados (Custom Roles)**:
   * Permiten a los administradores seleccionar una lista exacta de permisos atómicos cuando ningún rol predefinido satisface el principio de mínimo privilegio estricto (ej. un rol `instanceOperator` para iniciar y detener VMs sin permitir crear, borrar o reconfigurar máquinas).
   * **Dos consideraciones críticas para el examen ACE:**
     * **Gestión de ciclo de vida:** La organización es responsable de mantener y actualizar los permisos del rol personalizado cuando las APIs evolucionan.
     * ⚠️ **Restricción estricta de alcance:** Los roles personalizados **solo pueden crearse y aplicarse a nivel de Proyecto o de Organización**. **¡NUNCA pueden crearse ni aplicarse a nivel de Carpeta (Folder)!**


#### Cuentas de Servicio (Service Accounts) y su Doble Naturaleza

Las **Service Accounts** son identidades no humanas especiales diseñadas para que programas, cargas de trabajo y máquinas virtuales de Compute Engine se autentiquen e interactúen con otros servicios en la nube de forma segura y automatizada, sin intervención humana y sin almacenar contraseñas en texto plano:

1. **Mecanismo de Autenticación y Nomenclatura**:
   * Poseen formato de correo electrónico corporativo: `<sa-name>@<project-id>.iam.gserviceaccount.com` (administradas por el usuario) o `<project-number>@cloudservices.gserviceaccount.com` (administradas por Google).
   * **Sin contraseñas:** No utilizan contraseñas interactivas; se autentican mediante **claves criptográficas** o mediante el **servidor de metadatos de Compute Engine** (`http://metadata.google.internal`), que entrega tokens OAuth2 efímeros y de rotación automática a la VM en tiempo de ejecución.

2. **La Doble Naturaleza en IAM (Doble Rol Arquitectónico)**:
   * **Como Identidad (Principal / Miembro):** La Service Account actúa como un usuario ante las APIs. Se le asignan roles para otorgarle permisos sobre recursos externos (ej. otorgar `roles/storage.objectViewer` sobre un bucket para que la aplicación en la VM pueda leer archivos sin abrir el bucket a Internet).
   * **Como Recurso (Resource):** La Service Account es simultáneamente un recurso de Google Cloud dentro del proyecto. Por tanto, se le pueden adjuntar políticas de IAM para controlar **quién puede administrarla, impersonarla o vincularla a máquinas virtuales**:
     * **`roles/iam.serviceAccountUser`**: Permite a un desarrollador adjuntar la Service Account a una VM o ejecutar procesos asumiendo su identidad (*impersonation*).
     * **`roles/iam.serviceAccountAdmin`**: Permite crear, listar, modificar y eliminar cuentas de servicio.
     * **`roles/viewer` (o Service Account Viewer)**: Permite a auditores listar las cuentas de servicio existentes sin poder usarlas ni modificar sus claves.

3. **Práctica Recomendada para el Examen ACE**:
   * Nunca descargar ni incrustar archivos JSON de claves privadas de Service Account en discos de máquinas virtuales o en repositorios de código. Siempre se debe adjuntar la Service Account directamente a la instancia de Compute Engine para delegar la gestión segura de tokens al servidor de metadatos.

#### Cloud Identity y Gestión Centralizada de Identidades (IDaaS)

**Cloud Identity** es la solución de Identidad como Servicio (*Identity as a Service - IDaaS*) que permite a las organizaciones gobernar centralizadamente sus usuarios y grupos mediante la consola **Google Admin Console** (`admin.google.com`), independientemente de si utilizan o no Google Workspace:

1. **Riesgo Crítico de Cuentas Personales (`@gmail.com`)**:
   * Comenzar proyectos utilizando cuentas personales de Gmail y Google Groups es una práctica frecuente pero peligrosa para empresas.
   * **Problema de desvinculación laboral:** Cuando un empleado abandona la empresa, no existe ningún mecanismo centralizado para revocar de inmediato su acceso a los recursos de la nube, dejando activos corporativos expuestos a fugas o accesos no autorizados.

2. **Gobernanza Centralizada y Ciclo de Vida**:
   * Cloud Identity permite a los administradores desactivar una cuenta en un solo clic desde Google Admin Console o revocar su pertenencia a grupos de IAM, cortando el acceso a todos los proyectos y recursos en tiempo real.

3. **Federación con Active Directory y LDAP (SSO)**:
   * **Google Cloud Directory Sync (GCDS):** Herramienta gratuita que sincroniza usuarios y grupos unidireccionalmente desde Microsoft Active Directory o servidores LDAP locales hacia Cloud Identity.
   * **Single Sign-On (SSO con SAML 2.0):** Los empleados y administradores inician sesión en la consola de Google Cloud utilizando exactamente las mismas credenciales corporativas (usuario y contraseña) de su directorio de empresa existente, sin duplicar identidades ni contraseñas.

4. **Ediciones de Cloud Identity (Free vs Premium)**:
   * **Cloud Identity Free:** Incluye servicios básicos de directorio, inicio de sesión único (SSO), autenticación multifactor (MFA/2FA) y aprovisionamiento de cuentas sin costo adicional.
   * **Cloud Identity Premium:** Incorpora capacidades avanzadas de administración de dispositivos móviles (*Mobile Device Management - MDM*), borrado remoto de dispositivos de la empresa, reglas de acceso contextual (*Context-Aware Access*) y gestión automatizada del ciclo de vida de usuarios.
   * **Relación con Google Workspace:** Para clientes existentes de Google Workspace, todas las funciones de Cloud Identity ya vienen incluidas y activadas por defecto en su Google Admin Console.

#### Las 4 Vías de Acceso e Interacción con Google Cloud

Existen cuatro métodos oficiales y complementarios para administrar, desplegar e interactuar con los recursos de Google Cloud:

1. **Google Cloud Console (Interfaz Gráfica Web - GUI)**:
   * Consola centralizada accesible desde cualquier navegador moderno (`console.cloud.google.com`).
   * Facilita el despliegue, escalado y diagnóstico visual de incidentes en producción.
   * Proporciona un buscador universal para localizar proyectos, VMs y configuraciones, conexión por **SSH en el navegador** a máquinas virtuales sin clientes locales, y configuración visual de presupuestos con umbrales de alerta.

2. **Google Cloud SDK y Cloud Shell (Línea de Comandos - CLI)**:
   * **Google Cloud SDK:** Colección de herramientas descargables instaladas en el directorio `bin/` local. Incluye la CLI principal `gcloud` (para Compute Engine, GKE, IAM, VPC), `bq` (herramienta especializada para BigQuery) y utilidades de almacenamiento.
   * **Cloud Shell (Foco Esencial en el Examen ACE):**
     * Máquina virtual Linux basada en **Debian** aprovisionada bajo demanda y accesible directamente desde el navegador.
     * Incorpora **5 GB de almacenamiento persistente** en el directorio `$HOME` (los archivos en `$HOME` se conservan entre sesiones; los paquetes instalados fuera de `$HOME` son efímeros).
     * Viene **pre-autenticada** con las credenciales de la sesión activa de Google Cloud y cuenta con el SDK de Google Cloud, compiladores, Docker y lenguajes populares siempre actualizados, eliminando la necesidad de configuración local.

3. **APIs y Librerías de Cliente (Automatización y Código)**:
   * Cada servicio de Google Cloud expone interfaces REST y RPC para que el código de las aplicaciones administre y consuma recursos programáticamente.
   * **Google APIs Explorer:** Herramienta interactiva dentro de Cloud Console para descubrir APIs disponibles, inspeccionar versiones y realizar llamadas de prueba en tiempo real con autenticación de usuario.
   * **Cloud Client Libraries (Recomendadas por Google):** Librerías idiomáticas oficiales diseñadas para optimizar el rendimiento, autenticación y llamadas asíncronas en 8 lenguajes: **Java, Python, PHP, C#, Go, Node.js, Ruby y C++**.
   * **Google API Client Libraries:** Librerías genéricas de soporte heredadas para APIs estándar de Google.

4. **Google Cloud Mobile App (Gestión Móvil en iOS y Android)**:
   * Aplicación móvil disponible en `cloud.google.com/app`.
   * **Capacidades operativas en tiempo real:**
     * **Compute Engine:** Iniciar, detener, conectar mediante SSH y consultar logs de eventos de instancias de VM.
     * **Cloud SQL:** Iniciar y detener instancias de bases de datos relacionales.
     * **App Engine:** Monitorear errores de ejecución, revertir despliegues (*roll back*) y modificar la división de tráfico (*traffic splitting*).
     * **Facturación e incidentes:** Supervisar el consumo frente al presupuesto, recibir alertas push de desbordamiento de costos y diagnosticar gráficas personalizadas de uso de CPU, red, peticiones por segundo y errores HTTP 5xx.

---

### 2.2 Redes VPC y Reglas de Conectividad

* **Auto Mode VPC**: Genera automáticamente una subred por región con rangos IP predeterminados (`10.128.0.0/9`). Adecuado para pruebas o prototipado rápido.
* **Custom Mode VPC**: Comienza con cero subredes. Los administradores definen explícitamente los rangos CIDR y regiones. *Obligatorio en producción y recomendado en el examen ACE.*
* **Firewall NGFW**: Reglas de inspección basadas en prioridad (menor número = mayor prioridad), puertos, etiquetas de red (`target-tags`) y rangos origen (`source-ranges`).

---

### 2.3 Taxonomía de Almacenamiento y Bases de Datos

| Servicio | Tipo de Dato | Modelo | Ámbito | Casos de Uso Predominantes en Examen |
| :--- | :--- | :--- | :--- | :--- |
| **Cloud Storage** | No estructurado | Objetos binarios (Blobs) | Global / Multi-Región / Región | Almacén multimedia, backups, data lakes, sitios web estáticos. Clases: Standard, Nearline (30d), Coldline (90d), Archive (365d). |
| **Cloud SQL** | Estructurado | Relacional (MySQL, Postgres, SQL Server) | Regional (Failover HA) | Aplicaciones web estándar, ERP, CRM, transacciones ACID con volumen menor a 64 TB. |
| **Cloud Spanner** | Estructurado | Relacional (ANSI SQL, escalado horizontal) | Global / Multi-Región | Transacciones bancarias globales, alta disponibilidad (99.999%), consistencia fuerte sin límites de escala. |
| **Firestore** | Semi-estructurado | Documental NoSQL (Colecciones y Documentos) | Regional / Multi-Región | Aplicaciones móviles y web en tiempo real, sincronización offline, catálogos de usuario. |
| **Cloud Bigtable** | Semi-estructurado | Columnar ancho NoSQL (HBase API) | Regional / Global | Ingesta masiva IoT, series temporales, telemetría financiera con escrituras sub-10ms. |
| **BigQuery** | Estructurado | Data Warehouse analítico (OLAP) | Multi-Región / Región | Análisis masivo SQL en petabytes, reportería BI, machine learning integrado (BQML). |

---

### 📝 2.4 Cuestionario Oficial de Evaluación: Módulo 2 (Syllabus Quiz)

Evaluación oficial del Módulo 2 (*Resources and Access in the Cloud* - Passing Score: 66%):

#### Pregunta 1
* **Enunciado:** *Choose the correct completion: Services and APIs are enabled on a per-__________ basis.*
* **Opciones:**
  * Folder
  * ✅ **Project** *(Respuesta Correcta)*
  * Organization
  * Billing account
* **Justificación Oficial & Enfoque ACE:** Las APIs y servicios de Google Cloud se activan y consumen individualmente a nivel de **Proyecto** (e.g. `gcloud services enable <API>`). El proyecto es la unidad de contención donde se calculan cuotas, se conectan las cuentas de facturación y se delimitan los permisos de acceso. No pueden habilitarse APIs sobre carpetas u organizaciones directamente.

#### Pregunta 2
* **Enunciado:** *Which of these values is globally unique, permanent, and unchangeable, but can be modified by the customer during creation?*
* **Opciones:**
  * The project's billing credit-card number
  * The project name
  * The project number
  * ✅ **The project ID** *(Respuesta Correcta)*
* **Justificación Oficial & Enfoque ACE:** El **Project ID** es un identificador alfanumérico globalmente único en toda la infraestructura mundial de Google Cloud. Es permanente e **inmutable** una vez creado el proyecto, pero el cliente tiene la potestad de elegirlo y personalizarlo **durante el proceso de creación**. Por contra, el *Project Number* es autogenerado por Google (sin opción a personalización) y el *Project Name* es mutable y no requiere unicidad global.

#### Pregunta 3
* **Enunciado:** *Select the list of IAM role types that are ordered from broadest to finest-grained.*
* **Opciones:**
  * ✅ **Basic roles, predefined roles, custom roles** *(Respuesta Correcta)*
  * Custom roles, predefined roles, basic roles
  * Predefined roles, custom roles, basic roles
* **Justificación Oficial & Enfoque ACE:**
  * **Basic roles (Más amplios / Broadest):** `Owner`, `Editor` y `Viewer` otorgan permisos concéntricos masivos sobre todos los recursos del proyecto.
  * **Predefined roles (Granularidad intermedia):** Diseñados por Google para servicios y funciones laborales acotadas (e.g. `roles/compute.instanceAdmin.v1`).
  * **Custom roles (Más específicos / Finest-grained):** Diseñados por el administrador seleccionando la lista exacta de permisos atómicos necesarios para implementar el principio de mínimo privilegio estricto (solo a nivel de Proyecto u Organización).

---

## 🌐 3. Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)

### 3.1 Redes Virtual Private Cloud (VPC) y Arquitectura de Subredes

Una **Virtual Private Cloud (VPC)** es una red virtual privada, aislada y altamente segura alojada sobre la infraestructura física global de Google Cloud. Combina la flexibilidad, escalabilidad y conveniencia del cómputo en la nube pública con el estricto aislamiento de datos y control perimetral de un centro de datos privado tradicional.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          GOOGLE CLOUD VPC (GLOBAL SCOPE)                        │
│                                                                                 │
│   ┌───────────────────────────────┐           ┌─────────────────────────────┐   │
│   │     Región: us-east1          │           │     Región: asia-east1      │   │
│   │   ┌────────────────────────┐  │           │   ┌──────────────────────┐  │   │
│   │   │ Subnet 1 (10.10.0.0/20)│  │           │   │Subnet 2 (10.20.0.0/20│  │   │
│   │   │  Zona a     Zona b     │  │  Fibra    │   │  Zona a     Zona b   │  │   │
│   │   │  ┌────┐     ┌────┐     │  │  Privada  │   │  ┌────┐     ┌────┐   │  │   │
│   │   │  │VM-1│ ... │VM-2│     │──┼───────────┼───│  │VM-3│ ... │VM-4│   │  │   │
│   │   │  └────┘     └────┘     │  │  Google   │   │  └────┘     └────┘   │  │   │
│   │   │  (Vecinas en la misma  │  │           │   └──────────────────────┘  │   │
│   │   │   subred entre zonas)  │  │           │                             │   │
│   │   └────────────────────────┘  │           └─────────────────────────────┘   │
│   └───────────────────────────────┘                                             │
└─────────────────────────────────────────────────────────────────────────────────┘
```

#### Principios Arquitectónicos Fundamentales de las VPC en Google Cloud

1. **Alcance Global (Global Scope)**:
   * A diferencia de otros proveedores cloud donde una red virtual está confinada a un centro de datos o a una única región geográfica, **las redes VPC en Google Cloud son recursos globales nativos**.
   * Una sola VPC abarca todas las regiones del mundo sin requerir pasarelas de tránsito inter-regionales complejas.
   * La comunicación interna entre VMs en diferentes regiones viaja exclusivamente a través de la red troncal privada de fibra óptica de Google, evitando la Internet pública, con latencias ultra bajas y cifrado transparente.

2. **Subredes Regionales que Abarcan Múltiples Zonas (Regional Multi-Zone Subnets)**:
   * Mientras que la VPC es global, las **subredes son recursos regionales**.
   * Una subred se aprovisiona en una región geográfica específica (ej. `us-east1`), pero **abarca de forma automática todas las zonas de disponibilidad** de esa región (`us-east1-b`, `us-east1-c`, `us-east1-d`).
   * **Instancias vecinas en distintas zonas:** Varias máquinas virtuales pueden desplegarse en zonas diferentes para lograr alta disponibilidad y redundancia ante fallos físicos, permaneciendo en la misma subred y compartiendo un único espacio continuo de direcciones IP privadas.

3. **Expansión Dinámica de Espacio IP de Subredes (Subnet CIDR Expansion)**:
   * El rango de direcciones IP privadas asignado a una subred existente puede aumentarse dinámicamente en caliente (por ejemplo, expandiendo de `10.130.0.0/24` a `10.130.0.0/20`).
   * **Sin impacto operativo:** La expansión del CIDR no interrumpe el tráfico ni requiere reiniciar las máquinas virtuales ya existentes en la subred.
   * **Regla estricta para el examen ACE:** Solo está permitido **expandir** el rango (disminuir el prefijo de máscara CIDR, ej. `/24` → `/20`); **nunca es posible reducirlo** ni encogerlo.

4. **Reglas de Cortafuegos Distribuidas (Stateful Firewall Rules)**:
   * Las reglas de cortafuegos en Google Cloud operan a nivel de instancia mediante el plano de datos SDN (*Software-Defined Networking*) denominado Andromeda.
   * Tienen **inspección de estado (stateful)**: si se permite el tráfico entrante (*ingress*), las respuestas de retorno se permiten automáticamente sin necesidad de una regla de salida explícita.
   * Se pueden aplicar de forma granular utilizando **etiquetas de red (network tags)**, **cuentas de servicio (Service Accounts)** o bloques CIDR de origen/destino.

5. **Rutas Estáticas y Dinámicas (Routing Rules)**:
   * Las tablas de rutas permiten dirigir tráfico específico hacia Internet pública (*default internet gateway*), túneles Cloud VPN, interconexiones dedicadas (Cloud Interconnect) o instancias de red virtuales intermedias (appliances / NVAs).

#### Comparativa Técnica: Modo Automático vs Modo Personalizado

| Característica | Modo Automático (Auto Mode VPC) | Modo Personalizado (Custom Mode VPC) |
| :--- | :--- | :--- |
| **Subredes Iniciales** | Crea automáticamente 1 subred en **cada región** existente de GCP | Inicia con **0 subredes**; el administrador define explícitamente cuáles crear |
| **Rango CIDR Global** | Utiliza bloques fijos predeterminados dentro de `10.128.0.0/9` | Rangos RFC 1918 definidos por el usuario sin riesgo de solapamiento |
| **Recomendación de Uso** | Entornos de prueba rápida, laboratorios y prototipos | **Entornos corporativos de producción y obligatorio en examen ACE** |
| **Conversión de Modo** | Puede convertirse de Auto Mode a Custom Mode | **No reversible**: una red Custom Mode nunca puede convertirse a Auto |
| **Riesgo de Solapamiento** | Muy alto al conectar con redes on-premises mediante VPN o Peering | Nulo si se planifican los rangos de subred adecuadamente |

---

### 💻 3.2 Compute Engine y Modelos de Cómputo IaaS

**Compute Engine** es el servicio fundamental de Infraestructura como Servicio (IaaS) de Google Cloud. Proporciona máquinas virtuales (VMs) altamente configurables y escalables ejecutadas sobre la red y hardware de clase mundial de Google, sin costos de capital iniciales (CapEx) y con rendimiento consistente.

#### 1. Capacidades y Dimensionamiento de Instancias
* **Sistemas Operativos Disponibles**:
  * Imágenes públicas optimizadas por Google: Debian, Ubuntu, Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), Rocky Linux y Windows Server.
  * Imágenes personalizadas (*Custom Images*): Permiten importar sistemas existentes on-premises o crear imágenes maestras corporativas preconfiguradas con software y endurecimiento (*hardening*) de seguridad.
* **Interfaces de Gestión**:
  * **Google Cloud Console:** Interfaz gráfica web para aprovisionar y monitorear visualmente.
  * **Google Cloud CLI (`gcloud compute instances create ...`):** Automatización mediante scripts e Infraestructura como Código.
  * **Compute Engine REST API:** Integración directa con pipelines y sistemas externos.
* **Google Cloud Marketplace**:
  * Despliegue con un clic de pilas completas de software (ej. LAMP, WordPress, bases de datos no relacionales, herramientas de desarrollo) verificadas y empaquetadas por Google y terceros.
  * No añade cargos adicionales sobre el software abierto; solo se factura la infraestructura subyacente consumida (y licencias de terceros comerciales en su caso con estimaciones previas).

#### 2. Estructura de Precios y Estrategias de Ahorro para el Examen ACE

La optimización de costes en Compute Engine es uno de los temas más recurrentes en el examen Google Cloud ACE. La plataforma ofrece cuatro palancas financieras complementarias:

| Mecanismo de Ahorro | Naturaleza y Activación | Descuento Típico | Caso de Uso Ideal |
| :--- | :--- | :--- | :--- |
| **Facturación por Segundo** | Por defecto para todas las VMs (mínimo de 1 minuto) | Tarifa base de uso | Cualquier carga elástica o efímera |
| **Sustained-Use Discounts (SUD)** | **Automático sin compromiso**. Se activa cuando una VM corre más del **25% del mes** | Hasta un **30%** progresivo | Cargas continuas pero cuya duración exacta a futuro no es segura |
| **Committed-Use Discounts (CUD)** | **Compromiso contractual** por **1 o 3 años** sobre vCPUs y memoria | Hasta un **57%** | Cargas de producción altamente predecibles y estables a largo plazo |
| **Spot VMs (Reemplazo de Preemptible)** | Cómputo sobre capacidad excedente ociosa de Google Cloud | Hasta un **90%** sobre precio de lista | Cargas batch tolerantes a fallos, renderizado, simulación y pipelines CI/CD |

#### 3. Diferencia Crítica: Spot VMs vs Preemptible VMs (Pregunta de Examen)
* **Preemptible VMs (Modelo Clásico):** Tenían un límite técnico estricto de **24 horas máximas de vida**. Cumplidas las 24 horas, Compute Engine apagaba la instancia obligatoriamente.
* **Spot VMs (Modelo Actual Oficial):** **NO tienen límite máximo de 24 horas**. Pueden permanecer ejecutándose días o semanas mientras Google Cloud tenga capacidad disponible en la zona.
* **Condición de Revocación (*Preemption*):** Si Google Cloud requiere la capacidad física para clientes estándar bajo demanda, la Spot VM recibe una señal de terminación con **30 segundos de aviso previo** para guardar estado (checkpointing) antes de apagarse.

#### 4. Tipos de Máquina Personalizados (Custom Machine Types)
* Si las familias predefinidas (General-purpose, Compute-optimized, Memory-optimized) no encajan exactamente con el perfil de la aplicación, Compute Engine permite elegir **el número exacto de vCPUs y gigabytes de RAM** requeridos.
* **Ahorro operativo:** Evita pagar por recursos ociosos (ej. si una app requiere 3 vCPUs y 14 GB de RAM, no es necesario contratar un tipo estándar de 4 vCPUs y 16 GB).

#### 5. Rendimiento y Almacenamiento Persistente
* Compute Engine proporciona de forma **predeterminada y sin coste de licencia adicional** un altísimo ancho de banda (*high throughput*) entre la CPU virtual y los volúmenes de discos persistentes (*Persistent Disks*).

### 📈 3.3 Escalado de Máquinas Virtuales (Scaling Virtual Machines)

Compute Engine ofrece mecanismos de elasticidad automática y dimensionamiento adaptativo para balancear disponibilidad, rendimiento y costo operativo bajo fluctuaciones de tráfico.

#### 1. Autoscaling y Managed Instance Groups (MIGs)
* **Elasticidad Horizontal Dinámica:** El autoescalado en Compute Engine añade (*scale out*) o elimina (*scale in*) instancias VM automáticamente en respuesta a métricas de carga del sistema.
* **Métricas Principales de Activación:**
  * **Utilización media de CPU:** Escala cuando el uso promedio supera un porcentaje objetivo (ej. 60%).
  * **Capacidad de balanceo de carga HTTP(S):** Añade instancias cuando el volumen de peticiones por segundo excede el umbral objetivo por instancia.
  * **Métricas personalizadas de Cloud Monitoring:** Escala según colas de mensajería (ej. mensajes pendientes en Google Cloud Pub/Sub) o telemetría de aplicación.
  * **Autoescalado basado en horarios (Schedule-based):** Prevé picos conocidos aprovisionando capacidad antes de eventos recurrentes de negocio.

#### 2. Sinergia con Cloud Load Balancing (VPC)
* El escalado horizontal exige que el tráfico entrante se distribuya de forma uniforme y sin puntos únicos de fallo.
* **Google Cloud Load Balancing** integrado en VPC opera con los Managed Instance Groups para repartir peticiones y comprobar la salud (*Health Checks*) de las instancias, evitando dirigir tráfico hacia VMs que se encuentren iniciando, sobrecargadas o no saludables.

#### 3. Scale-Out (Escalado Horizontal) vs Scale-Up (Escalado Vertical)
* **Scale-Up (Escalado Vertical):**
  * Consiste en asignar más vCPUs y memoria RAM a una sola máquina o utilizar tipos extremos (ej. familias Memory-Optimized M2/M3 con cientos de vCPUs y hasta 12 TB de memoria).
  * Ideal para cargas monolíticas especializadas, bases de datos en memoria (SAP HANA) o procesamiento numérico altamente acoplado.
* **Scale-Out (Escalado Horizontal - Paradigma Recomendado en GCP):**
  * Consiste en distribuir la carga entre múltiples instancias más pequeñas coordinadas bajo un Managed Instance Group.
  * **Ventajas clave para el Examen ACE:**
    * **Resiliencia y Alta Disponibilidad:** Distribución multi-zonal dentro de la región (tolerancia a fallos por caída de un centro de datos entero).
    * **Cero Downtime:** Facilita actualizaciones rodantes (*rolling updates*) y despliegues canary sustituyendo instancias sin interrumpir el servicio al usuario.
    * **Eficiencia de costes:** Pagar únicamente por las instancias adicionales durante picos de demanda y apagarlas de inmediato al cesar el tráfico.

#### 4. Familias de Máquinas y Gobernanza de Cuotas por Zona (Zone-dependent Quotas)
* **Familias de Máquinas:**
  * **Propósito General (General-purpose - E2, N2, N2D, C3, C4):** Mejor equilibrio coste/rendimiento.
  * **Optimizadas para Cómputo (Compute-optimized - C2, C2D):** Alto rendimiento por núcleo para simulación o gaming.
  * **Optimizadas para Memoria (Memory-optimized - M1, M2, M3):** Ratios extremos de RAM/vCPU.
  * **Optimizadas para Aceleradores (Accelerator-optimized - A2, A3, G2):** Equipadas con GPUs NVIDIA para IA/ML.
* **Pregunta Frecuente de Examen ACE (Cuotas por Zona):**
  * El número máximo de CPUs y memoria aprovisionables no solo está sujeto al tipo de máquina, sino a la **cuota de vCPUs disponible en el proyecto para esa zona específica**.
  * Si un MIG falla al autoescalar debido a un error de cuota agotada (*Quota Exceeded*), la solución operativa consiste en solicitar un incremento de cuota en **IAM & Admin → Quotas & System Limits** para la zona en cuestión, o distribuir el grupo en un MIG regional que aproveche múltiples zonas.

### 🌐 3.4 Capacidades y Compatibilidades Clave de VPC (VPC Compatibilities)

Las redes Virtual Private Cloud (VPC) en Google Cloud integran capacidades avanzadas de enrutamiento, seguridad perimetral y conectividad multi-proyecto gestionadas de forma nativa por software:

#### 1. Tablas de Enrutamiento Nativas sin Routers Físicos
* **Enrutamiento SDN (Andromeda):** Las redes VPC disponen de tablas de enrutamiento globales distribuidas de fábrica. No es necesario aprovisionar, configurar ni mantener routers virtuales ni físicos para el tráfico interno.
* **Conectividad Interna Transparente:** Dirigen el tráfico de manera directa entre instancias de la misma subred, entre diferentes subredes de la misma red VPC y entre zonas geográficas remotas mediante IPs internas privadas (RFC 1918), sin atravesar internet pública ni requerir IPs externas.

#### 2. Firewall Global Distribuido y Network Tags
* **Capa de Seguridad con Estado (Stateful):** El firewall de Google Cloud opera a nivel de interfaz de red virtual (vNIC) pero se administra globalmente a nivel de VPC. Permite inspeccionar tráfico entrante (*ingress*) y saliente (*egress*). Si una conexión entrante es autorizada, el tráfico de respuesta asociado se permite automáticamente.
* **Control mediante Etiquetas de Red (Network Tags):**
  * Permite asociar reglas de firewall a grupos lógicos de VMs sin importar su dirección IP ni la subred donde residan.
  * Ejemplo: Etiquetar instancias con `web` y crear una regla que admita tráfico entrante en los puertos TCP 80 y 443 para todas las máquinas con ese tag.

#### 3. Interconexión Privada entre Proyectos: VPC Network Peering vs Shared VPC

Uno de los temas evaluados con mayor rigurosidad en el examen ACE es la selección entre **VPC Network Peering** y **Shared VPC**:

| Criterio Técnico | VPC Network Peering | Shared VPC (VPC Compartida) |
| :--- | :--- | :--- |
| **Arquitectura** | Emparejamiento simétrico entre dos redes VPC independientes | Un proyecto central (**Host Project**) comparte subredes con **Service Projects** |
| **Control Administrativo** | **Descentralizado**: Cada proyecto mantiene su propio administrador de red y sus propias reglas de firewall | **Centralizado**: Los administradores de red corporativos controlan las subredes y firewalls en el Host Project |
| **Alcance Organizacional** | Puede conectar proyectos dentro de la misma organización o en **diferentes organizaciones** | Requiere que todos los proyectos pertenezcan a la **misma organización** |
| **Roles de IAM Clave** | `roles/compute.networkAdmin` en cada proyecto respectivo | `roles/compute.xpnAdmin` (Shared VPC Admin) a nivel Org/Host y `roles/compute.networkUser` para que desarrolladores usen subredes |
| **Transitividad** | **No transitivo**: Si A conecta con B y B conecta con C, A no puede hablar con C a través de B | **Intra-red nativa**: Todas las instancias de los Service Projects en la VPC compartida se comunican internamente de forma directa |

### ⚖️ 3.5 Cloud Load Balancing (Balanceo de Carga en la Nube)

Cloud Load Balancing es el servicio de balanceo de tráfico de red totalmente definido por software y distribuido globalmente de Google Cloud:

#### 1. Características Arquitectónicas y Diferenciales
* **Servicio Gestionado por Software (Sin VMs dedicadas):** No requiere aprovisionar ni administrar instancias de balanceador. Se ejecuta sobre el tejido SDN Andromeda y los proxies de Google Front End (GFE).
* **Cero Pre-calentamiento (*No Pre-warming*):** Capacidad instantánea para absorber picos súbitos de tráfico sin necesidad de enviar solicitudes de pre-calentamiento a Google.
* **Failover Multi-Región Suave (*Cross-Region Load Balancing*):** Dirección Anycast global única. Si los backends de una región se saturan o fallan sus verificaciones de estado (*Health Checks*), el tráfico se redirige suave y automáticamente en fracciones hacia la región geográfica saludable más próxima.

#### 2. Clasificación de Soluciones de Balanceo de Carga en Google Cloud

| Tipo de Balanceador | Capa OSI & Protocolo | Modo de Operación | Características Destacadas de Examen ACE |
| :--- | :--- | :--- | :--- |
| **Application Load Balancer (ALB)** | **Capa 7** (HTTP, HTTPS, HTTP/2) | **Reverse Proxy** (termina la conexión del cliente) | Enrutamiento por contenido basado en URLs (`/api` vs `/static`), terminación de certificados SSL/TLS y soporte tanto externo hacia internet como interno en VPC. |
| **Proxy Network Load Balancer (NLB)** | **Capa 4** (TCP con o sin SSL/TLS) | **Reverse Proxy** (termina la conexión del cliente) | Tráfico TCP no HTTP (WebSockets, bases de datos), descarga SSL y soporte para backends híbridos (on-premises y multi-cloud con NEGs). |
| **Passthrough Network Load Balancer** | **Capa 4** (TCP, UDP, ESP, GRE, ICMP) | **Passthrough** (no actúa como proxy) | **Preservación nativa de la IP real del cliente** y **Direct Server Return (DSR)**: las respuestas de los servidores van directamente al cliente sin volver a pasar por el balanceador. |

### ⚡ 3.6 Servicios de Aceleración y Resolución: Cloud DNS y Cloud CDN

Google Cloud complementa su red global con servicios de resolución de nombres de dominio y almacenamiento perimetral en caché de alto rendimiento:

#### 1. Cloud DNS (Domain Name System Autoritativo)
* **Diferencia Fundamental de Examen:**
  * **Google Public DNS (`8.8.8.8` / `8.8.4.4`):** Resolvedor recursivo gratuito que traduce dominios de internet para usuarios de todo el mundo.
  * **Cloud DNS:** Servicio autoritativo comercial administrado para hospedar zonas DNS y responder consultas sobre los nombres de dominio de las aplicaciones de los clientes.
* **Características Clave:**
  * **Alta Disponibilidad Anycast (100% SLA):** Las consultas se responden desde ubicaciones geográficas redundantes globales con ultra-baja latencia.
  * **Zonas Públicas vs Zonas Privadas:**
    * *Zonas Públicas:* Visibles en internet público para exponer dominios web.
    * *Zonas Privadas:* Resolución DNS interna visible exclusivamente dentro de redes VPC autorizadas, sin publicar registros ni IPs internas a internet.
  * **Automatización y Programabilidad:** Gestión masiva de zonas y registros mediante Google Cloud Console, Cloud SDK (`gcloud dns managed-zones` y `gcloud dns record-sets`) y REST API.

#### 2. Cloud CDN (Content Delivery Network) y Edge Caches
* **Almacenamiento en Caché de Borde (*Edge Caching*):** Aprovecha la red global de más de 100 Puntos de Presencia (PoPs / edge caches) de Google para servir contenido web estático (imágenes, CSS, JavaScript, video) y respuestas dinámicas en el borde más cercano al usuario.
* **Beneficios Críticos de Arquitectura:**
  * **Latencia Drásticamente Reducida:** Respuestas en milisegundos sin recorrer la distancia hacia el centro de datos de origen.
  * **Descarga de Servidores Backend (*Reduced Origin Load*):** Protege las instancias de Compute Engine, GKE o buckets de Cloud Storage de picos de tráfico masivos.
  * **Ahorro de Costos en Salida (*Egress Savings*):** El ancho de banda servido desde caché se factura con descuento respecto a la salida regular de Compute Engine.
* **Integración Operativa con Application Load Balancers:**
  * Se habilita con una sola casilla de verificación (*single checkbox*) sobre el servicio de backend (*Backend Service*) o depósito de backend (*Backend Bucket*) de un External Application Load Balancer.
* **CDN Interconnect:**
  * Programa para clientes con contratos vigentes en CDNs de terceros (Cloudflare, Akamai, Fastly), proporcionando enlaces directos y tarifas de salida con descuento desde GCP.

### 🔌 3.7 Conectividad Híbrida y Multi-Cloud (Connecting Networks to Google VPC)

Google Cloud ofrece un abanico completo de soluciones para interconectar redes corporativas on-premises y otros entornos cloud con Google Virtual Private Cloud (VPC):

#### 1. Cloud VPN y Cloud Router (Túneles IPsec sobre Internet)
* **Conectividad Privada sobre Internet Pública:** Extiende la red privada mediante túneles seguros IPsec (IKEv1 / IKEv2) cifrados.
* **Enrutamiento Dinámico con Cloud Router (BGP):**
  * Sincronización automática de rutas mediante el protocolo Border Gateway Protocol (BGP v4).
  * Si se añade o modifica una subred en la VPC, Cloud Router anuncia automáticamente el nuevo prefijo CIDR al router on-premises sin requerir intervención manual ni tiempo de inactividad.
* **Disponibilidad:** HA VPN ofrece una disponibilidad del **99.99% SLA** mediante dos interfaces en topología activa/activa.

#### 2. Conectividad Pública: Direct Peering vs Carrier Peering
* **Propósito Específico:** Enlace directo optimizado hacia **direcciones IP públicas de Google** (Google Workspace, YouTube y APIs públicas de GCP). No proporciona acceso a IPs privadas (RFC 1918) de instancias en una VPC.
* **Direct Peering:** Conexión BGP directa instalando equipos de enrutamiento propios en un Punto de Presencia (PoP) de Google.
* **Carrier Peering:** Conexión a través de un operador de telecomunicaciones asociado para empresas sin presencia física en un PoP.
* **Regla Crítica de Examen:** Ninguna de las dos opciones de Peering está cubierta por un **SLA garantizado por Google**.

#### 3. Conectividad Privada Empresarial: Dedicated Interconnect vs Partner Interconnect
* **Propósito:** Conexión privada física de capa 2/3 directamente hacia redes VPC de Google (tráfico RFC 1918 sin transitar por internet pública).
* **Dedicated Interconnect:**
  * Circuito directo de fibra óptica entre el router del cliente y el router de Google en una instalación de colocación.
  * Capacidades fijas de **10 Gbps** o **100 Gbps**.
  * Cobertura de SLA de hasta el **99.99%** cuando se despliega la topología de alta disponibilidad recomendada por Google (4 conexiones en 2 áreas metropolitanas y 2 zonas de borde).
* **Partner Interconnect:**
  * Conexión privada a través de un proveedor de servicios de red asociado.
  * Ideal si el centro de datos no puede acceder a una instalación de colocación de Google o si la demanda no justifica 10 Gbps (admite anchos de banda sub-10G desde **50 Mbps hasta 10 Gbps**).
  * Soporta hasta **99.99% SLA** según topología, aunque Google no se responsabiliza de incidencias externas a su red.

#### 4. Conectividad Multi-Cloud: Cross-Cloud Interconnect
* **Enlaces Físicos Dedicados Cloud-to-Cloud:** Conexiones de alta velocidad aprovisionadas directamente por Google hacia otros proveedores cloud (AWS, Azure, OCI).
* **Ventajas:** Elimina la necesidad de adquirir, alojar o gestionar hardware intermedio en centros de datos de terceros; simplifica la arquitectura multi-cloud con cifrado integrado y capacidades de **10 Gbps** o **100 Gbps**.

#### 5. Matriz y Árbol de Decisión de Conectividad Híbrida (ACE Decision Blueprint)

| Requisito de Acceso | Rendimiento / Banda Requerida | Presencia en PoP / Hardware Propio | Solución Oficial Google Cloud |
| :--- | :--- | :--- | :--- |
| **IP Privada (VPC RFC 1918)** | Estándar sobre Internet | No requerida | **Cloud VPN (con Cloud Router)** |
| **IP Privada (VPC RFC 1918)** | Alto rendimiento masivo (10G/100G) | Sí (colocación directa en PoP) | **Dedicated Interconnect (SLA 99.99%)** |
| **IP Privada (VPC RFC 1918)** | Alto rendimiento sub-10G (50M-10G) | No (a través de operador asociado) | **Partner Interconnect (SLA 99.99%)** |
| **IP Privada (Cloud-a-Cloud)** | Enlace dedicado 10G/100G | No requiere hardware (Cloud-to-Cloud) | **Cross-Cloud Interconnect** |
| **IP Pública (Workspace / APIs)** | Estándar sobre Internet | No requerida | **Internet Pública directa** |
| **IP Pública (Workspace / APIs)** | Alto rendimiento optimizado BGP | Sí (router propio en PoP) | **Direct Peering (Sin SLA)** |
| **IP Pública (Workspace / APIs)** | Alto rendimiento optimizado BGP | No (a través de operador) | **Carrier Peering (Sin SLA)** |

### 📝 3.8 Cuestionario Oficial de Evaluación: Módulo 3 (Syllabus Quiz)

Evaluación oficial del Módulo 3 (*Quiz ID: 689568 | Passing Score: 80%*):

#### Pregunta 1
* **Enunciado:** *In Google Cloud VPCs, what scope do subnets have?*
* **Opciones:**
  * Zonal
  * Multi-regional
  * ✅ **Regional** *(Respuesta Correcta)*
  * Global
* **Justificación Oficial & Enfoque ACE:** Las redes VPC en Google Cloud son globales por diseño, pero las subredes son estrictamente **regionales**. Cada subred se asigna a una región geográfica específica y abarca de forma transparente todas las zonas de disponibilidad de esa región sin necesidad de enrutadores adicionales.

#### Pregunta 2
* **Enunciado:** *How does global Cloud Load Balancing allow you to balance HTTP-based traffic?*
* **Opciones:**
  * ✅ **Across multiple Compute Engine regions.** *(Respuesta Correcta)*
  * Across multiple physical machines in a single data center.
  * Across multiple virtual machine instances in a single Compute Engine region.
  * Across multiple Google Cloud services.
* **Justificación Oficial & Enfoque ACE:** El Global External Application Load Balancer opera en Capa 7 con una única IP virtual Anycast global, recibiendo las peticiones en el PoP de Google más cercano al usuario y distribuyendo el tráfico eficientemente entre grupos de instancias en **múltiples regiones de Compute Engine alrededor del mundo**.

#### Pregunta 3
* **Enunciado:** *For which of these interconnect options is a Service Level Agreement available?*
* **Opciones:**
  * ✅ **Dedicated Interconnect** *(Respuesta Correcta)*
  * Direct Peering
  * Standard Network Tier
  * Carrier Peering
* **Justificación Oficial & Enfoque ACE:** **Dedicated Interconnect** (al igual que Partner Interconnect) ofrece Acuerdos de Nivel de Servicio empresariales (**SLA de 99.9% o 99.99%** según la topología desplegada). Direct Peering y Carrier Peering interconectan redes con servicios públicos de Google sin contar con un SLA garantizado por Google Cloud.

#### Pregunta 4
* **Enunciado:** *What is the main reason customers choose Spot VMs?*
* **Opciones:**
  * To reduce cost on premium operating systems.
  * ✅ **To reduce cost.** *(Respuesta Correcta)*
  * To use custom machine types.
  * To improve performance.
* **Justificación Oficial & Enfoque ACE:** Las instancias Spot VMs ofrecen descuentos sustanciales de entre el **60% y el 91%** en comparación con las instancias estándar bajo demanda. A cambio, Google puede desalojar o interrumpir la VM con un preaviso de 30 segundos si requiere la capacidad, lo que las hace idóneas para tareas por lotes, cómputo distribuido y cargas tolerantes a fallos.

#### Pregunta 5
* **Enunciado:** *Which of the following describes a Virtual Private Cloud (VPC)?*
* **Opciones:**
  * A fully distributed, software-defined, managed service for traffic distribution.
  * An option that allows one or more direct, private connections to Google.
  * A service that routes traffic through a Google Point of Presence (PoP).
  * ✅ **A secure, individual, private cloud-computing model hosted within a public cloud.** *(Respuesta Correcta)*
* **Justificación Oficial & Enfoque ACE:** Una VPC es un modelo de red virtual privado, individual y seguro alojado sobre la infraestructura de la nube pública de Google Cloud, que brinda aislamiento lógico por proyecto, control sobre rangos CIDR privados, enrutamiento SDN por software y seguridad mediante cortafuegos con estado.

---

## 💾 4. Módulo 4: Almacenamiento en la Nube (Storage in the Cloud)

### 4.1 Opciones de Almacenamiento en Google Cloud (Google Cloud storage options)

Google Cloud proporciona una cartera completa de motores de bases de datos y almacenamiento gestionado diseñados para cubrir cualquier necesidad empresarial, categorizados según el tipo de datos, patrón de acceso y requisitos de consistencia:

#### 1. Taxonomía de Datos y Servicios Núcleo
* **Datos No Estructurados:** Archivos binarios sin formato rígido predefinido (imágenes, video, copias de seguridad, logs de auditoría y volcados de datos).
  * **Servicio:** **Cloud Storage** (almacenamiento de objetos con escalabilidad global, durabilidad de 11 nueves y 4 clases de ciclo de vida: Standard, Nearline, Coldline, Archive).
* **Datos Estructurados Relacionales (Transacciones ACID):** Tablas con esquema formal y relaciones que demandan consistencia transaccional absoluta.
  * **Servicio Regional:** **Cloud SQL** (motores MySQL, PostgreSQL y SQL Server gestionados con conmutación automática de alta disponibilidad en una sola región, para bases de datos de hasta 64 TB).
  * **Servicio Global Planetario:** **Cloud Spanner** (base de datos relacional distribuida que combina SQL estándar y transacciones ACID con consistencia fuerte y autoescalado horizontal ilimitado a escala multi-región).
* **Datos Estructurados NoSQL Orientados a Documentos:** Colecciones de documentos semiestructurados jerárquicos (JSON) diseñados para desarrollo ágil y aplicaciones cliente.
  * **Servicio:** **Firestore** (base de datos serverless con sincronización de estado bidireccional en tiempo real y soporte offline automático para aplicaciones web y móviles).
* **Datos Analíticos y Series Temporales NoSQL:** Flujos continuos masivos de eventos, telemetría IoT y lecturas/escrituras masivas concurrentes.
  * **Servicio:** **Cloud Bigtable** (motor NoSQL de columnas anchas con latencias de lectura/escritura predecibles inferiores a 10 milisegundos a escala de petabytes, compatible con la API de Apache HBase).

#### 2. Matriz de Selección Rápida para el Examen ACE (Storage Decision Matrix)

| Servicio | Tipo de Dato | Modelo de Consulta | Ámbito Geográfico | Escalabilidad Típica | Caso Predilecto en el Examen ACE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cloud Storage** | No estructurado (Blobs) | REST API / SDK / gcloud | Regional, Dual-Region, Multi-Region | Prácticamente ilimitada | Almacenar objetos multimedia, backups, data lakes y distribución de contenido estático web. |
| **Cloud SQL** | Estructurado | SQL estándar (MySQL / Postgres / SQL Server) | Regional (Alta Disponibilidad multi-zona) | Hasta 64 TB por instancia | Aplicaciones web estándar, ERP, CRM y transacciones ACID locales sin complejidad operacional. |
| **Cloud Spanner** | Estructurado | SQL ANSI 2011 con extensiones ACID | Regional o Multi-Region (Global) | Ilimitada (escala horizontal por nodos) | Sistemas financieros, bancarios y comercio electrónico global que requieren consistencia estricta multi-región. |
| **Firestore** | Estructurado (Documentos) | NoSQL (Colecciones y Documentos) | Regional o Multi-Region | Serverless automática | Apps móviles y web que necesitan sincronización en tiempo real y persistencia local sin conexión (offline). |
| **Cloud Bigtable** | Semi-estructurado | NoSQL Columnar (HBase API) | Zonal / Multi-Clúster Regional | Masiva (Petabytes) | Telemetría de sensores IoT, series temporales, detección de fraudes y analítica de latencia ultra-baja (< 10 ms). |

#### 3. Persistencia Políglota (Polyglot Persistence)
* En arquitecturas modernas de Google Cloud, una sola solución integra múltiples servicios complementarios:
  * *Front-end / Archivos:* **Cloud Storage** hospeda y distribuye los activos estáticos y videos.
  * *Negocio y Usuarios:* **Cloud SQL** gestiona las compras y cuentas de clientes con integridad transaccional.
  * *Telemetría y Métricas:* **Cloud Bigtable** ingiere millones de eventos de uso por segundo sin saturarse.

---

### 🪣 4.2 Cloud Storage: Fundamentos, Inmutabilidad, Versionado, Control de Acceso y Ciclo de Vida

Cloud Storage es el servicio totalmente administrado de Google Cloud que proporciona almacenamiento de objetos (BLOBs) masivamente escalable, altamente disponible y con una durabilidad de 11 nueves (99.999999999%).

#### 1. ¿Qué es el Almacenamiento de Objetos? (Object vs Block vs File Storage)

| Paradigma | Unidad de Almacenamiento | Estructura / Acceso | Servicio en Google Cloud | Caso de Uso Típico |
| :--- | :--- | :--- | :--- | :--- |
| **Object Storage (Almacenamiento de Objetos)** | Paquete de datos inmutable (BLOB + Metadatos + Clave URL) | Espacio plano sin jerarquía real; direccionable vía RESTful HTTP | **Cloud Storage** | Archivos multimedia, backups, distribución web estática, data lakes. |
| **Block Storage (Almacenamiento en Bloques)** | Bloques de tamaño fijo organizados por sectores | Montado como sistema de archivos en el SO de la VM (buses SCSI/NVMe) | **Persistent Disk / Hyperdisk** | Disco raíz del sistema operativo y almacenamiento transaccional de VMs. |
| **File Storage (Almacenamiento de Archivos)** | Jerarquía tradicional de carpetas y archivos | Protocolos de red compartidos (NFSv3 / NFSv4.1) | **Filestore** | Sistemas heredados, renderizado, home directories y CMS multi-instancia. |

* **Anatomía de un Objeto en Cloud Storage:**
  * **Datos Binarios:** El contenido real del archivo (video, imagen, documento, tarball).
  * **Metadatos Asociados:** Atributos del objeto como fecha de creación, autor, tipo de recurso (`Content-Type`), etiquetas y permisos.
  * **Identificador Global Único (Key):** Clave accesible directamente como URL web (ej. `https://storage.googleapis.com/mi-bucket/archivo.mp4`), facilitando la integración nativa con navegadores y servicios web.

#### 2. Buckets y Selección Geográfica de Ubicación

* **Contenedores de Primer Nivel (Buckets):**
  * Todos los objetos se organizan dentro de **buckets**.
  * **Espacio de Nombres Global Único:** El nombre del bucket debe ser universalmente único en todo Google Cloud a nivel mundial (ningún otro proyecto u organización puede registrar el mismo nombre).
  * **Selección Geográfica y Latencia:** La ubicación física debe seleccionarse cuidadosamente en el momento de creación para minimizar la latencia hacia los usuarios o servidores clientes (ej. seleccionar una región específica como `europe-west1` o la multi-región `EU` si los clientes residen en varios países europeos).

#### 3. Inmutabilidad y Versionado de Objetos (Object Versioning)

* **Inmutabilidad Absoluta:** Los objetos en Cloud Storage no admiten ediciones en el lugar (*in-place updates*). Cualquier modificación a un archivo da como resultado la creación de un objeto nuevo.
* **Comportamiento por Defecto (Sin Versionado):**
  * Al subir un archivo con un nombre idéntico al existente, la versión más reciente **sobrescribe y destruye permanentemente** a la anterior.
* **Object Versioning Activado:**
  * Cloud Storage mantiene un historial cronológico completo de modificaciones, sobrescrituras y eliminaciones.
  * La versión activa se clasifica como versión viva (*live version*).
  * Las versiones anteriores se preservan como versiones archivadas (*noncurrent versions*) identificadas mediante un número de generación único (`generation number`).
  * **Capacidades Operativas:**
    1. Listar el catálogo histórico de versiones archivadas.
    2. Restaurar un objeto a cualquier estado o versión previa.
    3. Eliminar de forma permanente versiones específicas cuando ya no sean requeridas.

#### 4. Control de Acceso y Seguridad: IAM vs Access Control Lists (ACLs)

Para proteger datos personales identificables (PII) y cumplir con el principio de mínimo privilegio, Cloud Storage proporciona dos modelos de autorización:

* **IAM (Identity and Access Management) — Recomendado Oficial:**
  * Modelo de autorización estándar y suficiente para la gran mayoría de implementaciones.
  * Las políticas y roles se heredan de forma descendente en la jerarquía: **Proyecto → Bucket → Objeto**.
  * **Uniform Bucket-Level Access (UBLA):** Práctica recomendada de seguridad que desactiva las ACLs individuales, unificando la administración de permisos exclusivamente mediante roles IAM a nivel de bucket.
* **ACLs (Access Control Lists) — Control Granular por Objeto:**
  * Utilizadas únicamente cuando se requiere otorgar accesos diferenciados a objetos específicos dentro de un mismo bucket.
  * Cada entrada de ACL consta de dos elementos:
    1. **Scope (Ámbito):** Define quién puede acceder (un usuario específico, un grupo de Google Workspace, o un dominio).
    2. **Permission (Permiso):** Define qué acciones puede ejecutar la entidad (ej. `READ`, `WRITE`, `OWNER`).

#### 5. Gestión del Ciclo de Vida de Objetos (Object Lifecycle Management)

El almacenamiento continuo de grandes volúmenes de objetos y versiones archivadas incrementa significativamente la factura. Para gobernar estos costos automáticamente, Cloud Storage permite configurar **Políticas de Ciclo de Vida**:

* **Condiciones Comunes de Ciclo de Vida:**
  * **Antigüedad (Age):** Eliminar o transicionar objetos que superen un número determinado de días (ej. borrar objetos con más de 365 días: `Age > 365`).
  * **Fecha de Creación (Created Before):** Eliminar objetos creados antes de una fecha fija (ej. antes del 1 de enero de 2013).
  * **Límite de Versiones (NumberOfNewerVersions):** En buckets con versionado activado, retener únicamente las *N* versiones más recientes (ej. conservar solo las 3 versiones más nuevas de cada archivo) purgando las versiones antiguas.
  * **Estado de Versionado (IsLive):** Aplicar reglas selectivamente a versiones activas o a versiones no actuales archivadas.
* **Acciones Automatizadas:**
  * `Delete`: Purgado definitivo del objeto o de la versión archivada.
  * `SetStorageClass`: Migración automática entre clases de almacenamiento (ej. pasar de Standard → Nearline → Coldline → Archive) para reducir costes por GB/mes.

#### 6. Flujo de Comandos gcloud para el Examen ACE

```bash
# 1. Crear un bucket con Uniform Bucket-Level Access en una ubicación específica
gcloud storage buckets create gs://mi-empresa-media-bucket \
    --location=us-central1 \
    --default-storage-class=STANDARD \
    --uniform-bucket-level-access

# 2. Habilitar el versionado de objetos (Object Versioning)
gcloud storage buckets update gs://mi-empresa-media-bucket \
    --versioning

# 3. Consultar el estado del bucket y confirmar versionado
gcloud storage buckets describe gs://mi-empresa-media-bucket \
    --format="yaml(versioning_enabled)"

# 4. Listar todas las versiones de objetos (incluyendo versiones archivadas)
gcloud storage objects list --all-versions gs://mi-empresa-media-bucket/

# 5. Aplicar una política de ciclo de vida desde archivo JSON
cat <<EOF > lifecycle.json
{
  "rule": [
    {
      "action": {"type": "Delete"},
      "condition": {
        "numNewerVersions": 3,
        "isLive": false
      }
    },
    {
      "action": {"type": "Delete"},
      "condition": {
        "age": 365
      }
    }
  ]
}
EOF
gcloud storage buckets update gs://mi-empresa-media-bucket \
    --lifecycle-file=lifecycle.json
```

---

### 🔀 4.3 Clases de Almacenamiento, Autoclass y Mecanismos de Transferencia de Datos

Cloud Storage ofrece una gama de clases de almacenamiento y herramientas de ingestión diseñadas para optimizar costos sin sacrificar rendimiento ni disponibilidad operativa.

#### 1. Comparativa de las 4 Clases de Almacenamiento

| Clase de Almacenamiento | Frecuencia de Acceso | Permanencia Mínima | Cobro por Recuperación | Caso Predilecto de Examen ACE |
| :--- | :--- | :--- | :--- | :--- |
| **Standard Storage** | Frecuente (*Hot Data*) o retención muy breve | 0 días (sin mínimo) | Sin cobro por recuperación (*No retrieval fee*) | Sitios web interactivos, distribución de video en streaming, datos procesados activamente por pipelines. |
| **Nearline Storage** | Infrecuente (en promedio 1 vez al mes o menos) | 30 días | Tarifa reducida por GB leído | Copias de seguridad mensuales, activos multimedia de cola larga (*long-tail*), informes periódicos. |
| **Coldline Storage** | Muy infrecuente (1 vez cada 90 días o menos) | 90 días | Tarifa moderada por GB leído | Backups trimestrales, planes de recuperación ante desastres (DR) secundarios. |
| **Archive Storage** | Excepcional (menos de 1 vez al año) | 365 días | Tarifa más alta por GB leído y por operación | Datos históricos de cumplimiento legal, fiscal o regulatorio; copias de seguridad de último recurso. |

* **Atributos Universales Compartidos por Todas las Clases:**
  * **Latencia en Milisegundos:** A diferencia de soluciones de la competencia, **todas** las clases (incluyendo Coldline y Archive) devuelven el primer byte en milisegundos sin requerir procesos de descongelación ni esperas de horas.
  * **Durabilidad Idéntica:** 99.999999999% (11 nueves) de durabilidad anual de objetos en todas las clases.
  * **Sin Mínimos de Tamaño:** No hay requisito de tamaño mínimo por objeto.
  * **Geo-redundancia:** En configuraciones Multi-Region y Dual-Region, los datos se almacenan redundantes en centros de datos separados físicamente para mitigar riesgos catastróficos.
  * **Consistencia y APIs:** La misma API REST, herramientas CLI (`gcloud storage`) y modelos IAM aplican de manera uniforme.

#### 2. Autoclass: Gestión Dinámica y Automatizada de Costos

* **¿Qué es Autoclass?** Es una característica nativa a nivel de bucket que adapta automáticamente la clase de almacenamiento de cada objeto en función de su patrón de acceso real, simplificando radicalmente la gobernanza financiera:
  * **Enfriamiento Automático:** Si un objeto no se consulta durante un periodo prolongado, Autoclass lo degrada progresivamente a clases más económicas (Nearline → Coldline → Archive).
  * **Calentamiento Inmediato:** En el instante en que un objeto frío es accedido, Autoclass lo promueve automáticamente a **Standard Storage**, eliminando futuras penalizaciones de recuperación.
* **Sin cuotas fijas previas:** Cloud Storage no exige aprovisionamiento previo de capacidad; se factura estrictamente por el almacenamiento y operaciones consumidas.

#### 3. Cifrado y Seguridad por Defecto

* **Cifrado en Reposo:** Cifrado automático del lado del servidor antes de escribir los datos en discos físicos, sin costo adicional (por defecto mediante claves gestionadas por Google - GMEK, con opción de llaves CMEK vía Cloud KMS o CSEK del cliente).
* **Cifrado en Tránsito:** Todo el tráfico entre clientes y Google Cloud viaja cifrado de forma predeterminada mediante protocolos seguros HTTPS / TLS (Transport Layer Security).

#### 4. Opciones de Transferencia e Ingestión de Datos

| Herramienta | Escala de Datos | Conectividad / Origen | Caso de Uso Primordial |
| :--- | :--- | :--- | :--- |
| **`gcloud storage` (Cloud SDK)** | Megabytes a pocos Terabytes | Línea de comandos / Scripts / VMs | Operaciones diarias de administración, automatizaciones CI/CD, sincronización con `gcloud storage rsync`. |
| **Cloud Console (Drag & Drop)** | Cargas puntuales (< pocos GB) | Navegador web Google Chrome | Carga interactiva rápida y pruebas iniciales en la interfaz gráfica. |
| **Storage Transfer Service** | Terabytes a Petabytes online | AWS S3, Azure Blob, buckets de Cloud Storage, URLs HTTP(S), on-premises | Transferencias masivas en red totalmente gestionadas; programación de sincronizaciones por lotes recurrentes sin consumir cómputo local. |
| **Transfer Appliance** | Decenas de Terabytes a Petabytes masivos offline | Servidor físico en rack para datacenter on-premises | Migraciones de gran escala donde el ancho de banda de red hacia internet es insuficiente o tardaría semanas/meses. El equipo (hasta 1 PB) se envía por mensajería segura a Google. |

#### 5. Integración con el Ecosistema Google Cloud

* **Bases de Datos & Analítica:** Importación y exportación de tablas y respaldos desde BigQuery y Cloud SQL.
* **Cómputo (Compute Engine):** Alojamiento de imágenes de disco personalizadas y scripts de inicio (*startup scripts*).
* **Serverless (App Engine & Cloud Run):** Almacenamiento de archivos multimedia, activos estáticos y volcados de logs.
* **NoSQL (Firestore):** Exportación y restauración automatizada de colecciones de documentos.

---

### 🗄️ 4.4 Cloud SQL: Bases de Datos Relacionales Gestionadas, Escalabilidad, Replicación y Conectividad

Cloud SQL es el servicio totalmente gestionado de bases de datos relacionales (*Database as a Service - DBaaS*) en Google Cloud, diseñado para simplificar el aprovisionamiento, operación y alta disponibilidad de cargas de trabajo transaccionales basadas en SQL.

#### 1. Motores Soportados y Descarga de Responsabilidad Operativa

* **Motores Oficiales:**
  * **Cloud SQL for MySQL** (versiones 5.6, 5.7, 8.0, 8.4)
  * **Cloud SQL for PostgreSQL** (versiones 9.6 a 17)
  * **Cloud SQL for SQL Server** (ediciones 2017, 2019, 2022: Express, Web, Standard, Enterprise)
* **Gestión Automatizada por Google:**
  * Eliminación de instalación de software, aprovisionamiento de máquinas base y parches del sistema operativo.
  * Aplicación desatendida de parches y actualizaciones de seguridad del motor de base de datos.
  * Gestión automatizada de copias de seguridad continuas y replicación.

#### 2. Límites de Capacidad y Escalado Vertical (*Scale-up*)

| Recurso | Límite Máximo por Instancia | Consideraciones Operativas |
| :--- | :--- | :--- |
| **Cómputo (vCPU)** | Hasta **128 vCPUs** | Escalado vertical dinámico con breves ventanas de mantenimiento. |
| **Memoria RAM** | Hasta **864 GB de RAM** | Soporte para cargas intensivas en memoria y cachés de buffer pool extendidas. |
| **Almacenamiento** | Hasta **64 TB** | Discos SSD o HDD estándar; soporte de auto-incremento automático (*automatic storage increase*) sin tiempo de inactividad. |

#### 3. Replicación, Alta Disponibilidad (HA) y Recuperación

* **Alta Disponibilidad Regional (High Availability):**
  * Configuración primaria y de respaldo (*standby*) distribuidas en diferentes zonas dentro de la misma región.
  * Replicación síncrona a nivel de almacenamiento mediante discos persistentes regionales.
  * Conmutación automática por error (*failover*) sin pérdida de datos en caso de caída zonal.
* **Escenarios de Replicación Soportados:**
  * **Réplicas de lectura (Read Replicas):** Descarga de tráfico de consultas analíticas y de lectura en la misma región o en regiones secundarias (*Cross-Region*).
  * **Replicación desde primarios externos:** Migración continua desde servidores on-premises o de otras nubes hacia Cloud SQL.
  * **Replicación hacia instancias externas:** Replicación de cambios desde Cloud SQL primario hacia bases de datos externas.
* **Respaldos Gestionados (Managed Backups):**
  * El coste de la instancia incluye un historial predeterminado de **7 copias de seguridad automatizadas**.
  * Recuperación a un punto en el tiempo (*Point-in-Time Recovery - PITR*) mediante registros de transacciones (*binary logs* / *WAL*).

#### 4. Seguridad, Cifrado y Mecanismos de Conexión

* **Cifrado Integral:**
  * Cifrado en reposo para tablas de bases de datos, archivos temporales y copias de seguridad mediante claves gestionadas por Google (GMEK) o claves de cliente (CMEK).
  * Cifrado en tránsito mediante SSL/TLS en las redes internas de Google y conexiones entrantes.
* **Modelos de Acceso a la Red:**
  1. **Private Services Access (Private IP):** Conexión privada directa dentro de la red VPC mediante emparejamiento interno (*VPC Peering*), evitando la exposición a la Internet pública (estándar recomendado).
  2. **Cloud SQL Auth Proxy:** Conector de seguridad local que autentica dinámicamente mediante IAM y cifra el tráfico mediante mTLS de 256 bits sin necesidad de gestionar certificados SSL estáticos ni abrir puertos de cortafuegos.
  3. **Redes Autorizadas (Authorized Networks):** Cortafuegos de red basado en listas blancas de direcciones IP públicas externas autorizadas.
* **Co-ubicación Zonal (Zone Colocation):**
  * Para minimizar la latencia de red entre la capa de aplicación y la de datos, se recomienda desplegar la instancia de Cloud SQL en la **misma zona** donde residen las máquinas virtuales de Compute Engine.

#### 5. Flujo de Comandos gcloud para el Examen ACE

```bash
# 1. Crear una instancia gestionada de Cloud SQL MySQL con Alta Disponibilidad (HA)
gcloud sql instances create db-produccion \
    --database-version=MYSQL_8_0 \
    --tier=db-custom-4-16384 \
    --region=us-central1 \
    --availability-type=REGIONAL \
    --storage-size=100GB \
    --storage-auto-increase \
    --backup-start-time=03:00

# 2. Configurar la contraseña de usuario root
gcloud sql users set-password root \
    --host=% \
    --instance=db-produccion \
    --password="SuperSecureAdminPassword2026!"

# 3. Crear una base de datos lógica para la aplicación
gcloud sql databases create app_production \
    --instance=db-produccion

# 4. Crear una réplica de lectura para balancear consultas
gcloud sql instances create db-produccion-replica \
    --master-instance-name=db-produccion \
    --tier=db-custom-2-8192 \
    --region=us-central1
```

---

### 🌐 4.5 Cloud Spanner: Base de Datos Relacional Distribuida Global, Consistencia Fuerte y Escala Horizontal

Cloud Spanner es el motor de base de datos relacional distribuida a escala planetaria de Google Cloud. Proporciona las garantías transaccionales ACID y el lenguaje SQL estándar de los motores relacionales tradicionales, combinados con la escalabilidad horizontal y alta disponibilidad de los sistemas NoSQL.

#### 1. Los Tres Pilares de Spanner

1. **Escalado Horizontal Ilimitado (Scale-out):**
   * A diferencia de los motores RDBMS tradicionales (que requieren escalar verticalmente aumentando vCPU y RAM), Spanner escala horizontalmente añadiendo nodos de computación transparentemente sin tiempo de inactividad.
   * Admite particionado y fragmentación de datos (*sharding*) totalmente automatizado.
2. **Consistencia Fuerte Externa (External Consistency):**
   * Gracias a la infraestructura global de sincronización de tiempo de Google basada en relojes atómicos y satélites GPS (**TrueTime API**), Spanner garantiza que las transacciones concurrentes a escala global se ordenen secuencialmente de manera estricta y predecible.
3. **Sintaxis SQL Estándar (ANSI SQL 2011):**
   * Admite esquemas estructurados, transacciones multi-tabla y multi-fila, operaciones `JOIN` complejas e índices secundarios (*Secondary Indexes*).

#### 2. Rendimiento, Cargas de Trabajo y Misión Crítica

* **Capacidad de Entrada y Salida (IOPS):**
  * Diseñado para absorber decenas de miles a millones de operaciones de lectura y escritura por segundo (*IOPS*) con latencias de un solo dígito de milisegundo.
* **Infraestructura Probada:**
  * Es el motor de persistencia central que sustenta los productos de mayor escala de Google (Google Ads, Play Store, Gmail, YouTube) con un impacto de negocio multimillonario.
* **Disponibilidad Garantizada por SLA:**
  * **Configuraciones Regionales:** 99.99% de disponibilidad (cuatro nueves).
  * **Configuraciones Multi-Región:** **99.999%** de disponibilidad (cinco nueves, menos de 5 minutos de inactividad permitida al año) con replicación multi-zonal y multi-regional automática.

#### 3. Matriz Comparativa: Cloud Spanner vs Cloud SQL (Criterios ACE)

| Criterio | Cloud SQL | Cloud Spanner |
| :--- | :--- | :--- |
| **Tipo de Escalado** | Vertical (*Scale-up* cambiando tier de máquina) | Horizontal (*Scale-out* agregando nodos/unidades de procesamiento) |
| **Límite de Almacenamiento** | Hasta 64 TB por instancia | Prácticamente ilimitado (Petabytes de datos relacionales) |
| **Garantías Transaccionales** | Regionales (ACID dentro de la instancia) | Globales / Multi-región (ACID distribuido con consistencia fuerte) |
| **SLA de Disponibilidad** | Hasta 99.95% (Alta Disponibilidad Regional) | 99.99% (Regional) / 99.999% (Multi-Región) |
| **Mantenimiento y Sharding** | Administración manual de fragmentación si > 64 TB | Sharding automático transparente gestionado por Google |
| **Casos Predilectos de Examen** | Aplicaciones web estándar, sistemas departamentales, ERP/CRM locales | Banca internacional, pasarelas de pago globales, sistemas de inventario y reservas en tiempo real de escala masiva |

#### 4. Flujo de Comandos gcloud para el Examen ACE

```bash
# 1. Crear una instancia de Cloud Spanner (configuración regional o multi-región)
gcloud spanner instances create mi-spanner-instance \
    --config=regional-us-central1 \
    --description="Instancia de Produccion Spanner" \
    --nodes=1

# 2. Crear una base de datos dentro de la instancia
gcloud spanner databases create produccion-db \
    --instance=mi-spanner-instance

# 3. Definir esquema DDL con tabla e índice secundario
gcloud spanner databases ddl update produccion-db \
    --instance=mi-spanner-instance \
    --ddl="CREATE TABLE Clientes (
             ClienteId STRING(36) NOT NULL,
             Nombre STRING(100) NOT NULL,
             Email STRING(100) NOT NULL,
             FechaRegistro TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)
           ) PRIMARY KEY (ClienteId);
           CREATE UNIQUE INDEX ClientesPorEmail ON Clientes (Email);"

# 4. Escalar la capacidad de la instancia sin tiempo de inactividad
gcloud spanner instances update mi-spanner-instance \
    --nodes=3
```

---

### 📄 4.6 Firestore: Base de Datos de Documentos NoSQL Serverless, Sincronización en Tiempo Real y Modo Offline

Firestore es una base de datos de documentos NoSQL completamente sin servidor (*serverless*), diseñada para proporcionar escalabilidad elástica automática, sincronización reactiva en tiempo real y persistencia local sin conexión para aplicaciones móviles, web y servidores.

#### 1. Modelo de Datos Orientado a Documentos

* **Documentos (Documents):**
  * Unidad mínima de almacenamiento; cada documento contiene un conjunto de campos en pares clave-valor (cadenas, números, booleanos, timestamps, geolocalizaciones y objetos anidados complejos en formato compatible con JSON).
* **Colecciones (Collections):**
  * Contenedores que agrupan documentos de forma organizada. Todo documento pertenece obligatoriamente a una colección.
* **Subcolecciones (Subcollections):**
  * Colecciones contenidas dentro de un documento individual, permitiendo estructurar jerarquías de datos relacionales (por ejemplo: `usuarios/{userId}/pedidos/{pedidoId}`) sin desnormalizar la información.

#### 2. Consultas NoSQL e Indexación Automática

* **Rendimiento Independiente del Tamaño de la Base de Datos:**
  * En Firestore, **todos los campos de un documento se indexan automáticamente de forma predeterminada**.
  * La latencia y rendimiento de una consulta dependen exclusivamente del **tamaño del conjunto de resultados devuelto**, y **NO** del volumen total de documentos almacenados en la colección (una búsqueda que retorna 10 registros tarda prácticamente lo mismo si la colección contiene mil o cien millones de documentos).
* **Filtros Encadenados y Ordenación:**
  * Permite combinar operadores de comparación (`where`), ordenación (`orderBy`) y límites de registros (`limit`).
  * Requiere índices compuestos (*composite indexes*) únicamente para consultas que combinan filtros de desigualdad en múltiples campos distintos.

#### 3. Sincronización en Tiempo Real y Modo Offline

* **Sincronización Reactiva (Real-Time Data Sync):**
  * Los clientes pueden adjuntar escuchadores (*listeners*) en tiempo real a documentos o consultas. Cuando un valor cambia en la nube, la actualización se propaga instantáneamente a todos los dispositivos conectados mediante WebSockets/HTTP2.
* **Caché y Persistencia Offline:**
  * Firestore almacena en caché local los datos que la aplicación está utilizando activamente en el dispositivo móvil o navegador web.
  * La aplicación puede leer, escribir y consultar datos sin interrupción aun cuando el dispositivo pierde la conectividad a internet.
  * Cuando el dispositivo recupera la conexión, Firestore sincroniza automáticamente las modificaciones locales acumuladas con la base de datos central en la nube.
* **Consultas Puntuales (One-Time Fetch):**
  * Admite operaciones de lectura convencionales bajo demanda para servicios backend en Cloud Run o Compute Engine.

#### 4. Resiliencia, Replicación y Garantías ACID

* **Replicación Multi-Región Automática:** Garantiza alta disponibilidad de hasta 99.999% con sincronización geográfica transparente entre múltiples centros de datos.
* **Consistencia Fuerte (Strong Consistency):** Proporciona lecturas fuertemente consistentes en todas las consultas y accesos directos por clave.
* **Transacciones y Operaciones Atómicas:**
  * **Escrituras por Lotes (Batched Writes):** Permite ejecutar hasta 500 escrituras en un solo bloque atómico (*all-or-nothing*).
  * **Transacciones ACID:** Garantiza aislamiento y serialización estricta ante accesos concurrentes.

#### 5. Flujo de Comandos gcloud para el Examen ACE

```bash
# 1. Crear una base de datos Firestore en modo nativo en una región específica
gcloud firestore databases create \
    --location=nam5 \
    --type=firestore-native

# 2. Exportar documentos y colecciones hacia Cloud Storage para respaldo
gcloud firestore export gs://mi-backup-bucket/firestore-exports/ \
    --collection-ids='usuarios,pedidos'

# 3. Importar una copia de seguridad desde Cloud Storage
gcloud firestore import gs://mi-backup-bucket/firestore-exports/2026-11-12T11:20:00/
```

---

### 🐘 4.7 Cloud Bigtable: Base de Datos NoSQL Columnar Masiva, Latencia Sub-10ms y Streaming IoT

Cloud Bigtable es el servicio de base de datos NoSQL de columnas anchas (*wide-column store*) de nivel empresarial en Google Cloud, optimizado para procesar volúmenes masivos de datos estructurados y semiestructurados con latencias consistentes de un solo dígito de milisegundo (< 10 ms) y altísimo rendimiento de lectura/escritura (*throughput*).

#### 1. Tecnología Núcleo y Arquitectura de Desacoplamiento

* **Motor Probado a Escala Mundial:**
  * Es la misma infraestructura interna de Google que impulsa servicios globales de escala crítica como **Google Search**, **Google Analytics**, **Google Maps** y **Gmail**.
* **Desacoplamiento de Cómputo y Almacenamiento:**
  * Los nodos de un clúster de Bigtable gestionan y enrutan peticiones pero no almacenan datos localmente en sus discos; el almacenamiento reside de forma persistente y redundante en el sistema de archivos distribuido de Google (**Colossus**).
  * Esta arquitectura permite añadir o eliminar nodos de computación en segundos sin necesidad de mover ni reequilibrar datos físicamente entre servidores.

#### 2. Los 6 Criterios de Selección Oficiales para Bigtable (Reglas de Decisión ACE)

Google Cloud establece 6 indicadores clave para determinar la idoneidad de Cloud Bigtable:

1. **Volumen de Datos Masivo (> 1 TB):** Diseñado específicamente para almacenar desde 1 TB hasta múltiples petabytes de datos. Para volúmenes menores a 1 TB, el costo mínimo por clúster no es eficiente frente a Firestore o Cloud SQL.
2. **Alta Velocidad y Frecuencia de Escrituras (*High Throughput*):** Cargas continuas de cientos de miles a millones de operaciones por segundo sin degradación de latencia.
3. **Datos NoSQL sin Relaciones Rígidas:** No requiere transacciones multi-tabla complejas, relaciones de claves foráneas ni operaciones JOIN pesadas; las transacciones son atómicas a nivel de una sola fila (*single-row atomicity*).
4. **Series Temporales u Ordenación Semántica Natural:** Métricas continuas de sensores IoT, telemetría de flotas, logs de clics web (*clickstreams*) o registros de transacciones financieras donde la clave de fila se diseña para búsquedas por rangos secuenciales.
5. **Cargas Híbridas de Streaming y Batch:** Capacidad simultánea de ingerir millones de eventos en tiempo real y alimentar trabajos analíticos por lotes.
6. **Entrenamiento y Servido de Modelos de Machine Learning:** Uso como almacén de características (*feature store*) para alimentar algoritmos predictivos y de inferencia en tiempo real.

#### 3. Ecosistema de Ingestión, Streaming y Analítica

* **Compatibilidad con Apache HBase:**
  * Soporta nativamente la API de código abierto **Apache HBase**, lo que permite migrar aplicaciones del ecosistema Hadoop sin rediseñar el código fuente ni los drivers de clientes Java.
* **Procesamiento de Flujos en Tiempo Real (*Streaming*):**
  * Ingesta masiva continua desde **Cloud Dataflow (Apache Beam)**, **Apache Spark Streaming** y **Apache Storm**.
* **Procesamiento por Lotes (*Batch Processing*):**
  * Análisis a gran escala mediante pipelines en **Dataproc (Hadoop MapReduce / Spark)** y **Dataflow Batch**.
* **Servido de Datos Aguas Abajo:**
  * Almacenamiento intermedio de cálculos agregados y sincronización hacia almacenes de analítica como **BigQuery** o repositorios en **Cloud Storage**.

#### 4. Flujo de Comandos gcloud para el Examen ACE

```bash
# 1. Crear una instancia de Cloud Bigtable para producción con 3 nodos
gcloud bigtable instances create mi-bigtable-instance \
    --display-name="Telemetria IoT Produccion" \
    --cluster-config=id=mi-cluster-c1,zone=us-central1-b,nodes=3,kms-key=""

# 2. Listar clústeres y estado de la instancia
gcloud bigtable instances describe mi-bigtable-instance

# 3. Crear una tabla con una familia de columnas (column family)
gcloud bigtable tables create mi-tabla-sensores \
    --instance=mi-bigtable-instance \
    --column-families=metricas

# 4. Escalar horizontalmente el número de nodos en respuesta a picos de carga
gcloud bigtable clusters update mi-cluster-c1 \
    --instance=mi-bigtable-instance \
    --num-nodes=6
```

---

### ⚖️ 4.8 Comparativa Integral de Opciones de Almacenamiento y Matriz de Decisión (Storage Decision Blueprint)

Para diseñar soluciones óptimas en la nube y responder con precisión en el examen Google Cloud ACE, es fundamental contrastar los motores de almacenamiento analizando sus capacidades, limitaciones de unidad, patrones de consulta y modelos de concurrencia.

#### 1. Matriz de Síntesis Comparativa Oficial

| Servicio de Almacenamiento | Naturaleza del Dato | Capacidad Total | Tamaño Máximo por Unidad | Modelo de Consulta / Semántica | Cuándo Seleccionarlo en el Examen ACE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cloud Storage** | Binarios no estructurados (BLOBs inmutables) | Petabytes masivos | **5 TB** por objeto | RESTful HTTP / SDK / gcloud (Sin SQL) | Datos no estructurados > 10 MB (imágenes, video, backups, distribución web estática). |
| **Cloud SQL** | Estructurados relacionales (OLTP regional) | Hasta **64 TB** | Limitado por motor/disco | SQL estándar (MySQL / Postgres / SQL Server); ACID | Aplicaciones web estándar, frameworks CMS/ERP, carritos de compra y transacciones ACID en 1 región. |
| **Cloud Spanner** | Estructurados relacionales (OLTP planetario) | Petabytes masivos | Tablas distribuidas sin límite práctico | SQL ANSI 2011; ACID distribuido con TrueTime | Sistemas financieros y reservas globales que requieren escala horizontal y disponibilidad 99.999%. |
| **Firestore** | Documentos semiestructurados NoSQL | Terabytes | **1 MB** por documento / entidad | NoSQL (Filtros, ordenación, listeners reactivos); ACID | Apps móviles y web que requieren sincronización bidireccional en tiempo real y soporte offline local. |
| **Cloud Bigtable** | NoSQL Columnar masivo | Petabytes masivos | **10 MB** por celda / **100 MB** por fila | NoSQL (HBase API, Row Key); Atomicidad por fila única | Telemetría IoT, AdTech, cotizaciones financieras y analítica sub-10ms sobre más de 1 TB. |
| **BigQuery** | Almacenamiento analítico columnar (OLAP) | Petabytes masivos | Tablas particionadas masivas | SQL interactivo distribuido masivo (MPP) | Data warehousing empresarial, reporting analítico complejo, minería de datos y dashboards de BI. |

#### 2. Restricciones Técnicas por Unidad Críticas para el Examen ACE

* **Cloud Storage**: Límite de **5 TB** por objeto individual; recomendado prioritariamente para archivos que superen los **10 MB**.
* **Firestore**: Límite estricto de **1 MB** por documento/entidad. Antipatrón de examen: almacenar archivos multimedia binarios pesados dentro de Firestore (se deben guardar en Cloud Storage y registrar solo su URL en el documento).
* **Cloud Bigtable**: Máximo de **10 MB** por celda y **100 MB** por fila completa. No soporta transacciones multi-fila ni consultas SQL tradicionales.
* **Cloud SQL**: Techo de capacidad vertical de **64 TB** por instancia. No admite escalabilidad horizontal de escrituras.
* **Cloud Spanner**: Escala horizontal transparente para lecturas y escrituras mediante adición de nodos de computación, superando el límite de 64 TB sin requerir sharding manual.

#### 3. El Rol de BigQuery en la Estrategia de Almacenamiento

* BigQuery se ubica en el límite entre el almacenamiento de datos masivos y el procesamiento analítico distribuido.
* No debe utilizarse como almacén transaccional operativo para aplicaciones de usuarios en línea (OLTP), sino como motor de almacenamiento columnar para consultas de agregación masiva, machine learning (*BigQuery ML*) y análisis de series históricas sobre terabytes o petabytes con SQL interactivo.

#### 4. Árbol de Decisión Rápido para el Examen ACE

```
¿Los datos son No Estructurados (Archivos, Medios, Backups)?
├── SÍ ───> Cloud Storage (Objetos inmutables hasta 5 TB)
└── NO
    ├── ¿Requiere soporte transaccional ACID completo con lenguaje SQL?
    │   ├── SÍ (Escala regional y < 64 TB) ──────────────────────> Cloud SQL
    │   └── SÍ (Escala multi-región/global, > 64 TB o Scale-out) ─> Cloud Spanner
    └── NO (Modelo NoSQL)
        ├── ¿Es para apps móviles/web con sincronización en vivo y soporte offline?
        │   └── SÍ (Documentos < 1 MB) ───────────────────────────> Firestore
        └── ¿Es para Big Data (> 1 TB), IoT o analítica masiva sub-10ms?
            └── SÍ ───────────────────────────────────────────────> Cloud Bigtable
```

---

### 📝 4.9 Cuestionario Oficial de Evaluación: Módulo 4 (Syllabus Quiz)

Evaluación oficial del Módulo 4 (*Quiz ID: 689578 | Passing Score: 66%*):

#### Pregunta 1
* **Enunciado:** *Which storage use case is best suited for Google Cloud Storage?*
* **Opciones:**
  * Running transactional relational database management system (RDBMS) workloads.
  * Serving as an enterprise data warehouse for complex SQL analytics.
  * ✅ **Storing unstructured data that requires high durability and availability.** *(Respuesta Correcta)*
  * Hosting the root file system of a Compute Engine virtual machine instance.
* **Justificación Oficial & Enfoque ACE:** Cloud Storage es el servicio de almacenamiento de objetos (*BLOBs*) no estructurados de Google Cloud. Proporciona durabilidad anual de 11 nueves (99.999999999%) y alta disponibilidad mundial sin aprovisionamiento previo. Las cargas RDBMS requieren Cloud SQL o Spanner, los almacenes analíticos empresariales requieren BigQuery y los discos raíz de VMs demandan almacenamiento en bloques mediante Persistent Disks.

#### Pregunta 2
* **Enunciado:** *For what primary use case should an organization choose the Coldline storage class in Cloud Storage?*
* **Opciones:**
  * To minimize overall costs for data that is read and updated frequently.
  * ✅ **To minimize monthly storage costs for data accessed less than once a quarter.** *(Respuesta Correcta)*
  * To execute faster data transfers using a dedicated storage API.
  * To apply stricter access control and encryption mechanisms to sensitive data.
* **Justificación Oficial & Enfoque ACE:** La clase **Coldline Storage** está optimizada para minimizar el costo mensual de almacenamiento en reposo de datos con un patrón de acceso muy infrecuente (a lo sumo **una vez cada 90 días o trimestre**), con un periodo de permanencia mínima de 90 días. Todas las clases de Cloud Storage comparten la misma API, idénticos mecanismos de cifrado y entregan el primer byte con latencias de milisegundos.

#### Pregunta 3
* **Enunciado:** *A company requires a relational database service that can scale horizontally to petabytes of data while maintaining high availability. Which Google Cloud service meets this requirement?*
* **Opciones:**
  * ✅ **Spanner** *(Respuesta Correcta)*
  * Firestore
  * Cloud SQL
  * Bigtable
* **Justificación Oficial & Enfoque ACE:** **Cloud Spanner** es la única solución gestionada de Google Cloud que une el modelo relacional ANSI SQL (con transacciones ACID completas) con la escalabilidad horizontal (*scale-out*) elástica a escala de petabytes y alta disponibilidad garantizada por SLA de hasta el 99.999%. Cloud SQL escala solo verticalmente hasta 64 TB, mientras que Firestore y Bigtable pertenecen al paradigma NoSQL sin modelo relacional formal.

---

## 📦 5. Módulo 5: Contenedores en la Nube y Kubernetes (Containers in the Cloud)

### 📦 5.1 Introducción a los Contenedores: Virtualización del SO, Eficiencia y Microservicios

Los contenedores representan la evolución de los modelos de cómputo en la nube, actuando como un puente estratégico que combina la **flexibilidad y personalización de IaaS** con la **agilidad, portabilidad y autoescalado de PaaS**.

#### 1. Comparativa Arquitectónica: IaaS vs PaaS vs Contenedores

| Paradigma de Cómputo | Nivel de Abstracción / Virtualización | Unidad Mínima de Cómputo | Velocidad de Arranque / Sobrecarga | Portabilidad y Flexibilidad |
| :--- | :--- | :--- | :--- | :--- |
| **IaaS (Compute Engine)** | Virtualización de Hardware (Hipervisor) | Máquina Virtual completa con SO invitado (*Guest OS*) | Minutos (SO completo de varios GBs) | Control total de kernel, drivers y SO; portabilidad limitada por dependencias del sistema anfitrión. |
| **PaaS (App Engine)** | Abstracción de Plataforma y Runtime | Código de aplicación o módulo | Rápido (gestionado por la plataforma) | Cero gestión de SO; menor flexibilidad para versiones personalizadas, librerías del sistema o configuraciones de bajo nivel. |
| **Contenedores (GKE / Cloud Run)** | Virtualización del Sistema Operativo (Kernel compartido) | Contenedor (código + dependencias mínimas) | **Segundos o milisegundos** (tan rápido como un proceso ordinario) | **Ultra-portable**: se ejecuta idéntico en desarrollo local, staging, producción o multi-cloud sin recompilar. |

#### 2. Anatomía y Funcionamiento de un Contenedor

* **Caja Lógica Aislada:**
  * Un contenedor empaqueta el código fuente de la aplicación junto con sus bibliotecas, binarios, variables de entorno y archivos de configuración esenciales.
  * Solo requiere que el host posea un **kernel de sistema operativo compatible con contenedores** (Linux o Windows) y un **motor de ejecución de contenedores** (*container runtime* como containerd).
* **Eficiencia en Recursos:**
  * No duplica el kernel ni los controladores del sistema operativo.
  * Su creación requiere apenas un puñado de llamadas al sistema (*system calls* mediante namespaces y cgroups en Linux).
  * Permite alojar docenas o cientos de contenedores simultáneos en una sola máquina virtual o servidor físico, optimizando drásticamente la densidad y el gasto en infraestructura.

#### 3. Arquitectura de Microservicios y Escalabilidad Desacoplada

* **Descomposición Modular:**
  * En lugar de ejecutar una aplicación monolítica dentro de una sola VM pesada, las arquitecturas modernas dividen el sistema en múltiples microservicios independientes empaquetados en contenedores individuales.
* **Escalado Horizontal Selectivo:**
  * Cada microservicio puede escalar hacia arriba (*scale-out*) o hacia abajo de forma autónoma según su propia demanda (por ejemplo, escalar únicamente el servicio de pagos durante promociones sin sobredimensionar el resto de la aplicación).
* **Tolerancia a Fallos:**
  * Si un contenedor o un host falla, el orquestador puede reemplazarlo y reiniciar las instancias afectadas en cuestión de segundos sin interrumpir el servicio global.

#### 4. Google Kubernetes Engine (GKE) como Puente Operativo

* Google Kubernetes Engine (GKE) proporciona la automatización declarativa de PaaS (despliegues continuos, autoescalado de pods y nodos, balanceo de carga integrado y auto-reparación) combinada con el control granular de infraestructura propio de IaaS.

### ⚙️ 5.2 Kubernetes: Arquitectura de Clúster, Pods, Deployments, Services y Rollouts

Kubernetes es una plataforma *open-source* líder para la orquestación, gestión y escalabilidad de cargas de trabajo en contenedores a gran escala, eliminando la sobrecarga manual de administrar máquinas individuales y facilitando la operación de arquitecturas de microservicios.

#### 1. Arquitectura del Clúster: Control Plane y Nodos de Cómputo

Un clúster de Kubernetes se divide fundamentalmente en dos capas operativas:

* **Plano de Control (Control Plane / Master):**
  * Conjunto centralizado de servicios del sistema (`kube-apiserver`, almacén clave-valor `etcd`, `kube-scheduler` y controladores de ciclo de vida).
  * Determina el estado deseado (*desired state*), toma decisiones globales de programación de cargas y detecta y reacciona ante eventos del clúster (como reiniciar réplicas caídas).
  * **En GKE:** El Control Plane está 100% administrado y protegido por Google Cloud sin coste de mantenimiento de infraestructura en el modo estándar, y con SLAs empresariales.
* **Nodos de Trabajo (Worker Nodes):**
  * Instancias de computación donde se ejecutan activamente los contenedores de las aplicaciones.
  * **En GKE:** Cada nodo de trabajo es una **máquina virtual (VM) que corre en Compute Engine** dentro del proyecto del cliente.
  * Cada nodo ejecuta el agente `kubelet` (que se comunica con la API de Kubernetes), el proxy de red `kube-proxy` y el motor de ejecución de contenedores (*container runtime*, habitualmente `containerd`).

#### 2. El Pod: Unidad Mínima de Ejecución y Red

* **Definición Formal:**
  * El Pod es la **unidad atómica más pequeña y básica** que se puede crear, desplegar y gestionar en Kubernetes.
  * Actúa como una envoltura (*wrapper*) alrededor de uno o más contenedores estrechamente interdependientes.
* **Modelo de Contenedor por Pod:**
  * **Regla general (1:1):** La inmensa mayoría de Pods contienen **un único contenedor**.
  * **Multi-contenedor (Patrón Sidecar):** Solo se empaquetan múltiples contenedores dentro del mismo Pod si existe una **dependencia estricta** (*hard dependency*). Ejemplos: un contenedor principal de aplicación web acompañado de un contenedor *sidecar* para sincronización de logs, cifrado de tráfico (mTLS) o actualización dinámica de certificados.
* **Espacio Compartido en el Pod:**
  * **Dirección IP única:** Cada Pod recibe una dirección IP única dentro de la red del clúster. Todos los contenedores de un mismo Pod comparten esta IP y sus puertos, comunicándose entre sí a través de `localhost`.
  * **Almacenamiento compartido:** Los volúmenes montados a nivel de Pod son accesibles de forma simultánea y coordinada por todos sus contenedores.

#### 3. Deployments: Resiliencia, Réplicas y Auto-reparación

* **Propósito:**
  * Abstracción de alto nivel que representa y gestiona un grupo de réplicas idénticas de un mismo Pod.
* **Resiliencia y Auto-reparación (*Self-Healing*):**
  * Los Pods no se crean de forma aislada en producción; se orquestan mediante un Deployment.
  * Si la máquina virtual (nodo) subyacente de Compute Engine se apaga o falla, el controlador de Deployment lo detecta inmediatamente y programa nuevos Pods de reemplazo en otros nodos saludables para cumplir con el número estipulado de réplicas.
* **Escalado Horizontal:**
  * Permite incrementar o reducir réplicas instantáneamente mediante comandos imperativos (`kubectl scale deployment <nombre> --replicas=5`) o modificando el valor de réplicas en el manifiesto declarativo.
  * Compatible con el *Horizontal Pod Autoscaler (HPA)* para escalar dinámicamente en función del uso de CPU, memoria o métricas personalizadas.

#### 4. Services: Abstracción de Red y Endpoints Estables

* **El Problema de las IPs Efímeras:**
  * Los Pods tienen un ciclo de vida dinámico y volátil: se crean, destruyen, reubican y escalan continuamente, recibiendo direcciones IP nuevas y cambiantes.
* **La Solución (Service de Kubernetes):**
  * Un Service es una abstracción que define un grupo lógico de Pods y una política unificada para comunicarse con ellos.
  * Asigna un **punto de enlace persistente con una dirección IP fija** (*ClusterIP*) y un nombre DNS interno estático.
* **Desacoplamiento Arquitectónico (Frontend ↔ Backend):**
  * Los Pods de frontend apuntan al Service del backend, no a las IPs efímeras de los Pods individuales.
  * Los Pods del backend pueden escalar de 2 a 50 réplicas o sufrir reemplazos continuos sin que los Pods de frontend necesiten actualizar sus configuraciones.
* **Exposición Externa e Integración Automática en GKE:**
  * Al declarar un Service con `type: LoadBalancer` en GKE, el controlador de Kubernetes se comunica con las APIs de Google Cloud y **crea automáticamente un Google Cloud Network Load Balancer (NLB)** externo con una IP pública estática/efímera.
  * Cualquier petición externa dirigida a esa IP pública se distribuye de manera balanceada entre los Pods saludables vinculados al Service.

#### 5. Paradigma Imperativo vs Declarativo

| Enfoque | Mecánica Operativa | Herramientas / Comandos | Idoneidad en Entornos Reales |
| :--- | :--- | :--- | :--- |
| **Imperativo** | Se indica a Kubernetes *qué acciones específicas ejecutar paso a paso*. | `kubectl run`, `kubectl expose`, `kubectl scale` | Excelente para pruebas rápidas, depuración exploratoria en laboratorio y validación inmediata. |
| **Declarativo** | Se define en un archivo YAML/JSON el *estado deseado* (*desired state*); Kubernetes determina los pasos para alcanzarlo y mantenerlo. | `kubectl apply -f deployment.yaml` | **Estándar de producción y de examen ACE**: infraestructura reproducible, versionada en Git (GitOps) y auto-reconciliable. |

* **Comandos Fundamentales de Inspección:**
  * `kubectl get pods`: Lista los Pods activos, su estado (*Running*, *CrashLoopBackOff*), reinicios y edad.
  * `kubectl get deployments`: Muestra réplicas deseadas, actuales y disponibles.
  * `kubectl describe deployments <nombre>`: Detalla eventos de programación, selectores de Pod y estrategia de actualización.
  * `kubectl get services`: Muestra IPs de clúster e IPs externas públicas aprovisionadas.

#### 6. Estrategia de Actualización Continua (Rolling Update)

* **Despliegues sin Caída de Servicio (*Zero Downtime*):**
  * Cuando se genera una nueva versión del contenedor, desplegar todas las instancias a la vez interrumpiría el tráfico de usuarios.
  * Kubernetes aplica por defecto una estrategia de **Rolling Update**: crea gradualmente los Pods con la nueva versión del contenedor, verifica que estén sanos y respondiendo mediante chequeos de preparación (*readiness probes*), y solo entonces destruye de manera escalonada los Pods de la versión anterior.
* **Gestión de Versiones:**
  * Se aplica actualizando el archivo YAML y ejecutando `kubectl apply`, o mediante `kubectl rollout`.
  * Permite consultar el historial de versiones con `kubectl rollout history` y revertir anomalías al instante con `kubectl rollout undo`.

### ⚙️ 5.3 Google Kubernetes Engine (GKE): Modos Operativos (Autopilot vs Standard) y Gestión Avanzada

Google Kubernetes Engine (GKE) es la solución gestionada por Google para orquestar contenedores a escala sobre la infraestructura de Google Cloud, unificando la API estándar de Kubernetes con la resiliencia y automatización de la nube de Google.

#### 1. ¿Cómo se diferencia GKE de Kubernetes Puro?

* **Eliminación de la Complejidad del Plano de Control:**
  * En un despliegue autogestionado (*self-managed*) de Kubernetes sobre servidores locales o VMs aisladas, el operador debe aprovisionar, asegurar, respaldar y actualizar continuamente el almacén de estado `etcd`, el servidor de API (`kube-apiserver`), el programador de cargas (`kube-scheduler`) y los controladores del clúster.
  * En GKE, Google se hace cargo de la totalidad de la infraestructura del **Control Plane**: garantiza su alta disponibilidad, realiza respaldos automáticos y proporciona un endpoint seguro (IP pública o privada) hacia el cual se dirigen todas las llamadas de la API de Kubernetes y comandos `kubectl`.

#### 2. Modos Operativos: Autopilot vs Standard

GKE ofrece dos modalidades de consumo y administración según el nivel de control sobre la infraestructura subyacente que requiera la organización:

| Dimensión Técnica | GKE Autopilot (Modo Recomendado) | GKE Standard |
| :--- | :--- | :--- |
| **Enfoque Arquitectónico** | **Centrado en Cargas de Trabajo (*Workload-First*):** El desarrollador se enfoca en los contenedores y manifiestos de Kubernetes; Google gestiona toda la infraestructura física y virtual. | **Centrado en Nodos e Infraestructura (*Node-First*):** El usuario gestiona, dimensiona y optimiza los grupos de máquinas virtuales que conforman los nodos de cómputo. |
| **Gestión de Nodos** | **100% Desatendida:** Aprovisionamiento dinámico de nodos, autoescalado automático, auto-upgrades y auto-repair gestionados por GKE sin intervención manual. | **Manual / Compartida:** El usuario selecciona familias de máquinas (E2, N2, etc.), tipos de disco, tamaños de node pool y configura explícitamente las políticas de autoescalado y mantenimiento. |
| **Postura de Seguridad** | **Endurecida por Defecto:** Aplica las mejores prácticas de seguridad de Google y del estándar CIS Benchmark; elimina acceso SSH a los nodos y restringe capacidades de privilegios inseguros en los contenedores. | **Personalizable:** El operador es responsable de configurar y mantener las directrices de seguridad, blindaje de nodos y políticas de acceso. |
| **Configuración de Red** | Redes nativas de VPC (*VPC-native*) obligatorias con asignación directa de rangos IP para Pods y Services. | Elección entre clústeres nativos de VPC o basados en rutas (*route-based* legacy). |
| **Modelo de Facturación** | **Pago por Recursos Solicitados por Pods:** Se factura exclusivamente por la vCPU, memoria RAM y almacenamiento efímero declarados en los *resource requests* de los Pods en ejecución. | **Pago por Infraestructura de VMs:** Se factura por cada instancia de Compute Engine encendida en el clúster, sin importar el porcentaje real de CPU y memoria que los Pods estén consumiendo. |
| **Comando CLI de Creación** | `gcloud container clusters create-auto <cluster> --region <region>` | `gcloud container clusters create <cluster> --zone <zona>` (o `--region`) |
| **Recomendación de Google** | **Predeterminado para casi todas las cargas de producción:** Máxima eficiencia operativa, reducción radical de tareas de administración y seguridad reforzada. | Solo recomendado cuando se requiere control absoluto sobre el kernel del nodo, instalación de demonios específicos en el host o tipos de máquina muy particulares. |

#### 3. Capacidades Avanzadas de Clúster en GKE

La ventaja estratégica de GKE frente a clústeres autogestionados radica en su integración directa con los servicios troncales de Google Cloud:

1. **Balanceo de Carga Nube Nativo (Cloud Load Balancing):**
   * Integración bidireccional con el tejido de red de Google. Al desplegar un objeto `Service` con `type: LoadBalancer`, GKE aprovisiona automáticamente un Network Load Balancer (NLB) externo o interno.
   * Al utilizar un recurso `Ingress`, GKE aprovisiona un Application Load Balancer global HTTP(S) con soporte Anycast y certificados SSL gestionados sin coste.
2. **Node Pools (Grupos de Nodos Heterogéneos):**
   * Permiten segmentar los nodos de cómputo de un clúster en grupos con diferentes especificaciones de hardware (por ejemplo, un node pool con instancias `c2-standard` de alto rendimiento de cómputo, y otro node pool con aceleradores GPU NVIDIA para tareas de IA/ML).
3. **Cluster Autoscaler (Autoescalador de Nodos):**
   * Evalúa continuamente los Pods en estado pendiente por falta de capacidad en los nodos y aprovisiona nuevas máquinas virtuales de Compute Engine de forma autónoma. Cuando disminuye la carga, drena y apaga las VMs sobrantes para minimizar costes.
4. **Actualizaciones Automáticas de Nodos (Node Auto-Upgrades):**
   * Garantiza que los nodos del clúster se mantengan alineados con las versiones más estables y parcheadas de Kubernetes, gestionando el drenado y reemplazo progresivo de VMs sin interrumpir los servicios.
5. **Auto-reparación de Nodos (Node Auto-Repair):**
   * Monitorea la salud de cada nodo mediante chequeos de disponibilidad periódicos. Si un nodo deja de emitir latidos (*heartbeats*) o reporta fallos de sistema durante un tiempo sostenido, GKE lo reemplaza automáticamente por una nueva VM sana.
6. **Observabilidad Unificada (Google Cloud Observability):**
   * Recolección transparente de registros de contenedores (*stdout* y *stderr*) hacia Cloud Logging y métricas de desempeño (CPU, memoria, latencia de red) hacia Cloud Monitoring sin requerir software de recolección de terceros.

#### 4. Comandos Esenciales de gcloud para GKE

* **Crear clúster en modo Autopilot (Recomendado):**
  ```bash
  gcloud container clusters create-auto produccion-cluster --region us-central1
  ```
* **Crear clúster en modo Standard (con autoescalado de nodos):**
  ```bash
  gcloud container clusters create staging-cluster \
      --region us-central1 \
      --num-nodes 1 \
      --enable-autoscaling --min-nodes 1 --max-nodes 3
  ```
* **Obtener credenciales locales para operar con kubectl:**
  ```bash
  gcloud container clusters get-credentials produccion-cluster --region us-central1
  ```
* **Listar clústeres activos:**
  ```bash
  gcloud container clusters list
  ```

### 📝 5.4 Evaluación y Conceptos de Examen del Módulo 5 (Quiz de Contenedores y GKE)

El cuestionario oficial del Módulo 5 evalúa los fundamentos estructurales de Kubernetes y Google Kubernetes Engine:

#### 1. Concepto Atómico de Pod
* **Pregunta Oficial:** *What is a Kubernetes pod?*
* **Respuesta Correcta:** **A group of containers** (Un grupo de contenedores envueltos lógicamente).
* **Fundamento Arquitectónico:**
  * El Pod es la unidad básica y mínima desplegable en Kubernetes.
  * Encapsula uno o más contenedores que comparten la misma interfaz de red (IP única en el clúster), puertos y volúmenes de almacenamiento.
  * Los contenedores dentro del mismo Pod se comunican entre sí de forma ultra-rápida a través de `localhost`.
  * La separación en múltiples Pods se realiza siempre que los servicios no tengan una dependencia estricta (*hard dependency*).

#### 2. Origen de la Infraestructura en Google Kubernetes Engine (GKE)
* **Pregunta Oficial:** *Where do the resources used to build Google Kubernetes Engine clusters come from?*
* **Respuesta Correcta:** **Compute Engine**.
* **Fundamento Arquitectónico:**
  * Un clúster de GKE está constituido por un grupo de máquinas virtuales de **Compute Engine** que actúan como los nodos de cómputo (*Worker Nodes*).
  * Aunque Google Cloud abstrae la gestión del Control Plane (y en el modo Autopilot también la gestión operativa de los nodos), la capacidad física de procesamiento (vCPUs, RAM, almacenamiento en disco y adaptadores de red) procede de la infraestructura de Compute Engine.

---

## 🛠️ 6. Laboratorios Prácticos del Curso

### Lab 1: Getting Started with Cloud Marketplace (Lab ID: 689558)
* **Objetivo Oficial:** Desplegar de forma rápida y automatizada una pila completa de desarrollo web LAMP sobre una instancia de Compute Engine mediante un solo clic usando Google Cloud Marketplace.
* **Metadatos del Laboratorio:** Nivel Introductorio | Duración: 25 minutos | Créditos: 5.
* **Arquitectura de la Pila LAMP:**
  * **Linux:** Sistema operativo base (Ubuntu 26.04).
  * **Apache HTTP Server:** Servidor web escuchando en el puerto HTTP 80 y HTTPS 443.
  * **MySQL:** Base de datos relacional para almacenamiento estructurado.
  * **PHP:** Lenguaje y framework de scripts del lado del servidor.
  * **phpMyAdmin:** Interfaz gráfica web para administración y consultas de bases de datos MySQL.
* **Flujo Operativo Paso a Paso:**
  1. **Inicio de sesión en Google Cloud Console (Task 1):** Acceso con credenciales temporales generadas por la plataforma Qwiklabs/Skills.
  2. **Despliegue de la solución en Marketplace (Task 2):**
     * Navegación: `Navigation Menu → Marketplace → Buscar "LAMP"`.
     * Solución seleccionada: *LAMP Stack Server on Ubuntu 26.04* (por *Cloud Infrastructure Services*).
     * Términos de servicio y licenciamiento: Aceptar acuerdos y hacer clic en `DEPLOY`.
     * Habilitación de APIs: Habilitar automáticamente la **Compute Engine API** y la **Infrastructure Manager API**.
     * Configuración de cómputo: Seleccionar zona asignada, Serie de máquina **E2**, tipo de máquina **e2-medium** (2 vCPU, 4 GB de memoria).
     * Estado del aprovisionamiento: Transición de `lamp-1 is being deployed` a `lamp-1 has been deployed`.
  3. **Verificación de la Infraestructura (Task 3):**
     * Navegar a `lamp-1-vm > Details`.
     * Abrir el enlace `Site Url` o copiar la dirección IP externa (`External IP`).
     * Comprobar en el navegador el mensaje de felicitaciones que confirma el servidor web Apache en ejecución activa.
* **Relevancia para la Certificación Google Cloud ACE:**
  * Google Cloud Marketplace permite lanzar entornos listos para producción con infraestructura pre-validada por Google y socios comerciales.
  * El aprovisionamiento subyacente utiliza orquestación declarativa automatizada a través de **Infrastructure Manager**, creando discos persistentes, interfaces de red con IP externa efímera y reglas de cortafuegos de acceso HTTP de manera desatendida.

---

### Lab 2: Get Started with Virtual Private Cloud Networking and Compute Engine (Lab ID: 689567)
* **Objetivo Oficial:** Comprender la anatomía operativa de las redes VPC en Google Cloud: explorar y eliminar la red `default` (demostrando que ninguna VM puede existir sin una VPC), recrear una red VPC en modo automático (`mynetwork`), aprovisionar dos máquinas virtuales en regiones distintas y diseccionar el impacto de las reglas de cortafuegos (`allow-icmp`, `allow-custom`, `allow-ssh`) sobre la conectividad externa e interna.
* **Metadatos del Laboratorio:** Nivel Introductorio | Duración: 40 minutos | Créditos: 5.
* **Flujo Operativo Paso a Paso:**
  1. **Explorar y Eliminar la Red Predeterminada (Task 1):**
     * Inspeccionar las subredes regionales automáticas, rutas locales y hacia internet, y las 4 reglas de firewall predefinidas (`default-allow-icmp`, `default-allow-rdp`, `default-allow-ssh`, `default-allow-internal`).
     * Eliminar las reglas de cortafuegos y borrar la red `default`.
     * Intentar crear una VM de Compute Engine sin red VPC: Comprobar el error bloqueante *"no more networks and no network available"*.
  2. **Crear Red VPC Automática y Desplegar VMs Multi-Región (Task 2):**
     * Crear la red VPC `mynetwork` en modo automático (aprovisiona una subred en cada región en el bloque `10.128.0.0/9`) con reglas `allow-custom`, `allow-icmp`, `allow-rdp`, `allow-ssh`.
     * Crear `mynet-us-vm` en Región 1 / Zona 1 (serie E2, `e2-micro`).
     * Crear `mynet-r2-vm` en Región 2 / Zona 2 (serie E2, `e2-micro`).
  3. **Comprobar Conectividad y Efecto de las Reglas de Cortafuegos (Task 3):**
     * Conectar por SSH a `mynet-us-vm` (habilitado por `mynetwork-allow-ssh`).
     * Ping a la IP interna de `mynet-r2-vm` (habilitado por `mynetwork-allow-custom`).
     * Ping a la IP externa de `mynet-r2-vm` (habilitado por `mynetwork-allow-icmp`).
     * **Eliminación de `allow-icmp`:** El ping a la IP externa falla con 100% packet loss, pero el ping a la IP interna continúa funcionando por la regla `allow-custom`.
     * **Eliminación de `allow-custom`:** El ping a la IP interna falla con 100% packet loss (bloqueado por la regla implícita `deny-all-ingress`).
     * **Eliminación de `allow-ssh`:** Los nuevos intentos de conexión SSH fallan con *"Connection failed"*.
* **Comandos gcloud Equivalentes:**
  ```bash
  # 1. Crear red VPC en modo automático
  gcloud compute networks create mynetwork --subnet-mode=auto

  # 2. Recrear las 4 reglas estándar de cortafuegos de ingreso
  gcloud compute firewall-rules create mynetwork-allow-custom \
      --network=mynetwork --direction=INGRESS --priority=65534 \
      --action=ALLOW --rules=tcp,udp,icmp --source-ranges=10.128.0.0/9

  gcloud compute firewall-rules create mynetwork-allow-icmp \
      --network=mynetwork --direction=INGRESS --priority=65534 \
      --action=ALLOW --rules=icmp --source-ranges=0.0.0.0/0

  gcloud compute firewall-rules create mynetwork-allow-ssh \
      --network=mynetwork --direction=INGRESS --priority=65534 \
      --action=ALLOW --rules=tcp:22 --source-ranges=0.0.0.0/0

  gcloud compute firewall-rules create mynetwork-allow-rdp \
      --network=mynetwork --direction=INGRESS --priority=65534 \
      --action=ALLOW --rules=tcp:3389 --source-ranges=0.0.0.0/0

  # 3. Crear instancias en regiones separadas
  gcloud compute instances create mynet-us-vm \
      --zone=us-central1-a --machine-type=e2-micro --network=mynetwork

  gcloud compute instances create mynet-r2-vm \
      --zone=us-east1-b --machine-type=e2-micro --network=mynetwork

  # 4. Probar conectividad interna y externa
  gcloud compute ssh mynet-us-vm --zone=us-central1-a --command="ping -c 3 <INTERNAL-IP-R2>"
  gcloud compute ssh mynet-us-vm --zone=us-central1-a --command="ping -c 3 <EXTERNAL-IP-R2>"
  ```
* **Puntos Clave para la Certificación Google Cloud ACE:**
  * **IPs Efímeras vs Estáticas:** Las IPs externas de las VMs son efímeras por defecto; si la máquina se apaga, la IP se devuelve al pool público y cambia al reiniciarla. Para conservar la IP fija, se debe reservar una IP estática externa.
  * **Reglas Implícitas:** Toda VPC cuenta con dos reglas implícitas inmutables de prioridad 65535: `deny-all-ingress` y `allow-all-egress`.
  * **Diferenciación de Ping:** El ping a una IP pública depende de `allow-icmp` (`0.0.0.0/0`), mientras que entre IPs privadas dentro de la red VPC depende de la regla interna `allow-custom` (`10.128.0.0/9`).

---

### Lab 3: Getting Started with Cloud Storage and Cloud SQL (Lab ID: 689577)
* **Objetivo Oficial:** Aprovisionar un bucket en Cloud Storage para alojar activos multimedia públicos, desplegar una instancia de base de datos relacional gestionada en Cloud SQL for MySQL y configurar una aplicación web PHP sobre Compute Engine para conectarse a la base de datos y renderizar el banner gráfico de Cloud Storage.
* **Metadatos del Laboratorio:** Nivel Introductorio | Duración: 50 minutos | Créditos: 5.
* **Arquitectura de la Solución:**
  * **Servidor Web (Compute Engine):** Instancia `bloghost` (`e2-standard-2`, Debian GNU/Linux 12 bookworm) ejecutando Apache HTTP Server con módulos PHP y `php-mysql`, provisionada mediante script de inicio (*startup script*).
  * **Almacenamiento de Objetos (Cloud Storage):** Bucket multi-región con nombre único global igual al `$DEVSHELL_PROJECT_ID`, alojando la imagen `my-excellent-blog.png` con ACL pública de lectura (`allUsers:R`).
  * **Base de Datos Relacional (Cloud SQL):** Instancia `blog-db` (MySQL Enterprise Sandbox) co-ubicada en la misma región y zona que `bloghost`, con usuario `blogdbuser` y red autorizada restringida a la IP externa de la VM (`/32`).
* **Flujo Operativo Paso a Paso:**
  1. **Aprovisionar la VM del servidor web (Task 2):**
     * Compute Engine → Crear instancia `bloghost` en la región y zona asignada con serie E2 (`e2-standard-2`).
     * Firewall: Habilitar `Allow HTTP traffic`.
     * Startup script (Automation):
       ```bash
       #!/bin/bash
       apt-get update
       apt-get install apache2 php php-mysql -y
       service apache2 restart
       ```
     * Anotar la IP interna y la IP externa de `bloghost`.
  2. **Crear bucket y subir objeto público con gcloud storage (Task 3):**
     ```bash
     # Definir ubicación multi-región (US, EU o ASIA)
     export LOCATION=US
     
     # Crear bucket con nombre único global
     gcloud storage buckets create -l $LOCATION gs://$DEVSHELL_PROJECT_ID
     
     # Descargar imagen oficial y transferir al bucket
     gcloud storage cp gs://cloud-training/gcpfci/my-excellent-blog.png my-excellent-blog.png
     gcloud storage cp my-excellent-blog.png gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png
     
     # Asignar permiso de lectura pública al objeto
     gsutil acl ch -u allUsers:R gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png
     ```
  3. **Aprovisionar y configurar la base de datos Cloud SQL MySQL (Task 4):**
     * Navegación: `Cloud SQL → Create instance → Choose MySQL`.
     * Preajuste: Enterprise Edition Sandbox, Instance ID `blog-db`, contraseña `Passw0rd1!`.
     * Co-ubicación: Misma región y zona específica que `bloghost`.
     * Conectividad y Redes: En `Connections → Networking`, añadir red autorizada `web front end` con el valor `<BLOGHOST_EXTERNAL_IP>/32`.
     * Usuarios: Crear cuenta de usuario `blogdbuser` con contraseña `Passw0rd1!`.
     * Registrar la IP pública asignada a `blog-db`.
  4. **Conectar la aplicación PHP con Cloud SQL (Task 5):**
     * Conectar por SSH a `bloghost` y editar `/var/www/html/index.php`:
       ```php
       <html>
         <head><title>Welcome to my excellent blog</title></head>
         <body>
           <h1>Welcome to my excellent blog</h1>
           <?php
           $dbserver = "<CLOUDSQL_PUBLIC_IP>";
           $dbuser = "blogdbuser";
           $dbpassword = "Passw0rd1!";
           
           try {
               $conn = new PDO("mysql:host=$dbserver;dbname=mysql", $dbuser, $dbpassword);
               $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
               echo "Connected successfully";
           } catch(PDOException $e) {
               echo "Database connection failed: " . $e->getMessage();
           }
           ?>
         </body>
       </html>
       ```
     * Reiniciar Apache (`sudo service apache2 restart`) y validar en navegador `http://<BLOGHOST_EXTERNAL_IP>/index.php` confirmando el mensaje `Connected successfully`.
  5. **Integrar el banner alojado en Cloud Storage (Task 6):**
     * Obtener la URL pública del objeto en Cloud Storage: `https://storage.googleapis.com/<PROJECT_ID>/my-excellent-blog.png`.
     * Editar `/var/www/html/index.php` insertando la etiqueta `<img>` inmediatamente antes de `<h1>`:
       ```html
       <img src='https://storage.googleapis.com/<PROJECT_ID>/my-excellent-blog.png'>
       ```
     * Reiniciar Apache y refrescar el navegador para verificar la renderización gráfica del banner.
* **Puntos Clave y Mejores Prácticas para la Certificación Google Cloud ACE:**
  * **Co-ubicación Zonal:** Desplegar la instancia de base de datos en la misma zona de Compute Engine minimiza la latencia de red entre la aplicación y el motor SQL a niveles inferiores a 1 ms.
  * **Antipatrón de Redes Autorizadas vs Private IP:** En entornos de producción, autorizar IPs públicas con `/32` expone la base de datos a internet; la práctica corporativa recomendada es utilizar **Private IP** con *Private Services Access* (VPC Peering interno) o **Cloud SQL Auth Proxy**.
  * **Antipatrón de Credenciales Hardcodeadas vs Secret Manager:** Incrustar contraseñas en texto plano dentro de archivos en `/var/www/html/` es una vulnerabilidad crítica; se debe implementar **Secret Manager** para inyectar credenciales seguras mediante IAM y la Service Account de la VM.
  * **UBLA vs ACLs de Objeto:** Para evitar riesgos de fuga de información, la gobernanza corporativa prefiere **Uniform Bucket-Level Access (UBLA)** sobre listas de control de acceso (ACLs) individuales.

---

### Lab 4: Hello Cloud Run
* **Objetivo**: Desplegar una aplicación web contenerizada en Cloud Run de forma serverless con autoescalado a cero.
* **Comandos gcloud**:
  ```bash
  # 1. Establecer región predeterminada
  gcloud config set run/region us-central1

  # 2. Desplegar contenedor oficial
  gcloud run deploy hello-cloudrun \
      --image=gcr.io/google-samples/hello-app:1.0 \
      --region=us-central1 \
      --allow-unauthenticated

  # 3. Describir servicio y obtener URL pública
  gcloud run services describe hello-cloudrun --region=us-central1
  ```

---

## 🎯 7. Árbol de Decisión de Cómputo para el Examen ACE

```
¿La carga requiere acceso al kernel, controladores legados o SO personalizado?
├── SÍ ───> Compute Engine (VMs)
└── NO
    ├── ¿Es una aplicación contenerizada con orquestación compleja y plugins de red?
    │   ├── SÍ (Control total de nodos) ────────> GKE Standard
    │   └── SÍ (Operación serverless de nodos) ─> GKE Autopilot
    └── NO
        ├── ¿Es un contenedor o microservicio web sin estado (HTTP / Eventos)?
        │   └── SÍ ───> Cloud Run
        └── ¿Es una función de propósito único disparada por Storage o Pub/Sub?
            └── SÍ ───> Cloud Run Functions
```

---

## 💡 8. Trampas Frecuentes en el Examen ACE

1. **Uso de Roles Básicos en Producción**: Las opciones que recomiendan asignar `roles/editor` o `roles/viewer` para otorgar acceso a buckets o VMs violan el principio de mínimo privilegio. Siempre preferir roles predefinidos (ej. `roles/storage.objectViewer`).
2. **Archivos de Clave JSON en VMs**: Descargar archivos JSON de cuentas de servicio en el disco de una máquina virtual es un antipatrón de seguridad crítico. La práctica oficial recomendada es adjuntar la cuenta de servicio directamente a la VM mediante el Compute Engine Metadata Server.
3. **Subredes en VPC Modo Personalizado**: A diferencia del modo Auto (que crea una subred por región), el modo Custom inicia con 0 subredes; deben ser aprovisionadas explícitamente.
4. **Herencia Aditiva en IAM**: Los permisos concedidos en niveles superiores (Organización o Carpeta) no pueden ser denegados ni restringidos en proyectos o recursos hijos mediante políticas IAM tradicionales.


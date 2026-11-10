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
| **M3: Máquinas Virtuales y Redes** | Redes VPC (Auto vs Custom), Compute Engine, MIGs, Load Balancing, Cloud DNS y Cloud CDN | **Lab 2:** Get Started with VPC Networking and Compute Engine |
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

---

## 🛠️ 4. Laboratorios Prácticos del Curso

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

### Lab 2: Get Started with VPC Networking and Compute Engine
* **Objetivo**: Crear una red VPC en modo personalizado, definir subredes en regiones separadas, configurar reglas de cortafuegos y verificar conectividad privada entre VMs.
* **Comandos gcloud**:
  ```bash
  # 1. Crear red VPC personalizada
  gcloud compute networks create my-custom-vpc \
      --subnet-mode=custom \
      --bgp-routing-mode=regional

  # 2. Crear subredes en us-central1 y us-east1
  gcloud compute networks subnets create subnet-us-central \
      --network=my-custom-vpc \
      --region=us-central1 \
      --range=10.130.0.0/20

  gcloud compute networks subnets create subnet-us-east \
      --network=my-custom-vpc \
      --region=us-east1 \
      --range=10.140.0.0/20

  # 3. Crear regla de firewall para ICMP, SSH y RDP
  gcloud compute firewall-rules create my-custom-vpc-allow-icmp-ssh-rdp \
      --network=my-custom-vpc \
      --direction=INGRESS \
      --priority=1000 \
      --action=ALLOW \
      --rules=icmp,tcp:22,tcp:3389 \
      --source-ranges=0.0.0.0/0

  # 4. Aprovisionar instancias en subredes separadas y validar ping interno
  gcloud compute instances create vm-internal-1 \
      --zone=us-central1-a \
      --machine-type=e2-micro \
      --network=my-custom-vpc \
      --subnet=subnet-us-central

  gcloud compute instances create vm-internal-2 \
      --zone=us-east1-b \
      --machine-type=e2-micro \
      --network=my-custom-vpc \
      --subnet=subnet-us-east
  ```

---

### Lab 3: Getting Started with Cloud Storage and Cloud SQL
* **Objetivo**: Crear un bucket en Cloud Storage con control uniforme de acceso, aprovisionar una instancia gestionada de Cloud SQL MySQL y vincular una VM web como cliente autorizado.
* **Comandos gcloud**:
  ```bash
  # 1. Crear bucket en Cloud Storage con acceso uniforme
  export PROJECT_ID=$(gcloud config get-value project)
  gcloud storage buckets create gs://${PROJECT_ID}-media-bucket \
      --location=us-central1 \
      --default-storage-class=STANDARD \
      --uniform-bucket-level-access

  # 2. Subir objeto de prueba
  echo "Google Cloud Fundamentals Storage Test" > sample.txt
  gcloud storage cp sample.txt gs://${PROJECT_ID}-media-bucket/sample.txt

  # 3. Crear instancia MySQL en Cloud SQL
  gcloud sql instances create my-db-instance \
      --database-version=MYSQL_8_0 \
      --cpu=1 \
      --memory=3840MiB \
      --region=us-central1 \
      --root-password="SuperSecurePassword123!"

  # 4. Crear base de datos y usuario de aplicación
  gcloud sql databases create app_db --instance=my-db-instance
  gcloud sql users create app_user --instance=my-db-instance --password="UserPassword123!"

  # 5. Autorizar la IP pública de la VM en la instancia de Cloud SQL
  export VM_IP=$(gcloud compute instances describe web-app-vm --zone=us-central1-a --format="value(networkInterfaces[0].accessConfigs[0].natIP)")
  gcloud sql instances patch my-db-instance --authorized-networks=${VM_IP}
  ```

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

## 🎯 4. Árbol de Decisión de Cómputo para el Examen ACE

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

## 💡 5. Trampas Frecuentes en el Examen ACE

1. **Uso de Roles Básicos en Producción**: Las opciones que recomiendan asignar `roles/editor` o `roles/viewer` para otorgar acceso a buckets o VMs violan el principio de mínimo privilegio. Siempre preferir roles predefinidos (ej. `roles/storage.objectViewer`).
2. **Archivos de Clave JSON en VMs**: Descargar archivos JSON de cuentas de servicio en el disco de una máquina virtual es un antipatrón de seguridad crítico. La práctica oficial recomendada es adjuntar la cuenta de servicio directamente a la VM mediante el Compute Engine Metadata Server.
3. **Subredes en VPC Modo Personalizado**: A diferencia del modo Auto (que crea una subred por región), el modo Custom inicia con 0 subredes; deben ser aprovisionadas explícitamente.
4. **Herencia Aditiva en IAM**: Los permisos concedidos en niveles superiores (Organización o Carpeta) no pueden ser denegados ni restringidos en proyectos o recursos hijos mediante políticas IAM tradicionales.


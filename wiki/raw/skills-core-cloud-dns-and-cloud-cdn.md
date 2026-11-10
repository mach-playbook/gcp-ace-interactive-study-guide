# Google Cloud Fundamentals: Core Infrastructure - Cloud DNS and Cloud CDN

- **Fuente Original:** Google Skills (Course Template 60, Video 689565)
- **URL Lección:** https://www.skills.google/course_templates/60/video/689565
- **URL Video YouTube:** https://www.youtube.com/watch?v=TYB1cur47mk
- **Duración:** 01:45
- **Módulo:** Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)
- **Fecha de Ingesta:** 2026-11-09

---

## Transcripción Limpia y Completa

One of the most famous free Google services is 8.8.8.8, which provides a public Domain Name Service to the world.

DNS is what translates internet hostnames to addresses, and as you might imagine, Google has a highly developed DNS infrastructure. It makes 8.8.8.8 available so that everyone can take advantage of it.

But what about the internet hostnames and addresses of applications built in Google Cloud? Google Cloud offers Cloud DNS to help the world find them.

It’s a managed DNS service that runs on the same infrastructure as Google. It has low latency and high availability, and it’s a cost-effective way to make your applications and services available to your users. The DNS information you publish is served from redundant locations around the world.

Cloud DNS is also programmable. You can publish and manage millions of DNS zones and records using the Cloud console, the command-line interface, or the API.

Google also has a global system of edge caches. Edge caching refers to the use of caching servers to store content closer to end users. You can use this system to accelerate content delivery in your application by using Cloud CDN - Content Delivery Network.

This means your customers will experience lower network latency, the origins of your content will experience reduced load, and you can even save money. After an Application Load Balancer is set up, Cloud CDN can be enabled with a single checkbox.

There are many other CDNs available out there, of course. If you are already using one, chances are, it’s a part of Google Cloud’s CDN Interconnect partner program, and you can continue to use it.

---

## Síntesis Técnica y Puntos Clave para el Examen ACE

### 1. Cloud DNS como Servicio Autoritativo 100% Gestionado
- **Diferencia Crítica:** `8.8.8.8` es el servicio de resolución recursiva pública gratuita de Google (*Google Public DNS*). En contraste, **Cloud DNS** es el servicio autoritativo comercial para hospedar y responder consultas de nombres de dominio y registros (A, AAAA, CNAME, MX, TXT, etc.) de las aplicaciones desplegadas por clientes.
- **Disponibilidad y Rendimiento (Anycast SLA 100%):** Utiliza la infraestructura de red global Anycast de Google para atender consultas desde la ubicación geográfica más cercana al usuario, ofreciendo latencia ultra-baja y una garantía de disponibilidad del 100%.
- **Capacidad de Automatización y Zonas:**
  - Totalmente programable mediante Google Cloud Console, Cloud SDK (`gcloud dns managed-zones ...` y `gcloud dns record-sets ...`), o REST API.
  - Soporta **Zonas Públicas** (visibles a toda internet) y **Zonas Privadas** (resolución de nombres interna visible exclusivamente dentro de las redes VPC designadas sin exponer IPs privadas al exterior).

### 2. Cloud CDN (Content Delivery Network) y Caché de Borde (*Edge Caches*)
- **Arquitectura de Edge Caching:** Utiliza los más de 100 Puntos de Presencia (PoPs / nodos de caché de borde) de la red física global privada de Google para almacenar en caché contenido web estático (imágenes, CSS, JS, videos) y respuestas dinámicas HTTP(S) cercanas al usuario.
- **Ventajas Operativas y Financieras:**
  - **Latencia de Red Mínima:** El contenido se entrega directamente desde el PoP local más próximo al cliente final, evitando viajes de ida y vuelta (*round-trips*) hacia los servidores backend.
  - **Descarga de Carga en el Origen (*Reduced Origin Load*):** Los servidores web (Compute Engine, GKE o buckets de Cloud Storage) no reciben peticiones repetitivas, permitiendo dimensionar clusters más pequeños.
  - **Ahorro de Costos en Salida de Red (*Egress*):** El tráfico servido desde la caché de Cloud CDN se factura a una tarifa significativamente inferior al tráfico directo de salida de Compute Engine a internet.

### 3. Integración con Application Load Balancers
- **Requisito Arquitectónico:** Cloud CDN opera de forma acoplada y nativa con un **External Application Load Balancer** (HTTP/HTTPS).
- **Habilitación Inmediata:** Se activa simplemente marcando la casilla de verificación *"Enable Cloud CDN"* en la configuración del servicio de backend (*Backend Service*) o bucket de backend (*Backend Bucket*).

### 4. Programa CDN Interconnect
- Si una empresa ya cuenta con contratos y arquitecturas basadas en proveedores CDN externos líderes (ej. Cloudflare, Fastly, Akamai), el programa **CDN Interconnect** ofrece enlaces directos de alta velocidad y tarifas de salida con descuento sustancial desde Google Cloud hacia dichas redes CDN asociadas.


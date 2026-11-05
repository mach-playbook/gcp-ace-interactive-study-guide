# 📊 Telemetría, Indexación y Validación de Motores de Búsqueda

Este documento recopila la configuración técnica de analítica web, verificación de propiedad en Google Search Console, Bing Webmaster Tools y vinculación de flujos de datos para **`gcp-ace-interactive-study-guide`**.

---

## 🌐 URLs Canónicas y Despliegue en GitHub Pages

* **URL Canónica de Producción**: `https://mach-playbook.github.io/gcp-ace-interactive-study-guide/`
* **Dominio Base de la Organización**: `https://mach-playbook.github.io/`
* **Repositorio de Código**: `https://github.com/mach-playbook/gcp-ace-interactive-study-guide`

---

## 📈 1. Google Analytics 4 (GA4)

* **Cuenta Google Analytics**: `a389930119` (Github Pages)
* **Propiedad GA4 Creada**: `p562558808` (GCP ACE Interactive Study Guide)
* **ID de Medición (Measurement ID)**: `G-9GESMZMDPB`
* **Stream ID**: `16280482703`
* **Stream URL**: `https://mach-playbook.github.io/gcp-ace-interactive-study-guide`
* **Integración en la SPA**:
  * Archivo: `src/app/layout.tsx`
  * Estrategia: `next/script` (`strategy="afterInteractive"`) con anonimización de IP y tracking automático de rutas relativas.
* **Enlace Bidireccional con Search Console**:
  * Estado: **Vinculado exitosamente** (Nov 5, 2026) con la propiedad de Search Console `https://mach-playbook.github.io/gcp-ace-interactive-study-guide/`.

---

## 🔍 2. Google Search Console (GSC)

* **Propiedad en GSC**: `https://mach-playbook.github.io/gcp-ace-interactive-study-guide/` (URL-prefix)
* **Token de Validación**: `google7d4ec8c5344a17de`
* **Métodos de Validación Activos en la SPA**:
  1. **Archivo HTML Estático**:
     * Archivo físico: `public/google7d4ec8c5344a17de.html`
     * URL pública: `https://mach-playbook.github.io/gcp-ace-interactive-study-guide/google7d4ec8c5344a17de.html`
     * Contenido: `google-site-verification: google7d4ec8c5344a17de.html`
  2. **Etiqueta Meta en Encabezado**:
     * Archivo: `src/app/layout.tsx`
     * Tag: `<meta name="google-site-verification" content="google7d4ec8c5344a17de" />`
  3. **Verificación Automática por Propiedad Matriz**:
     * La propiedad matriz `https://mach-playbook.github.io/` ya se encuentra validada como propietario verificado en la cuenta del usuario.
  4. **Verificación por Google Analytics**:
     * Al estar vinculado el flujo de medición `G-9GESMZMDPB` con la propiedad de Search Console, Google valida automáticamente la propiedad.

---

## 🔎 3. Bing Webmaster Tools

* **Sitio en Bing Webmaster Tools**: Registrado y monitoreado bajo `mach-playbook.github.io/`.
* **Token de Verificación Bing (`msvalidate.01`)**: `856757614FFC2C5582FBCB81B1B4E4CA`
* **Métodos de Validación Activos en la SPA**:
  1. **Archivo XML de Autenticación**:
     * Archivo físico: `public/BingSiteAuth.xml`
     * URL pública: `https://mach-playbook.github.io/gcp-ace-interactive-study-guide/BingSiteAuth.xml`
     * Contenido:
       ```xml
       <?xml version="1.0"?>
       <users>
       	<user>856757614FFC2C5582FBCB81B1B4E4CA</user>
       </users>
       ```
  2. **Archivo TXT de Autenticación**:
     * Archivo físico: `public/856757614ffc2c5582fbcb81b1b4e4ca.txt`
  3. **Etiqueta Meta en Encabezado**:
     * Tag: `<meta name="msvalidate.01" content="856757614FFC2C5582FBCB81B1B4E4CA" />` en `src/app/layout.tsx`.
  4. **Importación / Sincronización Directa desde Google Search Console**:
     * Bing Webmaster Tools sincroniza automáticamente con un clic todas las propiedades y sitemaps verificados en Google Search Console para la misma cuenta de Google.

---

## 🤖 4. Rastreo, Robots.txt y Sitemap XML

* **`public/robots.txt`**:
  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://mach-playbook.github.io/gcp-ace-interactive-study-guide/sitemap.xml
  ```
* **`public/sitemap.xml`**:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://mach-playbook.github.io/gcp-ace-interactive-study-guide/</loc>
      <lastmod>2026-11-05</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```

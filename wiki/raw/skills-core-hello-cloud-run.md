# Ingesta Cruda: Laboratorio Oficial: Hello Cloud Run (Lab ID: CBL333 / 689585)

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Módulo 6: Desarrollo de Aplicaciones en la Nube (Developing Applications in the Cloud)
* **Laboratorio:** 4 (Lab ID: `CBL333` / Skills ID: `689585`)
* **URL Skills Google:** [Skills Google - Hello Cloud Run](https://www.skills.google/paths/8/course_templates/60/labs/689585)
* **Créditos:** 5 | **Duración Estimada:** 1 hora | **Nivel:** Introductorio
* **Puntaje Actual:** ⭐ 16,010 puntos (Racha: 2)
* **Fecha de Ingesta:** 2026-11-17
* **Tipo de Contenido:** Laboratorio práctico guiado con evaluación de progreso (*Check my progress*)

---

## 📝 Guía Oficial del Laboratorio Sanitizada

### Visión General y Objetivos
Cloud Run es una plataforma de cómputo administrada que permite ejecutar contenedores sin estado (*stateless*) invocables mediante solicitudes HTTP. Cloud Run es *serverless*: abstrae por completo la gestión de la infraestructura para centrarse en el desarrollo de aplicaciones.

El objetivo central del laboratorio consiste en compilar una imagen de contenedor para una aplicación web ligera escrita en Node.js, almacenarla en Artifact Registry y desplegarla en Cloud Run obteniendo una URL HTTPS pública asegurada.

**Objetivos de Aprendizaje:**
1. Habilitar las APIs de Cloud Run y Artifact Registry en el proyecto.
2. Crear una aplicación Node.js basada en Express lista para ejecutarse como contenedor sin estado.
3. Crear un repositorio Docker en Artifact Registry y autenticar el cliente local.
4. Diseñar un `Dockerfile` optimizado y compilar/subir la imagen mediante Cloud Build.
5. Desplegar el contenedor en Cloud Run permitiendo acceso público sin autenticación (`--allow-unauthenticated`).
6. Eliminar los recursos creados para evitar costes residuales de almacenamiento.

---

### Tareas Operativas Oficiales

#### Task 1. Enable the Cloud Run API and configure your Shell environment
* Habilitar los servicios requeridos desde Cloud Shell:
  ```bash
  gcloud services enable run.googleapis.com artifactregistry.googleapis.com
  ```
* Configurar la región de cómputo predeterminada y variable de entorno:
  ```bash
  gcloud config set compute/region "REGION"
  export LOCATION="REGION"
  ```

#### Task 2. Write the sample application
* Crear el directorio de trabajo:
  ```bash
  mkdir helloworld && cd helloworld
  ```
* Definir el manifiesto de dependencias `package.json`:
  ```json
  {
    "name": "helloworld",
    "description": "Simple hello world sample in Node",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "start": "node index.js"
    },
    "author": "Google LLC",
    "license": "Apache-2.0",
    "dependencies": {
      "express": "^4.17.1"
    }
  }
  ```
* Crear el servidor web `index.js` escuchando en el puerto definido por la variable `PORT`:
  ```javascript
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 8080;

  app.get('/', (req, res) => {
    const name = process.env.NAME || 'World';
    res.send(`Hello ${name}!`);
  });

  app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
  });
  ```

#### Task 3. Create an Artifact Registry repository
* Crear un repositorio de formato Docker en la región seleccionada:
  ```bash
  gcloud artifacts repositories create my-repository \
      --repository-format=docker \
      --location=$LOCATION \
      --description="Docker repository"
  ```
* Configurar la autenticación de Docker para el endpoint regional de Artifact Registry:
  ```bash
  gcloud auth configure-docker $LOCATION-docker.pkg.dev
  ```

#### Task 4. Containerize your app and upload it to Artifact Registry
* Crear el archivo de receta `Dockerfile`:
  ```dockerfile
  # Use the official lightweight Node.js image.
  FROM node:20-slim

  # Create and change to the app directory.
  WORKDIR /usr/src/app

  # Copy application dependency manifests to the container image.
  COPY package*.json ./

  # Install production dependencies.
  RUN npm install --only=production

  # Copy local code to the container image.
  COPY . ./

  # Run the web service on container startup.
  CMD [ "npm", "start" ]
  ```
* Compilar y subir la imagen utilizando Cloud Build en un solo comando:
  ```bash
  gcloud builds submit --tag $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld
  ```
* (Opcional) Probar localmente en Cloud Shell:
  ```bash
  docker run -d -p 8080:8080 $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld
  curl localhost:8080
  ```

#### Task 5. Deploy to Cloud Run
* Desplegar el contenedor en Cloud Run con acceso público:
  ```bash
  gcloud run deploy helloworld \
      --image $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld \
      --allow-unauthenticated \
      --region=$LOCATION
  ```
* Tras la finalización exitosa, la CLI muestra la URL del servicio (ej. `https://helloworld-h6cp412q3a-uc.a.run.app`) que puede visitarse desde cualquier navegador web.

#### Task 6. Clean up
* Eliminar la imagen del repositorio para evitar cobros de almacenamiento:
  ```bash
  gcloud artifacts docker images delete $LOCATION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/my-repository/helloworld --quiet
  ```
* Eliminar el servicio de Cloud Run:
  ```bash
  gcloud run services delete helloworld --region=$LOCATION --quiet
  ```

---

## 🔬 Síntesis Técnica y Desglose Arquitectónico

### 1. Artifact Registry como Almacén Estándar
* **Sucesor Oficial de Container Registry (GCR):** Artifact Registry (`*.pkg.dev`) es el registro recomendado y moderno para almacenar imágenes de contenedores OCI, paquetes npm, Maven, Python y binarios.
* **Autenticación con Docker:** El comando `gcloud auth configure-docker <REGISTRY_HOST>` configura las credenciales de la CLI de Docker para autenticarse automáticamente usando el token OAuth de gcloud.

### 2. Cloud Build para Construcción Desatendida
* El comando `gcloud builds submit --tag ...` empaqueta el directorio local, lo transfiere a Cloud Storage temporalmente y ejecuta el proceso de construcción en una máquina virtual de compilación efímera en la nube. No requiere tener el demonio de Docker instalado localmente para generar la imagen.

### 3. Anatomía del Despliegue en Cloud Run
* `--allow-unauthenticated`: Asigna el rol `roles/run.invoker` al principal `allUsers`, permitiendo peticiones HTTP directas desde internet sin requerir tokens OpenID Connect (OIDC).
* Autoescalado transparente: Cloud Run inicia contenedores bajo demanda en milisegundos cuando llegan peticiones y los escala a cero réplicas cuando cesa el tráfico.

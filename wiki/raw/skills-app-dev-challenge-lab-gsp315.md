# 📝 Insumo en Bruto: Set Up an App Dev Environment on Google Cloud: Challenge Lab (GSP315 / 592550)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 10 (Challenge Lab / Pre-assessment)
* **ID Oficial**: `GSP315` | **Skills Lab ID**: `592550`
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592550
* **Puntos Acumulados**: 16,246 estrellas
* **Duración / Créditos**: 25 minutos / 1 Crédito
* **Nivel**: Introductory
* **Última Actualización / Test**: 5 de noviembre de 2026

---

## 🎯 Escenario del Desafío (Jooli Inc. - Proyecto Memories)
Como ingeniero cloud junior en Jooli Inc., debes preparar el entorno de desarrollo para el equipo "Memories" que construye una plataforma de almacenamiento y catalogación de fotografías:
1. Crear un bucket de almacenamiento para las fotos originales y miniaturas.
2. Crear un topic de Pub/Sub para notificaciones asíncronas de procesamiento.
3. Desplegar una Cloud Run Function de 2ª generación en Node.js 22 con trigger de Cloud Storage para redimensionar imágenes a 64x64 píxeles usando la librería `sharp` y publicar un mensaje en el topic de Pub/Sub.
4. Revocar el acceso de IAM al ingeniero anterior (`Username 2`, rol `Viewer`).

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Create a Bucket
* Crear bucket con el nombre asignado dinámicamente (`Bucket Name`).
* Región: `REGION` asignada al inicio del lab.
* Clase de almacenamiento: Standard.

### Task 2. Create a Pub/Sub Topic
* Crear un topic de Pub/Sub con el nombre asignado dinámicamente (`Topic Name`).

### Task 3. Create the Thumbnail Cloud Run Function
* **Entorno**: Cloud Run Functions (2nd generation).
* **Runtime**: Node.js 22.
* **Nombre de la función / Entry point**: `Cloud Run Function Name`.
* **Disparador (Trigger)**: Cloud Storage (`google.cloud.storage.object.v1.finalized` en el bucket creado en Task 1).
* **Código Fuente (`index.js`)**:
  * Requiere `@google-cloud/functions-framework`, `@google-cloud/storage`, `@google-cloud/pubsub` y `sharp`.
  * Filtra archivos para evitar bucles infinitos: si el archivo contiene `64x64_thumbnail`, se omite.
  * Solo procesa extensiones `.png`, `.jpg`, `.jpeg`.
  * Redimensiona la imagen a 64x64 píxeles (`sharp(buffer).resize(64, 64, { fit: 'inside', withoutEnlargement: true })`).
  * Guarda la miniatura en el mismo bucket con el sufijo `_64x64_thumbnail.<ext>`.
  * Publica un mensaje con el nuevo nombre de archivo en el topic de Pub/Sub.
* **Dependencias (`package.json`)**:
  ```json
  {
    "name": "thumbnails",
    "version": "1.0.0",
    "description": "Create Thumbnail of uploaded image",
    "scripts": {
      "start": "node index.js"
    },
    "dependencies": {
      "@google-cloud/functions-framework": "^3.0.0",
      "@google-cloud/pubsub": "^2.0.0",
      "@google-cloud/storage": "^6.11.0",
      "sharp": "^0.32.1"
    },
    "devDependencies": {},
    "engines": {
      "node": ">=4.3.2"
    }
  }
  ```
* **Prueba de Funcionamiento**:
  * Subir imagen JPG/PNG al bucket (ej. `https://storage.googleapis.com/cloud-training/gsp315/map.jpg`).
  * Verificar generación automática de la miniatura `map_64x64_thumbnail.jpg`.

### Task 4. Remove the Previous Cloud Engineer
* En `IAM & Admin` → `IAM`.
* Localizar la cuenta `Username 2` (asignada con el rol básico `Viewer`).
* Eliminar el acceso (Delete principal / Remove role binding) del proyecto.

---

## ⚡ Comandos Automatizados de Resolución Rápida con gcloud CLI

```bash
# Variables del laboratorio
export REGION="<REGION_DEL_LAB>"
export BUCKET_NAME="<BUCKET_NAME_ASIGNADO>"
export TOPIC_NAME="<TOPIC_NAME_ASIGNADO>"
export FUNCTION_NAME="<FUNCTION_NAME_ASIGNADA>"
export USER2_EMAIL="<USERNAME_2_DEL_LAB>"

# 1. Crear Bucket
gcloud storage buckets create gs://$BUCKET_NAME --location=$REGION

# 2. Crear Topic Pub/Sub
gcloud pubsub topics create $TOPIC_NAME

# 3. Preparar código de la función en Cloud Shell
mkdir -p ~/thumbnail-func && cd ~/thumbnail-func

cat > package.json << 'EOF'
{
  "name": "thumbnails",
  "version": "1.0.0",
  "description": "Create Thumbnail of uploaded image",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0",
    "@google-cloud/pubsub": "^2.0.0",
    "@google-cloud/storage": "^6.11.0",
    "sharp": "^0.32.1"
  }
}
EOF

cat > index.js << EOF
const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const { PubSub } = require('@google-cloud/pubsub');
const sharp = require('sharp');

functions.cloudEvent('$FUNCTION_NAME', async cloudEvent => {
  const event = cloudEvent.data;
  console.log(\`Event: \${JSON.stringify(event)}\`);
  console.log(\`Hello \${event.bucket}\`);
  const fileName = event.name;
  const bucketName = event.bucket;
  const bucket = new Storage().bucket(bucketName);
  const topicName = "$TOPIC_NAME";
  const pubsub = new PubSub();

  if (fileName.search("64x64_thumbnail") === -1) {
    const filename_split = fileName.split('.');
    const filename_ext = filename_split[filename_split.length - 1].toLowerCase();
    const filename_without_ext = fileName.substring(0, fileName.length - filename_ext.length - 1);

    if (filename_ext === 'png' || filename_ext === 'jpg' || filename_ext === 'jpeg') {
      console.log(\`Processing Original: gs://\${bucketName}/\${fileName}\`);
      const gcsObject = bucket.file(fileName);
      const newFilename = \`\${filename_without_ext}_64x64_thumbnail.\${filename_ext}\`;
      const gcsNewObject = bucket.file(newFilename);

      try {
        const [buffer] = await gcsObject.download();
        const resizedBuffer = await sharp(buffer)
          .resize(64, 64, { fit: 'inside', withoutEnlargement: true })
          .toFormat(filename_ext)
          .toBuffer();

        await gcsNewObject.save(resizedBuffer, {
          metadata: { contentType: \`image/\${filename_ext}\` }
        });
        console.log(\`Success: \${fileName} -> \${newFilename}\`);

        await pubsub.topic(topicName).publishMessage({ data: Buffer.from(newFilename) });
        console.log(\`Message published to \${topicName}\`);
      } catch (err) {
        console.error(\`Error: \${err}\`);
      }
    } else {
      console.log(\`gs://\${bucketName}/\${fileName} is not an image I can handle\`);
    }
  } else {
    console.log(\`gs://\${bucketName}/\${fileName} already has a thumbnail\`);
  }
});
EOF

# 4. Desplegar Cloud Run Function gen2 con Trigger de Eventarc / Storage
gcloud functions deploy $FUNCTION_NAME \
  --gen2 \
  --runtime=nodejs22 \
  --region=$REGION \
  --source=. \
  --entry-point=$FUNCTION_NAME \
  --trigger-event-filters="type=google.cloud.storage.object.v1.finalized" \
  --trigger-event-filters="bucket=$BUCKET_NAME"

# 5. Probar subiendo una imagen
curl -O https://storage.googleapis.com/cloud-training/gsp315/map.jpg
gcloud storage cp map.jpg gs://$BUCKET_NAME/map.jpg

# 6. Eliminar acceso de Username 2
gcloud projects remove-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
  --member="user:$USER2_EMAIL" \
  --role="roles/viewer"
```

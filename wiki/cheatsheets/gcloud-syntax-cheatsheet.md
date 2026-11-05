# ⚡ Comandos Esenciales de `gcloud` para el Examen ACE

Colección de los comandos más evaluados en el examen Associate Cloud Engineer, estructurados por servicio.

---

## 🛠️ Configuración e Identidad

* Inicializar el SDK interactivo:
  `gcloud init`
* Listar configuraciones activas:
  `gcloud config list`
* Establecer el proyecto activo:
  `gcloud config set project ID_PROYECTO`
* Establecer la región y zona por defecto:
  `gcloud config set compute/region us-central1`
  `gcloud config set compute/zone us-central1-a`
* Autenticar usuario con navegador:
  `gcloud auth login`

---

## 💻 Compute Engine (`gcloud compute`)

* Crear una instancia con red y tags específicos:
  `gcloud compute instances create vm-web --zone=us-central1-a --machine-type=e2-medium --tags=http-server`
* Conectarse a una instancia mediante SSH y OS Login:
  `gcloud compute ssh vm-web --zone=us-central1-a`
* Crear un snapshot de un disco persistente:
  `gcloud compute disks snapshot disco-datos --snapshot-names=snap-disco-datos-1 --zone=us-central1-a`
* Crear un template de instancias para MIG:
  `gcloud compute instance-templates create template-web --machine-type=e2-small --tags=http-server`
* Crear un grupo de instancias administradas (MIG):
  `gcloud compute instance-groups managed create mig-web --template=template-web --size=3 --zone=us-central1-a`

---

## ☸️ Google Kubernetes Engine (`gcloud container`)

* Crear un cluster en modo Autopilot:
  `gcloud container clusters create-auto cluster-prod --region=us-central1`
* Crear un cluster en modo Standard:
  `gcloud container clusters create cluster-legacy --num-nodes=3 --zone=us-central1-a`
* Obtener credenciales para operar con `kubectl`:
  `gcloud container clusters get-credentials cluster-prod --region=us-central1`
* Redimensionar un Node Pool existente:
  `gcloud container clusters resize cluster-legacy --node-pool=default-pool --num-nodes=5 --zone=us-central1-a`

---

## 🪣 Cloud Storage (`gcloud storage`)

* Crear un bucket con clase Nearline en la región us-central1:
  `gcloud storage buckets create gs://mi-bucket-backup --location=us-central1 --default-storage-class=NEARLINE`
* Copiar archivos de forma recursiva:
  `gcloud storage cp -r ./assets gs://mi-bucket-backup/assets/`
* Habilitar control de versiones de objetos:
  `gcloud storage buckets update gs://mi-bucket-backup --versioning`

---

## 🔐 IAM y Cuentas de Servicio (`gcloud iam`)

* Crear una cuenta de servicio:
  `gcloud iam service-accounts create app-backend --display-name="App Backend SA"`
* Asignar un rol a la cuenta de servicio a nivel de proyecto:
  `gcloud projects add-iam-policy-binding ID_PROYECTO --member="serviceAccount:app-backend@ID_PROYECTO.iam.gserviceaccount.com" --role="roles/storage.objectViewer"`
* Permitir a un usuario suplantar la cuenta de servicio (Impersonation):
  `gcloud iam service-accounts add-iam-policy-binding app-backend@ID_PROYECTO.iam.gserviceaccount.com --member="user:dev@empresa.com" --role="roles/iam.serviceAccountUser"`


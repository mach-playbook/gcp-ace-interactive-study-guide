import { GcloudQuizItem } from '../types';

export const quizItems: GcloudQuizItem[] = [
  {
    id: 'quiz-gke-autopilot',
    domainId: 'domain-2',
    scenario: 'Necesitas crear un cluster de GKE en modo Autopilot administrado en la región us-central1 llamado "prod-cluster". ¿Cuál es la sintaxis correcta del comando?',
    correctTokens: ['gcloud', 'container', 'clusters', 'create-auto', 'prod-cluster', '--region=us-central1'],
    optionsPool: ['gcloud', 'container', 'clusters', 'create-auto', 'create', 'prod-cluster', '--region=us-central1', '--zone=us-central1-a', 'compute'],
    explanation: 'Para GKE Autopilot, el subcomando específico es "create-auto" y requiere un flag regional (--region), no zonal (--zone).',
    examTrapNote: 'Trampa de examen: Confundir "create-auto" con "create", o intentar desplegar un cluster Autopilot con flag zonal --zone.',
    officialDocUrl: 'https://cloud.google.com/sdk/gcloud/reference/container/clusters/create-auto',
  },
  {
    id: 'quiz-vm-create',
    domainId: 'domain-2',
    scenario: 'Quieres crear una instancia de Compute Engine llamada "web-server" en la zona us-central1-a con el tag "http-server".',
    correctTokens: ['gcloud', 'compute', 'instances', 'create', 'web-server', '--zone=us-central1-a', '--tags=http-server'],
    optionsPool: ['gcloud', 'compute', 'instances', 'create', 'web-server', '--zone=us-central1-a', '--region=us-central1', '--tags=http-server', 'vm'],
    explanation: 'La gramática estándar de Compute Engine es "gcloud compute instances create [NOMBRE] --zone=[ZONA] --tags=[TAGS]".',
    examTrapNote: 'Las instancias de Compute Engine residen en Zonas específicas, por lo que el parámetro de ubicación mandatorio es --zone.',
  },
  {
    id: 'quiz-sa-iam-binding',
    domainId: 'domain-4',
    scenario: 'Asigna el rol predefinido de lector de objetos de almacenamiento a una cuenta de servicio en el proyecto "my-app-prod".',
    correctTokens: ['gcloud', 'projects', 'add-iam-policy-binding', 'my-app-prod', '--member=serviceAccount:sa@my-app-prod.iam.gserviceaccount.com', '--role=roles/storage.objectViewer'],
    optionsPool: ['gcloud', 'projects', 'add-iam-policy-binding', 'set-iam-policy', 'my-app-prod', '--member=serviceAccount:sa@my-app-prod.iam.gserviceaccount.com', '--member=user:sa@my-app-prod.iam.gserviceaccount.com', '--role=roles/storage.objectViewer', '--role=roles/viewer'],
    explanation: '"add-iam-policy-binding" agrega un rol a un principal sin sobreescribir la política completa. El prefijo obligatorio para cuentas de servicio es "serviceAccount:".',
    examTrapNote: 'No uses roles primitivos como "roles/viewer" cuando existe un rol predefinido específico como "roles/storage.objectViewer".',
  },
  {
    id: 'quiz-storage-create',
    domainId: 'domain-2',
    scenario: 'Crea un bucket de Cloud Storage con clase Nearline en la región us-central1.',
    correctTokens: ['gcloud', 'storage', 'buckets', 'create', 'gs://my-archive-bucket', '--location=us-central1', '--default-storage-class=NEARLINE'],
    optionsPool: ['gcloud', 'storage', 'buckets', 'create', 'gs://my-archive-bucket', '--location=us-central1', '--default-storage-class=NEARLINE', 'gsutil', 'mb'],
    explanation: 'El CLI moderno "gcloud storage buckets create" reemplaza al comando legado "gsutil mb". Requiere --location y --default-storage-class.',
    examTrapNote: 'Google evalúa el nuevo CLI "gcloud storage" en el examen actual en lugar de herramientas legadas.',
  },
  {
    id: 'quiz-ssh-oslogin',
    domainId: 'domain-3',
    scenario: 'Conéctate mediante SSH a una VM llamada "database-node" en la zona us-east1-b utilizando OS Login.',
    correctTokens: ['gcloud', 'compute', 'ssh', 'database-node', '--zone=us-east1-b'],
    optionsPool: ['gcloud', 'compute', 'ssh', 'connect', 'database-node', '--zone=us-east1-b', '--region=us-east1', 'ssh'],
    explanation: '"gcloud compute ssh" gestiona automáticamente la generación de claves o la autenticación basada en OS Login y Cloud IAM.',
    examTrapNote: 'Evita transferir claves SSH manualmente por metadatos; la práctica recomendada es OS Login.',
  },
];


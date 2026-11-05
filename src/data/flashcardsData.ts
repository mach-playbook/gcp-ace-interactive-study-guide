import { FlashcardItem } from '../types';

export const flashcardsData: FlashcardItem[] = [
  {
    id: 'trap-billing-budget',
    domainId: 'domain-1',
    question: '¿Qué sucede por defecto cuando se alcanza el 100% de un presupuesto configurado en Cloud Billing?',
    answer: 'Solo se envía una notificación por correo electrónico o evento a Pub/Sub; los recursos continúan activos y facturando.',
    trap: 'Trampa clásica: Asumir que Cloud Billing apaga automáticamente las VMs o destruye proyectos para proteger el límite de gasto.',
    referenceCommand: 'gcloud billing budgets create ...',
  },
  {
    id: 'trap-iam-additive',
    domainId: 'domain-4',
    question: 'Si un usuario tiene el rol "Editor" a nivel de Organización, ¿se le puede quitar ese acceso en un Proyecto específico asignándole "Viewer"?',
    answer: 'No. La herencia en IAM es descendente y aditiva. Los permisos otorgados arriba se suman y no se pueden revocar abajo con roles normales.',
    trap: 'Trampa clásica: Intentar "restringir" permisos agregando roles de menor privilegio en niveles inferiores. (Solo las políticas Deny de IAM v2 pueden bloquear explícitamente).',
    referenceCommand: 'gcloud projects add-iam-policy-binding ...',
  },
  {
    id: 'trap-firewall-stateful',
    domainId: 'domain-2',
    question: 'Si creas una regla de firewall de Ingress para permitir tráfico TCP en el puerto 80, ¿qué regla de Egress necesitas para enviar la respuesta?',
    answer: 'Ninguna regla adicional. Las reglas de Cloud Firewall en Google Cloud son con estado (Stateful), por lo que el tráfico de respuesta está permitido automáticamente.',
    trap: 'Trampa clásica: Crear reglas de salida manuales para puertos de respuesta efímeros.',
    referenceCommand: 'gcloud compute firewall-rules create allow-http --direction=INGRESS --allow=tcp:80',
  },
  {
    id: 'trap-subnet-expansion',
    domainId: 'domain-2',
    question: '¿Es posible reducir el tamaño del rango CIDR de una subred VPC existente (ejemplo: de /20 a /24)?',
    answer: 'No. En Google Cloud las subredes solo se pueden expandir (reducir la máscara CIDR, ej. de /24 a /22); nunca se pueden encoger.',
    trap: 'Trampa clásica: Pensar que se puede redimensionar una subred hacia abajo sin tener que destruirla y recrearla.',
    referenceCommand: 'gcloud compute networks subnets expand-ip-range ...',
  },
  {
    id: 'trap-gke-credentials',
    domainId: 'domain-3',
    question: '¿Qué comando configura tu archivo kubeconfig local para interactuar con un cluster de GKE mediante kubectl?',
    answer: 'gcloud container clusters get-credentials [CLUSTER_NAME] --region=[REGION] (o --zone=[ZONA])',
    trap: 'Trampa clásica: Opciones distractoras como "gcloud gke configure" o comandos directos de kubectl que carecen de los tokens de autenticación de GCP.',
    referenceCommand: 'gcloud container clusters get-credentials my-cluster --region=us-central1',
  },
  {
    id: 'trap-storage-nearline-penalty',
    domainId: 'domain-2',
    question: '¿Qué penalización ocurre si borras o mueves un objeto de Cloud Storage Nearline a los 10 días de haberlo subido?',
    answer: 'Se te cobrará la tarifa de almacenamiento prorrateada por los 20 días restantes hasta cumplir el compromiso mínimo obligatorio de 30 días.',
    trap: 'Trampa clásica: Creer que el borrado anticipado es gratuito sin costo de permanencia mínima.',
    referenceCommand: 'gcloud storage objects delete gs://my-bucket/old-file.tar.gz',
  },
  {
    id: 'trap-service-account-keys',
    domainId: 'domain-4',
    question: '¿Cuál es la forma más segura recomendada para que un Pod de GKE acceda a Cloud Storage o BigQuery?',
    answer: 'Workload Identity Federation for GKE. Vincula la Service Account de Kubernetes a una Service Account de Cloud IAM sin descargar claves JSON.',
    trap: 'Trampa clásica: Descargar claves privadas JSON de Service Account y montarlas como Kubernetes Secrets (alto riesgo de filtración).',
    referenceCommand: 'gcloud iam service-accounts add-iam-policy-binding ... --role=roles/iam.workloadIdentityUser',
  },
];


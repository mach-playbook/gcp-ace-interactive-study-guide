import { DecisionStep } from '../types';

export const storageDecisionTree: Record<string, DecisionStep> = {
  start: {
    id: 'start',
    question: '¿Qué tipo de estructura tienen los datos que necesitas almacenar?',
    helpText: 'Identifica si se trata de archivos/blobs binarios o de datos tabulares consultables.',
    options: [
      {
        label: 'Archivos no estructurados (imágenes, backups, videos, logs en texto crudo)',
        description: 'Objetos binarios inmutables sin motor relacional.',
        nextStepId: 'storage-unstructured',
      },
      {
        label: 'Datos estructurados relacionales (con tablas, claves foráneas y transacciones ACID)',
        description: 'Requiere motor SQL y consistencia transaccional estricta.',
        nextStepId: 'storage-relational',
      },
      {
        label: 'Datos semiestructurados NoSQL o Analítica Masiva (OLAP)',
        description: 'Modelos clave-valor, documentales o almacén de datos empresarial.',
        nextStepId: 'storage-nosql',
      },
    ],
  },
  'storage-unstructured': {
    id: 'storage-unstructured',
    question: '¿Con qué frecuencia aproximada se accederá o recuperará la información?',
    helpText: 'La frecuencia de acceso determina la clase de almacenamiento para minimizar costos.',
    options: [
      {
        label: 'Acceso diario o continuo (frecuente)',
        recommendation: {
          service: 'Cloud Storage (Standard)',
          badge: 'Objetos Frecuentes',
          reason: 'Sin costo por recuperación de datos ni compromiso de permanencia mínima de días.',
          pricingTip: 'Ideal para activos web, descargas de usuario y datos en uso activo.',
          examWarning: 'No utilices Nearline o Coldline para datos activos porque las tasas de recuperación elevarán la factura.',
        },
      },
      {
        label: 'Acceso mensual o menor a una vez cada 30 días',
        recommendation: {
          service: 'Cloud Storage (Nearline)',
          badge: 'Acceso Mensual',
          reason: 'Costo de almacenamiento significativamente menor; mínimo 30 días de permanencia.',
          pricingTip: 'Ideal para copias de seguridad mensuales o informes periódicos.',
          examWarning: 'Si borras o reemplazas el objeto antes de 30 días, se cobrará la permanencia mínima restante.',
        },
      },
      {
        label: 'Acceso trimestral o menor a una vez cada 90 días',
        recommendation: {
          service: 'Cloud Storage (Coldline)',
          badge: 'Acceso Trimestral',
          reason: 'Diseñado para recuperación ante desastres (Disaster Recovery). Mínimo 90 días de permanencia.',
          pricingTip: 'Excelente balance para copias de seguridad de recuperación infrecuente.',
          examWarning: 'Recuperar datos de Coldline tiene una tarifa por GB mayor que Nearline.',
        },
      },
      {
        label: 'Archivado legal a largo plazo (< 1 vez cada 365 días)',
        recommendation: {
          service: 'Cloud Storage (Archive)',
          badge: 'Cumplimiento Legal',
          reason: 'El costo por GB almacenado más bajo de toda la plataforma GCP. Mínimo 365 días de permanencia.',
          pricingTip: 'Diseñado para retención fiscal y cumplimiento regulatorio.',
          examWarning: 'Nunca uses Archive para datos operativos; el costo de recuperación es el más alto.',
        },
      },
    ],
  },
  'storage-relational': {
    id: 'storage-relational',
    question: '¿Cuál es la escala geográfica y requerimiento de consistencia de la base de datos?',
    helpText: 'Distingue entre bases de datos estándar locales y arquitecturas globales multirregionales.',
    options: [
      {
        label: 'Carga transaccional estándar (hasta 64 TB, soporte MySQL, PostgreSQL o SQL Server)',
        recommendation: {
          service: 'Cloud SQL',
          badge: 'RDBMS Gestionado',
          reason: 'Totalmente compatible con motores relacionales tradicionales, failover automático y réplicas de lectura.',
          pricingTip: 'Fácil migración "Lift & Shift" de aplicaciones web y corporativas existentes.',
          examWarning: 'Cloud SQL escala verticalmente y tiene límite de 64 TB por instancia; no escala horizontalmente en escrituras.',
        },
      },
      {
        label: 'Distribución global multirregional, escalabilidad horizontal masiva y consistencia fuerte (ACID global)',
        recommendation: {
          service: 'Cloud Spanner',
          badge: 'RDBMS Global Masivo',
          reason: 'Escalabilidad horizontal ilimitada con transacciones ACID globales y SLA de hasta 99.999%.',
          pricingTip: 'Excelente para banca global, inventario en tiempo real y cadenas de suministro mundiales.',
          examWarning: 'Cloud Spanner es de costo base considerable; en preguntas con presupuesto ajustado o < 1 TB, Cloud SQL es la respuesta.',
        },
      },
    ],
  },
  'storage-nosql': {
    id: 'storage-nosql',
    question: '¿Cuál es el caso de uso analítico o transaccional de los datos?',
    helpText: 'Selecciona según el patrón de acceso y el volumen total de transacciones.',
    options: [
      {
        label: 'Data Warehouse empresarial, consultas analíticas complejas en SQL a escala de Petabytes',
        recommendation: {
          service: 'BigQuery',
          badge: 'Serverless Data Warehouse',
          reason: 'Motor OLAP sin servidor para analítica en segundos sobre petabytes de información.',
          pricingTip: 'Cobro por bytes procesados en consultas o por slots de cómputo dedicados.',
          examWarning: 'BigQuery no es una base de datos OLTP; no está pensada para transacciones individuales de baja latencia milimétrica.',
        },
      },
      {
        label: 'Altísima tasa de operaciones (>10,000 QPS) con latencia menor a 10ms (IoT, telemetría, series de tiempo, >1 TB)',
        recommendation: {
          service: 'Cloud Bigtable',
          badge: 'NoSQL Columnar Ancho',
          reason: 'Base de datos NoSQL de ultra-bajo retardo para lecturas y escrituras masivas.',
          pricingTip: 'Diseñada para cargas de datos pesadas que superan 1 TB.',
          examWarning: 'Si el dataset es menor a varios cientos de gigabytes, Bigtable no es costo-eficiente.',
        },
      },
      {
        label: 'Aplicaciones móviles o web con sincronización en tiempo real, modo offline y colecciones jerárquicas',
        recommendation: {
          service: 'Firestore',
          badge: 'NoSQL Documental',
          reason: 'Base de datos orientada a documentos JSON con listeners en tiempo real y SDK nativo para frontend/móvil.',
          pricingTip: 'Escalabilidad automática sin servidor con capa gratuita generosa.',
          examWarning: 'El examen evalúa Firestore en Modo Nativo frente al modo legado Datastore.',
        },
      },
    ],
  },
};

export const computeDecisionTree: Record<string, DecisionStep> = {
  start: {
    id: 'start',
    question: '¿Qué tipo de empaquetado y control de infraestructura requiere tu aplicación?',
    helpText: 'Elige según el nivel de abstracción deseado: infraestructura física, contenedores o funciones.',
    options: [
      {
        label: 'Control total del Sistema Operativo, kernel o software propietario no contenerizado',
        recommendation: {
          service: 'Compute Engine (VMs)',
          badge: 'IaaS Puro',
          reason: 'Permite configurar instancias personalizadas de CPU/RAM, GPUs dedicadas y sistemas operativos heredados.',
          pricingTip: 'Utiliza Committed Use Discounts (CUDs) o Spot VMs para cargas tolerantes a fallos.',
          examWarning: 'El usuario es responsable de parches del SO, seguridad interna y configuración de alta disponibilidad (MIGs).',
        },
      },
      {
        label: 'Aplicación contenerizada en Docker (Microservicios, APIs, Workers)',
        nextStepId: 'compute-containers',
      },
      {
        label: 'Código ligero disparado por eventos de nube (Pub/Sub, Storage) sin servidor HTTP continuo',
        recommendation: {
          service: 'Cloud Run Functions (Serverless)',
          badge: 'FaaS Event-Driven',
          reason: 'Ejecución bajo demanda activada directamente por cambios en la infraestructura de GCP.',
          pricingTip: 'Cobro exclusivo por milisegundos de ejecución e invocaciones efectivas.',
          examWarning: 'Adecuado para procesamiento ligero; no apto para tareas de más de 60 minutos.',
        },
      },
    ],
  },
  'compute-containers': {
    id: 'compute-containers',
    question: '¿Qué nivel de orquestación y control de red necesita el contenedor?',
    helpText: 'Determina si requieres compatibilidad nativa con Kubernetes o una experiencia serverless simplificada.',
    options: [
      {
        label: 'Microservicio web stateless HTTP/gRPC que debe escalar automáticamente a cero cuando no hay tráfico',
        recommendation: {
          service: 'Cloud Run',
          badge: 'Serverless Containers',
          reason: 'Despliegue directo de contenedores con escalado automático de cero a miles de instancias en segundos.',
          pricingTip: 'Máximo ahorro de costos: no pagas nada cuando no hay solicitudes entrantes.',
          examWarning: 'Es la primera opción recomendada por Google para microservicios web estándar en el examen ACE.',
        },
      },
      {
        label: 'Orquestación avanzada de Kubernetes con control automático de nodos gestionado por Google',
        recommendation: {
          service: 'Google Kubernetes Engine (GKE Autopilot)',
          badge: 'CaaS Recomendado',
          reason: 'Google aprovisiona y optimiza los nodos, la seguridad y el escalado de Pods de acuerdo con las mejores prácticas.',
          pricingTip: 'Cobro por Pod solicitado en lugar de por máquinas virtuales completas.',
          examWarning: 'Es la opción de cluster recomendada por defecto para cargas de Kubernetes en producción.',
        },
      },
      {
        label: 'Kubernetes con control granular estricto sobre tipos de máquinas virtuales y configuración de Node Pools',
        recommendation: {
          service: 'Google Kubernetes Engine (GKE Standard)',
          badge: 'Control Total de K8s',
          reason: 'Acceso a la configuración de los nodos de Compute Engine subyacentes y soporte de aceleradores exóticos.',
          pricingTip: 'Recomendado solo cuando se requiere control fino de VMs o licencias específicas en los nodos.',
          examWarning: 'El administrador se encarga del dimensionamiento, mantenimiento y actualización de los Node Pools.',
        },
      },
    ],
  },
};


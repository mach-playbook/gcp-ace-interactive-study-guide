import { ExamDomainInfo } from '../types';

export const examDomains: ExamDomainInfo[] = [
  {
    id: 'domain-1',
    name: 'Dominio 1: Configuración del Entorno Cloud',
    weight: 23,
    description: 'Jerarquía de recursos (Organización, Carpetas, Proyectos), facturación y FinOps, cuotas de recursos y Cloud Identity.',
    icon: 'Cloud',
  },
  {
    id: 'domain-2',
    name: 'Dominio 2: Planificación e Implementación de Soluciones',
    weight: 30,
    description: 'Selección de cómputo (Compute Engine, GKE, Cloud Run), bases de datos y almacenamiento, redes VPC e Infraestructura como Código.',
    icon: 'Cpu',
  },
  {
    id: 'domain-3',
    name: 'Dominio 3: Operación Exitosa de Soluciones',
    weight: 27,
    description: 'Mantenimiento de instancias VM, snapshots de disco, backups de bases de datos, Cloud Monitoring, Cloud Logging y Ops Agent.',
    icon: 'Activity',
  },
  {
    id: 'domain-4',
    name: 'Dominio 4: Configuración de Acceso y Seguridad',
    weight: 20,
    description: 'Políticas de IAM (roles predefinidos vs primitivos), Service Accounts, impersonación, GKE Workload Identity y Cloud Audit Logs.',
    icon: 'ShieldCheck',
  },
];

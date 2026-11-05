'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Shield, Award, RotateCcw } from 'lucide-react';
import { examDomains } from '../data/domainsData';

interface ReadinessTrackerProps {
  checks: Record<string, boolean>;
  onToggleCheck: (key: string) => void;
  onResetProgress: () => void;
  readinessScore: number;
}

export const ReadinessTracker: React.FC<ReadinessTrackerProps> = ({
  checks,
  onToggleCheck,
  onResetProgress,
  readinessScore,
}) => {
  const domainChecklistItems: Record<string, string[]> = {
    'domain-1': [
      'Entiendo la jerarquía de recursos (Organización → Carpetas → Proyectos → Recursos) y la regla de herencia descendente.',
      'Sé que los presupuestos de Cloud Billing NO apagan recursos por sí solos; requieren Pub/Sub y Cloud Functions.',
      'Distingo entre cuotas de tasa (Rate Quotas) y cuotas de asignación de recursos físicos (Allocation Quotas).',
      'Comprendo cómo exportar datos detallados de facturación a BigQuery para análisis FinOps.',
    ],
    'domain-2': [
      'Puedo elegir cuándo usar Cloud SQL vs Spanner vs Bigtable vs Firestore vs BigQuery.',
      'Sé cuándo elegir Compute Engine vs GKE Autopilot vs Cloud Run vs Cloud Run Functions.',
      'Conozco la diferencia entre subredes VPC en modo automático (Auto) y personalizado (Custom).',
      'Sé que las subredes se pueden expandir pero nunca reducir de tamaño CIDR.',
      'Comprendo las cuatro clases de Cloud Storage: Standard, Nearline (30d), Coldline (90d) y Archive (365d).',
    ],
    'domain-3': [
      'Sé cómo configurar y utilizar OS Login con Cloud IAM para acceso SSH a instancias.',
      'Comprendo cómo programar y restaurar snapshots de Persistent Disk.',
      'Sé utilizar `gcloud container clusters get-credentials` para operar con `kubectl`.',
      'Sé cómo instalar y para qué sirve el Ops Agent de Google Cloud.',
      'Conozco los Log Sinks para exportar logs a Cloud Storage, BigQuery o Pub/Sub.',
    ],
    'domain-4': [
      'Sé por qué se deben evitar los roles primitivos (Owner, Editor, Viewer) y usar roles predefinidos.',
      'Entiendo el riesgo de descargar claves de Service Account y prefiero GKE Workload Identity.',
      'Comprendo que las políticas Deny de IAM v2 prevalecen sobre cualquier rol otorgado.',
      'Distingo entre Admin Activity Logs (gratuitos) y Data Access Logs (de pago y desactivados por defecto).',
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            Tracker de Preparación por Dominio
          </h2>
          <p className="text-sm text-slate-500">
            Evalúa tu nivel de dominio ponderado de acuerdo con los pesos del temario oficial ACE v4.0.
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
          <span>Reiniciar Progreso</span>
        </button>
      </div>

      {/* Readiness Score Card */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 text-white shadow-md sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm text-indigo-200">
              Índice Global Ponderado
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold sm:text-5xl">
                {Math.round(readinessScore)}%
              </span>
              <span className="text-sm text-slate-300">
                / Umbral de pase oficial (~70%)
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-md">
              {readinessScore >= 75
                ? '🟢 ¡Nivel Sólido! Estás preparado para presentar el examen oficial.'
                : readinessScore >= 60
                ? '🟡 En Progreso. Refuerza los conceptos clave y la sintaxis de gcloud antes del examen.'
                : '🔴 En Riesgo. Repasa la documentación oficial y los árboles de decisión.'}
            </p>
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
            {readinessScore >= 75 ? (
              <Award className="h-12 w-12 text-emerald-400" />
            ) : readinessScore >= 60 ? (
              <Shield className="h-12 w-12 text-amber-400" />
            ) : (
              <AlertCircle className="h-12 w-12 text-rose-400" />
            )}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full transition-all duration-500 ${
              readinessScore >= 75
                ? 'bg-emerald-400'
                : readinessScore >= 60
                ? 'bg-amber-400'
                : 'bg-rose-400'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, readinessScore))}%` }}
          />
        </div>
      </div>

      {/* Domain Breakdown Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {examDomains.map((domain) => {
          const items = domainChecklistItems[domain.id] || [];
          const checkedCount = items.filter((_, idx) => checks[`${domain.id}-${idx}`]).length;
          const percentage = items.length > 0 ? (checkedCount / items.length) * 100 : 0;

          return (
            <div
              key={domain.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    Peso Oficial: {domain.weight}%
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {checkedCount} de {items.length} completados
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-slate-900">
                  {domain.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {domain.description}
                </p>

                {/* Checklist */}
                <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-3">
                  {items.map((item, idx) => {
                    const key = `${domain.id}-${idx}`;
                    const isChecked = !!checks[key];
                    return (
                      <label
                        key={key}
                        className="flex cursor-pointer items-start gap-2.5 rounded-lg p-1.5 transition hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleCheck(key)}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span
                          className={`text-xs leading-relaxed ${
                            isChecked ? 'text-slate-400 line-through' : 'text-slate-700'
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Progress per domain */}
              <div className="mt-5 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Progreso del Dominio</span>
                  <span>{Math.round(percentage)}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


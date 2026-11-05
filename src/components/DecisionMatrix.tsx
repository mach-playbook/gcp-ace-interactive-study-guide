'use client';

import React, { useState } from 'react';
import { GitBranch, Database, Server, RotateCcw, AlertCircle, Award, CheckCircle2 } from 'lucide-react';
import { storageDecisionTree, computeDecisionTree } from '../data/decisionData';
import { DecisionOption } from '../types';

export const DecisionMatrix: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'storage' | 'compute'>('storage');
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [finalRecommendation, setFinalRecommendation] = useState<DecisionOption['recommendation'] | null>(null);

  const currentTree = activeMode === 'storage' ? storageDecisionTree : computeDecisionTree;
  const currentStep = currentTree[currentStepId] || currentTree['start'];

  const handleSelectOption = (option: DecisionOption) => {
    if (option.recommendation) {
      setFinalRecommendation(option.recommendation);
    } else if (option.nextStepId) {
      setHistory([...history, currentStepId]);
      setCurrentStepId(option.nextStepId);
    }
  };

  const handleReset = (mode?: 'storage' | 'compute') => {
    if (mode) setActiveMode(mode);
    setCurrentStepId('start');
    setHistory([]);
    setFinalRecommendation(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <GitBranch className="h-6 w-6 text-indigo-600" />
            Árboles de Decisión Arquitectónica
          </h2>
          <p className="text-sm text-slate-500">
            Resuelve escenarios de examen eligiendo los servicios idóneos según costo, escala y latencia.
          </p>
        </div>

        {/* Tree mode toggle */}
        <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1">
          <button
            onClick={() => handleReset('storage')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeMode === 'storage'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="h-4 w-4" />
            <span>Almacenamiento & Datos</span>
          </button>
          <button
            onClick={() => handleReset('compute')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeMode === 'compute'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="h-4 w-4" />
            <span>Opciones de Cómputo</span>
          </button>
        </div>
      </div>

      {/* Main Decision Container */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {!finalRecommendation ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                Paso de Decisión ({history.length + 1})
              </span>
              {history.length > 0 && (
                <button
                  onClick={() => handleReset()}
                  className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Empezar de nuevo</span>
                </button>
              )}
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              {currentStep.question}
            </h3>

            {currentStep.helpText && (
              <p className="text-xs text-slate-500">
                💡 {currentStep.helpText}
              </p>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-1">
              {currentStep.options.map((option, idx) => (
                <button
                  key={`opt-${idx}`}
                  onClick={() => handleSelectOption(option)}
                  className="group flex flex-col items-start rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-sm"
                >
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-900">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-1 text-xs text-slate-500 group-hover:text-indigo-700">
                      {option.description}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Final Recommendation View */
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Solución Óptima Recomendada
                </h3>
              </div>
              <button
                onClick={() => handleReset()}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                <span>Explorar otro caso</span>
              </button>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-6 text-white shadow-md">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                {finalRecommendation.badge}
              </span>
              <h4 className="mt-2 text-2xl font-black">
                {finalRecommendation.service}
              </h4>
              <p className="mt-3 text-sm text-emerald-50 leading-relaxed">
                {finalRecommendation.reason}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <h5 className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Estrategia de Costo & FinOps
                </h5>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                  {finalRecommendation.pricingTip}
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <h5 className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  Atención en el Examen ACE
                </h5>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                  {finalRecommendation.examWarning}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

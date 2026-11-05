'use client';

import React, { useState } from 'react';
import { Terminal, CheckCircle, XCircle, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';
import { quizItems } from '../data/quizData';

interface GcloudQuizProps {
  onCompleteItem: (id: string) => void;
}

export const GcloudQuiz: React.FC<GcloudQuizProps> = ({ onCompleteItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [evaluated, setEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentItem = quizItems[currentIndex];

  const handleSelectToken = (token: string) => {
    if (evaluated) return;
    setSelectedTokens([...selectedTokens, token]);
  };

  const handleRemoveToken = (index: number) => {
    if (evaluated) return;
    const next = [...selectedTokens];
    next.splice(index, 1);
    setSelectedTokens(next);
  };

  const handleCheck = () => {
    if (selectedTokens.length === 0) return;
    const isAnswerRight =
      selectedTokens.length === currentItem.correctTokens.length &&
      selectedTokens.every((val, idx) => val === currentItem.correctTokens[idx]);

    setIsCorrect(isAnswerRight);
    setEvaluated(true);
    if (isAnswerRight) {
      onCompleteItem(currentItem.id);
    }
  };

  const handleReset = () => {
    setSelectedTokens([]);
    setEvaluated(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    handleReset();
    setCurrentIndex((prev) => (prev + 1) % quizItems.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Terminal className="h-6 w-6 text-blue-600" />
            Quiz Interactivo de Sintaxis `gcloud`
          </h2>
          <p className="text-sm text-slate-500">
            Construye la gramática correcta de comandos seleccionando las fichas en orden secuencial.
          </p>
        </div>
        <div className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          Pregunta {currentIndex + 1} de {quizItems.length}
        </div>
      </div>

      {/* Scenario Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
          Escenario Real de Examen
        </span>
        <h3 className="mt-3 text-base font-semibold leading-relaxed text-slate-800">
          {currentItem.scenario}
        </h3>

        {/* Terminal Visualizer */}
        <div className="mt-6 overflow-hidden rounded-xl bg-slate-900 text-slate-100 shadow-inner">
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-slate-400">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="font-mono text-slate-300">bash — gcloud interactive terminal</span>
          </div>

          <div className="min-h-[72px] p-4 font-mono text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-emerald-400 select-none">$</span>
              {selectedTokens.length === 0 && (
                <span className="text-slate-500 italic select-none">
                  (Haz clic en las fichas inferiores para ensamblar el comando...)
                </span>
              )}
              {selectedTokens.map((token, idx) => (
                <button
                  key={`${token}-${idx}`}
                  disabled={evaluated}
                  onClick={() => handleRemoveToken(idx)}
                  className="group flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-blue-300 transition-colors hover:bg-rose-900 hover:text-white"
                  title="Clic para remover"
                >
                  <span>{token}</span>
                  {!evaluated && (
                    <span className="text-xs text-slate-500 group-hover:text-white">×</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tokens Pool */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Banco de Fichas Sintácticas
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {currentItem.optionsPool.map((token, idx) => (
              <button
                key={`pool-${token}-${idx}`}
                disabled={evaluated}
                onClick={() => handleSelectToken(token)}
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-mono text-xs font-medium text-slate-800 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
          {!evaluated ? (
            <>
              <button
                onClick={handleCheck}
                disabled={selectedTokens.length === 0}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
              >
                <span>Validar Sintaxis</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleReset}
                disabled={selectedTokens.length === 0}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4 text-slate-500" />
                <span>Reiniciar</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <span>Siguiente Pregunta</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Feedback Section */}
        {evaluated && (
          <div
            className={`mt-6 rounded-xl border p-4 transition-all ${
              isCorrect
                ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900'
                : 'border-rose-200 bg-rose-50/60 text-rose-900'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 text-rose-600 shrink-0" />
              )}
              <div className="space-y-2">
                <p className="text-sm font-semibold">
                  {isCorrect ? '¡Comando Correcto!' : 'Sintaxis Incorrecta'}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentItem.explanation}
                </p>
                {!isCorrect && (
                  <div className="font-mono text-xs text-slate-800">
                    <span className="font-semibold text-rose-700">Esperado: </span>
                    {currentItem.correctTokens.join(' ')}
                  </div>
                )}
                {currentItem.examTrapNote && (
                  <div className="flex items-start gap-2 rounded-lg bg-amber-100/70 p-2.5 text-xs text-amber-900">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-700 shrink-0" />
                    <span>{currentItem.examTrapNote}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

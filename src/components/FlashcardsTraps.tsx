'use client';

import React, { useState } from 'react';
import { Layers, RotateCw, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import { flashcardsData } from '../data/flashcardsData';

interface FlashcardsTrapsProps {
  masteredIds: Record<string, boolean>;
  onToggleMastered: (id: string) => void;
}

export const FlashcardsTraps: React.FC<FlashcardsTrapsProps> = ({
  masteredIds,
  onToggleMastered,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcardsData[currentIndex];
  const isMastered = !!masteredIds[currentCard.id];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Layers className="h-6 w-6 text-purple-600" />
            Flashcards & Trampas de Examen
          </h2>
          <p className="text-sm text-slate-500">
            Memoriza las respuestas a las trampas más sutiles y frecuentes del temario ACE v4.0.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
            Tarjeta {currentIndex + 1} de {flashcardsData.length}
          </span>
          <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Dominadas: {Object.values(masteredIds).filter(Boolean).length}
          </span>
        </div>
      </div>

      {/* 3D Flip Card */}
      <div className="mx-auto max-w-2xl perspective-1000">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative min-h-[340px] w-full cursor-pointer rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Front */}
          <div
            className={`flex h-full flex-col justify-between backface-hidden ${
              isFlipped ? 'hidden' : 'block'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-purple-600">
                  Concepto / Escenario Trampa
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <RotateCw className="h-3.5 w-3.5" />
                  Haz clic para voltear
                </span>
              </div>
              <h3 className="mt-8 text-xl font-bold leading-relaxed text-slate-800">
                {currentCard.question}
              </h3>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
              <span>{currentCard.domainId.toUpperCase()}</span>
              <span>Toca cualquier parte de la tarjeta</span>
            </div>
          </div>

          {/* Card Back */}
          <div
            className={`flex h-full flex-col justify-between rotate-y-180 backface-hidden ${
              !isFlipped ? 'hidden' : 'block'
            }`}
          >
            <div className="space-y-4">
              <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Respuesta Correcta de Google Cloud
              </span>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {currentCard.answer}
              </p>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600 shrink-0" />
                  <span className="leading-relaxed">{currentCard.trap}</span>
                </div>
              </div>

              {currentCard.referenceCommand && (
                <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-mono text-emerald-400">
                  <Terminal className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{currentCard.referenceCommand}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
              <span>Toca para volver al frente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Mastery Controls */}
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Anterior</span>
        </button>

        <button
          onClick={() => onToggleMastered(currentCard.id)}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition shadow-sm ${
            isMastered
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CheckCircle className={`h-4 w-4 ${isMastered ? 'text-white' : 'text-slate-400'}`} />
          <span>{isMastered ? 'Concepto Dominado' : 'Marcar como Dominado'}</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <span>Siguiente</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};


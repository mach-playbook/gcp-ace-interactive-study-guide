'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { GcloudQuiz } from '../components/GcloudQuiz';
import { DecisionMatrix } from '../components/DecisionMatrix';
import { FlashcardsTraps } from '../components/FlashcardsTraps';
import { ReadinessTracker } from '../components/ReadinessTracker';
import { Footer } from '../components/Footer';
import { examDomains } from '../data/domainsData';
import { quizItems } from '../data/quizData';
import { flashcardsData } from '../data/flashcardsData';
import { BookOpen, ExternalLink, ShieldCheck, Terminal, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'gcp_ace_study_guide_progress_v1';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'decision' | 'flashcards' | 'tracker'>('quiz');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState<Record<string, boolean>>({});
  const [masteredFlashcards, setMasteredFlashcards] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.checklist) setChecklist(parsed.checklist);
        if (parsed.quizCompleted) setQuizCompleted(parsed.quizCompleted);
        if (parsed.masteredFlashcards) setMasteredFlashcards(parsed.masteredFlashcards);
      }
    } catch {
      // Local storage fallback
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          checklist,
          quizCompleted,
          masteredFlashcards,
        })
      );
    } catch {
      // Ignore write errors
    }
  }, [checklist, quizCompleted, masteredFlashcards, isLoaded]);

  // Toggle checklist item
  const handleToggleCheck = (key: string) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Complete quiz item
  const handleCompleteQuizItem = (id: string) => {
    setQuizCompleted((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Toggle flashcard mastered
  const handleToggleMasteredFlashcard = (id: string) => {
    setMasteredFlashcards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Reset progress
  const handleResetProgress = () => {
    if (window.confirm('¿Estás seguro de que deseas reiniciar tu progreso de estudio?')) {
      setChecklist({});
      setQuizCompleted({});
      setMasteredFlashcards({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Calculate Weighted Readiness Score
  const calculateReadinessScore = (): number => {
    let score = 0;

    // 1. Checklist progress (50% weight total across domains)
    examDomains.forEach((domain) => {
      const itemsInDomain = 4; // average items per domain
      const checkedInDomain = Object.keys(checklist).filter(
        (k) => k.startsWith(domain.id) && checklist[k]
      ).length;
      const domainRatio = Math.min(1, checkedInDomain / itemsInDomain);
      score += domainRatio * (domain.weight * 0.5);
    });

    // 2. Quiz progress (30% weight)
    const completedQuizCount = Object.values(quizCompleted).filter(Boolean).length;
    const quizRatio = quizItems.length > 0 ? completedQuizCount / quizItems.length : 0;
    score += quizRatio * 30;

    // 3. Flashcards mastered (20% weight)
    const masteredCount = Object.values(masteredFlashcards).filter(Boolean).length;
    const flashcardRatio = flashcardsData.length > 0 ? masteredCount / flashcardsData.length : 0;
    score += flashcardRatio * 20;

    return Math.min(100, score);
  };

  const readinessScore = calculateReadinessScore();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as any)}
        readinessScore={readinessScore}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {/* Hero banner */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-md sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4" />
                Guía Interactiva Oficial ACE v4.0
              </span>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Domina el Examen Google Cloud Associate Cloud Engineer
              </h2>
              <p className="text-xs text-blue-100 sm:text-sm max-w-2xl leading-relaxed">
                Entrena con escenarios interactivos de sintaxis CLI, diagramas de decisión para almacenamiento y cómputo, tarjetas de memorización activa y seguimiento ponderado por dominio.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/courses/implementing-cloud-load-balancing-compute-engine/"
                className="flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-bold text-slate-900 shadow-sm transition hover:bg-amber-300"
              >
                <Terminal className="h-4 w-4 text-slate-900" />
                <span>Curso: Cloud Load Balancing (ID: 648)</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="https://cloud.google.com/learn/certification/cloud-engineer"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-100"
              >
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span>Guía Oficial Google</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'quiz' && (
          <GcloudQuiz onCompleteItem={handleCompleteQuizItem} />
        )}
        {activeTab === 'decision' && <DecisionMatrix />}
        {activeTab === 'flashcards' && (
          <FlashcardsTraps
            masteredIds={masteredFlashcards}
            onToggleMastered={handleToggleMasteredFlashcard}
          />
        )}
        {activeTab === 'tracker' && (
          <ReadinessTracker
            checks={checklist}
            onToggleCheck={handleToggleCheck}
            onResetProgress={handleResetProgress}
            readinessScore={readinessScore}
          />
        )}
      </main>

      {/* Reusable Footer */}
      <Footer variant="light" />
    </div>
  );
}


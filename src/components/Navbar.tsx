'use client';

import React from 'react';
import Link from 'next/link';
import { Cloud, Terminal, GitBranch, Layers, CheckCircle2, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  readinessScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, readinessScore }) => {
  const tabs = [
    { id: 'quiz', label: 'gcloud Quiz', icon: Terminal },
    { id: 'decision', label: 'Árboles de Decisión', icon: GitBranch },
    { id: 'flashcards', label: 'Flashcards & Trampas', icon: Layers },
    { id: 'tracker', label: 'Readiness Tracker', icon: CheckCircle2 },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Cloud className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              GCP ACE Interactive Guide
            </h1>
            <p className="text-xs text-slate-500">
              Google Cloud Associate Cloud Engineer Prep (v4.0)
            </p>
          </div>
        </div>

        {/* Readiness Badge & Courses shortcut */}
        <div className="flex items-center gap-3">
          <Link
            href="/courses/"
            className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Cursos & Labs</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
            <span>Readiness:</span>
            <span
              className={`rounded-full px-2 py-0.5 text-white ${
                readinessScore >= 75
                  ? 'bg-emerald-600'
                  : readinessScore >= 60
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
            >
              {Math.round(readinessScore)}%
            </span>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto flex max-w-7xl space-x-2 overflow-x-auto px-4 py-2 sm:px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
          <Link
            href="/courses/"
            className="flex shrink-0 items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50/70 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all sm:text-sm"
          >
            <BookOpen className="h-4 w-4" />
            <span>Cursos & Laboratorios (Hands-On)</span>
          </Link>
        </div>
      </div>
    </header>
  );
};


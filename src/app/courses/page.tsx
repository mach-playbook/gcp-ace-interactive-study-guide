'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { coursesData } from '@/data/coursesData';
import { BookOpen, Clock, ShieldCheck, ChevronRight, Search, Sparkles, Terminal } from 'lucide-react';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Breadcrumb & Header */}
      <div className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-slate-200">Cursos & Laboratorios Prácticos</span>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                <Sparkles className="h-3.5 w-3.5" />
                Google Cloud Skills & Hands-On Labs
              </div>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Cursos & Laboratorios Prácticos Especializados
              </h1>
              <p className="mt-1 text-sm text-slate-400 max-w-2xl">
                Guías detalladas paso a paso, comandos de la CLI gcloud, árboles de decisión y cuestionarios interactivos por cada curso oficial de Google Cloud.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar cursos o temas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course List Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-6 transition-all hover:border-blue-500/50 hover:bg-slate-950/70 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                    ID: {course.templateId}
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                    {course.level}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-3">
                  {course.shortDescription}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Terminal className="h-3.5 w-3.5 text-slate-500" />
                    <span>{course.labs.length} Laboratorios</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-slate-500" />
                    <span>{course.quiz.length} Preguntas Quiz</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <Link
                  href={`/courses/${course.slug}/`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500"
                >
                  <span>Iniciar Curso & Laboratorios</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-16 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-slate-600" />
            <h3 className="mt-4 text-base font-bold text-slate-300">No se encontraron cursos</h3>
            <p className="mt-1 text-xs text-slate-500">
              Intenta con otro término de búsqueda como &quot;Load Balancing&quot; o &quot;Compute&quot;.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}


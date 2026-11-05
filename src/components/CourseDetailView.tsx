'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CourseItem, CourseLab } from '@/types';
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Layers,
  HelpCircle,
  AlertTriangle,
  BookOpen,
  Clock,
  Sparkles,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

interface CourseDetailViewProps {
  course: CourseItem;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course }) => {
  const [activeTab, setActiveTab] = useState<'labs' | 'matrix' | 'quiz' | 'traps'>('labs');
  const [selectedLabId, setSelectedLabId] = useState<string>(course.labs[0]?.id || '');
  const [copiedStepId, setCopiedStepId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const currentLab: CourseLab | undefined = course.labs.find((l) => l.id === selectedLabId) || course.labs[0];

  const handleCopyCommand = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStepId(stepId);
    setTimeout(() => setCopiedStepId(null), 2000);
  };

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateLabProgress = (lab: CourseLab) => {
    if (!lab.steps || lab.steps.length === 0) return 0;
    const completedCount = lab.steps.filter((s) => completedSteps[s.id]).length;
    return Math.round((completedCount / lab.steps.length) * 100);
  };

  const calculateQuizScore = () => {
    let score = 0;
    course.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Breadcrumb & Hero */}
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/courses/" className="hover:text-blue-400 transition-colors">
              Cursos
            </Link>
            <span>/</span>
            <span className="text-slate-200 truncate">{course.title}</span>
          </div>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                  Course ID: {course.templateId}
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                  {course.level}
                </span>
                <span className="rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                  {course.category}
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                {course.title}
              </h1>
              <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-slate-400">
                {course.overview}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/courses/"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Volver a Cursos</span>
              </Link>
            </div>
          </div>

          {/* Sub-navigation tabs */}
          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setActiveTab('labs')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'labs'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Terminal className="h-4 w-4" />
              <span>Laboratorios Prácticos ({course.labs.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'matrix'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Matriz & Arquitectura</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Quiz de Evaluación ({course.quiz.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('traps')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'traps'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Trampas & Glosario</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* TAB 1: LABORATORIOS */}
        {activeTab === 'labs' && currentLab && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar with lab list */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Laboratorios del Curso
              </h2>
              <div className="space-y-2">
                {course.labs.map((lab) => {
                  const isSelected = lab.id === currentLab.id;
                  const progress = calculateLabProgress(lab);
                  return (
                    <button
                      key={lab.id}
                      onClick={() => setSelectedLabId(lab.id)}
                      className={`w-full text-left rounded-xl p-3 text-xs transition-all border ${
                        isSelected
                          ? 'border-blue-500 bg-blue-950/40 text-white shadow-md'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-white">
                          Lab {lab.labNumber}: {lab.type === 'challenge' ? 'Challenge' : 'Guiado'}
                        </span>
                        <span className="text-[10px] text-slate-400">{lab.durationMinutes}m</span>
                      </div>
                      <p className="mt-1 font-medium text-slate-300 line-clamp-1">{lab.title}</p>
                      {/* Mini Progress */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{progress}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Lab Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Lab Banner */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                      Lab {currentLab.labNumber}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {currentLab.durationMinutes} minutos estimados
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <span>Progreso:</span>
                    <span className="text-blue-400 font-mono">
                      {calculateLabProgress(currentLab)}%
                    </span>
                  </div>
                </div>

                <h3 className="mt-3 text-xl font-bold text-white">{currentLab.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {currentLab.description}
                </p>

                {/* Key concepts */}
                <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Conceptos Clave del Laboratorio
                  </h4>
                  <ul className="mt-2 space-y-1 text-xs text-slate-300">
                    {currentLab.keyConcepts.map((concept, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lab Steps */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-200">
                  Secuencia de Comandos gcloud ({currentLab.steps.length} Pasos)
                </h4>

                {currentLab.steps.map((step) => {
                  const isCompleted = !!completedSteps[step.id];
                  return (
                    <div
                      key={step.id}
                      className={`rounded-2xl border transition-all p-5 ${
                        isCompleted
                          ? 'border-emerald-500/40 bg-emerald-950/10'
                          : 'border-slate-800 bg-slate-950/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleStepCompleted(step.id)}
                            aria-label={`Completar paso ${step.stepNumber}`}
                            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                              isCompleted
                                ? 'border-emerald-500 bg-emerald-500 text-white'
                                : 'border-slate-700 bg-slate-900 text-transparent hover:border-slate-500'
                            }`}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <div>
                            <span className="text-xs font-semibold text-blue-400">
                              Paso {step.stepNumber}
                            </span>
                            <h5 className="text-sm font-bold text-white">{step.title}</h5>
                            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {step.command && (
                          <button
                            onClick={() => handleCopyCommand(step.command!, step.id)}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                          >
                            {copiedStepId === step.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5 text-slate-400" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {step.command && (
                        <div className="mt-3 relative rounded-xl border border-slate-800 bg-black/60 p-3 font-mono text-xs text-slate-200 overflow-x-auto">
                          <pre className="whitespace-pre-wrap">{step.command}</pre>
                        </div>
                      )}

                      {step.tip && (
                        <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-xs text-amber-300">
                          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                          <span>{step.tip}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MATRIZ Y ARQUITECTURA */}
        {activeTab === 'matrix' && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
              <h3 className="text-lg font-bold text-white">
                Matriz de Clasificación Canónica de Balanceadores
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Diferenciación arquitectónica según Capa OSI, ámbito geográfico y esquema de proxy.
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60 font-semibold">
                      <th className="p-3">Tipo de Balanceador</th>
                      <th className="p-3">Capa OSI</th>
                      <th className="p-3">Alcance</th>
                      <th className="p-3">Esquema</th>
                      <th className="p-3">Arquitectura</th>
                      <th className="p-3">Casos de Uso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {course.classificationMatrix.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 font-bold text-blue-400">{item.lbType}</td>
                        <td className="p-3 font-mono text-[11px] text-indigo-300">{item.layer}</td>
                        <td className="p-3">{item.scope}</td>
                        <td className="p-3">{item.trafficScheme}</td>
                        <td className="p-3 text-slate-400">{item.architecture}</td>
                        <td className="p-3 text-slate-300">{item.useCase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Health Check Ranges */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
              <h3 className="text-lg font-bold text-white">
                Rangos IP Oficiales de Health Check de Google Cloud
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Las reglas de firewall deben autorizar obligatoriamente estos rangos CIDR para evitar el estado UNHEALTHY en los backends.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.healthCheckRanges.map((hc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4"
                  >
                    <div>
                      <span className="font-mono text-sm font-bold text-emerald-400">
                        {hc.cidr}
                      </span>
                      <p className="mt-1 text-xs text-slate-300">{hc.purpose}</p>
                    </div>
                    <button
                      onClick={() => handleCopyCommand(hc.cidr, `hc-${idx}`)}
                      className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      {copiedStepId === `hc-${idx}` ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUIZ DE EVALUACIÓN */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Cuestionario de Autoevaluación ({course.quiz.length} Preguntas)
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Evalúa tus conocimientos antes de presentar el examen Associate Cloud Engineer.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setShowQuizResults(false);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reiniciar</span>
                  </button>
                  <button
                    onClick={() => setShowQuizResults(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-md shadow-blue-500/20"
                  >
                    <span>Calificar Examen</span>
                  </button>
                </div>
              </div>

              {showQuizResults && (
                <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-blue-400" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        Resultado: {calculateQuizScore()} de {course.quiz.length} aciertos
                      </p>
                      <p className="text-xs text-blue-300">
                        {calculateQuizScore() >= 8
                          ? 'Excelente preparación para las preguntas de Load Balancing del examen ACE.'
                          : 'Revisa las explicaciones y las trampas de examen en las preguntas falladas.'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xl font-mono font-black text-blue-400">
                    {Math.round((calculateQuizScore() / course.quiz.length) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Questions list */}
            <div className="space-y-4">
              {course.quiz.map((q, qIndex) => {
                const selectedOption = quizAnswers[q.id];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = isAnswered && selectedOption === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xs font-bold text-blue-400">
                        {qIndex + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-white leading-relaxed">
                        {q.question}
                      </h4>
                    </div>

                    <div className="space-y-2 pl-9">
                      {q.options.map((option, optIdx) => {
                        const isChosen = selectedOption === optIdx;
                        let optionStyle =
                          'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700';

                        if (showQuizResults) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'border-emerald-500 bg-emerald-950/30 text-emerald-200';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'border-rose-500 bg-rose-950/30 text-rose-200';
                          }
                        } else if (isChosen) {
                          optionStyle = 'border-blue-500 bg-blue-950/40 text-blue-200';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`w-full text-left rounded-xl border p-3 text-xs leading-relaxed transition-all ${optionStyle}`}
                          >
                            <span className="font-semibold mr-2">{String.fromCharCode(65 + optIdx)})</span>
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {showQuizResults && (
                      <div className="mt-3 pl-9 space-y-2">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-300">
                          <span className="font-bold text-emerald-400">Explicación Oficial: </span>
                          {q.explanation}
                        </div>
                        {q.examTrapTip && (
                          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-300 flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                            <div>
                              <span className="font-bold">Tip de Examen: </span>
                              {q.examTrapTip}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: TRAMPAS Y GLOSARIO */}
        {activeTab === 'traps' && (
          <div className="space-y-8">
            {/* Exam Traps */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
              <h3 className="text-lg font-bold text-white">
                Trampas Frecuentes en el Examen ACE sobre Load Balancing
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Puntos de confusión habituales en las preguntas de opción múltiple de la certificación.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.examTraps.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2"
                  >
                    <div className="flex items-start gap-2 text-rose-300 text-xs font-bold">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                      <span>{item.trap}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-6 border-l-2 border-rose-500/30">
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Glossary */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
              <h3 className="text-lg font-bold text-white">Glosario Técnico Especializado</h3>
              <p className="mt-1 text-xs text-slate-400">
                Términos clave y definiciones oficiales para Compute Engine y Cloud Load Balancing.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.glossary.map((g, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1"
                  >
                    <h4 className="text-xs font-bold text-blue-400">{g.term}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{g.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Cloud,
  Terminal,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Globe,
  Mail,
  Award,
  Layers,
  Code2,
  Cpu,
  Sparkles,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { Footer } from '@/components/Footer';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      <div>
        {/* Top Navbar / Breadcrumb */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:scale-105 transition-transform"
              >
                <Cloud className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-sm font-bold text-white sm:text-base">
                  GCP ACE Interactive Guide
                </h1>
                <p className="text-[11px] text-slate-400">
                  Acerca de la Plataforma & Autor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Volver a</span> Guía ACE
              </Link>
              <Link
                href="/courses/"
                className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Cursos & Labs</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Preparación de Alto Rendimiento para Google Cloud</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Acerca de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">GCP ACE Interactive Study Guide</span>
            </h2>
            <p className="mx-auto max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Una plataforma web interactiva y de acceso libre diseñada para arquitectos, ingenieros de software y profesionales de TI que buscan dominar las competencias del examen <strong>Google Cloud Associate Cloud Engineer (ACE)</strong> mediante práctica aplicada, rigor técnico y escenarios reales.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-16">
          {/* Section 1: Finalidad y Propósito */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <TargetIcon className="h-4 w-4" />
              </div>
              <h3 className="text-xl font-bold text-white">Finalidad y Misión del Proyecto</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Terminal className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white">Hands-On & gcloud Simulator</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Supera la memorización pasiva. Entrena la sintaxis exacta de la CLI <code>gcloud</code>, identidades IAM, filtros de recursos y flags esenciales para evitar las opciones distractoras del examen.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white">Laboratorios Guiados Paso a Paso</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cursos modulares como <em>Load Balancing en Compute Engine</em> y <em>Core Infrastructure</em>, con instrucciones paso a paso, arquitectura de referencia y verificación en tiempo real.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white">Detección de Trampas de Examen</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Catálogo exhaustivo de trampas comunes (ej. proxies globales vs regionales, Cloud NAT vs IP pública, Storage Nearline vs Archive) y cuestionarios que exigen respuesta completa obligatoria.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Arquitectura y Metodología */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Code2 className="h-4 w-4" />
              </div>
              <h3 className="text-xl font-bold text-white">Arquitectura Técnica y LLM Wiki</h3>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 sm:p-8 space-y-6">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Esta aplicación está construida sobre los principios de arquitectura moderna de software y la metodología de <strong>LLM Wiki de Andrej Karpathy</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    Next.js 16 App Router (Static Export)
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    Compilada como Single Page Application (SPA) pura sin servidor (SSG), lo que garantiza máxima velocidad de entrega en GitHub Pages y compatibilidad con navegadores sin conexión.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                  <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                    LLM Wiki Modular (Karpathy Standard)
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    Toda la base de conocimiento se mantiene como memoria estructurada en Markdown dentro del directorio <code>wiki/</code>, separando insumos crudos (<code>wiki/raw/</code>) de síntesis técnica canónica.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Calidad de Software & BDD
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    Suite integral de pruebas unitarias y pruebas basadas en comportamiento (BDD con Vitest y Testing Library) que validan el comportamiento pedagógico previo a cualquier despliegue.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    WCAG 2.1 & Ergonomía Visual
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    Contraste cromático optimizado para sesiones prolongadas de estudio, soporte responsivo integral para móviles, tablets y monitores ultraanchos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Sobre el Autor */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Award className="h-4 w-4" />
              </div>
              <h3 className="text-xl font-bold text-white">Sobre el Autor</h3>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-400">
                    <span>Arquitecto de Software & Autor Técnico</span>
                  </div>
                  <h4 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                    Lenin Meza
                  </h4>
                  <p className="text-xs text-slate-400 flex flex-wrap items-center gap-2 mt-1">
                    <span>📍 El Marqués, Querétaro, México</span>
                    <span>•</span>
                    <span>Software Architect & Technical Lead (@merolhack)</span>
                  </p>
                </div>

                {/* Quick Action Profile Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://merolhack.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-700 transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5 text-blue-400" />
                    <span>GitHub Pages (Portfolio)</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/leninmezazarco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/40 bg-blue-600/20 px-3.5 py-2 text-xs font-semibold text-blue-300 shadow-sm hover:bg-blue-600/30 transition-colors"
                  >
                    <LinkedinIcon className="h-3.5 w-3.5 text-blue-400" />
                    <span>LinkedIn</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>

                  <a
                    href="https://github.com/merolhack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 shadow-sm hover:bg-slate-700 transition-colors"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </div>

              {/* Author Bio */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  Con más de 17 años de trayectoria en ingeniería de software, arquitectura empresarial (TOGAF, BIAN) y sistemas distribuidos de misión crítica (Bank as a Service, verificación de identidad biométrica, multi-cloud GCP/AWS), Lenin Meza lidera iniciativas técnicas orientadas a la resiliencia, la seguridad Zero-Trust y la modernización de infraestructuras cloud-native.
                </p>
                <p>
                  Es autor de la publicación técnica y libro{' '}
                  <strong className="text-white">
                    &ldquo;Playbook de Arquitectura MACH: Estrategias Prácticas para Sistemas Componibles, Microservicios y Headless en la Era Agente&rdquo;
                  </strong>{' '}
                  (Amazon KDP 2026, ASIN: B0HFYGC34D), obra de 314 páginas que detalla patrones de diseño desacoplado (Microservicios, API-First, Cloud-Native, Headless) y automatización con agentes de IA mediante el Model Context Protocol (MCP).
                </p>
                <p className="text-slate-400">
                  Esta guía de preparación para Google Cloud Associate Cloud Engineer surge como una iniciativa abierta para transferir conocimiento práctico y elevar el estándar de los equipos de ingeniería en América Latina e Iberoamérica.
                </p>
              </div>

              {/* Publication and Ecosystem Card */}
              <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 to-slate-900/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                    <BookOpen className="h-4 w-4" />
                    <span>Publicación Matriz & Editorial</span>
                  </div>
                  <h5 className="text-sm font-bold text-white">MACH Playbook</h5>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Aprende los fundamentos de la arquitectura MACH con límites de servicio concretos, APIs limpias y ejemplos de despliegue en entornos reales.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://mach-playbook.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
                  >
                    <span>Visitar MACH Playbook</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="https://www.amazon.es/dp/B0HFYGC34D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    <span>Ver en Amazon</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </div>

              {/* Contact and Community Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1">
                  <span>📖</span>
                  <span>Playbook de Arquitectura MACH (2026)</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1">
                  <span>☁️</span>
                  <span>Google Cloud Platform • Multi-Cloud</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1">
                  <Mail className="h-3 w-3 text-slate-400" />
                  <a
                    href="mailto:merolhack@gmail.com"
                    className="hover:text-blue-400 transition-colors"
                  >
                    merolhack@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Disclaimer Oficial */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6 space-y-2 text-xs text-slate-400">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              Descargo de Responsabilidad (Disclaimer)
            </h4>
            <p className="leading-relaxed">
              Este sitio web es un proyecto educativo independiente desarrollado sin fines de lucro comercial. Google Cloud, Google Cloud Platform, GCP, gcloud y Associate Cloud Engineer (ACE) son marcas comerciales registradas de Google LLC y Alphabet Inc. Este recurso de preparación no está patrocinado, afiliado ni aprobado oficialmente por Google LLC. El material contenido ha sido sintetizado a partir de documentación pública oficial, especificaciones abiertas de arquitectura y guías oficiales de estudio.
            </p>
          </section>
        </main>
      </div>

      {/* Reusable Unified Footer */}
      <Footer variant="dark" />
    </div>
  );
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Globe, BookOpen, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  variant?: 'light' | 'dark';
}

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

export const Footer: React.FC<FooterProps> = ({ variant = 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <footer
      className={`border-t transition-colors ${isDark
          ? 'border-slate-800 bg-slate-950 text-slate-400'
          : 'border-slate-200 bg-white text-slate-600'
        } py-12 text-xs`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg font-black text-xs ${isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  }`}
              >
                GCP
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                GCP ACE Interactive Study Guide & Labs
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed opacity-85">
              Guía de preparación interactiva de alto rendimiento para el examen Google Cloud
              Associate Cloud Engineer (ACE). Simulador de sintaxis gcloud, laboratorios prácticos
              paso a paso, matrices de decisión y flashcards de trampas de examen.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-emerald-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Offline-ready • SPA Estática en GitHub Pages</span>
            </div>
          </div>

          {/* Col 2: Navegación del Sitio */}
          <div className="space-y-2">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
            >
              Navegación
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/"
                  className={`transition-colors hover:underline ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                >
                  Inicio (Guía ACE)
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/"
                  className={`transition-colors hover:underline ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                >
                  Cursos & Laboratorios
                </Link>
              </li>
              <li>
                <Link
                  href="/about/"
                  className={`transition-colors hover:underline ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                >
                  Acerca de la Plataforma
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/mach-playbook/gcp-ace-interactive-study-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 transition-colors hover:underline ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                >
                  <span>Repositorio GitHub</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Autor & Redes */}
          <div className="space-y-2">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
            >
              Autor & Perfiles
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://merolhack.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 font-medium transition-colors hover:underline ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    }`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Lenin Meza (Portfolio)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/leninmezazarco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 transition-colors hover:underline ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                >
                  <LinkedinIcon className="h-3.5 w-3.5 text-blue-500" />
                  <span>LinkedIn Oficial</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/merolhack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 transition-colors hover:underline ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub (@merolhack)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosistema MACH */}
          <div className="space-y-2">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
            >
              Ecosistema MACH
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://mach-playbook.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 font-medium transition-colors hover:underline ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
                    }`}
                >
                  <span>MACH Playbook</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.amazon.es/dp/B0HFYGC34D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 transition-colors hover:underline ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                >
                  <span>Libro MACH (Amazon KDP)</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimers */}
        <div
          className={`mt-10 pt-6 flex flex-col items-center justify-between gap-4 border-t sm:flex-row ${isDark ? 'border-slate-900' : 'border-slate-100'
            }`}
        >
          <div className="flex flex-wrap items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 MACH Playbook — Desarrollado por</span>
            <a
              href="https://merolhack.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold hover:underline ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                }`}
            >
              Lenin Meza
            </a>
            <span>• Todos los derechos reservados.</span>
          </div>

          <p className="text-[11px] opacity-75 text-center sm:text-right max-w-xl">
            Iniciativa educativa independiente de código abierto. Google Cloud, GCP y Associate Cloud Engineer son marcas registradas de Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};

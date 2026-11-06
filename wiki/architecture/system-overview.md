# 🏗️ Arquitectura del Sistema: Guía Interactiva GCP ACE

Este documento detalla la arquitectura de software recomendada para la aplicación web interactiva de preparación del examen Associate Cloud Engineer.

---

## 🎯 Requisitos de Arquitectura

1. **Rendimiento y Zero-CLS**: Carga instantánea, animaciones fluidas a 60 fps y estructura sin cambios de diseño acumulativos (Cumulative Layout Shift).
2. **Capacidad Offline-First**: Soporte de estudio sin conexión a internet permanente; persistencia local del progreso en `localStorage`.
3. **Diseño Adaptativo (Mobile-First)**: Optimizado para estudio rápido en pantallas móviles (360px) hasta monitores de escritorio (1920px), con áreas de toque táctil accesibles (mínimo 44×44 px).
4. **Cero Dependencia de Backend Obligatorio**: Arquitectura estática (Static Site Generation / SPA) ejecutable en GitHub Pages o Cloudflare Pages sin servidor costoso.

---

## 🛠️ Stack Tecnológico Implementado

* **Framework Base**: Next.js 16 (App Router) configurado con `output: 'export'` para Static Site Generation (SSG).
* **Estilos**: Tailwind CSS con paleta temática accesible de Google Cloud (Blues, Slate, Emerald, Amber, Rose) y soporte responsive multi-dispositivo.
* **Gestión de Estado**: React hooks locales con persistencia automática en `localStorage` (puntuaciones de quiz, progreso de laboratorios y flashcards dominadas).
* **Iconografía & Accesibilidad**: Lucide React e iconos SVG optimizados.
* **Componentes Interactivos Clave**:
  * Emulador de comandos `gcloud` con validación sintáctica y feedback inmediato.
  * Selector de matrices y árboles de decisión arquitectónica.
  * Tarjetas interactivas de flashcards para trampas de examen.
  * Seguimiento de preparación (Readiness Tracker) ponderado por dominio ACE.
  * Catálogo y vistas de detalle por curso (`/courses/` y `/courses/[slug]/`).
  * Página institucional de Acerca de (`/about/`) con misión educativa, detalles del autor (**Lenin Meza**), ecosistema **MACH Playbook** y descargo de responsabilidad oficial.
  * Pie de página unificado (`Footer.tsx`) con enlaces bidireccionales de portafolio, LinkedIn, GitHub y proyectos asociados.



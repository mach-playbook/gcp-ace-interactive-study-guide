# 🏗️ Arquitectura del Sistema: Guía Interactiva GCP ACE

Este documento detalla la arquitectura de software recomendada para la aplicación web interactiva de preparación del examen Associate Cloud Engineer.

---

## 🎯 Requisitos de Arquitectura

1. **Rendimiento y Zero-CLS**: Carga instantánea, animaciones fluidas a 60 fps y estructura sin cambios de diseño acumulativos (Cumulative Layout Shift).
2. **Capacidad Offline-First**: Soporte de estudio sin conexión a internet permanente; persistencia local del progreso en `localStorage`.
3. **Diseño Adaptativo (Mobile-First)**: Optimizado para estudio rápido en pantallas móviles (360px) hasta monitores de escritorio (1920px), con áreas de toque táctil accesibles (mínimo 44×44 px).
4. **Cero Dependencia de Backend Obligatorio**: Arquitectura estática (Static Site Generation / SPA) ejecutable en GitHub Pages o Cloudflare Pages sin servidor costoso.

---

## 🛠️ Stack Tecnológico Sugerido

* **Framework Base**: React + TypeScript + Vite o Next.js (App Router, SSG).
* **Estilos**: Tailwind CSS con paleta temática accesible de Google Cloud (Blues, Slate, Emerald, Amber, Rose).
* **Gestión de Estado**: Zustand o React Context con sincronización automática en `localStorage`.
* **Iconografía**: Lucide React o Heroicons.
* **Componentes Interactivos Clave**:
  * Terminal de simulación de comandos `gcloud` con autocompletado y validación sintáctica.
  * Selector de árbol de decisión con transiciones suaves.
  * Tarjetas de flashcards 3D con giro (flip) al clic/touch.
  * Gráfico radial o barras de progreso por dominio.


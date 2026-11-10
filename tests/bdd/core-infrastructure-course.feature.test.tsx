import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CourseDetailView } from '@/components/CourseDetailView';
import { coursesData } from '@/data/coursesData';

describe('BDD Feature: Google Cloud Fundamentals Core Infrastructure Course Interaction', () => {
  const course60 = coursesData.find(
    (c) => c.slug === 'google-cloud-fundamentals-core-infrastructure'
  )!;

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  describe('Scenario 1: User navigates to Course 60 and views overview, duration, and labs list', () => {
    it('Given the user loads Course 60, Then the header, template ID 60, and labs list are displayed', () => {
      render(<CourseDetailView course={course60} />);

      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /Google Cloud Fundamentals: Core Infrastructure/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText('Course ID: 60')).toBeInTheDocument();
      expect(screen.getByText('Laboratorios del Curso')).toBeInTheDocument();
      expect(screen.getAllByText('Getting Started with Cloud Marketplace').length).toBeGreaterThan(0);
    });

    it('When the user selects Lab 2 (VPC Networking & Compute Engine), Then its steps and concepts are shown', () => {
      render(<CourseDetailView course={course60} />);

      const lab2Button = screen.getByRole('button', {
        name: /Get Started with VPC Networking and Compute Engine/i,
      });
      fireEvent.click(lab2Button);

      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /Get Started with VPC Networking and Compute Engine/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText('Crear red VPC personalizada (Custom Mode)')).toBeInTheDocument();
      expect(screen.getAllByText(/my-custom-vpc/).length).toBeGreaterThan(0);
    });
  });

  describe('Scenario 2: User interacts with lab step completion and command copying', () => {
    it('When the user toggles a lab step checkbox, Then the step is marked and progress updates', () => {
      render(<CourseDetailView course={course60} />);

      // Initial progress should be 0%
      expect(screen.getAllByText('0%').length).toBeGreaterThan(0);

      // Toggle step 1 of current lab
      const step1Button = screen.getByRole('button', { name: 'Completar paso 1' });
      fireEvent.click(step1Button);

      // Progress should now be updated (e.g. 33% for a 3-step lab)
      expect(screen.getAllByText(/33%/).length).toBeGreaterThan(0);
    });

    it('When the user clicks the copy button on a command, Then navigator.clipboard is called', () => {
      render(<CourseDetailView course={course60} />);

      const copyButtons = screen.getAllByRole('button', { name: /copiar/i });
      if (copyButtons.length > 0) {
        fireEvent.click(copyButtons[0]);
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
      }
    });
  });

  describe('Scenario 3: User inspects the Storage & Database taxonomy matrix', () => {
    it('When the user clicks the Matrix tab, Then all 6 core storage engines are displayed', () => {
      render(<CourseDetailView course={course60} />);

      const matrixTabButton = screen.getByRole('button', { name: /Matriz & Arquitectura/i });
      fireEvent.click(matrixTabButton);

      expect(screen.getByText('Cloud Storage')).toBeInTheDocument();
      expect(screen.getByText('Cloud SQL')).toBeInTheDocument();
      expect(screen.getByText('Cloud Spanner')).toBeInTheDocument();
      expect(screen.getByText('Firestore')).toBeInTheDocument();
      expect(screen.getByText('Cloud Bigtable')).toBeInTheDocument();
      expect(screen.getByText('BigQuery')).toBeInTheDocument();
    });
  });

  describe('Scenario 4: User takes the 10-question evaluation quiz and grades their performance', () => {
    it('When the user attempts to grade with unanswered questions, Then grading is blocked and an error is displayed', () => {
      render(<CourseDetailView course={course60} />);

      const quizTabButton = screen.getByRole('button', { name: /Quiz de Evaluación/i });
      fireEvent.click(quizTabButton);

      expect(screen.getByText(/Cuestionario de Autoevaluación/i)).toBeInTheDocument();

      // Only select option for Question 1
      const optionButtons = screen.getAllByRole('button', { name: /Cloud SQL/i });
      expect(optionButtons.length).toBeGreaterThan(0);
      fireEvent.click(optionButtons[0]);

      // Attempt to Grade Quiz
      const gradeButton = screen.getByRole('button', { name: /Calificar Examen/i });
      fireEvent.click(gradeButton);

      // Warning alert should be shown and score banner must NOT be shown
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Examen Incompleto/i)).toBeInTheDocument();
      expect(screen.getByText(/Debes responder todas las preguntas antes de calificar/i)).toBeInTheDocument();
      expect(screen.queryByText(/Resultado:/i)).not.toBeInTheDocument();
    });

    it('When the user answers all questions and grades the quiz, Then results and official explanations are revealed', () => {
      render(<CourseDetailView course={course60} />);

      const quizTabButton = screen.getByRole('button', { name: /Quiz de Evaluación/i });
      fireEvent.click(quizTabButton);

      // Answer all 10 questions in course60 using container query
      course60.quiz.forEach((q) => {
        const questionEl = document.getElementById(`quiz-question-${q.id}`)!;
        const optionButtons = questionEl.querySelectorAll('button');
        fireEvent.click(optionButtons[q.correctIndex]);
      });

      // Grade Quiz
      const gradeButton = screen.getByRole('button', { name: /Calificar Examen/i });
      fireEvent.click(gradeButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByText(/Resultado:/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Explicación Oficial:/i).length).toBeGreaterThan(0);
    });
  });

  describe('Scenario 5: User reviews the exam traps and technical glossary', () => {
    it('When the user navigates to Traps & Glossary tab, Then security traps and terms are visible', () => {
      render(<CourseDetailView course={course60} />);

      const trapsTabButton = screen.getByRole('button', { name: /Trampas & Glosario/i });
      fireEvent.click(trapsTabButton);

      expect(
        screen.getByText(/Uso de Roles Básicos \(Owner, Editor, Viewer\) en entornos de producción/i)
      ).toBeInTheDocument();
      expect(screen.getByText('Service Account')).toBeInTheDocument();
      expect(screen.getByText('Cloud Identity')).toBeInTheDocument();
      expect(screen.getByText('Virtual Private Cloud (VPC)')).toBeInTheDocument();
    });
  });

  describe('Scenario 6: User explores official video lessons with YouTube player and key takeaways', () => {
    it('When the user clicks the Videos & Lecciones tab, Then the video playlist, embedded player, and takeaways are displayed', () => {
      render(<CourseDetailView course={course60} />);

      const videosTabButton = screen.getByRole('button', { name: /Videos & Lecciones/i });
      expect(videosTabButton).toBeInTheDocument();
      fireEvent.click(videosTabButton);

      expect(
        screen.getByText(new RegExp(`Lecciones en Video \\(${course60.videos?.length}\\)`, 'i'))
      ).toBeInTheDocument();
      expect(screen.getAllByText('Course Introduction').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cloud Computing Overview').length).toBeGreaterThan(0);
      expect(screen.getAllByText('IaaS and PaaS').length).toBeGreaterThan(0);
      expect(screen.getAllByText('The Google Cloud Network').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Environmental Impact').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Security').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Open Source Ecosystems').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Pricing and Billing').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Google Cloud Resource Hierarchy').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Identity and Access Management (IAM)').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Service Accounts').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cloud Identity').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Interacting with Google Cloud').length).toBeGreaterThan(0);
      expect(screen.getByText(/Resumen Conceptual de la Lección/i)).toBeInTheDocument();
      expect(screen.getByText(/Puntos Clave para el Examen ACE:/i)).toBeInTheDocument();

      // Switch to Lesson 2 (Cloud Computing Overview)
      const lesson2Button = screen.getByRole('button', { name: /Cloud Computing Overview/i });
      fireEvent.click(lesson2Button);

      expect(screen.getByText(/Definición formal de Cloud Computing según el NIST/i)).toBeInTheDocument();
      expect(screen.getByText(/Tercera ola \(Google Cloud\)/i)).toBeInTheDocument();

      // Switch to Lesson 3 (IaaS and PaaS)
      const lesson3Button = screen.getByRole('button', { name: /IaaS and PaaS/i });
      fireEvent.click(lesson3Button);

      expect(screen.getByText(/Comparación entre los modelos de servicio en la nube/i)).toBeInTheDocument();
      expect(screen.getByText(/IaaS \(Compute Engine\): Aprovisiona recursos crudos/i)).toBeInTheDocument();

      // Switch to Lesson 4 (The Google Cloud Network)
      const lesson4Button = screen.getByRole('button', { name: /The Google Cloud Network/i });
      fireEvent.click(lesson4Button);

      expect(screen.getByText(/Explora la infraestructura de red global de Google Cloud/i)).toBeInTheDocument();
      expect(screen.getByText(/Puntos de presencia \(PoPs\): Más de 100 nodos de caché/i)).toBeInTheDocument();

      // Switch to Lesson 6 (Security)
      const lesson6Button = screen.getByRole('button', { name: /Security/i });
      fireEvent.click(lesson6Button);

      expect(screen.getByText(/Arquitectura integral de seguridad de Google Cloud organizada en 6 capas/i)).toBeInTheDocument();
      expect(screen.getByText(/Capa de Hardware: Chips de seguridad propietarios Titan/i)).toBeInTheDocument();

      // Switch to Lesson 8 (Pricing and Billing)
      const lesson8Button = screen.getByRole('button', { name: /Pricing and Billing/i });
      fireEvent.click(lesson8Button);

      expect(screen.getByText(/Estructura de precios, modelos de facturación y gobernanza financiera/i)).toBeInTheDocument();
      expect(screen.getByText(/Sustained-Use Discounts \(SUD\): Descuentos automáticos/i)).toBeInTheDocument();
    });
  });
});

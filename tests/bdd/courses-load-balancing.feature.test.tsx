import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CourseDetailView } from '@/components/CourseDetailView';
import { coursesData } from '@/data/coursesData';

describe('BDD Feature: Implementing Cloud Load Balancing Course Interaction', () => {
  const course648 = coursesData.find(
    (c) => c.slug === 'implementing-cloud-load-balancing-compute-engine'
  )!;

  beforeEach(() => {
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  describe('Scenario 1: User views course overview and navigates between guided labs and challenge lab', () => {
    it('Given the user loads the course detail page, Then the title, template ID, and labs are rendered', () => {
      render(<CourseDetailView course={course648} />);

      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /Implementing Cloud Load Balancing for Compute Engine/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText('Course ID: 648')).toBeInTheDocument();
      expect(screen.getByText('Laboratorios del Curso')).toBeInTheDocument();
      expect(screen.getAllByText('Configure a Passthrough Network Load Balancer').length).toBeGreaterThan(0);
    });

    it('When the user selects Lab 4 (Challenge Lab), Then the challenge lab details and steps are shown', () => {
      render(<CourseDetailView course={course648} />);

      const challengeLabButton = screen.getByRole('button', { name: /Lab 4: Challenge/i });
      fireEvent.click(challengeLabButton);

      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /Implement Load Balancing on Compute Engine — Challenge Lab/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText(/Lab ID: 613025/)).toBeInTheDocument();
      expect(screen.getByText('Paso 1')).toBeInTheDocument();
      expect(screen.getByText('Definir variables de entorno del reto')).toBeInTheDocument();
    });
  });

  describe('Scenario 2: User completes lab steps and observes progress calculation', () => {
    it('When the user toggles a step checkbox, Then the step is marked completed and progress updates', () => {
      render(<CourseDetailView course={course648} />);

      // Initial progress: elements with 0% should be present
      expect(screen.getAllByText('0%').length).toBeGreaterThan(0);

      // Find step 1 toggle button by aria-label
      const step1Button = screen.getByRole('button', { name: 'Completar paso 1' });
      expect(step1Button).toBeInTheDocument();

      // Toggle step 1
      fireEvent.click(step1Button);

      // Progress should now show 25% (in sidebar and/or header)
      expect(screen.getAllByText(/25%/).length).toBeGreaterThan(0);
    });

    it('When the user clicks the copy button on a gcloud command, Then clipboard is called', () => {
      render(<CourseDetailView course={course648} />);

      const copyButtons = screen.getAllByRole('button', { name: /copiar/i });
      expect(copyButtons.length).toBeGreaterThan(0);

      fireEvent.click(copyButtons[0]);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  describe('Scenario 3: User reviews the canonical classification matrix and Health Check IP ranges', () => {
    it('When the user navigates to the Matrix tab, Then the L4 vs L7 comparison and Google CIDRs are visible', () => {
      render(<CourseDetailView course={course648} />);

      const matrixTabButton = screen.getByRole('button', { name: /Matriz & Arquitectura/i });
      fireEvent.click(matrixTabButton);

      expect(
        screen.getByText('Matriz de Clasificación Canónica de Balanceadores')
      ).toBeInTheDocument();
      expect(screen.getByText('External Application Load Balancer')).toBeInTheDocument();
      expect(screen.getByText('Internal Application Load Balancer')).toBeInTheDocument();
      expect(screen.getByText('External Passthrough Network Load Balancer')).toBeInTheDocument();

      // Check Google Health Check CIDRs
      expect(screen.getByText('130.211.0.0/22')).toBeInTheDocument();
      expect(screen.getByText('35.191.0.0/16')).toBeInTheDocument();
    });
  });

  describe('Scenario 4: User takes the interactive evaluation quiz and reviews score and feedback', () => {
    it('When the user attempts to grade the exam with unanswered questions, Then grading is blocked and an incomplete exam warning is shown', () => {
      render(<CourseDetailView course={course648} />);

      const quizTabButton = screen.getByRole('button', { name: /Quiz de Evaluación/i });
      fireEvent.click(quizTabButton);

      expect(screen.getByText(/Cuestionario de Autoevaluación/i)).toBeInTheDocument();

      // Only answer question 1
      const firstQuestionOptions = screen.getAllByRole('button', {
        name: /External Application actúa como proxy L7/i,
      });
      expect(firstQuestionOptions.length).toBeGreaterThan(0);
      fireEvent.click(firstQuestionOptions[0]);

      // Attempt to submit quiz without answering the rest
      const gradeButton = screen.getByRole('button', { name: /Calificar Examen/i });
      fireEvent.click(gradeButton);

      // Warning alert should be shown and score banner must NOT be shown
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Examen Incompleto/i)).toBeInTheDocument();
      expect(screen.getByText(/Debes responder todas las preguntas antes de calificar/i)).toBeInTheDocument();
      expect(screen.queryByText(/Resultado:/i)).not.toBeInTheDocument();
    });

    it('When the user answers all questions and submits the quiz, Then the score and explanations are presented', () => {
      render(<CourseDetailView course={course648} />);

      const quizTabButton = screen.getByRole('button', { name: /Quiz de Evaluación/i });
      fireEvent.click(quizTabButton);

      // Answer all 10 questions in course648 using container query
      course648.quiz.forEach((q) => {
        const questionEl = document.getElementById(`quiz-question-${q.id}`)!;
        const optionButtons = questionEl.querySelectorAll('button');
        fireEvent.click(optionButtons[q.correctIndex]);
      });

      // Submit quiz
      const gradeButton = screen.getByRole('button', { name: /Calificar Examen/i });
      fireEvent.click(gradeButton);

      // Score banner and official explanations should now be visible
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByText(/Resultado:/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Explicación Oficial:/i).length).toBeGreaterThan(0);
    });
  });

  describe('Scenario 5: User accesses exam traps and technical glossary', () => {
    it('When the user navigates to Traps & Glossary tab, Then exam warnings and definitions appear', () => {
      render(<CourseDetailView course={course648} />);

      const trapsTabButton = screen.getByRole('button', { name: /Trampas & Glosario/i });
      fireEvent.click(trapsTabButton);

      expect(
        screen.getByText('Trampas Frecuentes en el Examen ACE sobre Load Balancing')
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Instancias UNHEALTHY a pesar de que el servicio web está levantado/i)
      ).toBeInTheDocument();

      // Check glossary terms
      expect(screen.getByText('Glosario Técnico Especializado')).toBeInTheDocument();
      expect(screen.getByText('Anycast IP')).toBeInTheDocument();
      expect(screen.getByText('Proxy-Only Subnet')).toBeInTheDocument();
    });
  });
});

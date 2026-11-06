import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import AboutPage from '@/app/about/page';

describe('BDD Feature: Author Accreditation & About Page Experience', () => {
  describe('Scenario 1: User inspects the Footer and discovers author accreditation and external links', () => {
    it('Given the Footer component is rendered, Then it displays the author Lenin Meza linking to https://merolhack.github.io/', () => {
      render(<Footer variant="dark" />);

      // Find links to author's portfolio
      const authorLinks = screen.getAllByRole('link', { name: /Lenin Meza/i });
      expect(authorLinks.length).toBeGreaterThanOrEqual(1);

      const portfolioLink = authorLinks.find(
        (link) => link.getAttribute('href') === 'https://merolhack.github.io/'
      );
      expect(portfolioLink).toBeDefined();
      expect(portfolioLink).toHaveAttribute('target', '_blank');
      expect(portfolioLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('Then it includes links to LinkedIn, MACH Playbook, GitHub repo, and the About page', () => {
      render(<Footer variant="dark" />);

      // LinkedIn link
      const linkedinLink = screen.getByRole('link', { name: /LinkedIn Oficial/i });
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/leninmezazarco');

      // MACH Playbook link
      const machLink = screen.getByRole('link', { name: /MACH Playbook/i });
      expect(machLink).toHaveAttribute('href', 'https://mach-playbook.github.io/');

      // GitHub repo link
      const repoLink = screen.getByRole('link', { name: /Repositorio GitHub/i });
      expect(repoLink).toHaveAttribute(
        'href',
        'https://github.com/mach-playbook/gcp-ace-interactive-study-guide'
      );

      // About page internal link
      const aboutLink = screen.getByRole('link', { name: /Acerca de la Plataforma/i });
      expect(aboutLink.getAttribute('href')).toMatch(/^\/about\/?$/);
    });
  });

  describe('Scenario 2: User visits the About page to learn project purpose and author background', () => {
    it('Given the user opens the About page, Then it renders the platform mission and pillars', () => {
      render(<AboutPage />);

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Acerca de GCP ACE Interactive Study Guide/i,
        })
      ).toBeInTheDocument();

      expect(screen.getByText(/Finalidad y Misión del Proyecto/i)).toBeInTheDocument();
      expect(screen.getByText(/Hands-On & gcloud Simulator/i)).toBeInTheDocument();
      expect(screen.getByText(/Laboratorios Guiados Paso a Paso/i)).toBeInTheDocument();
      expect(screen.getByText(/Detección de Trampas de Examen/i)).toBeInTheDocument();
    });

    it('Then it details author Lenin Meza with his book publication and social channels', () => {
      render(<AboutPage />);

      expect(screen.getByText('Sobre el Autor')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: 'Lenin Meza' })).toBeInTheDocument();
      expect(screen.getAllByText(/Playbook de Arquitectura MACH/i).length).toBeGreaterThanOrEqual(1);

      // Check external author links
      const portfolioLinks = screen.getAllByRole('link', { name: /GitHub Pages/i });
      expect(portfolioLinks.length).toBeGreaterThanOrEqual(1);
      portfolioLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', 'https://merolhack.github.io/');
      });

      const linkedinLinks = screen.getAllByRole('link', { name: /LinkedIn/i });
      expect(linkedinLinks.length).toBeGreaterThanOrEqual(1);
      linkedinLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/leninmezazarco');
      });

      const machLinks = screen.getAllByRole('link', { name: /MACH Playbook/i });
      expect(machLinks.length).toBeGreaterThanOrEqual(1);
      machLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', 'https://mach-playbook.github.io/');
      });
    });

    it('Then it displays the official educational disclaimer regarding Google Cloud trademark', () => {
      render(<AboutPage />);

      expect(screen.getByText(/Descargo de Responsabilidad \(Disclaimer\)/i)).toBeInTheDocument();
      expect(screen.getByText(/no está patrocinado, afiliado ni aprobado oficialmente por Google LLC/i)).toBeInTheDocument();
    });
  });

  describe('Scenario 3: User accesses the About page shortcut from the Navbar', () => {
    it('Given the Navbar is rendered, Then it contains navigation links pointing to /about/', () => {
      render(<Navbar activeTab="quiz" setActiveTab={() => {}} readinessScore={80} />);

      const aboutLinks = screen.getAllByRole('link', { name: /Acerca de/i });
      expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
      aboutLinks.forEach((link) => {
        expect(link.getAttribute('href')).toMatch(/^\/about\/?$/);
      });
    });
  });
});

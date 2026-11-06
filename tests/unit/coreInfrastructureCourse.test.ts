import { describe, it, expect } from 'vitest';
import { coursesData } from '@/data/coursesData';

describe('Unit Tests: Course 60 - Google Cloud Fundamentals: Core Infrastructure', () => {
  const course60 = coursesData.find(
    (c) => c.slug === 'google-cloud-fundamentals-core-infrastructure'
  );

  it('should find Course 60 in the catalog with template ID 60', () => {
    expect(course60).toBeDefined();
    expect(course60?.templateId).toBe('60');
    expect(course60?.title).toBe('Google Cloud Fundamentals: Core Infrastructure');
    expect(course60?.category).toBe('Foundations & Core Infrastructure');
  });

  it('should contain 4 defined guided hands-on labs', () => {
    expect(course60?.labs.length).toBe(4);
    const labTitles = course60?.labs.map((l) => l.title);
    expect(labTitles).toContain('Getting Started with Cloud Marketplace');
    expect(labTitles).toContain('Get Started with VPC Networking and Compute Engine');
    expect(labTitles).toContain('Getting Started with Cloud Storage and Cloud SQL');
    expect(labTitles).toContain('Hello Cloud Run');
  });

  it('should ensure all lab steps contain valid descriptions and commands', () => {
    course60?.labs.forEach((lab) => {
      expect(lab.steps.length).toBeGreaterThan(0);
      lab.steps.forEach((step) => {
        expect(step.title.trim().length).toBeGreaterThan(0);
        expect(step.description.trim().length).toBeGreaterThan(0);
        if (step.command) {
          expect(step.command.trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('should include the storage taxonomy matrix with 6 core storage engines', () => {
    expect(course60?.classificationMatrix.length).toBe(6);
    const services = course60?.classificationMatrix.map((m) => m.lbType);
    expect(services).toContain('Cloud Storage');
    expect(services).toContain('Cloud SQL');
    expect(services).toContain('Cloud Spanner');
    expect(services).toContain('Firestore');
    expect(services).toContain('Cloud Bigtable');
    expect(services).toContain('BigQuery');
  });

  it('should have 10 valid quiz questions with 4 options and valid correct index', () => {
    expect(course60?.quiz.length).toBe(10);
    course60?.quiz.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(q.question.trim().length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation.trim().length).toBeGreaterThan(10);
    });
  });

  it('should define technical glossary terms including Service Account and Cloud Identity', () => {
    expect(course60?.glossary.length).toBeGreaterThanOrEqual(8);
    const terms = course60?.glossary.map((g) => g.term);
    expect(terms).toContain('Cloud Identity');
    expect(terms).toContain('Service Account');
    expect(terms).toContain('Cloud Run');
    expect(terms).toContain('Virtual Private Cloud (VPC)');
  });
});

import { describe, it, expect } from 'vitest';
import { coursesData } from '@/data/coursesData';

describe('Unit Tests: Course 637 - Set Up an App Dev Environment on Google Cloud', () => {
  const course637 = coursesData.find(
    (c) => c.slug === 'set-up-an-app-dev-environment-google-cloud'
  );

  it('should find Course 637 in the catalog with template ID 637', () => {
    expect(course637).toBeDefined();
    expect(course637?.templateId).toBe('637');
    expect(course637?.title).toBe('Set Up an App Dev Environment on Google Cloud');
    expect(course637?.category).toBe('Application Development & Storage');
  });

  it('should contain 10 defined labs including the challenge lab', () => {
    expect(course637?.labs.length).toBe(10);
    const labTitles = course637?.labs.map((l) => l.title);
    expect(labTitles).toContain('Manage Cloud Storage with the Google Cloud Console');
    expect(labTitles).toContain('Manage Cloud Storage with the Google Cloud CLI');
    expect(labTitles).toContain('Manage Access Control with IAM');
    expect(labTitles).toContain('Monitor a Compute Engine Instance with Cloud Monitoring');
    expect(labTitles).toContain('Deploy a Cloud Run Function via the Google Cloud Console');
    expect(labTitles).toContain('Deploy a Cloud Run Function via the Command Line');
    expect(labTitles).toContain('Manage Pub/Sub in the Google Cloud Console');
    expect(labTitles).toContain('Pub/Sub: Qwik Start - Command Line');
    expect(labTitles).toContain('Publish and Subscribe to Messages in Pub/Sub Using Python');
    expect(labTitles).toContain('Set Up an App Dev Environment on Google Cloud: Challenge Lab');

    const challengeLab = course637?.labs.find((l) => l.type === 'challenge');
    expect(challengeLab).toBeDefined();
    expect(challengeLab?.labNumber).toBe(10);
  });

  it('should verify all lab steps have non-empty titles, descriptions, and commands', () => {
    course637?.labs.forEach((lab) => {
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

  it('should include the technology matrix with 6 core services', () => {
    expect(course637?.classificationMatrix.length).toBe(6);
    const services = course637?.classificationMatrix.map((m) => m.lbType);
    expect(services).toContain('Cloud Storage');
    expect(services).toContain('Cloud IAM');
    expect(services).toContain('Cloud Run functions');
    expect(services).toContain('Cloud Pub/Sub');
    expect(services).toContain('Cloud Monitoring');
    expect(services).toContain('Google Cloud CLI (gcloud)');
  });

  it('should have valid quiz questions with 4 options and valid correct index', () => {
    expect(course637?.quiz.length).toBe(4);
    course637?.quiz.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(q.question.trim().length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation.trim().length).toBeGreaterThan(10);
    });
  });

  it('should define technical glossary terms including UBLA, Pub/Sub, and Ops Agent', () => {
    expect(course637?.glossary.length).toBeGreaterThanOrEqual(6);
    const terms = course637?.glossary.map((g) => g.term);
    expect(terms).toContain('Cloud Storage Bucket');
    expect(terms).toContain('Uniform Bucket-Level Access (UBLA)');
    expect(terms).toContain('Cloud Pub/Sub Topic');
    expect(terms).toContain('Pull Subscription');
    expect(terms).toContain('Cloud Run functions (2nd gen)');
    expect(terms).toContain('Google Cloud Ops Agent');
    expect(terms).toContain('IAM Policy Binding');
  });

  it('should define critical exam traps for application development environments', () => {
    expect(course637?.examTraps.length).toBeGreaterThanOrEqual(4);
    const traps = course637?.examTraps.map((t) => t.trap);
    expect(traps?.some((t) => t.includes('Ops Agent'))).toBe(true);
    expect(traps?.some((t) => t.includes('gcloud storage'))).toBe(true);
  });
});

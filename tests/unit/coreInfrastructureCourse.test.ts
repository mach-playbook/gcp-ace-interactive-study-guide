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

  it('should have valid quiz questions with 4 options and valid correct index', () => {
    expect(course60?.quiz.length).toBeGreaterThanOrEqual(16);
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
    expect(terms).toContain('Autoscaling (Compute Engine)');
    expect(terms).toContain('Shared VPC');
    expect(terms).toContain('Cloud DNS');
    expect(terms).toContain('Cloud CDN');
    expect(terms).toContain('Cloud VPN');
    expect(terms).toContain('Cloud Interconnect');
  });

  it('should include official lesson videos with YouTube IDs and key takeaways', () => {
    expect(course60?.videos).toBeDefined();
    expect(course60?.videos?.length).toBeGreaterThanOrEqual(20);
    const videoTitles = course60?.videos?.map((v) => v.title);
    expect(videoTitles).toContain('Course Introduction');
    expect(videoTitles).toContain('Cloud Computing Overview');
    expect(videoTitles).toContain('IaaS and PaaS');
    expect(videoTitles).toContain('The Google Cloud Network');
    expect(videoTitles).toContain('Environmental Impact');
    expect(videoTitles).toContain('Security');
    expect(videoTitles).toContain('Open Source Ecosystems');
    expect(videoTitles).toContain('Pricing and Billing');
    expect(videoTitles).toContain('Google Cloud Resource Hierarchy');
    expect(videoTitles).toContain('Identity and Access Management (IAM)');
    expect(videoTitles).toContain('Service Accounts');
    expect(videoTitles).toContain('Cloud Identity');
    expect(videoTitles).toContain('Interacting with Google Cloud');
    expect(videoTitles).toContain('Virtual Private Cloud networking');
    expect(videoTitles).toContain('Compute Engine');
    expect(videoTitles).toContain('Scaling virtual machines');
    expect(videoTitles).toContain('Important VPC compatibilities');
    expect(videoTitles).toContain('Cloud Load Balancing');
    expect(videoTitles).toContain('Cloud DNS and Cloud CDN');
    expect(videoTitles).toContain('Connecting networks to Google VPC');

    course60?.videos?.forEach((video) => {
      expect(video.id).toBeDefined();
      expect(video.youtubeUrl.length).toBeGreaterThan(10);
      expect(video.youtubeId).toBeDefined();
      expect(video.youtubeId?.length).toBeGreaterThan(5);
      expect(video.summary.length).toBeGreaterThan(20);
      expect(video.keyTakeaways.length).toBeGreaterThan(0);
    });
  });
});


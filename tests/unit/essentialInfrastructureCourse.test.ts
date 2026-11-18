import { describe, it, expect } from 'vitest';
import { coursesData } from '@/data/coursesData';

describe('Unit Tests: Course 50 - Essential Google Cloud Infrastructure: Foundation', () => {
  const course50 = coursesData.find(
    (c) => c.slug === 'essential-google-cloud-infrastructure-foundation'
  );

  it('should find Course 50 in the catalog with template ID 50', () => {
    expect(course50).toBeDefined();
    expect(course50?.id).toBe('gcp-course-50');
    expect(course50?.templateId).toBe('50');
    expect(course50?.title).toBe('Essential Google Cloud Infrastructure: Foundation');
    expect(course50?.category).toBe('Compute & Networking');
  });

  it('should contain the 6 required labs with valid structure and properties', () => {
    expect(course50?.labs.length).toBe(6);
    const labTitles = course50?.labs.map((l) => l.title);
    expect(labTitles).toContain('Explore the Google Cloud Console and Cloud Shell');
    expect(labTitles).toContain('Deploy a LAMP Stack with Google Cloud Marketplace');
    expect(labTitles).toContain('Create and Configure VPC Networks');
    expect(labTitles).toContain('Implement Private Google Access and Cloud NAT');
    expect(labTitles).toContain('Create Virtual Machines');
    expect(labTitles).toContain('Create and Configure Virtual Machines (Minecraft Server)');

    course50?.labs.forEach((lab) => {
      expect(lab.durationMinutes).toBeGreaterThan(0);
      expect(lab.keyConcepts.length).toBeGreaterThan(0);
      expect(lab.steps.length).toBeGreaterThan(0);
      lab.steps.forEach((step) => {
        expect(step.title.trim().length).toBeGreaterThan(0);
        expect(step.description.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('should include the 3 video modules with summaries and key takeaways', () => {
    expect(course50?.videos?.length).toBe(3);
    const moduleNames = course50?.videos?.map((v) => v.moduleName);
    expect(moduleNames).toContain('Módulo 1: Interacting with Google Cloud');
    expect(moduleNames).toContain('Módulo 2: Virtual Networks');
    expect(moduleNames).toContain('Módulo 3: Virtual Machines');

    course50?.videos?.forEach((video) => {
      expect(video.summary.trim().length).toBeGreaterThan(0);
      expect(video.keyTakeaways.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should contain the technology matrix with 4 core architectures', () => {
    expect(course50?.classificationMatrix.length).toBe(4);
    const services = course50?.classificationMatrix.map((m) => m.lbType);
    expect(services).toContain('VPC Custom Mode');
    expect(services).toContain('Private Google Access');
    expect(services).toContain('Cloud NAT');
    expect(services).toContain('Persistent Disk (Zonal / Regional)');
  });

  it('should include health check / networking CIDR ranges and exam traps', () => {
    expect(course50?.healthCheckRanges.length).toBe(3);
    const cidrs = course50?.healthCheckRanges.map((r) => r.cidr);
    expect(cidrs).toContain('35.235.240.0/20'); // IAP range
    expect(cidrs).toContain('199.36.153.8/30'); // restricted.googleapis.com
    expect(cidrs).toContain('199.36.153.4/30'); // private.googleapis.com

    expect(course50?.examTraps.length).toBe(5);
  });

  it('should have valid quiz questions with 4 options and valid correct index', () => {
    expect(course50?.quiz.length).toBe(4);
    course50?.quiz.forEach((q) => {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation.trim().length).toBeGreaterThan(0);
      expect(q.examTrapTip?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have a glossary with definitions for critical infrastructure terms', () => {
    expect(course50?.glossary.length).toBeGreaterThanOrEqual(5);
    const terms = course50?.glossary.map((g) => g.term);
    expect(terms).toContain('Virtual Private Cloud (VPC)');
    expect(terms).toContain('Private Google Access');
    expect(terms).toContain('Cloud NAT');
    expect(terms).toContain('Identity-Aware Proxy (IAP)');
  });
});

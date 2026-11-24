import { describe, it, expect } from 'vitest';
import { coursesData } from '@/data/coursesData';

describe('Unit Tests: Course 654 - Build a Secure Google Cloud Network', () => {
  const course654 = coursesData.find(
    (c) => c.slug === 'build-a-secure-google-cloud-network'
  );

  it('should find Course 654 in the catalog with template ID 654', () => {
    expect(course654).toBeDefined();
    expect(course654?.id).toBe('gcp-course-654');
    expect(course654?.templateId).toBe('654');
    expect(course654?.title).toBe('Build a Secure Google Cloud Network');
    expect(course654?.category).toBe('Security & Networking');
    expect(course654?.badge).toBe('Google Cloud Skill Badge');
  });

  it('should contain all 6 required labs including the Challenge Lab', () => {
    expect(course654?.labs.length).toBe(6);
    const labTitles = course654?.labs.map((l) => l.title);
    expect(labTitles).toContain('Securing Virtual Machines using Chrome Enterprise Premium (BCE)');
    expect(labTitles).toContain('Create and Configure Multiple VPC Networks');
    expect(labTitles).toContain('Control Access to VPC Networks Using Firewall Rules and IAM');
    expect(labTitles).toContain('Configure an Application Load Balancer with Google Cloud Armor');
    expect(labTitles).toContain('Enhance Application Reliability and Scalability with Internal Load Balancing');
    expect(labTitles).toContain('Build a Secure Google Cloud Network: Challenge Lab');

    const lab1 = course654?.labs.find((l) => l.id === 'secnet-lab-1');
    expect(lab1?.durationMinutes).toBe(30);
    expect(lab1?.steps.length).toBe(5);

    const lab2 = course654?.labs.find((l) => l.id === 'secnet-lab-2');
    expect(lab2?.durationMinutes).toBe(25);
    expect(lab2?.steps.length).toBe(4);

    const lab3 = course654?.labs.find((l) => l.id === 'secnet-lab-3');
    expect(lab3?.durationMinutes).toBe(20);
    expect(lab3?.steps.length).toBe(4);

    const challengeLab = course654?.labs.find((l) => l.type === 'challenge');
    expect(challengeLab).toBeDefined();
    expect(challengeLab?.labNumber).toBe(6);
  });

  it('should validate every lab step has non-empty title, description, and command', () => {
    course654?.labs.forEach((lab) => {
      expect(lab.durationMinutes).toBeGreaterThan(0);
      expect(lab.keyConcepts.length).toBeGreaterThan(0);
      expect(lab.steps.length).toBeGreaterThan(0);
      lab.steps.forEach((step) => {
        expect(step.title.trim().length).toBeGreaterThan(0);
        expect(step.description.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('should contain the 4 core security & networking architectures in the matrix', () => {
    expect(course654?.classificationMatrix.length).toBe(4);
    const services = course654?.classificationMatrix.map((m) => m.lbType);
    expect(services).toContain('BeyondCorp / IAP TCP Forwarding');
    expect(services).toContain('Google Cloud Armor');
    expect(services).toContain('VPC Firewall Rules (Tags & IAM)');
    expect(services).toContain('Internal Load Balancer (MIGs)');
  });

  it('should include IAP and Google Health Check CIDR ranges and 5 exam traps', () => {
    expect(course654?.healthCheckRanges.length).toBe(3);
    const cidrs = course654?.healthCheckRanges.map((r) => r.cidr);
    expect(cidrs).toContain('35.235.240.0/20');
    expect(cidrs).toContain('130.211.0.0/22');
    expect(cidrs).toContain('35.191.0.0/16');

    expect(course654?.examTraps.length).toBe(5);
  });

  it('should have 4 valid quiz questions with 4 options and valid correct index', () => {
    expect(course654?.quiz.length).toBe(4);
    course654?.quiz.forEach((q) => {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation.trim().length).toBeGreaterThan(0);
      expect(q.examTrapTip?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have a glossary with critical secure networking terms', () => {
    expect(course654?.glossary.length).toBeGreaterThanOrEqual(6);
    const terms = course654?.glossary.map((g) => g.term);
    expect(terms).toContain('BeyondCorp Enterprise (BCE)');
    expect(terms).toContain('IAP TCP Forwarding');
    expect(terms).toContain('Google Cloud Armor');
    expect(terms).toContain('Internal Load Balancer');
  });
});

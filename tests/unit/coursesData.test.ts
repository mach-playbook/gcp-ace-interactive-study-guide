import { describe, it, expect } from 'vitest';
import { coursesData } from '@/data/coursesData';

describe('Unit Tests: Courses Data Integrity', () => {
  it('should load courses catalog with at least one course', () => {
    expect(coursesData).toBeDefined();
    expect(coursesData.length).toBeGreaterThan(0);
  });

  describe('Course 648: Implementing Cloud Load Balancing for Compute Engine', () => {
    const course648 = coursesData.find(
      (c) => c.slug === 'implementing-cloud-load-balancing-compute-engine'
    );

    it('should find Course 648 by slug with template ID 648', () => {
      expect(course648).toBeDefined();
      expect(course648?.templateId).toBe('648');
      expect(course648?.title).toContain('Load Balancing');
    });

    it('should have 4 defined labs including the challenge lab', () => {
      expect(course648?.labs.length).toBe(4);

      const challengeLab = course648?.labs.find((l) => l.type === 'challenge');
      expect(challengeLab).toBeDefined();
      expect(challengeLab?.labNumber).toBe(4);
      expect(challengeLab?.title).toContain('Challenge Lab');
    });

    it('should verify all lab steps have non-empty titles, descriptions, and commands', () => {
      course648?.labs.forEach((lab) => {
        expect(lab.steps.length).toBeGreaterThan(0);
        lab.steps.forEach((step) => {
          expect(step.title.trim()).not.toBe('');
          expect(step.description.trim()).not.toBe('');
          if (step.command) {
            expect(step.command.trim()).not.toBe('');
          }
        });
      });
    });

    it('should contain the official Google Health Check CIDR blocks', () => {
      const cidrs = course648?.healthCheckRanges.map((h) => h.cidr);
      expect(cidrs).toContain('130.211.0.0/22');
      expect(cidrs).toContain('35.191.0.0/16');
      expect(cidrs).toContain('209.85.152.0/22');
      expect(cidrs).toContain('209.85.204.0/22');
    });

    it('should have 10 valid quiz questions with correct index within bounds', () => {
      expect(course648?.quiz.length).toBe(10);
      course648?.quiz.forEach((q, index) => {
        expect(q.id).toBeDefined();
        expect(q.question.trim().length).toBeGreaterThan(10);
        expect(q.options.length).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
        expect(q.explanation.trim().length).toBeGreaterThan(10);
      });
    });

    it('should define technical glossary terms relevant to Load Balancing', () => {
      expect(course648?.glossary.length).toBeGreaterThanOrEqual(8);
      const terms = course648?.glossary.map((g) => g.term);
      expect(terms).toContain('Anycast IP');
      expect(terms).toContain('Backend Service');
      expect(terms).toContain('Proxy-Only Subnet');
      expect(terms).toContain('URL Map');
    });

    it('should verify all courses have unique slugs and non-empty categories', () => {
      const slugs = coursesData.map((c) => c.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);

      coursesData.forEach((c) => {
        expect(c.category.trim()).not.toBe('');
        expect(c.duration.trim()).not.toBe('');
      });
    });
  });
});

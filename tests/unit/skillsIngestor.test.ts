import { describe, it, expect } from 'vitest';
// @ts-ignore
import { parseSkillsClipboard, formatAsWikiRawEntry } from '../../scripts/ingest-skills-content.mjs';

describe('Unit Tests: Skills Google Content Ingestor', () => {
  const sampleRawClipboard = `https://www.youtube.com/watch?v=xVmam01f4Fw
Current points:star13780
0
[dashboardDashboard](https://www.skills.google/)[book_2Catalog](https://www.skills.google/catalog)[conversion_pathPaths](https://www.skills.google/paths)category
Collections
arrow_drop_down
license
Credentials
arrow_drop_down
[subscriptionsSubscriptions](https://www.skills.google/subscriptions)[corporate_fareOrganizations](https://www.skills.google/learningcenter)
warning_amberWe are currently experiencing intermittent issues with the Gemini Enterprise labs. Please bear with us while we work on the resolution.
warning_amberThe Google Skills platform will be unavailable for approximately 20 minutes on Sunday, November 8, starting at 7:00 PM EST (12:00 AM UTC, Nov 9). If you have any questions, please contact support-skills@google.com
navigate_next
[Google Cloud Fundamentals: Core Infrastructure](https://www.skills.google/course_templates/60)navigate_next
Course Introduction
Apply your skills in Google Cloud console
Contents
Contents
Autoplay
Transcript
00:00Hi, and welcome to the Google Cloud Fundamentals: Core Infrastructure training course.
00:05The goal of this course is to provide you with an overview of Google Cloud.
00:10Google Cloud offerings can be broadly categorised as compute, storage, big data, machine learning, and application services for web, mobile, analytics, and back-end solutions.
00:23Through a combination of videos, quizzes, and hands-on labs, you’ll learn the value of Google Cloud and how cloud solutions factor into business strategies.
00:33The intended target audience of today’s course consists of solutions developers, systems operations professionals, and solution architects planning to deploy applications and create application environments on Google Cloud.
00:46The course will also be useful for business decision makers evaluating Google Cloud.
00:51While you should be happy to hear that we’ll be finding out about services and concepts that are specific to Google Cloud in this
00:56course, do keep in mind that, as a ‘fundamentals’ level course, some content will be geared towards learners who are entirely new to cloud technologies.
01:06This course has no prerequisites, although it’s helpful be familiar with application development, Linux operating systems, systems operations, and data analytics/machine learning to best understand the technologies covered.
01:20There are seven key learning objectives that we’re hoping to achieve.
01:24By the end of this course, you should be able to: Identify the purpose and value of Google Cloud products and services.
01:31Define how infrastructure is organized and controlled in Google Cloud.
01:36Explain how to create a basic infrastructure in Google Cloud.
01:40Select and use Google Cloud storage options.
01:44Describe the purpose and value of Google Kubernetes Engine.
01:48Identify the use cases for serverless Google Cloud services.
01:52And combine Google Cloud knowledge with prompt engineering to improve Gemini responses.
01:59OK, all set?
02:00Let’s begin!`;

  it('should parse raw clipboard text and remove UI noise, banners, and point counters', () => {
    const parsed = parseSkillsClipboard(sampleRawClipboard);

    expect(parsed.courseName).toBe('Google Cloud Fundamentals: Core Infrastructure');
    expect(parsed.sectionTitle).toBe('Course Introduction');
    expect(parsed.youtubeUrl).toBe('https://www.youtube.com/watch?v=xVmam01f4Fw');
    expect(parsed.sourceUrl).toBe('https://www.skills.google/course_templates/60');
    expect(parsed.contentType).toBe('video_transcript');

    // UI noise must NOT be present
    expect(parsed.cleanBody).not.toContain('star13780');
    expect(parsed.cleanBody).not.toContain('dashboardDashboard');
    expect(parsed.cleanBody).not.toContain('warning_amber');
    expect(parsed.cleanBody).not.toContain('Autoplay');
    expect(parsed.cleanBody).not.toContain('00:00');
    expect(parsed.cleanBody).not.toContain('01:24');

    // Substantive content MUST be present
    expect(parsed.cleanBody).toContain('Hi, and welcome to the Google Cloud Fundamentals');
    expect(parsed.cleanBody).toContain('compute, storage, big data, machine learning, and application services');
  });

  it('should extract the 7 key learning objectives', () => {
    const parsed = parseSkillsClipboard(sampleRawClipboard);

    expect(parsed.learningObjectives.length).toBe(7);
    expect(parsed.learningObjectives[0]).toContain('Identify the purpose and value of Google Cloud products');
    expect(parsed.learningObjectives[6]).toContain('combine Google Cloud knowledge with prompt engineering to improve Gemini responses');
  });

  it('should generate valid markdown with frontmatter for wiki/raw', () => {
    const parsed = parseSkillsClipboard(sampleRawClipboard);
    const markdown = formatAsWikiRawEntry(parsed);

    expect(markdown).toContain('---');
    expect(markdown).toContain('title: "Course Introduction"');
    expect(markdown).toContain('course: "Google Cloud Fundamentals: Core Infrastructure"');
    expect(markdown).toContain('youtube_video: "https://www.youtube.com/watch?v=xVmam01f4Fw"');
    expect(markdown).toContain('### Objetivos Clave de Aprendizaje');
  });
});


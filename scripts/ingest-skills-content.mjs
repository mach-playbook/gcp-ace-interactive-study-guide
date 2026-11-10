#!/usr/bin/env node

/**
 * Ingestor y Limpiador de Contenido de Google Cloud Skills
 * Para el patrón LLM Wiki (Karpathy) y el curso interactivo GCP ACE.
 *
 * Limpia el ruido del portapapeles (UI de Skills Google, timestamps, avisos de plataforma)
 * y extrae la transcripción o guía técnica para almacenarla en wiki/raw/ y sintetizarla.
 */

import fs from 'fs';
import path from 'path';

/**
 * @typedef {Object} ParsedSkillsContent
 * @property {string} courseName
 * @property {string} sectionTitle
 * @property {string} sourceUrl
 * @property {string} [youtubeUrl]
 * @property {'video_transcript' | 'reading' | 'lab'} contentType
 * @property {string} cleanBody
 * @property {string[]} learningObjectives
 */

/**
 * Parsea el texto copiado de Skills Google
 * @param {string} rawText
 * @returns {ParsedSkillsContent}
 */
export function parseSkillsClipboard(rawText) {
  const lines = rawText.split(/\r?\n/).map((l) => l.trim());

  let youtubeUrl = '';
  let sourceUrl = '';
  let courseName = 'Google Cloud Fundamentals: Core Infrastructure';
  let sectionTitle = 'Course Introduction';
  const cleanLines = [];
  const learningObjectives = [];

  // Buscar URLs iniciales
  for (const line of lines) {
    if (line.includes('youtube.com') || line.includes('youtu.be')) {
      const match = line.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/);
      if (match) {
        youtubeUrl = match[0];
      }
    }
    if (line.includes('skills.google/course_templates/')) {
      const directMatch = line.match(/https?:\/\/(?:www\.)?skills\.google\/course_templates\/[\w/]+/);
      const mdMatch = line.match(/\((https:\/\/www\.skills\.google\/course_templates\/[^\)]+)\)/);
      if (directMatch) {
        sourceUrl = directMatch[0];
      } else if (mdMatch) {
        sourceUrl = mdMatch[1];
      }
    }
  }

  // Filtrar ruido de UI de Skills Google
  const uiNoisePhrases = [
    'Current points:star',
    'dashboardDashboard',
    'book_2Catalog',
    'conversion_pathPaths',
    'category',
    'Collections',
    'arrow_drop_down',
    'license',
    'Credentials',
    'subscriptionsSubscriptions',
    'corporate_fareOrganizations',
    'warning_amber',
    'support-skills@google.com',
    'navigate_next',
    'Apply your skills in Google Cloud console',
    'Contents',
    'Autoplay',
    'Transcript',
    'Get started',
    'Mark as completed',
    'Send feedback',
  ];

  // Detectar título de sección
  for (let i = 0; i < lines.length; i++) {
    // Si la línea posterior es "Apply your skills in Google Cloud console", la actual es el título
    if (lines[i].includes('Apply your skills in Google Cloud console') && i > 0) {
      let candidate = lines[i - 1].replace(/^.*navigate_next\s*/, '').trim();
      if (candidate && !uiNoisePhrases.some((n) => candidate.includes(n)) && !candidate.startsWith('[')) {
        sectionTitle = candidate;
        break;
      }
    }
  }

  // Si aún no se encontró, buscar tras "navigate_next"
  if (sectionTitle === 'Course Introduction') {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('navigate_next') && i + 1 < lines.length) {
        let candidate = lines[i + 1].replace(/^.*navigate_next\s*/, '').trim();
        if (
          candidate &&
          !uiNoisePhrases.some((n) => candidate.includes(n)) &&
          !candidate.startsWith('[') &&
          !candidate.includes('course_templates')
        ) {
          sectionTitle = candidate;
          break;
        }
      }
    }
  }

  let bufferObjective = false;
  let addedObjectiveHeader = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Detectar inicio de transcripción
    if (line === 'Transcript') continue;

    // Si es la URL de youtube en la primera línea o URL de skills, no repetirla en el body
    if (line === youtubeUrl || line.startsWith('https://www.youtube.com') || line.startsWith('https://youtu.be')) continue;

    // Saltar líneas de ruido de UI
    const isNoise = uiNoisePhrases.some((phrase) => line.includes(phrase));
    if (isNoise) continue;

    // Si es un número solo o puntos sueltos
    if (/^\d+$/.test(line) && line.length < 5) continue;

    // Si repite el nombre del curso o título idéntico
    if (line === courseName || line === sectionTitle) continue;

    // Remover timestamps de video tipo "00:00Texto" o "00:00 Texto"
    let cleanedLine = line.replace(/^\d{2}:\d{2}\s*/, '').trim();
    if (!cleanedLine) continue;

    // Capturar objetivos de aprendizaje si aparecen
    if (cleanedLine.toLowerCase().includes('learning objectives') || cleanedLine.toLowerCase().includes('should be able to:')) {
      bufferObjective = true;
      if (!addedObjectiveHeader) {
        cleanLines.push(`### Objetivos Clave de Aprendizaje`);
        addedObjectiveHeader = true;
      }
      if (cleanedLine.includes('should be able to:')) {
        const afterColon = cleanedLine.split('should be able to:')[1].trim();
        if (afterColon) {
          learningObjectives.push(afterColon);
          cleanLines.push(`* ${afterColon}`);
        }
      }
      continue;
    }

    if (bufferObjective) {
      if (cleanedLine.startsWith('OK,') || cleanedLine.startsWith('Let’s begin') || cleanedLine.startsWith('Next')) {
        bufferObjective = false;
      } else {
        const item = cleanedLine.replace(/^And\s+/i, '').trim();
        learningObjectives.push(item);
        cleanLines.push(`* ${item}`);
        continue;
      }
    }

    if (!cleanedLine.startsWith('OK, all set?') && !cleanedLine.startsWith('Let’s begin!')) {
      cleanLines.push(cleanedLine);
    }
  }

  const contentType = rawText.includes('Transcript')
    ? 'video_transcript'
    : rawText.includes('gcloud') || rawText.includes('Lab')
    ? 'lab'
    : 'reading';

  return {
    courseName,
    sectionTitle,
    sourceUrl: sourceUrl || 'https://www.skills.google/course_templates/60',
    youtubeUrl: youtubeUrl || undefined,
    contentType,
    cleanBody: cleanLines.join('\n\n'),
    learningObjectives,
  };
}

/**
 * Formatea el contenido para almacenar en wiki/raw/
 * @param {ParsedSkillsContent} parsed
 * @returns {string}
 */
export function formatAsWikiRawEntry(parsed) {
  const dateStr = new Date().toISOString().split('T')[0];
  return `---
title: "${parsed.sectionTitle}"
course: "${parsed.courseName}"
date_ingested: "${dateStr}"
type: "${parsed.contentType}"
source_url: "${parsed.sourceUrl}"
${parsed.youtubeUrl ? `youtube_video: "${parsed.youtubeUrl}"` : ''}
---

# ${parsed.sectionTitle} (${parsed.courseName})

## 📝 Contenido Sanitizado

${parsed.cleanBody}

---
*Ingestado automáticamente para la LLM Wiki del proyecto GCP ACE Interactive Study Guide.*
`;
}

// Ejecución directa por CLI si se invoca con node
if (process.argv[1] && process.argv[1].endsWith('ingest-skills-content.mjs')) {
  const args = process.argv.slice(2);
  const writeFlag = args.includes('--write');
  const filteredArgs = args.filter((a) => a !== '--write');
  const inputArg = filteredArgs[0];

  let rawInput = '';

  if (inputArg && fs.existsSync(inputArg)) {
    rawInput = fs.readFileSync(inputArg, 'utf-8');
  } else if (inputArg) {
    rawInput = inputArg;
  } else {
    // Leer desde stdin
    try {
      rawInput = fs.readFileSync(0, 'utf-8');
    } catch {
      console.log('Uso: node scripts/ingest-skills-content.mjs [--write] <archivo_o_texto>');
      process.exit(1);
    }
  }

  if (rawInput) {
    const parsed = parseSkillsClipboard(rawInput);
    const markdown = formatAsWikiRawEntry(parsed);

    if (writeFlag) {
      const slugTitle = parsed.sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const rawDir = path.resolve('wiki/raw');
      if (!fs.existsSync(rawDir)) {
        fs.mkdirSync(rawDir, { recursive: true });
      }
      const targetFile = path.join(rawDir, `skills-core-${slugTitle}.md`);
      fs.writeFileSync(targetFile, markdown, 'utf-8');
      console.log(`✅ Contenido ingestado exitosamente en: ${targetFile}`);
    } else {
      console.log(markdown);
    }
  }
}

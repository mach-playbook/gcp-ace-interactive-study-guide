# 📊 Modelos y Esquemas de Datos (TypeScript)

Definición de los tipos e interfaces centrales para la aplicación interactiva de estudio GCP ACE.

---

## 🗂️ Interfaces Principales

### 1. Modelo de Dominio y Pregunta de Examen

```typescript
export type ExamDomainId = 'domain-1' | 'domain-2' | 'domain-3' | 'domain-4';

export interface ExamQuestion {
  id: string;
  domainId: ExamDomainId;
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  trapExplanation?: string;
  officialDocUrl?: string;
}
```

### 2. Modelo de Comando gcloud para Quiz

```typescript
export interface GcloudQuizItem {
  id: string;
  scenarioPrompt: string;
  targetCommand: string;
  grammarParts: {
    group: string;
    subgroup?: string;
    action: string;
    requiredFlags: string[];
    optionalFlags?: string[];
  };
  distractorTokens: string[];
  officialDocUrl: string;
}
```

### 3. Modelo de Nodo del Árbol de Decisión

```typescript
export interface DecisionTreeNode {
  id: string;
  question: string;
  helpText?: string;
  options: {
    label: string;
    description?: string;
    nextNodeId?: string;
    finalRecommendation?: {
      serviceName: string;
      icon: string;
      reason: string;
      pricingNotes: string;
      examTip: string;
    };
  }[];
}
```

### 4. Modelo de Progreso del Usuario

```typescript
export interface DomainProgress {
  domainId: ExamDomainId;
  questionsAttempted: number;
  questionsCorrect: number;
  masteredFlashcardIds: string[];
}

export interface UserStudyState {
  version: number;
  lastUpdated: string;
  domains: Record<ExamDomainId, DomainProgress>;
  gcloudQuizScore: number;
  overallReadinessScore: number; // 0 a 100
}
```


export type ExamDomainId = 'domain-1' | 'domain-2' | 'domain-3' | 'domain-4';

export interface ExamDomainInfo {
  id: ExamDomainId;
  name: string;
  weight: number; // e.g. 23 for 23%
  description: string;
  icon: string;
}

export interface GcloudQuizItem {
  id: string;
  domainId: ExamDomainId;
  scenario: string;
  correctTokens: string[];
  optionsPool: string[];
  explanation: string;
  examTrapNote?: string;
  officialDocUrl?: string;
}

export interface DecisionOption {
  label: string;
  description?: string;
  nextStepId?: string;
  recommendation?: {
    service: string;
    badge: string;
    reason: string;
    pricingTip: string;
    examWarning: string;
  };
}

export interface DecisionStep {
  id: string;
  question: string;
  helpText?: string;
  options: DecisionOption[];
}

export interface FlashcardItem {
  id: string;
  domainId: ExamDomainId;
  question: string;
  answer: string;
  trap: string;
  referenceCommand?: string;
}

export interface UserProgressState {
  domainChecks: Record<string, boolean>;
  quizCompleted: Record<string, boolean>;
  flashcardsMastered: Record<string, boolean>;
}


export interface ProcessStep {
  order: number;
  description: string;
}

export interface ProcessAction {
  verb: string;
  object: string;
}

export interface ProcessAnalysis {
  steps: ProcessStep[];
  actors: string[];
  actions: ProcessAction[];
  repetitiveTasks: string[];
  humanInterventions: string[];
  timeIndicators: string[];
  summary: {
    totalSteps: number;
    totalActors: number;
    totalActions: number;
    repetitiveTaskCount: number;
    humanInterventionCount: number;
  };
}

export interface ScoringCriterion {
  score: number;
  maxScore: number;
  description: string;
}

export interface ProcessScoring {
  criteria: {
    numberOfSteps: ScoringCriterion;
    repetitiveTasks: ScoringCriterion;
    humanIntervention: ScoringCriterion;
    volume: ScoringCriterion;
    businessRules: ScoringCriterion;
    dataStructure: ScoringCriterion;
  };
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  classification: string;
}

export interface Recommendation {
  condition: string;
  suggestion: string;
  priority: "high" | "medium" | "low";
}

export interface Process {
  _id: string;
  name: string;
  description: string;
  status: "pending" | "analyzed";
  analysis?: ProcessAnalysis;
  scoring?: ProcessScoring;
  recommendations?: Recommendation[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProcesses: number;
  analyzedProcesses: number;
  pendingProcesses: number;
  averageScore: number;
  automatablePercentage: number;
  classificationBreakdown: {
    automatable: number;
    semiAutomatable: number;
    notAutomatable: number;
  };
}

export interface DashboardProcess {
  id: string;
  name: string;
  status: string;
  totalScore: number;
  percentage: number;
  classification: string;
  recommendationCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface ProcessStep {
  order: number;
  description: string;
  type?: 'automatisable' | 'semi-automatisable' | 'manuel';
  actor?: string;
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
    systemStepCount?: number;
    manualStepCount?: number;
    decisionPointCount?: number;
    automationReadiness?: number;
    complexityLevel?: string;
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
  impact?: number;
  effort?: number;
  phase?: 'court-terme' | 'moyen-terme' | 'long-terme';
  tools?: string[];
}

export interface CostEstimation {
  manualCostPerExecution: number;
  executionsPerMonth: number;
  averageTimeMinutes: number;
  estimatedAutomationCost: number;
  monthlySavings: number;
  annualSavings: number;
  roiPercentage: number;
  paybackMonths: number;
}

export interface Process {
  _id: string;
  name: string;
  description: string;
  status: "pending" | "analyzed";
  analysis?: ProcessAnalysis;
  scoring?: ProcessScoring;
  recommendations?: Recommendation[];
  costEstimation?: CostEstimation;
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
  totalScore: number | null;
  percentage: number | null;
  classification: string | null;
  recommendationCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BIData {
  scoreComparison: { name: string; score: number; classification: string | null }[];
  criteriaAvg: { criterion: string; average: number; max: number }[];
  stepTypeDistribution: { automatisable: number; semiAutomatisable: number; manuel: number };
  complexityCounts: { faible: number; moyenne: number; élevée: number };
  roiData: { name: string; annualSavings: number; automationCost: number; roiPercentage: number; paybackMonths: number }[];
  recommendationBreakdown: { high: number; medium: number; low: number };
  readinessData: { name: string; readiness: number }[];
}
export interface ProcessStep {
  step_number: number;
  description: string;
  actor: string | null;
  action: string | null;
  estimated_time: number | null;
}

export interface Process {
  id: string;
  title: string;
  description: string | null;
  user_story: string;
  steps: ProcessStep[];
  actors: string[];
  created_at: string;
  updated_at: string;
}

export interface EvaluationCriteria {
  steps_count_score: number;
  repetitive_tasks_score: number;
  human_intervention_score: number;
  volume_score: number;
  business_rules_score: number;
  data_structure_score: number;
}

export interface Evaluation {
  id: string;
  process_id: string;
  criteria: EvaluationCriteria;
  total_score: number;
  automation_level: string;
  created_at: string;
}

export interface Recommendation {
  id: string;
  evaluation_id: string;
  process_id: string;
  category: string;
  suggestion: string;
  priority: string;
  created_at: string;
}

export interface DashboardStats {
  total_processes: number;
  total_evaluations: number;
  automation_distribution: {
    automatisable: number;
    semi_automatisable: number;
    non_automatisable: number;
  };
  average_score: number;
}
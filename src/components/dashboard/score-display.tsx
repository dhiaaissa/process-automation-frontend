"use client";

import { Evaluation } from "@/lib/types";
import { getAutomationLevelColor, getAutomationLevelLabel } from "@/lib/utils";

interface ScoreDisplayProps {
  evaluation: Evaluation;
}

export function ScoreDisplay({ evaluation }: ScoreDisplayProps) {
  const levelColor = getAutomationLevelColor(evaluation.automation_level);
  const levelLabel = getAutomationLevelLabel(evaluation.automation_level);

  const criteriaLabels: Record<string, string> = {
    steps_count_score: "Nombre d'etapes",
    repetitive_tasks_score: "Taches repetitives",
    human_intervention_score: "Intervention humaine",
    volume_score: "Volume",
    business_rules_score: "Regles metier",
    data_structure_score: "Structure des donnees",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Score d'automatisation</h2>

      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold text-primary">{evaluation.total_score}/30</div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${levelColor}`}>  
          {levelLabel}
        </span>
      </div>

      <div className="grid gap-3">
        {Object.entries(evaluation.criteria).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{criteriaLabels[key] || key}</span>
              <span className="font-medium">{value}/5</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
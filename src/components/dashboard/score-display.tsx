"use client";

import { ProcessScoring } from "@/lib/types";
import { getAutomationLevelColor, getAutomationLevelLabel } from "@/lib/utils";

interface ScoreDisplayProps {
  scoring: ProcessScoring;
}

export function ScoreDisplay({ scoring }: ScoreDisplayProps) {
  const levelColor = getAutomationLevelColor(scoring.classification);
  const levelLabel = getAutomationLevelLabel(scoring.classification);

  const criteriaLabels: Record<string, string> = {
    numberOfSteps: "Nombre d'etapes",
    repetitiveTasks: "Taches repetitives",
    humanIntervention: "Intervention humaine",
    volume: "Volume",
    businessRules: "Regles metier",
    dataStructure: "Structure des donnees",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Score d'automatisation</h2>

      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold text-primary">{scoring.totalScore}/{scoring.maxPossibleScore}</div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${levelColor}`}>
          {levelLabel}
        </span>
        <span className="text-sm text-muted-foreground">({scoring.percentage}%)</span>
      </div>

      <div className="grid gap-3">
        {Object.entries(scoring.criteria).map(([key, criterion]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{criteriaLabels[key] || key}</span>
              <span className="font-medium">{criterion.score}/{criterion.maxScore}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(criterion.score / criterion.maxScore) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{criterion.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
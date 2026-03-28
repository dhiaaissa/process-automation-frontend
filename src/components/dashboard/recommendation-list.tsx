"use client";

import { Recommendation } from "@/lib/types";
import { getPriorityColor } from "@/lib/utils";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

const phaseConfig: Record<string, { label: string; color: string }> = {
  "court-terme": { label: "Court terme", color: "bg-green-100 text-green-700 border-green-300" },
  "moyen-terme": { label: "Moyen terme", color: "bg-amber-100 text-amber-700 border-amber-300" },
  "long-terme": { label: "Long terme", color: "bg-red-100 text-red-700 border-red-300" },
};

function DotBar({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${i < value ? color : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return <div className="text-muted-foreground">Aucune recommandation disponible.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommandations ({recommendations.length})</h2>
      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const phase = rec.phase ? phaseConfig[rec.phase] : null;
          return (
            <div key={index} className="p-4 border rounded-lg">
              <div className="space-y-2">
                {/* Header: condition + badges */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <span className="text-sm font-medium flex-1">{rec.condition}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {phase && (
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${phase.color}`}>
                        {phase.label}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority === 'high' ? 'Élevée' : rec.priority === 'medium' ? 'Moyenne' : 'Faible'}
                    </span>
                  </div>
                </div>

                {/* Suggestion */}
                <p className="text-sm text-muted-foreground">{rec.suggestion}</p>

                {/* Impact / Effort / Tools row */}
                <div className="flex items-center gap-6 flex-wrap pt-1">
                  {rec.impact != null && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span>Impact</span>
                      <DotBar value={rec.impact} color="bg-blue-500" />
                    </div>
                  )}
                  {rec.effort != null && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span>Effort</span>
                      <DotBar value={rec.effort} color="bg-orange-500" />
                    </div>
                  )}
                  {rec.tools && rec.tools.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {rec.tools.map((tool, i) => (
                        <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
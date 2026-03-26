"use client";

import { Recommendation } from "@/lib/types";
import { getPriorityColor } from "@/lib/utils";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return <div className="text-muted-foreground">Aucune recommandation disponible.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommandations ({recommendations.length})</h2>
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{rec.condition}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Recommendation } from "@/lib/types";
import { getPriorityColor } from "@/lib/utils";

interface RecommendationListProps {
  evaluationId: string;
}

export function RecommendationList({ evaluationId }: RecommendationListProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await apiClient.getRecommendations(evaluationId);
        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [evaluationId]);

  if (loading) return <div>Chargement des recommandations...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommandations ({recommendations.length})</h2>
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-4 border rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium capitalize">{rec.category}</span>
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
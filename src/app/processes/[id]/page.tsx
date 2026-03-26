"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import { Process, Evaluation } from "@/lib/types";
import { ProcessAnalysis } from "@/components/process/process-analysis";
import { ScoreDisplay } from "@/components/dashboard/score-display";
import { RecommendationList } from "@/components/dashboard/recommendation-list";

export default function ProcessDetailPage() {
  const params = useParams();
  const processId = params.id as string;

  const [process, setProcess] = useState<Process | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processData = await apiClient.getProcess(processId);
        setProcess(processData);
        try {
          const evalData = await apiClient.getEvaluation(processId);
          setEvaluation(evalData);
        } catch {
          // No evaluation yet
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [processId]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const analysis = await apiClient.analyzeProcess(processId);
      setProcess((prev) => prev ? { ...prev, steps: analysis.steps, actors: analysis.actors } : null);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Chargement...</div>;
  if (!process) return <div className="text-center py-12">Processus non trouve</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{process.title}</h1>
          <p className="text-muted-foreground mt-1">{process.description}</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {analyzing ? "Analyse en cours..." : "Analyser le processus"}
        </button>
      </div>

      <div className="p-4 border rounded-lg bg-muted/50">
        <h2 className="font-semibold mb-2">Description du processus</h2>
        <p className="whitespace-pre-wrap">{process.user_story}</p>
      </div>

      {process.steps && process.steps.length > 0 && (
        <ProcessAnalysis steps={process.steps} actors={process.actors || []} />
      )}

      {evaluation && (
        <> 
          <ScoreDisplay evaluation={evaluation} />
          <RecommendationList evaluationId={evaluation.id} />
        </>
      )}
    </div>
  );
}
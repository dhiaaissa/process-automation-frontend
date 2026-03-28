"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import { Process } from "@/lib/types";
import { ProcessAnalysis } from "@/components/process/process-analysis";
import { ProcessFlow } from "@/components/process/process-flow";
import { ScoreDisplay } from "@/components/dashboard/score-display";
import { RecommendationList } from "@/components/dashboard/recommendation-list";
import { ROIDisplay } from "@/components/dashboard/roi-display";
import { Spinner, AnalysisLoader } from "@/components/ui/loader";

export default function ProcessDetailPage() {
  const params = useParams();
  const processId = params.id as string;

  const [process, setProcess] = useState<Process | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processData = await apiClient.getProcess(processId);
        setProcess(processData);
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
    const minDelay = new Promise((r) => setTimeout(r, 5500));
    try {
      const [updatedProcess] = await Promise.all([
        apiClient.analyzeProcess(processId),
        minDelay,
      ]);
      setProcess(updatedProcess);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleExportCSV = () => {
    if (!process) return;
    const rows: string[][] = [
      ["Champ", "Valeur"],
      ["Nom", process.name],
      ["Statut", process.status],
      ["Description", `"${process.description.replace(/"/g, '""')}"`],
    ];

    if (process.scoring) {
      rows.push(["Score Total", `${process.scoring.totalScore}/${process.scoring.maxPossibleScore}`]);
      rows.push(["Pourcentage", `${process.scoring.percentage}%`]);
      rows.push(["Classification", process.scoring.classification]);
    }

    if (process.analysis) {
      rows.push(["Nombre d'etapes", String(process.analysis.summary.totalSteps)]);
      rows.push(["Nombre d'acteurs", String(process.analysis.summary.totalActors)]);
      rows.push(["Taches repetitives", String(process.analysis.summary.repetitiveTaskCount)]);
      rows.push(["Interventions humaines", String(process.analysis.summary.humanInterventionCount)]);
      rows.push(["Acteurs", process.analysis.actors.join(", ")]);
    }

    if (process.costEstimation && process.costEstimation.executionsPerMonth > 0) {
      rows.push(["Cout par execution (DT)", String(process.costEstimation.manualCostPerExecution)]);
      rows.push(["Executions par mois", String(process.costEstimation.executionsPerMonth)]);
      rows.push(["Economies mensuelles (DT)", String(process.costEstimation.monthlySavings)]);
      rows.push(["Economies annuelles (DT)", String(process.costEstimation.annualSavings)]);
      rows.push(["ROI (%)", String(process.costEstimation.roiPercentage)]);
      rows.push(["Retour sur investissement (mois)", String(process.costEstimation.paybackMonths)]);
    }

    if (process.recommendations) {
      process.recommendations.forEach((r, i) => {
        rows.push([`Recommandation ${i + 1}`, `[${r.priority}] ${r.suggestion}`]);
      });
    }

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${process.name.replace(/\s+/g, "_")}_rapport.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <Spinner text="Chargement du processus..." />;
  if (!process) return <div className="text-center py-12">Processus non trouve</div>;

  return (
    <div className="space-y-8">
      {analyzing && <AnalysisLoader />}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{process.name}</h1>
          <p className="text-muted-foreground mt-1 capitalize">Statut : {process.status === 'analyzed' ? 'Analysé' : process.status === 'pending' ? 'En attente' : process.status}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
          >
            Exporter CSV
          </button>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2"
          >
            {analyzing ? (
              <>
                <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Analyse en cours...
              </>
            ) : "Analyser le processus"}
          </button>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-muted/50">
        <h2 className="font-semibold mb-2">Description du processus</h2>
        <p className="whitespace-pre-wrap">{process.description}</p>
      </div>

      {process.analysis && (
        <ProcessFlow analysis={process.analysis} />
      )}

      {process.analysis && (
        <ProcessAnalysis analysis={process.analysis} />
      )}

      {process.scoring && (
        <ScoreDisplay scoring={process.scoring} />
      )}

      {process.recommendations && process.recommendations.length > 0 && (
        <RecommendationList recommendations={process.recommendations} />
      )}

      {process.costEstimation && process.costEstimation.executionsPerMonth > 0 && (
        <ROIDisplay costEstimation={process.costEstimation} />
      )}
    </div>
  );
}
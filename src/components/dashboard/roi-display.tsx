"use client";

import { CostEstimation } from "@/lib/types";

interface ROIDisplayProps {
  costEstimation: CostEstimation;
}

export function ROIDisplay({ costEstimation }: ROIDisplayProps) {
  const {
    manualCostPerExecution,
    executionsPerMonth,
    averageTimeMinutes,
    estimatedAutomationCost,
    monthlySavings,
    annualSavings,
    roiPercentage,
    paybackMonths,
  } = costEstimation;

  const roiColor = roiPercentage > 100 ? "text-green-600" : roiPercentage > 0 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Estimation ROI</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600">Dt{manualCostPerExecution}</p>
          <p className="text-xs text-muted-foreground mt-1">Cout / execution</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600">{executionsPerMonth}</p>
          <p className="text-xs text-muted-foreground mt-1">Executions / mois</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600">{averageTimeMinutes} min</p>
          <p className="text-xs text-muted-foreground mt-1">Temps moyen</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <p className="text-2xl font-bold text-purple-600">Dt{estimatedAutomationCost}</p>
          <p className="text-xs text-muted-foreground mt-1">Cout d&apos;automatisation</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg text-center bg-green-50">
          <p className="text-2xl font-bold text-green-600">Dt{monthlySavings}</p>
          <p className="text-xs text-muted-foreground mt-1">Economies / mois</p>
        </div>
        <div className="p-4 border rounded-lg text-center bg-green-50">
          <p className="text-2xl font-bold text-green-600">Dt{annualSavings}</p>
          <p className="text-xs text-muted-foreground mt-1">Economies / an</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <p className={`text-2xl font-bold ${roiColor}`}>{roiPercentage}%</p>
          <p className="text-xs text-muted-foreground mt-1">ROI</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <p className="text-2xl font-bold text-orange-600">{paybackMonths}</p>
          <p className="text-xs text-muted-foreground mt-1">Mois de retour</p>
        </div>
      </div>

      {roiPercentage > 0 && (
        <div className={`p-3 rounded-lg text-sm ${roiPercentage > 100 ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"}`}>
          {roiPercentage > 100
            ? `Excellent ROI! L'automatisation se rentabilise en ${paybackMonths} mois avec ${annualSavings} Dt d'economies annuelles.`
            : `ROI positif. L'investissement sera recupere en environ ${paybackMonths} mois.`}
        </div>
      )}
    </div>
  );
}

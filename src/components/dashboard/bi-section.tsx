"use client";

import { BIData } from "@/lib/types";

interface BISectionProps {
  data: BIData;
}

/* ─── ROI Table ───────────────────────────────────────────────────────── */
function ROITable({ data }: { data: BIData["roiData"] }) {
  if (data.length === 0) return <p className="text-muted-foreground text-sm text-center py-4">Aucune donnée de coût disponible</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium text-muted-foreground">Processus</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Éco. annuelles</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Coût auto.</th>
            <th className="text-right py-2 font-medium text-muted-foreground">ROI</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Retour</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b last:border-0">
              <td className="py-2 max-w-[180px] truncate">{row.name}</td>
              <td className="text-right py-2 font-medium text-green-600">{row.annualSavings.toLocaleString()} DT</td>
              <td className="text-right py-2 text-muted-foreground">{row.automationCost.toLocaleString()} DT</td>
              <td className="text-right py-2">
                <span className={`font-medium ${row.roiPercentage > 0 ? "text-green-600" : "text-red-600"}`}>
                  {row.roiPercentage}%
                </span>
              </td>
              <td className="text-right py-2 text-muted-foreground">{row.paybackMonths} mois</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main BI Section ─────────────────────────────────────────────────── */
export function BISection({ data }: BISectionProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Analyse ROI détaillée</h3>
        <ROITable data={data.roiData} />
      </div>
    </div>
  );
}

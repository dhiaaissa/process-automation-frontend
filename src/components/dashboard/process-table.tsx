"use client";

import Link from "next/link";
import { DashboardProcess } from "@/lib/types";
import { getAutomationLevelColor, getAutomationLevelLabel } from "@/lib/utils";

interface ProcessTableProps {
  processes: DashboardProcess[];
}

export function ProcessTable({ processes }: ProcessTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3 text-sm font-medium">Processus</th>
            <th className="text-center p-3 text-sm font-medium">Statut</th>
            <th className="text-center p-3 text-sm font-medium">Score</th>
            <th className="text-center p-3 text-sm font-medium">Niveau</th>
            <th className="text-center p-3 text-sm font-medium">Recommandations</th>
          </tr>
        </thead>
        <tbody>
          {processes.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-6 text-muted-foreground">
                Aucun processus disponible
              </td>
            </tr>
          ) : (
            processes.map((process) => (
              <tr key={process.id} className="border-t hover:bg-muted/50">
                <td className="p-3">
                  <Link href={`/processes/${process.id}`} className="text-primary hover:underline font-medium">
                    {process.name}
                  </Link>
                </td>
                <td className="text-center p-3 capitalize">{process.status}</td>
                <td className="text-center p-3 font-medium">
                  {process.totalScore !== null && process.totalScore !== undefined
                    ? `${process.totalScore} (${process.percentage}%)`
                    : "-"}
                </td>
                <td className="text-center p-3">
                  {process.classification ? (
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getAutomationLevelColor(process.classification)}`}>
                      {getAutomationLevelLabel(process.classification)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="text-center p-3">{process.recommendationCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
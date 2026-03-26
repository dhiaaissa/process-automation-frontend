"use client";

import Link from "next/link";
import { getAutomationLevelColor, getAutomationLevelLabel } from "@/lib/utils";

interface ProcessTableProps {
  processes: any[];
}

export function ProcessTable({ processes }: ProcessTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3 text-sm font-medium">Processus</th>
            <th className="text-center p-3 text-sm font-medium">Etapes</th>
            <th className="text-center p-3 text-sm font-medium">Acteurs</th>
            <th className="text-center p-3 text-sm font-medium">Score</th>
            <th className="text-center p-3 text-sm font-medium">Niveau</th>
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
                    {process.title}
                  </Link>
                </td>
                <td className="text-center p-3">{process.steps_count}</td>
                <td className="text-center p-3">{process.actors_count}</td>
                <td className="text-center p-3 font-medium">
                  {process.total_score !== null ? `${process.total_score}/30` : "-"}
                </td>
                <td className="text-center p-3">
                  {process.automation_level ? (
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getAutomationLevelColor(process.automation_level)}`}>  
                      {getAutomationLevelLabel(process.automation_level)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
"use client";

import { DashboardStats } from "@/lib/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    { label: "Total Processus", value: stats.totalProcesses, icon: "📋" },
    { label: "Analyses", value: stats.analyzedProcesses, icon: "📊" },
    { label: "En attente", value: stats.pendingProcesses, icon: "⏳" },
    { label: "Score Moyen", value: stats.averageScore, icon: "⚡" },
    { label: "% Automatisable", value: `${stats.automatablePercentage}%`, icon: "✅" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="p-4 border rounded-lg bg-card">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{card.icon}</span>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { DashboardStats, DashboardProcess, BIData } from "@/lib/types";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AutomationChart } from "@/components/dashboard/automation-chart";
import { ProcessTable } from "@/components/dashboard/process-table";
import { BISection } from "@/components/dashboard/bi-section";
import { Spinner } from "@/components/ui/loader";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [processes, setProcesses] = useState<DashboardProcess[]>([]);
  const [biData, setBiData] = useState<BIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsData, processesData, bi] = await Promise.all([
          apiClient.getDashboardStats(),
          apiClient.getDashboardOverview(),
          apiClient.getDashboardBI(),
        ]);
        setStats(statsData);
        setProcesses(processesData || []);
        setBiData(bi);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <Spinner text="Chargement du tableau de bord..." />;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Tableau de Bord</h1>
      {stats && <StatsCards stats={stats} />}
      {stats && <AutomationChart distribution={stats.classificationBreakdown} />}
      <ProcessTable processes={processes} />
      {biData && <BISection data={biData} />}
    </div>
  );
}
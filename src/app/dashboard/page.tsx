"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { DashboardStats } from "@/lib/types";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AutomationChart } from "@/components/dashboard/automation-chart";
import { ProcessTable } from "@/components/dashboard/process-table";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [processes, setProcesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsData, processesData] = await Promise.all([
          apiClient.getDashboardStats(),
          apiClient.getDashboardProcesses(),
        ]);
        setStats(statsData);
        setProcesses(processesData.processes || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64">Chargement...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Tableau de Bord</h1>
      {stats && <StatsCards stats={stats} />}
      {stats && <AutomationChart distribution={stats.automation_distribution} />}
      <ProcessTable processes={processes} />
    </div>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Process } from "@/lib/types";
import { Spinner } from "@/components/ui/loader";

export default function ProcessesPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [classificationFilter, setClassificationFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const fetchProcesses = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (classificationFilter) params.classification = classificationFilter;
      if (sortBy) params.sortBy = sortBy;
      params.order = order;
      const data = await apiClient.getProcesses(params);
      setProcesses(data);
    } catch (error) {
      console.error("Error fetching processes:", error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, classificationFilter, sortBy, order]);

  useEffect(() => {
    const debounce = setTimeout(fetchProcesses, 300);
    return () => clearTimeout(debounce);
  }, [fetchProcesses]);

  const classificationColor = (c?: string) => {
    if (c === "Automatisable") return "bg-green-100 text-green-800";
    if (c === "Semi-automatisable") return "bg-yellow-100 text-yellow-800";
    if (c === "Non automatisable") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mes Processus</h1>
        <Link
          href="/processes/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
        >
          + Nouveau Processus
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="analyzed">Analysé</option>
        </select>
        <select
          value={classificationFilter}
          onChange={(e) => setClassificationFilter(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          <option value="">Toutes classifications</option>
          <option value="Automatisable">Automatisable</option>
          <option value="Semi-automatisable">Semi-automatisable</option>
          <option value="Non automatisable">Non automatisable</option>
        </select>
        <select
          value={`${sortBy}-${order}`}
          onChange={(e) => {
            const [s, o] = e.target.value.split("-");
            setSortBy(s);
            setOrder(o);
          }}
          className="px-3 py-2 border rounded-md bg-background"
        >
          <option value="createdAt-desc">Plus recents</option>
          <option value="createdAt-asc">Plus anciens</option>
          <option value="score-desc">Score (desc)</option>
          <option value="score-asc">Score (asc)</option>
          <option value="name-asc">Nom (A-Z)</option>
          <option value="name-desc">Nom (Z-A)</option>
        </select>
      </div>

      {loading ? (
        <Spinner text="Chargement des processus..." />
      ) : processes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Aucun processus trouve.</p>
          <Link href="/processes/new" className="text-primary hover:underline mt-2 inline-block">
            Creer votre premier processus
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {processes.map((process) => (
            <Link
              key={process._id}
              href={`/processes/${process._id}`}
              className="block p-4 border rounded-lg hover:border-primary hover:shadow transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{process.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {process.analysis?.summary
                      ? `${process.analysis.summary.totalSteps} etapes, ${process.analysis.summary.totalActors} acteurs`
                      : "Pas encore analysé"}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-muted-foreground capitalize">{process.status === 'analyzed' ? 'Analysé' : process.status === 'pending' ? 'En attente' : process.status}</p>
                  {process.scoring && (
                    <>
                      <p className="text-sm font-semibold">{process.scoring.percentage}%</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${classificationColor(process.scoring.classification)}`}>
                        {process.scoring.classification}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
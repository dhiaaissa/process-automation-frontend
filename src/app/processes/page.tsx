"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Process } from "@/lib/types";

export default function ProcessesPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const data = await apiClient.getProcesses();
        setProcesses(data);
      } catch (error) {
        console.error("Error fetching processes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProcesses();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

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

      {processes.length === 0 ? (
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
              key={process.id}
              href={`/processes/${process.id}`}
              className="block p-4 border rounded-lg hover:border-primary hover:shadow transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{process.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {process.description || "Pas de description"}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{process.steps?.length || 0} etapes</p>
                  <p>{process.actors?.length || 0} acteurs</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
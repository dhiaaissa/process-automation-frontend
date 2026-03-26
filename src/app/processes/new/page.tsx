"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { ProcessForm } from "@/components/process/process-form";

export default function NewProcessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { title: string; description: string; user_story: string }) => {
    setLoading(true);
    setError(null);
    try {
      const process = await apiClient.createProcess(data);
      router.push(`/processes/${process.id}`);
    } catch (err) {
      setError("Erreur lors de la creation du processus");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Nouveau Processus</h1>
      <p className="text-muted-foreground">
        Decrivez votre processus metier sous forme de texte (user story). La plateforme
        analysera automatiquement les etapes, acteurs et actions.
      </p>
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md">{error}</div>
      )}
      <ProcessForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
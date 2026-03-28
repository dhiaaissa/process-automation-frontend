"use client";

import { useState } from "react";

interface ProcessFormData {
  name: string;
  description: string;
  manualCostPerExecution?: number;
  executionsPerMonth?: number;
  averageTimeMinutes?: number;
}

interface ProcessFormProps {
  onSubmit: (data: ProcessFormData) => void;
  loading?: boolean;
  initialData?: Partial<ProcessFormData>;
}

export function ProcessForm({ onSubmit, loading = false, initialData }: ProcessFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [manualCostPerExecution, setManualCostPerExecution] = useState<string>(
    initialData?.manualCostPerExecution?.toString() || ""
  );
  const [executionsPerMonth, setExecutionsPerMonth] = useState<string>(
    initialData?.executionsPerMonth?.toString() || ""
  );
  const [averageTimeMinutes, setAverageTimeMinutes] = useState<string>(
    initialData?.averageTimeMinutes?.toString() || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: ProcessFormData = { name, description };
    if (manualCostPerExecution) data.manualCostPerExecution = parseFloat(manualCostPerExecution);
    if (executionsPerMonth) data.executionsPerMonth = parseInt(executionsPerMonth);
    if (averageTimeMinutes) data.averageTimeMinutes = parseInt(averageTimeMinutes);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nom du processus *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Processus de validation des commandes"
          className="w-full px-3 py-2 border rounded-md bg-background"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description detaillee du processus *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Decrivez votre processus etape par etape. Ex: Le client soumet une demande. Le manager verifie les informations. Le systeme envoie une notification..."
          className="w-full px-3 py-2 border rounded-md bg-background min-h-[200px] resize-y"
          required
        />
        <p className="text-xs text-muted-foreground">
          Decrivez chaque etape du processus en phrases claires. Mentionnez les acteurs et les actions.
        </p>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-sm font-semibold mb-4">Estimation des couts (Optionnel)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="costPerExec" className="text-sm font-medium">
              Cout par execution (DT)
            </label>
            <input
              id="costPerExec"
              type="number"
              min="0"
              step="0.01"
              value={manualCostPerExecution}
              onChange={(e) => setManualCostPerExecution(e.target.value)}
              placeholder="Ex: 25.00"
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="execPerMonth" className="text-sm font-medium">
              Executions par mois
            </label>
            <input
              id="execPerMonth"
              type="number"
              min="0"
              value={executionsPerMonth}
              onChange={(e) => setExecutionsPerMonth(e.target.value)}
              placeholder="Ex: 200"
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="avgTime" className="text-sm font-medium">
              Temps moyen (minutes)
            </label>
            <input
              id="avgTime"
              type="number"
              min="0"
              value={averageTimeMinutes}
              onChange={(e) => setAverageTimeMinutes(e.target.value)}
              placeholder="Ex: 15"
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !name || !description}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Création en cours...
          </>
        ) : "Créer le processus"}
      </button>
    </form>
  );
}
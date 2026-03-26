"use client";

import { useState } from "react";

interface ProcessFormProps {
  onSubmit: (data: { name: string; description: string }) => void;
  loading?: boolean;
  initialData?: { name?: string; description?: string };
}

export function ProcessForm({ onSubmit, loading = false, initialData }: ProcessFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
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

      <button
        type="submit"
        disabled={loading || !name || !description}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creation en cours..." : "Creer le processus"}
      </button>
    </form>
  );
}
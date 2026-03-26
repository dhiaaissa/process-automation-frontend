"use client";

import { useState } from "react";

interface ProcessFormProps {
  onSubmit: (data: { title: string; description: string; user_story: string }) => void;
  loading?: boolean;
  initialData?: { title?: string; description?: string; user_story?: string };
}

export function ProcessForm({ onSubmit, loading = false, initialData }: ProcessFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [userStory, setUserStory] = useState(initialData?.user_story || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, user_story: userStory });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Titre du processus *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Processus de validation des commandes"
          className="w-full px-3 py-2 border rounded-md bg-background"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Breve description du processus"
          className="w-full px-3 py-2 border rounded-md bg-background"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="user_story" className="text-sm font-medium">
          Description detaillee du processus (User Story) *
        </label>
        <textarea
          id="user_story"
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
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
        disabled={loading || !title || !userStory}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creation en cours..." : "Creer le processus"}
      </button>
    </form>
  );
}
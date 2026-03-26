"use client";

import { ProcessAnalysis as ProcessAnalysisType } from "@/lib/types";

interface ProcessAnalysisProps {
  analysis: ProcessAnalysisType;
}

export function ProcessAnalysis({ analysis }: ProcessAnalysisProps) {
  const { steps, actors, actions, repetitiveTasks, humanInterventions, summary } = analysis;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Resultat de l'analyse</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 border rounded-lg text-center">
            <p className="text-3xl font-bold text-primary">{summary.totalSteps}</p>
            <p className="text-sm text-muted-foreground">Etapes detectees</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className="text-3xl font-bold text-primary">{summary.totalActors}</p>
            <p className="text-sm text-muted-foreground">Acteurs identifies</p>
          </div>
        </div>
      </div>

      {actors.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Acteurs</h3>
          <div className="flex gap-2 flex-wrap">
            {actors.map((actor, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {actor}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-3">Etapes du processus</h3>
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.order} className="flex gap-4 p-3 border rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {step.order}
              </div>
              <div className="flex-1">
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {actions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Actions identifiees</h3>
          <div className="space-y-2">
            {actions.map((action, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="font-medium">{action.verb}</span>
                <span className="text-muted-foreground">{action.object}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {repetitiveTasks.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Taches repetitives</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {repetitiveTasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>
      )}

      {humanInterventions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Interventions humaines</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {humanInterventions.map((intervention, i) => (
              <li key={i}>{intervention}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
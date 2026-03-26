"use client";

import { ProcessStep } from "@/lib/types";

interface ProcessAnalysisProps {
  steps: ProcessStep[];
  actors: string[];
}

export function ProcessAnalysis({ steps, actors }: ProcessAnalysisProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Resultat de l'analyse</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 border rounded-lg text-center">
            <p className="text-3xl font-bold text-primary">{steps.length}</p>
            <p className="text-sm text-muted-foreground">Etapes detectees</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className="text-3xl font-bold text-primary">{actors.length}</p>
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
            <div key={step.step_number} className="flex gap-4 p-3 border rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {step.step_number}
              </div>
              <div className="flex-1">
                <p>{step.description}</p>
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                  {step.actor && <span>Acteur: {step.actor}</span>}
                  {step.action && <span>Action: {step.action}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
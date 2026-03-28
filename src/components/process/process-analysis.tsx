"use client";

import { ProcessAnalysis as ProcessAnalysisType } from "@/lib/types";

interface ProcessAnalysisProps {
  analysis: ProcessAnalysisType;
}

const stepTypeConfig: Record<string, { label: string; color: string; icon: string }> = {
  automatisable: { label: "Automatisable", color: "bg-green-100 text-green-700 border-green-300", icon: "⚙️" },
  "semi-automatisable": { label: "Semi-auto", color: "bg-amber-100 text-amber-700 border-amber-300", icon: "🔄" },
  manuel: { label: "Manuel", color: "bg-red-100 text-red-700 border-red-300", icon: "✋" },
};

const complexityConfig: Record<string, { color: string }> = {
  faible: { color: "bg-green-100 text-green-700" },
  moyenne: { color: "bg-amber-100 text-amber-700" },
  élevée: { color: "bg-red-100 text-red-700" },
};

export function ProcessAnalysis({ analysis }: ProcessAnalysisProps) {
  const { steps, actors, actions, repetitiveTasks, humanInterventions, summary } = analysis;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Résultat de l&apos;analyse</h2>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 border rounded-lg text-center">
            <p className="text-3xl font-bold text-primary">{summary.totalSteps}</p>
            <p className="text-sm text-muted-foreground">Étapes détectées</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className="text-3xl font-bold text-primary">{summary.totalActors}</p>
            <p className="text-sm text-muted-foreground">Acteurs identifiés</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className={`text-3xl font-bold ${(summary.automationReadiness ?? 0) >= 60 ? 'text-green-600' : (summary.automationReadiness ?? 0) >= 30 ? 'text-amber-600' : 'text-red-600'}`}>
              {summary.automationReadiness ?? 0}%
            </p>
            <p className="text-sm text-muted-foreground">Taux d&apos;automatisation</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            {summary.complexityLevel && (
              <span className={`inline-block px-3 py-1 rounded-full text-lg font-bold ${complexityConfig[summary.complexityLevel]?.color || ''}`}>
                {summary.complexityLevel.charAt(0).toUpperCase() + summary.complexityLevel.slice(1)}
              </span>
            )}
            <p className="text-sm text-muted-foreground mt-1">Complexité</p>
          </div>
        </div>

        {/* Step type breakdown bar */}
        {(summary.systemStepCount !== undefined) && (
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">Répartition des étapes</h3>
            <div className="flex rounded-full overflow-hidden h-4 bg-muted">
              {(summary.systemStepCount ?? 0) > 0 && (
                <div
                  className="bg-green-500 transition-all"
                  style={{ width: `${((summary.systemStepCount ?? 0) / summary.totalSteps) * 100}%` }}
                  title={`Automatisable: ${summary.systemStepCount}`}
                />
              )}
              {(summary.totalSteps - (summary.systemStepCount ?? 0) - (summary.manualStepCount ?? 0)) > 0 && (
                <div
                  className="bg-amber-400 transition-all"
                  style={{ width: `${((summary.totalSteps - (summary.systemStepCount ?? 0) - (summary.manualStepCount ?? 0)) / summary.totalSteps) * 100}%` }}
                  title={`Semi-auto: ${summary.totalSteps - (summary.systemStepCount ?? 0) - (summary.manualStepCount ?? 0)}`}
                />
              )}
              {(summary.manualStepCount ?? 0) > 0 && (
                <div
                  className="bg-red-400 transition-all"
                  style={{ width: `${((summary.manualStepCount ?? 0) / summary.totalSteps) * 100}%` }}
                  title={`Manuel: ${summary.manualStepCount}`}
                />
              )}
            </div>
            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Automatisable ({summary.systemStepCount ?? 0})</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Semi-auto ({summary.totalSteps - (summary.systemStepCount ?? 0) - (summary.manualStepCount ?? 0)})</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" /> Manuel ({summary.manualStepCount ?? 0})</span>
            </div>
          </div>
        )}
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
        <h3 className="font-semibold mb-3">Étapes du processus</h3>
        <div className="space-y-3">
          {steps.map((step) => {
            const typeInfo = stepTypeConfig[step.type || 'semi-automatisable'];
            return (
              <div key={step.order} className="flex gap-4 p-3 border rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.order}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${typeInfo.color}`}>
                      {typeInfo.icon} {typeInfo.label}
                    </span>
                    {step.actor && (
                      <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                        👤 {step.actor}
                      </span>
                    )}
                  </div>
                  <p>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {actions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Actions identifiées</h3>
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
          <h3 className="font-semibold mb-2">Tâches répétitives</h3>
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
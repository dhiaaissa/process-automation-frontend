"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* ─── Simple spinner for general page loading ───────────────────────────── */
export function Spinner({ text = "Chargement..." }: { text?: string }) {
  return (
    <div className="flex flex-col justify-center items-center h-64 gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-muted" />
        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
    </div>
  );
}

/* ─── Animated analysis loader with stepper progress ────────────────────── */
const ANALYSIS_STEPS = [
  { icon: "📝", label: "Lecture du processus" },
  { icon: "🔍", label: "Détection des étapes et acteurs" },
  { icon: "⚙️", label: "Classification des étapes" },
  { icon: "📊", label: "Calcul du score d'automatisation" },
  { icon: "💡", label: "Génération des recommandations" },
  { icon: "✅", label: "Finalisation de l'analyse" },
];

function AnalysisLoaderContent() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999 }}
      className="flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-md mx-4 p-6 bg-card border rounded-xl shadow-lg space-y-6">
        {/* Animated brain icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl analysis-pulse">
              🧠
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
          <h3 className="text-lg font-semibold">Analyse en cours</h3>
          <p className="text-sm text-muted-foreground text-center">
            Notre moteur analyse votre processus métier...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStep + 1) / ANALYSIS_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {ANALYSIS_STEPS.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-500 ${
                i < currentStep
                  ? "text-green-600 bg-green-50"
                  : i === currentStep
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground"
              }`}
            >
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {i < currentStep ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i === currentStep ? (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                )}
              </span>
              <span>{step.icon}</span>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnalysisLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(<AnalysisLoaderContent />, document.body);
}

/* ─── Small inline creating loader for form submission ──────────────────── */
export function CreatingLoader({ text = "Création en cours..." }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
      {text}
    </span>
  );
}

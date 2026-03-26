"use client";

interface AutomationChartProps {
  distribution: {
    automatable: number;
    semiAutomatable: number;
    notAutomatable: number;
  };
}

export function AutomationChart({ distribution }: AutomationChartProps) {
  const total = distribution.automatable + distribution.semiAutomatable + distribution.notAutomatable;

  const items = [
    { label: "Automatisable", value: distribution.automatable, color: "bg-green-500" },
    { label: "Semi-automatisable", value: distribution.semiAutomatable, color: "bg-yellow-500" },
    { label: "Non automatisable", value: distribution.notAutomatable, color: "bg-red-500" },
  ];

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h3 className="font-semibold mb-4">Distribution de l'automatisation</h3>
      {total === 0 ? (
        <p className="text-muted-foreground text-center py-4">Aucune donnee disponible</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span className="font-medium">
                  {item.value} ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full transition-all`}
                  style={{ width: `${total > 0 ? (item.value / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
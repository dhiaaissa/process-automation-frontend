"use client";

import { useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Position,
  MarkerType,
  Background,
  Controls,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import { ProcessAnalysis as ProcessAnalysisType } from "@/lib/types";

interface ProcessFlowProps {
  analysis: ProcessAnalysisType;
}

const nodeWidth = 220;
const nodeHeight = 60;
const gapY = 100;
const gapX = 300;

function getActorColor(index: number) {
  const colors = [
    { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
    { bg: "#dcfce7", border: "#22c55e", text: "#166534" },
    { bg: "#fef9c3", border: "#eab308", text: "#854d0e" },
    { bg: "#fce7f3", border: "#ec4899", text: "#9d174d" },
    { bg: "#e0e7ff", border: "#6366f1", text: "#3730a3" },
    { bg: "#ffedd5", border: "#f97316", text: "#9a3412" },
  ];
  return colors[index % colors.length];
}

export function ProcessFlow({ analysis }: ProcessFlowProps) {
  const { steps, actors } = analysis;

  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Map actors to a column index
    const actorMap = new Map<string, number>();
    actors.forEach((actor, i) => actorMap.set(actor.toLowerCase(), i));

    // Start node
    nodes.push({
      id: "start",
      type: "input",
      data: { label: "Debut" },
      position: { x: 140, y: 0 },
      style: {
        background: "#10b981",
        color: "#fff",
        borderRadius: "50%",
        width: 60,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        border: "2px solid #059669",
      },
      sourcePosition: Position.Bottom,
    });

    // Step type border colors
    const stepTypeBorders: Record<string, string> = {
      automatisable: "#22c55e",
      "semi-automatisable": "#eab308",
      manuel: "#ef4444",
    };
    const stepTypeIcons: Record<string, string> = {
      automatisable: "⚙️",
      "semi-automatisable": "🔄",
      manuel: "✋",
    };

    // Step nodes — try to assign each to an actor column
    steps.forEach((step, i) => {
      const desc = step.description.toLowerCase();
      let actorIndex = 0;
      actorMap.forEach((idx, actor) => {
        if (desc.includes(actor)) {
          actorIndex = idx;
        }
      });

      const color = getActorColor(actorIndex);
      const stepType = step.type || 'semi-automatisable';
      const borderColor = stepTypeBorders[stepType] || "#eab308";
      const typeIcon = stepTypeIcons[stepType] || "🔄";

      nodes.push({
        id: `step-${step.order}`,
        data: {
          label: (
            <div className="text-xs text-center leading-tight px-1">
              <div className="font-bold mb-0.5">
                Étape {step.order} {typeIcon}
              </div>
              <div>{step.description.slice(0, 80)}{step.description.length > 80 ? "..." : ""}</div>
            </div>
          ),
        },
        position: {
          x: actorIndex * gapX + 20,
          y: (i + 1) * gapY + 20,
        },
        style: {
          background: color.bg,
          border: `2px solid ${borderColor}`,
          borderRadius: 10,
          width: nodeWidth,
          minHeight: nodeHeight,
          padding: 6,
          color: color.text,
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });

      // Connect to previous
      const sourceId = i === 0 ? "start" : `step-${steps[i - 1].order}`;
      edges.push({
        id: `e-${sourceId}-step-${step.order}`,
        source: sourceId,
        target: `step-${step.order}`,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#94a3b8", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
      });
    });

    // End node
    const lastStep = steps[steps.length - 1];
    if (lastStep) {
      nodes.push({
        id: "end",
        type: "output",
        data: { label: "Fin" },
        position: { x: 140, y: (steps.length + 1) * gapY + 20 },
        style: {
          background: "#ef4444",
          color: "#fff",
          borderRadius: "50%",
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          border: "2px solid #dc2626",
        },
        targetPosition: Position.Top,
      });

      edges.push({
        id: `e-step-${lastStep.order}-end`,
        source: `step-${lastStep.order}`,
        target: "end",
        type: "smoothstep",
        animated: true,
        style: { stroke: "#94a3b8", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
      });
    }

    return { nodes, edges };
  }, [steps, actors]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
        <h3 className="font-semibold">Diagramme du processus</h3>
        <div className="flex gap-3 text-xs text-muted-foreground">
          {actors.map((actor, i) => {
            const color = getActorColor(i);
            return (
              <span key={i} className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-sm inline-block"
                  style={{ background: color.bg, border: `1px solid ${color.border}` }}
                />
                {actor}
              </span>
            );
          })}
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm inline-block border-2 border-green-500" />
            Auto ⚙️
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm inline-block border-2 border-yellow-500" />
            Semi 🔄
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm inline-block border-2 border-red-500" />
            Manuel ✋
          </span>
        </div>
      </div>
      <div style={{ height: Math.max(500, (steps.length + 3) * gapY) }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          zoomOnScroll={false}
          zoomOnPinch={true}
          panOnScroll={false}
          preventScrolling={false}
        >
          <Background color="#e2e8f0" gap={20} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}

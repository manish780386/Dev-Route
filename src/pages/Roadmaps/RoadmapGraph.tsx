import { useParams, Link, Navigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import ReactFlow, {

  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  
} from "reactflow";

import "reactflow/dist/style.css";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import roadmapsData from "../../data/roadmaps.json";
import { useStore } from "../../store";

// ── Custom Node ───────────────────────────────────────────────────────────────

const statusColors = {
  required:    { border: "#0062f5", bg: "#f0f7ff", text: "#004de0", dot: "#0062f5" },
  recommended: { border: "#10b981", bg: "#f0fdf4", text: "#047857", dot: "#10b981" },
  optional:    { border: "#9ca3af", bg: "#f9fafb", text: "#6b7280", dot: "#9ca3af" },
};

function RoadmapNode({ data }: NodeProps) {
  const colors = statusColors[data.status as keyof typeof statusColors];

  return (
    <div
      className="group"
      style={{
        background:   data.completed ? "#f0fdf4" : colors.bg,
        border:       `2px solid ${data.completed ? "#10b981" : colors.border}`,
        borderRadius: 16,
        padding:      "12px 16px",
        minWidth:     180,
        maxWidth:     220,
        boxShadow:    "0 2px 8px rgba(0,0,0,0.08)",
        cursor:       "default",
        transition:   "all 0.2s",
      }}
    >
      <Handle type="target" position={Position.Top}    style={{ background: colors.dot, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: colors.dot, width: 8, height: 8 }} />

      {/* Step number + status */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{
          width: 22, height: 22, borderRadius: "50%",
          background: data.completed ? "#10b981" : colors.border,
          color: "white", fontSize: 11, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {data.completed ? "✓" : data.stepNumber}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 600,
          color: data.completed ? "#047857" : colors.text,
          background: data.completed ? "#dcfce7" : `${colors.border}18`,
          padding: "1px 7px", borderRadius: 99, whiteSpace: "nowrap",
        }}>
          {data.completed ? "Done" : data.status}
        </span>
      </div>

      {/* Title */}
      <p style={{
        fontSize: 13, fontWeight: 700,
        color: data.completed ? "#065f46" : "#111827",
        lineHeight: 1.3, marginBottom: 4,
        textDecoration: data.completed ? "line-through" : "none",
        opacity: data.completed ? 0.7 : 1,
      }}>
        {data.label}
      </p>

      {/* Time */}
      <p style={{ fontSize: 11, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4 }}>
        <Clock size={10} /> {data.estimatedTime}
      </p>
    </div>
  );
}

const nodeTypes = { roadmapNode: RoadmapNode };

// ── Layout: arrange nodes in a vertical tree ──────────────────────────────────

function buildGraphElements(
  steps: typeof roadmapsData.roadmaps[0]["steps"],
  completedIds: number[]
) {
  // Simple top-down layout with branching
  const nodes: Node[] = [];
  const edges: Edge[]  = [];

  const SPACING_X = 260;
  const SPACING_Y = 160;

  // Build adjacency to find branches
  const childrenMap = new Map<number, number[]>();
  steps.forEach((s) => {
    s.nextSteps.forEach((next) => {
      if (!childrenMap.has(s.id)) childrenMap.set(s.id, []);
      childrenMap.get(s.id)!.push(next);
    });
  });

  // BFS layout
  const positioned = new Map<number, { x: number; y: number }>();
  const queue: { id: number; level: number; xOffset: number }[] = [];

  // Find root nodes (no incoming edges)
  const hasIncoming = new Set(steps.flatMap((s) => s.nextSteps));
  const roots = steps.filter((s) => !hasIncoming.has(s.id));

  roots.forEach((r, i) => {
    queue.push({ id: r.id, level: 0, xOffset: i * SPACING_X });
  });

  const levelWidths = new Map<number, number>();

  while (queue.length > 0) {
    const { id, level, xOffset } = queue.shift()!;
    if (positioned.has(id)) continue;

    const lw = levelWidths.get(level) ?? 0;
    const x  = xOffset || lw * SPACING_X;
    positioned.set(id, { x, y: level * SPACING_Y });
    levelWidths.set(level, lw + 1);

    const children = childrenMap.get(id) ?? [];
    children.forEach((childId, ci) => {
      if (!positioned.has(childId)) {
        queue.push({
          id:      childId,
          level:   level + 1,
          xOffset: x + (ci - (children.length - 1) / 2) * SPACING_X,
        });
      }
    });
  }

  // Create nodes
  steps.forEach((step, i) => {
    const pos       = positioned.get(step.id) ?? { x: 0, y: i * SPACING_Y };
    const completed = completedIds.includes(step.id);

    nodes.push({
      id:       String(step.id),
      type:     "roadmapNode",
      position: pos,
      data: {
        label:         step.title,
        status:        step.status,
        estimatedTime: step.estimatedTime,
        stepNumber:    i + 1,
        completed,
      },
    });

    // Edges from nextSteps
    step.nextSteps.forEach((nextId) => {
      const targetStatus = steps.find((s) => s.id === nextId)?.status ?? "required";
      edges.push({
        id:             `e-${step.id}-${nextId}`,
        source:         String(step.id),
        target:         String(nextId),
        animated:       !completed,
        style: {
          stroke:      targetStatus === "required" ? "#0062f5" : targetStatus === "recommended" ? "#10b981" : "#9ca3af",
          strokeWidth: 2,
        },
      });
    });
  });

  // Handle steps with no explicit nextSteps — chain them sequentially
  const stepsWithNoNext = steps.filter((s) => s.nextSteps.length === 0 && steps.indexOf(s) < steps.length - 1);
  stepsWithNoNext.forEach((s) => {
    const nextIdx = steps.indexOf(s) + 1;
    if (nextIdx < steps.length) {
      const nextStep = steps[nextIdx];
      edges.push({
        id:             `e-auto-${s.id}-${nextStep.id}`,
        source:         String(s.id),
        target:         String(nextStep.id),
        animated:       true,
        style:          { stroke: "#cbd5e1", strokeWidth: 1.5, strokeDasharray: "5,5" },
      });
    }
  });

  return { nodes, edges };
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function RoadmapGraph() {
  const { roadmapId }       = useParams<{ roadmapId: string }>();
  const roadmap             = roadmapsData.roadmaps.find((r) => r.id === roadmapId);
  const isStepComplete      = useStore((s) => s.isStepComplete);
  const toggleStepComplete  = useStore((s) => s.toggleStepComplete);
  const getProgressPercent  = useStore((s) => s.getProgressPercent);

  if (!roadmap) return <Navigate to="/roadmaps" replace />;

  const completedIds = roadmap.steps
    .filter((s) => isStepComplete(roadmap.id, s.id))
    .map((s) => s.id);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildGraphElements(roadmap.steps as any[], completedIds),
    [roadmap, completedIds]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const progress = getProgressPercent(roadmap.id, roadmap.steps.length);
  const required = roadmap.steps.filter((s) => s.status === "required").length;

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center gap-4 shrink-0">
        <Link
          to={`/roadmaps/${roadmap.id}`}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={15} /> Back to list
        </Link>

        <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />

        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-xl">{roadmap.icon}</span>
          <span className="font-display font-bold text-gray-900 dark:text-white text-sm">
            {roadmap.title} Roadmap
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 ml-4">
          <div className="w-32 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-brand-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-medium">{progress}%</span>
        </div>

        {/* Legend */}
        <div className="ml-auto flex items-center gap-4">
          {[
            { status: "required",    color: "#0062f5", label: "Required"     },
            { status: "recommended", color: "#10b981", label: "Recommended"  },
            { status: "optional",    color: "#9ca3af", label: "Optional"     },
          ].map(({ color, label }) => (
            <div key={label} className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}

          <Link
            to={`/roadmaps/${roadmap.id}`}
            className="text-xs font-medium text-brand-600 bg-brand-50 dark:bg-brand-950 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors"
          >
            List View →
          </Link>
        </div>
      </div>

      {/* Hint bar */}
      <div className="bg-amber-50 dark:bg-amber-950 border-b border-amber-100 dark:border-amber-900 px-6 py-2 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2 shrink-0">
        <CheckCircle2 size={12} />
        <span>
          Go to <Link to={`/roadmaps/${roadmap.id}`} className="font-semibold underline">List View</Link> to mark steps complete. Scroll and pinch to zoom the graph.
          {required} required steps · {roadmap.steps.length} total
        </span>
      </div>

      {/* ReactFlow Graph */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e5e7eb" gap={20} size={1} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.data?.completed) return "#10b981";
              const s = node.data?.status;
              return s === "required" ? "#0062f5" : s === "recommended" ? "#10b981" : "#9ca3af";
            }}
            style={{ background: "#f9fafb" }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
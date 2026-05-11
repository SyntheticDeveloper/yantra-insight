import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { commitments, people } from "@/lib/mock-data";

export const Route = createFileRoute("/app/graph")({ component: GraphPage });

type Node = { id: string; label: string; x: number; y: number; type: "person" | "customer" | "ticket" | "pr" | "channel" | "meeting" | "agent" | "commitment"; tone: string };

const nodes: Node[] = [
  { id: "acme", label: "Acme Integration", x: 50, y: 50, type: "commitment", tone: "danger" },
  { id: "alex", label: "Alex Chen", x: 25, y: 25, type: "person", tone: "warning" },
  { id: "jordan", label: "Jordan Kim", x: 75, y: 22, type: "person", tone: "success" },
  { id: "sam", label: "Sam Rivera", x: 18, y: 70, type: "person", tone: "info" },
  { id: "maya", label: "Maya Singh", x: 82, y: 75, type: "person", tone: "info" },
  { id: "acme-142", label: "ACME-142", x: 38, y: 18, type: "ticket", tone: "danger" },
  { id: "pr482", label: "PR #482", x: 62, y: 18, type: "pr", tone: "warning" },
  { id: "ch-acme", label: "#customer-acme", x: 12, y: 45, type: "channel", tone: "info" },
  { id: "zoom-may8", label: "Zoom · May 8", x: 88, y: 45, type: "meeting", tone: "info" },
  { id: "cursor", label: "Cursor Agent", x: 35, y: 82, type: "agent", tone: "primary" },
  { id: "qa", label: "QA Agent", x: 65, y: 82, type: "agent", tone: "danger" },
];

const edges: [string, string][] = [
  ["acme", "alex"], ["acme", "jordan"], ["acme", "sam"], ["acme", "maya"],
  ["acme", "acme-142"], ["acme", "pr482"], ["acme", "ch-acme"], ["acme", "zoom-may8"],
  ["acme", "cursor"], ["acme", "qa"], ["alex", "acme-142"], ["alex", "pr482"], ["jordan", "pr482"],
];

const toneColor: Record<string, string> = {
  danger: "oklch(0.66 0.24 22)",
  warning: "oklch(0.78 0.16 75)",
  success: "oklch(0.72 0.17 155)",
  info: "oklch(0.72 0.16 230)",
  primary: "oklch(0.72 0.17 250)",
};

function GraphPage() {
  const [active, setActive] = useState<Node | null>(null);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Company graph</h1>
        <p className="text-sm text-muted-foreground">How people, work, conversations, and agents connect to your commitments.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="glass relative aspect-[4/3] overflow-hidden rounded-xl">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {edges.map(([a, b], i) => {
              const na = nodes.find((n) => n.id === a)!;
              const nb = nodes.find((n) => n.id === b)!;
              return <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="oklch(0.72 0.17 250 / 0.4)" strokeWidth="0.15" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: i * 0.04 }} />;
            })}
          </svg>
          {nodes.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-[11px] font-medium transition-transform hover:scale-110"
              style={{
                left: `${n.x}%`, top: `${n.y}%`,
                background: `${toneColor[n.tone]}22`,
                border: `1px solid ${toneColor[n.tone]}55`,
                color: toneColor[n.tone],
                boxShadow: n.id === "acme" ? `0 0 24px ${toneColor[n.tone]}55` : undefined,
              }}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Selected</p>
            <p className="mt-1 text-sm font-medium">{active?.label ?? "Acme Integration"}</p>
            <p className="mt-1 text-xs text-muted-foreground capitalize">{active?.type ?? "commitment"} · click any node</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Graph insights</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 text-primary" /> Alex is a single point of failure across 3 active commitments.</li>
              <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 text-primary" /> Auth dependency appears in 2 high-risk commitments.</li>
              <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 text-primary" /> Customer promise exists in CS notes but not in Linear scope.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

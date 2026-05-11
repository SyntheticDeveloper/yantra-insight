import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, GitPullRequest, Users, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { commitments, type Commitment, riskMeta } from "@/lib/mock-data";
import { RiskBadge, RiskBar } from "@/components/yantra/risk-badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/commitments")({ component: CommitmentsPage });

function CommitmentsPage() {
  const [filter, setFilter] = useState<"all" | "at-risk" | "watch" | "on-track">("all");
  const [active, setActive] = useState<Commitment | null>(null);

  const filtered = commitments.filter((c) => filter === "all" ? true : c.risk === filter);
  const counts = {
    all: commitments.length,
    "at-risk": commitments.filter((c) => c.risk === "at-risk").length,
    watch: commitments.filter((c) => c.risk === "watch").length,
    "on-track": commitments.filter((c) => c.risk === "on-track").length,
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Commitments</h1>
          <p className="text-sm text-muted-foreground">Customer promises Yantra is tracking across your tools.</p>
        </div>
        <div className="flex flex-wrap items-center gap-1 rounded-md border border-border bg-card/40 p-1">
          {(["all", "at-risk", "watch", "on-track"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`relative rounded px-3 py-1.5 text-xs font-medium transition-colors ${filter === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {k === "all" ? "All" : riskMeta[k].label} <span className="ml-1 opacity-70">{counts[k]}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <motion.button
            key={c.id}
            onClick={() => setActive(c)}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="glass group rounded-xl p-4 text-left transition-all hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground">{c.customer}</p>
                <h3 className="mt-0.5 font-semibold">{c.title}</h3>
              </div>
              <RiskBadge risk={c.risk} />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Risk score</span><span className="text-foreground">{c.riskScore}</span>
              </div>
              <div className="mt-1.5"><RiskBar score={c.riskScore} /></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <Stat label="Owner" value={c.owner} />
              <Stat label="Due" value={c.due} />
              <Stat label="Predicted slip" value={c.predictedSlipDays ? `${c.predictedSlipDays[0]}–${c.predictedSlipDays[1]}d` : "—"} />
              <Stat label="Revenue at risk" value={`$${(c.revenueAtRisk / 1000).toFixed(0)}K`} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
              <Pill icon={GitPullRequest}>{c.prs.length} PRs</Pill>
              <Pill icon={MessageSquare}>{c.slackThreads.length} threads</Pill>
              <Pill icon={Users}>{c.linearTickets.length} tickets</Pill>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-card/40 p-2.5 text-xs">
              <span className="text-muted-foreground">Next: <span className="text-foreground">{c.nextAction}</span></span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && <DetailPanel commitment={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-card/40 p-2">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-xs font-medium">{value}</p>
    </div>
  );
}
function Pill({ icon: I, children }: { icon: any; children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5"><I className="h-3 w-3" /> {children}</span>;
}

function DetailPanel({ commitment: c, onClose }: { commitment: Commitment; onClose: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm" />
      <motion.aside
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto border-l border-border bg-popover p-6 shadow-2xl scrollbar-thin"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{c.customer}</p>
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <div className="mt-2 flex items-center gap-2"><RiskBadge risk={c.risk} /><span className="text-xs text-muted-foreground">Confidence {c.confidence}%</span></div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Stat label="Owner" value={c.owner} />
          <Stat label="Due" value={c.due} />
          <Stat label="Predicted slip" value={c.predictedSlipDays ? `${c.predictedSlipDays[0]}–${c.predictedSlipDays[1]}d` : "—"} />
          <Stat label="Revenue at risk" value={`$${(c.revenueAtRisk / 1000).toFixed(0)}K`} />
        </div>

        <section className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold">Recommended next action</h3>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
            <p>{c.nextAction}</p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" onClick={() => { toast.success("Action approved. Yantra updated the plan."); onClose(); }}>Approve</Button>
              <Button size="sm" variant="ghost">Edit</Button>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-sm font-semibold">Linked work</h3>
          <ul className="mt-2 space-y-1.5 text-xs">
            {c.linearTickets.map((t) => <li key={t} className="rounded bg-card/40 p-2"><span className="text-muted-foreground">Linear · </span>{t}</li>)}
            {c.prs.map((p) => <li key={p} className="rounded bg-card/40 p-2"><span className="text-muted-foreground">GitHub PR · </span>{p}</li>)}
            {c.slackThreads.map((s) => <li key={s} className="rounded bg-card/40 p-2"><span className="text-muted-foreground">Slack · </span>{s}</li>)}
          </ul>
        </section>

        <div className="mt-6 flex gap-2">
          <Button size="sm" variant="outline" className="gap-2"><Sparkles className="h-3 w-3" /> Open in Action Center</Button>
          <Button size="sm" variant="ghost" className="gap-2">Open alert detail <ArrowRight className="h-3 w-3" /></Button>
        </div>
      </motion.aside>
    </>
  );
}

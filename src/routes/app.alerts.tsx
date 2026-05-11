import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertTriangle, Brain, FileText, GitPullRequest, MessageSquare, ShieldCheck, Video,
  Sparkles, FileEdit, Eye, Bot,
} from "lucide-react";
import { commitments, evidenceTimeline, evidenceSnippets } from "@/lib/mock-data";
import { RiskBadge } from "@/components/yantra/risk-badge";
import { SourceBadge } from "@/components/yantra/source-icon";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/alerts")({ component: Alerts });

const iconMap: Record<string, any> = {
  FileText, GitPullRequest, AlertTriangle, MessageSquare, ShieldCheck, Video, Brain,
};

function Alerts() {
  const c = commitments[0];
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">{c.customer}</p>
          <h1 className="text-2xl font-semibold tracking-tight">{c.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RiskBadge risk="at-risk" />
            <span className="text-xs text-muted-foreground">
              Predicted slip 12–18 days · Confidence {c.confidence}% · Revenue at risk ${(c.revenueAtRisk / 1000).toFixed(0)}K
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="gap-2" onClick={() => toast.success("Customer update drafted")}>
            <FileEdit className="h-3.5 w-3.5" /> Draft customer update
          </Button>
          <Button size="sm" className="gap-2" onClick={() => toast.success("Action plan created in Action Center")}>
            <Sparkles className="h-3.5 w-3.5" /> Create action plan
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Risk summary */}
          <section className="glass rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger/15 text-danger glow-danger">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Yantra's risk summary</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  The Acme Salesforce integration is on a slip path. The auth dependency on Alex has stalled for 9 days, PR review velocity has dropped 60%, and Customer Success communicated a date that is not reflected in the engineering plan. Three independent signals (Slack hedging, backwards Linear movement, Zoom uncertainty) align with patterns that historically precede 12–18 day slips on integration work.
                </p>
              </div>
            </div>
          </section>

          {/* Evidence timeline */}
          <section className="glass rounded-xl p-5">
            <h3 className="text-base font-semibold">Evidence timeline</h3>
            <ol className="mt-4 space-y-3 border-l border-border pl-4">
              {evidenceTimeline.map((e, i) => {
                const Icon = iconMap[e.icon] ?? FileText;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="relative"
                  >
                    <span className={`absolute -left-[22px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-background ${
                      e.tone === "danger" ? "bg-danger" : e.tone === "warning" ? "bg-warning" : "bg-info"
                    }`} />
                    <div className="flex items-start gap-2">
                      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{e.text}</p>
                        <p className="text-[11px] text-muted-foreground">{e.day}</p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </section>

          {/* Evidence map */}
          <section className="grid gap-3 md:grid-cols-2">
            <EvidenceCard title="Slack snippets" sourceId="slack">
              {evidenceSnippets.slack.map((s, i) => (
                <div key={i} className="rounded-lg border border-border/60 bg-card/40 p-3 text-xs">
                  <p className="text-foreground/90">"{s.text}"</p>
                  <p className="mt-1.5 text-muted-foreground">{s.who} · {s.channel} · {s.when}</p>
                </div>
              ))}
            </EvidenceCard>
            <EvidenceCard title="Linear tickets" sourceId="linear">
              {evidenceSnippets.linear.map((t) => (
                <div key={t.id} className="rounded-lg border border-border/60 bg-card/40 p-3 text-xs">
                  <p className="font-medium">{t.id} · {t.title}</p>
                  <p className="mt-1 text-muted-foreground">{t.status} · <span className="text-warning">{t.changed}</span></p>
                </div>
              ))}
            </EvidenceCard>
            <EvidenceCard title="GitHub PRs" sourceId="github">
              {evidenceSnippets.prs.map((p) => (
                <div key={p.id} className="rounded-lg border border-border/60 bg-card/40 p-3 text-xs">
                  <p className="font-medium">{p.id} · {p.title}</p>
                  <p className="mt-1 text-muted-foreground">{p.status} · {p.author}</p>
                </div>
              ))}
            </EvidenceCard>
            <EvidenceCard title="Zoom transcripts" sourceId="zoom">
              {evidenceSnippets.zoom.map((z, i) => (
                <div key={i} className="rounded-lg border border-border/60 bg-card/40 p-3 text-xs">
                  <p className="font-medium">{z.title}</p>
                  <p className="mt-1 italic text-foreground/80">{z.excerpt}</p>
                  <p className="mt-1 text-muted-foreground">— {z.speaker}</p>
                </div>
              ))}
            </EvidenceCard>
          </section>

          {/* Root cause */}
          <section className="glass rounded-xl p-5">
            <h3 className="text-base font-semibold">Root cause analysis</h3>
            <ol className="mt-3 space-y-2 text-sm">
              <li><span className="font-semibold text-danger">Primary:</span> Auth module dependency unresolved 9 days, blocking 6 PRs.</li>
              <li><span className="font-semibold text-warning">Secondary:</span> CS commitment (May 31) not mirrored in Linear scope.</li>
              <li><span className="font-semibold text-warning">Contributing:</span> Cursor Agent shipped code without QA agent review on auth/refresh path.</li>
            </ol>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-3">
          <div className="glass rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">People involved</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {[
                { name: "Alex Chen", role: "Owner — auth blocker" },
                { name: "Jordan Kim", role: "Could unblock — has bandwidth" },
                { name: "Sam Rivera", role: "EM — escalation path" },
                { name: "Maya Singh", role: "CE — owns customer comms" },
              ].map((p) => (
                <li key={p.name} className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary/60 to-[oklch(0.6_0.18_280)] text-xs font-semibold text-primary-foreground">
                    {p.name.split(" ").map((s) => s[0]).join("")}
                  </span>
                  <div className="leading-tight">
                    <p>{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{p.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI agents involved</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Bot className="h-4 w-4 text-primary" /> Cursor Agent — generated PR #491</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-danger" /> QA Agent — flagged regression risk</li>
              <li className="flex items-center gap-2"><Bot className="h-4 w-4 text-warning" /> Claude Code — drafted refactor plan</li>
            </ul>
          </div>

          <div className="glass rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick actions</p>
            <div className="mt-3 space-y-2">
              <Button size="sm" variant="outline" className="w-full justify-start gap-2"><Eye className="h-3.5 w-3.5" /> Open evidence map</Button>
              <Button size="sm" variant="outline" className="w-full justify-start gap-2"><FileEdit className="h-3.5 w-3.5" /> Draft Slack ping to Sam</Button>
              <Button size="sm" variant="outline" className="w-full justify-start gap-2" onClick={() => toast.success("Marked resolved")}>Mark as resolved</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function EvidenceCard({ title, sourceId, children }: { title: string; sourceId: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{title}</h4>
        <SourceBadge id={sourceId} />
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

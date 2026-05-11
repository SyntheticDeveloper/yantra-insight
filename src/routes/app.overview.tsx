import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertTriangle, ArrowRight, ChevronRight, Eye, FileEdit, Sparkles, Target,
  CheckCircle2, GitPullRequest, Brain, MessageSquare, Video,
} from "lucide-react";
import { toast } from "sonner";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { dashboardKpis, riskTrend, commitments, riskMeta } from "@/lib/mock-data";
import { KpiCard } from "@/components/yantra/kpi-card";
import { Section } from "@/components/yantra/section";
import { ActivityFeed } from "@/components/yantra/activity-feed";
import { RiskBadge, RiskBar } from "@/components/yantra/risk-badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/overview")({ component: Overview });

function Overview() {
  const hero = commitments[0];
  const [score, setScore] = useState(hero.riskScore);

  // Subtle live risk drift
  useEffect(() => {
    const t = setInterval(() => {
      setScore((s) => Math.max(72, Math.min(94, s + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Good morning, Maya</h1>
          <p className="text-sm text-muted-foreground">
            Yantra is observing 13 sources and 5 agents · 4 commitments need attention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/app/actions"><Button variant="outline" size="sm" className="gap-2"><Sparkles className="h-3.5 w-3.5" /> 7 recommended actions</Button></Link>
          <Link to="/app/alerts"><Button size="sm" className="gap-2"><AlertTriangle className="h-3.5 w-3.5" /> Open alert center</Button></Link>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {dashboardKpis.map((k, i) => <KpiCard key={k.label} {...k} index={i} />)}
      </div>

      {/* Hero alert */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-danger/30 bg-gradient-to-br from-danger/10 via-card/40 to-card/40 p-6 glow-danger"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: "oklch(0.66 0.24 22)" }} />
        <div className="relative grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <RiskBadge risk="at-risk" />
              <span className="text-xs text-muted-foreground">Highest risk commitment · updated 12s ago</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{hero.title}</h3>
            <p className="text-sm text-muted-foreground">
              Predicted slip <span className="font-medium text-danger">12–18 days</span> ·
              due <span className="font-medium text-foreground">{hero.due}</span> ·
              confidence <span className="font-medium text-foreground">{score}%</span> ·
              revenue at risk <span className="font-medium text-foreground">${(hero.revenueAtRisk / 1000).toFixed(0)}K</span>
            </p>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Why Yantra thinks it will slip</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {[
                  { i: GitPullRequest, t: "6 PRs blocked on Alex" },
                  { i: AlertTriangle, t: "Auth dependency unresolved for 9 days" },
                  { i: Target, t: "Linear ticket moved backward twice" },
                  { i: MessageSquare, t: "Slack mentions show uncertainty around API scope" },
                  { i: FileEdit, t: "Customer Success promised timeline not in engineering plan" },
                  { i: Eye, t: "QA Agent flagged missing test coverage" },
                ].map(({ i: I, t }) => (
                  <li key={t} className="flex items-start gap-2"><I className="mt-0.5 h-3.5 w-3.5 text-danger" /> <span>{t}</span></li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/app/alerts"><Button size="sm" className="gap-2"><Eye className="h-3.5 w-3.5" /> View evidence</Button></Link>
              <Link to="/app/actions"><Button size="sm" variant="outline" className="gap-2"><Sparkles className="h-3.5 w-3.5" /> Create action plan</Button></Link>
              <Button size="sm" variant="outline" className="gap-2" onClick={() => toast.success("Customer update drafted in Gmail.")}>
                <FileEdit className="h-3.5 w-3.5" /> Draft customer update
              </Button>
              <Button size="sm" variant="ghost" onClick={() => toast("Owner reassigned to Jordan Kim")}>Assign owner</Button>
              <Button size="sm" variant="ghost" onClick={() => toast.success("Marked resolved")}>Mark resolved</Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recommended actions</p>
              <ol className="mt-3 space-y-2 text-sm">
                <li className="flex items-start gap-2"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">1</span> Reassign auth module to Jordan</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">2</span> Escalate dependency to Sam</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">3</span> Descope optional analytics dashboard</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">4</span> Send proactive customer update by Friday</li>
              </ol>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">People involved</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Alex Chen", "Jordan Kim", "Sam Rivera", "Maya Singh"].map((n) => (
                  <span key={n} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-1 text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary/60 to-[oklch(0.6_0.18_280)] text-[10px] font-semibold text-primary-foreground">
                      {n.split(" ").map((s) => s[0]).join("")}
                    </span>
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section title="Risk trend (7d)" action={<span className="text-xs text-muted-foreground">Composite delivery risk</span>}>
            <div className="glass rounded-xl p-4">
              <div className="h-56 w-full">
                <ResponsiveContainer>
                  <AreaChart data={riskTrend} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="riskg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.72 0.17 250)" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="oklch(0.72 0.17 250)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="oklch(0.3 0.02 260 / 0.4)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "oklch(0.21 0.022 260)", border: "1px solid oklch(0.28 0.02 260)", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "oklch(0.96 0.005 250)" }}
                    />
                    <Area type="monotone" dataKey="risk" stroke="oklch(0.72 0.17 250)" strokeWidth={2} fill="url(#riskg)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Section>

          <Section title="Customer commitments" action={<Link to="/app/commitments" className="text-xs text-primary hover:underline">View all <ArrowRight className="ml-0.5 inline h-3 w-3" /></Link>}>
            <div className="glass overflow-hidden rounded-xl">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-card/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Due</th>
                    <th className="px-4 py-3">Risk</th>
                    <th className="px-4 py-3">Predicted slip</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {commitments.map((c) => (
                    <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-card/40">
                      <td className="px-4 py-3">
                        <p className="font-medium">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.customer}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.owner}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.due}</td>
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><RiskBadge risk={c.risk} /></div></td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {c.predictedSlipDays ? `${c.predictedSlipDays[0]}–${c.predictedSlipDays[1]}d` : "—"}
                      </td>
                      <td className="px-4 py-3 text-right"><ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        <Section title="Live activity" action={<span className="inline-flex items-center gap-1.5 text-xs text-success"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Streaming</span>}>
          <div className="glass max-h-[640px] overflow-y-auto rounded-xl p-3 scrollbar-thin">
            <ActivityFeed limit={9} compact />
          </div>
        </Section>
      </div>
    </div>
  );
}

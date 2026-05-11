import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, Copy, Loader2, Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { YantraLogo } from "@/components/yantra/logo";
import { SourceIcon } from "@/components/yantra/source-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { integrationCatalog, mcpAgents } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

type ConnState = "idle" | "connecting" | "connected";

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [conn, setConn] = useState<Record<string, ConnState>>(() =>
    Object.fromEntries(integrationCatalog.map((s) => [s.id, "idle" as ConnState])),
  );
  const [perms, setPerms] = useState({
    tickets: true, slack: true, code: true, customer: true, suggest: true,
  });
  const [agentConn, setAgentConn] = useState<Record<string, boolean>>(
    Object.fromEntries(mcpAgents.map((a) => [a.id, false])),
  );

  function toggleConnect(id: string) {
    setConn((c) => ({ ...c, [id]: "connecting" }));
    setTimeout(() => setConn((c) => ({ ...c, [id]: "connected" })), 900 + Math.random() * 600);
  }
  function disconnect(id: string) { setConn((c) => ({ ...c, [id]: "idle" })); }

  const steps = [
    { title: "Workspace", subtitle: "Tell us about your company" },
    { title: "Data sources", subtitle: "Connect the tools your team works in" },
    { title: "Agent layer", subtitle: "Give your AI agents shared context via MCP" },
    { title: "Observation", subtitle: "Yantra is observing your company graph" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="grid-bg absolute inset-0 opacity-25" />
      <div className="absolute inset-x-0 top-0 h-[500px]" style={{ background: "var(--gradient-glow)" }} />

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <YantraLogo />
        <span className="text-xs text-muted-foreground">Step {step + 1} of {steps.length}</span>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16">
        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-1 items-center gap-2">
              <div className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                i < step && "bg-success/20 text-success",
                i === step && "bg-primary text-primary-foreground glow-primary",
                i > step && "bg-muted text-muted-foreground",
              )}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={cn("h-px flex-1 transition-colors", i < step ? "bg-success/40" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="glass-strong rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold">{steps[step].title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{steps[step].subtitle}</p>

            <div className="mt-6">
              {step === 0 && <StepWorkspace />}
              {step === 1 && <StepSources conn={conn} onConnect={toggleConnect} onDisconnect={disconnect} />}
              {step === 2 && (
                <StepAgents perms={perms} setPerms={setPerms} agentConn={agentConn} setAgentConn={setAgentConn} />
              )}
              {step === 3 && <StepObserve onDone={() => navigate({ to: "/app/overview" })} />}
            </div>

            {step < 3 && (
              <div className="mt-8 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setStep((s) => s + 1)} className="gap-2">
                  {step === 2 ? "Start observing" : "Continue"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepWorkspace() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-1.5"><Label>Company name</Label><Input defaultValue="Acme Inc" /></div>
      <div className="space-y-1.5">
        <Label>Team size</Label>
        <select className="h-9 w-full rounded-md border border-border bg-input px-3 text-sm">
          <option>1–10</option><option>11–50</option><option selected>51–150</option><option>151–500</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <Label>Founder role</Label>
        <select className="h-9 w-full rounded-md border border-border bg-input px-3 text-sm">
          <option selected>CEO / Co-founder</option><option>CTO / Co-founder</option><option>VP Engineering</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <Label>Engineering structure</Label>
        <select className="h-9 w-full rounded-md border border-border bg-input px-3 text-sm">
          <option>Single team</option><option selected>Pods / squads</option><option>Functional teams</option>
        </select>
      </div>
    </div>
  );
}

function StepSources({
  conn, onConnect, onDisconnect,
}: {
  conn: Record<string, ConnState>;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {integrationCatalog.map((s) => {
        const state = conn[s.id];
        return (
          <div
            key={s.id}
            className={cn(
              "group relative rounded-xl border p-4 transition-all",
              state === "connected" ? "border-success/40 bg-success/5" : "border-border bg-card/40 hover:border-primary/40",
            )}
          >
            <div className="flex items-start gap-3">
              <SourceIcon id={s.id} size={18} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{s.desc}</p>
              </div>
              {state === "connected" && (
                <span className="relative inline-flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70" />
                  <span className="relative h-2 w-2 rounded-full bg-success" />
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                {state === "connected" ? "Read · Connected" : "Permissions: Read"}
              </span>
              {state === "idle" && (
                <Button size="sm" variant="outline" onClick={() => onConnect(s.id)}>Connect</Button>
              )}
              {state === "connecting" && (
                <Button size="sm" variant="outline" disabled>
                  <Loader2 className="mr-1.5 h-3 w-3 animate-spin" /> Connecting
                </Button>
              )}
              {state === "connected" && (
                <Button size="sm" variant="ghost" onClick={() => onDisconnect(s.id)}>
                  Disconnect
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StepAgents({
  perms, setPerms, agentConn, setAgentConn,
}: {
  perms: Record<string, boolean>;
  setPerms: (p: any) => void;
  agentConn: Record<string, boolean>;
  setAgentConn: (a: any) => void;
}) {
  const url = "https://mcp.yantra.ai/v1/acme/8f3a2b94-mcp";
  const cursorCfg = `{
  "mcpServers": {
    "yantra": {
      "url": "${url}",
      "auth": { "type": "bearer", "token": "ynt_••••••••" }
    }
  }
}`;
  const claudeCfg = `# ~/.claude/mcp.json
{
  "yantra": {
    "transport": "http",
    "url": "${url}"
  }
}`;
  function copy(s: string, label: string) {
    navigator.clipboard.writeText(s);
    toast.success(`${label} copied`);
  }
  const permList = [
    { id: "tickets", label: "Read tickets" },
    { id: "slack", label: "Read Slack" },
    { id: "code", label: "Read code activity" },
    { id: "customer", label: "Read customer context" },
    { id: "suggest", label: "Suggest actions" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="rounded-xl border border-border bg-card/40 p-4">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Your MCP endpoint</Label>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 truncate rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm">{url}</code>
            <Button size="sm" variant="outline" onClick={() => copy(url, "URL")}>
              <Copy className="mr-1.5 h-3 w-3" /> Copy
            </Button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <CodeBlock title="Cursor config" code={cursorCfg} onCopy={() => copy(cursorCfg, "Cursor config")} />
          <CodeBlock title="Claude Code config" code={claudeCfg} onCopy={() => copy(claudeCfg, "Claude config")} />
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4">
          <p className="text-sm font-semibold">Connected agents</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {mcpAgents.map((a) => {
              const on = agentConn[a.id];
              return (
                <button
                  key={a.id}
                  onClick={() => setAgentConn({ ...agentConn, [a.id]: !on })}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 text-left transition-all",
                    on ? "border-success/40 bg-success/5" : "border-border bg-card/30 hover:border-primary/40",
                  )}
                >
                  <span className="text-sm font-medium">{a.name}</span>
                  <span className={cn("text-xs font-medium", on ? "text-success" : "text-muted-foreground")}>
                    {on ? "Connected" : "Connect"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card/40 p-4">
        <p className="text-sm font-semibold">Agent permissions</p>
        <p className="mt-1 text-xs text-muted-foreground">Control what your agents can do through Yantra.</p>
        <div className="mt-4 space-y-3">
          {permList.map((p) => (
            <div key={p.id} className="flex items-center justify-between">
              <span className="text-sm">{p.label}</span>
              <Switch checked={perms[p.id]} onCheckedChange={(v) => setPerms({ ...perms, [p.id]: v })} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ title, code, onCopy }: { title: string; code: string; onCopy: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
        <Button size="sm" variant="ghost" onClick={onCopy}><Copy className="h-3 w-3" /></Button>
      </div>
      <pre className="mt-2 max-h-48 overflow-auto rounded-md bg-background/60 p-3 font-mono text-[11px] leading-relaxed text-foreground/80 scrollbar-thin">
{code}
      </pre>
    </div>
  );
}

function StepObserve({ onDone }: { onDone: () => void }) {
  const sources = ["slack", "linear", "github", "zoom", "gmail", "cursor", "claude-code", "qa"];
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 4 + Math.random() * 6)), 220);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { if (progress >= 100) { setTimeout(onDone, 900); } }, [progress, onDone]);

  return (
    <div className="relative flex min-h-[420px] flex-col items-center justify-center text-center">
      <div className="relative flex h-72 w-full max-w-2xl items-center justify-center">
        {/* central brain */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.6_0.18_280)] glow-primary"
        >
          <Sparkles className="h-10 w-10 text-primary-foreground" />
          <motion.span
            className="absolute inset-0 rounded-full ring-2 ring-primary/40"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        {/* satellites */}
        {sources.map((s, i) => {
          const angle = (i / sources.length) * Math.PI * 2;
          const r = 150;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <div key={s} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
              <SourceIcon id={s} size={18} />
            </div>
          );
        })}
        {/* connecting lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="-200 -150 400 300">
          {sources.map((_, i) => {
            const angle = (i / sources.length) * Math.PI * 2;
            const r = 150;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <motion.line
                key={i} x1={0} y1={0} x2={x} y2={y}
                stroke="oklch(0.72 0.17 250 / 0.4)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.1 * i }}
              />
            );
          })}
        </svg>
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-lg font-medium">
        Yantra is observing your company graph…
      </motion.p>
      <p className="mt-1 text-sm text-muted-foreground">
        Building context across {sources.length} sources and 5 agents
      </p>
      <div className="mt-5 h-1.5 w-72 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full bg-gradient-to-r from-primary to-[oklch(0.6_0.18_280)]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

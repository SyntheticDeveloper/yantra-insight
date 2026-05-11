import { createFileRoute } from "@tanstack/react-router";
import { Copy, Bot } from "lucide-react";
import { agents } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ActivityFeed } from "@/components/yantra/activity-feed";
import { toast } from "sonner";

export const Route = createFileRoute("/app/agents")({ component: AgentsPage });

function AgentsPage() {
  const url = "https://mcp.yantra.ai/v1/acme/8f3a2b94-mcp";
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Agents</h1>
        <p className="text-sm text-muted-foreground">Your AI agents, what they're doing, and the context they share via MCP.</p>
      </header>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((a) => (
          <div key={a.id} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary"><Bot className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.contextLevel} · {a.lastSync}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                a.status === "active" ? "bg-success/10 text-success" : a.status === "idle" ? "bg-muted text-muted-foreground" : "bg-danger/10 text-danger"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${a.status === "active" ? "bg-success animate-pulse" : a.status === "idle" ? "bg-muted-foreground" : "bg-danger"}`} />
                {a.status}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {a.tools.map((t) => <span key={t} className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">{t}</span>)}
            </div>
            <div className="mt-3 space-y-1.5 text-xs">
              {a.recent.map((r, i) => <p key={i} className="truncate text-muted-foreground">→ {r}</p>)}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="glass rounded-xl p-4">
          <p className="text-sm font-semibold">MCP setup</p>
          <p className="mt-1 text-xs text-muted-foreground">Add Yantra to any AI agent that supports MCP.</p>
          <div className="mt-3 flex items-center gap-2">
            <code className="flex-1 truncate rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm">{url}</code>
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(url); toast.success("URL copied"); }}>
              <Copy className="mr-1.5 h-3 w-3" /> Copy
            </Button>
          </div>
          <pre className="mt-3 max-h-48 overflow-auto rounded-md bg-background/60 p-3 font-mono text-[11px] leading-relaxed scrollbar-thin">
{`{
  "mcpServers": {
    "yantra": {
      "url": "${url}",
      "auth": { "type": "bearer", "token": "ynt_••••••••" }
    }
  }
}`}
          </pre>
        </div>

        <div className="glass rounded-xl p-3">
          <p className="px-2 pb-2 text-sm font-semibold">Agent activity</p>
          <div className="max-h-[420px] overflow-y-auto scrollbar-thin"><ActivityFeed limit={8} compact /></div>
        </div>
      </div>
    </div>
  );
}

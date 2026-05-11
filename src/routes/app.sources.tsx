import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { sources } from "@/lib/mock-data";
import { SourceIcon } from "@/components/yantra/source-icon";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/sources")({ component: SourcesPage });

function SourcesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Sources</h1>
        <p className="text-sm text-muted-foreground">Health and ingestion across your connected tools.</p>
      </header>

      <div className="glass rounded-xl p-5">
        <p className="text-sm font-semibold">Ingestion pipeline</p>
        <div className="mt-4 grid grid-cols-5 items-center gap-2 text-center text-[11px] text-muted-foreground">
          {["Sources", "Context Engine", "Company Graph", "Prediction Engine", "Alerts"].map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {i === 1 ? <Sparkles className="h-5 w-5" /> : i === 3 ? <Brain className="h-5 w-5" /> : i === 4 ? <AlertTriangle className="h-5 w-5" /> : <span className="text-base font-bold">{i + 1}</span>}
              </motion.div>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sources.map((s) => (
          <div key={s.id} className={`glass rounded-xl p-4 ${s.connected ? "" : "opacity-60"}`}>
            <div className="flex items-start gap-3">
              <SourceIcon id={s.id} size={18} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">{s.name}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                    s.health === "healthy" ? "bg-success/10 text-success" : s.health === "degraded" ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${s.health === "healthy" ? "bg-success animate-pulse" : s.health === "degraded" ? "bg-warning" : "bg-danger"}`} />
                    {s.connected ? s.health : "disconnected"}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                  <div><p className="text-muted-foreground">Sync</p><p className="font-medium">{s.lastSync}</p></div>
                  <div><p className="text-muted-foreground">Volume</p><p className="font-medium">{s.volume}</p></div>
                  <div><p className="text-muted-foreground">Perm</p><p className="font-medium">{s.permission}</p></div>
                </div>
                <div className="mt-3"><Button size="sm" variant="outline" className="w-full">{s.connected ? "Settings" : "Connect"}</Button></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

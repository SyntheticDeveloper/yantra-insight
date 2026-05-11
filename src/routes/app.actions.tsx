import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Edit3, X, Sparkles } from "lucide-react";
import { seedActions, type Action } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/actions")({ component: ActionsPage });

function ActionsPage() {
  const [items, setItems] = useState<Action[]>(seedActions);
  const [done, setDone] = useState<string[]>([]);

  function approve(a: Action) {
    setDone((d) => [...d, a.id]);
    setTimeout(() => setItems((x) => x.filter((i) => i.id !== a.id)), 800);
    toast.success("Action approved. Yantra updated the plan.");
  }
  function dismiss(a: Action) {
    setItems((x) => x.filter((i) => i.id !== a.id));
    toast("Action dismissed");
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Action Center</h1>
        <p className="text-sm text-muted-foreground">Recommendations Yantra thinks will save the most time and customer trust.</p>
      </header>

      <div className="space-y-3">
        <AnimatePresence>
          {items.map((a) => {
            const isDone = done.includes(a.id);
            return (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 30 }}
                className={`glass rounded-xl p-4 ${isDone ? "border-success/40" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isDone ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>
                    {isDone ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        a.priority === "P0" ? "bg-danger/15 text-danger" : a.priority === "P1" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"
                      }`}>{a.priority}</span>
                      <p className="font-semibold">{a.title}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{a.commitment}</p>
                    <p className="mt-2 text-sm"><span className="text-muted-foreground">Why: </span>{a.reason}</p>
                    <p className="mt-1 text-sm"><span className="text-muted-foreground">Impact: </span><span className="text-success">{a.impact}</span></p>
                  </div>
                  {!isDone && (
                    <div className="flex shrink-0 flex-col gap-1.5">
                      <Button size="sm" onClick={() => approve(a)} className="gap-1"><Check className="h-3 w-3" /> Approve</Button>
                      <Button size="sm" variant="outline" className="gap-1"><Edit3 className="h-3 w-3" /> Edit</Button>
                      <Button size="sm" variant="ghost" onClick={() => dismiss(a)} className="gap-1"><X className="h-3 w-3" /> Dismiss</Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {items.length === 0 && (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-sm text-muted-foreground">All caught up. Yantra is observing for new signals.</p>
          </div>
        )}
      </div>
    </div>
  );
}

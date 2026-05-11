import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nextEvent, seedEvents, type ActivityEvent } from "@/lib/mock-data";
import { SourceBadge } from "./source-icon";
import { cn } from "@/lib/utils";

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

export function ActivityFeed({ limit = 10, compact = false }: { limit?: number; compact?: boolean }) {
  const [events, setEvents] = useState<ActivityEvent[]>(() => seedEvents(limit));
  const [, force] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => [nextEvent(), ...prev].slice(0, limit + 6));
    }, 3500 + Math.random() * 2500);
    const tick = setInterval(() => force((n) => n + 1), 1000);
    return () => { clearInterval(interval); clearInterval(tick); };
  }, [limit]);

  return (
    <div className="space-y-2">
      <AnimatePresence initial={false}>
        {events.slice(0, limit).map((e) => (
          <motion.div
            key={e.id}
            layout
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className={cn(
              "group flex items-start gap-3 rounded-lg border border-border/60 bg-card/40 p-3 transition-colors hover:bg-card/70",
              e.severity === "danger" && "border-danger/30",
              e.severity === "warning" && "border-warning/30",
              compact && "p-2.5",
            )}
          >
            <SourceBadge id={e.source} />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug text-foreground/90">{e.text}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{timeAgo(e.ts)}</p>
            </div>
            <span
              className={cn(
                "mt-1 h-1.5 w-1.5 rounded-full",
                e.severity === "danger" && "bg-danger",
                e.severity === "warning" && "bg-warning",
                e.severity === "success" && "bg-success",
                e.severity === "info" && "bg-info",
              )}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

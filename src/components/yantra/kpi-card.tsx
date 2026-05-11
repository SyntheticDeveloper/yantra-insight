import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function KpiCard({
  label, value, delta, tone = "info", index = 0,
}: {
  label: string; value: string | number; delta?: string;
  tone?: "info" | "success" | "warning" | "danger"; index?: number;
}) {
  const toneClass = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  }[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="glass relative overflow-hidden rounded-xl p-4"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
      </div>
      {delta && <p className={cn("mt-1 text-xs", toneClass)}>{delta}</p>}
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-2xl"
        style={{ background: tone === "danger" ? "oklch(0.66 0.24 22)" : tone === "warning" ? "oklch(0.78 0.16 75)" : tone === "success" ? "oklch(0.72 0.17 155)" : "oklch(0.72 0.17 250)" }} />
    </motion.div>
  );
}

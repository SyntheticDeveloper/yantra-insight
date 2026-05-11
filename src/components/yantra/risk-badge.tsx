import { cn } from "@/lib/utils";
import { riskMeta, type RiskLevel } from "@/lib/mock-data";

export function RiskBadge({ risk, className }: { risk: RiskLevel; className?: string }) {
  const m = riskMeta[risk];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1", m.bg, m.color, m.ring, className)}>
      <span className={cn("relative inline-block h-1.5 w-1.5 rounded-full", m.dot)}>
        {(risk === "at-risk" || risk === "critical") && (
          <span className={cn("absolute inset-0 rounded-full opacity-60 animate-ping", m.dot)} />
        )}
      </span>
      {m.label}
    </span>
  );
}

export function RiskBar({ score }: { score: number }) {
  const tone = score >= 70 ? "bg-danger" : score >= 45 ? "bg-warning" : "bg-success";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all", tone)} style={{ width: `${score}%` }} />
    </div>
  );
}

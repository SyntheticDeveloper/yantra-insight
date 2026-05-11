import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { teams, teamLoad } from "@/lib/mock-data";
import { RiskBar } from "@/components/yantra/risk-badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const Route = createFileRoute("/app/teams")({ component: TeamsPage });

function TeamsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Teams</h1>
        <p className="text-sm text-muted-foreground">Team-level health, load, and bottlenecks.</p>
      </header>

      <div className="glass rounded-xl p-4">
        <p className="text-sm font-semibold">Team load</p>
        <div className="mt-3 h-56">
          <ResponsiveContainer>
            <BarChart data={teamLoad}>
              <CartesianGrid stroke="oklch(0.3 0.02 260 / 0.4)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "oklch(0.21 0.022 260)", border: "1px solid oklch(0.28 0.02 260)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="load" fill="oklch(0.72 0.17 250)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="blockers" fill="oklch(0.66 0.24 22)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((t) => {
          const Trend = t.trend > 0 ? TrendingUp : t.trend < 0 ? TrendingDown : Minus;
          const trendColor = t.trend > 0 ? "text-danger" : t.trend < 0 ? "text-success" : "text-muted-foreground";
          return (
            <div key={t.name} className="glass rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.people.join(", ")}</p>
                </div>
                <span className={`inline-flex items-center gap-1 text-xs ${trendColor}`}>
                  <Trend className="h-3.5 w-3.5" /> {t.trend > 0 ? `+${t.trend}` : t.trend}%
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Load</span><span className="text-foreground">{t.load}%</span></div>
                <div className="mt-1.5"><RiskBar score={t.load} /></div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded bg-card/40 p-2"><p className="text-muted-foreground">Open</p><p className="mt-0.5 text-base font-semibold">{t.open}</p></div>
                <div className="rounded bg-card/40 p-2"><p className="text-muted-foreground">Blockers</p><p className="mt-0.5 text-base font-semibold text-danger">{t.blockers}</p></div>
                <div className="rounded bg-card/40 p-2"><p className="text-muted-foreground">Reviews</p><p className="mt-0.5 text-base font-semibold text-warning">{t.reviewBacklog}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

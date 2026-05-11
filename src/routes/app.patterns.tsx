import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Sparkles } from "lucide-react";
import { patterns, slipCauses, reviewBacklog, customerImpact, riskTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/app/patterns")({ component: PatternsPage });

const colors = ["oklch(0.72 0.17 250)", "oklch(0.72 0.17 155)", "oklch(0.78 0.16 75)", "oklch(0.66 0.24 22)", "oklch(0.72 0.16 300)"];

function PatternsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Patterns</h1>
        <p className="text-sm text-muted-foreground">What Yantra has learned about how your team ships.</p>
      </header>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {patterns.map((p, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary"><Sparkles className="h-4 w-4" /></div>
              <div className="min-w-0">
                <p className="font-semibold leading-tight">{p.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px]">
                  <span className="rounded bg-danger/10 px-1.5 py-0.5 text-danger">{p.impact}</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">Lift {p.lift}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <ChartCard title="Slip causes by category">
          <ResponsiveContainer><PieChart>
            <Pie data={slipCauses} dataKey="value" innerRadius={50} outerRadius={80} stroke="none">
              {slipCauses.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "oklch(0.21 0.022 260)", border: "1px solid oklch(0.28 0.02 260)", borderRadius: 8, fontSize: 12 }} />
          </PieChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Risk trend over time">
          <ResponsiveContainer><BarChart data={riskTrend}>
            <CartesianGrid stroke="oklch(0.3 0.02 260 / 0.4)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "oklch(0.21 0.022 260)", border: "1px solid oklch(0.28 0.02 260)", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="risk" fill="oklch(0.72 0.17 250)" radius={[6, 6, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Review bottleneck by team">
          <ResponsiveContainer><BarChart data={reviewBacklog}>
            <CartesianGrid stroke="oklch(0.3 0.02 260 / 0.4)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "oklch(0.21 0.022 260)", border: "1px solid oklch(0.28 0.02 260)", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="backlog" fill="oklch(0.78 0.16 75)" radius={[6, 6, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Customer impact ($K at risk)">
          <ResponsiveContainer><BarChart data={customerImpact}>
            <CartesianGrid stroke="oklch(0.3 0.02 260 / 0.4)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="oklch(0.66 0.02 255)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "oklch(0.21 0.022 260)", border: "1px solid oklch(0.28 0.02 260)", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="value" fill="oklch(0.66 0.24 22)" radius={[6, 6, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-3 h-56">{children}</div>
    </div>
  );
}

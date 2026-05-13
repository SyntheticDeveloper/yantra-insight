import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Target, AlertTriangle, Network, Users, Bot, Plug,
  Sparkles, Zap, Settings, Search, Bell, ChevronDown, Command,
} from "lucide-react";
import { YantraLogo } from "./logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DemoEntryGate } from "./demo-entry-gate";

const nav = [
  { to: "/app/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/app/commitments", label: "Commitments", icon: Target },
  { to: "/app/alerts", label: "Alerts", icon: AlertTriangle, badge: 4 },
  { to: "/app/graph", label: "Company Graph", icon: Network },
  { to: "/app/teams", label: "Teams", icon: Users },
  { to: "/app/agents", label: "Agents", icon: Bot },
  { to: "/app/sources", label: "Sources", icon: Plug },
  { to: "/app/patterns", label: "Patterns", icon: Sparkles },
  { to: "/app/actions", label: "Action Center", icon: Zap, badge: 7 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <DemoEntryGate />
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar md:flex">
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-5">
          <YantraLogo />
          <button className="flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground hover:bg-accent">
            Acme Inc <ChevronDown className="h-3 w-3" />
          </button>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3 scrollbar-thin">
          {nav.map((item) => {
            const active = path === item.to || (item.to === "/app/overview" && path === "/app");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-y-1 left-0 w-0.5 rounded-r-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-danger/15 px-1.5 py-0.5 text-[10px] font-semibold text-danger">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/60 p-3">
          <div className="flex items-center gap-2.5 rounded-md bg-card/60 p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.6_0.18_280)] text-xs font-semibold text-primary-foreground">
              MR
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-medium">Maya Rao</p>
              <p className="truncate text-[11px] text-muted-foreground">Founder · Acme</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl md:px-6">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Ask Yantra: 'What's at risk for Acme?'"
                className="h-9 w-full rounded-md border border-border/60 bg-card/40 pl-9 pr-16 text-sm placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-flex">
                <Command className="h-3 w-3" /> K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success sm:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Observing live
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger" />
            </Button>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

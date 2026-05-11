import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { YantraLogo } from "@/components/yantra/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function go(target: string) {
    setLoading(true);
    setTimeout(() => navigate({ to: target }), 700);
  }
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="absolute inset-x-0 top-0 h-[600px]" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-between p-8 lg:p-12">
          <YantraLogo />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hidden lg:block">
            <h2 className="text-balance text-4xl font-semibold tracking-tight">
              See customer delivery risks before they become fires.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Yantra observes the signals across your tools and agents, then alerts you 1–3 weeks before a commitment slips.
            </p>
            <div className="mt-8 space-y-3">
              {["Slack uncertainty", "Stalled PR reviews", "Backwards Linear tickets", "Hedging on Zoom"].map((t) => (
                <div key={t} className="flex items-center gap-3 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary glow-primary" />
                  <span className="text-muted-foreground">Signal detected: <span className="text-foreground">{t}</span></span>
                </div>
              ))}
            </div>
          </motion.div>
          <p className="hidden text-xs text-muted-foreground lg:block">© 2026 Yantra Labs · Observe. Learn. Predict.</p>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-strong w-full max-w-md rounded-2xl p-8"
          >
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Log in to your Yantra workspace.</p>

            <form
              onSubmit={(e) => { e.preventDefault(); go("/app/overview"); }}
              className="mt-6 space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" placeholder="founder@acme.com" defaultValue="maya@acme.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pw">Password</Label>
                <Input id="pw" type="password" placeholder="••••••••" defaultValue="demo-pass" />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? "Signing in…" : (<>Log in <ArrowRight className="h-4 w-4" /></>)}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
            </div>

            <Button onClick={() => go("/app/overview")} variant="outline" className="w-full gap-2 border-primary/40 hover:border-primary/70">
              <Sparkles className="h-4 w-4 text-primary" /> Enter demo workspace
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              No account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

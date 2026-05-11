import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Brain, ShieldAlert } from "lucide-react";
import { YantraLogo } from "@/components/yantra/logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Yantra — Observe. Learn. Predict." },
      { name: "description", content: "Yantra observes Slack, Linear, GitHub, Zoom, Gmail, and AI agents to predict which customer commitments are about to slip — before the founder finds out too late." },
    ],
  }),
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 top-0 h-[600px]" style={{ background: "var(--gradient-glow)" }} />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <YantraLogo />
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
          <Link to="/signup"><Button size="sm">Get started</Button></Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Observing live across 13 sources
          </span>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            See customer delivery risks
            <br />
            <span className="gradient-text">before they become fires.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            Yantra observes Slack, Linear, GitHub, Zoom, Gmail, and your AI agents — then predicts which customer commitments are about to slip, and tells you exactly how to save them.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/app/overview">
              <Button size="lg" variant="outline" className="gap-2">
                Enter demo workspace
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 grid gap-4 md:grid-cols-3"
        >
          {[
            { icon: Activity, title: "Observe", body: "Watch every signal across tools and AI agents in one company-wide context graph." },
            { icon: Brain, title: "Learn", body: "Yantra learns how your team actually ships — and what early signals predict slips." },
            { icon: ShieldAlert, title: "Predict", body: "Get an alert 1–3 weeks before a customer commitment slips, with evidence and a fix." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass rounded-2xl p-6">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

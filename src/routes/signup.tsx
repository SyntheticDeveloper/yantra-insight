import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { YantraLogo } from "@/components/yantra/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="absolute inset-x-0 top-0 h-[600px]" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
        <YantraLogo />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong mt-6 rounded-2xl p-8"
        >
          <h1 className="text-2xl font-semibold">Create your workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">Get an early-warning system for your engineering org in 2 minutes.</p>

          <form
            onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => navigate({ to: "/onboarding" }), 700); }}
            className="mt-6 space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" placeholder="Maya Rao" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" placeholder="founder@company.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" placeholder="At least 8 characters" />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? "Creating…" : (<>Create workspace <ArrowRight className="h-4 w-4" /></>)}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <Button onClick={() => navigate({ to: "/app/overview" })} variant="outline" className="w-full gap-2 border-primary/40">
            <Sparkles className="h-4 w-4 text-primary" /> Enter demo workspace
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

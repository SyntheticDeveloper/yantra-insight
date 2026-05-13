import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  "Authenticating workspace",
  "Connecting Slack, Linear, GitHub, Zoom",
  "Loading AI agent telemetry",
  "Booting Yantra prediction engine",
];

export function DemoEntryGate() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = sessionStorage.getItem("yantra:enter-demo");
    if (flag && path.startsWith("/app")) {
      sessionStorage.removeItem("yantra:enter-demo");
      setShow(true);
    }
  }, [path]);

  useEffect(() => {
    if (!show) return;
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 480);
    const closeTimer = setTimeout(() => setShow(false), 2400);
    return () => {
      clearInterval(stepTimer);
      clearTimeout(closeTimer);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(oklch(0.72 0.17 250 / 0.18) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* glow */}
          <motion.div
            className="absolute h-[700px] w-[700px] rounded-full blur-[140px]"
            style={{ background: "oklch(0.72 0.17 250 / 0.25)" }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-border/60 shadow-[0_0_60px_-10px_oklch(0.72_0.17_250)]"
            >
              <img
                src="/logo.jpeg"
                alt="Yantra"
                className="h-full w-full object-cover"
                draggable={false}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 1.4, ease: EASE, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-primary">
                Live demo workspace
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Entering Acme Inc.
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Replaying 14 days of real engineering signal
              </p>
            </motion.div>

            <div className="mt-2 w-72 space-y-1.5">
              {STEPS.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: i <= step ? 1 : 0.35 }}
                  className="flex items-center gap-2 font-mono text-[11px]"
                >
                  <span
                    className={
                      i < step
                        ? "text-success"
                        : i === step
                          ? "text-primary"
                          : "text-muted-foreground"
                    }
                  >
                    {i < step ? "✓" : i === step ? "▸" : "·"}
                  </span>
                  <span className="text-muted-foreground">{label}</span>
                  {i === step && (
                    <motion.span
                      className="ml-auto h-1 w-12 overflow-hidden rounded-full bg-muted"
                    >
                      <motion.span
                        className="block h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.45, ease: "linear" }}
                      />
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
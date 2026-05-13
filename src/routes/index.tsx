import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Yantra — Know which deadlines are about to slip, two weeks early" },
      {
        name: "description",
        content:
          "Yantra reads every Slack thread, ticket, line of code, and AI agent action across your team — and tells you which customer commitments are about to slip, two weeks before they break.",
      },
    ],
  }),
});

// ---------------------------------------------------------------------------
// Motion / theme constants
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.3 } as const;
const VIEWPORT_LOOSE = { once: true, amount: 0.15 } as const;

// ---------------------------------------------------------------------------
// useCountUp — animates an integer from 0 → target when `start` becomes true.
// ---------------------------------------------------------------------------

function useCountUp({
  target,
  duration = 800,
  delay = 0,
  start = false,
}: {
  target: number;
  duration?: number;
  delay?: number;
  start?: boolean;
}) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    if (startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      setValue(target);
      return;
    }

    let raf: number;
    let t0: number | undefined;
    const tick = (ts: number) => {
      if (t0 === undefined) t0 = ts;
      const elapsed = ts - t0 - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [start, target, duration, delay, reduced]);

  return value;
}

// ---------------------------------------------------------------------------
// Wordmark + small UI
// ---------------------------------------------------------------------------

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.22em] text-cyan ${className}`}
    >
      {children}
    </p>
  );
}

function MonkeyGlyph({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="#0a0a0c"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M 24 40 Q 50 8 76 40" />
      <circle cx="20" cy="50" r="10" fill="#ffffff" />
      <circle cx="20" cy="50" r="5" strokeWidth="2" />
      <circle cx="80" cy="50" r="10" fill="#ffffff" />
      <circle cx="80" cy="50" r="5" strokeWidth="2" />
      <path
        d="M 32 42 Q 32 32 38 31 Q 42 26 48 30 Q 50 28 52 30 Q 58 26 62 31 Q 68 32 68 42 Q 72 60 64 72 Q 55 78 50 78 Q 45 78 36 72 Q 28 60 32 42 Z"
        fill="#ffffff"
      />
      <path d="M 40 41 Q 45 36 50 40 Q 55 36 60 41" strokeWidth="2" />
      <ellipse cx="42" cy="55" rx="3" ry="4" fill="#0a0a0c" stroke="none" />
      <circle cx="43" cy="53.5" r="1" fill="#ffffff" stroke="none" />
      <ellipse cx="58" cy="55" rx="3" ry="4" fill="#0a0a0c" stroke="none" />
      <circle cx="59" cy="53.5" r="1" fill="#ffffff" stroke="none" />
      <ellipse cx="50" cy="64" rx="1.8" ry="1.3" fill="#0a0a0c" stroke="none" />
      <path d="M 46 70 Q 50 73 54 70" strokeWidth="2" />
      <path d="M 42 82 L 42 92" strokeWidth="2.5" />
      <path d="M 58 82 L 58 92" strokeWidth="2.5" />
    </svg>
  );
}

function Wordmark({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const text = size === "sm" ? "text-[14px]" : "text-[16px]";

  return (
    <div className="flex items-center gap-2.5">
      <MonkeyGlyph className={dim} />
      <span className={`font-semibold tracking-tight text-ink ${text}`}>
        Yantra
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Brand tiles (12×12 each) used inside ObserveNetwork
// ---------------------------------------------------------------------------

const SlackPath = () => (
  <g>
    <rect
      x="0"
      y="0"
      width="12"
      height="12"
      rx="2.5"
      fill="#ffffff"
      stroke="rgba(10,10,12,0.12)"
      strokeWidth="0.3"
    />
    <rect x="3.55" y="0.8" width="1.85" height="4.7" rx="0.93" fill="#36C5F0" />
    <rect x="6.5" y="3.55" width="4.7" height="1.85" rx="0.93" fill="#2EB67D" />
    <rect x="6.6" y="6.5" width="1.85" height="4.7" rx="0.93" fill="#ECB22E" />
    <rect x="0.8" y="6.6" width="4.7" height="1.85" rx="0.93" fill="#E01E5A" />
  </g>
);

const LinearPath = () => (
  <g>
    <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#5E6AD2" />
    <circle cx="3.7" cy="4.2" r="1.6" fill="#ffffff" />
    <g transform="rotate(-22 6 7.4)" fill="#ffffff">
      <rect x="1.8" y="6.4" width="8.4" height="0.75" rx="0.38" />
      <rect x="2.4" y="7.85" width="7.8" height="0.75" rx="0.38" />
      <rect x="3" y="9.3" width="7.2" height="0.75" rx="0.38" />
    </g>
  </g>
);

const GitHubPath = () => (
  <g>
    <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#0a0a0c" />
    <g transform="translate(2 2) scale(0.667)">
      <path
        fill="#ffffff"
        d="M6 0C2.69 0 0 2.69 0 6c0 2.65 1.72 4.9 4.1 5.69.3.06.41-.13.41-.29v-1.12c-1.67.36-2.02-.7-2.02-.7-.27-.69-.67-.87-.67-.87-.54-.37.04-.36.04-.36.6.04.92.61.92.61.54.91 1.41.65 1.75.5.05-.39.21-.65.38-.8C3.55 8.59 2.13 8.07 2.13 5.74c0-.66.23-1.2.61-1.62-.06-.15-.27-.76.06-1.58 0 0 .5-.16 1.65.62.48-.13.99-.2 1.5-.2.51 0 1.02.07 1.5.2 1.15-.78 1.65-.62 1.65-.62.33.82.12 1.43.06 1.58.38.42.61.96.61 1.62 0 2.34-1.42 2.85-2.78 3 .22.19.41.56.41 1.13v1.67c0 .16.11.35.41.29C10.28 10.9 12 8.65 12 6c0-3.31-2.69-6-6-6z"
      />
    </g>
  </g>
);

const ZoomPath = () => (
  <g>
    <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#2D8CFF" />
    <rect x="2.4" y="4.5" width="5.5" height="3.5" rx="0.7" fill="#ffffff" />
    <path d="M 7.9 5.3 L 10 4.1 L 10 8.4 L 7.9 7.2 Z" fill="#ffffff" />
  </g>
);

const CursorPath = () => (
  <g>
    <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#0a0a0c" />
    <g
      transform="translate(6 6.2)"
      stroke="#ffffff"
      strokeWidth="0.18"
      strokeLinejoin="round"
    >
      <path d="M 0 -3.2 L 0 0.2 L -2.8 1.7 Z" fill="#bdbdbd" />
      <path d="M 0 -3.2 L 0 0.2 L 2.8 1.7 Z" fill="#ffffff" />
      <path d="M -2.8 1.7 L 0 0.2 L 2.8 1.7 L 0 3.3 Z" fill="#7d7d7d" />
    </g>
  </g>
);

const CopilotPath = () => (
  <g>
    <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#0a0a0c" />
    <g fill="#ffffff">
      <path d="M 2.4 3.4 L 5.3 2.5 L 5.3 3.2 L 2.4 4.1 Z" />
      <path d="M 6.7 2.5 L 9.6 3.4 L 9.6 4.1 L 6.7 3.2 Z" />
      <path d="M 2.3 5.4 Q 2.3 4.3 3.4 4.3 L 8.6 4.3 Q 9.7 4.3 9.7 5.4 L 9.7 8.4 Q 9.7 9.6 8.6 9.6 L 3.4 9.6 Q 2.3 9.6 2.3 8.4 Z" />
    </g>
    <rect x="4" y="5.7" width="1.5" height="2.2" rx="0.3" fill="#0a0a0c" />
    <rect x="6.5" y="5.7" width="1.5" height="2.2" rx="0.3" fill="#0a0a0c" />
  </g>
);

const ChatGPTPath = () => (
  <g>
    <rect
      x="0"
      y="0"
      width="12"
      height="12"
      rx="2.5"
      fill="#ffffff"
      stroke="rgba(10,10,12,0.12)"
      strokeWidth="0.3"
    />
    <g
      transform="translate(6 6)"
      fill="none"
      stroke="#0a0a0c"
      strokeWidth="0.85"
      strokeLinejoin="round"
    >
      <ellipse cx="0" cy="0" rx="3.4" ry="1.55" />
      <ellipse cx="0" cy="0" rx="3.4" ry="1.55" transform="rotate(60)" />
      <ellipse cx="0" cy="0" rx="3.4" ry="1.55" transform="rotate(120)" />
    </g>
  </g>
);

const ClaudePath = () => {
  const spokes = [] as React.ReactNode[];
  for (let i = 0; i < 12; i++) {
    const long = i % 2 === 0;
    const length = long ? 3.3 : 2.3;
    spokes.push(
      <rect
        key={i}
        x="-0.32"
        y={-length}
        width="0.64"
        height={length}
        rx="0.32"
        transform={`rotate(${i * 30})`}
      />,
    );
  }
  return (
    <g>
      <rect
        x="0"
        y="0"
        width="12"
        height="12"
        rx="2.5"
        fill="#FAFAF7"
        stroke="rgba(10,10,12,0.10)"
        strokeWidth="0.3"
      />
      <g transform="translate(6 6)" fill="#D97757">
        {spokes}
      </g>
    </g>
  );
};

// ---------------------------------------------------------------------------
// ObserveNetwork — 8 brand tiles around a Yantra hub with spokes + pulses
// ---------------------------------------------------------------------------

const TOOLS = [
  { x: 50, y: 10, label: "Slack", Icon: SlackPath },
  { x: 78, y: 22, label: "Linear", Icon: LinearPath },
  { x: 90, y: 50, label: "GitHub", Icon: GitHubPath },
  { x: 78, y: 78, label: "Zoom", Icon: ZoomPath },
  { x: 50, y: 90, label: "Cursor", Icon: CursorPath },
  { x: 22, y: 78, label: "Copilot", Icon: CopilotPath },
  { x: 10, y: 50, label: "ChatGPT", Icon: ChatGPTPath },
  { x: 22, y: 22, label: "Claude", Icon: ClaudePath },
];
const TILE = 12;
const HALF = TILE / 2;

function ObserveNetwork() {
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  const spokeDelay = (i: number) => 0.4 + i * 0.1;
  const tileDelay = (i: number) => spokeDelay(i) + 0.4;
  const lastSpokeEnd = spokeDelay(TOOLS.length - 1) + 0.5;

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="obs-hub" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#0098b8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="obs-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0098b8" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="50"
        cy="50"
        fill="#00d4ff"
        initial={{ r: 14, opacity: 0.18 }}
        animate={
          inView && !reduced
            ? { r: [14, 17, 14], opacity: [0.16, 0.28, 0.16] }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.0,
        }}
      />
      <circle cx="50" cy="50" r="20" fill="url(#obs-hub)" />

      <circle cx="50" cy="50" r="6" fill="url(#obs-core)" />
      <text
        x="50"
        y="52.3"
        textAnchor="middle"
        fontSize="6"
        fontWeight="800"
        fill="#ffffff"
        fontFamily="Inter, sans-serif"
      >
        Y
      </text>

      {TOOLS.map((t, i) => (
        <motion.line
          key={`spoke-${i}`}
          x1="50"
          y1="50"
          x2={t.x}
          y2={t.y}
          stroke="#0098b8"
          strokeOpacity="0.28"
          strokeWidth="0.35"
          strokeDasharray="0.7 0.9"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.45, ease: EASE, delay: spokeDelay(i) }}
        />
      ))}

      {TOOLS.map((t, i) => (
        <g
          key={`tile-${i}`}
          transform={`translate(${t.x - HALF} ${t.y - HALF})`}
        >
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.35, ease: EASE, delay: tileDelay(i) }}
          >
            <t.Icon />
          </motion.g>
        </g>
      ))}

      {inView &&
        !reduced &&
        TOOLS.map((t, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="0.75"
            fill="#00d4ff"
            initial={{ cx: t.x, cy: t.y, opacity: 0 }}
            animate={{
              cx: [t.x, 50],
              cy: [t.y, 50],
              opacity: [0, 0.95, 0.95, 0],
            }}
            transition={{
              duration: 1.5,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 1.8 + ((i * 0.37) % 1.4),
              delay: lastSpokeEnd + i * 0.42,
              times: [0, 0.18, 0.82, 1],
            }}
          />
        ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// LearnPattern — 3 animated waves with anomaly marker
// ---------------------------------------------------------------------------

function buildPath(y: number, amp: number, freq: number, phase: number) {
  let d = `M 0 ${y}`;
  for (let x = 0; x <= 200; x += 2) {
    const yy = y + Math.sin((x + phase) * freq) * amp;
    d += ` L ${x} ${yy}`;
  }
  return d;
}

function LearnPattern() {
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  const paths = useMemo(
    () => [
      { d: buildPath(28, 5, 0.18, 0), opacity: 0.42 },
      { d: buildPath(55, 9, 0.13, 40), opacity: 0.9 },
      { d: buildPath(82, 4, 0.22, 20), opacity: 0.32 },
    ],
    [],
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 100"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="learn-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0098b8" stopOpacity="0" />
          <stop offset="0.15" stopColor="#0098b8" stopOpacity="0.75" />
          <stop offset="0.85" stopColor="#0098b8" stopOpacity="0.75" />
          <stop offset="1" stopColor="#0098b8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.g
        animate={inView && !reduced ? { x: [0, -4, 0] } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      >
        {paths.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            fill="none"
            stroke="url(#learn-fade)"
            strokeOpacity={p.opacity}
            strokeWidth="0.7"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.2 }}
          />
        ))}
      </motion.g>

      <motion.line
        x1="148"
        y1="8"
        x2="148"
        y2="92"
        stroke="#0098b8"
        strokeOpacity="0.55"
        strokeDasharray="1 2"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, ease: EASE, delay: 1.5 }}
      />
      <motion.circle
        cx="148"
        cy="60"
        fill="#00d4ff"
        fillOpacity="0.22"
        initial={{ r: 0, opacity: 0 }}
        animate={inView ? { r: [0, 8, 5], opacity: [0, 0.65, 0.22] } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 1.7 }}
      />
      <motion.circle
        cx="148"
        cy="60"
        fill="#0098b8"
        initial={{ r: 0 }}
        animate={inView ? { r: [0, 3.4, 2.4] } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 1.7 }}
      />
      <motion.text
        x="152"
        y="16"
        fontSize="3"
        fill="#0098b8"
        fontFamily="JetBrains Mono, monospace"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, ease: EASE, delay: 1.9 }}
      >
        anomaly · day 3
      </motion.text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Full AlertCard — animated showpiece
// ---------------------------------------------------------------------------

function AlertCard({ baseDelay = 0 }: { baseDelay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const t = {
    badge: baseDelay + 0.0,
    timestamp: baseDelay + 0.2,
    badgeFlash: baseDelay + 0.3,
    commitment: baseDelay + 0.4,
    slip: baseDelay + 0.7,
    whyHead: baseDelay + 1.3,
    why: [baseDelay + 1.35, baseDelay + 1.6, baseDelay + 1.85],
    actHead: baseDelay + 2.1,
    act: [baseDelay + 2.15, baseDelay + 2.4],
    buttons: baseDelay + 2.65,
  };

  const slipMin = useCountUp({
    target: 12,
    duration: 600,
    delay: t.slip * 1000,
    start: inView,
  });
  const slipMax = useCountUp({
    target: 18,
    duration: 600,
    delay: t.slip * 1000,
    start: inView,
  });

  const rise = (delay: number, y = 4, duration = 0.3) => ({
    initial: { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration, ease: EASE, delay },
  });

  return (
    <div ref={ref} className="alert-card rounded-xl p-5">
      <div className="mb-5 flex items-center justify-between">
        <motion.div
          className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
          initial={{
            opacity: 0,
            backgroundColor: "rgba(255, 110, 64, 0.14)",
            borderColor: "rgba(255, 110, 64, 0.5)",
            color: "#c44a18",
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  backgroundColor: "rgba(0, 152, 184, 0.1)",
                  borderColor: "rgba(0, 152, 184, 0.45)",
                  color: "#0098b8",
                }
              : {}
          }
          transition={{
            opacity: { duration: 0.2, ease: EASE, delay: t.badge },
            backgroundColor: { duration: 0.5, ease: EASE, delay: t.badgeFlash },
            borderColor: { duration: 0.5, ease: EASE, delay: t.badgeFlash },
            color: { duration: 0.5, ease: EASE, delay: t.badgeFlash },
          }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            initial={{ backgroundColor: "#c44a18" }}
            animate={inView ? { backgroundColor: "#0098b8" } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: t.badgeFlash }}
          />
          At risk
        </motion.div>

        <motion.div
          {...rise(t.timestamp, 4, 0.3)}
          className="flex items-center gap-2 font-mono text-[11px] text-ink/45"
        >
          <span>11 min ago</span>
          <span className="h-1 w-1 rounded-full bg-ink/25" />
          <span>Confidence 87%</span>
        </motion.div>
      </div>

      <motion.div {...rise(t.commitment, 4, 0.3)} className="mb-1">
        <div className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-ink/45">
          Commitment
        </div>
        <h4 className="text-[17px] font-semibold leading-snug text-ink">
          Acme · Salesforce integration
        </h4>
      </motion.div>

      <motion.p
        {...rise(t.slip, 4, 0.3)}
        className="mb-5 mt-1.5 text-[13px] text-ink/65"
      >
        Predicted slip{" "}
        <span className="font-mono font-medium tabular-nums text-cyan">
          {slipMin}–{slipMax} days
        </span>{" "}
        past Mar 31 deadline
      </motion.p>

      <div className="mb-4 border-t border-ink/[0.06] pt-4">
        <motion.div
          {...rise(t.whyHead, 4, 0.25)}
          className="mb-2.5 text-[10px] uppercase tracking-[0.22em] text-ink/45"
        >
          Why
        </motion.div>
        <ul className="space-y-2 text-[13px] text-ink/80">
          {[
            "6 PRs blocked on Alex — OOO until Thursday",
            "Auth dependency not started; no owner assigned",
            <>
              Spec changed Friday in{" "}
              <span className="font-mono text-ink/60">#cust-acme</span>
            </>,
          ].map((line, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, ease: EASE, delay: t.why[i] }}
              className="flex items-start gap-2.5"
            >
              <motion.span
                className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                initial={{ backgroundColor: "rgba(10, 10, 12, 0.2)" }}
                animate={
                  inView
                    ? { backgroundColor: "rgba(0, 152, 184, 0.85)" }
                    : {}
                }
                transition={{
                  duration: 0.35,
                  ease: EASE,
                  delay: t.why[i] + 0.15,
                }}
              />
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mb-5 border-t border-ink/[0.06] pt-4">
        <motion.div
          {...rise(t.actHead, 4, 0.25)}
          className="mb-2.5 text-[10px] uppercase tracking-[0.22em] text-ink/45"
        >
          Suggested action
        </motion.div>
        <ul className="space-y-2 text-[13px] text-ink/85">
          {[
            "Reassign Alex's reviews to Jordan",
            "Escalate auth scope to Sam by EOD",
          ].map((line, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.25, ease: EASE, delay: t.act[i] }}
              className="flex items-start gap-2.5"
            >
              <motion.span
                className="flex-shrink-0 font-medium text-cyan"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, ease: EASE, delay: t.act[i] }}
              >
                →
              </motion.span>
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, ease: EASE, delay: t.buttons }}
        className="flex items-center justify-between gap-2 pt-1"
      >
        <button className="rounded-md border border-ink/12 px-3 py-1.5 text-[12px] text-ink/55 transition-colors duration-200 hover:border-ink/30 hover:text-ink">
          Snooze 24h
        </button>
        <button className="group inline-flex items-center gap-1.5 rounded-md bg-cyan px-3.5 py-1.5 text-[12px] font-medium text-bg transition-all duration-200 hover:brightness-110 hover:shadow-[0_4px_14px_-4px_rgba(0,152,184,0.5)]">
          Open thread
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SlackPing — small Slack-DM-style mock that lands alongside AlertCard
// ---------------------------------------------------------------------------

function SlackPing({ baseDelay = 0 }: { baseDelay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 4 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.3, ease: EASE, delay: baseDelay + delay },
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: EASE, delay: baseDelay }}
      className="rounded-lg border border-ink/[0.08] bg-bgsoft px-4 py-3 shadow-[0_1px_2px_rgba(10,10,12,0.04)]"
    >
      <motion.div {...rise(0.1)} className="mb-2 flex items-center gap-2">
        <div className="grid h-5 w-5 flex-shrink-0 place-items-center rounded bg-gradient-to-br from-cyan-bright to-cyan text-[10px] font-bold text-ink">
          Y
        </div>
        <span className="text-[12px] font-semibold text-ink">Yantra</span>
        <span className="rounded bg-ink/[0.05] px-1 py-px text-[9px] uppercase tracking-wider text-ink/40">
          APP
        </span>
        <span className="ml-auto font-mono text-[11px] text-ink/40">
          9:14 AM
        </span>
      </motion.div>

      <motion.p
        {...rise(0.2)}
        className="text-[12.5px] leading-[1.55] text-ink/80"
      >
        Heads up — <span className="font-medium text-ink">Acme integration</span>{" "}
        is at risk{" "}
        <span className="font-mono text-cyan">(12–18 day slip)</span>. Auth dep +
        Alex OOO Thu–Fri.
      </motion.p>
      <motion.p {...rise(0.3)} className="mt-1.5 text-[12px] text-ink/55">
        Suggested: reassign reviews to Jordan, escalate auth scope to Sam.
      </motion.p>

      <motion.div
        {...rise(0.4)}
        className="mt-3 flex items-center gap-3 border-t border-ink/[0.06] pt-2.5"
      >
        <button className="text-[11.5px] font-medium text-cyan underline-offset-2 hover:underline">
          View details →
        </button>
        <button className="text-[11.5px] text-ink/50 transition-colors hover:text-ink/80">
          Reply ACT
        </button>
        <span className="ml-auto text-[11px] text-ink/35">
          in #founder-alerts
        </span>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// MiniAlertPreview — used inside the HowItWorks "Predict" column
// ---------------------------------------------------------------------------

function MiniAlertPreview() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div
      ref={ref}
      className="relative grid h-full w-full place-items-center"
    >
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-32 w-56 rounded-3xl bg-cyan/[0.06] blur-2xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.7 }}
        className="relative w-[230px] rounded-lg border border-cyan/35 bg-bgsoft p-4 shadow-[0_10px_30px_-10px_rgba(0,152,184,0.4)]"
      >
        <div className="absolute left-3 right-3 top-[-1px] h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 rounded border border-cyan/35 bg-cyan/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan">
            <span className="h-1 w-1 rounded-full bg-cyan" />
            At risk
          </div>
          <div className="font-mono text-[10px] text-ink/45">87%</div>
        </div>
        <div className="mb-1.5 text-[13px] font-semibold leading-tight text-ink">
          Acme · Salesforce integration
        </div>
        <div className="mb-3 text-[11px] text-ink/55">
          Predicted slip{" "}
          <span className="font-mono font-medium text-cyan">12–18 days</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-ink/45">
          <span className="h-1 w-1 rounded-full bg-ink/30" />
          <span>3 signals · 2 suggested actions</span>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------

const HERO_T = {
  eyebrow: 0.2,
  white: 0.4,
  grey: 1.5,
  body: 2.6,
  foot: 3.3,
};

function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col px-6 pb-20 pt-8 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-dots absolute inset-0 opacity-[0.6]" />
        <div className="absolute -top-[20%] left-1/2 h-[1100px] w-[1100px] -translate-x-1/2 rounded-full bg-cyan/[0.12] blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Wordmark />
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/app/overview"
            className="inline-flex items-center justify-center rounded-lg border border-ink/12 px-4 py-2 text-sm font-medium text-ink/85 transition-colors hover:border-ink/30 hover:text-ink"
          >
            Live demo
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center pt-24 sm:pt-32">
        <motion.div
          className="mb-10 inline-flex w-fit items-center gap-2.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: HERO_T.eyebrow }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-cyan"
            animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <Eyebrow>Delivery-slip early-warning system</Eyebrow>
        </motion.div>

        <h1 className="max-w-[1100px] text-[42px] font-bold leading-[1.02] tracking-ultratight sm:text-[64px] lg:text-[80px]">
          <motion.span
            className="text-ink"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: HERO_T.white }}
          >
            Your team is about to miss a deadline.
          </motion.span>{" "}
          <motion.span
            className="text-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: HERO_T.grey }}
          >
            You won't know until it's too late.
          </motion.span>
        </h1>

        <motion.p
          className="mt-9 max-w-2xl text-lg leading-[1.55] text-ink/70 sm:text-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: HERO_T.body }}
        >
          Yantra reads every Slack thread, ticket, line of code, and AI agent
          action across your team — and tells you which customer commitments are
          about to slip, two weeks before they break.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: HERO_T.body }}
        >
          <Link
            to="/app/overview"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-cyan px-6 py-3.5 font-medium text-bg transition-[filter,box-shadow,transform] duration-200 hover:brightness-110 hover:shadow-[0_10px_40px_-8px_rgba(0,152,184,0.55)]"
          >
            Enter live demo workspace
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href="#how"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink/12 px-6 py-3.5 text-ink/85 transition-colors duration-200 hover:border-ink/30 hover:text-ink"
          >
            See how it works
          </a>
        </motion.div>

        <motion.p
          className="mt-10 text-sm text-ink/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: HERO_T.foot }}
        >
          For founders of engineering teams between 20 and 80 people.
        </motion.p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PainfulScene — narrative + animated cost card
// ---------------------------------------------------------------------------

function PainfulScene() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const T = {
    eyebrow: 0.0,
    lead: 0.25,
    quote: 1.1,
    para2: 2.1,
    punch: 2.4,
  };

  const v1 = useCountUp({
    target: 50,
    duration: 400,
    delay: 200,
    start: inView,
  });
  const v2 = useCountUp({
    target: 200,
    duration: 400,
    delay: 750,
    start: inView,
  });
  const dashAt = 0.55;
  const supportAt = 0.55 + 0.4 + 0.2;
  const tailAt = supportAt + 0.5 + 0.3;

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: T.eyebrow }}
          >
            <Eyebrow className="mb-8">A Tuesday in your week</Eyebrow>
          </motion.div>

          <p className="text-[20px] font-light leading-[1.5] tracking-tight text-ink/90 sm:text-[26px]">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: T.lead }}
            >
              It's Tuesday morning. Your customer success lead pings you:
            </motion.span>{" "}
            <motion.span
              className="inline-block italic text-ink/60"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: T.quote }}
            >
              "Acme is asking about the integration we promised by end of month.
              Engineering says it's three weeks out."
            </motion.span>
          </p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: T.para2 }}
            className="mt-6 text-[20px] font-light leading-[1.5] tracking-tight text-ink/90 sm:text-[26px]"
          >
            It's the third time this quarter. Every signal was sitting in your
            tools two weeks ago.{" "}
            <motion.span
              initial={{ color: "rgba(10, 10, 12, 0.55)" }}
              animate={
                inView
                  ? { color: "rgba(10, 10, 12, 1)" }
                  : { color: "rgba(10, 10, 12, 0.55)" }
              }
              transition={{ duration: 0.5, ease: EASE, delay: T.punch }}
              className="font-medium"
            >
              Nobody connected the dots in time.
            </motion.span>
          </motion.p>
        </div>

        <div className="card relative overflow-hidden rounded-2xl p-8 text-center sm:p-10">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(0, 152, 184, 0.55), 0 0 60px -8px rgba(0, 152, 184, 0.45)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 1, 0] } : {}}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Eyebrow className="mb-6">The cost of one slip</Eyebrow>
          </motion.div>

          <p className="text-[36px] font-bold leading-[1.02] tracking-ultratight text-cyan tabular-nums sm:text-[52px]">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.2, ease: EASE, delay: 0.2 }}
            >
              ${v1}K
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.2, ease: EASE, delay: dashAt }}
              className="mx-2 text-cyan/70"
            >
              –
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.2, ease: EASE, delay: dashAt + 0.05 }}
            >
              ${v2}K
            </motion.span>
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: supportAt }}
            className="mt-4 text-[16px] font-medium leading-[1.35] tracking-tight text-ink/85 sm:text-[19px]"
          >
            in lost ARR or extended sales cycles — per customer commitment
            missed.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: tailAt }}
            className="mt-5 text-[13px] text-ink/55 sm:text-[14px]"
          >
            Preventing one slip per year pays for Yantra for years.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// HowItWorks — 3 columns + ProductSurfaces showpiece (AlertCard + SlackPing)
// ---------------------------------------------------------------------------

const COL = {
  base: 0.3,
  stagger: 0.15,
  dur: 0.5,
};
const COL_3_DELAY = COL.base + 2 * COL.stagger;

function StandardColumn({
  delay,
  eyebrow,
  title,
  body,
  media,
}: {
  delay: number;
  eyebrow: string;
  title: string;
  body: string;
  media: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: COL.dur, ease: EASE, delay }}
      className="card flex h-full flex-col rounded-2xl p-7 sm:p-8"
    >
      <div className="relative -mx-2 -mt-2 mb-7 h-52">{media}</div>
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h3 className="mb-3 text-[22px] font-semibold leading-snug tracking-tight text-ink">
        {title}
      </h3>
      <p className="text-[15px] leading-relaxed text-ink/65">{body}</p>
    </motion.div>
  );
}

function ProductSurfaces() {
  return (
    <div className="mt-20 sm:mt-28">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Eyebrow className="mb-5">What lands in your hands</Eyebrow>
      </motion.div>
      <motion.h3
        className="mb-12 max-w-2xl text-[28px] font-bold leading-[1.06] tracking-ultratight sm:text-[40px]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      >
        Two surfaces. <span className="text-ink/45">One warning.</span>
      </motion.h3>

      <div className="grid max-w-5xl items-start gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-ink/45">
            In the product
          </p>
          <AlertCard baseDelay={0.3} />
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-ink/45">
            Or in your Slack
          </p>
          <SlackPing baseDelay={0.4} />
          <p className="mt-5 text-[13px] leading-relaxed text-ink/55">
            Same warning, different channel. Founders get it wherever they
            live — in-app, Slack DM, or the Monday email digest.
          </p>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow className="mb-5">How it works</Eyebrow>
        </motion.div>
        <motion.h2
          className="mb-20 max-w-3xl text-[34px] font-bold leading-[1.04] tracking-ultratight sm:text-[52px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          Three layers between you and a missed commitment.
        </motion.h2>

        <div className="grid gap-5 lg:grid-cols-3">
          <StandardColumn
            delay={COL.base}
            eyebrow="01 — Observe"
            title="Every signal, every surface."
            body="We read across every tool — and every AI agent — your team uses. Not just metadata. The actual signals: Slack threads, code activity, meeting transcripts, agent actions."
            media={<ObserveNetwork />}
          />
          <StandardColumn
            delay={COL.base + COL.stagger}
            eyebrow="02 — Learn"
            title="How your team actually ships."
            body="We learn the rhythm of your team. Who has context. Who's overloaded. What your warning signs look like before they become slips."
            media={<LearnPattern />}
          />
          <StandardColumn
            delay={COL_3_DELAY}
            eyebrow="03 — Predict"
            title="Two weeks before it breaks."
            body="When something's about to slip, you hear it from us before standup — with the reasoning, the source signals, and the action to take."
            media={<MiniAlertPreview />}
          />
        </div>

        <ProductSurfaces />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// BeforeAfter — two parallel timelines of the same week
// ---------------------------------------------------------------------------

type TimelineRow = {
  day: string;
  event: string;
  note: string;
  danger?: boolean;
  success?: boolean;
  highlight?: boolean;
};

const WITHOUT_ROWS: TimelineRow[] = [
  { day: "Day -14", event: "PR blocked in Linear", note: "silent" },
  { day: "Day -10", event: "Auth dep not started", note: "silent" },
  { day: "Day -7", event: "Spec changed in #cust-acme", note: "silent" },
  {
    day: "Day -3",
    event: '"We need more time"',
    note: "first time anyone says it, in standup",
  },
  {
    day: "Day 0",
    event: "Deadline missed",
    note: "customer pings CS",
    danger: true,
  },
  {
    day: "Day +7",
    event: "Acme threatens churn",
    note: "$120K ARR at risk",
    danger: true,
  },
];

const WITH_ROWS: TimelineRow[] = [
  {
    day: "Day -14",
    event: "Yantra alert lands",
    note: "reasoning + named owner + suggested action",
    highlight: true,
  },
  {
    day: "Day -14",
    event: "Reviews reassigned",
    note: "auth scope escalated to Sam",
  },
  {
    day: "Day -10",
    event: "Risk score back to green",
    note: "on-track for Mar 31",
  },
  {
    day: "Day 0",
    event: "Shipped on time",
    note: "Acme renews, no fire drill",
    success: true,
  },
];

function BeforeAfter() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-cyan/[0.05] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow className="mb-5">The same week, two ways</Eyebrow>
        </motion.div>

        <motion.h2
          className="mb-16 max-w-3xl text-[34px] font-bold leading-[1.04] tracking-ultratight sm:text-[52px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          Same signals. <span className="text-ink/45">Two outcomes.</span>
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="rounded-2xl border border-ink/[0.08] bg-bgsoft p-7 sm:p-9"
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-ink/45">
              Without Yantra
            </p>
            <h3 className="mb-7 text-[22px] font-semibold leading-snug tracking-tight text-ink">
              The slip arrives by surprise.
            </h3>
            <ul className="space-y-5">
              {WITHOUT_ROWS.map((row, i) => (
                <motion.li
                  key={`${row.day}-${row.event}`}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.4,
                    ease: EASE,
                    delay: 0.3 + i * 0.07,
                  }}
                  className="flex gap-4"
                >
                  <div className="w-[72px] flex-shrink-0 pt-0.5 font-mono text-[12px] text-ink/40">
                    {row.day}
                  </div>
                  <div className="flex flex-1 items-start gap-3">
                    <span
                      className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${row.danger ? "bg-[#d94646]" : "bg-ink/20"}`}
                    />
                    <div>
                      <div
                        className={`text-[14px] leading-[1.45] ${row.danger ? "font-medium text-ink" : "text-ink/85"}`}
                      >
                        {row.event}
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-ink/45">
                        {row.note}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
            className="rounded-2xl border border-cyan/30 bg-bgsoft p-7 shadow-[0_0_0_1px_rgba(0,152,184,0.04),0_24px_60px_-24px_rgba(0,152,184,0.3)] sm:p-9"
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-cyan">
              With Yantra
            </p>
            <h3 className="mb-7 text-[22px] font-semibold leading-snug tracking-tight text-ink">
              You hear about it 14 days early.
            </h3>
            <ul className="space-y-5">
              {WITH_ROWS.map((row, i) => (
                <motion.li
                  key={`${row.day}-${row.event}`}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.4,
                    ease: EASE,
                    delay: 0.5 + i * 0.09,
                  }}
                  className="flex gap-4"
                >
                  <div className="w-[72px] flex-shrink-0 pt-0.5 font-mono text-[12px] text-cyan/80">
                    {row.day}
                  </div>
                  <div className="flex flex-1 items-start gap-3">
                    <span
                      className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${row.success ? "bg-[#13a26b]" : row.highlight ? "bg-cyan-bright" : "bg-cyan/60"}`}
                    />
                    <div>
                      <div
                        className={`text-[14px] leading-[1.45] ${row.highlight || row.success ? "font-medium text-ink" : "text-ink/85"}`}
                      >
                        {row.event}
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-ink/55">
                        {row.note}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// WhyNow
// ---------------------------------------------------------------------------

function WhyNow() {
  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow className="mb-5">Why now</Eyebrow>
        </motion.div>

        <motion.h2
          className="mb-14 max-w-3xl text-[34px] font-bold leading-[1.06] tracking-ultratight sm:text-[52px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          The signals moved. The tools didn't.
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="text-[17px] leading-[1.65] text-ink/70 sm:text-lg"
          >
            Engineering teams in 2026 don't just work in Slack and Linear. They
            run alongside coding agents, research agents, QA agents. The signals
            are scattered across more surfaces than any human can track.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="text-[17px] leading-[1.65] text-ink/70 sm:text-lg"
          >
            Allstacks and Jellyfish tell you what shipped last quarter.{" "}
            <motion.span
              initial={{ color: "rgba(10, 10, 12, 0.7)" }}
              whileInView={{ color: "rgba(10, 10, 12, 1)" }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
              className="font-medium"
            >
              We tell you what's about to break
            </motion.span>{" "}
            — with time to do something about it.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// WhoItsFor — with FlashNumber animation
// ---------------------------------------------------------------------------

function FlashNumber({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.span
      className="text-cyan"
      initial={{ color: "#0098b8" }}
      whileInView={{ color: ["#0098b8", "#0a0a0c", "#0098b8"] }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.4,
        ease: EASE,
        times: [0, 0.5, 1],
        delay: 0.55 + delay,
      }}
    >
      {children}
    </motion.span>
  );
}

function WhoItsFor() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="card rounded-2xl p-10 sm:p-12"
        >
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex-1">
              <Eyebrow className="mb-4">Built for</Eyebrow>
              <h3 className="text-[24px] font-semibold leading-tight tracking-tight sm:text-[30px]">
                Founders of growing engineering teams between{" "}
                <FlashNumber>20</FlashNumber> and{" "}
                <FlashNumber delay={0.05}>80</FlashNumber> people.
              </h3>
            </div>
            <div className="hidden h-24 w-px bg-ink/10 sm:block" />
            <p className="text-[15px] leading-[1.65] text-ink/65 sm:max-w-[280px]">
              The stage where every missed deadline costs real money — and where
              there's no VP of Engineering yet to absorb the blindside.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Proof — three stat cards with count-up animations
// ---------------------------------------------------------------------------

function StatCard({
  delay,
  target,
  suffix,
  fallback,
  label,
  isCenter = false,
}: {
  delay: number;
  target?: number;
  suffix?: string;
  fallback?: string;
  label: string;
  isCenter?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const countDelay = delay * 1000 + 200;
  const counted = useCountUp({
    target: target ?? 0,
    duration: 800,
    delay: countDelay,
    start: inView && target != null,
  });

  const display = target != null ? `${counted}${suffix ?? ""}` : fallback;
  const labelDelay = delay + 0.2 + 0.8 + 0.2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="card relative h-full overflow-hidden rounded-2xl p-8"
    >
      {isCenter ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow:
              "0 0 0 1px rgba(0, 152, 184, 0.55), 0 0 60px -8px rgba(0, 152, 184, 0.4)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.2, ease: "easeInOut", delay: delay + 0.2 }}
        />
      ) : null}

      <div className="mb-5 text-[58px] font-bold leading-none tracking-ultratight text-cyan tabular-nums sm:text-[68px]">
        {display}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: EASE, delay: labelDelay }}
        className="text-[15px] leading-[1.6] text-ink/75"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

function Proof() {
  return (
    <section className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow className="mb-12">Where we are</Eyebrow>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          <StatCard
            delay={0}
            target={60}
            suffix="%"
            label="of the 80+ founders we interviewed independently surfaced this pain — without us prompting."
          />
          <StatCard
            delay={0.15}
            target={6}
            suffix=" mo"
            isCenter
            label="building the context engine that powers Yantra — across Slack, code, calendar, and agent traffic."
          />
          <StatCard
            delay={0.3}
            fallback="Now"
            label="onboarding our first design partners. Each one gets weekly time with the founders."
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

const FOUNDERS = [
  {
    name: "Akshayaa",
    role: "CEO",
    initials: "A",
    bio: "NYU. Previously Accenture. Spent two years inside enterprise engineering orgs watching slips happen in slow motion.",
  },
  {
    name: "Sriram",
    role: "CTO",
    initials: "S",
    bio: "NYU. Built AI infrastructure at a previous startup. Has been working on context-engine architecture for six months.",
  },
];

function Team() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const cardStart = 0.4;
  const cardStagger = 0.2;
  const cardDur = 0.5;
  const lastCardEnd = cardStart + (FOUNDERS.length - 1) * cardStagger + cardDur;
  const footDelay = lastCardEnd + 0.4;

  return (
    <section ref={ref} className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow className="mb-5">The team</Eyebrow>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mb-12 max-w-3xl text-[32px] font-bold leading-[1.08] tracking-ultratight sm:text-[44px]"
        >
          Two founders, in the room where the problem happens.
        </motion.h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: cardDur,
                ease: EASE,
                delay: cardStart + i * cardStagger,
              }}
              className="card flex h-full items-start gap-5 rounded-2xl p-7 sm:p-8"
            >
              <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-bright to-cyan text-xl font-semibold text-ink shadow-[0_8px_24px_-6px_rgba(0,152,184,0.45)]">
                {f.initials}
              </div>
              <div>
                <div className="mb-1.5 flex items-baseline gap-2.5">
                  <h3 className="text-[19px] font-semibold tracking-tight text-ink">
                    {f.name}
                  </h3>
                  <span className="font-mono text-[12px] uppercase tracking-wider text-cyan">
                    {f.role}
                  </span>
                </div>
                <p className="text-[14px] leading-[1.6] text-ink/65">{f.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: footDelay }}
          className="mt-9 max-w-2xl text-[15px] leading-[1.65] text-ink/55"
        >
          Both are currently embedded inside a growing engineering team — which
          is how they noticed the problem they're now solving.
        </motion.p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

const TIERS = [
  {
    name: "Starter",
    range: "Under 30 engineers",
    price: 1500,
    features: [
      "All-tools integration (Slack, Linear, GitHub, Zoom)",
      "AI agent monitoring (Cursor, Copilot, ChatGPT)",
      "Slip predictions with reasoning + named action",
      "Weekly founder digest",
      "Direct Slack & email alerts",
    ],
  },
  {
    name: "Growth",
    range: "30 – 60 engineers",
    price: 3000,
    recommended: true,
    features: [
      "Everything in Starter",
      "Multi-team rollups",
      "Custom thresholds + customer-tier weighting",
      "Founder onboarding session with our team",
      "Priority Slack support",
    ],
  },
  {
    name: "Scale",
    range: "60+ engineers",
    price: 5000,
    features: [
      "Everything in Growth",
      "API access + custom integrations",
      "Embedded check-ins with our founders",
      "SSO + audit log",
      "Quarterly business reviews",
    ],
  },
];

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow className="mb-5">Pricing</Eyebrow>
        </motion.div>

        <motion.h2
          className="mb-5 max-w-3xl text-[34px] font-bold leading-[1.04] tracking-ultratight sm:text-[52px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          Priced against the slip, not the seat.
        </motion.h2>

        <motion.p
          className="mb-14 max-w-2xl text-lg leading-relaxed text-ink/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
        >
          One prevented slip per year covers it for years. Pay per team size,
          not per engineer.
        </motion.p>

        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: 0.25 + i * 0.1,
              }}
              className={`relative flex flex-col rounded-2xl p-7 sm:p-8 ${tier.recommended ? "border border-cyan/35 bg-bgsoft shadow-[0_0_0_1px_rgba(0,152,184,0.05),0_24px_60px_-24px_rgba(0,152,184,0.35)]" : "border border-ink/[0.08] bg-bgsoft shadow-[0_1px_2px_rgba(10,10,12,0.04)]"}`}
            >
              {tier.recommended ? (
                <div className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-md bg-cyan-bright px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_4px_14px_-4px_rgba(0,212,255,0.55)]">
                  Most teams start here
                </div>
              ) : null}

              <div className="mb-5">
                <h3 className="text-[20px] font-semibold tracking-tight text-ink">
                  {tier.name}
                </h3>
                <p className="mt-1 text-[13px] text-ink/55">{tier.range}</p>
              </div>

              <div className="mb-7 flex items-baseline gap-1.5">
                <span className="text-[44px] font-bold leading-none tracking-ultratight text-ink tabular-nums">
                  ${(tier.price / 1000).toFixed(1)}K
                </span>
                <span className="text-[14px] text-ink/45">/ month</span>
              </div>

              <ul className="mb-8 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2.5 text-[13.5px] leading-snug text-ink/75"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.5 8.5 L 6.5 11.5 L 12.5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[14px] font-medium transition-all duration-200 ${tier.recommended ? "bg-cyan text-bg hover:brightness-110 hover:shadow-[0_0_30px_-6px_rgba(0,152,184,0.55)]" : "border border-ink/12 text-ink hover:border-cyan/45 hover:text-cyan"}`}
              >
                Request a pilot
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-10 max-w-2xl text-[13px] text-ink/45"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
        >
          First 5 design partners get a 90-day pilot at no cost in exchange for
          live data + feedback. Annual contracts available with a 15% discount.
        </motion.p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FinalCTA — email signup form + live demo CTA + footnote
// ---------------------------------------------------------------------------

function FinalCTA() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const T = {
    line1: 0.0,
    line2: 0.6,
    line2Brighten: 1.3,
    para: 1.7,
    form: 2.1,
    foot: 2.7,
    buttonPulseDelay: 2.8,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden px-6 py-32 sm:px-10 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.12] blur-[160px]" />
        <div className="grid-dots absolute inset-0 opacity-[0.35]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-[40px] font-bold leading-[1.04] tracking-ultratight sm:text-[68px]">
          <motion.span
            className="block sm:inline"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: T.line1 }}
          >
            Stop getting blindsided.
          </motion.span>{" "}
          <motion.span
            className="block sm:inline"
            initial={{ opacity: 0, y: 12, color: "#7fdcef" }}
            animate={inView ? { opacity: 1, y: 0, color: "#0098b8" } : {}}
            transition={{
              opacity: { duration: 0.7, ease: EASE, delay: T.line2 },
              y: { duration: 0.7, ease: EASE, delay: T.line2 },
              color: { duration: 0.4, ease: EASE, delay: T.line2Brighten },
            }}
          >
            Start seeing ahead.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: T.para }}
          className="mx-auto mb-11 max-w-xl text-lg leading-relaxed text-ink/65"
        >
          We're onboarding a small batch of design partners now. If you lead a
          20–80 person engineering team, talk to us.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: T.form }}
          className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="founder@yourstartup.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitted}
            className="flex-1 rounded-lg border border-ink/12 bg-bgsoft px-4 py-3.5 text-ink placeholder-ink/35 shadow-[0_1px_2px_rgba(10,10,12,0.03)] outline-none transition-colors duration-200 focus:border-cyan focus:ring-2 focus:ring-cyan/20 disabled:opacity-50"
          />
          <motion.button
            type="submit"
            disabled={submitted}
            animate={
              inView && !reduced && !submitted
                ? {
                    boxShadow: [
                      "0 4px 14px -4px rgba(0,152,184,0.35)",
                      "0 8px 32px -6px rgba(0,152,184,0.6)",
                      "0 4px 14px -4px rgba(0,152,184,0.35)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: T.buttonPulseDelay,
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-cyan px-6 py-3.5 font-medium text-bg transition-[filter,transform] duration-200 hover:brightness-110 disabled:opacity-80"
          >
            {submitted ? (
              "Got it — we'll reply soon"
            ) : (
              <>
                Request a pilot
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: T.form + 0.2 }}
          className="mt-5"
        >
          <Link
            to="/app/overview"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-cyan underline-offset-4 hover:underline"
          >
            Or jump straight into the live mock dashboard
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: T.foot }}
          className="mt-6 text-sm text-ink/50"
        >
          Limited pilot slots. We reply within 48 hours.
        </motion.p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
      className="border-t border-ink/[0.07] px-6 py-12 sm:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Wordmark size="sm" />
          <span className="text-sm text-ink/35">© 2026</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-ink/55">
          <a
            href="mailto:hello@yantra.ai"
            className="transition-colors duration-200 hover:text-ink"
          >
            hello@yantra.ai
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-ink"
          >
            X
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-ink"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

// ---------------------------------------------------------------------------
// Landing root
// ---------------------------------------------------------------------------

function Landing() {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      <main className="min-h-screen bg-bg font-sans text-ink">
        <Hero />
        <PainfulScene />
        <HowItWorks />
        <BeforeAfter />
        <WhyNow />
        <WhoItsFor />
        <Proof />
        <Team />
        <Pricing />
        <FinalCTA />
        <Footer />
      </main>
    </MotionConfig>
  );
}

// Suppress unused-import warning for VIEWPORT_LOOSE (kept for parity with original).
void VIEWPORT_LOOSE;

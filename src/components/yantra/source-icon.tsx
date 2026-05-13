import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  GitPullRequest,
  Video,
  Mail,
  Calendar,
  FileText,
  Bot,
  Code2,
  ShieldCheck,
  Zap,
  Boxes,
  Headphones,
} from "lucide-react";

type SourceMeta = {
  icon: LucideIcon;
  tone: string;
  label: string;
  brand?: BrandId;
};

type BrandId =
  | "slack"
  | "linear"
  | "github"
  | "zoom"
  | "gmail"
  | "gcal"
  | "notion"
  | "jira"
  | "cursor"
  | "claude"
  | "copilot"
  | "chatgpt"
  | "intercom";

const map: Record<string, SourceMeta> = {
  slack: {
    icon: MessageSquare,
    tone: "text-[oklch(0.78_0.18_320)] bg-[oklch(0.78_0.18_320)]/10",
    label: "Slack",
    brand: "slack",
  },
  linear: {
    icon: Boxes,
    tone: "text-[oklch(0.72_0.16_280)] bg-[oklch(0.72_0.16_280)]/10",
    label: "Linear",
    brand: "linear",
  },
  github: {
    icon: GitPullRequest,
    tone: "text-foreground bg-foreground/10",
    label: "GitHub",
    brand: "github",
  },
  zoom: { icon: Video, tone: "text-info bg-info/10", label: "Zoom", brand: "zoom" },
  gmail: { icon: Mail, tone: "text-danger bg-danger/10", label: "Gmail", brand: "gmail" },
  gcal: { icon: Calendar, tone: "text-info bg-info/10", label: "Calendar", brand: "gcal" },
  calendar: { icon: Calendar, tone: "text-info bg-info/10", label: "Calendar" },
  notion: {
    icon: FileText,
    tone: "text-foreground bg-foreground/10",
    label: "Notion",
    brand: "notion",
  },
  jira: { icon: Boxes, tone: "text-info bg-info/10", label: "Jira", brand: "jira" },
  cursor: { icon: Code2, tone: "text-primary bg-primary/10", label: "Cursor", brand: "cursor" },
  "claude-code": {
    icon: Bot,
    tone: "text-warning bg-warning/10",
    label: "Claude",
    brand: "claude",
  },
  claude: { icon: Bot, tone: "text-warning bg-warning/10", label: "Claude", brand: "claude" },
  copilot: { icon: Bot, tone: "text-success bg-success/10", label: "Copilot", brand: "copilot" },
  chatgpt: { icon: Bot, tone: "text-success bg-success/10", label: "ChatGPT", brand: "chatgpt" },
  qa: { icon: ShieldCheck, tone: "text-danger bg-danger/10", label: "QA Agent" },
  support: { icon: Headphones, tone: "text-info bg-info/10", label: "Support" },
  ops: { icon: Zap, tone: "text-warning bg-warning/10", label: "Ops" },
  intercom: {
    icon: Headphones,
    tone: "text-info bg-info/10",
    label: "Intercom",
    brand: "intercom",
  },
};

export function SourceIcon({
  id,
  size = 16,
  className,
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const m = map[id] ?? { icon: Boxes, tone: "text-muted-foreground bg-muted", label: id };
  const Icon = m.icon;
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md",
        m.tone,
        className,
      )}
    >
      {m.brand ? (
        <BrandMark id={m.brand} size={Math.max(size, 18)} />
      ) : (
        <Icon style={{ width: size, height: size }} />
      )}
    </span>
  );
}

export function SourceBadge({ id, label }: { id: string; label?: string }) {
  const m = map[id] ?? { icon: Boxes, tone: "text-muted-foreground bg-muted", label: id };
  const Icon = m.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
        m.tone,
      )}
    >
      {m.brand ? <BrandMark id={m.brand} size={14} /> : <Icon className="h-3 w-3" />}
      {label ?? m.label}
    </span>
  );
}

function BrandMark({ id, size }: { id: BrandId; size: number }) {
  const tile = brandTile[id];

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="shrink-0">
      {tile}
    </svg>
  );
}

const brandTile: Record<BrandId, ReactNode> = {
  slack: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#fff" />
      <rect x="7.1" y="2.6" width="3.7" height="9.4" rx="1.85" fill="#36C5F0" />
      <rect x="13" y="7.1" width="9.4" height="3.7" rx="1.85" fill="#2EB67D" />
      <rect x="13.2" y="13" width="3.7" height="9.4" rx="1.85" fill="#ECB22E" />
      <rect x="2.6" y="13.2" width="9.4" height="3.7" rx="1.85" fill="#E01E5A" />
    </>
  ),
  linear: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#5E6AD2" />
      <circle cx="7.4" cy="8.4" r="3.2" fill="#fff" />
      <g transform="rotate(-22 12 14.8)" fill="#fff">
        <rect x="3.6" y="12.8" width="16.8" height="1.5" rx="0.75" />
        <rect x="4.8" y="15.7" width="15.6" height="1.5" rx="0.75" />
        <rect x="6" y="18.6" width="14.4" height="1.5" rx="0.75" />
      </g>
    </>
  ),
  github: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#0d1117" />
      <path
        fill="#fff"
        transform="translate(5 5) scale(1.17)"
        d="M6 0C2.69 0 0 2.69 0 6c0 2.65 1.72 4.9 4.1 5.69.3.06.41-.13.41-.29v-1.12c-1.67.36-2.02-.7-2.02-.7-.27-.69-.67-.87-.67-.87-.54-.37.04-.36.04-.36.6.04.92.61.92.61.54.91 1.41.65 1.75.5.05-.39.21-.65.38-.8C3.55 8.59 2.13 8.07 2.13 5.74c0-.66.23-1.2.61-1.62-.06-.15-.27-.76.06-1.58 0 0 .5-.16 1.65.62.48-.13.99-.2 1.5-.2.51 0 1.02.07 1.5.2 1.15-.78 1.65-.62 1.65-.62.33.82.12 1.43.06 1.58.38.42.61.96.61 1.62 0 2.34-1.42 2.85-2.78 3 .22.19.41.56.41 1.13v1.67c0 .16.11.35.41.29C10.28 10.9 12 8.65 12 6c0-3.31-2.69-6-6-6z"
      />
    </>
  ),
  zoom: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#2D8CFF" />
      <rect x="5" y="9" width="10.5" height="6.5" rx="1.3" fill="#fff" />
      <path d="M15.3 10.4 20 8v8l-4.7-2.4Z" fill="#fff" />
    </>
  ),
  gmail: (
    <>
      <rect x="1" y="3" width="22" height="18" rx="3" fill="#fff" />
      <path
        d="M3.8 6.2 12 12.7l8.2-6.5"
        fill="none"
        stroke="#EA4335"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 7v11.2" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20.5 7v11.2" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 20h14" stroke="#FBBC04" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  gcal: (
    <>
      <rect x="2.5" y="3" width="19" height="18" rx="3" fill="#fff" />
      <path d="M6 3h12a3.5 3.5 0 0 1 3.5 3.5V9h-19V6.5A3.5 3.5 0 0 1 6 3Z" fill="#4285F4" />
      <path d="M2.5 9h19v3.5h-19z" fill="#34A853" />
      <text x="12" y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1f1f1f">
        31
      </text>
    </>
  ),
  notion: (
    <>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="3"
        fill="#fff"
        stroke="#111"
        strokeWidth="1.5"
      />
      <path d="M7 7.5h2.7l5.3 8.4V7.5H17v9h-2.7L9 8.2v8.3H7Z" fill="#111" />
    </>
  ),
  jira: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#2684FF" />
      <path
        d="M12.2 4.8 18.9 11c.5.5.5 1.3 0 1.8l-6.7 6.4-2.9-2.8 4.9-4.5-4.9-4.4Z"
        fill="#fff"
        opacity=".95"
      />
      <path d="M8.6 7.8 12 11l-3.4 3.2L5.7 11Z" fill="#DEEBFF" />
    </>
  ),
  cursor: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#0a0a0c" />
      <g transform="translate(12 12.4)" stroke="#fff" strokeWidth="0.36" strokeLinejoin="round">
        <path d="M0-6.4v6.8l-5.6 3Z" fill="#bdbdbd" />
        <path d="M0-6.4v6.8l5.6 3Z" fill="#fff" />
        <path d="M-5.6 3.4 0 .4l5.6 3L0 6.6Z" fill="#7d7d7d" />
      </g>
    </>
  ),
  claude: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#FAFAF7" />
      <g transform="translate(12 12)" fill="#D97757">
        {Array.from({ length: 12 }, (_, i) => {
          const length = i % 2 === 0 ? 6.6 : 4.6;
          return (
            <rect
              key={i}
              x="-0.64"
              y={-length}
              width="1.28"
              height={length}
              rx="0.64"
              transform={`rotate(${i * 30})`}
            />
          );
        })}
      </g>
    </>
  ),
  copilot: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#8534F3" />
      <g fill="#fff">
        <path d="M4.8 6.8 10.6 5v1.4l-5.8 1.8ZM13.4 5l5.8 1.8v1.4l-5.8-1.8Z" />
        <path d="M4.6 10.8c0-1.46.74-2.2 2.2-2.2h10.4c1.46 0 2.2.74 2.2 2.2v6c0 1.6-.74 2.4-2.2 2.4H6.8c-1.46 0-2.2-.8-2.2-2.4Z" />
      </g>
      <rect x="8" y="11.4" width="3" height="4.4" rx="0.6" fill="#500A00" />
      <rect x="13" y="11.4" width="3" height="4.4" rx="0.6" fill="#500A00" />
    </>
  ),
  chatgpt: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#fff" />
      <g
        transform="translate(12 12)"
        fill="none"
        stroke="#0a0a0c"
        strokeWidth="1.7"
        strokeLinejoin="round"
      >
        <ellipse cx="0" cy="0" rx="6.8" ry="3.1" />
        <ellipse cx="0" cy="0" rx="6.8" ry="3.1" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="6.8" ry="3.1" transform="rotate(120)" />
      </g>
    </>
  ),
  intercom: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#0A7CFF" />
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
        <path d="M7 8v7M10.3 7v9M13.7 7v9M17 8v7" />
        <path d="M7 18c2.6 1.5 7.4 1.5 10 0" />
      </g>
    </>
  ),
};

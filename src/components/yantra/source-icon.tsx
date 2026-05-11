import { cn } from "@/lib/utils";
import {
  MessageSquare, GitPullRequest, Video, Mail, Calendar, FileText,
  Bot, Code2, ShieldCheck, Zap, Boxes, Headphones,
} from "lucide-react";

const map: Record<string, { icon: any; tone: string; label: string }> = {
  slack: { icon: MessageSquare, tone: "text-[oklch(0.78_0.18_320)] bg-[oklch(0.78_0.18_320)]/10", label: "Slack" },
  linear: { icon: Boxes, tone: "text-[oklch(0.72_0.16_280)] bg-[oklch(0.72_0.16_280)]/10", label: "Linear" },
  github: { icon: GitPullRequest, tone: "text-foreground bg-foreground/10", label: "GitHub" },
  zoom: { icon: Video, tone: "text-info bg-info/10", label: "Zoom" },
  gmail: { icon: Mail, tone: "text-danger bg-danger/10", label: "Gmail" },
  gcal: { icon: Calendar, tone: "text-info bg-info/10", label: "Calendar" },
  calendar: { icon: Calendar, tone: "text-info bg-info/10", label: "Calendar" },
  notion: { icon: FileText, tone: "text-foreground bg-foreground/10", label: "Notion" },
  jira: { icon: Boxes, tone: "text-info bg-info/10", label: "Jira" },
  cursor: { icon: Code2, tone: "text-primary bg-primary/10", label: "Cursor" },
  "claude-code": { icon: Bot, tone: "text-warning bg-warning/10", label: "Claude" },
  claude: { icon: Bot, tone: "text-warning bg-warning/10", label: "Claude" },
  copilot: { icon: Bot, tone: "text-success bg-success/10", label: "Copilot" },
  chatgpt: { icon: Bot, tone: "text-success bg-success/10", label: "ChatGPT" },
  qa: { icon: ShieldCheck, tone: "text-danger bg-danger/10", label: "QA Agent" },
  support: { icon: Headphones, tone: "text-info bg-info/10", label: "Support" },
  ops: { icon: Zap, tone: "text-warning bg-warning/10", label: "Ops" },
  intercom: { icon: Headphones, tone: "text-info bg-info/10", label: "Intercom" },
};

export function SourceIcon({ id, size = 16, className }: { id: string; size?: number; className?: string }) {
  const m = map[id] ?? { icon: Boxes, tone: "text-muted-foreground bg-muted", label: id };
  const Icon = m.icon;
  return (
    <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-md", m.tone, className)}>
      <Icon style={{ width: size, height: size }} />
    </span>
  );
}

export function SourceBadge({ id, label }: { id: string; label?: string }) {
  const m = map[id] ?? { icon: Boxes, tone: "text-muted-foreground bg-muted", label: id };
  const Icon = m.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium", m.tone)}>
      <Icon className="h-3 w-3" />
      {label ?? m.label}
    </span>
  );
}

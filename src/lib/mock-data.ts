import {
  AlertTriangle, CheckCircle2, Eye, GitPullRequest, MessageSquare, Video,
  Bot, Code2, Mail, Calendar, FileText, Zap, Brain, ShieldCheck,
} from "lucide-react";

export type RiskLevel = "on-track" | "watch" | "at-risk" | "critical";

export const riskMeta: Record<RiskLevel, { label: string; color: string; bg: string; ring: string; dot: string }> = {
  "on-track": { label: "On Track", color: "text-success", bg: "bg-success/10", ring: "ring-success/30", dot: "bg-success" },
  watch: { label: "Watch", color: "text-warning", bg: "bg-warning/10", ring: "ring-warning/30", dot: "bg-warning" },
  "at-risk": { label: "At Risk", color: "text-danger", bg: "bg-danger/10", ring: "ring-danger/30", dot: "bg-danger" },
  critical: { label: "Critical", color: "text-destructive", bg: "bg-destructive/15", ring: "ring-destructive/40", dot: "bg-destructive" },
};

export type Commitment = {
  id: string;
  customer: string;
  title: string;
  owner: string;
  due: string;
  risk: RiskLevel;
  riskScore: number;
  predictedSlipDays: [number, number] | null;
  revenueAtRisk: number;
  impact: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  linearTickets: string[];
  prs: string[];
  slackThreads: string[];
  nextAction: string;
};

export const commitments: Commitment[] = [
  {
    id: "acme-sf",
    customer: "Acme Corp",
    title: "Acme Salesforce Integration",
    owner: "Alex Chen",
    due: "May 31, 2026",
    risk: "at-risk",
    riskScore: 87,
    predictedSlipDays: [12, 18],
    revenueAtRisk: 180000,
    impact: "High",
    confidence: 87,
    linearTickets: ["ACME-142", "ACME-156", "ACME-160"],
    prs: ["#482", "#491", "#494"],
    slackThreads: ["#customer-acme", "#eng-integrations"],
    nextAction: "Reassign auth module to Jordan",
  },
  {
    id: "northstar",
    customer: "Northstar Logistics",
    title: "Northstar Billing Webhook",
    owner: "Priya Patel",
    due: "Jun 7, 2026",
    risk: "at-risk",
    riskScore: 74,
    predictedSlipDays: [4, 9],
    revenueAtRisk: 95000,
    impact: "High",
    confidence: 79,
    linearTickets: ["NORTH-88", "NORTH-91"],
    prs: ["#503"],
    slackThreads: ["#customer-northstar"],
    nextAction: "Escalate webhook retry policy decision",
  },
  {
    id: "globex",
    customer: "Globex",
    title: "Globex SSO Migration",
    owner: "Sam Rivera",
    due: "Jun 14, 2026",
    risk: "watch",
    riskScore: 48,
    predictedSlipDays: [0, 3],
    revenueAtRisk: 60000,
    impact: "Medium",
    confidence: 64,
    linearTickets: ["GLB-201", "GLB-204"],
    prs: ["#510", "#511"],
    slackThreads: ["#customer-globex"],
    nextAction: "Confirm IdP test plan with Globex security",
  },
  {
    id: "nimbus",
    customer: "Nimbus Data",
    title: "Nimbus Analytics Export",
    owner: "Jordan Kim",
    due: "Jun 21, 2026",
    risk: "on-track",
    riskScore: 18,
    predictedSlipDays: null,
    revenueAtRisk: 40000,
    impact: "Medium",
    confidence: 92,
    linearTickets: ["NIM-44"],
    prs: ["#515"],
    slackThreads: ["#customer-nimbus"],
    nextAction: "Schedule UAT with Nimbus next week",
  },
  {
    id: "helio",
    customer: "Helio Health",
    title: "Helio Enterprise Onboarding",
    owner: "Maya Singh",
    due: "Jul 1, 2026",
    risk: "on-track",
    riskScore: 22,
    predictedSlipDays: null,
    revenueAtRisk: 220000,
    impact: "Critical",
    confidence: 88,
    linearTickets: ["HEL-12", "HEL-14"],
    prs: ["#519"],
    slackThreads: ["#customer-helio"],
    nextAction: "Send kickoff confirmation Friday",
  },
];

export type Person = { id: string; name: string; role: string; team: string; load: number; commitments: number };
export const people: Person[] = [
  { id: "alex", name: "Alex Chen", role: "Staff Engineer", team: "Integrations", load: 96, commitments: 4 },
  { id: "jordan", name: "Jordan Kim", role: "Senior Engineer", team: "Platform", load: 64, commitments: 2 },
  { id: "sam", name: "Sam Rivera", role: "Eng Manager", team: "Platform", load: 78, commitments: 3 },
  { id: "priya", name: "Priya Patel", role: "Senior Engineer", team: "Integrations", load: 82, commitments: 3 },
  { id: "maya", name: "Maya Singh", role: "Customer Engineer", team: "Customer Engineering", load: 71, commitments: 2 },
  { id: "leo", name: "Leo Park", role: "QA Lead", team: "QA", load: 59, commitments: 2 },
];

export type Team = { name: string; load: number; open: number; blockers: number; reviewBacklog: number; trend: number; people: string[] };
export const teams: Team[] = [
  { name: "Platform", load: 76, open: 14, blockers: 3, reviewBacklog: 7, trend: 12, people: ["Jordan Kim", "Sam Rivera"] },
  { name: "Integrations", load: 91, open: 18, blockers: 5, reviewBacklog: 9, trend: 28, people: ["Alex Chen", "Priya Patel"] },
  { name: "Customer Engineering", load: 68, open: 9, blockers: 1, reviewBacklog: 3, trend: -4, people: ["Maya Singh"] },
  { name: "Product", load: 54, open: 6, blockers: 0, reviewBacklog: 2, trend: 0, people: ["Riya Das"] },
  { name: "QA", load: 62, open: 11, blockers: 2, reviewBacklog: 5, trend: 8, people: ["Leo Park"] },
];

export type Source = {
  id: string; name: string; description: string; connected: boolean;
  lastSync: string; volume: string; permission: string; health: "healthy" | "degraded" | "down";
  category: "comms" | "tickets" | "code" | "meetings" | "docs" | "agent";
};
export const sources: Source[] = [
  { id: "slack", name: "Slack", description: "Channels, DMs, thread sentiment", connected: true, lastSync: "2s ago", volume: "12.4k msgs/wk", permission: "Read", health: "healthy", category: "comms" },
  { id: "linear", name: "Linear", description: "Tickets, cycles, status changes", connected: true, lastSync: "5s ago", volume: "1.2k events/wk", permission: "Read/Write", health: "healthy", category: "tickets" },
  { id: "github", name: "GitHub", description: "PRs, reviews, code activity", connected: true, lastSync: "1s ago", volume: "320 PRs/wk", permission: "Read", health: "healthy", category: "code" },
  { id: "zoom", name: "Zoom", description: "Meeting transcripts, speakers", connected: true, lastSync: "12m ago", volume: "48 calls/wk", permission: "Read", health: "healthy", category: "meetings" },
  { id: "gmail", name: "Gmail", description: "Customer threads, commitments", connected: true, lastSync: "30s ago", volume: "1.8k emails/wk", permission: "Read", health: "healthy", category: "comms" },
  { id: "gcal", name: "Google Calendar", description: "Meeting cadence, focus time", connected: true, lastSync: "1m ago", volume: "210 events/wk", permission: "Read", health: "healthy", category: "meetings" },
  { id: "notion", name: "Notion", description: "Docs, specs, runbooks", connected: true, lastSync: "4m ago", volume: "180 pages", permission: "Read", health: "healthy", category: "docs" },
  { id: "jira", name: "Jira", description: "Cross-team tickets", connected: false, lastSync: "—", volume: "—", permission: "—", health: "healthy", category: "tickets" },
  { id: "cursor", name: "Cursor", description: "Agent edits, generations", connected: true, lastSync: "8s ago", volume: "740 edits/wk", permission: "MCP", health: "healthy", category: "agent" },
  { id: "claude-code", name: "Claude Code", description: "Agent runs, tool calls", connected: true, lastSync: "20s ago", volume: "210 sessions/wk", permission: "MCP", health: "healthy", category: "agent" },
  { id: "copilot", name: "GitHub Copilot", description: "Inline suggestions, accepts", connected: true, lastSync: "2m ago", volume: "5.6k accepts/wk", permission: "Read", health: "degraded", category: "agent" },
  { id: "chatgpt", name: "ChatGPT", description: "Workspace conversations", connected: true, lastSync: "1m ago", volume: "1.1k chats/wk", permission: "Read", health: "healthy", category: "agent" },
  { id: "intercom", name: "Intercom", description: "Customer escalations", connected: true, lastSync: "4m ago", volume: "300 tickets/wk", permission: "Read", health: "healthy", category: "comms" },
];

export type Agent = {
  id: string; name: string; status: "active" | "idle" | "error"; tools: string[];
  contextLevel: "Read" | "Read+Write" | "Suggest"; lastSync: string; recent: string[];
};
export const agents: Agent[] = [
  { id: "cursor", name: "Cursor Agent", status: "active", tools: ["GitHub", "Linear", "Slack"], contextLevel: "Read+Write", lastSync: "12s ago",
    recent: ["Generated PR #491 for Acme auth flow", "Read 14 Linear tickets in #integrations", "Drafted refactor plan for token store"] },
  { id: "claude", name: "Claude Code", status: "active", tools: ["GitHub", "Notion", "Linear"], contextLevel: "Read+Write", lastSync: "20s ago",
    recent: ["Summarized 3-day Slack thread on Acme scope", "Wrote migration guide draft in Notion", "Reviewed PR #482 — flagged retry gap"] },
  { id: "qa", name: "QA Agent", status: "active", tools: ["GitHub", "Linear", "Internal"], contextLevel: "Suggest", lastSync: "1m ago",
    recent: ["Regression risk +18% on Acme integration", "Missing coverage flagged on auth/refresh", "Created QA checklist for Northstar webhook"] },
  { id: "support", name: "Support Research Agent", status: "idle", tools: ["Gmail", "Intercom", "Notion"], contextLevel: "Read", lastSync: "6m ago",
    recent: ["Surfaced Acme escalation thread from May 2", "Tagged 3 calls about webhook retries", "Compiled CS handoff brief for Globex"] },
  { id: "ops", name: "Internal Ops Agent", status: "active", tools: ["Calendar", "Slack", "Linear"], contextLevel: "Suggest", lastSync: "40s ago",
    recent: ["Detected calendar conflict for Acme review", "Proposed focus time block for Alex", "Reminded Sam to update Northstar status"] },
];

export type ActivityEvent = {
  id: string; ts: number; source: string; sourceLabel: string; text: string; severity: "info" | "warning" | "danger" | "success";
};
const sourceLabels: Record<string, string> = {
  slack: "Slack", linear: "Linear", github: "GitHub", zoom: "Zoom", gmail: "Gmail",
  cursor: "Cursor", claude: "Claude", qa: "QA Agent", calendar: "Calendar",
};
const eventPool: Omit<ActivityEvent, "id" | "ts">[] = [
  { source: "slack", sourceLabel: sourceLabels.slack, text: "Alex: I'm still blocked on Acme auth token flow.", severity: "warning" },
  { source: "linear", sourceLabel: sourceLabels.linear, text: "ACME-142 moved from In Progress → Blocked.", severity: "danger" },
  { source: "github", sourceLabel: sourceLabels.github, text: "PR #482 has been waiting for review for 3 days.", severity: "warning" },
  { source: "zoom", sourceLabel: sourceLabels.zoom, text: "Transcript detected uncertainty around Acme delivery date.", severity: "warning" },
  { source: "cursor", sourceLabel: sourceLabels.cursor, text: "Cursor Agent generated implementation, missing customer-specific edge case.", severity: "info" },
  { source: "qa", sourceLabel: sourceLabels.qa, text: "QA Agent: regression risk +9% for Acme integration.", severity: "danger" },
  { source: "gmail", sourceLabel: sourceLabels.gmail, text: "Acme CS replied: 'Can we still confirm May 31?'", severity: "danger" },
  { source: "linear", sourceLabel: sourceLabels.linear, text: "GLB-204 estimate increased 3 → 8 points.", severity: "warning" },
  { source: "github", sourceLabel: sourceLabels.github, text: "PR #491 opened by Cursor Agent for Acme auth refactor.", severity: "info" },
  { source: "claude", sourceLabel: sourceLabels.claude, text: "Claude summarized #customer-acme: scope unclear on webhook retries.", severity: "info" },
  { source: "slack", sourceLabel: sourceLabels.slack, text: "Sam: Northstar wants the retry decision today.", severity: "warning" },
  { source: "linear", sourceLabel: sourceLabels.linear, text: "NIM-44 moved to In Review.", severity: "success" },
  { source: "calendar", sourceLabel: sourceLabels.calendar, text: "Conflict: Acme architecture review overlaps Globex sync.", severity: "warning" },
  { source: "github", sourceLabel: sourceLabels.github, text: "PR #503 merged — Northstar webhook retries.", severity: "success" },
  { source: "qa", sourceLabel: sourceLabels.qa, text: "QA Agent created coverage tickets for Northstar.", severity: "info" },
];
let _id = 0;
export function nextEvent(): ActivityEvent {
  const e = eventPool[Math.floor(Math.random() * eventPool.length)];
  return { ...e, id: `evt-${Date.now()}-${_id++}`, ts: Date.now() };
}
export function seedEvents(n = 8): ActivityEvent[] {
  const out: ActivityEvent[] = [];
  for (let i = 0; i < n; i++) {
    const e = eventPool[(i * 3) % eventPool.length];
    out.push({ ...e, id: `seed-${i}`, ts: Date.now() - (i + 1) * 1000 * (10 + i * 7) });
  }
  return out;
}

export type Pattern = { title: string; desc: string; impact: string; lift: string };
export const patterns: Pattern[] = [
  { title: "Backward ticket movement", desc: "Tickets that move backward twice are 3.4× more likely to slip.", impact: "High", lift: "+240%" },
  { title: "Stalled PR reviews", desc: "PRs blocked >48h usually delay customer-facing work by 4–9 days.", impact: "High", lift: "+180%" },
  { title: "Single point of failure", desc: "Alex appears in 4 active commitments — top concentration risk.", impact: "Critical", lift: "+310%" },
  { title: "Promise drift", desc: "Customer Success promises not always mirrored in Linear scope.", impact: "Medium", lift: "+120%" },
  { title: "Zoom uncertainty signal", desc: "Hedging language in transcripts appears 7–10 days before slips.", impact: "High", lift: "+205%" },
  { title: "Unreviewed agent code", desc: "AI-generated code without QA agent review has 2.1× regression risk.", impact: "High", lift: "+210%" },
];

export type Action = { id: string; title: string; reason: string; impact: string; priority: "P0" | "P1" | "P2"; commitment: string };
export const seedActions: Action[] = [
  { id: "a1", title: "Reassign Acme auth work to Jordan", reason: "Alex blocked 9 days, Jordan has bandwidth and recent auth context.", impact: "Cuts predicted slip from 12–18d → 3–6d.", priority: "P0", commitment: "Acme Salesforce Integration" },
  { id: "a2", title: "Escalate API dependency to Sam", reason: "Auth dependency unresolved 9 days, EM unblocks fastest.", impact: "Removes top blocker on Acme.", priority: "P0", commitment: "Acme Salesforce Integration" },
  { id: "a3", title: "Draft customer update to Acme", reason: "CS promised May 31, eng plan diverges. Proactive update prevents escalation.", impact: "Reduces customer churn risk.", priority: "P1", commitment: "Acme Salesforce Integration" },
  { id: "a4", title: "Ask Alex to document auth context", reason: "Tribal knowledge concentrated in one person.", impact: "Lowers SPOF risk by 40%.", priority: "P2", commitment: "Acme Salesforce Integration" },
  { id: "a5", title: "Create Linear ticket for missing QA coverage", reason: "QA Agent flagged uncovered auth/refresh path.", impact: "Cuts regression risk +18% → ~5%.", priority: "P1", commitment: "Acme Salesforce Integration" },
  { id: "a6", title: "Descope optional analytics dashboard", reason: "Not in original Acme contract, eats 2 weeks.", impact: "Recovers 8–10 days of capacity.", priority: "P1", commitment: "Acme Salesforce Integration" },
  { id: "a7", title: "Confirm Northstar retry policy with Priya", reason: "Open question stalling PR #503 review.", impact: "Unblocks 2 PRs, ~3 days saved.", priority: "P1", commitment: "Northstar Billing Webhook" },
];

export const evidenceTimeline = [
  { day: "14d ago", text: "Acme commitment created in CS notes", icon: "FileText", tone: "info" },
  { day: "10d ago", text: "Linear ticket dependency added: auth-svc", icon: "GitPullRequest", tone: "info" },
  { day: "8d ago", text: "PR #482 review stalled — no reviewers assigned", icon: "AlertTriangle", tone: "warning" },
  { day: "5d ago", text: "Slack confusion detected in #customer-acme on scope", icon: "MessageSquare", tone: "warning" },
  { day: "3d ago", text: "QA Agent flagged regression risk +18%", icon: "ShieldCheck", tone: "danger" },
  { day: "1d ago", text: "Zoom transcript: 'we may need to push'", icon: "Video", tone: "danger" },
  { day: "Today", text: "Yantra predicts 12–18 day slip with 87% confidence", icon: "Brain", tone: "danger" },
];

export const evidenceSnippets = {
  slack: [
    { who: "Alex Chen", channel: "#customer-acme", text: "Still blocked on the auth token flow — waiting on platform decision.", when: "2d ago" },
    { who: "Maya Singh", channel: "#customer-acme", text: "CS told Acme May 31. We good?", when: "4d ago" },
    { who: "Sam Rivera", channel: "#eng-integrations", text: "Let's move auth scope review to tomorrow.", when: "6d ago" },
  ],
  linear: [
    { id: "ACME-142", title: "Acme: SSO + token refresh", status: "Blocked", changed: "Moved backward 2× in 7d" },
    { id: "ACME-156", title: "Acme: webhook signing", status: "In Review", changed: "Stalled 3d in review" },
    { id: "ACME-160", title: "Acme: error mapping", status: "Todo", changed: "Unestimated" },
  ],
  prs: [
    { id: "#482", title: "feat(acme): auth refresh handler", status: "Awaiting review (3d)", author: "Alex Chen" },
    { id: "#491", title: "refactor(auth): centralize token store", status: "Open · 12 comments", author: "Cursor Agent" },
    { id: "#494", title: "test(acme): integration suite", status: "Draft", author: "QA Agent" },
  ],
  zoom: [
    { title: "Acme weekly sync · May 8", excerpt: "\"…we may need to push the May 31 date if auth doesn't land this week.\"", speaker: "Alex Chen" },
    { title: "Eng standup · May 6", excerpt: "\"Token flow is more involved than we thought, want to scope it down.\"", speaker: "Sam Rivera" },
  ],
};

export const dashboardKpis = [
  { label: "Customer commitments", value: 24, delta: "+3 this week", tone: "info" as const },
  { label: "At-risk commitments", value: 4, delta: "+1 in 24h", tone: "danger" as const },
  { label: "Predicted slips prevented", value: 11, delta: "+2 this month", tone: "success" as const },
  { label: "Team load", value: "78%", delta: "+6% w/w", tone: "warning" as const },
  { label: "Active blockers", value: 9, delta: "−2 since yesterday", tone: "warning" as const },
  { label: "Agents connected", value: 5, delta: "All healthy", tone: "success" as const },
];

export const riskTrend = [
  { day: "Mon", risk: 42, alerts: 1 },
  { day: "Tue", risk: 51, alerts: 2 },
  { day: "Wed", risk: 49, alerts: 2 },
  { day: "Thu", risk: 63, alerts: 3 },
  { day: "Fri", risk: 71, alerts: 4 },
  { day: "Sat", risk: 68, alerts: 3 },
  { day: "Sun", risk: 74, alerts: 4 },
];

export const slipCauses = [
  { name: "Stalled reviews", value: 32 },
  { name: "Scope drift", value: 24 },
  { name: "SPOF blockers", value: 18 },
  { name: "Untracked promises", value: 14 },
  { name: "Missing tests", value: 12 },
];

export const teamLoad = teams.map((t) => ({ name: t.name, load: t.load, blockers: t.blockers }));

export const reviewBacklog = teams.map((t) => ({ name: t.name, backlog: t.reviewBacklog }));

export const customerImpact = commitments.map((c) => ({ name: c.customer, value: Math.round(c.revenueAtRisk / 1000) }));

export const integrationCatalog = [
  { id: "slack", name: "Slack", desc: "Channels, DMs, thread sentiment" },
  { id: "linear", name: "Linear", desc: "Tickets, cycles, status changes" },
  { id: "github", name: "GitHub", desc: "PRs, reviews, code activity" },
  { id: "zoom", name: "Zoom", desc: "Meeting transcripts" },
  { id: "gmail", name: "Gmail", desc: "Customer threads, commitments" },
  { id: "gcal", name: "Google Calendar", desc: "Meeting cadence, focus time" },
  { id: "notion", name: "Notion", desc: "Docs, specs, runbooks" },
  { id: "jira", name: "Jira", desc: "Cross-team tickets" },
  { id: "cursor", name: "Cursor", desc: "Agent edits, generations" },
  { id: "claude-code", name: "Claude Code", desc: "Agent runs, tool calls" },
  { id: "copilot", name: "GitHub Copilot", desc: "Inline suggestions" },
  { id: "chatgpt", name: "ChatGPT", desc: "Workspace conversations" },
  { id: "intercom", name: "Intercom", desc: "Customer escalations" },
];

export const mcpAgents = [
  { id: "cursor", name: "Cursor Agent" },
  { id: "claude-code", name: "Claude Code" },
  { id: "qa", name: "QA Agent" },
  { id: "support", name: "Support Research Agent" },
  { id: "ops", name: "Internal Ops Agent" },
];

export const iconMap = {
  AlertTriangle, CheckCircle2, Eye, GitPullRequest, MessageSquare, Video,
  Bot, Code2, Mail, Calendar, FileText, Zap, Brain, ShieldCheck,
};

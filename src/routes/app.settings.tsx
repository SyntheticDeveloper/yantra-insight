import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { people } from "@/lib/mock-data";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Workspace, team, and alert configuration.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Workspace">
          <div className="space-y-3">
            <Field label="Company name" defaultValue="Acme Inc" />
            <Field label="Workspace URL" defaultValue="acme.yantra.ai" />
            <Field label="Time zone" defaultValue="America/Los_Angeles" />
          </div>
        </Card>
        <Card title="Alert thresholds">
          <div className="space-y-3">
            <RowSwitch label="Notify on at-risk" defaultChecked />
            <RowSwitch label="Notify on watch" defaultChecked />
            <RowSwitch label="Notify on agent errors" />
            <Field label="Slip prediction sensitivity" defaultValue="Balanced" />
          </div>
        </Card>
        <Card title="Team members">
          <ul className="space-y-2 text-sm">
            {people.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-lg bg-card/40 p-2.5">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.role} · {p.team}</p>
                </div>
                <span className="text-xs text-muted-foreground">Member</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="MCP configuration">
          <div className="space-y-3">
            <Field label="MCP endpoint" defaultValue="https://mcp.yantra.ai/v1/acme/8f3a2b94-mcp" />
            <Field label="Bearer token" defaultValue="ynt_••••••••••" />
            <RowSwitch label="Allow agent suggestions" defaultChecked />
          </div>
        </Card>
        <Card title="Notifications">
          <div className="space-y-3">
            <RowSwitch label="Email digest (daily)" defaultChecked />
            <RowSwitch label="Slack DM on critical" defaultChecked />
            <RowSwitch label="Mobile push" />
          </div>
        </Card>
        <Card title="Data retention">
          <div className="space-y-3">
            <Field label="Activity events" defaultValue="365 days" />
            <Field label="Transcripts" defaultValue="180 days" />
            <Button size="sm" variant="outline">Export workspace data</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="glass rounded-xl p-5"><h3 className="text-sm font-semibold">{title}</h3><div className="mt-3">{children}</div></div>;
}
function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label><Input defaultValue={defaultValue} /></div>;
}
function RowSwitch({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return <div className="flex items-center justify-between"><span className="text-sm">{label}</span><Switch defaultChecked={defaultChecked} /></div>;
}

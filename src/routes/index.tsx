import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  CalendarClock,
  Timer,
  Gavel,
  FileCheck2,
  ArrowRight,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppLayout } from "@/components/AppLayout";
import { MattersTable } from "@/components/MattersTable";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LegalEase AI Dashboard | Legal Secretary Co-Pilot" },
      {
        name: "description",
        content:
          "Track drafted emails, summarized consultations and court dates from one AI co-pilot built for South African legal secretaries.",
      },
      { property: "og:title", content: "LegalEase AI Dashboard | Legal Secretary Co-Pilot" },
      {
        property: "og:description",
        content:
          "Track drafted emails, summarized consultations and court dates from one AI co-pilot built for legal secretaries.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Emails Drafted Today", value: "12", icon: Mail, tint: "text-primary" },
  { label: "Meetings Summarized", value: "5", icon: NotebookPen, tint: "text-success" },
  { label: "Court Dates Scheduled", value: "8", icon: Gavel, tint: "text-warning" },
  { label: "Time Saved", value: "3.5 hrs", icon: Timer, tint: "text-accent" },
];

const QUICK = [
  { label: "Generate Client Email", to: "/email", icon: Mail, desc: "Formal correspondence in seconds" },
  { label: "Summarize Consultation Notes", to: "/notes", icon: NotebookPen, desc: "Actions, decisions, deadlines" },
  { label: "Plan Court Day", to: "/planner", icon: CalendarClock, desc: "08:00 - 17:00 time blocks" },
] as const;

const ACTIVITY = [
  { text: "Generated postponement request email", meta: "Ndlovu v Ndlovu - 442/2026", time: "09:12" },
  { text: "Summarized client consultation - Smith matter", meta: "Smith 123/2026", time: "10:05" },
  { text: "Diarised answering affidavit deadline", meta: "Due 30 Aug 2026", time: "11:40" },
  { text: "Drafted fee quotation for new instruction", meta: "Mokoena estate", time: "13:22" },
];

const CHART = [
  { day: "Mon", tasks: 14 },
  { day: "Tue", tasks: 18 },
  { day: "Wed", tasks: 11 },
  { day: "Thu", tasks: 22 },
  { day: "Fri", tasks: 17 },
  { day: "Sat", tasks: 5 },
  { day: "Sun", tasks: 2 },
];

function Dashboard() {
  return (
    <AppLayout
      title="Good morning, Counsel's Secretary - Ready to bill hours?"
      subtitle="Here is how your firm's admin is tracking today."
    >
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon, tint }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <Icon className={`h-5 w-5 ${tint}`} />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {QUICK.map(({ label, to, icon: Icon, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-accent/20">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium text-foreground">{label}</span>
                <span className="block truncate text-xs text-muted-foreground">{desc}</span>
              </span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] lg:col-span-3">
            <h2 className="text-base font-semibold text-foreground">Weekly productivity</h2>
            <p className="mb-4 text-xs text-muted-foreground">Tasks completed with AI assistance</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <Tooltip
                    cursor={{ fill: "var(--secondary)" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="tasks" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] lg:col-span-2">
            <h2 className="text-base font-semibold text-foreground">Recent activity</h2>
            <ol className="mt-4 space-y-5 border-l border-border pl-5">
              {ACTIVITY.map((a) => (
                <li key={a.text} className="relative">
                  <span className="absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-accent ring-4 ring-card" />
                  <p className="text-sm font-medium text-foreground">{a.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.meta} &middot; {a.time}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-secondary p-3 text-xs text-secondary-foreground">
              <FileCheck2 className="h-4 w-4 shrink-0 text-primary" />
              All AI output must be verified by the attorney before it leaves the firm.
            </div>
          </div>
        </section>

        <MattersTable />
      </div>
    </AppLayout>
  );
}

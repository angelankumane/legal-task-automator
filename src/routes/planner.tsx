import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Sparkles, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { delay } from "@/lib/legal-ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | LegalEase AI" },
      {
        name: "description",
        content:
          "Turn your court-day task list into a prioritised 08:00-17:00 schedule built for busy legal secretaries.",
      },
      { property: "og:title", content: "AI Task Planner | LegalEase AI" },
      {
        property: "og:description",
        content: "Prioritised 08:00-17:00 court-day schedule generated from your task list.",
      },
    ],
  }),
  component: PlannerPage,
});

type Priority = "High" | "Medium" | "Low";
type Task = { id: number; title: string; priority: Priority; minutes: number };
type Block = { time: string; task: string; priority: Priority };

const PRIORITY_STYLES: Record<Priority, string> = {
  High: "bg-destructive/10 text-destructive ring-destructive/30",
  Medium: "bg-warning/15 text-warning ring-warning/30",
  Low: "bg-success/15 text-success ring-success/30",
};

const RANK: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };

function buildSchedule(tasks: Task[]): Block[] {
  const ordered = [...tasks].sort((a, b) => RANK[a.priority] - RANK[b.priority]);
  let cursor = 8 * 60;
  const blocks: Block[] = [];

  for (const task of ordered) {
    if (cursor >= 17 * 60) break;
    if (cursor < 13 * 60 && cursor + task.minutes > 13 * 60) {
      blocks.push({ time: fmt(13 * 60 - 30, 30), task: "Lunch / court adjournment", priority: "Low" });
      cursor = 13 * 60;
    }
    blocks.push({ time: fmt(cursor, task.minutes), task: task.title, priority: task.priority });
    cursor += task.minutes + 10;
  }

  if (cursor < 17 * 60) {
    blocks.push({ time: fmt(16 * 60 + 30, 30), task: "Diary review & file notes", priority: "Medium" });
  }
  return blocks;
}

function fmt(start: number, length: number) {
  const t = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}h${String(m % 60).padStart(2, "0")}`;
  return `${t(start)} - ${t(start + length)}`;
}

const WEEK = [
  { day: "Mon", items: ["Motion court roll", "Client consultations"] },
  { day: "Tue", items: ["Draft pleadings", "Counsel briefing"] },
  { day: "Wed", items: ["Divorce hearing 10h00"] },
  { day: "Thu", items: ["Discovery deadline", "Trust reconciliation"] },
  { day: "Fri", items: ["File closures", "Fee narrations"] },
];

function PlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Prepare trial bundle - Ndlovu 442/2026", priority: "High", minutes: 90 },
    { id: 2, title: "Call client re: outstanding documents", priority: "Medium", minutes: 30 },
    { id: 3, title: "File notices at the Registrar", priority: "High", minutes: 60 },
  ]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [minutes, setMinutes] = useState(45);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<Block[] | null>(null);

  function add() {
    if (!title.trim()) return;
    setTasks((t) => [...t, { id: Date.now(), title: title.trim(), priority, minutes }]);
    setTitle("");
  }

  async function run() {
    setLoading(true);
    setSchedule(null);
    await delay();
    setSchedule(buildSchedule(tasks));
    setLoading(false);
  }

  return (
    <AppLayout title="AI Task Planner" subtitle="Prioritise the day and block it out from 08h00 to 17h00.">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-base font-semibold text-foreground">Today's tasks</h2>

          <div className="mt-4 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="Task description"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
            />
            <div className="flex gap-3">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
              >
                {[15, 30, 45, 60, 90, 120].map((m) => (
                  <option key={m} value={m}>
                    {m} min
                  </option>
                ))}
              </select>
              <button
                onClick={add}
                aria-label="Add task"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <ul className="mt-5 space-y-2">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
              >
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-medium ring-1",
                    PRIORITY_STYLES[t.priority],
                  )}
                >
                  {t.priority}
                </span>
                <span className="min-w-0 flex-1 truncate text-foreground">{t.title}</span>
                <span className="text-xs text-muted-foreground">{t.minutes}m</span>
                <button
                  onClick={() => setTasks((prev) => prev.filter((p) => p.id !== t.id))}
                  aria-label={`Remove ${t.title}`}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="text-sm text-muted-foreground">No tasks yet - add one above.</li>
            )}
          </ul>

          <button
            onClick={() => void run()}
            disabled={loading || tasks.length === 0}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "AI is drafting..." : "Plan my day"}
          </button>
        </section>

        <section className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h2 className="text-base font-semibold text-foreground">Suggested schedule</h2>
            {loading && (
              <p className="mt-4 text-sm text-muted-foreground">AI is drafting your court day...</p>
            )}
            {!loading && !schedule && (
              <p className="mt-4 text-sm text-muted-foreground">
                Add tasks and generate a prioritised 08h00 - 17h00 plan.
              </p>
            )}
            {!loading && schedule && (
              <>
                <ol className="mt-4 space-y-2">
                  {schedule.map((b, i) => (
                    <li
                      key={`${b.time}-${i}`}
                      className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                    >
                      <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">{b.time}</span>
                      <span className="min-w-0 flex-1 text-foreground">{b.task}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium ring-1",
                          PRIORITY_STYLES[b.priority],
                        )}
                      >
                        {b.priority}
                      </span>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={() => {
                    void navigator.clipboard.writeText(
                      schedule.map((b) => `${b.time}  ${b.task} (${b.priority})`).join("\n"),
                    );
                    toast.success("Copied to clipboard!");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Copy className="h-4 w-4" />
                  Copy schedule
                </button>
              </>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h2 className="text-base font-semibold text-foreground">Week ahead</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-5">
              {WEEK.map((d) => (
                <div key={d.day} className="rounded-lg bg-secondary p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                    {d.day}
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] leading-snug text-muted-foreground">
                    {d.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

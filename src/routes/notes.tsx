import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Eraser, ListChecks, CalendarClock, Gavel, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { delay, summariseNotes, type NotesSummary } from "@/lib/legal-ai";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | LegalEase AI" },
      {
        name: "description",
        content:
          "Turn raw consultation notes into a clean summary with action items, decisions and diarised deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | LegalEase AI" },
      {
        property: "og:description",
        content: "Consultation notes into actions, decisions and deadlines in seconds.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NotesSummary | null>(null);

  async function run() {
    setLoading(true);
    setResult(null);
    await delay();
    setResult(summariseNotes(notes));
    setLoading(false);
  }

  const plain = result
    ? [
        "SUMMARY",
        result.summary,
        "",
        "ACTION ITEMS",
        ...result.actions.map((a) => `- ${a}`),
        "",
        "DECISIONS",
        ...result.decisions.map((d) => `- ${d}`),
        "",
        "DEADLINES",
        ...result.deadlines.map((d) => `- ${d.label}: ${d.date}`),
      ].join("\n")
    : "";

  return (
    <AppLayout
      title="Meeting Notes Summarizer"
      subtitle="Paste rough consultation notes and get a structured attendance note."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-base font-semibold text-foreground">Raw notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={16}
            placeholder="e.g. Client wants divorce, married in community of property, two kids, maintenance, house in Sandton..."
            className="mt-4 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-ring"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => void run()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              {loading ? "AI is drafting..." : "Summarize notes"}
            </button>
            <button
              onClick={() => {
                setNotes("");
                setResult(null);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {loading && (
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              <span className="mr-2 inline-flex gap-1 align-middle">
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.2s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.1s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
              </span>
              AI is drafting...
            </div>
          )}

          {!loading && !result && (
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              Your structured summary, action items, decisions and deadlines appear here.
            </div>
          )}

          {!loading && result && (
            <>
              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Gavel className="h-4 w-4 text-primary" /> Summary
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.summary}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ListChecks className="h-4 w-4 text-success" /> Action items
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {result.actions.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h3 className="text-sm font-semibold text-foreground">Decisions taken</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {result.decisions.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CalendarClock className="h-4 w-4 text-warning" /> Deadlines
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {result.deadlines.map((d) => (
                    <li
                      key={d.label}
                      className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-secondary-foreground"
                    >
                      <span>{d.label}</span>
                      <span className="font-medium">{d.date}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    void navigator.clipboard.writeText(plain);
                    toast.success("Copied to clipboard!");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Copy className="h-4 w-4" />
                  Copy full summary
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

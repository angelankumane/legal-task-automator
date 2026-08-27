import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { delay, research, type ResearchResult } from "@/lib/legal-ai";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | LegalEase AI" },
      {
        name: "description",
        content:
          "Plain-language explanations of South African legal procedure, from PAIA and POPIA to the Uniform Rules of Court.",
      },
      { property: "og:title", content: "AI Research Assistant | LegalEase AI" },
      {
        property: "og:description",
        content: "Plain-language summaries of South African legal procedure and legislation.",
      },
    ],
  }),
  component: ResearchPage,
});

const SUGGESTIONS = [
  "What is Rule 35 discovery?",
  "Explain PAIA requests",
  "POPIA obligations for law firms",
  "How do I serve summons?",
];

function ResearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  async function run(q: string) {
    const value = q.trim();
    if (!value) return;
    setQuery(value);
    setLoading(true);
    setResult(null);
    await delay();
    setResult(research(value));
    setLoading(false);
  }

  return (
    <AppLayout
      title="AI Research Assistant"
      subtitle="Quick orientation on procedure - always confirm against the primary source."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-base font-semibold text-foreground">Your question</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void run(query);
            }}
            className="mt-4 space-y-3"
          >
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. What is Rule 35 discovery?"
                className="h-10 flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void run(s)}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:border-accent hover:bg-accent/15"
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              {loading ? "AI is drafting..." : "Research"}
            </button>
          </form>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-base font-semibold text-foreground">Findings</h2>
          {loading && <p className="mt-4 text-sm text-muted-foreground">AI is drafting...</p>}
          {!loading && !result && (
            <p className="mt-4 text-sm text-muted-foreground">
              Ask a question to see a summary, key points and suggested next steps.
            </p>
          )}
          {!loading && result && (
            <div className="mt-4 space-y-5">
              <p className="text-sm leading-relaxed text-muted-foreground">{result.summary}</p>

              <div>
                <h3 className="text-sm font-semibold text-foreground">Key points</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {result.keyPoints.map((k) => (
                    <li key={k} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground">Next steps</h3>
                <ol className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {result.nextSteps.map((n, i) => (
                    <li key={n} className="flex gap-2">
                      <span className="font-medium text-primary">{i + 1}.</span>
                      {n}
                    </li>
                  ))}
                </ol>
              </div>

              <button
                onClick={() => {
                  void navigator.clipboard.writeText(
                    [
                      result.summary,
                      "",
                      "KEY POINTS",
                      ...result.keyPoints.map((k) => `- ${k}`),
                      "",
                      "NEXT STEPS",
                      ...result.nextSteps.map((n, i) => `${i + 1}. ${n}`),
                    ].join("\n"),
                  );
                  toast.success("Copied to clipboard!");
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Copy className="h-4 w-4" />
                Copy findings
              </button>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

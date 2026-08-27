import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Eraser, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { delay, generateEmail, type EmailType, type Tone } from "@/lib/legal-ai";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | LegalEase AI" },
      {
        name: "description",
        content:
          "Draft formal client letters, court postponement requests and fee quotations in seconds with the LegalEase AI email generator.",
      },
      { property: "og:title", content: "Smart Email Generator | LegalEase AI" },
      {
        property: "og:description",
        content: "Draft formal legal correspondence in seconds with LegalEase AI.",
      },
    ],
  }),
  component: EmailPage,
});

const TYPES: EmailType[] = [
  "Client Update",
  "Attorney Instruction",
  "Court Postponement Request",
  "Fee Quotation",
  "Document Request",
  "Apology for Delay",
];

const TONES: Tone[] = [
  "Formal (Court)",
  "Professional-Friendly (Client)",
  "Persuasive (Payment Request)",
  "Urgent",
];

function EmailPage() {
  const [type, setType] = useState<EmailType>("Client Update");
  const [tone, setTone] = useState<Tone>("Professional-Friendly (Client)");
  const [brief, setBrief] = useState("");
  const [popia, setPopia] = useState(true);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  async function run() {
    setLoading(true);
    setOutput("");
    await delay();
    setOutput(generateEmail({ type, brief, tone, popia }));
    setLoading(false);
  }

  return (
    <AppLayout
      title="Smart Email Generator"
      subtitle="Professional legal correspondence, drafted and ready for your attorney's review."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-base font-semibold text-foreground">Input</h2>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Email type
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EmailType)}
                className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-foreground">
              Tone
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
              >
                {TONES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-foreground">
              Brief description
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={6}
                placeholder="e.g. Advise Mr Smith that the hearing in case 442/2026 moves to 3 September 2026."
                className="mt-1.5 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-ring"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={popia}
                onChange={(e) => setPopia(e.target.checked)}
                className="h-4 w-4 rounded border-input accent-[var(--primary)]"
              />
              Include POPIA confidentiality footer
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => void run()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4" />
                {loading ? "AI is drafting..." : "Generate email"}
              </button>
              <button
                onClick={() => {
                  setBrief("");
                  setOutput("");
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Eraser className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">AI draft</h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              AI confidence: High
            </span>
          </div>

          {loading && (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
              </span>
              AI is drafting...
            </div>
          )}

          {!loading && !output && (
            <p className="mt-6 text-sm text-muted-foreground">
              Your generated email will appear here and stays fully editable.
            </p>
          )}

          {!loading && output && (
            <>
              <textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                rows={20}
                className="mt-4 w-full rounded-lg border border-input bg-background p-3 font-mono text-xs leading-relaxed outline-none focus:border-ring"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    void navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard!");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
                <button
                  onClick={() => toast.success("Draft saved to this matter.")}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Save className="h-4 w-4" />
                  Save draft
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

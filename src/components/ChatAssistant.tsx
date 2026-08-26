import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Scale } from "lucide-react";
import { chatReply, delay } from "@/lib/legal-ai";
import { cn } from "@/lib/utils";

export type ChatMessage = { role: "user" | "ai"; text: string };

export const WELCOME: ChatMessage = {
  role: "ai",
  text: "Hello! I'm your LegalEase assistant. Need help drafting an email, summarizing notes, or planning your court day?",
};

export const QUICK_CHIPS = [
  "Draft client follow-up",
  "What is Rule 35?",
  "Plan my day with 5 tasks",
];

export function ChatPanel({ className }: { className?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
    setTyping(true);
    await delay();
    setMessages((m) => [...m, { role: "ai", text: chatReply(value) }]);
    setTyping(false);
  }

  return (
    <div className={cn("flex flex-col overflow-hidden", className)}>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                m.role === "user"
                  ? "rounded-br-sm bg-primary text-primary-foreground"
                  : "rounded-bl-sm bg-secondary text-secondary-foreground",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
            </span>
            AI is drafting...
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border bg-card p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => send(chip)}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:border-accent hover:bg-accent/15"
            >
              {chip}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask LegalEase anything..."
            className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            disabled={typing}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[70vh] max-h-[560px] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] sm:right-6">
          <div className="flex items-center gap-3 bg-[image:var(--gradient-hero)] px-4 py-3 text-primary-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Scale className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">LegalEase Assistant</p>
              <p className="text-[11px] opacity-80">Always verify with your attorney</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto rounded-md p-1.5 transition-colors hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ChatPanel className="min-h-0 flex-1" />
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)] ring-2 ring-accent/60 transition-transform hover:scale-105 sm:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}

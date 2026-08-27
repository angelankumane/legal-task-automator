import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { ChatPanel } from "@/components/ChatAssistant";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat Assistant | LegalEase AI" },
      {
        name: "description",
        content:
          "Ask the LegalEase assistant to draft correspondence, explain court rules or plan your day - all in one chat.",
      },
      { property: "og:title", content: "AI Chat Assistant | LegalEase AI" },
      {
        property: "og:description",
        content: "Chat with your legal secretary co-pilot for drafting, rules and planning help.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return (
    <AppLayout title="AI Chat Assistant" subtitle="Your always-on co-pilot for firm admin.">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
        <ChatPanel className="h-[calc(100vh-18rem)] min-h-[420px]" />
      </div>
    </AppLayout>
  );
}

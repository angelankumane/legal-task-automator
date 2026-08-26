import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  CalendarClock,
  BookOpenCheck,
  MessagesSquare,
  Menu,
  X,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatAssistant } from "@/components/ChatAssistant";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/notes", label: "Meeting Notes Summarizer", icon: NotebookPen },
  { to: "/planner", label: "AI Task Planner", icon: CalendarClock },
  { to: "/research", label: "AI Research Assistant", icon: BookOpenCheck },
  { to: "/chat", label: "AI Chat Assistant", icon: MessagesSquare },
] as const;

export const DISCLAIMER =
  "Responsible AI Disclaimer: This assistant uses AI-generated content. Legal documents, dates, and client emails must be reviewed by a qualified professional. AI may produce inaccurate information. Do not share confidential client information. Complies with POPIA.";

function Brand() {
  return (
    <div className="flex items-center gap-3 px-5 py-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-md">
        <Scale className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-base font-semibold tracking-tight text-sidebar-foreground">
          LegalEase AI
        </span>
        <span className="block text-[11px] uppercase tracking-widest text-sidebar-primary">
          Secretary Co-Pilot
        </span>
      </span>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-sidebar-border"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon
              className={cn(
                "h-4.5 w-4.5 shrink-0 transition-colors",
                active ? "text-sidebar-primary" : "text-sidebar-foreground/60 group-hover:text-sidebar-primary",
              )}
            />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-sidebar lg:flex">
        <Brand />
        <div className="mx-3 mb-4 h-px bg-sidebar-border" />
        <NavList />
        <div className="mt-auto m-3 rounded-xl bg-sidebar-accent/60 p-4 text-xs text-sidebar-foreground/80">
          <ShieldCheck className="mb-2 h-4 w-4 text-sidebar-primary" />
          POPIA-aware workflows. Always verify case numbers, dates and client details.
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-72 max-w-[85%] flex-col bg-sidebar shadow-2xl">
            <div className="flex items-center justify-between pr-3">
              <Brand />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-md p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mx-3 mb-4 h-px bg-sidebar-border" />
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-col lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-card/85 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              className="rounded-lg border border-border p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {title}
              </h1>
              {subtitle && (
                <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
              )}
            </div>
            <span className="ml-auto hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground sm:flex">
              <span className="h-2 w-2 rounded-full bg-success" />
              AI assistant online
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>

        <footer className="border-t border-border bg-card px-4 py-6 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-5xl text-center text-xs leading-relaxed text-muted-foreground">
            {DISCLAIMER}
          </p>
        </footer>
      </div>

      <ChatAssistant />
    </div>
  );
}

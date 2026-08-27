import { useMemo, useState } from "react";
import { ArrowUpDown, Briefcase, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "Open" | "Pending" | "Closed";

type Matter = {
  matterNo: string;
  client: string;
  type: string;
  attorney: string;
  status: Status;
  deadline: string; // ISO
};

const MATTERS: Matter[] = [
  { matterNo: "LIT/442/2026", client: "Ndlovu v Ndlovu", type: "Divorce - Regional Court", attorney: "Adv. T. Mahlangu", status: "Open", deadline: "2026-08-30" },
  { matterNo: "CON/123/2026", client: "Smith Holdings (Pty) Ltd", type: "Breach of Contract", attorney: "Ms. R. Pillay", status: "Pending", deadline: "2026-09-04" },
  { matterNo: "EST/077/2026", client: "Estate Late J. Mokoena", type: "Deceased Estate", attorney: "Mr. D. van Wyk", status: "Open", deadline: "2026-09-11" },
  { matterNo: "LAB/311/2025", client: "Sibanda / Ekhaya Retail", type: "CCMA Unfair Dismissal", attorney: "Ms. R. Pillay", status: "Closed", deadline: "2026-07-18" },
  { matterNo: "CONV/205/2026", client: "Pretorius Family Trust", type: "Transfer & Bond Registration", attorney: "Mr. D. van Wyk", status: "Pending", deadline: "2026-08-28" },
  { matterNo: "LIT/509/2026", client: "Zulu v Road Accident Fund", type: "RAF Claim", attorney: "Adv. T. Mahlangu", status: "Open", deadline: "2026-09-01" },
  { matterNo: "COM/018/2026", client: "Bright Spark Energy", type: "Shareholders Agreement", attorney: "Ms. L. Botha", status: "Closed", deadline: "2026-06-30" },
  { matterNo: "FAM/264/2026", client: "Adams Maintenance Enquiry", type: "Maintenance Court", attorney: "Ms. L. Botha", status: "Pending", deadline: "2026-09-15" },
];

const STATUS_STYLES: Record<Status, string> = {
  Open: "bg-success/10 text-success ring-success/25",
  Pending: "bg-warning/10 text-warning ring-warning/25",
  Closed: "bg-muted text-muted-foreground ring-border",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function daysUntil(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(iso + "T00:00:00");
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

export function MattersTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | Status>("all");
  const [asc, setAsc] = useState(true);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MATTERS.filter((m) => {
      const matchesQuery =
        !q ||
        m.matterNo.toLowerCase().includes(q) ||
        m.client.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q) ||
        m.attorney.toLowerCase().includes(q);
      const matchesStatus = status === "all" || m.status === status;
      return matchesQuery && matchesStatus;
    }).sort((a, b) =>
      asc ? a.deadline.localeCompare(b.deadline) : b.deadline.localeCompare(a.deadline),
    );
  }, [query, status, asc]);

  return (
    <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <header className="flex flex-col gap-3 border-b border-border p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
            <Briefcase className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-foreground">Matters register</h2>
            <p className="text-xs text-muted-foreground">
              Live file list with diarised next deadlines
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search matter no, client, attorney"
              aria-label="Search matters"
              className="pl-9"
            />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as "all" | Status)}>
            <SelectTrigger className="sm:w-40" aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="px-5 py-3 font-semibold">Matter No</th>
              <th scope="col" className="px-5 py-3 font-semibold">Client Name</th>
              <th scope="col" className="px-5 py-3 font-semibold">Matter Type</th>
              <th scope="col" className="px-5 py-3 font-semibold">Attorney</th>
              <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              <th scope="col" className="px-5 py-3 font-semibold">
                <button
                  type="button"
                  onClick={() => setAsc((v) => !v)}
                  className="inline-flex items-center gap-1 uppercase tracking-wide transition-colors hover:text-foreground"
                >
                  Next Deadline
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => {
              const days = daysUntil(m.deadline);
              const urgent = m.status !== "Closed" && days <= 7;
              return (
                <tr
                  key={m.matterNo}
                  className="border-t border-border transition-colors hover:bg-secondary/40"
                >
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-xs font-medium text-primary">
                    {m.matterNo}
                  </td>
                  <td className="px-5 py-3 font-medium text-foreground">{m.client}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">{m.type}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">{m.attorney}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[m.status]}`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <span className="text-foreground">{formatDate(m.deadline)}</span>
                    {m.status !== "Closed" && (
                      <span
                        className={`ml-2 text-xs ${urgent ? "font-medium text-destructive" : "text-muted-foreground"}`}
                      >
                        {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "today" : `in ${days}d`}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  No matters match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-3 text-xs text-muted-foreground">
        <span>
          Showing {rows.length} of {MATTERS.length} matters
        </span>
        <span>Deadlines are diarised in the firm's practice management diary.</span>
      </footer>
    </section>
  );
}

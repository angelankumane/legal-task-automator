# LegalEase AI — Legal Secretary Co-Pilot

A modern, responsive web application built for South African law firms. LegalEase AI streamlines daily legal-secretary tasks with a professional SaaS interface, realistic AI-assisted drafting, and a persistent POPIA-compliant disclaimer.

![Tech stack](https://img.shields.io/badge/stack-TanStack%20Start%20%2B%20React%2019%20%2B%20Tailwind%20CSS-1E3A8A)
![License](https://img.shields.io/badge/license-MIT-D4AF37)

---

## Features

- **Dashboard** — Matter register with search, status filters, deadline sorting, urgency indicators, productivity metrics, and recent activity timeline.
- **Smart Email Generator** — Draft court-ready correspondence (Client Update, Attorney Instruction, Court Postponement Request, Fee Quotation, Document Request, Apology for Delay) with tone selection and POPIA footer.
- **Meeting Notes Summarizer** — Convert consultation notes into structured summaries, action items, decisions, and deadlines.
- **AI Task Planner** — Build a prioritized 08:00–17:00 court-day schedule with color-coded priority tags and a printable daily sheet.
- **AI Research Assistant** — Quick-reference lookups for South African legal topics including PAIA, POPIA, and Rule 35 of the Uniform Rules of Court.
- **AI Chatbot** — Floating assistant with quick-reply chips, typing indicator, and contextual guidance across all modules.

## Design & UX

- **Branding:** Navy primary `#1E3A8A` with gold accent `#D4AF37`.
- **Responsive layout:** Collapsible sidebar on desktop, drawer navigation on mobile.
- **Dark / light mode:** Theme toggle with system-preference default and `localStorage` persistence.
- **Accessibility:** Keyboard-navigable controls, ARIA labels, focus states, and print-optimized pages.
- **Responsible AI disclaimer:** Every page reminds users that outputs are assists and must be verified by an attorney.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (full-stack React 19)
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4 with CSS theme variables
- **UI Primitives:** Radix UI + shadcn/ui components
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Language:** TypeScript

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Bun](https://bun.sh/) or npm

### Install

```bash
# Clone the repository
git clone <repository-url>
cd legalease-ai

# Install dependencies
bun install
# or
npm install
```

### Run locally

```bash
bun dev
# or
npm run dev
```

The dev server starts at `http://localhost:8080`.

### Build for production

```bash
bun run build
# or
npm run build
```

## Project Structure

```text
src/
  components/        # Reusable UI components (AppLayout, ChatAssistant, MattersTable, ThemeToggle)
  lib/               # Utility modules (legal-ai engine, helpers)
  routes/            # TanStack file-based routes
    __root.tsx       # Root layout with Toaster and global providers
    index.tsx        # Dashboard
    email.tsx        # Smart Email Generator
    notes.tsx        # Meeting Notes Summarizer
    planner.tsx      # AI Task Planner
    research.tsx     # AI Research Assistant
    chat.tsx         # Full-page AI Chatbot
  styles.css         # Global theme tokens, dark-mode overrides, print styles
```

## Legal & Compliance Notes

- **POPIA footer:** Displayed on every page to reinforce confidentiality and personal-information handling obligations.
- **Responsible AI disclaimer:** All AI-generated outputs include a reminder to verify with an attorney before use in practice.
- **Mock AI engine:** The current implementation uses deterministic, rule-based legal templates to simulate AI responses with a realistic 1.5 s loading state. It is intended for demonstration and prototyping.

## Deployment

This project is configured for Lovable Cloud / edge deployment. Connect your GitHub repository in the Lovable editor to enable automatic two-way sync and publish from the dashboard.

## License

MIT

---

Built with Lovable.

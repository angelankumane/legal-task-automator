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

## Syncing with GitHub (Recommended)

Lovable has built-in two-way GitHub sync. Once connected, every change you make in Lovable (including updates to this README) is automatically pushed to your GitHub repository, and any commits you push to GitHub are pulled back into Lovable.

### Step 1 — Open the GitHub connection panel

1. Open your project in the Lovable editor.
2. Click the **Plus (+)** menu in the chat input area (bottom-left of the editor).
3. Select **GitHub** → **Connect project**.

### Step 2 — Authorize Lovable

1. You will be redirected to GitHub to authorize the **Lovable GitHub App**.
2. Review the requested permissions and click **Authorize**.

### Step 3 — Choose the account or organization

1. After authorization, select the GitHub **account or organization** where you want the repository created.
2. Only one GitHub account can be connected to a Lovable workspace at a time.

### Step 4 — Create the repository

1. Click **Create Repository** in Lovable.
2. Lovable will create a new repo, push the current codebase, and enable automatic sync.
3. Wait a few moments for the initial sync to complete.

### Step 5 — Verify the sync

1. Open the newly created repository on GitHub.
2. Confirm that `README.md` and the latest source files are present.
3. From now on, any edit in Lovable will appear as a commit in GitHub automatically.

### Working from GitHub or a local clone

You can also develop in parallel:

```bash
# Clone the synced repository
git clone <repository-url>
cd legalease-ai

# Make changes locally, then push
git add .
git commit -m "Describe your change"
git push origin main
```

Pushes from your local machine will sync back into Lovable within seconds.

## Legal & Compliance Notes

- **POPIA footer:** Displayed on every page to reinforce confidentiality and personal-information handling obligations.
- **Responsible AI disclaimer:** All AI-generated outputs include a reminder to verify with an attorney before use in practice.
- **Mock AI engine:** The current implementation uses deterministic, rule-based legal templates to simulate AI responses with a realistic 1.5 s loading state. It is intended for demonstration and prototyping.

## Deployment

This project is configured for Lovable Cloud / edge deployment. With GitHub sync enabled, you can publish directly from the Lovable dashboard or deploy the synced repository to any host that supports Vite/React edge apps.


## License

MIT

---

Built with Lovable.

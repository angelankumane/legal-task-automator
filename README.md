# LegalEase Co-Pilot

Build a modern, responsive web app called "LegalEase AI - Legal Secretary Co-Pilot" that helps legal secretaries automate workplace tasks using AI. Use React + Tailwind CSS.



BRANDING:

- Colors: Deep navy #1E3A8A, Gold accent #D4AF37, White, Slate-50

- Logo: Scale of justice icon + LegalEase AI

- Professional, trustworthy, law firm SaaS style



SIDEBAR NAVIGATION (collapsible on mobile with hamburger):

- Dashboard

- Smart Email Generator

- Meeting Notes Summarizer  

- AI Task Planner

- AI Research Assistant (PAIA, Legal Terms)

- AI Chat Assistant



FOOTER ON EVERY PAGE:

"Responsible AI Disclaimer: This assistant uses AI-generated content. Legal documents, dates, and client emails must be reviewed by a qualified professional. AI may produce inaccurate information. Do not share confidential client information. Complies with POPIA."



PAGE 1 - DASHBOARD:

- Greeting: "Good morning, Counsel's Secretary - Ready to bill hours?"

- 4 stat cards: Emails Drafted Today (12), Meetings Summarized (5), Court Dates Scheduled (8), Time Saved (3.5 hrs)

- Quick Actions: Generate Client Email, Summarize Consultation Notes, Plan Court Day

- Recent Activity timeline: "Generated postponement request email", "Summarized client consultation - Smith matter"

- Weekly productivity bar chart



PAGE 2 - SMART EMAIL GENERATOR - FOR LEGAL WORK:

Input Section (left):

- Dropdown: Email Type - Client Update, Attorney Instruction, Court Postponement Request, Fee Quotation, Document Request, Apology for Delay

- Textarea: "What should the email say? e.g., Inform Mr Smith his court date is 3 September, matter 123/2026"

- Dropdown: Tone - Formal (Court), Professional-Friendly (Client), Persuasive (Payment Request), Urgent

- Checkbox: Include POPIA confidentiality footer yes/no

- Button: Generate Legal Email



Output Section (right):

- Generates: Subject line, Formal greeting, Body with correct legal phrasing, Closing "Kind regards, [Your Name] - Legal Secretary", POPIA disclaimer

- Example output must sound like real law firm: "Re: Smith v Smith - Case No: 123/2026 - Postponement"

- Buttons: Copy, Edit (make contenteditable), Clear, Save to Drafts

- Add "AI Confidence: High - Please verify case numbers and dates" tag



PAGE 3 - MEETING NOTES SUMMARIZER - CLIENT CONSULTATIONS:

Input: Large textarea "Paste consultation / meeting notes here... e.g., Client said divorce, 2 kids, house in Soweto, wants maintenance..."

Button: Summarize Consultation



Output: 4 sections:

- Executive Summary (2-3 lines)

- Action Items with checkboxes: "Draft affidavit", "Open file Smith 123/2026", "Request marriage certificate"

- Decisions Made: "Client will proceed with divorce"

- Critical Deadlines with calendar icon: "File answering affidavit by 30 Aug 2026", "Court date 15 Sept 2026"

- Add warning: "Verify all dates and names with attorney"



PAGE 4 - AI TASK PLANNER / SCHEDULER - LAW FIRM DAY:

Input Form:

- Task: "Type deed / File at court / Call client"

- Matter No: Text input

- Priority: High (Court deadline), Medium (Client request), Low (Filing)

- Duration

- Due Date

- Add Task button



Button: Generate My Court Day (08:00-17:00)



Output:

- Daily time blocks: 08:00-09:00 Court filing, 09:30 Client calls, etc.

- Color coded: Red High = Court deadlines, Orange Medium, Green Low

- Weekly calendar showing court dates, consultations, filing deadlines

- Logic: High priority + earliest due date first

- Show overdue tasks in red



PAGE 5 - AI RESEARCH ASSISTANT:

Input: Search box "Ask about PAIA, POPIA, legal procedures..."

Output: Summary, Key Points (3 insights), Recommended Next Steps, Disclaimer "This is not legal advice, consult attorney"

Example: If user types "What is PAIA?", give South African PAIA explanation.



PAGE 6 - AI CHATBOT:

Floating chat bottom right

Welcome: "Hello! I'm your LegalEase assistant. Need help drafting an email, summarizing notes, or planning your court day?"

Quick chips: "Draft client follow-up", "What is Rule 35?", "Plan my day with 5 tasks"

Handles prompts and shows realistic AI responses.



REQUIREMENTS:

- Modern dashboard UI, sidebar navigation, responsive design mobile+desktop

- Structured Input & Output sections side by side on desktop, stacked on mobile

- AI-generated responses (mock realistic, not lorem ipsum)

- Loading animation "AI is drafting..." for 1.5 seconds before output

- Copy toast notification "Copied to clipboard!"

- Professional UI/UX, hover effects, rounded cards, shadows

- All buttons functional, all links work

- Editable AI outputs

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://legal-task-automator.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c146b931-4a6e-4bf6-b298-790c45e74150).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

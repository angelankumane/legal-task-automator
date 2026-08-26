export const AI_DELAY = 1500;

export function delay(ms = AI_DELAY) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

const POPIA_FOOTER =
  "CONFIDENTIALITY & POPIA NOTICE: This communication and any attachments are confidential and may be legally privileged. Personal information is processed in accordance with the Protection of Personal Information Act 4 of 2013. If you are not the intended recipient, please notify the sender and delete this message.";

export type EmailType =
  | "Client Update"
  | "Attorney Instruction"
  | "Court Postponement Request"
  | "Fee Quotation"
  | "Document Request"
  | "Apology for Delay";

export type Tone =
  | "Formal (Court)"
  | "Professional-Friendly (Client)"
  | "Persuasive (Payment Request)"
  | "Urgent";

const GREETINGS: Record<Tone, string> = {
  "Formal (Court)": "Dear Sir / Madam,",
  "Professional-Friendly (Client)": "Dear Mr Smith,",
  "Persuasive (Payment Request)": "Dear Mr Smith,",
  Urgent: "Dear Colleague,",
};

function detectMatter(brief: string) {
  const caseNo = brief.match(/\b\d{2,6}\/\d{2,4}\b/)?.[0] ?? "123/2026";
  const party = brief.match(/\b(?:Mr|Mrs|Ms|Dr)\s+[A-Z][a-z]+/)?.[0] ?? "Mr Smith";
  const surname = party.split(" ").pop() ?? "Smith";
  const date =
    brief.match(/\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s*\d{0,4}\b/i)?.[0] ??
    "3 September 2026";
  return { caseNo, party, surname, date };
}

export function generateEmail(opts: {
  type: EmailType;
  brief: string;
  tone: Tone;
  popia: boolean;
}) {
  const { caseNo, party, surname, date } = detectMatter(opts.brief);
  const matterLine = `${surname} v ${surname} - Case No: ${caseNo}`;
  const closingUrgency =
    opts.tone === "Urgent"
      ? "Kindly treat this correspondence as urgent and revert by close of business today."
      : "We trust that you find the above in order and remain available should you require any further information.";

  const bodies: Record<EmailType, { subject: string; body: string }> = {
    "Client Update": {
      subject: `Re: ${matterLine} - Status Update`,
      body: `We refer to the above matter and to our recent consultation.\n\nWe confirm that the matter has been enrolled and that your court appearance is scheduled for ${date}. Our office will attend at court on your behalf and will keep you apprised of any developments as they arise.\n\nKindly ensure that you make yourself available on the said date at 09h00, and that you bring along your identity document and any correspondence relevant to the matter.\n\n${closingUrgency}`,
    },
    "Attorney Instruction": {
      subject: `Re: ${matterLine} - Instructions to Counsel`,
      body: `We act herein on behalf of ${party} and hereby furnish you with instructions in the above matter.\n\nKindly proceed to draft the necessary pleadings and to advise on prospects of success. Our file, including the client's affidavit and supporting annexures, is attached hereto for your ease of reference.\n\nWe should be obliged to receive your written opinion on or before ${date}, so as to enable us to comply with the applicable time periods prescribed by the Uniform Rules of Court.\n\n${closingUrgency}`,
    },
    "Court Postponement Request": {
      subject: `Re: ${matterLine} - Postponement`,
      body: `We refer to the above matter which is presently set down for hearing on ${date}.\n\nWe respectfully request that the matter be postponed sine die, alternatively to a date to be arranged with the Registrar. The reason for this request is that the client's supporting affidavit and the outstanding discovery documents will not be finalised in time to enable the matter to proceed on the allocated date.\n\nWe confirm that our correspondent has been advised and that the postponement is not sought for purposes of delay. We tender the wasted costs occasioned by the postponement, should the Honourable Court deem same appropriate.\n\n${closingUrgency}`,
    },
    "Fee Quotation": {
      subject: `Re: ${matterLine} - Fee Quotation`,
      body: `We refer to your enquiry and confirm our fee estimate in respect of the above matter.\n\nOur professional fees are charged at the prescribed tariff, and we estimate the attorney's fee for the preparation and issuing of process to be R12 500.00 (excluding VAT), together with disbursements in respect of sheriff's fees, correspondent's fees and counsel's fees, estimated at R4 800.00.\n\nThis quotation is valid for 30 (thirty) days from date hereof and is subject to a signed mandate and payment of the deposit into our trust account, as contemplated in section 86 of the Legal Practice Act 28 of 2014.\n\n${closingUrgency}`,
    },
    "Document Request": {
      subject: `Re: ${matterLine} - Outstanding Documents`,
      body: `We refer to the above matter and to our previous correspondence in this regard.\n\nIn order to proceed, kindly furnish our offices with the following documents by no later than ${date}:\n\n1. A certified copy of your identity document;\n2. The original marriage certificate;\n3. Proof of residential address not older than three (3) months;\n4. All correspondence exchanged with the other party.\n\nPlease note that we are unable to advance the matter, nor to comply with the applicable time periods, until such time as the aforementioned documents are received.\n\n${closingUrgency}`,
    },
    "Apology for Delay": {
      subject: `Re: ${matterLine} - Apology for Delay`,
      body: `We refer to the above matter and to your recent enquiry.\n\nWe sincerely regret the delay in reverting to you. The delay arose as a result of our awaiting the Registrar's allocation of a hearing date, which has since been received.\n\nWe confirm that the matter is receiving our urgent attention and that a full report will be furnished to you by ${date}. We thank you for your patience and continued instructions.\n\n${closingUrgency}`,
    },
  };

  const chosen = bodies[opts.type];
  const context = opts.brief.trim()
    ? `\n\nFor ease of reference, our instructions are recorded as follows: "${opts.brief.trim()}"`
    : "";

  return [
    `Subject: ${chosen.subject}`,
    "",
    GREETINGS[opts.tone],
    "",
    chosen.body + context,
    "",
    "Kind regards,",
    "[Your Name]",
    "Legal Secretary",
    ...(opts.popia ? ["", "---", POPIA_FOOTER] : []),
  ].join("\n");
}

export type NotesSummary = {
  summary: string;
  actions: string[];
  decisions: string[];
  deadlines: { label: string; date: string }[];
};

export function summariseNotes(notes: string): NotesSummary {
  const text = notes.toLowerCase();
  const divorce = text.includes("divorce");
  const maintenance = text.includes("maintenance");
  const property = text.includes("house") || text.includes("property");

  return {
    summary: divorce
      ? "Client attended a consultation regarding the institution of divorce proceedings. The parties are married in community of property, with two minor children born of the marriage. The client seeks primary residence of the minor children, maintenance, and an equitable division of the joint estate."
      : "Client attended a consultation regarding the above matter and provided a factual background. Instructions were taken and the client's version was recorded. The matter appears to fall within the jurisdiction of the Magistrate's Court and prescription is not yet an issue.",
    actions: [
      "Draft affidavit",
      "Open file Smith 123/2026",
      "Request marriage certificate",
      ...(maintenance ? ["Prepare Form A maintenance application"] : []),
      ...(property ? ["Obtain title deed and municipal valuation for the immovable property"] : []),
      "Diarise consultation with counsel",
    ],
    decisions: [
      divorce ? "Client will proceed with divorce" : "Client will proceed with the matter as instructed",
      "Matter to be instituted in the Magistrate's Court, unopposed roll where possible",
      "Client accepted the fee estimate and will pay the deposit into trust",
    ],
    deadlines: [
      { label: "File answering affidavit", date: "30 Aug 2026" },
      { label: "Court date", date: "15 Sept 2026" },
      { label: "Serve summons via sheriff", date: "5 Sept 2026" },
    ],
  };
}

export type ResearchResult = {
  summary: string;
  keyPoints: string[];
  nextSteps: string[];
};

export function research(query: string): ResearchResult {
  const q = query.toLowerCase();

  if (q.includes("paia")) {
    return {
      summary:
        "The Promotion of Access to Information Act 2 of 2000 (PAIA) gives effect to section 32 of the Constitution, which guarantees everyone the right of access to information held by the State and to information held by another person that is required for the exercise or protection of any right. Requests to public bodies are made on Form 2 to the designated information officer; requests to private bodies are made on Form C to the head of the private body.",
      keyPoints: [
        "A public body must decide on a request within 30 days, extendable by a further 30 days in defined circumstances; failure to decide is deemed a refusal.",
        "Requests to private bodies must show that the record is required for the exercise or protection of a right - a bare curiosity request will be refused.",
        "Mandatory grounds of refusal include the privacy of a third party, commercial information of third parties, and legally privileged records, subject to the public-interest override in section 46.",
      ],
      nextSteps: [
        "Identify whether the holder is a public or private body and locate its PAIA manual.",
        "Complete the correct form (Form 2 or Form C), pay the prescribed request fee, and diarise the 30-day period.",
        "If refused or deemed refused, lodge an internal appeal within 60 days, then approach the Information Regulator or the High Court.",
      ],
    };
  }

  if (q.includes("popia")) {
    return {
      summary:
        "The Protection of Personal Information Act 4 of 2013 (POPIA) regulates the processing of personal information by responsible parties in South Africa. It gives effect to the constitutional right to privacy while enabling the free flow of information, and is enforced by the Information Regulator.",
      keyPoints: [
        "Processing must comply with the eight conditions for lawful processing, including accountability, purpose specification, security safeguards and data subject participation.",
        "Special personal information (health, biometrics, criminal behaviour) may only be processed in the limited circumstances set out in sections 26 to 33.",
        "Security compromises must be reported to the Information Regulator and to affected data subjects as soon as reasonably possible.",
      ],
      nextSteps: [
        "Confirm the firm's Information Officer is registered with the Information Regulator.",
        "Apply the minimality principle before sending client information by email; use password-protected attachments.",
        "Record the lawful basis for each processing activity in the firm's processing register.",
      ],
    };
  }

  if (q.includes("rule 35")) {
    return {
      summary:
        "Rule 35 of the Uniform Rules of Court governs discovery, inspection and the production of documents in High Court action proceedings. It enables a party to compel the disclosure of documents and tape recordings relating to any matter in question in the action.",
      keyPoints: [
        "Rule 35(1): a party may require discovery on oath within 20 days by delivering a notice; the discovery affidavit is made in Form 11.",
        "Rule 35(3): where a party believes further relevant documents exist, it may call for their production or a statement on oath that they are not in the party's possession.",
        "Rule 35(12) and 35(14): documents referred to in a pleading or affidavit, and documents relevant to a pleaded issue, may be called for before the close of pleadings.",
      ],
      nextSteps: [
        "Diarise the 20-day period from delivery of the Rule 35(1) notice.",
        "Prepare the discovery affidavit with First and Second Schedules and confirm privilege claims with the attorney.",
        "If discovery is not delivered, prepare a Rule 35(7) application to compel, with a costs prayer.",
      ],
    };
  }

  return {
    summary: `Your query "${query.trim() || "legal procedure"}" concerns South African legal procedure. In general terms, the applicable position is governed by the relevant statute read with the Uniform Rules of Court or the Magistrates' Courts Rules, as well as any practice directive issued by the Judge President of the division in which the matter is enrolled. Time periods are calculated in court days unless otherwise stated.`,
    keyPoints: [
      "Confirm the correct forum and jurisdiction before issuing process - a jurisdictional defect is fatal and attracts an adverse costs order.",
      "Time periods run in court days, excluding Saturdays, Sundays and public holidays, and dies non applies between 16 December and 15 January.",
      "Keep a written record of all instructions and diarise every deadline on the firm's matter management system.",
    ],
    nextSteps: [
      "Verify the current wording of the applicable rule or section on a reliable source such as the Government Gazette or SAFLII.",
      "Consult the practice directive of the relevant division for filing and set-down requirements.",
      "Confirm the approach with the instructing attorney before acting on this summary.",
    ],
  };
}

export function chatReply(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("rule 35")) {
    return "Rule 35 of the Uniform Rules of Court deals with discovery. A party may demand discovery on oath within 20 court days (Rule 35(1)), call for further documents under Rule 35(3), and apply to compel under Rule 35(7) if there is no compliance. Want me to draft a Rule 35(1) notice covering letter?";
  }
  if (m.includes("email") || m.includes("draft") || m.includes("follow-up")) {
    return "I can draft that. Head to the Smart Email Generator, pick 'Client Update' and tone 'Professional-Friendly (Client)'. A typical follow-up reads: \"Re: Smith v Smith - Case No: 123/2026 - Status Update. We refer to the above matter and confirm that your court appearance is scheduled for 3 September 2026...\" Shall I include the POPIA confidentiality footer?";
  }
  if (m.includes("plan") || m.includes("day") || m.includes("task")) {
    return "Sure. Give me your tasks with matter numbers, priorities and durations in the AI Task Planner and I'll build an 08:00-17:00 court day: court filings first thing (registry closes at 15:00), client calls mid-morning, drafting in the quiet afternoon block, and a 16:30 diary sweep for tomorrow's deadlines.";
  }
  if (m.includes("summar") || m.includes("notes")) {
    return "Paste your consultation notes into the Meeting Notes Summarizer and I'll return an executive summary, action items, decisions made and critical deadlines. Please verify all dates and names with the attorney before diarising.";
  }
  if (m.includes("paia")) {
    return "PAIA is the Promotion of Access to Information Act 2 of 2000. Requests to public bodies go on Form 2 to the information officer; private bodies use Form C. The body must decide within 30 days, extendable once by 30 days. The Research Assistant page has the full breakdown.";
  }
  if (m.includes("popia")) {
    return "POPIA (Act 4 of 2013) sets eight conditions for lawful processing of personal information. Practically: only send what is necessary, password-protect attachments containing client data, and report any security compromise to the Information Regulator.";
  }
  return "I can help with drafting legal correspondence, summarising consultation notes, planning your court day, and quick research on PAIA, POPIA and the Uniform Rules. Which one shall we start with? Remember to have anything substantive reviewed by the attorney.";
}

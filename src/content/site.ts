export const contact = {
  name: "Nafiz Mahmud Rimon",
  shortName: "Rimon",
  monogram: "NMR",
  email: "rimonmahmud.nlp@gmail.com",
  github: "https://github.com/Vagabond2003",
  githubHandle: "Vagabond2003",
  origin: "Bangladesh",
  timezone: "GMT+6",
};

export type ProductLine = {
  id: string;
  name: string;
  summary: string;
  includes: string[];
  proof: { label: string; href: string }[];
};

export const productLines: ProductLine[] = [
  {
    id: "apps",
    name: "Web apps & SaaS",
    summary:
      "Products with accounts, roles, money-style flows and dashboards, running on a real database.",
    includes: ["Sign-up, sign-in and roles", "Database and API", "Admin back office"],
    proof: [{ label: "Kosh", href: "#kosh" }],
  },
  {
    id: "portals",
    name: "Portals & internal tools",
    summary:
      "Systems a team or a campus uses every day: schedules, records, approvals and documents.",
    includes: ["Dashboards that answer “what now?”", "Forms that check themselves", "Works on phones"],
    proof: [
      { label: "Smart Campus", href: "#smart-campus" },
      { label: "Tender Package Builder", href: "#tender" },
    ],
  },
  {
    id: "sites",
    name: "Landing & marketing sites",
    summary: "Fast, polished pages for a business, a product or a launch, built to turn visits into enquiries.",
    includes: ["Copy-led page structure", "Motion that stays fast", "Search and social previews"],
    proof: [{ label: "Kosh landing page", href: "#kosh" }],
  },
  {
    id: "redesigns",
    name: "Redesigns of old systems",
    summary:
      "Take the clunky system people put up with and rebuild it so it is clear, modern and quick to use.",
    includes: ["Audit of the current flow", "A new interface on the same data", "A calm, readable layout"],
    proof: [{ label: "Smart Campus", href: "#smart-campus" }],
  },
];

export type Stage = { id: string; name: string; detail: string };

export const stages: Stage[] = [
  { id: "brief", name: "Brief", detail: "You tell me what you need, who will use it and when you would like it live." },
  { id: "spec", name: "Spec", detail: "I write it down: the pages, the features, the data and what counts as done." },
  { id: "build", name: "Build", detail: "Interface, database and everything in between, built on the spec." },
  { id: "review", name: "Review", detail: "You try it on a live link and mark what should change." },
  { id: "launch", name: "Launch", detail: "It goes live with a README that explains how it runs." },
];

/** Language mix across the four featured repositories, as counted by GitHub (bytes). */
export const overallComposition = [
  { label: "TypeScript", pct: "60%" },
  { label: "PL/pgSQL", pct: "24%" },
  { label: "JavaScript", pct: "9%" },
  { label: "CSS", pct: "6%" },
  { label: "Other", pct: "1%" },
];

export const sheets = [
  { id: "cover", label: "Cover" },
  { id: "services", label: "Lines" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "contact", label: "Order" },
] as const;

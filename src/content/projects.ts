import type { StaticImageData } from "next/image";
import koshEn from "@/assets/work/kosh-en.webp";
import koshBn from "@/assets/work/kosh-bn.webp";
import campusLight from "@/assets/work/campus-light.webp";
import campusDark from "@/assets/work/campus-dark-phone.webp";
import tenderEn from "@/assets/work/tender-en.webp";
import tenderBn from "@/assets/work/tender-bn.webp";

export type Colorway = {
  id: string;
  label: string;
  lang?: string;
  swatch: string;
  image: StaticImageData;
  alt: string;
  /** "screen" fills the fit board; "device" sits centred on it (phone captures). */
  fit: "screen" | "device";
  /** Where the screenshot came from: captured from the live site, or taken from the project's repository. */
  source: "live" | "repo";
};

export type Project = {
  id: "kosh" | "smart-campus" | "tender" | "attendx";
  styleNo: string;
  name: string;
  kind: string;
  summary: string;
  context?: string;
  note?: string;
  status: "live" | "sample";
  liveUrl?: string;
  liveLabel?: string;
  sourceUrl: string;
  season: string;
  flat: "kosh" | "campus" | "tender" | "attendx";
  callouts: string[];
  bom: { part: string; material: string; use: string }[];
  composition: { label: string; pct: string }[];
  colorways: Colorway[];
};

export const projects: Project[] = [
  {
    id: "kosh",
    styleNo: "KSH-01",
    name: "Kosh",
    kind: "Mobile financial services app",
    summary:
      "One wallet for people, agents and merchants: send money, cash in and out at agents, pay bills and pay shops by QR, with an admin back office that runs it all.",
    context: "Includes a hackathon track on merchant and agent intelligence: forecasts and churn risk are computed in code, and AI only writes the words.",
    status: "live",
    liveUrl: "https://kosh-mfs.vercel.app",
    liveLabel: "kosh-mfs.vercel.app",
    sourceUrl: "https://github.com/Vagabond2003/MFS",
    season: "Oct 2026",
    flat: "kosh",
    callouts: [
      "Balance read from a server-side ledger, with fees and limits",
      "Send, cash out, pay by QR and recharge",
      "PIN on every payment, OTP above the limit",
      "English and বাংলা, saved per user",
      "Every transaction posted atomically, with an audit log",
    ],
    bom: [
      { part: "Shell", material: "Next.js + TypeScript", use: "Screens and API handlers" },
      { part: "Lining", material: "Supabase PostgreSQL", use: "Ledger, accounts, audit log" },
      { part: "Trims", material: "sms.net.bd · Brevo", use: "OTP codes by SMS and email" },
      { part: "Thread", material: "Typed API contract", use: "Same calls for a REST backend" },
      { part: "Finish", material: "Vercel, Singapore", use: "Hosting" },
    ],
    composition: [
      { label: "TypeScript", pct: "60%" },
      { label: "PL/pgSQL", pct: "33%" },
      { label: "JavaScript", pct: "6%" },
      { label: "Other", pct: "1%" },
    ],
    colorways: [
      {
        id: "en",
        label: "English",
        swatch: "#127a59",
        image: koshEn,
        source: "live",
        alt: "Kosh landing page in English: “Simple. Secure. Smarter Payments.” beside a phone showing a wallet balance and recent payments.",
        fit: "screen",
      },
      {
        id: "bn",
        label: "বাংলা",
        lang: "bn",
        swatch: "#0e1726",
        image: koshBn,
        source: "live",
        alt: "The same Kosh landing page switched to Bangla, with the headline, buttons and phone screen all in বাংলা.",
        fit: "screen",
      },
    ],
  },
  {
    id: "smart-campus",
    styleNo: "SCP-02",
    name: "Smart Campus",
    kind: "Student portal redesign",
    summary:
      "A from-scratch redesign of a university student portal: the class happening now, the term at a glance, results, dues and exam registration on one calm dashboard.",
    note: "Unofficial concept on synthetic sample data. Not affiliated with or endorsed by BAUST.",
    status: "live",
    liveUrl: "https://smart-campus-baust.web.app",
    liveLabel: "smart-campus-baust.web.app",
    sourceUrl: "https://github.com/Vagabond2003/smart-campus",
    season: "Oct 2026",
    flat: "campus",
    callouts: [
      "Live board: the class happening now and what comes next",
      "Term timeline from first class to results",
      "Attendance warning before a course drops under 75%",
      "Standing: credits and GPA for every term",
      "Dues, with demo payments",
    ],
    bom: [
      { part: "Shell", material: "React 19 + TypeScript", use: "The portal interface" },
      { part: "Lining", material: "Cloud Firestore", use: "Each student's private records" },
      { part: "Trims", material: "Firebase Authentication", use: "Sign-in with a student ID" },
      { part: "Finish", material: "Firebase Hosting", use: "Hosting and analytics" },
    ],
    composition: [
      { label: "TypeScript", pct: "89%" },
      { label: "CSS", pct: "11%" },
      { label: "HTML", pct: "<1%" },
    ],
    colorways: [
      {
        id: "light",
        label: "Light · desktop",
        swatch: "#f5f5f2",
        image: campusLight,
        source: "repo",
        alt: "Smart Campus dashboard on a laptop: a live class board, the term timeline, today's classes with an attendance warning, academic standing and dues.",
        fit: "screen",
      },
      {
        id: "dark",
        label: "Dark · phone",
        swatch: "#0f1a14",
        image: campusDark,
        source: "repo",
        alt: "Smart Campus on a phone in dark mode, showing the class in progress and the term timeline.",
        fit: "device",
      },
    ],
  },
  {
    id: "tender",
    styleNo: "TPB-03",
    name: "Tender Package Builder",
    kind: "Document tool for tender submissions",
    summary:
      "Turns a folder of PDFs into one checked, correctly ordered tender package, entirely inside the browser. No file is ever uploaded.",
    context: "AI DevFest 2026, Vibe Coding Contest: solo entry.",
    status: "live",
    liveUrl: "https://vagabond2003.github.io/devfest-0802420205101094/",
    liveLabel: "vagabond2003.github.io",
    sourceUrl: "https://github.com/Vagabond2003/devfest-0802420205101094",
    season: "2026",
    flat: "tender",
    callouts: [
      "Four guided steps, with progress",
      "Rejects non-PDF, damaged and locked files by their content",
      "Flags duplicate files by SHA-256 fingerprint",
      "Tracks expiry dates and blocks expired documents",
      "One click between English and বাংলা, Bangla digits included",
    ],
    bom: [
      { part: "Shell", material: "TypeScript, no backend", use: "Runs fully in the browser" },
      { part: "Lining", material: "pdf.js", use: "Page counts and previews" },
      { part: "Trims", material: "pdf-lib", use: "Merges the final package" },
      { part: "Thread", material: "SHA-256 hashing", use: "Duplicate detection" },
      { part: "Finish", material: "GitHub Pages + Actions", use: "Every push to main deploys" },
    ],
    composition: [
      { label: "TypeScript", pct: "66%" },
      { label: "CSS", pct: "34%" },
      { label: "HTML", pct: "<1%" },
    ],
    colorways: [
      {
        id: "en",
        label: "English",
        swatch: "#0f6b4d",
        image: tenderEn,
        source: "repo",
        alt: "Tender Package Builder matching ten documents to PDF files, with expiry dates and an OK status on every required document.",
        fit: "screen",
      },
      {
        id: "bn",
        label: "বাংলা",
        lang: "bn",
        swatch: "#ffffff",
        image: tenderBn,
        source: "repo",
        alt: "The same matching table in Bangla, with Bangla digits and statuses.",
        fit: "screen",
      },
    ],
  },
  {
    id: "attendx",
    styleNo: "ATX-04",
    name: "AttendX",
    kind: "Attendance tracker for students",
    summary:
      "Log every class, see which courses are slipping below the line, and keep a study timer, all in an app that installs on a phone.",
    note: "Not deployed yet: a proto sample with its source open on GitHub.",
    status: "sample",
    sourceUrl: "https://github.com/Vagabond2003/attendx",
    season: "Mar 2026",
    flat: "attendx",
    callouts: [
      "Attendance wheel with a live percentage",
      "At-risk alert for courses under target",
      "Stats and history charts",
      "Study timer with a session log",
      "Installs on a phone like an app (PWA)",
    ],
    bom: [
      { part: "Shell", material: "React 19 + Vite", use: "The app interface" },
      { part: "Lining", material: "Supabase", use: "Accounts and attendance records" },
      { part: "Trims", material: "Recharts · Framer Motion", use: "Charts and motion" },
      { part: "Finish", material: "vite-plugin-pwa", use: "Installable, works like an app" },
    ],
    composition: [
      { label: "JavaScript", pct: "64%" },
      { label: "CSS", pct: "36%" },
      { label: "HTML", pct: "<1%" },
    ],
    colorways: [],
  },
];

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated ("use the best tech stack for this"). Chosen: Next.js (App Router, statically generated) + React + TypeScript, Tailwind CSS v4, GSAP with ScrollTrigger / SplitText via `@gsap/react`, Lenis smooth scrolling. Deploy target: Vercel (the user already ships Kosh there). Components from 21st.dev may be adapted, but they are rebuilt in the site's own visual language.

## Users

Freelance clients deciding whether to hire Nafiz Mahmud Rimon (GitHub: Vagabond2003): small-business owners, founders, offices and institutions that need a web app, a portal or internal tool, a marketing site, or a redesign of an old system. They arrive from a link, skim fast, open the live projects, and want to know three things: can he build what I need, does his work actually run, and how do I reach him.

## Product Purpose

A personal portfolio whose success is a client emailing Nafiz about a project. It introduces him as a full-stack developer, proves the claim with shipped, running work, and makes the email action obvious from every part of the page.

## Positioning

He ships complete, working products end to end, not mockups: server-side ledgers with fees, limits, PIN/OTP and audit logs (Kosh); auth, databases and role separation (Kosh, Smart Campus, AttendX); in-browser document processing (Tender Package Builder); and interfaces that work in both English and বাংলা (Kosh, Tender Package Builder). Every featured project is live or public with its source.

## Operating Context

Visitors are prospective clients, often on a phone, often outside the developer world. They judge trust from finish quality, live links and clarity. Contact happens by email.

## Capabilities and Constraints

- Services offered (all confirmed): full web apps & SaaS; portals & internal tools; landing & marketing sites; redesigns of old systems.
- Primary action: email `rimonmahmud.nlp@gmail.com` (confirmed by the user).
- Featured projects (all confirmed):
  - **Kosh** — Mobile Financial Services web app: Personal, Agent, Merchant roles plus Admin back office; wallets, send money, cash in/out, recharge, bill and merchant pay (QR / ID), refunds, settlements; server-side ledger with fees, limits, PIN and OTP (SMS + email); liquidity/sales forecasts, churn risk and district coverage (hackathon Track 05), figures computed in code with AI writing only the words; English and বাংলা. Next.js + Supabase PostgreSQL. Live: https://kosh-mfs.vercel.app · repo: github.com/Vagabond2003/MFS
  - **Smart Campus** — unofficial concept redesign of BAUST's student portal on synthetic data: dashboard, routine, marks, dues, RIB exam registration, demo payments, course discussion; React 19 + Firebase (Auth, Firestore, Hosting, Analytics). Live: https://smart-campus-baust.web.app · repo: github.com/Vagabond2003/smart-campus. Must stay labelled unofficial / not affiliated with BAUST.
  - **Tender Package Builder** — AI DevFest 2026 Vibe Coding Contest, solo entry: turns a set of PDFs into one checked, correctly ordered tender package entirely in the browser (pdf.js page counts, `%PDF-` signature checks, SHA-256 duplicate detection, expiry-date rules, one-click English/বাংলা with Bangla digits). Live: https://vagabond2003.github.io/devfest-0802420205101094/ · repo: github.com/Vagabond2003/devfest-0802420205101094
  - **AttendX** — attendance-tracking PWA for students: classes, attendance marking, at-risk class alerts, an animated attendance wheel, stats (Recharts), a study timer with session log; React 19 + Vite + Supabase auth/database. No public deployment; repo: github.com/Vagabond2003/attendx
  - Minor: Snake game in Java (CSE 2108 course project) — archive mention at most.
- Open decision: whether the site itself offers a বাংলা version (not requested).
- Open decision: how prominently to mention that he is a CSE student at BAUST (factual, but the user does not want the site to read like a student's).

## Brand Commitments

- Name: Nafiz Mahmud Rimon. Handle: Vagabond2003.
- The user explicitly wants rich animation.
- Must not feel like: a template (gradient hero, skill bars, card grid), a student's coursework, or something plain and forgettable.

## Evidence on Hand

- Four real projects with public source; three with live deployments (screenshots to be captured from the live sites; repo screenshots exist in smart-campus `docs/screenshots/` and devfest `screenshots/`).
- A photo of Nafiz: the user will provide it (not yet in the project).
- No testimonials, client names, pricing, résumé, or follower/star counts worth showing. Never fabricate testimonials, clients, ratings, years of experience, or project metrics.

## Product Principles

1. Proof over adjectives: every claim on the page points at something that runs.
2. A client who is not a developer must understand what each project does in one sentence.
3. The email action is never more than one glance away.
4. Motion is welcome and should feel crafted, but content stays readable without waiting for it.
5. Credible to a business trusting him with money; no coursework framing in the lead.

## Accessibility & Inclusion

WCAG 2.2 AA contrast and keyboard access; full `prefers-reduced-motion` support for every GSAP sequence; content readable with JavaScript animation disabled; mobile-first, since many clients arrive on phones.

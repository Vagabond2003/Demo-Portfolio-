import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { contact, overallComposition } from "@/content/site";
import { CareLabel } from "./work/SpecSheet";
import { BinderClip } from "./BinderClip";

const PHOTO = "/nafiz.jpg";

function hasPhoto() {
  return fs.existsSync(path.join(process.cwd(), "public", PHOTO));
}

const facts = [
  { label: "Based in", value: `${contact.origin} (${contact.timezone})` },
  { label: "Works in", value: <>English and <span lang="bn">বাংলা</span></> },
  { label: "Builds with", value: "Next.js, React, TypeScript, Supabase, PostgreSQL, Firebase" },
  {
    label: "Code",
    value: (
      <a className="link-ink" href={contact.github} target="_blank" rel="noreferrer">
        github.com/{contact.githubHandle}
      </a>
    ),
  },
  {
    label: "Email",
    value: (
      <a className="link-ink" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
    ),
  },
];

export function About() {
  const photo = hasPhoto();
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[1360px] scroll-mt-16 px-3 pt-28 sm:px-6 sm:pt-36 lg:px-10"
    >
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <figure className="relative mx-auto w-full max-w-[340px] lg:col-span-4 lg:mx-0 lg:max-w-none">
          <BinderClip className="absolute -top-[28px] left-1/2 z-20 w-[96px] -translate-x-1/2" />
          <div className="sheet paper border border-rule p-3">
            {photo ? (
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={PHOTO}
                  alt={`Portrait of ${contact.name}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 340px"
                  className="img-outline object-cover"
                />
              </div>
            ) : (
              <div className="woven relative grid aspect-[4/5] place-items-center overflow-hidden">
                <span aria-hidden className="absolute inset-y-0 left-0 w-4 bg-navy-2" />
                <span aria-hidden className="absolute inset-y-0 right-0 w-4 bg-navy-2" />
                <div className="woven-text text-center">
                  <p className="text-[4.5rem] font-black leading-none tracking-[0.02em] [font-stretch:125%]">
                    {contact.monogram}
                  </p>
                  <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.22em] [font-stretch:80%]">
                    Made in Bangladesh
                  </p>
                </div>
              </div>
            )}
            <figcaption className="flex items-baseline justify-between gap-3 px-1 pb-1 pt-3">
              <span className="field-label">Prepared by</span>
              <span className="field-value">{contact.name}</span>
            </figcaption>
          </div>
        </figure>

        <div className="lg:col-span-5">
          <h2
            id="about-title"
            className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.025em] [font-stretch:108%]"
          >
            One maker, start to finish.
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-2">
            <p>
              I&apos;m Nafiz Mahmud Rimon. I build web products end to end: the screens people use, the database
              underneath and the deployment that keeps it running.
            </p>
            <p>
              Recent work includes a mobile financial services app with a real ledger, a bilingual tool that assembles
              tender documents in the browser, and a redesigned student portal. When you order from me, the person
              you email is the person writing the code.
            </p>
          </div>
          <dl className="mt-8 border-t border-ink/70">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-rule py-2.5 sm:grid-cols-[8rem_1fr]">
                <dt className="field-label pt-[3px]">{f.label}</dt>
                <dd className="field-value">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-3 lg:pt-24">
          <CareLabel
            items={overallComposition}
            note="Across Kosh, Smart Campus, Tender Package Builder and AttendX, by GitHub's count."
          />
        </div>
      </div>
    </section>
  );
}

import { contact } from "@/content/site";

export function Footer() {
  return (
    <footer className="woven woven-text relative">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-navy-2" />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-4 pb-10 pt-12 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <p className="text-[1.75rem] font-black uppercase leading-none tracking-[0.01em] [font-stretch:125%]">
            {contact.name}
          </p>
          <p className="mt-2 text-[0.9375rem] font-semibold opacity-90">Full-stack developer, made in Bangladesh</p>
        </div>
        <div className="max-w-[60ch] space-y-1.5 text-[0.8125rem] leading-relaxed opacity-85 lg:text-right">
          <p>
            Fit photos are screenshots of the live projects and their repositories. Smart Campus is an unofficial
            concept and is not affiliated with or endorsed by BAUST.
          </p>
          <p>
            © 2026 {contact.name} · Built with Next.js, GSAP and Lenis ·{" "}
            <a href={contact.github} className="underline decoration-thread/40 underline-offset-[0.2em] hover:decoration-thread" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

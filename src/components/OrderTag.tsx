import { ArrowUpRight } from "lucide-react";
import { contact } from "@/content/site";
import { orderMailto } from "@/lib/mailto";

/** The printed face of the hero hang tag: the order action, a QR to email from a phone, and the terms. */
export function OrderTagFace({ qr }: { qr: string }) {
  return (
    <div className="px-5 pb-4 pt-12">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] [font-stretch:75%]">
        {contact.monogram} · Order tag
      </p>
      <p className="mt-1 text-[1.5rem] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] [font-stretch:78%]">
        Place an order
      </p>
      <p className="mt-2 text-[0.8125rem] leading-snug">Apps, portals, sites and redesigns, built to spec.</p>

      <div className="mt-4 flex items-center gap-3 border-t border-dashed border-kraft-ink/35 pt-4">
        <span
          className="block size-[74px] shrink-0 bg-satin p-[5px] shadow-[0_1px_1px_rgb(42_32_24/0.25)]"
          role="img"
          aria-label={`QR code that opens an email to ${contact.email}`}
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <p className="text-[0.75rem] leading-snug">Scan to write from your phone, or use the button.</p>
      </div>

      <a
        href={orderMailto()}
        className="btn-order mt-4 w-full justify-center px-3 py-2.5 text-[0.9375rem]"
      >
        Email your brief
        <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
      </a>
      <p className="mt-2 break-all text-center text-[0.6875rem] leading-tight">{contact.email}</p>

      <dl className="mt-3 flex items-baseline justify-between gap-2 border-t border-kraft-ink/30 pt-2 text-[0.6875rem] uppercase tracking-[0.08em] [font-stretch:75%]">
        <dt className="font-semibold">Price</dt>
        <dd className="font-bold">Quoted per project</dd>
      </dl>
    </div>
  );
}

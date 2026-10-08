import { contact } from "@/content/site";
import { qrSvg } from "@/lib/qr";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteHeader } from "@/components/SiteHeader";
import { Cover } from "@/components/Cover";
import { Services } from "@/components/Services";
import { Work } from "@/components/work/Work";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingTag } from "@/components/FloatingTag";

export default async function Home() {
  const qr = await qrSvg(`mailto:${contact.email}`);

  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main id="main">
        <Cover qr={qr} />
        <Services />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingTag />
    </>
  );
}

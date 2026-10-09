import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders_Stencil, Anek_Bangla } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const stencil = Big_Shoulders_Stencil({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-stencil-face",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

const anek = Anek_Bangla({
  subsets: ["bengali"],
  axes: ["wdth"],
  variable: "--font-anek",
  display: "swap",
  preload: false,
});

const siteUrl = "https://vagabond2003.github.io/Demo-Portfolio-/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nafiz Mahmud Rimon · Full-stack developer, made in Bangladesh",
  description:
    "Web apps, portals, internal tools and marketing sites, built to spec and shipped live. See Kosh, Smart Campus, Tender Package Builder and AttendX.",
  openGraph: {
    title: "Nafiz Mahmud Rimon · Built to spec. Shipped to production.",
    description:
      "Full-stack developer in Bangladesh. Four real products, three of them live, each laid out like a garment tech pack.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafiz Mahmud Rimon · Built to spec. Shipped to production.",
    description: "Full-stack developer in Bangladesh. Four real products, three of them live.",
  },
};

export const viewport: Viewport = {
  themeColor: "#17213f",
};

const motionFlag = `if(window.matchMedia&&matchMedia("(prefers-reduced-motion: no-preference)").matches){document.documentElement.classList.add("motion")}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${stencil.variable} ${anek.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

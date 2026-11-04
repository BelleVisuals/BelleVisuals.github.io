import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FloatingCta from "@/components/FloatingCta";
import { site as cfg } from "@/lib/site";

// Display serif. To try another, swap Bodoni_Moda for e.g. Playfair_Display or Cormorant (same import style).
const serif = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = DM_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-sans" });
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Belle Visuals — Your vision, thoughtfully captured", template: "%s — Belle Visuals" },
  description: "Photography, videography, and creative media for brands, events, and people with a story to tell.",
  openGraph: { type: "website", siteName: "Belle Visuals" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-full focus:bg-white focus:p-3 focus:text-ink">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <FloatingCta />
        <footer className="flex flex-col items-center gap-4 px-5 py-12 text-center md:px-12">
          {(cfg.socials.length > 0 || cfg.contactEmail) && (
            <ul className="flex flex-wrap justify-center gap-2">
              {cfg.socials.map((s) => <li key={s.url}><a className="btn min-h-[40px] px-5 text-sm" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
              {cfg.contactEmail && <li><a className="btn min-h-[40px] px-5 text-sm" href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a></li>}
            </ul>
          )}
          <p className="mono">© Belle Visuals</p>
        </footer>
      </body>
    </html>
  );
}

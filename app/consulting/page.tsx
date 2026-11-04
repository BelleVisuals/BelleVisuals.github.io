import type { Metadata } from "next";
import Link from "next/link";
import { consulting, priceLabel, site } from "@/lib/site";
export const metadata: Metadata = { title: "Creative Consulting", description: "One-on-one creative consulting sessions with Belle Visuals." };
export default function Page() {
  return (
    <section className="px-5 py-16 md:px-12">
      <h1 className="font-serif text-6xl font-normal md:text-8xl">Creative consulting</h1>
      <p className="mt-6 max-w-xl text-lg text-[#e6def5]">Start with an inquiry: tell me your topic, challenge and goals, and we’ll find the right session.</p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {consulting.map((c) => (
          <div key={c.name} className="rounded-[2.5rem] border border-white/30 p-8"><h2 className="font-serif text-4xl">{c.name}</h2>
            <p className="mono mt-2 !text-accent">{priceLabel(c.priceFrom)} per session</p><p className="mt-4 text-mute">{c.blurb}</p></div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={`/inquire?service=${encodeURIComponent("Creative consulting")}`} className="btn btn-pri">Inquire about consulting</Link>
        {site.bookingUrl && <a href={site.bookingUrl} className="btn" target="_blank" rel="noopener noreferrer">Book directly</a>}
      </div>
    </section>
  );
}

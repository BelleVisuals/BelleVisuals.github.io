import type { Metadata } from "next";
import Link from "next/link";
import { services, priceLabel } from "@/lib/site";
export const metadata: Metadata = { title: "Services", description: "Photography, videography, content creation and creative consulting from Belle Visuals." };
export default function Page() {
  return (
    <section className="px-5 py-16 md:px-12">
      <h1 className="font-serif text-6xl font-normal md:text-8xl">Services</h1>
      <div className="mt-14 space-y-4">
        {services.map((s) => (
          <div key={s.name} className="grid gap-6 rounded-[2.5rem] border border-white/30 p-8 md:grid-cols-[1fr_1fr_220px]">
            <div><h2 className="font-serif text-4xl">{s.name}</h2><p className="mt-3 text-mute">{s.blurb}</p></div>
            <ul className="space-y-1 text-[#e6def5]">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            <div><p className="mono !text-accent">{priceLabel(s.priceFrom)}</p>
              <Link href={`/inquire?service=${encodeURIComponent(s.name)}`} className="btn mt-4">Inquire</Link></div>
          </div>
        ))}
      </div>
    </section>
  );
}

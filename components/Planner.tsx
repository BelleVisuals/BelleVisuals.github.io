"use client";
import { useState } from "react";
import Link from "next/link";
import { services, priceLabel } from "@/lib/site";

// Edit labels/lines freely. "service" must match a service name in lib/site.ts.
const ideas = [
  { label: "A runway or fashion show", service: "Videography and event coverage", line: "Fashion show coverage, runway photography, behind-the-scenes footage, and recap films." },
  { label: "A concert or performance", service: "Videography and event coverage", line: "Concert photography and performance coverage, plus highlight films." },
  { label: "An event", service: "Photography", line: "Event photography and videography that captures the moments people will want to share." },
  { label: "Content for my brand", service: "Content creation", line: "Social content, product photo and video, and brand storytelling." },
  { label: "Portraits", service: "Photography", line: "Portrait and editorial photography." },
  { label: "Creative advice", service: "Creative consulting", line: "One-on-one guidance on content strategy, portfolios, and visual direction." },
];

export default function Planner() {
  const [i, setI] = useState(0);
  const idea = ideas[i];
  const price = priceLabel(services.find((s) => s.name === idea.service)?.priceFrom);
  return (
    <section aria-labelledby="planner-h" className="px-5 py-16 md:px-12 md:py-24">
      <h2 id="planner-h" className="font-serif text-5xl md:text-7xl">What are you <em>making?</em></h2>
      <div role="group" aria-label="Choose your project" className="mt-8 flex flex-wrap gap-3">
        {ideas.map((x, n) => (
          <button key={x.label} aria-pressed={n === i} onClick={() => setI(n)}
            className={`min-h-[48px] rounded-full border px-6 text-base transition-all md:text-lg ${n === i ? "border-white bg-white text-ink" : "border-white/40 hover:bg-white/10"}`}>{x.label}</button>
        ))}
      </div>
      <div aria-live="polite" className="mt-8 grid gap-8 rounded-[2.5rem] border border-white/30 bg-white/5 p-8 md:grid-cols-[1fr_auto] md:items-center md:rounded-[4rem] md:p-14">
        <div>
          <p className="mono">Best fit · {idea.service}</p>
          <p className="mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">{idea.line}</p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="text-sm font-bold">{price}</p>
          <Link href={`/inquire?service=${encodeURIComponent(idea.service)}`} className="btn btn-pri">Start this project →</Link>
        </div>
      </div>
    </section>
  );
}

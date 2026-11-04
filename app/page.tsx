import { Suspense } from "react";
import Link from "next/link";
import { getPublished } from "@/lib/projects";
import { services, priceLabel, site } from "@/lib/site";
import ProjectIndex from "@/components/ProjectIndex";
import HeroVideo from "@/components/HeroVideo";
import Marquee from "@/components/Marquee";
import Planner from "@/components/Planner";

export default function Home() {
  const projects = getPublished();
  const imgs = projects.flatMap((p) => [p.cover, ...p.media.flatMap((m) => (m.type === "photo" ? [m.src] : []))]).filter((x): x is string => !!x);
  const moments: (string | null)[] = imgs.length ? imgs : Array(7).fill(null);
  return (
    <>
      <section className="relative isolate -mt-[76px] flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-40 md:-mt-[92px] md:px-12 md:pb-14">
        <HeroVideo />
        <h1 className="font-serif text-[18vw] font-normal leading-[.85] tracking-tight md:text-[10.5vw]">
          <span className="block">Belle</span><span className="block pl-[10vw] italic">Visuals</span>
        </h1>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xl font-bold italic md:text-3xl">Your vision, thoughtfully captured.</p>
            <p className="mt-2 text-base md:text-lg">Photography, videography, and creative media for brands, events, and people with a story to tell.</p>
          </div>
          <div className="flex flex-wrap gap-3"><Link href="/#work" className="btn btn-pri">Explore the Work</Link><Link href="/inquire" className="btn">Start a Project</Link></div>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.name}><Link href={`/inquire?service=${encodeURIComponent(s.name)}`} className="inline-flex min-h-[40px] items-center rounded-full border border-white/40 bg-ink/30 px-4 text-sm backdrop-blur transition-colors hover:bg-white hover:text-ink">{s.name}</Link></li>
          ))}
        </ul>
      </section>

      <Planner />

      <Suspense><ProjectIndex projects={projects} /></Suspense>

      <section aria-label="Moments" className="pb-20">
        <p className="mono mb-6 px-5 md:px-12">Moments</p>
        <Marquee duration={70}>
          {moments.map((src, i) => src
            ? <img key={src + i} src={src} alt="" loading="lazy" className="h-72 w-56 shrink-0 rounded-[2rem] object-cover md:h-96 md:w-72" />
            : <div key={i} className="flex h-72 w-56 shrink-0 items-center justify-center rounded-[2rem] border border-white/30 bg-[#3d2e61] text-center md:h-96 md:w-72"><span className="mono">Photo placeholder</span></div>)}
        </Marquee>
      </section>

      <section className="px-5 pb-20 md:px-12">
        <h2 className="mb-10 font-serif text-5xl md:text-7xl">Work with <em>me</em></h2>
        <div className="grid gap-4 md:grid-cols-4">
          {services.map((s) => (
            <Link key={s.name} href={`/inquire?service=${encodeURIComponent(s.name)}`} className="flex flex-col rounded-[2.5rem] bg-white p-7 text-ink transition-transform hover:-translate-y-2">
              <h3 className="font-serif text-3xl underline underline-offset-4">{s.name}</h3>
              <p className="mt-4 text-sm leading-relaxed">{s.blurb}</p>
              <p className="mt-auto pt-6 text-sm font-bold">{priceLabel(s.priceFrom)} →</p>
            </Link>
          ))}
        </div>
        {site.bookingUrl && <a href={site.bookingUrl} className="btn btn-pri mt-8" target="_blank" rel="noopener noreferrer">Book a consultation</a>}
      </section>

      <section className="px-5 pb-24 md:px-12">
        <div className="rounded-[3rem] bg-white px-8 py-16 text-center text-ink md:rounded-[5rem] md:py-24">
          <h2 className="font-serif text-5xl md:text-8xl">Have a story <em>to tell?</em></h2>
          <p className="mx-auto mt-4 max-w-md">Tell me about your project, event, or idea.</p>
          <Link href="/inquire" className="btn mt-8 border-ink bg-ink text-white">Start a project</Link>
        </div>
      </section>
    </>
  );
}

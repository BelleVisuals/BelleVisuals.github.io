"use client";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Project, VideoMedia } from "@/lib/projects";
import ProjectViewer from "./ProjectViewer";

const poster = (p: Project) => p.cover ?? p.media.find((m): m is VideoMedia => m.type === "video")?.poster;

function PreviewMedia({ p }: { p: Project }) {
  const img = poster(p);
  // previewVideo = a short, muted, lightweight loop (mp4). Only loaded while hovering.
  if (p.previewVideo) return <video key={p.slug} src={p.previewVideo} poster={img} muted loop autoPlay playsInline preload="none" className="h-full w-full object-cover" />;
  if (img) return <img src={img} alt="" className="h-full w-full object-cover" />;
  return <div className="flex h-full items-center justify-center p-4 text-center"><span className="mono">Preview placeholder<br />starting screen goes here</span></div>;
}

function Card({ p }: { p: Project }) {
  const films = p.media.filter((m) => m.type === "video").length;
  const photos = p.media.filter((m) => m.type === "photo").length;
  return (
    <>
      <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-[#3d2e61]">
        <PreviewMedia p={p} />
        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink">View ↗</span>
      </div>
      <div className="px-3 pb-2 pt-4">
        <p className="font-serif text-2xl leading-tight">{p.title}</p>
        <p className="mt-1 text-sm text-mute">{p.category}{p.year ? ` · ${p.year}` : ""}</p>
        {(films > 0 || photos > 0) && (
          <p className="mt-3 flex gap-2 text-xs">
            {films > 0 && <span className="rounded-full bg-white/15 px-3 py-1">{films} film{films > 1 ? "s" : ""}</span>}
            {photos > 0 && <span className="rounded-full bg-white/15 px-3 py-1">{photos} photo{photos > 1 ? "s" : ""}</span>}
          </p>
        )}
      </div>
    </>
  );
}

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const slug = useSearchParams().get("project");
  const [hover, setHover] = useState<string | null>(null);
  const [sheet, setSheet] = useState<string | null>(null);
  const tip = useRef<HTMLDivElement>(null);
  const i = projects.findIndex((p) => p.slug === slug);
  const hp = projects.find((p) => p.slug === hover);
  const sp = projects.find((p) => p.slug === sheet);

  const open = (s: string) => router.push(`/?project=${s}`, { scroll: false });   // push: Back closes viewer
  const swap = (s: string) => router.replace(`/?project=${s}`, { scroll: false });
  const close = () => router.push("/", { scroll: false });
  const place = (x: number, y: number) => {
    const el = tip.current; if (!el) return;
    const w = el.offsetWidth || 340, h = el.offsetHeight || 320;
    let px = x + 28, py = y + 28;
    if (px + w > window.innerWidth - 16) px = x - w - 28;
    if (py + h > window.innerHeight - 16) py = window.innerHeight - h - 16;
    el.style.transform = `translate3d(${Math.max(16, px)}px,${Math.max(16, py)}px,0)`;
  };

  return (
    <section id="work" aria-label="Selected work" className="scroll-mt-24 px-5 py-20 md:px-12 md:py-28">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-serif text-5xl md:text-7xl">Selected <em>work</em></h2>
        <p className="mono hidden text-right md:block">Hover a bubble to peek<br />Click to step inside</p>
      </div>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" onPointerMove={(e) => { if (e.pointerType === "mouse" && hover) place(e.clientX, e.clientY); }}>
        {projects.map((p, n) => (
          <li key={p.id}>
            <button
              aria-haspopup="dialog"
              onPointerEnter={(e) => { if (e.pointerType === "mouse") { setHover(p.slug); place(e.clientX, e.clientY); } }}
              onPointerLeave={(e) => { if (e.pointerType === "mouse") setHover(null); }}
              onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) { setHover(p.slug); const r = e.currentTarget.getBoundingClientRect(); place(r.right - 60, r.bottom - 20); } }}
              onBlur={() => setHover(null)}
              onClick={() => {
                const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
                if (canHover || sheet === p.slug) { setSheet(null); open(p.slug); } else setSheet(p.slug); // touch: first tap previews, second opens
              }}
              className="group flex w-full items-center gap-3 rounded-full border border-white/40 bg-white/5 py-3 pl-3 pr-6 text-left font-serif text-2xl transition-all duration-200 hover:scale-[1.03] hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink md:gap-4 md:py-4 md:pl-4 md:text-3xl">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 font-sans text-xs group-hover:bg-ink group-hover:text-white md:h-11 md:w-11 md:text-sm">{String(n + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1 truncate">{p.title}</span>
              <span aria-hidden="true" className="font-sans text-xl">↗</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Desktop: pop-out preview that follows the cursor */}
      <div ref={tip} aria-hidden="true" className={`pointer-events-none fixed left-0 top-0 z-40 hidden w-[340px] transition-[opacity,transform] duration-150 ease-out md:block ${hp ? "opacity-100" : "opacity-0"}`}>
        <div className={`origin-top-left rounded-[2.25rem] border border-white/30 bg-panel/95 p-3 shadow-2xl backdrop-blur transition-transform duration-200 ${hp ? "scale-100" : "scale-75"}`}>{hp && <Card p={hp} />}</div>
      </div>

      {/* Touch: bottom sheet preview */}
      {sp && (
        <div role="dialog" aria-label={`${sp.title} preview`} className="fixed inset-x-3 bottom-3 z-40 rounded-[2.25rem] border border-white/30 bg-panel p-3 shadow-2xl md:hidden">
          <Card p={sp} />
          <div className="flex gap-2 px-1 pb-1 pt-2">
            <button className="btn btn-pri flex-1" onClick={() => { setSheet(null); open(sp.slug); }}>Open project</button>
            <button className="btn" aria-label="Dismiss preview" onClick={() => setSheet(null)}>✕</button>
          </div>
        </div>
      )}

      {i >= 0 && (
        <ProjectViewer project={projects[i]} index={i} total={projects.length} onClose={close}
          onPrev={() => swap(projects[(i - 1 + projects.length) % projects.length].slug)}
          onNext={() => swap(projects[(i + 1) % projects.length].slug)} />
      )}
    </section>
  );
}

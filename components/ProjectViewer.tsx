"use client";
import { useEffect, useRef, useState } from "react";
import type { Project, PhotoMedia, VideoMedia } from "@/lib/projects";
import VideoPlayer from "./VideoPlayer";

type Props = { project: Project; index: number; total: number; onClose: () => void; onPrev: () => void; onNext: () => void };

export default function ProjectViewer({ project, index, total, onClose, onPrev, onNext }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [film, setFilm] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const films = project.media.filter((m): m is VideoMedia => m.type === "video");
  const photos = project.media.filter((m): m is PhotoMedia => m.type === "photo");
  const n = String(index + 1).padStart(2, "0"), t = String(total).padStart(2, "0");

  useEffect(() => { setFilm(0); setLb(null); }, [project.slug]);

  // Scroll lock + focus management
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = overflow; prev?.focus?.(); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { lb !== null ? setLb(null) : onClose(); return; }
      if (lb !== null) {
        if (e.key === "ArrowRight") setLb((i) => (i! + 1) % photos.length);
        if (e.key === "ArrowLeft") setLb((i) => (i! - 1 + photos.length) % photos.length);
      }
      if (e.key === "Tab" && ref.current) { // focus trap
        const els = ref.current.querySelectorAll<HTMLElement>("button,a[href],iframe,[tabindex]:not([tabindex='-1'])");
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lb, onClose, photos.length]);

  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="viewer-title" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 md:px-12">
        <span className="mono">{n} / {t}{films.length > 1 ? ` · Film ${String(film + 1).padStart(2, "0")} of ${String(films.length).padStart(2, "0")}` : ""}</span>
        <button ref={closeRef} onClick={onClose} className="btn" aria-label="Close project">Close ✕</button>
      </div>

      <div className="grid flex-1 gap-8 px-5 py-8 md:grid-cols-[1fr_380px] md:gap-12 md:px-12">
        <div className="min-w-0 space-y-8">
          {films.length > 0 && <VideoPlayer video={films[film]} />}
          {photos.length > 0 && (
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {photos.map((p, i) => (
                <li key={p.src}><button onClick={() => setLb(i)} className="block w-full" aria-label={`Enlarge: ${p.alt}`}>
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="aspect-[4/5] w-full rounded-3xl object-cover" />
                </button>{p.caption && <p className="mono mt-1">{p.caption}</p>}</li>
              ))}
            </ul>
          )}
          {!films.length && !photos.length && <div className="flex aspect-video items-center justify-center rounded-[2rem] border border-[#8472b3] bg-[#3d2e61]"><p className="mono">No media added yet</p></div>}
        </div>

        <div>
          <p className="font-serif text-2xl italic text-accent">{project.category}{project.year ? ` · ${project.year}` : ""}</p>
          <h2 id="viewer-title" className="mb-6 mt-3 text-5xl font-serif font-normal leading-[.95] md:text-7xl">{project.title}</h2>
          {project.description && <p className="mb-6 leading-relaxed text-[#e6def5]">{project.description}</p>}
          {project.fixture && <p className="mono mb-6">Development fixture — not real client work</p>}
          {(project.roles?.length || project.credits?.length) ? (
            <div className="mono border-t border-line pt-4">
              {project.roles?.map((r) => <div key={r}>{r}</div>)}
              {project.credits?.map((c) => <div key={c}>{c}</div>)}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-5 md:px-12">
        {films.length > 1 ? (
          <div role="group" aria-label="Films" className="flex flex-wrap gap-2">
            {films.map((f, i) => (
              <button key={f.title + i} aria-pressed={i === film} onClick={() => setFilm(i)} className={`btn ${i === film ? "btn-pri" : ""}`}>{f.title}</button>
            ))}
          </div>
        ) : <span />}
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={onPrev} className="btn" aria-label="Previous project">← Prev</button>
          <button onClick={onNext} className="btn" aria-label="Next project">Next →</button>
          <a href={`/inquire?ref=${project.slug}`} className="btn border-accent text-accent">Inquire about this work</a>
        </div>
      </div>

      {lb !== null && photos[lb] && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4" onClick={() => setLb(null)}>
          <img src={photos[lb].src} alt={photos[lb].alt} className="max-h-full max-w-full rounded-2xl object-contain" />
          <button className="btn absolute right-4 top-4" onClick={() => setLb(null)} aria-label="Close image">✕</button>
        </div>
      )}
    </div>
  );
}

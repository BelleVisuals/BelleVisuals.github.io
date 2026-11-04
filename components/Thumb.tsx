import type { Project } from "@/lib/projects";
export default function Thumb({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div className={`aspect-video overflow-hidden rounded-3xl border border-white/30 bg-[#3d2e61] ${className}`}>
      {p.cover ? <img src={p.cover} alt={p.coverAlt ?? ""} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        : <div className="flex h-full items-center justify-center p-2 text-center"><span className="mono">Placeholder</span></div>}
    </div>
  );
}

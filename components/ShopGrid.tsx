"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/shop";
import { site } from "@/lib/site";

const money = (n?: number) => (n != null ? `$${n}` : "Price coming soon");
const statusLabel = { available: "", "sold-out": "Sold out", preorder: "Pre-order" } as const;

function Art({ p, className }: { p: Product; className: string }) {
  if (p.image) return <img src={p.image} alt={p.imageAlt ?? p.name} loading="lazy" className={className} />;
  return <div className="absolute inset-x-8 bottom-8 top-8 flex items-center justify-center rounded-full border-2 border-dashed border-black/20 text-center text-xs font-medium uppercase tracking-widest text-black/50">Transparent<br />PNG here</div>;
}

export default function ShopGrid({ products }: { products: Product[] }) {
  const [sel, setSel] = useState<Product | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sel) return;
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
      if (e.key === "Tab" && box.current) {
        const els = box.current.querySelectorAll<HTMLElement>("button,a[href]");
        if (!els.length) return;
        const f = els[0], l = els[els.length - 1];
        if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
        else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; prev?.focus?.(); };
  }, [sel]);

  const { cashApp, zelle } = site.payments;
  return (
    <>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.id}>
            <button onClick={() => setSel(p)} className="group block w-full text-left" aria-haspopup="dialog">
              <div className="relative mt-14 aspect-[4/5] rounded-[3rem] transition-transform duration-300 group-hover:-translate-y-1 md:rounded-[4rem]" style={{ background: p.tint }}>
                <Art p={p} className="absolute bottom-6 left-1/2 h-[115%] w-[88%] max-w-none origin-bottom -translate-x-1/2 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:scale-105" />
                {statusLabel[p.status] && <span className="absolute right-5 top-5 rounded-full bg-ink px-3 py-1 text-xs font-medium text-white">{statusLabel[p.status]}</span>}
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 px-2">
                <h3 className="font-serif text-2xl md:text-3xl">{p.name}</h3>
                <span className="shrink-0 rounded-full border border-white/40 px-4 py-1 text-sm">{money(p.price)}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {sel && (
        <div role="dialog" aria-modal="true" aria-labelledby="prod-title" className="fixed inset-0 z-50 overflow-y-auto bg-ink/95 p-3 md:p-8" onClick={() => setSel(null)}>
          <div ref={box} onClick={(e) => e.stopPropagation()} className="mx-auto grid max-w-5xl gap-6 rounded-[2.5rem] border border-white/30 bg-panel p-4 md:grid-cols-2 md:p-6">
            <div className="relative min-h-[340px] rounded-[2rem] md:min-h-[480px]" style={{ background: sel.tint }}>
              <Art p={sel} className="absolute bottom-6 left-1/2 h-[88%] w-[88%] -translate-x-1/2 object-contain drop-shadow-2xl" />
            </div>
            <div className="flex flex-col p-2 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 id="prod-title" className="font-serif text-4xl leading-none md:text-6xl">{sel.name}</h2>
                <button ref={closeBtn} className="btn min-h-[44px] px-5" onClick={() => setSel(null)} aria-label="Close">✕</button>
              </div>
              <p className="mt-4 text-xl font-bold">{money(sel.price)}{statusLabel[sel.status] && <span className="mono ml-3">{statusLabel[sel.status]}</span>}</p>
              {sel.description && <p className="mt-4 leading-relaxed text-[#e6def5]">{sel.description}</p>}
              {sel.options && <p className="mono mt-4">Options: {sel.options.join(" · ")}</p>}
              {sel.fixture && <p className="mono mt-4">Development fixture</p>}
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                {sel.status !== "sold-out" && <Link href={`/inquire?service=${encodeURIComponent("Shop order")}&item=${encodeURIComponent(sel.name)}`} className="btn btn-pri">Request this item</Link>}
                {sel.buyUrl && sel.status !== "sold-out" && <a href={sel.buyUrl} target="_blank" rel="noopener noreferrer" className="btn">Buy now</a>}
              </div>
              {(cashApp || zelle) && (
                <p className="mono mt-6 normal-case tracking-normal">After you send your request: pay via {cashApp && <>Cash App <b>{cashApp}</b></>}{cashApp && zelle && " or "}{zelle && <>Zelle <b>{zelle}</b></>}. Include the item name in the note.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

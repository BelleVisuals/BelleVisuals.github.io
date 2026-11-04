"use client";
import { useEffect, useRef } from "react";
import { hero } from "@/lib/site";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause(); }, []);
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#3d2e61]">
      {hero.video ? (
        <video ref={ref} src={hero.video} poster={hero.poster || undefined} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
      ) : (
        <>
          <span className="bob absolute -left-20 top-10 h-[28rem] w-[28rem] rounded-full bg-[#8b6bd6]/50 blur-3xl" />
          <span className="bob absolute -right-10 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#e8d8ff]/30 blur-3xl" style={{ "--d": "-3s" } as React.CSSProperties} />
          <p className="mono absolute right-5 top-28 text-right">Development placeholder<br />Hero video: add /public/hero.mp4<br />then set it in lib/site.ts</p>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink" />
    </div>
  );
}

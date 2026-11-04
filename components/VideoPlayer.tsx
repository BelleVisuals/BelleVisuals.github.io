"use client";
import { useEffect, useState } from "react";
import type { VideoMedia } from "@/lib/projects";

// Single place that knows how to build a video URL. Swap provider logic here only.
function embedUrl(v: VideoMedia) {
  const h = v.hash ? `&h=${v.hash}` : "";
  return `https://player.vimeo.com/video/${v.id}?dnt=1&title=0&byline=0&portrait=0${h}`; // dnt=1: privacy; no autoplay
}
const pageUrl = (v: VideoMedia) => `https://vimeo.com/${v.id}${v.hash ? "/" + v.hash : ""}`;

export default function VideoPlayer({ video }: { video: VideoMedia }) {
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setStarted(false); setLoaded(false); setFailed(false); }, [video.id, video.title]);
  // If the iframe never reports load, show a fallback instead of an endless spinner.
  useEffect(() => {
    if (!started || loaded) return;
    const t = setTimeout(() => setFailed(true), 15000);
    return () => clearTimeout(t);
  }, [started, loaded]);

  const box = "relative aspect-video w-full overflow-hidden rounded-[2rem] border border-[#8472b3] bg-[#3d2e61]";
  if (!video.id) return <div className={`${box} flex items-center justify-center`}><p className="mono">Video not added yet · set the Vimeo ID in lib/projects.ts</p></div>;
  if (failed) return (
    <div className={`${box} flex flex-col items-center justify-center gap-3 p-4 text-center`} role="alert">
      <p className="text-sm">This film couldn’t be loaded.</p>
      <a className="btn" href={pageUrl(video)} target="_blank" rel="noopener noreferrer">Watch on Vimeo</a>
    </div>
  );
  return (
    <div className={box}>
      {video.poster && !started && <img src={video.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      {!started && (
        <button onClick={() => setStarted(true)} aria-label={`Play ${video.title}`} className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-paper text-2xl">▶</span>
        </button>
      )}
      {started && !loaded && <p className="mono absolute inset-0 flex items-center justify-center" role="status">Loading film…</p>}
      {started && <iframe src={embedUrl(video)} title={video.title} className="absolute inset-0 h-full w-full" allow="fullscreen; picture-in-picture" allowFullScreen onLoad={() => setLoaded(true)} />}
    </div>
  );
}

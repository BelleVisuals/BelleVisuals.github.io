import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublished, getBySlug } from "@/lib/projects";

export const generateStaticParams = () => getPublished().map((p) => ({ slug: p.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getBySlug(params.slug);
  if (!p) return {};
  const description = p.description ?? `${p.title} — ${p.category} by Belle Visuals.`;
  return { title: p.title, description, openGraph: { title: p.title, description, images: p.cover ? [p.cover] : [] } };
}

// Crawlable, text-based page for each project (search engines can't read video).
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getBySlug(params.slug);
  if (!p) notFound();
  return (
    <article className="px-5 py-16 md:px-12">
      <p className="font-serif text-2xl italic text-accent">{p.category}{p.year ? ` · ${p.year}` : ""}</p>
      <h1 className="my-4 text-5xl font-serif font-normal tracking-tight md:text-8xl">{p.title}</h1>
      {p.description && <p className="max-w-2xl text-lg text-[#e6def5]">{p.description}</p>}
      <div className="mt-10 flex gap-3"><Link className="btn btn-pri" href={`/?project=${p.slug}`}>Watch / view</Link><Link className="btn" href="/inquire">Inquire</Link></div>
    </article>
  );
}

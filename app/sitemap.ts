import type { MetadataRoute } from "next";
import { getPublished } from "@/lib/projects";
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [...["", "/shop", "/services", "/consulting", "/about", "/inquire"].map((p) => ({ url: base + p })),
    ...getPublished().map((p) => ({ url: `${base}/work/${p.slug}` }))];
}

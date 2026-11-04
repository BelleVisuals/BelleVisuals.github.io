import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About" };
// TODO (Phase 4): build out this page. Keep prices/descriptions in a config file, not hard-coded.
export default function Page() {
  return (
    <section className="px-5 py-16 md:px-12">
      <h1 className="text-5xl font-serif font-normal tracking-tight md:text-8xl">About</h1>
      <p className="mono mt-6">Page content to be written.</p>
      <Link href="/inquire" className="btn btn-pri mt-10">Inquire</Link>
    </section>
  );
}

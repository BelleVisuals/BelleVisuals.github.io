import Link from "next/link";
const links = [["Work", "/#work"], ["Services", "/services"], ["Consulting", "/consulting"], ["About", "/about"]] as const;
export default function Header() {
  return (
    <header className="sticky top-0 z-30 mx-3 mt-3 flex h-16 items-center justify-between rounded-full border border-white/25 bg-ink/70 px-6 backdrop-blur md:mx-8 md:mt-5 md:h-[72px] md:px-9">
      <Link href="/" className="font-serif text-2xl italic md:text-3xl">Belle Visuals</Link>
      <nav aria-label="Main" className="flex items-center gap-6 text-sm md:gap-8">
        {links.map(([l, h]) => <Link key={l} href={h} className="hidden hover:underline underline-offset-4 md:inline">{l}</Link>)}
        <details className="relative md:hidden">
          <summary className="btn min-h-[40px] cursor-pointer list-none px-5">Menu</summary>
          <div className="absolute right-0 mt-3 flex w-48 flex-col overflow-hidden rounded-3xl border border-white/25 bg-ink">
            {links.map(([l, h]) => <Link key={l} href={h} className="px-5 py-3 hover:bg-panel">{l}</Link>)}
          </div>
        </details>
        <Link href="/inquire" className="btn btn-pri min-h-[44px] px-6">Inquire</Link>
      </nav>
    </header>
  );
}

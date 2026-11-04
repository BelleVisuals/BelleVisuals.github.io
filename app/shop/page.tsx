import type { Metadata } from "next";
import { getProducts } from "@/lib/shop";
import { site } from "@/lib/site";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = { title: "Shop", description: "Shop from Belle Visuals." };

export default function Shop() {
  const hasPay = site.payments.cashApp || site.payments.zelle;
  const steps = ["Pick your piece", "Send an order request", hasPay ? "Pay with Cash App or Zelle" : "Get payment details", "Get it delivered"];
  return (
    <section className="px-5 py-14 md:px-12 md:py-20">
      <h1 className="font-serif text-7xl font-normal md:text-[10rem] md:leading-[.85]">The <em>Shop</em></h1>
      <ol className="mt-10 flex flex-wrap gap-2">
        {steps.map((s, i) => <li key={s} className="flex items-center gap-3 rounded-full border border-white/30 py-2 pl-2 pr-5 text-sm"><span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-bold text-ink">{i + 1}</span>{s}</li>)}
      </ol>
      <div className="mt-8"><ShopGrid products={getProducts()} /></div>
    </section>
  );
}

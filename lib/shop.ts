// ADD PRODUCTS HERE. Only published:true items show. Remove fixture:true items before launch.
// image = transparent PNG/WebP in public/shop/ (e.g. "/shop/hoodie.png"). Leave out for a placeholder.
export type Product = {
  id: string; slug: string; name: string;
  price?: number;                       // leave out to show "Price coming soon"
  description?: string;
  image?: string; imageAlt?: string;
  tint: string;                         // bubble color behind the cutout, e.g. "#e8d8ff"
  status: "available" | "sold-out" | "preorder";
  options?: string[];                   // e.g. ["S", "M", "L"] — shown as info; buyer types their choice in the order request
  buyUrl?: string;                      // optional: Stripe Payment Link / PayPal / etc. Shows a "Buy now" button
  order: number; published: boolean; fixture?: boolean;
};

export const products: Product[] = [
  { id: "s1", slug: "sample-01", name: "Sample item 01", tint: "#e8d8ff", status: "available", order: 1, published: true, fixture: true, description: "Placeholder. Replace with your product." },
  { id: "s2", slug: "sample-02", name: "Sample item 02", tint: "#ffd6ea", status: "preorder", order: 2, published: true, fixture: true, description: "Placeholder. Replace with your product." },
  { id: "s3", slug: "sample-03", name: "Sample item 03", tint: "#d4ecff", status: "sold-out", order: 3, published: true, fixture: true, description: "Placeholder. Replace with your product." },
];
export const getProducts = () => products.filter((p) => p.published).sort((a, b) => a.order - b.order);

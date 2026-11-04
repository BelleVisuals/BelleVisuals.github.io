# Belle Visuals

Next.js 14 · React · TypeScript · Tailwind. Static site hosted on GitHub Pages.

## Everything you edit lives in two files
- `lib/projects.ts` — projects, films, photos. 
- `lib/site.ts` — services, prices, booking link, hero video, inquiry form, email, social links.

## Deploy (GitHub Pages)
1. Organization must be named `bellevisuals`; repository must be named `bellevisuals.github.io`.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Every commit to `main` rebuilds and publishes (Actions tab shows progress; a red ✗ means the build failed and the old site stays live).

## Inquiry form
Create a free account at Formspree or Web3Forms, then fill `form` in `lib/site.ts`. Send yourself a real test inquiry afterwards.

## Add a project
Add an object to `lib/projects.ts` with `published: true`.
```ts
media: [
  { type: "video", title: "Film 01", provider: "vimeo", id: "123456789", poster: "/projects/my-slug/poster.jpg" },
  { type: "photo", src: "/projects/my-slug/01.jpg", alt: "Describe the image", caption: "Optional" },
]
```
Unlisted Vimeo videos also need `hash` (the code after the ID in the share link). Remove all `fixture: true` entries before launch.

## Files
- Photos: ~2000px long edge, JPEG/WebP, ideally under 500 KB each → `public/projects/<slug>/`
- Hover preview clip: 3–5s silent mp4, under ~2 MB → `previewVideo: "/projects/<slug>/preview.mp4"`
- Hero loop: `public/hero.mp4` + `public/hero-poster.jpg`, then set `hero` in `lib/site.ts`
- Full films live on Vimeo, not in the repo.

## Shop
Products live in `lib/shop.ts`. Images should be transparent PNG/WebP (~1200px, under ~300 KB) in `public/shop/`. Payment handles (Cash App / Zelle) live in `lib/site.ts` → `payments`; they only show when filled in. Optional per-product `buyUrl` (e.g. a Stripe Payment Link) adds a "Buy now" button. Order requests go through the same form (category "Shop order").

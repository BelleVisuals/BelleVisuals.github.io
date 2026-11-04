// EDIT THIS FILE to change services, prices and booking. No other code needs touching.
export const site = {
  // Paste a Calendly / Cal.com / Stripe payment link to show a "Book" button on Consulting. Leave "" to hide it.
  bookingUrl: "",
  // Inquiry form delivery (static site, so a form service receives submissions). Fill ONE of these:
  // Web3Forms (free): get an access key at web3forms.com (it is emailed to you) and paste it below.
  // Using Formspree instead? Set endpoint to your https://formspree.io/f/xxxx URL and leave accessKey "".
  // Until a key/endpoint is set, the form honestly says it isn't connected.
  form: { endpoint: "https://api.web3forms.com/submit", accessKey: "" },
  contactEmail: "",                 // shown in the footer if set
  socials: [] as { label: string; url: string }[],   // e.g. { label: "Instagram", url: "https://instagram.com/..." }
};

export type Service = { name: string; blurb: string; items: string[]; priceFrom?: number };

// priceFrom left empty = shows "Inquire for pricing". Add numbers when you're ready to publish starting prices.
export const services: Service[] = [
  { name: "Photography", blurb: "Event, concert, fashion and runway, portrait, editorial, and brand photography.",
    items: ["Event photography", "Concert photography", "Fashion and runway photography", "Portrait photography", "Editorial photography", "Brand and lifestyle photography"] },
  { name: "Videography and event coverage", blurb: "Films that capture the energy of a moment and give it a second life online.",
    items: ["Event videography", "Behind-the-scenes coverage", "Fashion show coverage", "Concert and performance coverage", "Event recap films", "Promotional videos", "Short-form social media videos"] },
  { name: "Content creation", blurb: "Ongoing or one-off content for brands and creators.",
    items: ["Social media content production", "Product photography and video", "Brand storytelling", "Creative campaign production", "Ongoing content production"] },
  { name: "Creative consulting", blurb: "One-on-one guidance for creators, brands and event teams.",
    items: ["Creator content strategy", "Portfolio reviews", "Visual brand guidance", "Event media strategy", "Content production planning"], priceFrom: 100 },
];

// SUGGESTED wording — edit so the two offers are clearly different.
export const consulting = [
  { name: "Creative Consultation", priceFrom: 100, blurb: "A focused one-on-one session on a single topic: a portfolio review, a content idea, or a question about your visuals." },
  { name: "Strategy Session", priceFrom: 150, blurb: "A deeper session that maps out a plan: content direction, production planning, or event media strategy." },
];

export const priceLabel = (n?: number) => (n ? `From $${n}` : "Inquire for pricing");

// Hero background video. Put a short, silent loop at public/hero.mp4 (10–15s, 1080p, under ~8 MB; export with H.264)
// and a still frame at public/hero-poster.jpg, then set: video: "/hero.mp4", poster: "/hero-poster.jpg"
export const hero = { video: "", poster: "" };

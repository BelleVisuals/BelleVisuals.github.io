// ADD PROJECTS HERE. Only entries with published:true appear publicly.
// Entries with fixture:true are development fixtures — remove them before launch.
export type VideoMedia = { type: "video"; title: string; provider: "vimeo"; id?: string; hash?: string; poster?: string };
export type PhotoMedia = { type: "photo"; src: string; alt: string; caption?: string; width?: number; height?: number };
export type Media = VideoMedia | PhotoMedia;

export type Project = {
  id: string; slug: string; title: string; category: string; year?: number;
  description?: string; roles?: string[]; credits?: string[];
  cover?: string; coverAlt?: string; previewVideo?: string;
  media: Media[]; featured?: boolean; order: number; published: boolean; fixture?: boolean;
};

export const projects: Project[] = [
  { id: "p1", slug: "primeval", title: "Primeval", category: "Category placeholder", media: [], order: 1, published: true, fixture: true },
  { id: "p2", slug: "steve-lacy", title: "Steve Lacy", category: "Concert", media: [], order: 2, published: true, fixture: true },
  { id: "p3", slug: "virginia-swim-week", title: "Virginia Swim Week", category: "Fashion · Runway", featured: true, order: 3, published: true, fixture: true,
    media: [
      { type: "video", title: "Film 01", provider: "vimeo" },
      { type: "video", title: "Film 02", provider: "vimeo" },
      { type: "video", title: "Film 03", provider: "vimeo" },
    ] },
  { id: "p4", slug: "fashion-and-runway", title: "Fashion and Runway", category: "Fashion", media: [], order: 4, published: true, fixture: true },
  { id: "p5", slug: "brand-content", title: "Brand Content", category: "Brand content", media: [], order: 5, published: true, fixture: true },
  { id: "p6", slug: "portrait-and-editorial-work", title: "Portrait and Editorial Work", category: "Portraits", media: [], order: 6, published: true, fixture: true },
];

export const getPublished = () => projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
export const getBySlug = (s: string) => getPublished().find((p) => p.slug === s);

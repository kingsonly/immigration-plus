export interface StrapiStory {
  id: number;
  title: string;
  slug: string;
  country?: string | null;
  program?: string | null;
  timeline?: string | null;
  quote?: string | null;
  story?: string | null; // HTML
  outcome?: string | null;
  category?: "skilled-worker" | "pnp" | "business" | "family" | string;
  rating?: number | null;
  image?: { url: string } | null;
  publishedOn?: string | null;
}

const BASE = (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

export async function fetchStories(limit = 12): Promise<StrapiStory[]> {
  const qs = new URLSearchParams();
  qs.set("locale", "en");
  qs.set("pagination[pageSize]", String(limit));
  const url = `${BASE}/api/success-stories?${qs.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  const arr = Array.isArray(json?.data) ? json.data : [];

  return arr.map((it: any) => ({
    id: it.id,
    title: it.title,
    slug: it.slug,
    country: it.country || null,
    program: it.program || null,
    timeline: it.timeline || null,
    quote: it.quote || null,
    story: it.story || null,
    outcome: it.outcome || null,
    category: it.category || "skilled-worker",
    rating: typeof it.rating === "number" ? it.rating : null,
    image: it.image ? { url: it.image.url } : null,
    publishedOn: it.publishedOn || null,
  }));
}

export async function fetchStoryBySlug(slug: string): Promise<StrapiStory | null> {
  const qs = new URLSearchParams();
  qs.set("filters[slug][$eq]", slug);
  qs.set("locale", "en");
  qs.set("pagination[pageSize]", "1");

  const url = `${BASE}/api/success-stories?${qs.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  const it = json?.data?.[0];
  if (!it) return null;

  return {
    id: it.id,
    title: it.title,
    slug: it.slug,
    country: it.country || null,
    program: it.program || null,
    timeline: it.timeline || null,
    quote: it.quote || null,
    story: it.story || null,
    outcome: it.outcome || null,
    category: it.category || "skilled-worker",
    rating: typeof it.rating === "number" ? it.rating : null,
    image: it.image ? { url: it.image.url } : null,
    publishedOn: it.publishedOn || null,
  };
}

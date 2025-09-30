// lib/api/resourceBySlug.ts
export type StrapiResource = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null; // HTML
  type?: "guide" | "checklist" | "calculator" | "news" | string | null;
  readTime?: string | null;
  author?: string | null;
  publishedOn?: string | null; // YYYY-MM-DD
  lastUpdated?: string | null; // ISO
  icon?: string | null;
  colorClass?: string | null;
  toolLink?: string | null;
  externalLink?: string | null;
  category?: { id: number; name?: string | null; slug?: string | null } | null;
  tags?: Array<{ id: number; name?: string | null; slug?: string | null }> | null;
};

export interface StrapiResourceResponse {
  data: StrapiResource[]; // we’ll query by slug; Strapi returns an array
  meta: any;
}

export async function fetchResourceBySlug(slug: string): Promise<StrapiResource | null> {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
  const url = new URL(`${base.replace(/\/$/, "")}/api/resources`);
  url.searchParams.set("filters[slug][$eq]", slug);
  url.searchParams.set("pagination[pageSize]", "1");
  url.searchParams.set("publicationState", "live");
  url.searchParams.set("populate", [
    "category",
    "tags",
  ].join(","));

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store", // reflect Strapi edits immediately; switch to revalidate if you prefer
  });

  if (!res.ok) return null;

  const json: StrapiResourceResponse = await res.json();
  const item = Array.isArray(json.data) ? json.data[0] : null;
  return item || null;
}

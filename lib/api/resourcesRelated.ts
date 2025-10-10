// lib/api/resourcesRelated.ts
import type { StrapiResource } from "./resourceBySlug";

export interface StrapiRelatedResponse {
  data: StrapiResource[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

/**
 * Fetch “related” resources by shared tag slugs (fallback to same category).
 * Excludes the current slug.
 */
export async function fetchRelatedResources(params: {
  currentSlug: string;
  tagSlugs?: string[];
  categorySlug?: string | null;
  limit?: number;
}): Promise<StrapiResource[]> {
  const { currentSlug, tagSlugs = [], categorySlug, limit = 6 } = params;
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
  const url = new URL(`${base.replace(/\/$/, "")}/api/resources`);

  // When we have tags, prefer tag-based relation
  if (tagSlugs.length > 0) {
    tagSlugs.forEach((s, i) => url.searchParams.set(`filters[tags][slug][$in][${i}]`, s));
  } else if (categorySlug) {
    url.searchParams.set("filters[category][slug][$eq]", categorySlug);
  }

  url.searchParams.set("filters[slug][$ne]", currentSlug);
  url.searchParams.set("pagination[pageSize]", String(limit));
  url.searchParams.set("sort", "publishedOn:desc");
  url.searchParams.set("publicationState", "live");
  url.searchParams.set("populate", ["category", "tags"].join(","));

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return [];

  const json: StrapiRelatedResponse = await res.json();
  return json.data || [];
}

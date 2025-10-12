// lib/api/resourceBySlug.ts
import { toMediaAsset } from "@/lib/strapi";

export type StrapiResource = {
  id: number;
  documentId?: string | null;
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
  featured?: boolean | null;
  downloadCount?: number | null;
  toolLink?: string | null;
  externalLink?: string | null;
  cover?: { url: string; alt: string | null } | null;
  category?: { id: number; name?: string | null; slug?: string | null } | null;
  tags?: Array<{ id: number; name?: string | null; slug?: string | null }> | null;
};

export interface StrapiResourceResponse {
  data: any[];
  meta: any;
}

export function normalizeResource(node: any): StrapiResource | null {
  if (!node) return null;

  const attrs = node.attributes || node;
  const cover = toMediaAsset(attrs.cover ?? attrs.cover?.data ?? null);

  return {
    id: node.id ?? attrs.id,
    documentId: attrs.documentId ?? null,
    title: attrs.title ?? "",
    slug: attrs.slug,
    excerpt: attrs.excerpt ?? null,
    content: attrs.content ?? null,
    type: attrs.type ?? null,
    readTime: attrs.readTime ?? null,
    author: attrs.author ?? null,
    publishedOn: attrs.publishedOn ?? null,
    lastUpdated: attrs.lastUpdated ?? null,
    icon: attrs.icon ?? null,
    colorClass: attrs.colorClass ?? null,
    featured: attrs.featured ?? null,
    downloadCount: attrs.downloadCount ?? null,
    toolLink: attrs.toolLink ?? null,
    externalLink: attrs.externalLink ?? null,
    cover: cover ? { url: cover.url, alt: cover.alt } : null,
    category:
      attrs.category?.data || attrs.category
        ? (() => {
            const c = attrs.category.data || attrs.category;
            const ca = c.attributes || c;
            return { id: c.id ?? ca.id, name: ca.name ?? null, slug: ca.slug ?? null };
          })()
        : null,
    tags: (attrs.tags?.data || attrs.tags || []).map((t: any) => {
      const ta = t.attributes || t;
      return { id: t.id ?? ta.id, name: ta.name ?? null, slug: ta.slug ?? null };
    }),
  };
}

export async function fetchResourceBySlug(slug: string): Promise<StrapiResource | null> {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
  const url = new URL(`${base.replace(/\/$/, "")}/api/resources`);
  url.searchParams.set("filters[slug][$eq]", slug);
  url.searchParams.set("pagination[pageSize]", "1");
  url.searchParams.set("publicationState", "live");
  url.searchParams.set(
    "populate",
    ["category", "tags", "cover"].join(",")
  );

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store", // reflect Strapi edits immediately; switch to revalidate if you prefer
  });

  if (!res.ok) return null;

  const json: StrapiResourceResponse = await res.json();
  const item = Array.isArray(json.data) ? json.data[0] : null;
  return normalizeResource(item);
}

// export async function fetchResourceBySlug(slug: string): Promise<StrapiResource | null> {
//   const base = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
//   const url = new URL(`${base.replace(/\/$/, "")}/api/resources/slug/${encodeURIComponent(slug)}`);
//   // url.searchParams.set("filters[slug][$eq]", slug);
//   // url.searchParams.set("pagination[pageSize]", "1");
//   // url.searchParams.set("publicationState", "live");
//   // url.searchParams.set(
//   //   "populate",
//   //   ["category", "tags", "cover"].join(",")
//   // );

//   const res = await fetch(url.toString(), {
//     method: "GET",
//     cache: "no-store", // reflect Strapi edits immediately; switch to revalidate if you prefer
//   });



//   if (!res.ok) return null;
//   const json: StrapiResourceResponse = await res.json();
//   const item = Array.isArray(json.data) ? json.data[0] : json.data;
//   return normalizeResource(item);
// }
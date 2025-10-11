// lib/api/resources.ts

import { normalizeResource } from "./resourceBySlug";

export type StrapiTag = { id: number; slug: string; name?: string | null };
export type StrapiCategory = { id: number; slug: string; name?: string | null };

export type StrapiResource = {
  id: number;
  documentId?: string | null;
  title?: string | null;
  slug: string;
  excerpt?: string | null;
  content?: string | null; // HTML
  type?: "guide" | "calculator" | "checklist" | "news" | string | null;
  readTime?: string | null;
  author?: string | null;
  publishedOn?: string | null;
  lastUpdated?: string | null;
  icon?: string | null;
  colorClass?: string | null;
  featured?: boolean | null;
  downloadCount?: number | null;
  externalLink?: string | null;
  toolLink?: string | null;
  cover?: { url: string; alt: string | null } | null;
  tags?: StrapiTag[];
  category?: StrapiCategory | null;
};

const BASE =
  (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

const AUTH_HEADER = process.env.NEXT_PUBLIC_STRAPI_TOKEN
  ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` }
  : undefined;

/** Build a safe populate query (no `deep=true`). Works on Strapi v4/v5. */
function buildPopulateQueryForResource() {
  const p = new URLSearchParams();

  // fields we need
  p.set("fields[0]", "title");
  p.set("fields[1]", "slug");
  p.set("fields[2]", "excerpt");
  p.set("fields[3]", "content");
  p.set("fields[4]", "type");
  p.set("fields[5]", "readTime");
  p.set("fields[6]", "author");
  p.set("fields[7]", "publishedOn");
  p.set("fields[8]", "lastUpdated");
  p.set("fields[9]", "icon");
  p.set("fields[10]", "colorClass");
  p.set("fields[11]", "featured");
  p.set("fields[12]", "downloadCount");
  p.set("fields[13]", "externalLink");
  p.set("fields[14]", "toolLink");

  // tags
  p.set("populate[tags][fields][0]", "slug");
  p.set("populate[tags][fields][1]", "name");

  // category
  p.set("populate[category][fields][0]", "slug");
  p.set("populate[category][fields][1]", "name");

  // cover image
  p.set("populate[cover]", "*");

  // show drafts too (preview)
  p.set("publicationState", "preview");

  // locale – set if you use i18n; otherwise omit
  p.set("locale", "en");

  return p;
}

/** Fetch a single resource by slug */
export async function fetchResourceBySlug(slug: string): Promise<StrapiResource | null> {
  try {
    const p = buildPopulateQueryForResource();
    p.set("filters[slug][$eq]", slug);
    p.set("pagination[pageSize]", "1");

    const res = await fetch(`${BASE}/api/resources?${p.toString()}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(AUTH_HEADER || {}),
      },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const item = Array.isArray(json?.data) ? json.data[0] : null;
    if (!item) return null;

    const normalized = normalizeResource(item);
    if (!normalized) return null;

    return {
      id: normalized.id,
      documentId: normalized.documentId ?? null,
      title: normalized.title,
      slug: normalized.slug,
      excerpt: normalized.excerpt ?? null,
      content: normalized.content ?? null,
      type: normalized.type ?? null,
      readTime: normalized.readTime ?? null,
      author: normalized.author ?? null,
      publishedOn: normalized.publishedOn ?? null,
      lastUpdated: normalized.lastUpdated ?? null,
      icon: normalized.icon ?? null,
      colorClass: normalized.colorClass ?? null,
      featured: normalized.featured ?? null,
      downloadCount: normalized.downloadCount ?? null,
      externalLink: normalized.externalLink ?? null,
      toolLink: normalized.toolLink ?? null,
      cover: normalized.cover ?? null,
      tags: (normalized.tags || []).map((t) => ({
        id: t.id,
        slug: t.slug,
        name: t.name ?? null,
      })),
      category: normalized.category
        ? {
            id: normalized.category.id,
            slug: normalized.category.slug ?? null,
            name: normalized.category.name ?? null,
          }
        : null,
    };
  } catch {
    return null;
  }
}

/** Fetch a few related resources to show at the bottom (simple strategy by type) */
export async function fetchRelatedResources(type: string, excludeSlug: string, limit = 3): Promise<StrapiResource[]> {
  try {
    const p = buildPopulateQueryForResource();
    p.set("filters[type][$eq]", type);
    p.set("filters[slug][$ne]", excludeSlug);
    p.set("pagination[pageSize]", String(limit));
    p.set("sort[0]", "publishedOn:desc");

    const res = await fetch(`${BASE}/api/resources?${p.toString()}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(AUTH_HEADER || {}),
      },
    });

    if (!res.ok) return [];
    const json = await res.json();
    const arr: any[] = json?.data || [];
    return arr
      .map((item) => normalizeResource(item))
      .filter(Boolean)
      .map((normalized) => ({
        id: normalized!.id,
        documentId: normalized!.documentId ?? null,
        title: normalized!.title,
        slug: normalized!.slug,
        excerpt: normalized!.excerpt ?? null,
        content: normalized!.content ?? null,
        type: normalized!.type ?? null,
        readTime: normalized!.readTime ?? null,
        author: normalized!.author ?? null,
        publishedOn: normalized!.publishedOn ?? null,
        lastUpdated: normalized!.lastUpdated ?? null,
        icon: normalized!.icon ?? null,
        colorClass: normalized!.colorClass ?? null,
        featured: normalized!.featured ?? null,
        downloadCount: normalized!.downloadCount ?? null,
        externalLink: normalized!.externalLink ?? null,
        toolLink: normalized!.toolLink ?? null,
        cover: normalized!.cover ?? null,
        tags: (normalized!.tags || []).map((t) => ({
          id: t.id,
          slug: t.slug,
          name: t.name ?? null,
        })),
        category: normalized!.category
          ? {
              id: normalized!.category.id,
              slug: normalized!.category.slug ?? null,
              name: normalized!.category.name ?? null,
            }
          : null,
      }));
  } catch {
    return [];
  }
}

// lib/api/resourceLists.ts

import { normalizeResource } from "./resourceBySlug";

export type StrapiTag = { id: number; slug: string; name?: string | null };
export type StrapiCategory = { id: number; slug: string; name?: string | null };

export type StrapiResource = {
  id: number;
  title?: string | null;
  slug: string;
  excerpt?: string | null;
  type?: "guide" | "calculator" | "checklist" | "news" | string | null;
  readTime?: string | null;
  author?: string | null;
  publishedOn?: string | null;
  lastUpdated?: string | null;
  tags?: StrapiTag[];
  category?: StrapiCategory | null;
  cover?: { url: string; alt: string | null } | null;
};

const BASE =
  (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

const AUTH_HEADER = process.env.NEXT_PUBLIC_STRAPI_TOKEN
  ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` }
  : undefined;

function basePopulate() {
  const p = new URLSearchParams();

  // Resource fields
  p.set("fields[0]", "title");
  p.set("fields[1]", "slug");
  p.set("fields[2]", "excerpt");
  p.set("fields[3]", "type");
  p.set("fields[4]", "readTime");
  p.set("fields[5]", "author");
  p.set("fields[6]", "publishedOn");
  p.set("fields[7]", "lastUpdated");

  // tags
  p.set("populate[tags][fields][0]", "slug");
  p.set("populate[tags][fields][1]", "name");

  // category
  p.set("populate[category][fields][0]", "slug");
  p.set("populate[category][fields][1]", "name");

  // cover image
  p.set("populate[cover]", "*");

  // preview + locale
  p.set("publicationState", "preview");
  p.set("locale", "en");

  // order newest first
  p.set("sort[0]", "publishedOn:desc");

  return p;
}

export async function fetchResourcesByCategorySlug(slug: string, pageSize = 24) {
  const p = basePopulate();
  p.set("filters[category][slug][$eq]", slug);
  p.set("pagination[pageSize]", String(pageSize));

  const res = await fetch(`${BASE}/api/resources?${p.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(AUTH_HEADER || {}),
    },
  });
  if (!res.ok) return { items: [], category: null as StrapiCategory | null };

  const json = await res.json();
  const items: any[] = json?.data || [];

  const normalized = items.map((it) => normalizeResource(it)).filter(Boolean);

  // Best-effort: try to read category from the first item
  let category: StrapiCategory | null = null;
  const first = normalized[0] as ReturnType<typeof normalizeResource> | undefined;
  if (first?.category) {
    category = {
      id: first.category.id,
      slug: first.category.slug ?? "",
      name: first.category.name ?? null,
    };
  }

  const parsed: StrapiResource[] = (normalized as NonNullable<ReturnType<typeof normalizeResource>>[]).map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt ?? null,
    type: r.type ?? null,
    readTime: r.readTime ?? null,
    author: r.author ?? null,
    publishedOn: r.publishedOn ?? null,
    lastUpdated: r.lastUpdated ?? null,
    cover: r.cover ?? null,
    tags: (r.tags || []).map((t) => ({
      id: t.id,
      slug: t.slug,
      name: t.name ?? null,
    })),
    category: r.category
      ? { id: r.category.id, slug: r.category.slug ?? "", name: r.category.name ?? null }
      : null,
  }));

  return { items: parsed, category };
}

export async function fetchResourcesByTagSlug(slug: string, pageSize = 24) {
  const p = basePopulate();
  p.set("filters[tags][slug][$eq]", slug);
  p.set("pagination[pageSize]", String(pageSize));

  const res = await fetch(`${BASE}/api/resources?${p.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(AUTH_HEADER || {}),
    },
  });
  if (!res.ok) return { items: [], tag: null as StrapiTag | null };

  const json = await res.json();
  const items: any[] = json?.data || [];

  const normalized = items.map((it) => normalizeResource(it)).filter(Boolean);

  // Best-effort: read tag from first item’s tags
  let tag: StrapiTag | null = null;
  for (const entry of normalized as NonNullable<ReturnType<typeof normalizeResource>>[]) {
    const found = (entry.tags || []).find((t) => t.slug === slug);
    if (found) {
      tag = { id: found.id, slug: found.slug, name: found.name ?? null };
      break;
    }
  }

  const parsed: StrapiResource[] = (normalized as NonNullable<ReturnType<typeof normalizeResource>>[]).map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt ?? null,
    type: r.type ?? null,
    readTime: r.readTime ?? null,
    author: r.author ?? null,
    publishedOn: r.publishedOn ?? null,
    lastUpdated: r.lastUpdated ?? null,
    cover: r.cover ?? null,
    tags: (r.tags || []).map((t) => ({
      id: t.id,
      slug: t.slug,
      name: t.name ?? null,
    })),
    category: r.category
      ? { id: r.category.id, slug: r.category.slug ?? "", name: r.category.name ?? null }
      : null,
  }));

  return { items: parsed, tag };
}

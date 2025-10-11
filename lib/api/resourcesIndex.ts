// lib/api/resourcesIndex.ts

import { normalizeResource } from "./resourceBySlug";

export type ApiTag = { id: number; slug: string; name?: string | null };
export type ApiCategory = { id: number; slug: string; name?: string | null };

export type ApiResource = {
  id: number;
  slug: string;
  title?: string | null;
  excerpt?: string | null;
  type?: "guide" | "calculator" | "checklist" | "news" | string | null;
  readTime?: string | null;
  author?: string | null;
  publishedOn?: string | null;
  lastUpdated?: string | null;
  tags?: ApiTag[];
  category?: ApiCategory | null;
  cover?: { url: string; alt: string | null } | null;
};

export type IndexFetchParams = {
  q?: string | null;
  category?: string | null; // category slug
  tag?: string | null;      // tag slug
  page?: number | null;     // 1-based
  pageSize?: number | null; // default 24
};

export type IndexResponse = {
  items: ApiResource[];
  pagination: { page: number; pageSize: number; pageCount: number; total: number };
  categories: ApiCategory[]; // for filters
  tags: ApiTag[];            // for filters
};

const BASE =
  (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

const AUTH_HEADER = process.env.NEXT_PUBLIC_STRAPI_TOKEN
  ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` }
  : undefined;

function basePopulate() {
  const p = new URLSearchParams();

  // fields on resource
  p.set("fields[0]", "title");
  p.set("fields[1]", "slug");
  p.set("fields[2]", "excerpt");
  p.set("fields[3]", "type");
  p.set("fields[4]", "readTime");
  p.set("fields[5]", "author");
  p.set("fields[6]", "publishedOn");
  p.set("fields[7]", "lastUpdated");

  // relations
  p.set("populate[tags][fields][0]", "slug");
  p.set("populate[tags][fields][1]", "name");
  p.set("populate[category][fields][0]", "slug");
  p.set("populate[category][fields][1]", "name");

  // cover image
  p.set("populate[cover]", "*");

  // preview + locale
  p.set("publicationState", "preview");
  p.set("locale", "en");

  // newest first
  p.set("sort[0]", "publishedOn:desc");
  p.set("sort[1]", "lastUpdated:desc");

  return p;
}

function parseResources(json: any): { items: ApiResource[]; pagination: IndexResponse["pagination"] } {
  const list: any[] = json?.data || [];
  const meta = json?.meta?.pagination || { page: 1, pageSize: list.length, pageCount: 1, total: list.length };

  const normalized = list.map((node) => normalizeResource(node)).filter(Boolean) as NonNullable<ReturnType<
    typeof normalizeResource
  >>[];

  const items: ApiResource[] = normalized.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
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

  return { items, pagination: meta };
}

async function fetchCategories(): Promise<ApiCategory[]> {
  const p = new URLSearchParams();
  p.set("fields[0]", "slug");
  p.set("fields[1]", "name");
  p.set("publicationState", "preview");
  p.set("locale", "en");
  p.set("pagination[pageSize]", "100");

  const res = await fetch(`${BASE}/api/resource-categories?${p.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(AUTH_HEADER || {}) },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const list: any[] = json?.data || [];
  return list.map((c) => {
    const a = c.attributes || c;
    return { id: c.id ?? a.id, slug: a.slug, name: a.name ?? null };
  });
}

async function fetchTags(): Promise<ApiTag[]> {
  const p = new URLSearchParams();
  p.set("fields[0]", "slug");
  p.set("fields[1]", "name");
  p.set("publicationState", "preview");
  p.set("locale", "en");
  p.set("pagination[pageSize]", "100");

  const res = await fetch(`${BASE}/api/resource-tags?${p.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(AUTH_HEADER || {}) },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const list: any[] = json?.data || [];
  return list.map((t) => {
    const a = t.attributes || t;
    return { id: t.id ?? a.id, slug: a.slug, name: a.name ?? null };
  });
}

export async function fetchResourcesIndex(params: IndexFetchParams): Promise<IndexResponse> {
  const p = basePopulate();

  // pagination
  p.set("pagination[page]", String(params.page && params.page > 0 ? params.page : 1));
  p.set("pagination[pageSize]", String(params.pageSize && params.pageSize > 0 ? params.pageSize : 24));

  // filters
  if (params.q && params.q.trim()) {
    const q = params.q.trim();
    // title OR excerpt contains (case-insensitive)
    p.set("filters[$or][0][title][$containsi]", q);
    p.set("filters[$or][1][excerpt][$containsi]", q);
  }
  if (params.category && params.category.trim()) {
    p.set("filters[category][slug][$eq]", params.category.trim());
  }
  if (params.tag && params.tag.trim()) {
    p.set("filters[tags][slug][$eq]", params.tag.trim());
  }

  const res = await fetch(`${BASE}/api/resources?${p.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(AUTH_HEADER || {}) },
  });

  let items: ApiResource[] = [];
  let pagination: IndexResponse["pagination"] = { page: 1, pageSize: 24, pageCount: 1, total: 0 };
  if (res.ok) {
    const json = await res.json();
    const parsed = parseResources(json);
    items = parsed.items;
    pagination = parsed.pagination;
  }

  // Fetch filter data in parallel
  const [categories, tags] = await Promise.all([fetchCategories(), fetchTags()]);

  return { items, pagination, categories, tags };
}

// lib/api/resourceLists.ts

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

  // Best-effort: try to read category from the first item
  let category: StrapiCategory | null = null;
  if (items[0]?.attributes?.category?.data) {
    const c = items[0].attributes.category.data;
    category = { id: c.id, slug: c.attributes.slug, name: c.attributes.name ?? null };
  } else if (items[0]?.category) {
    const c = items[0].category;
    category = { id: c.id, slug: c.slug, name: c.name ?? null };
  }

  const parsed: StrapiResource[] = items.map((it) => {
    const a = it.attributes || it;
    return {
      id: it.id ?? a.id,
      title: a.title ?? null,
      slug: a.slug,
      excerpt: a.excerpt ?? null,
      type: a.type ?? null,
      readTime: a.readTime ?? null,
      author: a.author ?? null,
      publishedOn: a.publishedOn ?? null,
      lastUpdated: a.lastUpdated ?? null,
      tags: (a.tags?.data || a.tags || []).map((t: any) => {
        const ta = t.attributes || t;
        return { id: t.id ?? ta.id, slug: ta.slug, name: ta.name ?? null };
      }),
      category:
        a.category?.data || a.category
          ? (() => {
              const c = a.category.data || a.category;
              const ca = c.attributes || c;
              return { id: c.id ?? ca.id, slug: ca.slug, name: ca.name ?? null };
            })()
          : null,
    };
  });

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

  // Best-effort: read tag from first item’s tags
  let tag: StrapiTag | null = null;
  for (const it of items) {
    const a = it.attributes || it;
    const tags = a.tags?.data || a.tags || [];
    const found = tags.find((t: any) => (t.attributes || t).slug === slug);
    if (found) {
      const ta = found.attributes || found;
      tag = { id: found.id ?? ta.id, slug: ta.slug, name: ta.name ?? null };
      break;
    }
  }

  const parsed: StrapiResource[] = items.map((it) => {
    const a = it.attributes || it;
    return {
      id: it.id ?? a.id,
      title: a.title ?? null,
      slug: a.slug,
      excerpt: a.excerpt ?? null,
      type: a.type ?? null,
      readTime: a.readTime ?? null,
      author: a.author ?? null,
      publishedOn: a.publishedOn ?? null,
      lastUpdated: a.lastUpdated ?? null,
      tags: (a.tags?.data || a.tags || []).map((t: any) => {
        const ta = t.attributes || t;
        return { id: t.id ?? ta.id, slug: ta.slug, name: ta.name ?? null };
      }),
      category:
        a.category?.data || a.category
          ? (() => {
              const c = a.category.data || a.category;
              const ca = c.attributes || c;
              return { id: c.id ?? ca.id, slug: ca.slug, name: ca.name ?? null };
            })()
          : null,
    };
  });

  return { items: parsed, tag };
}

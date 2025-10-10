// lib/api/resources.ts

export type StrapiTag = { id: number; slug: string; name?: string | null };
export type StrapiCategory = { id: number; slug: string; name?: string | null };

export type StrapiResource = {
  id: number;
  documentId?: string;
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

    // Strapi v4/v5 may wrap attributes; your API looked unwrapped already. Handle both.
    const attributes = item.attributes || item;
    return {
      id: item.id ?? attributes.id,
      documentId: attributes.documentId,
      title: attributes.title ?? null,
      slug: attributes.slug,
      excerpt: attributes.excerpt ?? null,
      content: attributes.content ?? null,
      type: attributes.type ?? null,
      readTime: attributes.readTime ?? null,
      author: attributes.author ?? null,
      publishedOn: attributes.publishedOn ?? null,
      lastUpdated: attributes.lastUpdated ?? null,
      icon: attributes.icon ?? null,
      colorClass: attributes.colorClass ?? null,
      featured: attributes.featured ?? null,
      downloadCount: attributes.downloadCount ?? null,
      externalLink: attributes.externalLink ?? null,
      toolLink: attributes.toolLink ?? null,
      tags: (attributes.tags?.data || attributes.tags || []).map((t: any) => {
        const a = t.attributes || t;
        return { id: t.id ?? a.id, slug: a.slug, name: a.name ?? null };
      }),
      category: attributes.category
        ? (() => {
            const c = attributes.category.data || attributes.category;
            if (!c) return null;
            const a = c.attributes || c;
            return { id: c.id ?? a.id, slug: a.slug, name: a.name ?? null };
          })()
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
    return arr.map((item) => {
      const attributes = item.attributes || item;
      return {
        id: item.id ?? attributes.id,
        documentId: attributes.documentId,
        title: attributes.title ?? null,
        slug: attributes.slug,
        excerpt: attributes.excerpt ?? null,
        content: attributes.content ?? null,
        type: attributes.type ?? null,
        readTime: attributes.readTime ?? null,
        author: attributes.author ?? null,
        publishedOn: attributes.publishedOn ?? null,
        lastUpdated: attributes.lastUpdated ?? null,
        icon: attributes.icon ?? null,
        colorClass: attributes.colorClass ?? null,
        featured: attributes.featured ?? null,
        downloadCount: attributes.downloadCount ?? null,
        externalLink: attributes.externalLink ?? null,
        toolLink: attributes.toolLink ?? null,
        tags: (attributes.tags?.data || attributes.tags || []).map((t: any) => {
          const a = t.attributes || t;
          return { id: t.id ?? a.id, slug: a.slug, name: a.name ?? null };
        }),
        category: attributes.category
          ? (() => {
              const c = attributes.category.data || attributes.category;
              if (!c) return null;
              const a = c.attributes || c;
              return { id: c.id ?? a.id, slug: a.slug, name: a.name ?? null };
            })()
          : null,
      };
    });
  } catch {
    return [];
  }
}

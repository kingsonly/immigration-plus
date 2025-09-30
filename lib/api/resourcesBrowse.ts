// lib/api/resourcesBrowse.ts

export type ResourcesListQuery = {
  q: string;
  category: string; // "all" or category slug
  type: string;     // optional
  page: number;     // 1-based
  pageSize: number;
};

export type StrapiResource = {
  id: number;
  slug: string;
  title?: string;
  excerpt?: string | null;
  readTime?: string | null;
  author?: string | null;
  publishedOn?: string | null;
  lastUpdated?: string | null;
  type?: string | null;
  category?: { id: number; name?: string; slug?: string } | null;
  tags?: Array<{ id: number; name?: string; slug?: string }> | null;
};

export type StrapiListResponse = {
  data: Array<StrapiResource>;
  meta: {
    pagination: { page: number; pageSize: number; pageCount: number; total: number };
  };
};

export async function fetchResourcesList(query: ResourcesListQuery): Promise<StrapiListResponse | null> {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
  const u = new URL(`${base.replace(/\/$/, "")}/api/resources`);

  // populate only what we need (avoid "deep")
  u.searchParams.set("populate[tags]", "1");
  u.searchParams.set("populate[category]", "1");

  // filters
  if (query.q) {
    // OR title contains OR excerpt contains
    u.searchParams.set("filters[$or][0][title][$containsi]", query.q);
    u.searchParams.set("filters[$or][1][excerpt][$containsi]", query.q);
  }
  if (query.category && query.category !== "all") {
    u.searchParams.set("filters[category][slug][$eq]", query.category);
  }
  if (query.type) {
    u.searchParams.set("filters[type][$eq]", query.type);
  }

  // pagination
  u.searchParams.set("pagination[page]", String(query.page));
  u.searchParams.set("pagination[pageSize]", String(query.pageSize));

  // sort newest first
  u.searchParams.set("sort", "publishedOn:desc");

  try {
    const res = await fetch(u.toString(), {
      method: "GET",
      cache: "no-store", // always fresh; adjust as desired
      headers: {
        // Add token if collection is NOT public
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) return null;
    return (await res.json()) as StrapiListResponse;
  } catch {
    return null;
  }
}

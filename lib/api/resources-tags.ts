// lib/api/resources-tags.ts
import { fetchJSON } from "@/lib/strapi";

type StrapiList<T> = { data: Array<{ id: number; attributes?: T } & T> };

function normalizeResource(node: any) {
  const a = node.attributes ?? node;
  return {
    id: node.id,
    title: a.title ?? "",
    slug: a.slug ?? "",
    excerpt: a.excerpt ?? "",
    type: a.type ?? "guide",
    readTime: a.readTime ?? "",
    author: a.author ?? "",
    publishedOn: a.publishedOn ?? null,
  };
}

export async function getAllTagSlugs(locale = "en") {
  const p = new URLSearchParams();
  p.set("fields[0]", "slug");
  p.set("pagination[pageSize]", "100");
  p.set("locale", locale);
  p.set("publicationState", "preview");

  const url = `/api/resource-tags?${p.toString()}`;
  try {
    const json = await fetchJSON<StrapiList<{ slug: string }>>(url);
    return (json.data || []).map((n) => (n.attributes?.slug ?? n.slug)).filter(Boolean);
  } catch (e: any) {
    const msg = String(e?.message || "");
    if (msg.includes("publicationState")) {
      const p2 = new URLSearchParams(p.toString());
      p2.delete("publicationState");
      const json = await fetchJSON<StrapiList<{ slug: string }>>(`/api/resource-tags?${p2.toString()}`);
      return (json.data || []).map((n) => (n.attributes?.slug ?? n.slug)).filter(Boolean);
    }
    throw e;
  }
}

export async function getResourcesByTagSlug(slug: string, locale = "en", pageSize = 24) {
  const p = new URLSearchParams();

  // filter by tag.slug
  p.set("filters[tags][slug][$eq]", slug);

  // fields
  p.set("fields[0]", "title");
  p.set("fields[1]", "slug");
  p.set("fields[2]", "excerpt");
  p.set("fields[3]", "type");
  p.set("fields[4]", "readTime");
  p.set("fields[5]", "author");
  p.set("fields[6]", "publishedOn");

  // tags (safe)
  p.set("populate[tags][fields][0]", "name");
  p.set("populate[tags][fields][1]", "slug");

  // category (safe)
  p.set("populate[category][fields][0]", "name");
  p.set("populate[category][fields][1]", "slug");

  p.set("sort[0]", "updatedAt:desc");
  p.set("pagination[pageSize]", String(pageSize));
  p.set("locale", locale);
  p.set("publicationState", "preview");

  const url = `/api/resources?${p.toString()}`;
  try {
    const json = await fetchJSON<StrapiList<any>>(url);
    return (json.data || []).map(normalizeResource);
  } catch (e: any) {
    const msg = String(e?.message || "");
    if (msg.includes("publicationState")) {
      const p2 = new URLSearchParams(p.toString());
      p2.delete("publicationState");
      const json = await fetchJSON<StrapiList<any>>(`/api/resources?${p2.toString()}`);
      return (json.data || []).map(normalizeResource);
    }
    throw e;
  }
}

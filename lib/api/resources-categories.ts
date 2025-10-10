// lib/api/resources-categories.ts
import { fetchJSON } from "@/lib/strapi";

type StrapiList<T> = { data: Array<{ id: number; attributes?: T } & T> };
type Category = { id: number; name: string; slug: string };
type Resource = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  type: string;
  readTime?: string;
  author?: string;
  publishedOn?: string;
};

function normalizeCategory(node: any): Category {
  const a = node.attributes ?? node;
  return { id: node.id, name: a.name ?? "", slug: a.slug ?? "" };
}

function normalizeResource(node: any): Resource {
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

export async function getAllCategorySlugs(locale = "en") {
  const p = new URLSearchParams();
  p.set("fields[0]", "slug");
  p.set("pagination[pageSize]", "100");
  p.set("locale", locale);
  // prefer preview but gracefully fall back if forbidden
  p.set("publicationState", "preview");

  const url = `/api/resource-categories?${p.toString()}`;
  try {
    const json = await fetchJSON<StrapiList<{ slug: string }>>(url);
    return (json.data || []).map((n) => (n.attributes?.slug ?? n.slug)).filter(Boolean);
  } catch (e: any) {
    const msg = String(e?.message || "");
    if (msg.includes("publicationState")) {
      const p2 = new URLSearchParams(p.toString());
      p2.delete("publicationState");
      const json = await fetchJSON<StrapiList<{ slug: string }>>(`/api/resource-categories?${p2.toString()}`);
      return (json.data || []).map((n) => (n.attributes?.slug ?? n.slug)).filter(Boolean);
    }
    throw e;
  }
}

export async function getCategoryBySlug(slug: string, locale = "en") {
  const p = new URLSearchParams();
  p.set("filters[slug][$eq]", slug);
  p.set("fields[0]", "name");
  p.set("fields[1]", "slug");
  p.set("pagination[pageSize]", "1");
  p.set("locale", locale);
  p.set("publicationState", "preview");

  const url = `/api/resource-categories?${p.toString()}`;
  try {
    const json = await fetchJSON<StrapiList<any>>(url);
    const node = json?.data?.[0];
    return node ? normalizeCategory(node) : null;
  } catch (e: any) {
    const msg = String(e?.message || "");
    if (msg.includes("publicationState")) {
      const p2 = new URLSearchParams(p.toString());
      p2.delete("publicationState");
      const json = await fetchJSON<StrapiList<any>>(`/api/resource-categories?${p2.toString()}`);
      const node = json?.data?.[0];
      return node ? normalizeCategory(node) : null;
    }
    throw e;
  }
}

export async function getResourcesByCategorySlug(slug: string, locale = "en", pageSize = 24) {
  const p = new URLSearchParams();

  // join by category slug without pulling localizations
  p.set("filters[category][slug][$eq]", slug);

  // resource fields
  p.set("fields[0]", "title");
  p.set("fields[1]", "slug");
  p.set("fields[2]", "excerpt");
  p.set("fields[3]", "type");
  p.set("fields[4]", "readTime");
  p.set("fields[5]", "author");
  p.set("fields[6]", "publishedOn");

  // tags (safe fields)
  p.set("populate[tags][fields][0]", "name");
  p.set("populate[tags][fields][1]", "slug");

  // category (safe fields)
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

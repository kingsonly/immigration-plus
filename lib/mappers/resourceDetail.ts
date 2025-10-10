// lib/mappers/resourceDetail.ts
import type { StrapiResource } from "@/lib/api/resourceBySlug";

function formatDateISO(iso?: string | null) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return iso || "";
  }
}

export type ResourceDetailProps = {
  title: string;
  slug: string;
  excerpt: string;
  contentHTML: string;
  type: string; // guide | checklist | calculator | news | …
  readTime: string;
  author: string;
  publishedLabel: string;
  updatedLabel: string;
  icon?: string | null;
  colorClass?: string | null;
  externalLink?: string | null;
  toolLink?: string | null;
  category?: { slug?: string | null; name?: string | null } | null;
  tags: Array<{ slug: string; name: string }>;
};

export function adaptResourceDetail(api: StrapiResource | null): ResourceDetailProps | null {
  if (!api) return null;
  return {
    title: api.title || "",
    slug: api.slug || "",
    excerpt: api.excerpt || "",
    contentHTML: api.content || "",
    type: api.type || "guide",
    readTime: api.readTime || "",
    author: api.author || "",
    publishedLabel: formatDateISO(api.publishedOn || api.lastUpdated),
    updatedLabel: formatDateISO(api.lastUpdated),
    icon: api.icon || null,
    colorClass: api.colorClass || null,
    externalLink: api.externalLink || null,
    toolLink: api.toolLink || null,
    category: api.category ? { slug: api.category.slug || null, name: api.category.name || "" } : null,
    tags: (api.tags || [])
      .map((t) => ({ slug: t.slug || "", name: t.name || t.slug || "" }))
      .filter((t) => t.slug),
  };
}

export type RelatedCard = {
  slug: string;
  title: string;
  summary: string;
  type: string;
  dateLabel: string;
  category: string;
  tags: string[];
};

export function adaptRelated(list: StrapiResource[]): RelatedCard[] {
  return (list || []).map((r) => ({
    slug: r.slug,
    title: r.title || "",
    summary: r.excerpt || "",
    type: r.type || "guide",
    dateLabel: formatDateISO(r.publishedOn || r.lastUpdated),
    category: r.category?.name || r.category?.slug || "",
    tags: (r.tags || []).map((t) => t?.name || t?.slug || "").filter(Boolean),
  }));
}

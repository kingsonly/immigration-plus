// lib/mappers/resource.ts
import type { StrapiResource } from "@/lib/api/resources";

export type ResourceDetailProps = {
  title: string;
  slug: string;
  excerpt: string;
  contentHTML: string; // already HTML
  type: string;
  readTime: string;
  author: string;
  publishedLabel: string;
  updatedLabel: string;
  icon?: string | null;
  colorClass?: string | null;
  featured?: boolean | null;
  downloadCount?: number | null;
  externalLink?: string | null;
  toolLink?: string | null;
  tags: Array<{ slug: string; label: string }>;
  category?: { slug: string; label: string } | null;
  related: Array<{
    title: string;
    slug: string;
    excerpt: string;
    type: string;
    readTime: string;
    dateLabel: string;
  }>;
};

const FALLBACK_DETAIL: ResourceDetailProps = {
  title: "Resource",
  slug: "resource",
  excerpt: "",
  contentHTML: "<p>Content coming soon.</p>",
  type: "guide",
  readTime: "",
  author: "",
  publishedLabel: "",
  updatedLabel: "",
  tags: [],
  category: null,
  related: [],
};

const fmt = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "2-digit" }) : "";

export function adaptResourceDetail(
  main: StrapiResource | null,
  related: StrapiResource[]
): ResourceDetailProps {
  if (!main) return FALLBACK_DETAIL;

  return {
    title: main.title || FALLBACK_DETAIL.title,
    slug: main.slug,
    excerpt: main.excerpt || "",
    contentHTML: main.content || FALLBACK_DETAIL.contentHTML,
    type: main.type || "guide",
    readTime: main.readTime || "",
    author: main.author || "",
    publishedLabel: fmt(main.publishedOn),
    updatedLabel: fmt(main.lastUpdated),
    icon: main.icon || null,
    colorClass: main.colorClass || undefined,
    featured: !!main.featured,
    downloadCount: main.downloadCount ?? undefined,
    externalLink: main.externalLink || undefined,
    toolLink: main.toolLink || undefined,
    tags: Array.isArray(main.tags)
      ? main.tags.map((t) => ({ slug: t.slug, label: t.name || t.slug })).filter((t) => !!t.slug)
      : [],
    category: main.category ? { slug: main.category.slug, label: main.category.name || main.category.slug } : null,
    related:
      (related || []).map((r) => ({
        title: r.title || "",
        slug: r.slug,
        excerpt: r.excerpt || "",
        type: r.type || "guide",
        readTime: r.readTime || "",
        dateLabel: fmt(r.publishedOn || r.lastUpdated),
      })) ?? [],
  };
}

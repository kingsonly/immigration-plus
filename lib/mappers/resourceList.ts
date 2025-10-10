// lib/mappers/resourceList.ts
import type { StrapiResource, StrapiCategory, StrapiTag } from "@/lib/api/resourceLists";

export type ResourceListItem = {
  title: string;
  slug: string;
  description: string;
  type: string;
  category: string; // category slug
  readTime: string;
  author: string;
  dateLabel: string;
  tags: string[];
};

export type ResourceListProps = {
  heading: string;
  subheading?: string;
  items: ResourceListItem[];
};

const fmt = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "2-digit" }) : "";

export function adaptCategoryList(
  raw: { items: StrapiResource[]; category: StrapiCategory | null },
  fallbackHeading = "Resources"
): ResourceListProps {
  const heading = raw.category?.name || raw.category?.slug || fallbackHeading;
  const items: ResourceListItem[] = (raw.items || []).map((r) => ({
    title: r.title || "",
    slug: r.slug,
    description: r.excerpt || "",
    type: r.type || "guide",
    category: r.category?.slug || "guides",
    readTime: r.readTime || "",
    author: r.author || "",
    dateLabel: fmt(r.publishedOn || r.lastUpdated),
    tags: Array.isArray(r.tags) ? r.tags.map((t) => t.name || t.slug).filter(Boolean) : [],
  }));
  return { heading: `Category: ${heading}`, subheading: `${items.length} item(s)`, items };
}

export function adaptTagList(
  raw: { items: StrapiResource[]; tag: StrapiTag | null },
  fallbackHeading = "Tag"
): ResourceListProps {
  const heading = raw.tag?.name || raw.tag?.slug || fallbackHeading;
  const items: ResourceListItem[] = (raw.items || []).map((r) => ({
    title: r.title || "",
    slug: r.slug,
    description: r.excerpt || "",
    type: r.type || "guide",
    category: r.category?.slug || "guides",
    readTime: r.readTime || "",
    author: r.author || "",
    dateLabel: fmt(r.publishedOn || r.lastUpdated),
    tags: Array.isArray(r.tags) ? r.tags.map((t) => t.name || t.slug).filter(Boolean) : [],
  }));
  return { heading: `Tag: ${heading}`, subheading: `${items.length} item(s)`, items };
}

// lib/mappers/resourcesIndex.ts
import type { ApiResource, ApiCategory, ApiTag } from "@/lib/api/resourcesIndex";

export type IndexItem = {
  title: string;
  slug: string;
  description: string;
  type: string;
  category: string;
  readTime: string;
  author: string;
  dateLabel: string;
  tags: string[];
};

export type IndexProps = {
  q: string;
  category?: string | null;
  tag?: string | null;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  items: IndexItem[];
  categoryOptions: { value: string; label: string }[];
  tagOptions: { value: string; label: string }[];
};

const fmt = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "2-digit" }) : "";

export function adaptResourcesIndex(
  raw: { items: ApiResource[]; pagination: { page: number; pageSize: number; pageCount: number; total: number }; categories: ApiCategory[]; tags: ApiTag[] },
  qs: { q?: string | null; category?: string | null; tag?: string | null; page?: number | null; pageSize?: number | null }
): IndexProps {
  const items: IndexItem[] = (raw.items || []).map((r) => ({
    title: r.title || "",
    slug: r.slug,
    description: r.excerpt || "",
    type: r.type || "guide",
    category: r.category?.slug || "guides",
    readTime: r.readTime || "",
    author: r.author || "",
    dateLabel: fmt(r.publishedOn || r.lastUpdated),
    tags: (r.tags || []).map((t) => t.name || t.slug).filter(Boolean),
  }));

  const categoryOptions = [{ value: "", label: "All categories" }].concat(
    (raw.categories || []).map((c) => ({ value: c.slug, label: c.name || c.slug }))
  );

  const tagOptions = [{ value: "", label: "All tags" }].concat(
    (raw.tags || []).map((t) => ({ value: t.slug, label: t.name || t.slug }))
  );

  return {
    q: qs.q || "",
    category: qs.category || "",
    tag: qs.tag || "",
    page: raw.pagination.page,
    pageSize: raw.pagination.pageSize,
    pageCount: raw.pagination.pageCount,
    total: raw.pagination.total,
    items,
    categoryOptions,
    tagOptions,
  };
}

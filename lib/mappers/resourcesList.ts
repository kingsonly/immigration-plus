// lib/mappers/resourcesList.ts
import { normalizeResource } from "@/lib/api/resourceBySlug";
import type { StrapiListResponse } from "@/lib/api/resourcesBrowse";

const TYPE_ANY = "__any";

function formatDateISO(iso?: string | null) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return iso || "";
  }
}

export function adaptResourcesList(
  api: StrapiListResponse | null,
  query: { q: string; category: string; type: string; page: number; pageSize: number }
) {
  const items =
    api?.data
      ?.map((raw) => normalizeResource(raw))
      .filter(Boolean)
      .map((r) => ({
        slug: r!.slug,
        title: r!.title || "",
        description: r!.excerpt || "",
        type: r!.type || "guide",
        category: r!.category?.slug || "guides",
        readTime: r!.readTime || "—",
        author: r!.author || "—",
        dateLabel: formatDateISO(r!.publishedOn || r!.lastUpdated),
        tags: (r!.tags || []).map((t) => t?.name || t?.slug || "").filter(Boolean),
        coverUrl: r!.cover?.url || null,
        coverAlt: r!.cover?.alt || null,
      })) ?? [];

  const counts = items.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  const categoryOptions = [
    { id: "all",         label: "All Resources",      count: api?.meta.pagination.total ?? items.length },
    { id: "guides",      label: "Immigration Guides", count: counts["guides"] || 0 },
    { id: "checklists",  label: "Checklists",         count: counts["checklists"] || 0 },
    { id: "calculators", label: "Calculators",        count: counts["calculators"] || 0 },
    { id: "news",        label: "Immigration News",   count: counts["news"] || 0 },
  ];

  // IMPORTANT: never use "" here; Radix Select requires non-empty value
  const typeOptions = [
    { id: TYPE_ANY,    label: "Any type" },
    { id: "guide",     label: "Guides" },
    { id: "checklist", label: "Checklists" },
    { id: "calculator",label: "Calculators" },
    { id: "news",      label: "News" },
  ];

  return {
    q: query.q,
    category: query.category || "all",
    type: query.type && query.type.length > 0 ? query.type : TYPE_ANY,
    page: query.page,
    pageSize: query.pageSize,

    categoryOptions,
    typeOptions,

    items,
    pagination: api?.meta.pagination ?? {
      page: query.page,
      pageSize: query.pageSize,
      pageCount: 1,
      total: items.length,
    },
  };
}

// lib/api/tools.ts
export type StrapiTool = {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  colorClass?: string | null;
  link?: string | null; // optional external/internal link
};

function flattenTool(entry: any): StrapiTool | null {
  if (!entry) return null;
  // Handle both Strapi shapes: flat (custom controller) or attributes-based
  const a = entry.attributes || entry;
  return {
    id: entry.id ?? a.id,
    documentId: a.documentId,
    name: a.name,
    slug: a.slug,
    description: a.description ?? null,
    icon: a.icon ?? null,
    colorClass: a.colorClass ?? null,
    link: a.link ?? null,
  };
}

export async function fetchTools(): Promise<StrapiTool[] | null> {
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_URL ||
    "http://localhost:1337";
  const url = `${base.replace(/\/$/, "")}/api/tools?locale=en&pagination[pageSize]=100`;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        // Add Authorization header here if your Tools API is protected
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    const items = data.map(flattenTool).filter(Boolean) as StrapiTool[];
    return items;
  } catch {
    return null;
  }
}

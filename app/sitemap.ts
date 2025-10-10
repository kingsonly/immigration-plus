import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getStoryUrls(): Promise<MetadataRoute.Sitemap> {
  try {
    const base = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
    const url = `${base.replace(/\/$/, "")}/api/success-stories?pagination[pageSize]=100&fields[0]=slug`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const items = Array.isArray(json?.data) ? json.data : [];
    return items
      .map((it: any) => it?.slug)
      .filter(Boolean)
      .map((slug: string) => ({
        url: `${SITE}/success-stories/${slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getStoryUrls();

  const baseRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/success-stories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 }
  ];

  return [...baseRoutes, ...stories];
}

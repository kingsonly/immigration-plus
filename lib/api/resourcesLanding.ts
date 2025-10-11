// lib/api/resourcesLanding.ts
type StrapiBlock =
  | {
      __component: "blocks.hero";
      id: number;
      icon?: string | null;
      Title?: string | null;
      Subtitle?: string | null;
      description?: string | null; // HTML
      ctas?: Array<{
        id: number;
        label: string;
        url: string;
        variant?: string | null;
        icon?: string | null;
        newTab?: boolean | null;
        emailSubject?: string | null;
      }>;
      image?: any;
    }
  | {
      __component: "blocks.heading-section";
      id: number;
      Heading?: string | null;
      description?: string | null;
      icon?: string | null;
      image?: any;
      cta?: {
        id: number;
        label: string;
        url: string;
        variant?: string | null;
        icon?: string | null;
        newTab?: boolean | null;
        emailSubject?: string | null;
      } | null;
    }
  | {
      __component: "blocks.featured-strip";
      id: number;
      Heading?: string | null;
      description?: string | null;
      items?: Array<{
        id: number;
        title: string;
        slug: string;
        icon?: string | null;
        colorClass?: string | null;
      }>;
    }
  | {
      __component: "blocks.tools-grid";
      id: number;
      Heading?: string | null;
      description?: string | null;
      limit?: number | null;
      tools?: Array<
        | number
        | {
            id: number;
            name?: string;
            slug?: string;
            description?: string | null;
            icon?: string | null;
            colorClass?: string | null;
            link?: string | null;
          }
      >;
    }
  | {
      __component: "blocks.news-list";
      id: number;
      Heading?: string | null;
      description?: string | null;
      limit?: number | null;
      mode?: "auto" | "manual";
      resources?: Array<
        | number
        | {
            id: number;
            slug: string;
            title?: string;
            excerpt?: string | null;
            readTime?: string | null;
            author?: string | null;
            publishedOn?: string | null;
            lastUpdated?: string | null;
            icon?: string | null;
            colorClass?: string | null;
            type?: string | null;
            category?: any;
            tags?: any[];
            cover?: any;
          }
      >;
    }
  | {
      __component: "blocks.resource-grid";
      id: number;
      Heading?: string | null;
      description?: string | null;
      mode?: "auto" | "manual";
      limit?: number | null;
      typeFilter?: string | null;
      category?: any;
      resources?: Array<
        | number
        | {
            id: number;
            slug: string;
            title?: string;
            excerpt?: string | null;
            readTime?: string | null;
            author?: string | null;
            publishedOn?: string | null;
            lastUpdated?: string | null;
            icon?: string | null;
            colorClass?: string | null;
            type?: string | null;
            category?: any;
            tags?: any[];
            cover?: any;
          }
      >;
    }
  | {
      __component: "blocks.newsletter-cta";
      id: number;
      Heading?: string | null;
      description?: string | null;
      cta?: {
        id: number;
        label: string;
        url: string;
        variant?: string | null;
        icon?: string | null;
      } | null;
    };

export interface StrapiResourcesLanding {
  id: number;
  documentId: string;
  title?: string | null;
  description?: string | null;
  blocks?: StrapiBlock[];
}

export async function fetchResourcesLanding(): Promise<StrapiResourcesLanding | null> {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
  const url = `${base.replace(/\/$/, "")}/api/resources-landing?locale=en&populate=deep`;
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store", // reflect changes immediately; you can switch to revalidate if you prefer
      headers: {
        // If your single type is public, you can omit Authorization.
        // If it's protected, set NEXT_PUBLIC_STRAPI_TOKEN and uncomment below.
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) {
      // Return null to trigger fallbacks
      return null;
    }

    const json = await res.json();
    const data = json?.data;
    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      title: data.title ?? null,
      description: data.description ?? null,
      blocks: Array.isArray(data.blocks) ? (data.blocks as StrapiBlock[]) : [],
    };
  } catch {
    return null;
  }
}

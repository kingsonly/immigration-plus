// lib/api/contactLanding.ts
export type StrapiContactBlock =
  | {
      __component: "blocks.hero";
      id: number;
      icon?: string | null;
      Title?: string | null;
      Subtitle?: string | null;
      description?: string | null; // plain text or HTML
      ctas?: Array<{
        id: number;
        label: string;
        url: string;
        variant?: string | null;
        icon?: string | null;
      }>;
      image?: any;
    }
  | {
      __component: "blocks.contact-card";
      id: number;
      title: string;            // "Phone" | "Email" | "Office" | "Business Hours"
      icon?: string | null;     // Lucide icon name
      details?: string[];       // lines to show
      colorClass?: string | null;
    }
  | {
      __component: "blocks.contact-form";
      id: number;
      services?: string[];
      successMessage?: string | null;
      redirectUrl?: string | null;
    }
  | {
      __component: "blocks.calendly";
      id: number;
      title?: string | null;
      description?: string | null;
      calendlyLink?: string | null;
      expectations?: string[] | null;
    }
  | {
      __component: "blocks.faq";
      id: number;
      question: string;
      answer: string;
    };

export interface StrapiContactLanding {
  id: number;
  documentId: string;
  blocks?: StrapiContactBlock[];
}

export async function fetchContactLanding(): Promise<StrapiContactLanding | null> {
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_URL ||
    "http://localhost:1337";

  const url = `${base.replace(/\/$/, "")}/api/contact-landing?locale=en`; // controller should populate blocks already

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        // If protected, expose your token via NEXT_PUBLIC_STRAPI_TOKEN and uncomment:
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data;
    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      blocks: Array.isArray(data.blocks) ? (data.blocks as StrapiContactBlock[]) : [],
    };
  } catch {
    return null;
  }
}

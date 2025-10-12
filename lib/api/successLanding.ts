// lib/api/successLanding.ts

export type SuccessBlock =
  | {
      __component: "blocks.hero";
      id: number;
      Title?: string | null;
      Subtitle?: string | null;
      description?: string | null; // HTML
      ctas?: Array<{
        id: number;
        label: string;
        url: string;
        variant?: string | null;
        icon?: string | null;
      }>;
    }
  | {
      __component: "blocks.stats-grid";
      id: number;
      items?: Array<{
        id: number;
        number?: string | null;
        label?: string | null;
        icon?: string | null; // lucide icon name
      }>;
    }
  | {
      __component: "blocks.story-carousel";
      id: number;
      Heading?: string | null;
      description?: string | null;
      categories?: Array<{ id: number; key: string; label: string }>;
      stories?: Array<
        | number
        | {
            id: number;
            name?: string | null;
            slug: string;
            country?: string | null;
            program?: string | null;
            timeline?: string | null;
            image?: any;
            quote?: string | null;
            story?: string | null;
            outcome?: string | null;
            category?: string | null;
            rating?: number | null;
          }
      >;
    }
  | {
      __component: "blocks.testimonials-grid";
      id: number;
      Heading?: string | null;
      description?: string | null;
      testimonials?: Array<{
        id: number;
        name?: string | null;
        country?: string | null;
        program?: string | null;
        rating?: number | null;
        text?: string | null;
      }>;
    }
  | {
      __component: "blocks.video-grid";
      id: number;
      Heading?: string | null;
      description?: string | null;
      videos?: Array<{
        id: number;
        name?: string | null;
        country?: string | null;
        program?: string | null;
        thumbnailUrl?: string | null;
        thumbnail?: any;
        url?: string | null;
        videoUrl?: string | null;
        videoFile?: any;
      }>;
    }
  | {
      __component: "blocks.cta-section";
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

export interface StrapiSuccessLanding {
  id: number;
  documentId?: string;
  title?: string | null;
  description?: string | null;
  blocks?: SuccessBlock[];
}

export async function fetchSuccessLanding(): Promise<StrapiSuccessLanding | null> {
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_URL ||
    "http://localhost:1337";

  const cleanedBase = base.replace(/\/$/, "");

  // Let the custom controller do the population.
  // Keep publicationState=preview if you want drafts on frontend.
  const url = `${cleanedBase}/api/success-landing?locale=en&publicationState=preview`;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      // headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data;
    if (!data) return null;

    const blocks = Array.isArray(data.blocks) ? data.blocks : [];

    // While the backend exposes a slug endpoint, some hosted environments strip media
    // relations from the success-landing payload. Fill in the gap by re-fetching the
    // affected success stories directly so carousel items can show their images.
    const slugsNeedingImages = new Set<string>();
    for (const block of blocks) {
      if (!block || block.__component !== "blocks.story-carousel") continue;
      const stories = Array.isArray(block.stories) ? block.stories : [];
      for (const raw of stories) {
        if (!raw || typeof raw === "number") continue;
        const media = raw.image?.data?.attributes || raw.image;
        if (!media?.url && raw.slug) {
          slugsNeedingImages.add(raw.slug);
        }
      }
    }

    if (slugsNeedingImages.size) {
      try {
        const storyUrl = new URL(`${cleanedBase}/api/success-stories`);
        storyUrl.searchParams.set("populate", "image");
        storyUrl.searchParams.set("publicationState", "preview");

        const storyRes = await fetch(storyUrl.toString(), { method: "GET", cache: "no-store" });
        if (storyRes.ok) {
          const storyJson = await storyRes.json();
          const list = Array.isArray(storyJson.data) ? storyJson.data : [];
          const slugToImage = new Map<string, any>();

          for (const node of list) {
            const attrs = node?.attributes || node;
            if (!attrs?.slug || !attrs.image) continue;
            if (slugsNeedingImages.has(attrs.slug)) {
              slugToImage.set(attrs.slug, attrs.image);
            }
          }

          if (slugToImage.size) {
            for (const block of blocks) {
              if (!block || block.__component !== "blocks.story-carousel") continue;
              const stories = Array.isArray(block.stories) ? block.stories : [];
              block.stories = stories.map((raw: any) => {
                if (!raw || typeof raw === "number" || !raw.slug) return raw;
                const media = raw.image?.data?.attributes || raw.image;
                if (!media?.url && slugToImage.has(raw.slug)) {
                  raw.image = slugToImage.get(raw.slug);
                }
                return raw;
              });
            }
          }
        }
      } catch {
        // ignore enrichment failures; carousel will fall back to placeholders
      }
    }

    return {
      id: data.id,
      documentId: data.documentId,
      title: data.title ?? null,
      description: data.description ?? null,
      blocks: Array.isArray(data.blocks) ? (data.blocks as SuccessBlock[]) : [],
    };
  } catch {
    return null;
  }
}

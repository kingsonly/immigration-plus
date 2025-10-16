import HomePage from "@/components/page/HomePage";
import { fetchJSON } from "@/lib/strapi";

type StrapiSingleResponse<T> = {
  data?:
    | {
        id: number;
        attributes?: T;
      }
    | null;
};

async function fetchHomepage() {
  const params = new URLSearchParams();
  params.set("populate", "deep");
  if (process.env.NEXT_PUBLIC_STRAPI_PREVIEW === "1") params.set("publicationState", "preview");
  if (process.env.NEXT_PUBLIC_STRAPI_LOCALE) params.set("locale", process.env.NEXT_PUBLIC_STRAPI_LOCALE);

  try {
    const json = await fetchJSON<StrapiSingleResponse<Record<string, any>>>(`/api/homepage?${params.toString()}`, {
      cache: "no-store"

    });

    const node = json?.data;
    if (!node) return null;

    if (node.attributes) {
      return {
        id: node.id,
        ...node.attributes,
      };
    }

    return node as any;
  } catch (error) {
    console.error("Failed to fetch homepage from Strapi:", error);
    return null;
  }
}

export default async function LandingPage() {
  const entry = await fetchHomepage();
  return <HomePage entry={entry} />;
}

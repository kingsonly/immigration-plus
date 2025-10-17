import HomePage from "@/components/page/HomePage";

async function fetchHomepage() {
  const base = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
  const params = new URLSearchParams();
  params.set("populate", "deep");
  if (process.env.NEXT_PUBLIC_STRAPI_PREVIEW === "1") params.set("publicationState", "preview");
  if (process.env.NEXT_PUBLIC_STRAPI_LOCALE) params.set("locale", process.env.NEXT_PUBLIC_STRAPI_LOCALE);

  const res = await fetch(`${base}/api/homepage?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch homepage");
  const json = await res.json();

  const entry = json?.data?.attributes ? { id: json.data.id, ...json.data.attributes } : json?.data ?? null;

  return entry ?? null;
}

export default async function LandingPage() {
  const entry = await fetchHomepage();
  return <HomePage entry={entry} />;
}

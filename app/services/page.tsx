import ServicesPage from "@/components/page/ServicesPage"

export const dynamic = "force-dynamic"       // never cache the page
export const revalidate = 0                  // belt + suspenders

async function fetchServicesLanding() {
  const base = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "")
  const params = new URLSearchParams()
  if (process.env.NEXT_PUBLIC_STRAPI_PREVIEW === "1") params.set("publicationState", "preview")
  if (process.env.NEXT_PUBLIC_STRAPI_LOCALE) params.set("locale", process.env.NEXT_PUBLIC_STRAPI_LOCALE)

  // ✅ use the plural default route
  const res = await fetch(`${base}/api/services-landing${params.size ? `?${params.toString()}` : ""}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error("Failed to fetch services landing")
  const json = await res.json()
  const entry = Array.isArray(json?.data) ? json.data[0] : json?.data
  return entry ?? null
}

export default async function ServicePage() {
  const entry = await fetchServicesLanding()
  return <ServicesPage entry={entry} />
}

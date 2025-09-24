import ServicesPage from "@/components/page/ServicesPage"

async function fetchServicesLanding() {
  const base = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "")

  const res = await fetch(`${base}/api/services-landing`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch services landing")
  const json = await res.json()
  const data = Array.isArray(json?.data) ? json.data[0] : json?.data
  return data ?? null
}

export default async function ServicePage() {
  const entry = await fetchServicesLanding()
  return <ServicesPage entry={entry} />
}

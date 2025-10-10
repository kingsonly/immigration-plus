// app/resources/page.tsx
import ResourcesLandingClient from "@/components/page/ResourcesLandingClient";
import { fetchResourcesLanding } from "@/lib/api/resourcesLanding";
import { adaptResourcesLanding } from "@/lib/mappers/resourcesLanding";

export const dynamic = "force-dynamic"; // always reflect latest (you can change to revalidate if you prefer)

export default async function ResourcesPage() {
  // 1) fetch from Strapi (server-side)
  const api = await fetchResourcesLanding();

  // 2) adapt to component props (with built-in fallbacks)
  const props = adaptResourcesLanding(api);

  // 3) render client component with a stable, already-formatted payload
  return <ResourcesLandingClient initialData={props} />;
}

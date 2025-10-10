// app/contact/page.tsx
import ContactLandingClient from "@/components/page/ContactLandingClient";
import { fetchContactLanding } from "@/lib/api/contactLanding";
import { adaptContactLanding } from "@/lib/mappers/contactLanding";

export const dynamic = "force-dynamic"; // reflect latest Strapi edits immediately

export default async function ContactPage() {
  // 1) server-side fetch from Strapi
  const api = await fetchContactLanding();

  // 2) adapt to stable client props with fallbacks
  const props = adaptContactLanding(api);

  // 3) render client with SSR-stable props (no hydration drift)
  return <ContactLandingClient initialData={props} />;
}

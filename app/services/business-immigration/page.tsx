
import BusinessImmigrationPageComponent from "@/components/page/BusinessImmigrationPageComponent"
import { getServiceBySlug } from "@/lib/strapi"

export default async function BusinessImmigrationPage() {
    const service = await getServiceBySlug("business-immigration")
  const blocks = (service as any)?.blocks || (service as any)?.attributes?.blocks || []
  const businessBlock = blocks.find((b: any) => b.__component === "blocks.business-immigration")
  return <BusinessImmigrationPageComponent value={businessBlock || {}} />
}




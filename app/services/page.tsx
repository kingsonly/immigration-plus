import ServicesPage from "@/components/page/ServicesPage"
import { servicesPageModule } from "@/lib/contentfulModules/servicesPageModule"

export default async function ServicePage() {
  const value = await servicesPageModule()

  return <ServicesPage value={value} />
}
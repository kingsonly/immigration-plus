
import BusinessImmigrationPageComponent from "@/components/page/BusinessImmigrationPageComponent"
import { fetchBusinessImmigrationPage } from "@/lib/contentfulModules/fetchBusinessImmigrationPage"

export default async function BusinessImmigrationPage() {
  const value = await fetchBusinessImmigrationPage()

  return <BusinessImmigrationPageComponent value={value} />
}
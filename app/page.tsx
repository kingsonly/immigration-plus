import { homepageModule } from "@/lib/contentfulModules/homePageModeule"
import HomePage from "@/components/page/HomePage"

export default async function LandingPage() {
  const { props: homepageContent } = await homepageModule()

  return <HomePage homepageContentProps={homepageContent} />
}

import contentfulClient from "../contentful";

export async function fetchAboutusPage() {
    const hero = await contentfulClient.getEntries({ content_type: 'heroSection' })
    const story = await contentfulClient.getEntries({ content_type: 'ourStorySection' })
    const values = await contentfulClient.getEntries({ content_type: 'valueCard' })
    const team = await contentfulClient.getEntries({ content_type: 'teamMember' })
    const achievements = await contentfulClient.getEntries({ content_type: 'achievement' })
    const features = await contentfulClient.getEntries({ content_type: 'featureItem' })
    const cta = await contentfulClient.getEntries({ content_type: 'ctaSection' })
    return {
        hero: hero.items[0],
        story: story.items[0],
        values: values.items,
        team: team.items,
        achievements: achievements.items,
        features: features.items,
        cta: cta.items[0]
    }
}

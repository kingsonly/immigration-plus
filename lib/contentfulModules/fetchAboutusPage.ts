import contentfulClient from "../contentful";

async function safeGetEntries(contentType: string) {
    try {
        const response = await contentfulClient.getEntries({ content_type: contentType });
        return response.items;
    } catch (error) {
        console.warn(`Failed to fetch content_type: ${contentType}`, error);
        return null;
    }
}

export async function fetchAboutusPage() {
    const [hero, story, values, team, achievements, features, cta] = await Promise.all([
        safeGetEntries("heroSection"),
        safeGetEntries("ourStorySection"),
        safeGetEntries("valueCard"),
        safeGetEntries("teamMember"),
        safeGetEntries("achievement"),
        safeGetEntries("featureItem"),
        safeGetEntries("ctaSection"),
    ]);

    return {
        hero: hero?.[0] || null,
        story: story?.[0] || null,
        values: values || [],
        team: team || [],
        achievements: achievements || [],
        features: features || [],
        cta: cta?.[0] || null,
    };
}

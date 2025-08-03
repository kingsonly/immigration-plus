import contentfulClient from "../contentful";

export async function homepageModule() {
    const heroRes = await contentfulClient.getEntries({ content_type: 'homepageHero' });
    const servicesRes = await contentfulClient.getEntries({ content_type: 'homepageService' });
    // const statsRes = await contentfulClient.getEntries({ content_type: 'homepageStat' });
    const ctaRes = await contentfulClient.getEntries({ content_type: 'homepageCta' });

    return {
        props: {
            hero: heroRes.items[0].fields,
            services: servicesRes.items.map((item) => item.fields),
            // stats: statsRes.items.map((item) => item.fields),
            cta: ctaRes.items[0].fields,
        },
        revalidate: 60,
    };
}
import contentfulClient from "../contentful";

export async function servicesPageModule() {
    const hero = await contentfulClient.getEntries({ content_type: "servicesPageHero" });
    const services = await contentfulClient.getEntries({ content_type: "serviceItem" });
    const steps = await contentfulClient.getEntries({ content_type: "processStep" });
    const features = await contentfulClient.getEntries({ content_type: "featureItem" });
    const cta = await contentfulClient.getEntries({ content_type: "servicesPageCta" });

    return {
        hero: hero.items[0]?.fields,
        // services: services.items.map((s) => s.fields),
        // steps: steps.items.map((s) => s.fields),
        // features: features.items.map((f) => f.fields),
        // cta: cta.items[0]?.fields,
    };
}

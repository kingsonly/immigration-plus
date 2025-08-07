import contentfulClient from "../contentful";

export async function fetchBusinessImmigrationPage() {
    // const [hero, programs, howItWorks, services, fees, govFees, quoteCTA, pnpOverview, streams, c11Benefits, timeline, seHighlights, seServices, postReqs, finalCTA] = await Promise.all([

    // ]);
    const hero = await contentfulClient.getEntries({ content_type: 'heroSection' })
    const programs = await contentfulClient.getEntries({ content_type: 'businessProgram' })
    const howItWorks = await contentfulClient.getEntries({ content_type: 'howItWorksStep', order: 'fields.stepNumber' })
    const services = await contentfulClient.getEntries({ content_type: 'startUpService' })
    const fees = await contentfulClient.getEntries({ content_type: 'feeCategory' })
    const govFees = await contentfulClient.getEntries({ content_type: 'governmentFee' })
    const quoteCTA = await contentfulClient.getEntries({ content_type: 'quoteCTA' })
    const pnpOverview = await contentfulClient.getEntries({ content_type: 'programOverviewTile' })
    const streams = await contentfulClient.getEntries({ content_type: 'provincialStream' })
    const c11Benefits = await contentfulClient.getEntries({ content_type: 'c11Benefit' })
    const timeline = await contentfulClient.getEntries({ content_type: 'timelineStep', order: 'fields.order' })
    //const seHighlights = await contentfulClient.getEntries({ content_type: 'selfEmployedHighlight' })
    const seServices = await contentfulClient.getEntries({ content_type: 'selfEmployedService' })
    const postReqs = await contentfulClient.getEntries({ content_type: 'postInvestmentRequirement' })
    const finalCTA = await contentfulClient.getEntries({ content_type: 'finalCTA' })

    return {
        hero: hero.items[0].fields,
        programs: programs.items.map(i => i.fields),
        howItWorks: howItWorks.items.map(i => i.fields),
        services: services.items.map(i => i.fields),
        fees: fees.items.map(i => i.fields),
        govFees: govFees.items.map(i => i.fields),
        quoteCTA: quoteCTA.items[0].fields,
        pnpOverview: pnpOverview.items.map(i => i.fields),
        streams: streams.items.map(i => i.fields),
        c11Benefits: c11Benefits.items.map(i => i.fields),
        timeline: timeline.items.map(i => i.fields),
        //seHighlights: seHighlights.items.map(i => i.fields),
        seServices: seServices.items.map(i => i.fields),
        postReqs: postReqs.items.map(i => i.fields),
        finalCTA: finalCTA.items[0].fields,
    };
}

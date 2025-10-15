import { factories } from "@strapi/strapi";

const defaultPopulate = {
  sections: {
    populate: "*",
    on: {
      "law.hero-block": {
        populate: ["background", "primaryCta", "secondaryCta"],
      },
      "law.practice-section": {
        populate: {
          practiceAreas: {
            populate: {
              services: {
                populate: ["details"],
              },
              heroImage: true,
              backgroundImage: true,
            },
          },
        },
      },
      "law.content-highlight": {
        populate: ["bullets", "image"],
      },
      "law.about-block": {
        populate: ["image", "whyItems", "values"],
      },
      "law.testimonials-section": {
        populate: ["testimonials"],
      },
      "law.contact-cta": {
        populate: ["contactPoints", "whatToExpect", "primaryCta", "secondaryCta", "formFields"],
      },
      "law.team-section": {
        populate: {
          members: {
            populate: ["photo", "details"],
          },
        },
      },
      "law.simple-cta": {
        populate: ["primaryCta", "secondaryCta"],
      },
    },
  },
  seo: {
    populate: "*",
  },
};

export default factories.createCoreController("api::law-home-page.law-home-page", () => ({
  async find(ctx) {
    const mergedQuery = {
      ...ctx.query,
      populate: ctx.query.populate ?? defaultPopulate,
    };

    const { data, meta } = await super.find({
      ...ctx,
      query: mergedQuery,
    });
    return { data, meta };
  },
}));

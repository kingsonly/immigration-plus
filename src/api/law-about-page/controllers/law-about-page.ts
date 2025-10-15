import { factories } from "@strapi/strapi";

const defaultPopulate = {
  sections: {
    populate: "*",
    on: {
      "law.hero-simple": {
        populate: ["background"],
      },
      "law.mission-section": {
        populate: ["image", "cta"],
      },
      "law.feature-grid": {
        populate: ["items"],
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

export default factories.createCoreController("api::law-about-page.law-about-page", () => ({
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

import { factories } from "@strapi/strapi";

const defaultPopulate = {
  sections: {
    populate: "*",
    on: {
      "law.hero-simple": {
        populate: ["background"],
      },
      "law.contact-info-section": {
        populate: {
          cards: {
            populate: ["lines"],
          },
        },
      },
      "law.contact-cta": {
        populate: {
          contactPoints: true,
          whatToExpect: true,
          primaryCta: true,
          secondaryCta: true,
          formFields: {
            populate: ["options"],
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

export default factories.createCoreController("api::law-contact-page.law-contact-page", () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: ctx.query.populate ?? defaultPopulate,
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: ctx.query.populate ?? defaultPopulate,
    };

    return await super.findOne(ctx);
  },
}));

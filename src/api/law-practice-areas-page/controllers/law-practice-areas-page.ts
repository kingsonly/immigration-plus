import { factories } from "@strapi/strapi";

const defaultPopulate = {
  hero: {
    populate: "*",
  },
  cta: {
    populate: "*",
  },
  practiceAreas: {
    populate: {
      services: {
        populate: {
          details: true,
        },
      },
      heroImage: true,
      backgroundImage: true,
    },
  },
  seo: {
    populate: "*",
  },
};

export default factories.createCoreController("api::law-practice-areas-page.law-practice-areas-page", () => ({
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

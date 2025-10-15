import { factories } from "@strapi/strapi";

const defaultPopulate = {
  sections: {
    populate: "*",
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

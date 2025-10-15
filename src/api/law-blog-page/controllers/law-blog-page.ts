import { factories } from "@strapi/strapi";

const defaultPopulate = {
  hero: {
    populate: "*",
  },
  posts: {
    populate: {
      heroImage: true,
    },
  },
  newsletter: {
    populate: "*",
  },
  seo: {
    populate: "*",
  },
};

export default factories.createCoreController("api::law-blog-page.law-blog-page", () => ({
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

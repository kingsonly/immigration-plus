import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::law-blog-post.law-blog-post", () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: ctx.query.populate ?? {
        heroImage: true,
      },
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: ctx.query.populate ?? {
        heroImage: true,
      },
    };

    return await super.findOne(ctx);
  },
}));

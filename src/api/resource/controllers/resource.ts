/**
 * resource controller
 */

import { factories } from "@strapi/strapi";

const defaultPopulate = {
  cover: true,
  tags: true,
  category: true,
  seo: true,
  relatedServices: {
    populate: {
      featuredImage: true,
      category: true,
    },
  },
};

export default factories.createCoreController(
  "api::resource.resource",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: defaultPopulate,
      };
      return await super.find(ctx);
    },

    async findOne(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: defaultPopulate,
      };
      return await super.findOne(ctx);
    },

    async findOneBySlug(ctx) {
      const { slug } = ctx.params;
      if (!slug) {
        return ctx.badRequest("Missing slug parameter");
      }

      ctx.query = {
        ...(ctx.query || {}),
        filters: { slug: { $eq: slug } },
        populate: defaultPopulate,
      } as any;

      const { data } = await super.find(ctx);
      const entity = Array.isArray(data) ? data[0] : data;
      if (!entity) {
        return ctx.notFound("Resource not found");
      }

      return { data: entity, meta: {} };
    },
  })
);

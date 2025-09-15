/**
 * service controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::service.service",
  ({ strapi }) => ({
    async find(ctx) {
      const populate = {
        featuredImage: true,
        documents: true,
        ogImage: true,
        category: true,
        blocks: true, // Deeply populate all blocks and their nested components
      };

      const entities = await strapi.entityService.findMany(
        "api::service.service",
        {
          populate,
        }
      );

      const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitizedEntities);
    },

    // ✅ Custom action to fetch service by slug
    async findOneBySlug(ctx) {
      const { slug } = ctx.params;

      const populate = {
        featuredImage: true,
        documents: true,
        ogImage: true,
        category: true,
        blocks: true, // Deeply populate all blocks
      };

      const entity = await strapi.db.query("api::service.service").findOne({
        where: { slug },
        populate,
      });

      if (!entity) {
        return ctx.notFound("Service not found");
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);

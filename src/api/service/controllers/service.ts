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

      const results = await strapi.entityService.findMany(
        "api::service.service",
        {
          filters: { slug },
          populate: {
            featuredImage: true,
            documents: true,
            ogImage: true,
            category: true,
            // Per Strapi v5: for dynamic zones (polymorphic), nested populate must be '*'
            blocks: "*",
          },
        }
      );

      const entity = Array.isArray(results) ? results[0] : results;

      if (!entity) {
        return ctx.notFound("Service not found");
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },

    // Update a service by slug (custom action)
    async updateBySlug(ctx) {
      const { slug } = ctx.params;
      const body = ctx.request.body?.data || ctx.request.body;

      if (!slug) return ctx.badRequest('Missing slug');
      if (!body || typeof body !== 'object') return ctx.badRequest('Missing data payload');

      // Find existing entity by slug
      const existing = await strapi.db.query("api::service.service").findOne({
        where: { slug },
      });
      if (!existing) return ctx.notFound('Service not found');

      const updated = await strapi.entityService.update("api::service.service", existing.id, {
        data: body,
      });

      const sanitized = await this.sanitizeOutput(updated, ctx);
      return this.transformResponse(sanitized);
    },
  })
);

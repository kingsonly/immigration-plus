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

      // Drive population and filtering through ctx.query so Strapi's sanitizer keeps nested relations.
      // For dynamic zones in Strapi v5, use fragment-based populate (on) to deep-populate components safely.
      ctx.query = {
        ...(ctx.query || {}),
        filters: { slug: { $eq: slug } },
        populate: {
          featuredImage: true,
          documents: true,
          ogImage: true,
          category: true,
          // Only deep-populate the business-immigration block to avoid invalid nested keys
          blocks: {
            on: {
              'blocks.business-immigration': { populate: '*' },
            },
          },
        } as any,
      } as any;

      // Use the core controller find so the whole pipeline (sanitizer/transformer) respects ctx.query
      const { data } = await super.find(ctx);
      const entity = Array.isArray(data) ? data[0] : data;
      if (!entity) return ctx.notFound("Service not found");
      // Already transformed by super.find; return single entity
      return { data: entity, meta: {} };
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

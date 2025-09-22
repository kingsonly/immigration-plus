/**
 * service controller
 */
import { factories } from "@strapi/strapi";

const getServicePopulate = () => ({
  featuredImage: true,
  documents: true,
  ogImage: true,
  category: true,
  blocks: {
    populate: { // make sure we populate at this level too
      // generic fallbacks
      image: true,
      items: true, // application-process.items
      link: true,
      ctas: true,
    },
    on: {
      'blocks.hero': {
        populate: {
          ctas: true,
          image: true,
        },
      },
      'blocks.heading-section': {
        populate: {
          cta: true,
        },
      },
      'blocks.card-grid': {
        populate: {
          // ✅ this is the important bit
          Cards: {
            populate: {
              lists: true,   // list items inside each card
              link: true,    // optional per-card button
            },
          },
          link: true,        // optional section-level button
        },
      },
      'blocks.process-steps-block': {
        populate: {
          steps: true,
        },
      },
      'blocks.services': {
        populate: {
          listItem: true,
          link: true,
        },
      },
      'blocks.application-process': {
        populate: {
          items: true,
        },
      },
      'blocks.business-immigration': { populate: '*' }, // keep if you still use it
      'blocks.comparison-grid': { populate: '*' }, // keep if you still use it
    },
  },
});


export default factories.createCoreController(
  "api::service.service",
  ({ strapi }) => ({
    async find(ctx) {
      const populate = getServicePopulate();

      const entities = await strapi.entityService.findMany(
        "api::service.service",
        {
          populate,
        }
      );

      const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitizedEntities);
    },

    async findOneBySlug(ctx) {
      const { slug } = ctx.params;

      ctx.query = {
        ...(ctx.query || {}),
        filters: { slug: { $eq: slug } },
        populate: getServicePopulate(),
      } as any;

      const { data } = await super.find(ctx);
      const entity = Array.isArray(data) ? data[0] : data;
      if (!entity) return ctx.notFound("Service not found");
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

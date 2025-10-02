// src/api/services-landing/controllers/services-landing.ts
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::services-landing.services-landing",
  ({ strapi }) => ({
    async find(ctx) {
      const locale = (ctx.query?.locale as string) || undefined;

      // Dynamic zone populate (typed loosely)
      const populate = {
        blocks: {
          on: {
            "blocks.hero": { populate: ["ctas"] },
            "blocks.card-grid": {
              populate: {
                Cards: { populate: ["lists", "link"] },
                link: true,
              },
            },
            "blocks.process-steps-block": { populate: ["steps"] },
            "blocks.heading-section": true,
            // keep if you ever use it
            "blocks.services": true,
          },
        },
      } as any; // <- TS: Strapi typing for DZ populate is too strict; casting is fine here.

      // Single types still use findMany; take the first record
      const entities = await strapi.entityService.findMany(
        "api::services-landing.services-landing",
        { populate, locale }
      );
      const entity = Array.isArray(entities) ? entities[0] : entities;

      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    },
  })
);

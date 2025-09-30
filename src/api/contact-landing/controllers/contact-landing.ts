// src/api/contact-landing/controllers/contact-landing.ts
/**
 * contact-landing controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::contact-landing.contact-landing",
  ({ strapi }) => ({
    async find(ctx) {
      // Strapi v5: for dynamic zones (polymorphic), nested populate MUST be "*".
      // TS types are over-strict here, so we cast to any.
      const params = {
        populate: {
          blocks: {
            populate: "*" as any,
          },
        },
      } as any;

      const entity = await strapi.entityService.findMany(
        "api::contact-landing.contact-landing",
        params
      );

      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    },
  })
);

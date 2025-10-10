/**
 * success-landing controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::success-landing.success-landing",
  ({ strapi }) => ({
    async find(ctx) {
      // Accept incoming query bits (locale, publicationState, etc.)
      const { locale, publicationState } = ctx.query || {};

      // IMPORTANT for v5 DZ: second-level populate must be "*"
      const populate = {
        blocks: {
          populate: "*", // allow all second-level links in polymorphic DZ
        },
      } as any;

      const entity = await strapi.entityService.findMany(
        "api::success-landing.success-landing",
        {
          populate,
          locale: typeof locale === "string" ? locale : undefined,
          publicationState:
            typeof publicationState === "string" ? publicationState : undefined,
        }
      );

      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    },
  })
);

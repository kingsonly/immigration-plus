/**
 * about controller (single type)
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::about.about", ({ strapi }) => ({
  /**
   * GET /about
   * Optional query:
   *   - ?locale=en
   *   - ?publicationState=preview|live
   */
  async find(ctx) {
    const locale = ctx.query?.locale as string | undefined;
    const publicationState: "live" | "preview" =
      ctx.query?.publicationState === "preview" ? "preview" : "live";

    const populate = {
      blocks: {
        on: {
          "blocks.hero": {
            populate: {
              ctas: true,
              image: true,
            },
          },
          "blocks.heading-section": {
            populate: {
              cta: true,
              image: true,
            },
          },
          "blocks.card-grid": {
            populate: {
              Cards: {
                populate: {
                  lists: true,
                  link: true,
                  image: true,
                },
              },
              link: true,
            },
          },
          "blocks.split-feature": {
            populate: {
              items: true,
            },
          },
        },
      },
    } as const;

    try {
      // Single types: use findMany; Strapi returns an array of length 1
      const entity = await strapi.entityService.findMany("api::about.about", {
        populate,
        locale,
        publicationState,
      });

      const sanitized = await this.sanitizeOutput(entity, ctx);
      const single = Array.isArray(sanitized) ? sanitized[0] ?? null : sanitized ?? null;

      // Return a stable 200 even if null to avoid 404s from custom logic
      ctx.status = 200;
      return this.transformResponse(single);
    } catch (error) {
      strapi.log.error("about.find error", error);
      ctx.status = 200;
      return this.transformResponse(null);
    }
  },
}));

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

    // IMPORTANT: for dynamic zones, nested populate must be "*"
    const populate = {
      blocks: {
        populate: "*", // <- This is the key fix for DZs in Strapi v5
      },
    } as any;

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

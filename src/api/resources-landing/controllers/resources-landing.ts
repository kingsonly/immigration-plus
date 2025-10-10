/**
 * resources-landing controller (safe, v4/v5 compatible)
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::resources-landing.resources-landing",
  ({ strapi }) => ({
    async find(ctx) {
      // Read params (with safe defaults)
      const locale = (ctx.query?.locale as string) || "en";

      // v5 uses `status` ('draft' | 'published'), allow both so draft changes appear
      // v4 uses `publicationState` ('live' | 'preview'); we'll try both paths safely
      const v5StatusParam: any = ctx.query?.status ?? ["draft", "published"];
      const v4PublicationState = (ctx.query?.publicationState as "live" | "preview") || "preview";

      // SAFEST populate for a dynamic zone: star under the DZ
      // This asks Strapi to populate all relations inside DZ components without needing brittle `on` rules
      const populate: any = {
        blocks: {
          populate: "*",
        },
      };

      let doc: any = null;

      // --- Try Strapi v5 "documents" API first (if available) ---
      try {
        // @ts-ignore - documents exists on v5 only
        if (typeof strapi.documents === "function") {
          // @ts-ignore
          doc = await strapi
            .documents("api::resources-landing.resources-landing")
            .findFirst({
              locale,
              status: v5StatusParam, // draft + published
              populate,
            });
        }
      } catch (e) {
        // swallow; we'll try v4 path next
        strapi.log.warn("[resources-landing] v5 documents path failed, will try v4 entityService. Error:", e);
      }

      // --- Fallback to Strapi v4 entityService (or if v5 returned null) ---
      if (!doc) {
        try {
          const result = await strapi.entityService.findMany(
            "api::resources-landing.resources-landing",
            {
              locale,
              publicationState: v4PublicationState, // preview == include drafts
              populate,
            }
          );
          doc = Array.isArray(result) ? result[0] : result;
        } catch (e) {
          strapi.log.error("[resources-landing] v4 entityService path failed:", e);
          ctx.status = 500;
          ctx.body = {
            data: null,
            error: {
              status: 500,
              name: "InternalServerError",
              message: "Internal Server Error",
            },
          };
          return;
        }
      }

      // If not created yet, return an empty payload (don’t 500)
      if (!doc) {
        return this.transformResponse({
          id: null,
          title: null,
          description: null,
          blocks: [],
        });
      }

      // Sanitize + respond
      const sanitized = await this.sanitizeOutput(doc, ctx);
      return this.transformResponse(sanitized);
    },
  })
);

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

      const populateResourceById = async (id: number) => {
        if (!id) return null;
        try {
          return await strapi.entityService.findOne("api::resource.resource", id, {
            populate: {
              cover: { populate: "*" },
              category: { populate: "*" },
              tags: { populate: "*" },
            },
          });
        } catch (err) {
          strapi.log.warn(`[resources-landing] failed to hydrate resource ${id}: ${err}`);
          return null;
        }
      };

      const wrapRelation = (entity: any) => ({
        data: {
          id: entity.id,
          attributes: entity,
        },
      });

      const hydrateResourceBlocks = async (entry: any) => {
        if (!entry || !Array.isArray(entry.blocks)) return entry;

        const hydrateEntry = async (item: any) => {
          if (typeof item === "number") return item;

          const resourceRel =
            item?.resource?.data ||
            item?.resource ||
            item?.document?.data ||
            item?.document ||
            item;

          const resourceId = resourceRel?.id;
          if (!resourceId) return item;

          const populated = await populateResourceById(resourceId);
          if (!populated) return item;

          if (item.resource) {
            item.resource = wrapRelation(populated);
          } else if (item.document) {
            item.document = wrapRelation(populated);
          } else {
            Object.assign(item, populated);
          }

          return item;
        };

        const hydratedBlocks = await Promise.all(
          entry.blocks.map(async (block: any) => {
            if (block?.__component === "blocks.resource-grid" && Array.isArray(block.resources)) {
              const enrichedResources = await Promise.all(block.resources.map(hydrateEntry));
              return { ...block, resources: enrichedResources };
            }

            if (block?.__component === "blocks.featured-strip" && Array.isArray(block.items)) {
              const enrichedItems = await Promise.all(block.items.map(hydrateEntry));
              return { ...block, items: enrichedItems };
            }

            return block;
          })
        );

        return { ...entry, blocks: hydratedBlocks };
      };

      doc = await hydrateResourceBlocks(doc);

      // Sanitize + respond
      const sanitized = await this.sanitizeOutput(doc, ctx);
      return this.transformResponse(sanitized);
    },
  })
);

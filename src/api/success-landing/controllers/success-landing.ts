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

      const populate = {
        blocks: {
          populate: "*",
          on: {
            "blocks.story-carousel": {
              populate: {
                stories: {
                  populate: {
                    image: {
                      populate: "*",
                    },
                  },
                },
              },
            },
            "blocks.hero": {
              populate: {
                image: true,
                ctas: true,
              },
            },
            "blocks.video-grid": {
              populate: {
                videos: {
                  populate: {
                    thumbnail: {
                      populate: "*",
                    },
                    videoFile: {
                      populate: "*",
                    },
                  },
                },
              },
            },
            "blocks.testimonials-grid": {
              populate: {
                testimonials: {
                  populate: {
                    avatar: {
                      populate: "*",
                    },
                  },
                },
              },
            },
          },
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

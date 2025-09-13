/**
 * services-landing controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::services-landing.services-landing",
  ({ strapi }) => ({
    async find(ctx) {
      const populate = {
        blocks: {
          populate: {
            ctas: true,
            image: true,
            listItem: true,
            link: true,
            steps: true,
          },
          on: {
            "blocks.services": {},
            "blocks.hero": {},
            "blocks.heading-section": {},
            "blocks.card-grid": {
              populate: {
                Cards: {
                  populate: {
                    link: true,
                  },
                },
              },
            },
            "blocks.process-steps-block": {
              populate: {
                Steps: true,
              },
            },
          },
        },
      };

      try {
        const entity = await strapi.entityService.findMany(
          "api::services-landing.services-landing",
          {
            populate,
          }
        );

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
      } catch (error) {
        console.error(error);
        return this.transformResponse(null);
      }
    }
  })
);

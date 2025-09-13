"use strict";
/**
 * homepage controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::homepage.homepage", ({ strapi }) => ({
    async find(ctx) {
        const populate = {
            blocks: {
                on: {
                    "blocks.hero": {
                        populate: {
                            ctas: true,
                            image: true,
                        },
                    },
                    "blocks.services": {
                        populate: {
                            listItem: true,
                            link: true,
                        },
                    },
                    "blocks.card-grid": {
                        populate: {
                            Cards: {
                                populate: {
                                    link: true,
                                },
                            },
                            link: true,
                        },
                    },
                    "blocks.heading-section": {},
                },
            },
        };
        const entity = await strapi.entityService.findMany("api::homepage.homepage", {
            populate,
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
    },
}));

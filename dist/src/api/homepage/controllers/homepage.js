"use strict";
/**
 * homepage controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::homepage.homepage", ({ strapi }) => ({
    async find(ctx) {
        var _a;
        // ✅ For dynamic zones, put `on` directly under the attribute (not under `.populate`)
        const populate = {
            blocks: {
                on: {
                    "blocks.hero": {
                        populate: {
                            ctas: true, // hero.ctas (shared.button[])
                        },
                    },
                    "blocks.card-grid": {
                        populate: {
                            Cards: {
                                populate: {
                                    lists: true, // shared.list-item[]
                                    link: true, // shared.button
                                },
                            },
                            link: true, // optional grid-level shared.button
                        },
                    },
                    "blocks.heading-section": {
                        populate: {
                            cta: true, // shared.button
                        },
                    },
                    "blocks.split-feature": {
                        populate: {
                            items: true, // shared.list-item[]
                        },
                    },
                    "blocks.services": {
                        // keep this in case you add a bespoke services block
                        populate: {
                            listItem: true,
                            link: true,
                        },
                    },
                },
            },
        };
        try {
            const entity = await strapi.entityService.findMany("api::homepage.homepage", {
                populate,
                locale: (_a = ctx.query) === null || _a === void 0 ? void 0 : _a.locale,
            });
            const sanitized = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitized);
        }
        catch (err) {
            strapi.log.error("homepage.find error", err);
            ctx.status = 404;
            return this.transformResponse(null);
        }
    },
}));

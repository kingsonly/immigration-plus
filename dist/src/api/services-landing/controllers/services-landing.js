"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/services-landing/controllers/services-landing.ts
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::services-landing.services-landing", ({ strapi }) => ({
    async find(ctx) {
        var _a;
        const locale = ((_a = ctx.query) === null || _a === void 0 ? void 0 : _a.locale) || undefined;
        // Dynamic zone populate (typed loosely)
        const populate = {
            blocks: {
                on: {
                    "blocks.hero": { populate: ["ctas"] },
                    "blocks.card-grid": {
                        populate: {
                            Cards: { populate: ["lists", "link"] },
                            link: true,
                        },
                    },
                    "blocks.process-steps-block": { populate: ["steps"] },
                    "blocks.heading-section": true,
                    // keep if you ever use it
                    "blocks.services": true,
                },
            },
        }; // <- TS: Strapi typing for DZ populate is too strict; casting is fine here.
        // Single types still use findMany; take the first record
        const entities = await strapi.entityService.findMany("api::services-landing.services-landing", { populate, locale });
        const entity = Array.isArray(entities) ? entities[0] : entities;
        const sanitized = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitized);
    },
}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/contact-landing/controllers/contact-landing.ts
/**
 * contact-landing controller
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::contact-landing.contact-landing", ({ strapi }) => ({
    async find(ctx) {
        // Strapi v5: for dynamic zones (polymorphic), nested populate MUST be "*".
        // TS types are over-strict here, so we cast to any.
        const params = {
            populate: {
                blocks: {
                    populate: "*",
                },
            },
        };
        const entity = await strapi.entityService.findMany("api::contact-landing.contact-landing", params);
        const sanitized = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitized);
    },
}));

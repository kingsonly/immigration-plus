"use strict";
/**
 * services-landing controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::services-landing.services-landing", ({ strapi }) => ({
    async find(ctx) {
        const populate = {
            blocks: true, // Deeply populate all blocks and their nested components
        };
        try {
            const entity = await strapi.entityService.findMany("api::services-landing.services-landing", {
                populate,
            });
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        }
        catch (error) {
            console.error(error);
            return this.transformResponse(null);
        }
    },
}));

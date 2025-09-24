"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * about controller (single type)
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::about.about", ({ strapi }) => ({
    /**
     * GET /about
     * Optional query:
     *   - ?locale=en
     *   - ?publicationState=preview|live
     */
    async find(ctx) {
        var _a, _b, _c;
        const locale = (_a = ctx.query) === null || _a === void 0 ? void 0 : _a.locale;
        const publicationState = ((_b = ctx.query) === null || _b === void 0 ? void 0 : _b.publicationState) === "preview" ? "preview" : "live";
        // IMPORTANT: for dynamic zones, nested populate must be "*"
        const populate = {
            blocks: {
                populate: "*", // <- This is the key fix for DZs in Strapi v5
            },
        };
        try {
            // Single types: use findMany; Strapi returns an array of length 1
            const entity = await strapi.entityService.findMany("api::about.about", {
                populate,
                locale,
                publicationState,
            });
            const sanitized = await this.sanitizeOutput(entity, ctx);
            const single = Array.isArray(sanitized) ? (_c = sanitized[0]) !== null && _c !== void 0 ? _c : null : sanitized !== null && sanitized !== void 0 ? sanitized : null;
            // Return a stable 200 even if null to avoid 404s from custom logic
            ctx.status = 200;
            return this.transformResponse(single);
        }
        catch (error) {
            strapi.log.error("about.find error", error);
            ctx.status = 200;
            return this.transformResponse(null);
        }
    },
}));

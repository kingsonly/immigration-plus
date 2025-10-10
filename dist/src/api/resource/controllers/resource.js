"use strict";
/**
 * resource controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const defaultPopulate = {
    cover: true,
    tags: true,
    category: true,
    seo: true,
    relatedServices: {
        populate: {
            featuredImage: true,
            category: true,
        },
    },
};
exports.default = strapi_1.factories.createCoreController("api::resource.resource", ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: defaultPopulate,
        };
        return await super.find(ctx);
    },
    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: defaultPopulate,
        };
        return await super.findOne(ctx);
    },
    async findOneBySlug(ctx) {
        const { slug } = ctx.params;
        if (!slug) {
            return ctx.badRequest("Missing slug parameter");
        }
        ctx.query = {
            ...(ctx.query || {}),
            filters: { slug: { $eq: slug } },
            populate: defaultPopulate,
        };
        const { data } = await super.find(ctx);
        const entity = Array.isArray(data) ? data[0] : data;
        if (!entity) {
            return ctx.notFound("Resource not found");
        }
        return { data: entity, meta: {} };
    },
}));

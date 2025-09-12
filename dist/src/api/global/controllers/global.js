"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::global.global", ({ strapi }) => ({
    async find(ctx) {
        // Always populate all fields, components, and media
        ctx.query = {
            ...ctx.query,
            populate: {
                socialLinks: true,
                Header: {
                    populate: {
                        Logo: true,
                        NavLink: { populate: { dropdown: true } },
                    },
                },
                Footer: {
                    populate: {
                        FooterLinks: { populate: { dropdown: true } },
                    },
                },
            },
        };
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
}));

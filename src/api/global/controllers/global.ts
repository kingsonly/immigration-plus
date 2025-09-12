import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::global.global",
  ({ strapi }) => ({
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
  })
);

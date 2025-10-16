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
              Logo: {
                populate: {
                  image: true,
                  dropdown: true,
                },
              },
              NavLink: {
                populate: {
                  dropdown: true,
                  image: true,
                },
              },
            },
          },
          Footer: {
            populate: {
              logo: true,
              FooterLinks: {
                populate: {
                  dropdown: true,
                  image: true,
                },
              },
              ContactDetails: true,
            },
          },
        },
      };
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },
  })
);

import { factories } from "@strapi/strapi";

const defaultPopulate = {
  logo: true,
  topContacts: true,
  socialLinks: true,
  navigation: {
    populate: ["dropdown", "image"],
  },
  footer: {
    populate: {
      logo: true,
      FooterLinks: {
        populate: ["dropdown", "image"],
      },
      ContactDetails: true,
    },
  },
  seo: {
    populate: "*",
  },
};

export default factories.createCoreController("api::law-site-setting.law-site-setting", () => ({
  async find(ctx) {
    const mergedQuery = {
      ...ctx.query,
      populate: ctx.query.populate ?? defaultPopulate,
    };

    const { data, meta } = await super.find({
      ...ctx,
      query: mergedQuery,
    });
    return { data, meta };
  },
}));

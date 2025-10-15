/**
 * law-practice-area controller
 */

import { factories } from "@strapi/strapi";

const MEDIA_POPULATE = {
  populate: {
    on: {
      "plugin::upload.file": {
        fields: ["name", "alternativeText", "caption", "width", "height", "formats", "url"],
      },
    },
  },
};

const defaultPopulate = {
  services: {
    populate: {
      details: true,
    },
  },
  heroImage: MEDIA_POPULATE,
  backgroundImage: MEDIA_POPULATE,
};

export default factories.createCoreController("api::law-practice-area.law-practice-area", () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: ctx.query.populate ?? defaultPopulate,
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: ctx.query.populate ?? defaultPopulate,
    };

    return await super.findOne(ctx);
  },
}));

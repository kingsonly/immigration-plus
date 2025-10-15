/**
 * law-practice-area controller
 */

import { factories } from "@strapi/strapi";

const defaultPopulate = {
  services: {
    populate: {
      details: true,
    },
  },
  heroImage: true,
  backgroundImage: true,
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

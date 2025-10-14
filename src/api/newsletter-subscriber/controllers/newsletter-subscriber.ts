/**
 * newsletter-subscriber controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::newsletter-subscriber.newsletter-subscriber",
  ({ strapi }) => ({
    async subscribe(ctx) {
      const { email, name, source } = ctx.request.body || {};
      if (!email || typeof email !== "string") {
        return ctx.badRequest("Email is required");
      }

      const normalizedEmail = email.trim().toLowerCase();

      const existing = await strapi.entityService.findMany(
        "api::newsletter-subscriber.newsletter-subscriber",
        {
          filters: { email: normalizedEmail },
          limit: 1,
        }
      );

      if (existing.length > 0) {
        ctx.status = 200;
        ctx.body = { status: "exists" };
        return;
      }

      const created = await strapi.entityService.create(
        "api::newsletter-subscriber.newsletter-subscriber",
        {
          data: {
            email: normalizedEmail,
            name: name ? String(name).trim() : null,
            source: source ? String(source).trim() : null,
            status: "subscribed",
            confirmed: true,
            metadata: null,
          },
        }
      );

      const sanitized = await this.sanitizeOutput(created, ctx);
      ctx.status = 201;
      ctx.body = { status: "created", data: sanitized };
    },
  })
);

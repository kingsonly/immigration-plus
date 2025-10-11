"use strict";
/**
 * resources-landing controller (safe, v4/v5 compatible)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::resources-landing.resources-landing", ({ strapi }) => ({
    async find(ctx) {
        var _a, _b, _c, _d;
        // Read params (with safe defaults)
        const locale = ((_a = ctx.query) === null || _a === void 0 ? void 0 : _a.locale) || "en";
        // v5 uses `status` ('draft' | 'published'), allow both so draft changes appear
        // v4 uses `publicationState` ('live' | 'preview'); we'll try both paths safely
        const v5StatusParam = (_c = (_b = ctx.query) === null || _b === void 0 ? void 0 : _b.status) !== null && _c !== void 0 ? _c : ["draft", "published"];
        const v4PublicationState = ((_d = ctx.query) === null || _d === void 0 ? void 0 : _d.publicationState) || "preview";
        // SAFEST populate for a dynamic zone: star under the DZ
        // This asks Strapi to populate all relations inside DZ components without needing brittle `on` rules
        const populate = {
            blocks: {
                populate: "*",
            },
        };
        let doc = null;
        // --- Try Strapi v5 "documents" API first (if available) ---
        try {
            // @ts-ignore - documents exists on v5 only
            if (typeof strapi.documents === "function") {
                // @ts-ignore
                doc = await strapi
                    .documents("api::resources-landing.resources-landing")
                    .findFirst({
                    locale,
                    status: v5StatusParam, // draft + published
                    populate,
                });
            }
        }
        catch (e) {
            // swallow; we'll try v4 path next
            strapi.log.warn("[resources-landing] v5 documents path failed, will try v4 entityService. Error:", e);
        }
        // --- Fallback to Strapi v4 entityService (or if v5 returned null) ---
        if (!doc) {
            try {
                const result = await strapi.entityService.findMany("api::resources-landing.resources-landing", {
                    locale,
                    publicationState: v4PublicationState, // preview == include drafts
                    populate,
                });
                doc = Array.isArray(result) ? result[0] : result;
            }
            catch (e) {
                strapi.log.error("[resources-landing] v4 entityService path failed:", e);
                ctx.status = 500;
                ctx.body = {
                    data: null,
                    error: {
                        status: 500,
                        name: "InternalServerError",
                        message: "Internal Server Error",
                    },
                };
                return;
            }
        }
        // If not created yet, return an empty payload (don’t 500)
        if (!doc) {
            return this.transformResponse({
                id: null,
                title: null,
                description: null,
                blocks: [],
            });
        }
        const populateResourceById = async (id) => {
            if (!id)
                return null;
            try {
                return await strapi.entityService.findOne("api::resource.resource", id, {
                    populate: {
                        cover: { populate: "*" },
                        category: { populate: "*" },
                        tags: { populate: "*" },
                    },
                });
            }
            catch (err) {
                strapi.log.warn(`[resources-landing] failed to hydrate resource ${id}: ${err}`);
                return null;
            }
        };
        const wrapRelation = (entity) => ({
            data: {
                id: entity.id,
                attributes: entity,
            },
        });
        const hydrateResourceBlocks = async (entry) => {
            if (!entry || !Array.isArray(entry.blocks))
                return entry;
            const hydrateEntry = async (item) => {
                var _a, _b;
                if (typeof item === "number")
                    return item;
                const resourceRel = ((_a = item === null || item === void 0 ? void 0 : item.resource) === null || _a === void 0 ? void 0 : _a.data) ||
                    (item === null || item === void 0 ? void 0 : item.resource) ||
                    ((_b = item === null || item === void 0 ? void 0 : item.document) === null || _b === void 0 ? void 0 : _b.data) ||
                    (item === null || item === void 0 ? void 0 : item.document) ||
                    item;
                const resourceId = resourceRel === null || resourceRel === void 0 ? void 0 : resourceRel.id;
                if (!resourceId)
                    return item;
                const populated = await populateResourceById(resourceId);
                if (!populated)
                    return item;
                if (item.resource) {
                    item.resource = wrapRelation(populated);
                }
                else if (item.document) {
                    item.document = wrapRelation(populated);
                }
                else {
                    Object.assign(item, populated);
                }
                return item;
            };
            const hydratedBlocks = await Promise.all(entry.blocks.map(async (block) => {
                if ((block === null || block === void 0 ? void 0 : block.__component) === "blocks.resource-grid" && Array.isArray(block.resources)) {
                    const enrichedResources = await Promise.all(block.resources.map(hydrateEntry));
                    return { ...block, resources: enrichedResources };
                }
                if ((block === null || block === void 0 ? void 0 : block.__component) === "blocks.featured-strip" && Array.isArray(block.items)) {
                    const enrichedItems = await Promise.all(block.items.map(hydrateEntry));
                    return { ...block, items: enrichedItems };
                }
                return block;
            }));
            return { ...entry, blocks: hydratedBlocks };
        };
        doc = await hydrateResourceBlocks(doc);
        // Sanitize + respond
        const sanitized = await this.sanitizeOutput(doc, ctx);
        return this.transformResponse(sanitized);
    },
}));

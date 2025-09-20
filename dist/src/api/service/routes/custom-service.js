"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "GET",
            // Avoid conflict with the core route `/services/:id`
            path: "/services/slug/:slug",
            handler: "service.findOneBySlug",
            config: {
                auth: false,
            },
        },
        {
            method: "PUT",
            path: "/services/slug/:slug",
            handler: "service.updateBySlug",
            config: {
                auth: false,
            },
        },
    ],
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "GET",
            path: "/services/:slug",
            handler: "service.findOneBySlug",
            config: {
                auth: false,
            },
        },
    ],
};

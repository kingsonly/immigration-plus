"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "GET",
            path: "/resources/slug/:slug",
            handler: "resource.findOneBySlug",
            config: {
                auth: false,
            },
        },
    ],
};

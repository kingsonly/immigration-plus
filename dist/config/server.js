"use strict";
// export default ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 1337),
//   app: {
//     keys: env.array('APP_KEYS'),
//   },
// });
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    url: env('PUBLIC_URL'),
    proxy: true,
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: { keys: env.array('APP_KEYS') },
});

const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);
module.exports = () => ({
  connection: {
    client: "mysql",
    connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      pool: { min: 0, max: 10 },
      acquireConnectionTimeout: 60000,
  },
});
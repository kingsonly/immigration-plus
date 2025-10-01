// config/env/production/database.js
module.exports = ({ env }) => ({
  connection: {
    client: "mysql", // Use mysql2 driver in Strapi v5
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "strapi"),
      password: env("DATABASE_PASSWORD", "strapi"),
      ssl: env.bool("DATABASE_SSL", false)
        ? { rejectUnauthorized: false }
        : false,
    },
    pool: { min: 0, max: 10 },
    acquireConnectionTimeout: 60000,
  },
});

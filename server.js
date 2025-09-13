// server.js
"use strict";
require("dotenv").config();

const strapiFactory = require("@strapi/strapi");

async function start() {
  const strapi = await strapiFactory();
  await strapi.start();
}

start().catch((err) => {
  console.error("Strapi failed to start", err);
  process.exit(1);
});

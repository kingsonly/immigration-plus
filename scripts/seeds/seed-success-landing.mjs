// scripts/seeds/seed-success-landing.mjs
// Usage:
//   node scripts/seeds/seed-success-landing.mjs
//   node scripts/seeds/seed-success-landing.mjs ./scripts/seeds/success-landing.json
//
// Env:
//   STRAPI_URL (default http://localhost:1337)
//   STRAPI_TOKEN (required if not public write)
//   LOCALE (default "en")

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "70234640f0489fd298df4d9208c2b7e8e82a145632e38b43889c61c0d6a670fbfa359d05b505d1e3d44e265bc93076a1b4d45c3837b3d137459ab1ab71375188f3af3d4edd2c3749b0512834d630dafac5cc0cc9c9a2c4485141b6510b2f6481f530e91ed6da87db7688fb505dd484b35c13555250834d66abe6d7f2966158e9";
const LOCALE = process.env.LOCALE || "en";
const INPUT = process.argv[2] || path.join(__dirname, "success-landing.json");

if (!STRAPI_TOKEN) {
  console.error("❌ Missing STRAPI_TOKEN env var");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`,
  "Content-Type": "application/json",
};

const getURL = `${STRAPI_URL}/api/success-landing?locale=${encodeURIComponent(LOCALE)}&populate=blocks`;
const putURL = `${STRAPI_URL}/api/success-landing?locale=${encodeURIComponent(LOCALE)}`;

// --- small HTTP helper with nice errors ---
async function httpJSON(method, url, body) {
  try {
    const res =
      method === "GET"
        ? await axios.get(url, { headers, timeout: 20000 })
        : method === "PUT"
        ? await axios.put(url, body, { headers, timeout: 20000 })
        : await axios.post(url, body, { headers, timeout: 20000 });
    return res.data;
  } catch (err) {
    const status = err.response?.status;
    const data = err.response?.data;
    const msg = data ? JSON.stringify(data) : err.message;
    throw Object.assign(new Error(`${method} ${url} failed (${status ?? "ERR"}): ${msg}`), {
      status,
      body: data,
    });
  }
}

async function putData(partialData, label = "payload") {
  try {
    const res = await httpJSON("PUT", putURL, { data: partialData });
    console.log(`   ✔ PUT ${label}`);
    return res;
  } catch (err) {
    console.error(`   ✖ PUT ${label} failed: ${err.message}`);
    throw err;
  }
}

// Resolve success-story slugs -> IDs (array)
async function resolveStoryIdsFromSlugs(slugs = []) {
  if (!slugs.length) return [];

  // Build $in query to get all in one request
  const qs = new URLSearchParams();
  slugs.forEach((s, i) => qs.append(`filters[slug][$in][${i}]`, s));
  qs.set("fields[0]", "id");
  qs.set("fields[1]", "slug");
  qs.set("pagination[pageSize]", String(slugs.length));
  qs.set("locale", LOCALE);

  const url = `${STRAPI_URL}/api/success-stories?${qs.toString()}`;
  const json = await httpJSON("GET", url);

  const found = Array.isArray(json?.data) ? json.data : [];
  const map = new Map(found.map((it) => [it?.attributes?.slug ?? it?.slug, it.id]));

  const ids = slugs
    .map((s) => {
      const id = map.get(s);
      if (!id) console.warn(`   • Warn: story slug "${s}" not found — skipping`);
      return id || null;
    })
    .filter(Boolean);

  return ids;
}

// Normalize a single block before sending (mutates a shallow copy)
async function normalizeBlock(block) {
  const b = { ...block };

  // Convert story slugs -> relation IDs for story-carousel
  if (b.__component === "blocks.story-carousel") {
    // case A: { stories: { set: [ { slug }, { slug } ] } }
    // case B: { stories: [ { slug }, { slug } ] }
    // case C: { stories: [ numeric IDs ] }
    let slugList = [];

    if (b.stories && typeof b.stories === "object" && !Array.isArray(b.stories) && Array.isArray(b.stories.set)) {
      slugList = b.stories.set.map((s) => (typeof s === "string" ? s : s?.slug)).filter(Boolean);
    } else if (Array.isArray(b.stories)) {
      // could be objects with slug, or numeric ids already
      const hasNonNumeric = b.stories.some((x) => typeof x !== "number");
      if (hasNonNumeric) {
        slugList = b.stories
          .map((s) => (typeof s === "string" ? s : s?.slug))
          .filter(Boolean);
      } else {
        // already numbers
        return b;
      }
    }

    if (slugList.length) {
      const ids = await resolveStoryIdsFromSlugs(slugList);
      b.stories = ids;
    } else if (b.stories && typeof b.stories === "object" && !Array.isArray(b.stories) && b.stories.set) {
      // no valid slugs found; set empty relation
      b.stories = [];
    }
  }

  return b;
}

(async function main() {
  console.log(`Seeding success-landing → ${STRAPI_URL}`);

  // load input JSON
  let json;
  try {
    const raw = fs.readFileSync(INPUT, "utf8");
    json = JSON.parse(raw);
  } catch (e) {
    console.error("❌ Failed to read/parse JSON:", e.message);
    process.exit(1);
  }

  const baseFields = {};
  if (json.title) baseFields.title = json.title;
  if (json.description) baseFields.description = json.description;

  // 1) Ensure the single type exists / update base fields first
  try {
    await putData(baseFields, "base fields");
  } catch (e) {
    console.error("❌ Could not create/update base single type. Check permissions and that the single type exists.");
    process.exit(1);
  }

  // 2) Put blocks progressively to isolate schema mismatches
  const blocks = Array.isArray(json.blocks) ? json.blocks : [];
  if (!blocks.length) {
    console.log("No blocks in JSON — seeding only title/description done.");
    process.exit(0);
  }

  const goodBlocks = [];
  for (let i = 0; i < blocks.length; i++) {
    const original = blocks[i];
    let block;
    try {
      block = await normalizeBlock(original);
    } catch (e) {
      console.error(`   ✖ Failed to normalize block ${i} (${original?.__component || "unknown"}): ${e.message}`);
      process.exit(1);
    }

    const candidate = [...goodBlocks, block];

    try {
      await putData({ ...baseFields, blocks: candidate }, `blocks[0..${i}] (${block?.__component || "unknown"})`);
      goodBlocks.push(block);
    } catch (e) {
      console.error(`\n⚠️  The block at index ${i} failed. Component: ${block?.__component || "unknown"}`);
      console.error("    That usually means a key doesn’t match your Strapi component schema.");
      console.error("    Fix that block’s shape, then re-run this script.\n");
      process.exit(1);
    }
  }

  console.log("✅ Seed complete (success-landing)");
})();

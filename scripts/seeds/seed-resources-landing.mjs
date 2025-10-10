import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN =
  process.env.STRAPI_TOKEN ||
  "70234640f0489fd298df4d9208c2b7e8e82a145632e38b43889c61c0d6a670fbfa359d05b505d1e3d44e265bc93076a1b4d45c3837b3d137459ab1ab71375188f3af3d4edd2c3749b0512834d630dafac5cc0cc9c9a2c4485141b6510b2f6481f530e91ed6da87db7688fb505dd484b35c13555250834d66abe6d7f2966158e9";
const LOCALE = process.env.LOCALE || "en";
const INPUT = process.argv[2] || path.join(__dirname, "resources-landing.json");

if (!STRAPI_TOKEN) {
  console.error("❌ Missing STRAPI_TOKEN env var");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`,
  "Content-Type": "application/json",
};

const putURL = `${STRAPI_URL}/api/resources-landing?locale=${encodeURIComponent(LOCALE)}`;

async function putData(partialData, label = "payload") {
  try {
    const res = await axios.put(putURL, { data: partialData }, { headers });
    console.log(`   ✔ PUT ${label}`);
    return res.data;
  } catch (err) {
    const status = err.response?.status;
    const body = err.response?.data;
    console.error(`   ✖ PUT ${label} failed (${status}): ${JSON.stringify(body || err.message)}`);
    throw err;
  }
}

/* ---------- helpers to resolve IDs by slug ---------- */
async function idsBySlug(apiPath, slugs = []) {
  if (!slugs.length) return [];
  const qs = new URLSearchParams();
  slugs.forEach((s, i) => qs.append(`filters[slug][$in][${i}]`, s));
  qs.set("pagination[pageSize]", String(slugs.length));
  const url = `${STRAPI_URL}${apiPath}?${qs.toString()}`;
  const res = await axios.get(url, { headers });
  return Array.isArray(res.data?.data) ? res.data.data.map((d) => d.id) : [];
}

async function idBySlug(apiPath, slug) {
  if (!slug) return null;
  const qs = new URLSearchParams({ "filters[slug][$eq]": slug, "pagination[pageSize]": "1" });
  const url = `${STRAPI_URL}${apiPath}?${qs.toString()}`;
  const res = await axios.get(url, { headers });
  const row = Array.isArray(res.data?.data) ? res.data.data[0] : null;
  return row?.id ?? null;
}

/* ---------- per-block normalization ---------- */
async function normalizeBlock(block) {
  if (!block || typeof block !== "object") return block;

  // 1) tools-grid: tools relation
  if (block.__component === "blocks.tools-grid" && block.tools) {
    // Accept: tools: [ids] OR tools: { set: [{id}] } OR tools: { set: [{slug}] }
    let ids = [];
    if (Array.isArray(block.tools)) {
      ids = block.tools.filter((n) => Number.isInteger(n));
    } else if (block.tools.set && Array.isArray(block.tools.set)) {
      const idsIn = block.tools.set.map((t) => t?.id).filter((v) => Number.isInteger(v));
      const slugs = block.tools.set.map((t) => t?.slug).filter(Boolean);
      if (idsIn.length) {
        ids = idsIn;
      } else if (slugs.length) {
        ids = await idsBySlug("/api/tools", slugs);
      }
    }
    return { ...block, tools: ids };
  }

  // 2) news-list: resources relation (to api::resource.resource)
  if (block.__component === "blocks.news-list" && block.resources) {
    let ids = [];
    if (Array.isArray(block.resources)) {
      ids = block.resources.filter((n) => Number.isInteger(n));
    } else if (block.resources.set && Array.isArray(block.resources.set)) {
      const idsIn = block.resources.set.map((t) => t?.id).filter((v) => Number.isInteger(v));
      const slugs = block.resources.set.map((t) => t?.slug).filter(Boolean);
      if (idsIn.length) {
        ids = idsIn;
      } else if (slugs.length) {
        ids = await idsBySlug("/api/resources", slugs);
      }
    }
    return { ...block, resources: ids };
  }

  // 3) resource-grid: optional category relation and/or explicit resource list
  if (block.__component === "blocks.resource-grid") {
    const out = { ...block };

    // category: accept id or {slug}
    if (block.category) {
      if (Number.isInteger(block.category)) {
        out.category = block.category;
      } else if (block.category.slug) {
        const id = await idBySlug("/api/resource-categories", block.category.slug);
        out.category = id || null;
      }
    }

    // resources: accept ids or { set: [{id|slug}] }
    if (block.resources) {
      let ids = [];
      if (Array.isArray(block.resources)) {
        ids = block.resources.filter((n) => Number.isInteger(n));
      } else if (block.resources.set && Array.isArray(block.resources.set)) {
        const idsIn = block.resources.set.map((t) => t?.id).filter((v) => Number.isInteger(v));
        const slugs = block.resources.set.map((t) => t?.slug).filter(Boolean);
        if (idsIn.length) {
          ids = idsIn;
        } else if (slugs.length) {
          ids = await idsBySlug("/api/resources", slugs);
        }
      }
      out.resources = ids;
    }

    return out;
  }

  return block;
}

(async function main() {
  console.log(`Seeding resources-landing → ${STRAPI_URL}`);

  // Load JSON
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

  // 1) Upsert base fields for the single-type
  try {
    await putData(baseFields, "base fields");
  } catch {
    console.error("❌ Could not create/update base single type. Check schema & permissions.");
    process.exit(1);
  }

  // 2) Add blocks progressively
  const blocks = Array.isArray(json.blocks) ? json.blocks : [];
  if (!blocks.length) {
    console.log("No blocks in JSON — seeding only title/description done.");
    process.exit(0);
  }

  const goodBlocks = [];
  for (let i = 0; i < blocks.length; i++) {
    const normalized = await normalizeBlock(blocks[i]);
    const candidate = [...goodBlocks, normalized];

    try {
      await putData({ ...baseFields, blocks: candidate }, `blocks[0..${i}] (${normalized?.__component || "unknown"})`);
      goodBlocks.push(normalized);
    } catch {
      console.error(`\n⚠️  The block at index ${i} failed. Component: ${blocks[i]?.__component || "unknown"}`);
      console.error("    Likely a schema/key mismatch for that component. Fix and re-run.\n");
      process.exit(1);
    }
  }

  console.log("✅ Seed complete (resources-landing)");
})();

// scripts/seeds/seed-success-stories.mjs
// Seeds/updates the "success-stories" collection by slug.
//
// Usage:
//   node scripts/seeds/seed-success-stories.mjs
//   node scripts/seeds/seed-success-stories.mjs ./scripts/seeds/success-stories.json
//
// Env:
//   STRAPI_URL (default http://localhost:1337)
//   STRAPI_TOKEN (required)
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
const INPUT = process.argv[2] || path.join(__dirname, "success-stories.json");

if (!STRAPI_TOKEN) {
  console.error("❌ Missing STRAPI_TOKEN env var");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`,
  "Content-Type": "application/json",
};

async function http(method, url, body) {
  try {
    const res =
      method === "GET"
        ? await axios.get(url, { headers, timeout: 20000 })
        : method === "POST"
        ? await axios.post(url, body, { headers, timeout: 20000 })
        : await axios.put(url, body, { headers, timeout: 20000 });
    return res.data;
  } catch (err) {
    const status = err.response?.status;
    const data = err.response?.data;
    const msg = data ? JSON.stringify(data) : err.message;
    throw new Error(`${method} ${url} failed (${status ?? "ERR"}): ${msg}`);
  }
}

async function findBySlug(slug) {
  const qs = new URLSearchParams();
  qs.set("filters[slug][$eq]", slug);
  qs.set("fields[0]", "id");
  qs.set("fields[1]", "slug");
  qs.set("pagination[pageSize]", "1");
  qs.set("locale", LOCALE);
  const url = `${STRAPI_URL}/api/success-stories?${qs.toString()}`;
  const json = await http("GET", url);
  return Array.isArray(json?.data) && json.data.length ? json.data[0] : null;
}

async function createOne(payload) {
  let url = `${STRAPI_URL}/api/success-stories?locale=${encodeURIComponent(LOCALE)}`;
  return await http("POST", url, { data: payload });
}

async function updateOne(id, payload) {
  let url = `${STRAPI_URL}/api/success-stories/${id}?locale=${encodeURIComponent(LOCALE)}`;
  return await http("PUT", url, { data: payload });
}

(async function main() {
  console.log(`Seeding success-stories → ${STRAPI_URL}`);

  let arr;
  try {
    const raw = fs.readFileSync(INPUT, "utf8");
    const json = JSON.parse(raw);
    if (!Array.isArray(json)) throw new Error("JSON must be an array of stories");
    arr = json;
  } catch (e) {
    console.error("❌ Failed to read/parse JSON:", e.message);
    process.exit(1);
  }

  let created = 0, updated = 0, existed = 0;

  for (const item of arr) {
    const slug = item.slug;
    if (!slug) {
      console.warn("• Skipping story with no slug:", item?.name);
      continue;
    }

    // SHAPE: adapt to your model fields
    const payload = {
      name: item.name,
      slug: item.slug,
      country: item.country,
      program: item.program,
      timeline: item.timeline,
      quote: item.quote,
      story: item.story,
      outcome: item.outcome,
      category: item.category, // enum/string
      rating: item.rating ?? 5, // if you have this field; otherwise remove
      // image: item.image,     // if you have a media field and want to wire it later
      publishedAt: item.publishedAt ?? null,
    };

    const existing = await findBySlug(slug);
    if (!existing) {
      await createOne(payload);
      console.log(`[create] ${slug} -> ok`);
      created++;
    } else {
      const id = existing.id ?? existing?.documentId ?? null;
      if (!id) {
        console.log(`[exists?] ${slug} -> could not resolve id, skipping update`);
        existed++;
        continue;
      }
      await updateOne(id, payload);
      console.log(`[update] ${slug} -> ok`);
      updated++;
    }
  }

  console.log(`✔ success-stories ensured: created=${created}, updated=${updated}, existed=${existed}`);
})();

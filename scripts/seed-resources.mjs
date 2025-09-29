// CommonJS, Node 16+
// Usage: STRAPI_URL=http://localhost:1337 STRAPI_TOKEN=xxx LOCALE=en node scripts/seed-resources-quick.js ./scripts/seeds/resources.json

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "70234640f0489fd298df4d9208c2b7e8e82a145632e38b43889c61c0d6a670fbfa359d05b505d1e3d44e265bc93076a1b4d45c3837b3d137459ab1ab71375188f3af3d4edd2c3749b0512834d630dafac5cc0cc9c9a2c4485141b6510b2f6481f530e91ed6da87db7688fb505dd484b35c13555250834d66abe6d7f2966158e9";
const LOCALE = process.env.LOCALE || "en"; // used on create for localized collections

if (!STRAPI_TOKEN) {
  console.error("❌ Missing STRAPI_TOKEN");
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now safe to use
const INPUT = process.argv[2] || path.join(__dirname, "seeds", "resources.json");

const http = axios.create({
  baseURL: STRAPI_URL,
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    "Content-Type": "application/json",
  },
});

function isUniqueError(e) {
  const msg = e?.response?.data?.error?.message || "";
  return e?.response?.status === 400 && /must be unique/i.test(msg);
}

async function postOrSkip(endpoint, data, { localized = true } = {}) {
  const url = localized ? `/api/${endpoint}?locale=${encodeURIComponent(LOCALE)}` : `/api/${endpoint}`;
  try {
    const res = await http.post(url, { data });
    return { created: true, data: res.data?.data };
  } catch (err) {
    if (isUniqueError(err)) {
      return { created: false, exists: true };
    }
    throw err;
  }
}

async function findOneBySlug(endpoint, slug) {
  const url = `/api/${endpoint}?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`;
  const res = await http.get(url);
  const rows = Array.isArray(res.data?.data) ? res.data.data : [];
  return rows[0] || null;
}

async function ensureCategory(slug, nameFallback) {
  const existing = await findOneBySlug("resource-categories", slug).catch(() => null);
  if (existing) return existing;

  const payload = { name: nameFallback || slug, slug };
  const result = await postOrSkip("resource-categories", payload, { localized: true });
  if (result.created) return result.data;

  // existed but we couldn't GET (permissions?), fallback to a lightweight ref
  return await findOneBySlug("resource-categories", slug);
}

async function ensureTag(slug, nameFallback) {
  const existing = await findOneBySlug("resource-tags", slug).catch(() => null);
  if (existing) return existing;

  const payload = { name: nameFallback || slug, slug };
  const result = await postOrSkip("resource-tags", payload, { localized: true });
  if (result.created) return result.data;

  return await findOneBySlug("resource-tags", slug);
}

async function ensureTool(tool) {
  // tools likely localized too in your setup; keep consistent
  const existing = await findOneBySlug("tools", tool.slug).catch(() => null);
  if (existing) return existing;

  const payload = {
    name: tool.name,
    slug: tool.slug,
    description: tool.description || "",
    icon: tool.icon || null,
    colorClass: tool.colorClass || null,
    link: tool.link || null,
    embedCode: tool.embedCode || null,
  };

  const result = await postOrSkip("tools", payload, { localized: true });
  if (result.created) return result.data;

  return await findOneBySlug("tools", tool.slug);
}

async function ensureResource(resource, catMap, tagMap) {
  // If it exists, skip (no PUT updates in this “quick” seeder)
  const existing = await findOneBySlug("resources", resource.slug).catch(() => null);
  if (existing) return existing;

  // resolve category
  let categoryId = null;
  if (resource.category) {
    const cat = catMap.get(resource.category) ||
                await ensureCategory(resource.category, resource.category);
    if (cat?.id) categoryId = cat.id;
    catMap.set(resource.category, cat);
  }

  // resolve tags
  let tagIds = [];
  if (Array.isArray(resource.tags)) {
    for (const t of resource.tags) {
      const slug = t?.slug || t;
      if (!slug) continue;
      const existingTag = tagMap.get(slug) || await ensureTag(slug, slug);
      if (existingTag?.id) {
        tagIds.push(existingTag.id);
        tagMap.set(slug, existingTag);
      }
    }
  }

  const payload = {
    title: resource.title,
    slug: resource.slug,
    excerpt: resource.excerpt || "",
    content: resource.content || "",
    type: resource.type || "guide",
    readTime: resource.readTime || "",
    author: resource.author || "",
    publishedOn: resource.publishedOn || null,
    lastUpdated: resource.lastUpdated || null,
    icon: resource.icon || null,
    colorClass: resource.colorClass || null,
    featured: !!resource.featured,
    downloadCount: resource.downloadCount || 0,
    externalLink: resource.externalLink || null,
    toolLink: resource.toolLink || null,
    // relations
    ...(categoryId ? { category: categoryId } : {}),
    ...(tagIds.length ? { tags: tagIds } : {}),
  };

  const result = await postOrSkip("resources", payload, { localized: true });
  if (result.created) return result.data;

  // If unique error but GET failed before, try GET again and return
  return await findOneBySlug("resources", resource.slug);
}

async function main() {
  console.log(`Seeding to ${STRAPI_URL} (locale=${LOCALE})`);

  // load JSON
  let json;
  try {
    const raw = fs.readFileSync(INPUT, "utf-8");
    json = JSON.parse(raw);
  } catch (e) {
    console.error("❌ Seed failed: cannot read/parse JSON:", e.message);
    process.exit(1);
  }

  const categories = Array.isArray(json.categories) ? json.categories : [];
  const tags = Array.isArray(json.tags) ? json.tags : [];
  const tools = Array.isArray(json.tools) ? json.tools : [];
  const resources = Array.isArray(json.resources) ? json.resources : [];

  // 1) Categories
  const catMap = new Map(); // slug -> row
  for (const c of categories) {
    const slug = c.slug;
    const name = c.name || slug;
    try {
      const row = await ensureCategory(slug, name);
      if (row?.id) catMap.set(slug, row);
      console.log(`[category] ${slug} -> ok`);
    } catch (e) {
      console.log(`[category] ${slug} -> skip (${e?.response?.status || e.message})`);
    }
  }

  // 2) Tags
  const tagMap = new Map();
  for (const t of tags) {
    const slug = t.slug;
    const name = t.name || slug;
    try {
      const row = await ensureTag(slug, name);
      if (row?.id) tagMap.set(slug, row);
      console.log(`[tag] ${slug} -> ok`);
    } catch (e) {
      console.log(`[tag] ${slug} -> skip (${e?.response?.status || e.message})`);
    }
  }

  // 3) Tools
  for (const tool of tools) {
    try {
      await ensureTool(tool);
      console.log(`[tool] ${tool.slug} -> ok`);
    } catch (e) {
      console.log(`[tool] ${tool.slug} -> skip (${e?.response?.status || e.message})`);
    }
  }

  // 4) Resources
  for (const r of resources) {
    try {
      await ensureResource(r, catMap, tagMap);
      console.log(`[resource] ${r.slug} -> ok`);
    } catch (e) {
      console.log(`[resource] ${r.slug} -> skip (${e?.response?.status || e.message})`);
    }
  }

  console.log("✅ Seed complete (create-only; existing slugs are skipped).");
}

main().catch((e) => {
  console.error("❌ Seed failed:", e?.response?.data || e.message || e);
  process.exit(1);
});

// Seed the Contact Landing single-type (blocks-only)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(
  /\/$/,
  ""
);
const STRAPI_TOKEN =
  process.env.STRAPI_TOKEN ||
  "70234640f0489fd298df4d9208c2b7e8e82a145632e38b43889c61c0d6a670fbfa359d05b505d1e3d44e265bc93076a1b4d45c3837b3d137459ab1ab71375188f3af3d4edd2c3749b0512834d630dafac5cc0cc9c9a2c4485141b6510b2f6481f530e91ed6da87db7688fb505dd484b35c13555250834d66abe6d7f2966158e9"; // omit if public
const LOCALE = process.env.LOCALE || "en";
const INPUT = process.argv[2] || path.join(__dirname, "contact-landing.json");

const headers = {
  "Content-Type": "application/json",
  ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
};

const putURL = `${STRAPI_URL}/api/contact-landing?locale=${encodeURIComponent(LOCALE)}`;

async function putBlocks(blocks, label) {
  const body = { data: { blocks } };
  try {
    const res = await axios.put(putURL, body, { headers, timeout: 20000 });
    console.log(`   ✔ PUT ${label}`);
    return res.data;
  } catch (err) {
    const status = err.response?.status;
    const data = err.response?.data || err.message;
    console.error(
      `   ✖ PUT ${label} failed (${status ?? "ERR"}): ${JSON.stringify(data)}`
    );
    throw err;
  }
}

// scripts/seeds/seed-contact-landing.mjs (excerpt – full loop)
const goodBlocks = [];

function normalizeBlockKeys(block) {
  if (!block || typeof block !== "object") return block;

  // Hero component uses PascalCase keys
  if (block.__component === "blocks.hero") {
    if ("title" in block && !("Title" in block)) {
      block.Title = block.title; // migrate
      delete block.title;
    }
    if ("subtitle" in block && !("Subtitle" in block)) {
      block.Subtitle = block.subtitle; // migrate
      delete block.subtitle;
    }
  }

  // Contact-info grid: ensure shape
  if (
    block.__component === "blocks.contact-info-grid" &&
    Array.isArray(block.items)
  ) {
    block.items = block.items.map((it) => ({
      icon: it.icon ?? null,
      heading: it.heading ?? "",
      lines: Array.isArray(it.lines)
        ? it.lines
        : it.lines
          ? [String(it.lines)]
          : [],
      colorClass: it.colorClass ?? null,
    }));
  }

  // FAQ list: ensure items are {question, answer}
  if (block.__component === "blocks.faq-list" && Array.isArray(block.items)) {
    block.items = block.items.map((it) => ({
      question: it.question ?? "",
      answer: it.answer ?? "",
    }));
  }

  return block;
}

// …after you’ve loaded `json` and confirmed it has blocks:
for (let i = 0; i < blocks.length; i++) {
  const block = normalizeBlockKeys({ ...blocks[i] });

  const candidate = [...goodBlocks, block];
  try {
    await putData(
      { blocks: candidate },
      `blocks[0..${i}] (${block?.__component || "unknown"})`
    );
    goodBlocks.push(block);
  } catch (e) {
    console.error(`   ✖ PUT blocks[0..${i}] (${block?.__component}) failed`);
    console.error(
      "     Likely a key/type mismatch with your component schema. Fix and re-run."
    );
    process.exit(1);
  }
}

(async function main() {
  console.log(`Seeding contact-landing → ${STRAPI_URL}`);

  let json;
  try {
    json = JSON.parse(fs.readFileSync(INPUT, "utf8"));
  } catch (e) {
    console.error("❌ Failed to read/parse JSON:", e.message);
    process.exit(1);
  }

  const blocks = Array.isArray(json.blocks) ? json.blocks : [];
  if (!blocks.length) {
    console.log("No blocks in JSON; nothing to do.");
    process.exit(0);
  }

  const confirmed = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const candidate = [...confirmed, b];
    try {
      await putBlocks(
        candidate,
        `blocks[0..${i}] (${b?.__component || "unknown"})`
      );
      confirmed.push(b);
    } catch {
      console.error(
        `\n⚠️  Block at index ${i} failed. Component: ${b?.__component || "unknown"}`
      );
      console.error("    Check the component schema keys and try again.\n");
      process.exit(1);
    }
  }

  console.log("✅ Seed complete (contact-landing)");
})();

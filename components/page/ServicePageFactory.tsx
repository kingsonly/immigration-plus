"use client";

import { useEffect, useState } from "react";
import ServiceBlocks from "@/components/page/ServiceBlocks";

type Blocks = any[] | null;

async function fetchServiceBlocks(slug: string) {
  try {
    const base = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
    const params = new URLSearchParams();
    if (process.env.NEXT_PUBLIC_STRAPI_PREVIEW === "1") params.set("publicationState", "preview");
    if (process.env.NEXT_PUBLIC_STRAPI_LOCALE) params.set("locale", process.env.NEXT_PUBLIC_STRAPI_LOCALE);
    const qs = params.toString();
    const url = `${base}/api/services/slug/${encodeURIComponent(slug)}${qs ? `?${qs}` : ""}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data;
    return (data?.blocks || data?.attributes?.blocks) ?? null;
  } catch {
    return null;
  }
}

export default function ServicePageFactory({
  slug,
  fallbackBlocks,
}: {
  slug: string;
  fallbackBlocks?: any[]; // optional local seed (already shaped as blocks[])
}) {
  const [blocks, setBlocks] = useState<Blocks>(null);

  useEffect(() => {
    fetchServiceBlocks(slug).then((remote) => {
      if (Array.isArray(remote) && remote.length > 0) {
        setBlocks(remote);
      } else if (Array.isArray(fallbackBlocks) && fallbackBlocks.length > 0) {
        setBlocks(fallbackBlocks);
      } else {
        setBlocks([]); // nothing to show
      }
    });
  }, [slug]);

  if (!Array.isArray(blocks)) return null; // optional: show a skeleton
  return <ServiceBlocks blocks={blocks} />;
}

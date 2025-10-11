const STRAPI_PUBLIC_BASE = (process.env.NEXT_PUBLIC_STRAPI_URL || "").replace(/\/$/, "");

type MaybeCoverish =
  | string
  | null
  | undefined
  | {
      url?: string | null;
      alternativeText?: string | null;
      caption?: string | null;
      name?: string | null;
      formats?: Record<string, { url?: string | null }> | null;
      data?:
        | {
            attributes?: {
              url?: string | null;
              alternativeText?: string | null;
              caption?: string | null;
              name?: string | null;
              formats?: Record<string, { url?: string | null }> | null;
            } | null;
          }
        | null;
    };

function pickUrl(source: MaybeCoverish): string | null {
  if (!source) return null;

  if (typeof source === "string") return source;

  const direct = source.url;
  if (direct) return direct;

  const formatUrl =
    source.formats?.large?.url ||
    source.formats?.medium?.url ||
    source.formats?.small?.url ||
    source.formats?.thumbnail?.url;
  if (formatUrl) return formatUrl;

  const attr = source.data?.attributes;
  if (!attr) return null;

  return (
    attr.url ||
    attr.formats?.large?.url ||
    attr.formats?.medium?.url ||
    attr.formats?.small?.url ||
    attr.formats?.thumbnail?.url ||
    null
  );
}

function pickAlt(source: MaybeCoverish): string | null {
  if (!source || typeof source === "string") return null;

  return (
    source.alternativeText ||
    source.caption ||
    source.name ||
    source.data?.attributes?.alternativeText ||
    source.data?.attributes?.caption ||
    source.data?.attributes?.name ||
    null
  );
}

export function resolveCoverMedia(
  resource: {
    coverUrl?: string | null;
    coverAlt?: string | null;
    cover?: MaybeCoverish;
    title?: string | null;
  },
  fallback = "/placeholder.jpg"
): { url: string; alt: string } {
  const rawUrl =
    resource.coverUrl ||
    pickUrl(resource.cover) ||
    (resource as any)?.imageUrl || // safeguard for mismatched data
    null;

  let finalUrl: string;
  if (rawUrl && rawUrl.startsWith("http")) {
    finalUrl = rawUrl;
  } else if (rawUrl && STRAPI_PUBLIC_BASE) {
    finalUrl = `${STRAPI_PUBLIC_BASE}${rawUrl}`;
  } else if (rawUrl) {
    finalUrl = rawUrl;
  } else {
    finalUrl = fallback;
  }

  const alt =
    resource.coverAlt ||
    pickAlt(resource.cover) ||
    (resource as any)?.cover?.data?.attributes?.alternativeText ||
    resource.title ||
    "Resource cover";

  return { url: finalUrl, alt };
}

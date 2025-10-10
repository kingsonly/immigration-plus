export async function getServiceBySlug(slug: string) {
  const base = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
  const params = new URLSearchParams();
  const isPreview = process.env.NEXT_PUBLIC_STRAPI_PREVIEW === '1';
  const locale = process.env.NEXT_PUBLIC_STRAPI_LOCALE;
  if (isPreview) params.set('publicationState', 'preview');
  if (locale) params.set('locale', locale);
  // Bust caches in preview/dev to see changes immediately
  if (isPreview) params.set('_ts', Date.now().toString());
  const qs = params.toString();
  const url = `${base}/api/services/slug/${encodeURIComponent(slug)}${qs ? `?${qs}` : ''}`;

  const fetchOpts: RequestInit & { next?: { revalidate?: number } } = isPreview
    ? { cache: 'no-store' }
    : { next: { revalidate: 60 } };

  const res = await fetch(url, fetchOpts);
  if (!res.ok) {
    throw new Error(`Failed to fetch service: ${slug}`);
  }
  const json = await res.json();
  return json?.data;
}

// lib/strapi.ts
const BASE = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");


export async function strapiGet(path: string) {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Strapi GET ${path} failed: ${res.status}`);
  return res.json();
}

// lib/strapi.ts
export const STRAPI_URL =
  (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

type FetchOpts = {
  next?: { revalidate?: number } | undefined;
  cache?: RequestCache;
  headers?: Record<string, string>;
};

export async function fetchJSON<T = any>(path: string, opts: FetchOpts = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store", // reflect Strapi edits immediately
    headers: {
      "Content-Type": "application/json",
      ...(process.env.NEXT_PUBLIC_STRAPI_TOKEN || process.env.STRAPI_TOKEN
        ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN || process.env.STRAPI_TOKEN}` }
        : {}),
      ...(opts.headers || {}),
    },
    ...opts,
  });

  if (!res.ok) {
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      /* ignore */
    }
    throw new Error(`${res.status} ${res.statusText}\n${body ? JSON.stringify(body) : ""}`);
  }

  return (await res.json()) as T;
}

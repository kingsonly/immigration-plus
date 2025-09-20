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

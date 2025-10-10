// lib/seo/jsonld.ts

/**
 * Build Organization (or LocalBusiness) JSON-LD.
 * If you have a physical office, swap "@type": "Organization" → "LocalBusiness"
 * and add address/geo/telephone as needed.
 */
export function buildOrganizationJsonLd(params?: {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}) {
  const { name = "Tentacular Immigration", url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", logo, sameAs = [] } = params || {};

  const obj: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
  };
  if (logo) obj.logo = logo;
  if (sameAs.length) obj.sameAs = sameAs;
  return obj;
}

/**
 * Convert a list of reviews (testimonials) into Review[] JSON-LD.
 * Each review should have at least: authorName, reviewBody, ratingValue (1-5).
 */
export function buildReviewsJsonLd(reviews: Array<{
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  program?: string | null;
  country?: string | null;
  datePublished?: string | null;
}> = []) {
  return reviews.map((r) => {
    const review: any = {
      "@type": "Review",
      reviewBody: r.reviewBody,
      author: { "@type": "Person", name: r.authorName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.ratingValue),
        bestRating: "5",
        worstRating: "1",
      },
    };
    // Optional extras that can help Google better understand context
    if (r.datePublished) review.datePublished = r.datePublished;
    if (r.program) review.about = { "@type": "Thing", name: r.program };
    if (r.country) review.locationCreated = { "@type": "Country", name: r.country };
    return review;
  });
}

/**
 * AggregateRating JSON-LD based on reviews.
 * If no reviews, returns undefined.
 */
export function buildAggregateRatingJsonLd(reviews: Array<{ ratingValue: number }> = []) {
  if (!reviews.length) return undefined;
  const ratingCount = reviews.length;
  const ratingValue = (reviews.reduce((a, b) => a + (b.ratingValue || 0), 0) / ratingCount).toFixed(2);

  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount: String(ratingCount),
    bestRating: "5",
    worstRating: "1",
  };
}

/**
 * WebPage JSON-LD with optional primaryEntity (e.g., Organization)
 */
export function buildWebPageJsonLd(params?: {
  name?: string;
  url?: string;
  description?: string;
  primaryEntity?: any; // e.g., Organization or ItemList
}) {
  const { name = "Success Stories", url = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/success-stories", description, primaryEntity } =
    params || {};
  const obj: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url,
  };
  if (description) obj.description = description;
  if (primaryEntity) obj.primaryEntityOfPage = primaryEntity;
  return obj;
}

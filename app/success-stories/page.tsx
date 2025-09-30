import SuccessLandingClient from "@/components/page/SuccessLandingClient";
import { fetchSuccessLanding } from "@/lib/api/successLanding";
import { adaptSuccessLanding } from "@/lib/mappers/successLanding";
import { buildAggregateRatingJsonLd, buildOrganizationJsonLd, buildReviewsJsonLd, buildWebPageJsonLd } from "@/lib/seo/jsonld";

export const dynamic = "force-dynamic"; // reflect latest Strapi changes immediately



export default async function SuccessStoriesPage() {
  const api = await fetchSuccessLanding();
  const props = adaptSuccessLanding(api);

  const reviews = (props.testimonials.items || []).map((t) => ({
    authorName: t.name,
    reviewBody: t.text,
    ratingValue: typeof t.rating === "number" ? t.rating : 5,
    program: t.program || null,
    country: t.country || null,
    datePublished: t.dateISO || null,
  }));

  const reviewsJsonLd = buildReviewsJsonLd(reviews);
  const aggregateJsonLd = buildAggregateRatingJsonLd(reviews);
  const orgJsonLd = buildOrganizationJsonLd({
    name: "Tentacular Immigration",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    // logo: "/logo.png" // add if you have a real logo URL
  });

  // You can also mark the WebPage and attach the organization as primaryEntity
  const pageJsonLd = buildWebPageJsonLd({
    name: "Success Stories",
    url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/success-stories",
    description: props?.hero?.Subtitle || "Immigration success stories and client testimonials.",
    primaryEntity: orgJsonLd,
  });

  // A combined graph: WebPage + Organization + Reviews + AggregateRating
  const jsonLdGraph = [
    pageJsonLd,
    orgJsonLd,
    ...(reviewsJsonLd.length ? reviewsJsonLd : []),
    ...(aggregateJsonLd ? [aggregateJsonLd] : []),
  ];

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        // Don't pretty-print to reduce size; keep JSON stable to avoid hydration differences
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <SuccessLandingClient initialData={props} />
    </>
  );
}

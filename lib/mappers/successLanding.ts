// lib/mappers/successLanding.ts
import type { StrapiSuccessLanding } from "@/lib/api/successLanding";

export type SuccessLandingProps = {
  hero: {
    Title: string;
    Subtitle?: string | null;
    descriptionHTML?: string | null;
    ctas: Array<{ label: string; url: string; variant?: string | null; icon?: string | null }>;
  };
  stats: Array<{ number: string; label: string; icon?: string | null }>;
  carousel: {
    Heading: string;
    description?: string | null;
    categories: Array<{ id: string; label: string; count: number }>;
    stories: Array<{
      name: string;
      slug: string;
      country?: string | null;
      program?: string | null;
      timeline?: string | null;
      imageUrl?: string | null;
      quote?: string | null;
      story?: string | null;
      outcome?: string | null;
      category: string;
      rating?: number | null;
    }>;
  };
  testimonials: {
    Heading: string;
    description?: string | null;
    items: Array<{ name: string; country?: string | null; program?: string | null; rating: number; text: string }>;
  };
  videos: {
    Heading: string;
    description?: string | null;
    items: Array<{ name: string; country?: string | null; program?: string | null; thumbnailUrl?: string | null; url?: string | null }>;
  };
  cta: {
    Heading: string;
    description?: string | null;
    cta?: { label: string; url: string; variant?: string | null; icon?: string | null } | null;
  };
};

// ---- FALLBACKS (mirror your current hardcoded content) ----
const FALLBACK: SuccessLandingProps = {
  hero: {
    Title: "Success Stories",
    Subtitle: "Real people. Real outcomes.",
    descriptionHTML:
      "Real stories from real people who achieved their Canadian immigration dreams with our help.",
    ctas: [{ label: "Start Your Journey", url: "/contact", variant: "default", icon: "ArrowRight" }],
  },
  stats: [
    { number: "500+", label: "Success Stories", icon: "Users" },
    { number: "98%", label: "Approval Rate", icon: "Star" },
    { number: "50+", label: "Countries", icon: "MapPin" },
    { number: "15+", label: "Years Experience", icon: "Calendar" },
  ],
  carousel: {
    Heading: "Featured Success Stories",
    description: "Discover how our clients achieved their Canadian immigration goals",
    categories: [
      { id: "all", label: "All Stories", count: 4 },
      { id: "skilled-worker", label: "Skilled Workers", count: 1 },
      { id: "pnp", label: "Provincial Nominees", count: 1 },
      { id: "business", label: "Business Immigration", count: 1 },
      { id: "family", label: "Family Sponsorship", count: 1 }
    ],
    stories: [
      {
        name: "Sarah & Michael Chen",
        slug: "sarah-michael-chen",
        country: "Singapore",
        program: "Express Entry - Federal Skilled Worker",
        timeline: "8 months",
        imageUrl: "/placeholder.svg?height=400&width=400",
        quote:
          "TENTACULAR IMMIGRATION made our Canadian dream come true. Their expertise and guidance throughout the Express Entry process was invaluable.",
        story:
          "We optimized their CRS, prepared documents, and navigated Express Entry. ITA in 3 months, landed in 8. Now both work in tech in Toronto.",
        outcome: "Permanent residents in Toronto, both employed in their field",
        category: "skilled-worker",
        rating: 5,
      },
      {
        name: "Priya Patel",
        slug: "priya-patel",
        country: "India",
        program: "Provincial Nominee Program - Ontario",
        timeline: "14 months",
        imageUrl: "/placeholder.svg?height=400&width=400",
        quote:
          "The PNP process seemed impossible until I found TENTACULAR IMMIGRATION. They made everything clear and manageable.",
        story:
          "We targeted Ontario HCP stream, improved language scores, secured nomination (+600), and she received ITA. Now a marketing director in Toronto.",
        outcome: "Marketing Director at a Fortune 500 company in Toronto",
        category: "pnp",
        rating: 5,
      },
      {
        name: "Ahmed & Fatima Al-Rashid",
        slug: "ahmed-fatima-al-rashid",
        country: "UAE",
        program: "Start-up Visa Program",
        timeline: "18 months",
        imageUrl: "/placeholder.svg?height=400&width=400",
        quote:
          "Our innovative fintech startup found its home in Canada thanks to the exceptional guidance from TENTACULAR IMMIGRATION.",
        story:
          "We connected them with a designated organization, refined the plan, and navigated the SUV process. Now raised $2M and employ 15 in Vancouver.",
        outcome: "Fintech startup with $2M funding",
        category: "business",
        rating: 5,
      },
      {
        name: "Maria Rodriguez",
        slug: "maria-rodriguez",
        country: "Mexico",
        program: "Family Sponsorship - Spouse",
        timeline: "11 months",
        imageUrl: "/placeholder.svg?height=400&width=400",
        quote:
          "Being separated from my husband was heartbreaking. TENTACULAR IMMIGRATION reunited our family faster than we expected.",
        story:
          "We fixed documentation issues, resubmitted, and guided them to approval. Reunited in Calgary; Maria works as a nurse.",
        outcome: "Reunited with family, working as a nurse in Calgary",
        category: "family",
        rating: 5,
      }
    ],
  },
  testimonials: {
    Heading: "What Our Clients Say",
    description: "Hear from more clients who trusted us with their immigration journey",
    items: [
      { name: "David Kim", country: "South Korea", program: "Canadian Experience Class", rating: 5, text: "Professional, knowledgeable, and always available to answer questions. They made my PR application stress-free." },
      { name: "Elena Volkov", country: "Russia", program: "Federal Skilled Trades", rating: 5, text: "I thought my trade skills wouldn't be enough, but they showed me the perfect pathway. Now I'm a permanent resident!" },
      { name: "James Thompson", country: "UK", program: "Provincial Nominee Program", rating: 5, text: "The team's expertise in PNP programs is outstanding. They found the perfect province match for my profile." },
      { name: "Aisha Okonkwo", country: "Nigeria", program: "Study Permit to PR", rating: 5, text: "From study permit to permanent residency - they guided me through every step of my Canadian journey." }
    ],
  },
  videos: {
    Heading: "Video Testimonials",
    description: "Watch our clients share their immigration success stories",
    items: [
      { name: "Roberto Silva", country: "Brazil", program: "Express Entry", thumbnailUrl: "/placeholder.svg?height=300&width=400", url: "#" },
      { name: "Li Wei", country: "China", program: "PNP - British Columbia", thumbnailUrl: "/placeholder.svg?height=300&width=400", url: "#" },
      { name: "Olumide Johnson", country: "Nigeria", program: "Family Sponsorship", thumbnailUrl: "/placeholder.svg?height=300&width=400", url: "#" }
    ],
  },
  cta: {
    Heading: "Ready to Write Your Success Story?",
    description: "Join hundreds of successful immigrants who trusted us with their Canadian dreams. Your success story could be next!",
    cta: { label: "Start Your Journey Today", url: "/contact", variant: "default", icon: "ArrowRight" },
  },
};

export function adaptSuccessLanding(api: StrapiSuccessLanding | null): SuccessLandingProps {
  if (!api || !Array.isArray(api.blocks)) return FALLBACK;

  const out: SuccessLandingProps = structuredClone(FALLBACK);

  for (const block of api.blocks) {
    switch (block.__component) {
      case "blocks.hero": {
        out.hero.Title = block.Title || FALLBACK.hero.Title;
        out.hero.Subtitle = block.Subtitle ?? FALLBACK.hero.Subtitle ?? null;
        out.hero.descriptionHTML = block.description || FALLBACK.hero.descriptionHTML;
        out.hero.ctas =
          Array.isArray(block.ctas) && block.ctas.length
            ? block.ctas.map((c) => ({
                label: c.label,
                url: c.url,
                variant: c.variant || "default",
                icon: c.icon || undefined,
              }))
            : FALLBACK.hero.ctas;
        break;
      }
      case "blocks.stats-grid": {
        if (Array.isArray(block.items) && block.items.length) {
          out.stats = block.items.map((i) => ({
            number: i.number || "",
            label: i.label || "",
            icon: i.icon || undefined,
          }));
        }
        break;
      }
      case "blocks.story-carousel": {
        out.carousel.Heading = block.Heading || FALLBACK.carousel.Heading;
        out.carousel.description = block.description || FALLBACK.carousel.description;

        // stories
        if (Array.isArray(block.stories) && block.stories.length) {
          const stories = (block.stories as any[])
            .map((s) =>
              typeof s === "number"
                ? null
                : {
                    name: s.name || "",
                    slug: s.slug,
                    country: s.country || null,
                    program: s.program || null,
                    timeline: s.timeline || null,
                    imageUrl:
                      typeof s.image === "string"
                        ? s.image
                        : s.image?.url
                        ? s.image.url
                        : null,
                    quote: s.quote || null,
                    story: s.story || null,
                    outcome: s.outcome || null,
                    category: s.category || "all",
                    rating: s.rating ?? null,
                  }
            )
            .filter(Boolean) as SuccessLandingProps["carousel"]["stories"];

          out.carousel.stories = stories;

          // categories: if Strapi provided explicit list, use it; else derive
          if (Array.isArray(block.categories) && block.categories.length) {
            const counts = stories.reduce<Record<string, number>>((acc, s) => {
              const key = s.category || "all";
              acc[key] = (acc[key] || 0) + 1;
              return acc;
            }, {});
            const mapped = block.categories.map((c) => ({
              id: c.key,
              label: c.label,
              count: counts[c.key] || 0,
            }));
            out.carousel.categories = [
              { id: "all", label: "All Stories", count: stories.length },
              ...mapped,
            ];
          } else {
            const counts = stories.reduce<Record<string, number>>((acc, s) => {
              const key = s.category || "all";
              acc[key] = (acc[key] || 0) + 1;
              return acc;
            }, {});
            out.carousel.categories = [
              { id: "all", label: "All Stories", count: stories.length },
              ...Object.entries(counts)
                .filter(([k]) => k !== "all")
                .map(([k, v]) => ({
                  id: k,
                  label:
                    k === "skilled-worker"
                      ? "Skilled Workers"
                      : k === "pnp"
                      ? "Provincial Nominees"
                      : k === "business"
                      ? "Business Immigration"
                      : k === "family"
                      ? "Family Sponsorship"
                      : k,
                  count: v,
                })),
            ];
          }
        }
        break;
      }
      case "blocks.testimonials-grid": {
        out.testimonials.Heading = block.Heading || FALLBACK.testimonials.Heading;
        out.testimonials.description = block.description || FALLBACK.testimonials.description;
        out.testimonials.items = Array.isArray(block.testimonials) && block.testimonials.length ?
           block.testimonials.map((t) => ({
            name: t.name || "",
            country: t.country || null,
            program: t.program || null,
            rating: Math.max(1, Math.min(5, t.rating ?? 5)),
            text: t.text || "",
            
          }))
        : [];
        break;
      }
      case "blocks.video-grid": {
        out.videos.Heading = block.Heading || FALLBACK.videos.Heading;
        out.videos.description = block.description || FALLBACK.videos.description;
        if (Array.isArray(block.videos) && block.videos.length) {
          out.videos.items = block.videos.map((v) => ({
            name: v.name || "",
            country: v.country || null,
            program: v.program || null,
            thumbnailUrl: v.thumbnailUrl || null,
            url: v.url || null,
          }));
        }
        break;
      }
      case "blocks.cta-section": {
        out.cta.Heading = block.Heading || FALLBACK.cta.Heading;
        out.cta.description = block.description || FALLBACK.cta.description;
        out.cta.cta = block.cta
          ? {
              label: block.cta.label,
              url: block.cta.url,
              variant: block.cta.variant || "default",
              icon: block.cta.icon || undefined,
            }
          : FALLBACK.cta.cta;
        break;
      }
      default:
        break;
    }
  }

  return out;
}

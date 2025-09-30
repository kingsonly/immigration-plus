// lib/mappers/resourcesLanding.ts
import type { StrapiResourcesLanding } from "@/lib/api/resourcesLanding";

// ---------- FALLBACKS (your current hardcoded content) ----------
const FALLBACK = {
  hero: {
    Title: "Immigration Resources",
    Subtitle: "Your Canadian Journey Toolkit",
    description:
      "<p>Guides, calculators, and the latest updates — all in one place.</p>",
    ctas: [
      { label: "Browse Library", url: "/resources", variant: "default", icon: "ArrowRight" },
      { label: "Tools", url: "/tools", variant: "outline", icon: "Calculator" },
    ],
  },
  featuredHeading: {
    Heading: "Featured Resources",
    description: "Our most popular immigration resources",
    cta: { label: "View All", url: "/resources", variant: "link", icon: "ArrowRight" },
  },
  featuredStrip: [
    { title: "Express Entry Guide 2024", slug: "express-entry-guide-2024", icon: "BookOpen", colorClass: "from-red-500 to-red-600" },
    { title: "PNP Comparison", slug: "pnp-comparison", icon: "Calculator", colorClass: "from-red-600 to-pink-600" },
    { title: "PR Checklist", slug: "pr-document-checklist", icon: "CheckCircle", colorClass: "from-pink-600 to-red-500" },
  ],
  toolsHeading: {
    Heading: "Immigration Tools",
    description: "Interactive tools to plan your journey",
  },
  tools: [
    { name: "CRS Score Calculator", description: "Calculate your Comprehensive Ranking System score for Express Entry", icon: "Calculator", colorClass: "from-blue-500 to-blue-600", link: "/tools/crs-calculator" },
    { name: "Processing Time Tracker", description: "Track current processing times for all immigration programs", icon: "Clock", colorClass: "from-green-500 to-green-600", link: "/tools/processing-times" },
    { name: "Document Checklist Generator", description: "Generate personalized document checklists for your application", icon: "FileText", colorClass: "from-purple-500 to-purple-600", link: "/tools/checklist-generator" },
    { name: "Cost Calculator", description: "Calculate total costs for your immigration application", icon: "Calculator", colorClass: "from-orange-500 to-orange-600", link: "/tools/cost-calculator" },
  ],
  newsHeading: {
    Heading: "Latest Immigration News",
    description: "Stay updated with the latest changes and announcements in Canadian immigration",
  },
  news: [
    { title: "Express Entry Draw Results - January 2024", summary: "Latest Express Entry draw invited 3,500 candidates with a minimum CRS score of 524.", dateISO: "2024-01-24", category: "Express Entry", urgent: false, slug: "express-entry-draw-jan-2024" },
    { title: "New Provincial Nominee Allocations Announced", summary: "IRCC announces increased PNP allocations for 2024, with Ontario receiving the largest increase.", dateISO: "2024-01-22", category: "PNP", urgent: true, slug: "pnp-allocations-2024" },
    { title: "Changes to Study Permit Requirements", summary: "New financial requirements and attestation letters now required for study permit applications.", dateISO: "2024-01-20", category: "Study Permits", urgent: true, slug: "study-permit-updates-2024" },
    { title: "Family Sponsorship Program Updates", summary: "Processing times reduced for spouse sponsorship applications, new online portal launched.", dateISO: "2024-01-18", category: "Family Sponsorship", urgent: false, slug: "family-sponsorship-updates-2024" },
  ],
  libraryHeading: {
    Heading: "Resource Library",
    description: "Browse our complete collection of immigration guides, checklists, and helpful resources",
  },
  library: [
    {
      title: "How to Improve Your CRS Score",
      description: "Proven strategies to boost your Comprehensive Ranking System score and get an ITA faster.",
      type: "guide",
      category: "guides",
      readTime: "8 min read",
      author: "Sarah Johnson",
      dateISO: "2024-01-20",
      tags: ["Express Entry", "CRS", "Tips"],
      slug: "improve-crs-score",
    },
    {
      title: "Study Permit Application Checklist",
      description: "Complete list of documents and requirements for Canadian study permit applications.",
      type: "checklist",
      category: "checklists",
      readTime: "3 min read",
      author: "Michael Chen",
      dateISO: "2024-01-18",
      tags: ["Study Permit", "Students", "Documents"],
      slug: "study-permit-application-checklist",
    },
    {
      title: "Business Immigration Requirements Calculator",
      description: "Calculate if you meet the requirements for various Canadian business immigration programs.",
      type: "calculator",
      category: "calculators",
      readTime: "Interactive",
      author: "Priya Patel",
      dateISO: "2024-01-16",
      tags: ["Business Immigration", "Calculator", "Requirements"],
      slug: "business-immigration-requirements-calculator",
    },
  ],
  newsletter: {
    Heading: "Stay Updated",
    description: "Subscribe to our newsletter for the latest immigration news, tips, and resources delivered to your inbox.",
    cta: { label: "Subscribe", url: "/newsletter", variant: "default", icon: "Mail" },
  },
};

// ---------- Adapt to client props ----------
export interface ResourcesLandingProps {
  hero: {
    Title: string;
    Subtitle?: string | null;
    descriptionHTML?: string | null;
    ctas: Array<{ label: string; url: string; variant?: string | null; icon?: string | null }>;
  };
  featuredHeading: {
    Heading: string;
    description?: string | null;
    cta?: { label: string; url: string; variant?: string | null; icon?: string | null } | null;
  };
  featuredStrip: Array<{ title: string; slug: string; icon?: string | null; colorClass?: string | null }>;
  toolsHeading: { Heading: string; description?: string | null };
  tools: Array<{ name: string; description?: string | null; icon?: string | null; colorClass?: string | null; link?: string | null }>;
  newsHeading: { Heading: string; description?: string | null };
  news: Array<{ title: string; summary: string; dateLabel: string; category: string; urgent?: boolean; slug: string }>;
  libraryHeading: { Heading: string; description?: string | null };
  library: Array<{ title: string; description: string; type: string; category: string; readTime: string; author: string; dateLabel: string; tags: string[]; slug: string }>;
  newsletter: { Heading: string; description?: string | null; cta?: { label: string; url: string; variant?: string | null; icon?: string | null } | null };
}

// SSR-safe date formatting
function formatDateISO(iso?: string | null) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return iso || "";
  }
}

export function adaptResourcesLanding(api: StrapiResourcesLanding | null): ResourcesLandingProps {
  if (!api || !Array.isArray(api.blocks)) {
    // All fallbacks
    return {
      hero: {
        Title: FALLBACK.hero.Title,
        Subtitle: FALLBACK.hero.Subtitle,
        descriptionHTML: FALLBACK.hero.description,
        ctas: FALLBACK.hero.ctas,
      },
      featuredHeading: FALLBACK.featuredHeading,
      featuredStrip: FALLBACK.featuredStrip,
      toolsHeading: FALLBACK.toolsHeading,
      tools: FALLBACK.tools.map((t) => ({ ...t })),
      newsHeading: FALLBACK.newsHeading,
      news: FALLBACK.news.map((n) => ({
        title: n.title,
        summary: n.summary,
        dateLabel: formatDateISO(n.dateISO),
        category: n.category,
        urgent: n.urgent,
        slug: n.slug,
      })),
      libraryHeading: FALLBACK.libraryHeading,
      library: FALLBACK.library.map((r) => ({
        title: r.title,
        description: r.description,
        type: r.type,
        category: r.category,
        readTime: r.readTime,
        author: r.author,
        dateLabel: formatDateISO(r.dateISO),
        tags: r.tags,
        slug: r.slug,
      })),
      newsletter: FALLBACK.newsletter,
    };
  }

  // Start with fallbacks, then overwrite piecemeal with API values when present
  const out: ResourcesLandingProps = {
    hero: {
      Title: FALLBACK.hero.Title,
      Subtitle: FALLBACK.hero.Subtitle,
      descriptionHTML: FALLBACK.hero.description,
      ctas: FALLBACK.hero.ctas,
    },
    featuredHeading: { ...FALLBACK.featuredHeading },
    featuredStrip: [...FALLBACK.featuredStrip],
    toolsHeading: { ...FALLBACK.toolsHeading },
    tools: FALLBACK.tools.map((t) => ({ ...t })),
    newsHeading: { ...FALLBACK.newsHeading },
    news: FALLBACK.news.map((n) => ({
      title: n.title,
      summary: n.summary,
      dateLabel: formatDateISO(n.dateISO),
      category: n.category,
      urgent: n.urgent,
      slug: n.slug,
    })),
    libraryHeading: { ...FALLBACK.libraryHeading },
    library: FALLBACK.library.map((r) => ({
      title: r.title,
      description: r.description,
      type: r.type,
      category: r.category,
      readTime: r.readTime,
      author: r.author,
      dateLabel: formatDateISO(r.dateISO),
      tags: r.tags,
      slug: r.slug,
    })),
    newsletter: { ...FALLBACK.newsletter },
  };

  for (const block of api.blocks) {
    switch (block.__component) {
      case "blocks.hero": {
        out.hero.Title = block.Title || FALLBACK.hero.Title;
        out.hero.Subtitle = block.Subtitle ?? FALLBACK.hero.Subtitle ?? null;
        out.hero.descriptionHTML = block.description || FALLBACK.hero.description;
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
      case "blocks.heading-section": {
        // Use order to map to sections
        if (out.featuredHeading.Heading === FALLBACK.featuredHeading.Heading) {
          out.featuredHeading = {
            Heading: block.Heading || FALLBACK.featuredHeading.Heading,
            description: block.description || FALLBACK.featuredHeading.description,
            cta: block.cta
              ? {
                  label: block.cta.label,
                  url: block.cta.url,
                  variant: block.cta.variant || "link",
                  icon: block.cta.icon || undefined,
                }
              : FALLBACK.featuredHeading.cta,
          };
        } else if (out.toolsHeading.Heading === FALLBACK.toolsHeading.Heading) {
          out.toolsHeading = {
            Heading: block.Heading || FALLBACK.toolsHeading.Heading,
            description: block.description || FALLBACK.toolsHeading.description,
          };
        } else if (out.newsHeading.Heading === FALLBACK.newsHeading.Heading) {
          out.newsHeading = {
            Heading: block.Heading || FALLBACK.newsHeading.Heading,
            description: block.description || FALLBACK.newsHeading.description,
          };
        } else {
          out.libraryHeading = {
            Heading: block.Heading || FALLBACK.libraryHeading.Heading,
            description: block.description || FALLBACK.libraryHeading.description,
          };
        }
        break;
      }
      case "blocks.featured-strip": {
        if (Array.isArray(block.items) && block.items.length) {
          out.featuredStrip = block.items.map((i) => ({
            title: i.title,
            slug: i.slug,
            icon: i.icon || undefined,
            colorClass: i.colorClass || "from-red-500 to-red-600",
          }));
        }
        break;
      }
      case "blocks.tools-grid": {
        out.toolsHeading = {
          Heading: block.Heading || FALLBACK.toolsHeading.Heading,
          description: block.description || FALLBACK.toolsHeading.description,
        };
        if (Array.isArray(block.tools) && block.tools.length) {
          out.tools = (block.tools as any[])
            .map((t) =>
              typeof t === "number"
                ? null
                : {
                    name: t.name || "",
                    description: t.description || "",
                    icon: t.icon || undefined,
                    colorClass: t.colorClass || "from-red-500 to-red-600",
                    link: t.link || (t.slug ? `/tools/${t.slug}` : "#"),
                  }
            )
            .filter(Boolean) as ResourcesLandingProps["tools"];
        }
        break;
      }
      case "blocks.news-list": {
        out.newsHeading = {
          Heading: block.Heading || FALLBACK.newsHeading.Heading,
          description: block.description || FALLBACK.newsHeading.description,
        };
        if (Array.isArray(block.resources) && block.resources.length) {
          out.news = (block.resources as any[])
            .map((r) =>
              typeof r === "number"
                ? null
                : {
                    title: r.title || "",
                    summary: r.excerpt || "",
                    dateLabel: formatDateISO(r.publishedOn || r.lastUpdated),
                    category: r?.category?.name || r?.type || "News",
                    urgent: false,
                    slug: r.slug || "",
                  }
            )
            .filter(Boolean) as ResourcesLandingProps["news"];
        }
        break;
      }
      case "blocks.resource-grid": {
        out.libraryHeading = {
          Heading: block.Heading || FALLBACK.libraryHeading.Heading,
          description: block.description || FALLBACK.libraryHeading.description,
        };
        if (Array.isArray(block.resources) && block.resources.length) {
          out.library = (block.resources as any[])
            .map((r) =>
              typeof r === "number"
                ? null
                : {
                    title: r.title || "",
                    description: r.excerpt || "",
                    type: r.type || "guide",
                    category: r?.category?.slug || "guides",
                    readTime: r.readTime || "—",
                    author: r.author || "—",
                    dateLabel: formatDateISO(r.publishedOn || r.lastUpdated),
                    tags: Array.isArray(r.tags) ? r.tags.map((t: any) => t?.name || t?.slug).filter(Boolean) : [],
                    slug: r.slug || "",
                  }
            )
            .filter(Boolean) as ResourcesLandingProps["library"];
        }
        break;
      }
      case "blocks.newsletter-cta": {
        out.newsletter = {
          Heading: block.Heading || FALLBACK.newsletter.Heading,
          description: block.description || FALLBACK.newsletter.description,
          cta: block.cta
            ? {
                label: block.cta.label,
                url: block.cta.url,
                variant: block.cta.variant || "default",
                icon: block.cta.icon || undefined,
              }
            : FALLBACK.newsletter.cta,
        };
        break;
      }
      default:
        break;
    }
  }

  return out;
}

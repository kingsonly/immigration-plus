// lib/mappers/tools.ts
import type { StrapiTool } from "@/lib/api/tools";

export type ToolsProps = {
  heading: string;
  description?: string;
  items: Array<{
    name: string;
    slug: string;
    description?: string;
    icon?: string | null;
    colorClass?: string | null;
    href: string;          // resolved link (external URL or /tools/[slug])
    isExternal: boolean;   // true if href is an external URL
    comingSoon: boolean;   // true if no external link (we’ll send users to /tools/[slug] “coming soon” page)
  }>;
};

// Fallbacks (shown if Strapi is empty or down)
const FALLBACK: ToolsProps = {
  heading: "Immigration Tools",
  description: "Interactive tools to help you plan your journey",
  items: [
    {
      name: "CRS Score Calculator",
      slug: "crs-calculator",
      description: "Calculate your Express Entry CRS score.",
      icon: "Calculator",
      colorClass: "from-blue-500 to-blue-600",
      href: "/tools/crs-calculator",
      isExternal: false,
      comingSoon: true,
    },
    {
      name: "Processing Time Tracker",
      slug: "processing-times",
      description: "Track current processing times.",
      icon: "Clock",
      colorClass: "from-green-500 to-green-600",
      href: "/tools/processing-times",
      isExternal: false,
      comingSoon: true,
    },
    {
      name: "Checklist Generator",
      slug: "checklist-generator",
      description: "Generate personalized document checklists.",
      icon: "FileText",
      colorClass: "from-purple-500 to-purple-600",
      href: "/tools/checklist-generator",
      isExternal: false,
      comingSoon: true,
    },
    {
      name: "Cost Calculator",
      slug: "cost-calculator",
      description: "Estimate your application costs.",
      icon: "Calculator",
      colorClass: "from-orange-500 to-orange-600",
      href: "/tools/cost-calculator",
      isExternal: false,
      comingSoon: true,
    },
  ],
};

function isExternalUrl(url?: string | null) {
  return !!url && /^https?:\/\//i.test(url);
}

export function adaptTools(api: StrapiTool[] | null): ToolsProps {
  if (!api || api.length === 0) return FALLBACK;

  const items = api.map((t) => {
    const external = isExternalUrl(t.link);
    const href = external ? (t.link as string) : `/tools/${t.slug}`;
    return {
      name: t.name,
      slug: t.slug,
      description: t.description ?? undefined,
      icon: t.icon ?? undefined,
      colorClass: t.colorClass ?? undefined,
      href,
      isExternal: external,
      comingSoon: !external, // no external link means we’ll show a coming-soon detail page
    };
  });

  return {
    heading: "Immigration Tools",
    description: "Interactive tools to help you plan your journey",
    items,
  };
}

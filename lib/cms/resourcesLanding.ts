// lib/strapi/resourcesLanding.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

type ApiResponse<T> = { data: T }

export async function getResourcesLanding({ locale }: { locale?: string }) {
  const params = new URLSearchParams()
  if (locale) params.set("locale", locale)
  // preview pulls draft; remove if you only want published
  params.set("publicationState", "preview")
  params.set("populate", "deep")

  const res = await fetch(`${STRAPI_URL}/api/resources-landing?${params}`, {
    // Revalidate on an interval so shared hosting doesn’t hold stale content forever
    // (tweak or remove if you're not using Next cache)
    next: { revalidate: 60 },
  })

  if (!res.ok) return null

  const json: ApiResponse<any> = await res.json()
  return adaptResourcesLanding(json?.data)
}

/** Map Strapi blocks -> shape your component understands */
function adaptResourcesLanding(entry: any) {
  if (!entry) return null
  const attrs = entry // v5 returns flattened attributes at top-level on REST

  const blocks = Array.isArray(attrs.blocks) ? attrs.blocks : []

  const hero = blocks.find((b: any) => b.__component === "blocks.hero")
  const featuredHeading = blocks.find((b: any) => b.__component === "blocks.heading-section")
  const featuredStrip = blocks.find((b: any) => b.__component === "blocks.featured-strip")
  const toolsGrid = blocks.find((b: any) => b.__component === "blocks.tools-grid")
  const newsList = blocks.find((b: any) => b.__component === "blocks.news-list")
  const resourceGrid = blocks.find((b: any) => b.__component === "blocks.resource-grid")
  const newsletter = blocks.find((b: any) => b.__component === "blocks.newsletter-cta")

  return {
    // page meta
    title: attrs.title,
    description: attrs.description,

    // sections
    hero: hero && {
      title: hero.Title,
      subtitle: hero.Subtitle,
      description: hero.description,
      ctas: (hero.ctas || []).map((c: any) => ({
        label: c.label,
        url: c.url,
        variant: c.variant,
        icon: c.icon,
      })),
    },

    featuredHeading: featuredHeading && {
      heading: featuredHeading.Heading,
      description: featuredHeading.description,
      cta: featuredHeading.cta && {
        label: featuredHeading.cta.label,
        url: featuredHeading.cta.url,
        variant: featuredHeading.cta.variant,
        icon: featuredHeading.cta.icon,
      },
    },

    featuredStrip: featuredStrip && {
      items: (featuredStrip.items || []).map((i: any) => ({
        title: i.title,
        slug: i.slug,
        icon: i.icon,
        colorClass: i.colorClass,
      })),
    },

    toolsGrid: toolsGrid && {
      heading: toolsGrid.Heading,
      description: toolsGrid.description,
      tools: (toolsGrid.tools || []).map((t: any) => ({
        name: t.name,
        description: t.description,
        icon: t.icon,
        colorClass: t.colorClass,
        link: t.link,
      })),
    },

    newsList: newsList && {
      heading: newsList.Heading,
      description: newsList.description,
      resources: (newsList.resources || []).map((r: any) => ({
        title: r.title,
        summary: r.excerpt,
        date: r.publishedOn,
        category: (r.category && r.category.name) || "",
        slug: r.slug,
      })),
    },

    resourceGrid: resourceGrid && {
      heading: resourceGrid.Heading,
      description: resourceGrid.description,
      resources: (resourceGrid.resources || []).map((r: any) => ({
        title: r.title,
        description: r.excerpt,
        type: r.type,
        category: r.category?.slug,
        readTime: r.readTime,
        author: r.author,
        date: r.publishedOn,
        tags: (r.tags || []).map((t: any) => t.name),
      })),
    },

    newsletter: newsletter && {
      heading: newsletter.Heading,
      description: newsletter.description,
      cta: newsletter.cta && {
        label: newsletter.cta.label,
        url: newsletter.cta.url,
        variant: newsletter.cta.variant,
        icon: newsletter.cta.icon,
      },
    },
  }
}

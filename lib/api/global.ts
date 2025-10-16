// lib/api/global.ts
import { fetchJSON, toMediaAsset } from "@/lib/strapi";

export type MediaAsset = {
  url: string;
  alt: string | null;
};

export type NavDropdown = {
  id: number;
  label: string;
  url?: string | null;
  icon?: string | null;
};

export type NavLink = {
  id: number;
  label: string;
  url?: string | null;
  icon?: string | null;
  image?: MediaAsset | null;
  dropdown?: NavDropdown[];
};

export type HeaderLogo = {
  id: number;
  label?: string;
  url?: string | null;
  icon?: string | null;
  image?: MediaAsset | null;
};

export type HeaderComponent = {
  id: number;
  Logo?: HeaderLogo | null;
  NavLink: NavLink[];
};

export type FooterContactDetail = {
  id: number;
  label?: string | null;
  value: string;
  type?: "phone" | "email" | "location" | "other" | null;
  href?: string | null;
};

export type FooterComponent = {
  id: number;
  logo?: MediaAsset | null;
  logoAlt?: string | null;
  companyName?: string | null;
  companyTagline?: string | null;
  FooterLinks: NavLink[];
  ContactDetails: FooterContactDetail[];
  FooterCopyright?: string | null;
};

export type GlobalResponse = {
  id: number;
  documentId?: string;
  siteTitle?: string | null;
  siteDescription?: string | null;
  contactEmail?: string | null;
  socialLinks?: any[];
  Header?: HeaderComponent | null;
  Footer?: FooterComponent | null;
};

function mapNavDropdown(input: any): NavDropdown {
  return {
    id: input?.id ?? 0,
    label: input?.label ?? "",
    url: input?.url ?? "#",
    icon: input?.icon ?? null,
  };
}

function mapNavLink(input: any): NavLink {
  return {
    id: input?.id ?? 0,
    label: input?.label ?? "",
    url: input?.url ?? "#",
    icon: input?.icon ?? null,
    image: toMediaAsset(input?.image),
    dropdown: Array.isArray(input?.dropdown) ? input.dropdown.map(mapNavDropdown) : [],
  };
}

const FOOTER_CONTACT_FALLBACK: FooterContactDetail[] = [
  {
    id: Number.MAX_SAFE_INTEGER - 2,
    label: "Call Us",
    value: "+1 (613) 371-6611",
    type: "phone",
    href: "tel:+16133716611",
  },
  {
    id: Number.MAX_SAFE_INTEGER - 3,
    label: "Location",
    value: "Burlington, Ontario",
    type: "location",
    href: null,
  },
];

function contactKey(detail: FooterContactDetail): string {
  if (detail.type) return `type:${detail.type}`;
  if (detail.label) return `label:${detail.label.toLowerCase()}`;
  return `value:${detail.value.toLowerCase()}`;
}

function mergeFooterContacts(primary: FooterContactDetail[]): FooterContactDetail[] {
  const sanitized = primary.filter((detail) => typeof detail.value === "string" && detail.value.trim().length > 0);
  const seen = new Set(sanitized.map(contactKey));

  FOOTER_CONTACT_FALLBACK.forEach((fallback) => {
    if (!seen.has(contactKey(fallback))) {
      sanitized.push(fallback);
      seen.add(contactKey(fallback));
    }
  });

  return sanitized;
}

// Fetch Global with populated components
type StrapiGlobalNode = {
  id: number;
  documentId: string;
  siteTitle?: string | null;
  siteDescription?: string | null;
  contactEmail?: string | null;
  socialLinks?: any[];
  Header?: any;
  Footer?: any;
};

type StrapiGlobalResponse =
  | {
      data?: StrapiGlobalNode | null;
    }
  | {
      data?: { id: number; attributes?: StrapiGlobalNode | null } | null;
    };

function normalizeNode(node: any): StrapiGlobalNode | null {
  if (!node) return null;
  if (node.attributes) {
    return {
      id: node.id,
      documentId: node.attributes.documentId ?? node.documentId,
      siteTitle: node.attributes.siteTitle ?? node.siteTitle,
      siteDescription: node.attributes.siteDescription ?? node.siteDescription,
      contactEmail: node.attributes.contactEmail ?? node.contactEmail,
      socialLinks: node.attributes.socialLinks ?? node.socialLinks,
      Header: node.attributes.Header ?? node.Header,
      Footer: node.attributes.Footer ?? node.Footer,
    };
  }
  return node as StrapiGlobalNode;
}

export async function fetchGlobal(): Promise<GlobalResponse | null> {
  const params = new URLSearchParams();
  params.set("populate", "deep");
  const previewEnabled = process.env.NEXT_PUBLIC_STRAPI_PREVIEW === "1";
  if (previewEnabled) params.set("publicationState", "preview");
  const locale = process.env.NEXT_PUBLIC_STRAPI_LOCALE;
  if (locale) params.set("locale", locale);

  try {
    const json = await fetchJSON<StrapiGlobalResponse>(`/api/global?${params.toString()}`, {
      cache: "no-store",
    });
    const data = normalizeNode(json?.data);
    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      siteTitle: data.siteTitle ?? null,
      siteDescription: data.siteDescription ?? null,
      contactEmail: data.contactEmail ?? null,
      socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
      Header: data.Header
        ? {
            id: data.Header.id,
            Logo: data.Header.Logo
              ? {
                  id: data.Header.Logo.id,
                  label: data.Header.Logo.label ?? "",
                  url: data.Header.Logo.url ?? "/",
                  icon: data.Header.Logo.icon ?? null,
                  image: toMediaAsset(data.Header.Logo.image),
                }
              : null,
            NavLink: Array.isArray(data.Header.NavLink) ? data.Header.NavLink.map(mapNavLink) : [],
          }
        : null,
      Footer: data.Footer
        ? {
            id: data.Footer.id,
            logo: toMediaAsset(data.Footer.logo),
            logoAlt: data.Footer.logoAlt ?? null,
            companyName: data.Footer.companyName ?? null,
            companyTagline: data.Footer.companyTagline ?? null,
            FooterLinks: Array.isArray(data.Footer.FooterLinks)
              ? data.Footer.FooterLinks.map(mapNavLink)
              : [],
            ContactDetails: Array.isArray(data.Footer.ContactDetails)
              ? mergeFooterContacts(
                  data.Footer.ContactDetails.map((c: any) => ({
                    id: c?.id ?? 0,
                    label: c.label ?? null,
                    value: c.value ?? "",
                    type: c.type ?? null,
                    href: c.href ?? null,
                  }))
                )
              : mergeFooterContacts([]),
            FooterCopyright: data.Footer.FooterCopyright ?? null,
          }
        : null,
    };
  } catch {
    return null;
  }
}

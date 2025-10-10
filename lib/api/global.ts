// lib/api/global.ts
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
  image?: any;
  dropdown?: NavDropdown[];
};

export type HeaderComponent = {
  id: number;
  Logo?: { id: number; label?: string; url?: string | null; icon?: string | null } | null;
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
  FooterLinks: NavLink[];
  ContactDetails: FooterContactDetail[];
  FooterCopyright?: string | null;
};

export type GlobalResponse = {
  id: number;
  documentId: string;
  siteTitle?: string | null;
  siteDescription?: string | null;
  contactEmail?: string | null;
  socialLinks?: any[];
  Header?: HeaderComponent | null;
  Footer?: FooterComponent | null;
};

// Fetch Global with populated components
export async function fetchGlobal(): Promise<GlobalResponse | null> {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
  const url = `${base.replace(/\/$/, "")}/api/global?populate[Header][populate][NavLink][populate]=dropdown,image&populate[Header][populate]=Logo,NavLink&populate[Footer][populate]=FooterLinks,ContactDetails&publicationState=preview`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const json = await res.json();
    const data = json?.data;
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
                }
              : null,
            NavLink: Array.isArray(data.Header.NavLink)
              ? data.Header.NavLink.map((n: any) => ({
                  id: n.id,
                  label: n.label ?? "",
                  url: n.url ?? "#",
                  icon: n.icon ?? null,
                  image: n.image ?? null,
                  dropdown: Array.isArray(n.dropdown)
                    ? n.dropdown.map((d: any) => ({
                        id: d.id,
                        label: d.label ?? "",
                        url: d.url ?? "#",
                        icon: d.icon ?? null,
                      }))
                    : [],
                }))
              : [],
          }
        : null,
      Footer: data.Footer
        ? {
            id: data.Footer.id,
            FooterLinks: Array.isArray(data.Footer.FooterLinks)
              ? data.Footer.FooterLinks.map((n: any) => ({
                  id: n.id,
                  label: n.label ?? "",
                  url: n.url ?? "#",
                  icon: n.icon ?? null,
                  image: n.image ?? null,
                  dropdown: Array.isArray(n.dropdown)
                    ? n.dropdown.map((d: any) => ({
                        id: d.id,
                        label: d.label ?? "",
                        url: d.url ?? "#",
                        icon: d.icon ?? null,
                      }))
                    : [],
                }))
              : [],
            ContactDetails: Array.isArray(data.Footer.ContactDetails)
              ? data.Footer.ContactDetails.map((c: any) => ({
                  id: c.id,
                  label: c.label ?? null,
                  value: c.value ?? "",
                  type: c.type ?? null,
                  href: c.href ?? null,
                })).filter((c: FooterContactDetail) => Boolean(c.value))
              : [],
            FooterCopyright: data.Footer.FooterCopyright ?? null,
          }
        : null,
    };
  } catch {
    return null;
  }
}

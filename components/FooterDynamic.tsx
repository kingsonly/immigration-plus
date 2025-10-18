// components/FooterDynamic.tsx
import Link from "next/link";
import Image from "next/image";

type MediaAsset = {
  url: string;
  alt: string | null;
};

export type FooterLink = {
  id: number;
  label: string;
  url?: string | null;
};

export type ContactDetail = {
  id: number;
  label?: string | null;
  value: string;
  type?: "phone" | "email" | "location" | "other" | null;
  href?: string | null;
};

export type FooterProps = {
  links: FooterLink[];
  contactDetails?: ContactDetail[];
  logo?: MediaAsset | null;
  logoAlt?: string | null;
  companyName?: string | null;
  companyTagline?: string | null;
  description?: string | null;
  copyright?: string | null;
};

type FooterFallback = {
  links: FooterLink[];
  contactDetails: ContactDetail[];
  logo: MediaAsset | null;
  logoAlt: string | null;
  companyName: string;
  companyTagline: string;
  description: string;
  copyright: string;
};

function fallback(): FooterFallback {
  return {
    links: [
      { id: 1, label: "Permanent Residency", url: "/services/permanent-residency" },
      { id: 2, label: "Business Immigration", url: "/services/business-immigration" },
      { id: 3, label: "Study", url: "/services/study" },
      { id: 4, label: "Work Permits", url: "/services/work-permit" },
      { id: 5, label: "Family Sponsorship", url: "/services/family-sponsorship" },
      { id: 6, label: "Visitor Visa", url: "/services/visitors-visa" },
      { id: 7, label: "Citizenship & Integration", url: "/services/citizenship" },
      { id: 8, label: "Recruitment", url: "/services/recruitment" },
      { id: 9, label: "About Us", url: "/about" },
      { id: 10, label: "Immigration Programs", url: "/programs" },
      { id: 11, label: "Resources", url: "/resources" },
      { id: 12, label: "Success Stories", url: "/success-stories" },
      { id: 13, label: "Contact", url: "/contact" }
    ],
    contactDetails: [
      {
        id: 1,
        label: "Call Us",
        value: "+1 (604) 555-1234",
        type: "phone",
        href: "tel:+16045551234"
      },
      {
        id: 2,
        label: "Email",
        value: "info@coming2canada.co",
        type: "email",
        href: "mailto:info@coming2canada.co"
      },
      {
        id: 3,
        label: "Location",
        value: "Vancouver, British Columbia",
        type: "location"
      }
    ],
    logo: { url: "/logo.png", alt: "Coming2Canada logo" },
    logoAlt: "Coming2Canada logo",
    companyName: "Coming2Canada",
    companyTagline: "TENTACULAR IMMIGRATION SOLUTIONS LTD",
    description: "Your trusted partner for Canadian immigration success.",
    copyright: "Ac 2025 TENTACULAR IMMIGRATION SOLUTIONS LTD. All rights reserved.",
  };
}

function contactKey(detail: ContactDetail): string {
  if (detail.type) return `type:${detail.type}`;
  if (detail.label) return `label:${detail.label.toLowerCase()}`;
  return `value:${detail.value.toLowerCase()}`;
}

function mergeContactDetails(primary: ContactDetail[], fallbackDetails: ContactDetail[]): ContactDetail[] {
  if (!primary.length) return fallbackDetails;

  const seen = new Set(primary.map(contactKey));
  const extras = fallbackDetails.filter((detail) => !seen.has(contactKey(detail)));
  return [...primary, ...extras];
}

function resolveContactHref(detail: ContactDetail): string | null {
  if (detail.href && detail.href.trim().length > 0) return detail.href;

  const value = detail.value?.trim();
  if (!value) return null;

  if (detail.type === "phone") {
    const digits = value.replace(/[^0-9+]/g, "");
    return digits ? `tel:${digits}` : null;
  }

  if (detail.type === "email") {
    return `mailto:${value}`;
  }

  return null;
}

function fallbackLabel(detail: ContactDetail): string | null {
  if (detail.label && detail.label.trim()) return detail.label;
  if (!detail.type) return null;
  return detail.type.charAt(0).toUpperCase() + detail.type.slice(1);
}

export default function FooterDynamic(props: FooterProps) {
  const fallbackData = fallback();
  const links = props.links?.length ? props.links : fallbackData.links;
  const providedContacts = Array.isArray(props.contactDetails)
    ? props.contactDetails.filter((detail) => Boolean(detail?.value?.trim()))
    : [];
  const contactDetails = mergeContactDetails(providedContacts, fallbackData.contactDetails);
  const logo = props.logo ?? fallbackData.logo;
  const logoAlt = props.logoAlt ?? logo?.alt ?? fallbackData.logoAlt;
  const companyName = props.companyName ?? fallbackData.companyName;
  const companyTagline = props.companyTagline ?? fallbackData.companyTagline;
  const description = props.description ?? fallbackData.description;
  const copyright = props.copyright ?? fallbackData.copyright;
  const logoSrc = logo?.url ?? "/logo.png";

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {logoSrc ? (
                <div className="min-w-8 min-h-8 bg-gradient-to-r from-white to-white rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={logoSrc}
                    alt={logoAlt || companyName || "Site logo"}
                    width={60}
                    height={60}
                    className="h-20 w-20 md:h-full md:w-full object-contain"
                  />
                </div>
              ) : null}
              {companyName ? <span className="font-bold text-xl">{companyName}</span> : null}
            </div>
            {companyTagline ? <p className="text-gray-400 mb-4">{companyTagline}</p> :  <p className="text-gray-400">{description}</p>}


            <ul className="mt-6 space-y-3 text-gray-400">
              {contactDetails.map((detail) => {
                const href = resolveContactHref(detail);
                const label = fallbackLabel(detail);
                const key = detail.id ?? `${detail.type ?? "detail"}-${detail.value}`;

                return (
                  <li key={key} className="flex flex-col">
                    {label ? <span className="text-sm font-semibold text-white">{label}</span> : null}
                    {href ? (
                      <a href={href} className="hover:text-white transition">
                        {detail.value}
                      </a>
                    ) : (
                      <span>{detail.value}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {links.slice(0, 8).map((l) => (
                <li key={l.id}>
                  <Link href={l.url || "#"} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">More</h3>
            <ul className="space-y-2 text-gray-400">
              {links.slice(8).map((l) => (
                <li key={l.id}>
                  <Link href={l.url || "#"} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4"> Immigration Consultant</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  target="_blank"
                  href="https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=40974&b9100e1006f6=2#b9100e1006f6"
                  className="hover:text-white"
                >
                  <Image src="/rcic-irb.jpeg" alt="rcic-irb Logo" width={200} height={100} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}

// lib/mappers/contactLanding.ts
import type { StrapiContactLanding, StrapiContactBlock } from "@/lib/api/contactLanding";

export type ContactLandingProps = {
  hero: {
    title: string;
    subtitle?: string | null;
    descriptionHTML?: string | null; // we render with dangerouslySetInnerHTML
    ctas: Array<{ label: string; url: string; variant?: string | null; icon?: string | null }>;
  };
  cards: Array<{ title: string; icon?: string | null; details: string[]; colorClass?: string | null }>;
  form: {
    services: string[];
    successMessage: string;
    redirectUrl: string;
  };
  calendly: {
    title: string;
    description?: string | null;
    calendlyLink?: string | null;
    expectations: string[];
  };
  faqs: Array<{ question: string; answer: string }>;
};

// -------- fallbacks (used when Strapi is empty/offline) --------
const FALLBACK: ContactLandingProps = {
  hero: {
    title: "Contact",
    subtitle: "Ready to start your Canadian immigration journey?",
    descriptionHTML:
      "We’re here to answer your questions and guide you every step of the way.",
    ctas: [],
  },
  cards: [
    {
      title: "Phone",
      icon: "Phone",
      details: ["+1 (XXX) XXX-XXXX", "Mon–Fri 9AM–6PM EST"],
      colorClass: "from-red-500 to-red-600",
    },
    {
      title: "Email",
      icon: "Mail",
      details: ["info@coming2canada.co", "We respond within 24 hours"],
      colorClass: "from-red-600 to-pink-600",
    },
    {
      title: "Office",
      icon: "MapPin",
      details: ["Toronto, Ontario", "Canada"],
      colorClass: "from-pink-600 to-red-500",
    },
    {
      title: "Business Hours",
      icon: "Clock",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
      colorClass: "from-red-500 to-red-700",
    },
  ],
  form: {
    services: [
      "Permanent Residency (PR)",
      "Business Immigration",
      "Study & Work Permits",
      "Family Sponsorship",
      "Provincial Nominee Program",
      "Citizenship Application",
      "Other",
    ],
    successMessage:
      "Your message has been sent successfully. We'll get back to you within 24 hours.",
    redirectUrl: "/contact",
  },
  calendly: {
    title: "Book a Consultation",
    description:
      "Schedule a free 30-minute consultation with one of our licensed immigration consultants.",
    calendlyLink: "https://calendly.com/tentacular-immigration",
    expectations: [
      "Comprehensive profile assessment",
      "Discussion of available immigration programs",
      "Timeline and process overview",
      "Personalized recommendations",
      "Next steps and action plan",
    ],
  },
  faqs: [
    {
      question: "How long does the consultation take?",
      answer: "Our initial consultation typically takes 30–45 minutes.",
    },
    {
      question: "Do you charge for the initial consultation?",
      answer:
        "No, we offer a free initial consultation to assess your profile and discuss your immigration options.",
    },
  ],
};

// -------- mapper --------
export function adaptContactLanding(api: StrapiContactLanding | null): ContactLandingProps {
  if (!api || !Array.isArray(api.blocks)) return FALLBACK;

  const out: ContactLandingProps = JSON.parse(JSON.stringify(FALLBACK)); // deep clone fallbacks

  // We'll collect pieces by scanning the blocks
  const cards: ContactLandingProps["cards"] = [];
  const faqs: ContactLandingProps["faqs"] = [];

  for (const block of api.blocks as StrapiContactBlock[]) {
    switch (block.__component) {
      case "blocks.hero": {
        out.hero.title = block.Title || out.hero.title;
        out.hero.subtitle = block.Subtitle ?? out.hero.subtitle ?? null;
        // Allow plain text from Strapi; still render as HTML safely
        out.hero.descriptionHTML =
          block.description?.includes("<") ? block.description : (block.description || out.hero.descriptionHTML);
        out.hero.ctas =
          Array.isArray(block.ctas) && block.ctas.length
            ? block.ctas.map((c) => ({
                label: c.label,
                url: c.url,
                variant: c.variant || "default",
                icon: c.icon || undefined,
              }))
            : out.hero.ctas;
        break;
      }

      case "blocks.contact-card": {
        cards.push({
          title: block.title,
          icon: block.icon || undefined,
          details: Array.isArray(block.details) ? block.details : [],
          colorClass: block.colorClass || undefined,
        });
        break;
      }

      case "blocks.contact-form": {
        out.form.services =
          Array.isArray(block.services) && block.services.length
            ? block.services
            : out.form.services;
        out.form.successMessage =
          block.successMessage || out.form.successMessage;
        out.form.redirectUrl = block.redirectUrl || out.form.redirectUrl;
        break;
      }

      case "blocks.calendly": {
        out.calendly.title = block.title || out.calendly.title;
        out.calendly.description = block.description || out.calendly.description;
        out.calendly.calendlyLink =
          block.calendlyLink || out.calendly.calendlyLink;
        out.calendly.expectations =
          Array.isArray(block.expectations) && block.expectations.length
            ? block.expectations
            : out.calendly.expectations;
        break;
      }

      case "blocks.faq": {
        faqs.push({
          question: block.question,
          answer: block.answer,
        });
        break;
      }

      default:
        break;
    }
  }

  if (cards.length) out.cards = cards;
  if (faqs.length) out.faqs = faqs;

  return out;
}

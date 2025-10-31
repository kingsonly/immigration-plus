"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown, Users, GraduationCap, Briefcase, Heart, Home as HomeIcon, CheckCircle,
  ArrowRight, Star, Award, Globe, Plane, HeartHandshake, BriefcaseBusiness, ShieldCheck,
} from "lucide-react";
import HomePageSkeleton from "../pageSkeletons/HomePageSkeleton";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

type StrapiHomepage = {
  id?: number;
  title?: string;
  description?: string;
  blocks?: any[];
};

const IconMap: Record<string, any> = {
  // services/CTA icons
  Home: HomeIcon, Award, BriefcaseBusiness, GraduationCap, Briefcase, Plane, HeartHandshake, ShieldCheck, Users, Globe, Star,
  // misc
  ArrowRight, CheckCircle,
};
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle;

/* ---------- adapter: Strapi blocks -> UI ---------- */
function adaptHomepage(entry: StrapiHomepage | null) {
  if (!entry || !Array.isArray(entry.blocks)) return null;
  const blocks = entry.blocks;
  const byType = (t: string) => blocks.filter((b) => b?.__component === t);

  // proximity headings
  const nearestHeading: Record<number, any | null> = {};
  let last: any | null = null;
  blocks.forEach((b, i) => {
    if (b?.__component === "blocks.heading-section") last = b;
    nearestHeading[i] = last;
  });
  const headingBefore = (pred: (b: any) => boolean) => {
    const idx = blocks.findIndex(pred);
    return idx >= 0 ? nearestHeading[idx] : null;
  };

  // hero
  const heroBlock = byType("blocks.hero")[0];
  const hero = heroBlock
    ? {
        titleTop: heroBlock.Title || "Immigration Made Simple",
        titleBottom: heroBlock.Subtitle || "Your Canadian Dream",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
      }
    : null;

  // services grid -> alternating sections
  const servicesGrid = blocks.find((b) => b?.__component === "blocks.card-grid" && /services/i.test(b?.Heading || ""));
  const palette = [
    "from-red-500 to-red-600",
    "from-red-600 to-pink-600",
    "from-pink-600 to-red-500",
    "from-red-500 to-red-700",
    "from-red-700 to-pink-500",
    "from-pink-500 to-red-600",
  ];
  const services = Array.isArray((servicesGrid as any)?.Cards)
    ? (servicesGrid as any).Cards.map((c: any, i: number) => ({
        iconName: c.icon,
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
        details: Array.isArray(c.lists) && c.lists.length
          ? c.lists.map((l: any) => l?.listItem).filter(Boolean).join(" • ")
          : c.description,
        colorClass: palette[i % palette.length],
        slug: c?.link?.url || "#",
      }))
    : null;

  // dynamic headings
  const H = {
    services:
      headingBefore((b) => b?.__component === "blocks.card-grid" && /services/i.test(b?.Heading || "")) ||
      byType("blocks.heading-section").find((h) => /journey|services/i.test(h?.Heading || "")) ||
      null,
    getStarted:
      blocks.findLast?.((b) => b?.__component === "blocks.heading-section" && (b?.cta || /get\s*started/i.test(b?.Heading || ""))) ||
      byType("blocks.heading-section").reverse().find((h) => h?.cta || /get\s*started/i.test(h?.Heading || "")) ||
      null,
  };

  // split-feature (can be multiple)
  const splitFeatures = byType("blocks.split-feature").map((sf) => ({
    title: sf.title,
    subtitle: sf.subtitle || "",
    html: sf.description || "",
    icon: pickIcon(sf.icon),
    cardIcon: pickIcon(sf.cardIcon),
    reverse: !!sf.reverse,
    items: Array.isArray(sf.items) ? sf.items.map((i: any) => i?.listItem).filter(Boolean) : [],
    // image is not in schema per your model; omit
  }));

  // CTA card-grid (e.g., “CTA” section)
  const ctaGrid = blocks.find((b) => b?.__component === "blocks.card-grid" && /cta/i.test(b?.Heading || ""));
  const ctaCards = Array.isArray((ctaGrid as any)?.Cards)
    ? (ctaGrid as any).Cards.map((c: any) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
      }))
    : [];

  // final CTA button from heading-section with CTA
  const finalCTA = H.getStarted
    ? {
        heading: H.getStarted.Heading,
        description: H.getStarted.description || "",
        cta: H.getStarted.cta || { label: "Book Consultation", url: "/contact", variant: "default" },
      }
    : null;

  return { hero, services, H, splitFeatures, ctaCards, finalCTA };
}

/* ---------- component ---------- */
export default function HomePage({ entry }: { entry: StrapiHomepage | null }) {
  const [cms, setCms] = useState<ReturnType<typeof adaptHomepage> | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // local fallbacks (minimal)
  const servicesLocal = useMemo(
    () => [
      { icon: HomeIcon, title: "Permanent Residency (PR)", description: "Your pathway to calling Canada home permanently", details: "Live, work, and study anywhere in Canada • Express Entry & PNP pathways", colorClass: "from-red-500 to-red-600", slug: "/services/permanent-residency" },
      { icon: Award, title: "Citizenship", description: "Become a citizen and complete your Canadian journey.", details: "Eligibility, test & oath guidance • Proof of citizenship", colorClass: "from-red-600 to-pink-600", slug: "/services/citizenship" },
      { icon: BriefcaseBusiness, title: "Business & Investor Immigration", description: "Invest in your future and Canada's economy", details: "Entrepreneur & investor programs • Job creation focus", colorClass: "from-pink-600 to-red-500", slug: "/services/business-immigration" },
    ],
    []
  );

  useEffect(() => {
    setCms(adaptHomepage(entry));
  }, [entry]);

  if (!cms) return <HomePageSkeleton />;

  const hero = cms.hero || {
    titleTop: "Immigration Made Simple",
    titleBottom: "Your Canadian Dream",
    html: "<p>TENTACULAR IMMIGRATION SOLUTIONS LTD guides you through every step—strategy to submission.</p>",
    ctas: [
      { label: "Start Your Journey", url: "/services", variant: "default", icon: "ArrowRight" },
      { label: "About Us", url: "/about", variant: "outline", icon: "Users" },
    ],
  };
  const services = cms.services?.length ? cms.services : servicesLocal;
  const splitFeatures = cms.splitFeatures || [];
  const ctaCards = cms.ctaCards || [];
  const finalCTA = cms.finalCTA;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 sm:pb-24">
        <motion.div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-pink-50" style={{ y }} />
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-pink-200 to-red-200 rounded-full opacity-20"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{hero.titleTop}</span>
              <br />
              <span className="text-gray-900">{hero.titleBottom}</span>
            </h1>
            {hero.html ? (
              <div className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: hero.html }} />
            ) : null}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              {(hero.ctas || []).map((c: any, i: number) => {
                const Icon = pickIcon(c.icon);
                const outline = (c?.variant || "default") === "outline";
                return (
                  <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Link href={c?.url || "#"}>
                      <Button
                        size="lg"
                        className={
                          outline
                            ? "border-red-500 text-red-600 hover:bg-red-50 text-base sm:text-lg px-6 sm:px-8 py-4 rounded-full w-1/2 sm:w-auto justify-center"
                            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-base sm:text-lg px-6 sm:px-8 py-4 rounded-full w-1/2 sm:w-auto justify-center"
                        }
                        variant={outline ? "outline" : "default"}
                      >
                        {c?.label || "Learn more"}
                        {!outline ? <ArrowRight className="ml-2 w-5 h-5" /> : null}
                        {outline && Icon ? <Icon className="ml-2 w-5 h-5" /> : null}
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <ChevronDown className="w-8 h-8 text-red-500" />
        </motion.div>
      </section>

      {/* Dynamic heading before Services (if present) */}
      {cms.H?.services ? (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {cms.H.services.Heading || "Your Immigration Journey"}
              </span>
            </h2>
            {cms.H.services.description ? (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{cms.H.services.description}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Services Journey (alternating) */}
      <section className="py-16 px-8 sm:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {(services || []).map((service: any, index: number) => {
              const Icon = service.icon || pickIcon(service.iconName);
              return (
                <motion.div
                  key={index}
                  className={`service-section relative flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex-1 space-y-6 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center items-start gap-4">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${service.colorClass} rounded-2xl flex items-center justify-center transform rotate-12`}>
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{service.title}</h3>
                        <p className="text-base sm:text-lg text-red-600 font-medium">{service.description}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{service.details}</p>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Expert guidance throughout the process</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Personalized strategy for your situation</span>
                    </div>
                    <Link href={service.slug || "#"}>
                      <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 mt-6 w-full sm:w-auto justify-center">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>

                  <div className="md:flex-1 md:flex hidden justify-center w-full">
                    <motion.div
                      className={`w-full max-w-xs sm:max-w-sm h-64 sm:h-72 md:h-80 bg-gradient-to-br ${service.colorClass} rounded-3xl transform rotate-6 flex items-center justify-center relative overflow-hidden shadow-xl`}
                      whileHover={{ rotate: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{
                          background: [
                            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                          ],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <Icon className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 text-white/80" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split Feature blocks */}
      {splitFeatures.length
        ? splitFeatures.map((sf, i) => {
            const Icon = sf.icon || Users;
            return (
              <section key={i} className={`py-16 sm:py-20 ${i % 2 === 1 ? "bg-gray-50" : "bg-white"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`grid gap-10 lg:grid-cols-2 lg:gap-16 items-center ${sf.reverse ? "lg:flex-row-reverse" : ""}`}>
                    <motion.div initial={{ opacity: 0, x: sf.reverse ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                      <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">{sf.title}</h2>
                      {sf.subtitle ? <p className="text-red-600 font-medium mb-4">{sf.subtitle}</p> : null}
                      {sf.html ? (
                        <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: sf.html }} />
                      ) : null}
                      <ul className="mt-6 space-y-3">
                        {(sf.items || []).map((it: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: sf.reverse ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative flex justify-center"
                    >
                      <div className="w-full max-w-xs sm:max-w-sm h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl transform rotate-3 hidden md:flex items-center justify-center relative overflow-hidden shadow-xl">
                        <motion.div
                          className="absolute inset-0 bg-white/10"
                          animate={{
                            background: [
                              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                              "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                            ],
                          }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <Icon className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 text-white/80" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })
        : null}

      {/* CTA Cards + Final CTA */}
      {(ctaCards.length || finalCTA) ? (
        <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-10"
            animate={{
              backgroundImage: [
                "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
                "radial-gradient(circle at 75% 75%, white 2px, transparent 2px)",
                "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            {ctaCards.length ? (
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {ctaCards.map((card: any, idx: number) => (
                  <Card key={idx} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6 text-center">
                      <card.icon className="w-8 h-8 text-white mx-auto mb-3" />
                      <h3 className="font-semibold text-white mb-2">{card.title}</h3>
                      <p className="text-white/80 text-sm">{card.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {finalCTA?.heading || "Ready to Start Your Canadian Journey?"}
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {finalCTA?.description ||
                  "Book a consultation with our expert immigration consultants and take the first step towards your new life in Canada."}
              </p>
              <Link href={finalCTA?.cta?.url || "/contact"}>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-12 py-4 rounded-full font-semibold">
                  {(finalCTA?.cta?.icon && pickIcon(finalCTA.cta.icon)) ? (
                    <finalCTA.cta.icon className="w-5 h-5 mr-3" />
                  ) : null}
                  {finalCTA?.cta?.label || "Book Consultation"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

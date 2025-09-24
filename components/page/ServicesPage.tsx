"use client";

import { motion } from "framer-motion";
import {
  Home,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Briefcase,
  Plane,
  HeartHandshake,
  ShieldCheck,
  UserSearch,
  FileText,
  Rocket,
  ArrowRight,
  Users,
  Clock,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* ---------- icons ---------- */
const IconMap: Record<string, any> = {
  Home,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Briefcase,
  Plane,
  HeartHandshake,
  ShieldCheck,
  UserSearch,
  FileText,
  Rocket,
  ArrowRight,
  Users,
  Clock,
  Heart,
  CheckCircle,
};
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle;

function makeHeadingResolver(blocks: any[]) {
  const nearest: Record<number, any | null> = {};
  let last: any | null = null;
  blocks.forEach((b, i) => {
    if (b?.__component === "blocks.heading-section") last = b;
    nearest[i] = last;
  });
  const headingBefore = (pred: (b: any) => boolean) => {
    const idx = blocks.findIndex(pred);
    return idx >= 0 ? nearest[idx] : null;
  };
  return { headingBefore };
}

/* ---------- adapter ---------- */
function adaptServicesLanding(entry: any | null) {
  const blocks = entry?.blocks;
  if (!Array.isArray(blocks)) return null;
  const byType = (t: string) => blocks.filter((b) => b?.__component === t);
  const { headingBefore } = makeHeadingResolver(blocks);

  // hero
  const heroBlock = byType("blocks.hero")[0];
  const hero = heroBlock
    ? {
        title: heroBlock.Title || entry?.title || "Our Services",
        html:
          heroBlock.description ||
          (entry?.description ? `<p>${entry.description}</p>` : ""),
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
      }
    : {
        title: entry?.title || "Our Services",
        html: entry?.description ? `<p>${entry.description}</p>` : "",
        ctas: [],
      };

  // headings (proximity)
  const H = {
    services:
      headingBefore(
        (b) =>
          b?.__component === "blocks.card-grid" &&
          /services/i.test(b?.Heading || "")
      ) ||
      byType("blocks.heading-section").find((h) =>
        /services/i.test(h?.Heading || "")
      ) ||
      null,
    process:
      headingBefore(
        (b) =>
          b?.__component === "blocks.process-steps-block" &&
          /process/i.test(b?.title || "")
      ) ||
      byType("blocks.heading-section").find((h) =>
        /process/i.test(h?.Heading || "")
      ) ||
      null,
    why:
      headingBefore(
        (b) =>
          b?.__component === "blocks.card-grid" && /why/i.test(b?.Heading || "")
      ) ||
      byType("blocks.heading-section").find((h) =>
        /why/i.test(h?.Heading || "")
      ) ||
      null,
    final:
      (blocks as any).findLast?.(
        (b: any) =>
          b?.__component === "blocks.heading-section" &&
          (b?.cta || /ready/i.test(b?.Heading || ""))
      ) ||
      [...byType("blocks.heading-section")]
        .reverse()
        .find((h) => h?.cta || /ready/i.test(h?.Heading || "")) ||
      null,
  };

  // services grid -> alternating sections
  const svcGrid =
    blocks.find(
      (b) =>
        b?.__component === "blocks.card-grid" &&
        /services/i.test(b?.Heading || "")
    ) || blocks.find((b) => b?.__component === "blocks.services");
  const palette = [
    "from-red-500 to-red-600",
    "from-red-600 to-pink-600",
    "from-pink-600 to-red-500",
    "from-red-500 to-red-700",
    "from-red-700 to-pink-500",
    "from-pink-500 to-red-600",
  ];
  const services = Array.isArray((svcGrid as any)?.Cards)
    ? (svcGrid as any).Cards.map((c: any, i: number) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
        details:
          Array.isArray(c.lists) && c.lists.length
            ? c.lists
                .map((l: any) => l?.listItem)
                .filter(Boolean)
                .join(" • ")
            : c.description,
        color: palette[i % palette.length],
        href: c?.link?.url || "#",
      }))
    : null;

  // process steps
  const stepsBlock = blocks.find(
    (b) =>
      b?.__component === "blocks.process-steps-block" &&
      /process/i.test(b?.title || "")
  );
  const processSteps = Array.isArray((stepsBlock as any)?.steps)
    ? (stepsBlock as any).steps.map((s: any, idx: number) => ({
        step: s.stepNumber || String(idx + 1).padStart(2, "0"),
        title: s.title,
        description: s.description || "",
      }))
    : null;

  // why choose us
  const whyGrid = blocks.find(
    (b) =>
      b?.__component === "blocks.card-grid" && /why/i.test(b?.Heading || "")
  );
  const whyCards = Array.isArray((whyGrid as any)?.Cards)
    ? (whyGrid as any).Cards.map((c: any) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
      }))
    : null;

  // final CTA
  const finalCTA = H.final
    ? {
        heading: H.final.Heading,
        description: H.final.description || "",
        cta: H.final.cta || null,
      }
    : null;

  return { hero, H, services, processSteps, whyCards, finalCTA };
}

/* ---------- component ---------- */
export default function ServicesPage({ entry }: { entry: any | null }) {
  const [cms, setCms] = useState<ReturnType<
    typeof adaptServicesLanding
  > | null>(null);

  // fallbacks
  const servicesLocal = useMemo(
    () => [
      {
        icon: Home,
        title: "Permanent Residency (PR)",
        description: "Your pathway to calling Canada home permanently",
        details:
          "Permanent Residency allows you to live, work, and study anywhere in Canada. Through various programs like Express Entry, you can build a new life in one of the world's most welcoming countries.",
        color: "from-red-500 to-red-600",
        href: "/services/permanent-residency",
      },
      {
        icon: Award,
        title: "Citizenship",
        description: "Become a citizen and complete your Canadian journey.",
        details: "Your passport to full Canadian rights and responsibilities.",
        color: "from-red-600 to-pink-600",
        href: "/services/citizenship",
      },
      {
        icon: BriefcaseBusiness,
        title: "Business & Investor Immigration",
        description: "Invest in your future and Canada's economy",
        details:
          "Various investor and business immigration programs allow you to immigrate to Canada by making a significant investment or starting a business that benefits the Canadian economy.",
        color: "from-pink-600 to-red-500",
        href: "/services/business-immigration",
      },
      {
        icon: GraduationCap,
        title: "Study",
        description: "Educational opportunities await",
        details:
          "Study permits allow international students to pursue education in Canada.",
        color: "from-red-500 to-red-700",
        href: "/services/study",
      },
      {
        icon: Briefcase,
        title: "Work Permits",
        description: "Career opportunities await",
        details:
          "Work permits provide opportunities to gain valuable Canadian work experience.",
        color: "from-red-500 to-red-700",
        href: "/services/work-permit",
      },
      {
        icon: Plane,
        title: "Visitors Visa",
        description: "Welcome visitors from around the world",
        details:
          "Visitors visas allow you to visit Canada for a specific period of time.",
        color: "from-red-700 to-pink-500",
        href: "/services/visitors-visa",
      },
      {
        icon: HeartHandshake,
        title: "Family Sponsorship",
        description: "Reunite with your loved ones in Canada",
        details:
          "Sponsor your spouse, children, parents, or grandparents to join you in Canada. Family reunification is a cornerstone of Canadian immigration policy.",
        color: "from-pink-500 to-red-600",
        href: "/services/family-sponsorship",
      },
      {
        icon: ShieldCheck,
        title: "Refugee & H&C",
        description:
          "Support when safety, dignity, or compassion are at stake.",
        details:
          "Compassionate support for those in vulnerable or life-threatening situations.",
        color: "from-pink-500 to-red-600",
        href: "/services/refugee-hc",
      },
      {
        icon: UserSearch,
        title: "Recruitment Services",
        description: "Your gateway to hiring or working in Canada.",
        details:
          "Connecting skilled candidates with Canadian employers in sectors like hospitality, healthcare, tech, and agriculture.",
        color: "from-red-500 to-red-600",
        href: "/services/recruitment",
      },
    ],
    []
  );

  const processStepsLocal = useMemo(
    () => [
      {
        step: "01",
        title: "Initial Consultation",
        description:
          "We assess your profile and discuss your immigration goals",
      },
      {
        step: "02",
        title: "Strategy Development",
        description:
          "We create a personalized immigration strategy for your situation",
      },
      {
        step: "03",
        title: "Document Preparation",
        description: "We help you gather and prepare all required documents",
      },
      {
        step: "04",
        title: "Application Submission",
        description: "We submit your application and monitor its progress",
      },
      {
        step: "05",
        title: "Ongoing Support",
        description:
          "We provide support until you achieve your immigration goals",
      },
    ],
    []
  );

  // ✅ adapt whenever entry changes (use a stable dependency)
  useEffect(() => {
    setCms(adaptServicesLanding(entry));
  }, [entry?.id, entry?.updatedAt, JSON.stringify(entry?.blocks || [])]);

  const hero = cms?.hero || {
    title: "Our Services",
    html: "<p>Comprehensive Canadian immigration services tailored to your unique situation. From permanent residency to family reunification, we're here to guide you every step of the way.</p>",
    ctas: [
      { label: "Book Free Consultation", url: "/contact", variant: "default" },
      { label: "Explore Services", url: "#services", variant: "outline" },
    ],
  };

  const services = (cms?.services?.length ? cms.services : servicesLocal).map(
    (s: any) => ({
      ...s,
      icon:
        typeof s.icon === "function"
          ? s.icon
          : pickIcon((s.icon as any)?._name),
    })
  );

  const processSteps = cms?.processSteps?.length
    ? cms.processSteps
    : processStepsLocal;
  const whyCards = (
    cms?.whyCards?.length
      ? cms.whyCards
      : [
          {
            icon: FileText,
            title: "Expert Documentation",
            description:
              "We ensure all your documents are properly prepared and submitted according to the latest requirements.",
          },
          {
            icon: Clock,
            title: "Timely Processing",
            description:
              "We monitor your application closely and keep you updated on its progress every step of the way.",
          },
          {
            icon: Users,
            title: "Personalized Support",
            description:
              "Each client receives individual attention and a customized strategy based on their unique situation.",
          },
        ]
  ).map((c: any) => ({
    ...c,
    icon: typeof c.icon === "function" ? c.icon : pickIcon(c.icon),
  }));

  const H = cms?.H || {};
  const finalCTA = cms?.finalCTA;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero.title || "Our Services"}
              </span>
            </h1>
            {hero?.html ? (
              <div
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: hero.html }}
              />
            ) : null}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              {Array.isArray(hero?.ctas) &&
                hero.ctas.map((c: any, i: number) => (
                  <Link key={i} href={c?.url || "#"}>
                    <Button
                      size="lg"
                      className={
                        (c?.variant || "default") === "outline"
                          ? "border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                          : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      }
                      variant={c?.variant === "outline" ? "outline" : "default"}
                    >
                      {c?.label || "Learn More"}
                    </Button>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services (alternating) */}
      <section
        id="services"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service: any, index: number) => (
              <motion.div
                key={index}
                className={`service-section relative ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex flex-col lg:flex items-center gap-12`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center transform rotate-12`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="text-lg text-red-600 font-medium">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {service.details}
                  </p>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">
                      Expert guidance throughout the process
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">
                      Personalized strategy for your situation
                    </span>
                  </div>
                  <Link href={service.href || "#"}>
                    <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex-1 flex justify-center">
                  <motion.div
                    className={`w-80 h-80 bg-gradient-to-br ${service.color} rounded-3xl transform rotate-6 flex items-center justify-center relative overflow-hidden`}
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
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <service.icon className="w-32 h-32 text-white/80" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {cms?.H?.process?.Heading || "Our Process"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {cms?.H?.process?.description ||
                "We follow a proven 5-step process to ensure your immigration success"}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-pink-600 hidden lg:block" />
            <div className="space-y-12">
              {(cms?.processSteps?.length
                ? cms.processSteps
                : processStepsLocal
              ).map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:flex gap-8`}
                >
                  <div className="flex-1">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {step.step}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:block w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full border-4 border-white shadow-lg" />
                  <div className="flex-1 lg:block hidden" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {cms?.H?.why?.Heading || "Why Choose Our Services?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {cms?.H?.why?.description ||
                "We provide comprehensive support throughout your entire immigration journey"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {((cms?.whyCards?.length ? cms.whyCards : []) as any[]).map(
              (feature, index) => {
                const Icon =
                  typeof feature.icon === "function"
                    ? feature.icon
                    : pickIcon(feature.icon);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {finalCTA?.heading || "Ready to Get Started?"}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {finalCTA?.description ||
                "Book a free consultation to discuss your immigration goals and find the right service for you."}
            </p>
            <Link href={finalCTA?.cta?.url || "/contact"}>
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
              >
                {finalCTA?.cta?.label || "Book Free Consultation"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

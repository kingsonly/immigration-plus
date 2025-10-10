"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CheckCircle,
  Target,
  Heart,
  Shield,
  Clock,
  MapPin,
  FileText,
  Rocket,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Briefcase,
  Plane,
  HeartHandshake,
  ShieldCheck,
  UserSearch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import HomePageSkeleton from "../pageSkeletons/HomePageSkeleton";

/* ---------------- constants & helpers ---------------- */
const ABOUT_UID = process.env.NEXT_PUBLIC_STRAPI_ABOUT_UID || "about";
const STRAPI_BASE = (
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
).replace(/\/$/, "");
const assetUrl = (u?: string | null) =>
  !u ? null : u.startsWith("/") ? `${STRAPI_BASE}${u}` : u;

const IconMap: Record<string, any> = {
  Users,
  CheckCircle,
  Target,
  Heart,
  Shield,
  Clock,
  MapPin,
  FileText,
  Rocket,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Briefcase,
  Plane,
  HeartHandshake,
  ShieldCheck,
  UserSearch,
};
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle;

async function fetchAboutBlocks() {
  try {
    const qs = new URLSearchParams({ populate: "deep" }).toString();
    const res = await fetch(`${STRAPI_BASE}/api/${ABOUT_UID}?${qs}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    const raw = json?.data?.attributes
      ? { id: json.data.id, ...json.data.attributes }
      : json?.data ?? null;
    return raw?.blocks ?? null;
  } catch {
    return null;
  }
}

function adaptAboutContent(blocks: any[] | null) {
  if (!Array.isArray(blocks)) return null;
  const byType = (t: string) => blocks.filter((b) => b?.__component === t);

  // nearest heading resolver (for proximity-based pairing)
  const nearestHeadingForIndex: Record<number, any | null> = {};
  let lastHeading: any | null = null;
  blocks.forEach((b, i) => {
    if (b?.__component === "blocks.heading-section") lastHeading = b;
    nearestHeadingForIndex[i] = lastHeading;
  });
  const headingBefore = (predicate: (b: any) => boolean) => {
    const i = blocks.findIndex(predicate);
    return i >= 0 ? nearestHeadingForIndex[i] : null;
  };

  /* ---- Hero ---- */
  const heroBlock = byType("blocks.hero")[0];
  const hero = heroBlock
    ? {
        title: heroBlock.Title || "About Us",
        subtitle: heroBlock.Subtitle || "",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
      }
    : null;

  /* ---- Our Story ----
     Strategy:
     - Primary: heading-section whose Heading contains "our story"
       - take its description as HTML
       - if it has an image (optional schema), use it
     - Secondary: if a nearby split-feature (by proximity) also looks like story, prefer its image/description
  */
  const storyHeading =
    blocks.find(
      (b) =>
        b?.__component === "blocks.heading-section" &&
        /our\s*story/i.test(b?.Heading || "")
    ) || null;

  let storyHtml = storyHeading?.description || "";
  let storyImageUrl: string | null = null;

  // Optional heading image support
  if (storyHeading?.image) {
    const m = storyHeading.image;
    storyImageUrl = assetUrl(
      m?.url ||
        m?.formats?.medium?.url ||
        m?.formats?.small?.url ||
        m?.formats?.thumbnail?.url
    );
  }

  // If there is a split-feature right after/before this heading and it "looks" like the story section, prefer its rich text + image.
  const storySplit = byType("blocks.split-feature").find((sf) => {
    const h = headingBefore((b) => b === sf);
    return h && storyHeading && h === storyHeading; // paired by proximity to the same heading
  });
  if (storySplit) {
    storyHtml = storySplit.description || storyHtml;
    if (storySplit.image) {
      const m = storySplit.image;
      storyImageUrl =
        assetUrl(
          m?.url ||
            m?.formats?.large?.url ||
            m?.formats?.medium?.url ||
            m?.formats?.small?.url ||
            m?.formats?.thumbnail?.url
        ) || storyImageUrl;
    }
  }

  /* ---- Core Values (card-grid "values") ---- */
  const valuesGrid = blocks.find(
    (b) =>
      b?.__component === "blocks.card-grid" &&
      /(core\s*values|values)/i.test(b?.Heading || "")
  );
  const values = Array.isArray(valuesGrid?.Cards)
    ? valuesGrid.Cards.map((c: any) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
      }))
    : null;

  /* ---- Team (card-grid "team") with optional avatar/image on each card ---- */
  const teamGrid = blocks.find(
    (b) =>
      b?.__component === "blocks.card-grid" && /team/i.test(b?.Heading || "")
  );
  const team = Array.isArray(teamGrid?.Cards)
    ? teamGrid.Cards.map((c: any) => {
        const media = c?.image || c?.avatar || c?.photo || c?.media || null;
        const rawUrl = media?.url || media?.formats?.thumbnail?.url || null;
        return {
          name: c.title,
          role: c.description,
          credentials: c?.lists?.[0]?.listItem || "",
          experience: c?.lists?.[1]?.listItem || "",
          specialization: c?.lists?.[2]?.listItem || "",
          imageUrl: assetUrl(rawUrl),
        };
      })
    : null;

  /* ---- Achievements (card-grid "achievements": title=number, description=label) ---- */
  const achGrid = blocks.find(
    (b) =>
      b?.__component === "blocks.card-grid" &&
      /achievements/i.test(b?.Heading || "")
  );
  const achievements = Array.isArray(achGrid?.Cards)
    ? achGrid.Cards.map((c: any) => ({ number: c.title, label: c.description }))
    : null;

  /* ---- Why Choose Us (either bullets in lists or titles as bullets) ---- */
  const whyGrid = blocks.find(
    (b) =>
      b?.__component === "blocks.card-grid" &&
      /why\s*choose/i.test(b?.Heading || "")
  );
  const whyBullets: string[] = Array.isArray(whyGrid?.Cards)
    ? whyGrid.Cards.flatMap((c: any) =>
        Array.isArray(c.lists) && c.lists.length
          ? c.lists.map((l: any) => l.listItem).filter(Boolean)
          : c.title
          ? [c.title]
          : []
      )
    : null;

  /* ---- Generic two-column sections via split-feature (image-aware) ---- */
  const twoColSections = byType("blocks.split-feature").map((sf) => {
    const img =
      sf?.image?.url ||
      sf?.image?.formats?.large?.url ||
      sf?.image?.formats?.medium?.url ||
      sf?.image?.formats?.small?.url ||
      sf?.image?.formats?.thumbnail?.url ||
      null;

    return {
      title: sf.title,
      subtitle: sf.subtitle || "",
      html: sf.description || "",
      icon: pickIcon(sf.icon),
      useIcon: !img, // if no image, fallback to icon
      imageUrl: assetUrl(img),
      reverse: !!sf.reverse,
      items: Array.isArray(sf.items)
        ? sf.items.map((i: any) => i?.listItem).filter(Boolean)
        : [],
    };
  });

  // Final CTA (heading with CTA)
  const finalCTAHeading = blocks.find(
    (b) =>
      b?.__component === "blocks.heading-section" &&
      !!b?.cta &&
      /ready|work\s*with\s*us/i.test(b?.Heading || "")
  );
  const finalCTA = finalCTAHeading
    ? {
        heading: finalCTAHeading.Heading,
        description: finalCTAHeading.description,
        cta: finalCTAHeading.cta,
      }
    : null;

  return {
    hero,
    storyHtml,
    storyImageUrl,
    values,
    team,
    achievements,
    whyBullets,
    twoColSections,
    finalCTA,
  };
}

export default function AboutPageComponent() {
  const [cms, setCms] = useState<ReturnType<typeof adaptAboutContent> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // fallbacks
  const fallbackStoryHtml = `
    <p>TENTACULAR IMMIGRATION SOLUTIONS LTD is your trusted partner in navigating the complex world of Canadian immigration. With years of experience and a passion for helping dreams come true, we're here to guide you every step of the way.</p>
    <p>Founded with a vision to make Canadian immigration accessible and successful for everyone, we have been helping individuals and families achieve their Canadian dreams for over a decade.</p>
    <p>Our team of licensed consultants brings together decades of combined experience and a deep understanding of Canadian immigration law.</p>
  `;
  const fallbackValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest ethical standards...",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach each case with empathy...",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We stay updated and deliver superior quality...",
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Timely responses and efficient processing...",
    },
  ];
  const fallbackTeam = [
    {
      name: "Sarah Johnson",
      role: "Senior Immigration Consultant",
      credentials: "RCIC, MBA",
      experience: "12+ years",
      specialization: "Express Entry, PNP Programs",
    },
    {
      name: "Michael Chen",
      role: "Business Immigration Specialist",
      credentials: "RCIC, CPA",
      experience: "10+ years",
      specialization: "Start-up Visa, Investor Programs",
    },
    {
      name: "Priya Patel",
      role: "Family Sponsorship Expert",
      credentials: "RCIC, LLB",
      experience: "8+ years",
      specialization: "Spouse, Parent & Grandparent Sponsorship",
    },
  ];
  const fallbackAchievements = [
    { number: "500+", label: "Successful Applications" },
    { number: "50+", label: "Countries Served" },
    { number: "15+", label: "Years Combined Experience" },
    { number: "98%", label: "Client Satisfaction Rate" },
  ];
  const fallbackWhy = [
    "Licensed and regulated immigration consultants",
    "Personalized approach to each case",
    "Up-to-date knowledge of immigration laws",
    "Transparent fee structure with no hidden costs",
    "Multilingual support team",
    "End-to-end service from consultation to landing",
    "Strong track record of successful applications",
    "Ongoing support even after you arrive in Canada",
  ];

  useEffect(() => {
    fetchAboutBlocks().then((blocks) => {
      setCms(adaptAboutContent(blocks));
      setLoading(false);
    });
  }, []);

  if (loading) return <HomePageSkeleton />;

  const heroTitle = cms?.hero?.title || "About Us";
  const heroHtml = cms?.hero?.html || "";
  const H = cms?.H || {};
  const storyHtml = cms?.storyHtml || fallbackStoryHtml;
  const values = cms?.values || fallbackValues;
  const team = cms?.team || fallbackTeam;
  const achievements = cms?.achievements || fallbackAchievements;
  const whyBullets = cms?.whyBullets || fallbackWhy;
  const finalCTA = cms?.finalCTA || null;

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
                {heroTitle}
              </span>
            </h1>
            {heroHtml ? (
              <div
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: heroHtml }}
              />
            ) : (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                TENTACULAR IMMIGRATION SOLUTIONS LTD is your trusted partner in
                Canadian immigration.
              </p>
            )}
            {/* Hero CTAs */}
            {Array.isArray(cms?.hero?.ctas) && cms!.hero!.ctas.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                {cms!.hero!.ctas.map((c: any, i: number) => (
                  <Link
                    key={i}
                    href={c?.url || "#"}
                    target={c?.newTab ? "_blank" : undefined}
                  >
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
            )}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {H?.story?.Heading || "Our Story"}
              </h2>
              <div
                className="space-y-4 text-gray-600 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: storyHtml }}
              />
            </motion.div>

            {/* Visual column for Our Story */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl transform rotate-3 flex items-center justify-center relative overflow-hidden">
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
                {cms?.storyImageUrl ? (
                  <img
                    src={cms.storyImageUrl}
                    alt="Our Story"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  // fallback to your large icon (MapPin or any)
                  <MapPin className="w-32 h-32 text-white/80" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {(cms?.twoColSections || []).map((sf, idx) => (
        <section
          key={idx}
          className={`py-20 ${idx % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                sf.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: sf.reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-3 text-gray-900">
                  {sf.title}
                </h2>
                {sf.subtitle ? (
                  <p className="text-red-600 font-medium mb-4">{sf.subtitle}</p>
                ) : null}
                {sf.html ? (
                  <div
                    className="space-y-4 text-gray-600 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sf.html }}
                  />
                ) : null}
                <ul className="mt-6 space-y-3">
                  {(sf.items || []).map((txt: string, i2: number) => (
                    <li
                      key={i2}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <span>{txt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: sf.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="w-full h-96 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl transform rotate-3 flex items-center justify-center relative overflow-hidden">
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
                  {sf.imageUrl ? (
                    <img
                      src={sf.imageUrl}
                      alt={sf.title || "Section image"}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <sf.icon className="w-32 h-32 text-white/80" />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Values */}
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
                {H?.values?.Heading || "Our Core Values"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.values?.description || "These values guide everything we do"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(values || []).map((value: any, index: number) => {
              const Icon =
                typeof value.icon === "function"
                  ? value.icon
                  : pickIcon(value.icon);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {H?.team?.Heading || "Meet Our Expert Team"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.team?.description ||
                "Licensed immigration consultants with years of experience"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {(team || []).map((member: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600">
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt={member.name || "Team member"}
                          width={96}
                          height={96}
                          className="object-cover w-24 h-24"
                        />
                      ) : (
                        <Users className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-red-600 font-medium mb-2">
                      {member.role}
                    </p>
                    {member.credentials ? (
                      <p className="text-gray-600 mb-2">{member.credentials}</p>
                    ) : null}
                    {member.experience ? (
                      <p className="text-gray-600 mb-3">{member.experience}</p>
                    ) : null}
                    {member.specialization ? (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 font-medium">
                          Specialization:
                        </p>
                        <p className="text-sm text-gray-600">
                          {member.specialization}
                        </p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              {H?.achievements?.Heading || "Our Achievements"}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {H?.achievements?.description ||
                "Numbers that reflect our commitment"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(achievements || []).map((a: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {a.number}
                </div>
                <div className="text-white/90 text-lg">{a.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {H?.why?.Heading || "Why Choose Us?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.why?.description || "Here’s what sets us apart"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {(whyBullets || []).map((item: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {finalCTA?.heading || "Ready to Work With Us?"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {finalCTA?.description ||
                "Let’s discuss your immigration goals and create a personalized strategy for your success."}
            </p>
            <Link href={finalCTA?.cta?.url || "/contact"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
              >
                {finalCTA?.cta?.label || "Get Started Today"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

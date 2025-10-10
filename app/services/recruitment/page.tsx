"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  FileCheck,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Globe,
  Shield,
  Target,
  Calendar,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ---------------- fetch from Strapi ---------------- */
async function fetchServiceBlocks(slug: string) {
  try {
    const base = (
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    ).replace(/\/$/, "");
    const params = new URLSearchParams();
    if (process.env.NEXT_PUBLIC_STRAPI_PREVIEW === "1")
      params.set("publicationState", "preview");
    if (process.env.NEXT_PUBLIC_STRAPI_LOCALE)
      params.set("locale", process.env.NEXT_PUBLIC_STRAPI_LOCALE);
    const qs = params.toString();
    const url = `${base}/api/services/slug/${encodeURIComponent(slug)}${
      qs ? `?${qs}` : ""
    }`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.blocks ?? null;
  } catch {
    return null;
  }
}

/* ---------------- icon map ---------------- */
const IconMap: Record<string, any> = {
  Users,
  Building,
  FileCheck,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Globe,
  Shield,
  Target,
  Calendar,
  AlertCircle,
};
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle;

/* ---------------- Strapi -> UI adapter ---------------- */
function adaptRecruitmentContent(blocks: any[] | null) {
  if (!Array.isArray(blocks)) return null;
  const byType = (t: string) => blocks.filter((b) => b?.__component === t);

  // Map every block to the nearest previous heading-section so edits to heading/description reflect
  const nearestHeadingForIndex: Record<number, any | null> = {};
  let lastHeading: any | null = null;
  blocks.forEach((b, idx) => {
    if (b?.__component === "blocks.heading-section") lastHeading = b;
    nearestHeadingForIndex[idx] = lastHeading;
  });
  const headingBefore = (predicate: (b: any) => boolean) => {
    const i = blocks.findIndex(predicate);
    return i >= 0 ? nearestHeadingForIndex[i] : null;
  };

  // Hero
  const heroBlock = byType("blocks.hero")[0];
  const hero = heroBlock
    ? {
        title: heroBlock.Title || "Recruitment Services",
        subtitle: heroBlock.Subtitle || "",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
        icon: pickIcon(heroBlock.icon) || Briefcase,
      }
    : null;

  // Headings by proximity
  const H = {
    sectors: headingBefore(
      (b) =>
        b?.__component === "blocks.card-grid" &&
        (b?.Heading || "").toLowerCase().includes("sectors")
    ),
    lmiaIntro: headingBefore(
      (b) =>
        b?.__component === "blocks.heading-section" &&
        (b?.Heading || "").toLowerCase().includes("lmia support")
    ),
    lmiaStreams: headingBefore(
      (b) =>
        b?.__component === "blocks.card-grid" &&
        (b?.Heading || "").toLowerCase().includes("lmia streams")
    ),
    process: headingBefore(
      (b) =>
        b?.__component === "blocks.process-steps-block" &&
        (b?.title || "").toLowerCase().includes("lmia application process")
    ),
    times: headingBefore(
      (b) =>
        b?.__component === "blocks.comparison-grid" &&
        (b?.Heading || "").toLowerCase().includes("streams and duration")
    ),
    planning: headingBefore(
      (b) =>
        b?.__component === "blocks.application-process" &&
        (b?.title || "").toLowerCase().includes("what this means")
    ),
    fees: headingBefore((b) => b?.__component === "blocks.fee-cards"),
    representation: headingBefore(
      (b) =>
        b?.__component === "blocks.heading-section" &&
        (b?.Heading || "").toLowerCase().includes("external representation")
    ),
    final: headingBefore(
      (b) =>
        b?.__component === "blocks.heading-section" &&
        (b?.Heading || "").toLowerCase().includes("work with")
    ),
  };

  // Sectors (card-grid) – we support emoji icons in `title` text; `icon` string can be lucide if desired
  const sectorGrid = blocks.find(
    (b) =>
      b?.__component === "blocks.card-grid" &&
      (b?.Heading || "").toLowerCase().includes("sectors")
  );
  const sectors = Array.isArray(sectorGrid?.Cards)
    ? sectorGrid.Cards.map((c: any) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
      }))
    : null;

  // LMIA Streams (card-grid)
  const streamsGrid = blocks.find(
    (b) =>
      b?.__component === "blocks.card-grid" &&
      (b?.Heading || "").toLowerCase().includes("lmia streams")
  );
  const lmiaStreams = Array.isArray(streamsGrid?.Cards)
    ? streamsGrid.Cards.map((c: any) => ({
        name: c.title,
        description: c.description,
        processingTime: c.note || "", // store time in list/note field
        icon: pickIcon(c.icon),
        color: c.color || "", // optional custom color class string
      }))
    : null;

  // Steps (process-steps-block)
  const stepsBlock = blocks.find(
    (b) =>
      b?.__component === "blocks.process-steps-block" &&
      (b?.title || "").toLowerCase().includes("lmia application process")
  );
  const steps = Array.isArray(stepsBlock?.steps)
    ? stepsBlock.steps.map((s: any) => ({
        step: s.stepNumber || "",
        title: s.title,
        description: s.description || "",
        icon: pickIcon(s.icon),
      }))
    : null;

  // Processing times (comparison-grid) — use cols: Stream | Time | Priority
  const timesCmp = blocks.find(
    (b) =>
      b?.__component === "blocks.comparison-grid" &&
      (b?.Heading || "").toLowerCase().includes("streams and duration")
  );
  const processingRows = Array.isArray(timesCmp?.rows)
    ? timesCmp.rows.map((r: any) => ({
        stream: r.permitType || r.feature || "",
        time: r.lmiaRequired || r.colB || "",
        priority: r.bestFor || r.colC || "",
      }))
    : null;

  // Planning notes (application-process)
  const planning = blocks.find(
    (b) =>
      b?.__component === "blocks.application-process" &&
      (b?.title || "").toLowerCase().includes("what this means")
  );
  const planningItems = Array.isArray(planning?.items)
    ? planning.items.map((i: any) => i.listItem).filter(Boolean)
    : null;

  // Fee Cards
  const feeCardsBlock = blocks.find(
    (b) => b?.__component === "blocks.fee-cards"
  );
  const feeCards = feeCardsBlock
    ? {
        heading: feeCardsBlock.Heading || "LMIA Fees",
        description: feeCardsBlock.description || "",
        items: (feeCardsBlock.items || []).map((it: any) => ({
          title: it.title,
          amount: it.amount,
          note: it.note || "",
        })),
      }
    : null;

  // CTAs that may sit inside heading-sections
  const representationCTA = H.representation?.cta
    ? {
        heading: H.representation.Heading,
        description: H.representation.description,
        cta: H.representation.cta,
      }
    : null;
  const finalCTA = H.final?.cta
    ? {
        heading: H.final.Heading,
        description: H.final.description,
        cta: H.final.cta,
      }
    : null;

  return {
    hero,
    H,
    sectors,
    lmiaStreams,
    steps,
    processingRows,
    planningItems,
    feeCards,
    representationCTA,
    finalCTA,
  };
}

/* ------------------------------- Page ------------------------------- */
export default function RecruitmentPage() {
  const [cms, setCms] = useState<ReturnType<
    typeof adaptRecruitmentContent
  > | null>(null);

  useEffect(() => {
    fetchServiceBlocks("recruitment").then((blocks) =>
      setCms(adaptRecruitmentContent(blocks))
    );
  }, []);

  const hero = cms?.hero;
  const H = cms?.H;
  const sectors = cms?.sectors || [
    {
      emoji: "🏨",
      title: "Hospitality",
      description: "Hotels, restaurants, tourism",
    },
    {
      emoji: "🏥",
      title: "Healthcare",
      description: "Nurses, caregivers, support staff",
    },
    {
      emoji: "💻",
      title: "Technology",
      description: "Software, IT, engineering",
    },
    {
      emoji: "🌾",
      title: "Agriculture",
      description: "Farm workers, seasonal positions",
    },
  ];
  const lmiaStreams = cms?.lmiaStreams || [
    {
      name: "High-Wage Stream",
      description: "Job offers at/above median wage",
      processingTime: "61 business days",
      icon: DollarSign,
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Low-Wage Stream",
      description: "Job offers below median wage",
      processingTime: "61 business days",
      icon: Users,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Agricultural Stream",
      description: "On-farm jobs in livestock/grains/horticulture",
      processingTime: "15 business days",
      icon: Target,
      color: "bg-amber-100 text-amber-800",
    },
    {
      name: "Global Talent Stream",
      description: "High-skilled designated occupations",
      processingTime: "8 business days",
      icon: Globe,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "SAWP",
      description: "Seasonal Agricultural Worker Program",
      processingTime: "8 business days",
      icon: Calendar,
      color: "bg-orange-100 text-orange-800",
    },
  ];
  const steps = cms?.steps || [
    {
      step: "01",
      title: "Eligibility Assessment",
      description:
        "We review the job offer, employer profile, and program requirements to confirm LMIA needs.",
      icon: FileCheck,
    },
    {
      step: "02",
      title: "Document Preparation",
      description:
        "We organize documents to establish legitimacy, wage accuracy, and conditions.",
      icon: Building,
    },
    {
      step: "03",
      title: "Stream Selection",
      description:
        "We identify high-wage, low-wage, or agricultural streams per ESDC guidance.",
      icon: Target,
    },
    {
      step: "04",
      title: "Application Submission",
      description:
        "We file via LMIA Online or designated ESDC email and track progress.",
      icon: ArrowRight,
    },
    {
      step: "05",
      title: "Recruitment Compliance",
      description: "We help meet advertising and recruitment obligations.",
      icon: Users,
    },
    {
      step: "06",
      title: "Follow-Up & Inspection Readiness",
      description:
        "We handle officer requests and prep for potential inspections.",
      icon: Shield,
    },
  ];
  const processingRows = cms?.processingRows || [
    {
      stream: "Global Talent Stream",
      time: "8 business days",
      priority: "High",
    },
    {
      stream: "Agricultural Stream",
      time: "15 business days",
      priority: "Medium",
    },
    { stream: "SAWP", time: "8 business days", priority: "High" },
    {
      stream: "High-Wage Stream",
      time: "61 business days",
      priority: "Standard",
    },
    {
      stream: "Low-Wage Stream",
      time: "61 business days",
      priority: "Standard",
    },
  ];
  const planningItems = cms?.planningItems || [
    "Global Talent & SAWP receive priority processing—results in just over a week.",
    "High/Low-Wage streams average about 3 months.",
    "Agricultural LMIAs are processed in ~3 weeks.",
    "Start early—planning ahead avoids timeline crunches.",
  ];
  const feeCards = cms?.feeCards || {
    heading: "LMIA Fees",
    description: "Typical government fees; professional fees vary by case.",
    items: [
      {
        title: "LMIA Application Fee (per position)",
        amount: "$1,000 CAD",
        note: "Employer-paid",
      },
    ],
  };
  const representationCTA = cms?.representationCTA || null;
  const finalCTA = cms?.finalCTA || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full">
              <Briefcase className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {hero?.title || "Recruitment Services"}
          </h1>
          {hero?.html ? (
            <div
              className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: hero.html }}
            />
          ) : (
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              We connect skilled international candidates with Canadian
              employers across hospitality, healthcare, tech, and agriculture—
              with compliant, efficient LMIA & work-permit support.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={hero?.ctas?.[0]?.url || "/contact"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                <Phone className="mr-2 h-5 w-5" />
                {hero?.ctas?.[0]?.label || "Start Hiring Process"}
              </Button>
            </Link>
            <Link href={hero?.ctas?.[1]?.url || "/jobs"}>
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <Mail className="mr-2 h-5 w-5" />
                {hero?.ctas?.[1]?.label || "Find Job Opportunities"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {H?.sectors?.Heading || "Key Sectors We Serve"}
            </h2>
            <p className="text-lg text-gray-600">
              {H?.sectors?.description ||
                "Connecting talent across Canada's growing industries"}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {sectors.map((s: any, i) => (
              <Card
                key={i}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    {typeof s.icon === "function" ? (
                      <s.icon className="w-7 h-7 text-gray-700" />
                    ) : (
                      <span className="text-2xl">{s.emoji || "🏨"}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LMIA Support intro (heading-section only) */}
      {H?.lmiaIntro && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {H.lmiaIntro.Heading}
            </h2>
            {H.lmiaIntro.description ? (
              <p className="text-lg text-gray-600">{H.lmiaIntro.description}</p>
            ) : null}
          </div>
        </section>
      )}

      {/* LMIA Support – Tabs */}
<section className="py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <Tabs defaultValue="what" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="what">What is LMIA?</TabsTrigger>
        <TabsTrigger value="who">Who Needs It?</TabsTrigger>
        <TabsTrigger value="support">Support Areas</TabsTrigger>
        <TabsTrigger value="streams">LMIA Streams</TabsTrigger>
      </TabsList>

      {/* What is LMIA */}
      <TabsContent value="what" className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="mr-2 h-6 w-6 text-red-600" />
              What is an LMIA?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              An LMIA is a document issued by Employment and Social Development Canada (ESDC) that confirms:
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>There is a genuine need for a foreign worker for the role</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>No qualified Canadians or permanent residents are available</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                A positive LMIA lets the foreign worker apply for a Canadian work permit.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Who needs it */}
      <TabsContent value="who" className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-red-600" />
              Who Needs an LMIA?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-red-600">Common cases requiring LMIA:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> High-wage or low-wage hires</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Agricultural & seasonal workers</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Positions not exempt under IMP</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">LMIA-exempt examples:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center"><AlertCircle className="h-4 w-4 text-amber-600 mr-2" /> Francophone Mobility roles</li>
                  <li className="flex items-center"><AlertCircle className="h-4 w-4 text-amber-600 mr-2" /> Certain trade-agreement categories</li>
                  <li className="flex items-center"><AlertCircle className="h-4 w-4 text-amber-600 mr-2" /> Other IMP exemption codes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Support areas */}
      <TabsContent value="support" className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-6 w-6 text-red-600" />
              LMIA Support (Calgary & Canada-wide)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">We help employers who:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" /><span>Operate legally & are compliant</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" /><span>Have a valid business address & operations</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" /><span>Offer fair wages & stable conditions</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" /><span>Can prove genuine recruitment for Canadians first</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">We also support with:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><ArrowRight className="h-5 w-5 text-red-600 mr-3 mt-0.5" /><span>Pre-inspection readiness</span></li>
                  <li className="flex items-start"><ArrowRight className="h-5 w-5 text-red-600 mr-3 mt-0.5" /><span>Wage benchmarking</span></li>
                  <li className="flex items-start"><ArrowRight className="h-5 w-5 text-red-600 mr-3 mt-0.5" /><span>Offer-of-employment compliance</span></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Streams (reuses your lmiaStreams array/CMS) */}
      <TabsContent value="streams" className="mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(lmiaStreams || []).map((stream: any, idx: number) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stream.color || "bg-gray-100 text-gray-800"} mr-3`}>
                    <stream.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{stream.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{stream.description}</p>
                {stream.processingTime ? (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium">{stream.processingTime}</span>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  </div>
</section>




      {/* Application Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {H?.process?.Heading || "LMIA Application Process"}
            </h2>
            <p className="text-lg text-gray-600">
              {H?.process?.description ||
                "Our comprehensive 6-step approach to LMIA success"}
            </p>
          </div>
          <div className="space-y-8">
            {steps.map((step: any, index: number) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full mr-6 flex-shrink-0 bg-gray-100 text-gray-700">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="mr-3">
                          Step {step.step || index + 1}
                        </Badge>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processing Times */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {H?.times?.Heading || "LMIA Processing Times"}
            </h2>
            <p className="text-lg text-gray-600">
              {H?.times?.description ||
                "Current service standards (update in CMS as needed)"}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>LMIA Streams and Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">
                        Stream
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Processing Time
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(processingRows || []).map((row: any, i: number) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{row.stream}</td>
                        <td className="py-3 px-4">{row.time}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              (row.priority || "").toLowerCase() === "high"
                                ? "default"
                                : (row.priority || "").toLowerCase() ===
                                  "medium"
                                ? "secondary"
                                : "outline"
                            }
                            className={
                              (row.priority || "").toLowerCase() === "high"
                                ? "bg-green-100 text-green-800"
                                : (row.priority || "").toLowerCase() ===
                                  "medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {row.priority || "Standard"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {Array.isArray(planningItems) && planningItems.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">
                  🔍 What this means for you
                </h3>
                <div className="space-y-2 text-blue-800">
                  {planningItems.map((p, i) => (
                    <p key={i}>• {p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Fees */}
      {feeCards && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {feeCards.heading}
              </h2>
              {feeCards.description ? (
                <p className="text-lg text-gray-600">{feeCards.description}</p>
              ) : null}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {feeCards.items.map((it: any, i: number) => (
                <Card key={i} className="text-center">
                  <CardContent className="p-6">
                    <DollarSign className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
                    <p className="text-3xl font-bold text-red-600 mb-2">
                      {it.amount}
                    </p>
                    {it.note ? (
                      <p className="text-gray-600">{it.note}</p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Representation CTA */}
      {representationCTA && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">
                      {representationCTA.heading}
                    </h2>
                    {representationCTA.description ? (
                      <p className="text-red-100 mb-6">
                        {representationCTA.description}
                      </p>
                    ) : null}
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-3" />
                        <span>Proper stream selection</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-3" />
                        <span>Full federal compliance</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-3" />
                        <span>Advice through hiring & permits</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <Shield className="h-24 w-24 mx-auto mb-6 text-red-200" />
                    <Link href={representationCTA.cta?.url || "/contact"}>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="bg-white text-red-600 hover:bg-red-50"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        {representationCTA.cta?.label ||
                          "Get Expert Representation"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Final CTA */}
      {finalCTA && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {finalCTA.heading}
            </h2>
            {finalCTA.description ? (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                {finalCTA.description}
              </p>
            ) : null}
            <Link href={finalCTA.cta?.url || "/contact"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                <Phone className="mr-2 h-5 w-5" />
                {finalCTA.cta?.label || "Schedule Consultation"}
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

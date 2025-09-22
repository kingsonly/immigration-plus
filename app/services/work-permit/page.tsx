"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Briefcase, Users, Globe, Building, Rocket, CheckCircle, Calendar, MapPin,
  Award, FileText, Shield, AlertCircle, Star, Heart, Zap, ArrowRight, Phone, Mail,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/* ---------------- fetch from Strapi ---------------- */
async function fetchBlocks(slug: string) {
  try {
    const base = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "")
    const params = new URLSearchParams()
    if (process.env.NEXT_PUBLIC_STRAPI_PREVIEW === "1") params.set("publicationState", "preview")
    if (process.env.NEXT_PUBLIC_STRAPI_LOCALE) params.set("locale", process.env.NEXT_PUBLIC_STRAPI_LOCALE)
    const qs = params.toString()
    const url = `${base}/api/services/slug/${encodeURIComponent(slug)}${qs ? `?${qs}` : ""}`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data?.blocks ?? null
  } catch {
    return null
  }
}

/* ---------------- helpers to adapt Strapi blocks to local shapes ---------------- */
const IconMap: Record<string, any> = {
  Briefcase, Users, Globe, Building, Rocket, CheckCircle, Calendar, MapPin, Award,
  FileText, Shield, AlertCircle, Star, Heart, Zap, ArrowRight, Phone, Mail,
}
const pickIcon = (name?: string) => (name && IconMap[name]) || Briefcase

function adaptWorkContent(blocks: any[] | null) {
  if (!Array.isArray(blocks)) return null
  const byType = (t: string) => blocks.filter((b) => b?.__component === t)
  const findHeading = (text: string) =>
    byType("blocks.heading-section").find((b: any) => (b?.Heading || "").toLowerCase() === text.toLowerCase())
  const findCardGrid = (text: string) =>
    byType("blocks.card-grid").find((b: any) => (b?.Heading || "").toLowerCase() === text.toLowerCase())
  const findAppProc = (title: string) =>
    byType("blocks.application-process").find((b: any) => (b?.title || "").toLowerCase() === title.toLowerCase())
  const findCompare = () => byType("blocks.comparison-grid")[0]

  /* Hero */
  const heroBlock = byType("blocks.hero")[0]
  const hero = heroBlock
    ? {
        title: heroBlock.Title || "Work in Canada",
        subtitle: heroBlock.Subtitle || "Empowering Skilled Workers, Entrepreneurs & Professionals",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
      }
    : null

  /* Headings */
  const H = {
    types: findHeading("Work Permit Types"),
    openWho: findHeading("Who Can Apply for Open Work Permits?"),
    iec: findHeading("International Experience Canada (IEC)"),
    other: findHeading("Other Work Permit Options"),
    ready: findHeading("Ready to Start Working in Canada?"),
    compare: findHeading("Compare Your Path") || { Heading: "Compare Your Path", description: "Quick comparison of work permit options to help you choose the right pathway." },
  }

  /* Work Permit Types (card-grid) */
  const typesGrid = findCardGrid("Work Permit Types")
  const workPermitTypes = Array.isArray(typesGrid?.Cards)
    ? typesGrid.Cards.map((c: any) => ({
        title: c.title,
        subtitle: c.subtitle || (c.title?.includes("Open") ? "Work Without Job Restrictions" : "Ideal for individuals with a single Canadian employer"),
        description: c.description,
        icon: pickIcon(c.icon),
        color:
          (c.icon === "Building" && "from-red-500 to-red-600") ||
          (c.icon === "Globe" && "from-red-600 to-pink-600") ||
          "from-red-500 to-red-600",
        requirements: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
        bestFor:
          c.title?.includes("Open")
            ? "Graduates, spouses of students/workers, PR applicants, and vulnerable workers."
            : "Skilled workers hired for specific roles where designated employment is required.",
        locked: !c.title?.includes("Open"),
      }))
    : null

  /* Open Work Permit Eligibility (card-grid) */
  const openGrid = findCardGrid("Open Work Permit Eligibility")
  const openEligibility = Array.isArray(openGrid?.Cards)
    ? openGrid.Cards.map((c: any) => ({
        category: c.title,
        description: c.description,
        icon: pickIcon(c.icon),
      }))
    : null

  /* IEC (card-grid) */
  const iecGrid = findCardGrid("IEC Categories")
  const iecCategories = Array.isArray(iecGrid?.Cards)
    ? iecGrid.Cards.map((c: any) => ({
        category: c.title,
        type:
          c.title?.includes("Holiday")
            ? "Open work permit"
            : "Employer-specific work permit",
        description: c.description,
        details:
          c.title?.includes("Holiday")
            ? "Great for those without a job offer in advance"
            : c.title?.includes("Young")
            ? "Requires a valid job offer in Canada"
            : "Must be registered in a post-secondary institution",
        icon: pickIcon(c.icon),
        color:
          (c.title?.includes("Holiday") && "from-blue-500 to-blue-600") ||
          (c.title?.includes("Young") && "from-green-500 to-green-600") ||
          (c.title?.includes("Co-op") && "from-purple-500 to-purple-600") ||
          "from-red-500 to-red-600",
      }))
    : null

  /* Other Work Permit Options (card-grid) — simplified cards */
  const otherGrid = findCardGrid("Other Work Permit Options")
  const otherPermits = Array.isArray(otherGrid?.Cards)
    ? otherGrid.Cards.map((c: any) => ({
        title: c.title,
        subtitle:
          c.title?.includes("GSS")
            ? "Fast-track your work permit with GSS"
            : c.title?.includes("Intra-Company")
            ? "Transfer key personnel within your multinational company"
            : c.title?.includes("C11")
            ? "Launch or manage your own business in Canada"
            : c.title?.includes("C10")
            ? "For individuals who contribute to Canada's broader interests"
            : "",
        description: c.description,
        features: [], // (optional) could come from a separate component if you add it later
        idealFor:
          c.title?.includes("GSS")
            ? "Tech professionals and specialized talent"
            : c.title?.includes("Intra-Company")
            ? "Relocating leadership and experts"
            : c.title?.includes("C11")
            ? "Entrepreneurs and business buyers"
            : "Innovators and professionals",
        icon: pickIcon(c.icon),
        color:
          (c.title?.includes("GSS") && "from-yellow-500 to-orange-500") ||
          (c.title?.includes("Intra-Company") && "from-blue-500 to-indigo-500") ||
          (c.title?.includes("C11") && "from-red-500 to-pink-500") ||
          (c.title?.includes("C10") && "from-purple-500 to-pink-500") ||
          "from-red-500 to-red-600",
        lmiaRequired:
          c.title?.includes("GSS") ? "No (If Exempt)" :
          c.title?.includes("Intra-Company") ? "No" :
          c.title?.includes("C11") ? "No" :
          c.title?.includes("C10") ? "No" : "Varies",
        duration:
          c.title?.includes("GSS") ? "≈ 2 weeks processing" :
          c.title?.includes("Intra-Company") ? "1–3 years (up to 7)" :
          c.title?.includes("C11") ? "Up to 2 years" :
          c.title?.includes("C10") ? "1 year (renewable)" : "Varies",
      }))
    : null

  /* Application steps (application-process) */
  const stepsEmployer = findAppProc("How to Apply for Employer-Specific Work Permits")
  const stepsOpen = findAppProc("How to Apply for Open Work Permits")
  const applicationSteps = [
    stepsEmployer
      ? { type: "Employer-Specific Work Permits", steps: stepsEmployer.items?.map((i: any) => i.listItem).filter(Boolean) || [] }
      : null,
    stepsOpen
      ? { type: "Open Work Permits", steps: stepsOpen.items?.map((i: any) => i.listItem).filter(Boolean) || [] }
      : null,
  ].filter(Boolean) as { type: string; steps: string[] }[]

  /* Comparison grid (blocks.comparison-grid) */
  const cmp = findCompare()
  const comparison = cmp
    ? {
        heading: H.compare?.Heading,
        description: H.compare?.description,
        columns: Array.isArray(cmp.columns) ? cmp.columns.map((c: any) => c.listItem) : ["Permit Type", "LMIA Required", "Best For", "Typical Duration"],
        rows: Array.isArray(cmp.rows)
          ? cmp.rows.map((r: any) => ({
              icon: pickIcon(r.icon || "Briefcase"),
              color: r.color || "from-red-500 to-red-600",
              permitType: r.permitType,
              lmiaRequired: r.lmiaRequired,
              bestFor: r.bestFor,
              duration: r.duration,
            }))
          : [],
      }
    : null

  /* Final CTA */
  const readyCTA = H.ready
    ? {
        heading: H.ready.Heading,
        description: H.ready.description,
        cta: H.ready.cta || null,
      }
    : null

  return {
    hero,
    H,
    workPermitTypes,
    openEligibility,
    iecCategories,
    otherPermits,
    applicationSteps,
    comparison,
    readyCTA,
  }
}

/* ------------------------------- Page ------------------------------- */
export default function WorkPermitPage() {
  const [cms, setCms] = useState<ReturnType<typeof adaptWorkContent> | null>(null)

  /* ---------------- local fallbacks (kept concise) ---------------- */
  const workPermitTypesLocal = [
    {
      title: "Employer-Specific Work Permits",
      subtitle: "Ideal for individuals with a job offer from a single Canadian employer",
      description: "This permit is tied to the specific job, employer, and location listed in the application.",
      icon: Building, color: "from-red-500 to-red-600",
      requirements: [
        "Valid LMIA or employer offer number",
        "Formal employment offer from a Canadian employer",
        "Compliance with employer, job role, and location",
      ],
      bestFor: "Skilled workers hired for specific roles in sectors like agriculture, hospitality, tech, and caregiving.",
      locked: true,
    },
    {
      title: "Open Work Permits",
      subtitle: "Work Without Job Restrictions",
      description: "Work for almost any employer in Canada without needing an LMIA.",
      icon: Globe, color: "from-red-600 to-pink-600",
      requirements: ["No job offer required", "Online application process", "Often a bridge to PR"],
      bestFor: "Graduates, spouses of students/workers, PR applicants, and vulnerable workers.",
      locked: false,
    },
  ]

  const openEligibilityLocal = [
    { category: "Post-Graduation Work Permit (PGWP)", description: "Graduates applying for a PGWP", icon: Award },
    { category: "Spouses of International Students", description: "Spouses/partners of eligible graduate students", icon: Heart },
    { category: "Spouses of High-Skilled Workers", description: "Partners of TEER 0–3 skilled workers", icon: Users },
    { category: "PR Applicants from Inside Canada", description: "Family sponsorship or Express Entry applicants", icon: MapPin },
    { category: "Vulnerable Workers", description: "Workers experiencing abuse or risk of abuse", icon: Shield },
  ]

  const iecCategoriesLocal = [
    { category: "Working Holiday", type: "Open work permit", description: "Flexible jobs to fund your travel", details: "Great without a job offer", icon: Globe, color: "from-blue-500 to-blue-600" },
    { category: "Young Professionals", type: "Employer-specific work permit", description: "Career-related experience", details: "Requires a valid job offer", icon: Briefcase, color: "from-green-500 to-green-600" },
    { category: "International Co-op", type: "Employer-specific work permit", description: "Student internships", details: "Must be registered in a post-secondary institution", icon: Users, color: "from-purple-500 to-purple-600" },
  ]

  const otherPermitsLocal = [
    { title: "Global Skills Strategy (GSS)", subtitle: "Fast-track your work permit with GSS", description: "Designed for high-skilled workers", features: [], idealFor: "Tech and specialized talent", icon: Zap, color: "from-yellow-500 to-orange-500", lmiaRequired: "No (If Exempt)", duration: "≈ 2 weeks processing" },
    { title: "Intra-Company Transfer (ICT)", subtitle: "Transfer key personnel", description: "For executives, managers, and specialists", features: [], idealFor: "Multinationals relocating leaders", icon: Building, color: "from-blue-500 to-indigo-500", lmiaRequired: "No", duration: "1–3 years (up to 7)" },
    { title: "C11 Entrepreneur Work Permit", subtitle: "Launch or buy a business", description: "For entrepreneurs and investors", features: [], idealFor: "Business builders eyeing PR", icon: Rocket, color: "from-red-500 to-pink-500", lmiaRequired: "No", duration: "Up to 2 years" },
    { title: "C10 Significant Benefit", subtitle: "Broader benefits to Canada", description: "For innovators and professionals", features: [], idealFor: "High-impact contributors", icon: Star, color: "from-purple-500 to-pink-500", lmiaRequired: "No", duration: "1 year (renewable)" },
  ]

  const applicationStepsLocal = [
    { type: "Employer-Specific Work Permits", steps: ["Obtain a valid LMIA or offer number", "Receive contract & supporting docs", "Submit your application online / in-Canada"] },
    { type: "Open Work Permits", steps: ["Prepare eligibility docs (PGWP / spouse / PR)", "Apply online via IRCC", "Get tailored assistance to ensure compliance"] },
  ]

  const comparisonLocal = {
    heading: "Compare Your Path",
    description: "Quick comparison of work permit options to help you choose the right pathway.",
    columns: ["Permit Type", "LMIA Required", "Best For", "Typical Duration"],
    rows: [
      { icon: Briefcase, color: "from-yellow-500 to-orange-500", permitType: "GSS", lmiaRequired: "No (If Exempt)", bestFor: "High-Skilled Talent", duration: "≈ 2 weeks processing" },
      { icon: Briefcase, color: "from-blue-500 to-indigo-500", permitType: "ICT", lmiaRequired: "No", bestFor: "Intra-Company", duration: "1–3 years (up to 7)" },
      { icon: Briefcase, color: "from-red-500 to-pink-500", permitType: "C11", lmiaRequired: "No", bestFor: "Entrepreneurs/Business", duration: "Up to 2 years" },
      { icon: Briefcase, color: "from-purple-500 to-pink-500", permitType: "C10", lmiaRequired: "No", bestFor: "Significant Benefits", duration: "1 year (renewable)" },
      { icon: Briefcase, color: "from-green-500 to-blue-500", permitType: "IEC & FTA-based", lmiaRequired: "No", bestFor: "Youth, Professionals", duration: "Varies" },
    ],
  }

  const readyCTALocal = {
    heading: "Ready to Start Working in Canada?",
    description:
      "Whether you need an employer-specific permit, open permit, or specialized pathway, we're here to guide you through the process with expert knowledge.",
    cta: { label: "Book Work Permit Consultation", url: "/contact", variant: "default" },
  }

  /* fetch CMS */
  useEffect(() => {
    fetchBlocks("work-permit").then((blocks) => setCms(adaptWorkContent(blocks)))
  }, [])

  /* choose CMS or fallbacks */
  const hero = cms?.hero
  const H = cms?.H
  const workPermitTypes = cms?.workPermitTypes || workPermitTypesLocal
  const openEligibility = cms?.openEligibility || openEligibilityLocal
  const iecCategories = cms?.iecCategories || iecCategoriesLocal
  const otherPermits = cms?.otherPermits || otherPermitsLocal
  const applicationSteps = cms?.applicationSteps || applicationStepsLocal
  const comparison = cms?.comparison || comparisonLocal
  const readyCTA = cms?.readyCTA || readyCTALocal

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* ---------------- Hero ---------------- */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero?.title || "Work in Canada"}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              {hero?.subtitle || "Empowering Skilled Workers, Entrepreneurs & Professionals"}
            </p>
            {hero?.html ? (
              <div className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 prose prose-lg" dangerouslySetInnerHTML={{ __html: hero.html }} />
            ) : (
              <>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                  We provide regulated, strategic guidance for skilled workers, entrepreneurs, investors, and self-employed individuals.
                </p>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                  From temporary permits to PR, we help you navigate federal and provincial pathways with clarity.
                </p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(hero?.ctas?.length ? hero.ctas : [{ label: "Book Work Permit Consultation", url: "/contact" }, { label: "Compare Permit Types", url: "#compare", variant: "outline" }]).map(
                (cta: any, i: number) => (
                  <Link key={i} href={cta.url || cta.href || "/contact"} target={cta?.newTab ? "_blank" : undefined}>
                    <Button
                      size="lg"
                      {...(String(cta.variant).toLowerCase() === "outline"
                        ? { variant: "outline", className: "border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent" }
                        : { className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full" })}
                    >
                      {i === 0 ? <Calendar className="mr-2 w-5 h-5" /> : <FileText className="mr-2 w-5 h-5" />}
                      {cta.label || "Learn more"}
                    </Button>
                  </Link>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Work Permit Types ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.types?.Heading as string) || "Work Permit Types"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.types?.description || "Choose the right work permit pathway based on your situation and career goals"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {workPermitTypes.map((permit, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${permit.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}>
                        <permit.icon className="w-8 h-8 text-white" />
                        {permit.locked ? (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <Building className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Globe className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{permit.title}</h3>
                        {permit.subtitle && <p className="text-lg text-red-600 font-medium">{permit.subtitle}</p>}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{permit.description}</p>

                    {Array.isArray(permit.requirements) && permit.requirements.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <h4 className="font-semibold text-gray-900">Key Requirements:</h4>
                        {permit.requirements.map((req: string, reqIndex: number) => (
                          <div key={reqIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{req}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {permit.bestFor && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                        <p className="text-gray-600 text-sm">{permit.bestFor}</p>
                      </div>
                    )}

                    <Button className={`w-full bg-gradient-to-r ${permit.color} hover:opacity-90`}>
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Open Work Permit Eligibility ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {(H?.openWho?.Heading as string) || "Who Can Apply for Open Work Permits?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.openWho?.description || "Open work permits provide flexibility to work for almost any employer in Canada"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {openEligibility.map((category, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{category.category}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Family update note — optional: keep static copy here or create a CMS block later */}
          {/* You can insert your “Family Permit Update” section here if you want it CMS-driven later */}
        </div>
      </section>

      {/* ---------------- IEC ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{(H?.iec?.Heading as string) || "International Experience Canada (IEC)"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.iec?.description || "Work, travel, and gain valuable experience in Canada"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {iecCategories.map((cat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${cat.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <cat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.category}</h3>
                    <p className="text-sm text-gray-500 mb-4 font-medium">{cat.type}</p>
                    <p className="text-gray-600 mb-4">{cat.description}</p>
                    <p className="text-gray-700 text-sm font-medium">{cat.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Other Work Permit Options ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.other?.Heading as string) || "Other Work Permit Options"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.other?.description || "Specialized work permit pathways for different professional situations"}
            </p>
          </motion.div>

          <div className="space-y-8">
            {otherPermits.map((permit, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${permit.color} rounded-2xl flex items-center justify-center`}>
                            <permit.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{permit.title}</h3>
                            {permit.subtitle && <p className="text-lg text-gray-600">{permit.subtitle}</p>}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{permit.description}</p>
                        {Array.isArray(permit.features) && permit.features.length > 0 && (
                          <div className="space-y-2 mb-4">
                            {permit.features.map((feature: string, i: number) => (
                              <div key={i} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {permit.idealFor && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-700">
                              <strong>Ideal for:</strong> {permit.idealFor}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">LMIA Required</h4>
                          <p className="text-gray-600">{permit.lmiaRequired}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                          <p className="text-gray-600">{permit.duration}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How to Apply ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How to Apply</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step application process for different work permit types
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {applicationSteps.map((application, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{application.type}</h3>
                    <div className="space-y-4">
                      {application.steps.map((step: string, stepIndex: number) => (
                        <div key={stepIndex} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">{stepIndex + 1}</span>
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div id="compare" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <CardContent className="p-8">
                <FileText className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Application Support</h3>
                <p className="text-gray-600 mb-6">
                  We provide tailored assistance at every stage of the application to ensure compliance and success.
                </p>
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                    Get Application Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Compare Your Path (comparison-grid) ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {comparison?.heading || "Compare Your Path"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {comparison?.description || "Quick comparison of work permit options to help you choose the right pathway"}
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-4 gap-4 mb-4 text-sm font-semibold text-gray-700">
                {(comparison?.columns || ["Permit Type", "LMIA Required", "Best For", "Typical Duration"]).slice(0, 4).map((c, i) => (
                  <div key={i}>{c}</div>
                ))}
              </div>
              <div className="space-y-4">
                {(comparison?.rows || []).map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-gray-900">{item.permitType}</span>
                          </div>
                          <div className="text-gray-600">{item.lmiaRequired}</div>
                          <div className="text-gray-600">{item.bestFor}</div>
                          <div className="text-gray-600">{item.duration}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">{readyCTA?.heading || "Ready to Start Working in Canada?"}</h2>
            <p className="text-xl text-white/90 mb-8">
              {readyCTA?.description ||
                "Whether you need an employer-specific permit, open work permit, or specialized pathway, we're here to guide you through the process with expert knowledge and personalized support."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={readyCTA?.cta?.url || "/contact"}>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold">
                  <Phone className="mr-2 w-5 h-5" />
                  {readyCTA?.cta?.label || "Book Work Permit Consultation"}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent"
                onClick={() => {
                  window.location.href = "mailto:info@coming2canada.co?subject=Work Permit Inquiry"
                }}
              >
                <Mail className="mr-2 w-5 h-5" />
                Email Us
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              From global talent to Canadian resident — let us support your transition with legal insight and personalized planning.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Plane, Globe, Calendar, FileText, CheckCircle, Users, Heart, Clock, MapPin, Shield,
  AlertCircle, Info, Star, ArrowRight, Phone, Mail, CreditCard, Home, User, Briefcase,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/* ---------------- fetch from Strapi (same as study) ---------------- */
async function fetchServiceBlocks(slug: string) {
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
  Plane, Globe, Calendar, FileText, CheckCircle, Users, Heart, Clock, MapPin, Shield,
  AlertCircle, Info, Star, ArrowRight, Phone, Mail, CreditCard, Home, User, Briefcase,
}
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle

function adaptVisitorContent(blocks: any[] | null) {
  if (!Array.isArray(blocks)) return null
  const byType = (t: string) => blocks.filter((b) => b?.__component === t)
  const findHeading = (text: string) =>
    byType("blocks.heading-section").find((b: any) => (b?.Heading || "").toLowerCase() === text.toLowerCase())
  const findCardGrid = (text: string) =>
    byType("blocks.card-grid").find((b: any) => (b?.Heading || "").toLowerCase() === text.toLowerCase())
  const findProcessBlock = (title: string) =>
    byType("blocks.process-steps-block").find((b: any) => (b?.title || "").toLowerCase() === title.toLowerCase())
  const findAppProc = (title: string) =>
    byType("blocks.application-process").find((b: any) => (b?.title || "").toLowerCase() === title.toLowerCase())
  const findComparison = (heading: string) =>
    byType("blocks.comparison-grid").find((b: any) => (b?.Heading || "").toLowerCase() === heading.toLowerCase())

  /* Hero */
  const heroBlock = byType("blocks.hero")[0]
  const hero = heroBlock
    ? {
        title: heroBlock.Title || "Visit Canada with Confidence",
        subtitle: heroBlock.Subtitle || "Visitor & Transit Visas",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
        icon: pickIcon(heroBlock.icon) || Plane,
      }
    : null

  /* Headings we’ll swap into the UI titles */
  const H = {
    needVisaOrEta: findHeading("Do You Need a Visa or eTA?") || findHeading("Who Can Apply for eTA or TRV?"),
    types: findHeading("Types of Visitor Visas"),
    validity: findHeading("Validity & Stay Duration"),
    howToApply: findHeading("How to Apply"),
    compare: findHeading("Visa vs eTA Comparison"),
    expertCta: findHeading("Expert Visitor Visa Support"),
  }

  /* Who needs what (card-grid with lists for examples) */
  const whoGrid = findCardGrid("Who needs what") || findCardGrid("Do You Need a Visa or eTA?")
  const whoNeedsWhat = Array.isArray(whoGrid?.Cards)
    ? whoGrid.Cards.map((c: any) => ({
        category: c.title,
        requirement: c.description, // you can store "eTA" / "TRV" in description or add a separate field in Strapi
        description: c.longDescription || c.extra || "", // optional long copy if you created it
        examples: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
        icon: pickIcon(c.icon),
        color:
          (c.icon === "Plane" && "from-green-500 to-green-600") ||
          (c.icon === "FileText" && "from-red-500 to-red-600") ||
          "from-blue-500 to-green-500",
      }))
    : null

  /* Types of Visitor Visas (card-grid with features = lists) */
  const typesGrid = findCardGrid("Types of Visitor Visas")
  const visaTypes = Array.isArray(typesGrid?.Cards)
    ? typesGrid.Cards.map((c: any) => ({
        title: c.title,
        description: c.description,
        idealFor: c.idealFor || "", // if you added a custom field; else keep empty
        icon: pickIcon(c.icon),
        color:
          (c.icon === "Plane" && "from-blue-500 to-blue-600") ||
          (c.icon === "Globe" && "from-green-500 to-green-600") ||
          (c.icon === "Clock" && "from-orange-500 to-orange-600") ||
          (c.icon === "Heart" && "from-red-500 to-red-600") ||
          "from-red-500 to-red-600",
        features: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
      }))
    : null

  /* Validity & stay (card-grid; we’ll read three bullets from lists) */
  const validityGrid = findCardGrid("Validity & Stay Duration")
  const validityDurations = Array.isArray(validityGrid?.Cards)
    ? validityGrid.Cards.map((c: any) => {
        const bullets = Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : []
        return {
          visaType: c.title,
          validity: bullets[0] || "",
          stayDuration: bullets[1] || "",
          extension: bullets[2] || "",
          icon: pickIcon(c.icon),
          color:
            (c.icon === "Globe" && "from-blue-500 to-blue-600") ||
            (c.icon === "Heart" && "from-red-500 to-red-600") ||
            (c.icon === "Plane" && "from-green-500 to-green-600") ||
            "from-red-500 to-red-600",
        }
      })
    : null

  /* How to apply (either process-steps-block or application-process with items) */
  const process =
    findProcessBlock("How to Apply") ||
    findAppProc("How to Apply") // if you used application-process, we’ll adapt as simple steps
  const applicationSteps =
    process && Array.isArray((process as any).steps || (process as any).items)
      ? ((process as any).steps || (process as any).items).map((s: any, idx: number) => ({
          step: s.stepNumber || String(idx + 1).padStart(2, "0"),
          title: s.title || s.listItem || "Step",
          description: s.description || "",
          icon: pickIcon(s.icon) || Info,
          color:
            (s.icon === "Info" && "from-blue-500 to-blue-600") ||
            (s.icon === "FileText" && "from-green-500 to-green-600") ||
            (s.icon === "Globe" && "from-purple-500 to-purple-600") ||
            (s.icon === "User" && "from-orange-500 to-orange-600") ||
            (s.icon === "Clock" && "from-red-500 to-red-600") ||
            (s.icon === "CheckCircle" && "from-green-600 to-green-700") ||
            "from-red-500 to-red-600",
        }))
      : null

  /* Visa vs eTA comparison (blocks.comparison-grid) */
  const cmp = findComparison("Visa vs eTA Comparison") || findComparison("Infographic: Visa vs. eTA")
  const visaVsEta =
    cmp && Array.isArray(cmp.rows)
      ? cmp.rows.map((r: any) => ({
          feature: r.feature || r.permitType || r.rowLabel || "",
          trv: r.trv || r.lmiaRequired || r.colB || "",
          eta: r.eta || r.colC || "",
        }))
      : null

  /* Expert CTA (heading-section with CTA) */
  const expertCTA = H.expertCta
    ? {
        heading: H.expertCta.Heading,
        description: H.expertCta.description,
        cta: H.expertCta.cta || { label: "Book Consultation", url: "/contact" },
      }
    : null

  return {
    hero,
    H,
    whoNeedsWhat,
    visaTypes,
    validityDurations,
    applicationSteps,
    visaVsEta,
    expertCTA,
  }
}

/* ------------------------------- Page ------------------------------- */
export default function VisitorVisaPage() {
  const [cms, setCms] = useState<ReturnType<typeof adaptVisitorContent> | null>(null)

  /* ---- Local fallbacks (your current static content) ---- */
  const whoNeedsWhatLocal = [
    {
      category: "Visa-Exempt Travelers",
      requirement: "Electronic Travel Authorization (eTA)",
      description: "Citizens of visa-exempt countries traveling by air",
      examples: ["EU countries", "U.S. green card holders", "UK citizens", "Australian citizens"],
      icon: Plane,
      color: "from-green-500 to-green-600",
    },
    {
      category: "All Other Travelers",
      requirement: "Visitor Visa (TRV)",
      description: "Citizens of countries that require a visa to enter Canada",
      examples: ["Most African countries", "Many Asian countries", "Some South American countries"],
      icon: FileText,
      color: "from-red-500 to-red-600",
    },
  ]

  const visitorVisaTypesLocal = [
    {
      title: "Single-Entry Visa",
      description: "Grants permission to enter Canada once, typically for a stay of up to six months.",
      idealFor: "Short-term visits for tourism, family, or events",
      icon: Plane,
      color: "from-blue-500 to-blue-600",
      features: ["One-time entry", "Up to 6 months stay", "Tourism & family visits", "Event attendance"],
    },
    {
      title: "Multiple-Entry Visa",
      description: "Allows travel to Canada multiple times over the visa's validity period—up to 10 years or until the passport expires.",
      idealFor: "Frequent travelers, business visitors, family members",
      icon: Globe,
      color: "from-green-500 to-green-600",
      features: ["Multiple entries", "Up to 10 years validity", "6 months per visit", "Business & leisure"],
    },
    {
      title: "Transit Visa",
      description: "Required for foreign nationals passing through Canada en route to another country, with a layover under 48 hours.",
      idealFor: "Airport layovers and connections",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      features: ["Transit only", "Under 48 hours", "No stay permitted", "Airport connections"],
    },
    {
      title: "Super Visa",
      description: "Designed for parents and grandparents of Canadian citizens or PRs; extended stays up to five years per entry.",
      idealFor: "Parents & grandparents of Canadian citizens/PRs",
      icon: Heart,
      color: "from-red-500 to-red-600",
      features: ["Up to 5 years per entry", "Multiple entries", "Family reunification", "Extended stays"],
    },
  ]

  const validityDurationsLocal = [
    { visaType: "Temporary Resident Visa (TRV)", validity: "Up to 10 years or passport expiry", stayDuration: "Up to 6 months per entry", extension: "Extendable in some cases", icon: Globe, color: "from-blue-500 to-blue-600" },
    { visaType: "Super Visa", validity: "Up to 10 years", stayDuration: "Up to 5 years per entry", extension: "Can leave and re-enter", icon: Heart, color: "from-red-500 to-red-600" },
    { visaType: "Electronic Travel Authorization (eTA)", validity: "Up to 5 years or passport expiry", stayDuration: "Up to 6 months per entry", extension: "Extendable in some cases", icon: Plane, color: "from-green-500 to-green-600" },
  ]

  const applicationStepsLocal = [
    { step: "01", title: "Confirm if you need a TRV or eTA", description: "Determine your visa requirements based on nationality & travel method", icon: Info, color: "from-blue-500 to-blue-600" },
    { step: "02", title: "Prepare documentation", description: "Gather passport, finances, and supporting materials", icon: FileText, color: "from-green-500 to-green-600" },
    { step: "03", title: "Apply online or via VAC", description: "Submit your full application through the correct channel", icon: Globe, color: "from-purple-500 to-purple-600" },
    { step: "04", title: "Complete biometrics (if required)", description: "Provide fingerprints & photo at a collection point", icon: User, color: "from-orange-500 to-orange-600" },
    { step: "05", title: "Await processing and decision", description: "Watch your account & respond promptly to IRCC requests", icon: Clock, color: "from-red-500 to-red-600" },
    { step: "06", title: "Upon approval, carry supporting docs", description: "Bring itinerary, proof of funds, invitation (if any), etc.", icon: CheckCircle, color: "from-green-600 to-green-700" },
  ]

  const visaVsEtaLocal = [
    { feature: "Required for", trv: "Most non-visa-exempt countries", eta: "Visa-exempt travelers (air only)" },
    { feature: "Application Method", trv: "Online or VAC", eta: "Online only" },
    { feature: "Processing Time", trv: "Weeks (varies by country)", eta: "Minutes to days" },
    { feature: "Validity", trv: "Up to 10 years", eta: "Up to 5 years or passport expiry" },
    { feature: "Entry Type", trv: "Single or Multiple", eta: "Multiple" },
    { feature: "Biometric Requirement", trv: "Yes (14–79 years)", eta: "No" },
  ]

  useEffect(() => {
    fetchServiceBlocks("visitor-visa").then((blocks) => setCms(adaptVisitorContent(blocks)))
  }, [])

  /* choose CMS data or fallbacks */
  const hero = cms?.hero
  const H = cms?.H
  const whoNeedsWhat = cms?.whoNeedsWhat || whoNeedsWhatLocal
  const visaTypes = cms?.visaTypes || visitorVisaTypesLocal
  const validityDurations = cms?.validityDurations || validityDurationsLocal
  const applicationSteps = cms?.applicationSteps || applicationStepsLocal
  const visaVsEta = cms?.visaVsEta || visaVsEtaLocal
  const expertCTA = cms?.expertCTA

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
              {(hero?.icon || Plane) && <Plane className="w-10 h-10 text-white" />}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero?.title || "Experience Canada with Confidence"}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              ✈️ {hero?.subtitle || "Visit Canada: Visitor & Transit Visas"}
            </p>
            {hero?.html ? (
              <div
                className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 prose prose-lg"
                dangerouslySetInnerHTML={{ __html: hero.html }}
              />
            ) : (
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Explore Canada with confidence—holiday, family visit, business trip, or transit. We help you secure the right document and prepare for entry.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(hero?.ctas?.length ? hero.ctas : [
                { label: "Book Visitor Visa Consultation", url: "/contact", variant: "default" },
                { label: "Check Requirements", url: "#need", variant: "outline" },
              ]).map((cta: any, i: number) => (
                <Link key={i} href={cta.url || cta.href || "/contact"} target={cta?.newTab ? "_blank" : undefined}>
                  <Button
                    size="lg"
                    {...(String(cta.variant).toLowerCase() === "outline"
                      ? { variant: "outline", className: "border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent" }
                      : { className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full" })}
                  >
                    {i === 0 ? <Calendar className="mr-2 w-5 h-5" /> : <Info className="mr-2 w-5 h-5" />}
                    {cta.label || "Learn more"}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Do you need Visa or eTA ---------------- */}
      <section id="need" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{(H?.needVisaOrEta?.Heading as string) || "🌍 Do You Need a Visa or eTA?"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.needVisaOrEta?.description || "Your document requirements depend on your nationality and how you're traveling to Canada"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {whoNeedsWhat.map((category, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                        <p className="text-lg text-red-600 font-medium">{category.requirement}</p>
                      </div>
                    </div>
                    {category.description && <p className="text-gray-600 mb-6">{category.description}</p>}
                    {Array.isArray(category.examples) && category.examples.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Examples include:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {category.examples.map((example: string, exampleIndex: number) => (
                            <div key={exampleIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-gray-700 text-sm">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-12">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <Info className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Visa-exempt travelers:</h4>
                    <p className="text-gray-700 text-sm">You may require an Electronic Travel Authorization (eTA) if arriving by air.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">All others:</h4>
                    <p className="text-gray-700 text-sm">Must apply for a Visitor Visa (Temporary Resident Visa – TRV) before entering Canada.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Types of Visitor Visas ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.types?.Heading as string) || "🎒 Types of Visitor Visas"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.types?.description || "Choose the right visa type based on your travel needs and circumstances"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {visaTypes.map((visa, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${visa.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <visa.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{visa.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{visa.description}</p>
                    {visa.idealFor && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Ideal For:</h4>
                        <p className="text-gray-700 text-sm">{visa.idealFor}</p>
                      </div>
                    )}
                    {visa.features?.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-gray-900">Key Features:</h4>
                        {visa.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button className={`w-full bg-gradient-to-r ${visa.color} hover:opacity-90`}>
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

      {/* ---------------- Validity & Stay Duration ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{(H?.validity?.Heading as string) || "🗓️ Validity & Stay Duration"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.validity?.description || "Understanding how long your visa is valid and how long you can stay in Canada"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {validityDurations.map((d, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${d.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <d.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{d.visaType}</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Validity Period</h4>
                        <p className="text-gray-700 text-sm">{d.validity}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Stay Duration</h4>
                        <p className="text-gray-700 text-sm">{d.stayDuration}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Extension</h4>
                        <p className="text-gray-700 text-sm">{d.extension}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-12">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Note</h3>
                <p className="text-gray-700">
                  Duration of stay is determined by the border officer upon arrival. Visa validity is how long you have to enter Canada, not the stay length.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ---------------- How to Apply ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.howToApply?.Heading as string) || "📄 How to Apply"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.howToApply?.description || "Step-by-step guide to applying for your Canadian visitor visa or eTA"}
            </p>
          </motion.div>

          <div className="space-y-8">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:flex gap-12`}
              >
                <div className="flex-1">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 font-medium">STEP {step.step}</div>
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex-1 flex justify-center">
                  <motion.div
                    className={`w-80 h-80 bg-gradient-to-br ${step.color} rounded-3xl transform ${index % 2 === 0 ? "rotate-6" : "-rotate-6"} flex items-center justify-center relative overflow-hidden`}
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
                    <step.icon className="w-32 h-32 text-white/80" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Visa vs eTA Comparison ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.compare?.Heading as string) || "📊 Infographic: Visa vs. eTA"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.compare?.description || "Quick comparison between Visitor Visa (TRV) and Electronic Travel Authorization (eTA)"}
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <Card>
              <CardContent className="p-8">
                <div className="min-w-full">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="font-bold text-gray-900 text-lg">Feature</div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="font-bold text-gray-900">Visitor Visa (TRV)</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Plane className="w-6 h-6 text-white" />
                      </div>
                      <div className="font-bold text-gray-900">eTA (Electronic Travel Authorization)</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(visaVsEta || []).map((row, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="font-semibold text-gray-900">{row.feature}</div>
                        <div className="text-gray-700 text-center">{row.trv}</div>
                        <div className="text-gray-700 text-center">{row.eta}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------- Expert Support CTA ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  {(expertCTA?.heading as string) || "Expert Visitor Visa Support"}
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  {expertCTA?.description ||
                    "Don't let document requirements or application complexities stop you. We provide comprehensive support for visitor visas and eTAs."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={expertCTA?.cta?.url || "/contact"}>
                    <Button
                      size="lg"
                      className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      {expertCTA?.cta?.label || "Book Consultation"}
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent"
                    onClick={() => {
                      window.location.href = "mailto:info@coming2canada.co?subject=Visitor Visa Inquiry"
                    }}
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Email Us
                  </Button>
                </div>
                <p className="text-white/70 text-sm mt-4">
                  Experience Canada with confidence — let us handle the paperwork while you plan your journey.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Home, Briefcase, Users, GraduationCap, MapPin, Heart, ArrowRight, CheckCircle, Clock, DollarSign, FileText,
  ClipboardCheck, MapPinned, LogIn, Globe, AlertTriangle, User, Scale, Gavel, BookOpen, Phone, Shield, Calendar,
  Info, Star, Repeat, FileSignature, BarChart4, Leaf,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/* ---------------- fetch from Strapi (same as Visitor/Family) ---------------- */
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

/* ---------------- helpers: icon map + adapter ---------------- */
const IconMap: Record<string, any> = {
  Home, Briefcase, Users, GraduationCap, MapPin, Heart, ArrowRight, CheckCircle, Clock, DollarSign, FileText,
  ClipboardCheck, MapPinned, LogIn, Globe, AlertTriangle, User, Scale, Gavel, BookOpen, Phone, Shield, Calendar,
  Info, Star, Repeat, FileSignature, BarChart4, Leaf,
}
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle

/* --- Strapi -> UI adapter (includes Split Feature + Fee Cards) --- */
function adaptRefugeeContent(blocks: any[] | null) {
  if (!Array.isArray(blocks)) return null
  const byType = (t: string) => blocks.filter((b) => b?.__component === t)
  const nearestHeadingForIndex: Record<number, any | null> = {}
  let lastHeading: any | null = null
  blocks.forEach((b, idx) => {
    if (b?.__component === "blocks.heading-section") lastHeading = b
    nearestHeadingForIndex[idx] = lastHeading
  })
  const headingBefore = (predicate: (b: any) => boolean) => {
    const i = blocks.findIndex(predicate)
    return i >= 0 ? nearestHeadingForIndex[i] : null
  }

  // Hero
  const heroBlock = byType("blocks.hero")[0]
  const hero = heroBlock
    ? {
        title: heroBlock.Title || "Refugee / H&C",
        subtitle: heroBlock.Subtitle || "Protection, Compassion, and Pathways to Stay",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
        icon: pickIcon(heroBlock.icon) || Shield,
      }
    : null

  // Section headings via proximity (so edits reflect)
  const H = {
    refugeeClaim: headingBefore((b) => b?.__component === "blocks.card-grid" && b?.Heading?.toLowerCase?.().includes("refugee claim")),
    makingClaim: headingBefore((b) => b?.__component === "blocks.card-grid" && b?.Heading?.toLowerCase?.().includes("making a refugee")),
    claimProcess: headingBefore((b) => b?.__component === "blocks.split-feature"), // << split-feature heading
    prra: headingBefore((b) => b?.__component === "blocks.card-grid" && (b?.Heading || "").toLowerCase().includes("prra")),
    prraCTA: headingBefore((b) => b?.__component === "blocks.heading-section" && b?.cta && (b?.Heading || "").toLowerCase().includes("pre-removal")),
    hc: headingBefore((b) => b?.__component === "blocks.card-grid" && (b?.Heading || "").toLowerCase().includes("h&c")),
    needExpert: headingBefore((b) => b?.__component === "blocks.heading-section" && (b?.Heading || "").toLowerCase().includes("need expert")),
    ourProcess: headingBefore((b) => b?.__component === "blocks.process-steps-block" && (b?.title || "").toLowerCase().includes("our process")),
    finalCTA: headingBefore((b) => b?.__component === "blocks.heading-section" && b?.cta && (b?.Heading || "").toLowerCase().includes("ready")),
  }

  // Refugee Claim (card-grid)
  const claimGrid = blocks.find((b) => b?.__component === "blocks.card-grid" && (b?.Heading || "").toLowerCase().includes("refugee claim"))
  const eligibilityRequirements = Array.isArray(claimGrid?.Cards)
    ? claimGrid.Cards.map((c: any) => ({ icon: pickIcon(c.icon), title: c.title, description: c.description }))
    : null

  // Making a Refugee Claim (card-grid w/ lists)
  const makingGrid = blocks.find((b) => b?.__component === "blocks.card-grid" && (b?.Heading || "").toLowerCase().includes("making a refugee"))
  const makingClaims = Array.isArray(makingGrid?.Cards)
    ? makingGrid.Cards.map((c: any) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
        tips: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
      }))
    : null

  // Refugee Claim Process (SPLIT FEATURE blocks, not process-steps)
  const splitFeatures = blocks
    .filter((b) => b?.__component === "blocks.split-feature")
    .map((b: any) => ({
      title: b.title,
      subtitle: b.subtitle || "",
      descriptionHtml: b.description || "",
      icon: pickIcon(b.icon),
      cardIcon: pickIcon(b.cardIcon || b.icon),
      reverse: Boolean(b.reverse),
      items: Array.isArray(b.items) ? b.items.map((i: any) => i.listItem).filter(Boolean) : [],
    }))

  // PRRA factors (card-grid)
  const prraFactorsGrid = blocks.find((b) => b?.__component === "blocks.card-grid" && (b?.Heading || "").toLowerCase().includes("key considerations"))
  const prraFactors = Array.isArray(prraFactorsGrid?.Cards)
    ? prraFactorsGrid.Cards.map((c: any) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
        color:
          (c.icon === "AlertTriangle" && "from-orange-500 to-orange-600") ||
          (c.icon === "Scale" && "from-red-500 to-red-600") ||
          (c.icon === "FileText" && "from-blue-500 to-blue-600") ||
          (c.icon === "User" && "from-purple-500 to-purple-600") ||
          "from-red-500 to-red-600",
      }))
    : null

  // PRRA applicable + risks (application-process)
  const prraApplicable = blocks.find((b) => b?.__component === "blocks.application-process" && (b?.title || "").toLowerCase().includes("prra applicable"))
  const prraApplicableItems = Array.isArray(prraApplicable?.items) ? prraApplicable.items.map((i: any) => i.listItem).filter(Boolean) : null

  const risksAppProc = blocks.find((b) => b?.__component === "blocks.application-process" && (b?.title || "").toLowerCase().includes("risks assessed"))
  const risksAssessed = Array.isArray(risksAppProc?.items) ? risksAppProc.items.map((i: any) => i.listItem).filter(Boolean) : null

  // PRRA vs H&C comparison (comparison-grid)
  const cmp = blocks.find((b) => b?.__component === "blocks.comparison-grid")
  const prraVsHc = Array.isArray(cmp?.rows)
    ? cmp.rows.map((r: any) => ({
        feature: r.permitType || r.feature || "",
        prra: r.lmiaRequired || r.colB || "",
        hc: r.bestFor || r.colC || "",
      }))
    : null

  // H&C factors (card-grid)
  const hcGrid = blocks.find((b) => b?.__component === "blocks.card-grid" && (b?.Heading || "").toLowerCase().includes("h&c"))
  const hcFactors = Array.isArray(hcGrid?.Cards)
    ? hcGrid.Cards.map((c: any) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
        details: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
      }))
    : null

  // H&C notes (application-process)
  const hcNotes = blocks.find((b) => b?.__component === "blocks.application-process" && (b?.title || "").toLowerCase().includes("important notes"))
  const hcNotesItems = Array.isArray(hcNotes?.items) ? hcNotes.items.map((i: any) => i.listItem).filter(Boolean) : null

  // Fee Cards (Application Fees)
  const feeCards = blocks.find((b) => b?.__component === "blocks.fee-cards")
    ? {
        heading: blocks.find((b) => b?.__component === "blocks.fee-cards")?.Heading || "Application Fees",
        description: blocks.find((b) => b?.__component === "blocks.fee-cards")?.description || "",
        items: (blocks.find((b) => b?.__component === "blocks.fee-cards")?.items || []).map((it: any) => ({
          title: it.title,
          amount: it.amount,
          note: it.note || "",
        })),
      }
    : null

  // CTAs from headings (if present)
  const prraCTA = H.prraCTA?.cta
    ? { heading: H.prraCTA.Heading, description: H.prraCTA.description, cta: H.prraCTA.cta }
    : null
  const needExpertCTA = H.needExpert?.cta
    ? { heading: H.needExpert.Heading, description: H.needExpert.description, cta: H.needExpert.cta }
    : null
  const finalCTA = H.finalCTA?.cta
    ? { heading: H.finalCTA.Heading, description: H.finalCTA.description, cta: H.finalCTA.cta }
    : null

  // Our Process (steps)
  const ourProcess = blocks.find((b) => b?.__component === "blocks.process-steps-block" && (b?.title || "").toLowerCase().includes("our process"))
  const processSteps = Array.isArray(ourProcess?.steps)
    ? ourProcess.steps.map((s: any, idx: number) => ({
        step: s.stepNumber || String(idx + 1).padStart(2, "0"),
        title: s.title,
        description: s.description || "",
        icon: pickIcon(s.icon),
      }))
    : null

  return {
    hero,
    H,
    eligibilityRequirements,
    makingClaims,
    splitFeatures,        // << new
    prraFactors,
    prraApplicableItems,
    risksAssessed,
    prraVsHc,
    hcFactors,
    hcNotesItems,
    feeCards,             // << new
    prraCTA,
    needExpertCTA,
    finalCTA,
    processSteps,
  }
}

/* ------------------------------- Page ------------------------------- */
export default function RefugeePage() {
  const [cms, setCms] = useState<ReturnType<typeof adaptRefugeeContent> | null>(null)

  /* ---------- Local fallbacks (unchanged) ---------- */
  const makingClaimsLocal = [
    {
      icon: LogIn,
      title: "How to Claim Refugee Protection Inside Canada",
      description:
        "You can make a refugee claim either at a Canadian Port of Entry (e.g., airport, land border) or at an inland Immigration, Refugees and Citizenship Canada (IRCC) office",
      tips: [
        "Port of Entry Claim: Made upon arrival in Canada to a Canada Border Services Agency (CBSA) officer.",
        "Inland Claim: Made if you are already in Canada. This typically involves submitting an application online through the IRCC portal.",
      ],
    },
    {
      icon: Globe,
      title: "How to Apply for Refugee Resettlement from Outside Canada",
      description:
        "For individuals outside Canada, refugee protection may be accessed through Canada’s resettlement programs",
      tips: [
        "These include the Government-Assisted Refugee (GAR) program, the Private Sponsorship of Refugees (PSR) program, or the Blended Visa Office-Referred (BVOR) program.",
        "A referral from the United Nations Refugee Agency (UNHCR) or another authorized organization is usually required to begin the process abroad.",
      ],
    },
  ]

  const eligibilityRequirementsLocal = [
    {
      icon: Users,
      title: "Convention Refugees",
      description:
        "These are individuals who have a well-founded fear of persecution in their home country based on one or more of the following grounds: race, religion, nationality, political opinion, or membership in a particular social group.",
    },
    {
      icon: Users,
      title: "Persons in Need of Protection",
      description:
        "These are individuals who are already in Canada and would face a real risk of torture, threat to life, or cruel and unusual treatment or punishment if returned to their country of origin.",
    },
  ]

  // Legacy process (fallback if no split-feature found)
  const refugeeProcessStepsLocal = [
    {
      step: "01",
      title: "Eligibility Determination",
      description:
        "An IRCC or CBSA officer will first determine if your claim is eligible to be referred to the Immigration and Refugee Board of Canada (IRB).",
      details: [
        "Assessment of previous claims in Canada",
        "Safe Third Country Agreement considerations",
        "Initial screening for eligibility factors",
        "Documentation review",
      ],
      icon: Scale,
      color: "from-red-500 to-red-600",
    },
    {
      step: "02",
      title: "Referral to IRB",
      description:
        "If eligible, your claim is sent to the Refugee Protection Division (RPD) of the IRB, an independent tribunal.",
      details: [
        "Case file transferred to RPD",
        "Independent tribunal assessment",
        "Assignment of RPD member",
        "Timeline establishment",
      ],
      icon: FileText,
      color: "from-red-600 to-pink-600",
    },
    {
      step: "03",
      title: "Basis of Claim (BOC) Form",
      description: "You will need to submit a detailed Basis of Claim form outlining why you seek protection.",
      details: [
        "Detailed personal narrative required",
        "Evidence of persecution or risk",
        "Country condition documentation",
        "Supporting witness statements",
      ],
      icon: BookOpen,
      color: "from-pink-600 to-red-500",
    },
    {
      step: "04",
      title: "Hearing",
      description:
        "Most claimants will have a hearing before an RPD member, who will hear your testimony and review evidence.",
      details: [
        "Oral testimony presentation",
        "Evidence review and assessment",
        "Cross-examination if applicable",
        "Legal representation allowed",
      ],
      icon: Gavel,
      color: "from-red-500 to-red-700",
    },
    {
      step: "05",
      title: "Decision",
      description:
        "The RPD member decides whether to grant you refugee protection. If successful, you become a protected person.",
      details: [
        "Written decision provided",
        "Protected person status if approved",
        "Permanent residence application eligibility",
        "Appeal options if refused",
      ],
      icon: CheckCircle,
      color: "from-red-700 to-pink-500",
    },
  ]

  const prraFactorsLocal = [
    {
      icon: AlertTriangle,
      title: "Focus on New Evidence",
      description:
        "If you've previously made a refugee claim, the PRRA decision will focus primarily on new evidence that emerged after your last decision.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Scale,
      title: "Core Risk Criteria",
      description:
        "Officers assess whether removal would expose you to persecution, torture, risk to life, or cruel and unusual treatment.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: FileText,
      title: "Document-Based Process",
      description:
        "The PRRA process involves submitting a written application (IMM 5508) supported by evidence and detailed submissions.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: User,
      title: "IRCC Officer Decision",
      description:
        "PRRA decisions are made by an IRCC officer, not the Immigration and Refugee Board (IRB) which handles initial refugee claims.",
      color: "from-purple-500 to-purple-600",
    },
  ]

  const risksAssessedLocal = [
    "Persecution based on race, religion, nationality, political opinion, or membership in a particular social group",
    "Torture or risk of torture",
    "Risk to life or cruel and unusual treatment or punishment",
    "Lack of safe alternatives within your country of origin",
    "State protection unavailability",
    "Generalized violence or civil war conditions",
  ]

  useEffect(() => {
    fetchServiceBlocks("refugee-hc").then((blocks) => setCms(adaptRefugeeContent(blocks)))
  }, [])

  /* choose CMS or fallbacks */
  const hero = cms?.hero
  const H = cms?.H
  const eligibilityRequirements = cms?.eligibilityRequirements || eligibilityRequirementsLocal
  const makingClaims = cms?.makingClaims || makingClaimsLocal
  const splitFeatures = cms?.splitFeatures || [] // new
  const refugeeProcessSteps = refugeeProcessStepsLocal // fallback only used when splitFeatures empty (see render)
  const prraFactors = cms?.prraFactors || prraFactorsLocal
  const prraApplicableItems = cms?.prraApplicableItems || null
  const risksAssessed = cms?.risksAssessed || risksAssessedLocal
  const prraVsHc = cms?.prraVsHc || null
  const hcFactors = cms?.hcFactors || null
  const hcNotesItems = cms?.hcNotesItems || null
  const feeCards = cms?.feeCards || null // new
  const prraCTA = cms?.prraCTA || null
  const needExpertCTA = cms?.needExpertCTA || null
  const finalCTA = cms?.finalCTA || null
  const ourProcessSteps = cms?.processSteps || null

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero?.title || "Refugee / H&C"}
              </span>
            </h1>
            {hero?.html ? (
              <div
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: hero.html }}
              />
            ) : (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Canada provides refuge and compassion to those fleeing persecution, danger or exceptional hardship. We offer sensitive, confidential guidance through these life-saving pathways.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Refugee Claim */}
      <section className="py-20 bg-white" id="refugee-claim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{H?.refugeeClaim?.Heading || "Refugee Claim"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.refugeeClaim?.description || "Canada offers refugee protection to individuals facing persecution or serious harm in their home countries, reflecting its commitment to international human rights and legal obligations."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {eligibilityRequirements.map((feature: any, index: number) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Making a Refugee Claim in Canada */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {H?.makingClaim?.Heading || "Making a Refugee Claim in Canada"}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {makingClaims.map((tip: any, index: number) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                        <tip.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{tip.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{tip.description}</p>
                    {Array.isArray(tip.tips) && tip.tips.length > 0 && (
                      <ul className="space-y-2">
                        {tip.tips.map((t: string, i: number) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{t}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Refugee Claim Process (Split Feature blocks if present, else legacy steps) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {H?.claimProcess?.Heading || "The Refugee Claim Process"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.claimProcess?.description || "Understand the step-by-step pathway after you make a claim."}
            </p>
          </motion.div>

          {Array.isArray(splitFeatures) && splitFeatures.length > 0 ? (
            <div className="space-y-12">
              {splitFeatures.map((sf: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: sf.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${sf.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} flex-col lg:flex gap-12`}
                >
                  {/* Big icon column */}
                  <div className="flex-1 flex justify-center">
                    <motion.div
                      className={`w-80 h-80 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl transform ${sf.reverse ? "-rotate-6" : "rotate-6"} flex items-center justify-center relative overflow-hidden`}
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
                      <sf.icon className="w-32 h-32 text-white/80" />
                    </motion.div>
                  </div>

                  {/* Card column */}
                  <div className="flex-1">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                            <sf.cardIcon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            {sf.subtitle ? <div className="text-sm text-gray-500 font-medium">{sf.subtitle}</div> : null}
                            <h3 className="text-2xl font-bold text-gray-900">{sf.title}</h3>
                          </div>
                        </div>
                        {sf.descriptionHtml ? (
                          <div
                            className="text-gray-600 text-lg mb-6 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: sf.descriptionHtml }}
                          />
                        ) : null}
                        {Array.isArray(sf.items) && sf.items.length > 0 && (
                          <div className="space-y-3">
                            {sf.items.map((d: string, i: number) => (
                              <div key={i} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{d}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Fallback to legacy alternating steps if no split-feature blocks exist
            <div className="space-y-12">
              {(refugeeProcessSteps as any[]).map((step, index) => (
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
                          <div className={`w-16 h-16 bg-gradient-to-r ${step.color || "from-red-500 to-red-600"} rounded-2xl flex items-center justify-center`}>
                            <step.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 font-medium">STEP {step.step}</div>
                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{step.description}</p>
                        {Array.isArray(step.details) && step.details.length > 0 && (
                          <div className="space-y-3">
                            {step.details.map((d: string, i: number) => (
                              <div key={i} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{d}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <motion.div
                      className={`w-80 h-80 bg-gradient-to-br ${step.color || "from-red-500 to-red-600"} rounded-3xl transform ${
                        index % 2 === 0 ? "rotate-6" : "-rotate-6"
                      } flex items-center justify-center relative overflow-hidden`}
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
          )}
        </div>
      </section>

      {/* PRRA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {H?.prra?.Heading || "Pre-Removal Risk Assessment (PRRA)"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.prra?.description ||
                "A Pre-Removal Risk Assessment (PRRA) is an application that allows individuals facing removal from Canada to seek protection based on risks they would face if returned to their country of origin."}
            </p>
          </motion.div>

          {/* When PRRA Applies */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Clock className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">When Is a PRRA Applicable?</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  A PRRA typically applies when the Canada Border Services Agency (CBSA) notifies you that removal proceedings are underway. You may be eligible if:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {(prraApplicableItems || [
                      "Your refugee claim was rejected, withdrawn, or deemed abandoned",
                      "Your judicial review request to the Federal Court was unsuccessful",
                    ]).slice(0, 2).map((item: string, i: number) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <p className="text-sm text-gray-600">
                      <strong>Important:</strong>{" "}
                      A 12-month waiting period generally applies after a negative refugee or PRRA decision, unless exceptional circumstances exist—such as significant changes in country conditions or the best interests of a child.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Considerations */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Considerations for a PRRA</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {prraFactors.map((factor: any, index: number) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${factor.color} rounded-xl flex items-center justify-center mb-4`}>
                        <factor.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{factor.title}</h4>
                      <p className="text-gray-600">{factor.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Risks Assessed */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Risks Assessed</h3>
                </div>
                <p className="text-gray-700 mb-6">IRCC officers will evaluate whether you would face:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {risksAssessed.map((risk: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* PRRA vs H&C */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How Is PRRA Different from H&C Applications?</h3>
                {Array.isArray(prraVsHc) && prraVsHc.length > 0 ? (
                  <div className="space-y-3">
                    {prraVsHc.map((row, i) => (
                      <div key={i} className="grid md:grid-cols-3 gap-4 p-3 bg-white rounded-lg">
                        <div className="font-semibold text-gray-900">{row.feature}</div>
                        <div className="text-gray-700">{row.prra}</div>
                        <div className="text-gray-700">{row.hc}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-600 mb-3">PRRA Applications</h4>
                      <p className="text-gray-700">Focus strictly on protection from risk upon removal</p>
                    </div>
                                        <div>
                      <h4 className="text-lg font-semibold text-purple-600 mb-3">H&C Applications</h4>
                      <p className="text-gray-700">
                        Consider humanitarian factors like establishment in Canada, family ties, hardship if removed, and the best interests of a child.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* PRRA CTA (heading-section with CTA if present) */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">{prraCTA?.heading || "Pre-Removal Risk Assessment"}</h3>
                <p className="text-xl mb-6 text-white/90">
                  {prraCTA?.description || "Removal proceedings underway? Take the Next Step."}
                </p>
                <Link href={prraCTA?.cta?.url || "/contact"}>
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold">
                    <Calendar className="mr-2 w-5 h-5" />
                    {prraCTA?.cta?.label || "Schedule Consultation"}
                  </Button>
                </Link>
                <p className="text-sm text-white/70 mt-4">
                  Speak with a licensed RCIC-IRB about eligibility, timelines, and evidence for a strong PRRA.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* H&C Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {H?.hc?.Heading || "Humanitarian & Compassionate Applications"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {H?.hc?.description ||
                "A discretionary pathway to permanent residence for those who don’t qualify under regular categories—focused on hardship and establishment in Canada."}
            </p>
          </motion.div>

          {/* Key Factors (card-grid) */}
          {Array.isArray(hcFactors) && hcFactors.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Factors Considered in an H&C Application</h3>
              <div className="space-y-12">
                {hcFactors.map((factor: any, index: number) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <factor.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold text-gray-900 mb-3">{factor.title}</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed">{factor.description}</p>
                            {Array.isArray(factor.details) && factor.details.length > 0 && (
                              <div className="grid md:grid-cols-2 gap-3">
                                {factor.details.map((d: string, i: number) => (
                                  <div key={i} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{d}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Important Notes (application-process) */}
          {Array.isArray(hcNotesItems) && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
              <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Info className="w-8 h-8 text-gray-700" />
                    <h3 className="text-2xl font-bold text-gray-900">Important Notes about H&C Applications</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {hcNotesItems.map((note: string, i: number) => (
                      <div key={i} className="bg-white rounded-lg p-6 border flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <span className="text-gray-700">{note}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* H&C CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-gradient-to-r from-pink-500 to-red-600 text-white">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Humanitarian & Compassionate Applications</h3>
                <p className="text-xl mb-6 text-white/90">Experiencing hardship in Canada? Take the next step.</p>
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold">
                    <Calendar className="mr-2 w-5 h-5" />
                    Book Consultation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Application Fees (Fee Cards) */}
      {feeCards && Array.isArray(feeCards.items) && feeCards.items.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">{feeCards.heading || "Application Fees"}</h2>
              {feeCards.description ? (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">{feeCards.description}</p>
              ) : null}
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {feeCards.items.map((it: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{it.title}</h4>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 font-semibold">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {it.amount}
                        </div>
                      </div>
                      {it.note ? <p className="text-sm text-gray-600">{it.note}</p> : null}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Need Expert CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {needExpertCTA?.heading || "Need Expert Protection Assistance?"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {needExpertCTA?.description ||
                "Refugee protection, PRRA, and H&C applications are complex legal processes—don’t navigate them alone."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={needExpertCTA?.cta?.url || "/contact"}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  {needExpertCTA?.cta?.label || "Emergency Consultation"}
                </Button>
              </Link>
              <Link href="/resources">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
                >
                  <BookOpen className="mr-2 w-5 h-5" />
                  Protection Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {H?.ourProcess?.Heading || "Our Process"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.ourProcess?.description || "A proven 5-step approach to guide you from first consult to decision."}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-pink-600 hidden lg:block"></div>
            <div className="space-y-12">
              {(ourProcessSteps || [
                { step: "01", title: "Initial Consultation", description: "We assess your profile and goals." },
                { step: "02", title: "Strategy Development", description: "We design a personalized plan for your situation." },
                { step: "03", title: "Document Preparation", description: "We gather and QA all required forms and proof." },
                { step: "04", title: "Application Submission", description: "We submit and track your file with IRCC/IRB." },
                { step: "05", title: "Ongoing Support", description: "We respond to requests and guide you to decision." },
              ]).map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:flex gap-8`}
                >
                  <div className="flex-1">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{step.step}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:block w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 lg:block hidden"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA (if present in CMS) */}
      {finalCTA && (
        <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl font-bold text-white mb-6">{finalCTA.heading}</h2>
              <p className="text-xl text-white/90 mb-8">{finalCTA.description}</p>
              <Link href={finalCTA.cta?.url || "/contact"}>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold">
                  {finalCTA.cta?.label || "Book Free Consultation"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}

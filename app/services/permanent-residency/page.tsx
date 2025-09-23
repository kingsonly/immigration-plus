"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Home,
  Briefcase,
  Users,
  GraduationCap,
  MapPin,
  Heart,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Award,
  Star,
  MapPinned,
  ClipboardCheck,
  BarChart4,
  FileSignature,
  HeartHandshake,
  Repeat,
  Leaf,
  Info,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/* ---------------- fetch from Strapi (same contract as Visitor/Family) ---------------- */
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
  Home,
  Briefcase,
  Users,
  GraduationCap,
  MapPin,
  Heart,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Award,
  Star,
  MapPinned,
  ClipboardCheck,
  BarChart4,
  FileSignature,
  HeartHandshake,
  Repeat,
  Leaf,
  Info,
}
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle

function nearestHeadingBefore(blocks: any[], index: number) {
  for (let i = index - 1; i >= 0; i--) {
    const b = blocks[i]
    if (b?.__component === "blocks.heading-section") return b
    // stop at the previous major section if you like:
    // if (b?.__component?.startsWith("blocks.") && b.__component !== "blocks.heading-section") break
  }
  return null
}

function findFirst(blocks: any[], type: string, predicate?: (b: any) => boolean) {
  const idx = blocks.findIndex((b) => b?.__component === type && (!predicate || predicate(b)))
  return { block: idx >= 0 ? blocks[idx] : null, index: idx }
}


function adaptPRContent(blocks: any[] | null) {
  if (!Array.isArray(blocks)) return null
  const byType = (t: string) => blocks.filter((b) => b?.__component === t)

  /* Hero */
  const heroBlock = byType("blocks.hero")[0]
  const hero = heroBlock
    ? {
        title: heroBlock.Title || "Permanent Residency",
        subtitle: heroBlock.Subtitle || "",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
        icon: pickIcon(heroBlock.icon) || Home,
      }
    : null

  /* Pathways (card-grid) + its nearest heading */
  const { block: pathwaysGrid, index: pathwaysIdx } = findFirst(blocks, "blocks.card-grid", (b) =>
    /pathway|permanent/i.test(b?.Heading || "")
  )
  const pathwaysHeading = pathwaysIdx >= 0 ? nearestHeadingBefore(blocks, pathwaysIdx) : null
  const pathways =
    Array.isArray(pathwaysGrid?.Cards) && pathwaysGrid.Cards.length
      ? pathwaysGrid.Cards.map((c: any) => ({
          title: c.title,
          description: c.description,
          icon: pickIcon(c.icon),
        }))
      : null

  /* What We Offer (card-grid) + nearest heading */
  const { block: offerGrid, index: offerIdx } = findFirst(blocks, "blocks.card-grid", (b) =>
    /offer/i.test(b?.Heading || "")
  )
  const offerHeading = offerIdx >= 0 ? nearestHeadingBefore(blocks, offerIdx) : null
  const offerings =
    Array.isArray(offerGrid?.Cards) && offerGrid.Cards.length
      ? offerGrid.Cards.map((c: any) => ({
          title: c.title,
          description: c.description,
          icon: pickIcon(c.icon),
          tips: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
        }))
      : null

  /* Additional Support (card-grid) + nearest heading */
  const { block: supportGrid, index: supportIdx } = findFirst(blocks, "blocks.card-grid", (b) =>
    /support/i.test(b?.Heading || "")
  )
  const supportHeading = supportIdx >= 0 ? nearestHeadingBefore(blocks, supportIdx) : null
  const additionalSupport =
    Array.isArray(supportGrid?.Cards) && supportGrid.Cards.length
      ? supportGrid.Cards.map((c: any) => ({
          title: c.title,
          description: c.description,
          icon: pickIcon(c.icon),
        }))
      : null

  /* Our Process (process-steps-block) + nearest heading */
  const { block: processBlock, index: processIdx } = findFirst(blocks, "blocks.process-steps-block", (b) =>
    /process/i.test(b?.title || "")
  )
  const processHeading = processIdx >= 0 ? nearestHeadingBefore(blocks, processIdx) : null
  const processSteps =
    processBlock && Array.isArray(processBlock.steps)
      ? processBlock.steps.map((s: any) => ({
          step: s.stepNumber || "",
          title: s.title || "",
          description: s.description || "",
          icon: pickIcon(s.icon),
        }))
      : null

  /* Why Choose (card-grid) + nearest heading */
  const { block: whyGrid, index: whyIdx } = findFirst(blocks, "blocks.card-grid", (b) =>
    /why choose/i.test(b?.Heading || "")
  )
  const whyHeading = whyIdx >= 0 ? nearestHeadingBefore(blocks, whyIdx) : null
  const whyCards =
    Array.isArray(whyGrid?.Cards) && whyGrid.Cards.length
      ? whyGrid.Cards.map((c: any) => ({
          title: c.title,
          description: c.description,
          icon: pickIcon(c.icon),
        }))
      : null

  /* Final CTA — heading-section with CTA somewhere near bottom (fallback to the last heading with CTA) */
  const lastHeadingWithCTA = [...byType("blocks.heading-section")].reverse().find((h: any) => h?.cta)
  const finalCTA = lastHeadingWithCTA
    ? { heading: lastHeadingWithCTA.Heading, description: lastHeadingWithCTA.description, cta: lastHeadingWithCTA.cta }
    : null

  /* Expose the headings we actually found (from proximity) */
  const H = {
    pathways: pathwaysHeading,
    whatWeOffer: offerHeading,
    additionalSupport: supportHeading,
    ourProcess: processHeading,
    whyChoose: whyHeading,
    finalCTA: lastHeadingWithCTA,
  }

  return { hero, H, pathways, offerings, additionalSupport, processSteps, whyCards, finalCTA }
}


/* ------------------------------- Page ------------------------------- */
export default function PermanentResidencyPage() {
  const [cms, setCms] = useState<ReturnType<typeof adaptPRContent> | null>(null)

  /* ---- Local fallbacks (your current static content) ---- */
  const pathwaysLocal = [
    {
      icon: BarChart4,
      title: "Express Entry System",
      description:
        "Express Entry manages applications for skilled workers through FSW, CEC, and FST. Candidates are ranked via CRS, with top applicants invited to apply and most receiving PR within six months.",
    },
    {
      icon: MapPinned,
      title: "Provincial Nominee Programs",
      description:
        "Provinces offer tailored streams for workers, graduates, semi-skilled workers, and entrepreneurs via Express Entry or direct nomination.",
    },
    {
      icon: GraduationCap,
      title: "International Graduate Streams",
      description:
        "Grads can fast-track PR through CEC or province-specific International Graduate streams under the PNP.",
    },
    {
      icon: Home,
      title: "Rural & Northern Immigration Pilot (RNIP/RCIP)",
      description:
        "Community-driven pathways (the new Rural Community Immigration Pilot) for skilled workers with local job offers and support.",
    },
    {
      icon: Leaf,
      title: "Agri-Food & Home Care Worker Pilots",
      description:
        "Sector-focused PR routes, including the Agri-Food Pilot and Home Care Worker Pilots, for eligible roles.",
    },
    {
      icon: HeartHandshake,
      title: "H&C & Public Policy Pathways",
      description:
        "Discretionary/per-policy routes for exceptional situations (hardship, establishment in Canada).",
    },
  ]

  const offeringsLocal = [
    {
      icon: MapPinned,
      title: "Guidance on Program Selection",
      description:
        "Select the most suitable federal or provincial pathway—Express Entry, CEC, PNPs, RNIP, and more—aligned with your goals.",
      tips: [
        "Compare federal and provincial pathways",
        "Evaluate Express Entry / RNIP / CEC eligibility",
        "Get tailored advice for your profile",
      ],
    },
    {
      icon: ClipboardCheck,
      title: "Comprehensive Profile Setup & Documentation Review",
      description:
        "Create/optimize your Express Entry or PNP profile and prepare compliant, well-organized documentation.",
      tips: [
        "Build/optimize your EE/PNP profile",
        "Organize supporting documents to IRCC standards",
        "Avoid mistakes that cause delays",
      ],
    },
    {
      icon: BarChart4,
      title: "CRS Optimization Strategies",
      description: "Boost your CRS score to improve chances of receiving an Invitation to Apply (ITA).",
      tips: [
        "Assess current CRS and improvement areas",
        "Plan language test improvements / experience",
        "Leverage PNP options for bonus points",
      ],
    },
    {
      icon: FileSignature,
      title: "Support from ITA to PR Submission",
      description:
        "From ITA to e-APR: forms, police certificates, medicals, uploads—guided end-to-end until a decision.",
      tips: ["Understand post-ITA requirements", "Prepare and upload documents", "Track deadlines and submissions"],
    },
    {
      icon: HeartHandshake,
      title: "Humanitarian & Compassionate (H&C) Application Support",
      description:
        "For exceptional cases, we craft strong submissions on hardship, establishment, and best interests of children.",
      tips: ["Evidence of hardship", "Narratives aligned with H&C principles", "Emphasize family/children’s interests"],
    },
    {
      icon: Repeat,
      title: "Transition Planning: Temporary → Permanent",
      description:
        "Strategic planning for work/study permit holders to transition smoothly to PR through the right pathways.",
      tips: ["Explore CEC/PNP/bridging work permits", "Plan timelines and documents", "Maximize time towards PR"],
    },
    {
      icon: Star,
      title: "Eligibility and Credential Assessments",
      description:
        "Evaluate education, work history, language tests, and NOC mapping to match the best PR programs.",
      tips: [
        "Do ECA (WES/IQAS, etc.) when needed",
        "Map job history to eligible NOC codes",
        "Pick programs that fit your profile",
      ],
    },
  ]

  const additionalSupportLocal = [
    {
      icon: Clock,
      title: "Bridging Open Work Permit (BOWP)",
      description:
        "Support for eligible applicants whose work permits are expiring while awaiting a PR decision.",
    },
    {
      icon: ClipboardCheck,
      title: "Credential Recognition & Licensing Guidance",
      description:
        "Support for regulated professions requiring credential evaluation and licensing.",
    },
    {
      icon: Users,
      title: "Settlement & Integration Referrals",
      description:
        "Guidance on housing, job search tools, and integration programs via partners and community orgs.",
    },
  ]

  const processStepsLocal = [
    { step: "01", title: "Initial Consultation", description: "We assess your profile and goals", icon: ClipboardCheck },
    { step: "02", title: "Strategy Development", description: "We create a personalized strategy", icon: BarChart4 },
    { step: "03", title: "Document Preparation", description: "We help gather and QA documents", icon: FileText },
    { step: "04", title: "Application Submission", description: "We submit and monitor your file", icon: FileSignature },
    { step: "05", title: "Ongoing Support", description: "We support you through to decision", icon: Repeat },
  ]

  useEffect(() => {
    fetchServiceBlocks("permanent-residency").then((blocks) => setCms(adaptPRContent(blocks)))
  }, [])

  /* choose CMS data or fallbacks */
  const hero = cms?.hero
  const H = cms?.H
  const pathways = cms?.pathways || pathwaysLocal
  const offerings = cms?.offerings || offeringsLocal
  const additionalSupport = cms?.additionalSupport || additionalSupportLocal
  const processSteps = cms?.processSteps || processStepsLocal
  const whyCards =
    cms?.whyCards || [
      {
        icon: FileText,
        title: "Expert Documentation",
        description: "We ensure all your documents are prepared to the latest requirements.",
      },
      {
        icon: Clock,
        title: "Timely Processing",
        description: "We monitor your application and keep you updated at every step.",
      },
      {
        icon: Users,
        title: "Personalized Support",
        description: "Individual attention and a customized strategy for your situation.",
      },
    ]
  const finalCTA = cms?.finalCTA

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
              {(() => {
                const Icon = (hero?.icon as any) || Home
                return <Icon className="w-10 h-10 text-white" />
              })()}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero?.title || "Permanent Residency"}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {hero?.html
                ? null
                : "We help skilled workers, graduates, and temporary residents navigate Express Entry, CEC, PNPs, and H&C—eligibility, CRS optimization, and full documentation."}
            </p>
            {hero?.html && (
              <div
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: hero.html }}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* ---------------- Pathways ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {(H?.pathways?.Heading as string) || "Explore Your Pathway to Permanent Residence"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.pathways?.description || "We provide comprehensive support throughout your entire immigration journey"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pathways.map((feature: any, index: number) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {(() => {
                        const Icon = (feature.icon as any) || CheckCircle
                        return <Icon className="w-8 h-8 text-white" />
                      })()}
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

      {/* ---------------- What We Offer ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.whatWeOffer?.Heading as string) || "What We Offer"}
              </span>
            </h2>
            {H?.whatWeOffer?.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{H.whatWeOffer.description}</p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((tip: any, index: number) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                        {(() => {
                          const Icon = (tip.icon as any) || CheckCircle
                          return <Icon className="w-6 h-6 text-white" />
                        })()}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{tip.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{tip.description}</p>
                    {Array.isArray(tip.tips) && tip.tips.length > 0 && (
                      <ul className="space-y-2">
                        {tip.tips.map((tipItem: string, tipIndex: number) => (
                          <li key={tipIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{tipItem}</span>
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

      {/* ---------------- Additional Support ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{(H?.additionalSupport?.Heading as string) || "Additional Support"}</h2>
            {H?.additionalSupport?.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{H.additionalSupport.description}</p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalSupport.map((feature: any, index: number) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {(() => {
                        const Icon = (feature.icon as any) || CheckCircle
                        return <Icon className="w-8 h-8 text-white" />
                      })()}
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

      {/* ---------------- Our Process ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.ourProcess?.Heading as string) || "Our Process"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.ourProcess?.description || "We follow a proven 5-step process to ensure your immigration success"}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-pink-600 hidden lg:block"></div>

            <div className="space-y-12">
              {processSteps.map((step: any, index: number) => (
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

      {/* ---------------- Why Choose Us ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {(H?.whyChoose?.Heading as string) || "Why Choose Our Services?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.whyChoose?.description || "We provide comprehensive support throughout your entire immigration journey"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyCards.map((feature: any, index: number) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {(() => {
                        const Icon = (feature.icon as any) || CheckCircle
                        return <Icon className="w-8 h-8 text-white" />
                      })()}
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

      {/* ---------------- Final CTA ---------------- */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              {(finalCTA?.heading as string) || "Ready to Get Started?"}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {finalCTA?.description || "Book a free consultation to discuss your immigration goals and find the right service for you."}
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
  )
}

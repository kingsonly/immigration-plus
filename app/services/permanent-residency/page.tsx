"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight, Calendar, Info, CheckCircle, Clock, FileText, Star,
  Home, Briefcase, Users, GraduationCap, MapPin, Heart, Award, MapPinned,
  ClipboardCheck, BarChart4, FileSignature, HeartHandshake, Repeat, Leaf,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/* ---------------- fetch from Strapi (same as other pages) ---------------- */
async function fetchService(slug: string) {
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
    return json?.data ?? null
  } catch {
    return null
  }
}

/* ---------------- helpers to adapt Strapi blocks to local shapes ---------------- */
const IconMap: Record<string, any> = {
  ArrowRight, Calendar, Info, CheckCircle, Clock, FileText, Star,
  Home, Briefcase, Users, GraduationCap, MapPin, Heart, Award, MapPinned,
  ClipboardCheck, BarChart4, FileSignature, HeartHandshake, Repeat, Leaf,
}
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle

type PRContent = {
  hero: null | {
    title: string
    subtitle: string
    html: string
    ctas: any[]
    icon: any
  }
  H: Record<string, any>
  pathway: null | Array<{ title: string; description: string; icon: any }>
  offerings: null | Array<{ title: string; description: string; tips: string[]; icon: any }>
  additionalSupport: null | Array<{ title: string; description: string; icon: any }>
  processSteps: null | Array<{ step: string; title: string; description: string; icon: any }>
  expertCTA: null | { heading: string; description?: string; cta?: { label: string; url: string } }
}

function adaptPRContent(service: any): PRContent | null {
  const blocks = service?.blocks
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

  /* Hero */
  const heroBlock = byType("blocks.hero")[0]
  const hero = heroBlock
    ? {
        title: heroBlock.Title || "Permanent Residency",
        subtitle: heroBlock.Subtitle || "Your pathway to calling Canada home",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
        icon: pickIcon(heroBlock.icon) || Home,
      }
    : null

  /* Headings we’ll use for section titles */
  const H = {
    pathways: findHeading("Explore Your Pathway to Permanent Residence"),
    whatWeOffer: findHeading("What We Offer"),
    additionalSupport: findHeading("Additional Support"),
    ourProcess: findHeading("Our Process"),
    expertCta: findHeading("Ready to Get Started?"),
  }

  /* Grids */
  const pathwaysGrid =
    findCardGrid("Explore Your Pathway to Permanent Residence") || findCardGrid("Pathways") || findCardGrid("Explore Pathways")
  const pathway = Array.isArray(pathwaysGrid?.Cards)
    ? pathwaysGrid.Cards.map((c: any) => ({
        title: c.title,
        description: c.description || "",
        icon: pickIcon(c.icon),
      }))
    : null

  const offeringsGrid = findCardGrid("What We Offer")
  const offerings = Array.isArray(offeringsGrid?.Cards)
    ? offeringsGrid.Cards.map((c: any) => ({
        title: c.title,
        description: c.description || "",
        icon: pickIcon(c.icon),
        tips: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
      }))
    : null

  const supportGrid = findCardGrid("Additional Support")
  const additionalSupport = Array.isArray(supportGrid?.Cards)
    ? supportGrid.Cards.map((c: any) => ({
        title: c.title,
        description: c.description || "",
        icon: pickIcon(c.icon),
      }))
    : null

  /* Process */
  const proc = findProcessBlock("Our Process") || findAppProc("Our Process")
  const processSteps =
    proc && Array.isArray((proc as any).steps || (proc as any).items)
      ? ((proc as any).steps || (proc as any).items).map((s: any, idx: number) => ({
          step: s.stepNumber || String(idx + 1).padStart(2, "0"),
          title: s.title || s.listItem || "Step",
          description: s.description || "",
          icon: pickIcon(s.icon) || ClipboardCheck,
        }))
      : null

  /* CTA */
  const expertCTA = H.expertCta
    ? {
        heading: H.expertCta.Heading,
        description: H.expertCta.description,
        cta: H.expertCta.cta || { label: "Book Free Consultation", url: "/contact" },
      }
    : null

  return { hero, H, pathway, offerings, additionalSupport, processSteps, expertCTA }
}

/* ------------------------------- Page ------------------------------- */
export default function PermanentResidencyPage() {
  const [cms, setCms] = useState<PRContent | null>(null)

  /* ---------- Local fallbacks: your current static content ---------- */
  const pathwayLocal = [
    {
      icon: BarChart4,
      title: "Express Entry System",
      description:
        "Express Entry manages FSW, CEC, and FST candidates via CRS ranking. Top profiles are invited and can get PR in ~6 months.",
    },
    {
      icon: MapPinned,
      title: "Provincial Nominee Programs",
      description:
        "Every province (except Quebec) runs streams for workers, graduates, and entrepreneurs via Express Entry or direct nomination.",
    },
    {
      icon: GraduationCap,
      title: "International Graduate Streams",
      description:
        "Graduates can fast-track PR via CEC or province-specific International Graduate streams under the PNP umbrella.",
    },
    {
      icon: Home,
      title: "Rural & Northern Immigration Pilot (RNIP/RCIP)",
      description:
        "Community-driven pathways help skilled workers with job offers settle in smaller Canadian towns toward PR.",
    },
    {
      icon: Leaf,
      title: "Agri-Food & Home Care Worker Pilots",
      description:
        "Sector-specific streams for eligible agri-food workers and caregivers that can lead to PR.",
    },
    {
      icon: HeartHandshake,
      title: "H&C & Public Policy Pathways",
      description:
        "Permanent residence routes for exceptional circumstances outside standard economic programs.",
    },
  ]

  const offeringsLocal = [
    {
      icon: MapPinned,
      title: "Guidance on Program Selection",
      description:
        "Choose the right federal/provincial route — Express Entry, CEC, PNPs, RNIP and more — aligned to your goals.",
      tips: [
        "Compare federal vs. provincial options.",
        "Assess eligibility for Express Entry, RNIP, or CEC.",
        "Get personalized advice for your profile.",
      ],
    },
    {
      icon: ClipboardCheck,
      title: "Comprehensive Profile Setup & Documentation Review",
      description:
        "Create compliant profiles and submit well-organized, IRCC-ready documentation.",
      tips: [
        "Set up and optimize Express Entry/PNP profiles.",
        "Organize proofs to Canadian standards.",
        "Avoid mistakes that cause delays.",
      ],
    },
    {
      icon: BarChart4,
      title: "CRS Optimization Strategies",
      description:
        "Boost your CRS with language, experience, education, and PNP strategies.",
      tips: [
        "Assess current CRS and improvement levers.",
        "Plan language re-takes or skills upgrades.",
        "Explore PNPs for extra points.",
      ],
    },
    {
      icon: FileSignature,
      title: "Support from ITA to PR Submission",
      description:
        "From ITA to PR, we guide forms, police checks, medicals, uploads, and deadlines.",
      tips: [
        "Understand post-ITA requirements.",
        "Prepare & upload documents correctly.",
        "Track timelines to avoid delays.",
      ],
    },
    {
      icon: HeartHandshake,
      title: "H&C Application Support",
      description:
        "Build persuasive submissions centered on hardship, establishment, and children’s best interests.",
      tips: [
        "Evidence hardship & establishment.",
        "Align narratives with H&C principles.",
        "Emphasize family/children where relevant.",
      ],
    },
    {
      icon: Repeat,
      title: "Transition Planning: Temporary → Permanent",
      description:
        "Strategize your move from study/work permits into PR (CEC, PNP, BOWP).",
      tips: [
        "Map CEC/PNP options and timing.",
        "Prepare documents while on temp status.",
        "Maximize time in Canada toward PR.",
      ],
    },
    {
      icon: Star,
      title: "Eligibility & Credential Assessments",
      description:
        "Evaluate education, work history, language, and NOC alignment for PR programs.",
      tips: [
        "Complete ECA via WES/IQAS (as needed).",
        "Match work to correct NOC codes.",
        "Identify best-fit programs (EE/PNP).",
      ],
    },
  ]

  const additionalSupportLocal = [
    {
      icon: Clock,
      title: "Bridging Open Work Permit (BOWP)",
      description:
        "If your status is expiring while PR is processing, explore eligibility for BOWP.",
    },
    {
      icon: ClipboardCheck,
      title: "Credential Recognition & Licensing Guidance",
      description:
        "Get direction for regulated professions on assessments and licensing steps.",
    },
    {
      icon: Users,
      title: "Settlement & Integration Referrals",
      description:
        "Referrals for housing, job search, and community integration support.",
    },
  ]

  const processStepsLocal = [
    { step: "01", title: "Initial Consultation", description: "We assess your profile and discuss your immigration goals" },
    { step: "02", title: "Strategy Development", description: "We create a personalized immigration strategy for your situation" },
    { step: "03", title: "Document Preparation", description: "We help you gather and prepare all required documents" },
    { step: "04", title: "Application Submission", description: "We submit your application and monitor its progress" },
    { step: "05", title: "Ongoing Support", description: "We provide support until you achieve your immigration goals" },
  ]

  useEffect(() => {
    fetchService("permanent-residency").then((svc) => setCms(adaptPRContent(svc)))
  }, [])

  /* choose CMS data or fallbacks */
  const hero = cms?.hero
  const H = cms?.H || {}
  const pathway = cms?.pathway || pathwayLocal
  const offerings = cms?.offerings || offeringsLocal
  const additionalSupport = cms?.additionalSupport || additionalSupportLocal
  const processSteps = cms?.processSteps || processStepsLocal
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
              {hero?.icon ? <hero.icon className="w-10 h-10 text-white" /> : <Home className="w-10 h-10 text-white" />}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero?.title || "Permanent Residency"}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              🏠 {hero?.subtitle || "Your pathway to calling Canada home permanently"}
            </p>
            {hero?.html ? (
              <div
                className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 prose prose-lg"
                dangerouslySetInnerHTML={{ __html: hero.html }}
              />
            ) : (
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                We guide skilled workers, graduates, and temporary residents through Express Entry, CEC, PNPs, and more.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(hero?.ctas?.length ? hero.ctas : [
                { label: "Book Free Consultation", url: "/contact#consultation", variant: "default" },
                { label: "Explore Pathways", url: "#pathways", variant: "outline" },
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

      {/* ---------------- Pathways ---------------- */}
      <section id="pathways" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {H?.pathways?.Heading || "Explore Your Pathway to Permanent Residence"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.pathways?.description || "We provide comprehensive support throughout your entire immigration journey"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pathway.map((feature, index) => (
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

      {/* ---------------- What We Offer ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {H?.whatWeOffer?.Heading || "What We Offer"}
              </span>
            </h2>
            {H?.whatWeOffer?.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{H?.whatWeOffer?.description}</p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((tip, index) => (
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
                        {tip.tips.map((t: string, tipIndex: number) => (
                          <li key={tipIndex} className="flex items-start space-x-2">
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

      {/* ---------------- Additional Support ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{H?.additionalSupport?.Heading || "Additional Support"}</h2>
            {H?.additionalSupport?.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{H?.additionalSupport?.description}</p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalSupport.map((feature, index) => (
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

      {/* ---------------- Our Process ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {H?.ourProcess?.Heading || "Our Process"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.ourProcess?.description || "We follow a proven 5-step process to ensure your immigration success"}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-pink-600 hidden lg:block"></div>
            <div className="space-y-12">
              {processSteps.map((step, index) => (
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

      {/* ---------------- CTA ---------------- */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              {expertCTA?.heading || "Ready to Get Started?"}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {expertCTA?.description || "Book a free consultation to discuss your immigration goals and find the right service for you."}
            </p>
            <Link href={expertCTA?.cta?.url || "/contact"}>
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
              >
                {expertCTA?.cta?.label || "Book Free Consultation"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

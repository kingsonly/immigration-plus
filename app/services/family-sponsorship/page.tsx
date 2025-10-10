"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  // shared
  Calendar, Info, ArrowRight, Phone, Mail, Star, CheckCircle, Clock, FileText,
  // family-specific
  HeartHandshake, Baby, Users, UserMinus, ClipboardCheck, FileSignature, BarChart4, Repeat, Heart,
  Home, Briefcase,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/* ---------------- fetch from Strapi (same as other pages) ---------------- */
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
    return json?.data ?? null
  } catch {
    return null
  }
}

/* ---------------- icon map ---------------- */
const IconMap: Record<string, any> = {
  // core
  Calendar, Info, ArrowRight, Phone, Mail, Star, CheckCircle, Clock, FileText,
  // family
  HeartHandshake, Baby, Users, UserMinus, ClipboardCheck, FileSignature, BarChart4, Repeat, Heart,
  Home, Briefcase,
}
const pickIcon = (name?: string) => (name && IconMap[name]) || CheckCircle

/* ---------------- adapt Strapi blocks to UI shapes ---------------- */
function adaptFamilyContent(svc: any | null) {
  const blocks = Array.isArray(svc?.blocks) ? svc.blocks : []
  const byType = (t: string) => blocks.filter((b: any) => b?.__component === t)
  const findHeading = (text: string) =>
    byType("blocks.heading-section").find((b: any) => (b?.Heading || "").toLowerCase() === text.toLowerCase())
  const findCardGrid = (text: string) =>
    byType("blocks.card-grid").find((b: any) => (b?.Heading || "").toLowerCase() === text.toLowerCase())
  const findProcessBlock = (title: string) =>
    byType("blocks.process-steps-block").find((b: any) => (b?.title || "").toLowerCase() === title.toLowerCase())
  const findAppProcess = (title: string) =>
    byType("blocks.application-process").find((b: any) => (b?.title || "").toLowerCase() === title.toLowerCase())
  const findServicesVariant = () => byType("blocks.service-variant-cards")[0]

  /* Hero */
  const heroBlock = byType("blocks.hero")[0]
  const hero = heroBlock
    ? {
        title: heroBlock.Title || svc?.title || "Family Sponsorship",
        subtitle: heroBlock.Subtitle || "Reuniting Families in Canada",
        html: heroBlock.description || "",
        ctas: Array.isArray(heroBlock.ctas) ? heroBlock.ctas : [],
        icon: pickIcon(heroBlock.icon),
      }
    : null

  /* Headings we’ll surface in UI */
  const H = {
    whoYouCanSponsor: findHeading("Who You Can Sponsor"),
    adopted: findHeading("Sponsorship of Adopted Children"),
    eligibility: findHeading("Sponsor Eligibility Requirements"),
    waysToApply: findHeading("Ways to Apply"),
    ourProcess: findHeading("Our Process"),
    whyUs: findHeading("Why Choose Our Services?"),
    finalCta: findHeading("Ready to Get Started?"),
  }

  /* Who You Can Sponsor (card-grid) */
  const sponsorGrid = findCardGrid("Who You Can Sponsor")
  const whoYouCanSponsor = Array.isArray(sponsorGrid?.Cards)
    ? sponsorGrid.Cards.map((c: any) => ({
        title: c.title,
        description: c.description,
        icon: pickIcon(c.icon),
      }))
    : []

  /* Adopted children heading/description (simple) */
  const adopted = H.adopted
    ? {
        heading: H.adopted.Heading,
        description: H.adopted.description || "",
        icon: pickIcon(H.adopted.icon),
      }
    : null

  /* Eligibility (application-process items) */
  const appProc = findAppProcess("Sponsor Eligibility Requirements") || byType("blocks.application-process")[0]
  const eligibilityItems = appProc?.items?.length
    ? appProc.items.map((i: any) => i.listItem).filter(Boolean)
    : []

  /* Ways to Apply (service-variant-cards) */
  const svcVariant = findServicesVariant()
  const waysToApply = Array.isArray(svcVariant?.services)
    ? svcVariant.services.map((s: any) => ({
        title: s.title,
        description: s.description,
        icon: pickIcon(s.icon),
        color: s.color || "from-red-500 to-red-600",
        features: Array.isArray(s.features) ? s.features.map((f: any) => f.listItem).filter(Boolean) : [],
        processingTime: s.processingTime || "",
        startingPrice: s.startingPrice || "",
        href: s.href || "/contact#consultation",
        extra: s.extra || "",
      }))
    : []

  /* Our Process (process-steps-block) */
  const proc = findProcessBlock("Our Process") || byType("blocks.process-steps-block")[0]
  const processSteps = Array.isArray(proc?.steps)
    ? proc.steps.map((s: any, idx: number) => ({
        step: s.stepNumber || String(idx + 1).padStart(2, "0"),
        title: s.title,
        description: s.description,
        icon: pickIcon(s.icon),
      }))
    : []

  /* Why Choose (card-grid) */
  const whyGrid = findCardGrid("Why Choose Our Services?")
  const whyUsCards = Array.isArray(whyGrid?.Cards)
    ? whyGrid.Cards.map((c: any) => ({
        title: c.title,
        description: c.description,
        icon: pickIcon(c.icon),
      }))
    : []

  /* Final CTA */
  const finalCta = H.finalCta
    ? {
        heading: H.finalCta.Heading,
        description: H.finalCta.description,
        cta: H.finalCta.cta || { label: "Book Free Consultation", url: "/contact" },
      }
    : null

  return {
    hero,
    H,
    whoYouCanSponsor,
    adopted,
    eligibilityItems,
    waysToApply,
    processSteps,
    whyUsCards,
    finalCta,
  }
}

/* -------------------------------- Page -------------------------------- */
export default function FamilySponsorshipPage() {
  const [cms, setCms] = useState<ReturnType<typeof adaptFamilyContent> | null>(null)

  useEffect(() => {
    fetchServiceBlocks("family-sponsorship").then((svc) => setCms(adaptFamilyContent(svc)))
  }, [])

  const hero = cms?.hero
  const H = cms?.H

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero?.title || "Family Sponsorship"}
              </span>
            </h1>
            {hero?.html ? (
              <div className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 prose prose-lg" dangerouslySetInnerHTML={{ __html: hero.html }} />
            ) : (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We help reunite families by guiding Canadians and permanent residents through sponsorship for spouses/partners, children, and parents.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(hero?.ctas?.length ? hero.ctas : [
                { label: "Book Free Consultation", url: "/contact#consultation", variant: "default" },
                { label: "Check Eligibility", url: "#eligibility", variant: "outline" },
              ]).map((cta: any, i: number) => (
                <Link key={i} href={cta.url || "/contact"} target={cta?.newTab ? "_blank" : undefined}>
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

      {/* ---------------- Who You Can Sponsor ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{H?.whoYouCanSponsor?.Heading || "Who You Can Sponsor"}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {(cms?.whoYouCanSponsor || []).map((f, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <f.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                    <p className="text-gray-600">{f.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Adopted Children ---------------- */}
      {cms?.adopted && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  {cms.adopted.heading}
                </span>
              </h2>
              {cms.adopted.description && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">{cms.adopted.description}</p>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ---------------- Eligibility Requirements ---------------- */}
      <section id="eligibility" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {H?.eligibility?.Heading || "Sponsor Eligibility Requirements"}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {(cms?.eligibilityItems || []).map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Ways to Apply ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {(cms?.waysToApply || []).map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    {service.features?.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <h5 className="font-semibold text-gray-900 text-sm">Application Process:</h5>
                        {service.features.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{feat}</span>
                          </div>
                        ))}
                        {service.extra && <p className="text-sm text-gray-500">{service.extra}</p>}
                      </div>
                    )}

                    <div className="border-t pt-4 space-y-2 mb-6">
                      {service.processingTime && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Processing Time</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{service.processingTime}</span>
                        </div>
                      )}
                      {service.startingPrice && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Starting From</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{service.startingPrice}</span>
                        </div>
                      )}
                    </div>

                    <Link href={service.href || "/contact#consultation"}>
                      <Button className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90`}>
                        Book Free Consultation
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
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
            {/* center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-pink-600 hidden lg:block"></div>

            <div className="space-y-12">
              {(cms?.processSteps || []).map((step, index) => (
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

                  {/* center dot */}
                  <div className="hidden lg:block w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 lg:block hidden"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Why Choose Our Services ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{H?.whyUs?.Heading || "Why Choose Our Services?"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.whyUs?.description || "We provide comprehensive support throughout your entire immigration journey"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {(cms?.whyUsCards || []).map((feature, index) => (
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

      {/* ---------------- Final CTA ---------------- */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              {cms?.finalCta?.heading || "Ready to Get Started?"}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {cms?.finalCta?.description || "Book a free consultation to discuss your immigration goals and next steps."}
            </p>
            <Link href={(cms?.finalCta?.cta?.url as string) || "/contact"}>
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
              >
                <Phone className="mr-2 w-5 h-5" />
                {(cms?.finalCta?.cta?.label as string) || "Book Free Consultation"}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="mt-4 ml-0 sm:ml-4 border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent"
              onClick={() => {
                window.location.href = "mailto:info@coming2canada.co?subject=Family Sponsorship Inquiry"
              }}
            >
              <Mail className="mr-2 w-5 h-5" />
              Email Us
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

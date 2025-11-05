"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
  ClipboardCheck,
  ClipboardList,
  Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import ServiceBlocks from '@/components/page/ServiceBlocks'

async function fetchServiceBlocks(slug: string) {
  try {
    const base = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '')
    const params = new URLSearchParams()
    if (process.env.NEXT_PUBLIC_STRAPI_PREVIEW === '1') params.set('publicationState', 'preview')
    if (process.env.NEXT_PUBLIC_STRAPI_LOCALE) params.set('locale', process.env.NEXT_PUBLIC_STRAPI_LOCALE)
    const qs = params.toString()
    const url = base + '/api/services/slug/' + encodeURIComponent(slug) + (qs ? ('?' + qs) : '')
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    const data = json?.data
    return (data?.blocks || data?.attributes?.blocks) ?? null
  } catch (_) {
    return null
  }
}


export default function CitizenshipPage() {
  const [blocks, setBlocks] = useState<any[] | null>(null)
  useEffect(() => { fetchServiceBlocks('citizenship').then(setBlocks) }, [])

  if (Array.isArray(blocks) && blocks.length > 0) {
    return <ServiceBlocks blocks={blocks} />
  }

  const eligibilityRequirements = [
    {
      icon: Users,
      title: "Permanent Resident (PR) Status",
      description:
        "You must currently hold PR status and cannot be under review for fraud or removal.",
    },
    {
      icon: Users,
      title: "Physical Presence",
      description:
        "Be physically present in Canada for at least 1,095 days (3 years) within the 5 years before applying. Time as a temporary resident can count as half days, up to 365 days total.",
    },
    {
      icon: Users,
      title: "Income Tax Filing",
      description:
        "File Canadian income tax for at least 3 of the previous 5 tax years, when required.",
    },
    {
      icon: Users,
      title: "Language Proficiency (Age 18-54)",
      description:
        "Provide proof of English or French ability at CLB level 4 or higher for speaking and listening.",
    },
    {
      icon: Users,
      title: "Citizenship Test (Age 18-54)",
      description:
        "Pass a 20-question multiple-choice test on Canada's history, values, institutions, and symbols.",
    },
    {
      icon: Users,
      title: "Oath of Citizenship",
      description:
        "Attend a ceremony to take the Oath of Citizenship and receive your citizenship certificate.",
    },
  ];

  const otherRequirements = [
    "First-generation limit: children born abroad to Canadian parents may still need a citizenship certificate - confirm eligibility with IRCC.",
    "Accommodations & waivers: request support or exemptions for language, testing, or the oath if you have disabilities or special circumstances.",
    "Prohibitions: criminal convictions or removal orders can impact eligibility; resolve these issues before you apply.",
  ];

  const applicationPhases = [
    {
      icon: ClipboardCheck,
      title: "Verify Eligibility",
      summary: "Confirm you meet every statutory requirement before completing the forms.",
      bullets: [
        "Run IRCC's physical presence calculator and review tax filings.",
        "Collect language test results or equivalent proof if you are 18-54.",
        "Ensure no pending prohibitions such as removal orders or fraud reviews.",
      ],
    },
    {
      icon: ClipboardList,
      title: "Prepare Your Application",
      summary: "Assemble a complete, audit-ready package to avoid processing delays.",
      bullets: [
        "Download and complete the adult citizenship application package.",
        "Include identity documents, proof of residency, and any required translations.",
        "Pay the government fees and keep digital copies of every receipt.",
      ],
    },
    {
      icon: GraduationCap,
      title: "Testing & Interview",
      summary: "Demonstrate knowledge of Canada and confirm your language skills.",
      bullets: [
        "Attend the citizenship test (online or in person) if you're 18-54.",
        "Prepare for a brief interview if requested by IRCC.",
        "Respond quickly to any additional document or fingerprint request.",
      ],
    },
    {
      icon: Sparkles,
      title: "Ceremony & Oath",
      summary: "Celebrate reaching the finish line and obtain your certificate.",
      bullets: [
        "Review your ceremony notice and confirm attendance promptly.",
        "Bring required identification and take the Oath of Citizenship.",
        "Collect your certificate and apply for a Canadian passport right away.",
      ],
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We assess your profile and discuss your immigration goals",
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "We create a personalized immigration strategy for your situation",
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
      description: "We provide support until you achieve your immigration goals",
    },
  ]

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Canadian Citizenship
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Become a citizen and complete your Canadian journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Eligibility Requirements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To apply for Canadian citizenship, you must meet the following core criteria.
            </p>
          </motion.div>


          <div className="grid md:grid-cols-3 gap-8">
            {
              eligibilityRequirements.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
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

      {/* eligibility Requirements */}
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
                Other Requirements & Notes
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {otherRequirements.map((item, index) => (
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

      {/* Application Process Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1.5fr,1fr]">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                <ClipboardCheck className="h-4 w-4" />
                Application Roadmap
              </div>
              <h2 className="mt-4 text-4xl font-bold text-gray-900">Navigate the Citizenship Application with Confidence</h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                We break every milestone into clear action items so you know exactly what to prepare, submit, and expect next.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {applicationPhases.map((phase, index) => (
                  <motion.div
                    key={phase.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                      <CardContent className="h-full space-y-4 p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md">
                            <phase.icon className="h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900">{phase.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">{phase.summary}</p>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {phase.bullets.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle className="mt-1 h-5 w-5 text-red-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 p-8 text-white shadow-xl">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 55%)' }} />
                <div className="absolute inset-10 rounded-3xl border border-white/20" />
                <div className="relative space-y-6">
                  <div className="flex items-center gap-3">
                    <FileText className="h-10 w-10 text-white" />
                    <div>
                      <h3 className="text-2xl font-semibold">What We Handle For You</h3>
                      <p className="text-sm text-white/80">Licensed consultants review every submission before it reaches IRCC.</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-white/90">
                    {[
                      "Tailored document checklist and residency evidence review",
                      "Tax filing validation and language proof guidance",
                      "Citizenship test preparation resources and interview coaching",
                      "Ceremony scheduling support plus passport-readiness plan",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-5 w-5 text-white" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/20 pt-6">
                    <p className="text-sm text-white/80">Need a tailored plan? Book a strategy session and we?ll map every milestone together.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link href="/contact">
                        <Button size="lg" className="bg-white text-red-600 hover:bg-white/90">
                          Book Consultation
                        </Button>
                      </Link>
                      <Link href="/resources">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                          Citizenship Resources
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Process Section */}
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
                Our Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven 5-step process to ensure your immigration success
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Line */}
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

                  {/* Center Circle for Desktop */}
                  <div className="hidden lg:block w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full border-4 border-white shadow-lg"></div>

                  <div className="flex-1 lg:block hidden"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support throughout your entire immigration journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8">
              Book a free consultation to discuss your immigration goals and find the right service for you.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
              >
                Book Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

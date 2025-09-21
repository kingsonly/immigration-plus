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
      icon: Users, // Suggests multi-generational or group support
      title: "Permanent Resident (PR) Status",
      description:
        "You must currently hold PR status and not be under review for fraud or removal.",
    },
    {
      icon: Users, // Suggests multi-generational or group support
      title: "Physical Presence",
      description:
        "You must have been physically present in Canada for at least 1,095 days (3 years) during the 5 years before your application. (Time spent in Canada as a temporary resident or protected person may count for half-days, up to 365 total.).",
    },
    {
      icon: Users, // Suggests multi-generational or group support
      title: "Income Tax Filing",
      description:
        "You must have filed Canadian income tax in at least 3 of the last 5 years, if requiredâ€‹.",
    },
    {
      icon: Users, // Suggests multi-generational or group support
      title: "Language Proficiency (Age 18â€“54)",
      description:
        "Demonstrate your English or French speaking and listening skills at Canadian Language Benchmark Level 4 or higher.",
    },
    {
      icon: Users, // Suggests multi-generational or group support
      title: "Citizenship Test (Age 18â€“54)",
      description:
        "Pass a 20-question multiple-choice test on Canadaâ€™s history, values, institutions, and symbols â€” you must answer at least 15 correctly to meet the 75% passing score.",
    },
    {
      icon: Users, // Suggests multi-generational or group support
      title: "Oath of Citizenship",
      description:
        "Once approved, youâ€™ll attend a ceremony and take an oath to officially become a Canadian citizen",
    },

  ];
  const otherRequirements = [
    "First-Generation Limit: Children born abroad to Canadian parents may still need a citizenship certificateâ€”check IRCCâ€™s rules.",
    "Accommodations & Waivers: You can request help or exemptions for language, testing, or the oath for disabilities or special circumstances.",
    "Prohibitions: Criminal convictions or being under removal orders may affect eligibility.",
  ]
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
              To apply for Canadian citizenship, you must meet the following core criteria .
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Application Process</h2>
              {/* <div className="space-y-4 text-gray-600 text-lg leading-relaxed">

                <p>
                  Founded with a vision to make Canadian immigration accessible and successful for everyone, TENTACULAR
                  IMMIGRATION SOLUTIONS LTD has been helping individuals and families achieve their Canadian dreams for
                  over a decade.
                </p>
                <p>
                  Our journey began when our founder experienced firsthand the challenges of navigating Canada's
                  immigration system. This personal experience ignited a passion to help others avoid the same pitfalls
                  and achieve success in their immigration journey.
                </p>
                <p>
                  Today, we're proud to be one of Canada's most trusted immigration consulting firms, with a track
                  record of success that speaks for itself. Our team of licensed consultants brings together decades of
                  combined experience and a deep understanding of Canadian immigration law.
                </p>
              </div> */}

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2"> Confirm You Meet Eligibility:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use IRCC's Physical Presence Calculator</li>
                    <li>Gather language proof and tax records</li>
                    <li>Complete the citizenship test study materials</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">âœ”ï¸ Prepare & Submit Your Application:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use the adult PR application package</li>
                    <li>Include all supporting documents and fees</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">âœ”ï¸ Take the Citizenship Test and/or Interview (if required):</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Administered online or in person for applicants aged 18-54</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Attend Your Citizenship Ceremony & Take the Oath:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Official ceremony where you complete the oath and receive your citizenship</li>
                  </ul>
                </div>
              </div>

            </motion.div>

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
                <FileText className="w-32 h-32 text-white/80" />
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

"use client"

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
  MapPinned,
  ClipboardCheck,
  BarChart4,
  FileSignature,
  HeartHandshake,
  Repeat,
  Star,
  Baby,
  UserMinus,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FamilySponsorshipPage() {
  const sponsor = [
    {
      icon: HeartHandshake, // Best fit for spousal or partner support
      title: "Spouse, Common‑Law, or Conjugal Partners",
      description:
        "Sponsor your spouse or partner, whether they’re in Canada or abroad. We support both Inland and Outland applications with eligibility checks, proof of relationship, and dual intent guidance.",
    },
    {
      icon: Baby, // Symbolizes children and dependents
      title: "Dependent Children",
      description:
        "Sponsor biological or adopted children under 22, or older dependents with medical conditions. We assist with guardianship, dependency proof, and family reunification.",
    },
    {
      icon: Users, // Suggests multi-generational or group support
      title: "Parents and Grandparents",
      description:
        "Support your PGP sponsorship with help on ITA response, income proof, and medical/financial documentation. We guide you through IRCC’s intake and income eligibility process.",
    },
    {
      icon: UserMinus, // Reflects orphaned/unsupported individuals
      title: "Orphaned Siblings, Nieces/Nephews, or Other Relatives",
      description:
        "Sponsor eligible orphaned relatives under compassionate family reunification grounds. We help confirm eligibility and complete documentation for lesser-known pathways.",
    },
  ];

  const eligibilityRequirements = [
    "Be at least 18 years old",
    "Be a Canadian citizen, permanent resident, or Registered Indian",
    "Live in Canada throughout the sponsorship process",
    "Meet financial requirements only for dependent children who themselves sponsor children ",
    "Not have sponsorship obligations in the past 3–5 years or be party to active undertakings​​​",
  ]


  const waysToApply = [
    {
      icon: Home,
      title: "Outland",
      description: "Your loved one applies from outside Canada ",
      features: [
        "Complete sponsorship forms and include your spouse’s / child’s PR application",

        "Submit online via IRCC portal",

        "Acknowledge receipt & pay biometrics within 30 days",

        "Undergo medical, security, and background checks",

        "Receive a decision and(if approved) a Confirmation of Permanent Residence(COPR)",
      ],
      processingTime: "12 months for 80% of cases",
      startingPrice: "Contact for pricing",
      color: "from-red-500 to-red-600",
      href: "/contact#consultation",
      extra: "Interim options: Your partner may receive a visitor visa or open work permit as the sponsorship proceeds",

    },
    {
      icon: Briefcase,
      title: "Inland ",
      description: "They applied from within Canada",
      features: [
        "Complete sponsorship forms and include your spouse’s / child’s PR application",

        "Submit online via IRCC portal",

        "Acknowledge receipt & pay biometrics within 30 days",

        "Undergo medical, security, and background checks",

        "Receive a decision and(if approved) a Confirmation of Permanent Residence(COPR)",
      ],
      processingTime: "12 months for 80% of cases",
      startingPrice: "Contact for pricing",
      color: "from-red-600 to-pink-600",
      href: "/contact#consultation",
      extra: "Interim options: Your partner may receive a visitor visa or open work permit as the sponsorship proceeds",
    },
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
                Family Sponsorship
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Coming2Canada, we help reunite families by guiding Canadian citizens and permanent residents through the sponsorship process for spouses, children, and parents.
              From eligibility to IRCC follow-up, we ensure a smooth path to bringing your loved ones home — because family belongs together in Canada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Who You Can Sponsor</h2>

          </motion.div>


          <div className="grid md:grid-cols-2 gap-8">
            {
              sponsor.map((feature, index) => (
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
                Sponsorship of Adopted Children
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Adopting a child—whether internationally or within Canada—requires meeting both immigration and provincial legal standards. At Coming2Canada, we provide compassionate guidance through every step, helping you navigate complex adoption and sponsorship requirements with clarity and care, so your family can grow legally and lovingly.
            </p>
          </motion.div>

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
                Sponsor Eligibility Requirements
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {eligibilityRequirements.map((item, index) => (
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

      {/* Ways to Apply */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {waysToApply.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="space-y-2 mb-6">
                      <h5 className="font-semibold text-gray-900 text-sm">Application Process:</h5>
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                      {service?.extra && (
                        <p className="text-sm text-gray-500">
                          {service.extra}
                        </p>
                      )}

                    </div>

                    <div className="border-t pt-4 space-y-2 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Processing Time</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{service.processingTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Starting From</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{service.startingPrice}</span>
                      </div>
                    </div>

                    <Link href={service.href}>
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

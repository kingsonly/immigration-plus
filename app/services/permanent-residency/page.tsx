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
  Award,
  Star,
  MapPinned,
  ClipboardCheck,
  BarChart4,
  FileSignature,
  HeartHandshake,
  Repeat,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Home,
      title: "Permanent Residency (PR)",
      description: "Your pathway to calling Canada home permanently",
      features: [
        "Express Entry System",
        "Federal Skilled Worker Program",
        "Canadian Experience Class",
        "Federal Skilled Trades Program",
      ],
      processingTime: "6-12 months",
      startingPrice: "Contact for pricing",
      color: "from-red-500 to-red-600",
      href: "/services/permanent-residency",
    },
    {
      icon: Briefcase,
      title: "Business Immigration",
      description: "Turn your business expertise into Canadian success",
      features: [
        "Start-up Visa Program",
        "Self-employed Persons Program",
        "Investor Programs",
        "Entrepreneur Programs",
      ],
      processingTime: "12-24 months",
      startingPrice: "Contact for pricing",
      color: "from-red-600 to-pink-600",
      href: "/services/business-immigration",
    },
    {
      icon: GraduationCap,
      title: "Study & Work Permits",
      description: "Education and career opportunities in Canada",
      features: [
        "Study Permit Applications",
        "Work Permit Applications",
        "Post-Graduation Work Permits",
        "Co-op Work Permits",
      ],
      processingTime: "4-12 weeks",
      startingPrice: "Contact for pricing",
      color: "from-pink-600 to-red-500",
      href: "/services/study-work-permits",
    },
    {
      icon: Heart,
      title: "Family Sponsorship",
      description: "Reunite with your loved ones in Canada",
      features: [
        "Spouse/Partner Sponsorship",
        "Dependent Children Sponsorship",
        "Parent & Grandparent Program",
        "Other Eligible Relatives",
      ],
      processingTime: "12-24 months",
      startingPrice: "Contact for pricing",
      color: "from-red-500 to-red-700",
      href: "/services/family-sponsorship",
    },
    {
      icon: MapPin,
      title: "Provincial Nominee Program",
      description: "Find your perfect province to call home",
      features: [
        "Ontario Immigrant Nominee Program",
        "British Columbia PNP",
        "Alberta Immigrant Nominee Program",
        "Other Provincial Programs",
      ],
      processingTime: "6-18 months",
      startingPrice: "Contact for pricing",
      color: "from-red-700 to-pink-500",
      href: "/services/pnp",
    },
    {
      icon: Users,
      title: "Citizenship Applications",
      description: "Complete your journey to becoming a Canadian citizen",
      features: [
        "Citizenship Applications",
        "Citizenship Test Preparation",
        "Citizenship Ceremony Guidance",
        "Urgent Processing Requests",
      ],
      processingTime: "12-18 months",
      startingPrice: "Contact for pricing",
      color: "from-pink-500 to-red-600",
      href: "/services/citizenship",
    },
  ]

  const offerings = [
    {
      icon: MapPinned, // Lucide icon for guidance/navigation
      title: "Guidance on Program Selection",
      description:
        "We guide you in selecting the most suitable federal or provincial pathway — including Express Entry, CEC, PNPs, RNIP, and more — aligned with your goals and qualifications.",
      tips: [
        "Compare federal and provincial immigration pathways based on your background.",
        "Evaluate eligibility for Express Entry, RNIP, or CEC routes.",
        "Receive personalized advice based on your qualifications and goals.",
      ],
    },
    {
      icon: ClipboardCheck, // Lucide icon for document review
      title: "Comprehensive Profile Setup & Documentation Review",
      description:
        "We ensure your online profiles (e.g., Express Entry) are correctly created and thoroughly supported by compliant, well-organized documentation that meets IRCC standards.",
      tips: [
        "Create and optimize your Express Entry or PNP profile.",
        "Organize supporting documents to meet Canadian immigration requirements.",
        "Avoid common mistakes that lead to rejections or delays.",
      ],
    },
    {
      icon: BarChart4, // Lucide icon for ranking/metrics
      title: "CRS Optimization Strategies",
      description:
        "We identify and implement strategies to boost your Comprehensive Ranking System (CRS) score, increasing your chances of receiving an Invitation to Apply (ITA).",
      tips: [
        "Evaluate your current CRS score and identify areas for improvement.",
        "Get support to improve language test results or gain additional experience.",
        "Explore PNP options that offer bonus CRS points.",
      ],
    },
    {
      icon: FileSignature, // Lucide icon for application handling
      title: "Support from ITA to PR Submission",
      description:
        "From the moment you receive an ITA, we guide you through every step — including forms, police certificates, medicals, and document uploads — until your permanent residency is finalized.",
      tips: [
        "Understand and complete post-ITA requirements with confidence.",
        "Prepare and upload all documents according to IRCC guidelines.",
        "Avoid delays by tracking deadlines and required submissions.",
      ],
    },
    {
      icon: HeartHandshake, // Lucide icon for humanitarian help
      title: "Humanitarian and Compassionate (H&C) Application Support",
      description:
        "For clients with exceptional circumstances, we prepare compelling submissions that highlight hardship, establishment in Canada, and best interests of children.",
      tips: [
        "Highlight evidence of hardship and Canadian establishment.",
        "Craft strong narratives aligned with IRCC's H&C principles.",
        "Emphasize family ties and children's best interests where applicable.",
      ],
    },
    {
      icon: Repeat, // Lucide icon for transition or change
      title: "Transition Planning from Temporary to Permanent Residency",
      description:
        "We provide strategic planning for those on work or study permits to transition smoothly to permanent residence through appropriate pathways.",
      tips: [
        "Review options under CEC, PNP, or bridging work permits.",
        "Plan your timelines and documents while on temporary status.",
        "Maximize your time in Canada toward PR eligibility.",
      ],
    },
    {
      icon: Star, // Lucide icon representing qualification/highlight
      title: "Eligibility and Credential Assessments",
      description:
        "We evaluate your educational background, work history, and language proficiency to determine your suitability for various Canadian immigration programs.",
      tips: [
        "Assess your credentials through approved PR bodies like WES or IQAS.",
        "Match your job history to eligible NOC codes used in PR pathways.",
        "Identify programs like Express Entry or PNPs that fit your profile.",
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
                Permanent Residency
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Coming2Canada, we guide skilled workers, international graduates, and temporary residents through Canada’s immigration pathways, including Express Entry, CEC, PNPs, and H&C applications. We offer personalized support with eligibility assessments, CRS optimization, and full documentation to help you successfully transition to permanent residency.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Explore Your Pathway to Permanent Residence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support throughout your entire immigration journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Express Entry System",
                description:
                  "Express Entry manages applications for skilled workers through FSW, CEC, and FST. Candidates are ranked via CRS, with top applicants invited to apply and most receiving PR within six months.",
              },
              {
                icon: FileText,
                title: "Provincial Nominee Programs",
                description:
                  "Each Canadian province (except Quebec) offers tailored immigration streams for skilled workers, graduates, semi-skilled workers, and entrepreneurs, accessible through Express Entry or direct provincial nomination pathways.",
              },
              {
                icon: FileText,
                title: "International Graduate Streams",
                description:
                  "Canadian post-secondary graduates can fast-track permanent residency through programs like the Canadian Experience Class (CEC) or province-specific International Graduate streams under the Provincial Nominee Program (PNP).",
              },
              {
                icon: FileText,
                title: "Rural & Northern Immigration Pilot (RNIP/RCIP)",
                description:
                  "Smaller Canadian towns run community-driven programs like the Rural Community Immigration Pilot, which replaced RNIP, to attract skilled workers with job offers and local support toward permanent residency.",
              },
              {
                icon: Clock,
                title: "Agri‑Food & Home Care Worker Pilots",
                description:
                  "Canada offers sector-focused PR streams like the Agri-Food Pilot (for farm workers, extended to 2025) and Home Care Worker Pilots, providing direct permanent residency pathways for eligible caregivers and support workers.",
              },
              {
                icon: Users,
                title: "Humanitarian & Compassionate (H&C) & Public Policy Pathways",
                description:
                  "Humanitarian and compassionate (H&C) and policy-based streams offer permanent residency pathways for applicants in exceptional situations, such as hardship or long-term establishment in Canada, outside standard economic immigration programs.",
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
      {/* What we offer Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                What We Offer
              </span>
            </h2>

          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {
              offerings.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                          <tip.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{tip.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{tip.description}</p>
                      <ul className="space-y-2">
                        {tip.tips.map((tipItem, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{tipItem}</span>
                          </li>
                        ))}
                      </ul>
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

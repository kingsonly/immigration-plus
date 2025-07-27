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
  Calendar,
  Rocket,
  Building,
  Target,
  Award,
  TrendingUp,
  PieChart,
  Star,
  Mail,
  AlertCircle,
  Lightbulb,
  Info,
  Globe,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function BusinessImmigrationPage() {
  const [activeProgram, setActiveProgram] = useState(0)

  const businessPrograms = [
    {
      title: "Start-Up Visa Program",
      subtitle: "For visionary entrepreneurs with innovative business ideas",
      description:
        "Canada's Start-Up Visa Program is designed for visionary entrepreneurs who have the potential to build innovative businesses in Canada that can compete globally, create jobs for Canadians, and drive long-term economic growth.",
      icon: Rocket,
      color: "from-red-500 to-red-600",
      requirements: [
        "Innovative business concept",
        "Letter of Support from designated organization",
        "CLB 5 in English or French",
        "Sufficient settlement funds",
      ],
      href: "#startup-visa",
    },
    {
      title: "Provincial Entrepreneur Streams",
      subtitle: "Tailored pathways for regional business builders",
      description:
        "Each province offers entrepreneur streams under the PNP, providing permanent residence pathways to qualified businesspeople ready to invest, settle, and contribute to the local economy.",
      icon: MapPin,
      color: "from-red-600 to-pink-600",
      requirements: [
        "Minimum net worth $300K-$800K",
        "Investment $100K-$600K",
        "Business management experience",
        "Job creation for Canadians",
      ],
      href: "#provincial-streams",
    },
    {
      title: "C11 Work Permit",
      subtitle: "Launch or acquire a Canadian business without LMIA",
      description:
        "The C11 work permit allows entrepreneurs to enter Canada to actively manage their own business, owning at least 50% and demonstrating significant economic benefit to the country.",
      icon: Building,
      color: "from-pink-600 to-red-500",
      requirements: [
        "Own at least 50% of Canadian business",
        "Active management role",
        "Economic benefit to Canada",
        "Solid business plan",
      ],
      href: "#c11-permit",
    },
    {
      title: "Self-Employed Persons Program",
      subtitle: "For cultural professionals, athletes, and artists",
      description:
        "Direct pathway to permanent residency for individuals with relevant experience in cultural or athletic activities who intend to continue working independently in Canada.",
      icon: Award,
      color: "from-red-500 to-red-700",
      requirements: [
        "2+ years self-employment experience",
        "Cultural or athletic background",
        "Intent to be self-employed in Canada",
        "Meet selection criteria",
      ],
      href: "#self-employed",
    },
  ]

  const startupFees = [
    {
      category: "Startup Team Participation",
      range: "CAD 75,000 – CAD 250,000",
      description: "For entrepreneurs joining existing startup groups",
      details: ["Access to eligible startup", "Document preparation", "Founder alignment", "Business role allocation"],
      note: "Private-market fees, not charged by IRCC",
    },
    {
      category: "Designated Organization Support",
      range: "CAD 10,000 – CAD 200,000",
      description: "Business incubators, angel investors, or venture capital funds",
      details: ["Business plan development", "Pitch coaching", "Due diligence", "Letter of Support"],
      note: "Varies based on business stage and potential",
    },
    {
      category: "Business Investment Capital",
      range: "CAD 50,000 – CAD 250,000",
      description: "Funding the actual launch of your startup",
      details: ["Business setup costs", "Hiring and operations", "Development expenses", "Customer acquisition"],
      note: "IRCC expects genuine business activity",
    },
  ]

  const provincialStreams = [
    {
      province: "British Columbia",
      program: "Entrepreneur Immigration",
      netWorth: "≥ CAD $600,000",
      investment: "≥ CAD $200,000",
      jobs: "1+ Canadian job",
      streams: ["Base Stream", "Regional Pilot", "Strategic Projects"],
      color: "from-blue-500 to-blue-600",
    },
    {
      province: "Ontario",
      program: "Entrepreneur Stream (OINP)",
      netWorth: "$800K (GTA) / $400K (outside)",
      investment: "$600K (GTA) / $200K (outside)",
      jobs: "1–2 full-time positions",
      streams: ["GTA Stream", "Outside GTA/ICT"],
      color: "from-green-500 to-green-600",
    },
    {
      province: "Alberta",
      program: "Foreign Graduate Entrepreneur",
      netWorth: "Investment-focused",
      investment: "$100K (urban) / $50K (rural)",
      jobs: "Job creation required",
      streams: ["Urban Stream", "Rural Stream"],
      color: "from-orange-500 to-orange-600",
    },
    {
      province: "Manitoba",
      program: "Entrepreneur Pathway",
      netWorth: "≥ CAD $500,000",
      investment: "$250K (Winnipeg) / $150K (outside)",
      jobs: "1+ full-time job",
      streams: ["Business Stream", "Farm Stream"],
      color: "from-purple-500 to-purple-600",
    },
  ]

  const governmentFees = [
    { category: "Principal Applicant", amount: "$1,625 + $515 (RPRF)" },
    { category: "Spouse or Partner", amount: "$850 + $515 (RPRF)" },
    { category: "Dependent Child (each)", amount: "$230" },
    { category: "Biometrics (individual)", amount: "$85" },
    { category: "Biometrics (family)", amount: "$170 (max)" },
  ]

  const c11Benefits = [
    {
      icon: Users,
      title: "Create or maintain jobs for Canadians",
      description: "Demonstrate employment opportunities for local workforce",
    },
    {
      icon: Lightbulb,
      title: "Introduce innovative goods or services",
      description: "Bring new technologies or solutions to Canadian market",
    },
    {
      icon: TrendingUp,
      title: "Expand regional economic opportunities",
      description: "Contribute to local economic development and growth",
    },
    {
      icon: Globe,
      title: "Increase exports or develop international markets",
      description: "Help Canada expand its global trade relationships",
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
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Business Immigration
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Empowering Entrepreneurs, Investors & Self‑Employed Professionals to Launch and Grow in Canada
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              At TENTACULAR IMMIGRATION SOLUTIONS LTD, we guide ambitious business-minded individuals through Canada's
              federal and provincial business immigration streams—helping you transition from startup idea to permanent
              residency, legally and strategically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Free Business Consultation
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
              >
                <FileText className="mr-2 w-5 h-5" />
                Request Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Programs Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Business Immigration Pathways
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right pathway for your business goals and immigration objectives
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {businessPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <program.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-lg text-red-600 font-medium mb-4">{program.subtitle}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-900">Key Requirements:</h4>
                      {program.requirements.map((req, reqIndex) => (
                        <div key={reqIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${program.color} hover:opacity-90`}>
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

      {/* Start-Up Visa Program Detailed Section */}
      <section id="startup-visa" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Start-Up Visa Program</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Launch your innovative business in Canada with permanent residency pathway
            </p>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="w-6 h-6 text-red-600 mr-3" />
                  How It Works
                </h3>
                <p className="text-gray-700 mb-6">To qualify for the Start-Up Visa, you must:</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">1. Pitch to a Designated Organization</h4>
                      <p className="text-gray-600">
                        Submit your business idea to a designated incubator, angel investor group, or venture capital
                        fund. If approved, you'll receive a required Letter of Support.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">2. Meet Language Requirements</h4>
                      <p className="text-gray-600">Achieve CLB 5 in English or French.</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">3. Prove Settlement Funds</h4>
                      <p className="text-gray-600">
                        Demonstrate you can support yourself and your dependents in Canada (per IRCC guidelines).
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">4. Launch While You Wait</h4>
                      <p className="text-gray-600">
                        Eligible applicants may apply for a temporary work permit to begin operations in Canada while
                        awaiting permanent residence approval.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Start-Up Visa Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: "Eligibility Assessment",
                  description: "We evaluate your business concept, background, and investor readiness",
                },
                {
                  icon: FileText,
                  title: "Letter of Support",
                  description: "We guide you in securing endorsement from designated organizations",
                },
                {
                  icon: Briefcase,
                  title: "Application Strategy",
                  description: "We help craft a strong immigration application that meets IRCC requirements",
                },
                {
                  icon: Lightbulb,
                  title: "Business Advisory",
                  description: "Expert support in business plan development and pitch preparation",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h4>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fee Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Start-Up Visa Program: Understanding the Fees
            </h3>
            <div className="space-y-8">
              {startupFees.map((fee, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{fee.category}</h4>
                          <p className="text-gray-600 mb-3">{fee.description}</p>
                          <div className="text-2xl font-bold text-red-600 mb-4">{fee.range}</div>
                        </div>
                        <DollarSign className="w-8 h-8 text-red-600 flex-shrink-0 ml-4" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Includes:</h5>
                          <ul className="space-y-1">
                            {fee.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-yellow-800">{fee.note}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Government Fees */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building className="w-6 h-6 text-gray-600 mr-3" />
                  IRCC & Government Fees
                </h3>
                <p className="text-gray-700 mb-6">
                  These are standard federal fees charged for all permanent residence applications.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {governmentFees.map((fee, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border">
                      <h4 className="font-semibold text-gray-900 mb-1">{fee.category}</h4>
                      <p className="text-lg font-bold text-red-600">{fee.amount}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">RPRF: Right of Permanent Residence Fee</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quote Request CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardContent className="p-8 text-center">
                <Briefcase className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Start-Up Visa – Request a Quote</h3>
                <p className="text-xl mb-6 text-white/90">
                  Canada's Start-Up Visa Program offers permanent residence to entrepreneurs with innovative business
                  ideas supported by a designated organization.
                </p>
                <p className="mb-8 text-white/80">
                  Because each case is unique, our professional fees vary depending on your needs and the complexity of
                  your application. Before requesting a quote, we recommend booking a consultation to evaluate your
                  business concept and immigration eligibility.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                    >
                      <Calendar className="mr-2 w-5 h-5" />
                      Book Consultation
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent"
                    onClick={() => {
                      window.location.href = "mailto:info@coming2canada.co?subject=Canada Start-Up Visa Quote Request"
                    }}
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Request Quote
                  </Button>
                </div>
                <p className="text-sm text-white/70 mt-4">
                  Email us at info@coming2canada.co with "Canada Start-Up Visa" in the subject line
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Provincial Entrepreneur Streams */}
      <section id="provincial-streams" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Provincial Entrepreneur & Investor Streams</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored Immigration Pathways for Regional Business Builders
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Overview</h3>
                <p className="text-gray-700 mb-6">
                  Each province or territory has its own entrepreneur stream under the PNP, offering permanent residence
                  pathways to qualified businesspeople who are ready to invest, settle, and contribute to the local
                  economy.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: "Minimum Net Worth", value: "CAD $300,000 to $800,000" },
                    { label: "Investment Amount", value: "CAD $100,000 to $600,000" },
                    { label: "Business Management", value: "Experience Required" },
                    { label: "Job Creation", value: "For Canadians" },
                    { label: "Business Performance", value: "Agreement Required" },
                    { label: "Work Permit", value: "Temporary (prior to nomination)" },
                  ].map((req, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-1">{req.label}</h4>
                      <p className="text-gray-600 text-sm">{req.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {provincialStreams.map((stream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${stream.color} rounded-xl flex items-center justify-center`}
                      >
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{stream.province}</h3>
                        <p className="text-gray-600">{stream.program}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Net Worth:</span>
                        <span className="font-semibold text-gray-900">{stream.netWorth}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Investment:</span>
                        <span className="font-semibold text-gray-900">{stream.investment}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Job Creation:</span>
                        <span className="font-semibold text-gray-900">{stream.jobs}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Available Streams:</h4>
                      <div className="flex flex-wrap gap-2">
                        {stream.streams.map((streamName, streamIndex) => (
                          <span key={streamIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {streamName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* C11 Work Permit Section */}
      <section id="c11-permit" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">C11 Work Permit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Launch or acquire a Canadian business and work without an LMIA
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Overview</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The C11 work permit is an LMIA-exempt pathway for entrepreneurs and business owners who want to enter
                  Canada to actively manage their own business. It is designed for individuals who own at least 50% of a
                  Canadian business and can demonstrate a significant economic benefit to the country.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <PieChart className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">50% Ownership</h4>
                    <p className="text-gray-600 text-sm">Minimum ownership requirement in Canadian business</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Active Management</h4>
                    <p className="text-gray-600 text-sm">Hands-on involvement in business operations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Economic Benefit</h4>
                    <p className="text-gray-600 text-sm">Demonstrate significant benefit to Canada</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">What Counts as Economic Benefit?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {c11Benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Timeline and Duration</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Initial C11 Work Permit</h4>
                    <p className="text-gray-600">Typically issued for 1–2 years</p>
                  </div>
                  <div className="text-center">
                    <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Extension</h4>
                    <p className="text-gray-600">Possible based on continued business operation</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">PR Pathway</h4>
                    <p className="text-gray-600">Available after establishing business and Canadian work experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Self-Employed Persons Program */}
      <section id="self-employed" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Self-Employed Persons Program</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For Cultural Professionals, Athletes, and Artists Seeking Permanent Residence in Canada
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Who It's For:</h4>
                    <ul className="space-y-2">
                      {[
                        "Musicians, painters, writers, actors, filmmakers",
                        "Professional athletes, coaches, referees",
                        "Dancers, artisans, designers, and other cultural contributors",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">To Qualify, You Must:</h4>
                    <ul className="space-y-2">
                      {[
                        "Have at least 2 years of self-employment or participation in cultural/athletic events",
                        "Intend and be able to become self-employed in Canada",
                        "Score well under the selection grid",
                        "Meet language, medical, security, and financial requirements",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">How We Help</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: "Eligibility Assessments",
                  description: "Profile scoring and qualification evaluation",
                },
                {
                  icon: FileText,
                  title: "Narrative Building",
                  description: "Showcase cultural or athletic contributions",
                },
                {
                  icon: Briefcase,
                  title: "Document Preparation",
                  description: "Proof of self-employment and achievements",
                },
                {
                  icon: Users,
                  title: "Full Representation",
                  description: "Throughout the entire application process",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h4>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post-Investment PR Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Post-Investment Permanent Residency</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For most streamlined federal and PNP pathways, PR eligibility follows successful business establishment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "Continuous Business Ownership",
                description: "Maintain active ownership or management of your Canadian business",
              },
              {
                icon: Users,
                title: "Job Creation for Canadians",
                description: "Demonstrate employment opportunities created for Canadian workers",
              },
              {
                icon: CheckCircle,
                title: "Program Compliance",
                description: "Stay compliant with all program rules and performance agreements",
              },
            ].map((requirement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <requirement.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{requirement.title}</h3>
                    <p className="text-gray-600">{requirement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our PR Application Support</h3>
                <p className="text-gray-600 mb-6">
                  We support your PR application, including document preparation, compliance checks, and submission
                  timing to ensure your successful transition to permanent residency.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Document Preparation", "Compliance Checks", "Submission Timing", "Application Monitoring"].map(
                    (service, index) => (
                      <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {service}
                      </span>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Scale Your Business in Canada?</h2>
            <p className="text-xl text-white/90 mb-8">
              Let's map your path—whether you're looking to launch a startup, invest, or self-employ. We're here to help
              you make your Canadian business dreams a reality.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-12 py-4 rounded-full font-semibold"
              >
                <Calendar className="mr-3 w-5 h-5" />
                Book Free Business Immigration Consultation
              </Button>
            </Link>
            <p className="text-white/70 text-sm mt-4">
              Start smart. Start strong. Start with TENTACULAR IMMIGRATION SOLUTIONS LTD.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plane,
  Globe,
  Calendar,
  FileText,
  CheckCircle,
  Users,
  Heart,
  Clock,
  MapPin,
  Shield,
  AlertCircle,
  Info,
  Star,
  ArrowRight,
  Phone,
  Mail,
  StampIcon as Passport,
  CreditCard,
  Home,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VisitorVisaPage() {
  const [activeVisaType, setActiveVisaType] = useState(0)

  const visitorVisaTypes = [
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
      description:
        "Allows travel to Canada multiple times over the visa's validity period—up to 10 years or until the passport expires.",
      idealFor: "Frequent travelers, business visitors, family members",
      icon: Globe,
      color: "from-green-500 to-green-600",
      features: ["Multiple entries", "Up to 10 years validity", "6 months per visit", "Business & leisure"],
    },
    {
      title: "Transit Visa",
      description:
        "Required for foreign nationals who are passing through Canada en route to another country, with a layover of less than 48 hours.",
      idealFor: "Airport layovers and connections",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      features: ["Transit only", "Under 48 hours", "No stay permitted", "Airport connections"],
    },
    {
      title: "Super Visa",
      description:
        "Designed for parents and grandparents of Canadian citizens or permanent residents. This long-term, multiple-entry visa allows extended stays of up to five years per entry.",
      idealFor: "Parents & grandparents of Canadian citizens/PRs",
      icon: Heart,
      color: "from-red-500 to-red-600",
      features: ["Up to 5 years per entry", "Multiple entries", "Family reunification", "Extended stays"],
    },
  ]

  const visaVsEtaComparison = [
    {
      feature: "Required for",
      trv: "Most non-visa-exempt countries",
      eta: "Visa-exempt travelers (air only)",
    },
    {
      feature: "Application Method",
      trv: "Online or VAC",
      eta: "Online only",
    },
    {
      feature: "Processing Time",
      trv: "Weeks (varies by country)",
      eta: "Minutes to days",
    },
    {
      feature: "Validity",
      trv: "Up to 10 years",
      eta: "Up to 5 years or passport expiry",
    },
    {
      feature: "Entry Type",
      trv: "Single or Multiple",
      eta: "Multiple",
    },
    {
      feature: "Biometric Requirement",
      trv: "Yes (14-79 years)",
      eta: "No",
    },
  ]

  const applicationSteps = [
    {
      step: "01",
      title: "Confirm if you need a TRV or eTA",
      description: "Determine your visa requirements based on your nationality and travel method",
      icon: Info,
      color: "from-blue-500 to-blue-600",
    },
    {
      step: "02",
      title: "Prepare documentation",
      description: "Gather all required documents including passport, financial proof, and supporting materials",
      icon: FileText,
      color: "from-green-500 to-green-600",
    },
    {
      step: "03",
      title: "Apply online or via VAC",
      description: "Submit your application through the appropriate channel with all required documents",
      icon: Globe,
      color: "from-purple-500 to-purple-600",
    },
    {
      step: "04",
      title: "Complete biometrics (if required)",
      description: "Provide fingerprints and photo at a designated biometric collection service point",
      icon: User,
      color: "from-orange-500 to-orange-600",
    },
    {
      step: "05",
      title: "Await processing and decision",
      description: "Monitor your application status and respond to any additional requests from IRCC",
      icon: Clock,
      color: "from-red-500 to-red-600",
    },
    {
      step: "06",
      title: "Upon approval, carry supporting documents",
      description: "Prepare for entry with all necessary documents when traveling to Canada",
      icon: CheckCircle,
      color: "from-green-600 to-green-700",
    },
  ]

  const visitorVisaChecklist = [
    {
      item: "Valid passport",
      description: "Must be valid for the duration of your stay",
      icon: Passport,
      required: true,
    },
    {
      item: "Completed application form (IMM 5257)",
      description: "Application for Temporary Resident Visa",
      icon: FileText,
      required: true,
    },
    {
      item: "Proof of financial support",
      description: "Bank statements, employment letter, or sponsor's financial documents",
      icon: CreditCard,
      required: true,
    },
    {
      item: "Ties to home country",
      description: "Employment letter, property ownership, family ties",
      icon: Home,
      required: true,
    },
    {
      item: "Invitation letter (if applicable)",
      description: "From family/friends in Canada with their information",
      icon: Mail,
      required: false,
    },
    {
      item: "Travel history",
      description: "Previous visas, entry stamps, travel documentation",
      icon: Globe,
      required: true,
    },
    {
      item: "Medical exam (if required)",
      description: "From panel physician if staying over 6 months or from certain countries",
      icon: Heart,
      required: false,
    },
    {
      item: "Police certificate",
      description: "In some cases, depending on travel history and length of stay",
      icon: Shield,
      required: false,
    },
    {
      item: "Travel itinerary and accommodation",
      description: "Flight bookings, hotel reservations, or host information",
      icon: MapPin,
      required: true,
    },
  ]

  const validityDurations = [
    {
      visaType: "Temporary Resident Visa (TRV)",
      validity: "Up to 10 years or passport expiry",
      stayDuration: "Up to 6 months per entry",
      extension: "Extendable in some cases",
      icon: Globe,
      color: "from-blue-500 to-blue-600",
    },
    {
      visaType: "Super Visa",
      validity: "Up to 10 years",
      stayDuration: "Up to 5 years per entry",
      extension: "Can leave and re-enter",
      icon: Heart,
      color: "from-red-500 to-red-600",
    },
    {
      visaType: "Electronic Travel Authorization (eTA)",
      validity: "Up to 5 years or passport expiry",
      stayDuration: "Up to 6 months per entry",
      extension: "Extendable in some cases",
      icon: Plane,
      color: "from-green-500 to-green-600",
    },
  ]

  const whoNeedsWhat = [
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
              <Plane className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Experience Canada with Confidence
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              ✈️ Visit Canada: Visitor & Transit Visas
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore Canada with confidence—whether it's a holiday, family visit, business trip, or transit stop.
              TENTACULAR IMMIGRATION SOLUTIONS LTD provides expert support to help you secure the right visitor document
              and prepare for your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Visitor Visa Consultation
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
              >
                <Info className="mr-2 w-5 h-5" />
                Check Requirements
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Do You Need a Visa or eTA? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">🌍 Do You Need a Visa or eTA?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your document requirements depend on your nationality and how you're traveling to Canada
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {whoNeedsWhat.map((category, index) => (
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
                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center`}
                      >
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                        <p className="text-lg text-red-600 font-medium">{category.requirement}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Examples include:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category.examples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700 text-sm">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <Info className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Visa-exempt travelers:</h4>
                    <p className="text-gray-700 text-sm">
                      You may require an Electronic Travel Authorization (eTA) if arriving by air.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">All others:</h4>
                    <p className="text-gray-700 text-sm">
                      Must apply for a Visitor Visa (Temporary Resident Visa – TRV) before entering Canada.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Types of Visitor Visas */}
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
                🎒 Types of Visitor Visas
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right visa type based on your travel needs and circumstances
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {visitorVisaTypes.map((visa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${visa.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <visa.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{visa.title}</h3>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{visa.description}</p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Ideal For:</h4>
                      <p className="text-gray-700 text-sm">{visa.idealFor}</p>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-gray-900">Key Features:</h4>
                      {visa.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

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

      {/* Validity & Stay Duration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">🗓️ Validity & Stay Duration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding how long your visa is valid and how long you can stay in Canada
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {validityDurations.map((duration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${duration.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                    >
                      <duration.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{duration.visaType}</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Validity Period</h4>
                        <p className="text-gray-700 text-sm">{duration.validity}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Stay Duration</h4>
                        <p className="text-gray-700 text-sm">{duration.stayDuration}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Extension</h4>
                        <p className="text-gray-700 text-sm">{duration.extension}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Note</h3>
                <p className="text-gray-700">
                  Duration of stay is ultimately determined by border services upon arrival. The visa validity period
                  indicates how long you have to enter Canada, not how long you can stay.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How to Apply */}
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
                📄 How to Apply
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step guide to applying for your Canadian visitor visa or eTA
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
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center`}
                        >
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

      {/* Visa vs eTA Comparison */}
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
                📊 Infographic: Visa vs. eTA
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick comparison between Visitor Visa (TRV) and Electronic Travel Authorization (eTA)
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
                    {visaVsEtaComparison.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="font-semibold text-gray-900">{item.feature}</div>
                        <div className="text-gray-700 text-center">{item.trv}</div>
                        <div className="text-gray-700 text-center">{item.eta}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visitor Visa Checklist */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">✅ Visitor Visa Checklist</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete document checklist to ensure your application is thorough and complete
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visitorVisaChecklist.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900">{item.item}</h3>
                          {item.required ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                              Required
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                              Optional
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Document Preparation Tips</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Financial Documents:</h4>
                    <p className="text-gray-700 text-sm">
                      Provide recent bank statements (3-6 months), employment letters, and proof of income to
                      demonstrate financial stability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ties to Home Country:</h4>
                    <p className="text-gray-700 text-sm">
                      Include employment letters, property ownership documents, family ties, and other evidence showing
                      your intention to return home.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Expert Support CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-4xl font-bold mb-6">Expert Visitor Visa Support</h2>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Don't let document requirements or application complexities prevent you from visiting Canada. Our
                  experienced team provides comprehensive support for all types of visitor visas and travel
                  authorizations.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 rounded-lg p-6">
                    <FileText className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Document Review</h3>
                    <p className="text-white/80 text-sm">Complete checklist and document preparation assistance</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6">
                    <Users className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Application Support</h3>
                    <p className="text-white/80 text-sm">Expert guidance through the entire application process</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6">
                    <Shield className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Success Optimization</h3>
                    <p className="text-white/80 text-sm">Strategies to maximize your approval chances</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      Book Consultation
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

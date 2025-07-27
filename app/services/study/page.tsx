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
  Phone,
  Info,
  Calendar,
  Target,
  TrendingUp,
  Star,
  Award,
  AlertCircle,
  Shield,
  Globe,
  BookOpen,
  Building,
  Mail,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function StudyPage() {
  const [activeStep, setActiveStep] = useState(0)

  const successRoadmap = [
    {
      step: "01",
      title: "Assess and Apply",
      description: "We help you select the right school and program and support your study permit application.",
      details: [
        "School and program selection guidance",
        "Designated Learning Institution (DLI) verification",
        "Study permit application support",
        "Document preparation and review",
      ],
      icon: Target,
      color: "from-red-500 to-red-600",
    },
    {
      step: "02",
      title: "Study and Work",
      description: "Eligible students may work during their studies under IRCC guidelines.",
      details: [
        "On-campus work opportunities",
        "Off-campus work eligibility (20 hours/week)",
        "Co-op and internship programs",
        "Work permit compliance guidance",
      ],
      icon: BookOpen,
      color: "from-red-600 to-pink-600",
    },
    {
      step: "03",
      title: "Post-Graduation Work Permit (PGWP)",
      description: "We guide you in applying for a PGWP, which allows you to gain Canadian work experience.",
      details: [
        "PGWP eligibility assessment",
        "Application timing guidance",
        "Document preparation support",
        "Work permit duration optimization",
      ],
      icon: Briefcase,
      color: "from-pink-600 to-red-500",
    },
    {
      step: "04",
      title: "Apply for Permanent Residence",
      description:
        "With Canadian education and work experience, you may qualify for PR through Express Entry or provincial programs.",
      details: [
        "Express Entry profile optimization",
        "Provincial Nominee Program guidance",
        "Canadian Experience Class support",
        "PR application preparation",
      ],
      icon: Award,
      color: "from-red-500 to-red-700",
    },
  ]

  const requiredDocuments = [
    {
      document: "Letter of Acceptance",
      description: "From a Designated Learning Institution (DLI)",
      icon: FileText,
      required: true,
    },
    {
      document: "Proof of Identity",
      description: "Valid passport or travel document",
      icon: User,
      required: true,
    },
    {
      document: "Proof of Funds",
      description: "Financial support for tuition, living costs, and return travel",
      icon: Building,
      required: true,
    },
    {
      document: "Letter of Explanation",
      description: "Statement of Purpose (if applicable)",
      icon: Mail,
      required: false,
    },
    {
      document: "Provincial/Territorial Attestation Letter",
      description: "PAL/TAL (except for exempt categories)",
      icon: Shield,
      required: true,
    },
  ]

  const eligibilityRequirements = [
    {
      requirement: "Letter of Acceptance from DLI",
      description: "Must be from a designated learning institution",
      icon: CheckCircle,
    },
    {
      requirement: "Proof of Financial Support",
      description: "For tuition, living costs, and return travel",
      icon: Building,
    },
    {
      requirement: "Background Checks",
      description: "Including police certificate if required",
      icon: Shield,
    },
    {
      requirement: "Medical Exam",
      description: "As determined by IRCC requirements",
      icon: Heart,
    },
    {
      requirement: "Intention to Leave",
      description: "Demonstrate intention to leave Canada after studies",
      icon: Globe,
    },
  ]

  const studyLevels = [
    {
      level: "High School Students",
      description: "Secondary education programs and preparation for post-secondary studies",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      services: [
        "School selection guidance",
        "Custodianship arrangements",
        "Minor applicant support",
        "Guardian documentation",
      ],
    },
    {
      level: "College and University",
      description: "Undergraduate and graduate degree programs",
      icon: GraduationCap,
      color: "from-green-500 to-green-600",
      services: ["Program selection", "DLI verification", "PAL/TAL assistance", "PGWP planning"],
    },
    {
      level: "Language Schools",
      description: "ESL/FSL and vocational training programs",
      icon: Globe,
      color: "from-purple-500 to-purple-600",
      services: [
        "Language program selection",
        "Vocational training guidance",
        "Study permit applications",
        "Pathway planning",
      ],
    },
    {
      level: "Vocational Programs",
      description: "Certificate and diploma programs for skilled trades",
      icon: Award,
      color: "from-orange-500 to-orange-600",
      services: [
        "Trade program selection",
        "Industry connections",
        "Work-study opportunities",
        "Career pathway planning",
      ],
    },
  ]

  const pgwpRequirements = [
    "Complete a full-time program of at least 8 months",
    "Apply within 90 days of receiving proof of graduation",
    "Hold a valid study permit at the time of application",
    "Graduate from a Designated Learning Institution (DLI)",
    "Program must be eligible for PGWP",
  ]

  const medicalExamRequirements = [
    {
      category: "Healthcare or Education Settings",
      description: "Students planning to study in healthcare or education fields",
      icon: Heart,
    },
    {
      category: "Extended Stay",
      description: "Students planning to stay in Canada for more than six months",
      icon: Clock,
    },
    {
      category: "High-Risk Countries",
      description: "Students from countries with higher health risks",
      icon: Globe,
    },
  ]

  const palTalInfo = {
    whoNeeds: [
      "New undergraduate and graduate students",
      "Certificate and diploma enrollees",
      "ESL/FSL program participants",
    ],
    notRequired: [
      "High school students",
      "Master's and PhD students",
      "Exchange and visiting students",
      "Extensions at same institution and level",
    ],
  }

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
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Study in Canada
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Your Academic Journey Begins Here</p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              "A Canadian education is more than a degree — it's a pathway to global opportunity, lifelong connections,
              and a future without borders."
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Canada's education system is world-renowned for its high-quality programs and institutions — from
              secondary school to post-graduate studies. Every year, thousands of international students choose Canada
              to advance their education, build their future, and access pathways to long-term opportunities, including
              permanent residence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Study Consultation
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
              >
                <FileText className="mr-2 w-5 h-5" />
                Download Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4-Step Success Roadmap */}
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
                Your 4-Step Success Roadmap
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From application to permanent residence - your complete journey to success in Canada
            </p>
          </motion.div>

          <div className="space-y-12">
            {successRoadmap.map((step, index) => (
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
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">{step.description}</p>
                      <div className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
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

      {/* Study Permit Eligibility */}
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
                Study Permit Eligibility & Documentation
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the requirements and documentation needed for your Canadian study permit application
            </p>
          </motion.div>

          {/* Basic Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Basic Eligibility</h3>
                </div>
                <p className="text-gray-700 mb-6">To qualify, applicants must:</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eligibilityRequirements.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <req.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{req.requirement}</h4>
                        <p className="text-gray-600 text-sm">{req.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Required Documents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <FileText className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Required Documents</h3>
                </div>
                <p className="text-gray-700 mb-6">Your study permit application should include:</p>
                <div className="space-y-4">
                  {requiredDocuments.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                          <doc.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{doc.document}</h4>
                          <p className="text-gray-600 text-sm">{doc.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.required ? (
                          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                            Required
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                            Optional
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* PAL/TAL Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Provincial/Territorial Attestation Letter (PAL/TAL)
                  </h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Most post‑secondary and language program applicants must now submit a PAL or TAL. This letter is
                  issued by the province or territory to confirm you hold a designated study spot within their annual
                  allocation.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Who needs a PAL/TAL?</h4>
                    <ul className="space-y-2">
                      {palTalInfo.whoNeeds.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Not required for:</h4>
                    <ul className="space-y-2">
                      {palTalInfo.notRequired.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Obtaining a PAL/TAL:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Typically issued after you accept admission and pay a deposit</li>
                    <li>• DLIs request it from the province on your behalf</li>
                    <li>• Valid until the end of current cap period or expiry date</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Medical Exam Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Heart className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Medical Exam Requirements</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  A medical exam from an IRCC-approved panel physician may be required if you plan to:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {medicalExamRequirements.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <req.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{req.category}</h4>
                      <p className="text-gray-600 text-sm">{req.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Who We Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Who We Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We assist international students at all academic levels with comprehensive support services
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {studyLevels.map((level, index) => (
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
                        className={`w-16 h-16 bg-gradient-to-r ${level.color} rounded-2xl flex items-center justify-center`}
                      >
                        <level.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{level.level}</h3>
                        <p className="text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Our Services Include:</h4>
                      {level.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Study Permit Services */}
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
                Our Study Permit Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support throughout your Canadian education journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "School & Program Selection",
                description: "Assistance with selecting the right DLI and program for your goals",
              },
              {
                icon: FileText,
                title: "Statement of Purpose",
                description: "Guidance on writing and reviewing your SOP for maximum impact",
              },
              {
                icon: Users,
                title: "Custodianship Support",
                description: "Support for minors with custodianship and parental authorization documents",
              },
              {
                icon: CheckCircle,
                title: "Application Support",
                description: "Complete study permit application support with document checklists",
              },
              {
                icon: Briefcase,
                title: "PGWP Planning",
                description: "Strategic planning for Post-Graduation Work Permit eligibility",
              },
              {
                icon: Award,
                title: "PR Pathway Guidance",
                description: "Long-term planning for permanent residency opportunities",
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
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work in Canada After Graduation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Work in Canada After Graduation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Graduates of eligible programs may apply for a Post-Graduation Work Permit (PGWP) for up to 3 years
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">PGWP Requirements</h3>
                  <p className="text-gray-700 mb-6">You must:</p>
                  <div className="space-y-4">
                    {pgwpRequirements.map((req, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">How We Assist You</h3>
                  <div className="space-y-4">
                    {[
                      "Determining PGWP eligibility",
                      "Preparing a strong PGWP application",
                      "Transitioning to permanent residency through Express Entry or PNPs",
                      "Strategic career and location planning",
                    ].map((assistance, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{assistance}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pathway to Permanent Residence */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Your Pathway to Permanent Residence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go beyond the PGWP to support your long-term success in Canada
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Long-Term Support</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">PR Program Exploration</h4>
                        <p className="text-gray-600 text-sm">
                          Explore PR-eligible programs like Canadian Experience Class (CEC) and Provincial Nominee
                          Programs (PNPs)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Timeline Understanding</h4>
                        <p className="text-gray-600 text-sm">
                          Understand eligibility timelines and work experience requirements under Express Entry
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Strategic Planning</h4>
                        <p className="text-gray-600 text-sm">
                          Strategically plan your career and location choices to align with PR opportunities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Application Preparation</h4>
                        <p className="text-gray-600 text-sm">
                          Prepare and submit strong, compliant applications for permanent residency
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Complete Journey Support</h3>
                <p className="text-xl text-white/90 mb-6">
                  We are with you at every stage — from graduation to gaining Canadian work experience, and ultimately,
                  to building your life in Canada as a permanent resident.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                    >
                      <Calendar className="mr-2 w-5 h-5" />
                      Start Your Journey
                    </Button>
                  </Link>
                  <Link href="/programs">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent"
                    >
                      <Info className="mr-2 w-5 h-5" />
                      Explore PR Programs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Summary CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Begin Your Canadian Education Journey?</h2>
            <p className="text-xl text-gray-600 mb-8">
              A strong study permit application includes all required documents, clear intentions, and expert guidance.
              Let us help you navigate the process with confidence.
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                In Summary, a strong study permit application includes:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  "Accepted offer from a DLI",
                  "PAL/TAL if required",
                  "Proof of funds and travel plans",
                  "Clean background and medical clearance",
                  "Clear intention to return home after studies",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Book Consultation with RCIC
                </Button>
              </Link>
              <Link href="/resources">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
                >
                  <FileText className="mr-2 w-5 h-5" />
                  Study Resources
                </Button>
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Need help collecting documents or verifying specific requirements? Our RCIC is here to help.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

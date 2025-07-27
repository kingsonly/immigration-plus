"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Briefcase,
  Users,
  Globe,
  Building,
  Rocket,
  CheckCircle,
  Calendar,
  MapPin,
  Award,
  FileText,
  Shield,
  AlertCircle,
  Star,
  Heart,
  Zap,
  ArrowRight,
  Phone,
  Mail,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WorkPermitPage() {
  const [activePermitType, setActivePermitType] = useState(0)

  const workPermitTypes = [
    {
      title: "Employer-Specific Work Permits",
      subtitle: "Ideal for individuals with a job offer from a single Canadian employer",
      description: "This permit type is tied to the specific job, employer, and location listed in the application.",
      icon: Building,
      color: "from-red-500 to-red-600",
      requirements: [
        "Valid Labour Market Impact Assessment (LMIA) or employer offer number",
        "Formal employment offer from a Canadian employer",
        "Compliance with conditions regarding employer, job role, and location",
      ],
      bestFor:
        "Skilled workers hired for specific roles in sectors like agriculture, hospitality, tech, and caregiving where designated employment is required.",
      locked: true,
    },
    {
      title: "Open Work Permits",
      subtitle: "Work Without Job Restrictions",
      description:
        "Open work permits allow eligible individuals to work for almost any employer in Canada without needing a specific job offer or a Labour Market Impact Assessment (LMIA).",
      icon: Globe,
      color: "from-red-600 to-pink-600",
      requirements: [
        "No job offer required — enjoy flexibility in choosing employers and industries",
        "Online application process — most eligible applicants apply from within Canada",
        "Pathway support — open work permits often serve as stepping stones to permanent residency",
      ],
      bestFor: "Graduates, spouses of students/workers, PR applicants, and vulnerable workers.",
      locked: false,
    },
  ]

  const openWorkPermitEligible = [
    {
      category: "Post-Graduation Work Permit (PGWP)",
      description: "Graduates applying for a Post-Graduation Work Permit",
      icon: Award,
    },
    {
      category: "Spouses of International Students",
      description: "Spouses/partners of eligible students in master's, doctoral, or select professional programs",
      icon: Heart,
    },
    {
      category: "Spouses of High-Skilled Workers",
      description:
        "Spouses/partners of high-skilled foreign workers in TEER 0–1 jobs or designated TEER 2–3 occupations",
      icon: Users,
    },
    {
      category: "PR Applicants from Inside Canada",
      description:
        "Individuals applying for permanent residence from inside Canada (family sponsorship or Express Entry)",
      icon: MapPin,
    },
    {
      category: "Vulnerable Workers",
      description: "Workers under employer-specific permits experiencing abuse or risk of abuse",
      icon: Shield,
    },
  ]

  const iecCategories = [
    {
      category: "Working Holiday",
      type: "Open work permit",
      description: "Flexible job opportunities to help fund your travel",
      details: "Great for those without a job offer in advance",
      icon: Globe,
      color: "from-blue-500 to-blue-600",
    },
    {
      category: "Young Professionals",
      type: "Employer-specific work permit",
      description: "For career-related experience in your field of study or training",
      details: "Requires a valid job offer in Canada",
      icon: Briefcase,
      color: "from-green-500 to-green-600",
    },
    {
      category: "International Co-op (Internship)",
      type: "Employer-specific work permit",
      description: "For students seeking work placements related to their academic program",
      details: "Must be registered in a post-secondary institution",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
  ]

  const otherWorkPermits = [
    {
      title: "Global Skills Strategy (GSS)",
      subtitle: "Fast-track your work permit with GSS",
      description: "Designed for high-skilled workers in TEER 0 or 1 occupations",
      features: [
        "Available with or without an LMIA (based on exemption eligibility)",
        "Employers submit the job offer through the Employer Portal",
        "Processing time: 2 weeks for eligible applications",
      ],
      idealFor: "Tech professionals and specialized talent in fast-paced sectors",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      lmiaRequired: "No (If Exempt)",
      duration: "2 weeks processing",
    },
    {
      title: "Intra-Company Transfer (ICT)",
      subtitle: "Transfer key personnel within your multinational company",
      description: "For executives, senior managers, and specialized knowledge workers",
      features: [
        "Requires a qualifying relationship between the foreign and Canadian entities",
        "Must have 1+ year full-time experience with the company abroad",
        "Valid for 1–3 years, renewable up to 7 years total",
      ],
      idealFor: "Relocating leadership and experts—LMIA-exempt under IMP",
      icon: Building,
      color: "from-blue-500 to-indigo-500",
      lmiaRequired: "No",
      duration: "1-3 years (Up to 7)",
    },
    {
      title: "C11 Entrepreneur Work Permit",
      subtitle: "Launch or manage your own business in Canada",
      description: "For entrepreneurs, business buyers, and investors",
      features: [
        "Must have 50%+ ownership and active role in business operations",
        "Must demonstrate a significant benefit to Canada",
        "LMIA not required (applied under R205(a), C11 of the IMP)",
      ],
      idealFor: "Supports long-term PR plans while building your business",
      icon: Rocket,
      color: "from-red-500 to-pink-500",
      lmiaRequired: "No",
      duration: "Up to 2 years",
    },
    {
      title: "C10 Significant Benefit Work Permit",
      subtitle: "For individuals who contribute to Canada's broader interests",
      description: "Applies to entrepreneurs, researchers, and professionals",
      features: [
        "Must demonstrate cultural, social, or economic value to Canada",
        "Typically issued for 1 year and can be renewed",
        "Also LMIA-exempt, under R205(a), C10",
      ],
      idealFor: "Innovators and non-traditional professionals making an impact",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      lmiaRequired: "No",
      duration: "1 year (renewable)",
    },
  ]

  const familyPermitChanges = {
    effectiveDate: "January 21, 2025",
    newLimitations: [
      "Spouses/common-law partners of students in graduate-level or professional programs",
      "Spouses/common-law partners of workers in high-demand occupations",
    ],
    highDemandOccupations: ["Science and technology", "Health care and education", "Skilled trades and construction"],
    importantNote:
      "Dependent children are no longer eligible for open work permits unless they were included in applications submitted before January 21, 2025.",
  }

  const comparisonData = [
    {
      permitType: "GSS",
      lmiaRequired: "No (If Exempt)",
      bestFor: "High-Skilled Talent",
      duration: "2 weeks processing",
      color: "from-yellow-500 to-orange-500",
    },
    {
      permitType: "ICT",
      lmiaRequired: "No",
      bestFor: "Intra-Company",
      duration: "1-3 years (Up to 7)",
      color: "from-blue-500 to-indigo-500",
    },
    {
      permitType: "C11",
      lmiaRequired: "No",
      bestFor: "Entrepreneurs/Business",
      duration: "Up to 2 years",
      color: "from-red-500 to-pink-500",
    },
    {
      permitType: "C10",
      lmiaRequired: "No",
      bestFor: "Significant Benefits",
      duration: "1 year (renewable)",
      color: "from-purple-500 to-pink-500",
    },
    {
      permitType: "IEC & FTA-based",
      lmiaRequired: "No",
      bestFor: "Youth, Professionals",
      duration: "Varies",
      color: "from-green-500 to-blue-500",
    },
  ]

  const applicationSteps = [
    {
      type: "Employer-Specific Work Permits",
      steps: [
        "Obtain a valid LMIA or employer offer number",
        "Receive signed employment contract and supporting documents",
        "Submit your work permit application online or from within Canada",
      ],
    },
    {
      type: "Open Work Permits",
      steps: [
        "Prepare your eligibility documents (e.g., PGWP, spouse status, PR application)",
        "Apply online through the IRCC portal",
        "We provide tailored assistance at every stage to ensure compliance and success",
      ],
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
                Work in Canada
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Empowering Skilled Workers, Entrepreneurs & Professionals to Build a Future in Canada
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              At TENTACULAR IMMIGRATION SOLUTIONS LTD, we provide regulated, strategic guidance for skilled workers,
              entrepreneurs, investors, and self-employed individuals seeking to contribute meaningfully to the Canadian
              economy. Whether you're pursuing a temporary work permit or aiming for permanent residency, we help you
              navigate federal and provincial immigration pathways with clarity and compliance.
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Let us support your transition — from global talent to Canadian resident — with legal insight,
              personalized planning, and care at every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Work Permit Consultation
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
              >
                <FileText className="mr-2 w-5 h-5" />
                Compare Permit Types
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Permit Types Overview */}
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
                Work Permit Types
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right work permit pathway based on your situation and career goals
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {workPermitTypes.map((permit, index) => (
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
                        className={`w-16 h-16 bg-gradient-to-r ${permit.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}
                      >
                        <permit.icon className="w-8 h-8 text-white" />
                        {permit.locked && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <Building className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {!permit.locked && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Globe className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{permit.title}</h3>
                        <p className="text-lg text-red-600 font-medium">{permit.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{permit.description}</p>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-900">Key Requirements:</h4>
                      {permit.requirements.map((req, reqIndex) => (
                        <div key={reqIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-600 text-sm">{permit.bestFor}</p>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${permit.color} hover:opacity-90`}>
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

      {/* Open Work Permit Eligibility */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Who Can Apply for Open Work Permits?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Open work permits provide flexibility to work for almost any employer in Canada
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {openWorkPermitEligible.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{category.category}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Family Permit Update */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Family Permit Update (Effective {familyPermitChanges.effectiveDate})
                  </h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Recent changes limit open work permit eligibility for family members to:
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">New Limitations:</h4>
                    <ul className="space-y-2">
                      {familyPermitChanges.newLimitations.map((limitation, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-gray-900 mb-2 mt-4">High-Demand Occupations:</h4>
                    <ul className="space-y-1">
                      {familyPermitChanges.highDemandOccupations.map((occupation, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{occupation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <div className="flex items-start space-x-3">
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Important Note:</h4>
                        <p className="text-gray-700 text-sm">{familyPermitChanges.importantNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* International Experience Canada (IEC) */}
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
            <h2 className="text-4xl font-bold mb-4 text-gray-900">International Experience Canada (IEC)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Work, travel, and gain valuable experience in Canada
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">About IEC</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  International Experience Canada (IEC) is a temporary work permit initiative that allows young adults
                  from partner countries to live and work in Canada for a limited time. It's designed to promote
                  cultural exchange and build international career experience.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Who Can Apply?</h4>
                  </div>
                  <p className="text-gray-700">
                    Youth aged 18–35 (age limit depends on your country of citizenship) from countries that have
                    bilateral youth mobility agreements with Canada.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {iecCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.category}</h3>
                    <p className="text-sm text-gray-500 mb-4 font-medium">{category.type}</p>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <p className="text-gray-700 text-sm font-medium">{category.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Work Permit Options */}
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
                Other Work Permit Options
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized work permit pathways for different professional situations
            </p>
          </motion.div>

          <div className="space-y-8">
            {otherWorkPermits.map((permit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-4 mb-6">
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${permit.color} rounded-2xl flex items-center justify-center`}
                          >
                            <permit.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{permit.title}</h3>
                            <p className="text-lg text-gray-600">{permit.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{permit.description}</p>
                        <div className="space-y-2 mb-4">
                          {permit.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-700">
                            <strong>Ideal for:</strong> {permit.idealFor}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">LMIA Required</h4>
                          <p className="text-gray-600">{permit.lmiaRequired}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                          <p className="text-gray-600">{permit.duration}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Routes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Work Permit Routes</h3>
                <p className="text-gray-700 mb-6">Other LMIA-exempt pathways include:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "CUSMA, CETA, & FTAs (for professionals, investors, and business visitors)",
                    "Bridging Open Work Permits (for inland PR applicants)",
                  ].map((route, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{route}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How to Apply</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step application process for different work permit types
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {applicationSteps.map((application, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{application.type}</h3>
                    <div className="space-y-4">
                      {application.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">{stepIndex + 1}</span>
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
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
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <CardContent className="p-8">
                <FileText className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Application Support</h3>
                <p className="text-gray-600 mb-6">
                  We provide tailored assistance at every stage of the application to ensure compliance and success.
                </p>
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                    Get Application Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Compare Your Path */}
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
                Compare Your Path
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick comparison of work permit options to help you choose the right pathway
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-4 gap-4 mb-4 text-sm font-semibold text-gray-700">
                <div>Permit Type</div>
                <div>LMIA Required</div>
                <div>Best For</div>
                <div>Typical Duration</div>
              </div>
              <div className="space-y-4">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}
                            >
                              <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-gray-900">{item.permitType}</span>
                          </div>
                          <div className="text-gray-600">{item.lmiaRequired}</div>
                          <div className="text-gray-600">{item.bestFor}</div>
                          <div className="text-gray-600">{item.duration}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Working in Canada?</h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you need an employer-specific permit, open work permit, or specialized pathway, we're here to
              guide you through the process with expert knowledge and personalized support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Book Work Permit Consultation
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent"
                onClick={() => {
                  window.location.href = "mailto:info@coming2canada.co?subject=Work Permit Inquiry"
                }}
              >
                <Mail className="mr-2 w-5 h-5" />
                Email Us
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              From global talent to Canadian resident — let us support your transition with legal insight and
              personalized planning.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

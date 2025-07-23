"use client"

import { motion } from "framer-motion"
import {
  Zap,
  GraduationCap,
  Briefcase,
  MapPin,
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Target,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProgramsPage() {
  const programs = [
    {
      category: "Express Entry System",
      icon: Zap,
      color: "from-red-500 to-red-600",
      programs: [
        {
          name: "Federal Skilled Worker Program",
          description: "For skilled workers with foreign work experience",
          requirements: [
            "Bachelor's degree or higher",
            "1+ years skilled work experience",
            "Language proficiency",
            "Proof of funds",
          ],
          processingTime: "6 months",
          minScore: "67/100 points",
        },
        {
          name: "Canadian Experience Class",
          description: "For skilled workers with Canadian work experience",
          requirements: ["1+ years Canadian work experience", "Language proficiency", "Plan to live outside Quebec"],
          processingTime: "6 months",
          minScore: "No minimum CRS score",
        },
        {
          name: "Federal Skilled Trades Program",
          description: "For skilled workers in eligible trades",
          requirements: [
            "2+ years work experience in skilled trades",
            "Job offer or certificate of qualification",
            "Language proficiency",
          ],
          processingTime: "6 months",
          minScore: "No minimum CRS score",
        },
      ],
    },
    {
      category: "Provincial Nominee Programs",
      icon: MapPin,
      color: "from-red-600 to-pink-600",
      programs: [
        {
          name: "Ontario Immigrant Nominee Program (OINP)",
          description: "Ontario's program for skilled workers and entrepreneurs",
          requirements: ["Meet stream-specific requirements", "Intention to live in Ontario", "Language proficiency"],
          processingTime: "2-3 months (provincial) + 6 months (federal)",
          minScore: "Varies by stream",
        },
        {
          name: "British Columbia Provincial Nominee Program",
          description: "BC's program for skilled workers, graduates, and entrepreneurs",
          requirements: ["Job offer from BC employer", "Meet stream requirements", "Intention to live in BC"],
          processingTime: "2-3 months (provincial) + 6 months (federal)",
          minScore: "Varies by stream",
        },
        {
          name: "Alberta Immigrant Nominee Program",
          description: "Alberta's program for skilled workers and entrepreneurs",
          requirements: ["Connection to Alberta", "Meet stream requirements", "Language proficiency"],
          processingTime: "6 months (provincial) + 6 months (federal)",
          minScore: "Varies by stream",
        },
      ],
    },
    {
      category: "Business Immigration",
      icon: Briefcase,
      color: "from-pink-600 to-red-500",
      programs: [
        {
          name: "Start-up Visa Program",
          description: "For entrepreneurs with innovative business ideas",
          requirements: [
            "Qualifying business",
            "Letter of support from designated organization",
            "Language proficiency",
            "Sufficient funds",
          ],
          processingTime: "12-16 months",
          minScore: "No point system",
        },
        {
          name: "Self-employed Persons Program",
          description: "For farmers and artists who are self-employed",
          requirements: ["Relevant experience", "Intention and ability to be self-employed", "Meet selection criteria"],
          processingTime: "23 months",
          minScore: "35/100 points",
        },
        {
          name: "Investor Programs (Provincial)",
          description: "Various provincial investor programs",
          requirements: ["Net worth requirements", "Investment commitment", "Business experience"],
          processingTime: "Varies by province",
          minScore: "Varies by program",
        },
      ],
    },
    {
      category: "Family Class",
      icon: Heart,
      color: "from-red-500 to-red-700",
      programs: [
        {
          name: "Spouse/Partner Sponsorship",
          description: "Sponsor your spouse or common-law partner",
          requirements: ["Eligible relationship", "Financial requirements", "No criminal record"],
          processingTime: "12 months",
          minScore: "No point system",
        },
        {
          name: "Parent and Grandparent Program",
          description: "Sponsor your parents and grandparents",
          requirements: ["Meet income requirements", "Sign undertaking", "No criminal record"],
          processingTime: "20-24 months",
          minScore: "No point system",
        },
        {
          name: "Dependent Children",
          description: "Sponsor your dependent children",
          requirements: ["Child under 22 years old", "Financial requirements", "No criminal record"],
          processingTime: "8-12 months",
          minScore: "No point system",
        },
      ],
    },
  ]

  const comparisonFactors = [
    { factor: "Processing Time", description: "How long the application typically takes" },
    { factor: "Language Requirements", description: "English and/or French proficiency needed" },
    { factor: "Work Experience", description: "Required years and type of work experience" },
    { factor: "Education", description: "Minimum education requirements" },
    { factor: "Age Factor", description: "How age affects your application" },
    { factor: "Job Offer", description: "Whether a job offer is required or beneficial" },
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
                Immigration Programs
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore Canada's comprehensive immigration programs and find the pathway that best suits your profile.
              Each program has unique requirements and benefits designed for different types of applicants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Pathway</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Canada offers multiple immigration pathways, each designed for different circumstances and qualifications
            </p>
          </motion.div>

          <div className="space-y-16">
            {programs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{category.category}</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.programs.map((program, programIndex) => (
                    <Card key={programIndex} className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">{program.name}</h4>
                        <p className="text-gray-600 mb-4">{program.description}</p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Processing Time:</span>
                            <span className="font-medium text-gray-900">{program.processingTime}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Min. Score:</span>
                            <span className="font-medium text-gray-900">{program.minScore}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <h5 className="font-semibold text-gray-900 text-sm">Key Requirements:</h5>
                          {program.requirements.slice(0, 3).map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{req}</span>
                            </div>
                          ))}
                          {program.requirements.length > 3 && (
                            <p className="text-sm text-gray-500">
                              +{program.requirements.length - 3} more requirements
                            </p>
                          )}
                        </div>

                        <Button className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90`}>
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Comparison */}
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
                Program Comparison Factors
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors to consider when choosing the right immigration program for your situation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{factor.factor}</h3>
                    <p className="text-gray-600">{factor.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Tips for Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maximize your chances of success with these expert recommendations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Star,
                title: "Improve Your Language Scores",
                description:
                  "Higher language test scores significantly boost your Comprehensive Ranking System (CRS) score in Express Entry.",
                tips: [
                  "Take IELTS or CELPIP for English",
                  "Consider TEF or TCF for French",
                  "Aim for CLB 9+ in all abilities",
                ],
              },
              {
                icon: GraduationCap,
                title: "Get Your Credentials Assessed",
                description:
                  "Educational Credential Assessment (ECA) is required for most programs and can increase your points.",
                tips: [
                  "Use designated organizations",
                  "Start early - process takes time",
                  "Include all degrees and diplomas",
                ],
              },
              {
                icon: Briefcase,
                title: "Gain Canadian Work Experience",
                description:
                  "Canadian work experience provides significant advantages in multiple immigration programs.",
                tips: [
                  "Consider work permits first",
                  "Network with Canadian employers",
                  "Gain experience in NOC 0, A, or B jobs",
                ],
              },
              {
                icon: Award,
                title: "Consider Multiple Pathways",
                description: "Don't limit yourself to one program - explore all options that match your profile.",
                tips: [
                  "Apply to multiple PNP streams",
                  "Consider both federal and provincial programs",
                  "Stay flexible with location preferences",
                ],
              },
            ].map((tip, index) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">Need Help Choosing the Right Program?</h2>
            <p className="text-xl text-white/90 mb-8">
              Our expert consultants can assess your profile and recommend the best immigration pathway for your
              situation.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
              >
                Get Personalized Assessment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

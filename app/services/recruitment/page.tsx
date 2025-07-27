"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Building2,
  FileCheck,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Globe,
  Shield,
  Target,
  Calendar,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react"

export default function RecruitmentPage() {
  const [activeStep, setActiveStep] = useState(0)

  const lmiaStreams = [
    {
      name: "High-Wage Stream",
      description: "Job offers at or above the median provincial wage",
      processingTime: "61 business days",
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Low-Wage Stream",
      description: "Job offers below the median provincial wage",
      processingTime: "61 business days",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Agricultural Stream",
      description: "On-farm jobs in livestock, grains, and horticulture",
      processingTime: "15 business days",
      icon: <Target className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-800",
    },
    {
      name: "Global Talent Stream",
      description: "High-skilled positions in designated occupations",
      processingTime: "8 business days",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "SAWP",
      description: "Seasonal Agricultural Worker Program for partner countries",
      processingTime: "8 business days",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-orange-100 text-orange-800",
    },
  ]

  const applicationSteps = [
    {
      title: "Eligibility Assessment",
      description:
        "We begin by reviewing the job offer, employer profile, and program requirements to confirm whether an LMIA is necessary for your situation.",
      icon: <FileCheck className="h-8 w-8" />,
    },
    {
      title: "Document Preparation",
      description:
        "Our team organizes all required documents to establish business legitimacy, verify wage accuracy, and confirm employment conditions outlined in the job offer.",
      icon: <Building2 className="h-8 w-8" />,
    },
    {
      title: "Stream Selection",
      description:
        "Based on the position's wage level and industry, we identify whether you qualify under the high-wage, low-wage, or agricultural streams, ensuring compliance with the latest ESDC guidelines.",
      icon: <Target className="h-8 w-8" />,
    },
    {
      title: "Application Submission",
      description:
        "We file the complete LMIA package through the appropriate channels — either the LMIA Online Portal or a designated ESDC email office — and track its progress.",
      icon: <ArrowRight className="h-8 w-8" />,
    },
    {
      title: "Recruitment Compliance",
      description:
        "We assist you in meeting advertising and recruitment obligations, including drafting job postings and compiling interview records, to prove efforts to hire Canadians first.",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Follow-Up & Inspection Readiness",
      description:
        "We manage communication with ESDC officers, respond to document requests, and prepare you for potential on-site inspections to ensure a smooth approval process.",
      icon: <Shield className="h-8 w-8" />,
    },
  ]

  const processingTimes = [
    { stream: "Global Talent Stream", time: "8 business days", priority: "high" },
    { stream: "Agricultural Stream", time: "15 business days", priority: "medium" },
    { stream: "Seasonal Agricultural Worker Program", time: "8 business days", priority: "high" },
    { stream: "High-Wage Stream", time: "61 business days", priority: "low" },
    { stream: "Low-Wage Stream", time: "61 business days", priority: "low" },
  ]

  const sectors = [
    { name: "Hospitality", icon: "🏨", description: "Hotels, restaurants, tourism" },
    { name: "Healthcare", icon: "🏥", description: "Nurses, caregivers, support staff" },
    { name: "Technology", icon: "💻", description: "Software, IT, engineering" },
    { name: "Agriculture", icon: "🌾", description: "Farm workers, seasonal positions" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Recruitment Services</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Your pathway to hiring or working in Canada starts here — at TENTACULAR IMMIGRATION SOLUTIONS LTD, we connect skilled and
              reliable international candidates with Canadian employers across key sectors like hospitality, healthcare,
              tech, and agriculture. Through compliant, efficient recruitment and immigration support, we ensure every
              match is tailored to the unique needs of both employers and job seekers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                <Phone className="mr-2 h-5 w-5" />
                Start Hiring Process
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <Mail className="mr-2 h-5 w-5" />
                Find Job Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Sectors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Sectors We Serve</h2>
            <p className="text-lg text-gray-600">Connecting talent across Canada's growing industries</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{sector.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{sector.name}</h3>
                  <p className="text-gray-600">{sector.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LMIA Support Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">LMIA Support Services at TENTACULAR IMMIGRATION SOLUTIONS LTD</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We specialize in providing Canadian employers with end-to-end support for obtaining a Labour Market Impact
              Assessment (LMIA) — a key requirement to hire foreign workers under the Temporary Foreign Worker Program
              (TFWP).
            </p>
          </div>

          <Tabs defaultValue="what-is-lmia" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="what-is-lmia">What is LMIA?</TabsTrigger>
              <TabsTrigger value="who-needs">Who Needs It?</TabsTrigger>
              <TabsTrigger value="support-areas">Support Areas</TabsTrigger>
              <TabsTrigger value="streams">LMIA Streams</TabsTrigger>
            </TabsList>

            <TabsContent value="what-is-lmia" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileCheck className="mr-2 h-6 w-6 text-red-600" />
                    What is an LMIA?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    An LMIA is a document issued by Employment and Social Development Canada (ESDC) that confirms:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>There is a genuine need for a foreign worker</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>No qualified Canadians or permanent residents are available to fill the position</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      A positive LMIA enables a foreign worker to apply for a Canadian work permit.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="who-needs" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-6 w-6 text-red-600" />
                    Who Needs an LMIA?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600">You may require an LMIA if hiring:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          High-wage or low-wage workers
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          Agricultural or seasonal workers
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          Occupations not covered under IMP
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">No LMIA required for:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                          Francophone Mobility positions
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                          Certain trade agreement positions
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                          Other exemption code positions
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support-areas" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-6 w-6 text-red-600" />
                    LMIA Support in Calgary and Across Canada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4">We help employers who:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Are legally operating and compliant</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Have a valid business address and operations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Offer fair wages and stable job conditions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Can prove genuine recruitment efforts for Canadians first</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">We also support with:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Pre-inspection readiness</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Wage benchmarking</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Offer of employment compliance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="streams" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lmiaStreams.map((stream, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${stream.color} mr-3`}>{stream.icon}</div>
                          <CardTitle className="text-lg">{stream.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{stream.description}</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium">{stream.processingTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🛠️ LMIA Application Process</h2>
            <p className="text-lg text-gray-600">Our comprehensive 6-step approach to LMIA success</p>
          </div>

          <div className="space-y-8">
            {applicationSteps.map((step, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 ${activeStep === index ? "ring-2 ring-red-500 shadow-lg" : "hover:shadow-md"
                  }`}
                onClick={() => setActiveStep(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div
                      className={`p-3 rounded-full mr-6 flex-shrink-0 ${activeStep === index
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                        : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="mr-3">
                          Step {index + 1}
                        </Badge>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processing Times */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">⏳ LMIA Processing Times</h2>
            <p className="text-lg text-gray-600 mb-2">Current processing times as of April 2025</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>LMIA Streams and Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Stream</th>
                      <th className="text-left py-3 px-4 font-semibold">Processing Time</th>
                      <th className="text-left py-3 px-4 font-semibold">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processingTimes.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{item.stream}</td>
                        <td className="py-3 px-4">{item.time}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              item.priority === "high"
                                ? "default"
                                : item.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              item.priority === "high"
                                ? "bg-green-100 text-green-800"
                                : item.priority === "medium"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {item.priority === "high"
                              ? "High Priority"
                              : item.priority === "medium"
                                ? "Medium Priority"
                                : "Standard"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">🔍 What this means for you</h3>
              <div className="space-y-2 text-blue-800">
                <p>
                  • <strong>Global Talent & SAWP</strong> receive priority processing—expect results in just over a
                  week.
                </p>
                <p>
                  • <strong>High- and Low-Wage</strong> applications currently average about 3 months (61 business
                  days).
                </p>
                <p>
                  • <strong>Agricultural LMIAs</strong> are processed in approximately 3 weeks.
                </p>
                <p>
                  • <strong>Planning ahead is crucial</strong>—starting early can help avoid delays if your timeline is
                  tight.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fees and Planning */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🧾 LMIA Fees & Planning</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <DollarSign className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Application Fee</h3>
                <p className="text-3xl font-bold text-red-600 mb-2">$1,000 CAD</p>
                <p className="text-gray-600">per position (employer-paid)</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Application Window</h3>
                <p className="text-lg font-medium text-blue-600 mb-2">Up to 6 months</p>
                <p className="text-gray-600">before the intended hire date</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Exceptions</h3>
                <p className="text-lg font-medium text-amber-600 mb-2">Special Cases</p>
                <p className="text-gray-600">Some caregivers and low-income families</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* External Representation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">💼 External Representation You Can Trust</h2>
                  <p className="text-red-100 mb-6">
                    As authorized representatives, TENTACULAR IMMIGRATION SOLUTIONS LTD can act on your behalf throughout the LMIA
                    process. Our licensed consultants ensure:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Proper stream selection</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Full compliance with federal standards</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Ongoing advice throughout the hiring and permit stages</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <Shield className="h-24 w-24 mx-auto mb-6 text-red-200" />
                  <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-red-50">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Expert Representation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Work with TENTACULAR IMMIGRATION SOLUTIONS LTD */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🌍 Work with TENTACULAR IMMIGRATION SOLUTIONS LTD</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            From small businesses to large employers, we help you build your team through lawful, timely, and
            well-documented LMIA applications. With deep knowledge of Alberta's labour market and a national reach, we
            are your trusted partner for compliant hiring.
          </p>
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4">Ready to hire internationally with confidence?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                <Phone className="mr-2 h-5 w-5" />
                Start Your LMIA Application
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <Mail className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

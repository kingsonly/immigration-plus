"use client"

import { motion } from "framer-motion"
import {
  Home, Briefcase, Users, GraduationCap, MapPin, Heart, ArrowRight, CheckCircle,
  Clock, DollarSign, FileText, Phone, Info, Calendar, Target, TrendingUp,
  Star, Award, AlertCircle, Shield, Globe, BookOpen, Building, Mail, User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

/* ---------------- fetch from Strapi (same pattern as citizenship) ---------------- */
async function fetchStudyBlocks(slug: string) {
  try {
    const base = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "")
    const params = new URLSearchParams()
    if (process.env.NEXT_PUBLIC_STRAPI_PREVIEW === "1") params.set("publicationState", "preview")
    if (process.env.NEXT_PUBLIC_STRAPI_LOCALE) params.set("locale", process.env.NEXT_PUBLIC_STRAPI_LOCALE)
    const qs = params.toString()
    const url = `${base}/api/services/slug/${encodeURIComponent(slug)}${qs ? `?${qs}` : ""}`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data?.blocks ?? null
  } catch {
    return null
  }
}

/* ---------------- helpers to adapt Strapi blocks to local shapes ---------------- */
const IconMap: Record<string, any> = {
  Home, Briefcase, Users, GraduationCap, MapPin, Heart, ArrowRight, CheckCircle,
  Clock, DollarSign, FileText, Phone, Info, Calendar, Target, TrendingUp,
  Star, Award, AlertCircle, Shield, Globe, BookOpen, Building, Mail, User,
}
const pickIcon = (name?: string) => (name && IconMap[name]) || Target

function adaptStudyContent(blocks: any[] | null) {
  if (!Array.isArray(blocks)) return null
  const byType = (t: string) => blocks.filter((b) => b?.__component === t)
  const findHeading = (text: string) =>
    byType("blocks.heading-section").find((b: any) => (b?.Heading || "").toLowerCase() === text.toLowerCase())
  const findCardGrid = (text: string) =>
    byType("blocks.card-grid").find((b: any) => (b?.Heading || "").toLowerCase() === text.toLowerCase())
  const findAppProc = (title: string) =>
    byType("blocks.application-process").find((b: any) => (b?.title || "").toLowerCase() === title.toLowerCase())

  /* Hero */
  const hero = byType("blocks.hero")[0]
    ? {
        title: byType("blocks.hero")[0].Title || "Study in Canada",
        subtitle: byType("blocks.hero")[0].Subtitle || "Your Academic Journey Begins Here",
        html: byType("blocks.hero")[0].description || "",
        ctas: Array.isArray(byType("blocks.hero")[0].ctas) ? byType("blocks.hero")[0].ctas : [],
      }
    : null

  /* Sections: headings & descriptions (used to replace static headings) */
  const H = {
    roadmap: findHeading("Your 4-step success roadmap"),
    eligibility: findHeading("Study permit eligibility and documentation"),
    palTal: findHeading("Provincial/Territorial Attestation Letter (PAL/TAL)"),
    whoSupport: findHeading("Who we support"),
    services: findHeading("Our study permit services"),
    workAfterGrad: findHeading("Work in Canada after graduation"),
    pathwayPR: findHeading("Pathway to permanent residence"),
    readyCTA: findHeading("Ready to begin your Canadian education journey?"),
    stayConnected: findHeading("Stay connected"),
  }

  /* Roadmap (card-grid) */
  const roadmapGrid = findCardGrid("Your 4-step success roadmap")
  const successRoadmap = Array.isArray(roadmapGrid?.Cards)
    ? roadmapGrid.Cards.map((c: any, i: number) => ({
        step: String(i + 1).padStart(2, "0"),
        title: c.title || "",
        description: c.description || "",
        details: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
        icon: pickIcon(c.icon),
        color:
          (c.icon === "Target" && "from-red-500 to-red-600") ||
          (c.icon === "BookOpen" && "from-red-600 to-pink-600") ||
          (c.icon === "Briefcase" && "from-pink-600 to-red-500") ||
          (c.icon === "Award" && "from-red-500 to-red-700") ||
          "from-red-500 to-red-600",
      }))
    : null

  /* Eligibility (application-process) */
  const basicElig = findAppProc("Basic eligibility")
  const eligibilityRequirements = Array.isArray(basicElig?.items)
    ? basicElig.items.map((i: any) => ({ requirement: i.listItem, description: undefined, icon: CheckCircle }))
    : null

  /* Required documents (card-grid) */
  const reqDocsGrid = findCardGrid("Required documents")
  const requiredDocuments = Array.isArray(reqDocsGrid?.Cards)
    ? reqDocsGrid.Cards.map((c: any) => ({
        document: c.title,
        description: c.description,
        icon: pickIcon(c.icon),
        required: /required/i.test(String(c.description || "")),
      }))
    : null

  /* PAL/TAL (card-grid lists) */
  const palTalGrid = findCardGrid("PAL/TAL guidance")
  const whoNeeds = palTalGrid?.Cards?.find((c: any) => (c.title || "").toLowerCase().includes("who needs"))
  const notReq = palTalGrid?.Cards?.find((c: any) => (c.title || "").toLowerCase().includes("not required"))
  const palTalInfo = {
    whoNeeds: Array.isArray(whoNeeds?.lists) ? whoNeeds.lists.map((l: any) => l.listItem).filter(Boolean) : null,
    notRequired: Array.isArray(notReq?.lists) ? notReq.lists.map((l: any) => l.listItem).filter(Boolean) : null,
  }

  /* Medical exam (card-grid) */
  const medGrid = findCardGrid("Medical exam requirements")
  const medicalExamRequirements = Array.isArray(medGrid?.Cards)
    ? medGrid.Cards.map((c: any) => ({ category: c.title, description: c.description, icon: pickIcon(c.icon) }))
    : null

  /* Who we support (card-grid) */
  const whoSupportGrid = findCardGrid("Who we support")
  const studyLevels = Array.isArray(whoSupportGrid?.Cards)
    ? whoSupportGrid.Cards.map((c: any) => ({
        level: c.title,
        description: c.description,
        icon: pickIcon(c.icon),
        color:
          (c.icon === "BookOpen" && "from-blue-500 to-blue-600") ||
          (c.icon === "GraduationCap" && "from-green-500 to-green-600") ||
          (c.icon === "Globe" && "from-purple-500 to-purple-600") ||
          (c.icon === "Award" && "from-orange-500 to-orange-600") ||
          "from-red-500 to-red-600",
        services: Array.isArray(c.lists) ? c.lists.map((l: any) => l.listItem).filter(Boolean) : [],
      }))
    : null

  /* Our study permit services (card-grid) */
  const servicesGrid = findCardGrid("Our study permit services")
  const studyServices = Array.isArray(servicesGrid?.Cards)
    ? servicesGrid.Cards.map((c: any) => ({ icon: pickIcon(c.icon), title: c.title, description: c.description }))
    : null

  /* Work after graduation (PGWP requirements + how we support) */
  const pgwpProc = findAppProc("PGWP requirements")
  const pgwpRequirements = Array.isArray(pgwpProc?.items) ? pgwpProc.items.map((i: any) => i.listItem) : null

  const supportPGWPProc = findAppProc("How we support your PGWP and PR goals")
  const supportPGWPItems = Array.isArray(supportPGWPProc?.items)
    ? supportPGWPProc.items.map((i: any) => i.listItem)
    : null

  /* Pathway to PR (card-grid) */
  const prGrid = findCardGrid("Long-term PR support")
  const pathwayPRCards = Array.isArray(prGrid?.Cards)
    ? prGrid.Cards.map((c: any) => ({ icon: pickIcon(c.icon), title: c.title, description: c.description }))
    : null

  /* Ready CTA (heading-section with CTA) */
  const readyCTA = H.readyCTA
    ? {
        heading: H.readyCTA.Heading,
        description: H.readyCTA.description,
        cta: H.readyCTA.cta || null,
      }
    : null

  /* Summary checklist (application-process) */
  const strongChecklist = findAppProc("Strong study permit checklist")
  const summaryChecklist = Array.isArray(strongChecklist?.items)
    ? strongChecklist.items.map((i: any) => i.listItem)
    : null

  /* Stay connected (card-grid with links) */
  const stayGrid = findCardGrid("Stay connected")
  const stayConnected = Array.isArray(stayGrid?.Cards)
    ? stayGrid.Cards.map((c: any) => ({
        icon: pickIcon(c.icon),
        title: c.title,
        description: c.description,
        link: c.link || null, // {label, url, variant}
      }))
    : null

  return {
    hero,
    H, // headings/descriptions
    successRoadmap,
    eligibilityRequirements,
    requiredDocuments,
    palTalInfo,
    medicalExamRequirements,
    studyLevels,
    studyServices,
    pgwpRequirements,
    supportPGWPItems,
    pathwayPRCards,
    readyCTA,
    summaryChecklist,
    stayConnected,
  }
}

/* ------------------------------- Page ------------------------------- */
export default function StudyPage() {
  const [cms, setCms] = useState<ReturnType<typeof adaptStudyContent> | null>(null)

  /* local fallbacks (unchanged from your original) */
  const successRoadmapLocal = [
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

  const requiredDocumentsLocal = [
    { document: "Letter of Acceptance", description: "From a Designated Learning Institution (DLI)", icon: FileText, required: true },
    { document: "Proof of Identity", description: "Valid passport or travel document", icon: User, required: true },
    { document: "Proof of Funds", description: "Financial support for tuition, living costs, and return travel", icon: Building, required: true },
    { document: "Letter of Explanation", description: "Statement of Purpose (if applicable)", icon: Mail, required: false },
    { document: "Provincial/Territorial Attestation Letter", description: "PAL/TAL (except for exempt categories)", icon: Shield, required: true },
  ]

  const eligibilityRequirementsLocal = [
    { requirement: "Letter of Acceptance from DLI", description: "Must be from a designated learning institution", icon: CheckCircle },
    { requirement: "Proof of Financial Support", description: "For tuition, living costs, and return travel", icon: Building },
    { requirement: "Background Checks", description: "Including police certificate if required", icon: Shield },
    { requirement: "Medical Exam", description: "As determined by IRCC requirements", icon: Heart },
    { requirement: "Intention to Leave", description: "Demonstrate intention to leave Canada after studies", icon: Globe },
  ]

  const studyLevelsLocal = [
    {
      level: "High School Students",
      description: "Secondary education programs and preparation for post-secondary studies",
      icon: BookOpen, color: "from-blue-500 to-blue-600",
      services: ["School selection guidance", "Custodianship arrangements", "Minor applicant support", "Guardian documentation"],
    },
    {
      level: "College and University",
      description: "Undergraduate and graduate degree programs",
      icon: GraduationCap, color: "from-green-500 to-green-600",
      services: ["Program selection", "DLI verification", "PAL/TAL assistance", "PGWP planning"],
    },
    {
      level: "Language Schools",
      description: "ESL/FSL and vocational training programs",
      icon: Globe, color: "from-purple-500 to-purple-600",
      services: ["Language program selection", "Vocational training guidance", "Study permit applications", "Pathway planning"],
    },
    {
      level: "Vocational Programs",
      description: "Certificate and diploma programs for skilled trades",
      icon: Award, color: "from-orange-500 to-orange-600",
      services: ["Trade program selection", "Industry connections", "Work-study opportunities", "Career pathway planning"],
    },
  ]

  const pgwpRequirementsLocal = [
    "Complete a full-time program of at least 8 months",
    "Apply within 90 days of receiving proof of graduation",
    "Hold a valid study permit at the time of application",
    "Graduate from a Designated Learning Institution (DLI)",
    "Program must be eligible for PGWP",
  ]

  const supportPGWPLocal = [
    "Determining PGWP eligibility",
    "Preparing a strong PGWP application",
    "Transitioning to permanent residency through Express Entry or PNPs",
    "Strategic career and location planning",
  ]

  const medicalExamRequirementsLocal = [
    { category: "Healthcare or Education Settings", description: "Students planning to study in healthcare or education fields", icon: Heart },
    { category: "Extended Stay", description: "Students planning to stay in Canada for more than six months", icon: Clock },
    { category: "High-Risk Countries", description: "Students from countries with higher health risks", icon: Globe },
  ]

  const palTalInfoLocal = {
    whoNeeds: ["New undergraduate and graduate students", "Certificate and diploma enrollees", "ESL/FSL program participants"],
    notRequired: ["High school students", "Master's and PhD students", "Exchange and visiting students", "Extensions at same institution and level"],
  }

  const pathwayPRCardsLocal = [
    { icon: Target, title: "PR program exploration", description: "Understand Canadian Experience Class, Express Entry, and PNP options." },
    { icon: Clock, title: "Timeline understanding", description: "Track eligibility milestones and work experience requirements." },
    { icon: MapPin, title: "Strategic planning", description: "Align career choices and location with immigration pathways." },
    { icon: FileText, title: "Application preparation", description: "Submit strong, compliant PR applications with RCIC guidance." },
  ]

  const studyServicesLocal = [
    { icon: Target, title: "School & Program Selection", description: "Assistance with selecting the right DLI and program for your goals" },
    { icon: FileText, title: "Statement of Purpose", description: "Guidance on writing and reviewing your SOP for maximum impact" },
    { icon: Users, title: "Custodianship Support", description: "Support for minors with custodianship and parental authorization documents" },
    { icon: CheckCircle, title: "Application Support", description: "Complete study permit application support with document checklists" },
    { icon: Briefcase, title: "PGWP Planning", description: "Strategic planning for Post-Graduation Work Permit eligibility" },
    { icon: Award, title: "PR Pathway Guidance", description: "Long-term planning for permanent residency opportunities" },
  ]

  const stayConnectedLocal = [
    { icon: Phone, title: "Consult with an RCIC", description: "Book a call to review your study goals and immigration plan.", link: { label: "Book Consultation", url: "/contact", variant: "default" } },
    { icon: FileText, title: "Study resources", description: "Browse planning tools, document checklists, and success tips.", link: { label: "Visit Resources", url: "/resources", variant: "outline" } },
  ]

  const summaryChecklistLocal = [
    "Accepted offer from a DLI",
    "PAL/TAL if required",
    "Proof of funds and travel plans",
    "Clean background and medical clearance",
    "Clear intention to return home after studies",
  ]

  useEffect(() => {
    fetchStudyBlocks("study").then((blocks) => setCms(adaptStudyContent(blocks)))
  }, [])

  /* pick CMS or fallbacks */
  const hero = cms?.hero
  const H = cms?.H
  const successRoadmap = cms?.successRoadmap || successRoadmapLocal
  const requiredDocuments = cms?.requiredDocuments || requiredDocumentsLocal
  const eligibilityRequirements = cms?.eligibilityRequirements || eligibilityRequirementsLocal
  const studyLevels = cms?.studyLevels || studyLevelsLocal
  const pgwpRequirements = cms?.pgwpRequirements || pgwpRequirementsLocal
  const supportPGWPItems = cms?.supportPGWPItems || supportPGWPLocal
  const medicalExamRequirements = cms?.medicalExamRequirements || medicalExamRequirementsLocal
  const palTalInfo = {
    whoNeeds: cms?.palTalInfo?.whoNeeds || palTalInfoLocal.whoNeeds,
    notRequired: cms?.palTalInfo?.notRequired || palTalInfoLocal.notRequired,
  }
  const pathwayPRCards = cms?.pathwayPRCards || pathwayPRCardsLocal
  const studyServices = cms?.studyServices || studyServicesLocal
  const readyCTA = cms?.readyCTA
  const stayConnected = cms?.stayConnected || stayConnectedLocal
  const summaryChecklist = cms?.summaryChecklist || summaryChecklistLocal

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* ---------------- Hero ---------------- */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero?.title || "Study in Canada"}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              {hero?.subtitle || "Your Academic Journey Begins Here"}
            </p>
            {hero?.html ? (
              <div className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 prose prose-lg" dangerouslySetInnerHTML={{ __html: hero.html }} />
            ) : (
              <>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                  "A Canadian education is more than a degree — it's a pathway to global opportunity, lifelong connections, and a future without borders."
                </p>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                  Canada's education system is world-renowned for its high-quality programs and institutions — from secondary school to post-graduate studies. Every year, thousands of international students choose Canada to advance their education, build their future, and access pathways to long-term opportunities, including permanent residence.
                </p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {hero?.ctas?.length ? (
                hero.ctas.map((cta: any, i: number) => (
                  <Link key={i} href={cta.url || cta.href || "/contact"} target={cta?.newTab ? "_blank" : undefined}>
                    <Button
                      size="lg"
                      {...(String(cta.variant).toLowerCase() === "outline"
                        ? { variant: "outline", className: "border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent" }
                        : { className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full" })}
                    >
                      {i === 0 ? <Calendar className="mr-2 w-5 h-5" /> : <FileText className="mr-2 w-5 h-5" />}
                      {cta.label || "Learn more"}
                    </Button>
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/contact">
                    <Button size="lg" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full">
                      <Calendar className="mr-2 w-5 h-5" />
                      Book Study Consultation
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent">
                    <FileText className="mr-2 w-5 h-5" />
                    Download Guide
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Roadmap ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.roadmap?.Heading as string) || "Your 4-Step Success Roadmap"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.roadmap?.description || "From application to permanent residence - your complete journey to success in Canada"}
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
                        <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 font-medium">STEP {step.step}</div>
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">{step.description}</p>
                      <div className="space-y-3">
                        {step.details.map((detail: string, detailIndex: number) => (
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

      {/* ---------------- Eligibility & Docs ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.eligibility?.Heading as string) || "Study Permit Eligibility & Documentation"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.eligibility?.description || "Understanding the requirements and documentation needed for your Canadian study permit application"}
            </p>
          </motion.div>

          {/* Basic Eligibility */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Basic Eligibility</h3>
                </div>
                <p className="text-gray-700 mb-6">To qualify, applicants must:</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eligibilityRequirements.map((req, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <req.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{req.requirement}</h4>
                        {req.description && <p className="text-gray-600 text-sm">{req.description}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Required Documents */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <FileText className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Required Documents</h3>
                </div>
                <p className="text-gray-700 mb-6">Your study permit application should include:</p>
                <div className="space-y-4">
                  {requiredDocuments.map((doc, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
                          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">Required</span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Optional</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* PAL/TAL */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {(H?.palTal?.Heading as string) || "Provincial/Territorial Attestation Letter (PAL/TAL)"}
                  </h3>
                </div>
                <p className="text-gray-700 mb-6">
                  {H?.palTal?.description ||
                    "Most post-secondary and language program applicants must now submit a PAL or TAL. This letter is issued by the province or territory to confirm you hold a designated study spot within their annual allocation."}
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Who needs a PAL/TAL?</h4>
                    <ul className="space-y-2">
                      {(palTalInfo.whoNeeds || []).map((item, index) => (
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
                      {(palTalInfo.notRequired || []).map((item, index) => (
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
        </div>
      </section>

      {/* ---------------- Who We Support ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{(H?.whoSupport?.Heading as string) || "Who We Support"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.whoSupport?.description || "We assist international students at all academic levels with comprehensive support services"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {studyLevels.map((level, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${level.color} rounded-2xl flex items-center justify-center`}>
                        <level.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{level.level}</h3>
                        <p className="text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Our Services Include:</h4>
                      {level.services.map((service: string, serviceIndex: number) => (
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

      {/* ---------------- Our Study Permit Services ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.services?.Heading as string) || "Our Study Permit Services"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.services?.description || "Comprehensive support throughout your Canadian education journey"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studyServices.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
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

      {/* ---------------- Work in Canada After Graduation ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {(H?.workAfterGrad?.Heading as string) || "Work in Canada After Graduation"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.workAfterGrad?.description || "Graduates of eligible programs may apply for a Post-Graduation Work Permit (PGWP) for up to 3 years"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
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

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">How We Assist You</h3>
                  <div className="space-y-4">
                    {supportPGWPItems.map((assistance, index) => (
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

      {/* ---------------- Pathway to PR ---------------- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {(H?.pathwayPR?.Heading as string) || "Your Pathway to Permanent Residence"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.pathwayPR?.description || "We go beyond the PGWP to support your long-term success in Canada"}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Long-Term Support</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {pathwayPRCards.map((c, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <c.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{c.title}</h4>
                        <p className="text-gray-600 text-sm">{c.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{(H?.readyCTA?.Heading as string) || "Complete Journey Support"}</h3>
                <p className="text-xl text-white/90 mb-6">
                  {H?.readyCTA?.description ||
                    "We are with you at every stage — from graduation to gaining Canadian work experience, and ultimately, to building your life in Canada as a permanent resident."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={readyCTA?.cta?.url || "/contact"}>
                    <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold">
                      <Calendar className="mr-2 w-5 h-5" />
                      {readyCTA?.cta?.label || "Start Your Journey"}
                    </Button>
                  </Link>
                  <Link href="/programs">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent">
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

      {/* ---------------- Summary CTA ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {(H?.readyCTA?.Heading as string) || "Ready to Begin Your Canadian Education Journey?"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {H?.readyCTA?.description ||
                "A strong study permit application includes all required documents, clear intentions, and expert guidance. Let us help you navigate the process with confidence."}
            </p>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">In Summary, a strong study permit application includes:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {(summaryChecklist || []).map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={readyCTA?.cta?.url || "/contact"}>
                <Button size="lg" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full">
                  <Phone className="mr-2 w-5 h-5" />
                  {readyCTA?.cta?.label || "Book Consultation with RCIC"}
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent">
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

      {/* ---------------- Stay Connected ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {(H?.stayConnected?.Heading as string) || "Stay connected"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {H?.stayConnected?.description || "Choose the resource that helps you take the next step today."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {stayConnected.map((card, idx) => (
              <Card key={idx} className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  {card.link?.url && (
                    <Link href={card.link.url}>
                      <Button
                        {...(String(card.link.variant).toLowerCase() === "outline"
                          ? { variant: "outline" }
                          : { className: "bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90" })}
                      >
                        {card.link.label || "Learn more"}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

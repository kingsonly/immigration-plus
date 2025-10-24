"use client"

import { motion } from "framer-motion"
import { Calendar, FileText, CheckCircle, Mail, AlertCircle, DollarSign, Building, MapPin, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HomePageSkeleton from "../pageSkeletons/HomePageSkeleton"
import { LucideIcon } from "../LucideIcon/LucideIcon"

type BusinessImmigrationPageComponentProps = {
  value: any
}

const fallbackData = {
  hero: {
    iconName: "Rocket",
    title: "Business Immigration",
    subtitle: "Empowering Entrepreneurs, Investors & Self-Employed Professionals to Launch and Grow in Canada",
    body: "At TENTACULAR IMMIGRATION SOLUTIONS LTD, we guide ambitious business-minded individuals through Canada's federal and provincial business immigration streams - helping you transition from startup idea to permanent residency, legally and strategically.",
    primaryCTA: {
      label: "Book Free Business Consultation",
      href: "/contact",
    },
    secondaryCTA: {
      label: "Request Quote",
      href: "mailto:info@coming2canada.co",
      emailSubject: "Canada Start-Up Visa",
    },
  },
  programsIntro: {
    anchorId: "business-programs",
    iconName: "Briefcase",
    title: "Business Immigration Pathways",
    subtitle: "Choose the right pathway for your business goals and immigration objectives",
  },
  programs: [
    {
      title: "Start-Up Visa Program",
      subtitle: "For visionary entrepreneurs with innovative business ideas",
      description:
        "Canada's Start-Up Visa Program is designed for visionary entrepreneurs who have the potential to build innovative businesses in Canada that can compete globally, create jobs for Canadians, and drive long-term economic growth.",
      iconName: "Rocket",
      color: "from-red-500 to-red-600",
      requirements: [
        "Innovative business concept",
        "Letter of Support from a designated organization",
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
      iconName: "MapPin",
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
      iconName: "Building",
      color: "from-pink-600 to-red-500",
      requirements: [
        "Own at least 50% of a Canadian business",
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
      iconName: "Award",
      color: "from-red-500 to-red-700",
      requirements: [
        "Two or more years of self-employment experience",
        "Cultural or athletic background",
        "Intent to be self-employed in Canada",
        "Meet selection criteria",
      ],
      href: "#self-employed",
    },
  ],
  startupVisaIntro: {
    anchorId: "startup-visa",
    iconName: "Rocket",
    title: "Start-Up Visa Program",
    subtitle: "Launch your innovative business in Canada with a permanent residency pathway",
    description: "",
  },
  startupVisaHowItWorks: {
    iconName: "Info",
    heading: "How It Works",
    description: "To qualify for the Start-Up Visa, you must:",
  },
  howItWorks: [
    {
      stepNumber: 1,
      heading: "Secure Designated Support",
      text: "Submit your business idea to a designated incubator, angel investor group, or venture capital fund. If approved, you will receive the required Letter of Support.",
    },
    {
      stepNumber: 2,
      heading: "Meet Language Benchmarks",
      text: "Achieve at least CLB 5 in English or French.",
    },
    {
      stepNumber: 3,
      heading: "Show Settlement Funds",
      text: "Demonstrate that you can support yourself and your dependents in Canada according to IRCC guidelines.",
    },
    {
      stepNumber: 4,
      heading: "Launch While You Wait",
      text: "Apply for a temporary work permit to begin operating in Canada while your permanent residence application is processed.",
    },
  ],
  startupVisaServicesCopy: {
    heading: "Our Start-Up Visa Services",
    description: "High-touch guidance from idea validation to landing in Canada.",
  },
  seServices: [
    {
      iconName: "Lightbulb",
      title: "Pitch and Innovation Coaching",
      description: "Refine your business model and pitch package for designated organizations.",
    },
    {
      iconName: "FileText",
      title: "Letter of Support Assembly",
      description: "Coordinate applications and due diligence packages for incubators, angels, or venture capital funds.",
    },
    {
      iconName: "Users",
      title: "Founder Alignment",
      description: "Align roles, equity, and relocation plans across your founding team.",
    },
    {
      iconName: "Rocket",
      title: "Work Permit Launch Plan",
      description: "Prepare LMIA-exempt work permits so you can start operating in Canada.",
    },
  ],
  startupVisaFeesCopy: {
    heading: "Start-Up Visa Program: Understanding the Fees",
    description: "Plan for private market fees alongside your business launch budget.",
  },
  fees: [
    {
      category: "Startup Team Participation",
      range: "CAD 75,000 - CAD 250,000",
      description: "For entrepreneurs joining existing startup groups",
      details: ["Access to eligible startup", "Document preparation", "Founder alignment", "Business role allocation"],
      note: "Private-market fees, not charged by IRCC",
    },
    {
      category: "Designated Organization Support",
      range: "CAD 10,000 - CAD 200,000",
      description: "Business incubators, angel investors, or venture capital funds",
      details: ["Business plan development", "Pitch coaching", "Due diligence", "Letter of Support"],
      note: "Varies based on business stage and potential",
    },
    {
      category: "Business Investment Capital",
      range: "CAD 50,000 - CAD 250,000",
      description: "Funding the actual launch of your startup",
      details: ["Business setup costs", "Hiring and operations", "Development expenses", "Customer acquisition"],
      note: "IRCC expects genuine business activity",
    },
  ],
  startupVisaGovFeesCopy: {
    heading: "IRCC & Government Fees",
    description: "These are standard federal fees charged for permanent residence applications.",
  },
  govFees: [
    { category: "Principal Applicant", amount: "$1,625 + $515 (RPRF)" },
    { category: "Spouse or Partner", amount: "$850 + $515 (RPRF)" },
    { category: "Dependent Child (each)", amount: "$230" },
    { category: "Biometrics (individual)", amount: "$85" },
    { category: "Biometrics (family)", amount: "$170 (max)" },
  ],
  quoteCTA: {
    iconName: "Calendar",
    heading: "Start-Up Visa - Request a Quote",
    body: "Canada's Start-Up Visa Program offers permanent residence to entrepreneurs with innovative business ideas that can create jobs for Canadians. Tell us about your concept and we will map the next steps.",
    primaryCTA: {
      label: "Book Consultation",
      href: "/contact",
    },
    secondaryCTA: {
      label: "Request Quote",
      href: "mailto:info@coming2canada.co",
      emailSubject: "Canada Start-Up Visa",
    },
    footnote: 'Email us at info@coming2canada.co with "Canada Start-Up Visa" in the subject line.',
  },
  provincialIntro: {
    anchorId: "provincial-streams",
    iconName: "MapPin",
    title: "Provincial Entrepreneur & Investor Streams",
    subtitle: "Tailored immigration pathways for regional business builders",
    description: "",
  },
  provincialOverview: {
    heading: "Program Overview",
    description:
      "Each province or territory has its own entrepreneur stream under the Provincial Nominee Program, offering permanent residence pathways to qualified businesspeople who invest, settle, and contribute to the local economy.",
  },
  pnpOverview: [
    { label: "Investment Amount", value: "CAD $100,000 to $600,000" },
    { label: "Work Permit", value: "Temporary (prior to nomination)" },
    { label: "Permanent Residency", value: "Via provincial nomination" },
    { label: "Business Experience", value: "Typically 2+ years" },
    { label: "Net Worth Requirement", value: "CAD $300,000 to $800,000" },
    { label: "Job Creation", value: "1-2+ Canadian jobs" },
  ],
  streams: [
    {
      province: "British Columbia",
      program: "Entrepreneur Immigration",
      netWorth: "CAD $600,000",
      investment: "CAD $200,000",
      jobs: "1+ Canadian job",
      streams: ["Base Stream", "Regional Pilot", "Strategic Projects"],
      color: "from-blue-500 to-blue-600",
    },
    {
      province: "Ontario",
      program: "Entrepreneur Stream (OINP)",
      netWorth: "$800K (GTA) / $400K (outside)",
      investment: "$600K (GTA) / $200K (outside)",
      jobs: "1-2 full-time positions",
      streams: ["GTA Stream", "Outside GTA", "ICT"],
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
      netWorth: "CAD $500,000",
      investment: "$250K (Winnipeg) / $150K (outside)",
      jobs: "1+ full-time job",
      streams: ["Business Stream", "Farm Stream"],
      color: "from-purple-500 to-purple-600",
    },
  ],
  c11Intro: {
    anchorId: "c11-permit",
    iconName: "Building",
    title: "C11 Work Permit",
    subtitle: "Launch or acquire a Canadian business and work without an LMIA",
  },
  c11Overview: {
    heading: "Program Overview",
    description:
      "The C11 work permit is an LMIA-exempt pathway for entrepreneurs and business owners who want to enter Canada to actively manage their own business. It is designed for individuals who own at least 50 percent of a Canadian business and can demonstrate a significant economic benefit to the country.",
  },
  c11Highlights: [
    {
      iconName: "PieChart",
      title: "50 Percent Ownership",
      description: "Minimum ownership requirement in the Canadian business.",
    },
    {
      iconName: "Users",
      title: "Active Management",
      description: "Hands-on involvement in day-to-day business operations.",
    },
    {
      iconName: "TrendingUp",
      title: "Economic Benefit",
      description: "Show measurable benefit such as jobs, innovation, or regional growth.",
    },
  ],
  c11Timeline: [
    {
      iconName: "Clock",
      title: "Initial C11 Work Permit",
      description: "Typically issued for 1-2 years.",
    },
    {
      iconName: "ArrowRight",
      title: "Extension",
      description: "Possible when business operations continue to show benefit.",
    },
    {
      iconName: "Target",
      title: "PR Pathway",
      description: "Accessible after establishing the business and gaining Canadian experience.",
    },
  ],
  c11Benefits: [
    {
      iconName: "Users",
      title: "Create or maintain jobs for Canadians",
      description: "Demonstrate employment opportunities for the local workforce.",
    },
    {
      iconName: "Lightbulb",
      title: "Introduce innovative goods or services",
      description: "Bring new technologies or solutions to the Canadian market.",
    },
    {
      iconName: "TrendingUp",
      title: "Expand regional economic opportunities",
      description: "Contribute to local economic development and growth.",
    },
    {
      iconName: "Globe",
      title: "Increase exports or international markets",
      description: "Help Canada expand its global trade relationships.",
    },
  ],
  selfEmployedIntro: {
    anchorId: "self-employed",
    iconName: "Award",
    title: "Self-Employed Persons Program",
    subtitle: "For cultural professionals, athletes, and artists seeking permanent residence in Canada",
  },
  selfEmployedChecklists: [
    {
      heading: "Who It Is For",
      items: [
        "Musicians, painters, writers, and filmmakers",
        "Professional athletes, coaches, and referees",
        "Dancers, artisans, designers, and other cultural contributors",
      ],
    },
    {
      heading: "To Qualify You Must",
      items: [
        "Have at least two years of relevant self-employment or world-class participation",
        "Intend and be able to become self-employed in Canada",
        "Score well under the federal selection grid",
        "Meet language, medical, security, and financial requirements",
      ],
    },
  ],
  selfEmployedServicesCopy: {
    heading: "How We Help",
    description: "Showcase your cultural or athletic track record with a compliant submission.",
  },
  selfEmployedServices: [
    {
      iconName: "Target",
      title: "Eligibility Assessments",
      description: "Profile scoring and qualification evaluation.",
    },
    {
      iconName: "FileText",
      title: "Narrative Building",
      description: "Highlight past contributions and Canadian plans.",
    },
    {
      iconName: "Briefcase",
      title: "Document Preparation",
      description: "Organize proof of self-employment and achievements.",
    },
    {
      iconName: "Users",
      title: "Full Representation",
      description: "Guidance through every stage of the application process.",
    },
  ],
  postInvestmentIntro: {
    anchorId: "post-investment-pr",
    iconName: "TrendingUp",
    title: "Post-Investment Permanent Residency",
    subtitle: "PR eligibility follows successful business establishment for most federal and PNP pathways",
  },
  postInvestmentCards: [
    {
      iconName: "Building",
      title: "Continuous Business Ownership",
      description: "Maintain active ownership or management of your Canadian business.",
    },
    {
      iconName: "Users",
      title: "Job Creation for Canadians",
      description: "Demonstrate employment opportunities created for Canadian workers.",
    },
    {
      iconName: "CheckCircle",
      title: "Program Compliance",
      description: "Stay aligned with program rules and performance agreements.",
    },
  ],
  postInvestmentSupport: {
    iconName: "FileText",
    title: "Our PR Application Support",
    description:
      "We support your permanent residence application with document preparation, compliance checks, and submission timing so you can transition smoothly to PR status.",
    chips: ["Document Preparation", "Compliance Checks", "Submission Timing", "Application Monitoring"],
  },
  finalCta: {
    iconName: "Rocket",
    title: "Ready to Scale Your Business in Canada?",
    body: "Let's map your path whether you are looking to launch a startup, invest, or self-employ. We help you turn your Canadian business plans into reality.",
    buttonLabel: "Book Free Business Immigration Consultation",
    buttonHref: "/contact",
    footnote: "Start smart. Start strong. Start with TENTACULAR IMMIGRATION SOLUTIONS LTD.",
  },
} as const

const ensureArray = (items: any, fallback: any[]) => (Array.isArray(items) && items.length > 0 ? items : fallback)

const listText = (item: any) => {
  if (typeof item === "string") return item
  if (item && typeof item === "object") {
    if (typeof item.listItem === "string") return item.listItem
    if (typeof item.value === "string") return item.value
    if (typeof item.label === "string") return item.label
  }
  return ""
}

const asList = (items: any) => ensureArray(items, []).map(listText).filter(Boolean)

const getProgramRequirements = (program: any, index: number) => {
  const programRequirements = asList(program?.requirements)
  if (programRequirements.length) return programRequirements
  const fallbackProgram = fallbackData.programs[index]
  return fallbackProgram ? asList(fallbackProgram.requirements) : []
}

const getChecklistItems = (checklist: any, index: number) => {
  const checklistItems = asList(checklist?.items)
  if (checklistItems.length) return checklistItems
  const fallbackChecklist = fallbackData.selfEmployedChecklists[index]
  return fallbackChecklist ? asList(fallbackChecklist.items) : []
}

export default function BusinessImmigrationPageComponent({ value }: BusinessImmigrationPageComponentProps) {
  if (!value) return <HomePageSkeleton />

  const data = value ?? {}

  const hero = data.hero ?? fallbackData.hero
  const programsIntro = data.programsIntro ?? fallbackData.programsIntro
  const programs = ensureArray(data.programs, fallbackData.programs)
  const startupVisaIntro = data.startupVisaIntro ?? fallbackData.startupVisaIntro
  const startupVisaHowItWorks = data.startupVisaHowItWorks ?? fallbackData.startupVisaHowItWorks
  const howItWorks = ensureArray(data.howItWorks, fallbackData.howItWorks)
  const startupVisaServicesCopy = data.startupVisaServicesCopy ?? fallbackData.startupVisaServicesCopy
  const seServices = ensureArray(data.seServices, fallbackData.seServices)
  const startupVisaFeesCopy = data.startupVisaFeesCopy ?? fallbackData.startupVisaFeesCopy
  const fees = ensureArray(data.fees, fallbackData.fees)
  const startupVisaGovFeesCopy = data.startupVisaGovFeesCopy ?? fallbackData.startupVisaGovFeesCopy
  const govFees = ensureArray(data.govFees, fallbackData.govFees)
  const quoteCTA = data.quoteCTA ?? fallbackData.quoteCTA
  const provincialIntro = data.provincialIntro ?? fallbackData.provincialIntro
  const provincialOverview = data.provincialOverview ?? fallbackData.provincialOverview
  const pnpOverview = ensureArray(data.pnpOverview, fallbackData.pnpOverview)
  const streams = ensureArray(data.streams, fallbackData.streams)
  const c11Intro = data.c11Intro ?? fallbackData.c11Intro
  const c11Overview = data.c11Overview ?? fallbackData.c11Overview
  const c11Highlights = ensureArray(data.c11Highlights, fallbackData.c11Highlights)
  const c11Timeline = ensureArray(data.c11Timeline, fallbackData.c11Timeline)
  const c11Benefits = ensureArray(data.c11Benefits, fallbackData.c11Benefits)
  const selfEmployedIntro = data.selfEmployedIntro ?? fallbackData.selfEmployedIntro
  const selfEmployedChecklists = ensureArray(data.selfEmployedChecklists, fallbackData.selfEmployedChecklists)
  const selfEmployedServicesCopy = data.selfEmployedServicesCopy ?? fallbackData.selfEmployedServicesCopy
  const selfEmployedServices = ensureArray(data.selfEmployedServices, fallbackData.selfEmployedServices)
  const postInvestmentIntro = data.postInvestmentIntro ?? fallbackData.postInvestmentIntro
  const postInvestmentCards = ensureArray(data.postInvestmentCards, fallbackData.postInvestmentCards)
  const postInvestmentSupport = data.postInvestmentSupport ?? fallbackData.postInvestmentSupport
  const finalCta = data.finalCta ?? fallbackData.finalCta

  const steps = howItWorks.slice().sort((a: any, b: any) => (a.stepNumber || 0) - (b.stepNumber || 0))
  const left = steps.filter((step: any) => Number(step.stepNumber) % 2 === 1)
  const right = steps.filter((step: any) => Number(step.stepNumber) % 2 === 0)

  const primaryCTA = hero.primaryCTA ?? fallbackData.hero.primaryCTA
  const secondaryCTA = hero.secondaryCTA ?? fallbackData.hero.secondaryCTA
  const heroSecondaryHref = secondaryCTA?.href || "/contact"
  const heroSecondarySubject = secondaryCTA?.emailSubject || ""
  const heroSecondaryIsMailto = heroSecondaryHref.startsWith("mailto:")

  const quotePrimary = quoteCTA.primaryCTA ?? fallbackData.quoteCTA.primaryCTA
  const quoteSecondary = quoteCTA.secondaryCTA ?? fallbackData.quoteCTA.secondaryCTA
  const quoteSecondaryHref = quoteSecondary?.href || "mailto:info@coming2canada.co"
  const quoteSecondarySubject = quoteSecondary?.emailSubject || "Canada Start-Up Visa"
  const quoteSecondaryIsMailto = quoteSecondaryHref.startsWith("mailto:")

  const finalButtonHref = finalCta.buttonHref || "/contact"

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
              <LucideIcon name={hero.iconName || hero.icon || "Rocket"} className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {hero.title || "Business Immigration"}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              {hero.subtitle ||
                "Empowering Entrepreneurs, Investors & Self-Employed Professionals to Launch and Grow in Canada"}
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {hero.body ||
                "At TENTACULAR IMMIGRATION SOLUTIONS LTD, we guide ambitious business-minded individuals through Canada's federal and provincial business immigration streams - helping you transition from startup idea to permanent residency, legally and strategically."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={primaryCTA?.href || "/contact"}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  {primaryCTA?.label || "Book Free Business Consultation"}
                </Button>
              </Link>

              {heroSecondaryIsMailto ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
                  onClick={() => {
                    const subject = heroSecondarySubject ? `?subject=${encodeURIComponent(heroSecondarySubject)}` : ""
                    window.location.href = `${heroSecondaryHref}${subject}`
                  }}
                >
                  <FileText className="mr-2 w-5 h-5" />
                  {secondaryCTA?.label || "Request Quote"}
                </Button>
              ) : (
                <Link href={heroSecondaryHref}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
                  >
                    <FileText className="mr-2 w-5 h-5" />
                    {secondaryCTA?.label || "Request Quote"}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Programs Overview */}
      <section className="py-20 bg-white" id={programsIntro.anchorId || undefined}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {programsIntro.title || "Business Immigration Pathways"}
              </span>
            </h2>
            {programsIntro.subtitle ? (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{programsIntro.subtitle}</p>
            ) : null}
            {programsIntro.description ? (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">{programsIntro.description}</p>
            ) : null}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {programs.map((program: any, index: number) => {
              const requirementItems = getProgramRequirements(program, index)
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${program.color || "from-red-500 to-red-600"} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <LucideIcon name={program.iconName || "FileText"} className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-lg text-red-600 font-medium mb-4">{program.subtitle}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-900">Key Requirements:</h4>
                      {requirementItems.map((req: string, reqIndex: number) => (
                        <div key={reqIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* Start-Up Visa Program Detailed Section */}
      <section id={startupVisaIntro.anchorId || "startup-visa"} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LucideIcon name={startupVisaIntro.iconName || "Rocket"} className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {startupVisaIntro.title || "Start-Up Visa Program"}
            </h2>
            {startupVisaIntro.subtitle ? (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{startupVisaIntro.subtitle}</p>
            ) : null}
            {startupVisaIntro.description ? (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">{startupVisaIntro.description}</p>
            ) : null}
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
                  <LucideIcon
                    name={startupVisaHowItWorks.iconName || "Info"}
                    className="w-6 h-6 text-red-600 mr-3 flex-shrink-0"
                  />
                  {startupVisaHowItWorks.heading || "How It Works"}
                </h3>
                {startupVisaHowItWorks.description ? (
                  <p className="text-gray-700 mb-6">{startupVisaHowItWorks.description}</p>
                ) : null}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {left.map((step: any) => (
                      <div key={step.stepNumber}>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {step.stepNumber}. {step.heading}
                        </h4>
                        <p className="text-gray-600">{step.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-6">
                    {right.map((step: any) => (
                      <div key={step.stepNumber}>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {step.stepNumber}. {step.heading}
                        </h4>
                        <p className="text-gray-600">{step.text}</p>
                      </div>
                    ))}
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
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
              {startupVisaServicesCopy.heading || "Our Start-Up Visa Services"}
            </h3>
            {startupVisaServicesCopy.description ? (
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">{startupVisaServicesCopy.description}</p>
            ) : null}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seServices.map((service: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <LucideIcon name={service.iconName || "CheckCircle"} className="w-6 h-6 text-white" />
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
            <h3 className="text-3xl font-bold text-center mb-4 text-gray-900">
              {startupVisaFeesCopy.heading || "Start-Up Visa Program: Understanding the Fees"}
            </h3>
            {startupVisaFeesCopy.description ? (
              <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">{startupVisaFeesCopy.description}</p>
            ) : null}
            <div className="space-y-8">
              {fees.map((fee: any, index: number) => (
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
                            {asList(fee.details).map((detail: string, detailIndex: number) => (
                              <li key={detailIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {fee.note ? (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-yellow-800">{fee.note}</p>
                            </div>
                          </div>
                        ) : null}
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
                  {startupVisaGovFeesCopy.heading || "IRCC & Government Fees"}
                </h3>
                {startupVisaGovFeesCopy.description ? (
                  <p className="text-gray-700 mb-6">{startupVisaGovFeesCopy.description}</p>
                ) : null}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {govFees.map((fee: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-2">{fee.category}</h4>
                      <p className="text-red-600 font-medium">{fee.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quote CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-xl">
              <CardContent className="p-10 text-center">
                <LucideIcon name={quoteCTA.iconName || "Calendar"} className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">{quoteCTA.heading}</h3>
                <p className="text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed">{quoteCTA.body}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={quotePrimary?.href || "/contact"}>
                    <Button
                      size="lg"
                      className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                    >
                      <Calendar className="mr-2 w-5 h-5" />
                      {quotePrimary?.label || "Book Consultation"}
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent"
                    onClick={() => {
                      if (quoteSecondaryIsMailto) {
                        const href = quoteSecondaryHref || "mailto:info@coming2canada.co"
                        const subject = quoteSecondarySubject || "Canada Start-Up Visa"
                        window.location.href = `${href}?subject=${encodeURIComponent(subject)}`
                      } else if (quoteSecondaryHref) {
                        window.location.href = quoteSecondaryHref
                      }
                    }}
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    {quoteSecondary?.label || "Request Quote"}
                  </Button>
                </div>
                {quoteCTA.footnote ? (
                  <p className="text-sm text-white/70 mt-4">{quoteCTA.footnote}</p>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Provincial Entrepreneur Streams */}
      <section id={provincialIntro.anchorId || "provincial-streams"} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LucideIcon name={provincialIntro.iconName || "MapPin"} className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{provincialIntro.title}</h2>
            {provincialIntro.subtitle ? (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{provincialIntro.subtitle}</p>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{provincialOverview.heading}</h3>
                <p className="text-gray-700 mb-6">{provincialOverview.description}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pnpOverview.map((req: any, index: number) => (
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
            {streams.map((stream: any, index: number) => (
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
                        className={`w-12 h-12 bg-gradient-to-r ${stream.color || "from-red-500 to-red-600"} rounded-xl flex items-center justify-center`}
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
                        {ensureArray(stream.streams, []).map((streamName: any, streamIndex: number) => (
                          <span key={streamIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {typeof streamName === "string" ? streamName : streamName?.label || ""}
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
      <section id={c11Intro.anchorId || "c11-permit"} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LucideIcon name={c11Intro.iconName || "Building"} className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{c11Intro.title}</h2>
            {c11Intro.subtitle ? (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{c11Intro.subtitle}</p>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{c11Overview.heading}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{c11Overview.description}</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {c11Highlights.map((highlight: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <LucideIcon name={highlight.iconName || "PieChart"} className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{highlight.title}</h4>
                      <p className="text-gray-600 text-sm">{highlight.description}</p>
                    </div>
                  ))}
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
              {c11Benefits.map((benefit: any, index: number) => (
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
                          <LucideIcon name={benefit.iconName || "CheckCircle"} className="w-6 h-6 text-white" />
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
                  {c11Timeline.map((entry: any, index: number) => (
                    <div key={index} className="text-center">
                      <LucideIcon name={entry.iconName || "Clock"} className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">{entry.title}</h4>
                      <p className="text-gray-600">{entry.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Self-Employed Persons Program */}
      <section id={selfEmployedIntro.anchorId || "self-employed"} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LucideIcon name={selfEmployedIntro.iconName || "Award"} className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{selfEmployedIntro.title}</h2>
            {selfEmployedIntro.subtitle ? (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{selfEmployedIntro.subtitle}</p>
            ) : null}
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
                  {selfEmployedChecklists.map((checklist: any, index: number) => {
                    const items = getChecklistItems(checklist, index)
                    const fallbackChecklist = fallbackData.selfEmployedChecklists[index]
                    const heading = checklist.heading || fallbackChecklist?.heading || ""
                    return (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-900 mb-4">{heading}</h4>
                        <ul className="space-y-2">
                          {items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
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
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
              {selfEmployedServicesCopy.heading || "How We Help"}
            </h3>
            {selfEmployedServicesCopy.description ? (
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">{selfEmployedServicesCopy.description}</p>
            ) : null}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selfEmployedServices.map((service: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <LucideIcon name={service.iconName || "CheckCircle"} className="w-6 h-6 text-white" />
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
      <section id={postInvestmentIntro.anchorId || undefined} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{postInvestmentIntro.title}</h2>
            {postInvestmentIntro.subtitle ? (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{postInvestmentIntro.subtitle}</p>
            ) : null}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {postInvestmentCards.map((requirement: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <LucideIcon name={requirement.iconName || "CheckCircle"} className="w-8 h-8 text-white" />
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
                <LucideIcon
                  name={postInvestmentSupport.iconName || "FileText"}
                  className="w-12 h-12 text-blue-600 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{postInvestmentSupport.title}</h3>
                <p className="text-gray-600 mb-6">{postInvestmentSupport.description}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {asList(postInvestmentSupport.chips).map((chip: string, index: number) => (
                    <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {chip}
                    </span>
                  ))}
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
              <LucideIcon name={finalCta.iconName || "Rocket"} className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">{finalCta.title}</h2>
            <p className="text-xl text-white/90 mb-8">{finalCta.body}</p>
            <Link href={finalButtonHref}>
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-12 py-4 rounded-full font-semibold"
              >
                <Calendar className="mr-3 w-5 h-5" />
                {finalCta.buttonLabel || "Book Free Business Immigration Consultation"}
              </Button>
            </Link>
            {finalCta.footnote ? <p className="text-white/70 text-sm mt-4">{finalCta.footnote}</p> : null}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

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
  ClipboardCheck,
  MapPinned,
  LogIn,
  Globe,
  AlertTriangle,
  User,
  Scale,
  Gavel,
  BookOpen,
  Phone,
  Shield,
  Calendar,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RefugeePage() {
  const makingClaims = [
    {
      icon: LogIn, // Lucide icon for guidance/navigation
      title: "How to Claim Refugee Protection Inside Canada",
      description:
        "You can make a refugee claim either at a Canadian Port of Entry (e.g., airport, land border) or at an inland Immigration, Refugees and Citizenship Canada (IRCC) office",
      tips: [
        "Port of Entry Claim: Made upon arrival in Canada to a Canada Border Services Agency (CBSA) officer.",
        "Inland Claim: Made if you are already in Canada. This typically involves submitting an application online through the IRCC portal.",
      ],
    },
    {
      icon: Globe, // Lucide icon for document review
      title: "How to Apply for Refugee Resettlement from Outside Canada",
      description:
        "For individuals outside Canada, refugee protection may be accessed through Canada’s resettlement programs",
      tips: [
        "These include the Government-Assisted Refugee (GAR) program, the Private Sponsorship of Refugees (PSR) program, or the Blended Visa Office-Referred (BVOR) program.",
        "A referral from the United Nations Refugee Agency (UNHCR) or another authorized organization is usually required to begin the process abroad.",
      ],
    },
  ];
  const eligibilityRequirements = [
    {
      icon: Users, // Suggests multi-generational or group support
      title: "Convention Refugees",
      description:
        "These are individuals who have a well-founded fear of persecution in their home country based on one or more of the following grounds: race, religion, nationality, political opinion, or membership in a particular social group. This definition is derived from the 1951 UN Refugee Convention, to which Canada is a signatory, and is recognized under Canadian immigration law.",
    },
    {
      icon: Users, // Suggests multi-generational or group support
      title: "Persons in Need of Protection",
      description:
        "These are individuals who are already in Canada and would face a real risk of torture, threat to life, or cruel and unusual treatment or punishment if returned to their country of origin. This category addresses serious personal harm that does not necessarily fall under the persecution grounds required for Convention refugees.",
    },
  ];

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

  const refugeeProcessSteps = [
    {
      step: "01",
      title: "Eligibility Determination",
      description:
        "An IRCC or CBSA officer will first determine if your claim is eligible to be referred to the Immigration and Refugee Board of Canada (IRB).",
      details: [
        "Assessment of previous claims in Canada",
        "Safe Third Country Agreement considerations",
        "Initial screening for eligibility factors",
        "Documentation review",
      ],
      icon: Scale,
      color: "from-red-500 to-red-600",
    },
    {
      step: "02",
      title: "Referral to IRB",
      description:
        "If eligible, your claim is sent to the Refugee Protection Division (RPD) of the IRB, an independent tribunal.",
      details: [
        "Case file transferred to RPD",
        "Independent tribunal assessment",
        "Assignment of RPD member",
        "Timeline establishment",
      ],
      icon: FileText,
      color: "from-red-600 to-pink-600",
    },
    {
      step: "03",
      title: "Basis of Claim (BOC) Form",
      description: "You will need to submit a detailed Basis of Claim form outlining why you seek protection.",
      details: [
        "Detailed personal narrative required",
        "Evidence of persecution or risk",
        "Country condition documentation",
        "Supporting witness statements",
      ],
      icon: BookOpen,
      color: "from-pink-600 to-red-500",
    },
    {
      step: "04",
      title: "Hearing",
      description:
        "Most claimants will have a hearing before an RPD member, who will hear your testimony and review evidence.",
      details: [
        "Oral testimony presentation",
        "Evidence review and assessment",
        "Cross-examination if applicable",
        "Legal representation allowed",
      ],
      icon: Gavel,
      color: "from-red-500 to-red-700",
    },
    {
      step: "05",
      title: "Decision",
      description:
        "The RPD member decides whether to grant you refugee protection. If successful, you become a protected person.",
      details: [
        "Written decision provided",
        "Protected person status if approved",
        "Permanent residence application eligibility",
        "Appeal options if refused",
      ],
      icon: CheckCircle,
      color: "from-red-700 to-pink-500",
    },
  ]

  const prraFactors = [
    {
      icon: AlertTriangle,
      title: "Focus on New Evidence",
      description:
        "If you've previously made a refugee claim, the PRRA decision will focus primarily on new evidence that emerged after your last decision.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Scale,
      title: "Core Risk Criteria",
      description:
        "Officers assess whether removal would expose you to persecution, torture, risk to life, or cruel and unusual treatment.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: FileText,
      title: "Document-Based Process",
      description:
        "The PRRA process involves submitting a written application (IMM 5508) supported by evidence and detailed submissions.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: User,
      title: "IRCC Officer Decision",
      description:
        "PRRA decisions are made by an IRCC officer, not the Immigration and Refugee Board (IRB) which handles initial refugee claims.",
      color: "from-purple-500 to-purple-600",
    },
  ]

  const hcFactors = [
    {
      icon: Home,
      title: "Establishment in Canada",
      description:
        "How well you have built a life in Canada—your length of stay, work history, education, language ability, community involvement, and overall contribution to Canadian society.",
      details: [
        "Length of stay in Canada",
        "Work history and employment",
        "Education and language skills",
        "Community involvement",
        "Contribution to Canadian society",
      ],
    },
    {
      icon: Users,
      title: "Best Interests of a Child (BIOC)",
      description:
        "If children—especially Canadian citizens or permanent residents—would be directly affected by your removal, their physical, emotional, and psychological well-being is a top priority.",
      details: [
        "Physical well-being of children",
        "Emotional and psychological impact",
        "Educational disruption",
        "Healthcare access",
        "Family stability",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Hardship if Removed",
      description:
        "Undue hardship you would face if required to leave Canada, such as lack of medical care, risk of violence, or severe social challenges.",
      details: [
        "Lack of access to necessary medical care",
        "Risk of violence or discrimination",
        "Political instability in home country",
        "Severe social or economic challenges",
        "Personal safety concerns",
      ],
    },
    {
      icon: Heart,
      title: "Family Ties in Canada",
      description:
        "Your meaningful connections in Canada, including family members beyond your dependents, such as siblings, extended relatives, or long-standing community support.",
      details: [
        "Immediate family connections",
        "Extended family relationships",
        "Community support networks",
        "Long-term relationships",
        "Social integration",
      ],
    },
  ]

  const risksAssessed = [
    "Persecution based on race, religion, nationality, political opinion, or membership in a particular social group",
    "Torture or risk of torture",
    "Risk to life or cruel and unusual treatment or punishment",
    "Lack of safe alternatives within your country of origin",
    "State protection unavailability",
    "Generalized violence or civil war conditions",
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
                Refugee / H&C
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Canada provides refuge and compassion to those fleeing persecution, danger or exceptional hardship. We offer sensitive, confidential guidance through these life‑saving pathways.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Refugee Claim */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Refugee Claim</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Canada offers refugee protection to individuals facing persecution or serious harm in their home countries, reflecting its commitment to international human rights and legal obligations..
            </p>
          </motion.div>


          <div className="grid md:grid-cols-2 gap-8">
            {
              eligibilityRequirements.map((feature, index) => (
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

      {/* Making a Refugee Claim in Canada*/}
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
                Making a Refugee Claim in Canada
              </span>
            </h2>

          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {
              makingClaims.map((tip, index) => (
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

      {/* Refugee Claim Process */}
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
                The Refugee Claim Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the step-by-step process of making a refugee claim in Canada
            </p>
          </motion.div>

          <div className="space-y-12">
            {refugeeProcessSteps.map((step, index) => (
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

      {/* PRRA Section */}
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
                Pre-Removal Risk Assessment (PRRA)
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A Pre-Removal Risk Assessment (PRRA) is an application that allows individuals facing removal from Canada
              to seek protection based on risks they would face if returned to their country of origin.
            </p>
          </motion.div>

          {/* When PRRA Applies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Clock className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">When Is a PRRA Applicable?</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  A Pre-Removal Risk Assessment (PRRA) typically applies when the Canada Border Services Agency (CBSA)
                  notifies you that removal proceedings are underway. You may be eligible if:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Your refugee claim was rejected, withdrawn, or deemed abandoned
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Your judicial review request to the Federal Court was unsuccessful
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <p className="text-sm text-gray-600">
                      <strong>Important:</strong> A 12-month waiting period generally applies after a negative refugee
                      or PRRA decision, unless exceptional circumstances exist—such as significant changes in country
                      conditions or the best interests of a child.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Considerations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Considerations for a PRRA</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {prraFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${factor.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <factor.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{factor.title}</h4>
                      <p className="text-gray-600">{factor.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Risks Assessed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Risks Assessed</h3>
                </div>
                <p className="text-gray-700 mb-6">IRCC officers will evaluate whether you would face:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {risksAssessed.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* PRRA vs H&C */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How Is PRRA Different from H&C Applications?</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-3">PRRA Applications</h4>
                    <p className="text-gray-700">Focus strictly on protection from risk upon removal</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-600 mb-3">H&C Applications</h4>
                    <p className="text-gray-700">
                      Consider humanitarian factors, including establishment in Canada, family hardship, and the best
                      interests of children
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* PRRA CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Pre-Removal Risk Assessment</h3>
                <p className="text-xl mb-6 text-white/90">Removal proceedings underway? Take the Next Step.</p>
                <p className="mb-8 text-white/80">
                  If you've been notified of removal from Canada, you may qualify to apply for a Pre-Removal Risk
                  Assessment (PRRA). We can help you understand the process and support you in preparing your
                  application.
                </p>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Schedule Consultation
                  </Button>
                </Link>
                <p className="text-sm text-white/70 mt-4">
                  Schedule a consultation with a licensed RCIC-IRB, recognized by the College of Immigration and
                  Citizenship Consultants to represent individuals in protection and risk assessment matters.
                </p>
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="italic text-white/90">
                    "Even at the edge of removal, hope remains. One well-prepared voice can still turn the tide toward
                    protection."
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* H&C Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Humanitarian & Compassionate Applications
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The Humanitarian and Compassionate (H&C) application is a discretionary pathway to permanent residence in
              Canada for individuals who do not qualify under regular immigration programs. It allows Immigration,
              Refugees and Citizenship Canada (IRCC) to grant exemptions from specific immigration requirements when
              compelling personal circumstances justify special consideration.
            </p>
          </motion.div>

          {/* Key Factors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Key Factors Considered in an H&C Application
            </h3>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              IRCC officers assess "all the circumstances" of your case, with particular focus on:
            </p>
            <div className="space-y-12">
              {hcFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <factor.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900 mb-3">{factor.title}</h4>
                          <p className="text-gray-600 mb-6 leading-relaxed">{factor.description}</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {factor.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Important Notes about H&C Applications
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Scale,
                  title: "Discretionary Process",
                  description:
                    "H&C is not a right—approval is at the discretion of an IRCC officer under Section 25(1) of the IRPA.",
                },
                {
                  icon: AlertTriangle,
                  title: "No Alternative Options",
                  description:
                    "Generally pursued when no other immigration class (economic, family, protected person) is available.",
                },
                {
                  icon: FileText,
                  title: "Personal Statement is Crucial",
                  description:
                    "A strong and honest narrative detailing your life, challenges, and connections in Canada is vital to success.",
                },
                {
                  icon: BookOpen,
                  title: "Supporting Evidence Required",
                  description:
                    "Documents such as medical records, support letters, proof of community involvement, and employment history help prove the merits of your case.",
                },
              ].map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                        <note.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">{note.title}</h4>
                      <p className="text-gray-600">{note.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fees */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <DollarSign className="w-8 h-8 text-gray-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Application Fees</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Adult Application</h4>
                    <p className="text-3xl font-bold text-red-600 mb-2">$550</p>
                    <p className="text-sm text-gray-600">Per adult applicant (18+ years)</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Child Application</h4>
                    <p className="text-3xl font-bold text-red-600 mb-2">$150</p>
                    <p className="text-sm text-gray-600">Per child applicant (under 18 years)</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Fees are submitted with Form IMM 5283 and are non-refundable regardless of the application outcome.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* H&C CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-gradient-to-r from-pink-500 to-red-600 text-white">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Humanitarian & Compassionate Applications</h3>
                <p className="text-xl mb-6 text-white/90">Experiencing hardship in Canada? Take the Next Step.</p>
                <p className="mb-8 text-white/80">
                  If you are not eligible under other immigration categories, you may request permanent residence based
                  on humanitarian and compassionate grounds. This discretionary process considers personal hardship and
                  establishment in Canada.
                </p>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Book Consultation
                  </Button>
                </Link>
                <p className="text-sm text-white/70 mt-4">
                  Book a consultation with a Regulated Canadian Immigration Consultant (RCIC-IRB) to assess your
                  eligibility and receive guidance on preparing a well-supported H&C application.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Need Expert Protection Assistance?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Refugee protection, PRRA, and H&C applications are complex legal processes that require expert guidance.
              Don't navigate these critical applications alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Emergency Consultation
                </Button>
              </Link>
              <Link href="/resources">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent"
                >
                  <BookOpen className="mr-2 w-5 h-5" />
                  Protection Resources
                </Button>
              </Link>
            </div>
          </motion.div>
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

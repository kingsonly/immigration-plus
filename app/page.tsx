"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ChevronDown,
  MapPin,
  Users,
  GraduationCap,
  Briefcase,
  Heart,
  Home,
  Calendar,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Star,
  Award,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const services = [
    {
      icon: Home,
      title: "Permanent Residency (PR)",
      description: "Your pathway to calling Canada home permanently",
      details:
        "Permanent Residency allows you to live, work, and study anywhere in Canada. Through various programs like Express Entry, you can build a new life in one of the world's most welcoming countries.",
      color: "from-red-500 to-red-600",
      href: "/services/permanent-residency",
    },
    {
      icon: Briefcase,
      title: "Start-Up Visa Program",
      description: "Turn your innovative business idea into Canadian success",
      details:
        "The Start-up Visa Program targets immigrant entrepreneurs with innovative business ideas and the potential to create jobs for Canadians and compete on a global scale.",
      color: "from-red-600 to-pink-600",
      href: "/services/business-immigration",
    },
    {
      icon: Users,
      title: "Business & Investor Immigration",
      description: "Invest in your future and Canada's economy",
      details:
        "Various investor and business immigration programs allow you to immigrate to Canada by making a significant investment or starting a business that benefits the Canadian economy.",
      color: "from-pink-600 to-red-500",
      href: "/services/business-immigration",
    },
    {
      icon: GraduationCap,
      title: "Study",
      description: "Educational opportunities await",
      details:
        "Study permits allow international students to pursue education in Canada.",
      color: "from-red-500 to-red-700",
      href: "/services/study-work-permits",
    },
    {
      icon: GraduationCap,
      title: "Work Permits",
      description: "career opportunities await",
      details:
        "Work permits provide opportunities to gain valuable Canadian work experience.",
      color: "from-red-500 to-red-700",
      href: "/services/study-work-permits",
    },
    {
      icon: MapPin,
      title: "Visitors Visa",
      description: "Welcome visitors from around the world",
      details: "Visitors visas allow you to visit Canada for a specific period of time.",
      color: "from-red-700 to-pink-500",
      href: "/services/pnp",
    },
    {
      icon: Heart,
      title: "Family Sponsorship",
      description: "Reunite with your loved ones in Canada",
      details:
        "Sponsor your spouse, children, parents, or grandparents to join you in Canada. Family reunification is a cornerstone of Canadian immigration policy.",
      color: "from-pink-500 to-red-600",
      href: "/services/family-sponsorship",
    },
  ]

  const stats = [
    { icon: Users, number: "500+", label: "Successful Applications" },
    { icon: Globe, number: "50+", label: "Countries Served" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: Star, number: "98%", label: "Success Rate" },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <motion.div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-pink-50" style={{ y }} />

        {/* Animated Background Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-pink-200 to-red-200 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="text-gray-900">Your Canadian Dream</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              TENTACULAR IMMIGRATION SOLUTIONS LTD guides you through every step of your Canadian immigration journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/services">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full"
                  >
                    Free Consultation
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-8 h-8 text-red-500" />
        </motion.div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Services Journey */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Your Immigration Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the pathway that's right for you. Each route offers unique opportunities to build your future in
              Canada.
            </p>
          </motion.div>

          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`service-section relative ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex flex-col lg:flex items-center gap-12`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center transform rotate-12`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-lg text-red-600 font-medium">{service.description}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">{service.details}</p>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Expert guidance throughout the process</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Personalized strategy for your situation</span>
                  </div>
                  <Link href={service.href}>
                    <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Visual Element */}
                <div className="flex-1 flex justify-center">
                  <motion.div
                    className={`w-80 h-80 bg-gradient-to-br ${service.color} rounded-3xl transform rotate-6 flex items-center justify-center relative overflow-hidden`}
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
                    <service.icon className="w-32 h-32 text-white/80" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
              "radial-gradient(circle at 75% 75%, white 2px, transparent 2px)",
              "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Canadian Journey?</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Book a consultation with our expert immigration consultants and take the first step towards your new life
              in Canada.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Free Consultation</h3>
                  <p className="text-white/80 text-sm">30-minute initial assessment</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Quick Response</h3>
                  <p className="text-white/80 text-sm">Same-day consultation booking</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Expert Guidance</h3>
                  <p className="text-white/80 text-sm">Licensed immigration consultants</p>
                </CardContent>
              </Card>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 text-lg px-12 py-4 rounded-full font-semibold"
                >
                  <Calendar className="mr-3 w-5 h-5" />
                  Book Your Free Consultation
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-xl">Coming2Canada</span>
              </div>
              <p className="text-gray-400 mb-4">TENTACULAR IMMIGRATION SOLUTIONS LTD</p>
              <p className="text-gray-400">Your trusted partner for Canadian immigration success.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services/permanent-residency" className="hover:text-white">
                    Permanent Residency
                  </Link>
                </li>
                <li>
                  <Link href="/services/business-immigration" className="hover:text-white">
                    Business Immigration
                  </Link>
                </li>
                <li>
                  <Link href="/services/study-work-permits" className="hover:text-white">
                    Study & Work Permits
                  </Link>
                </li>
                <li>
                  <Link href="/services/family-sponsorship" className="hover:text-white">
                    Family Sponsorship
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="hover:text-white">
                    Immigration Programs
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="hover:text-white">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@coming2canada.co</p>
                <p>📞 +1 (XXX) XXX-XXXX</p>
                <p>📍 Canada</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TENTACULAR IMMIGRATION SOLUTIONS LTD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Users, CheckCircle, Target, Heart, Shield, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import HomePageSkeleton from "../pageSkeletons/HomePageSkeleton"

export default function AboutPageComponent({ value }: { value: any }) {
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    if (value) {
      setData(value)
      console.log("full test", value);
    }

  }, [value])

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our dealings, ensuring transparency and honesty throughout your immigration journey.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We understand that immigration is a life-changing decision. We approach each case with empathy and genuine care for your success.",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Our commitment to excellence drives us to stay updated with the latest immigration laws and provide superior service quality.",
    },
    {
      icon: Clock,
      title: "Reliability",
      description:
        "We respect your time and deadlines, ensuring timely responses and efficient processing of your immigration applications.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Senior Immigration Consultant",
      credentials: "RCIC, MBA",
      experience: "12+ years",
      specialization: "Express Entry, PNP Programs",
    },
    {
      name: "Michael Chen",
      role: "Business Immigration Specialist",
      credentials: "RCIC, CPA",
      experience: "10+ years",
      specialization: "Start-up Visa, Investor Programs",
    },
    {
      name: "Priya Patel",
      role: "Family Sponsorship Expert",
      credentials: "RCIC, LLB",
      experience: "8+ years",
      specialization: "Spouse, Parent & Grandparent Sponsorship",
    },
  ]

  const achievements = [
    { number: "500+", label: "Successful Applications" },
    { number: "50+", label: "Countries Served" },
    { number: "15+", label: "Years Combined Experience" },
    { number: "98%", label: "Client Satisfaction Rate" },
  ]

  if (!data) return <HomePageSkeleton />

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
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">About Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">

              TENTACULAR IMMIGRATION SOLUTIONS LTD is your trusted partner in navigating the complex world of Canadian
              immigration. With years of experience and a passion for helping dreams come true, we're here to guide you
              every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded with a vision to make Canadian immigration accessible and successful for everyone, TENTACULAR
                  IMMIGRATION SOLUTIONS LTD has been helping individuals and families achieve their Canadian dreams for
                  over a decade.
                </p>
                <p>
                  Our journey began when our founder experienced firsthand the challenges of navigating Canada's
                  immigration system. This personal experience ignited a passion to help others avoid the same pitfalls
                  and achieve success in their immigration journey.
                </p>
                <p>
                  Today, we're proud to be one of Canada's most trusted immigration consulting firms, with a track
                  record of success that speaks for itself. Our team of licensed consultants brings together decades of
                  combined experience and a deep understanding of Canadian immigration law.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl transform rotate-3 flex items-center justify-center relative overflow-hidden">
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
                <MapPin className="w-32 h-32 text-white/80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape how we serve our clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our licensed immigration consultants bring years of experience and expertise to your case
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-red-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 mb-2">{member.credentials}</p>
                    <p className="text-gray-600 mb-3">{member.experience}</p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 font-medium">Specialization:</p>
                      <p className="text-sm text-gray-600">{member.specialization}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Numbers that reflect our commitment to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{achievement.number}</div>
                <div className="text-white/90 text-lg">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's what sets us apart from other immigration consulting firms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Licensed and regulated immigration consultants",
              "Personalized approach to each case",
              "Up-to-date knowledge of immigration laws",
              "Transparent fee structure with no hidden costs",
              "Multilingual support team",
              "End-to-end service from consultation to landing",
              "Strong track record of successful applications",
              "Ongoing support even after you arrive in Canada",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Work With Us?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss your immigration goals and create a personalized strategy for your success.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
              >
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  FileText,
  Calculator,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Calendar,
  User,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Resources", count: 24 },
    { id: "guides", label: "Immigration Guides", count: 8 },
    { id: "checklists", label: "Checklists", count: 6 },
    { id: "calculators", label: "Calculators", count: 4 },
    { id: "news", label: "Immigration News", count: 6 },
  ]

  const featuredResources = [
    {
      title: "Complete Express Entry Guide 2024",
      description:
        "Everything you need to know about Canada's Express Entry system, including CRS calculator, document requirements, and step-by-step application process.",
      type: "guide",
      category: "guides",
      readTime: "15 min read",
      downloadCount: "2.5K",
      lastUpdated: "2024-01-15",
      featured: true,
      icon: BookOpen,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Provincial Nominee Program Comparison",
      description:
        "Compare all Canadian PNP programs side-by-side. Find the best province for your profile with our comprehensive comparison tool.",
      type: "calculator",
      category: "calculators",
      readTime: "Interactive",
      downloadCount: "1.8K",
      lastUpdated: "2024-01-10",
      featured: true,
      icon: Calculator,
      color: "from-red-600 to-pink-600",
    },
    {
      title: "Document Checklist for PR Applications",
      description:
        "Never miss a document again! Complete checklist for permanent residency applications with tips on how to obtain each document.",
      type: "checklist",
      category: "checklists",
      readTime: "5 min read",
      downloadCount: "3.2K",
      lastUpdated: "2024-01-12",
      featured: true,
      icon: CheckCircle,
      color: "from-pink-600 to-red-500",
    },
  ]

  const resources = [
    {
      title: "How to Improve Your CRS Score",
      description: "Proven strategies to boost your Comprehensive Ranking System score and get an ITA faster.",
      type: "guide",
      category: "guides",
      readTime: "8 min read",
      author: "Sarah Johnson",
      date: "2024-01-20",
      tags: ["Express Entry", "CRS", "Tips"],
    },
    {
      title: "Study Permit Application Checklist",
      description: "Complete list of documents and requirements for Canadian study permit applications.",
      type: "checklist",
      category: "checklists",
      readTime: "3 min read",
      author: "Michael Chen",
      date: "2024-01-18",
      tags: ["Study Permit", "Students", "Documents"],
    },
    {
      title: "Business Immigration Requirements Calculator",
      description: "Calculate if you meet the requirements for various Canadian business immigration programs.",
      type: "calculator",
      category: "calculators",
      readTime: "Interactive",
      author: "Priya Patel",
      date: "2024-01-16",
      tags: ["Business Immigration", "Calculator", "Requirements"],
    },
    {
      title: "New Immigration Pathways Announced for 2024",
      description: "Latest updates on new immigration programs and changes to existing pathways.",
      type: "news",
      category: "news",
      readTime: "6 min read",
      author: "Immigration Team",
      date: "2024-01-22",
      tags: ["News", "2024", "Updates"],
    },
    {
      title: "Family Sponsorship Processing Times",
      description: "Current processing times for all family sponsorship programs with tips to avoid delays.",
      type: "guide",
      category: "guides",
      readTime: "10 min read",
      author: "Sarah Johnson",
      date: "2024-01-14",
      tags: ["Family Sponsorship", "Processing Times", "Tips"],
    },
    {
      title: "Language Test Preparation Guide",
      description: "How to prepare for IELTS, CELPIP, TEF, and TCF tests to maximize your language scores.",
      type: "guide",
      category: "guides",
      readTime: "12 min read",
      author: "Michael Chen",
      date: "2024-01-10",
      tags: ["Language Tests", "IELTS", "CELPIP", "Preparation"],
    },
  ]

  const tools = [
    {
      name: "CRS Score Calculator",
      description: "Calculate your Comprehensive Ranking System score for Express Entry",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
      link: "#",
    },
    {
      name: "Processing Time Tracker",
      description: "Track current processing times for all immigration programs",
      icon: Clock,
      color: "from-green-500 to-green-600",
      link: "#",
    },
    {
      name: "Document Checklist Generator",
      description: "Generate personalized document checklists for your application",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      link: "#",
    },
    {
      name: "Cost Calculator",
      description: "Calculate total costs for your immigration application",
      icon: Calculator,
      color: "from-orange-500 to-orange-600",
      link: "#",
    },
  ]

  const immigrationNews = [
    {
      title: "Express Entry Draw Results - January 2024",
      summary: "Latest Express Entry draw invited 3,500 candidates with a minimum CRS score of 524.",
      date: "2024-01-24",
      category: "Express Entry",
      urgent: false,
    },
    {
      title: "New Provincial Nominee Allocations Announced",
      summary: "IRCC announces increased PNP allocations for 2024, with Ontario receiving the largest increase.",
      date: "2024-01-22",
      category: "PNP",
      urgent: true,
    },
    {
      title: "Changes to Study Permit Requirements",
      summary: "New financial requirements and attestation letters now required for study permit applications.",
      date: "2024-01-20",
      category: "Study Permits",
      urgent: true,
    },
    {
      title: "Family Sponsorship Program Updates",
      summary: "Processing times reduced for spouse sponsorship applications, new online portal launched.",
      date: "2024-01-18",
      category: "Family Sponsorship",
      urgent: false,
    },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
                Immigration Resources
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access our comprehensive library of immigration guides, tools, calculators, and up-to-date news to help
              you navigate your Canadian immigration journey with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-400 w-5 h-5" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
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
                Featured Resources
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and comprehensive immigration resources
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <resource.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{resource.readTime}</span>
                      <span>{resource.downloadCount} downloads</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Updated {new Date(resource.lastUpdated).toLocaleDateString()}
                      </span>
                      <Button className={`bg-gradient-to-r ${resource.color} hover:opacity-90`}>
                        Access Resource
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Immigration Tools */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Immigration Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive tools to help you assess your eligibility and plan your immigration journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{tool.name}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Immigration News */}
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
                Latest Immigration News
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest changes and announcements in Canadian immigration
            </p>
          </motion.div>

          <div className="space-y-6">
            {immigrationNews.map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {news.urgent && (
                            <div className="flex items-center space-x-1 text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">URGENT</span>
                            </div>
                          )}
                          <span className="text-sm text-gray-500">{news.category}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{new Date(news.date).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{news.title}</h3>
                        <p className="text-gray-600">{news.summary}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4 bg-transparent">
                        Read More
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              View All News
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Library */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Resource Library</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete collection of immigration guides, checklists, and helpful resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                        {resource.type === "guide" && <BookOpen className="w-4 h-4 text-white" />}
                        {resource.type === "checklist" && <CheckCircle className="w-4 h-4 text-white" />}
                        {resource.type === "calculator" && <Calculator className="w-4 h-4 text-white" />}
                        {resource.type === "news" && <Info className="w-4 h-4 text-white" />}
                      </div>
                      <span className="text-xs text-gray-500 uppercase font-medium">{resource.type}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(resource.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{resource.readTime}</span>
                      <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources found matching your search criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
            <p className="text-xl text-white/90 mb-8">
              Subscribe to our newsletter for the latest immigration news, tips, and resources delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email address" className="flex-1 bg-white" />
              <Button className="bg-white text-red-600 hover:bg-gray-100 font-semibold">Subscribe</Button>
            </div>
            <p className="text-white/70 text-sm mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Need Personalized Guidance?</h2>
            <p className="text-xl text-gray-600 mb-8">
              While our resources provide valuable information, every immigration case is unique. Get personalized
              advice from our expert consultants.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
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

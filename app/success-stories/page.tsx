"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote, MapPin, Calendar, ChevronLeft, ChevronRight, Play, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SuccessStoriesPage() {
  const [activeStory, setActiveStory] = useState(0)

  const featuredStories = [
    {
      name: "Sarah & Michael Chen",
      country: "Singapore",
      program: "Express Entry - Federal Skilled Worker",
      timeline: "8 months",
      image: "/placeholder.svg?height=400&width=400",
      quote:
        "TENTACULAR IMMIGRATION made our Canadian dream come true. Their expertise and guidance throughout the Express Entry process was invaluable.",
      story:
        "Sarah and Michael were both software engineers working in Singapore when they decided to immigrate to Canada for better opportunities and quality of life. Despite having strong profiles, they were overwhelmed by the complexity of the immigration process. Our team helped them optimize their CRS score, prepare their documents, and navigate the Express Entry system. They received their Invitation to Apply (ITA) within 3 months and landed in Toronto 8 months later. Today, they both work for leading tech companies and have purchased their first home in Canada.",
      outcome: "Now permanent residents living in Toronto, both employed in their field",
      category: "skilled-worker",
    },
    {
      name: "Priya Patel",
      country: "India",
      program: "Provincial Nominee Program - Ontario",
      timeline: "14 months",
      image: "/placeholder.svg?height=400&width=400",
      quote:
        "The PNP process seemed impossible until I found TENTACULAR IMMIGRATION. They made everything clear and manageable.",
      story:
        "Priya was a marketing manager in Mumbai who wanted to immigrate to Canada but didn't meet the Express Entry cut-off scores. Our team identified that she was an excellent candidate for Ontario's Human Capital Priorities stream. We helped her improve her language scores, get her credentials assessed, and prepare a compelling application. After receiving her provincial nomination, her CRS score increased by 600 points, guaranteeing her an ITA in the next draw. She now works for a major marketing agency in Toronto and is planning to bring her parents to Canada.",
      outcome: "Marketing Director at a Fortune 500 company in Toronto",
      category: "pnp",
    },
    {
      name: "Ahmed & Fatima Al-Rashid",
      country: "UAE",
      program: "Start-up Visa Program",
      timeline: "18 months",
      image: "/placeholder.svg?height=400&width=400",
      quote:
        "Our innovative fintech startup found its home in Canada thanks to the exceptional guidance from TENTACULAR IMMIGRATION.",
      story:
        "Ahmed and Fatima had developed a revolutionary fintech solution in Dubai but wanted to scale their business in Canada's thriving tech ecosystem. The Start-up Visa Program was perfect for them, but the process was complex. Our business immigration specialists helped them connect with a designated organization, refine their business plan, and navigate the application process. Their startup has now raised $2M in Series A funding and employs 15 people in Vancouver.",
      outcome: "Successfully launched fintech startup with $2M funding",
      category: "business",
    },
    {
      name: "Maria Rodriguez",
      country: "Mexico",
      program: "Family Sponsorship - Spouse",
      timeline: "11 months",
      image: "/placeholder.svg?height=400&width=400",
      quote:
        "Being separated from my husband was heartbreaking. TENTACULAR IMMIGRATION reunited our family faster than we expected.",
      story:
        "Maria's husband had immigrated to Canada two years earlier, and they were struggling with the family sponsorship process on their own. The application had been delayed due to incomplete documentation and procedural errors. Our family immigration specialists took over the case, identified the issues, and resubmitted a comprehensive application with all required supporting documents. Maria was reunited with her husband in Calgary and now works as a nurse at a local hospital.",
      outcome: "Reunited with family, working as a registered nurse in Calgary",
      category: "family",
    },
  ]

  const testimonials = [
    {
      name: "David Kim",
      country: "South Korea",
      program: "Canadian Experience Class",
      rating: 5,
      text: "Professional, knowledgeable, and always available to answer questions. They made my PR application stress-free.",
    },
    {
      name: "Elena Volkov",
      country: "Russia",
      program: "Federal Skilled Trades",
      rating: 5,
      text: "I thought my trade skills wouldn't be enough, but they showed me the perfect pathway. Now I'm a permanent resident!",
    },
    {
      name: "James Thompson",
      country: "UK",
      program: "Provincial Nominee Program",
      rating: 5,
      text: "The team's expertise in PNP programs is outstanding. They found the perfect province match for my profile.",
    },
    {
      name: "Aisha Okonkwo",
      country: "Nigeria",
      program: "Study Permit to PR",
      rating: 5,
      text: "From study permit to permanent residency - they guided me through every step of my Canadian journey.",
    },
  ]

  const statistics = [
    { number: "500+", label: "Success Stories", icon: Users },
    { number: "98%", label: "Approval Rate", icon: Star },
    { number: "50+", label: "Countries", icon: MapPin },
    { number: "15+", label: "Years Experience", icon: Calendar },
  ]

  const categories = [
    { id: "all", label: "All Stories", count: featuredStories.length },
    { id: "skilled-worker", label: "Skilled Workers", count: 1 },
    { id: "pnp", label: "Provincial Nominees", count: 1 },
    { id: "business", label: "Business Immigration", count: 1 },
    { id: "family", label: "Family Sponsorship", count: 1 },
  ]

  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredStories =
    selectedCategory === "all"
      ? featuredStories
      : featuredStories.filter((story) => story.category === selectedCategory)

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % filteredStories.length)
  }

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + filteredStories.length) % filteredStories.length)
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real stories from real people who achieved their Canadian immigration dreams with our help. These success
              stories represent the dedication, expertise, and personalized approach we bring to every case.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
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
      </section>

      {/* Featured Stories */}
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
                Featured Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our clients achieved their Canadian immigration goals
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setActiveStory(0)
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                  : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200"
                  }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Story Carousel */}
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-96 lg:h-auto">
                    <img
                      src={filteredStories[activeStory].image || "/placeholder.svg"}
                      alt={filteredStories[activeStory].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{filteredStories[activeStory].name}</h3>
                      <p className="text-white/90">From {filteredStories[activeStory].country}</p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Program</p>
                        <p className="font-semibold text-gray-900">{filteredStories[activeStory].program}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Timeline</p>
                        <p className="font-semibold text-gray-900">{filteredStories[activeStory].timeline}</p>
                      </div>
                    </div>

                    <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                      "{filteredStories[activeStory].quote}"
                    </blockquote>

                    <p className="text-gray-600 mb-6 leading-relaxed">{filteredStories[activeStory].story}</p>

                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-600 mb-1">Current Status:</p>
                      <p className="font-semibold text-gray-900">{filteredStories[activeStory].outcome}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={prevStory}
                          className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={nextStory}
                          className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {filteredStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeStory ? "bg-red-500" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from more clients who trusted us with their immigration journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.country}</p>
                      <p className="text-sm text-red-600 font-medium">{testimonial.program}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
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
                Video Testimonials
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch our clients share their immigration success stories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Roberto Silva",
                country: "Brazil",
                program: "Express Entry",
                thumbnail: "/placeholder.svg?height=300&width=400",
              },
              {
                name: "Li Wei",
                country: "China",
                program: "PNP - British Columbia",
                thumbnail: "/placeholder.svg?height=300&width=400",
              },
              {
                name: "Olumide Johnson",
                country: "Nigeria",
                program: "Family Sponsorship",
                thumbnail: "/placeholder.svg?height=300&width=400",
              },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-red-600 ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{video.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{video.country}</p>
                    <p className="text-sm text-red-600 font-medium">{video.program}</p>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of successful immigrants who trusted us with their Canadian dreams. Your success story could
              be next!
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
              >
                Start Your Journey Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

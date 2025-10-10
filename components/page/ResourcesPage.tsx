"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

type CTA = { label: string; url: string; variant?: string; icon?: string };

type LandingProps = {
  hero: {
    title: string;
    subtitle: string;
    description: string; // HTML
    ctas: CTA[];
  };
  featuredHeading: { heading: string; description?: string; cta?: CTA };
  featured: Array<{
    title: string;
    description: string;
    type: string;
    category: string;
    readTime: string;
    downloadCount: string;
    lastUpdatedLabel: string; // preformatted on server
    featured: boolean;
    icon: string;
    color: string;
    slug?: string;
  }>;
  toolsHeading: { heading: string; description?: string };
  tools: Array<{
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    link?: string;
    slug?: string;
  }>;
  newsHeading: { heading: string; description?: string };
  news: Array<{
    title: string;
    summary: string;
    dateLabel: string; // preformatted on server
    category: string;
    urgent: boolean;
  }>;
  libraryHeading: { heading: string; description?: string };
  categories: Array<{ id: string; label: string; count: number }>;
  library: Array<{
    title: string;
    description: string;
    type: string;
    category: string;
    readTime: string;
    author: string;
    dateLabel: string; // preformatted on server
    tags: string[];
  }>;
  newsletter: { heading: string; description?: string; cta?: CTA };
};

function IconByName({ name, className }: { name?: string; className?: string }) {
  if (!name) return <Info className={className} />;
  const Comp = (Lucide as any)[name] as React.ComponentType<any>;
  if (!Comp) return <Info className={className} />;
  return <Comp className={className} />;
}

export default function ResourcesPage({ landing }: { landing: LandingProps }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => landing.categories, [landing.categories]);

  const filteredResources = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return landing.library.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(q) ||
        resource.description.toLowerCase().includes(q) ||
        (resource.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesCategory =
        selectedCategory === "all" || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [landing.library, searchTerm, selectedCategory]);

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
                {landing.hero.title}
              </span>
            </h1>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: landing.hero.description }}
            />
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {landing.hero.ctas?.map((cta, i) => (
                <Link key={`${cta.label}-${i}`} href={cta.url || "#"}>
                  <Button
                    size="lg"
                    className={
                      cta.variant === "outline"
                        ? "border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full"
                        : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                    }
                    variant={cta.variant === "outline" ? "outline" : "default"}
                  >
                    {cta.icon && <IconByName name={cta.icon} className="w-5 h-5 mr-2" />}
                    {cta.label}
                  </Button>
                </Link>
              ))}
            </div>
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
                {landing.featuredHeading.heading}
              </span>
            </h2>
            {landing.featuredHeading.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {landing.featuredHeading.description}
              </p>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {landing.featured.map((resource, index) => (
              <motion.div
                key={`${resource.slug ?? resource.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconByName name={resource.icon} className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{resource.readTime}</span>
                      <span>{resource.downloadCount} downloads</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{resource.lastUpdatedLabel}</span>
                      <Link href={resource.slug ? `/resources/${resource.slug}` : "/resources"}>
                        <Button className={`bg-gradient-to-r ${resource.color} hover:opacity-90`}>
                          Access Resource
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
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
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {landing.toolsHeading.heading}
            </h2>
            {landing.toolsHeading.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {landing.toolsHeading.description}
              </p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landing.tools.map((tool, index) => (
              <motion.div
                key={`${tool.slug ?? tool.name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${
                        tool.color ?? "from-red-500 to-red-600"
                      } rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconByName name={tool.icon ?? "Info"} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{tool.name}</h3>
                    {tool.description && (
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    )}
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
                {landing.newsHeading.heading}
              </span>
            </h2>
            {landing.newsHeading.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {landing.newsHeading.description}
              </p>
            )}
          </motion.div>

          <div className="space-y-6">
            {landing.news.map((news, index) => (
              <motion.div
                key={`${news.title}-${index}`}
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
                          <span className="text-sm text-gray-500">{news.dateLabel}</span>
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
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {landing.libraryHeading.heading}
            </h2>
            {landing.libraryHeading.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {landing.libraryHeading.description}
              </p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={`${resource.title}-${index}`}
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
                      <span className="text-xs text-gray-500 uppercase font-medium">
                        {resource.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {(resource.tags || []).slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={`${tag}-${tagIndex}`}
                          className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full"
                        >
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
                        <span>{resource.dateLabel}</span>
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
                  setSearchTerm("");
                  setSelectedCategory("all");
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
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">{landing.newsletter.heading}</h2>
            {landing.newsletter.description && (
              <p className="text-xl text-white/90 mb-8">{landing.newsletter.description}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email address" className="flex-1 bg-white" />
              <Link href={landing.newsletter.cta?.url || "/newsletter"}>
                <Button className="bg-white text-red-600 hover:bg-gray-100 font-semibold">
                  {landing.newsletter.cta?.label ?? "Subscribe"}
                </Button>
              </Link>
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
  );
}

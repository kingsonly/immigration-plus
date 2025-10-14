// components/page/ResourcesLandingClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getIcon } from "@/lib/api/icons";
import type { ResourcesLandingProps } from "@/lib/mappers/resourcesLanding";
import { useMemo, useState } from "react";
import { AlertCircle, BookOpen, Calculator, CheckCircle, Info, User, Calendar, ExternalLink, Lightbulb, Search, Filter, ArrowRight } from "lucide-react";
import { resolveCoverMedia } from "@/lib/utils/cover";

export default function ResourcesLandingClient({ initialData }: { initialData: ResourcesLandingProps }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const typeToGroup = (type?: string | null) => {
    switch (type) {
      case "guide":
        return "guides";
      case "checklist":
        return "checklists";
      case "calculator":
        return "calculators";
      case "news":
        return "news";
      default:
        return "guides";
    }
  };

  const categories = useMemo(() => {
    const counts = initialData.library.reduce<Record<string, number>>((acc, r) => {
      const key = typeToGroup(r.type);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return [
      { id: "all", label: "All Resources", count: initialData.library.length || 0 },
      { id: "guides", label: "Immigration Guides", count: counts["guides"] || 0 },
      { id: "checklists", label: "Checklists", count: counts["checklists"] || 0 },
      { id: "calculators", label: "Calculators", count: counts["calculators"] || 0 },
      { id: "news", label: "Immigration News", count: counts["news"] || 0 },
    ];
  }, [initialData]);

  const filteredResources = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return initialData.library.filter((r) => {
      const matchesSearch =
        !term ||
        r.title.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.tags.some((t) => t.toLowerCase().includes(term));
      const matchesCategory = selectedCategory === "all" || typeToGroup(r.type) === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialData.library, searchTerm, selectedCategory]);

  const renderIcon = (name?: string | null, className = "w-8 h-8 text-white") => {
    const Comp = getIcon(name || "");
    if (!Comp) return null;
    return <Comp className={className} />;
  };

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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {initialData.hero.Title}
              </span>
            </h1>
            {initialData.hero.Subtitle && <p className="text-xl text-gray-700 mb-3">{initialData.hero.Subtitle}</p>}
            {initialData.hero.descriptionHTML && (
              <div
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: initialData.hero.descriptionHTML }}
              />
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {initialData.hero.ctas.map((c, i) => (
                <Link key={i} href={c.url || "#"}>
                  <Button
                    size="lg"
                    className={
                      c.variant === "outline"
                        ? "border-red-500 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full"
                        : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                    }
                    variant={c.variant === "outline" ? "outline" : "default"}
                  >
                    {c.icon && renderIcon(c.icon, "w-5 h-5 mr-2 text-white/95")}
                    {c.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Heading */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {initialData.featuredHeading.Heading}
              </span>
            </h2>
            {initialData.featuredHeading.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{initialData.featuredHeading.description}</p>
            )}
            {initialData.featuredHeading.cta && (
              <div className="mt-4">
                <Link href={initialData.featuredHeading.cta.url}>
                  <Button variant="link" className="text-red-600">
                    {renderIcon(initialData.featuredHeading.cta.icon, "w-4 h-4 mr-1 text-red-600")}
                    {initialData.featuredHeading.cta.label}
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Featured Strip (cards are fully clickable) */}
          <div className="grid lg:grid-cols-3 gap-8">
            {initialData.featuredStrip.map((item, idx) => {
              const href = item.slug ? `/resources/${item.slug}` : "#";
              const { url: coverSrc, alt: coverAlt } = resolveCoverMedia(item);
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }}>
                  <Link href={href} className="block group" aria-label={`Open ${item.title}`}>
                    <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="relative h-40 bg-gray-100 overflow-hidden">
                        <img
                          src={coverSrc}
                          alt={coverAlt || item.title}
                          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                          loading={idx < 2 ? "eager" : "lazy"}
                        />
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className={`w-16 h-16 bg-gradient-to-r ${item.colorClass || "from-red-500 to-red-600"} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          {renderIcon(item.icon, "w-8 h-8 text-white")}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex-1">{item.title}</h3>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <Button className={`bg-gradient-to-r ${item.colorClass || "from-red-500 to-red-600"} hover:opacity-90`}>
                            View
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{initialData.toolsHeading.Heading}</h2>
            {initialData.toolsHeading.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{initialData.toolsHeading.description}</p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialData.tools.map((tool, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tool.colorClass || "from-red-500 to-red-600"} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {renderIcon(tool.icon, "w-8 h-8 text-white")}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{tool.name}</h3>
                    {tool.description && <p className="text-gray-600 text-sm">{tool.description}</p>}
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {initialData.newsHeading.Heading}
              </span>
            </h2>
            {initialData.newsHeading.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{initialData.newsHeading.description}</p>
            )}
          </motion.div>

          <div className="space-y-6">
            {initialData.news.map((news, index) => {
              const href = news.slug ? `/resources/${news.slug}` : "#";
              return (
                <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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
                        <Link href={href} className="md:ml-4">
                          <Button variant="outline" size="sm" className="bg-transparent w-full md:w-auto">
                            Read More
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/resources/browse?category=news">
              <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                View All News
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
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
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label} ({c.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Library */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{initialData.libraryHeading.Heading}</h2>
            {initialData.libraryHeading.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{initialData.libraryHeading.description}</p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const href = resource.slug ? `/resources/${resource.slug}` : "#";
              const { url: coverSrc, alt: coverAlt } = resolveCoverMedia(resource);
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Card className="group h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
                    <div className="relative h-40 bg-gray-100 overflow-hidden">
                      <img
                        src={coverSrc}
                        alt={coverAlt || resource.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
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
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{resource.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{resource.dateLabel}</span>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-sm text-gray-600">{resource.readTime}</span>
                        <Link href={href}>
                          <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources found matching your search criteria.</p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }} className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
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
            <h2 className="text-4xl font-bold text-white mb-6">{initialData.newsletter.Heading}</h2>
            {initialData.newsletter.description && (
              <p className="text-xl text-white/90 mb-8">{initialData.newsletter.description}</p>
            )}
            <NewsletterForm className="max-w-md mx-auto" source="resources-landing" />
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
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full">
                Book Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

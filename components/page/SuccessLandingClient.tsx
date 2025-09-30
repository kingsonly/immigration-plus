"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
import { Star, Quote, MapPin, Calendar, ChevronLeft, ChevronRight, Play, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { SuccessLandingProps } from "@/lib/mappers/successLanding";

function IconByName({ name, className }: { name?: string | null; className?: string }) {
  if (!name) return null;
  const Comp = (Lucide as any)[name] as React.ComponentType<any>;
  if (!Comp) return null;
  return <Comp className={className} />;
}

export default function SuccessLandingClient({ initialData }: { initialData: SuccessLandingProps }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const stories = initialData.carousel.stories;
  const filteredStories = useMemo(
    () => (selectedCategory === "all" ? stories : stories.filter((s) => s.category === selectedCategory)),
    [stories, selectedCategory]
  );

  const [active, setActive] = useState(0);
  const next = () => setActive((p) => (p + 1) % Math.max(1, filteredStories.length));
  const prev = () => setActive((p) => (p - 1 + Math.max(1, filteredStories.length)) % Math.max(1, filteredStories.length));

  const activeStory = filteredStories[active] || filteredStories[0] || stories[0];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{initialData.hero.Title}</span>
            </h1>
            {initialData.hero.Subtitle && <p className="text-xl text-gray-700 mb-3">{initialData.hero.Subtitle}</p>}
            {initialData.hero.descriptionHTML && (
              <div className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: initialData.hero.descriptionHTML }} />
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
                    {c.icon && <IconByName name={c.icon} className="w-5 h-5 mr-2" />}
                    {c.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {initialData.stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {stat.icon ? <IconByName name={stat.icon} className="w-8 h-8 text-white" /> : <Users className="w-8 h-8 text-white" />}
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{initialData.carousel.Heading}</span>
            </h2>
            {initialData.carousel.description && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{initialData.carousel.description}</p>}
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {initialData.carousel.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActive(0);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                    : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Story Carousel */}
          {activeStory && (
            <div className="relative">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-96 lg:h-auto">
                      {/* You can switch to next/image if desired */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeStory.imageUrl || "/placeholder.svg"}
                        alt={activeStory.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{activeStory.name}</h3>
                        {activeStory.country && <p className="text-white/90">From {activeStory.country}</p>}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <Quote className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Program</p>
                          <p className="font-semibold text-gray-900">{activeStory.program || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Timeline</p>
                          <p className="font-semibold text-gray-900">{activeStory.timeline || "—"}</p>
                        </div>
                      </div>

                      {activeStory.quote && <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">"{activeStory.quote}"</blockquote>}
                      {activeStory.story && <p className="text-gray-600 mb-6 leading-relaxed">{activeStory.story}</p>}

                      {activeStory.outcome && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 mb-6">
                          <p className="text-sm text-gray-600 mb-1">Current Status:</p>
                          <p className="font-semibold text-gray-900">{activeStory.outcome}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {Array.from({ length: Math.max(1, Math.min(5, activeStory.rating ?? 5)) }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={prev} className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={next} className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link href={`/success-stories/${activeStory.slug}`}>
                          <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                            Read Full Story
                            <Lucide.ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {filteredStories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === active ? "bg-red-500" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{initialData.testimonials.Heading}</h2>
            {initialData.testimonials.description && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{initialData.testimonials.description}</p>}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {initialData.testimonials.items.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {Array.from({ length: Math.max(1, Math.min(5, t.rating)) }).map((_, k) => (
                        <Star key={k} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{t.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      {t.country && <p className="text-sm text-gray-500">{t.country}</p>}
                      {t.program && <p className="text-sm text-red-600 font-medium">{t.program}</p>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{initialData.videos.Heading}</span>
            </h2>
            {initialData.videos.description && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{initialData.videos.description}</p>}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialData.videos.items.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.thumbnailUrl || "/placeholder.svg"} alt={v.name} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-red-600 ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{v.name}</h3>
                    {v.country && <p className="text-sm text-gray-500 mb-1">{v.country}</p>}
                    {v.program && <p className="text-sm text-red-600 font-medium">{v.program}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">{initialData.cta.Heading}</h2>
            {initialData.cta.description && <p className="text-xl text-white/90 mb-8">{initialData.cta.description}</p>}
            <Link href={initialData.cta.cta?.url || "/contact"}>
              <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold">
                {initialData.cta.cta?.label ?? "Start Your Journey Today"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

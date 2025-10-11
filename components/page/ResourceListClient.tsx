// components/page/ResourceListClient.tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Calculator, CheckCircle, Info, Search, Calendar, User } from "lucide-react";
import Link from "next/link";
import type { ResourceListProps } from "@/lib/mappers/resourceList";
import { resolveCoverMedia } from "@/lib/utils/cover";

function TypeIcon({ t }: { t: string }) {
  if (t === "guide") return <BookOpen className="w-4 h-4 text-white" />;
  if (t === "calculator") return <Calculator className="w-4 h-4 text-white" />;
  if (t === "checklist") return <CheckCircle className="w-4 h-4 text-white" />;
  if (t === "news") return <Info className="w-4 h-4 text-white" />;
  return <Info className="w-4 h-4 text-white" />;
}

export default function ResourceListClient({ data }: { data: ResourceListProps }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return data.items;
    return data.items.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [data.items, searchTerm]);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="py-14 bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {data.heading}
              </span>
            </h1>
            {data.subheading && <p className="text-gray-600">{data.subheading}</p>}

            <div className="mt-6 relative max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search within this list..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No results match your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r, i) => {
                const cover = resolveCoverMedia(r);
                return (
                  <motion.div key={r.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Card className="group h-full hover:shadow-md transition overflow-hidden flex flex-col">
                    <div className="relative h-40 bg-gray-100 overflow-hidden">
                      <img
                        src={cover.url}
                        alt={cover.alt || r.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                        loading={i < 3 ? "eager" : "lazy"}
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                          <TypeIcon t={r.type} />
                        </div>
                        <span className="text-xs text-gray-500 uppercase font-medium">{r.type}</span>
                        </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{r.description}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{r.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{r.dateLabel}</span>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-sm text-gray-600">{r.readTime}</span>
                        <Link href={`/resources/${r.slug}`}>
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
          )}
        </div>
      </section>
    </div>
  );
}

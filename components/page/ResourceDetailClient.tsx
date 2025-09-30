// components/page/ResourceDetailClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, BookOpen, Calculator, CheckCircle, Info, ArrowRight, Tag } from "lucide-react";
import type { ResourceDetailProps, RelatedCard } from "@/lib/mappers/resourceDetail";

function TypeIcon({ type, className }: { type?: string; className?: string }) {
  switch (type) {
    case "guide":
      return <BookOpen className={className} />;
    case "checklist":
      return <CheckCircle className={className} />;
    case "calculator":
      return <Calculator className={className} />;
    case "news":
      return <Info className={className} />;
    default:
      return <Info className={className} />;
  }
}

export default function ResourceDetailClient({
  data,
  related,
}: {
  data: ResourceDetailProps;
  related: RelatedCard[];
}) {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <TypeIcon type={data.type} className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{data.title}</h1>
              {data.excerpt && <p className="text-gray-600 mt-2">{data.excerpt}</p>}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.author && (
              <span className="inline-flex items-center gap-1">
                <User className="w-4 h-4" />
                {data.author}
              </span>
            )}
            {data.publishedLabel && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {data.publishedLabel}
              </span>
            )}
            {data.readTime && <span>• {data.readTime}</span>}
            {data.category?.name && (
              <>
                <span>•</span>
                <Link href={`/resources/browse?category=${data.category.slug || "all"}`} className="underline decoration-red-400 underline-offset-4">
                  {data.category.name}
                </Link>
              </>
            )}
          </div>

          {(data.externalLink || data.toolLink) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {data.toolLink && (
                <Link href={data.toolLink}>
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                    Open Tool
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
              {data.externalLink && (
                <Link href={data.externalLink} target="_blank">
                  <Button variant="outline">External Link</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-red">
          {data.contentHTML ? (
            <div dangerouslySetInnerHTML={{ __html: data.contentHTML }} />
          ) : (
            <p className="text-gray-600">No content available.</p>
          )}

          {/* Tags */}
          {data.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/resources/browse?category=all&q=${encodeURIComponent(t.name)}`}
                    className="px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Card className="h-full hover:shadow-lg transition">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                          <TypeIcon type={r.type} className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-gray-500 uppercase font-medium">{r.type}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{r.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{r.summary}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>{r.category}</span>
                        <span>{r.dateLabel}</span>
                      </div>
                      <Link href={`/resources/${r.slug}`}>
                        <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources">
            <Button variant="outline">← Back to Resources</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

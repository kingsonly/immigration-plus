// components/page/ResourcesIndexClient.tsx
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Calculator, CheckCircle, Info, Search, Calendar, User } from "lucide-react";
import Link from "next/link";
import type { IndexProps } from "@/lib/mappers/resourcesIndex";
import { resolveCoverMedia } from "@/lib/utils/cover";

function TypeIcon({ t }: { t: string }) {
  if (t === "guide") return <BookOpen className="w-4 h-4 text-white" />;
  if (t === "calculator") return <Calculator className="w-4 h-4 text-white" />;
  if (t === "checklist") return <CheckCircle className="w-4 h-4 text-white" />;
  if (t === "news") return <Info className="w-4 h-4 text-white" />;
  return <Info className="w-4 h-4 text-white" />;
}

export default function ResourcesIndexClient({ initial }: { initial: IndexProps }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  // IMPORTANT: Radix <SelectItem> cannot have empty-string value.
  // Use sentinel "all" values in the UI, and translate to empty when building the query.
  const [q, setQ] = useState(initial.q || "");
  const [category, setCategory] = useState(initial.category ? initial.category : "all");
  const [tag, setTag] = useState(initial.tag ? initial.tag : "all");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (category && category !== "all") p.set("category", category);
    if (tag && tag !== "all") p.set("tag", tag);
    p.set("page", "1");
    startTransition(() => router.push(`/resources/browse?${p.toString()}`));
  };

  const onPage = (page: number) => {
    const p = new URLSearchParams(sp?.toString() || "");
    p.set("page", String(page));
    startTransition(() => router.push(`/resources/browse?${p.toString()}`));
  };

  const items = useMemo(() => initial.items, [initial.items]);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header & Filters */}
      <section className="py-14 bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Browse Resources</span>
            </h1>
            <p className="text-gray-600">Search, filter, and explore all resources.</p>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search title or excerpt..."
                  className="pl-10"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {/* UI sentinel "all" (non-empty) */}
                  <SelectItem value="all">All categories</SelectItem>
                  {initial.categoryOptions
                    .filter((c) => c.value) // real values only
                    .map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label || c.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select value={tag} onValueChange={setTag}>
                <SelectTrigger>
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  {/* UI sentinel "all" (non-empty) */}
                  <SelectItem value="all">All tags</SelectItem>
                  {initial.tagOptions
                    .filter((t) => t.value) // real values only
                    .map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label || t.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <div className="md:col-span-4 flex gap-3">
                <Button type="submit" disabled={pending} className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                  {pending ? "Filtering..." : "Apply Filters"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setQ("");
                    setCategory("all");
                    setTag("all");
                    startTransition(() => router.push("/resources/browse"));
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No results. Try different filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((r, i) => {
                const cover = resolveCoverMedia(r);
                return (
                  <motion.div
                    key={r.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
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

                        <div className="flex flex-wrap gap-1 mb-4">
                          {r.tags.slice(0, 3).map((t) => (
                            <Link key={t} href={`/resources/tag/${encodeURIComponent(t.toLowerCase().replace(/\s+/g, "-"))}`}>
                              <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full">{t}</span>
                            </Link>
                          ))}
                        </div>

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

          {/* Pager */}
          {initial.pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                disabled={initial.page <= 1 || pending}
                onClick={() => onPage(initial.page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {initial.page} / {initial.pageCount} • {initial.total} total
              </span>
              <Button
                variant="outline"
                disabled={initial.page >= initial.pageCount || pending}
                onClick={() => onPage(initial.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

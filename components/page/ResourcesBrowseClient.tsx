// components/page/ResourcesBrowseClient.tsx
"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Calculator, CheckCircle, Info, Calendar, User, ArrowRight, Search, Filter } from "lucide-react";

export type BrowseClientProps = {
  // echo filters back
  q: string;
  category: string; // "all" or slug
  type: string;     // "__any" | specific type
  page: number;
  pageSize: number;

  // options
  categoryOptions: Array<{ id: string; label: string; count: number }>;
  typeOptions: Array<{ id: string; label: string }>;

  // list
  items: Array<{
    slug: string;
    title: string;
    description: string;
    type: string;      // guide | checklist | calculator | news
    category: string;  // slug
    readTime: string;
    author: string;
    dateLabel: string;
    tags: string[];
  }>;

  // pagination
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

const TYPE_ANY = "__any";

export default function ResourcesBrowseClient({ initialData }: { initialData: BrowseClientProps }) {
  const router = useRouter();
  const sp = useSearchParams();

  // current state from URL (SSR-safe)
  const q = sp.get("q") ?? initialData.q ?? "";
  const category = sp.get("category") ?? initialData.category ?? "all";

  // For type, never allow an empty string in the Select. Use "__any" for "no filter".
  const typeParam = sp.get("type");
  const type = typeParam && typeParam.length > 0 ? typeParam : (initialData.type || TYPE_ANY);

  const page = Math.max(parseInt(sp.get("page") || String(initialData.page || 1), 10) || 1, 1);
  const pageSize = Math.max(parseInt(sp.get("pageSize") || String(initialData.pageSize || 12), 10) || 12, 1);

  const onSet = (patch: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(sp.toString());

    Object.entries(patch).forEach(([k, v]) => {
      if (k === "type") {
        // translate sentinel to "no filter" (remove query param)
        if (v === TYPE_ANY || v === "" || v === undefined || v === null) {
          params.delete("type");
        } else {
          params.set("type", String(v));
        }
        return;
      }

      if (v === undefined || v === null || v === "" || (k === "category" && v === "all")) {
        if (k === "category") {
          params.set("category", "all"); // keep category explicit
        } else {
          params.delete(k);
        }
      } else {
        params.set(k, String(v));
      }
    });

    // changing filters should reset to page 1
    if ("q" in patch || "category" in patch || "type" in patch || "pageSize" in patch) {
      params.set("page", "1");
    }

    router.push(`/resources/browse?${params.toString()}`);
  };

  const typeOptions = useMemo(() => initialData.typeOptions, [initialData]);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Browse Resources</span>
          </h1>
          <p className="text-gray-600">Search and filter all guides, checklists, calculators and news.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search resources..."
                defaultValue={q}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value;
                    onSet({ q: val });
                  }
                }}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="text-gray-400 w-5 h-5" />

              {/* Category (always non-empty – default "all") */}
              <Select value={category || "all"} onValueChange={(v) => onSet({ category: v })}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  {initialData.categoryOptions.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label} ({c.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type (use sentinel "__any" for “no filter”) */}
              <Select value={type || TYPE_ANY} onValueChange={(v) => onSet({ type: v })}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {initialData.items.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg">No results. Try adjusting your filters.</p>
              <div className="mt-6">
                <Button onClick={() => onSet({ q: "", category: "all", type: TYPE_ANY, page: 1 })}>Clear filters</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialData.items.map((resource, index) => {
                  const href = resource.slug ? `/resources/${resource.slug}` : "#";
                  return (
                    <motion.div
                      key={`${resource.slug}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.06 }}
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
                            {(resource.tags || []).slice(0, 3).map((tag, tagIndex) => (
                              <span key={`${tag}-${tagIndex}`} className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full">
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

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  onClick={() => onSet({ page: Math.max(page - 1, 1) })}
                  disabled={page <= 1}
                >
                  Prev
                </Button>
                <span className="text-sm text-gray-600 px-2">
                  Page {initialData.pagination.page} of {initialData.pagination.pageCount} · {initialData.pagination.total} total
                </span>
                <Button
                  variant="outline"
                  onClick={() => onSet({ page: Math.min(page + 1, initialData.pagination.pageCount) })}
                  disabled={page >= initialData.pagination.pageCount}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Back to Landing */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/resources">
            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              Back to Resources
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

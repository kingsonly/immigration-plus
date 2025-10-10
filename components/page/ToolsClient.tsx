// components/page/ToolsClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Lucide from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ToolsProps } from "@/lib/mappers/tools";

// Resolve Lucide icon by name (safe fallback to a generic icon)
function IconByName({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Comp =
    (name && (Lucide as any)[name as keyof typeof Lucide]) || (Lucide as any).Tool;
  const Icon = (Comp || Lucide.Tool) as React.ComponentType<{ className?: string }>;
  return <Icon className={className} />;
}

export default function ToolsClient({ initialData }: { initialData: ToolsProps }) {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero / Heading */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              {initialData.heading}
            </span>
          </motion.h1>
          {initialData.description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {initialData.description}
            </motion.p>
          )}
        </div>
      </section>

      {/* Tools grid */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialData.items.map((tool, index) => {
              const color = tool.colorClass || "from-red-500 to-red-600";
              const actionLabel = tool.isExternal ? "Open Tool" : "Coming Soon";

              return (
                <motion.div
                  key={`${tool.slug}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconByName name={tool.icon} className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                      {tool.description && (
                        <p className="text-gray-600 text-sm mb-5">{tool.description}</p>
                      )}

                      {/* Action button:
                          - External URL → open in new tab
                          - No external URL → go to /tools/[slug] where a “Coming Soon” message is shown */}
                      {tool.isExternal ? (
                        <a
                          href={tool.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-gradient-to-r ${color} hover:opacity-90 transition`}
                        >
                          {actionLabel}
                        </a>
                      ) : (
                        <Link href={tool.href} className="inline-block">
                          <Button
                            className={`bg-gradient-to-r ${color} hover:opacity-90`}
                          >
                            {actionLabel}
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

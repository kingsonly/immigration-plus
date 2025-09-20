"use client"

import { LucideIcon } from "../LucideIcon/LucideIcon"
import { Card, CardContent } from "@/components/ui/card"

type Block = any

export default function ServiceBlocks({ blocks }: { blocks: Block[] }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <div className="min-h-screen bg-white pt-16">
      {blocks.map((block: any, idx: number) => {
        switch (block.__component) {
          case "blocks.hero": {
            const iconName = block?.iconName || block?.icon || undefined
            return (
              <section key={idx} className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  {iconName && (
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <LucideIcon name={iconName} className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                      {block?.title || ""}
                    </span>
                  </h1>
                  {block?.subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{block.subtitle}</p>}
                </div>
              </section>
            )
          }
          case "blocks.heading-section": {
            return (
              <section key={idx} className="py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  {block?.Heading && <h2 className="text-4xl font-bold mb-4">{block.Heading}</h2>}
                  {block?.description && <p className="text-xl text-gray-600">{block.description}</p>}
                </div>
              </section>
            )
          }
          case "blocks.process-steps-block": {
            const steps = Array.isArray(block?.steps) ? block.steps : []
            return (
              <section key={idx} className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {(block?.title || block?.description) && (
                    <div className="text-center mb-12">
                      {block?.title && <h2 className="text-4xl font-bold mb-2">{block.title}</h2>}
                      {block?.description && <p className="text-xl text-gray-600">{block.description}</p>}
                    </div>
                  )}
                  <div className="space-y-6">
                    {steps.map((s: any, i: number) => (
                      <Card key={i} className="">
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold">
                            {s?.stepNumber || s?.step || i + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{s?.title || s?.heading || "Step"}</h3>
                            {s?.description || s?.text ? (
                              <p className="text-gray-600">{s?.description || s?.text}</p>
                            ) : null}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )
          }
          case "blocks.card-grid": {
            const cards = Array.isArray(block?.Cards) ? block.Cards : []
            return (
              <section key={idx} className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {(block?.Heading || block?.description) && (
                    <div className="text-center mb-12">
                      {block?.Heading && <h2 className="text-4xl font-bold mb-2">{block.Heading}</h2>}
                      {block?.description && <p className="text-xl text-gray-600">{block.description}</p>}
                    </div>
                  )}
                  <div className="grid md:grid-cols-3 gap-6">
                    {cards.map((c: any, i: number) => (
                      <Card key={i} className="h-full">
                        <CardContent className="p-6 text-center">
                          {c?.icon && (
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <LucideIcon name={c.icon} className="w-8 h-8 text-white" />
                            </div>
                          )}
                          {c?.title && <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>}
                          {c?.description && <p className="text-gray-600">{c.description}</p>}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )
          }
          default:
            return null
        }
      })}
    </div>
  )
}


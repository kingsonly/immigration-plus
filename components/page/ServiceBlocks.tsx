"use client"

import { LucideIcon } from "../LucideIcon/LucideIcon"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Block = Record<string, any>

type MaybeString = string | undefined

const pickFirstString = (source: any, keys: string[]): MaybeString => {
  for (const key of keys) {
    const value = source?.[key]
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim()
    }
  }
  return undefined
}

const resolveLinkHref = (link: any): MaybeString => {
  if (!link) return undefined
  if (typeof link === "string" && link.trim()) return link.trim()
  if (typeof link?.url === "string" && link.url.trim()) return link.url.trim()
  if (typeof link?.href === "string" && link.href.trim()) return link.href.trim()
  return undefined
}

const resolveLinkLabel = (link: any): string => {
  if (!link) return "Learn more"
  return link.label || link.text || "Learn more"
}

const renderListItems = (items: any[], iconClass = "text-green-600", textClass = "text-gray-700") => {
  return (
    items
      .map((item, idx) => {
        const text = pickFirstString(item, ["listItem", "title", "text", "description"])
        if (!text) return null
        const icon = pickFirstString(item, ["icon"]) || "CheckCircle2"
        return (
          <li key={idx} className="flex items-start gap-3 text-left">
            <LucideIcon name={icon} className={`w-5 h-5 ${iconClass} mt-1`} />
            <span className={textClass}>{text}</span>
          </li>
        )
      })
      .filter(Boolean) as JSX.Element[]
  )
}

export default function ServiceBlocks({ blocks }: { blocks: Block[] }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <div className="min-h-screen bg-white pt-16">
      {blocks.map((block: Block, idx: number) => {
        const type = block?.__component

        switch (type) {
          case "blocks.hero": {
            const title = pickFirstString(block, ["Title", "title", "Heading"])
            const subtitle = pickFirstString(block, ["Subtitle", "subtitle", "description"])
            const iconName = pickFirstString(block, ["iconName", "icon"])

            return (
              <section key={idx} className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  {iconName && (
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <LucideIcon name={iconName} className="w-10 h-10 text-white" />
                    </div>
                  )}
                  {title && (
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{title}</span>
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
                  )}
                </div>
              </section>
            )
          }

          case "blocks.heading-section": {
            const heading = pickFirstString(block, ["Heading", "title"])
            const description = pickFirstString(block, ["description", "Subtitle", "text"])
            const ctaHref = resolveLinkHref(block?.cta)
            const ctaLabel = resolveLinkLabel(block?.cta)
            const hasCta = Boolean(ctaHref)
            const iconName = pickFirstString(block, ["icon"])
            const sectionClass = hasCta
              ? "py-20 bg-gradient-to-r from-red-500 to-pink-600 text-white"
              : "py-12 bg-white"
            const descClass = hasCta ? "text-xl text-white/90" : "text-xl text-gray-600"

            return (
              <section key={idx} className={sectionClass}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                  {iconName && (
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <LucideIcon name={iconName} className="w-8 h-8 text-white" />
                    </div>
                  )}
                  {heading && <h2 className="text-4xl font-bold mb-2">{heading}</h2>}
                  {description && <p className={descClass}>{description}</p>}
                  {hasCta && ctaHref && (
                    <div className="mt-6">
                      <Link href={ctaHref}>
                        <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold">
                          {ctaLabel}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            )
          }

          case "blocks.process-steps-block": {
            const title = pickFirstString(block, ["title", "Heading"])
            const description = pickFirstString(block, ["description", "Subtitle", "text"])
            const steps = Array.isArray(block?.steps) ? block.steps : []

            return (
              <section key={idx} className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {(title || description) && (
                    <div className="text-center mb-16">
                      {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
                      {description && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>}
                    </div>
                  )}
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-pink-600 hidden lg:block" />
                    <div className="space-y-12">
                      {steps.map((step: any, i: number) => {
                        const stepNumber = pickFirstString(step, ["stepNumber", "step"]) || String(i + 1).padStart(2, "0")
                        const stepTitle = pickFirstString(step, ["title", "heading"]) || "Step"
                        const stepDescription = pickFirstString(step, ["description", "text"])

                        return (
                          <div
                            key={i}
                            className={`flex items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:flex gap-8`}
                          >
                            <div className="flex-1">
                              <Card className="hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                  <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                      <span className="text-white font-bold">{stepNumber}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{stepTitle}</h3>
                                  </div>
                                  {stepDescription && <p className="text-gray-600">{stepDescription}</p>}
                                </CardContent>
                              </Card>
                            </div>
                            <div className="hidden lg:block w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full border-4 border-white shadow-lg" />
                            <div className="flex-1 lg:block hidden" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          case "blocks.card-grid": {
            const heading = pickFirstString(block, ["Heading", "title"])
            const description = pickFirstString(block, ["description", "Subtitle", "text"])
            const cards = Array.isArray(block?.Cards) ? block.Cards : []
            const linkHref = resolveLinkHref(block?.link)
            const linkLabel = resolveLinkLabel(block?.link)

            return (
              <section key={idx} className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  {(heading || description) && (
                    <div className="text-center space-y-4">
                      {heading && <h2 className="text-4xl font-bold">{heading}</h2>}
                      {description && <p className="text-xl text-gray-600">{description}</p>}
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    {cards.map((card: any, cardIdx: number) => {
                      const iconName = pickFirstString(card, ["icon"])
                      const cardTitle = pickFirstString(card, ["title", "Heading"])
                      const cardDescription = pickFirstString(card, ["description", "text"])
                      const cardLinkHref = resolveLinkHref(card?.link)
                      const cardLinkLabel = resolveLinkLabel(card?.link)
                      const lists = Array.isArray(card?.lists) ? card.lists : []

                      return (
                        <Card key={cardIdx} className="h-full">
                          <CardContent className="p-6 text-center space-y-4">
                            {iconName && (
                              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                                <LucideIcon name={iconName} className="w-8 h-8 text-white" />
                              </div>
                            )}
                            {cardTitle && <h3 className="text-xl font-bold text-gray-900">{cardTitle}</h3>}
                            {cardDescription && <p className="text-gray-600">{cardDescription}</p>}
                            {lists.length > 0 && <ul className="mt-4 space-y-3 text-left">{renderListItems(lists)}</ul>}
                            {cardLinkHref && (
                              <div className="pt-2">
                                <Link href={cardLinkHref}>
                                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                                    {cardLinkLabel}
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {linkHref && (
                    <div className="text-center">
                      <Link href={linkHref}>
                        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                          {linkLabel}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            )
          }

          case "blocks.services": {
            const title = pickFirstString(block, ["title", "Heading"])
            const description = pickFirstString(block, ["description", "Subtitle", "text"])
            const details = pickFirstString(block, ["details"])
            const iconName = pickFirstString(block, ["icon"])
            const items = Array.isArray(block?.listItem) ? block.listItem : []
            const linkHref = resolveLinkHref(block?.link)
            const linkLabel = resolveLinkLabel(block?.link)
            const gradient = pickFirstString(block, ["color"]) || "from-red-500 to-red-600"
            const isReverse = Boolean(block?.isReverse)

            return (
              <section key={idx} className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`flex flex-col gap-10 md:gap-16 ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} items-center`}>
                    <div className="flex-1 space-y-6 text-left">
                      {iconName && (
                        <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center text-white`}>
                          <LucideIcon name={iconName} className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {title && <h2 className="text-4xl font-bold text-gray-900">{title}</h2>}
                      {description && <p className="text-xl text-gray-600">{description}</p>}
                      {details && (
                        <div className="prose prose-lg text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: details }} />
                      )}
                      {items.length > 0 && <ul className="space-y-3">{renderListItems(items)}</ul>}
                      {linkHref && (
                        <Link href={linkHref}>
                          <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                            {linkLabel}
                          </Button>
                        </Link>
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <div className={`w-full min-h-[220px] rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center p-8`}>
                        <div className="w-full h-full rounded-3xl bg-white/10 flex items-center justify-center">
                          <LucideIcon name={iconName || "Briefcase"} className="w-20 h-20 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          case "blocks.application-process": {
            const title = pickFirstString(block, ["title", "Heading"])
            const iconName = pickFirstString(block, ["icon"]) || "FileText"
            const items = Array.isArray(block?.items) ? block.items : []
            const renderedItems = renderListItems(items)

            if (!title && renderedItems.length === 0) return null

            return (
              <section key={idx} className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {title && (
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold">{title}</h2>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <ul className="space-y-3">{renderedItems}</ul>
                    <div className="flex justify-center md:justify-end">
                      <div className="w-28 h-28 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                        <LucideIcon name={iconName} className="text-white" size={64} />
                      </div>
                    </div>
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


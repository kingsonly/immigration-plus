"use client"

import { motion } from "framer-motion"
import { Users, CheckCircle, Target, Heart, Shield, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AboutPageComponent from "@/components/page/AboutPageComponent"
import { fetchAboutusPage } from "@/lib/contentfulModules/fetchAboutusPage"

export default async function AboutPage() {
  const value = await fetchAboutusPage()

  return <AboutPageComponent value={value} />
}

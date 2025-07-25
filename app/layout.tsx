import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { MapPin } from "lucide-react"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coming2Canada - Immigration Consulting Services",
  description: "TENTACULAR IMMIGRATION SOLUTIONS LTD - Your trusted partner for Canadian immigration success",
  icons: {
    icon: '/logo.png', // Make sure this path points to your actual favicon file
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-xl">Coming2Canada</span>
                </div>
                <p className="text-gray-400 mb-4">TENTACULAR IMMIGRATION SOLUTIONS LTD</p>
                <p className="text-gray-400">Your trusted partner for Canadian immigration success.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/services/permanent-residency" className="hover:text-white">
                      Permanent Residency
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/business-immigration" className="hover:text-white">
                      Business Immigration
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/study-work-permits" className="hover:text-white">
                      Study & Work Permits
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/family-sponsorship" className="hover:text-white">
                      Family Sponsorship
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs" className="hover:text-white">
                      Immigration Programs
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="hover:text-white">
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/success-stories" className="hover:text-white">
                      Success Stories
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Contact</h3>
                <div className="space-y-2 text-gray-400">
                  <p>📧 info@coming2canada.ca</p>
                  <p>📞 +1 (613) 371-6611</p>
                  <p>📍 Canada</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4"> Immigration Consultant</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link target="_blank" href="https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=40974&b9100e1006f6=2#b9100e1006f6" className="hover:text-white">
                      <Image src="/rcic-irb.jpeg" alt="rcic-irb Logo" width={200} height={100} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 TENTACULAR IMMIGRATION SOLUTIONS LTD. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

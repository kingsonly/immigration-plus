// components/NavigationClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

type MediaAsset = {
  url: string;
  alt: string | null;
};

export type NavDropdown = {
  id: number;
  label: string;
  url?: string | null;
  icon?: string | null;
};

export type NavLink = {
  id: number;
  label: string;
  url?: string | null;
  icon?: string | null;
  image?: MediaAsset | null;
  dropdown?: NavDropdown[];
};

export type HeaderProps = {
  logoLabel?: string;
  logoHref?: string;
  logoImage?: MediaAsset | null;
  nav: NavLink[];
};

function buildFallback(): HeaderProps {
  const nav = [
    { id: 1, label: "Home", url: "/" },
    { id: 2, label: "About", url: "/about" },
    {
      id: 3,
      label: "Services",
      url: "/services",
      dropdown: [
        { id: 31, label: "Permanent Residency", url: "/services/permanent-residency" },
        { id: 32, label: "Business & Investor Immigration", url: "/services/business-immigration" },
        { id: 33, label: "Study", url: "/services/study" },
        { id: 34, label: "Work Permits", url: "/services/work-permit" },
        { id: 35, label: "Family Sponsorship", url: "/services/family-sponsorship" },
        { id: 36, label: "Visitor Visa", url: "/services/visitors-visa" },
        { id: 37, label: "Citizenship & Integration", url: "/services/citizenship" },
        { id: 38, label: "Refugee/Asylum Visa", url: "/services/refugee-hc" },
        { id: 39, label: "Recruitment", url: "/services/recruitment" }
      ]
    },
    { id: 4, label: "Resources", url: "/resources" },
    { id: 5, label: "Success Stories", url: "/success-stories" },
    { id: 6, label: "Contact", url: "/contact" }
  ].map((item) => ({
    ...item,
    image: null,
  })) as NavLink[];

  return {
    logoLabel: "Coming2Canada",
    logoHref: "/",
    logoImage: { url: "/logo.png", alt: "Coming2Canada logo" },
    nav,
  };
}

export default function NavigationClient(props: HeaderProps) {
  const fallbackData = useMemo(() => buildFallback(), []);

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const pathname = usePathname();

  const navItems = props.nav && props.nav.length ? props.nav : fallbackData.nav;
  const logoLabel = props.logoLabel ?? fallbackData.logoLabel;
  const logoHref = props.logoHref ?? fallbackData.logoHref;
  const logoImage = props.logoImage ?? fallbackData.logoImage;
  const logoAlt = logoImage?.alt ?? logoLabel ?? "Site logo";
  const logoSrc = logoImage?.url ?? "/logo.png";

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-16">
          {/* Logo */}
          <Link href={logoHref || "/"} aria-label={logoAlt} className="flex items-center space-x-2">
            <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={100}
                height={100}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="sr-only">{logoLabel}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive =
                item.url && (item.url === "/" ? pathname === "/" : pathname.startsWith(item.url));
              const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0;

              return (
                <div key={item.id} className="relative group">
                  {hasDropdown ? (
                    <div className="relative">
                      <Link
                        href={item.url || "#"}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive ? "text-red-600 bg-red-50" : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                        }`}
                        onMouseEnter={() => setOpenDropdownId(item.id)}
                        onMouseLeave={() => setOpenDropdownId(null)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Link>

                      <div
                        className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}
                      >
                        {item.dropdown!.map((sub) => (
                          <Link
                            key={sub.id}
                            href={sub.url || "#"}
                            className="block px-4 py-3 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.url || "#"}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive ? "text-red-600 bg-red-50" : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0;

                return (
                  <div key={item.id}>
                    {hasDropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenDropdownId((cur) => (cur === item.id ? null : item.id))
                          }
                          className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openDropdownId === item.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdownId === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-1"
                            >
                              {item.dropdown!.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={sub.url || "#"}
                                  className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.url || "#"}
                        className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

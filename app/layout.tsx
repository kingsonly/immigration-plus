// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { fetchGlobal } from "@/lib/api/global";
import NavigationClient from "@/components/navigation";
import FooterDynamic from "@/components/FooterDynamic";

const inter = Inter({ subsets: ["latin"], display: "swap", adjustFontFallback: true, preload: false });

export const metadata: Metadata = {
  title: "Coming2Canada - Immigration Consulting Services",
  description: "TENTACULAR IMMIGRATION SOLUTIONS LTD - Your trusted partner for Canadian immigration success",
  icons: { icon: "/logo.png" },
};

export const dynamic = "force-dynamic"; // reflect header/footer changes immediately

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await fetchGlobal();

  const headerProps = {
    logoLabel: global?.Header?.Logo?.label || "Coming2Canada",
    logoHref: global?.Header?.Logo?.url || "/",
    nav:
      global?.Header?.NavLink?.map((n) => ({
        id: n.id,
        label: n.label,
        url: n.url || "#",
        icon: n.icon || null,
        image: n.image || null,
        dropdown: (n.dropdown || []).map((d) => ({
          id: d.id,
          label: d.label,
          url: d.url || "#",
          icon: d.icon || null,
        })),
      })) || [],
  };

  const footerProps = {
    links:
      global?.Footer?.FooterLinks?.map((n) => ({
        id: n.id,
        label: n.label,
        url: n.url || "#",
      })) || [],
    contactDetails:
      global?.Footer?.ContactDetails?.map((detail) => ({
        id: detail.id,
        label: detail.label || null,
        value: detail.value,
        type: detail.type || null,
        href: detail.href || null,
      })) || [],
    copyright: global?.Footer?.FooterCopyright,
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationClient {...headerProps} />
        {children}
        <FooterDynamic {...footerProps} />
      </body>
    </html>
  );
}

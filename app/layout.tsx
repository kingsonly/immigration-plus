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
    logoLabel: global?.Header?.Logo?.label || global?.Footer?.companyName || global?.siteTitle || "Coming2Canada",
    logoHref: global?.Header?.Logo?.url || "/",
    logoImage: global?.Header?.Logo?.image ?? null,
    nav: global?.Header?.NavLink ?? [],
  };

  const contactDetails = [...(global?.Footer?.ContactDetails ?? [])];
  const email = global?.contactEmail?.trim();

  if (email) {
    const normalizedEmail = email.toLowerCase();
    const hasEmailDetail = contactDetails.some(
      (detail) =>
        detail.type === "email" ||
        (typeof detail.value === "string" && detail.value.toLowerCase() === normalizedEmail)
    );

    if (!hasEmailDetail) {
      contactDetails.unshift({
        id: Number.MAX_SAFE_INTEGER,
        label: "Email",
        value: email,
        type: "email",
        href: `mailto:${email}`,
      });
    }
  }

  const footerProps = {
    logo: global?.Footer?.logo ?? null,
    logoAlt: global?.Footer?.logoAlt ?? null,
    companyName: global?.Footer?.companyName ?? global?.siteTitle ?? null,
    companyTagline: global?.Footer?.companyTagline ?? null,
    description: global?.siteDescription ?? null,
    links:
      global?.Footer?.FooterLinks?.map((n) => ({
        id: n.id,
        label: n.label,
        url: n.url || "#",
      })) ?? [],
    contactDetails,
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

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat, Oswald } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/data/siteConfig";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Seven Restopub | Львів та Запоріжжя",
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.favicon,
    apple: siteConfig.favicon,
  },
  openGraph: {
    title: "Seven Restopub | Львів та Запоріжжя",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    type: "website",
    locale: "uk_UA",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.brandName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Restopub | Львів та Запоріжжя",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk" className={`${montserrat.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

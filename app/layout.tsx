import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Montserrat, Oswald } from "next/font/google";
import Script from "next/script";
import { BookingModalProvider } from "@/components/BookingModal";
import { CareersModalProvider } from "@/components/CareersModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocationPickerProvider } from "@/components/LocationPicker";
import { RouteImageRepaint } from "@/components/RouteImageRepaint";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/data/siteConfig";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const googleAnalyticsId = "G-B89HZRMLGS";

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
    default: "Seven Restopub — мережа сучасних рестопабів | Крафт, піца, бургери",
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/`,
    languages: {
      "uk-UA": "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Seven Restopub — мережа сучасних рестопабів | Крафт, піца, бургери",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    type: "website",
    locale: "uk_UA",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.brandName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Restopub — мережа сучасних рестопабів | Крафт, піца, бургери",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk" className={`${montserrat.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <CareersModalProvider>
            <BookingModalProvider>
              <LocationPickerProvider>
                <Header />
                <main>{children}</main>
                <Footer />
                <StructuredData />
                <RouteImageRepaint />
                {process.env.NODE_ENV === "production" ? (
                  <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
                    <Script id="google-analytics-4" strategy="afterInteractive">
                      {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${googleAnalyticsId}');
                      `}
                    </Script>
                  </>
                ) : null}
              </LocationPickerProvider>
            </BookingModalProvider>
          </CareersModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Montserrat, Oswald } from "next/font/google";
import Script from "next/script";
import { BookingModalProvider } from "@/components/BookingModal";
import { CareersModalProvider } from "@/components/CareersModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocationPickerProvider } from "@/components/LocationPicker";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/data/siteConfig";
import { SelectedVenueProvider } from "@/components/SelectedVenueProvider";
import { canonicalSiteUrl, shouldIndexSite } from "@/lib/seo";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const previewMode = process.env.VERCEL_ENV === "preview" || process.env.SEVEN_PREVIEW_MODE === "1";
const enableProductionTracking = process.env.NODE_ENV === "production" && !previewMode;

const googleAnalyticsId = "G-B89HZRMLGS";
const googleTagManagerId = "GTM-TWQ9XMR6";

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
  metadataBase: new URL(canonicalSiteUrl),
  title: {
    default: "Seven Restopub — мережа сучасних рестопабів | Крафт, піца, бургери",
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: `${canonicalSiteUrl}/`,
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
    url: canonicalSiteUrl,
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
    index: shouldIndexSite,
    follow: shouldIndexSite,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk" className={`${montserrat.variable} ${oswald.variable}`}>
      <head>
        {enableProductionTracking ? (
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');`}
          </Script>
        ) : null}
      </head>
      <body className="font-sans antialiased">
        {enableProductionTracking ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <LanguageProvider>
          <SelectedVenueProvider>
          <CareersModalProvider>
            <BookingModalProvider>
              <LocationPickerProvider>
                {previewMode ? <div className="seven-preview-badge" role="note">Preview · заявки не надсилаються</div> : null}
                <a className="seven-skip-link" href="#main-content">Перейти до вмісту</a>
                <Header />
                <main id="main-content" tabIndex={-1} className="pt-14 pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
                <Footer />
                <MobileBottomNav />
                <StructuredData />
                {enableProductionTracking ? (
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
        </SelectedVenueProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

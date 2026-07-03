import type { Metadata } from "next";
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

const googleAnalyticsId = "G-B89HZRMLG5";

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
  alternates: {
    canonical: "/",
  },
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

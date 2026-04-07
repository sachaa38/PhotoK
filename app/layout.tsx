import type { Metadata } from "next";
import { Poppins, Prata, League_Spartan, Bodoni_Moda_SC, Assistant } from "next/font/google";
import "./globals.css";
import Header from "./header";
import FooterSite from "./footer";
import { LanguageProvider } from "./LanguageContext";
import Script from "next/script";

const SITE_URL = "https://www.ekaterinacheliadinova.com";
const IMAGE_BASE = "/optimized-images/images";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Photographe Mariage Grenoble & Couple Rhône-Alpes | Ekaterina Cheliadinova",
    template: "%s | Ekaterina Cheliadinova",
  },
  description:
    "Photographe mariage à Grenoble et photographe couple en Rhône-Alpes. Disponible à Lyon, Annecy, Chambéry et partout en France.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ekaterina Cheliadinova",
    title: "Photographe Mariage Grenoble & Couple Rhône-Alpes | Ekaterina Cheliadinova",
    description:
      "Photographe mariage à Grenoble et photographe couple en Rhône-Alpes. Disponible à Lyon, Annecy, Chambéry et partout en France.",
    locale: "fr_FR",
    images: [
      {
        url: `${IMAGE_BASE}/design/IMG_2322.jpg`,
        width: 1200,
        height: 800,
        alt: "Ekaterina Cheliadinova — Photographe de Mariage en Rhône-Alpes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photographe Mariage Grenoble & Couple Rhône-Alpes | Ekaterina Cheliadinova",
    description:
      "Photographe mariage à Grenoble et photographe couple en Rhône-Alpes. Disponible à Lyon, Annecy, Chambéry et partout en France.",
    images: [`${IMAGE_BASE}/design/IMG_2322.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      fr: `${SITE_URL}/?lang=fr`,
      en: `${SITE_URL}/?lang=en`,
    },
  },
};

// --- Configuration des polices ---
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" });
export const prata = Prata({ subsets: ["latin"], weight: ["400"], variable: "--font-prata" });
export const spartan = League_Spartan({ subsets: ["latin"], weight: ["200", "600", "700"], variable: "--font-spartan" });
export const bodoni = Bodoni_Moda_SC({ subsets: ["latin"], variable: "--font-bodoni" });
export const assistant = Assistant({ subsets: ["latin"], variable: "--font-assistant" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${poppins.variable} ${prata.variable} ${spartan.variable} ${bodoni.variable} ${assistant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${SITE_URL}/#business`,
              name: "Ekaterina Cheliadinova Photographie",
              url: SITE_URL,
              image: `${SITE_URL}${IMAGE_BASE}/design/IMG_2322.jpg`,
              description:
                "Photographe de mariage et de couple en Rhône-Alpes, France.",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Rhône-Alpes",
                addressCountry: "FR",
              },
              areaServed: [
                { "@type": "State", name: "Rhône-Alpes" },
                { "@type": "Country", name: "France" },
              ],
              email: "ekaterina.cheliadinova@gmail.com",
              priceRange: "€€",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services photographiques",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Photographie de mariage" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Séance photo couple" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Séance photo famille" },
                  },
                ],
              },
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17730427004"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17730427004');
          `}
        </Script>
      </head>
      <body className="font-poppins bg-white text-[#171717]">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <FooterSite />
        </LanguageProvider>
      </body>
    </html>
  );
}

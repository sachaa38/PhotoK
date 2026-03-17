import { Poppins, Prata, League_Spartan, Bodoni_Moda_SC, Assistant } from "next/font/google";
import "./globals.css";
import Header from "./header";
import FooterSite from "./footer"; // Assure-toi que l'import est correct
import { LanguageProvider } from "./LanguageContext";
import Script from "next/script";

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

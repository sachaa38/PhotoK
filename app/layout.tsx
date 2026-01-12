import { Poppins, Prata, League_Spartan, Bodoni_Moda_SC, Assistant } from "next/font/google";
import "./globals.css";
import Header from "./header";
import FooterSite from "./footer"; // Assure-toi que l'import est correct
import { LanguageProvider } from "./LanguageContext";
import texte from "./texte";

// --- Configuration des polices ---
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" });
export const prata = Prata({ subsets: ["latin"], weight: ["400"], variable: "--font-prata" });
export const spartan = League_Spartan({ subsets: ["latin"], weight: ["200", "600", "700"], variable: "--font-spartan" });
export const bodoni = Bodoni_Moda_SC({ subsets: ["latin"], variable: "--font-bodoni" });
export const assistant = Assistant({ subsets: ["latin"], variable: "--font-assistant" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${poppins.variable} ${prata.variable} ${spartan.variable} ${bodoni.variable} ${assistant.variable}`}>
      <body className="font-poppins">
        <LanguageProvider>
          <Header /> 
          <main>{children}</main>
          <FooterSite />
        </LanguageProvider>
      </body>
    </html>
  );
}
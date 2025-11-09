import { Poppins, Prata, League_Spartan } from "next/font/google";
import "./globals.css";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const prata = Prata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-prata",
});

export const spartan = League_Spartan({
  subsets: ["latin"],
  weight: ["200", "600", "700"],
  variable: "--font-spartan",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${prata.variable} ${spartan.variable}`}
    >
      <body className="font-poppins">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Ekaterina Cheliadinova, photographe d'origine russe installée en France depuis plus de cinq ans. Spécialisée en mariage, couple et famille en Rhône-Alpes.",
  openGraph: {
    title: "À Propos | Ekaterina Cheliadinova",
    description:
      "Ekaterina Cheliadinova, photographe d'origine russe installée en France depuis plus de cinq ans. Spécialisée en mariage, couple et famille en Rhône-Alpes.",
    url: `${SITE_URL}/pageApropos`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageApropos`,
    languages: {
      fr: `${SITE_URL}/pageApropos?lang=fr`,
      en: `${SITE_URL}/pageApropos?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

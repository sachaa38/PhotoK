import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "Photographe Famille Grenoble",
  description:
    "Photographe famille à Grenoble, Lyon, Annecy et Chambéry. Séances photo en extérieur, à domicile ou en studio en Rhône-Alpes — Ekaterina Cheliadinova.",
  openGraph: {
    title: "Photographe Famille Grenoble | Ekaterina Cheliadinova",
    description:
      "Photographe famille à Grenoble, Lyon, Annecy et Chambéry. Séances photo en extérieur, à domicile ou en studio en Rhône-Alpes.",
    url: `${SITE_URL}/pageFamille`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageFamille`,
    languages: {
      fr: `${SITE_URL}/pageFamille?lang=fr`,
      en: `${SITE_URL}/pageFamille?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

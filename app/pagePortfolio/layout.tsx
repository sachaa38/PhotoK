import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "Portfolio — Mariages, Couples, Famille | Ekaterina Cheliadinova",
  description:
    "Explorez les galeries photo de mariages, séances couple et famille à Grenoble et en Rhône-Alpes — Ekaterina Cheliadinova.",
  openGraph: {
    title: "Portfolio | Ekaterina Cheliadinova",
    description:
      "Galeries de mariages, couples et famille à Grenoble, Lyon, Annecy et Chambéry.",
    url: `${SITE_URL}/pagePortfolio`,
  },
  alternates: {
    canonical: `${SITE_URL}/pagePortfolio`,
    languages: {
      fr: `${SITE_URL}/pagePortfolio?lang=fr`,
      en: `${SITE_URL}/pagePortfolio?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

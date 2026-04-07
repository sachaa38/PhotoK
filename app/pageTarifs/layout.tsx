import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "Tarifs Mariage",
  description:
    "Formules et tarifs pour la photographie de mariage en Rhône-Alpes. De 600 € à 1 600 € selon la durée. Déplacements inclus en Rhône-Alpes — Ekaterina Cheliadinova.",
  openGraph: {
    title: "Tarifs Mariage | Ekaterina Cheliadinova",
    description:
      "Formules et tarifs pour la photographie de mariage en Rhône-Alpes. De 600 € à 1 600 € selon la durée. Déplacements inclus en Rhône-Alpes.",
    url: `${SITE_URL}/pageTarifs`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageTarifs`,
    languages: {
      fr: `${SITE_URL}/pageTarifs?lang=fr`,
      en: `${SITE_URL}/pageTarifs?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

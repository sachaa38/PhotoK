import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "Photographe Mariage Grenoble & Rhône-Alpes",
  description:
    "Photographe mariage à Grenoble, Lyon, Annecy et Chambéry. Reportages photo en Rhône-Alpes et partout en France — Ekaterina Cheliadinova.",
  openGraph: {
    title: "Photographe Mariage Grenoble & Rhône-Alpes | Ekaterina Cheliadinova",
    description:
      "Photographe mariage à Grenoble, Lyon, Annecy et Chambéry. Reportages photo en Rhône-Alpes et partout en France.",
    url: `${SITE_URL}/pageMariage`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageMariage`,
    languages: {
      fr: `${SITE_URL}/pageMariage?lang=fr`,
      en: `${SITE_URL}/pageMariage?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

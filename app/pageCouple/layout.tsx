import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "Photographe Couple Rhône-Alpes",
  description:
    "Photographe couple à Grenoble, Lyon, Annecy et Chambéry. Séances photo en lumière naturelle en Rhône-Alpes — Ekaterina Cheliadinova.",
  openGraph: {
    title: "Photographe Couple Rhône-Alpes | Ekaterina Cheliadinova",
    description:
      "Photographe couple à Grenoble, Lyon, Annecy et Chambéry. Séances photo en lumière naturelle en Rhône-Alpes.",
    url: `${SITE_URL}/pageCouple`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageCouple`,
    languages: {
      fr: `${SITE_URL}/pageCouple?lang=fr`,
      en: `${SITE_URL}/pageCouple?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

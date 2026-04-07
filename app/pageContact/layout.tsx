import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Ekaterina Cheliadinova pour votre mariage, séance couple ou famille en Rhône-Alpes. Je serais ravie de découvrir votre projet.",
  openGraph: {
    title: "Contact | Ekaterina Cheliadinova",
    description:
      "Contactez Ekaterina Cheliadinova pour votre mariage, séance couple ou famille en Rhône-Alpes. Je serais ravie de découvrir votre projet.",
    url: `${SITE_URL}/pageContact`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageContact`,
    languages: {
      fr: `${SITE_URL}/pageContact?lang=fr`,
      en: `${SITE_URL}/pageContact?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "Déroulement",
  description:
    "Découvrez comment se déroule l'accompagnement de votre mariage avec Ekaterina Cheliadinova, de la prise de contact jusqu'à la livraison de la galerie.",
  openGraph: {
    title: "Déroulement | Ekaterina Cheliadinova",
    description:
      "Découvrez comment se déroule l'accompagnement de votre mariage avec Ekaterina Cheliadinova, de la prise de contact jusqu'à la livraison de la galerie.",
    url: `${SITE_URL}/pageProcess`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageProcess`,
    languages: {
      fr: `${SITE_URL}/pageProcess?lang=fr`,
      en: `${SITE_URL}/pageProcess?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

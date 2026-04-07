import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Toutes les réponses à vos questions sur le déroulement d'un reportage mariage, les délais de livraison et les séances photo — Ekaterina Cheliadinova.",
  openGraph: {
    title: "FAQ | Ekaterina Cheliadinova",
    description:
      "Toutes les réponses à vos questions sur le déroulement d'un reportage mariage, les délais de livraison et les séances photo.",
    url: `${SITE_URL}/pageFaq`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageFaq`,
    languages: {
      fr: `${SITE_URL}/pageFaq?lang=fr`,
      en: `${SITE_URL}/pageFaq?lang=en`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

const SITE_URL = "https://www.ekaterinacheliadinova.com";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité du site Ekaterina Cheliadinova Photographie — vos données personnelles, leur utilisation et vos droits RGPD.",
  openGraph: {
    title: "Politique de Confidentialité | Ekaterina Cheliadinova",
    description:
      "Politique de confidentialité du site Ekaterina Cheliadinova Photographie — vos données personnelles, leur utilisation et vos droits RGPD.",
    url: `${SITE_URL}/pageConfidentialite`,
  },
  alternates: {
    canonical: `${SITE_URL}/pageConfidentialite`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

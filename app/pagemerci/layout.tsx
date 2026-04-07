import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merci",
  description: "Votre message a bien été envoyé.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

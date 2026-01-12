"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import texte from "../texte";
import FormulaireContact from "../form";
import APropos from "../aproposCompo";

export default function PageMariage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";

  // Sécurité pour éviter les erreurs si la langue n'est pas chargée
  const content = texte[lang];
  if (!content) return null;

  return (
    <main className="min-h-screen bg-white">
    <APropos />
    <FormulaireContact lang={lang} texte={texte} image={true}/>
    </main>
  );
}
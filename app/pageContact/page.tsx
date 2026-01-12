"use client";

import { useSearchParams } from "next/navigation";
import texte from "../texte";
import FormulaireContact from "../form";

export default function PageContact() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";

  return (
    <main className="min-h-screen bg-white">
    <FormulaireContact lang={lang} texte={texte} image={true}/>
    </main>
  );
}
"use client";

import { useSearchParams } from "next/navigation";
import texte from "../texte";
import FormulaireContact from "../form";
import { useState } from "react";
import FaqItem from "../faqCompo";

export default function PageMariage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";


  return (
    <main className="min-h-screen bg-white">
   <section className="pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center w-full">
      <h2 className="mb-12 font-bodoni" style={{ fontSize: "32px" }}>
        {texte[lang].titrePageFaq}
      </h2>

      <div className="w-full max-w-3xl">
        {texte[lang].questionsFaq.map((item, index) => (
          <FaqItem key={index} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>

    <FormulaireContact lang={lang} texte={texte} image={true}/>
    </main>
  );
}
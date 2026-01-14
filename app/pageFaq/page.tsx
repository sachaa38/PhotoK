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
  
   <section className="bg-white text-black flex flex-col items-center">
      <h2 className="mb-8 md:mb-12 font-bodoni text-2xl md:text-[32px] text-center z-1">
        {texte[lang].titrePageFaq}
      </h2>

      <div className="w-full max-w-3xl px-4 md:pb-20">
        {texte[lang].questionsFaq.map((item: any, index: number) => (
          <FaqItem key={index} question={item.q} answer={item.a} />
        ))}
      </div>
      <FormulaireContact lang={lang} texte={texte} image={true}/>
    </section>

    
  
  );
}
"use client";
import texte from "./texte";
import Image from "next/image";
// 1. On importe le Hook qu'on a créé
import { useLang } from "./LanguageContext";

function APropos() {
  // 2. On récupère lang et switchLang depuis le Context global
  const { lang, switchLang } = useLang();

  return (
     <section id="about" className="py-16 md:pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center z-1">
       {/* Titre Centré */}
       <h2 className="pt-6 md:pt-0 mb-8 md:mb-12 font-bodoni text-2xl md:text-[32px] text-center z-1">
        {/* @ts-ignore */}
         {texte[lang].apropos}
       </h2>

       {/* Conteneur principal */}
      <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-6xl gap-6 md:gap-12 md:gap-20">

  {/* Colonne IMAGE */}
  <div className="w-full md:w-[40%] flex justify-center md:justify-end">
    {/* Image container with shadow on mobile */}
    <div className="relative w-full aspect-[3/4] max-w-[322px] md:max-w-[400px] overflow-hidden shadow-xl">
      <Image
        src="/images/katia/Rectangle 1.png"
        alt="Ekaterina"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </div>
  </div>

  {/* Colonne TEXTE */}
  <div className="w-full md:w-[60%] text-justify h-full flex flex-col mt-6 md:mt-0">
    {/* 2. On s'assure que le premier paragraphe n'a pas de marge supérieure parasite */}
    <div className="pt-0 h-full flex flex-col gap-6">
      {/* @ts-ignore */}
      {texte[lang].descApropos.map((p, i) => (
        <p
          key={i}
          className="font-assistant font-light text-[18px] leading-[29px] text-[#1e2939]"
        >
          {p}
        </p>
      ))}
    </div>
  </div>

</div>
     </section>
  );
}

export default APropos;

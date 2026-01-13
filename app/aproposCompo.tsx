"use client";
import texte from "./texte";
import Image from "next/image";
// 1. On importe le Hook qu'on a créé
import { useLang } from "./LanguageContext"; 

function APropos() {
  // 2. On récupère lang et switchLang depuis le Context global
  const { lang, switchLang } = useLang();

  return (
     <section id="about" className="my-6 md:pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center z-1">
       {/* Titre Centré */}
       <h2 className="mb-8 md:mb-12 font-bodoni text-2xl md:text-[32px] text-center z-1">
         {texte[lang].apropos}
       </h2>
     
       {/* Conteneur principal */}
      <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-6xl gap-6 md:gap-12 md:gap-20">
  
  {/* Colonne IMAGE */}
  <div className="w-full md:w-[40%] flex justify-center md:justify-end">
    {/* On s'assure qu'il n'y a pas de marge en haut de l'image */}
    <div className="relative w-full aspect-[3/4] max-w-[400px]">
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
  <div className="w-full md:w-[60%] text-center md:text-left">
    {/* 2. On s'assure que le premier paragraphe n'a pas de marge supérieure parasite */}
    <div className="pt-0"> 
      {texte[lang].descApropos.map((p, i) => (
        <p 
          key={i} 
          className="mb-4 md:mb-6 last:mb-0 font-assistant text-lg leading-relaxed text-gray-700"
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
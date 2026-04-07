"use client";
import texte from "./texte";
import Image from "next/image";
// 1. On importe le Hook qu'on a créé
import { useLang } from "./LanguageContext"; 

function APropos() {
  // 2. On récupère lang et switchLang depuis le Context global
  const { lang } = useLang();

  return (
     <section id="about" className="md:pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center z-1">

       <p className="md:hidden mb-6 font-assistant text-lg leading-relaxed text-gray-700 text-justify">
        {texte[lang].descApropos[0]}
       </p>

       {/* Conteneur principal */}
      <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-6xl gap-6 md:gap-12 md:gap-20">

  {/* Colonne IMAGE */}
  <div className="w-full md:w-[40%] flex justify-center md:justify-end">
    <div className="relative w-full aspect-[3/4] max-w-[400px]">
      <Image
        src="/optimized-images/images/katia/Rectangle 1.png"
        alt="Ekaterina"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </div>
  </div>

  {/* Colonne TEXTE */}
  <div className="w-full md:w-[60%] text-justify h-full flex flex-col">
    <h2 className="mb-6 md:mb-8 font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-[32px]">
      {texte[lang].apropos}
    </h2>
    <div className="pt-0 h-full flex flex-col">
      {texte[lang].descApropos.map((p: string, i: number) => (
        <p
          key={i}
          className={`mb-4 md:mb-6 last:mb-0 font-assistant text-lg leading-relaxed text-gray-700 ${i === 0 || i === 3 ? "hidden md:block" : ""}`}
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

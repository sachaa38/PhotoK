
"use client"
import Link from "next/link";
import { useLang } from "./LanguageContext";
import texte from "./texte";


const FooterSite = () => {

    const { lang } = useLang();
    return(
<div className="w-full z-50 bg-[#F8F8F8] flex flex-col items-center justify-center px-4 md:px-8 mb-0 pb-12 md:pb-25 pt-10">
  
  {/* Conteneur principal : px-4 sur mobile, px-20 sur ordi */}
  <div className="border-t-[0.5px] border-black/50 md:px-20 pb-3 md:w-auto">    
    
    <div className="flex flex-col items-center justify-center my-5">
      <h1
        className="font-bodoni text-black text-[24px] md:text-[30px]"
      >
        E.C.
      </h1>
    </div>

    {/* Navigation : 
        Mobile : flex-wrap + justify-center + gap-4 (pour éviter que ça sorte de l'écran)
        Ordi : space-x-8 (ton réglage d'origine)
    */}
    <nav className="font-assistant font-light text-black flex flex-wrap justify-center gap-4 md:gap-0 md:space-x-8 text-lg md:text-xl drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)]">
      <Link href={`/?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].accueil}
      </Link>
      <Link href={`/pageApropos?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].apropos}
      </Link>
      <Link href={`/?lang=${lang}#portfolio`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].portfolio}
      </Link>
      <Link href={`/pageContact?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].contact}
      </Link>
      <Link href={`/pageFaq?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].infos}
      </Link>
    </nav>
  </div>
</div>
   
    )
}

export default FooterSite
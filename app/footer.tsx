
"use client"
import Link from "next/link";
import { useLang } from "./LanguageContext";
import texte from "./texte";


const FooterSite = () => {

    const { lang } = useLang();
    return(
 <div
      className="w-full z-50 bg-[#F8F8F8] flex flex-col items-center justify-center px-8 pb-6 mb-0 pb-25 pt-10">


      <div className="border-t-[0.5px] border-black/50 px-20 pb-3">    
      <div className="flex flex-col items-center justify-center my-5">
  <h1
    className="font-bodoni text-black"
    style={{
      fontSize: "30px",
    }}
  >E.C.</h1>
</div>
         <nav className="font-assistant font-light text-black flex space-x-8 text-xl drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)]" >
      <Link href={`/?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center">
                 {texte[lang].accueil}
               </Link>
               <Link href={`/pageApropos?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center">
                 {texte[lang].apropos}
               </Link>
               <Link href={`/?lang=${lang}#portfolio`} className="hover:text-gray-400 transition-colors text-center">
                 {texte[lang].portfolio}
               </Link>
               {/* Lien vers ta page famille avec la langue */}
               <Link href={`/pageContact?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center">
                 {texte[lang].contact}
               </Link>
               <Link href={`/pageFaq?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center">
                 {texte[lang].infos}
               </Link>
    </nav>
      </div>
    </div>
   
    )
}

export default FooterSite
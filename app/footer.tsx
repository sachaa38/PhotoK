"use client"
import Link from "next/link";
import { useLang } from "./LanguageContext";
import texte from "./texte";


const FooterSite = () => {

    const { lang } = useLang();
    return(
<div className="w-full z-50 bg-[#F8F8F8] border-t border-gray-200 flex flex-col items-center justify-center px-6 md:px-8 py-12 md:py-16">

  {/* Separator line */}
  <div className="w-full max-w-[322px] md:max-w-none md:w-auto h-[1px] bg-black/10 mb-12" />

  {/* E.C. Logo */}
  <div className="flex flex-col items-center justify-center mb-6">
    <h1 className="font-bodoni text-black text-[24px] md:text-[30px]">
      E.C.
    </h1>
  </div>

  {/* Navigation Links */}
  <nav className="font-assistant font-light text-black flex flex-wrap justify-center gap-x-4 gap-y-4 md:gap-0 md:space-x-8 text-[18px] md:text-xl mb-12">
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

  {/* Copyright */}
  <p className="font-assistant font-light text-[14px] text-[#99a1af] text-center">
    © 2026 Ekaterina Cheliadinova. All rights reserved.
  </p>
</div>

    )
}

export default FooterSite

"use client";
import texte from "./texte";
import Image from "next/image";
import Link from "next/link";
// 1. On importe le Hook qu'on a créé
import { useLang } from "./LanguageContext"; 

function Header() {
  // 2. On récupère lang et switchLang depuis le Context global
  const { lang, switchLang } = useLang();

  return (
    <div className="w-full z-50 bg-white flex flex-col items-center justify-center px-8 py-6 mb-0 pb-12">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bodoni text-black" style={{ fontSize: "30px" }}>
          Ekaterina Cheliadinova
        </h1>
        
        {/* 3. Au clic, on appelle switchLang qui va changer l'URL et l'état global */}
        <button
          onClick={switchLang}
          className="flex items-center gap-2 text-black hover:cursor-pointer group"
        >
          <Image 
            src="/fr.png" 
            alt="Drapeau Français" 
            width={20} 
            height={14} 
            className={`object-contain ${lang === 'fr' ? 'opacity-100 scale-110' : 'opacity-40'}`}
          />
          <span className="font-assistant text-black-600 font-light self-center">|</span> 
          <Image 
            src="/gb.png" 
            alt="Drapeau Anglais" 
            width={20} 
            height={14}
            className={`object-contain ${lang === 'en' ? 'opacity-100 scale-110' : 'opacity-40'}`}
          />
        </button>
      </div>

      <div className="border-b-[0.5px] border-black/50 px-20 pb-3 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.15)]">
        <nav className="font-assistant font-light text-black flex space-x-8 text-xl drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)]">
          {/* 4. On s'assure que les liens gardent la langue dans l'URL */}
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
  );
}

export default Header;
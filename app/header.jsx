"use client";
import { useState } from 'react';
import texte from "./texte";
import Image from "next/image";
import Link from "next/link";
// 1. On importe le Hook qu'on a créé
import { useLang } from "./LanguageContext"; 

function Header() {
  // 2. On récupère lang et switchLang depuis le Context global
  const { lang, switchLang } = useLang();

    const [showDropdown, setShowDropdown] = useState(false);

  const handleCloseWithDelay = () => {
  setTimeout(() => {
    setShowDropdown(false);
  }, 0); 
  }

  return (
   <div className="relative w-full z-[1000] bg-white flex flex-col items-center justify-center px-4 md:px-8 pt-4 md:py-6 md:pb-12">
  <div className="flex flex-col items-center justify-center mb-4">
    {/* Nom : Ajusté de 22px sur mobile à 30px sur ordi */}
    <h1 className="font-bodoni text-black text-[22px] md:text-[30px] text-center whitespace-nowrap">
      Ekaterina Cheliadinova
    </h1>
    
    <button
      onClick={switchLang}
      className="flex items-center gap-2 text-black hover:cursor-pointer group mt-2"
    >
      <Image 
        src="/fr.png" 
        alt="Français" 
        width={18} 
        height={12} 
        className={`object-contain ${lang === 'fr' ? 'opacity-100 scale-110' : 'opacity-40'}`}
      />
      <span className="font-assistant text-gray-400 font-light text-sm">|</span> 
      <Image 
        src="/gb.png" 
        alt="English" 
        width={18} 
        height={12}
        className={`object-contain ${lang === 'en' ? 'opacity-100 scale-110' : 'opacity-40'}`}
      />
    </button>
  </div>

  {/* Conteneur Navigation : 
      Mobile : px-4, bordure plus fine
      Ordi : md:px-20
  */}
  <div className="w-full md:w-auto border-b-[0.5px] border-black/50 px-4 md:px-20 pb-3">
    <nav className="font-assistant font-light text-black flex flex-wrap justify-center gap-x-4 gap-y-2 md:space-x-8 text-base md:text-xl">
      
      <Link href={`/?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].accueil}
      </Link>
      <Link href={`/pageApropos?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].apropos}
      </Link>
        {/* BLOC PORTFOLIO EN COLONNE */}
  {/* BLOC PORTFOLIO */}
<div className="relative flex flex-col items-center">
  <button 
    onClick={() => setShowDropdown(!showDropdown)}
    className="hover:text-gray-400 transition-colors text-center whitespace-nowrap flex items-center gap-1 focus:outline-none"
  >
    {texte[lang].portfolio}
    <span className={`text-[10px] transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
  </button>

  {/* SOUS-MENU - On force le Z-50 et on met un fond bien opaque */}
  {showDropdown && (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-2xl py-4 flex flex-col gap-4 z-[9999] animate-fadeIn border border-gray-100">
      <Link 
        href={`/pageMariage?lang=${lang}`} 
        className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4"
        onClick={handleCloseWithDelay}
      >
        {texte[lang].titrePf[0]}
      </Link>
      <Link 
        href={`/pageCouple?lang=${lang}`} 
        className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4"
        onClick={handleCloseWithDelay}
      >
        {texte[lang].titrePf[1]}
      </Link>
      <Link 
        href={`/pageFamille?lang=${lang}`} 
        className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4"
        onClick={handleCloseWithDelay}
      >
        {texte[lang].titrePf[2]}
      </Link>
    </div>
  )}
</div>

      <Link href={`/pageContact?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].contact}
      </Link>
      <Link href={`/pageFaq?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
        {texte[lang].infos}
      </Link>

    </nav>
  </div>
</div>
  );
}

export default Header;

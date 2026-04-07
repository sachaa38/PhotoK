"use client";
import { useState } from 'react';
import texte from "./texte";
import Image from "next/image";
import Link from "next/link";

import { useLang } from "./LanguageContext";

function LangSwitcher({ lang, switchLang }) {
  return (
    <button
      onClick={switchLang}
      className="flex items-center gap-2 text-black hover:cursor-pointer"
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
  );
}

function Header() {

  const { lang, switchLang } = useLang();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInfosDropdown, setShowInfosDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const [mobileInfosOpen, setMobileInfosOpen] = useState(false);

  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);

  const handleDropdownMouseLeave = (event) => {
    if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    closeDropdown();
  };

  const handleInfosDropdownMouseLeave = (event) => {
    if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setShowInfosDropdown(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowDropdown(false);
    setShowInfosDropdown(false);
    setMobilePortfolioOpen(false);
    setMobileInfosOpen(false);
  };

  return (
    <>
      {/* ===== MOBILE FULL-SCREEN MENU OVERLAY ===== */}
      <div
        className={`fixed inset-0 z-[9999] bg-white flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/20">
          <h1 className="font-bodoni text-black text-[20px]">Ekaterina Cheliadinova</h1>
          <button
            onClick={closeMobileMenu}
            className="text-black text-2xl leading-none p-1 hover:opacity-60 transition-opacity"
            aria-label="Fermer le menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col items-center gap-8 pt-12 font-assistant font-light text-black text-xl flex-1">
          <Link href={`/?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-400 transition-colors">
            {texte[lang].accueil}
          </Link>
          <Link href={`/pageApropos?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-400 transition-colors">
            {texte[lang].apropos}
          </Link>
          <div className="flex flex-col items-center gap-0 w-full px-8">
            <button
              onClick={() => setMobilePortfolioOpen(o => !o)}
              className="flex items-center justify-center gap-2 font-assistant font-light text-black text-xl w-full py-1"
            >
              {texte[lang].portfolio}
              <span className={`text-[10px] transition-transform duration-300 ${mobilePortfolioOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobilePortfolioOpen ? 'max-h-40 mt-3' : 'max-h-0'}`}>
              <div className="flex flex-col items-center gap-3 text-base text-gray-500">
                <Link href={`/pageMariage?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-700 transition-colors">
                  {texte[lang].titrePf[0]}
                </Link>
                <Link href={`/pageCouple?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-700 transition-colors">
                  {texte[lang].titrePf[1]}
                </Link>
                <Link href={`/pageFamille?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-700 transition-colors">
                  {texte[lang].titrePf[2]}
                </Link>
              </div>
            </div>
          </div>
          <Link href={`/pageContact?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-400 transition-colors">
            {texte[lang].contact}
          </Link>
          <div className="flex flex-col items-center gap-0 w-full px-8">
            <button
              onClick={() => setMobileInfosOpen(o => !o)}
              className="flex items-center justify-center gap-2 font-assistant font-light text-black text-xl w-full py-1"
            >
              {texte[lang].infos}
              <span className={`text-[10px] transition-transform duration-300 ${mobileInfosOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobileInfosOpen ? 'max-h-40 mt-3' : 'max-h-0'}`}>
              <div className="flex flex-col items-center gap-3 text-base text-gray-500">
                <Link href={`/pageProcess?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-700 transition-colors">
                  {texte[lang].labelProcess}
                </Link>
                <Link href={`/pageFaq?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-700 transition-colors">
                  {texte[lang].labelFaq}
                </Link>
                <Link href={`/pageTarifs?lang=${lang}`} onClick={closeMobileMenu} className="hover:text-gray-700 transition-colors">
                  {texte[lang].labelTarifs}
                </Link>
              </div>
            </div>
          </div>
          <LangSwitcher lang={lang} switchLang={switchLang} />
        </nav>
      </div>

      {/* ===== DESKTOP: name + flags — scrolls with page, not sticky ===== */}
      <div className="hidden md:flex flex-col items-center justify-center pt-6 bg-white px-8">
        <h1 className="font-bodoni text-black text-[30px] text-center whitespace-nowrap">
          Ekaterina Cheliadinova
        </h1>
        <div className="my-3">
          <LangSwitcher lang={lang} switchLang={switchLang} />
        </div>
      </div>

      {/* ===== STICKY HEADER ===== */}
      <div className="sticky top-0 w-full z-[1000] bg-white px-4 md:px-8">

        {/* Mobile: always compact (name + burger) */}
        <div className="flex items-center justify-between md:hidden pt-4 mb-3 pb-3 border-b border-black/50">
          <h1 className="font-bodoni text-black text-[20px] leading-tight">
            Ekaterina<br />Cheliadinova
          </h1>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col justify-center gap-[6px] p-2 ml-4 shrink-0"
            aria-label="Ouvrir le menu"
          >
            <span className="block w-7 h-[2px] bg-black rounded-full"></span>
            <span className="block w-7 h-[2px] bg-black rounded-full"></span>
            <span className="block w-7 h-[2px] bg-black rounded-full"></span>
          </button>
        </div>

        {/* Desktop nav bar — always visible, always the same */}
        <div className="hidden md:block border-b-[0.5px] border-black/50 px-20 w-fit mx-auto">
          <nav className="font-assistant font-light text-black flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:space-x-8 text-base md:text-xl py-3">

            <Link href={`/?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
              {texte[lang].accueil}
            </Link>
            <Link href={`/pageApropos?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
              {texte[lang].apropos}
            </Link>

            <div
              className="relative flex items-center"
              onMouseEnter={openDropdown}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button
                type="button"
                className="hover:text-gray-400 transition-colors text-center whitespace-nowrap flex items-center justify-center gap-1 focus:outline-none w-full"
              >
                {texte[lang].portfolio}
                <span className={`text-[10px] transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {showDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-2xl py-4 flex flex-col gap-4 z-[9999] animate-fadeIn border border-gray-100">
                  <Link href={`/pageMariage?lang=${lang}`} className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4" onClick={closeDropdown}>
                    {texte[lang].titrePf[0]}
                  </Link>
                  <Link href={`/pageCouple?lang=${lang}`} className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4" onClick={closeDropdown}>
                    {texte[lang].titrePf[1]}
                  </Link>
                  <Link href={`/pageFamille?lang=${lang}`} className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4" onClick={closeDropdown}>
                    {texte[lang].titrePf[2]}
                  </Link>
                </div>
              )}
            </div>

            <Link href={`/pageContact?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
              {texte[lang].contact}
            </Link>
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowInfosDropdown(true)}
              onMouseLeave={handleInfosDropdownMouseLeave}
            >
              <button
                type="button"
                className="hover:text-gray-400 transition-colors text-center whitespace-nowrap flex items-center justify-center gap-1 focus:outline-none w-full"
              >
                {texte[lang].infos}
                <span className={`text-[10px] transition-transform duration-300 ${showInfosDropdown ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {showInfosDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-2xl py-4 flex flex-col gap-4 z-[9999] animate-fadeIn border border-gray-100">
                  <Link href={`/pageProcess?lang=${lang}`} className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4" onClick={() => setShowInfosDropdown(false)}>
                    {texte[lang].labelProcess}
                  </Link>
                  <Link href={`/pageFaq?lang=${lang}`} className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4" onClick={() => setShowInfosDropdown(false)}>
                    {texte[lang].labelFaq}
                  </Link>
                  <Link href={`/pageTarifs?lang=${lang}`} className="text-black hover:text-gray-400 transition-colors text-center whitespace-nowrap px-4" onClick={() => setShowInfosDropdown(false)}>
                    {texte[lang].labelTarifs}
                  </Link>
                </div>
              )}
            </div>

          </nav>
        </div>

      </div>

      {/* Desktop bottom spacer — outside sticky, just page space */}
      <div className="hidden md:block h-12" />
    </>
  );
}

export default Header;

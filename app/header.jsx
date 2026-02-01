"use client";
import { useState } from 'react';
import texte from "./texte";
import Image from "next/image";
import Link from "next/link";

import { useLang } from "./LanguageContext";

function Header() {

  const { lang, switchLang } = useLang();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);

  const handleCloseWithDelay = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 300);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* MOBILE HEADER - visible only on mobile */}
      <div className="md:hidden relative w-full z-[1000] bg-white/80 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Name - stacked on two lines */}
          <Link href={`/?lang=${lang}`} className="flex flex-col">
            <span className="font-bodoni text-black text-[20px] leading-[30px] tracking-[1px] uppercase">
              Ekaterina
            </span>
            <span className="font-bodoni text-black text-[20px] leading-[30px] tracking-[1px] uppercase">
              Cheliadinova
            </span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-3 rounded-lg"
            aria-label="Ouvrir le menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H14" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 8H14" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 12H14" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[2000] bg-white flex flex-col">
          {/* Close Button */}
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 p-2 opacity-70"
            aria-label="Fermer le menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L12 12" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 4L4 12" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Menu Navigation */}
          <nav className="flex flex-col items-center mt-20 w-full">
            <Link
              href={`/?lang=${lang}`}
              onClick={closeMobileMenu}
              className="w-full py-4 border-b border-gray-100 text-center"
            >
              <span className="font-bodoni text-[24px] text-[#0a0a0a] tracking-wide">
                {texte[lang].accueil}
              </span>
            </Link>
            <Link
              href={`/pageApropos?lang=${lang}`}
              onClick={closeMobileMenu}
              className="w-full py-4 border-b border-gray-100 text-center"
            >
              <span className="font-bodoni text-[24px] text-[#0a0a0a] tracking-wide">
                {texte[lang].apropos}
              </span>
            </Link>
            {/* Portfolio with submenu */}
            <div className="w-full border-b border-gray-100">
              <button
                onClick={() => setMobilePortfolioOpen(!mobilePortfolioOpen)}
                className="w-full py-4 text-center flex items-center justify-center gap-2"
              >
                <span className="font-bodoni text-[24px] text-[#0a0a0a] tracking-wide">
                  {texte[lang].portfolio}
                </span>
                <span className={`text-[12px] transition-transform duration-300 ${mobilePortfolioOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {mobilePortfolioOpen && (
                <div className="flex flex-col pb-4">
                  <Link
                    href={`/pageMariage?lang=${lang}`}
                    onClick={closeMobileMenu}
                    className="py-3 text-center"
                  >
                    <span className="font-assistant font-light text-[18px] text-[#0a0a0a]">
                      {texte[lang].titrePf[0]}
                    </span>
                  </Link>
                  <Link
                    href={`/pageCouple?lang=${lang}`}
                    onClick={closeMobileMenu}
                    className="py-3 text-center"
                  >
                    <span className="font-assistant font-light text-[18px] text-[#0a0a0a]">
                      {texte[lang].titrePf[1]}
                    </span>
                  </Link>
                  <Link
                    href={`/pageFamille?lang=${lang}`}
                    onClick={closeMobileMenu}
                    className="py-3 text-center"
                  >
                    <span className="font-assistant font-light text-[18px] text-[#0a0a0a]">
                      {texte[lang].titrePf[2]}
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <Link
              href={`/pageContact?lang=${lang}`}
              onClick={closeMobileMenu}
              className="w-full py-4 border-b border-gray-100 text-center"
            >
              <span className="font-bodoni text-[24px] text-[#0a0a0a] tracking-wide">
                {texte[lang].contact}
              </span>
            </Link>
            <Link
              href={`/pageFaq?lang=${lang}`}
              onClick={closeMobileMenu}
              className="w-full py-4 border-b border-gray-100 text-center"
            >
              <span className="font-bodoni text-[24px] text-[#0a0a0a] tracking-wide">
                {texte[lang].infos}
              </span>
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center justify-center gap-1 mt-8">
            <button
              onClick={() => { switchLang(); if (lang === 'en') closeMobileMenu(); }}
              className={`text-[20px] ${lang === 'fr' ? 'opacity-100' : 'opacity-50'}`}
            >
              🇫🇷
            </button>
            <span className="font-assistant text-black text-[20px]">|</span>
            <button
              onClick={() => { switchLang(); if (lang === 'fr') closeMobileMenu(); }}
              className={`text-[20px] ${lang === 'en' ? 'opacity-100' : 'opacity-50'}`}
            >
              🇬🇧
            </button>
          </div>

          {/* Footer in mobile menu */}
          <div className="mt-auto mb-16 text-center">
            <p className="font-bodoni text-[14px] text-[#99a1af]">
              © 2026 Ekaterina Cheliadinova
            </p>
          </div>
        </div>
      )}

      {/* DESKTOP HEADER - hidden on mobile */}
      <div className="hidden md:flex relative w-full z-[1000] bg-white flex-col items-center justify-center px-8 py-6 pb-12">
        <div className="flex flex-col items-center justify-center mb-4">
          <Link href={`/?lang=${lang}`}>
            <h1 className="font-bodoni text-black text-[22px] md:text-[30px] text-center whitespace-nowrap hover:text-gray-600 transition-colors">
              Ekaterina Cheliadinova
            </h1>
          </Link>

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

        {/* Desktop Navigation */}
        <div className="w-auto border-b-[0.5px] border-black/50 px-20 pb-3">
          <nav className="font-assistant font-light text-black flex space-x-8 text-xl">

            <Link href={`/?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
              {texte[lang].accueil}
            </Link>
            <Link href={`/pageApropos?lang=${lang}`} className="hover:text-gray-400 transition-colors text-center whitespace-nowrap">
              {texte[lang].apropos}
            </Link>
            {/* Portfolio Dropdown */}
            <div className="relative flex flex-col items-center">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hover:text-gray-400 transition-colors text-center whitespace-nowrap flex items-center gap-1 focus:outline-none"
              >
                {texte[lang].portfolio}
                <span className={`text-[10px] transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
              </button>

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
    </>
  );
}

export default Header;

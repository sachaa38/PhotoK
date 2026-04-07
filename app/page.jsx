"use client";

import Image from "next/image";
import { useLang } from "./LanguageContext";
import { useState, useRef, useEffect } from "react";
import imagesCaroussel, { imagesGalerie } from "./data";
import texte from "./texte";
import FormulaireContact from "./form";
import Link from "next/link";
import APropos from "./aproposCompo";
import FaqItem from "./faqCompo";

export default function Home() {

  const { lang } = useLang();
  const t = texte[lang];

  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const mobileIndexRef = useRef(0);
  const desktopIndexRef = useRef(0);
  const mobileDirRef = useRef(1);
  const desktopDirRef = useRef(1);

  const touchStartX = useRef(null);

  const total = imagesCaroussel.length;
  const desktopPerView = 3;
  const maxDesktopIndex = Math.max(0, total - desktopPerView);

  const getCarouselImageFile = (img) => (img.includes(".") ? img : `${img}.png`);

  const setMobile = (idx) => { mobileIndexRef.current = idx; setMobileIndex(idx); };
  const setDesktop = (idx) => { desktopIndexRef.current = idx; setDesktopIndex(idx); };

  // Auto-scroll: ping-pong direction, 6s after last interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      const next = mobileIndexRef.current + mobileDirRef.current;
      if (next >= total - 1) mobileDirRef.current = -1;
      if (next <= 0) mobileDirRef.current = 1;
      setMobile(Math.max(0, Math.min(next, total - 1)));
    }, 6000);
    return () => clearTimeout(timer);
  }, [mobileIndex, total]);

  useEffect(() => {
    if (maxDesktopIndex === 0) return;
    const timer = setTimeout(() => {
      const next = desktopIndexRef.current + desktopDirRef.current;
      if (next >= maxDesktopIndex) desktopDirRef.current = -1;
      if (next <= 0) desktopDirRef.current = 1;
      setDesktop(Math.max(0, Math.min(next, maxDesktopIndex)));
    }, 6000);
    return () => clearTimeout(timer);
  }, [desktopIndex, maxDesktopIndex]);

  // Mobile navigation
  const mobilePrev = () => {
    const next = Math.max(mobileIndexRef.current - 1, 0);
    mobileDirRef.current = -1;
    setMobile(next);
  };
  const mobileNext = () => {
    const next = Math.min(mobileIndexRef.current + 1, total - 1);
    mobileDirRef.current = 1;
    setMobile(next);
  };

  // Desktop navigation
  const desktopPrev = () => setDesktop(Math.max(desktopIndexRef.current - 1, 0));
  const desktopNext = () => setDesktop(Math.min(desktopIndexRef.current + 1, maxDesktopIndex));

  // Touch swipe for mobile
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) mobileNext();
      else mobilePrev();
    }
    touchStartX.current = null;
  };

  const scrollToContact = (event) => {
    event.preventDefault();
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const headerOffset = 110;
    const targetTop = contactSection.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen bg-white text-white font-sans">
      {/* ======== HERO CAROUSEL — MOBILE (1 image at a time) ======== */}
      <section className="md:hidden relative w-full bg-white pt-4 overflow-hidden" aria-label="Hero">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${mobileIndex * 100}%)`, touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {imagesCaroussel.map((img, idx) => (
            <div key={idx} className="relative flex-none w-full aspect-[4/5]">
              <Image
                src={`/optimized-images/images/caroussel/${getCarouselImageFile(img)}`}
                alt={`Photo ${idx + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={idx === 0}
                loading={idx === 0 ? undefined : "eager"}
              />
            </div>
          ))}
        </div>

        {mobileIndex > 0 && (
          <button
            onClick={mobilePrev}
            className="absolute left-0 top-0 h-full w-16 z-10 flex items-center justify-start pl-2 text-white/40 text-8xl font-thin [transform:scaleX(0.5)]"
            aria-label="Photo précédente"
          >
            ‹
          </button>
        )}
        {mobileIndex < total - 1 && (
          <button
            onClick={mobileNext}
            className="absolute right-0 top-0 h-full w-16 z-10 flex items-center justify-end pr-2 text-white/40 text-8xl font-thin [transform:scaleX(0.5)]"
            aria-label="Photo suivante"
          >
            ›
          </button>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-2 py-3">
          {imagesCaroussel.map((_, i) => (
            <button
              key={i}
              onClick={() => setMobile(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === mobileIndex ? 'bg-black' : 'bg-gray-300'}`}
              aria-label={`Aller à la photo ${i + 1}`}
            />
          ))}
        </div>

        <div className="pb-6 text-center">
          <Link
            href="#about"
            className="inline-flex items-center gap-3 rounded-full border border-black/10 px-5 py-2 font-assistant text-xs uppercase tracking-[0.28em] text-gray-500 transition-colors hover:border-black/30 hover:text-black"
          >
            <span className="h-2 w-2 rounded-full bg-stone-300" />
            {t.heroScroll}
          </Link>
        </div>
      </section>

      {/* ======== HERO CAROUSEL — DESKTOP (3 images, scrollable) ======== */}
      <section className="hidden md:block relative w-full bg-white pb-20 overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${desktopIndex * (100 / desktopPerView)}%)` }}
        >
          {imagesCaroussel.map((img, idx) => (
            <div
              key={idx}
              className="relative flex-none aspect-[4/5] px-2"
              style={{ width: `${100 / desktopPerView}%` }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={`/optimized-images/images/caroussel/${getCarouselImageFile(img)}`}
                  alt={`Photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="33vw"
                  priority={idx < 3}
                  loading={idx < 3 ? undefined : "eager"}
                />
              </div>
            </div>
          ))}
        </div>

        {desktopIndex > 0 && (
          <button
            onClick={desktopPrev}
            className="absolute left-0 top-0 h-full w-16 z-10 flex items-center justify-start pl-2 text-white/40 text-8xl font-thin [transform:scaleX(0.5)]"
            aria-label="Photos précédentes"
          >
            ‹
          </button>
        )}
        {maxDesktopIndex > 0 && desktopIndex < maxDesktopIndex && (
          <button
            onClick={desktopNext}
            className="absolute right-0 top-0 h-full w-16 z-10 flex items-center justify-end pr-2 text-white/40 text-8xl font-thin [transform:scaleX(0.5)]"
            aria-label="Photos suivantes"
          >
            ›
          </button>
        )}
      </section>

      <div className="w-full flex flex-col items-center gap-6 pt-8 pb-10 md:pt-10 md:pb-32 bg-white px-4">
        <h2 className="text-center font-bodoni italic text-gray-500 tracking-wide">
          <span className="block text-2xl md:text-[32px]">
            <span className="md:hidden">{t.titre1Mobile}</span>
            <span className="hidden md:inline">{t.titre1}</span>
          </span>
          <span className="mt-2 block font-assistant text-sm uppercase tracking-[0.22em] text-gray-400 md:text-base">
            {t.titre1Location}
          </span>
        </h2>

        <div className="max-w-3xl text-center">
          <p className="font-assistant text-base leading-relaxed text-gray-600 md:text-lg">
            {t.zonesTexte}
          </p>
        </div>

        <div className="flex items-center gap-3 font-assistant font-light text-sm text-gray-600">
          <Link href="#contact" onClick={scrollToContact} className="border border-gray-400 rounded-full px-6 py-2 md:text-base whitespace-nowrap hover:border-gray-700 hover:text-gray-800 transition-colors">
            {t.ctaContact}
          </Link>
          <Link href={`/pageMariage?lang=${lang}`} className="border border-gray-400 rounded-full px-6 py-2 md:text-base whitespace-nowrap hover:border-gray-700 hover:text-gray-800 transition-colors">
            {t.ctaMariages}
          </Link>
        </div>
      </div>

      <APropos />

      {/* ======== Portfolio ======== */}
      <section id="portfolio" className="relative md:pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center overflow-hidden">
        <div className="hidden md:block absolute -top-10 left-0 z-0 pointer-events-none">
          <Image
            src="/optimized-images/images/design/Vector.png"
            alt=""
            width={500}
            height={500}
            aria-hidden="true"
            className="object-contain opacity-45"
          />
        </div>

        <h2 className="relative z-10 pt-6 md:pt-0 mb-8 md:mb-12 font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-[32px] text-center">
          {t.portfolio}
        </h2>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {imagesGalerie.map((image, i) => (
            <Link
              href={`/${t.page[i]}?lang=${lang}`}
              key={i}
              className="text-center group cursor-pointer block"
            >
              <span className="mb-4 block font-assistant text-[22px] md:text-[26px] text-[#8C7E7E]">
                {t.titrePf[i]}
              </span>
              <div className="relative w-full aspect-[3/4] overflow-hidden group shadow-sm bg-gray-100">
                <Image
                  src={`/optimized-images/images/galerie/${image}.png`}
                  alt={`Galerie photo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-stone-50 px-6 py-14 md:px-20 md:py-20 text-black">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bodoni italic text-2xl tracking-wide text-gray-500 md:text-[32px]">
              {t.temoignagesTitre}
            </h2>
            <p className="mt-4 font-assistant text-base leading-relaxed text-gray-600">
              {t.temoignagesIntro}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3">
            {t.temoignages.map((item, index) => (
              <article
                key={`${item.auteur}-${index}`}
                className="flex h-full flex-col justify-between rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex gap-1 text-[#C7A76C]" aria-label="5 stars">
                  {[...Array(5)].map((_, starIndex) => (
                    <span key={starIndex} aria-hidden="true" className="text-lg leading-none">
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-assistant text-[15px] leading-7 text-gray-700">
                  “{item.citation}”
                </p>
                <p className="mt-6 font-assistant text-xs uppercase tracking-[0.28em] text-stone-500">
                  {item.auteur}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FAQ ======== */}
      <section className="bg-white text-black flex flex-col items-center px-6 pt-12 md:px-20 md:pt-20 md:pb-20">
        <h2 className="mb-8 md:mb-12 font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-[32px] text-center">
          {t.titrePageFaq}
        </h2>
        <div className="w-full max-w-3xl">
          {t.questionsFaq.map((item, index) => (
            <FaqItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <FormulaireContact lang={lang} texte={texte} image={false} />

    </div>
  );
}

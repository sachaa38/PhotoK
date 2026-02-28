"use client";

import Image from "next/image";
import { useLang } from "./LanguageContext";
import { useState, useRef, useEffect } from "react";
import imagesCaroussel, { imagesGalerie } from "./data";
import texte from "./texte";
import FormulaireContact from "./form";
import Link from "next/link";
import APropos from "./aproposCompo";

export default function Home() {

  const { lang } = useLang();

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

  return (
    <div className="relative min-h-screen bg-white text-white font-sans">
      {/* ======== HERO CAROUSEL — MOBILE (1 image at a time) ======== */}
      <section className="md:hidden relative w-full bg-white pt-4 overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${mobileIndex * 100}%)`, touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {imagesCaroussel.map((img, idx) => (
            <div key={idx} className="relative flex-none w-full aspect-[4/5]">
              <Image
                src={`/images/caroussel/${getCarouselImageFile(img)}`}
                alt={`Photo ${idx + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={idx === 0}
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
                  src={`/images/caroussel/${getCarouselImageFile(img)}`}
                  alt={`Photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="33vw"
                  priority={idx < 3}
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

      <APropos />

      {/* ======== Portfolio ======== */}
      <section id="portfolio" className="relative md:pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center overflow-hidden">
        <div className="hidden md:block absolute -top-10 left-0 z-0 pointer-events-none">
          <Image
            src="/images/design/Vector.png"
            alt=""
            width={500}
            height={500}
            aria-hidden="true"
            className="object-contain opacity-45"
          />
        </div>

        <h2 className="relative z-10 pt-6 md:pt-0 mb-8 md:mb-12 font-bodoni text-2xl md:text-[32px] text-center z-1">
          {texte[lang].portfolio}
        </h2>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {imagesGalerie.map((image, i) => (
            <Link
              href={`/${texte[lang].page[i]}?lang=${lang}`}
              key={i}
              className="text-center group cursor-pointer block"
            >
              <span className="mb-4 block font-assistant text-[22px] md:text-[26px] text-[#8C7E7E]">
                {texte[lang].titrePf[i]}
              </span>
              <div className="relative w-full aspect-[3/4] overflow-hidden group shadow-sm bg-gray-100">
                <Image
                  src={`/images/galerie/${image}.png`}
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

      {/* CONTACT */}
      <FormulaireContact lang={lang} texte={texte} image={false} />

    </div>
  );
}

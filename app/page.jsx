"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLang } from "./LanguageContext";
import imagesCaroussel, { imagesGalerie } from "./data";
import texte from "./texte";
import FormulaireContact from "./form";
import APropos from "./aproposCompo";

export default function Home() {
  const { lang } = useLang();
  const carouselRef = useRef(null);

  // Auto-scroll carousel if more than 3 images
  useEffect(() => {
    if (imagesCaroussel.length <= 3 || !carouselRef.current) return;

    const carousel = carouselRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    let animationId;

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      carousel.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll after a delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(autoScroll);
    }, 2000);

    // Pause on hover/touch
    const pauseScroll = () => cancelAnimationFrame(animationId);
    const resumeScroll = () => {
      animationId = requestAnimationFrame(autoScroll);
    };

    carousel.addEventListener('mouseenter', pauseScroll);
    carousel.addEventListener('mouseleave', resumeScroll);
    carousel.addEventListener('touchstart', pauseScroll);
    carousel.addEventListener('touchend', resumeScroll);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      carousel.removeEventListener('mouseenter', pauseScroll);
      carousel.removeEventListener('mouseleave', resumeScroll);
      carousel.removeEventListener('touchstart', pauseScroll);
      carousel.removeEventListener('touchend', resumeScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-white font-sans">
     <div className="hidden md:block absolute top-300 left-0 z-[0] pointer-events-none">
    <Image
      src="/images/design/Vector.png" 
      alt="Image abstraite 1"
      width={500}
      height={500}
      style={{ objectFit: 'contain' }}
    />
  </div>
   
    {/* ======== HERO CAROUSEL ======== */}
    <section className="w-full bg-white pt-6 md:pt-0 md:pb-20">
      {imagesCaroussel.length <= 3 ? (
        /* Grid layout for 3 or fewer images - fills the width */
        <div className="grid grid-cols-3 gap-2 md:gap-4 px-2 md:px-0">
          {imagesCaroussel.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-[3/4] overflow-hidden"
            >
              <Image
                src={`/images/caroussel/${img}.png`}
                alt={`Photo ${idx + 1}`}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          ))}
        </div>
      ) : (
        /* Scrolling carousel for more than 3 images - auto-scrolls slowly */
        <div
          ref={carouselRef}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-2 md:gap-4" style={{ width: 'max-content' }}>
            {imagesCaroussel.map((img, idx) => (
              <div
                key={idx}
                className="relative w-[calc(100vw/3-8px)] md:w-[calc(100vw/3-16px)] aspect-[3/4] flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={`/images/caroussel/${img}.png`}
                  alt={`Photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>

<APropos />

    {/* ======== Portfolio ======== */}
    <section id="portfolio" className="py-16 md:pb-20 px-6 md:px-20 bg-[#fafafa] text-black flex flex-col items-center">
      <h2 className="pt-6 md:pt-0 mb-8 md:mb-12 font-bodoni text-2xl md:text-[32px] text-center z-1">
        {texte[lang].portfolio}
      </h2>

  {/* Grille: 1 colonne sur mobile, 3 sur desktop */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 w-full max-w-[322px] md:max-w-6xl">
    {imagesGalerie.map((image, i) => (
      <Link
        href={`/${texte[lang].page[i]}?lang=${lang}`}
        key={i}
        className="text-center group cursor-pointer block"
      >
        {/* Category label above image on mobile */}
        <span className="md:hidden mb-4 block font-assistant font-light text-[20px] text-[#8c7e7e]">
          {texte[lang].titrePf[i]}
        </span>

        <div className="relative w-full aspect-square md:aspect-[3/4] overflow-hidden group shadow-md bg-gray-100">
          <Image
            src={`/images/galerie/${image}.png`}
            alt={`Galerie photo ${i + 1}`}
            fill
            className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Effet de survol élégant (voile blanc très léger) */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
        </div>

        {/* Category label below image on desktop */}
        <span className="hidden md:block mt-4 font-assistant font-light text-[20px] text-[#8C7E7E]">
          {texte[lang].titrePf[i]}
        </span>
      </Link>
    ))}
  </div>
</section>


      {/* CONTACT */}
      <FormulaireContact lang={lang} texte={texte} image={false}/>

    </div>
  );
}

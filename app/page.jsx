"use client";

import "../app/globals.css"

import Image from "next/image";

import { useLang } from "./LanguageContext";
import { useState, useEffect } from "react";
import imagesCaroussel, {imagesGalerie} from "./data"
import texte from "./texte"
import FormulaireContact from "./form";
import Link from "next/link";
import APropos from "./aproposCompo"



export default function Home() {

  const { lang } = useLang("fr");

   const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = droite, -1 = gauche
  const visibleCount = 3;
  const totalSteps = imagesCaroussel.length - visibleCount;

  
  // TITRE

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => {
        if (prev === totalSteps) {
          setDirection(-1); // change de sens à la fin
          return prev - 1;
        } else if (prev === 0 && direction === -1) {
          setDirection(1); // repart à droite au début
          return prev + 1;
        } else {
          return prev + direction;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSteps, direction]);

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
   
 <section className="w-full bg-white px-4 md:pb-20">
  {/* Grille de 3 colonnes avec un espacement de 16px (gap-4) */}
  <div className="grid md:grid-cols-3 gap-4">
    
    {imagesCaroussel.slice(0, 3).map((img, idx) => (
      <div 
  key={idx} 
  className="relative w-full aspect-[4/5] overflow-hidden" // 4/5 est un bon compromis
>
  <Image
    src={`/images/caroussel/${img}.png`}
    alt={`Photo ${idx}`}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 33vw, 30vw"
  />
</div>
    ))}

  </div>
</section>

<APropos />

    {/* ======== Portfolio ======== */}
<section id="portfolio" className="md:pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center">
  <h2 className="mb-8 md:mb-12 font-bodoni text-2xl md:text-[32px] text-center z-1">
    {texte[lang].portfolio}
  </h2>

  {/* Grille de 3 colonnes fixes pour correspondre à vos 3 images */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
    {imagesGalerie.map((image, i) => (
      <Link 
      href={`/${texte[lang].page[i]}?lang=${lang}`} 
      key={i} 
      className="text-center group cursor-pointer block"
    >
      <div
        
        className="relative w-full aspect-[3/4] overflow-hidden group shadow-sm bg-gray-100"
      >
        <Image
          /* On utilise encodeURIComponent pour gérer l'espace entre 'Frame' et le chiffre */
          src={`/images/galerie/${image}.png`}
          alt={`Galerie photo ${i + 1}`}
          fill
          className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        
        {/* Effet de survol élégant (voile blanc très léger) */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
       
      </div>
    <span className="mt-4 block font-assistant text-[20px] text-[#8C7E7E]">
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

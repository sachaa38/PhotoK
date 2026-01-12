"use client";

import "../app/globals.css"

import Image from "next/image";

import { useLang } from "./LanguageContext";
import { useState, useEffect } from "react";
import imagesCaroussel, {imagesGalerie} from "./data"
import texte from "./texte"
import FormulaireContact from "./form";
import FooterSite from "./footer"
import Link from "next/link";



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
     <div className="absolute top-350 left-0 z-[0] pointer-events-none">
    <Image
      src="/images/design/Vector.png" 
      alt="Image abstraite 1"
      width={600}
      height={600}
      style={{ objectFit: 'contain' }}
    />
  </div>
   
    {/* ======== HERO CAROUSEL ======== */}
   
 <section className="w-full bg-white px-4 pb-20">
  {/* Grille de 3 colonnes avec un espacement de 16px (gap-4) */}
  <div className="grid grid-cols-3 gap-4">
    
    {imagesCaroussel.slice(0, 3).map((img, idx) => (
      <div 
        key={idx} 
        className="relative w-full aspect-[2/3] overflow-hidden"
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

      {/* ======== A PROPOS ======== */}
<section id="about" className="py-20 px-6 md:px-20 bg-white text-black flex flex-col items-center">
  {/* Titre Centré */}
  <h2 className="text-2xl md:text-3xl font-light mb-12 uppercase tracking-[0.2em] font-bodoni">
    {texte[lang].apropos}
  </h2>

  {/* Conteneur principal */}
  <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12 md:gap-20">
    
    {/* Colonne IMAGE (Maintenant à GAUCHE) : 40% */}
    <div className="w-full md:w-[40%] flex justify-center md:justify-end">
      <div className="relative w-full aspect-[3/4] max-w-[400px]">
        <Image 
          src="/images/katia/Rectangle 1.png" 
          alt="Ekaterina Cheliadinova"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    </div>

    {/* Colonne TEXTE (Maintenant à DROITE) : 60% */}
    <div className="w-full md:w-[60%] text-left">
      <p className="relative z-10 font-assistant text-lg leading-relaxed text-gray-800 whitespace-pre-line text-justify md:text-left">
        {texte[lang].desc_apropos}
      </p>
    </div>

  </div>
</section>

    {/* ======== Portfolio ======== */}
<section id="portfolio" className="py-20 px-6 md:px-20 bg-white text-black flex flex-col items-center">
  <h2 className="relative z-10 text-2xl md:text-3xl font-light mb-12 uppercase tracking-[0.2em] font-bodoni">
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

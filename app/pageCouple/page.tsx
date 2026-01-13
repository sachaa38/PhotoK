"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {imagesCouple} from '../data'; // Vérifiez si { imagesFamille } est nécessaire
import texte from "../texte";
import FormulaireContact from "../form";

export default function PageCouple() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";

  // Sécurité pour éviter les erreurs si la langue n'est pas chargée
  const content = texte[lang];
  if (!content) return null;

  return (
    <main className="min-h-screen bg-white">
  <section className="mt-6 mb:pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center">
    <h2 className="mb-8 md:mb-12 font-bodoni text-2xl md:text-[32px] text-center z-1">
      {content.titrePageCouple}
    </h2>

    <div className="flex flex-col items-center w-full md:w-[75%] mb-12 md:mb-15"> 
      <div className="w-full md:max-w-[70%]">
        {content.descPageCouple.map((p: string, i: number) => (
          <p 
            key={i} 
            className="mb-0 last:mb-0 font-assistant text-center md:text-base md:text-lg leading-relaxed text-gray-700"
          >
            {p}
          </p>
        ))}
      </div>
    </div>        

    {/* Grille : gap plus important sur mobile pour séparer les images empilées */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 w-full max-w-6xl">
      {imagesCouple && imagesCouple.map((image, i) => (
        <div key={i} className="text-center group">
          <Link 
            href={`${texte[lang].urlCouple[i]}`} 
            className="relative block w-full aspect-[3/4] overflow-hidden group bg-white shadow-sm"
          >
            <Image
              src={`/images/couple/${image}.png`}
              alt={`Photo ${i}`}
              fill
              className="object-cover transition-all duration-700 
                         group-hover:scale-95 
                         group-hover:grayscale 
                         group-hover:brightness-50" 
              priority={i < 3}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            
            {/* Texte sur l'image :
                Visible au hover (ordi) et au clic (mobile)
             */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <span className="text-white font-assistant text-xl tracking-[0.2em] uppercase border-b border-white pb-1">
                {lang === 'fr' ? 'Voir la galerie' : 'View Gallery'}
              </span>
            </div>
          </Link>
          
          {/* Label de la photo : Un peu plus petit sur mobile */}
          {content.titrePf && (
            <span className="mt-4 block font-assistant text-sm md:text-[18px] text-[#8C7E7E] uppercase tracking-wider">
              {texte[lang].labelPhotoCouple[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  </section>

  <FormulaireContact lang={lang} texte={texte} image={true}/>
</main>
  );
}
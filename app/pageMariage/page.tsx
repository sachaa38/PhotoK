"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {imagesMariage} from '../data'; // Vérifiez si { imagesFamille } est nécessaire
import texte from "../texte";
import FormulaireContact from "../form";

export default function PageMariage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";

  // Sécurité pour éviter les erreurs si la langue n'est pas chargée
  const content = texte[lang];
  if (!content) return null;

  return (
    <main className="min-h-screen bg-white">
      <section className="pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center">
        <h2 className="mb-12 font-bodoni" style={{ fontSize: "32px" }}>
          {content.titrePageMariage}
        </h2>
<div className="flex flex-col items-center w-[75%] mb-20"> 
  <div className="max-w-[70%]">
    {content.descPageMariage.map((p, i) => (
      <p 
        key={i} 
        className="mb-6 last:mb-0 font-assistant text-lg leading-relaxed text-gray-700"
      >
        {p}
      </p>
    ))}
  </div>
</div>
          
         

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {imagesMariage && imagesMariage.map((image, i) => (
            <div key={i} className="text-center group">
              {/* AJOUT DE RELATIVE ET BLOCK ICI */}
<Link 
  href={`${texte["fr"].urlMariage[i]}`} 
  className="relative block w-full aspect-[3/4] overflow-hidden group bg-white"
>
  {/* L'image qui scale et devient grise */}
  <Image
    src={`/images/mariage/${image}.png`}
    alt={`Photo ${i}`}
    fill
    className="object-cover transition-all duration-700 
               group-hover:scale-95 
               group-hover:grayscale 
               group-hover:brightness-50" 
    priority={i < 3}
  />
  
  {/* Le texte qui apparaît au centre */}
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
    <span className="text-white font-assistant text-[40] tracking-[0.2em] ">
      {lang === 'fr' ? 'Voir la galerie' : 'View Gallery'}
    </span>
  </div>
</Link>
              
              {/* CORRECTION DU CHEMIN DU TITRE */}
              {content.titrePf && (
                <span className="mt-4 block font-assistant text-[18px] text-[#8C7E7E]">
                  {texte["fr"].labelPhotoMariage[i]}
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
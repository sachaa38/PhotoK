"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {imagesFamille} from '../data'; // Vérifiez si { imagesFamille } est nécessaire
import texte from "../texte";
import FormulaireContact from "../form";

export default function PageFamille() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";

  // Sécurité pour éviter les erreurs si la langue n'est pas chargée
  const content = texte[lang];
  if (!content) return null;

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pb-20 md:px-20 bg-white text-black flex flex-col items-center">
        <div className="w-full max-w-4xl pt-8 md:pt-10 text-center">
          <h1 className="font-bodoni italic text-gray-500 tracking-wide text-center">
            <span className="block text-2xl md:text-[32px] leading-tight">
              {content.sousTitreSeoFamille}
            </span>
            <span className="mt-2 block font-assistant text-sm uppercase tracking-[0.22em] text-white md:text-base">
              {content.titreSeoFamille}
            </span>
          </h1>

          <div className="mt-14 max-w-3xl mx-auto text-justify">
            {content.descPageFamille.map((p: string, i: number) => (
              <p
                key={i}
                className="mb-5 last:mb-0 font-assistant text-base leading-8 text-gray-700 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-center gap-4 w-full max-w-xs mx-auto mb-10">
          <span className="flex-1 h-px bg-[#8C7E7E]/30" />
          <h2 className="font-assistant text-[11px] uppercase tracking-[0.38em] text-[#8C7E7E] whitespace-nowrap">
            {content.sousTitreGaleries}
          </h2>
          <span className="flex-1 h-px bg-[#8C7E7E]/30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 w-full max-w-6xl">
          {imagesFamille && imagesFamille.map((image, i) => {
            const imageFile = image.includes(".") ? image : `${image}.png`;
            return (
            <div key={i} className="text-center group">
              {/* AJOUT DE RELATIVE ET BLOCK ICI */}
<Link 
  href={`${texte["fr"].urlFamille[i]}`}
  className="relative block w-full aspect-[3/4] overflow-hidden group bg-white"
>
  {/* L'image qui scale et devient grise */}
  <Image
    src={`/optimized-images/images/famille/${imageFile}`}
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
                  {texte["fr"].labelPhotoFamille[i]}
                </span>
              )}
            </div>
          );
        })}
        </div>
      </section>

      <FormulaireContact lang={lang} texte={texte} image={true} />
    </main>
  );
}

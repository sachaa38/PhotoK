"use client";

import { useSearchParams } from "next/navigation";
import texte from "../texte";

export default function PageConfidentialite() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";

  const content = texte[lang];
  if (!content) return null;

  return (
    <section className="mt-6 bg-white text-black flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl px-4 md:px-8 py-12">
        <h1 className="mb-8 md:mb-12 font-bodoni text-3xl md:text-[40px] text-center">
          {content.titrePageConfidentialite}
        </h1>

        <div className="space-y-8">
          {content.politiqueConfidentialite.map((section: any, index: number) => (
            <div key={index} className="prose prose-lg max-w-none">
              <h2 className="font-bodoni text-xl md:text-2xl mb-4 text-black">
                {section.titre}
              </h2>
              <p className="font-assistant text-base md:text-lg leading-relaxed text-gray-800">
                {section.contenu}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="font-assistant text-sm text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

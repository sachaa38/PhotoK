"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { imagesGalerie } from "../data";
import texte from "../texte";
import FormulaireContact from "../form";

export default function PagePortfolio() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";

  const content = texte[lang];
  if (!content) return null;

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pb-20 md:px-20 bg-white text-black flex flex-col items-center">
        <div className="w-full max-w-4xl pt-2 md:pt-4 text-center">
          <h1 className="font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-[32px]">
            {content.portfolio}
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 w-full max-w-6xl">
          {imagesGalerie.map((image, i) => (
            <Link
              href={`/${content.page[i]}?lang=${lang}`}
              key={i}
              className="text-center group cursor-pointer block"
            >
              <span className="mb-4 block font-assistant text-[22px] md:text-[26px] text-[#8C7E7E]">
                {content.titrePf[i]}
              </span>
              <div className="relative w-full aspect-[3/4] overflow-hidden group shadow-sm bg-gray-100">
                <Image
                  src={`/optimized-images/images/galerie/${image}.webp`}
                  alt={`Galerie ${content.titrePf[i]}`}
                  fill
                  className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i < 3}
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FormulaireContact lang={lang} texte={texte} image={true} />
    </main>
  );
}

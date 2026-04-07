"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import texte from "../texte";
import FormulaireContact from "../form";

export default function PageTarifs() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";
  const t = texte[lang] as any;

  return (
    <div className="bg-white text-black">

      {/* ── Hero ── */}
      <section className="relative h-[45vh] md:h-[55vh] overflow-hidden flex items-end justify-center">
        <Image
          src="/optimized-images/images/design/IMG_2322.jpg"
          alt={t.titrePageTarifs}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="relative z-10 pb-10 md:pb-16 text-center px-4">
          <h1 className="font-bodoni text-white text-5xl md:text-7xl italic drop-shadow-lg tracking-wide">
            {t.titrePageTarifs}
          </h1>
          <p className="font-assistant text-white/80 text-base md:text-lg mt-3 tracking-widest uppercase">
            {t.sousTitreTarifs}
          </p>
        </div>
      </section>

      {/* ── Ce qui est inclus ── */}
      <section className="bg-stone-50 py-14 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-3xl text-center mb-10 md:mb-14">
            {t.tarifsInclus.titre}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {t.tarifsInclus.items.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 text-stone-400 shrink-0 text-lg">✦</span>
                <p className="font-assistant text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="bg-white py-14 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-3xl text-center mb-12 md:mb-16">
            {lang === "fr" ? "Formules" : "Packages"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.tarifsFormules.map((pkg: any) => (
              <div
                key={pkg.nom}
                className={`relative flex flex-col border transition-shadow duration-200 hover:shadow-xl ${
                  pkg.populaire
                    ? "border-stone-400 bg-stone-50 shadow-lg"
                    : "border-black/10 bg-white shadow-sm"
                }`}
              >
                {pkg.populaire && (
                  <div className="absolute -top-px inset-x-0 h-[3px] bg-stone-500" />
                )}
                {pkg.populaire && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-stone-600 text-white text-[10px] font-assistant tracking-widest uppercase px-4 py-1 whitespace-nowrap">
                    {lang === "fr" ? "⭐ La plus populaire" : "⭐ Most popular"}
                  </span>
                )}

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  {/* Package name & price */}
                  <div className="mb-6 pb-5 border-b border-black/8">
                    <h3 className="font-bodoni text-2xl md:text-[26px] italic mb-2">{pkg.nom}</h3>
                    <div className="flex items-baseline gap-3">
                      <span className="font-assistant text-3xl font-light">{pkg.prix}</span>
                      <span className="font-assistant text-sm text-gray-400 tracking-wide">{pkg.duree}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {pkg.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 font-assistant text-sm text-gray-600 leading-relaxed">
                        <span className="mt-0.5 text-stone-400 shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/pageContact?lang=${lang}`}
                    className={`block text-center py-2.5 font-assistant text-xs tracking-widest uppercase transition-colors duration-200 border ${
                      pkg.populaire
                        ? "border-stone-600 text-stone-700 hover:bg-stone-600 hover:text-white"
                        : "border-black/30 text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {lang === "fr" ? "Nous contacter" : "Get in touch"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Extra hour ── */}
      <section className="bg-stone-50 py-10 md:py-14 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-bodoni italic text-gray-500 tracking-wide text-xl md:text-2xl mb-3">
            {t.tarifsHeureSupp.titre}
          </h2>
          <p className="font-assistant text-2xl md:text-3xl font-light text-stone-600">
            {t.tarifsHeureSupp.prix}
          </p>
        </div>
      </section>

      {/* ── Supplements ── */}
      <section className="bg-white py-14 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-3xl text-center mb-10">
            {t.tarifsSupplements.titre}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {t.tarifsSupplements.items.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-3 border border-black/8 px-5 py-4">
                <span className="text-stone-400 shrink-0">◇</span>
                <span className="font-assistant text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-3xl">
              {t.tarifsAutresPrestations.titre}
            </h2>
            <p className="mt-4 font-assistant text-gray-600 leading-relaxed">
              {t.tarifsAutresPrestations.intro}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {t.tarifsAutresPrestations.formules.map((item: any) => (
              <div key={item.nom} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="font-bodoni italic text-2xl text-black">{item.nom}</p>
                <p className="mt-3 font-assistant text-2xl font-light text-stone-600">{item.prix}</p>
                <p className="mt-4 font-assistant text-sm leading-relaxed text-gray-600">{item.details}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="font-assistant text-gray-600 leading-relaxed">
              {t.tarifsAutresPrestations.note}
            </p>
            <Link
              href={`/pageContact?lang=${lang}`}
              className="inline-block mt-6 border border-black/20 px-8 py-3 font-assistant text-xs tracking-widest uppercase transition-colors duration-200 hover:bg-black hover:text-white"
            >
              {t.tarifsAutresPrestations.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Decorative quote ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <Image
          src="/optimized-images/images/design/IMG_2322.jpg"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="font-bodoni text-white text-xl md:text-2xl italic leading-relaxed">
            {lang === "fr"
              ? "Racontez-moi votre journée, vos envies et l'atmosphère que vous imaginez : je vous aiderai à choisir la formule la plus juste."
              : "Tell me about your day, your wishes, and the atmosphere you imagine: I will help you choose the package that fits best."}
          </p>
          <Link
            href={`/pageContact?lang=${lang}`}
            className="inline-block mt-8 border border-white text-white font-assistant text-xs tracking-widest uppercase px-8 py-3 hover:bg-white hover:text-black transition-colors duration-200"
          >
            {lang === "fr" ? "Discutons de votre mariage" : "Let's talk about your wedding"}
          </Link>
        </div>
      </section>

      {/* ── Contact form ── */}
      <div className="py-8 md:py-14" />
      <FormulaireContact lang={lang} texte={texte} image={false} />
    </div>
  );
}

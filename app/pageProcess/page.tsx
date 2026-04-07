"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import texte from "../texte";
import FormulaireContact from "../form";

export default function PageProcess() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";
  const t = texte[lang] as any;

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 pb-20 md:px-20">
        <div className="mx-auto max-w-4xl pt-8 text-center md:pt-10">
          <h1 className="font-bodoni italic text-gray-500 tracking-wide text-2xl md:text-[32px]">
            {t.processPageHeading}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl font-assistant text-base leading-relaxed text-gray-600 md:text-lg">
            {t.processPageIntro}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {t.processSteps.map((step: any) => (
            <article
              key={step.title}
              className="rounded-[24px] border border-stone-200 bg-stone-50/50 px-6 py-6 text-left shadow-sm"
            >
              <h2 className="font-bodoni italic text-[28px] text-gray-500 leading-tight">
                {step.title}
              </h2>
              <p className="mt-4 font-assistant text-base leading-8 text-gray-700">
                {step.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-left">
          <h2 className="font-bodoni italic text-2xl text-gray-500 md:text-[30px] text-center">
            {t.processExtrasTitle}
          </h2>
          <div className="mt-8 rounded-[24px] border border-stone-200 bg-white px-6 py-6 shadow-sm">
            <ul className="space-y-4">
              {t.processExtras.map((item: string) => (
                <li key={item} className="flex items-start gap-3 font-assistant text-base leading-relaxed text-gray-700">
                  <span className="mt-1 text-stone-400">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-assistant text-base leading-relaxed text-gray-600 md:text-lg">
            {t.processClosing}
          </p>
          <Link
            href={`/pageContact?lang=${lang}`}
            className="inline-block mt-8 rounded-full border border-gray-400 px-8 py-3 font-assistant text-sm text-gray-700 transition-colors hover:border-gray-700 hover:text-gray-900"
          >
            {t.processCta}
          </Link>
        </div>
      </section>

      <FormulaireContact lang={lang} texte={texte} image={true} />
    </main>
  );
}

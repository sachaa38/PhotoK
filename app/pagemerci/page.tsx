"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import texte from "../texte";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function PageMerci() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "fr";

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17730427004",
      });
    }
  }, []);

  const t = texte[lang as "fr" | "en"];

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-start pt-24 md:pt-32 px-4 text-center">
      <h1 className="font-bodoni italic text-gray-500 tracking-wide text-3xl md:text-4xl mb-8">
        {t.titrePageMerci}
      </h1>
      <div className="max-w-xl space-y-4 mb-10">
        {t.descPageMerci.map((p: string, i: number) => (
          <p key={i} className="font-assistant text-lg text-gray-700 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
      <Link
        href={`/?lang=${lang}`}
        className="bg-[#F8F8F8] text-black px-10 py-3 rounded-lg text-lg uppercase tracking-widest font-assistant border border-black/10 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
      >
        {t.retourAccueil}
      </Link>
    </main>
  );
}

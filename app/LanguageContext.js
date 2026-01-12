"use client";
import { createContext, useContext, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const LanguageContext = createContext();

function LanguageContent({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (urlLang) setLang(urlLang);
  }, [searchParams]);

  const switchLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    router.push(`${pathname}?lang=${newLang}`);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageProvider({ children }) {
  return (
    <Suspense fallback={null}>
      <LanguageContent>{children}</LanguageContent>
    </Suspense>
  );
}

export const useLang = () => useContext(LanguageContext);
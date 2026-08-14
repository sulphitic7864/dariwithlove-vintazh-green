"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/data/wedding";

export function useActiveLanguage(defaultLanguage: Language): Language {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const read = () =>
      setLanguage(document.documentElement.dataset.lang === "ru" ? "ru" : "ky");
    read();
    window.addEventListener("wedding-language-change", read);
    return () => window.removeEventListener("wedding-language-change", read);
  }, []);

  return language;
}

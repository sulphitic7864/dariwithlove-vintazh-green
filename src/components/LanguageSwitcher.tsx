"use client";

import { useEffect, useState } from "react";
import type { Language, LocalizedText } from "@/data/wedding";

type Props = Readonly<{
  defaultLanguage: Language;
  languages: ReadonlyArray<Readonly<{ code: Language; shortLabel: string; htmlLang: string }>>;
  groupLabel: LocalizedText;
  switchToKy: LocalizedText;
  switchToRu: LocalizedText;
}>;

export function LanguageSwitcher({ defaultLanguage, languages, groupLabel, switchToKy, switchToRu }: Props) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    setLanguage(document.documentElement.dataset.lang === "ru" ? "ru" : defaultLanguage);
  }, [defaultLanguage]);

  function changeLanguage(next: Language) {
    const item = languages.find((entry) => entry.code === next);
    document.documentElement.dataset.lang = next;
    document.documentElement.lang = item?.htmlLang ?? next;
    window.localStorage.setItem("wedding-language", next);
    window.dispatchEvent(new CustomEvent("wedding-language-change", { detail: next }));
    setLanguage(next);
  }

  return (
    <div
      className="fixed right-[max(12px,env(safe-area-inset-right))] top-[max(12px,env(safe-area-inset-top))] z-[140] flex h-8 items-center rounded-full border border-black/15 bg-[#eeeeec]/85 px-2.5 font-sans text-[9px] font-medium tracking-[0.12em] shadow-[0_5px_18px_rgba(0,0,0,.08)] backdrop-blur-md"
      role="group"
      aria-label={groupLabel[language]}
    >
      {languages.map((item, index) => (
        <span key={item.code} className="flex items-center">
          {index > 0 ? <span className="mx-1.5 opacity-25">|</span> : null}
          <button
            type="button"
            className={`border-0 bg-transparent px-0.5 py-2 transition-opacity ${language === item.code ? "opacity-100" : "opacity-40"}`}
            aria-pressed={language === item.code}
            aria-label={(item.code === "ky" ? switchToKy : switchToRu)[language]}
            onClick={() => changeLanguage(item.code)}
          >
            {item.shortLabel}
          </button>
        </span>
      ))}
    </div>
  );
}

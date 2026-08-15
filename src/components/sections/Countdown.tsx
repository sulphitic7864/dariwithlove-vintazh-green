"use client";

import { useEffect, useState } from "react";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import type { CountdownUnit, Language, LocalizedText } from "@/data/wedding";
import { russianPlural } from "@/lib/i18n";
import { useActiveLanguage } from "@/lib/use-active-language";
import Image from "next/image";

type Remaining = Readonly<{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}>;

type Props = Readonly<{
  targetTimestamp: number;
  defaultLanguage: Language;
  title: LocalizedText;
  units: Readonly<{
    days: CountdownUnit;
    hours: CountdownUnit;
    minutes: CountdownUnit;
    seconds: CountdownUnit;
  }>;
}>;

function getRemaining(targetTimestamp: number): Remaining {
  const diff = Math.max(0, targetTimestamp - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function Countdown({
  targetTimestamp,
  defaultLanguage,
  title,
  units,
}: Props) {
  const language = useActiveLanguage(defaultLanguage);
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining(targetTimestamp));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [targetTimestamp]);

  const entries = [
    ["days", units.days],
    ["hours", units.hours],
    ["minutes", units.minutes],
    ["seconds", units.seconds],
  ] as const;

  return (
    <section
      data-reveal
      className="relative isolate my-10 px-10 py-8 opacity-0 translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 bg-no-repeat"
    >
      {/* <ReferenceDecor preset="countdown" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[285px] text-[#005847] text-center sm:max-w-[550px]">
        <div className="relative mx-auto mb-20 h-[320px] w-[252px] sm:h-[345px] sm:w-[290px] overflow-hidden rounded-[18px]">
          <Image
            src={
              "https://static.tildacdn.com/tild6137-3734-4165-b230-636636636264/pexels-svetlana-1130.jpg"
            }
            alt=""
            fill
            sizes="(min-width: 740px) 390px, 272px"
            className="object-cover"
          />
        </div>
        <h2 className="font-display text-[15px] uppercase sm:text-4xl tracking-[0.02em]">
          {title[language]}
        </h2>
        <div className="mt-5 grid grid-cols-4 gap-1">
          {entries.map(([key, unit], index) => {
            const value = remaining?.[key] ?? 0;
            const label =
              language === "ky" ? unit.ky : russianPlural(value, unit.ru);
            return (
              <div key={key} className="min-w-0 text-center mt-3">
                <span className={`block font-display text-[29px] leading-none sm:text-5xl ${index > 0 ? 'border-l' : ''}`}>
                  {remaining ? String(value).padStart(2, "0") : "--"}
                </span>
                <span className="mt-1 block font-copy text-[8.5px] uppercase sm:text-sm text-[#005847]">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

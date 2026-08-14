import type { Language, LocalizableText, LocalizedText } from "@/data/wedding";

export function isLocalizedText(value: LocalizableText): value is LocalizedText {
  return typeof value !== "string";
}

export function getLocalized(value: LocalizableText, language: Language): string {
  return typeof value === "string" ? value : value[language];
}

export function interpolateNames(
  value: string,
  couple: Readonly<{ groom: string; bride: string }>,
): string {
  return value.replaceAll("[Groom]", couple.groom).replaceAll("[Bride]", couple.bride);
}

export function russianPlural(
  value: number,
  forms: readonly [one: string, few: string, many: string],
): string {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

export function eventTimestamp(
  date: string,
  time: string,
  timeZone: string,
): number {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(new Date(utcGuess))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );

  const zonedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  const offset = zonedAsUtc - utcGuess;
  return utcGuess - offset;
}

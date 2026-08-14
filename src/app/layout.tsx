import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { wedding } from "@/data/wedding";
import { interpolateNames } from "@/lib/i18n";

const defaultLanguage = wedding.defaultLanguage;
const metadataDescription = interpolateNames(
  wedding.copy.invitation.paragraphs[defaultLanguage][0] ?? wedding.copy.invitation.heading[defaultLanguage],
  wedding.couple,
);

export const metadata: Metadata = {
  title: `${wedding.couple.groom} & ${wedding.couple.bride} — ${wedding.copy.heroSubtitle[defaultLanguage]}`,
  description: metadataDescription,
  openGraph: {
    title: `${wedding.couple.groom} & ${wedding.couple.bride}`,
    description: metadataDescription,
    type: "website",
    ...(wedding.assets.ogImage ? { images: [wedding.assets.ogImage] } : {}),
  },
};

const languageBootScript = `
(function(){
  try {
    var saved = localStorage.getItem('wedding-language');
    var lang = saved === 'ru' ? 'ru' : '${wedding.defaultLanguage}';
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang;
  } catch (_) {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={wedding.defaultLanguage} data-lang={wedding.defaultLanguage}>
      <head><script dangerouslySetInnerHTML={{ __html: languageBootScript }} /></head>
      <body>{children}</body>
    </html>
  );
}

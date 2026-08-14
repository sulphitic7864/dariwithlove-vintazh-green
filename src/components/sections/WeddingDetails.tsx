import {
  LocalizedRichText,
  LocalizedTextView,
} from "@/components/LocalizedText";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import { SectionTitle } from "@/components/SectionTitle";
import { wedding } from "@/data/wedding";
import { interpolateNames } from "@/lib/i18n";

export function WeddingDetails() {
  const kyParagraphs = wedding.copy.invitation.paragraphs.ky.map((text) =>
    interpolateNames(text, wedding.couple),
  );
  const ruParagraphs = wedding.copy.invitation.paragraphs.ru.map((text) =>
    interpolateNames(text, wedding.couple),
  );

  return (
    <section
      data-reveal
      className="
        relative isolate
        min-h-[95vh]
        flex items-center justify-center
        bg-[url('/decor/daria.png.webp')]
        bg-bottom-right
        lg:bg-repeat bg-no-repeat
        overflow-hidden
        px-5 py-14
        opacity-0 translate-y-3
        transition-all duration-[850ms] ease-out
        data-[revealed=true]:translate-y-0
        data-[revealed=true]:opacity-100
      "
    >
      {/* <ReferenceDecor preset="invitation" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[275px] text-center sm:max-w-[440px] lg:max-w-[500px]">
        <SectionTitle className="mb-5 lg:text-5xl">
          <LocalizedTextView value={wedding.copy.invitation.heading} />
        </SectionTitle>

        <div className="font-copy text-[15.5px] leading-[1.48] font-normal lg:text-lg text-black/70">
          <div className="lang lang-ky space-y-3">
            {kyParagraphs.map((paragraph, index) => (
              <p key={`ky-${index}`}>{paragraph}</p>
            ))}
          </div>
          <div className="lang lang-ru space-y-2.5">
            {ruParagraphs.map((paragraph, index) => (
              <p key={`ru-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="font-display text-[19px] lg:text-4xl uppercase leading-none tracking-[-0.02em]">
            <LocalizedTextView value={wedding.event.displayDate} />
          </p>
          <p className=" font-copy text-[10px] italic lg:text-xl mt-3 text-black/70">
            <LocalizedRichText value={wedding.copy.invitation.loveLine} />
          </p>
        </div>
      </div>
    </section>
  );
}

import {
  LocalizedRichText,
  LocalizedTextView,
} from "@/components/LocalizedText";
import { wedding } from "@/data/wedding";
import { interpolateNames } from "@/lib/i18n";

export function GuestSection() {
  const paragraphs = {
    ky: wedding.copy.invitation.paragraphs.ky.map((text) =>
      interpolateNames(text, wedding.couple),
    ),
    ru: wedding.copy.invitation.paragraphs.ru.map((text) =>
      interpolateNames(text, wedding.couple),
    ),
  };

  return (
    <section
      data-reveal
      className="
        relative flex min-h-[100svh] items-center justify-center
        overflow-hidden bg-[#fbf9f0] px-5 py-15
        opacity-0 translate-y-3 transition-all duration-[850ms]
        data-[revealed=true]:translate-y-0
        data-[revealed=true]:opacity-100
      "
    >
      <div
        className="
          relative flex
           w-full max-w-[680px]
          flex-col items-center justify-center
          px-[12%] py-[125px]
          text-center text-[#075d50]


        "
      >
        {/* TOP DECORATION */}
        <img
          src="/media/guest-detail-upper-circle.svg"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-1/2 top-0
            w-[70%]
            -translate-x-1/2
            object-contain
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center">
          <h2
            className="
              font-display
              text-[clamp(20px,5vw,38px)]
              uppercase leading-none
              tracking-[-0.025em]
              text-[#075d50]
            "
          >
            <LocalizedTextView value={wedding.copy.invitation.heading} />
          </h2>

          <div
            className="
              mt-10 max-w-[520px]
              font-copy
              text-[clamp(12px,1.5vw,15px)]
              leading-[1.55]
              text-[#4f8b83]

              sm:mt-12
            "
          >
            <div className="lang lang-ky space-y-2">
              {paragraphs.ky.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            <div className="lang lang-ru space-y-2">
              {paragraphs.ru.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          <p
            className="
              mt-8
              font-copy
              text-[clamp(12px,1.4vw,16px)]
              text-[#4f8b83]
            "
          >
            <LocalizedRichText value={wedding.copy.invitation.loveLine} />
          </p>
        </div>

        {/* BOTTOM DECORATION */}
        <img
          src="/media/guest-detail-upper-circle.svg"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none absolute
            bottom-0 left-1/2
            w-[70%]
            -translate-x-1/2
            rotate-180
            object-contain
          "
        />
      </div>
    </section>
  );
}
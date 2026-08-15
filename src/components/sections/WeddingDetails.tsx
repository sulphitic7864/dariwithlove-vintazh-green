import { LocalizedTextView } from "@/components/LocalizedText";
import { wedding } from "@/data/wedding";
import { interpolateNames } from "@/lib/i18n";

export function WeddingDetails() {
  const paragraphs = {
    ky: wedding.copy.invitation.HeroParagraphs.ky.map((text) =>
      interpolateNames(text, wedding.couple),
    ),
    ru: wedding.copy.invitation.HeroParagraphs.ru.map((text) =>
      interpolateNames(text, wedding.couple),
    ),
  };

  return (
    <section
      data-reveal
      className="
        relative flex min-h-[100svh]
        items-center justify-center overflow-hidden
        bg-[#faf8ee]
        bg-[url('/media/hero-background.jpg')]
        bg-cover bg-center bg-no-repeat
        px-3 py-12

        after:pointer-events-none
        after:absolute after:inset-x-0 after:bottom-0 after:z-[1]
        after:h-[35%]
        after:bg-gradient-to-b
        after:from-transparent
        after:via-[#faf8ee]/75
        after:to-[#faf8ee]

        opacity-0 translate-y-3
        transition-all duration-[850ms]
        data-[revealed=true]:translate-y-0
        data-[revealed=true]:opacity-100
      "
    >
      {/* Responsive frame */}
      <div
        className="
          relative z-10
          aspect-[1165/2040]
          w-[86vw] max-w-[520px]

          sm:aspect-[1.751/1]
          sm:w-[94vw]
          sm:max-w-[1250px]

          lg:w-[70vw]
        "
      >
        {/* Portrait mobile / landscape desktop */}
        <img
          src="/media/hero-detail-circle.svg"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-1/2
            w-full max-w-none
            -translate-x-1/2 -translate-y-1/2

            sm:w-[57.11%]
            sm:rotate-90
          "
        />

        {/* Content */}
        <div
          className="
            absolute inset-[7%_8%]
            flex flex-col items-center justify-center
            text-center text-[#075d50]
          "
        >
          {/* Curved invitation text */}
          <img
            src="/media/invitation-arc.svg"
            alt="Wedding invitation"
            className="
              mb-4 w-[78%]
              sm:mb-2 sm:w-[38%]
            "
          />

          {/* Bow */}
          <img
            src="/media/bow.svg"
            alt=""
            aria-hidden="true"
            className="
              mb-10 w-[28%] max-w-[125px]
              sm:mb-4 sm:w-[10%] sm:max-w-[105px]
            "
          />

          {/* Wedding + Day */}
          <div className="relative mb-16 sm:mb-8 lg:mb-12">
            <h1
              className="
                font-display
                text-[clamp(46px,13vw,82px)]
                uppercase leading-[0.78]
                tracking-[-0.04em]

                sm:text-[clamp(26px,6vw,96px)]
              "
            >
              WEDDING
            </h1>

            <img
              src="/media/day-image.svg"
              alt="Day"
              className="
                pointer-events-none
                absolute left-[52%] top-[50%]
                w-[55%]

                sm:left-[58%]
                sm:top-[45%]
                sm:w-[42%]
                sm:max-w-[230px]
              "
            />
          </div>

          {/* Description */}
          <div
            className="
              max-w-[92%]
              font-copy uppercase
              text-[clamp(12px,3.4vw,17px)]
              leading-[1.55]
              tracking-[0.01em]
              text-[#28736a]

              sm:mt-3
              sm:max-w-[78%]
              sm:text-[clamp(8px,1.65vw,19px)]
              sm:leading-[1.45]
            "
          >
            <div className="lang lang-ky">
              {paragraphs.ky.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            <div className="lang lang-ru">
              {paragraphs.ru.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="mt-8 sm:mt-5 lg:mt-8">
            <p
              className="
                font-display
                text-[clamp(28px,8vw,42px)]
                leading-none text-[#b77b20]

                sm:text-[clamp(14px,2.5vw,38px)]
              "
            >
              <LocalizedTextView value={wedding.event.displayDate} />
            </p>

            <span
              className="
                mx-auto mt-8 block
                h-2.5 w-2.5 rounded-full bg-[#076557]

                sm:mt-5 sm:h-2 sm:w-2
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
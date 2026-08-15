import { LocalizedTextView } from "@/components/LocalizedText";
import { wedding } from "@/data/wedding";
import { interpolateNames } from "@/lib/i18n";

export function WeddingDetails() {
  const HeroParagraphs = {
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
        relative flex h-[100svh] items-center justify-center overflow-hidden
        bg-[#faf8ee] bg-[url('/media/hero-background.jpg')]
        bg-cover bg-center bg-no-repeat px-3 py-8
        opacity-0 translate-y-3 transition-all duration-[850ms]
        data-[revealed=true]:translate-y-0
        data-[revealed=true]:opacity-100
        after:pointer-events-none
        after:absolute after:inset-x-0 after:bottom-0 after:z-[1]
        after:h-[38%]
        after:bg-gradient-to-b
        after:from-transparent
        after:via-[#faf8ee]/75
        after:to-[#faf8ee]
        opacity-0 translate-y-3 transition-all duration-[850ms]
        data-[revealed=true]:translate-y-0
        data-[revealed=true]:opacity-100  
          "
        >
      {/* FRAME + CONTENT */}
      <div
        className="
          relative z-10
          aspect-[1.751/1]
          w-[100vw]
          lg:w-[70vw]
          max-w-[1250px]
        "
      >
        {/* Rotated frame SVG */}
        <img
          src="/media/hero-detail-circle.svg"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-1/2
            w-[57.11%] max-w-none
            -translate-x-1/2 -translate-y-1/2
            rotate-90
          "
        />

        {/* CONTENT INSIDE FRAME */}
        <div
          className="
            absolute inset-[7%_8%]
            flex flex-col items-center justify-center
            text-center text-[#075d50]
          "
        >
          {/* Arc heading */}
          <img
            src="/media/invitation-arc.svg"
            alt="Wedding invitation"
            className="
              mb-1 w-[38%] max-w-[390px]
              sm:mb-2
            "
          />

          {/* Bow */}
          <img
            src="/media/Vector.svg"
            alt=""
            aria-hidden="true"
            className="
              mb-2 w-[10%] max-w-[105px]
              sm:mb-4
            "
          />

          {/* WEDDING + Day */}
          <div className="relative mb-5 sm:mb-8 lg:mb-12">
            <h1
              className="
                font-display
                text-[clamp(26px,6vw,96px)]
                uppercase leading-[0.75]
                tracking-[-0.04em]
              "
            >
              WEDDING
            </h1>

            <img
              src="/media/day-image.svg"
              alt="Day"
              className="
                pointer-events-none
                absolute left-[58%] top-[45%]
                w-[42%] max-w-[230px]
              "
            />
          </div>

          {/* Invitation text */}
          <div
            className="
              mt-1 max-w-[78%]
              font-copy uppercase
              text-[clamp(8px,1.65vw,19px)]
              leading-[1.45]
              tracking-[0.01em]
              text-[#28736a]
              sm:mt-3
            "
          >
            <div className="lang lang-ky">
              {HeroParagraphs.ky.map((text: any, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            <div className="lang lang-ru">
              {HeroParagraphs.ru.map((text: any, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="mt-3 sm:mt-5 lg:mt-8">
            <p
              className="
                font-display
                text-[clamp(14px,2.5vw,38px)]
                leading-none text-[#b77b20]
              "
            >
              <LocalizedTextView value={wedding.event.displayDate} />
            </p>

            <span
              className="
                mx-auto mt-3 block
                h-1.5 w-1.5 rounded-full bg-[#076557]
                sm:mt-5 sm:h-2 sm:w-2
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { LocalizedTextView } from "@/components/LocalizedText";
import { wedding } from "@/data/wedding";

export function Location() {
  return (
    <section
      data-reveal
      className="
        flex items-center justify-center overflow-hidden
        bg-[#005847] px-3 py-10
        opacity-0 translate-y-3
        transition-all duration-[850ms]
        data-[revealed=true]:translate-y-0
        data-[revealed=true]:opacity-100
        sm:px-6 sm:py-14
      "
    >
      <div
        className="
          relative mx-auto
          flex w-full max-w-[560px]
          flex-col items-center
          rounded-[45%]
          border-[3px] border-white
          px-7 py-14
          text-center text-white

          before:pointer-events-none
          before:absolute before:inset-[9px]
          before:rounded-[45%]
          before:border before:border-white/90

          sm:px-14 sm:py-20
          lg:max-w-[590px] lg:px-16 lg:py-24
        "
      >
        <div
          className="
            relative z-10
            flex w-full max-w-[440px]
            flex-col items-center
          "
        >
          {/* Title */}
          <h2
            className="
              font-display
              text-3xl uppercase
              leading-none text-[#d39f4e]
              sm:text-4xl lg:text-5xl
            "
          >
            <LocalizedTextView value={wedding.copy.locationTitle} />
          </h2>

          {/* Intro */}
          <p
            className="
              mt-7 max-w-[300px]
              font-copy text-[12px]
              leading-[1.5] text-white/85
              sm:max-w-[380px] sm:text-sm
            "
          >
            <LocalizedTextView value={wedding.venue.intro} />
          </p>

          {/* Venue */}
          <h3
            className="
              mt-6 max-w-[340px]
              font-display text-[23px]
              uppercase leading-[1.1]
              text-[#d39f4e]
              sm:text-3xl
            "
          >
            <LocalizedTextView value={wedding.venue.name} />
          </h3>

          {/* Address */}
          <p
            className="
              mt-3 max-w-[300px]
              font-copy text-xs
              leading-[1.5] text-white/85
              sm:text-sm
            "
          >
            <LocalizedTextView value={wedding.venue.address} />
          </p>

          {/* Image */}
          <div
            className="
              relative mt-8
              aspect-[1.45/1]
              w-[84%]
              max-w-[370px]
              overflow-hidden
              rounded-[18px]
              sm:w-[88%]
            "
          >
            <Image
              src="https://static.tildacdn.com/tild3163-3631-4239-b539-653433353966/1751399957-1148.jpg"
              alt=""
              fill
              sizes="(max-width: 640px) 75vw, 370px"
              className="object-cover"
            />
          </div>

          {/* Note */}
          <p
            className="
              mt-7 max-w-[310px]
              font-copy text-xs
              leading-[1.55] text-white/85
              sm:max-w-[390px] sm:text-sm
            "
          >
            <LocalizedTextView value={wedding.venue.note} />
          </p>

          {/* Map button */}
          <a
            href={wedding.venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="
              mt-7 inline-flex
              min-h-11 min-w-[165px]
              items-center justify-center
              rounded-full
              border border-white
              bg-[#d39f4e]
              px-7
              text-xs uppercase
              tracking-[0.05em]
              text-white
              transition
              hover:bg-[#c78d36]
              active:scale-95

              sm:min-h-12
              sm:min-w-[190px]
            "
          >
            <LocalizedTextView value={wedding.copy.locationButton} />
          </a>
        </div>
      </div>
    </section>
  );
}
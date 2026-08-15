import Image from "next/image";
import { LocalizedTextView } from "@/components/LocalizedText";
import { wedding } from "@/data/wedding";

export function Location() {
  return (
    <section
      data-reveal
      className="
        flex min-h-screen items-center justify-center overflow-hidden
        bg-[#005847] px-4 py-10
        opacity-0 translate-y-3 transition-all duration-[850ms]
        data-[revealed=true]:translate-y-0
        data-[revealed=true]:opacity-100
      "
    >
      <div
        className="
          relative mx-auto flex w-full max-w-[560px]
          flex-col items-center text-center
          rounded-[40%]
          border-[3px] border-white
          text-white

          before:pointer-events-none before:absolute
          before:inset-[10px]
          before:rounded-[40%]
          before:border before:border-white

          sm:px-14 sm:py-20
          lg:max-w-[590px] lg:px-16 lg:py-24
        "
      >
        <div className="relative z-10 flex w-full flex-col items-center">
          {/* Title */}
          <h2 className="font-display text-3xl uppercase text-[#d39f4e] sm:text-4xl lg:text-5xl">
            <LocalizedTextView value={wedding.copy.locationTitle} />
          </h2>

          {/* Intro */}
          <p className="mt-7 font-copy text-xs leading-relaxed text-white/85 sm:text-sm">
            <LocalizedTextView value={wedding.venue.intro} />
          </p>

          {/* Venue */}
          <h3 className="mt-5 font-display text-2xl uppercase text-[#d39f4e] sm:text-3xl">
            <LocalizedTextView value={wedding.venue.name} />
          </h3>

          {/* Address */}
          <p className="mt-3 font-copy text-xs leading-relaxed text-white/85 sm:text-sm">
            <LocalizedTextView value={wedding.venue.address} />
          </p>

          {/* Venue image */}
          <div className="relative mt-8 aspect-[1.45/1] w-[72%] overflow-hidden rounded-[18px]">
            <Image
              src="https://static.tildacdn.com/tild3163-3631-4239-b539-653433353966/1751399957-1148.jpg"
              alt=""
              fill
              sizes="(max-width: 240px) 45vw, 200px"
              className="object-cover"
            />
          </div>

          {/* Note */}
          <p className="mt-7 max-w-[400px] font-copy text-xs leading-relaxed text-white/85 sm:text-sm">
            <LocalizedTextView value={wedding.venue.note} />
          </p>

          {/* Map */}
          <a
            href={wedding.venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="
              mt-7 inline-flex min-h-11 items-center justify-center
              rounded-full border border-white
              bg-[#d39f4e] px-8
              text-xs uppercase tracking-[0.06em] text-white
              transition hover:bg-[#c78d36] active:scale-95
            "
          >
            <LocalizedTextView value={wedding.copy.locationButton} />
          </a>
        </div>
      </div>
    </section>
  );
}

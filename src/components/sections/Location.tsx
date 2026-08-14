import Image from "next/image";
import { LocalizedTextView } from "@/components/LocalizedText";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import { SectionTitle } from "@/components/SectionTitle";
import { wedding } from "@/data/wedding";

export function Location() {
  return (
    <section
      data-reveal
      className="relative isolate overflow-hidden mt-10 md:px-10 px-5 pb-16 pt-6 opacity-0 translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100  bg-[url('/decor/location_bg.png')] bg-bottom-right  bg-no-repeat"
    >
      {/* <ReferenceDecor preset="location" /> */}
      <div className="relative z-10 mx-auto w-full  text-center  ">
        <SectionTitle className="mb-4"><LocalizedTextView value={wedding.copy.locationTitle} /></SectionTitle>
        <p className="font-copy text-xl font-extralight leading-[1.45]  text-black/70">
          <LocalizedTextView value={wedding.venue.intro} />
        </p>
        <h3 className="mt-5 font-display text-[17px] uppercase sm:text-4xl  font-extralight tracking-[-0.02em]">
          <LocalizedTextView value={wedding.venue.name} />
        </h3>
        <p className="font-copy text-xl font-extralight leading-[1.45]  text-black/70 mt-4">
          <LocalizedTextView value={wedding.venue.address} />
        </p>

        <div className="relative mx-auto mt-5 md:h-[325px] mt-10 md:w-[470px] w-[250px]  h-[325px] overflow-hidden rounded-[16px]">
          <Image src={'https://static.tildacdn.com/tild3163-3631-4239-b539-653433353966/1751399957-1148.jpg'} alt="" fill sizes="(min-width: 740px) 270px, 238px" className="object-cover" />
          {/* <Image src={wedding.venue.image} alt="" fill sizes="(min-width: 640px) 270px, 238px" className="object-cover" /> */}
        </div>

        <p className="mx-auto mt-4 max-w-[255px]  sm:max-w-[510px]    font-copy md:text-xl text-sm font-extralight leading-[1.45]  text-black/70">
          <LocalizedTextView value={wedding.venue.note} />
        </p>
        <a
          href={wedding.venue.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-black px-7 font-sans text-xs sm:min-h-14 sm:px-8 sm:text-sm uppercase tracking-[0.08em] text-white transition-transform active:scale-95"
        >
          <LocalizedTextView value={wedding.copy.locationButton} />
        </a>
      </div>
    </section>
  );
}

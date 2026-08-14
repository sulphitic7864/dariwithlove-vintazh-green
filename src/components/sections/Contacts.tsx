import Image from "next/image";
import { LocalizedTextView } from "@/components/LocalizedText";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import { SectionTitle } from "@/components/SectionTitle";
import { SocialLinks } from "@/components/SocialLinks";
import { wedding } from "@/data/wedding";

export function Contacts() {
  const initials = `${wedding.couple.groom.slice(0, 1)}${wedding.couple.bride.slice(0, 1)}`;

  return (
    <section
      data-reveal
      className="relative isolate overflow-hidden px-10 pb-8 pt-5 opacity-0 translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 bg-[url('/decor/location_bg.png')] bg-bottom-right  bg-no-repeat"
    >
      {/* <ReferenceDecor preset="contacts" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[375px] text-center sm:max-w-[340px] lg:max-w-[590px]">
        <div className="relative mx-auto h-[320px] w-[252px] sm:h-[345px] sm:w-[290px] overflow-hidden rounded-[18px]">
          <Image src={'https://static.tildacdn.com/tild3334-3939-4537-a364-663862356636/pexels-cottonbro-937.jpg'} alt="" fill sizes="(min-width: 740px) 190px, 172px" className="object-cover grayscale" />
          {/* <Image src={wedding.assets.closingPhoto} alt="" fill sizes="(min-width: 640px) 190px, 172px" className="object-cover grayscale" /> */}
        </div>

        <SectionTitle className="mb-5 mt-7"><LocalizedTextView value={wedding.copy.contactsTitle} /></SectionTitle>

        <div className="mx-auto grid h-16 w-16 place-items-center sm:h-[70px] sm:w-[70px] rounded-full border border-black font-display text-[19px] italic sm:text-[21px]">
          {initials}
        </div>
        <p className="mx-auto mt-5 max-w-[255px] font-copy text-sm leading-[1.45] sm:max-w-[410px] sm:text-base text-black/70">
          <LocalizedTextView value={wedding.contact.text} />
        </p>
        <p className="mt-1 font-display text-xl uppercase sm:text-2xl  font-extralight tracking-[-0.02em] italic">{wedding.contact.name}</p>
        <a href={`tel:${wedding.contact.phone.replace(/[^+\d]/g, "")}`} className="inline-block  underline-offset-2  hover:underline    font-copy text-lg leading-[1.45]  text-black font-semibold mt-6">
          {wedding.contact.phone}
        </a>

        <SocialLinks />
      </div>
    </section>
  );
}

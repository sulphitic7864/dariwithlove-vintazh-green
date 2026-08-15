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
      className="relative isolate px-10 pb-8 pt-5 rounded-t-4xl opacity-0 translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 bg-[#005847] bg-no-repeat"
    >
      {/* <ReferenceDecor preset="contacts" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[375px] text-center sm:max-w-[340px] lg:max-w-[590px]">
        <SectionTitle className="pt-20 pb-10 text-2xl sm:text-3xl lg:text-5xl text-[#d39f4e]">
          <LocalizedTextView value={wedding.copy.contactsTitle} />
        </SectionTitle>

        <div className="mx-auto grid place-items-center sm:h-[130px] sm:w-[130px] rounded-full">
          <Image
            src={
              "/media/logo-dariwithlove.png"
            }
            alt=""
            height={130}
            width={130}
            className="object-cover rounded-full"
          />
        </div>
        <p className="mx-auto mt-5 max-w-[255px] font-copy text-sm leading-[1.45] sm:max-w-[410px] sm:text-base text-white/80">
          <LocalizedTextView value={wedding.contact.text} />
        </p>
        <p className="mt-1 font-display text-xl uppercase sm:text-2xl text-white/80 font-extralight tracking-[-0.02em] italic">
          {wedding.contact.name}
        </p>
        <a
          href={`tel:${wedding.contact.phone.replace(/[^+\d]/g, "")}`}
          className="inline-block  underline-offset-2  hover:underline font-copy text-lg leading-[1.45]  text-white/80 font-semibold mt-6"
        >
          {wedding.contact.phone}
        </a>

        <SocialLinks />
      </div>
    </section>
  );
}

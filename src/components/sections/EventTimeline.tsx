import Image from "next/image";
import { LocalizedTextView } from "@/components/LocalizedText";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import { SectionTitle } from "@/components/SectionTitle";
import { wedding } from "@/data/wedding";

export function EventTimeline() {
  return (
    <section
      data-reveal
      className="relative isolate overflow-hidden px-10 pb-12 pt-8 opacity-0 translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 bg-[url('/decor/deria_bg_img.png')] bg-bottom-right  bg-no-repeat "
    >
      {/* <ReferenceDecor preset="programme" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[275px] sm:max-w-[440px] lg:max-w-[490px]">
        <SectionTitle className="mb-10"><LocalizedTextView value={wedding.copy.timelineTitle} /></SectionTitle>

        <ol className="space-y-10 font-copy">
          {wedding.timeline.map((item) => (
            <li key={`${item.time}-${item.title.ky}`}>
              <div className="flex items-baseline text-[11.5px] uppercase sm:text-[13px] leading-none">
                <span className="mr-1">—</span>
                <strong className="mr-1.5 font-normal text-5xl font-light ">{item.time}</strong>
                <span className="font-light md:text-3xl text-base text-gray-800"><LocalizedTextView value={item.title} /></span>
              </div>
              {item.description ? (
                <p className="mt-1 pl-3  leading-[1.45] md:text-lg text-sm  text-black/60">
                  <LocalizedTextView value={item.description} />
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <blockquote className="mx-auto mt-20 max-w-[250px] text-center sm:max-w-[600px]">
          <span className="block font-serif text-[30px] leading-none sm:text-[85px]">“</span>
          <p className=" font-display md:text-3xl text-2xl uppercase  leading-[1.25] tracking-[-0.01em]">
            <LocalizedTextView value={wedding.copy.quote} />
          </p>
        </blockquote>

        <div className="relative mx-auto md:mt-20 mt-10 md:h-[525px] md:w-[470px] w-[250px]  h-[325px]  overflow-hidden rounded-[18px]">
          <Image src={"https://static.tildacdn.com/tild6535-3036-4166-b533-343261353330/pexels-cottonbro-937.jpg"} alt="" fill sizes="(min-width: 840px) 188px, 170px" className="object-cover grayscale" />
          {/* <Image src={wedding.assets.programmePhoto} alt="" fill sizes="(min-width: 640px) 188px, 170px" className="object-cover grayscale" /> */}
        </div>
      </div>
    </section>
  );
}

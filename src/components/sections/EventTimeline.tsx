import Image from "next/image";
import { LocalizedTextView } from "@/components/LocalizedText";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import { SectionTitle } from "@/components/SectionTitle";
import { wedding } from "@/data/wedding";

export function EventTimeline() {
  return (
    <section
      data-reveal
      className="relative isolate rounded-t-4xl overflow-hidden p-15 opacity-0 translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 bg-[#005847] bg-no-repeat "
    >
      {/* <ReferenceDecor preset="programme" /> */}
      <div className="relative z-10 mx-auto w-full text-[#d39f4e] max-w-[275px] sm:max-w-[440px] lg:max-w-[600px]">
        <SectionTitle className="mb-10 text-2xl sm:text-3xl lg:text-5xl">
          <LocalizedTextView value={wedding.copy.timelineTitle} />
        </SectionTitle>

        <ol className="space-y-10 font-copy">
          {wedding.timeline.map((item) => (
            <li key={`${item.time}-${item.title.ky}`}>
              <div className="flex items-baseline text-[11.5px] uppercase sm:text-[13px] leading-none">
                <span className="mr-1">—</span>
                <strong className="mr-1.5 font-normal text-3xl font-light ">
                  {item.time}
                </strong>
                <span className="font-light md:text-3xl text-base text-[#d39f4e]">
                  <LocalizedTextView value={item.title} />
                </span>
              </div>
              {item.description ? (
                <p className="mt-1 pl-3  leading-[1.45] md:text-lg text-sm  text-white/80">
                  <LocalizedTextView value={item.description} />
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

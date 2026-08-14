import { LocalizedTextView } from "@/components/LocalizedText";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import { SectionTitle } from "@/components/SectionTitle";
import { wedding } from "@/data/wedding";

export function Details() {
  return (
    <section
      data-reveal
      className="relative isolate overflow-hidden px-10 pb-14 pt-5 h-[100vh] opacity-100 bg-blur-sm translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 bg-[url('/decor/deria_bg_left.png')] bg-bottom-left  bg-no-repeat "
    >
      {/* <ReferenceDecor preset="details" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[275px] sm:max-w-[340px] lg:max-w-[590px] mt-20">
        <SectionTitle className="mb-6"><LocalizedTextView value={wedding.copy.detailsTitle} /></SectionTitle>
        <div className="space-y-10">
          {wedding.details.map((item) => (
            <article key={item.title.ky} className="font-copy">
              <h3 className="  font-display text-[17px] uppercase sm:text-3xl  font-extralight tracking-[-0.02em]">— <LocalizedTextView value={item.title} /></h3>
              <p className="font-copy text-base font-extralight leading-[1.45]  text-black/70 mt-4"><LocalizedTextView value={item.text} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

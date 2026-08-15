import { LocalizedTextView } from "@/components/LocalizedText";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import { wedding } from "@/data/wedding";
import Image from "next/image";

export function ThankYouFooter() {
  return (
    <footer
      data-reveal
      className="relative isolate overflow-hidden px-10 pb-14 pt-8 bg-[#005847] opacity-0 translate-y-3  transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100"
    >
      {/* <ReferenceDecor preset="footer" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[285px] text-center sm:max-w-[350px] ">
        <h2 className="font-display text-white/80 text-[31px] uppercase sm:text-[35px] leading-none tracking-[-0.045em]">
          <LocalizedTextView value={wedding.copy.footer.thankYou} />
        </h2>
        <div className="mx-auto grid place-items-center sm:h-[130px] sm:w-[130px]">
          <Image
            src={"/media/bird.svg"}
            alt=""
            height={70}
            width={70}
            className="object-cover"
          />
        </div>
      </div>
    </footer>
  );
}

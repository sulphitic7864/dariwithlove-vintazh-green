import { LocalizedTextView } from "@/components/LocalizedText";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import { wedding } from "@/data/wedding";

export function ThankYouFooter() {
  return (
    <footer
      data-reveal
      className="relative isolate overflow-hidden px-10 pb-14 pt-8 opacity-0 translate-y-3  transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100"
    >
      {/* <ReferenceDecor preset="footer" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[285px] text-center sm:max-w-[350px] ">
        <h2 className="font-display text-[31px] uppercase sm:text-[35px] leading-none tracking-[-0.045em]">
          <LocalizedTextView value={wedding.copy.footer.thankYou} />
        </h2>
        <p className="mt-5 font-copy text-[9px] uppercase sm:text-[10px] tracking-[0.06em]"><LocalizedTextView value={wedding.copy.footer.hostsLabel} /></p>
        <p className="mt-1 font-copy text-[11px] sm:text-[12px]"><LocalizedTextView value={wedding.hosts} /></p>
      </div>
    </footer>
  );
}

import { LocalizedTextView } from "@/components/LocalizedText";
import { PaperDecor } from "@/components/PaperDecor";
import { wedding } from "@/data/wedding";

export function Hero() {
  return (
    <section className="hero section-shell" id="hero">
      <PaperDecor variant="top" />
      <div className="hero__content">
        <p className="hero__eyebrow"><LocalizedTextView value={wedding.copy.heroSubtitle} /></p>
        <h1 className="hero__names">
          <span>{wedding.couple.groom}</span>
          <span className="hero__amp">&amp;</span>
          <span>{wedding.couple.bride}</span>
        </h1>
        <p className="hero__date"><LocalizedTextView value={wedding.event.displayDate} /></p>
      </div>
    </section>
  );
}

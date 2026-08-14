import Image from "next/image";
import { wedding } from "@/data/wedding";

type Props = Readonly<{
  variant?: "left" | "right" | "both" | "corner" | "top";
  className?: string;
}>;

export function PaperDecor({ variant = "both", className = "" }: Props) {
  const clusters = wedding.assets.decor.clusters;

  return (
    <div className={`paper-decor paper-decor--${variant} ${className}`} aria-hidden="true">
      <Image
        className="paper-decor__cluster paper-decor__cluster--top-left"
        src={clusters.topLeft}
        alt=""
        width={58}
        height={175}
        sizes="110px"
      />
      <Image
        className="paper-decor__cluster paper-decor__cluster--top-right"
        src={clusters.topRight}
        alt=""
        width={53}
        height={155}
        sizes="105px"
      />
      <Image
        className="paper-decor__cluster paper-decor__cluster--left"
        src={clusters.left1}
        alt=""
        width={62}
        height={250}
        sizes="120px"
      />
      <Image
        className="paper-decor__cluster paper-decor__cluster--right"
        src={clusters.right1}
        alt=""
        width={60}
        height={245}
        sizes="120px"
      />
      <Image
        className="paper-decor__flower paper-decor__flower--soft"
        src={wedding.assets.decor.flower}
        alt=""
        width={420}
        height={420}
        sizes="180px"
      />
      <Image
        className="paper-decor__leaf paper-decor__leaf--soft"
        src={wedding.assets.decor.leaf}
        alt=""
        width={180}
        height={120}
        sizes="90px"
      />
    </div>
  );
}

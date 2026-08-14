import Image from "next/image";
import { wedding } from "@/data/wedding";

type DecorPreset =
  | "invitation"
  | "programme"
  | "location"
  | "details"
  | "dress"
  | "rsvp"
  | "countdown"
  | "contacts"
  | "footer";

type Props = Readonly<{ preset: DecorPreset }>;

type Piece = Readonly<{ src: string; className: string; width: number; height: number }>;

function pieces(preset: DecorPreset): readonly Piece[] {
  const d = wedding.assets.decor.clusters;
  switch (preset) {
    case "invitation":
      return [
        { src: d.topLeft, className: "-top-2 left-0 w-[clamp(104px,12vw,180px)]", width: 58, height: 175 },
        { src: d.topRight, className: "-top-2 right-0 w-[clamp(108px,12vw,185px)]", width: 53, height: 155 },
        { src: d.right1, className: "top-[118px] -right-3 w-[clamp(95px,11vw,170px)] opacity-85", width: 60, height: 245 },
      ];
    case "programme":
      return [
        { src: d.right2, className: "-top-2 -right-4 w-[clamp(110px,12vw,190px)]", width: 60, height: 245 },
        { src: d.left1, className: "top-[270px] -left-4 w-[clamp(104px,12vw,180px)]", width: 62, height: 250 },
        { src: d.right1, className: "bottom-[22px] -right-5 w-[clamp(110px,12vw,190px)]", width: 60, height: 245 },
      ];
    case "location":
      return [
        { src: d.right2, className: "-top-9 -right-5 w-[clamp(112px,12vw,195px)]", width: 60, height: 245 },
        { src: d.bottomRight, className: "-bottom-12 -right-3 w-[clamp(126px,14vw,215px)]", width: 57, height: 155 },
      ];
    case "details":
      return [
        { src: d.right1, className: "top-[88px] -right-4 w-[clamp(118px,13vw,205px)]", width: 60, height: 245 },
        { src: d.left2, className: "bottom-[8px] -left-5 w-[clamp(112px,12vw,195px)] opacity-90", width: 62, height: 250 },
      ];
    case "dress":
      return [
        { src: d.right2, className: "top-[70px] -right-6 w-[clamp(122px,13vw,210px)]", width: 60, height: 245 },
        { src: d.left1, className: "bottom-[34px] -left-7 w-[clamp(128px,14vw,220px)]", width: 62, height: 250 },
      ];
    case "rsvp":
      return [
        { src: d.left1, className: "-top-10 -left-6 w-[clamp(122px,13vw,210px)]", width: 62, height: 250 },
        { src: d.right1, className: "bottom-[10px] -right-5 w-[clamp(116px,12vw,200px)]", width: 60, height: 245 },
      ];
    case "countdown":
      return [
        { src: d.right2, className: "-top-10 -right-4 w-[clamp(112px,12vw,195px)] opacity-80", width: 60, height: 245 },
      ];
    case "contacts":
      return [
        { src: d.left2, className: "top-[80px] -left-7 w-[clamp(126px,14vw,215px)]", width: 62, height: 250 },
        { src: d.bottomRight, className: "bottom-[2px] -right-2 w-[clamp(136px,15vw,230px)]", width: 57, height: 155 },
      ];
    case "footer":
      return [
        { src: d.bottomLeft, className: "-bottom-2 -left-1 w-[clamp(128px,14vw,220px)] opacity-90", width: 58, height: 155 },
        { src: d.bottomRight, className: "-bottom-2 -right-1 w-[clamp(128px,14vw,220px)] opacity-90", width: 57, height: 155 },
      ];
  }
}

export function ReferenceDecor({ preset }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {pieces(preset).map((piece, index) => (
        <Image
          key={`${preset}-${index}`}
          src={piece.src}
          alt=""
          width={piece.width}
          height={piece.height}
          sizes="140px"
          className={`absolute h-auto select-none ${piece.className}`}
        />
      ))}
    </div>
  );
}

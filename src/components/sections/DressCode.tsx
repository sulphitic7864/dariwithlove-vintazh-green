// import Image from "next/image";
// import { LocalizedTextView } from "@/components/LocalizedText";
// import { ReferenceDecor } from "@/components/ReferenceDecor";
// import { SectionTitle } from "@/components/SectionTitle";
// import { wedding } from "@/data/wedding";

// function OutfitStrip({ images }: Readonly<{ images: readonly string[] }>) {
//   return (
//     <div className="mt-4 flex w-full overflow-hidden">
//       {images.map((src, index) => (
//         <div key={`${src}-${index}`} className="relative h-[112px] min-w-[68px] sm:h-[328px] sm:min-w-[200px] flex-1">
//           <Image src={src} alt="" fill sizes="(min-width: 640px) 78px, 68px" className="object-cover" />
//         </div>
//       ))}
//     </div>
//   );
// }

// export function DressCode() {
//   return (
//     <section
//       data-reveal
//       className="relative isolate overflow-hidden pb-16 pt-8 opacity-0 translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100   bg-[url('/decor/deria_bg_img.png')] bg-bottom-right  bg-no-repeat"
//     >
//       {/* <ReferenceDecor preset="dress" /> */}
//       <div className="relative z-10 mx-auto  w-[520px] lg:w-[720px]">
//         <div className="mx-auto max-w-[275px] px-1 text-center sm:max-w-[400px] lg:max-w-[590px]">
//           <SectionTitle className="mb-5"><LocalizedTextView value={wedding.copy.dressCodeTitle} /></SectionTitle>
//           <p className="font-copy text-lg font-extralight leading-[1.45]  text-black/70 mt-4">
//             <LocalizedTextView value={wedding.dressCode.intro} />
//           </p>
//           <div className="relative mx-auto mt-10 h-[54px] w-[250px] sm:h-[94px] sm:w-[559px]">
//             <Image src={wedding.dressCode.paletteImage} alt="" fill sizes="(min-width: 640px) 230px, 205px" className="object-contain" />
//           </div>
//         </div>

//         <div className="mt-5">
//           <div className="mx-auto max-w-[275px] px-1 font-copy sm:max-w-[340px] lg:max-w-[590px]">
//             <h3 className="font-display text-[17px] uppercase sm:text-3xl  font-extralight tracking-[-0.02em]">— <LocalizedTextView value={wedding.dressCode.women.title} /></h3>
//             <p className="font-copy text-lg font-extralight leading-[1.45]  text-black/70 mt-4"><LocalizedTextView value={wedding.dressCode.women.text} /></p>
//           </div>
//           <OutfitStrip images={wedding.dressCode.women.images} />
//         </div>

//         <div className="mt-7">
//           <div className="mx-auto max-w-[275px] px-1 font-copy sm:max-w-[340px] lg:max-w-[590px]">
//             <h3 className="font-display text-[17px] uppercase sm:text-3xl  font-extralight tracking-[-0.02em]">— <LocalizedTextView value={wedding.dressCode.men.title} /></h3>
//             <p className="font-copy text-lg font-extralight leading-[1.45]  text-black/70 mt-4"><LocalizedTextView value={wedding.dressCode.men.text} /></p>
//           </div>
//           <OutfitStrip images={wedding.dressCode.men.images} />
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LocalizedTextView } from "@/components/LocalizedText";
import { SectionTitle } from "@/components/SectionTitle";
import { wedding } from "@/data/wedding";

function OutfitStrip({
  images,
}: Readonly<{
  images: readonly string[];
}>) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let animationFrame: number;
    let position = 0;

    // Change this value to control slider speed
    const speed = 0.5;

    const animate = () => {
      position += speed;

      // Because images are duplicated twice
      const halfWidth = track.scrollWidth / 2;

      if (position >= halfWidth) {
        position = 0;
      }

      track.style.transform = `translate3d(-${position}px, 0, 0)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Duplicate images for seamless infinite scrolling
  const sliderImages = [...images, ...images];

  return (
    <div
      className="
        relative
        left-1/2
        mt-5
        w-screen
        -translate-x-1/2
        overflow-hidden
      "
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
      >
        {sliderImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="
              relative
              h-[150px]
              w-[100px]
              shrink-0

              sm:h-[280px]
              sm:w-[175px]

              md:h-[320px]
              md:w-[195px]

              lg:h-[360px]
              lg:w-[220px]

              xl:h-[390px]
              xl:w-[240px]
            "
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="
                (min-width: 1280px) 240px,
                (min-width: 1024px) 220px,
                (min-width: 768px) 195px,
                (min-width: 640px) 175px,
                100px
              "
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DressCode() {
  return (
    <section
      data-reveal
      className="
        relative
        isolate
        overflow-hidden
        bg-[url('/decor/deria_bg_img.png')]
        bg-bottom-right
        bg-no-repeat
        pb-16
        pt-8
        opacity-0
        translate-y-3
        transition-all
        duration-[850ms]
        ease-out
        data-[revealed=true]:translate-y-0
        data-[revealed=true]:opacity-100
      "
    >
      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 mx-auto w-full max-w-[720px]">
        
        {/* =========================
            TITLE + INTRO
        ========================== */}
        <div
          className="
            mx-auto
            max-w-[275px]
            px-1
            text-center
            sm:max-w-[400px]
            lg:max-w-[590px]
          "
        >
          <SectionTitle className="mb-5">
            <LocalizedTextView value={wedding.copy.dressCodeTitle} />
          </SectionTitle>

          <p
            className="
              mt-4
              font-copy
              text-lg
              font-extralight
              leading-[1.45]
              text-black/70
            "
          >
            <LocalizedTextView value={wedding.dressCode.intro} />
          </p>

          {/* COLOR PALETTE */}
          <div
            className="
              relative
              mx-auto
              mt-10
              h-[54px]
              w-[250px]
              sm:h-[94px]
              sm:w-[559px]
            "
          >
            <Image
              src={wedding.dressCode.paletteImage}
              alt=""
              fill
              sizes="(min-width: 640px) 559px, 250px"
              className="object-contain"
            />
          </div>
        </div>

        {/* =========================
            WOMEN SECTION
        ========================== */}
        <div className="mt-5">
          <div
            className="
              mx-auto
              max-w-[275px]
              px-1
              font-copy
              sm:max-w-[340px]
              lg:max-w-[590px]
            "
          >
            <h3
              className="
                font-display
                text-[17px]
                font-extralight
                uppercase
                tracking-[-0.02em]
                sm:text-3xl
              "
            >
              —{" "}
              <LocalizedTextView
                value={wedding.dressCode.women.title}
              />
            </h3>

            <p
              className="
                mt-4
                font-copy
                text-lg
                font-extralight
                leading-[1.45]
                text-black/70
              "
            >
              <LocalizedTextView
                value={wedding.dressCode.women.text}
              />
            </p>
          </div>

          {/* FULL WIDTH AUTO SCROLL SLIDER */}
          <OutfitStrip images={wedding.dressCode.women.images} />
        </div>

        {/* =========================
            MEN SECTION
        ========================== */}
        <div className="mt-10">
          <div
            className="
              mx-auto
              max-w-[275px]
              px-1
              font-copy
              sm:max-w-[340px]
              lg:max-w-[590px]
            "
          >
            <h3
              className="
                font-display
                text-[17px]
                font-extralight
                uppercase
                tracking-[-0.02em]
                sm:text-3xl
              "
            >
              —{" "}
              <LocalizedTextView
                value={wedding.dressCode.men.title}
              />
            </h3>

            <p
              className="
                mt-4
                font-copy
                text-lg
                font-extralight
                leading-[1.45]
                text-black/70
              "
            >
              <LocalizedTextView
                value={wedding.dressCode.men.text}
              />
            </p>
          </div>

          {/* FULL WIDTH AUTO SCROLL SLIDER */}
          <OutfitStrip images={wedding.dressCode.men.images} />
        </div>
      </div>
    </section>
  );
}
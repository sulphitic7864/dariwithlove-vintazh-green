"use client";

import { wedding } from "@/data/wedding";
import { useActiveLanguage } from "@/lib/use-active-language";

export function OrderInvitation() {
  const language = useActiveLanguage(wedding.defaultLanguage);
  const copy = wedding.copy.order;

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto w-full max-w-[760px] px-3 pb-10 pt-11 text-center sm:px-6 sm:pb-12 sm:pt-14">
        <h2 className="font-display text-[20px] font-normal uppercase leading-[1.05] tracking-[-0.03em] sm:text-[25px] lg:text-4xl">
          {copy.title[language]}
        </h2>
        <p className="mx-auto mt-2 max-w-[430px] font-copy text-smleading-[1.35] text-black/55 sm:text-lg">
          {copy.subtitle[language]}
        </p>

        <form
          action="https://t.me/"
          target="_blank"
          className="
    mx-auto mt-10 grid w-full max-w-[620px]
    grid-cols-1 gap-6 text-left

    sm:mt-8
    sm:grid-cols-[minmax(0,1.05fr)_minmax(0,.9fr)_minmax(0,1.15fr)_auto]
    sm:items-end
    sm:gap-2
  "
        >
          <label className="w-full">
            <span className="mb-2 block font-copy text-base text-black sm:text-sm">
              {copy.name[language]}
            </span>

            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder={copy.namePlaceholder[language]}
              className="
        h-[52px] w-full
        rounded-none border border-black/60
        bg-white px-4
        font-copy text-sm
        outline-none
        placeholder:text-black/35
        focus:border-black

        sm:h-9 sm:px-2.5 sm:text-[10px]
      "
            />
          </label>

          <label className="w-full">
            <span className="mb-2 block font-copy text-base text-black sm:text-sm">
              {copy.phone[language]}
            </span>

            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={copy.phonePlaceholder[language]}
              className="
        h-[52px] w-full
        rounded-none border border-black/60
        bg-white px-4
        font-copy text-sm
        outline-none
        placeholder:text-black/35
        focus:border-black

        sm:h-9 sm:px-2.5 sm:text-[10px]
      "
            />
          </label>

          <label className="w-full">
            <span className="mb-2 block font-copy text-base text-black sm:text-sm">
              {copy.telegram[language]}
            </span>

            <input
              name="telegram"
              type="text"
              inputMode="url"
              placeholder={copy.telegramPlaceholder[language]}
              className="
        h-[52px] w-full
        rounded-none border border-black/60
        bg-white px-4
        font-copy text-sm
        outline-none
        placeholder:text-black/35
        focus:border-black

        sm:h-9 sm:px-2.5 sm:text-[9px]
      "
            />
          </label>

          <button
            type="submit"
            className="
      h-[52px] w-full
      border border-black
      bg-black
      px-5
      font-display text-base
      uppercase tracking-[0.04em]
      text-white

      sm:h-9
      sm:w-auto
      sm:min-w-[72px]
      sm:text-[8.5px]
    "
          >
            {copy.button[language]}
          </button>
        </form>

        <div className="mx-auto mt-10 max-w-[620px] font-copy text-sm leading-[1.35] text-[#9d3b35] sm:text-xl">
          <p className="font-semibold">{copy.noticeTitle[language]}</p>
          <p>{copy.note[language]}</p>
        </div>

        <p className="mx-auto mt-5 max-w-[620px] font-copy text-sm leading-[1.35] text-black/45 sm:text-base">
          {copy.privacy[language]}
        </p>

        <div className="mt-16 flex justify-center font-display md:text-5xl text-2xl tracking-[-0.04em] ">
          <img
            className="text-center"
            src="https://static.tildacdn.com/tild3436-3366-4730-a262-316632383135/dari_with_love.svg"
            alt=""
          />
        </div>
      </div>

      <div className="flex min-h-14 font-light items-center justify-center bg-[#171717] px-4 text-center font-sans text-sm tracking-[0.03em] text-white/80 sm:text-2xl">
        {copy.credit}
      </div>
    </section>
  );
}

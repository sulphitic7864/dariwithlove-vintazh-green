"use client";

import { useRef, useState, type FormEvent } from "react";
import { ReferenceDecor } from "@/components/ReferenceDecor";
import type { Language, LocalizedText } from "@/data/wedding";
import { useActiveLanguage } from "@/lib/use-active-language";

type Attendance = "yes" | "no";

type Props = Readonly<{
  defaultLanguage: Language;
  copy: Readonly<{
    title: LocalizedText;
    intro: LocalizedText;
    attendanceLabel: LocalizedText;
    attendanceYes: LocalizedText;
    attendanceNo: LocalizedText;
    nameLabel: LocalizedText;
    nameHint: LocalizedText;
    namePlaceholder: LocalizedText;
    drinksLabel: LocalizedText;
    drinksHint: LocalizedText;
    drinks: readonly Readonly<{ id: string; label: LocalizedText }>[];
    submit: LocalizedText;
    submitting: LocalizedText;
    success: LocalizedText;
    error: LocalizedText;
    validation: Readonly<{
      name: LocalizedText;
      attendance: LocalizedText;
    }>;
  }>;
}>;

export function RSVP({ defaultLanguage, copy }: Props) {
  const language = useActiveLanguage(defaultLanguage);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const inFlight = useRef(false);

  function toggleDrink(id: string) {
    setDrinks((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || status === "success") return;

    const cleanName = name.trim().replace(/\s+/g, " ");
    if (cleanName.length < 2)
      return setValidationMessage(copy.validation.name[language]);
    if (!attendance)
      return setValidationMessage(copy.validation.attendance[language]);

    setValidationMessage("");
    setStatus("submitting");
    inFlight.current = true;

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          attendance,
          drinks,
        }),
      });
      if (!response.ok) throw new Error("RSVP request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  const fieldText = "font-copy text-[10.5px] leading-[1.45] sm:text-[12px]";

  return (
    <section
      data-reveal
      className="relative isolate overflow-hidden rounded-4xl py-20 opacity-0 translate-y-3 transition-all duration-[850ms] ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 bg-[#005847]  bg-no-repeat "
    >
      {/* <ReferenceDecor preset="rsvp" /> */}
      <div className="relative z-10 mx-auto w-full max-w-[275px] sm:max-w-[340px] lg:max-w-[600px]">
        <h2 className="m-0 text-center text-[#d39f4e] font-display font-normal text-2xl sm:text-3xl lg:text-5xl uppercase leading-[0.98] tracking-[-0.045em]">
          {copy.title[language]}
        </h2>
        <p
          className={`font-copy md:!text-xl text-base text-white/80 font-extralight leading-[1.45] mt-4 text-center ${fieldText}`}
        >
          {copy.intro[language]}
        </p>

        {status === "success" ? (
          <div
            className="mt-9 border-y border-white/80 py-7 text-center font-copy   lg:!text-xl text-base"
            role="status"
          >
            <div className="mx-auto mb-3 grid h-7  w-7 place-items-center rounded-full border border-white">
              ✓
            </div>
            {copy.success[language]}
          </div>
        ) : (
          <form className="mt-7 space-y-6" onSubmit={submit} noValidate>
            <fieldset disabled={status === "submitting"}>
              <legend
                className={`mb-2 lg:!text-2xl text-base font-normal text-white/80 ${fieldText}`}
              >
                {copy.attendanceLabel[language]}
              </legend>
              <label
                className={`flex cursor-pointer items-center gap-2  lg:!text-base text-base font-normal text-white/80 ${fieldText}`}
              >
                <input
                  className="h-3.5 w-3.5  accent-[#d39f4e] sm:h-4 sm:w-4"
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={attendance === "yes"}
                  onChange={() => setAttendance("yes")}
                />
                <span>{copy.attendanceYes[language]}</span>
              </label>
              <label
                className={`mt-1.5 flex  lg:!text-base text-base font-normal text-white/80 cursor-pointer items-center gap-2 ${fieldText}`}
              >
                <input
                  className="h-3.5 w-3.5 accent-[#d39f4e] border-[#d39f4e] bg-[#005847] sm:h-4 sm:w-4"
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={attendance === "no"}
                  onChange={() => setAttendance("no")}
                />
                <span>{copy.attendanceNo[language]}</span>
              </label>
            </fieldset>

            <label className="block ">
              <span
                className={`block  md:!text-xl text-base text-white/80 font-normal ${fieldText}`}
              >
                {copy.nameLabel[language]}
              </span>
              <span
                className={`mt-1 block  md:text-base text-sm text-white/55 ${fieldText}`}
              >
                {copy.nameHint[language]}
              </span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={copy.namePlaceholder[language]}
                autoComplete="name"
                maxLength={100}
                disabled={status === "submitting"}
                className="mt-2 w-full border-0 border-b border-[#d39f4e] bg-transparent px-0 py-2.5 font-copy text-[11px] outline-none placeholder:text-white/35 focus:border-white sm:text-[12.5px]"
              />
            </label>

            <fieldset disabled={status === "submitting"}>
              <legend
                className={`font-semibold md:!text-xl text-base text-white/80  ${fieldText}`}
              >
                {copy.drinksLabel[language]}
              </legend>
              <p
                className={`mt-1 text-white/55   md:!text-base text-sm  font-normal  ${fieldText}`}
              >
                {copy.drinksHint[language]}
              </p>
              <div className="mt-2 space-y-1">
                {copy.drinks.map((drink) => (
                  <label
                    key={drink.id}
                    className={`flex cursor-pointer items-center gap-2 ${fieldText}`}
                  >
                    <input
                      className="h-3.5 w-3.5 accent-[#d39f4e] sm:h-4 sm:w-4"
                      type="checkbox"
                      checked={drinks.includes(drink.id)}
                      onChange={() => toggleDrink(drink.id)}
                    />
                    <span
                      className={` md:!text-base text-sm text-white/80 font-normal  ${fieldText}`}
                    >
                      {drink.label[language]}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {validationMessage ? (
              <p
                className={`text-[10px] text-red-800 sm:text-[11px] ${fieldText}`}
              >
                {validationMessage}
              </p>
            ) : null}
            {status === "error" ? (
              <p
                className={`text-[10px] text-red-800 sm:text-[11px] ${fieldText}`}
              >
                {copy.error[language]}
              </p>
            ) : null}

            <div className="text-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex mt-5 min-h-9 cursor-pointer items-center justify-center rounded-full bg-[#d39f4e] border border-white/80 px-8 font-sans text-[9px] sm:min-h-14 sm:px-9 sm:text-[10px] uppercase tracking-[0.09em] text-white transition-transform active:scale-95 disabled:opacity-55"
              >
                {status === "submitting"
                  ? copy.submitting[language]
                  : copy.submit[language]}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

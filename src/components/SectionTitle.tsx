import type { ReactNode } from "react";

export function SectionTitle({ children, className = "" }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <h2
      className={`m-0 text-center font-display  font-normal uppercase leading-[0.98] tracking-[-0.045em]  md:text-5xl text-3xl  ${className}`}
    >
      {children}
    </h2>
  );
}

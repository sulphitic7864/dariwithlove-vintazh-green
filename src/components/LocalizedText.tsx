import type { ElementType, ReactNode } from "react";
import type { LocalizableText, LocalizedText } from "@/data/wedding";
import { isLocalizedText } from "@/lib/i18n";

type Props = Readonly<{
  value: LocalizableText;
  as?: ElementType;
  className?: string;
}>;

export function LocalizedTextView({ value, as: Tag = "span", className }: Props) {
  if (!isLocalizedText(value)) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="lang lang-ky">{value.ky}</span>
      <span className="lang lang-ru">{value.ru}</span>
    </Tag>
  );
}

export function LocalizedRichText({
  value,
  ky,
  ru,
}: Readonly<{ value?: LocalizedText; ky?: ReactNode; ru?: ReactNode }>) {
  return (
    <>
      <span className="lang lang-ky">{ky ?? value?.ky}</span>
      <span className="lang lang-ru">{ru ?? value?.ru}</span>
    </>
  );
}

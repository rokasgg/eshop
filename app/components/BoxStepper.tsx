"use client";

import { useI18n } from "./I18nProvider";

// Whole-box quantity selector: every step is exactly one box.
export default function BoxStepper({
  value,
  onChange,
  min = 1,
  size = "md",
  disabled = false,
}: {
  value: number;
  onChange: (boxes: number) => void;
  min?: number;
  size?: "sm" | "md";
  disabled?: boolean;
}) {
  const { t, plural } = useI18n();
  const btn = `${size === "sm" ? "h-9 w-9" : "h-11 w-11"} flex shrink-0 items-center justify-center font-sans text-body-lg text-on-surface-variant transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-antique-gold-bright`;

  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-hairline-green bg-surface-container-lowest ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label={t.order.oneBoxLess}
        className={btn}
      >
        −
      </button>
      <span
        aria-live="polite"
        className={`min-w-[6.5rem] px-space-xs text-center font-sans font-semibold text-primary ${
          size === "sm" ? "text-body-sm" : "text-label-lg"
        }`}
      >
        {plural(value, t.common.boxes)}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        aria-label={t.order.oneBoxMore}
        className={btn}
      >
        +
      </button>
    </div>
  );
}

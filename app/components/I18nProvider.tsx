"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { format, localizePath, plural, type Locale, type PluralForms } from "@/lib/i18n";

const I18nContext = createContext<{ lang: Locale; dict: Dictionary } | null>(null);

export function I18nProvider({ lang, dict, children }: { lang: Locale; dict: Dictionary; children: React.ReactNode }) {
  const value = useMemo(() => ({ lang, dict }), [lang, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * t: the dictionary for the current language
 * plural: (n, forms) → "3 dėžutės" / "3 boxes"
 * href: localizes an internal path ("/shop" → "/en/shop" on the English site)
 * f: fills {placeholders}
 */
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  const { lang, dict } = ctx;
  return {
    lang,
    t: dict,
    plural: (n: number, forms: PluralForms) => plural(lang, n, forms),
    href: (path: string) => localizePath(path, lang),
    f: format,
  };
}

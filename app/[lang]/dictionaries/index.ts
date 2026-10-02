import { format, localizePath, plural, type Locale, type PluralForms } from "@/lib/i18n";
import type lt from "./lt.json";
import type en from "./en.json";

export type Dictionary = typeof lt;

// Compile-time guard: en.json must have the same shape as lt.json
const enMatchesLt: typeof en extends Dictionary ? true : never = true;
void enMatchesLt;

// Loaded per request so a page only ships its own language to the client
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  lt: () => import("./lt.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export const getDictionary = (lang: Locale) => dictionaries[lang]();

/** Server-side counterpart of useI18n() for server components. */
export async function getI18n(lang: Locale) {
  const t = await getDictionary(lang);
  return {
    lang,
    t,
    plural: (n: number, forms: PluralForms) => plural(lang, n, forms),
    href: (path: string) => localizePath(path, lang),
    f: format,
  };
}

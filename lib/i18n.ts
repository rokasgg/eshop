// Locale config shared by the proxy, server components and client components.
// Lithuanian is the default and keeps unprefixed URLs (/shop); English is /en/shop.
export const locales = ["lt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "lt";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Adds the /en prefix where needed; Lithuanian paths stay as they are. */
export function localizePath(path: string, lang: Locale) {
  if (lang === defaultLocale || !path.startsWith("/")) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Strips a locale prefix: "/en/shop" → "/shop". */
export function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(lt|en)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

// Plural forms follow Intl.PluralRules categories. Lithuanian uses one/few/other
// (1 dėžutė, 2 dėžutės, 10 dėžučių); English uses one/other. "{n}" is replaced.
export type PluralForms = { one: string; few?: string; many?: string; other: string };

const pluralRules: Record<Locale, Intl.PluralRules> = {
  lt: new Intl.PluralRules("lt"),
  en: new Intl.PluralRules("en"),
};

export function plural(lang: Locale, n: number, forms: PluralForms) {
  const category = pluralRules[lang].select(n) as keyof PluralForms;
  return (forms[category] ?? forms.other).replace("{n}", String(n));
}

/** Replaces {name} placeholders. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, key) => (key in values ? String(values[key]) : m));
}

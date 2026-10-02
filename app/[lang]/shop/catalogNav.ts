"use client";

import { localizePath, type Locale } from "@/lib/i18n";

// Catalog state lives in the URL (?kategorija=…&paieska=…). pushState keeps it
// client-side (no server refetch) while staying in sync with useSearchParams,
// so the back button walks through categories and back to the picker.
export function catalogHref(lang: Locale, { kategorija, paieska }: { kategorija?: string; paieska?: string }) {
  const params = new URLSearchParams();
  if (kategorija) params.set("kategorija", kategorija);
  if (paieska) params.set("paieska", paieska);
  const qs = params.toString();
  const base = localizePath("/shop", lang);
  return qs ? `${base}?${qs}` : base;
}

export function goToCatalog(
  lang: Locale,
  target: { kategorija?: string; paieska?: string },
  { scrollTop = false }: { scrollTop?: boolean } = {}
) {
  window.history.pushState(null, "", catalogHref(lang, target));
  if (scrollTop) window.scrollTo({ top: 0 });
}

// Lets a real <a href> open in a new tab on ctrl/cmd/middle click,
// and navigate client-side on a plain click.
export function isPlainClick(e: React.MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

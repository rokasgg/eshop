"use client";

import Link from "next/link";
import { CATALOG_CATEGORIES, type CatalogCategory } from "@/lib/categories";
import { catalogHref, goToCatalog, isPlainClick } from "./catalogNav";
import { useI18n } from "@/app/components/I18nProvider";
import type { ShopProduct } from "./ShopClient";

// Category switcher above the results; "back" returns to the picker.
export default function CategoryBar({ products, active }: { products: ShopProduct[]; active: CatalogCategory }) {
  const { t, lang } = useI18n();
  return (
    <nav aria-label={t.catalog.categoriesAria} className="mb-4 flex items-center gap-3 overflow-x-auto pb-1">
      <Link
        href={catalogHref(lang, {})}
        onClick={(e) => {
          if (!isPlainClick(e)) return;
          e.preventDefault();
          goToCatalog(lang, {}, { scrollTop: true });
        }}
        className="flex shrink-0 items-center gap-1 font-sans text-[12px] font-semibold text-secondary transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[16px]!" aria-hidden="true">
          arrow_back
        </span>
        {t.catalog.allCategories}
      </Link>
      <span className="h-5 w-px shrink-0 bg-outline-variant/60" aria-hidden="true" />
      <ul className="flex gap-1.5">
        {CATALOG_CATEGORIES.map((c) => {
          const count = products.filter(c.match).length;
          if (count === 0) return null;
          const isActive = c.slug === active.slug;
          return (
            <li key={c.slug}>
              <Link
                href={catalogHref(lang, { kategorija: c.slug })}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  if (!isPlainClick(e)) return;
                  e.preventDefault();
                  goToCatalog(lang, { kategorija: c.slug });
                }}
                className={`flex h-[30px] items-center gap-1.5 whitespace-nowrap rounded-[999px] border px-3 font-sans text-[12px] font-medium transition-colors ${
                  isActive
                    ? "border-primary-container bg-primary-container text-white"
                    : "border-outline-variant/50 bg-surface-container text-charcoal-ink hover:border-outline-variant hover:bg-surface-container-high"
                }`}
              >
                {t.categories[c.slug].label}
                <span className={isActive ? "text-antique-gold-bright" : "text-on-surface-variant/70"}>{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

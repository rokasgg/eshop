"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ALL_CATEGORY_SLUG, CATALOG_CATEGORIES, positionsLabel } from "@/lib/categories";
import { catalogHref, goToCatalog, isPlainClick } from "./catalogNav";
import type { ShopProduct } from "./ShopClient";

// Entry view of /shop: pick a category first, or jump straight to search.
export default function CategoryPicker({ products }: { products: ShopProduct[] }) {
  const [query, setQuery] = useState("");

  const tiles = CATALOG_CATEGORIES.map((c) => {
    const items = products.filter(c.match);
    return {
      ...c,
      count: items.length,
      isCategoryPhoto: !!c.image,
      image: c.image ?? items.find((p) => p.image_url)?.image_url ?? null,
    };
  }).filter((t) => t.count > 0);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    goToCatalog({ kategorija: ALL_CATEGORY_SLUG, paieska: query.trim() || undefined }, { scrollTop: true });
  };

  return (
    <section className="mx-auto max-w-[1440px] px-margin-mobile pb-space-xl pt-6 lg:px-margin-desktop">
      <div className="mb-4">
        <span className="font-sans text-[10.5px] uppercase tracking-widest text-antique-gold-muted">
          {positionsLabel(products.length)} · {tiles.length - 1} kategorijos
        </span>
        <h2 className="mt-1 font-serif text-[26px] leading-tight text-primary">Pasirinkite arbatos kategoriją</h2>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => {
          const isAll = tile.slug === ALL_CATEGORY_SLUG;
          return (
            <li key={tile.slug}>
              <Link
                href={catalogHref({ kategorija: tile.slug })}
                onClick={(e) => {
                  if (!isPlainClick(e)) return;
                  e.preventDefault();
                  goToCatalog({ kategorija: tile.slug }, { scrollTop: true });
                }}
                className={`group flex h-full overflow-hidden rounded-[14px] border transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold-bright motion-reduce:transform-none ${
                  isAll
                    ? "border-primary-container bg-primary-container text-parchment-deep hover:shadow-[0_10px_28px_rgba(11,41,27,0.25)]"
                    : "border-hairline-green bg-surface-container-lowest shadow-[0_1px_2px_rgba(11,41,27,0.04)] hover:border-hairline-gold hover:shadow-[0_10px_28px_rgba(11,41,27,0.08)]"
                }`}
              >
                <div className="relative m-[7px] w-[38%] shrink-0 overflow-hidden rounded-[10px] bg-surface-container-high">
                  {tile.image ? (
                    <Image
                      src={tile.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 12vw, (min-width: 640px) 18vw, 38vw"
                      // Category photos are lifestyle shots; product packshots keep the top (logo) in view
                      className={`object-cover ${tile.isCategoryPhoto ? "object-center" : "object-top"} transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col py-4 pl-2 pr-4">
                  <span
                    className={`font-sans text-[10px] font-bold uppercase tracking-[0.14em] ${
                      isAll ? "text-antique-gold-bright" : "text-antique-gold-muted"
                    }`}
                  >
                    {tile.eyebrow}
                  </span>
                  <h3 className={`mt-1 font-serif text-[22px] leading-tight ${isAll ? "" : "text-primary"}`}>
                    {tile.label}
                  </h3>
                  <p className={`mt-1 font-sans text-[12.5px] leading-snug ${isAll ? "text-parchment-deep/75" : "text-on-surface-variant"}`}>
                    {tile.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className={`font-sans text-[12px] ${isAll ? "text-parchment-deep/80" : "text-on-surface-variant"}`}>
                      {positionsLabel(tile.count)}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[18px]! transition-transform duration-300 group-hover:translate-x-0.5 ${
                        isAll ? "text-antique-gold-bright" : "text-secondary"
                      }`}
                      aria-hidden="true"
                    >
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Repeat buyers often know the SKU: skip the categories */}
      <form
        onSubmit={search}
        className="mt-5 flex flex-col gap-3 rounded-[14px] border border-hairline-green bg-surface-container-low px-4 py-3 sm:flex-row sm:items-center"
      >
        <label htmlFor="catalog-quick-search" className="shrink-0 font-sans text-[13px] text-on-surface-variant">
          Žinote, ko ieškote?
        </label>
        <div className="relative flex h-11 flex-1 items-center rounded-[10px] border border-outline-variant/70 bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/40">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px]! text-on-surface-variant" aria-hidden="true">
            search
          </span>
          <input
            id="catalog-quick-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ieškokite pagal pavadinimą ar SKU…"
            className="h-full w-full rounded-[10px] bg-transparent pl-10 pr-3 font-sans text-[14px] text-charcoal-ink outline-none placeholder:text-outline"
          />
        </div>
        <button
          type="submit"
          className="h-11 shrink-0 rounded-[10px] bg-primary-container px-5 font-sans text-[13px] font-bold uppercase tracking-[0.05em] text-white transition-colors hover:bg-racing-green-dark"
        >
          Ieškoti
        </button>
      </form>
    </section>
  );
}

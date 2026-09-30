"use client";

import { useMemo, useState } from "react";
import type { OccasionTag, ShopProduct, TeaCategory } from "../ShopClient";
import { boxPrice, perCupPrice } from "../ShopClient";
import OccasionNavigator from "./OccasionNavigator";
import FilterBar, { type HotelSortKey } from "./FilterBar";
import HotelProductCard from "./HotelProductCard";
import EquipmentShowcase from "./EquipmentShowcase";

export default function HotelsCatalogClient({ products }: { products: ShopProduct[] }) {
  const [occasion, setOccasion] = useState<OccasionTag | "all">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<HotelSortKey>("default");
  const [category, setCategory] = useState<TeaCategory | "all">("all");
  const [size, setSize] = useState<string | "all">("all");
  const [caffeine, setCaffeine] = useState<"all" | "high" | "none">("all");

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.tea_category).filter((c): c is TeaCategory => !!c))),
    [products]
  );
  const packageSizes = useMemo(
    () => Array.from(new Set(products.map((p) => p.package_size).filter((s): s is string => !!s))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesOccasion =
        occasion === "all" || !p.occasion_tags?.length || p.occasion_tags.includes(occasion);
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.flavor_tags?.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = category === "all" || p.tea_category === category;
      const matchesSize = size === "all" || p.package_size === size;
      const matchesCaffeine =
        caffeine === "all" ||
        (caffeine === "high" && (p.caffeine_level ?? 0) >= 4) ||
        (caffeine === "none" && (p.caffeine_level ?? 0) === 0);
      return matchesOccasion && matchesSearch && matchesCategory && matchesSize && matchesCaffeine;
    });
  }, [products, occasion, search, category, size, caffeine]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => boxPrice(a) - boxPrice(b));
      case "price-desc":
        return list.sort((a, b) => boxPrice(b) - boxPrice(a));
      case "cup-asc":
        return list.sort((a, b) => (perCupPrice(a) ?? Infinity) - (perCupPrice(b) ?? Infinity));
      case "caffeine":
        return list.sort((a, b) => (b.caffeine_level ?? 0) - (a.caffeine_level ?? 0));
      default:
        return list;
    }
  }, [filtered, sort]);

  return (
    <>
      <OccasionNavigator active={occasion} onChange={setOccasion} />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
        packageSizes={packageSizes}
        activeSize={size}
        onSizeChange={setSize}
        caffeineFilter={caffeine}
        onCaffeineChange={setCaffeine}
      />

      <section className="w-full bg-surface px-margin-mobile py-space-xl lg:px-margin-desktop">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-space-md font-sans text-body-md text-on-surface-variant">
            {sorted.length} produkt{sorted.length !== 1 ? "ai" : "as"}
          </p>

          {sorted.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center text-on-surface-variant/60">
              <p className="font-sans text-body-lg font-medium">Nė vienas produktas neatitinka filtrų.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3 lg:gap-gutter">
              {sorted.map((product, index) => (
                <HotelProductCard key={product.id} product={product} priority={index < 3} />
              ))}
            </div>
          )}
        </div>
      </section>

      <EquipmentShowcase />
    </>
  );
}

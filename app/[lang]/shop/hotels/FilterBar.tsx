"use client";

import { useCart } from "@/app/context/CartContext";
import { useI18n } from "@/app/components/I18nProvider";
import type { TeaCategory } from "../ShopClient";

export type HotelSortKey = "default" | "price-asc" | "price-desc" | "cup-asc" | "caffeine" | "name";

// Chip order in the filter bar; labels live in the dictionaries under teaCategories
const CATEGORY_ORDER: TeaCategory[] = ["black", "green", "white_oolong", "herbal", "fruit"];

const SORT_KEYS: HotelSortKey[] = ["default", "price-asc", "price-desc", "cup-asc", "caffeine", "name"];

// Layout follows new_design/filterHotelCards.
export default function FilterBar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  categories,
  activeCategory,
  onCategoryChange,
  packageSizes,
  activeSize,
  onSizeChange,
  caffeineFilter,
  onCaffeineChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  sort: HotelSortKey;
  onSortChange: (v: HotelSortKey) => void;
  categories: TeaCategory[];
  activeCategory: TeaCategory | "all";
  onCategoryChange: (v: TeaCategory | "all") => void;
  packageSizes: string[];
  activeSize: string | "all";
  onSizeChange: (v: string | "all") => void;
  caffeineFilter: "all" | "high" | "none";
  onCaffeineChange: (v: "all" | "high" | "none") => void;
}) {
  const { totalBoxes, openCart } = useCart();
  const { t, plural, f } = useI18n();

  // "Be kofeino" is shown as a tea type, but it's still the caffeine filter
  // underneath, so it and the tea categories are mutually exclusive here.
  const caffeineFree = caffeineFilter === "none";
  const pickCategory = (cat: TeaCategory | "all") => {
    onCategoryChange(cat);
    if (caffeineFree) onCaffeineChange("all");
  };
  const pickCaffeineFree = () => {
    onCategoryChange("all");
    onCaffeineChange("none");
  };

  return (
    <section className="w-full bg-surface px-margin-mobile pt-4 lg:px-margin-desktop">
      <div className="mx-auto max-w-[1440px] rounded-[14px] border border-primary-container/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(247,243,235,0.75))] p-3.5 shadow-[0_10px_30px_rgba(30,40,34,0.035),0_2px_5px_rgba(30,40,34,0.025)] md:rounded-[16px] md:px-5 md:py-4">
        {/* Search · sort · order */}
        <div className="grid grid-cols-1 items-center gap-3 md:max-[1249px]:grid-cols-[1fr_auto] min-[1250px]:grid-cols-[minmax(320px,1fr)_auto_auto]">
          <label className="relative flex h-11 items-center rounded-[10px] border border-outline-variant/70 bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/40">
            <span className="sr-only">{t.hotels.searchLabel}</span>
            <span
              className="material-symbols-outlined pointer-events-none absolute left-3.5 text-[20px] text-on-surface-variant"
              aria-hidden="true"
            >
              search
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.hotels.searchPlaceholder}
              className="h-full w-full rounded-[10px] bg-transparent pl-11 pr-3.5 font-sans text-[14px] text-charcoal-ink outline-none placeholder:text-outline"
            />
          </label>

          <label className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-2.5 md:max-[1249px]:col-start-2 md:max-[1249px]:row-start-1">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-charcoal-ink">
              {t.hotels.sortLabel}
            </span>
            <span className="relative">
              <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value as HotelSortKey)}
                className="h-11 w-full cursor-pointer appearance-none rounded-[10px] border border-outline-variant/70 bg-surface-container-lowest pl-3.5 pr-10 font-sans text-[14px] text-charcoal-ink outline-none focus:ring-2 focus:ring-secondary/40 md:min-w-52"
              >
                {SORT_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {t.hotels.sort[key]}
                  </option>
                ))}
              </select>
              <span
                className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant"
                aria-hidden="true"
              >
                expand_more
              </span>
            </span>
          </label>

          <button
            type="button"
            onClick={openCart}
            aria-label={f(t.hotels.orderAria, { boxes: plural(totalBoxes, t.common.boxes) })}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-antique-gold-muted/45 bg-primary-container px-4 font-sans text-[14px] font-bold tracking-[0.03em] text-white shadow-[0_5px_12px_rgba(7,57,40,0.12)] transition-[background-color,transform] duration-150 hover:bg-racing-green-dark active:translate-y-px md:w-auto md:max-[1249px]:col-start-2"
          >
            <span className="material-symbols-outlined text-[17px] text-antique-gold-muted" aria-hidden="true">
              shopping_cart
            </span>
            <span>{t.hotels.order}</span>
            <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[999px] bg-antique-gold-bright px-1.5 text-[11px] font-extrabold text-charcoal-ink">
              {totalBoxes}
            </span>
          </button>
        </div>

        {/* Filter groups */}
        {/* From 1400px the minimums keep every group's chips on one line (the
            shortest toolbar); between 1250–1399px chips may wrap within a column. */}
        <div className="mt-3 grid grid-cols-1 gap-3 min-[1250px]:items-center min-[1250px]:gap-4 min-[1250px]:max-[1399px]:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1.55fr)_auto_minmax(150px,0.6fr)] min-[1400px]:grid-cols-[minmax(430px,1.2fr)_auto_minmax(550px,1.55fr)_auto_minmax(160px,0.6fr)]">
          <FilterGroup icon="eco" label={t.hotels.groupType}>
            <Chip active={activeCategory === "all" && !caffeineFree} onClick={() => pickCategory("all")}>
              {t.hotels.all}
            </Chip>
            {CATEGORY_ORDER.filter((cat) => categories.includes(cat)).map((cat) => (
              <Chip key={cat} active={activeCategory === cat && !caffeineFree} onClick={() => pickCategory(cat)}>
                {t.teaCategories[cat]}
              </Chip>
            ))}
            <Chip active={caffeineFree} onClick={pickCaffeineFree}>
              {t.hotels.caffeineFree}
            </Chip>
          </FilterGroup>

          <Divider />

          <FilterGroup icon="inventory_2" label={t.hotels.groupPackage}>
            <Chip active={activeSize === "all"} onClick={() => onSizeChange("all")}>
              {t.hotels.allSizes}
            </Chip>
            {packageSizes.map((size) => (
              <Chip key={size} active={activeSize === size} onClick={() => onSizeChange(size)}>
                {size}
              </Chip>
            ))}
          </FilterGroup>

          <Divider />

          <FilterGroup icon="bolt" label={t.hotels.groupCaffeine}>
            <Chip active={caffeineFilter === "all"} onClick={() => onCaffeineChange("all")}>
              {t.hotels.allLevels}
            </Chip>
            <Chip active={caffeineFilter === "high"} onClick={() => onCaffeineChange("high")}>
              {t.hotels.highCaffeine}
            </Chip>
          </FilterGroup>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="min-w-0">
      <div className="mb-1.5 flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-on-primary-fixed-variant">
        <span className="material-symbols-outlined text-[15px] text-antique-gold-muted" aria-hidden="true">
          {icon}
        </span>
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-9 w-px self-center bg-outline-variant/35 min-[1250px]:block" aria-hidden="true" />;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-[30px] whitespace-nowrap rounded-[999px] border px-3 font-sans text-[12px] font-medium transition-[background-color,border-color,color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold-bright ${
        active
          ? "border-primary-container bg-primary-container text-white hover:bg-racing-green-dark"
          : "border-outline-variant/50 bg-surface-container text-charcoal-ink hover:-translate-y-px hover:border-outline-variant hover:bg-surface-container-high"
      }`}
    >
      {children}
    </button>
  );
}

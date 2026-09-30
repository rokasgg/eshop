import { useCart } from "../../context/CartContext";
import type { TeaCategory } from "../ShopClient";

export type HotelSortKey = "default" | "price-asc" | "price-desc" | "cup-asc" | "caffeine";

const CATEGORY_LABELS: Record<TeaCategory, string> = {
  black: "Juodoji",
  green: "Žalioji",
  herbal: "Žolelių & Vaisių",
  white_oolong: "Baltoji / Oolong",
};

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
  const { totalItems, openCart } = useCart();

  return (
    <section className="top-20 z-40 w-full bg-surface/95 px-margin-mobile py-space-md shadow-sm backdrop-blur-md lg:px-margin-desktop">
      <div className="mx-auto max-w-[1440px] space-y-space-md">
        {/* Search + sort + cart */}
        <div className="flex flex-col items-center justify-between gap-space-md md:flex-row">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-[20px] text-outline" aria-hidden="true">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ieškoti pagal pavadinimą, SKU ar skonį…"
              className="w-full rounded-lg bg-surface-container-low py-2.5 pl-11 pr-space-md font-sans text-body-md text-on-surface transition focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div className="flex w-full items-center justify-end gap-space-md md:w-auto">
            <div className="flex items-center gap-space-xs">
              <span className="font-sans text-label-sm uppercase text-on-surface-variant">Rikiuoti:</span>
              <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value as HotelSortKey)}
                className="cursor-pointer rounded-lg bg-surface-container-low px-space-md py-2 font-sans text-label-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
              >
                <option value="default">Numatyta tvarka</option>
                <option value="price-asc">Kaina dėžutei (nuo mažiausios)</option>
                <option value="price-desc">Kaina dėžutei (nuo didžiausios)</option>
                <option value="cup-asc">Kaina puodeliui (€/vnt.)</option>
                <option value="caffeine">Kofeino intensyvumą</option>
              </select>
            </div>
            <button
              onClick={openCart}
              className="relative flex items-center gap-space-xs rounded-lg bg-primary-container px-space-md py-2 text-parchment-deep shadow-sm transition-all hover:bg-racing-green-dark"
            >
              <span className="material-symbols-outlined text-[18px] text-antique-gold-bright" aria-hidden="true">shopping_cart</span>
              <span className="font-sans text-label-lg">Užsakymas</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-antique-gold-bright text-[11px] font-bold text-primary">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-space-xs overflow-x-auto pb-1 font-sans text-label-sm">
          <span className="mr-space-xs font-bold uppercase tracking-wider text-on-surface-variant">Tipas:</span>
          <Pill active={activeCategory === "all"} onClick={() => onCategoryChange("all")}>Visi</Pill>
          {categories.map((cat) => (
            <Pill key={cat} active={activeCategory === cat} onClick={() => onCategoryChange(cat)}>
              {CATEGORY_LABELS[cat]}
            </Pill>
          ))}

          {packageSizes.length > 0 && (
            <>
              <span className="mx-space-xs text-outline-variant/60">|</span>
              <span className="mr-space-xs font-bold uppercase tracking-wider text-on-surface-variant">Pakuotė:</span>
              <Pill active={activeSize === "all"} onClick={() => onSizeChange("all")}>Visos</Pill>
              {packageSizes.map((size) => (
                <Pill key={size} active={activeSize === size} onClick={() => onSizeChange(size)}>
                  {size}
                </Pill>
              ))}
            </>
          )}

          <span className="mx-space-xs text-outline-variant/60">|</span>
          <span className="mr-space-xs font-bold uppercase tracking-wider text-on-surface-variant">Kofeinas:</span>
          <Pill active={caffeineFilter === "all"} onClick={() => onCaffeineChange("all")}>Visi lygiai</Pill>
          <Pill active={caffeineFilter === "high"} onClick={() => onCaffeineChange("high")}>Didelis</Pill>
          <Pill active={caffeineFilter === "none"} onClick={() => onCaffeineChange("none")}>Be kofeino</Pill>
        </div>
      </div>
    </section>
  );
}

function Pill({
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
      onClick={onClick}
      className={`rounded-full px-space-md py-1 font-semibold transition-colors ${active
          ? "bg-primary-container text-parchment-deep"
          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
        }`}
    >
      {children}
    </button>
  );
}

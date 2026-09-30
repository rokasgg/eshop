"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export type TeaCategory = "black" | "green" | "herbal" | "white_oolong";
export type OccasionTag = "breakfast" | "afternoon" | "rooms" | "spa";

export type ShopProduct = {
  id: string;
  name: string;
  image_url: string | null;
  package_size: string | null;
  price_wholesale: number;
  moq: number;
  sku: string | null;
  description?: string | null;
  single_unit_fee: number;
  tea_type: "loose" | "bags" | null;
  tea_category?: TeaCategory | null;
  caffeine_level?: number | null;
  flavor_tags?: string[] | null;
  occasion_tags?: OccasionTag[] | null;
  units_per_package?: number | null;
  package_weight_grams?: number | null;
};

const TEA_TYPE_LABELS: Record<"loose" | "bags", string> = {
  loose: "Loose Tea",
  bags: "Tea Bags",
};

export function piecePrice(product: ShopProduct) {
  return product.price_wholesale + product.single_unit_fee;
}

export function boxPrice(product: ShopProduct) {
  return product.price_wholesale * product.moq;
}

// Standard loose-tea serving size, used only when a loose product has a known
// net weight but no explicit serving count — lets buyers compare price-per-cup
// across bags and loose tea without doing the gram math themselves.
const DEFAULT_LOOSE_GRAMS_PER_CUP = 2;

export function perCupPrice(product: ShopProduct): number | null {
  if (product.units_per_package && product.units_per_package > 0) {
    return product.price_wholesale / product.units_per_package;
  }
  if (product.tea_type === "loose" && product.package_weight_grams && product.package_weight_grams > 0) {
    const servings = product.package_weight_grams / DEFAULT_LOOSE_GRAMS_PER_CUP;
    return product.price_wholesale / servings;
  }
  return null;
}

type SortKey = "default" | "price-asc" | "price-desc" | "name";

export default function ShopClient({ products }: { products: ShopProduct[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const { items, addItem, updateQty } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<("loose" | "bags")[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const packageSizes = useMemo(
    () => Array.from(new Set(products.map((p) => p.package_size).filter((s): s is string => !!s))).sort(),
    [products]
  );

  const teaTypes = useMemo(
    () => Array.from(new Set(products.map((p) => p.tea_type).filter((t): t is "loose" | "bags" => !!t))),
    [products]
  );

  const maxBox = Math.max(0, ...products.map(boxPrice));
  const [maxPrice, setMaxPrice] = useState(maxBox);

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const toggleType = (type: "loose" | "bags") =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const clearFilters = () => {
    setSearch("");
    setSelectedSizes([]);
    setSelectedTypes([]);
    setMaxPrice(maxBox);
  };

  const activeFiltersCount =
    (search.trim() ? 1 : 0) +
    selectedSizes.length +
    selectedTypes.length +
    (maxPrice < maxBox ? 1 : 0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q);
      const matchesSize = selectedSizes.length === 0 || (p.package_size && selectedSizes.includes(p.package_size));
      const matchesType = selectedTypes.length === 0 || (p.tea_type && selectedTypes.includes(p.tea_type));
      const matchesPrice = boxPrice(p) <= maxPrice;
      return matchesSearch && matchesSize && matchesType && matchesPrice;
    });
  }, [products, search, selectedSizes, selectedTypes, maxPrice]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price_wholesale - b.price_wholesale);
      case "price-desc":
        return list.sort((a, b) => b.price_wholesale - a.price_wholesale);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [filtered, sort]);

  const handleAddBox = (product: ShopProduct) => {
    addItem({
      id: product.id,
      name: `${product.name} (box)`,
      price: product.price_wholesale,
      imageUrl: product.image_url,
      moq: product.moq,
      sku: product.sku,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const pieceQty = (product: ShopProduct) =>
    items.find((i) => i.id === `${product.id}-piece`)?.quantity ?? 0;

  const incPiece = (product: ShopProduct) => {
    addItem({
      id: `${product.id}-piece`,
      name: `${product.name} (1 vnt.)`,
      price: piecePrice(product),
      imageUrl: product.image_url,
      moq: 1,
      sku: product.sku,
    });
  };

  const decPiece = (product: ShopProduct) => {
    updateQty(`${product.id}-piece`, pieceQty(product) - 1);
  };

  const filterPanel = (
    <div className="space-y-space-xl">
      {/* Search */}
      <div>
        <h3 className="mb-space-sm font-sans text-label-sm uppercase tracking-widest text-on-surface-variant">
          Paieška
        </h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pavadinimas ar SKU…"
          className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 font-sans text-body-md text-on-surface placeholder:text-on-surface-variant/60 transition focus:border-secondary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-secondary/30"
        />
      </div>

      {/* Tea type */}
      {teaTypes.length > 0 && (
        <div>
          <h3 className="mb-space-sm font-sans text-label-sm uppercase tracking-widest text-on-surface-variant">
            Arbatos Tipas
          </h3>
          <ul className="space-y-2.5">
            {teaTypes.map((type) => (
              <li key={type}>
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="h-4 w-4 rounded border-outline-variant accent-primary"
                  />
                  <span className="font-sans text-body-md text-on-surface-variant transition group-hover:text-on-surface">
                    {TEA_TYPE_LABELS[type]}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Package size */}
      {packageSizes.length > 0 && (
        <div>
          <h3 className="mb-space-sm font-sans text-label-sm uppercase tracking-widest text-on-surface-variant">
            Pakuotės Dydis
          </h3>
          <ul className="space-y-2.5">
            {packageSizes.map((size) => (
              <li key={size}>
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                    className="h-4 w-4 rounded border-outline-variant accent-primary"
                  />
                  <span className="font-sans text-body-md text-on-surface-variant transition group-hover:text-on-surface">
                    {size}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price range */}
      {maxBox > 0 && (
        <div>
          <h3 className="mb-space-sm font-sans text-label-sm uppercase tracking-widest text-on-surface-variant">
            Maks. Dėžutės Kaina
          </h3>
          <input
            type="range"
            min={0}
            max={maxBox}
            step={0.5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="mt-2 flex items-center justify-between font-sans text-body-sm">
            <span className="text-on-surface-variant/60">€0</span>
            <span className="font-semibold text-on-surface">iki €{maxPrice.toFixed(0)}</span>
            <span className="text-on-surface-variant/60">€{maxBox.toFixed(0)}</span>
          </div>
        </div>
      )}

      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="font-sans text-body-sm text-on-surface-variant/70 transition hover:text-on-surface"
        >
          Išvalyti visus filtrus
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-margin-mobile py-space-xl lg:px-margin-desktop">
      {/* Mobile top bar */}
      <div className="mb-space-md flex items-center justify-between lg:hidden">
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-space-md py-space-sm font-sans text-body-md font-medium text-on-surface transition hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">tune</span>
          Filtrai
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-container font-sans text-[10px] font-bold text-parchment-deep">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <SortSelect sort={sort} onChange={setSort} />
      </div>

      {filtersOpen && (
        <div className="mb-space-lg rounded-xl border border-outline-variant bg-surface p-space-lg lg:hidden">
          {filterPanel}
        </div>
      )}

      <div className="flex gap-gutter-lg">
        {/* Desktop sidebar */}
        <aside className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-28">{filterPanel}</div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-space-lg hidden items-center justify-between lg:flex">
            <p className="font-sans text-body-md text-on-surface-variant">
              {sorted.length} produkt{sorted.length !== 1 ? "ai" : "as"}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="ml-3 font-sans text-body-sm font-medium text-on-surface-variant/70 underline transition hover:text-on-surface"
                >
                  Išvalyti visus
                </button>
              )}
            </p>
            <SortSelect sort={sort} onChange={setSort} />
          </div>
          <p className="mb-space-md font-sans text-body-md text-on-surface-variant lg:hidden">
            {sorted.length} produkt{sorted.length !== 1 ? "ai" : "as"}
          </p>

          {sorted.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center text-on-surface-variant/60">
              <p className="font-sans text-body-lg font-medium">Nė vienas produktas neatitinka filtrų.</p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-space-md font-sans text-body-md font-semibold text-on-surface underline"
                >
                  Išvalyti filtrus
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-space-md sm:grid-cols-3 xl:grid-cols-4">
              {sorted.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdded={added === product.id}
                  onAddBox={() => handleAddBox(product)}
                  pieceQty={pieceQty(product)}
                  onIncPiece={() => incPiece(product)}
                  onDecPiece={() => decPiece(product)}
                  priority={index < 4}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductCard({
  product,
  isAdded,
  onAddBox,
  pieceQty,
  onIncPiece,
  onDecPiece,
  priority,
}: {
  product: ShopProduct;
  isAdded: boolean;
  onAddBox: () => void;
  pieceQty: number;
  onIncPiece: () => void;
  onDecPiece: () => void;
  priority?: boolean;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant/40 bg-surface transition hover:shadow-md">
      {/* Image */}
      <Link href={`/shop/${product.id}`} className="relative block aspect-square overflow-hidden bg-surface-container">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
        )}
        {product.package_size && (
          <span className="absolute left-3 top-3 rounded bg-surface/90 px-2.5 py-1 font-sans text-label-sm font-semibold text-on-surface backdrop-blur-sm">
            {product.package_size}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-space-md">
        <Link href={`/shop/${product.id}`} className="font-sans font-semibold text-on-surface hover:underline">
          {product.name}
        </Link>
        <p className="mt-1.5 font-sans text-label-sm text-on-surface-variant/70">
          {product.sku && <span>SKU: {product.sku} · </span>}
          MOQ: {product.moq}
        </p>

        <div className="mt-auto space-y-space-sm pt-space-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans text-title-md font-bold text-on-surface">
                €{boxPrice(product).toFixed(2)}
              </span>
              <span className="ml-1 font-sans text-label-sm text-on-surface-variant/60">
                / dėž. ({product.moq} vnt. × €{product.price_wholesale.toFixed(2)})
              </span>
            </div>
            <button
              onClick={onAddBox}
              className={`rounded-lg px-space-md py-space-xs font-sans text-label-lg font-semibold uppercase tracking-wider transition-all ${
                isAdded
                  ? "bg-secondary text-on-secondary scale-95"
                  : "bg-primary-container text-parchment-deep hover:bg-racing-green-dark active:scale-95"
              }`}
            >
              {isAdded ? "✓ Pridėta" : "Dėžutė"}
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-space-sm">
            <div>
              <span className="font-sans text-body-md font-semibold text-on-surface-variant">
                €{piecePrice(product).toFixed(2)}
              </span>
              <span className="ml-1 font-sans text-label-sm text-on-surface-variant/60">/ vnt. (+€{product.single_unit_fee.toFixed(2)})</span>
            </div>
            <div className="flex items-center rounded-lg border border-outline-variant">
              <button
                onClick={onDecPiece}
                disabled={pieceQty === 0}
                className="px-3 py-1.5 text-on-surface-variant transition hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-30"
              >
                −
              </button>
              <span className="min-w-[1.5rem] text-center font-sans text-body-md font-medium text-on-surface">
                {pieceQty}
              </span>
              <button
                onClick={onIncPiece}
                className="px-3 py-1.5 text-on-surface-variant transition hover:text-on-surface"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SortSelect({
  sort,
  onChange,
}: {
  sort: SortKey;
  onChange: (s: SortKey) => void;
}) {
  return (
    <select
      value={sort}
      onChange={(e) => onChange(e.target.value as SortKey)}
      className="rounded-lg border border-outline-variant bg-surface px-space-md py-space-sm font-sans text-body-md font-medium text-on-surface transition focus:outline-none focus:ring-2 focus:ring-secondary/30"
    >
      <option value="default">Rikiuoti: Numatyta</option>
      <option value="price-asc">Kaina: Nuo mažiausios</option>
      <option value="price-desc">Kaina: Nuo didžiausios</option>
      <option value="name">Pavadinimas: A → Z</option>
    </select>
  );
}

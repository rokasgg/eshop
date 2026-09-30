"use client";

import Image from "next/image";
import OrderControls, { useBoxesInCart } from "../../components/OrderControls";
import { boxesLabel, formatEur } from "@/lib/cart";
import { boxPrice, perCupPrice, toCartLine, type ShopProduct } from "../ShopClient";
import { CATEGORY_LABELS } from "./FilterBar";

const OCCASION_LABELS: Record<string, string> = {
  breakfast: "Pusryčių Bufetas",
  afternoon: "Afternoon Tea",
  rooms: "Room Service",
  spa: "SPA & Poilsis",
};

const TEA_TYPE_LABELS: Record<"loose" | "bags", string> = {
  loose: "Biri arbata",
  bags: "Arbatos pakeliai",
};

const MAX_FLAVOR_NOTES = 3;

export default function HotelProductCard({
  product,
  priority,
}: {
  product: ShopProduct;
  priority?: boolean;
}) {
  const inCart = useBoxesInCart(product.id);
  const isInOrder = inCart > 0;
  const available = product.in_stock !== false;
  const cupPrice = perCupPrice(product);

  const occasion = product.occasion_tags?.[0] ? OCCASION_LABELS[product.occasion_tags[0]] : null;
  const teaKind = [
    product.tea_category ? CATEGORY_LABELS[product.tea_category] : null,
    product.tea_type ? TEA_TYPE_LABELS[product.tea_type] : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const flavorNotes = product.flavor_tags?.slice(0, MAX_FLAVOR_NOTES) ?? [];

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-surface-container-lowest transition-all duration-300 ease-out motion-reduce:transform-none ${
        isInOrder
          ? "border-on-tertiary-container/50 shadow-[0_8px_24px_rgba(11,41,27,0.10)]"
          : "border-hairline-green shadow-[0_1px_2px_rgba(11,41,27,0.04)] hover:-translate-y-0.5 hover:border-hairline-gold hover:shadow-[0_10px_28px_rgba(11,41,27,0.08)]"
      }`}
    >
      {/* 1. Top metadata */}
      <div
        className={`flex min-h-11 items-center justify-between gap-space-sm border-b px-space-lg py-space-sm font-sans text-label-sm uppercase tracking-widest transition-colors ${
          isInOrder ? "border-on-tertiary-container/20 bg-tertiary-fixed/40" : "border-hairline-green"
        }`}
      >
        <span className="flex items-center gap-space-xs truncate text-antique-gold-muted">
          {occasion && (
            <>
              <span className="h-1 w-1 shrink-0 rounded-[50%] bg-antique-gold-muted" aria-hidden="true" />
              {occasion}
            </>
          )}
        </span>
        {isInOrder ? (
          <span className="flex shrink-0 items-center gap-1 text-on-tertiary-fixed-variant">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">check</span>
            Užsakyme · {boxesLabel(inCart)}
          </span>
        ) : !available ? (
          <span className="shrink-0 text-on-surface-variant/60">Šiuo metu neturime</span>
        ) : null}
      </div>

      {/* 2. Product image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-parchment-deep">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none ${
              available ? "" : "opacity-70 grayscale-[60%]"
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
        )}
      </div>

      {/* 3. Product information */}
      <div className="flex flex-1 flex-col gap-space-sm p-space-lg">
        <div className="flex items-baseline justify-between gap-space-sm font-sans text-label-sm">
          <span className="uppercase tracking-widest text-antique-gold-muted">Ahmad Tea London</span>
          {product.sku && <span className="shrink-0 text-on-surface-variant/60">SKU {product.sku}</span>}
        </div>

        <h3 className="font-serif text-headline-sm leading-tight text-primary">{product.name}</h3>

        {product.description && (
          <p className="line-clamp-2 font-sans text-body-sm text-on-surface-variant">{product.description}</p>
        )}

        {(teaKind || typeof product.caffeine_level === "number") && (
          <div className="flex items-center justify-between gap-space-sm font-sans text-label-sm text-on-surface-variant">
            <span>{teaKind}</span>
            {typeof product.caffeine_level === "number" && (
              <span className="flex shrink-0 items-center gap-space-xs">
                <span className="text-on-surface-variant/70">Stiprumas</span>
                <span
                  role="img"
                  className="flex items-center gap-0.5"
                  title={`Kofeino lygis ${product.caffeine_level}/5`}
                  aria-label={`Kofeino lygis ${product.caffeine_level} iš 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CoffeeBean key={i} filled={i < product.caffeine_level!} />
                  ))}
                </span>
              </span>
            )}
          </div>
        )}

        {flavorNotes.length > 0 && (
          <p className="font-sans text-label-sm italic text-secondary">{flavorNotes.join(" · ")}</p>
        )}

        <dl className="mt-auto space-y-1 border-t border-hairline-green pt-space-sm font-sans text-body-sm">
          {product.package_size && (
            <div className="flex justify-between gap-space-sm">
              <dt className="text-on-surface-variant">Pakuotė</dt>
              <dd className="text-right text-primary">{product.package_size}</dd>
            </div>
          )}
          <div className="flex justify-between gap-space-sm">
            <dt className="text-on-surface-variant">Dėžutėje</dt>
            <dd className="text-right text-primary">{product.moq} vnt.</dd>
          </div>
        </dl>
      </div>

      {/* 4–5. Commercial block + ordering */}
      <div className="space-y-space-md border-t border-hairline-green bg-surface-container-low p-space-lg">
        <div>
          <div className="flex items-baseline justify-between gap-space-sm">
            <p>
              <span className="font-serif text-headline-md font-bold text-primary">{formatEur(boxPrice(product))}</span>
              <span className="ml-1 font-sans text-body-sm text-on-surface-variant">/ dėžutė</span>
            </p>
            {cupPrice !== null && (
              <p className="shrink-0 font-sans text-body-sm text-antique-gold-muted">
                {formatEur(cupPrice)} <span className="text-on-surface-variant">/ puodelis</span>
              </p>
            )}
          </div>
          <p className="mt-1 font-sans text-label-sm text-on-surface-variant">
            1 dėžutė = {product.moq} vnt. · Minimumas: 1 dėžutė
          </p>
        </div>

        <OrderControls line={toCartLine(product)} available={available} />
      </div>
    </article>
  );
}

function CoffeeBean({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-3.5 w-3.5 ${filled ? "text-secondary" : "text-surface-variant"}`}
    >
      <g transform="rotate(35 8 8)">
        <ellipse cx="8" cy="8" rx="4.6" ry="6.6" fill="currentColor" />
        <path
          d="M8 1.8 C 6.2 5.2, 9.8 10.8, 8 14.2"
          fill="none"
          stroke="var(--color-surface-container-lowest)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

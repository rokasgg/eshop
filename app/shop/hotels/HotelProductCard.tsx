"use client";

import Image from "next/image";
import { OrderStatus, useBoxOrder } from "../../components/OrderControls";
import { boxesWord, formatEur } from "@/lib/cart";
import { perCupPrice, toCartLine, type ShopProduct } from "../ShopClient";
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

// Layout follows new_design/newCard. Breakpoints are container queries on the
// card itself, so it stacks correctly in any grid column width.
export default function HotelProductCard({
  product,
  priority,
}: {
  product: ShopProduct;
  priority?: boolean;
}) {
  const available = product.in_stock !== false;
  const line = toCartLine(product);
  const order = useBoxOrder(line, { available, idleLabel: "Į užsakymą" });
  const cupPrice = perCupPrice(product);

  const occasion = product.occasion_tags?.[0] ? OCCASION_LABELS[product.occasion_tags[0]] : null;
  const teaKind = [
    product.tea_category ? CATEGORY_LABELS[product.tea_category] : null,
    product.tea_type ? TEA_TYPE_LABELS[product.tea_type] : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const flavorNotes = product.flavor_tags?.slice(0, MAX_FLAVOR_NOTES) ?? [];
  const hasStrength = typeof product.caffeine_level === "number";

  return (
    <article
      className={`@container flex h-full flex-col overflow-hidden rounded-[16px] border bg-surface-container-lowest text-charcoal-ink transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none ${
        order.isInOrder
          ? "border-on-tertiary-container/50 shadow-[0_18px_40px_rgba(19,34,26,0.07),0_4px_10px_rgba(19,34,26,0.04)]"
          : "border-outline-variant/70 shadow-[0_10px_30px_rgba(19,34,26,0.04),0_2px_6px_rgba(19,34,26,0.03)] hover:border-outline-variant hover:shadow-[0_18px_40px_rgba(19,34,26,0.07),0_4px_10px_rgba(19,34,26,0.04)]"
      }`}
    >
      {/* Media — fixed height so every card in a row lines up */}
      <div className="relative m-2 h-[240px] shrink-0 overflow-hidden rounded-[12px] bg-surface-container-high sm:h-[220px] xl:h-[205px]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover object-top ${available ? "" : "opacity-70 grayscale-[60%]"}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
        )}
        {occasion && (
          <span className="absolute left-2 top-2 z-10 inline-flex h-6 items-center gap-1.5 rounded-[999px] border border-antique-gold-muted/25 bg-surface/95 px-2.5 font-sans text-[9.5px] font-bold uppercase tracking-[0.09em] text-secondary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-[50%] bg-antique-gold-muted" aria-hidden="true" />
            {occasion}
          </span>
        )}
        {!available && (
          <span className="absolute bottom-2 left-2 z-10 inline-flex h-6 items-center rounded-[999px] bg-surface/95 px-2.5 font-sans text-[9.5px] font-bold uppercase tracking-[0.09em] text-on-surface-variant">
            Šiuo metu neturime
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3.5 py-3">
        <div className="flex items-center justify-between gap-3 font-sans">
          <span className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-antique-gold-muted">
            Ahmad Tea London
          </span>
          {product.sku && (
            <span className="truncate text-[8.5px] font-semibold uppercase tracking-[0.1em] text-outline">
              SKU {product.sku}
            </span>
          )}
        </div>

        <h3
          title={product.name}
          className="mt-1.5 line-clamp-2 font-serif text-[25px] font-medium leading-[1.08] text-primary"
        >
          {product.name}
        </h3>

        {(teaKind || hasStrength) && (
          <div className="mt-1 flex items-center justify-between gap-3 font-sans text-[11.5px] text-on-surface-variant">
            <span className="truncate tracking-[0.02em]">{teaKind}</span>
            {hasStrength && (
              <span
                role="img"
                className="flex shrink-0 items-center gap-1"
                title={`Stiprumas ${product.caffeine_level}/5`}
                aria-label={`Stiprumas ${product.caffeine_level} iš 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <CoffeeBean key={i} filled={i < product.caffeine_level!} />
                ))}
              </span>
            )}
          </div>
        )}
        {flavorNotes.length > 0 && (
          <p className="mt-1 truncate font-serif text-[11.5px] font-semibold italic tracking-[0.03em] text-secondary">
            {flavorNotes.join(" · ")}
          </p>
        )}

        <div className="min-h-2.5 flex-1" aria-hidden="true" />

        {/* Specs — one compact row */}
        <dl className="flex h-[34px] items-center gap-2.5 border-t border-outline-variant/60 pt-1.5 font-sans text-[11.5px]">
          <Spec icon="package_2" label="Pakuotė" value={product.package_size ?? "—"} />
          <span className="h-3.5 w-px shrink-0 bg-outline-variant/70" aria-hidden="true" />
          <Spec icon="inventory_2" label="Dėžutėje" value={`${product.moq} vnt. dėžutėje`} />
        </dl>
      </div>

      {/* Purchase */}
      <div className="mx-2 mb-2 rounded-[12px] bg-parchment-deep p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="flex items-baseline gap-1.5">
            <strong className="font-serif text-[32px] font-semibold leading-none text-primary">
              {formatEur(line.pricePerBox)}
            </strong>
            <span className="font-sans text-[12px] text-on-surface-variant">/ dėžutė</span>
          </p>
          {cupPrice !== null && (
            <p className="flex items-baseline gap-1">
              <strong className="font-serif text-[18px] text-antique-gold-muted">{formatEur(cupPrice)}</strong>
              <span className="font-sans text-[11.5px] text-on-surface-variant">/ puodelis</span>
            </p>
          )}
        </div>

        {/* Same slot either way, so ordering doesn't change the card height */}
        <div className="mt-0.5 flex min-h-4 min-w-0 items-center">
          {order.isInOrder ? (
            <OrderStatus order={order} compact />
          ) : (
            <p className="truncate font-sans text-[11px] tracking-[0.02em] text-on-surface-variant">
              {product.moq} vnt. dėžutėje · Min. 1 dėžutė
            </p>
          )}
        </div>

        <div className="mt-2.5 grid grid-cols-1 gap-2 @[20rem]:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
          <div
            className={`grid h-[46px] grid-cols-[36px_1fr_36px] overflow-hidden xl:h-[42px] rounded-[10px] border border-outline-variant bg-surface-container-lowest ${
              available ? "" : "opacity-50"
            }`}
          >
            <button
              type="button"
              onClick={() => order.setBoxes(order.boxes - 1)}
              disabled={!available || order.boxes <= 1}
              aria-label="Sumažinti kiekį"
              className="text-[20px] text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
            >
              −
            </button>
            <span
              aria-live="polite"
              className="flex min-w-0 items-center justify-center gap-1 whitespace-nowrap font-sans text-[13px] text-charcoal-ink"
            >
              <strong className="text-[16px]">{order.boxes}</strong>
              {boxesWord(order.boxes)}
            </span>
            <button
              type="button"
              onClick={() => order.setBoxes(order.boxes + 1)}
              disabled={!available}
              aria-label="Padidinti kiekį"
              className="text-[20px] text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={order.submit}
            disabled={order.submitDisabled}
            className={`inline-flex h-[46px] min-w-0 items-center justify-center gap-1.5 rounded-[10px] px-2.5 font-sans text-[12.5px] xl:h-[42px] font-bold uppercase tracking-[0.05em] transition-[background-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold-bright active:translate-y-px disabled:cursor-not-allowed ${
              !available
                ? "bg-surface-container-high text-on-surface-variant/60"
                : order.confirmation
                  ? "pointer-events-none bg-tertiary-fixed text-on-tertiary-fixed"
                  : order.unchanged
                    ? "border border-outline-variant bg-transparent text-on-surface-variant/50"
                    : "bg-primary-container text-white hover:bg-racing-green-dark"
            }`}
          >
            <span className="material-symbols-outlined text-[17px]!" aria-hidden="true">
              {order.icon}
            </span>
            <span className="truncate">{order.label}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// Icon sizes use "!" because the Material Symbols stylesheet is unlayered and
// otherwise overrides Tailwind font-size utilities with 24px.
function Spec({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span className="material-symbols-outlined shrink-0 text-[14px]! text-on-surface-variant" aria-hidden="true">
        {icon}
      </span>
      <dt className="sr-only">{label}</dt>
      <dd className="truncate text-charcoal-ink">{value}</dd>
    </div>
  );
}

function CoffeeBean({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-[11px] w-[11px] ${filled ? "text-antique-gold-muted" : "text-outline-variant/70"}`}
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

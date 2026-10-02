"use client";

import Image from "next/image";
import { OrderStatus, useBoxOrder } from "@/app/components/OrderControls";
import { formatEur } from "@/lib/cart";
import { useI18n } from "@/app/components/I18nProvider";
import { perCupPrice, toCartLine, type ShopProduct } from "../ShopClient";

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
  const { t, plural, f } = useI18n();
  const order = useBoxOrder(line, { available, idleLabel: t.order.toOrder });
  const cupPrice = perCupPrice(product);

  // The data also has tags without a scenario (e.g. "iced"); those get no badge
  const firstTag = product.occasion_tags?.[0];
  const occasion = firstTag && firstTag in t.occasions ? t.occasions[firstTag as keyof typeof t.occasions].label : null;
  const teaKind = [
    product.tea_category ? t.teaCategories[product.tea_category] : null,
    product.tea_type ? t.teaTypes[product.tea_type] : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const flavorNotes = product.flavor_tags?.slice(0, MAX_FLAVOR_NOTES) ?? [];
  const hasStrength = typeof product.caffeine_level === "number";

  return (
    <article
      className={`@container flex h-full flex-col overflow-hidden rounded-[14.5px] border bg-surface-container-lowest text-charcoal-ink transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none ${
        order.isInOrder
          ? "border-on-tertiary-container/50 shadow-[0_18px_40px_rgba(19,34,26,0.07),0_4px_10px_rgba(19,34,26,0.04)]"
          : "border-outline-variant/70 shadow-[0_10px_30px_rgba(19,34,26,0.04),0_2px_6px_rgba(19,34,26,0.03)] hover:border-outline-variant hover:shadow-[0_18px_40px_rgba(19,34,26,0.07),0_4px_10px_rgba(19,34,26,0.04)]"
      }`}
    >
      {/* Media — fixed height so every card in a row lines up */}
      <div className="relative m-[7px] h-[216px] shrink-0 overflow-hidden rounded-[11px] bg-surface-container-high sm:h-[198px] xl:h-[185px]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1400px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover object-top ${available ? "" : "opacity-70 grayscale-[60%]"}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
        )}
        {occasion && (
          <span className="absolute left-[7px] top-[7px] z-10 inline-flex h-[22px] items-center gap-[5px] rounded-[999px] border border-antique-gold-muted/25 bg-surface/95 px-[9px] font-sans text-[8.5px] font-bold uppercase tracking-[0.09em] text-secondary backdrop-blur-sm">
            <span className="h-[5px] w-[5px] shrink-0 rounded-[50%] bg-antique-gold-muted" aria-hidden="true" />
            {occasion}
          </span>
        )}
        {!available && (
          <span className="absolute bottom-[7px] left-[7px] z-10 inline-flex h-[22px] items-center rounded-[999px] bg-surface/95 px-[9px] font-sans text-[8.5px] font-bold uppercase tracking-[0.09em] text-on-surface-variant">
            {t.common.outOfStock}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-[12.5px] py-[11px]">
        <div className="flex items-center justify-between gap-[11px] font-sans">
          <span className="text-[7.5px] font-bold uppercase tracking-[0.14em] text-antique-gold-muted">
            {t.common.brand}
          </span>
          {product.sku && (
            <span className="truncate text-[7.5px] font-semibold uppercase tracking-[0.1em] text-outline">
              SKU {product.sku}
            </span>
          )}
        </div>

        <h3
          title={product.name}
          className="mt-[5px] line-clamp-2 font-serif text-[22.5px] font-medium leading-[1.08] text-primary"
        >
          {product.name}
        </h3>

        {(teaKind || hasStrength) && (
          <div className="mt-[3.5px] flex items-center justify-between gap-[11px] font-sans text-[10.5px] text-on-surface-variant">
            <span className="truncate tracking-[0.02em]">{teaKind}</span>
            {hasStrength && (
              <span
                role="img"
                className="flex shrink-0 items-center gap-[3.5px]"
                title={f(t.card.strengthTitle, { n: product.caffeine_level! })}
                aria-label={f(t.card.strengthAria, { n: product.caffeine_level! })}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <CoffeeBean key={i} filled={i < product.caffeine_level!} />
                ))}
              </span>
            )}
          </div>
        )}
        {flavorNotes.length > 0 && (
          <p className="mt-[3.5px] truncate font-serif text-[10.5px] font-semibold italic tracking-[0.03em] text-secondary">
            {flavorNotes.join(" · ")}
          </p>
        )}

        <div className="min-h-[9px] flex-1" aria-hidden="true" />

        {/* Specs — one compact row */}
        <dl className="flex h-[30.5px] items-center gap-[9px] border-t border-outline-variant/60 pt-[5px] font-sans text-[10.5px]">
          <Spec icon="package_2" label={t.card.packaging} value={product.package_size ?? "—"} />
          <span className="h-[12.5px] w-px shrink-0 bg-outline-variant/70" aria-hidden="true" />
          <Spec icon="inventory_2" label={t.card.inBox} value={f(t.common.unitsInBox, { n: product.moq })} />
        </dl>
      </div>

      {/* Purchase */}
      <div className="mx-[7px] mb-[7px] rounded-[11px] bg-parchment-deep p-[11px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-[14.5px] gap-y-[3.5px]">
          <p className="flex items-baseline gap-[5px]">
            <strong className="font-serif text-[29px] font-semibold leading-none text-primary">
              {formatEur(line.pricePerBox)}
            </strong>
            <span className="font-sans text-[11px] text-on-surface-variant">{t.common.perBox}</span>
          </p>
          {cupPrice !== null && (
            <p className="flex items-baseline gap-[3.5px]">
              <strong className="font-serif text-[16px] text-antique-gold-muted">{formatEur(cupPrice)}</strong>
              <span className="font-sans text-[10.5px] text-on-surface-variant">{t.common.perCup}</span>
            </p>
          )}
        </div>

        {/* Same slot either way, so ordering doesn't change the card height */}
        <div className="mt-0.5 flex min-h-[14.5px] min-w-0 items-center">
          {order.isInOrder ? (
            <OrderStatus order={order} compact />
          ) : (
            <p className="truncate font-sans text-[10px] tracking-[0.02em] text-on-surface-variant">
              {f(t.common.unitsInBox, { n: product.moq })} · {t.common.minOneBoxShort}
            </p>
          )}
        </div>

        <div className="mt-[9px] grid grid-cols-1 gap-[7px] @[17rem]:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
          <div
            className={`grid h-[41.5px] grid-cols-[32.5px_1fr_32.5px] overflow-hidden xl:h-[38px] rounded-[9px] border border-outline-variant bg-surface-container-lowest ${
              available ? "" : "opacity-50"
            }`}
          >
            <button
              type="button"
              onClick={() => order.setBoxes(order.boxes - 1)}
              disabled={!available || order.boxes <= 1}
              aria-label={t.order.decrease}
              className="text-[18px] text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
            >
              −
            </button>
            <span
              aria-live="polite"
              className="flex min-w-0 items-center justify-center gap-[3.5px] whitespace-nowrap font-sans text-[11.5px] text-charcoal-ink"
            >
              <strong className="text-[14.5px]">{order.boxes}</strong>
              {plural(order.boxes, t.common.boxesWord)}
            </span>
            <button
              type="button"
              onClick={() => order.setBoxes(order.boxes + 1)}
              disabled={!available}
              aria-label={t.order.increase}
              className="text-[18px] text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={order.submit}
            disabled={order.submitDisabled}
            className={`inline-flex h-[41.5px] min-w-0 items-center justify-center gap-[5px] rounded-[9px] px-[9px] font-sans text-[11.5px] xl:h-[38px] font-bold uppercase tracking-[0.05em] transition-[background-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold-bright active:translate-y-px disabled:cursor-not-allowed ${
              !available
                ? "bg-surface-container-high text-on-surface-variant/60"
                : order.confirmation
                  ? "pointer-events-none bg-tertiary-fixed text-on-tertiary-fixed"
                  : order.unchanged
                    ? "border border-outline-variant bg-transparent text-on-surface-variant/50"
                    : "bg-primary-container text-white hover:bg-racing-green-dark"
            }`}
          >
            <span className="material-symbols-outlined text-[15px]!" aria-hidden="true">
              {order.icon}
            </span>
            {/* Short confirmation: the full "added to order" text doesn't fit a 4-column card */}
            <span className="truncate">{order.confirmation === "added" ? t.order.addedShort : order.label}</span>
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
    <div className="flex min-w-0 items-center gap-[5px]">
      <span className="material-symbols-outlined shrink-0 text-[12.5px]! text-on-surface-variant" aria-hidden="true">
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
      className={`h-[10px] w-[10px] ${filled ? "text-antique-gold-muted" : "text-outline-variant/70"}`}
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

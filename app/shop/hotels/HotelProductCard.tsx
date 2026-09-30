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
      className={`@container flex h-full flex-col overflow-hidden rounded-[18px] border bg-surface-container-lowest text-charcoal-ink transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none ${
        order.isInOrder
          ? "border-on-tertiary-container/50 shadow-[0_18px_40px_rgba(19,34,26,0.07),0_4px_10px_rgba(19,34,26,0.04)]"
          : "border-outline-variant/70 shadow-[0_10px_30px_rgba(19,34,26,0.04),0_2px_6px_rgba(19,34,26,0.03)] hover:border-outline-variant hover:shadow-[0_18px_40px_rgba(19,34,26,0.07),0_4px_10px_rgba(19,34,26,0.04)]"
      }`}
    >
      {/* Media */}
      <div className="relative m-2.5 h-[300px] overflow-hidden rounded-[14px] bg-surface-container-high @[30rem]:h-[360px]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${available ? "" : "opacity-70 grayscale-[60%]"}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
        )}
        {occasion && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-[999px] border border-antique-gold-muted/25 bg-surface/95 px-3.5 py-2 font-sans text-[12px] font-bold uppercase tracking-[0.09em] text-secondary backdrop-blur-sm">
            <span className="h-[7px] w-[7px] shrink-0 rounded-[50%] bg-antique-gold-muted" aria-hidden="true" />
            {occasion}
          </span>
        )}
        {!available && (
          <span className="absolute bottom-4 left-4 z-10 rounded-[999px] bg-surface/95 px-3.5 py-2 font-sans text-[12px] font-bold uppercase tracking-[0.09em] text-on-surface-variant">
            Šiuo metu neturime
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pt-5 @[30rem]:px-7">
        <div className="mb-3 flex items-center justify-between gap-4 font-sans">
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-antique-gold-muted">
            Ahmad Tea London
          </span>
          {product.sku && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-outline">SKU {product.sku}</span>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-3.5 @[26rem]:flex-row @[26rem]:items-end @[26rem]:justify-between @[26rem]:gap-6">
          <div className="min-w-0">
            <h3 className="font-serif text-[30px] font-medium leading-[1.05] text-primary @[30rem]:text-[36px]">
              {product.name}
            </h3>
            {teaKind && <p className="mt-2 font-sans text-[15px] tracking-[0.04em] text-on-surface-variant">{teaKind}</p>}
            {flavorNotes.length > 0 && (
              <p className="mt-2 font-serif text-[16px] font-semibold italic tracking-[0.04em] text-secondary">
                {flavorNotes.join(" · ")}
              </p>
            )}
          </div>

          {hasStrength && (
            <div className="border-t border-outline-variant/60 pt-3.5 @[26rem]:min-w-[132px] @[26rem]:border-l @[26rem]:border-t-0 @[26rem]:pl-5 @[26rem]:pt-0">
              <span className="mb-2 block font-sans text-[13px] text-outline">Stiprumas</span>
              <span
                role="img"
                className="flex gap-1.5"
                title={`Kofeino lygis ${product.caffeine_level}/5`}
                aria-label={`Stiprumas ${product.caffeine_level} iš 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <CoffeeBean key={i} filled={i < product.caffeine_level!} />
                ))}
              </span>
            </div>
          )}
        </div>

        <dl className="mt-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3.5 border-t border-outline-variant/60 pb-6 pt-5 @[26rem]:gap-6">
          <Spec icon="package_2" label="Pakuotė" value={product.package_size ?? "—"} />
          <div className="h-11 w-px bg-outline-variant/60" aria-hidden="true" />
          <Spec icon="inventory_2" label="Dėžutėje" value={`${product.moq} vnt.`} />
        </dl>
      </div>

      {/* Purchase */}
      <div className="mx-2.5 mb-2.5 rounded-2xl bg-parchment-deep p-5 @[30rem]:p-6">
        <div className="flex flex-col gap-3 @[30rem]:flex-row @[30rem]:items-center @[30rem]:justify-between @[30rem]:gap-6">
          <p className="flex items-baseline gap-2">
            <strong className="font-serif text-[40px] font-semibold leading-none text-primary @[30rem]:text-[46px]">
              {formatEur(line.pricePerBox)}
            </strong>
            <span className="font-sans text-[16px] text-on-surface-variant">/ dėžutė</span>
          </p>
          {cupPrice !== null && (
            <p className="flex items-baseline gap-1.5 @[30rem]:border-l @[30rem]:border-antique-gold-muted/45 @[30rem]:pl-6">
              <strong className="font-serif text-[24px] text-antique-gold-muted">{formatEur(cupPrice)}</strong>
              <span className="font-sans text-[14px] text-on-surface-variant">/ puodelis</span>
            </p>
          )}
        </div>

        <p className="mt-3 font-sans text-[14px] tracking-[0.03em] text-on-surface-variant">
          {product.moq} vnt. dėžutėje · Min. 1 dėžutė
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 @[30rem]:grid-cols-[minmax(190px,0.95fr)_1.15fr]">
          <div
            className={`grid min-h-[58px] grid-cols-[54px_1fr_54px] overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest ${
              available ? "" : "opacity-50"
            }`}
          >
            <button
              type="button"
              onClick={() => order.setBoxes(order.boxes - 1)}
              disabled={!available || order.boxes <= 1}
              aria-label="Sumažinti kiekį"
              className="text-[25px] text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
            >
              −
            </button>
            <span aria-live="polite" className="flex items-center justify-center gap-1.5 font-sans text-[17px] text-charcoal-ink">
              <strong className="text-[19px]">{order.boxes}</strong>
              {boxesWord(order.boxes)}
            </span>
            <button
              type="button"
              onClick={() => order.setBoxes(order.boxes + 1)}
              disabled={!available}
              aria-label="Padidinti kiekį"
              className="text-[25px] text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={order.submit}
            disabled={order.submitDisabled}
            className={`inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-[10px] px-5 font-sans text-[15px] font-bold uppercase tracking-[0.06em] transition-[background-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold-bright active:translate-y-px disabled:cursor-not-allowed ${
              !available
                ? "bg-surface-container-high text-on-surface-variant/60"
                : order.confirmation
                  ? "pointer-events-none bg-tertiary-fixed text-on-tertiary-fixed"
                  : order.unchanged
                    ? "border border-outline-variant bg-transparent text-on-surface-variant/50"
                    : "bg-primary-container text-white hover:bg-racing-green-dark"
            }`}
          >
            <span className="material-symbols-outlined text-[19px]" aria-hidden="true">
              {order.icon}
            </span>
            {order.label}
          </button>
        </div>

        <div className="mt-3 empty:hidden">
          <OrderStatus order={order} />
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="material-symbols-outlined grid h-[38px] w-[38px] shrink-0 place-items-center text-[25px] text-on-surface-variant" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="mb-0.5 font-sans text-[13px] text-outline">{label}</dt>
        <dd className="font-sans text-[18px] font-medium text-charcoal-ink">{value}</dd>
      </div>
    </div>
  );
}

function CoffeeBean({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-[18px] w-[18px] ${filled ? "text-antique-gold-muted" : "text-outline-variant/70"}`}
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

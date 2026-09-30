"use client";

import { useEffect, useRef, useState } from "react";
import BoxStepper from "./BoxStepper";
import { useCart } from "../context/CartContext";
import { boxesLabel, clampBoxes, formatEur, lineTotal, totalUnits, type CartLine } from "@/lib/cart";

export function useBoxesInCart(id: string) {
  const { items } = useCart();
  return items.find((i) => i.id === id)?.boxQuantity ?? 0;
}

// Shared ordering state for one product. The selector mirrors the cart line
// once the product is in the order, so a card and the cart drawer can never
// show different quantities.
export function useBoxOrder(
  line: Omit<CartLine, "boxQuantity">,
  { available = true, idleLabel = "Pridėti" }: { available?: boolean; idleLabel?: string } = {}
) {
  const { addBoxes, setBoxQuantity } = useCart();
  const inCart = useBoxesInCart(line.id);
  const isInOrder = inCart > 0;

  // null = follow the cart; a number = the buyer is editing the quantity
  const [draft, setDraft] = useState<number | null>(null);
  const [confirmation, setConfirmation] = useState<"added" | "updated" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const boxes = draft ?? (isInOrder ? inCart : 1);
  const unchanged = isInOrder && boxes === inCart;

  const submit = () => {
    if (isInOrder) setBoxQuantity(line.id, boxes);
    else addBoxes(line, boxes);
    setDraft(null);
    setConfirmation(isInOrder ? "updated" : "added");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setConfirmation(null), 1800);
  };

  const label = !available
    ? "Šiuo metu neturime"
    : confirmation === "added"
      ? "Pridėta į užsakymą"
      : confirmation === "updated"
        ? "Kiekis atnaujintas"
        : isInOrder
          ? "Atnaujinti kiekį"
          : idleLabel;

  const icon = !available ? "block" : confirmation ? "check" : isInOrder ? "sync" : "add_shopping_cart";

  return {
    boxes,
    setBoxes: (n: number) => setDraft(clampBoxes(n)),
    submit,
    inCart,
    isInOrder,
    unchanged,
    confirmation,
    available,
    label,
    icon,
    submitDisabled: !available || (unchanged && !confirmation),
    orderedLine: { ...line, boxQuantity: inCart },
  };
}

export function OrderStatus({ order }: { order: ReturnType<typeof useBoxOrder> }) {
  if (!order.isInOrder) return null;
  return (
    <p className="flex items-center gap-space-xs font-sans text-label-sm text-on-tertiary-fixed-variant" role="status">
      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">check_circle</span>
      <span>
        Jūsų užsakyme: {boxesLabel(order.inCart)} · {totalUnits(order.orderedLine)} vnt. ·{" "}
        {formatEur(lineTotal(order.orderedLine))}
      </span>
    </p>
  );
}

// Box selector + add/update CTA + current order state (compact layout).
export default function OrderControls({
  line,
  available = true,
}: {
  line: Omit<CartLine, "boxQuantity">;
  available?: boolean;
}) {
  const order = useBoxOrder(line, { available });
  const { boxes, setBoxes, submit, unchanged, confirmation, label, icon, submitDisabled } = order;

  return (
    <div className="@container space-y-space-sm">
      <div className="flex flex-col gap-space-sm @[22rem]:flex-row">
        <BoxStepper value={boxes} onChange={setBoxes} disabled={!available} />
        <button
          type="button"
          onClick={submit}
          disabled={submitDisabled}
          aria-disabled={!available || unchanged}
          className={`flex min-h-11 flex-1 items-center justify-center gap-space-xs rounded-lg px-space-md font-sans text-label-lg uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold-bright disabled:cursor-not-allowed ${!available
              ? "bg-surface-container-high text-on-surface-variant/60"
              : confirmation
                ? "pointer-events-none bg-tertiary-fixed text-on-tertiary-fixed"
                : unchanged
                  ? "border border-hairline-green bg-transparent text-on-surface-variant/50"
                  : "bg-primary-container text-parchment-deep hover:bg-racing-green-dark"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            {icon}
          </span>
          <span>{label}</span>
        </button>
      </div>

      <OrderStatus order={order} />
    </div>
  );
}

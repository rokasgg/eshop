"use client";

import { useEffect, useRef, useState } from "react";
import BoxStepper from "./BoxStepper";
import { useCart } from "../context/CartContext";
import { boxesLabel, clampBoxes, formatEur, lineTotal, totalUnits, type CartLine } from "@/lib/cart";

export function useBoxesInCart(id: string) {
  const { items } = useCart();
  return items.find((i) => i.id === id)?.boxQuantity ?? 0;
}

// Box selector + add/update CTA + current order state for one product.
// The selector mirrors the cart line once the product is in the order, so
// the card and the cart drawer can never show different quantities.
export default function OrderControls({
  line,
  available = true,
}: {
  line: Omit<CartLine, "boxQuantity">;
  available?: boolean;
}) {
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
          : "Pridėti į užsakymą";

  const orderedLine = { ...line, boxQuantity: inCart };

  return (
    <div className="@container space-y-space-sm">
      <div className="flex flex-col gap-space-sm @[22rem]:flex-row">
        <BoxStepper
          value={boxes}
          onChange={(n) => setDraft(clampBoxes(n))}
          disabled={!available}
        />
        <button
          type="button"
          onClick={submit}
          disabled={!available || (unchanged && !confirmation)}
          aria-disabled={!available || unchanged}
          className={`flex min-h-11 flex-1 items-center justify-center gap-space-xs rounded-lg px-space-md font-sans text-label-lg uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold-bright disabled:cursor-not-allowed ${
            !available
              ? "bg-surface-container-high text-on-surface-variant/60"
              : confirmation
                ? "pointer-events-none bg-tertiary-fixed text-on-tertiary-fixed"
                : unchanged
                  ? "border border-hairline-green bg-transparent text-on-surface-variant/50"
                  : "bg-primary-container text-parchment-deep hover:bg-racing-green-dark"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            {!available ? "block" : confirmation ? "check" : isInOrder ? "sync" : "add_shopping_cart"}
          </span>
          <span>{label}</span>
        </button>
      </div>

      {isInOrder && (
        <p className="flex items-center gap-space-xs font-sans text-label-sm text-on-tertiary-fixed-variant" role="status">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">check_circle</span>
          <span>
            Jūsų užsakyme: {boxesLabel(inCart)} · {totalUnits(orderedLine)} vnt. · {formatEur(lineTotal(orderedLine))}
          </span>
        </p>
      )}
    </div>
  );
}

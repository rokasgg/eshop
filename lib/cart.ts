// Box-based ordering model shared by the storefront, cart and order API.
// Customers only ever choose `boxQuantity`; units are derived, never stored.

export type CartLine = {
  id: string; // product id — exactly one line per product/SKU
  sku: string | null;
  name: string;
  imageUrl: string | null;
  boxQuantity: number;
  unitsPerBox: number;
  pricePerBox: number;
};

export const totalUnits = (line: Pick<CartLine, "boxQuantity" | "unitsPerBox">) =>
  line.boxQuantity * line.unitsPerBox;

export const lineTotal = (line: Pick<CartLine, "boxQuantity" | "pricePerBox">) =>
  line.boxQuantity * line.pricePerBox;

export const clampBoxes = (n: number) => Math.max(1, Math.floor(Number.isFinite(n) ? n : 1));

// Whole-order B2B threshold, separate from the per-product minimum of 1 box.
// Set either field to enforce it in the cart; null means no threshold.
export const MIN_ORDER: { eur?: number; boxes?: number } | null = null;

// Returned as data; the cart drawer turns it into text in the current language
export type MinOrderShortfall = { kind: "eur"; amount: number } | { kind: "boxes"; boxes: number };

export function minOrderShortfall(subtotal: number, boxes: number): MinOrderShortfall | null {
  if (!MIN_ORDER) return null;
  if (MIN_ORDER.eur && subtotal < MIN_ORDER.eur) return { kind: "eur", amount: MIN_ORDER.eur };
  if (MIN_ORDER.boxes && boxes < MIN_ORDER.boxes) return { kind: "boxes", boxes: MIN_ORDER.boxes };
  return null;
}

export function formatEur(value: number) {
  return `€${value.toFixed(2)}`;
}

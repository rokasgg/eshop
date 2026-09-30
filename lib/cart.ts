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

export function minOrderShortfall(subtotal: number, boxes: number): string | null {
  if (!MIN_ORDER) return null;
  if (MIN_ORDER.eur && subtotal < MIN_ORDER.eur) return `Minimali užsakymo suma: ${formatEur(MIN_ORDER.eur)}`;
  if (MIN_ORDER.boxes && boxes < MIN_ORDER.boxes) return `Minimalus užsakymas: ${boxesLabel(MIN_ORDER.boxes)}`;
  return null;
}

// Lithuanian plural forms: 1 dėžutė, 2–9 dėžutės, 10–20 dėžučių, 21 dėžutė…
export function boxesLabel(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} dėžutė`;
  if (mod10 >= 2 && (mod100 < 10 || mod100 >= 20)) return `${n} dėžutės`;
  return `${n} dėžučių`;
}

export function formatEur(value: number) {
  return `€${value.toFixed(2)}`;
}

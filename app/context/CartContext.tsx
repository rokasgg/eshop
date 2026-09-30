"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { clampBoxes, lineTotal, type CartLine } from "@/lib/cart";

type CartCtx = {
  items: CartLine[];
  /** Adds boxes to the product's single cart line, creating it if needed. */
  addBoxes: (line: Omit<CartLine, "boxQuantity">, boxes?: number) => void;
  /** Sets the exact box quantity; below 1 removes the line. */
  setBoxQuantity: (id: string, boxes: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalBoxes: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "teashop-cart-v3";
// v2 stored the same box-based lines as { price, quantity }.
const LEGACY_V2_KEY = "teashop-cart-v2";

type LegacyV2Line = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unitsPerBox: number;
  imageUrl?: string | null;
  sku?: string | null;
};

function loadCart(): CartLine[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return normalize(JSON.parse(raw));

  const legacy = localStorage.getItem(LEGACY_V2_KEY);
  if (!legacy) return [];
  localStorage.removeItem(LEGACY_V2_KEY);
  return normalize(
    (JSON.parse(legacy) as LegacyV2Line[]).map((l) => ({
      id: l.id,
      sku: l.sku ?? null,
      name: l.name,
      imageUrl: l.imageUrl ?? null,
      boxQuantity: l.quantity,
      unitsPerBox: l.unitsPerBox,
      pricePerBox: l.price,
    }))
  );
}

// Guards the one-line-per-product, whole-box invariant for anything read from storage.
function normalize(lines: CartLine[]): CartLine[] {
  const byId = new Map<string, CartLine>();
  for (const l of lines) {
    if (!l?.id || !(l.boxQuantity >= 1) || !(l.unitsPerBox >= 1)) continue;
    const prev = byId.get(l.id);
    byId.set(l.id, { ...l, boxQuantity: clampBoxes((prev?.boxQuantity ?? 0) + l.boxQuantity) });
  }
  return [...byId.values()];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setItems(loadCart());
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const addBoxes = useCallback((line: Omit<CartLine, "boxQuantity">, boxes = 1) => {
    const step = clampBoxes(boxes);
    setItems((prev) =>
      prev.some((i) => i.id === line.id)
        ? prev.map((i) => (i.id === line.id ? { ...i, boxQuantity: i.boxQuantity + step } : i))
        : [...prev, { ...line, boxQuantity: step }]
    );
  }, []);

  const setBoxQuantity = useCallback((id: string, boxes: number) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        return boxes < 1 ? [] : [{ ...i, boxQuantity: clampBoxes(boxes) }];
      })
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addBoxes,
        setBoxQuantity,
        removeItem,
        clearCart,
        totalBoxes: items.reduce((s, i) => s + i.boxQuantity, 0),
        subtotal: items.reduce((s, i) => s + lineTotal(i), 0),
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { boxPrice, piecePrice, type ShopProduct } from "../ShopClient";

export default function AddToCart({ product }: { product: ShopProduct }) {
  const { items, addItem, updateQty } = useCart();
  const [added, setAdded] = useState(false);

  const pieceQty = items.find((i) => i.id === `${product.id}-piece`)?.quantity ?? 0;

  const flash = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleAddBox = () => {
    addItem({
      id: product.id,
      name: `${product.name} (box)`,
      price: product.price_wholesale,
      imageUrl: product.image_url,
      moq: product.moq,
      sku: product.sku,
    });
    flash();
  };

  const incPiece = () => {
    addItem({
      id: `${product.id}-piece`,
      name: `${product.name} (1 vnt.)`,
      price: piecePrice(product),
      imageUrl: product.image_url,
      moq: 1,
      sku: product.sku,
    });
  };

  const decPiece = () => {
    updateQty(`${product.id}-piece`, pieceQty - 1);
  };

  return (
    <div className="space-y-space-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-serif text-headline-sm font-bold text-on-surface">
            €{boxPrice(product).toFixed(2)}
          </span>
          <span className="ml-1.5 font-sans text-body-sm text-on-surface-variant/60">
            / dėž. ({product.moq} vnt. × €{product.price_wholesale.toFixed(2)})
          </span>
        </div>
        <button
          onClick={handleAddBox}
          className={`rounded-lg px-space-lg py-space-sm font-sans text-label-lg font-semibold uppercase tracking-wider transition-all ${
            added
              ? "bg-secondary text-on-secondary scale-95"
              : "bg-primary-container text-parchment-deep hover:bg-racing-green-dark active:scale-95"
          }`}
        >
          {added ? "✓ Pridėta" : "Dėžutė į krepšelį"}
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-outline-variant/30 pt-space-md">
        <div>
          <span className="font-sans text-body-lg font-semibold text-on-surface-variant">
            €{piecePrice(product).toFixed(2)}
          </span>
          <span className="ml-1.5 font-sans text-body-sm text-on-surface-variant/60">
            / vnt. (+€{product.single_unit_fee.toFixed(2)} mokestis)
          </span>
        </div>
        <div className="flex items-center rounded-lg border border-outline-variant">
          <button
            onClick={decPiece}
            disabled={pieceQty === 0}
            className="px-4 py-2.5 text-on-surface-variant transition hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-30"
          >
            −
          </button>
          <span className="min-w-[2rem] text-center font-sans text-body-md font-medium text-on-surface">
            {pieceQty}
          </span>
          <button
            onClick={incPiece}
            className="px-4 py-2.5 text-on-surface-variant transition hover:text-on-surface"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

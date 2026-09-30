"use client";

import OrderControls from "../../components/OrderControls";
import { formatEur } from "@/lib/cart";
import { boxPrice, perCupPrice, toCartLine, type ShopProduct } from "../ShopClient";

export default function AddToCart({ product }: { product: ShopProduct }) {
  const cupPrice = perCupPrice(product);

  return (
    <div className="space-y-space-md">
      <div className="flex items-end justify-between gap-space-md">
        <div>
          <span className="font-serif text-headline-sm font-bold text-on-surface">
            {formatEur(boxPrice(product))}
          </span>
          <span className="ml-1.5 font-sans text-body-sm text-on-surface-variant/60">/ dėžutė</span>
        </div>
        {cupPrice !== null && (
          <span className="font-sans text-body-sm text-on-surface-variant">
            {formatEur(cupPrice)} / puodelis
          </span>
        )}
      </div>
      <p className="font-sans text-body-sm text-on-surface-variant">
        1 dėžutė = {product.moq} vnt. · Minimumas: 1 dėžutė
      </p>

      <OrderControls line={toCartLine(product)} available={product.in_stock !== false} />
    </div>
  );
}

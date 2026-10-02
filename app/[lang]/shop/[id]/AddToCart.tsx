"use client";

import OrderControls from "@/app/components/OrderControls";
import { useI18n } from "@/app/components/I18nProvider";
import { formatEur } from "@/lib/cart";
import { boxPrice, perCupPrice, toCartLine, type ShopProduct } from "../ShopClient";

export default function AddToCart({ product }: { product: ShopProduct }) {
  const { t, f } = useI18n();
  const cupPrice = perCupPrice(product);

  return (
    <div className="space-y-space-md">
      <div className="flex items-end justify-between gap-space-md">
        <div>
          <span className="font-serif text-headline-sm font-bold text-on-surface">
            {formatEur(boxPrice(product))}
          </span>
          <span className="ml-1.5 font-sans text-body-sm text-on-surface-variant/60">{t.common.perBox}</span>
        </div>
        {cupPrice !== null && (
          <span className="font-sans text-body-sm text-on-surface-variant">
            {formatEur(cupPrice)} {t.common.perCup}
          </span>
        )}
      </div>
      <p className="font-sans text-body-sm text-on-surface-variant">
        {f(t.common.boxEquals, { n: product.moq })} · {t.common.minimumOneBox}
      </p>

      <OrderControls line={toCartLine(product)} available={product.in_stock !== false} />
    </div>
  );
}

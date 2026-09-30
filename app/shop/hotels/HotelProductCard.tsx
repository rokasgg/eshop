"use client";

import Image from "next/image";
import { boxPrice, perCupPrice, piecePrice, type ShopProduct } from "../ShopClient";
import { useCart } from "../../context/CartContext";

const OCCASION_LABELS: Record<string, string> = {
  breakfast: "Pusryčių Bufetas",
  afternoon: "Afternoon Tea",
  rooms: "Room Service",
  spa: "SPA & Poilsis",
};

export default function HotelProductCard({
  product,
  priority,
}: {
  product: ShopProduct;
  priority?: boolean;
}) {
  const { items, addItem, updateQty } = useCart();

  const pieceQty = items.find((i) => i.id === `${product.id}-piece`)?.quantity ?? 0;
  const cupPrice = perCupPrice(product);

  const handleAddBox = () => {
    addItem({
      id: product.id,
      name: `${product.name} (box)`,
      price: product.price_wholesale,
      imageUrl: product.image_url,
      moq: product.moq,
      sku: product.sku,
    });
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

  const occasionBadge = product.occasion_tags?.[0]
    ? OCCASION_LABELS[product.occasion_tags[0]]
    : null;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-low shadow-sm transition-all duration-300 hover:shadow-md">
      <div>
        <div className="relative h-60 w-full overflow-hidden bg-parchment-deep">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
          )}
          <div className="absolute left-space-sm top-space-sm flex flex-col gap-1">
            {occasionBadge && (
              <span className="rounded bg-surface/90 px-space-sm py-0.5 font-sans text-label-sm font-semibold uppercase text-primary backdrop-blur-sm">
                {occasionBadge}
              </span>
            )}
          </div>
          {product.sku && (
            <div className="absolute bottom-space-sm right-space-sm rounded bg-primary/80 px-space-sm py-0.5 font-sans text-label-sm text-parchment-deep backdrop-blur-sm">
              SKU: {product.sku}
            </div>
          )}
        </div>

        <div className="space-y-space-sm p-space-md">
          <div className="flex items-baseline justify-between">
            {product.description && (
              <span className="font-sans text-label-sm uppercase tracking-wider text-antique-gold-muted">
                {product.description.length > 40 ? `${product.description.slice(0, 40)}…` : product.description}
              </span>
            )}
            {typeof product.caffeine_level === "number" && (
              <div className="flex items-center gap-0.5 text-secondary" title={`Kofeino lygis ${product.caffeine_level}/5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${i < product.caffeine_level! ? "bg-secondary" : "bg-surface-variant"}`}
                  />
                ))}
              </div>
            )}
          </div>

          <h3 className="font-serif text-headline-sm text-primary transition-colors group-hover:text-antique-gold-muted">
            {product.name}
          </h3>

          {product.flavor_tags && product.flavor_tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.flavor_tags.map((tag) => (
                <span key={tag} className="rounded bg-surface px-2 py-0.5 font-sans text-label-sm text-on-surface-variant">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {product.package_size && (
            <div className="flex items-center justify-between rounded-lg bg-surface p-space-sm font-sans text-body-sm">
              <span className="text-on-surface-variant">Pakuotė:</span>
              <span className="font-semibold text-primary">{product.package_size}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer: dual price + action */}
      <div className="space-y-space-sm rounded-b-xl bg-surface-container p-space-md">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-serif text-headline-sm font-bold text-primary">
              €{boxPrice(product).toFixed(2)}
            </span>
            <span className="ml-1 font-sans text-label-sm text-on-surface-variant">/ dėžutė</span>
          </div>
          {cupPrice !== null && (
            <div className="text-right">
              <span className="font-sans text-label-lg font-bold text-antique-gold-muted">€{cupPrice.toFixed(2)}</span>
              <span className="block text-[10px] uppercase text-on-surface-variant">puodeliui</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-space-sm">
          <button
            onClick={handleAddBox}
            className="flex flex-1 items-center justify-center gap-space-xs rounded-lg bg-primary-container px-space-sm py-2 font-sans text-label-lg uppercase tracking-wider text-parchment-deep transition-colors hover:bg-racing-green-dark"
          >
            <span className="material-symbols-outlined text-[18px] text-antique-gold-bright" aria-hidden="true">add_shopping_cart</span>
            <span>Dėžutė</span>
          </button>
          <div className="flex items-center rounded-lg bg-surface px-2 py-1">
            <button onClick={decPiece} disabled={pieceQty === 0} className="px-1.5 font-bold text-on-surface transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-30">−</button>
            <span className="w-6 text-center font-sans text-label-lg text-primary">{pieceQty}</span>
            <button onClick={incPiece} className="px-1.5 font-bold text-on-surface transition hover:text-primary">+</button>
          </div>
        </div>
        <p className="text-center font-sans text-label-sm text-on-surface-variant/70">Min. užsakymas: {product.moq} dėž.</p>
      </div>
    </article>
  );
}

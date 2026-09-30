import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { ShopProduct } from "../ShopClient";
import AddToCart from "./AddToCart";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select(
      "id, name, image_url, package_size, price_wholesale, moq, sku, description, single_unit_fee, tea_type, tea_category, caffeine_level, flavor_tags, occasion_tags, units_per_package, package_weight_grams"
    )
    .eq("id", id)
    .single<ShopProduct>();

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-margin-mobile py-space-xl lg:px-margin-desktop">
      <Link href="/shop" className="font-sans text-body-sm text-on-surface-variant/60 transition hover:text-on-surface">
        ← Atgal į katalogą
      </Link>

      <div className="mt-space-md grid grid-cols-1 gap-gutter-lg md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-container">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
          )}
        </div>

        <div className="flex flex-col">
          {product.package_size && (
            <span className="w-fit rounded bg-surface-container px-2.5 py-1 font-sans text-label-sm font-semibold text-on-surface">
              {product.package_size}
            </span>
          )}
          <h1 className="mt-space-sm font-serif text-headline-lg-mobile tracking-tight text-on-surface lg:text-headline-lg">
            {product.name}
          </h1>

          {product.description && (
            <p className="mt-space-md font-sans text-body-md leading-relaxed text-on-surface-variant">
              {product.description}
            </p>
          )}

          <dl className="mt-space-lg grid grid-cols-2 gap-space-md font-sans text-body-md">
            {product.sku && (
              <div>
                <dt className="text-on-surface-variant/60">SKU</dt>
                <dd className="font-medium text-on-surface">{product.sku}</dd>
              </div>
            )}
            <div>
              <dt className="text-on-surface-variant/60">Minimalus užsakymas</dt>
              <dd className="font-medium text-on-surface">{product.moq} vnt.</dd>
            </div>
          </dl>

          <div className="mt-space-xl border-t border-outline-variant/30 pt-space-lg">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

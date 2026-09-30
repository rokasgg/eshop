import { supabase } from "@/lib/supabase/client";
import ShopClient, { type ShopProduct } from "./ShopClient";

export const dynamic = "force-dynamic";

const PRODUCT_COLUMNS =
  "id, name, image_url, package_size, price_wholesale, moq, sku, description, single_unit_fee, tea_type, tea_category, caffeine_level, flavor_tags, occasion_tags, units_per_package, package_weight_grams";

export default async function ShopPage() {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("name", { ascending: true });

  if (error) console.error("Failed to load products:", error.message);

  const products: ShopProduct[] = data ?? [];

  return (
    <div className="min-h-screen bg-surface">
      {/* Page header */}
      <div className="bg-racing-green-dark px-margin-mobile py-space-xl text-center text-parchment-deep lg:px-margin-desktop">
        <p className="font-sans text-label-sm uppercase tracking-widest text-antique-gold-bright">
          HoReCa Didmeninė Prekyba
        </p>
        <h1 className="mt-2 font-serif text-headline-lg-mobile tracking-tight lg:text-headline-lg">
          Ahmad Tea Katalogas
        </h1>
        <p className="mt-space-sm font-sans text-body-md text-parchment-deep/70">
          Didmeninė arbata kavinėms, restoranams ir viešbučiams visoje Lietuvoje
        </p>
      </div>

      <ShopClient products={products} />
    </div>
  );
}

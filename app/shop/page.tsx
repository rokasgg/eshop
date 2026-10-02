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
      <div className="bg-racing-green-dark px-margin-mobile py-7 text-center text-parchment-deep lg:px-margin-desktop">
        <p className="font-sans text-[10.5px] uppercase tracking-widest text-antique-gold-bright">
          HoReCa Didmeninė Prekyba
        </p>
        <h1 className="mt-1.5 font-serif text-headline-lg-mobile leading-[1.1] tracking-tight lg:text-[40px]">
          Ahmad Tea Katalogas
        </h1>
        <p className="mt-1.5 font-sans text-[14px] text-parchment-deep/70">
          Didmeninė arbata kavinėms, restoranams ir viešbučiams visoje Lietuvoje
        </p>
      </div>

      <ShopClient products={products} />
    </div>
  );
}

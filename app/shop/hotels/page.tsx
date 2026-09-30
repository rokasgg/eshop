import { supabase } from "@/lib/supabase/client";
import type { ShopProduct } from "../ShopClient";
import EditorialHeader from "./EditorialHeader";
import HotelsCatalogClient from "./HotelsCatalogClient";

export const dynamic = "force-dynamic";

const PRODUCT_COLUMNS =
  "id, name, image_url, package_size, price_wholesale, moq, sku, description, single_unit_fee, tea_type, tea_category, caffeine_level, flavor_tags, occasion_tags, units_per_package, package_weight_grams";

export default async function HotelsCatalogPage() {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("name", { ascending: true });

  if (error) console.error("Failed to load products:", error.message);

  const products: ShopProduct[] = data ?? [];

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHeader productCount={products.length} />
      <HotelsCatalogClient products={products} />
    </div>
  );
}

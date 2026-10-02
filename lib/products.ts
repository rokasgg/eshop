import { supabase } from "@/lib/supabase/client";
import type { ShopProduct } from "@/app/[lang]/shop/ShopClient";
import type { Locale } from "@/lib/i18n";

const BASE_COLUMNS =
  "id, name, image_url, package_size, price_wholesale, moq, sku, description, single_unit_fee, tea_type, tea_category, caffeine_level, flavor_tags, occasion_tags, units_per_package, package_weight_grams";
// Added by supabase/migrations/0008_product_translations.sql
const EN_COLUMNS = "description_en, flavor_tags_en";

type ProductRow = ShopProduct & { description_en?: string | null; flavor_tags_en?: string[] | null };

// Postgres "undefined_column": the translation migration hasn't been run yet
const MISSING_COLUMN = "42703";

// English product texts fall back to Lithuanian until they've been filled in
function localize(row: ProductRow, lang: Locale): ShopProduct {
  const { description_en, flavor_tags_en, ...product } = row;
  if (lang !== "en") return product;
  return {
    ...product,
    // Pack sizes are mostly language-neutral ("100x2g"); "20 pakelių" isn't
    package_size: product.package_size?.replace(/(\d+)\s*pakel(?:ių|iai|is)/g, (_, n) => `${n} ${n === "1" ? "bag" : "bags"}`) ?? null,
    description: description_en || product.description,
    flavor_tags: flavor_tags_en?.length ? flavor_tags_en : product.flavor_tags,
  };
}

async function select<T>(lang: Locale, run: (columns: string) => PromiseLike<{ data: T | null; error: { code?: string; message: string } | null }>) {
  if (lang === "en") {
    const res = await run(`${BASE_COLUMNS}, ${EN_COLUMNS}`);
    if (res.error?.code !== MISSING_COLUMN) return res;
  }
  return run(BASE_COLUMNS);
}

export async function listProducts(lang: Locale): Promise<ShopProduct[]> {
  const { data, error } = await select<ProductRow[]>(lang, (columns) =>
    supabase.from("products").select(columns).order("name", { ascending: true }).returns<ProductRow[]>()
  );
  if (error) console.error("Failed to load products:", error.message);
  return (data ?? []).map((row) => localize(row, lang));
}

export async function getProduct(id: string, lang: Locale): Promise<ShopProduct | null> {
  const { data } = await select<ProductRow>(lang, (columns) =>
    supabase.from("products").select(columns).eq("id", id).single<ProductRow>()
  );
  return data ? localize(data, lang) : null;
}

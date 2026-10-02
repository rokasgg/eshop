import type { ShopProduct } from "@/app/[lang]/shop/ShopClient";
import type { Dictionary } from "@/app/[lang]/dictionaries";

// Catalog entry categories for /shop. "be-kofeino" cuts across tea types
// (e.g. Decaf Earl Grey is also black tea), so a tea can be in several.
// Texts (label, eyebrow, description) live in the dictionaries under categories.<slug>
export type CategorySlug = keyof Dictionary["categories"];

export type CatalogCategory = {
  slug: CategorySlug;
  /** Category photo; the picker falls back to a product photo without one */
  image?: string;
  match: (p: ShopProduct) => boolean;
};

// Category photos live next to the product photos in the "tea images" bucket
export const categoryImage = (file: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tea%20images/${file}`;

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: "juodoji",
    image: categoryImage("black1.png"),
    match: (p) => p.tea_category === "black",
  },
  {
    slug: "zalioji",
    image: categoryImage("green1.png"),
    match: (p) => p.tea_category === "green",
  },
  {
    slug: "vaisiu",
    image: categoryImage("fruit1.png"),
    match: (p) => p.tea_category === "fruit",
  },
  {
    slug: "zoleliu",
    image: categoryImage("detox1.png"),
    match: (p) => p.tea_category === "herbal",
  },
  {
    slug: "be-kofeino",
    image: categoryImage("decaf1.png"),
    // Strict: unknown caffeine level is not treated as decaf
    match: (p) => p.caffeine_level === 0,
  },
  {
    slug: "visos",
    image: categoryImage("allTeas.png"),
    match: () => true,
  },
];

export const ALL_CATEGORY_SLUG: CategorySlug = "visos";

export function getCategory(slug: string | null | undefined) {
  return CATALOG_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

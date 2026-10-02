import type { ShopProduct } from "@/app/shop/ShopClient";

// Catalog entry categories for /shop. "be-kofeino" cuts across tea types
// (e.g. Decaf Earl Grey is also black tea), so a tea can be in several.
export type CatalogCategory = {
  slug: string;
  label: string;
  eyebrow: string;
  description: string;
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
    label: "Juodoji arbata",
    eyebrow: "Black Tea",
    description: "English Breakfast, Earl Grey, Ceylon ir Assam klasika",
    image: categoryImage("black1.png"),
    match: (p) => p.tea_category === "black",
  },
  {
    slug: "zalioji",
    label: "Žalioji arbata",
    eyebrow: "Green Tea",
    description: "Gryna žalioji, su jazminais ir mėta",
    image: categoryImage("green1.png"),
    match: (p) => p.tea_category === "green",
  },
  {
    slug: "vaisiu",
    label: "Vaisių arbata",
    eyebrow: "Fruit Infusions",
    description: "Uogų ir vaisių mišiniai sodriam skoniui",
    image: categoryImage("fruit1.png"),
    match: (p) => p.tea_category === "fruit",
  },
  {
    slug: "zoleliu",
    label: "Žolelių arbata",
    eyebrow: "Wellness & Natural",
    description: "Natūralios žolelių kompozicijos savijautai",
    image: categoryImage("detox1.png"),
    match: (p) => p.tea_category === "herbal",
  },
  {
    slug: "be-kofeino",
    label: "Be kofeino",
    eyebrow: "Caffeine Free",
    description: "Vakarui, SPA ir svečių poilsiui",
    image: categoryImage("decaf1.png"),
    // Strict: unknown caffeine level is not treated as decaf
    match: (p) => p.caffeine_level === 0,
  },
  {
    slug: "visos",
    label: "Visos arbatos",
    eyebrow: "Full Catalogue",
    description: "Visas asortimentas vienoje vietoje",
    image: categoryImage("allTeas.png"),
    match: () => true,
  },
];

export const ALL_CATEGORY_SLUG = "visos";

export function getCategory(slug: string | null | undefined) {
  return CATALOG_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

// Lithuanian plural forms: 1 pozicija, 2–9 pozicijos, 10–20 pozicijų, 21 pozicija…
export function positionsLabel(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} pozicija`;
  if (mod10 >= 2 && (mod100 < 10 || mod100 >= 20)) return `${n} pozicijos`;
  return `${n} pozicijų`;
}

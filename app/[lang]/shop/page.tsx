import ShopClient from "./ShopClient";
import { listProducts } from "@/lib/products";
import { hasLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getI18n } from "../dictionaries";

export const dynamic = "force-dynamic";

export default async function ShopPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ t }, products] = await Promise.all([getI18n(lang), listProducts(lang)]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Page header */}
      <div className="bg-racing-green-dark px-margin-mobile py-7 text-center text-parchment-deep lg:px-margin-desktop">
        <p className="font-sans text-[10.5px] uppercase tracking-widest text-antique-gold-bright">
          {t.catalog.eyebrow}
        </p>
        <h1 className="mt-1.5 font-serif text-headline-lg-mobile leading-[1.1] tracking-tight lg:text-[40px]">
          {t.catalog.title}
        </h1>
        <p className="mt-1.5 font-sans text-[14px] text-parchment-deep/70">
          {t.catalog.subtitle}
        </p>
      </div>

      <ShopClient products={products} />
    </div>
  );
}

import { listProducts } from "@/lib/products";
import { hasLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import EditorialHeader from "./EditorialHeader";
import HotelsCatalogClient from "./HotelsCatalogClient";

export const dynamic = "force-dynamic";

export default async function HotelsCatalogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const products = await listProducts(lang);

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHeader lang={lang} productCount={products.length} />
      <HotelsCatalogClient products={products} />
    </div>
  );
}

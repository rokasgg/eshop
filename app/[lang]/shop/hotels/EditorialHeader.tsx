import { getI18n } from "../../dictionaries";
import type { Locale } from "@/lib/i18n";

// productCount is catalog SKUs (one tea can come in several pack sizes),
// so it's labelled as positions, not teas.
function ProofPoint({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="flex flex-col">
      <dt className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant/80">{label}</dt>
      <dd className="mt-1 whitespace-nowrap font-serif text-[22px] font-semibold leading-tight text-primary">{value}</dd>
      <dd className="font-sans text-[12px] text-antique-gold-muted">{note}</dd>
    </div>
  );
}

export default async function EditorialHeader({ lang, productCount }: { lang: Locale; productCount: number }) {
  const { t, plural } = await getI18n(lang);
  return (
    <section className="w-full bg-surface-container-low px-margin-mobile pb-5 pt-7 lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-gutter-lg">
        <div className="max-w-[720px]">
          <div className="mb-3 flex items-center gap-1.5 font-sans text-[10.5px] uppercase tracking-widest text-antique-gold-muted">
            <span className="material-symbols-outlined text-antique-gold-bright text-[14px]" aria-hidden="true">star</span>
            <span>{t.hotels.eyebrow}</span>
          </div>
          <h1 className="font-serif text-headline-lg-mobile leading-[1.1] tracking-tight text-primary lg:text-[44px]">
            {t.hotels.title}
          </h1>
          <p className="mt-3 font-sans text-[15px] leading-snug text-on-surface">
            {t.hotels.lead}
          </p>
          <p className="mt-1.5 font-sans text-[14px] leading-snug text-on-surface-variant">
            {t.hotels.sub}
          </p>
        </div>

        {/* Quick B2B metrics — intentionally quieter than the headline */}
        <dl className="grid shrink-0 grid-cols-[1fr_auto_1fr] gap-x-5 rounded-xl border border-hairline-green bg-surface px-5 py-3 lg:gap-x-6">
          <ProofPoint label={t.hotels.statCatalog} value={plural(productCount, t.common.positions)} note={t.hotels.statCatalogNote} />
          <div className="w-px bg-hairline-green" aria-hidden="true" />
          <ProofPoint label={t.hotels.statDelivery} value={t.hotels.statDeliveryValue} note={t.hotels.statDeliveryNote} />
        </dl>
      </div>
    </section>
  );
}

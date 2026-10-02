import { getI18n } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function TopBanner({ lang }: { lang: Locale }) {
  const { t } = await getI18n(lang);
  return (
    <section className="w-full bg-parchment-deep px-margin-mobile py-space-xs text-charcoal-ink lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-space-xs md:flex-row">
        <div className="flex items-center gap-space-sm font-sans text-body-sm text-charcoal-muted">
          <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-antique-gold-bright" />
          <span className="font-bold uppercase tracking-wide text-label-sm text-secondary">
            {t.home.topBanner.b2b}
          </span>
          <span className="hidden text-hairline-green sm:inline">•</span>
          <span className="hidden sm:inline">{t.home.topBanner.since}</span>
        </div>
        <div className="flex items-center gap-space-md font-sans text-label-sm uppercase tracking-wider text-charcoal-ink">
          <span className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-antique-gold-muted text-[16px]" aria-hidden="true">local_shipping</span>
            {t.home.topBanner.delivery}
          </span>
          <span className="text-hairline-green">•</span>
          <span className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-antique-gold-muted text-[16px]" aria-hidden="true">verified</span>
            {t.home.topBanner.warehouse}
          </span>
        </div>
      </div>
    </section>
  );
}

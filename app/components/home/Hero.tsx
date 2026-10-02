import Link from "next/link";
import { getI18n } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function Hero({ lang }: { lang: Locale }) {
  const { t, href } = await getI18n(lang);
  const h = t.home.hero;
  return (
    <section className="relative w-full overflow-hidden bg-surface px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-gutter-lg lg:grid-cols-12">
        {/* Left narrative column */}
        <div className="flex flex-col gap-space-md lg:col-span-7 lg:pr-space-lg">
          <div className="inline-flex w-fit items-center gap-space-xs rounded-full bg-surface-container px-space-sm py-1">
            <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">workspace_premium</span>
            <span className="font-sans text-label-sm uppercase tracking-widest text-secondary">
              {h.badge}
            </span>
          </div>
          <h1 className="font-serif text-display-hero-mobile text-primary leading-tight tracking-tight lg:text-display-hero">
            {h.title}
          </h1>
          <p className="max-w-xl font-sans text-body-lg leading-relaxed text-on-surface-variant">
            {h.lead}
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <Link
              href={href("/shop")}
              className="group flex items-center gap-space-xs rounded-lg bg-primary-container px-space-lg py-space-sm font-sans text-label-lg uppercase tracking-wider text-parchment-deep shadow-md transition-all hover:bg-racing-green-dark"
            >
              <span>{h.cta}</span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
            </Link>
            {/* Cafés & restaurants section hidden for now
            <Link
              href="/shop"
              className="rounded-lg bg-parchment-deep px-space-lg py-space-sm font-sans text-label-lg uppercase tracking-wider text-charcoal-ink shadow-sm transition-all hover:bg-surface-container"
            >
              Kavinių ir restoranų asortimentas
            </Link>
            */}
          </div>

          <div className="flex flex-col gap-space-sm pt-space-md font-sans text-label-sm text-charcoal-muted sm:flex-row sm:items-center">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">inventory_2</span>
              <span>{h.warehouse}</span>
            </div>
            <span className="hidden text-outline-variant sm:inline">•</span>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">electric_bolt</span>
              <span>{h.delivery}</span>
            </div>
            <span className="hidden text-outline-variant sm:inline">•</span>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">redeem</span>
              <span>{h.samples}</span>
            </div>
          </div>
        </div>

        {/* Right visual column */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container-high to-primary-container shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-racing-green-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-space-xs rounded-xl bg-surface/95 p-space-md shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-sans text-label-sm font-semibold uppercase tracking-widest text-secondary">{h.cardEyebrow}</span>
                <span className="material-symbols-outlined text-antique-gold-bright text-[20px]" aria-hidden="true">stars</span>
              </div>
              <p className="font-serif text-headline-sm leading-snug text-primary">
                {h.cardTitle}
              </p>
              <p className="font-sans text-body-sm text-on-surface-variant">
                {h.cardBody}
              </p>
            </div>
          </div>
          <div className="absolute -left-4 -top-4 hidden flex-col items-center justify-center rounded-xl bg-primary p-space-md text-center text-parchment-deep shadow-xl sm:flex">
            <span className="font-serif text-headline-md leading-none text-antique-gold-bright">1995</span>
            <span className="mt-1 font-sans text-label-sm uppercase tracking-wider text-parchment-deep/80">{h.since}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

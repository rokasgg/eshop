"use client";

import { useI18n } from "../I18nProvider";

const INPUT =
  "h-11 px-space-sm bg-surface-container-low rounded-lg font-sans text-body-md text-charcoal-ink focus:outline-none focus:ring-2 focus:ring-secondary";

export default function TastingRequestForm() {
  const { t } = useI18n();
  const c = t.home.tasting;
  return (
    <section id="tasting-form" className="w-full bg-racing-green-dark px-margin-mobile py-space-xl text-parchment-deep lg:px-margin-desktop">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl bg-primary-container p-space-xl shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-antique-gold-bright/10 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 gap-gutter-lg lg:grid-cols-12">
          {/* Left info */}
          <div className="flex flex-col justify-between gap-space-md lg:col-span-5">
            <div className="flex flex-col gap-space-sm">
              <div className="inline-flex w-fit items-center gap-space-xs rounded-full bg-surface/10 px-3 py-1">
                <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">inventory</span>
                <span className="font-sans text-label-sm font-semibold uppercase tracking-widest text-parchment-deep">
                  {c.badge}
                </span>
              </div>
              <h2 className="font-serif text-headline-lg-mobile leading-tight text-parchment-deep lg:text-headline-lg">
                {c.title}
              </h2>
              <p className="font-sans text-body-md leading-relaxed text-parchment-deep/80">
                {c.body}
              </p>
            </div>
            <div className="flex flex-col gap-space-sm rounded-xl bg-racing-green-dark/60 p-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-antique-gold-bright" aria-hidden="true">schedule</span>
                <div className="flex flex-col">
                  <span className="font-sans text-label-sm font-semibold uppercase tracking-wider text-parchment-deep">{c.fastTitle}</span>
                  <span className="font-sans text-body-sm text-parchment-deep/70">{c.fastBody}</span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-antique-gold-bright" aria-hidden="true">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-sans text-label-sm font-semibold uppercase tracking-wider text-parchment-deep">{c.noCommitTitle}</span>
                  <span className="font-sans text-body-sm text-parchment-deep/70">{c.noCommitBody}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="rounded-xl bg-surface p-space-lg text-on-surface shadow-xl lg:col-span-7">
            <form className="flex flex-col gap-space-md">
              <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                <div className="flex flex-col gap-space-xs">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="name">
                    {c.name}
                  </label>
                  <input id="name" type="text" placeholder={c.namePlaceholder} className={INPUT} disabled />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="company">
                    {c.company}
                  </label>
                  <input id="company" type="text" placeholder={c.companyPlaceholder} className={INPUT} disabled />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-space-md sm:grid-cols-3">
                <div className="flex flex-col gap-space-xs sm:col-span-1">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="venue-type">
                    {c.venueType}
                  </label>
                  <select id="venue-type" className={INPUT} disabled>
                    <option value="hotel">{c.venues.hotel}</option>
                    <option value="cafe">{c.venues.cafe}</option>
                    <option value="restaurant">{c.venues.restaurant}</option>
                    <option value="other">{c.venues.other}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-space-xs sm:col-span-1">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="email">
                    {c.email}
                  </label>
                  <input id="email" type="email" placeholder={c.emailPlaceholder} className={INPUT} disabled />
                </div>
                <div className="flex flex-col gap-space-xs sm:col-span-1">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="phone">
                    {c.phone}
                  </label>
                  <input id="phone" type="tel" placeholder="+370 600 00000" className={INPUT} disabled />
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="notes">
                  {c.notes}
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder={c.notesPlaceholder}
                  className={`${INPUT} h-auto resize-none p-space-sm`}
                  disabled
                />
              </div>
              <div className="flex flex-col items-center justify-between gap-space-md pt-space-xs sm:flex-row">
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-lg bg-primary/50 px-space-xl py-space-sm font-sans text-label-lg uppercase tracking-widest text-parchment-deep sm:w-auto"
                >
                  {c.comingSoon}
                </button>
                <span className="text-center font-sans text-body-sm text-charcoal-muted sm:text-right">
                  {c.comingSoonNote}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

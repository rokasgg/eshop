export default function TopBanner() {
  return (
    <section className="w-full bg-parchment-deep px-margin-mobile py-space-xs text-charcoal-ink lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-space-xs md:flex-row">
        <div className="flex items-center gap-space-sm font-sans text-body-sm text-charcoal-muted">
          <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-antique-gold-bright" />
          <span className="font-bold uppercase tracking-wide text-label-sm text-secondary">
            B2B Tiekimas Viešbučiams ir Restoranams
          </span>
          <span className="hidden text-hairline-green sm:inline">•</span>
          <span className="hidden sm:inline">UAB „Temus" — Įgaliotasis atstovas nuo 1995 m.</span>
        </div>
        <div className="flex items-center gap-space-md font-sans text-label-sm uppercase tracking-wider text-charcoal-ink">
          <span className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-antique-gold-muted text-[16px]" aria-hidden="true">local_shipping</span>
            24–48 val. pristatymas
          </span>
          <span className="text-hairline-green">•</span>
          <span className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-antique-gold-muted text-[16px]" aria-hidden="true">verified</span>
            Vilniaus sandėlis
          </span>
        </div>
      </div>
    </section>
  );
}

export default function EditorialHeader({ productCount }: { productCount: number }) {
  return (
    <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-gutter-lg lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-space-sm flex items-center gap-space-sm font-sans text-label-sm uppercase tracking-widest text-antique-gold-muted">
            <span className="material-symbols-outlined text-antique-gold-bright text-[16px]" aria-hidden="true">star</span>
            <span>Ahmad Tea London Someljė Cirkuliaras HoReCa Sektoriui</span>
          </div>
          <h1 className="font-serif text-headline-lg-mobile leading-tight tracking-tight text-primary lg:text-headline-lg">
            Viešbučiams Pritaikytas Arbatos Katalogas
          </h1>
          <p className="mt-space-sm font-sans text-body-lg leading-relaxed text-on-surface-variant">
            Struktūrizuota skonio sensorika, profesionalūs gastronominiai deriniai ir subalansuotos pakuotės 5 žvaigždučių viešbučių pusryčių salėms, reprezentaciniams „Afternoon Tea" ritualams, konferencijų pauzėms bei kambarių mini-barams.
          </p>
        </div>

        {/* Quick B2B metrics */}
        <div className="flex items-center gap-gutter rounded-xl bg-surface p-space-md shadow-sm">
          <div className="flex flex-col">
            <span className="font-sans text-label-sm uppercase tracking-wider text-on-surface-variant">Katalogas</span>
            <span className="font-sans text-title-md font-bold text-primary">{productCount} Rūšys</span>
            <span className="font-sans text-body-sm text-antique-gold-muted">Vilniaus sandėlis</span>
          </div>
          <div className="h-10 w-px bg-outline-variant/40" />
          <div className="flex flex-col">
            <span className="font-sans text-label-sm uppercase tracking-wider text-on-surface-variant">B2B Pristatymas</span>
            <span className="font-sans text-title-md font-bold text-primary">24–48 val.</span>
            <span className="font-sans text-body-sm text-antique-gold-muted">Kurjeriu visoje Lietuvoje</span>
          </div>
        </div>
      </div>
    </section>
  );
}

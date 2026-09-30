"use client";

const INPUT =
  "h-11 px-space-sm bg-surface-container-low rounded-lg font-sans text-body-md text-charcoal-ink focus:outline-none focus:ring-2 focus:ring-secondary";

export default function TastingRequestForm() {
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
                  Nemokamas Pavyzdžių Rinkinys
                </span>
              </div>
              <h2 className="font-serif text-headline-lg-mobile leading-tight text-parchment-deep lg:text-headline-lg">
                Išbandykite Ahmad Tea savo įstaigoje nemokamai
              </h2>
              <p className="font-sans text-body-md leading-relaxed text-parchment-deep/80">
                Užpildykite trumpą formą ir mes atsiųsime Jūsų viešbučiui ar restoranui pritaikytą arbatos pavyzdžių rinkinį bei individualų didmeninį kainoraštį.
              </p>
            </div>
            <div className="flex flex-col gap-space-sm rounded-xl bg-racing-green-dark/60 p-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-antique-gold-bright" aria-hidden="true">schedule</span>
                <div className="flex flex-col">
                  <span className="font-sans text-label-sm font-semibold uppercase tracking-wider text-parchment-deep">Greitas atsakymas</span>
                  <span className="font-sans text-body-sm text-parchment-deep/70">Atsakome ir degustacinį rinkinį išsiunčiame per 24 val.</span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-antique-gold-bright" aria-hidden="true">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-sans text-label-sm font-semibold uppercase tracking-wider text-parchment-deep">Be įsipareigojimų</span>
                  <span className="font-sans text-body-sm text-parchment-deep/70">Rinkinys skirtas komandos įvertinimui ir skonių palyginimui.</span>
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
                    Vardas, Pavardė *
                  </label>
                  <input id="name" type="text" placeholder="pvz. Jonas Petraitis" className={INPUT} disabled />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="company">
                    Įstaigos pavadinimas *
                  </label>
                  <input id="company" type="text" placeholder="pvz. Grand Hotel Vilnius" className={INPUT} disabled />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-space-md sm:grid-cols-3">
                <div className="flex flex-col gap-space-xs sm:col-span-1">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="venue-type">
                    Įstaigos tipas
                  </label>
                  <select id="venue-type" className={INPUT} disabled>
                    <option value="hotel">Viešbutis</option>
                    <option value="cafe">Kavinė</option>
                    <option value="restaurant">Restoranas</option>
                    <option value="other">Kita / SPA</option>
                  </select>
                </div>
                <div className="flex flex-col gap-space-xs sm:col-span-1">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="email">
                    El. paštas *
                  </label>
                  <input id="email" type="email" placeholder="vardas@imone.lt" className={INPUT} disabled />
                </div>
                <div className="flex flex-col gap-space-xs sm:col-span-1">
                  <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="phone">
                    Telefonas *
                  </label>
                  <input id="phone" type="tel" placeholder="+370 600 00000" className={INPUT} disabled />
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-sans text-label-sm uppercase tracking-wider text-charcoal-muted" htmlFor="notes">
                  Pageidaujamas formatas ar papildomi klausimai
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder="pvz. Ieškome birių arbatų pusryčių zonai ir šilko piramidžių a la carte meniu..."
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
                  Netrukus — užklausų forma ruošiama
                </button>
                <span className="text-center font-sans text-body-sm text-charcoal-muted sm:text-right">
                  Kol kas susisiekite telefonu ar el. paštu viršuje.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

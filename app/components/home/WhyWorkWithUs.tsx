const REASONS = [
  {
    icon: "warehouse",
    title: "Vietinis sandėlis Lietuvoje",
    body: "Visas populiariausias Ahmad Tea asortimentas nuolat palaikomas sandėlyje Vilniuje, todėl niekada nepritrūksite atsargų net intensyviausio sezono metu.",
  },
  {
    icon: "local_shipping",
    title: "Greitas ir patikimas pristatymas",
    body: "Skubus užsakymų pristatymas visoje Lietuvoje per 24–48 valandas tiesiai į Jūsų įstaigos sandėlį ar virtuvę be tarpininkų vėlavimų.",
  },
  {
    icon: "tune",
    title: "Lankstūs užsakymų kiekiai",
    // Note: softened from the Stitch export's literal "no minimum order" claim —
    // the catalog does enforce a per-product MOQ ("Add Box"), so the copy here
    // describes flexibility within that constraint rather than its absence.
    body: "Kiekvienam produktui pritaikytas minimalus užsakymo kiekis leidžia planuoti tiksliai tiek, kiek reikia Jūsų įstaigos apyvartai palaikyti be įšaldytų lėšų.",
  },
  {
    icon: "school",
    title: "Nemokami rinkiniai ir mokymai",
    body: "Suteikiame bandomuosius arbatos pavyzdžius, stilingus medinius arbatos pateikimo stendus ir apmokome personalą teisingo plikymo meno.",
  },
];

export default function WhyWorkWithUs() {
  return (
    <section className="w-full bg-surface px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-space-xl">
        <div className="mx-auto flex max-w-3xl flex-col gap-space-xs text-center">
          <span className="font-sans text-label-sm font-bold uppercase tracking-widest text-secondary">
            PATIKIMA TIEKIMO GRANDINĖ
          </span>
          <h2 className="font-serif text-headline-lg-mobile text-primary lg:text-headline-lg">
            Kodėl Lietuvos viešbučiai ir restoranai renkasi UAB „Temus"
          </h2>
          <p className="font-sans text-body-lg text-on-surface-variant">
            Daugiau nei 25 metai profesionalaus bendradarbiavimo su šalies geriausiais svetingumo lyderiais.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col gap-space-sm rounded-xl bg-parchment-deep p-space-lg shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-primary shadow-xs">
                <span className="material-symbols-outlined text-secondary text-[26px]" aria-hidden="true">{reason.icon}</span>
              </div>
              <h3 className="font-sans text-title-md font-bold text-primary">{reason.title}</h3>
              <p className="font-sans text-body-md leading-relaxed text-charcoal-muted">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

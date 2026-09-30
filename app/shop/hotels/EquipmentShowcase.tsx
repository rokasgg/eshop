const ITEMS = [
  {
    icon: "inventory_2",
    title: "Mediniai Prezentaciniai Dėklai",
    body: "Rankų darbo mediniai stovai pusryčių linijoms ir Afternoon Tea prezentacijai, graviruoti Ahmad Tea ženklu.",
  },
  {
    icon: "coffee_maker",
    title: "Stikliniai Arbatinukai ir Servizai",
    body: "Skaidrūs stikliniai arbatinukai birios arbatos ritualams — elegantiškas pateikimas restoranų salėse.",
  },
  {
    icon: "menu_book",
    title: "Meniu Įforminimo Medžiaga",
    body: "Firminiai arbatos meniu šablonai ir aprašymai, padedantys pristatyti asortimentą svečiams.",
  },
];

export default function EquipmentShowcase() {
  return (
    <section className="w-full bg-surface-container px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto max-w-[1440px] space-y-space-lg">
        <div className="max-w-2xl">
          <span className="font-sans text-label-sm uppercase tracking-widest text-antique-gold-muted">
            HoReCa Serviravimo Įranga
          </span>
          <h2 className="font-serif text-headline-md text-primary">Mediniai Prezentaciniai Dėklai ir Indai</h2>
          <p className="mt-1 font-sans text-body-md text-on-surface-variant">
            Papildoma serviravimo įranga, įtraukiama į didesnius HoReCa užsakymus — susisiekite dėl detalių.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col gap-space-sm rounded-xl bg-surface p-space-lg shadow-sm">
              <div className="relative mb-space-xs h-40 w-full overflow-hidden rounded-lg bg-gradient-to-br from-surface-container-high to-primary-container">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[40px] text-antique-gold-bright" aria-hidden="true">{item.icon}</span>
                </div>
              </div>
              <h3 className="font-sans text-title-md font-bold text-primary">{item.title}</h3>
              <p className="font-sans text-body-md leading-relaxed text-on-surface-variant">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

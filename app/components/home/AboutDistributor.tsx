const METRICS = [
  { value: "25+", label: "Metų patirtis Lietuvoje" },
  { value: "150+", label: "HoReCa partnerių" },
  { value: "100%", label: "Originali garantija" },
];

export default function AboutDistributor() {
  return (
    <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-gutter-lg lg:grid-cols-12">
        <div className="flex flex-col gap-space-md lg:col-span-6">
          <div className="flex items-center gap-space-xs font-sans text-label-sm font-semibold uppercase tracking-widest text-secondary">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">history_edu</span>
            <span>OFICIALUS ATSTOVAS LIETUVOJE – UAB „TEMUS"</span>
          </div>
          <h2 className="font-serif text-headline-lg-mobile leading-tight text-primary lg:text-headline-lg">
            Britiška kokybė ir šeimos verslo atsakomybė nuo 1995 m.
          </h2>
          <div className="flex flex-col gap-space-sm font-sans text-body-md leading-relaxed text-on-surface-variant">
            <p>
              Jau daugiau nei du dešimtmečius UAB „Temus" atstovauja pasaulyje pripažintą „Ahmad Tea London" ženklą Lietuvoje. Vertiname asmeninį ryšį su kiekvienu partneriu: nuo mažos jaukios senamiesčio kavinukės iki didžiausių Baltijos šalių kurortų viešbučių tinklų.
            </p>
            <p>
              Užtikriname tiesioginį tiekimą iš sertifikuotų gamyklų, nepriekaištingą produkto šviežumą ir profesionalią arbatos kultūros pagalbą personalui. Mūsų tikslas – paversti kiekvieną arbatos puodelį Jūsų įstaigoje nepriekaištinga patirtimi svečiui.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-space-md pt-space-md">
            {METRICS.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="font-serif text-headline-lg-mobile font-bold text-primary lg:text-headline-lg">
                  {metric.value}
                </span>
                <span className="font-sans text-label-sm font-semibold uppercase text-secondary">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container to-primary-container shadow-xl">
            <div className="absolute inset-0 bg-primary/20" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-surface/90 p-space-md backdrop-blur-md">
              <p className="font-serif text-headline-sm text-primary">Tiesioginis tiekimas iš fabriko</p>
              <p className="font-sans text-body-sm text-charcoal-muted">
                Sandėliuojama kontroliuojamoje temperatūroje Vilniuje, užtikrinant eterinių aliejų ir aromato išsaugojimą.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

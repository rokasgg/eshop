import Link from "next/link";

// Cafés don't have a dedicated catalog route yet — points at the general
// catalog until a café-specific Stitch export arrives.
// Café segment hidden for now; restore this and the card below together.
// const CAFE_HREF = "/shop";

export default function SegmentPortals() {
  return (
    <section className="w-full bg-surface px-margin-mobile py-space-xl lg:px-margin-desktop">
      {/* lg:grid-cols-2 while the café card below is visible */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-gutter-lg">
        {/* Hotel segment */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary-container p-space-xl text-parchment-deep shadow-xl">
          <div className="relative z-10 flex flex-col gap-space-md">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-surface/10 px-3 py-1">
              <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">hotel</span>
              <span className="font-sans text-label-sm uppercase tracking-widest text-parchment-deep">
                Viešbučiams ir Svečių Namams
              </span>
            </div>
            <h3 className="font-serif text-headline-lg-mobile leading-snug text-parchment-deep lg:text-headline-lg">
              Hotels &amp; Boutique Stays
            </h3>
            <p className="max-w-lg font-sans text-body-lg leading-relaxed text-parchment-deep/80">
              Prabangūs arbatos sprendimai numeriams, pusryčių bufetams, konferencijų salėms ir Executive Lounge erdvėms. Įskaičiuoti estetiški mediniai prezentaciniai dėklai, atitinkantys tarptautinius 4 ir 5 žvaigždučių svetingumo standartus.
            </p>
            <ul className="flex flex-col gap-space-xs pt-space-xs font-sans text-body-md text-parchment-deep/90">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">check_circle</span>
                Atskirai hermetiškai pakuoti vokeliai kambariams
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">check_circle</span>
                Pusryčių linijos stoveliai ir graviruotos medinės dėžutės
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">check_circle</span>
                Specialūs didelio tūrio arbatos pakeliai banketams
              </li>
            </ul>
          </div>
          <div className="relative z-10 pt-space-lg">
            <Link
              href="/shop/hotels"
              className="inline-flex items-center gap-space-xs rounded-lg bg-parchment-deep px-space-lg py-space-sm font-sans text-label-lg uppercase tracking-wider text-charcoal-ink shadow-md transition-all hover:bg-surface"
            >
              <span>Susipažinti su viešbučių sprendimais</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Cafe & Restaurant segment — hidden for now
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-parchment-deep p-space-xl text-charcoal-ink shadow-xl">
          <div className="relative z-10 flex flex-col gap-space-md">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-container px-3 py-1">
              <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">restaurant</span>
              <span className="font-sans text-label-sm font-bold uppercase tracking-widest text-secondary">
                Kavinėms, Barams ir Restoranams
              </span>
            </div>
            <h3 className="font-serif text-headline-lg-mobile leading-snug text-primary lg:text-headline-lg">
              Cafés &amp; Fine Dining
            </h3>
            <p className="max-w-lg font-sans text-body-lg leading-relaxed text-on-surface-variant">
              Aukščiausios kokybės birios lapinės arbatos ritualams, skaidrios šilkinės piramidės greitam ir nepriekaištingam baristų darbui, firminiai stikliniai arbatinukai bei pagalbinė medžiaga stilingam meniu įforminimui.
            </p>
            <ul className="flex flex-col gap-space-xs pt-space-xs font-sans text-body-md text-charcoal-muted">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">check_circle</span>
                Pilno lapo (Whole Leaf) birios arbatos skardinėse
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">check_circle</span>
                Biologiškai suyrančios šilkinės piramidės su virvele
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">check_circle</span>
                Pagalba sudarant sezonines arbatos kortas desertams derinti
              </li>
            </ul>
          </div>
          <div className="relative z-10 pt-space-lg">
            <Link
              href={CAFE_HREF}
              className="inline-flex items-center gap-space-xs rounded-lg bg-primary px-space-lg py-space-sm font-sans text-label-lg uppercase tracking-wider text-parchment-deep shadow-md transition-all hover:bg-racing-green-dark"
            >
              <span>Susipažinti su kavinių sprendimais</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}

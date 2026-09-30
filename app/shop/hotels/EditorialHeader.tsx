// productCount is catalog SKUs (one tea can come in several pack sizes),
// so it's labelled as positions, not teas.
// Lithuanian plural forms: 1 pozicija, 2–9 pozicijos, 10–20 pozicijų, 21 pozicija…
function positionsLabel(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} pozicija`;
  if (mod10 >= 2 && (mod100 < 10 || mod100 >= 20)) return `${n} pozicijos`;
  return `${n} pozicijų`;
}

function ProofPoint({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="flex flex-col">
      <dt className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant/80">{label}</dt>
      <dd className="mt-1 whitespace-nowrap font-serif text-[22px] font-semibold leading-tight text-primary">{value}</dd>
      <dd className="font-sans text-[12px] text-antique-gold-muted">{note}</dd>
    </div>
  );
}

export default function EditorialHeader({ productCount }: { productCount: number }) {
  return (
    <section className="w-full bg-surface-container-low px-margin-mobile pb-5 pt-7 lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-gutter-lg">
        <div className="max-w-[720px]">
          <div className="mb-3 flex items-center gap-1.5 font-sans text-[10.5px] uppercase tracking-widest text-antique-gold-muted">
            <span className="material-symbols-outlined text-antique-gold-bright text-[14px]" aria-hidden="true">star</span>
            <span>Ahmad Tea London · HoReCa kolekcija</span>
          </div>
          <h1 className="font-serif text-headline-lg-mobile leading-[1.1] tracking-tight text-primary lg:text-[44px]">
            Arbatos Kolekcija Viešbučiams
          </h1>
          <p className="mt-3 font-sans text-[15px] leading-snug text-on-surface">
            Atrinktas Ahmad Tea asortimentas viešbučių pusryčiams, Afternoon Tea, Room Service, SPA ir svečių kambariams.
          </p>
          <p className="mt-1.5 font-sans text-[14px] leading-snug text-on-surface-variant">
            Sensoriniai profiliai ir profesionalios pakuotės padeda greitai pasirinkti tinkamiausias arbatas kiekvienam
            aptarnavimo scenarijui.
          </p>
        </div>

        {/* Quick B2B metrics — intentionally quieter than the headline */}
        <dl className="grid shrink-0 grid-cols-[1fr_auto_1fr] gap-x-5 rounded-xl border border-hairline-green bg-surface px-5 py-3 lg:gap-x-6">
          <ProofPoint label="Katalogas" value={positionsLabel(productCount)} note="Sandėlyje Vilniuje" />
          <div className="w-px bg-hairline-green" aria-hidden="true" />
          <ProofPoint label="B2B pristatymas" value="24–48 val." note="Visoje Lietuvoje" />
        </dl>
      </div>
    </section>
  );
}

import type { OccasionTag } from "../ShopClient";

const OCCASIONS: { value: OccasionTag | "all"; icon: string; label: string; hint: string }[] = [
  { value: "all", icon: "all_inclusive", label: "Visi Scenarijai", hint: "Pilna kolekcija" },
  { value: "breakfast", icon: "free_breakfast", label: "Pusryčių Bufetas", hint: "Tvirtos, tonizuojančios" },
  { value: "afternoon", icon: "bakery_dining", label: "Afternoon Tea", hint: "Bergamotė, gėlių natos" },
  { value: "rooms", icon: "bed", label: "Room Service", hint: "Higieniški vokeliai" },
  { value: "spa", icon: "spa", label: "SPA & Poilsis", hint: "Be kofeino, žolelės" },
];

export default function OccasionNavigator({
  active,
  onChange,
}: {
  active: OccasionTag | "all";
  onChange: (value: OccasionTag | "all") => void;
}) {
  return (
    <section className="w-full bg-surface-container px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto max-w-[1440px] space-y-space-lg">
        <div className="flex flex-col gap-space-sm md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-sans text-label-sm uppercase tracking-widest text-antique-gold-muted">
              Sensorinis Navigavimas
            </span>
            <h2 className="font-serif text-headline-md text-primary">Viešbučio ir Restorano Scenarijai</h2>
          </div>
          <div className="flex items-center gap-space-xs font-sans text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">psychology</span>
            <span>Spustelėkite scenarijų, norėdami filtruoti rekomenduojamus skonių profilius</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-space-md md:grid-cols-5">
          {OCCASIONS.map((occasion) => {
            const isActive = active === occasion.value;
            return (
              <button
                key={occasion.value}
                onClick={() => onChange(occasion.value)}
                className={`flex h-36 flex-col justify-between rounded-xl p-space-md text-left shadow-sm transition-all ${
                  isActive
                    ? "bg-primary-container text-parchment-deep shadow-md"
                    : "bg-surface text-on-surface hover:bg-surface-bright"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`material-symbols-outlined text-[26px] ${isActive ? "text-antique-gold-bright" : "text-secondary"}`}
                    aria-hidden="true"
                  >
                    {occasion.icon}
                  </span>
                </div>
                <div>
                  <span className={`block font-sans text-title-md leading-snug ${isActive ? "" : "text-primary"}`}>
                    {occasion.label}
                  </span>
                  <span className={`font-sans text-body-sm ${isActive ? "text-parchment-deep/70" : "text-on-surface-variant"}`}>
                    {occasion.hint}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <SensoryFlavourLegend />
      </div>
    </section>
  );
}

function SensoryFlavourLegend() {
  const NOTES = [
    { color: "#8E412E", label: "Malty & Robust (Salyklinis / Gilus)" },
    { color: "#E5B800", label: "Citrus & Bergamot (Bergamotė / Gaiva)" },
    { color: "#A2B890", label: "Floral & Jasmine (Gėlės / Subtilu)" },
    { color: "#3D8B62", label: "Fresh Mint & Herbal (Mėta / Žolelės)" },
    { color: "#BF3952", label: "Fruity & Spiced (Uogos / Cinamonas)" },
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-space-lg rounded-xl bg-parchment-deep p-space-lg lg:flex-row">
      <div className="flex items-center gap-space-md">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container text-antique-gold-bright shadow-sm">
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">explore</span>
        </div>
        <div>
          <span className="font-sans text-label-sm uppercase tracking-wider text-antique-gold-muted">Sensory Radar Spektras</span>
          <p className="font-sans text-title-md font-semibold text-primary">Skonio teritorijos &amp; Ahmad Tea Master Blender kompozicijos</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-space-sm">
        {NOTES.map((note) => (
          <span
            key={note.label}
            className="flex items-center gap-space-xs rounded-full bg-surface px-space-md py-1.5 font-sans text-label-sm text-charcoal-ink shadow-sm"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: note.color }} />
            <span>{note.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

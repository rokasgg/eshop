"use client";

import type { OccasionTag } from "../ShopClient";
import { useI18n } from "@/app/components/I18nProvider";

// Labels and hints live in the dictionaries under occasions.<value>
const OCCASIONS: { value: OccasionTag | "all"; icon: string }[] = [
  { value: "all", icon: "all_inclusive" },
  { value: "breakfast", icon: "free_breakfast" },
  { value: "afternoon", icon: "bakery_dining" },
  { value: "rooms", icon: "bed" },
  { value: "spa", icon: "spa" },
];

export default function OccasionNavigator({
  active,
  onChange,
}: {
  active: OccasionTag | "all";
  onChange: (value: OccasionTag | "all") => void;
}) {
  const { t } = useI18n();
  return (
    <section className="w-full bg-surface-container px-margin-mobile py-6 lg:px-margin-desktop">
      <div className="mx-auto max-w-[1440px] space-y-4">
        <div>
          <span className="font-sans text-[10.5px] uppercase tracking-widest text-antique-gold-muted">
            {t.hotels.scenariosEyebrow}
          </span>
          <h2 className="mt-1 font-serif text-[26px] leading-tight text-primary">{t.hotels.scenariosTitle}</h2>
        </div>

        {/* auto-rows-fr keeps every card the same height even if one hint wraps */}
        <div className="grid auto-rows-fr grid-cols-2 gap-3 md:grid-cols-5 lg:gap-4">
          {OCCASIONS.map((occasion) => {
            const isActive = active === occasion.value;
            return (
              <button
                key={occasion.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(occasion.value)}
                className={`relative flex flex-col overflow-hidden rounded-xl border px-4 py-3 text-left transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold-bright motion-reduce:transform-none ${isActive
                    ? "border-primary-container bg-primary-container text-parchment-deep"
                    : "border-hairline-green bg-surface text-on-surface shadow-[0_1px_2px_rgba(11,41,27,0.04)] hover:-translate-y-0.5 hover:border-hairline-gold hover:shadow-[0_6px_16px_rgba(11,41,27,0.08)]"
                  }`}
              >
                {isActive && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-antique-gold-muted" />
                )}
                <span
                  className={`material-symbols-outlined text-[19px] leading-none ${isActive ? "text-antique-gold-bright" : "text-secondary"}`}
                  aria-hidden="true"
                >
                  {occasion.icon}
                </span>
                <span className={`mt-3 block font-sans text-[16px] font-medium leading-snug ${isActive ? "" : "text-primary"}`}>
                  {t.occasions[occasion.value].label}
                </span>
                <span
                  className={`mt-0.5 block font-sans text-[11.5px] leading-snug ${isActive ? "text-parchment-deep/70" : "text-on-surface-variant"}`}
                >
                  {t.occasions[occasion.value].hint}
                </span>
              </button>
            );
          })}
        </div>

        {/* <SensoryFlavourLegend /> */}
      </div>
    </section>
  );
}

function SensoryFlavourLegend() {
  const NOTES = [
    { color: "#8E412E", label: "Malty & Robust", lt: "Salyklinis / Gilus" },
    { color: "#E5B800", label: "Citrus & Bergamot", lt: "Bergamotė / Gaiva" },
    { color: "#A2B890", label: "Floral & Jasmine", lt: "Gėlės / Subtilu" },
    { color: "#3D8B62", label: "Fresh Mint & Herbal", lt: "Mėta / Žolelės" },
    { color: "#BF3952", label: "Fruity & Spiced", lt: "Uogos / Cinamonas" },
  ];

  // Secondary to the scenario cards: quiet panel, compact read-only pills.
  return (
    <div className="flex flex-col gap-space-md rounded-xl border border-hairline-green px-space-md py-space-md lg:flex-row lg:items-center lg:justify-between lg:gap-space-lg lg:px-space-lg">
      <div className="flex shrink-0 items-center gap-space-sm">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[50%] bg-primary-container text-antique-gold-bright">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">explore</span>
        </div>
        <div>
          <span className="block font-sans text-label-sm uppercase tracking-widest text-antique-gold-muted">Skonio profiliai</span>
          <p className="font-serif text-[18px] leading-snug text-primary">Ahmad Tea skonio spektras</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-1.5 lg:justify-end">
        {NOTES.map((note) => (
          <li
            key={note.label}
            className="flex h-7 items-center gap-1.5 rounded-[999px] border border-hairline-green bg-surface-container-low/60 px-2.5 font-sans text-[12px] leading-none"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-[50%]" style={{ backgroundColor: note.color }} aria-hidden="true" />
            <span className="text-charcoal-ink/85">{note.label}</span>
            <span className="text-on-surface-variant/60">{note.lt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

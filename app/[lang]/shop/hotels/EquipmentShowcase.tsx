"use client";

import { useI18n } from "@/app/components/I18nProvider";

// Texts live in the dictionaries under hotels.equipment, in this order
const ICONS = ["inventory_2", "coffee_maker", "menu_book"];

export default function EquipmentShowcase() {
  const { t } = useI18n();
  return (
    <section className="w-full bg-surface-container px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto max-w-[1440px] space-y-space-lg">
        <div className="max-w-2xl">
          <span className="font-sans text-label-sm uppercase tracking-widest text-antique-gold-muted">
            {t.hotels.equipmentEyebrow}
          </span>
          <h2 className="font-serif text-headline-md text-primary">{t.hotels.equipmentTitle}</h2>
          <p className="mt-1 font-sans text-body-md text-on-surface-variant">
            {t.hotels.equipmentIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-3">
          {t.hotels.equipment.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-space-sm rounded-xl bg-surface p-space-lg shadow-sm">
              <div className="relative mb-space-xs h-40 w-full overflow-hidden rounded-lg bg-gradient-to-br from-surface-container-high to-primary-container">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[40px] text-antique-gold-bright" aria-hidden="true">{ICONS[i]}</span>
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

import { getI18n } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

// Texts live in the dictionaries under home.why.reasons, in this order.
// The "flexible quantities" copy is softened from the Stitch export's literal
// "no minimum order" claim, since each product has a minimum of one box.
const REASON_ICONS = ["warehouse", "local_shipping", "tune", "school"];

export default async function WhyWorkWithUs({ lang }: { lang: Locale }) {
  const { t } = await getI18n(lang);
  const c = t.home.why;
  return (
    <section className="w-full bg-surface px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-space-xl">
        <div className="mx-auto flex max-w-3xl flex-col gap-space-xs text-center">
          <span className="font-sans text-label-sm font-bold uppercase tracking-widest text-secondary">
            {c.eyebrow}
          </span>
          <h2 className="font-serif text-headline-lg-mobile text-primary lg:text-headline-lg">
            {c.title}
          </h2>
          <p className="font-sans text-body-lg text-on-surface-variant">
            {c.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg sm:grid-cols-2 lg:grid-cols-4">
          {c.reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="flex flex-col gap-space-sm rounded-xl bg-parchment-deep p-space-lg shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-primary shadow-xs">
                <span className="material-symbols-outlined text-secondary text-[26px]" aria-hidden="true">{REASON_ICONS[i]}</span>
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

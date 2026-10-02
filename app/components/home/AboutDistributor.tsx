import { getI18n } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

// Labels live in the dictionaries under home.about.metrics, in this order
const METRIC_VALUES = ["25+", "150+", "100%"];

export default async function AboutDistributor({ lang }: { lang: Locale }) {
  const { t } = await getI18n(lang);
  const c = t.home.about;
  const metrics = c.metrics.map((label, i) => ({ label, value: METRIC_VALUES[i] }));
  return (
    <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-gutter-lg lg:grid-cols-12">
        <div className="flex flex-col gap-space-md lg:col-span-6">
          <div className="flex items-center gap-space-xs font-sans text-label-sm font-semibold uppercase tracking-widest text-secondary">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">history_edu</span>
            <span>{c.eyebrow}</span>
          </div>
          <h2 className="font-serif text-headline-lg-mobile leading-tight text-primary lg:text-headline-lg">
            {c.title}
          </h2>
          <div className="flex flex-col gap-space-sm font-sans text-body-md leading-relaxed text-on-surface-variant">
            <p>{c.p1}</p>
            <p>{c.p2}</p>
          </div>
          <div className="grid grid-cols-3 gap-space-md pt-space-md">
            {metrics.map((metric) => (
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
              <p className="font-serif text-headline-sm text-primary">{c.cardTitle}</p>
              <p className="font-sans text-body-sm text-charcoal-muted">
                {c.cardBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

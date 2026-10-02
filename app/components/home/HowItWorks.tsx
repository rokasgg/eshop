import { getI18n } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

// Texts live in the dictionaries under home.howItWorks.steps, in this order
const STEP_ICONS = ["touch_app", "request_quote", "mark_email_read"];

export default async function HowItWorks({ lang }: { lang: Locale }) {
  const { t } = await getI18n(lang);
  const c = t.home.howItWorks;
  const steps = c.steps.map((step, i) => ({ ...step, number: i + 1, icon: STEP_ICONS[i] }));
  return (
    <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-space-xl">
        <div className="flex flex-col gap-space-md md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-space-xs">
            <span className="font-sans text-label-sm font-bold uppercase tracking-widest text-secondary">
              {c.eyebrow}
            </span>
            <h2 className="font-serif text-headline-lg-mobile text-primary lg:text-headline-lg">
              {c.title}
            </h2>
          </div>
          <p className="max-w-sm font-sans text-body-md text-on-surface-variant">
            {c.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group flex flex-col gap-space-md overflow-hidden rounded-xl bg-surface p-space-lg shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container font-serif text-headline-sm font-bold text-primary transition-colors group-hover:bg-primary-container group-hover:text-parchment-deep">
                {step.number}
              </div>
              <div className="flex flex-col gap-space-xs">
                <h3 className="font-sans text-title-md text-primary">{step.title}</h3>
                <p className="font-sans text-body-md leading-relaxed text-on-surface-variant">
                  {step.body}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-space-xs pt-space-xs font-sans text-label-sm font-semibold uppercase text-secondary">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">{step.icon}</span>
                <span>{step.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

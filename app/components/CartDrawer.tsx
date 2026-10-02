"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import BoxStepper from "./BoxStepper";
import { formatEur, lineTotal, minOrderShortfall, totalUnits } from "@/lib/cart";
import { useI18n } from "./I18nProvider";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

type Step = "cart" | "form" | "success";

const INPUT =
  "w-full rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2.5 font-sans text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-secondary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 transition";

const BLANK: FormData = { name: "", email: "", phone: "", address: "", notes: "" };

export default function CartDrawer() {
  const { items, removeItem, setBoxQuantity, clearCart, subtotal, totalBoxes, isOpen, closeCart } =
    useCart();
  const { t, plural, f } = useI18n();
  const shortfallInfo = minOrderShortfall(subtotal, totalBoxes);
  const shortfall = !shortfallInfo
    ? null
    : shortfallInfo.kind === "eur"
      ? f(t.cart.minOrderEur, { amount: formatEur(shortfallInfo.amount) })
      : f(t.cart.minOrderBoxes, { boxes: plural(shortfallInfo.boxes, t.common.boxes) });

  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState<FormData>(BLANK);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const field =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const handleClose = () => {
    closeCart();
    // Reset after slide-out animation finishes
    setTimeout(() => {
      setStep("cart");
      setForm(BLANK);
      setErrors({});
      setSubmitError(null);
      setOrderId(null);
    }, 300);
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) errs.name = t.checkout.required;
    if (!form.email.trim()) errs.email = t.checkout.required;
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = t.checkout.invalidEmail;
    if (!form.phone.trim()) errs.phone = t.checkout.required;
    if (!form.address.trim()) errs.address = t.checkout.required;
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: form.name,
          clientContact: `${form.email} / ${form.phone} / ${form.address}${
            form.notes ? ` — ${form.notes}` : ""
          }`,
          items: items.map((i) => ({
            id: i.id,
            sku: i.sku,
            name: i.name,
            boxQuantity: i.boxQuantity,
            unitsPerBox: i.unitsPerBox,
            pricePerBox: i.pricePerBox,
          })),
        }),
      });
      if (!res.ok) throw new Error("Order submission failed");
      const data = await res.json();
      setOrderId(data.orderId);
      clearCart();
      setStep("success");
    } catch {
      setSubmitError(t.checkout.error);
    } finally {
      setSubmitting(false);
    }
  };

  const hasItems = items.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className={`fixed inset-0 z-40 bg-charcoal-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.cart.title}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 px-space-lg py-space-md">
          <h2 className="font-sans text-title-md font-bold text-on-surface">
            {step === "cart" &&
              (hasItems ? f(t.cart.titleWithCount, { boxes: plural(totalBoxes, t.common.boxes) }) : t.cart.title)}
            {step === "form" && t.cart.deliveryTitle}
            {step === "success" && t.cart.confirmedTitle}
          </h2>
          <button
            onClick={handleClose}
            aria-label={t.cart.close}
            className="rounded-lg p-1.5 text-on-surface-variant/60 transition hover:bg-surface-container hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">

          {/* Cart step */}
          {step === "cart" && (
            !hasItems ? (
              <div className="flex flex-col items-center justify-center gap-3 py-28 text-on-surface-variant/50">
                <span className="material-symbols-outlined text-[40px]" aria-hidden="true">shopping_bag</span>
                <p className="font-sans text-body-md">{t.cart.empty}</p>
              </div>
            ) : (
              <ul className="divide-y divide-outline-variant/20 px-space-lg">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-space-md py-space-md">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill sizes="80px" className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary-container" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-space-xs">
                      <div className="flex items-start justify-between gap-space-sm">
                        <p className="font-sans text-body-md font-semibold text-on-surface">{item.name}</p>
                        <p className="shrink-0 font-sans text-body-md font-bold text-on-surface">
                          {formatEur(lineTotal(item))}
                        </p>
                      </div>
                      <p className="font-sans text-body-sm text-on-surface-variant">
                        {plural(item.boxQuantity, t.common.boxes)} × {formatEur(item.pricePerBox)}
                      </p>
                      <p className="font-sans text-label-sm text-on-surface-variant/70">
                        {f(t.cart.lineUnits, { perBox: item.unitsPerBox, total: totalUnits(item) })}
                      </p>
                      <div className="mt-space-xs flex items-center gap-space-md">
                        <BoxStepper
                          value={item.boxQuantity}
                          onChange={(n) => setBoxQuantity(item.id, n)}
                          size="sm"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="font-sans text-label-sm text-on-surface-variant/60 transition hover:text-error"
                        >
                          {t.cart.remove}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}

          {/* Form step */}
          {step === "form" && (
            <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-space-md px-space-lg py-space-lg">
              <Field label={t.checkout.name} required error={errors.name}>
                <input type="text" value={form.name} onChange={field("name")} placeholder={t.checkout.namePlaceholder} className={INPUT} />
              </Field>
              <Field label={t.checkout.email} required error={errors.email}>
                <input type="email" value={form.email} onChange={field("email")} placeholder={t.checkout.emailPlaceholder} className={INPUT} />
              </Field>
              <Field label={t.checkout.phone} required error={errors.phone}>
                <input type="tel" value={form.phone} onChange={field("phone")} placeholder={t.checkout.phonePlaceholder} className={INPUT} />
              </Field>
              <Field label={t.checkout.address} required error={errors.address}>
                <textarea
                  value={form.address}
                  onChange={field("address")}
                  placeholder={t.checkout.addressPlaceholder}
                  rows={3}
                  className={`${INPUT} resize-none`}
                />
              </Field>
              <Field label={t.checkout.notes}>
                <textarea
                  value={form.notes}
                  onChange={field("notes")}
                  placeholder={t.checkout.notesPlaceholder}
                  rows={2}
                  className={`${INPUT} resize-none`}
                />
              </Field>

              {/* Inline order summary */}
              <div className="rounded-xl bg-surface-container-low px-space-md py-space-md font-sans text-body-md">
                <p className="mb-space-sm font-semibold text-on-surface">{t.checkout.summary}</p>
                <ul className="space-y-1.5">
                  {items.map((i) => (
                    <li key={i.id} className="flex justify-between text-on-surface-variant">
                      <span>
                        {i.name}{" "}
                        <span className="text-on-surface-variant/60">
                          × {plural(i.boxQuantity, t.common.boxes)} {f(t.checkout.summaryUnits, { n: totalUnits(i) })}
                        </span>
                      </span>
                      <span className="shrink-0">{formatEur(lineTotal(i))}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-space-sm flex justify-between border-t border-outline-variant/30 pt-space-sm font-bold text-on-surface">
                  <span>{t.checkout.total}</span>
                  <span>{formatEur(subtotal)}</span>
                </div>
              </div>

              {submitError && (
                <p className="font-sans text-body-sm text-error">{submitError}</p>
              )}
            </form>
          )}

          {/* Success step */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center gap-space-md px-10 py-28 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-fixed">
                <span className="material-symbols-outlined text-[32px] text-on-tertiary-fixed" aria-hidden="true">check_circle</span>
              </div>
              <h3 className="font-serif text-headline-sm text-on-surface">{t.checkout.successTitle}</h3>
              <p className="max-w-xs font-sans text-body-md text-on-surface-variant">
                {f(t.checkout.successThanks, { name: form.name ? `, ${form.name.split(" ")[0]}` : "" })}
              </p>
              {orderId && (
                <p className="rounded-full bg-surface-container px-4 py-1.5 font-mono text-label-sm text-on-surface-variant">
                  {f(t.checkout.orderId, { id: orderId })}
                </p>
              )}
              <button
                onClick={handleClose}
                className="mt-space-sm rounded-lg bg-primary-container px-6 py-2.5 font-sans text-label-lg font-semibold uppercase tracking-wider text-parchment-deep transition hover:bg-racing-green-dark"
              >
                {t.checkout.continueShopping}
              </button>
            </div>
          )}
        </div>

        {/* ── Footer actions ── */}
        {(step === "cart" || step === "form") && hasItems && (
          <div className="space-y-space-sm border-t border-outline-variant/30 px-space-lg py-space-md">
            {step === "cart" && (
              <div className="flex items-center justify-between">
                <span className="font-sans text-body-md text-on-surface-variant">{t.cart.subtotal}</span>
                <span className="font-serif text-headline-sm font-bold text-on-surface">
                  {formatEur(subtotal)}
                </span>
              </div>
            )}
            {step === "cart" && shortfall && (
              <p className="font-sans text-body-sm text-on-surface-variant">{shortfall}</p>
            )}
            <div className="flex gap-space-sm">
              {step === "form" && (
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="flex-1 rounded-lg border border-outline-variant py-3 font-sans text-body-md font-semibold text-on-surface transition hover:bg-surface-container"
                >
                  {t.cart.back}
                </button>
              )}
              <button
                type={step === "form" ? "submit" : "button"}
                form={step === "form" ? "checkout-form" : undefined}
                onClick={step === "cart" ? () => setStep("form") : undefined}
                disabled={step === "form" ? submitting : !!shortfall}
                className="flex-1 rounded-lg bg-primary-container py-3 font-sans text-label-lg font-semibold uppercase tracking-wider text-parchment-deep transition hover:bg-racing-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {step === "cart" ? t.cart.continue : submitting ? t.cart.submitting : t.cart.submit}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-sans text-label-sm uppercase tracking-wider text-on-surface-variant">
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 font-sans text-label-sm text-error">{error}</p>}
    </div>
  );
}

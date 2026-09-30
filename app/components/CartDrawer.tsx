"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

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
  const { items, removeItem, updateQty, clearCart, subtotal, isOpen, closeCart } =
    useCart();

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
    if (!form.name.trim()) errs.name = "Privaloma";
    if (!form.email.trim()) errs.email = "Privaloma";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Neteisingas el. paštas";
    if (!form.phone.trim()) errs.phone = "Privaloma";
    if (!form.address.trim()) errs.address = "Privaloma";
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
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            sku: i.sku,
          })),
        }),
      });
      if (!res.ok) throw new Error("Order submission failed");
      const data = await res.json();
      setOrderId(data.orderId);
      clearCart();
      setStep("success");
    } catch {
      setSubmitError("Įvyko klaida. Bandykite dar kartą.");
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
        aria-label="Krepšelis"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 px-space-lg py-space-md">
          <h2 className="font-sans text-title-md font-bold text-on-surface">
            {step === "cart" && `Krepšelis${hasItems ? ` (${items.length})` : ""}`}
            {step === "form" && "Pristatymo Duomenys"}
            {step === "success" && "Užsakymas Patvirtintas"}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Uždaryti"
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
                <p className="font-sans text-body-md">Jūsų krepšelis tuščias</p>
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
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="truncate font-sans text-body-md font-semibold text-on-surface">{item.name}</p>
                      <p className="font-sans text-label-sm text-on-surface-variant/60">
                        €{item.price.toFixed(2)} / vnt.
                        {item.moq && item.moq > 1 ? ` · MOQ ${item.moq}` : ""}
                      </p>
                      <div className="mt-auto flex items-center gap-space-sm">
                        <div className="flex items-center rounded-lg border border-outline-variant">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - (item.moq || 1))}
                            className="px-2.5 py-1 font-sans text-body-md text-on-surface-variant transition hover:text-on-surface"
                          >
                            −
                          </button>
                          <span className="min-w-[1.5rem] text-center font-sans text-body-md font-medium text-on-surface">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + (item.moq || 1))}
                            className="px-2.5 py-1 font-sans text-body-md text-on-surface-variant transition hover:text-on-surface"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="font-sans text-label-sm text-on-surface-variant/60 transition hover:text-error"
                        >
                          Pašalinti
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 font-sans text-body-md font-bold text-on-surface">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            )
          )}

          {/* Form step */}
          {step === "form" && (
            <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-space-md px-space-lg py-space-lg">
              <Field label="Vardas, Pavardė" required error={errors.name}>
                <input type="text" value={form.name} onChange={field("name")} placeholder="Jonas Petraitis" className={INPUT} />
              </Field>
              <Field label="El. paštas" required error={errors.email}>
                <input type="email" value={form.email} onChange={field("email")} placeholder="jonas@imone.lt" className={INPUT} />
              </Field>
              <Field label="Telefonas" required error={errors.phone}>
                <input type="tel" value={form.phone} onChange={field("phone")} placeholder="+370 600 00000" className={INPUT} />
              </Field>
              <Field label="Pristatymo Adresas" required error={errors.address}>
                <textarea
                  value={form.address}
                  onChange={field("address")}
                  placeholder="Gatvė, miestas, pašto kodas"
                  rows={3}
                  className={`${INPUT} resize-none`}
                />
              </Field>
              <Field label="Pastabos (nebūtina)">
                <textarea
                  value={form.notes}
                  onChange={field("notes")}
                  placeholder="Papildomi pageidavimai?"
                  rows={2}
                  className={`${INPUT} resize-none`}
                />
              </Field>

              {/* Inline order summary */}
              <div className="rounded-xl bg-surface-container-low px-space-md py-space-md font-sans text-body-md">
                <p className="mb-space-sm font-semibold text-on-surface">Užsakymo Santrauka</p>
                <ul className="space-y-1.5">
                  {items.map((i) => (
                    <li key={i.id} className="flex justify-between text-on-surface-variant">
                      <span>
                        {i.name} <span className="text-on-surface-variant/60">× {i.quantity}</span>
                      </span>
                      <span>€{(i.price * i.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-space-sm flex justify-between border-t border-outline-variant/30 pt-space-sm font-bold text-on-surface">
                  <span>Viso</span>
                  <span>€{subtotal.toFixed(2)}</span>
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
              <h3 className="font-serif text-headline-sm text-on-surface">Užsakymas pateiktas!</h3>
              <p className="max-w-xs font-sans text-body-md text-on-surface-variant">
                Ačiū{form.name ? `, ${form.name.split(" ")[0]}` : ""}! Netrukus susisieksime dėl pristatymo patvirtinimo.
              </p>
              {orderId && (
                <p className="rounded-full bg-surface-container px-4 py-1.5 font-mono text-label-sm text-on-surface-variant">
                  Užsakymo ID: {orderId}
                </p>
              )}
              <button
                onClick={handleClose}
                className="mt-space-sm rounded-lg bg-primary-container px-6 py-2.5 font-sans text-label-lg font-semibold uppercase tracking-wider text-parchment-deep transition hover:bg-racing-green-dark"
              >
                Tęsti Apsipirkimą
              </button>
            </div>
          )}
        </div>

        {/* ── Footer actions ── */}
        {(step === "cart" || step === "form") && hasItems && (
          <div className="space-y-space-sm border-t border-outline-variant/30 px-space-lg py-space-md">
            {step === "cart" && (
              <div className="flex items-center justify-between">
                <span className="font-sans text-body-md text-on-surface-variant">Tarpinė suma</span>
                <span className="font-serif text-headline-sm font-bold text-on-surface">
                  €{subtotal.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex gap-space-sm">
              {step === "form" && (
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="flex-1 rounded-lg border border-outline-variant py-3 font-sans text-body-md font-semibold text-on-surface transition hover:bg-surface-container"
                >
                  ← Atgal
                </button>
              )}
              <button
                type={step === "form" ? "submit" : "button"}
                form={step === "form" ? "checkout-form" : undefined}
                onClick={step === "cart" ? () => setStep("form") : undefined}
                disabled={step === "form" && submitting}
                className="flex-1 rounded-lg bg-primary-container py-3 font-sans text-label-lg font-semibold uppercase tracking-wider text-parchment-deep transition hover:bg-racing-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {step === "cart"
                  ? "Tęsti Užsakymą →"
                  : submitting
                  ? "Pateikiama…"
                  : "Pateikti Užsakymą"}
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

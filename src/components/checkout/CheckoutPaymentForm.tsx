"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/money";
import { NIGERIAN_STATES } from "@/lib/nigeria";
import { getDeliveryQuote, placeOrder } from "@/app/checkout/actions";
import { PENDING_CHECKOUT_ORDER_KEY } from "@/lib/checkout-session";

type Details = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  deliveryInstructions: string;
};

export function CheckoutPaymentForm({ paymentNotConfirmed = false }: { paymentNotConfirmed?: boolean }) {
  const { items, subtotal, itemCount, hydrated } = useCart();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(
    paymentNotConfirmed ? "Payment was not confirmed. Your items are saved; please try again." : null
  );
  const [redirecting, setRedirecting] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [quotePending, setQuotePending] = useState(false);
  const quoteRequest = useRef(0);
  const [form, setForm] = useState<Details>({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    deliveryInstructions: "",
  });

  function handleChange(field: keyof Details) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((previous) => ({ ...previous, [field]: event.target.value }));
    };
  }

  function handleStateChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const state = event.target.value;
    setForm((previous) => ({ ...previous, state }));
    setDeliveryFee(null);
    setQuotePending(true);
    setError(null);
    const request = ++quoteRequest.current;
    void getDeliveryQuote(state).then((quote) => {
      if (request !== quoteRequest.current) return;
      setQuotePending(false);
      if (quote.success) setDeliveryFee(quote.fee);
      else setError(quote.error);
    }).catch(() => {
      if (request !== quoteRequest.current) return;
      setQuotePending(false);
      setError("Delivery pricing is temporarily unavailable. Please select your state again.");
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || items.length === 0 || deliveryFee === null || quotePending || isPending || redirecting) return;

    setError(null);
    setPaymentUrl(null);
    startTransition(async () => {
      try {
        const result = await placeOrder({
          ...form,
          state: form.state as (typeof NIGERIAN_STATES)[number],
          items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        });
        if (!result.success) {
          setError(result.error);
          return;
        }

        // The bag is cleared only after a verified paid order is displayed.
        try {
          window.sessionStorage.setItem(PENDING_CHECKOUT_ORDER_KEY, result.orderNumber);
        } catch {
          // Paystack can still open when tab storage is unavailable.
        }
        setPaymentUrl(result.redirectUrl);
        setRedirecting(true);
        window.location.assign(result.redirectUrl);
      } catch {
        setRedirecting(false);
        setError("We could not open payment. Your items are saved; please try again.");
      }
    });
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="container-brand py-20 text-center sm:py-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-emerald">Checkout</p>
        <h1 className="font-display text-5xl text-brand-black sm:text-6xl">Your bag is empty</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-brand-black/60">Add something you love before starting checkout.</p>
        <Link href="/shop" className="button-primary mt-8">Explore the collection</Link>
      </div>
    );
  }

  return (
    <div className="container-brand py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/cart" prefetch={false} className="text-sm font-medium text-brand-emerald underline underline-offset-4 hover:text-brand-black">
            ← Back to bag
          </Link>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-emerald">Secure checkout</span>
        </div>

        <div className="mb-10 border-b border-brand-sand pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-emerald">02 / 03 · Delivery</p>
          <h1 className="font-display max-w-3xl text-5xl leading-none tracking-[-0.04em] text-brand-black sm:text-6xl">
            Where should we deliver?
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-brand-black/60">
            Tell us where to send your order. You will continue to Paystack only after these details are complete.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,23rem)] lg:gap-10">
          <div className="min-w-0 space-y-6">
            <section className="border border-brand-sand bg-brand-white p-6 sm:p-8" aria-labelledby="contact-heading">
              <div className="mb-6 flex items-baseline gap-3 border-b border-brand-sand pb-5">
                <span className="text-xs font-semibold text-brand-earth">01</span>
                <h2 id="contact-heading" className="font-display text-3xl text-brand-black">Contact information</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" required className="sm:col-span-2">
                  <input name="customerName" value={form.customerName} onChange={handleChange("customerName")} autoComplete="name" required minLength={2} className="input min-h-12 w-full" placeholder="Name for the delivery" />
                </Field>
                <Field label="Email address" required>
                  <input name="email" type="email" value={form.email} onChange={handleChange("email")} autoComplete="email" required className="input min-h-12 w-full" placeholder="you@example.com" />
                </Field>
                <Field label="Phone number" required>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange("phone")} autoComplete="tel" required minLength={7} className="input min-h-12 w-full" placeholder="0800 000 0000" />
                </Field>
              </div>
              <p className="mt-4 text-xs text-brand-black/50">Your email is used for the payment receipt and order updates.</p>
            </section>

            <section className="border border-brand-sand bg-brand-white p-6 sm:p-8" aria-labelledby="delivery-heading">
              <div className="mb-6 flex items-baseline gap-3 border-b border-brand-sand pb-5">
                <span className="text-xs font-semibold text-brand-earth">02</span>
                <h2 id="delivery-heading" className="font-display text-3xl text-brand-black">Delivery address</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Street address" required className="sm:col-span-2">
                  <input name="address" value={form.address} onChange={handleChange("address")} autoComplete="street-address" required minLength={5} className="input min-h-12 w-full" placeholder="House number and street" />
                </Field>
                <Field label="State" required>
                  <select name="state" value={form.state} onChange={handleStateChange} autoComplete="address-level1" required className="input min-h-12 w-full">
                    <option value="" disabled>Select your state</option>
                    {NIGERIAN_STATES.map((state) => <option key={state} value={state}>{state}</option>)}
                  </select>
                </Field>
                <Field label="City / town" required>
                  <input name="city" value={form.city} onChange={handleChange("city")} autoComplete="address-level2" required minLength={2} className="input min-h-12 w-full" placeholder="Your city or town" />
                </Field>
                <Field label="Delivery note" hint="Optional" className="sm:col-span-2">
                  <textarea name="deliveryInstructions" value={form.deliveryInstructions} onChange={handleChange("deliveryInstructions")} rows={3} className="input w-full resize-y" placeholder="Landmark or helpful directions" />
                </Field>
              </div>
            </section>

            <div className="flex items-start gap-4 border border-brand-sand bg-brand-cream p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-sm text-white" aria-hidden="true">✓</span>
              <div>
                <h2 className="text-sm font-semibold text-brand-black">Secure payment is next</h2>
                <p className="mt-1 text-xs leading-5 text-brand-black/60">After you submit, Paystack opens for payment. Your bag stays saved until payment is verified.</p>
              </div>
            </div>
          </div>

          <aside className="border border-brand-sand bg-brand-white p-6 sm:p-7 lg:sticky lg:top-32" aria-label="Order summary">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-3xl text-brand-black">Order summary</h2>
              {hydrated && <span className="text-xs text-brand-black/50">{itemCount} {itemCount === 1 ? "item" : "items"}</span>}
            </div>
            <ul className="mt-5 divide-y divide-brand-sand border-y border-brand-sand text-sm">
              {hydrated ? items.map((item) => (
                <li key={item.productId} className="flex justify-between gap-5 py-3 text-brand-black/70">
                  <span className="min-w-0">{item.name} <span className="text-brand-black/45">× {item.quantity}</span></span>
                  <span className="shrink-0">{formatNaira(item.price * item.quantity)}</span>
                </li>
              )) : (
                <li className="space-y-3 py-5" aria-hidden="true">
                  <div className="h-3 w-3/4 animate-pulse bg-brand-sand/40" />
                  <div className="h-3 w-1/2 animate-pulse bg-brand-sand/40" />
                </li>
              )}
            </ul>
            <dl className="space-y-3 pt-5 text-sm">
              <div className="flex justify-between gap-3 text-brand-black/65"><dt>Subtotal</dt><dd>{hydrated ? formatNaira(subtotal) : "—"}</dd></div>
              <div className="flex justify-between gap-3 text-brand-black/65"><dt>Delivery</dt><dd>{quotePending ? "Calculating…" : deliveryFee !== null ? formatNaira(deliveryFee) : "Select a state"}</dd></div>
              <div className="flex justify-between gap-3 border-t border-brand-sand pt-4 font-semibold text-brand-black"><dt>Total to pay</dt><dd>{hydrated && deliveryFee !== null ? formatNaira(subtotal + deliveryFee) : "—"}</dd></div>
            </dl>
            <p className="mt-3 text-xs leading-5 text-brand-black/50">Select your state to see your exact total before payment.</p>

            {error && <p className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
            {paymentUrl && (
              <p className="mt-5 text-sm leading-6 text-brand-black/70" role="status">
                Opening payment. If it does not open, <a href={paymentUrl} className="font-semibold text-brand-emerald underline underline-offset-4">continue here</a>.
              </p>
            )}
            <button type="submit" disabled={!hydrated || deliveryFee === null || quotePending || isPending || redirecting} className="button-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50">
              {redirecting ? "Opening Paystack…" : isPending ? "Preparing payment…" : "Continue to Paystack"}
              {!isPending && !redirecting && <span aria-hidden="true">→</span>}
            </button>
            <p className="mt-3 text-center text-xs text-brand-black/50">Payment is completed securely on Paystack.</p>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, hint, className, children }: {
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex min-w-0 flex-col gap-2 text-sm ${className ?? ""}`}>
      <span className="font-medium text-brand-black">{label} {required ? <span className="text-brand-earth">*</span> : hint && <span className="font-normal text-brand-black/45">({hint})</span>}</span>
      {children}
    </label>
  );
}

"use client";

import { useState, useTransition } from "react";
import { submitContactMessage } from "@/app/contact/actions";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await submitContactMessage(form);
      setStatus(result.success ? "success" : "error");
      if (result.success) {
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    });
  }

  if (status === "success") {
    return (
      <p className="rounded-xl bg-brand-emerald/10 p-4 text-sm text-brand-emerald">
        Thank you for reaching out. Our team will get back to you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="input"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="input"
        />
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="input"
        />
      </div>
      <textarea
        required
        placeholder="Your message"
        rows={5}
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        className="input resize-none"
      />
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-full bg-brand-gold px-7 py-3 text-sm font-semibold uppercase tracking-wide text-brand-black hover:bg-brand-gold-light disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

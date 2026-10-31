"use client";

import { useState, useTransition } from "react";
import { submitContactMessage } from "@/app/contact/actions";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const result = await submitContactMessage({
        name: "Newsletter subscriber",
        email,
        subject: "Newsletter signup",
        message: "Please add this email address to the Euckays newsletter.",
      });
      setStatus(result.success ? "done" : "error");
      if (result.success) setEmail("");
    });
  }

  if (status === "done") {
    return <p className="text-sm text-white/80">Thank you. You are on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="min-w-0 flex-1 border border-white/25 bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/45 focus:border-white/70"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-white px-9 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-brand-emerald transition hover:bg-brand-lime disabled:opacity-60"
      >
        {pending ? "Sending" : "Subscribe"}
      </button>
      {status === "error" && <p className="text-xs text-white/70 sm:basis-full">Something went wrong. Please try again.</p>}
    </form>
  );
}

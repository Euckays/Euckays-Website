"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "./actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await adminLogin(form);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.replace("/admin");
      router.refresh();
    });
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-brand-cream px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-brand-sand bg-brand-white p-8"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-brand-emerald">Euckays Admin</p>
        <h1 className="font-display mt-2 text-2xl text-brand-black">Sign In</h1>

        <div className="mt-6 flex flex-col gap-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="input"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="input"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brand-black hover:bg-brand-gold-light disabled:opacity-50"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

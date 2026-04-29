"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function StepTwo() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = phone.replace(/[^0-9]/g, "");

    if (normalized.length < 10) {
      setError("Please enter a valid phone number with at least 10 digits.");
      return;
    }

    setError("");
    router.push("/club");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-xl shadow-slate-200/80 backdrop-blur sm:p-12">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Almost there</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            You are so close! 🥳
          </h1>
          <p className="text-slate-600">This is the last step!</p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              type="tel"
              placeholder="(123) 456-7890"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-200"
          >
            Sign up and finish
          </button>
        </form>
      </section>
    </main>
  );
}

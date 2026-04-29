"use client";

import { FormEvent } from "react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
};

type Step1Props = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function Step1({ formData, updateFormData, error, onSubmit }: Step1Props) {
  return (
    <>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">First step</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Welcome to Ersa Nails! 💅
        </h1>
        <p className="text-slate-600">
          Sign up to get more insider sale exclusive sneak peek and enjoy 15% off your first order!
        </p>
      </div>

      <form className="mt-10 space-y-6" onSubmit={onSubmit} noValidate>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="fullName">
            Full name
          </label>
          <input
            id="fullName"
            value={formData.fullName}
            onChange={(event) => updateFormData("fullName", event.target.value)}
            type="text"
            placeholder="Jane Doe"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            value={formData.email}
            onChange={(event) => updateFormData("email", event.target.value)}
            type="email"
            placeholder="jane@example.com"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-sky-700 focus-visible:ring-4 focus-visible:ring-sky-200"
        >
          Sign up and continue
        </button>
      </form>
    </>
  );
}
"use client";

import { FormEvent } from "react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
};

type Step2Props = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function Step2({ formData, updateFormData, error, onSubmit }: Step2Props) {
  return (
    <>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Almost there</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          You are so close! 🥳
        </h1>
        <p className="text-slate-600">This is the last step!</p>
      </div>

      <form className="mt-10 space-y-6" onSubmit={onSubmit} noValidate>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            value={formData.phone}
            onChange={(event) => updateFormData("phone", event.target.value)}
            type="tel"
            placeholder="(123) 456-7890"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-200"
        >
          Sign up and finish
        </button>
      </form>
    </>
  );
}
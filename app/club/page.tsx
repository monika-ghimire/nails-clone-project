"use client";

import { useEffect, useState } from "react";

export default function ClubPage() {
  const [couponCode, setCouponCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setCouponCode(`ERSACODE-${randomDigits}`);
  }, []);

  const copyToClipboard = async () => {
    if (!couponCode) return;
    await navigator.clipboard.writeText(couponCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-xl shadow-slate-200/80 backdrop-blur sm:p-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Welcome to the club!
          </h1>
          <p className="text-slate-600">We've been expecting you. 💌</p>
          <p className="text-slate-700">
            Use the coupon code below to get 15% off your first order.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="couponCode">
            Your coupon code
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="couponCode"
              readOnly
              value={couponCode}
              className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus-visible:ring-4 focus-visible:ring-sky-200"
            >
              {copied ? "Copied!" : "Copy code"}
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Use this code at checkout to apply your 15% discount.
          </p>
        </div>
      </section>
    </main>
  );
}

"use client";

import { FormEvent, useState } from "react";
import Step1 from "./page/step1";
import Step2 from "./page/step2";
import Step3 from "./page/step3";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [couponCode] = useState(() => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `ERSACODE-${randomDigits}`;
  });
  const [copied, setCopied] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStep1Submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameValue = formData.fullName.trim();
    const emailValue = formData.email.trim();

    if (nameValue.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setCurrentStep(2);
  };

  const handleStep2Submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = formData.phone.replace(/[^0-9]/g, "");

    if (normalized.length < 10) {
      setError("Please enter a valid phone number with at least 10 digits.");
      return;
    }

    setError("");
    setCurrentStep(3);
  };

  const copyToClipboard = async () => {
    if (!couponCode) return;
    await navigator.clipboard.writeText(couponCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-xl shadow-slate-200/80 backdrop-blur sm:p-12">
        {currentStep === 1 && (
          <Step1
            formData={formData}
            updateFormData={updateFormData}
            error={error}
            onSubmit={handleStep1Submit}
          />
        )}

        {currentStep === 2 && (
          <Step2
            formData={formData}
            updateFormData={updateFormData}
            error={error}
            onSubmit={handleStep2Submit}
          />
        )}

        {currentStep === 3 && (
          <Step3
            couponCode={couponCode}
            copied={copied}
            onCopy={copyToClipboard}
          />
        )}
      </section>
    </main>
  );
}

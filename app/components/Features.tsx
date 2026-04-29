"use client";

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
          Why Choose{" "}
          <span className="text-pink-500">Ersa Nails?</span>
        </h2>

        <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
          Simple, elegant, and trusted products made for everyday beauty.
        </p>

        {/* simple divider */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-16 bg-pink-400 rounded-full"></div>
        </div>

      </div>
    </section>
  );
}
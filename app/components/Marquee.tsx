"use client";

export default function Marquee() {
  const items = [
    "✨ 100% Trusted by 1000+ Clients",
    "💰 Up to 25% Discount",
    "🚚 Free Shipping Over $50",
    "⭐ Premium Quality",
    "🎁 Member Rewards",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 text-white py-3">
      
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent " />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent " />

      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-6 text-sm sm:text-base font-medium text-slate-200 tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
}
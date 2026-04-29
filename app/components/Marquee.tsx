"use client";

export default function Marquee() {
  const items = [
    "✨ 100% Trusted by 1000+ Clients",
    "💰 Up to 25% Discount on Premium Products",
    "🚚 Fast & Free Shipping on Orders Above $50",
    "⭐ Premium Quality Guaranteed",
    "🎁 Exclusive Member Rewards",
  ];

  return (
    <div className="w-full bg-linear-to-r from-sky-600 to-sky-500 text-white overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="text-sm sm:text-base font-semibold px-8 py-2 shrink-0">
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

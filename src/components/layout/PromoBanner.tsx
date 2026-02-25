const items = [
  "🖼️ BUY 3 GET THE 4TH FREE — Code: BUY3GET1",
  "🚚 FREE SHIPPING OVER $75",
  "🇺🇸 HAND-MADE IN USA",
  "↩️ 30-DAY RETURNS",
  "⭐ 10,000+ HAPPY CUSTOMERS",
];

const PromoBanner = () => (
  <div className="bg-charcoal py-2.5 overflow-hidden">
    <div className="animate-marquee flex whitespace-nowrap">
      {[...items, ...items, ...items, ...items].map((text, i) => (
        <span
          key={i}
          className="mx-8 text-xs font-body tracking-wider text-gold"
        >
          {text}
        </span>
      ))}
    </div>
  </div>
);

export default PromoBanner;

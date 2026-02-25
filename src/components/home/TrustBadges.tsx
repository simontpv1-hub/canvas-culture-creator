import { Paintbrush, RotateCcw, Star, Truck } from "lucide-react";

const badges = [
  { icon: Paintbrush, label: "Hand-Made in USA" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: Star, label: "10,000+ Happy Customers" },
  { icon: Truck, label: "Always Free Shipping" },
];

const TrustBadges = () => (
  <div className="border-y border-border bg-light-cream">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center justify-center gap-3">
            <b.icon className="w-5 h-5 text-gold flex-shrink-0" />
            <span className="text-xs sm:text-sm font-body font-medium text-foreground tracking-wide">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TrustBadges;

import { Paintbrush, RotateCcw, Star, Truck } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: Paintbrush, label: "Hand-Made in the USA", sub: "Every canvas crafted with care" },
  { icon: RotateCcw, label: "30-Day Returns", sub: "Not happy? We'll make it right" },
  { icon: Star, label: "10,000+ Happy Customers", sub: "See what they're saying" },
  { icon: Truck, label: "Always Free Shipping", sub: "No minimums, no surprises" },
];

const TrustBadges = () => (
  <div className="border-y border-border bg-off-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <b.icon className="w-6 h-6 text-gold" />
            <span className="text-sm font-body font-semibold text-foreground tracking-wide">
              {b.label}
            </span>
            <span className="text-xs font-body text-muted-foreground">
              {b.sub}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default TrustBadges;

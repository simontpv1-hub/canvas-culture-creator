import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import heroImage1 from "@/assets/hero-1.jpg";

const stats = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 500, suffix: "+", label: "Curated Prints" },
  { value: 30, suffix: " Days", label: "Return Guarantee" },
  { value: 4.9, suffix: "/5", label: "Average Rating", isDecimal: true },
];

const CountUp = ({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
      {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
};

const BrandStory = () => (
  <section className="bg-off-white py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground leading-tight mb-8">
            We believe blank walls are missed opportunities.
          </h2>
          <div className="space-y-5 text-base sm:text-[17px] font-body text-muted-foreground leading-relaxed">
            <p>
              Canvas Culture was born from a simple idea: your home should tell your story. Every room is a chance to surround yourself with art that moves you — whether that's a vintage Porsche in your man cave, a sacred image above your fireplace, or something that just makes you laugh every morning.
            </p>
            <p>
              We obsess over print quality so you don't have to. Every canvas is hand-stretched over solid pine bars, printed with archival inks that won't fade, and ready to hang the moment it arrives at your door.
            </p>
            <p className="font-semibold text-foreground">
              Made in the USA. Built to last. Chosen with intention.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <img
            src={heroImage1}
            alt="Canvas art in a beautiful living room"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <CountUp target={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
            <p className="text-sm font-body text-muted-foreground mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BrandStory;

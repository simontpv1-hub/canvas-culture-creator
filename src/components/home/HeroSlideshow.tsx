import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage1 from "@/assets/hero-1.jpg";
import heroImage2 from "@/assets/hero-2.jpg";

const slides = [
  { image: heroImage1 },
  { image: heroImage2 },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden grain-overlay">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="Canvas Culture hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/15" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-body tracking-[0.3em] uppercase text-background/80 mb-6"
          >
            — Canvas Culture —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold text-background leading-[1.1] mb-6"
          >
            Art That Belongs
            <br />
            On Your Walls.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg font-body text-background/85 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Museum-quality canvas prints. Curated for real homes.
            <br className="hidden sm:block" />
            Hand-made in the USA. Free shipping. 30-day guarantee.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/collections/all"
              className="inline-block bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold text-sm uppercase tracking-[0.2em] px-12 py-4 transition-all hover:shadow-lg"
            >
              Shop All Prints
            </Link>
            <Link
              to="/collections/best-sellers"
              className="inline-block border border-background/60 text-background hover:bg-background/10 font-body font-semibold text-sm uppercase tracking-[0.2em] px-12 py-4 transition-all"
            >
              Explore Collections
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-background/60" />
      </motion.div>

      {/* Slide dots */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-gold w-6" : "bg-background/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;

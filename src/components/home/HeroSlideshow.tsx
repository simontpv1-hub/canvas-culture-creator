import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage1 from "@/assets/hero-1.jpg";
import heroImage2 from "@/assets/hero-2.jpg";

const slides = [{ image: heroImage1 }, { image: heroImage2 }];

const headline = "Art That Belongs On Your Walls.";
const words = headline.split(" ");

const ShimmerButton = ({ children, to, variant }: { children: React.ReactNode; to: string; variant: "filled" | "ghost" }) => (
  <Link
    to={to}
    className={`relative inline-block overflow-hidden font-body font-semibold text-sm uppercase tracking-[0.2em] px-12 py-4 transition-all hover:shadow-lg ${
      variant === "filled"
        ? "bg-gold hover:bg-gold-hover text-primary-foreground"
        : "border border-background/60 text-background hover:bg-background/10"
    }`}
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 shimmer-sweep" />
  </Link>
);

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 320]);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  // Typing cursor blink that hides after headline starts
  useEffect(() => {
    const t = setTimeout(() => setShowCursor(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden grain-overlay">
      {/* Background with parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ y: imgY }}
        >
          <img
            src={slides[current].image}
            alt="Canvas Culture hero"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-foreground/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
        <div className="max-w-3xl">
          {/* Pre-headline with cursor blink */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-body tracking-[0.3em] uppercase text-background/80 mb-6"
          >
            — Canvas Culture —
            {showCursor && <span className="inline-block w-px h-4 ml-1 bg-gold animate-pulse align-middle" />}
          </motion.p>

          {/* Word-by-word headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold text-background leading-[1.1] mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.07, ease: "easeOut" }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-base sm:text-lg font-body text-background/85 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Museum-quality canvas prints. Curated for real homes.
            <br className="hidden sm:block" />
            Hand-made in the USA. Free shipping. 30-day guarantee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <ShimmerButton to="/collections/all" variant="filled">Shop All Prints</ShimmerButton>
            <ShimmerButton to="/collections/best-sellers" variant="ghost">Explore Collections</ShimmerButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
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

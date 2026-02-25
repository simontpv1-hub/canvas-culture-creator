import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage1 from "@/assets/hero-1.jpg";
import heroImage2 from "@/assets/hero-2.jpg";

const slides = [
  {
    image: heroImage1,
    headline: "Art That Transforms Your Space",
    subtitle: "Hand-made premium canvas prints, crafted in the USA",
    cta: "Shop Now",
    link: "/collections/all",
  },
  {
    image: heroImage2,
    headline: "New Coastal Collection",
    subtitle: "Bring the serenity of the ocean into your home",
    cta: "Explore Collection",
    link: "/collections/beach-coastal",
  },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-background leading-tight mb-4">
            {slide.headline}
          </h2>
          <p className="text-base sm:text-lg font-body text-background/90 mb-8">
            {slide.subtitle}
          </p>
          <Link
            to={slide.link}
            className="inline-block bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold text-sm uppercase tracking-widest px-10 py-4 transition-colors"
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/20 hover:bg-background/40 text-background transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/20 hover:bg-background/40 text-background transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-gold" : "bg-background/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;

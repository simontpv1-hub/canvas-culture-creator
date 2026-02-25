import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage2 from "@/assets/hero-2.jpg";

const CustomCanvasCTA = () => (
  <section className="bg-charcoal">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="aspect-[4/3] lg:aspect-auto overflow-hidden"
      >
        <img
          src={heroImage2}
          alt="Custom canvas print"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20"
      >
        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-background leading-tight mb-6">
          Create Your Own Custom Canvas Print
        </h2>
        <p className="text-base font-body text-warm-gray leading-relaxed mb-6">
          Whether it's a family photo, a beloved pet, a special memory — we print it on museum-quality canvas.
        </p>
        <div className="space-y-2 text-sm font-body text-warm-gray mb-8">
          <p>Sizes from 12×16" up to 48×48"</p>
          <p>Portrait · Landscape · Square · Panoramic</p>
        </div>
        <Link
          to="/custom"
          className="inline-block self-start bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold text-sm uppercase tracking-[0.2em] px-10 py-4 transition-all hover:shadow-lg"
        >
          Create My Canvas →
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CustomCanvasCTA;

import { Link } from "react-router-dom";
import { featuredCollections } from "@/data/products";
import { motion } from "framer-motion";

const FeaturedCollections = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
        Featured Collections
      </h2>
      <p className="mt-3 text-muted-foreground font-body">
        Explore our most popular curated collections
      </p>
    </motion.div>

    {/* Asymmetric masonry grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[280px]">
      {featuredCollections.map((col, i) => {
        // Vary tile sizes for visual interest
        const isLarge = i === 0 || i === 3 || i === 7;
        const isTall = i === 1 || i === 5;

        return (
          <motion.div
            key={col.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`${isLarge ? "md:col-span-2 md:row-span-2" : ""} ${isTall ? "row-span-2" : ""}`}
          >
            <Link
              to={`/collections/${col.slug}`}
              className="group relative block w-full h-full overflow-hidden"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-transparent group-hover:from-foreground/60 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-display font-semibold text-background">
                  {col.title}
                </h3>
                <span className="inline-block mt-1 text-xs font-body text-background/0 group-hover:text-gold transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Explore →
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default FeaturedCollections;

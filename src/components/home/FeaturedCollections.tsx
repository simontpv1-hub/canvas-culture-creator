import { Link } from "react-router-dom";
import { useShopifyCollections } from "@/hooks/useShopifyProducts";
import { motion } from "framer-motion";

const FeaturedCollections = () => {
  const { data: collections = [], isLoading } = useShopifyCollections();

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">Featured Collections</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[240px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-secondary animate-pulse rounded" />
          ))}
        </div>
      </section>
    );
  }

  const displayed = collections.slice(0, 10);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
          Featured Collections
        </h2>
        <p className="mt-3 text-muted-foreground font-body">
          Explore our most popular curated collections
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[280px]">
        {displayed.map((col, i) => {
          const isLarge = i === 0 || i === 3 || i === 7;
          const isTall = i === 1 || i === 5;

          return (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
              className={`${isLarge ? "md:col-span-2 md:row-span-2" : ""} ${isTall ? "row-span-2" : ""}`}
            >
              <Link
                to={`/collections/${col.slug}`}
                className="group relative block w-full h-full overflow-hidden collection-tile"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent group-hover:from-foreground/70 transition-all duration-500" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-display font-semibold text-background transition-transform duration-300 group-hover:-translate-y-1.5">
                    {col.title}
                  </h3>
                  <span className="inline-block mt-1 text-xs font-body text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100">
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
};

export default FeaturedCollections;

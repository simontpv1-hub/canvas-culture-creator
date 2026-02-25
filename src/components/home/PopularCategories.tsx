import { Link } from "react-router-dom";
import { popularCategories } from "@/data/products";
import { motion } from "framer-motion";

const PopularCategories = () => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="max-w-7xl mx-auto px-4 sm:px-8 py-20"
  >
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
        Popular Categories
      </h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {popularCategories.map((cat, i) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <Link
            to={`/collections/${cat.slug}`}
            className="group relative block overflow-hidden aspect-[4/3]"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent group-hover:from-foreground/50 transition-all duration-500" />
            <div className="absolute bottom-4 left-5 transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-lg font-display font-semibold text-background">
                {cat.title}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default PopularCategories;

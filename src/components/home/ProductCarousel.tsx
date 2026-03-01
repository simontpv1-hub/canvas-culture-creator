import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/product/ProductCard";

interface ProductCarouselProps {
  title: string;
  viewAllLink?: string;
  filterTag?: string;
}

const ProductCarousel = ({ title, viewAllLink, filterTag }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: products = [], isLoading } = useShopifyProducts();

  // Only show canvas versions so each artwork appears once
  const canvasOnly = products.filter((p) => p.tags.includes("style:canvas"));
  const filtered = filterTag
    ? canvasOnly.filter((p) => p.tags.map(t => t.toLowerCase()).includes(filterTag.toLowerCase()))
    : canvasOnly;

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-10">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-56 sm:w-64 aspect-[3/4] bg-secondary animate-pulse rounded" />
          ))}
        </div>
      </section>
    );
  }

  if (filtered.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-16"
    >
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          {title}
        </h2>
        <div className="flex items-center gap-4">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-sm font-body font-medium text-foreground hover:text-gold transition-colors tracking-wide"
            >
              View All →
            </Link>
          )}
          <div className="hidden sm:flex gap-1">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x"
      >
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex-shrink-0 w-56 sm:w-64 snap-start"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProductCarousel;

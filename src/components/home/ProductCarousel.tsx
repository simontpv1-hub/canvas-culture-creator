import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

interface ProductCarouselProps {
  title: string;
  viewAllLink?: string;
  filterTag?: string;
}

const ProductCarousel = ({ title, viewAllLink, filterTag }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const filtered = filterTag
    ? products.filter((p) => p.tags.includes(filterTag))
    : products;

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-sm font-body font-medium text-gold hover:text-gold-hover transition-colors underline underline-offset-4"
            >
              View All
            </Link>
          )}
          <div className="hidden sm:flex gap-1">
            <button
              onClick={() => scroll(-1)}
              className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x"
        style={{ scrollbarWidth: "none" }}
      >
        {filtered.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-56 sm:w-64 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;

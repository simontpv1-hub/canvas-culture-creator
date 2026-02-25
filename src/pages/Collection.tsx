import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Best Selling", value: "best-selling" },
  { label: "A–Z", value: "az" },
  { label: "Z–A", value: "za" },
  { label: "Price: Low–High", value: "price-asc" },
  { label: "Price: High–Low", value: "price-desc" },
];

const Collection = () => {
  const { slug } = useParams();
  const [sort, setSort] = useState("featured");
  const [showInStock, setShowInStock] = useState(true);
  const [visibleCount, setVisibleCount] = useState(16);

  const title = slug
    ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "All Products";

  const filtered = useMemo(() => {
    let items =
      slug === "all" || !slug
        ? products
        : products.filter((p) => p.category.includes(slug) || p.tags.includes(slug));

    if (showInStock) items = items.filter((p) => p.inStock);

    switch (sort) {
      case "az": return [...items].sort((a, b) => a.title.localeCompare(b.title));
      case "za": return [...items].sort((a, b) => b.title.localeCompare(a.title));
      case "price-asc": return [...items].sort((a, b) => a.price - b.price);
      case "price-desc": return [...items].sort((a, b) => b.price - a.price);
      default: return items;
    }
  }, [slug, sort, showInStock]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Header />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-2">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Filter/Sort bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <label className="flex items-center gap-2 text-sm font-body">
            <input
              type="checkbox"
              checked={showInStock}
              onChange={(e) => setShowInStock(e.target.checked)}
              className="accent-gold"
            />
            In Stock Only
          </label>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-background border border-border px-4 py-2 pr-8 text-sm font-body focus:outline-none focus:border-gold cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {visible.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body">No products found in this collection.</p>
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((c) => c + 16)}
              className="px-10 py-3 border border-border text-sm font-body font-medium uppercase tracking-wider hover:border-gold hover:text-gold transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Collection;

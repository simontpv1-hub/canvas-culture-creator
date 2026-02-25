import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCart } from "@/stores/cartStore";
import { Paintbrush, RotateCcw, Truck, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Overview", "Materials", "Shipping"];

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useShopifyProduct(slug);
  const { data: allProducts = [] } = useShopifyProducts();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeTab, setActiveTab] = useState("Overview");
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <PromoBanner />
        <Header />
        <CartDrawer />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="aspect-[3/4] bg-secondary animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-secondary animate-pulse rounded" />
              <div className="h-6 w-1/4 bg-secondary animate-pulse rounded" />
              <div className="h-12 w-full bg-secondary animate-pulse rounded mt-8" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <PromoBanner />
        <Header />
        <CartDrawer />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-semibold mb-4">Product Not Found</h1>
            <Link to="/collections/all" className="text-gold hover:text-gold-hover font-body underline">
              Browse All Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentSize = product.sizes[selectedSize];
  const currentPrice = currentSize?.price ?? product.price;
  const related = allProducts
    .filter((p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t)))
    .slice(0, 4);

  const handleAdd = () => {
    addItem(product, currentSize.label, currentSize.variantId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <nav className="text-xs font-body text-muted-foreground mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections/all" className="hover:text-gold transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-[3/4] bg-secondary overflow-hidden"
            >
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col py-4"
            >
              <h1 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl font-body font-semibold">${currentPrice.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-lg font-body text-muted-foreground line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="bg-gold text-primary-foreground text-xs font-body font-semibold px-2 py-1 uppercase">
                      Sale
                    </span>
                  </>
                )}
              </div>

              {product.sizes.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, i) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(i)}
                        className={`px-6 py-2.5 text-sm font-body border transition-all ${
                          i === selectedSize
                            ? "border-gold bg-gold text-primary-foreground"
                            : "border-border hover:border-gold"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAdd}
                className={`w-full font-body font-semibold py-4 text-sm uppercase tracking-widest transition-all mb-8 ${
                  added
                    ? "bg-foreground text-background"
                    : "bg-gold hover:bg-gold-hover text-primary-foreground hover:shadow-lg"
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="check" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" /> Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Add to Cart — ${currentPrice.toFixed(2)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <div className="mb-8">
                <div className="flex border-b border-border">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-xs font-body font-medium uppercase tracking-wider transition-colors relative ${
                        activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-px bg-gold" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="py-5 text-sm font-body text-muted-foreground leading-relaxed">
                  {activeTab === "Overview" && <p>{product.description}</p>}
                  {activeTab === "Materials" && (
                    <p>Premium 340gsm cotton-poly blend canvas. Archival-quality inks rated 100+ years. Hand-stretched over kiln-dried solid pine stretcher bars. Gallery-wrapped edges.</p>
                  )}
                  {activeTab === "Shipping" && (
                    <p>Free shipping on all orders. Standard delivery 5–7 business days. Each canvas is carefully packaged in a custom box for safe transit. Made to order in the USA.</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-6">
                {[
                  { icon: Paintbrush, text: "Hand-Made in the USA" },
                  { icon: Truck, text: "Free Shipping" },
                  { icon: RotateCcw, text: "30-Day Returns" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-3">
                    <b.icon className="w-4 h-4 text-gold" />
                    <span className="text-sm font-body text-foreground">{b.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-24"
            >
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-10">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;

import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { useShopifyProduct, useShopifyProducts, useShopifyProductsByTag } from "@/hooks/useShopifyProducts";
import { useCart } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { Minus, Plus, ChevronDown, Share2, Star, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/* ── Accordion sections ── */
const accordionSections = [
  {
    icon: "✦",
    title: "Canvas Details",
    content:
      "Premium 340gsm cotton-poly blend canvas with archival-quality pigment inks rated 100+ years. Hand-stretched over kiln-dried solid pine stretcher bars. Gallery-wrapped edges with a clean, finished look.",
  },
  {
    icon: "🖼",
    title: "Frame Details",
    content:
      "Solid wood frame with a premium satin finish. Glass front panel for UV protection. Includes D-ring hanging hardware pre-installed. Frame adds approximately 1.5\" to each dimension.",
  },
  {
    icon: "🚚",
    title: "Shipping",
    content:
      "Free shipping on all orders. Standard delivery 5–7 business days. Each canvas is carefully packaged in a custom box for safe transit. Made to order in the USA.",
  },
  {
    icon: "↩️",
    title: "Returns",
    content:
      "30-day hassle-free return policy. If you're not 100% satisfied, contact us and we'll make it right — no questions asked.",
  },
  {
    icon: "📝",
    title: "Custom Requests",
    content:
      "Need a custom size, special framing, or a unique print? Contact us at hello@canvasculture.com and we'll work with you to create something perfect.",
  },
  {
    icon: "❓",
    title: "Ask A Question",
    content:
      "Have a question about this product? Email us at support@canvasculture.com or use the contact form. We typically respond within 24 hours.",
  },
];

const highlights = [
  "Hand-stretched on a wood frame and ready to hang right out of the box",
  "Proudly made and shipped from the USA",
  "Some of the fastest shipping and lowest prices online",
  "Hanging materials included",
];

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useShopifyProduct(slug);
  const { data: allProducts = [] } = useShopifyProducts();
  const { addItem } = useCart();

  // Extract design tag to find paired product
  const designTag = useMemo(() => {
    if (!product) return undefined;
    return product.tags.find((t) => t.startsWith("design:"));
  }, [product]);

  const { data: pairedProducts = [] } = useShopifyProductsByTag(designTag);

  // Determine canvas and framed versions
  const canvasProduct = useMemo(() => {
    if (pairedProducts.length > 0) {
      return pairedProducts.find((p) => p.tags.includes("style:canvas")) ?? product;
    }
    return product;
  }, [pairedProducts, product]);

  const framedProduct = useMemo(() => {
    if (pairedProducts.length > 0) {
      return pairedProducts.find((p) => p.tags.includes("style:framed")) ?? null;
    }
    return null;
  }, [pairedProducts]);

  const [frameStyle, setFrameStyle] = useState<"canvas" | "framed">("canvas");
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // The active product based on frame style selection
  const activeProduct: ShopifyProduct | null =
    frameStyle === "framed" && framedProduct ? framedProduct : canvasProduct ?? null;

  // Reset size when frame style changes
  useEffect(() => {
    setSelectedSize(0);
  }, [frameStyle]);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Reset state when product changes
  useEffect(() => {
    setFrameStyle("canvas");
    setSelectedSize(0);
    setQuantity(1);
    setCurrent(0);
    setOpenAccordion(null);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="aspect-[3/4] bg-secondary animate-pulse" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 bg-secondary animate-pulse rounded" />
              <div className="h-6 w-1/4 bg-secondary animate-pulse rounded" />
              <div className="h-12 w-full bg-secondary animate-pulse rounded mt-8" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!activeProduct) {
    return (
      <div className="min-h-screen flex flex-col">
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

  const currentSize = activeProduct.sizes[selectedSize];
  const currentPrice = currentSize?.price ?? activeProduct.price;
  const comparePrice = activeProduct.compareAtPrice;
  const discountPercent = comparePrice ? Math.round((1 - currentPrice / comparePrice) * 100) : 0;

  const related = allProducts
    .filter((p) => p.id !== activeProduct.id && p.tags.includes("style:canvas") && p.tags.some((t) => activeProduct.tags.includes(t) && !t.startsWith("style:") && !t.startsWith("design:")))
    .slice(0, 4);

  const handleAdd = () => {
    addItem(activeProduct, currentSize.label, currentSize.variantId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* ── Gallery ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3"
            >
              <Carousel setApi={setApi} className="w-full bg-secondary overflow-hidden rounded-sm">
                <CarouselContent>
                  {activeProduct.images.map((imgUrl, index) => (
                    <CarouselItem key={index} className="aspect-[3/4]">
                      <img src={imgUrl} alt={`${activeProduct.title} - ${index + 1}`} className="w-full h-full object-cover" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {activeProduct.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-3 bg-background/80 hover:bg-background border-0" />
                    <CarouselNext className="right-3 bg-background/80 hover:bg-background border-0" />
                  </>
                )}
              </Carousel>

              {activeProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {activeProduct.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`relative w-24 h-24 flex-shrink-0 border-2 transition-all rounded-sm overflow-hidden ${
                        current === index ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={imgUrl} className="w-full h-full object-cover" alt="thumbnail" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── Product Info ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col"
            >
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-display font-semibold text-foreground leading-tight mb-4">
                {activeProduct.title}
              </h1>

              {/* Sale badge */}
              {comparePrice && discountPercent > 0 && (
                <div className="mb-3">
                  <span className="inline-block bg-destructive text-destructive-foreground text-xs font-body font-bold px-3 py-1.5 rounded-sm">
                    {discountPercent}% OFF - Ends Soon!
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                {comparePrice && (
                  <span className="text-base font-body text-muted-foreground line-through">
                    ${comparePrice.toFixed(2)} USD
                  </span>
                )}
                <span className="text-xl font-body font-semibold text-foreground">
                  ${currentPrice.toFixed(2)} USD
                </span>
              </div>

              <p className="text-xs font-body text-muted-foreground mb-3">
                <Link to="/shipping-returns" className="underline">Shipping</Link> calculated at checkout.
              </p>

              {/* Stars */}
              <div className="flex items-center gap-1.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-sm font-body text-muted-foreground ml-1">(1,645)</span>
              </div>

              {/* Promo tag */}
              <div className="flex items-center gap-2 mb-6 py-2">
                <Tag className="w-4 h-4 text-foreground" />
                <span className="text-sm font-body font-semibold text-foreground">
                  BUY 3 GET THE 4TH FREE! USE CODE: "BUY3GET1"
                </span>
              </div>

              {/* Size selector */}
              <div className="mb-5">
                <h3 className="text-sm font-body font-medium text-foreground mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.sizes.map((size, i) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(i)}
                      className={`px-4 py-2 text-sm font-body border rounded-full transition-all ${
                        i === selectedSize
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame style selector */}
              <div className="mb-5">
                <h3 className="text-sm font-body font-medium text-foreground mb-3">Frame style</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFrameStyle("canvas")}
                    className={`px-5 py-2 text-sm font-body border rounded-full transition-all ${
                      frameStyle === "canvas"
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    Canvas Print
                  </button>
                  {framedProduct && (
                    <button
                      onClick={() => setFrameStyle("framed")}
                      className={`px-5 py-2 text-sm font-body border rounded-full transition-all ${
                        frameStyle === "framed"
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      Framed Canvas
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-body font-medium text-foreground mb-3">Quantity</h3>
                <div className="inline-flex items-center border border-border rounded-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2.5 text-foreground hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 py-2.5 text-sm font-body font-medium text-foreground min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2.5 text-foreground hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) handleAdd();
                }}
                className="w-full py-3.5 border border-foreground text-foreground font-body text-sm font-medium uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors mb-3"
              >
                Add to cart
              </button>

              {/* Buy with Shop */}
              <button className="w-full py-3.5 bg-[#5A31F4] text-background font-body text-sm font-semibold rounded-md hover:bg-[#4A21E4] transition-colors mb-2">
                Buy with Shop Pay
              </button>

              <p className="text-xs font-body text-muted-foreground text-center underline cursor-pointer mb-8">
                More payment options
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-sm font-body font-semibold text-foreground mb-3">Highlights:</h3>
                <ul className="space-y-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-body text-muted-foreground italic mt-3">
                  *All dimensions are in inches.
                </p>
              </div>

              {/* Accordion sections */}
              <div className="border-t border-border">
                {accordionSections.map((section, i) => (
                  <div key={i} className="border-b border-border">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                      className="w-full flex items-center justify-between py-4 text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{section.icon}</span>
                        <span className="text-sm font-body font-medium text-foreground">{section.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                          openAccordion === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openAccordion === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm font-body text-muted-foreground pb-4 pl-9 leading-relaxed">
                            {section.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 mt-4 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-4 h-4" />
                Share this canvas
              </button>
            </motion.div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20"
            >
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-8">
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

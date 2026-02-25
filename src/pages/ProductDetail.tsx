import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/stores/cartStore";
import { Paintbrush, RotateCcw, Truck } from "lucide-react";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);

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

  const currentPrice = product.sizes[selectedSize].price;
  const related = products
    .filter((p) => p.id !== product.id && p.category.some((c) => product.category.includes(c)))
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-body text-muted-foreground mb-6">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections/all" className="hover:text-gold transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div className="aspect-[3/4] bg-secondary overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col py-4">
              <h1 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-2">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-body font-semibold">${currentPrice.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <span className="text-lg font-body text-muted-foreground line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="bg-gold text-primary-foreground text-xs font-body font-semibold px-2 py-1 uppercase">
                    Sale
                  </span>
                )}
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <h3 className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(i)}
                      className={`px-5 py-2 text-sm font-body border transition-colors ${
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

              {/* Add to Cart */}
              <button
                onClick={() => addItem(product, product.sizes[selectedSize].label)}
                className="w-full bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold py-4 text-sm uppercase tracking-widest transition-colors mb-6"
              >
                Add to Cart — ${currentPrice.toFixed(2)}
              </button>

              {/* Description */}
              <div className="mb-8">
                <p className="text-sm font-body text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Trust badges */}
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
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;

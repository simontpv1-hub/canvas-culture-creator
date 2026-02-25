import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/stores/cartStore";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasSale = !!product.compareAtPrice;
  const { addItem } = useCart();
  const firstVariant = product.sizes[0];

  return (
    <div className="group block">
      <Link to={`/product/${product.slug}`}>
        <div className="relative overflow-hidden bg-secondary aspect-[3/4] transition-shadow duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
            loading="lazy"
          />
          {hasSale && (
            <span className="absolute top-3 left-3 bg-gold text-primary-foreground text-xs font-body font-semibold px-2 py-1 uppercase tracking-wider animate-sale-pulse">
              Sale
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product, firstVariant.label, firstVariant.variantId);
              }}
              className="w-full bg-charcoal/90 backdrop-blur-sm text-background font-body text-xs uppercase tracking-wider py-3.5 hover:bg-gold transition-colors active:scale-[0.97]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-3 px-1">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-body font-medium text-foreground line-clamp-2 group-hover:text-gold transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-body font-semibold transition-colors group-hover:text-gold">
            ${product.price.toFixed(2)}
          </span>
          {hasSale && (
            <span className="text-sm font-body text-muted-foreground line-through">
              ${product.compareAtPrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

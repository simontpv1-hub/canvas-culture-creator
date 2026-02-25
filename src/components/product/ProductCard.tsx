import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { motion } from "framer-motion";
import { useCart } from "@/stores/cartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasSale = !!product.compareAtPrice;
  const { addItem } = useCart();

  return (
    <div className="group block">
      <Link to={`/product/${product.slug}`}>
        <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
          {hasSale && (
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="absolute top-3 left-3 bg-gold text-primary-foreground text-xs font-body font-semibold px-2 py-1 uppercase tracking-wider"
            >
              Sale
            </motion.span>
          )}
          {/* Add to cart on hover */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product, product.sizes[0].label);
              }}
              className="w-full bg-charcoal/90 text-background font-body text-xs uppercase tracking-wider py-3 hover:bg-gold transition-colors"
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
          <span className="text-sm font-body font-semibold">
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

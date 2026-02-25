import { Link } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasSale = !!product.compareAtPrice;

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasSale && (
          <span className="absolute top-3 left-3 bg-gold text-primary-foreground text-xs font-body font-semibold px-2 py-1 uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3 px-1">
        <h3 className="text-sm font-body font-medium text-foreground line-clamp-2 group-hover:text-gold transition-colors">
          {product.title}
        </h3>
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
    </Link>
  );
};

export default ProductCard;

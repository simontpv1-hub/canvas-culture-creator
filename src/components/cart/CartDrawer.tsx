import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/stores/cartStore";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-foreground/40 z-50" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="text-lg font-display font-semibold">Your Cart</h2>
          <button onClick={closeCart} className="p-2 hover:text-gold transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-body">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="mt-4 text-sm font-body font-medium text-gold hover:text-gold-hover transition-colors underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const sizePrice = item.product.sizes.find((s) => s.label === item.size)?.price ?? item.product.price;
                return (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4 border-b border-border">
                    <Link to={`/product/${item.product.slug}`} onClick={closeCart}>
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-body font-medium truncate">{item.product.title}</h3>
                      <p className="text-xs text-muted-foreground font-body mt-1">{item.size}</p>
                      <p className="text-sm font-body font-semibold mt-1">${sizePrice.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-body w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="p-1 self-start hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border">
            <div className="flex justify-between mb-4">
              <span className="font-body font-medium">Subtotal</span>
              <span className="font-body font-semibold">${subtotal().toFixed(2)}</span>
            </div>
            <button className="w-full bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold py-3 transition-colors text-sm uppercase tracking-wider">
              Proceed to Checkout
            </button>
            <p className="text-xs text-muted-foreground text-center mt-3 font-body">
              Free shipping on orders over $75
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

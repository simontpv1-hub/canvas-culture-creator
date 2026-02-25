import { create } from "zustand";
import { ShopifyProduct, createCheckout } from "@/lib/shopify";

export interface CartItem {
  product: ShopifyProduct;
  size: string;
  variantId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  checkingOut: boolean;
  addItem: (product: ShopifyProduct, size: string, variantId: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  checkout: () => Promise<void>;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  checkingOut: false,

  addItem: (product, size, variantId) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { product, size, variantId, quantity: 1 }],
        isOpen: true,
      };
    });
  },

  removeItem: (productId, size) => {
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.product.id === productId && i.size === size)
      ),
    }));
  },

  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId && i.size === size
          ? { ...i, quantity }
          : i
      ),
    }));
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  subtotal: () =>
    get().items.reduce((sum, i) => {
      const sizePrice =
        i.product.sizes.find((s) => s.label === i.size)?.price ?? i.product.price;
      return sum + sizePrice * i.quantity;
    }, 0),

  checkout: async () => {
    const items = get().items;
    if (items.length === 0) return;

    set({ checkingOut: true });
    try {
      const lineItems = items.map((i) => ({
        variantId: i.variantId,
        quantity: i.quantity,
      }));
      const result = await createCheckout(lineItems);
      if (result?.webUrl) {
        window.location.href = result.webUrl;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      set({ checkingOut: false });
    }
  },
}));

import { create } from "zustand";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product, size) => {
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
      return { items: [...state.items, { product, size, quantity: 1 }], isOpen: true };
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
      const sizePrice = i.product.sizes.find((s) => s.label === i.size)?.price ?? i.product.price;
      return sum + sizePrice * i.quantity;
    }, 0),
}));

import { create } from "zustand";
import type { Product } from "@/lib/index";

export interface QuoteItem {
    product: Product;
    quantity: number;
}

interface QuoteStore {
    items: QuoteItem[];
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearQuote: () => void;
    toggleOpen: () => void;
    setOpen: (open: boolean) => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
    items: [],
    isOpen: false,

    addItem: (product) =>
        set((state) => {
            const existing = state.items.find((i) => i.product.id === product.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { product, quantity: 1 }] };
        }),

    removeItem: (productId) =>
        set((state) => ({
            items: state.items.filter((i) => i.product.id !== productId),
        })),

    updateQuantity: (productId, quantity) =>
        set((state) => ({
            items:
                quantity <= 0
                    ? state.items.filter((i) => i.product.id !== productId)
                    : state.items.map((i) =>
                        i.product.id === productId ? { ...i, quantity } : i
                    ),
        })),

    clearQuote: () => set({ items: [] }),
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: (open) => set({ isOpen: open }),
}));

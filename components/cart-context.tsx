"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/data";

type CartLine = { product: Product; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("alvero-cart");
      if (saved) setLines(JSON.parse(saved));
    } catch {
      // Ignore malformed local cart data.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("alvero-cart", JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      add: (product, quantity = 1) => {
        setLines((current) => {
          const found = current.find((line) => line.product.slug === product.slug);
          if (found) {
            return current.map((line) =>
              line.product.slug === product.slug
                ? { ...line, quantity: line.quantity + quantity }
                : line
            );
          }
          return [...current, { product, quantity }];
        });
        setOpen(true);
      },
      remove: (slug) => setLines((current) => current.filter((line) => line.product.slug !== slug)),
      setQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          setLines((current) => current.filter((line) => line.product.slug !== slug));
          return;
        }
        setLines((current) =>
          current.map((line) => (line.product.slug === slug ? { ...line, quantity } : line))
        );
      },
      clear: () => setLines([]),
      open,
      setOpen
    };
  }, [lines, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

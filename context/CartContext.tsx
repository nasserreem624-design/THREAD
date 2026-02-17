"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ColorVariant } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
  selectedColorKey: string;
  selectedSize: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, colorKey: string, size: string) => void;
  removeFromCart: (itemId: string, colorKey: string, size: string) => void;
  updateQuantity: (itemId: string, colorKey: string, size: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('thread_cart_v2');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('thread_cart_v2', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, colorKey: string, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColorKey === colorKey && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColorKey === colorKey && item.selectedSize === size)
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColorKey: colorKey, selectedSize: size }];
    });
  };

  const removeFromCart = (itemId: string, colorKey: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === itemId && item.selectedColorKey === colorKey && item.selectedSize === size)));
  };

  const updateQuantity = (itemId: string, colorKey: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId && item.selectedColorKey === colorKey && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
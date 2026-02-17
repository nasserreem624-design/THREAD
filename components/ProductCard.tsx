"use client";
import React, { useState } from 'react';
import { Product, ColorVariant } from '@/data/products';
import { ProductImage } from './ProductImage';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onViewImage?: (img: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewImage }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedColor.key, selectedSize);
    }
  };

  const isSelectionMissing = !selectedSize;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col"
    >
      <div className="relative h-64 sm:h-80 rounded-[2rem] overflow-hidden mb-4 shadow-sm bg-white border border-zinc-100 dark:border-zinc-800">
        <ProductImage 
          src={selectedColor.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-all duration-500" 
        />
        {product.badge && (
          <span className="absolute top-4 right-4 z-20 bg-brand-gold text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
            {product.badge}
          </span>
        )}
      </div>

      <div className="px-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black opacity-40 uppercase tracking-tighter">
            {product.category === 'men' ? 'رجالي' : 'نسائي'}
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-brand-gold text-brand-gold" />
            <span className="text-xs font-black">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg leading-tight group-hover:text-brand-gold transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-brand-gold">{product.price} ج.م</span>
          {product.originalPrice && (
            <span className="text-xs opacity-40 line-through font-bold">{product.originalPrice} ج.م</span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex gap-2">
          {product.colors.map(color => (
            <button 
              key={color.key}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border-2 transition-all transform ${selectedColor.key === color.key ? 'border-brand-gold scale-125 shadow-md' : 'border-zinc-100 dark:border-zinc-800'}`}
              style={{ backgroundColor: color.hex }}
              title={color.nameAr}
            />
          ))}
        </div>

        {/* Size Pills */}
        <div className="flex flex-wrap gap-2">
          {product.sizes.map(size => (
            <button 
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`text-[10px] font-black px-3 py-1 rounded-lg border-2 transition-all ${selectedSize === size ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-zinc-100 dark:border-zinc-800 opacity-60'}`}
            >
              {size}
            </button>
          ))}
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={isSelectionMissing}
          className={`w-full py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all ${isSelectionMissing ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed' : 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02]'}`}
        >
          {isSelectionMissing ? 'اختار اللون والمقاس الأول' : <><ShoppingCart size={16} /> أضف للسلة</>}
        </button>
      </div>
    </motion.div>
  );
};
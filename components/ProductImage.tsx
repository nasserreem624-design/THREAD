"use client";
import React, { useState, useEffect } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);

  // Sync internal src if prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setErrorCount(0);
  }, [src]);

  const handleError = () => {
    if (errorCount === 0) {
      // Switch to a reliable external fallback fashion image
      setCurrentSrc('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop');
      setErrorCount(1);
    } else {
      setErrorCount(2); // Use emergency placeholder
    }
  };

  if (errorCount >= 2) {
    return (
      <div className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-brand-gold font-black italic tracking-widest ${className}`}>
        THREAD
      </div>
    );
  }

  return (
    <div className={`relative bg-white flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleError}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};
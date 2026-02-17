
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background Video/Poster */}
      <div className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="metadata" 
            src="/hero/thread-store.mp4" 
            poster="/hero/thread-store.jpg"
            className="w-full h-full object-cover scale-105"
          />
        ) : (
          <img src="/hero/thread-store.jpg" alt="Thread Hero" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          style={{
            rotateY: mousePos.x,
            rotateX: -mousePos.y,
            transition: { type: 'spring', stiffness: 100, damping: 30 }
          }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black mb-6 leading-tight"
          >
            أكثر من مجرد ملابس، <br/>
            <span className="text-brand-gold italic">هي قصتك.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto font-medium"
          >
            استكشف أحدث صيحات الشارع في مصر والخليج. تصاميم صنعت لتعبر عن هويتك الحقيقية.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <button className="w-full md:w-auto bg-white text-black px-12 py-5 rounded-full text-lg font-black hover:bg-brand-gold hover:text-white transition-all transform hover:scale-105">
              تسوق الآن
            </button>
            <button className="w-full md:w-auto border-2 border-white/30 backdrop-blur-md px-12 py-5 rounded-full text-lg font-black hover:border-white transition-all">
              خصم 15% لأول طلب
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8 opacity-70 text-sm font-bold"
          >
            <div className="flex items-center gap-2">🚚 توصيل سريع 2-3 أيام</div>
            <div className="flex items-center gap-2">💳 دفع آمن بالكامل</div>
            <div className="flex items-center gap-2">🔄 إرجاع مجاني 14 يوم</div>
            <div className="flex items-center gap-2">⭐ +50,000 عميل راضي</div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

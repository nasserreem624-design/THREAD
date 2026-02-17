
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Sun, Moon, Instagram, Facebook } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navLinks = [
    { name: 'رجالي', href: '/men' },
    { name: 'نسائي', href: '/women' },
    { name: 'جديد', href: '/#new' },
    { name: 'عروض', href: '/#sale' },
    { name: 'دليل المقاسات', href: '/#size-guide' },
    { name: 'الأسئلة الشائعة', href: '/#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 text-current">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <span className="text-2xl font-black tracking-tighter leading-none">THREAD</span>
          <span className="text-[10px] font-bold opacity-70 tracking-widest">ستايلك، قصتك</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className="text-sm font-semibold hover:text-brand-gold transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <Link href="/checkout" className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          <button className="hidden md:block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-sm font-bold hover:opacity-80 transition-opacity">
            ابدأ التسوق
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm glass z-[70] p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-black">THREAD</span>
                <button onClick={() => setIsOpen(false)} className="p-2"><X size={24} /></button>
              </div>
              
              <div className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold hover:text-brand-gold"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold mb-4">
                  حمّل التطبيق
                </button>
                <div className="flex justify-center gap-6 opacity-60">
                  <Instagram size={24} />
                  <Facebook size={24} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

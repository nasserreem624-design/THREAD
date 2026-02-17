import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ShoppingBag, Menu, X, Sun, Moon, Instagram, Facebook, 
  Star, ShoppingCart, Eye, Truck, ShieldCheck, RefreshCcw, 
  ChevronLeft, ArrowLeft, Download, Send, Trash2, Plus, Minus,
  CreditCard, Wallet, CheckCircle2, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interfaces ---
interface ColorVariant {
  nameAr: string;
  key: string;
  hex: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  colors: ColorVariant[];
  sizes: string[];
  rating: number;
  reviews: number;
  category: string;
  description: string;
}

interface CartItem extends Product {
  qty: number;
  selectedColor: ColorVariant;
  selectedSize: string;
}

// --- Data Layer ---
const PRODUCTS: Product[] = [
  { 
    id: 'm1', 
    name: 'Cargo Pants - Khaki', 
    price: 379, 
    originalPrice: 499, 
    badge: 'جديد', 
    colors: [
      { nameAr: 'خاكي', key: 'khaki', hex: '#C3B091', image: 'https://images.unsplash.com/photo-1517441167426-261138945b6f?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'أسود', key: 'black', hex: '#111111', image: 'https://images.unsplash.com/photo-1551834231-38a6a67f673e?q=80&w=800&auto=format&fit=crop' }
    ], 
    sizes: ['M', 'L', 'XL'], 
    rating: 4.5, 
    reviews: 145, 
    category: 'men',
    description: 'بنطلون كارغو عصري بجيوب جانبية وتصميم متين يناسب المغامرات اليومية.'
  },
  { 
    id: 'm2', 
    name: 'Essential T-Shirt Pack', 
    price: 299, 
    badge: 'الأكثر مبيعاً', 
    colors: [
      { nameAr: 'أبيض', key: 'white', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'أسود', key: 'black', hex: '#111111', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop' }
    ], 
    sizes: ['S', 'M', 'L', 'XL'], 
    rating: 4.9, 
    reviews: 567, 
    category: 'men',
    description: 'طقم مكون من 3 تيشرتات قطنية أساسية بجودة عالية وألوان محايدة.'
  },
  { 
    id: 'm3', 
    name: 'Slim Fit Jeans - Dark Blue', 
    price: 449, 
    originalPrice: 549, 
    colors: [
      { nameAr: 'أزرق داكن', key: 'dark-blue', hex: '#1E293B', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop' }
    ], 
    sizes: ['30', '32', '34'], 
    rating: 4.6, 
    reviews: 189, 
    category: 'men',
    description: 'بنطلون جينز سليم فيت بجودة ممتازة ومرونة مريحة للحركة اليومية.'
  },
  { 
    id: 'w1', 
    name: 'Oversized Hoodie - Black', 
    price: 399, 
    originalPrice: 499, 
    badge: 'الأكثر طلباً', 
    colors: [
      { nameAr: 'أسود', key: 'black', hex: '#111111', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'رمادي', key: 'gray', hex: '#6B7280', image: 'https://images.unsplash.com/photo-1556821840-b8042452441c?q=80&w=800&auto=format&fit=crop' }
    ], 
    sizes: ['S', 'M', 'L'], 
    rating: 4.7, 
    reviews: 234, 
    category: 'women',
    description: 'هودي قطني مريح بتصميم عصري واسع مثالي للإطلالات اليومية.'
  },
  { 
    id: 'w2', 
    name: 'High-Waist Mom Jeans', 
    price: 429, 
    colors: [
      { nameAr: 'أزرق فاتح', key: 'light-blue', hex: '#93C5FD', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop' }
    ], 
    sizes: ['26', '28', '30'], 
    rating: 4.7, 
    reviews: 298, 
    category: 'women',
    description: 'بنطلون جينز بخصر مرتفع وقصة كلاسيكية مريحة تبرز جمال القوام.'
  },
  { 
    id: 'w3', 
    name: 'Oversized Sweater - Beige', 
    price: 349, 
    badge: 'تريند', 
    colors: [
      { nameAr: 'بيج', key: 'beige', hex: '#D6C4A8', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop' }
    ], 
    sizes: ['S', 'M', 'L'], 
    rating: 4.8, 
    reviews: 412, 
    category: 'women',
    description: 'سويتر ناعم بتصميم فضفاض وألوان هادئة لإطلالة شتوية أنيقة.'
  },
  { 
    id: 'w4', 
    name: 'Cropped Hoodie - Pink', 
    price: 329, 
    colors: [
      { nameAr: 'وردي', key: 'pink', hex: '#F9A8D4', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop' }
    ], 
    sizes: ['XS', 'S', 'M'], 
    rating: 4.6, 
    reviews: 187, 
    category: 'women',
    description: 'هودي قصير خفيف الوزن وناعم الملمس بلون وردي مبهج.'
  },
  { 
    id: 'w5', 
    name: 'Maxi Dress - Floral', 
    price: 499, 
    badge: 'وصل حديثاً', 
    colors: [
      { nameAr: 'زهري', key: 'pink-floral', hex: '#FDA4AF', image: 'https://images.unsplash.com/photo-1572804013307-f9615c127160?q=80&w=800&auto=format&fit=crop' }
    ], 
    sizes: ['S', 'M', 'L'], 
    rating: 4.9, 
    reviews: 156, 
    category: 'women',
    description: 'فستان ماكسي طويل بنقشات الزهور الربيعية لإطلالة أنثوية ناعمة.'
  },
];

// --- Utilities ---
const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return initialValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
};

const ProductImage: React.FC<{src: string, alt: string, className?: string}> = ({ src, alt, className }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setCurrentSrc(src);
    setErrorCount(0);
  }, [src]);

  const handleError = () => {
    if (errorCount === 0) {
      setCurrentSrc('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop');
      setErrorCount(1);
    } else {
      setErrorCount(2);
    }
  };

  if (errorCount >= 2) {
    return <div className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-brand-gold font-black italic tracking-widest ${className}`}>THREAD</div>;
  }

  return (
    <div className={`relative bg-white overflow-hidden flex items-center justify-center ${className}`}>
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

// --- Sub-components ---

interface NavbarProps {
  scrolled: boolean;
  setView: (view: string) => void;
  setIsMenuOpen: (open: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, setView, setIsMenuOpen, theme, setTheme, cartCount }) => (
  <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-6'}`}>
    <div className="container mx-auto px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-current"><Menu /></button>
        <div className="hidden lg:flex items-center gap-8 font-bold text-sm text-current">
          <button onClick={() => setView('men')} className="hover:text-brand-gold transition-colors">رجالي</button>
          <button onClick={() => setView('women')} className="hover:text-brand-gold transition-colors">نسائي</button>
          <button onClick={() => setView('home')} className="hover:text-brand-gold transition-colors">الرئيسية</button>
        </div>
      </div>
      <button onClick={() => setView('home')} className="flex flex-col items-center group text-current">
        <span className="text-2xl font-black italic uppercase tracking-tighter transition-colors group-hover:text-brand-gold">THREAD</span>
        <span className="text-[10px] font-bold opacity-60 uppercase">ستايلك، قصتك</span>
      </button>
      <div className="flex items-center gap-4">
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 transition-colors hover:text-brand-gold">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button onClick={() => setView('checkout')} className="relative p-2 transition-colors hover:text-brand-gold">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg animate-in zoom-in">{cartCount}</span>}
        </button>
      </div>
    </div>
  </nav>
);

const ProductCard: React.FC<{
  product: Product, 
  onQuickView: (p: Product, initialColor: ColorVariant) => void,
  addToCart: (p: Product, color: ColorVariant, size: string) => void
}> = ({ product, onQuickView, addToCart }) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const canAdd = selectedSize !== '';

  return (
    <motion.div layout className="group flex flex-col">
      <div 
        className="relative h-64 sm:h-80 rounded-[2rem] overflow-hidden mb-4 bg-white shadow-sm border border-zinc-100 dark:border-zinc-800 cursor-pointer" 
        onClick={() => onQuickView(product, selectedColor)}
      >
        <ProductImage src={selectedColor.image} alt={product.name} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
        {product.badge && <span className="absolute top-4 right-4 bg-brand-gold text-white text-[10px] font-black px-3 py-1 rounded-full uppercase z-10 shadow-md">{product.badge}</span>}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <div className="bg-white p-4 rounded-full text-black shadow-2xl scale-90 group-hover:scale-100 transition-transform"><Eye size={20} /></div>
        </div>
      </div>
      
      <div className="px-1 flex flex-col gap-2">
        <h3 className="font-bold text-lg cursor-pointer hover:text-brand-gold transition-colors" onClick={() => onQuickView(product, selectedColor)}>{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-brand-gold">{product.price} ج.م</span>
          <div className="flex items-center gap-1"><Star size={12} className="fill-brand-gold text-brand-gold" /><span className="text-xs font-bold">{product.rating}</span></div>
        </div>

        <div className="flex gap-3 mt-1">
          {product.colors.map(color => (
            <button 
              key={color.key} 
              onClick={(e) => { e.stopPropagation(); setSelectedColor(color); }}
              title={color.nameAr}
              className={`w-6 h-6 rounded-full border-2 transition-all transform hover:scale-110 ${selectedColor.key === color.key ? 'border-brand-gold ring-2 ring-brand-gold/20 scale-125' : 'border-zinc-200 dark:border-zinc-700'}`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {product.sizes.map(size => (
            <button 
              key={size}
              onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
              className={`text-[10px] font-black px-3 py-1 rounded-lg border-2 transition-all ${selectedSize === size ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-zinc-100 dark:border-zinc-800 hover:border-brand-gold/40'}`}
            >
              {size}
            </button>
          ))}
        </div>

        <button 
          disabled={!canAdd}
          onClick={() => addToCart(product, selectedColor, selectedSize)}
          className={`mt-4 w-full py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${canAdd ? 'bg-black dark:bg-white text-white dark:text-black hover:opacity-80 shadow-lg' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}
        >
          {canAdd ? <><ShoppingCart size={16} /> أضف للسلة</> : 'اختار اللون والمقاس الأول'}
        </button>
      </div>
    </motion.div>
  );
};

const QuickViewModal: React.FC<{
  product: Product, 
  initialColor: ColorVariant,
  onClose: () => void,
  addToCart: (p: Product, color: ColorVariant, size: string) => void
}> = ({ product, initialColor, onClose, addToCart }) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const canAdd = selectedSize !== '';

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:scale-110 hover:bg-brand-gold hover:text-white transition-all shadow-lg"><X /></button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-white shadow-inner">
             <ProductImage src={selectedColor.image} alt={product.name} className="w-full h-full object-cover transition-all duration-700" />
           </div>
           
           <div className="flex flex-col h-full text-current">
              <span className="text-brand-gold font-black uppercase tracking-[0.2em] text-sm mb-4">{product.category === 'men' ? 'للرجال' : 'للنساء'}</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 italic leading-tight tracking-tighter">{product.name}</h2>
              <div className="flex items-center gap-4 mb-8">
                 <span className="text-4xl font-black text-brand-gold">{product.price} ج.م</span>
                 {product.originalPrice && <span className="text-xl opacity-30 line-through font-bold">{product.originalPrice} ج.م</span>}
              </div>
              
              <p className="opacity-70 font-medium mb-10 leading-relaxed text-lg border-l-4 border-brand-gold/20 pl-6">{product.description}</p>
              
              <div className="space-y-10">
                 <div>
                    <h4 className="font-black mb-6 flex justify-between items-center text-xl">
                       <span>اللون المختار:</span>
                       <span className="text-brand-gold font-bold">{selectedColor.nameAr}</span>
                    </h4>
                    <div className="flex gap-4">
                       {product.colors.map(color => (
                         <button 
                           key={color.key} 
                           onClick={() => setSelectedColor(color)}
                           className={`w-12 h-12 rounded-full border-4 transition-all shadow-sm ${selectedColor.key === color.key ? 'border-brand-gold scale-110 ring-4 ring-brand-gold/30 shadow-brand-gold/20' : 'border-zinc-200 dark:border-zinc-700 hover:scale-105'}`}
                           style={{ backgroundColor: color.hex }}
                         />
                       ))}
                    </div>
                 </div>
                 
                 <div>
                    <h4 className="font-black mb-6 text-xl">اختار المقاس:</h4>
                    <div className="flex flex-wrap gap-4">
                       {product.sizes.map(size => (
                         <button 
                           key={size}
                           onClick={() => setSelectedSize(size)}
                           className={`min-w-[70px] h-[55px] flex items-center justify-center font-black rounded-2xl border-2 transition-all shadow-sm ${selectedSize === size ? 'border-brand-gold bg-brand-gold text-white scale-105 shadow-brand-gold/20' : 'border-zinc-200 dark:border-zinc-800 hover:border-brand-gold/50'}`}
                         >
                           {size}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="mt-auto pt-16">
                 <button 
                    disabled={!canAdd}
                    onClick={() => { addToCart(product, selectedColor, selectedSize); onClose(); }}
                    className={`w-full py-8 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-5 transition-all shadow-2xl ${canAdd ? 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.03] active:scale-95' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed grayscale'}`}
                 >
                    <ShoppingCart size={28} />
                    {canAdd ? 'إضافة للحقيبة' : 'يجب اختيار المقاس'}
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- App Container ---
const App = () => {
  const [view, setView] = useState('home');
  const [cart, setCart] = useLocalStorage<CartItem[]>('thread_cart_v3', []);
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quickViewData, setQuickViewData] = useState<{product: Product, color: ColorVariant} | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addToCart = (product: Product, color: ColorVariant, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor.key === color.key && item.selectedSize === size);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.selectedColor.key === color.key && item.selectedSize === size) ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (id: string, colorKey: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor.key === colorKey && item.selectedSize === size)));
  };

  const updateQty = (id: string, colorKey: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedColor.key === colorKey && item.selectedSize === size) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const cartCount = useMemo(() => cart.reduce((a, b) => a + b.qty, 0), [cart]);
  const total = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.qty, 0), [cart]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-[#0a0a0a]">
      <Navbar scrolled={scrolled} setView={setView} setIsMenuOpen={setIsMenuOpen} theme={theme} setTheme={setTheme} cartCount={cartCount} />
      
      <AnimatePresence>
        {quickViewData && (
           <QuickViewModal 
             product={quickViewData.product} 
             initialColor={quickViewData.color}
             onClose={() => setQuickViewData(null)} 
             addToCart={addToCart} 
           />
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20">
        {view === 'home' && (
          <div className="space-y-40">
             <section className="h-[85vh] container mx-auto px-4">
                <div className="w-full h-full rounded-[4.5rem] overflow-hidden relative flex items-center justify-center text-white bg-black group shadow-3xl">
                   <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-110" alt="Hero" />
                   <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
                   <div className="relative z-10 text-center px-4 max-w-5xl">
                      <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-8xl md:text-[12rem] font-black italic mb-4 leading-none tracking-tighter">THREAD</motion.h1>
                      <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl md:text-4xl font-bold opacity-90 mb-16 tracking-tight">ستايلك، قصتك. أحدث صيحات الشارع المصري والخليجي.</motion.p>
                      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-8">
                        <button onClick={() => setView('men')} className="bg-white text-black px-16 py-8 rounded-full text-2xl font-black hover:bg-brand-gold hover:text-white transition-all transform hover:scale-105 shadow-2xl">تسوق الرجالي</button>
                        <button onClick={() => setView('women')} className="bg-transparent border-2 border-white/40 backdrop-blur-xl px-16 py-8 rounded-full text-2xl font-black hover:border-white transition-all transform hover:scale-105">تسوق النسائي</button>
                      </motion.div>
                   </div>
                </div>
             </section>

             <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div onClick={() => setView('men')} className="relative h-[700px] rounded-[4rem] overflow-hidden cursor-pointer group shadow-2xl border border-white/5 bg-zinc-900">
                   <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Men's Collection" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-20">
                      <span className="text-brand-gold font-black uppercase tracking-[0.4em] mb-4">New Season</span>
                      <h2 className="text-7xl font-black text-white italic mb-8 tracking-tighter">التشكيلة الرجالية</h2>
                      <div className="flex items-center gap-6 text-brand-gold font-black text-2xl group-hover:gap-12 transition-all"><span>اكتشف المجموعة</span> <ArrowLeft size={32} /></div>
                   </div>
                </div>
                <div onClick={() => setView('women')} className="relative h-[700px] rounded-[4rem] overflow-hidden cursor-pointer group shadow-2xl border border-white/5 bg-zinc-900">
                   <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Women's Collection" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-20">
                      <span className="text-brand-gold font-black uppercase tracking-[0.4em] mb-4">Trending Now</span>
                      <h2 className="text-7xl font-black text-white italic mb-8 tracking-tighter">التشكيلة النسائية</h2>
                      <div className="flex items-center gap-6 text-brand-gold font-black text-2xl group-hover:gap-12 transition-all"><span>اكتشف المجموعة</span> <ArrowLeft size={32} /></div>
                   </div>
                </div>
             </section>

             <section className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-20">
                   <div>
                      <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">الرجالي <span className="text-brand-gold">Men</span></h2>
                      <p className="text-2xl opacity-40 font-bold italic uppercase tracking-[0.2em]">Crafted for the street</p>
                   </div>
                   <button onClick={() => setView('men')} className="text-brand-gold font-black text-xl flex items-center gap-3 hover:opacity-70 transition-all">عرض الكل <ChevronLeft size={20} /></button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                   {PRODUCTS.filter(p => p.category === 'men').slice(0, 4).map(p => (
                     <ProductCard key={p.id} product={p} addToCart={addToCart} onQuickView={(prod, col) => setQuickViewData({product: prod, color: col})} />
                   ))}
                </div>
             </section>

             <section className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-20">
                   <div>
                      <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">النسائي <span className="text-brand-gold">Women</span></h2>
                      <p className="text-2xl opacity-40 font-bold italic uppercase tracking-[0.2em]">Empower your style</p>
                   </div>
                   <button onClick={() => setView('women')} className="text-brand-gold font-black text-xl flex items-center gap-3 hover:opacity-70 transition-all">عرض الكل <ChevronLeft size={20} /></button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                   {PRODUCTS.filter(p => p.category === 'women').slice(0, 4).map(p => (
                     <ProductCard key={p.id} product={p} addToCart={addToCart} onQuickView={(prod, col) => setQuickViewData({product: prod, color: col})} />
                   ))}
                </div>
             </section>

             <section className="container mx-auto px-4">
                <div className="glass p-20 rounded-[5rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 shadow-3xl border-white/5">
                   <div className="flex flex-col items-center text-center gap-6"><div className="bg-brand-gold/10 p-6 rounded-[2rem] text-brand-gold"><Truck size={48} /></div><div><h4 className="font-black text-2xl mb-2">توصيل سريع</h4><p className="text-sm font-bold opacity-40">خلال 48 ساعة بجميع المحافظات</p></div></div>
                   <div className="flex flex-col items-center text-center gap-6"><div className="bg-brand-gold/10 p-6 rounded-[2rem] text-brand-gold"><ShieldCheck size={48} /></div><div><h4 className="font-black text-2xl mb-2">دفع آمن</h4><p className="text-sm font-bold opacity-40">حماية كاملة لجميع بياناتك</p></div></div>
                   <div className="flex flex-col items-center text-center gap-6"><div className="bg-brand-gold/10 p-6 rounded-[2rem] text-brand-gold"><RefreshCcw size={48} /></div><div><h4 className="font-black text-2xl mb-2">إرجاع مرن</h4><p className="text-sm font-bold opacity-40">14 يوم للتبديل أو الاسترجاع</p></div></div>
                   <div className="flex flex-col items-center text-center gap-6"><div className="bg-brand-gold/10 p-6 rounded-[2rem] text-brand-gold"><Star size={48} /></div><div><h4 className="font-black text-2xl mb-2">عملاء سعداء</h4><p className="text-sm font-bold opacity-40">+50,000 عميل راضي بالكامل</p></div></div>
                </div>
             </section>
          </div>
        )}

        {(view === 'men' || view === 'women') && (
          <div className="container mx-auto px-4">
             <div className="flex items-center gap-6 mb-16 opacity-40 font-black italic text-xl">
                <button onClick={() => setView('home')} className="hover:text-brand-gold transition-colors">الرئيسية</button>
                <ChevronLeft size={18} />
                <span className="text-brand-gold">{view === 'men' ? 'الرجالي' : 'النسائي'}</span>
             </div>
             <h2 className="text-7xl md:text-9xl font-black italic mb-24 uppercase tracking-tighter leading-none">التشكيلة {view === 'men' ? 'الرجالية' : 'النسائية'}</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {PRODUCTS.filter(p => p.category === view).map(p => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} onQuickView={(prod, col) => setQuickViewData({product: prod, color: col})} />
                ))}
             </div>
          </div>
        )}

        {view === 'checkout' && (
          <div className="container mx-auto px-4 max-w-6xl">
             <h2 className="text-6xl font-black italic mb-20 tracking-tighter uppercase">حقيبة التسوق <span className="text-brand-gold">({cart.length})</span></h2>
             {cart.length === 0 ? (
               <div className="text-center py-48 glass rounded-[5rem] shadow-2xl">
                 <p className="text-3xl font-bold opacity-30 mb-12 italic tracking-tight">سلتك فاضية.. لسه مستني إيه؟</p>
                 <button onClick={() => setView('home')} className="bg-black dark:bg-white text-white dark:text-black px-20 py-8 rounded-full font-black text-2xl hover:scale-110 active:scale-95 transition-all shadow-2xl">استكشف الجديد</button>
               </div>
             ) : (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                 <div className="lg:col-span-2 space-y-10">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedColor.key}-${item.selectedSize}`} className="glass p-12 rounded-[4rem] flex items-center gap-12 shadow-xl group hover:border-brand-gold/20 transition-all border border-transparent">
                         <div className="w-40 h-56 rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl border-4 border-white/10">
                           <ProductImage src={item.selectedColor.image} alt={item.name} className="w-full h-full" />
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-6">
                               <div>
                                  <h3 className="font-black text-3xl mb-3 tracking-tight">{item.name}</h3>
                                  <div className="flex gap-6 text-xs font-black opacity-40 uppercase tracking-[0.2em]">
                                    <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: item.selectedColor.hex }} /> {item.selectedColor.nameAr}</span>
                                    <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">المقاس: {item.selectedSize}</span>
                                  </div>
                               </div>
                               <button onClick={() => removeFromCart(item.id, item.selectedColor.key, item.selectedSize)} className="text-zinc-300 hover:text-red-500 transition-all p-4 hover:bg-red-50 dark:hover:bg-red-950 rounded-full hover:rotate-12"><Trash2 size={32} /></button>
                            </div>
                            <div className="flex justify-between items-center mt-12">
                               <div className="flex items-center gap-10 bg-zinc-100 dark:bg-zinc-800/80 px-10 py-4 rounded-[2rem] shadow-inner">
                                  <button onClick={() => updateQty(item.id, item.selectedColor.key, item.selectedSize, -1)} className="hover:text-brand-gold transition-colors scale-125"><Minus size={20} /></button>
                                  <span className="font-black text-2xl w-8 text-center">{item.qty}</span>
                                  <button onClick={() => updateQty(item.id, item.selectedColor.key, item.selectedSize, 1)} className="hover:text-brand-gold transition-colors scale-125"><Plus size={20} /></button>
                               </div>
                               <span className="font-black text-4xl text-brand-gold tracking-tighter">{item.price * item.qty} ج.م</span>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="glass p-16 rounded-[5rem] h-fit sticky top-32 shadow-3xl border border-white/5">
                    <h3 className="text-4xl font-black mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8 italic tracking-tighter">ملخص الطلب</h3>
                    <div className="space-y-8 mb-16">
                       <div className="flex justify-between font-bold opacity-50 text-xl"><span>المجموع الفرعي</span> <span>{total} ج.م</span></div>
                       <div className="flex justify-between font-bold opacity-50 text-xl"><span>الشحن</span> <span>{total > 500 ? 'مجاني' : '50 ج.م'}</span></div>
                       <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />
                       <div className="flex justify-between text-4xl font-black text-brand-gold pt-2 tracking-tighter"><span>الإجمالي</span> <span>{total + (total > 500 ? 0 : 50)} ج.م</span></div>
                    </div>
                    <button className="w-full bg-brand-gold text-white py-10 rounded-[3rem] font-black text-3xl shadow-2xl shadow-brand-gold/40 hover:scale-[1.03] active:scale-95 transition-all mb-10">إتمام الشراء</button>
                    <div className="flex justify-center gap-8 grayscale opacity-20 contrast-200 scale-110">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-5" alt="Visa" />
                       <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                    </div>
                 </div>
               </div>
             )}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-40 bg-zinc-50 dark:bg-zinc-900/40 mt-40 overflow-hidden relative">
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-20 mb-32 relative z-50">
            <div className="md:col-span-1">
               <div className="flex flex-col mb-12">
                  <span className="text-5xl font-black italic tracking-tighter leading-none uppercase">THREAD</span>
                  <span className="text-sm font-bold opacity-50 tracking-[0.4em] uppercase mt-2">ستايلك، قصتك</span>
               </div>
               <p className="opacity-60 font-bold mb-12 leading-loose text-lg">أول علامة تجارية مصرية تركز على جودة خامات الشارع والروح العصرية للهوية المصرية والخليجية.</p>
               <div className="flex gap-6">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-5 glass rounded-[1.5rem] hover:text-brand-gold hover:scale-110 transition-all shadow-xl"><Instagram size={28} /></a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-5 glass rounded-[1.5rem] hover:text-brand-gold hover:scale-110 transition-all shadow-xl"><Facebook size={28} /></a>
               </div>
            </div>
            <div>
               <h4 className="font-black text-2xl mb-12 italic uppercase tracking-widest text-brand-gold">تواصل معنا</h4>
               <ul className="space-y-8 font-black text-lg opacity-80">
                  <li>
                    <a 
                      href="https://wa.me/201060456161" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="relative z-[60] pointer-events-auto cursor-pointer hover:text-brand-gold transition-all flex items-center gap-4 group"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("https://wa.me/201060456161", "_blank", "noopener,noreferrer");
                      }}
                    >
                      واتساب: <span dir="ltr" className="group-hover:underline underline-offset-4 font-black">+20 1060456161</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="mailto:nasserreem624@gmail.com" 
                      className="relative z-[60] pointer-events-auto cursor-pointer hover:text-brand-gold transition-all underline underline-offset-4"
                      onClick={(e) => { 
                        e.preventDefault();
                        const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=nasserreem624@gmail.com&su=استفسار%20عن%20THREAD&body=مرحباً%20،%20عايز%20استفسر%20عن%20...";
                        window.open(gmailUrl, "_blank", "noopener,noreferrer");
                      }}
                    >
                      nasserreem624@gmail.com
                    </a>
                  </li>
                  <li className="opacity-50">القاهرة، مصر</li>
               </ul>
            </div>
            <div>
               <h4 className="font-black text-2xl mb-12 italic uppercase tracking-widest text-brand-gold">سياساتنا</h4>
               <ul className="space-y-8 font-black text-lg opacity-80">
                  <li><button onClick={() => setView('home')} className="hover:text-brand-gold transition-all">سياسة الاسترجاع</button></li>
                  <li><button onClick={() => setView('home')} className="hover:text-brand-gold transition-all">الشروط والأحكام</button></li>
                  <li><button onClick={() => setView('home')} className="hover:text-brand-gold transition-all">دليل المقاسات</button></li>
               </ul>
            </div>
            <div className="flex flex-col items-center md:items-end justify-center pointer-events-none">
               <span className="text-8xl font-black italic opacity-5 tracking-tighter uppercase leading-none mb-6">THREAD</span>
               <p className="text-xs font-black opacity-10 uppercase tracking-[0.8em]">Your Style, Your Story</p>
            </div>
         </div>
         <div className="container mx-auto px-4 text-center border-t border-zinc-200 dark:border-zinc-800 pt-20 text-xs font-black opacity-20 tracking-[0.4em] relative z-50">
            © 2024 THREAD EGYPT. ALL RIGHTS RESERVED. DESIGNED FOR EXPRESSION.
         </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/201060456161" 
        target="_blank" 
        rel="noreferrer" 
        aria-label="تواصل واتساب"
        onClick={(e) => {
          e.preventDefault();
          window.open("https://wa.me/201060456161", "_blank", "noopener,noreferrer");
        }}
        className="fixed bottom-12 left-12 bg-[#25D366] text-white p-7 rounded-full shadow-3xl z-[110] hover:scale-110 active:scale-90 transition-all hover:rotate-6"
      >
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
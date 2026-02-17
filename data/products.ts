export interface ColorVariant {
  nameAr: string;
  key: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  colors: ColorVariant[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  category: 'men' | 'women';
}

export const PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: 'Cargo Pants - Khaki',
    price: 379,
    originalPrice: 499,
    badge: 'جديد',
    colors: [
      { nameAr: 'خاكي', key: 'khaki', hex: '#C3B091', image: 'https://images.unsplash.com/photo-1517441167426-261138945b6f?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'أسود', key: 'black', hex: '#111111', image: 'https://images.unsplash.com/photo-1551834231-38a6a67f673e?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'زيتوني', key: 'olive', hex: '#556B2F', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.5,
    reviews: 145,
    description: 'بنطلون كارغو عصري بجيوب جانبية وتصميم متين يناسب المغامرات اليومية.',
    category: 'men'
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
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 567,
    description: 'طقم مكون من 3 تيشرتات قطنية أساسية بجودة عالية وألوان محايدة تناسب كل يوم.',
    category: 'men'
  },
  {
    id: 'm3',
    name: 'Slim Fit Jeans - Dark Blue',
    price: 449,
    originalPrice: 549,
    colors: [
      { nameAr: 'أزرق داكن', key: 'dark-blue', hex: '#1E293B', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'أزرق فاتح', key: 'light-blue', hex: '#60A5FA', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    rating: 4.6,
    reviews: 189,
    description: 'بنطلون جينز سليم فيت بجودة ممتازة ومرونة مريحة للحركة اليومية.',
    category: 'men'
  },
  {
    id: 'w1',
    name: 'Oversized Hoodie - Black',
    price: 399,
    originalPrice: 499,
    badge: 'الأكثر طلباً',
    colors: [
      { nameAr: 'أسود', key: 'black', hex: '#111111', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'رمادي', key: 'gray', hex: '#6B7280', image: 'https://images.unsplash.com/photo-1556821840-b8042452441c?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'بيج', key: 'beige', hex: '#D6C4A8', image: 'https://images.unsplash.com/photo-1556821840-3b95764d7c64?q=80&w=800&auto=format&fit=crop' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 234,
    description: 'هودي قطني مريح بتصميم عصري واسع (Oversized) مثالي للإطلالات اليومية المريحة.',
    category: 'women'
  },
  {
    id: 'w2',
    name: 'High-Waist Mom Jeans',
    price: 429,
    colors: [
      { nameAr: 'أزرق فاتح', key: 'light-blue', hex: '#93C5FD', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'أزرق داكن', key: 'dark-blue', hex: '#1E40AF', image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop' }
    ],
    sizes: ['26', '28', '30', '32', '34'],
    rating: 4.7,
    reviews: 298,
    description: 'بنطلون جينز "موم" بخصر مرتفع وقصة كلاسيكية مريحة تبرز جمال القوام.',
    category: 'women'
  },
  {
    id: 'w3',
    name: 'Oversized Sweater - Beige',
    price: 349,
    badge: 'تريند',
    colors: [
      { nameAr: 'بيج', key: 'beige', hex: '#D6C4A8', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'وردي', key: 'pink', hex: '#F9A8D4', image: 'https://images.unsplash.com/photo-1603939016319-f9874483ff9e?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'رمادي', key: 'gray', hex: '#6B7280', image: 'https://images.unsplash.com/photo-1611312449412-6cefac56399e?q=80&w=800&auto=format&fit=crop' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 412,
    description: 'سويتر ناعم بتصميم فضفاض وألوان هادئة لإطلالة شتوية أنيقة.',
    category: 'women'
  },
  {
    id: 'w4',
    name: 'Cropped Hoodie - Pink',
    price: 329,
    colors: [
      { nameAr: 'وردي', key: 'pink', hex: '#F9A8D4', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'أبيض', key: 'white', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'أسود', key: 'black', hex: '#111111', image: 'https://images.unsplash.com/photo-1509948943863-ad2d0d216995?q=80&w=800&auto=format&fit=crop' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.6,
    reviews: 187,
    description: 'هودي قصير (Cropped) خفيف الوزن وناعم الملمس بلون وردي مبهج.',
    category: 'women'
  },
  {
    id: 'w5',
    name: 'Maxi Dress - Floral',
    price: 499,
    badge: 'وصل حديثاً',
    colors: [
      { nameAr: 'زهري', key: 'pink-floral', hex: '#FDA4AF', image: 'https://images.unsplash.com/photo-1572804013307-f9615c127160?q=80&w=800&auto=format&fit=crop' },
      { nameAr: 'أزرق', key: 'blue-floral', hex: '#93C5FD', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 156,
    description: 'فستان ماكسي طويل بنقشات الزهور الربيعية لإطلالة أنثوية ناعمة ومحتشمة.',
    category: 'women'
  }
];
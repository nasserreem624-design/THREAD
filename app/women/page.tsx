
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function WomenPage() {
  const products = PRODUCTS.filter(p => p.category === 'women');
  
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="mb-16">
        <h1 className="text-5xl font-black mb-4 italic uppercase tracking-tighter">التشكيلة النسائية <span className="text-brand-gold">Women</span></h1>
        <p className="text-xl opacity-60 font-bold">إطلالات عصرية تجمع بين الراحة والتميز، من الجينز الموم للسويترز الأنيقة.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

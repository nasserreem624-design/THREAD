
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function MenPage() {
  const products = PRODUCTS.filter(p => p.category === 'men');
  
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="mb-16">
        <h1 className="text-5xl font-black mb-4 italic uppercase tracking-tighter">التشكيلة الرجالية <span className="text-brand-gold">Men</span></h1>
        <p className="text-xl opacity-60 font-bold">استكشف أحدث الملابس الأساسية والكارغو والهوديز المصممة للراحة والستايل.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

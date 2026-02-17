
export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl">
      <h1 className="text-4xl font-black mb-10">الشروط والأحكام</h1>
      <div className="prose prose-lg dark:prose-invert font-medium opacity-80 flex flex-col gap-6">
        <p>باستخدامك لموقع THREAD، فأنت توافق على الشروط التالية:</p>
        <h2 className="text-2xl font-black text-current">1. التسجيل والطلبات</h2>
        <p>يجب تقديم معلومات دقيقة وصحيحة عند إتمام الطلب لضمان التوصيل السليم.</p>
        <h2 className="text-2xl font-black text-current">2. الأسعار والدفع</h2>
        <p>جميع الأسعار موضحة بالجنيه المصري (أو العملة المحلية المحددة) وتشمل الضرائب السارية.</p>
        <h2 className="text-2xl font-black text-current">3. حقوق الملكية</h2>
        <p>جميع التصاميم والعلامات التجارية الموجودة على الموقع هي ملك حصري لـ THREAD.</p>
      </div>
    </div>
  );
}

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl">
      <h1 className="text-4xl font-black mb-10">سياسة التبديل والاسترجاع</h1>
      <div className="prose prose-lg dark:prose-invert font-medium opacity-80 flex flex-col gap-6">
        <p>راحتك تهمنا، وعشان كدة وفرنا سياسة مرنة جداً:</p>
        <h2 className="text-2xl font-black text-current">مدة الإرجاع</h2>
        <p>يمكنك طلب التبديل أو الاسترجاع خلال 14 يوم من تاريخ استلام الطلب.</p>
        <h2 className="text-2xl font-black text-current">شروط المنتجات</h2>
        <ul className="list-disc pr-6 flex flex-col gap-2">
          <li>أن يكون المنتج في حالته الأصلية.</li>
          <li>عدم إزالة التيكيت أو الملصقات الأصلية.</li>
          <li>وجود الفاتورة الأصلية أو رقم الطلب.</li>
        </ul>
        <h2 className="text-2xl font-black text-current">طريقة الطلب</h2>
        <p>تواصل معنا عبر واتساب على الرقم 01060456161 لتقديم طلب المرتجع.</p>
      </div>
    </div>
  );
}
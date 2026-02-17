
export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl">
      <h1 className="text-4xl font-black mb-10">سياسة الخصوصية</h1>
      <div className="prose prose-lg dark:prose-invert font-medium opacity-80 flex flex-col gap-6">
        <p>نحن في THREAD نلتزم بحماية خصوصيتك ومعلوماتك الشخصية. توضح هذه الصفحة كيف نقوم بجمع واستخدام وحماية البيانات التي تقدمها لنا.</p>
        <h2 className="text-2xl font-black text-current">1. جمع المعلومات</h2>
        <p>نقوم بجمع المعلومات اللازمة فقط لإتمام عملية الشراء وتوصيل المنتجات إليك، مثل الاسم، العنوان، ورقم الهاتف.</p>
        <h2 className="text-2xl font-black text-current">2. استخدام البيانات</h2>
        <p>تُستخدم بياناتك لتحسين تجربتك في التسوق، معالجة الطلبات، والتواصل معك بشأن التحديثات أو العروض (في حال اشتركت في النشرة البريدية).</p>
        <h2 className="text-2xl font-black text-current">3. أمان المعلومات</h2>
        <p>نستخدم تقنيات تشفير متطورة لضمان أمان بيانات الدفع والبيانات الشخصية.</p>
      </div>
    </div>
  );
}

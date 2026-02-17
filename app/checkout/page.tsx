"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, CreditCard, Truck, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProductImage } from '@/components/ProductImage';

export default function CheckoutPage() {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'info' | 'success'>('cart');

  const shippingFee = total > 500 ? 0 : 50;
  const finalTotal = total + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <CheckCircle2 size={100} className="text-green-500 mb-8" />
        <h1 className="text-4xl font-black mb-4 italic">تم استلام طلبك بنجاح!</h1>
        <p className="text-xl opacity-60 mb-8 max-w-lg font-bold">رقم الطلب الخاص بك هو <span className="text-brand-gold font-black">TRD-74291</span>. سيقوم فريقنا بالتواصل معك قريباً لتأكيد الأوردر.</p>
        <Link href="/" onClick={() => clearCart()} className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-2xl font-black text-lg shadow-lg">العودة للرئيسية</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-40 flex flex-col items-center text-center">
        <h1 className="text-4xl font-black mb-6 italic">حقيبة التسوق فارغة</h1>
        <p className="opacity-60 mb-10 font-bold">لسه مفيش قطع في شنطتك. استكشف مجموعتنا وابدأ قصتك دلوقتي.</p>
        <Link href="/" className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-2xl font-black text-lg">تسوق الآن</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Content */}
        <div className="lg:w-2/3">
          {step === 'cart' ? (
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl font-black mb-4 italic">حقيبة التسوق ({cart.length})</h1>
              {cart.map(item => {
                const variantColor = item.colors.find(c => c.key === item.selectedColorKey);
                return (
                  <div key={`${item.id}-${item.selectedColorKey}-${item.selectedSize}`} className="glass p-6 rounded-[2.5rem] flex items-center gap-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
                    <div className="w-24 h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
                      <ProductImage src={variantColor?.image || item.colors[0].image} alt={item.name} className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-black text-lg">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedColorKey, item.selectedSize)}
                          className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex gap-4 text-[10px] font-black opacity-50 mb-4 uppercase">
                        <span>اللون: {variantColor?.nameAr}</span>
                        <span>المقاس: {item.selectedSize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl">
                          <button onClick={() => updateQuantity(item.id, item.selectedColorKey, item.selectedSize, -1)}><Minus size={16} /></button>
                          <span className="font-black w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.selectedColorKey, item.selectedSize, 1)}><Plus size={16} /></button>
                        </div>
                        <span className="text-xl font-black text-brand-gold">{item.price * item.quantity} ج.م</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button 
                onClick={() => setStep('info')}
                className="mt-8 bg-black dark:bg-white text-white dark:text-black py-6 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 hover:opacity-90 transition-opacity shadow-lg"
              >
                <span>الاستمرار لبيانات الشحن</span>
                <ArrowRight size={24} className="rotate-180" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 glass p-10 rounded-[3rem]">
              <h2 className="text-3xl font-black mb-4 italic">بيانات التوصيل</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required placeholder="الاسم بالكامل" type="text" className="bg-zinc-100 dark:bg-zinc-800 p-5 rounded-2xl font-bold focus:ring-2 focus:ring-brand-gold outline-none" />
                <input required placeholder="رقم الهاتف" type="tel" className="bg-zinc-100 dark:bg-zinc-800 p-5 rounded-2xl font-bold focus:ring-2 focus:ring-brand-gold outline-none" />
                <input required placeholder="العنوان بالتفصيل" type="text" className="bg-zinc-100 dark:bg-zinc-800 p-5 rounded-2xl font-bold focus:ring-2 focus:ring-brand-gold outline-none md:col-span-2" />
                <select className="bg-zinc-100 dark:bg-zinc-800 p-5 rounded-2xl font-bold focus:ring-2 focus:ring-brand-gold outline-none appearance-none">
                  <option>القاهرة</option><option>الجيزة</option><option>الإسكندرية</option><option>أخرى</option>
                </select>
                <textarea placeholder="ملاحظات إضافية" className="bg-zinc-100 dark:bg-zinc-800 p-5 rounded-2xl font-bold focus:ring-2 focus:ring-brand-gold outline-none h-32 md:col-span-2"></textarea>
              </div>
              <button type="submit" className="mt-8 bg-brand-gold text-white py-6 rounded-[2rem] font-black text-2xl shadow-xl shadow-brand-gold/20 hover:opacity-90 transition-opacity">إتمام الشراء الآن</button>
            </form>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:w-1/3">
          <div className="glass p-10 rounded-[3rem] sticky top-32 shadow-xl border border-white/20">
            <h2 className="text-2xl font-black mb-8 italic">ملخص الطلب</h2>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between items-center opacity-70 font-bold"><span>المجموع</span><span>{total} ج.م</span></div>
              <div className="flex justify-between items-center opacity-70 font-bold"><span>الشحن</span><span>{shippingFee === 0 ? 'مجاني' : `${shippingFee} ج.م`}</span></div>
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2"></div>
              <div className="flex justify-between items-center text-2xl font-black text-brand-gold"><span>الإجمالي</span><span>{finalTotal} ج.م</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
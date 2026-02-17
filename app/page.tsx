
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";
// Fix: Added missing icon imports for Facebook and Instagram
import { ArrowLeft, ChevronLeft, Truck, ShieldCheck, RefreshCcw, Star, Download, Send, Facebook, Instagram } from "lucide-react";

export default function Home() {
  const menProducts = PRODUCTS.filter(p => p.category === 'men');
  const womenProducts = PRODUCTS.filter(p => p.category === 'women');

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      {/* Trust Bar */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="glass p-8 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-8 shadow-2xl border-white/20">
          <div className="flex items-center gap-4">
            <div className="bg-brand-gold/10 p-3 rounded-2xl text-brand-gold"><Truck size={28} /></div>
            <div>
              <h4 className="font-bold">توصيل سريع</h4>
              <p className="text-xs opacity-60">خلال 48 ساعة لمعظم المناطق</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-brand-gold/10 p-3 rounded-2xl text-brand-gold"><ShieldCheck size={28} /></div>
            <div>
              <h4 className="font-bold">دفع آمن</h4>
              <p className="text-xs opacity-60">خيارات دفع متعددة وتقسيط</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-brand-gold/10 p-3 rounded-2xl text-brand-gold"><RefreshCcw size={28} /></div>
            <div>
              <h4 className="font-bold">إرجاع مجاني</h4>
              <p className="text-xs opacity-60">خلال 14 يوم من الاستلام</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-brand-gold/10 p-3 rounded-2xl text-brand-gold"><Star size={28} /></div>
            <div>
              <h4 className="font-bold">جودة مضمونة</h4>
              <p className="text-xs opacity-60">+50,000 عميل يثق بنا</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/men" className="group relative h-[500px] overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Men Category" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-4xl font-black text-white mb-4">التشكيلة الرجالية</h2>
            <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
              <span>تسوق الآن</span>
              <ArrowLeft size={20} />
            </div>
          </div>
        </Link>
        <Link href="/women" className="group relative h-[500px] overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Women Category" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-4xl font-black text-white mb-4">التشكيلة النسائية</h2>
            <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
              <span>تسوق الآن</span>
              <ArrowLeft size={20} />
            </div>
          </div>
        </Link>
      </section>

      {/* Men Section */}
      <section id="men" className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">الرجالي <span className="text-brand-gold">Men</span></h2>
            <p className="opacity-60 font-bold">الأكثر طلباً هذا الموسم</p>
          </div>
          <Link href="/men" className="text-brand-gold font-bold flex items-center gap-2">عرض الكل <ChevronLeft size={16} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {menProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Women Section */}
      <section id="women" className="container mx-auto px-4 bg-zinc-50 dark:bg-zinc-900/30 py-20 -mx-4 px-8 rounded-[4rem]">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">النسائي <span className="text-brand-gold">Women</span></h2>
            <p className="opacity-60 font-bold">إطلالات عصرية ومتميزة</p>
          </div>
          <Link href="/women" className="text-brand-gold font-bold flex items-center gap-2">عرض الكل <ChevronLeft size={16} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {womenProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Size Guide Info */}
      <section id="size-guide" className="container mx-auto px-4">
        <div className="glass p-12 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 border-2 border-brand-gold/10">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-black mb-6">دليل المقاسات الذكي</h2>
            <p className="text-lg opacity-80 mb-8 font-medium leading-relaxed">
              مش متأكد من مقاسك؟ وفرنا لك دليل تفصيلي لكل قطعة عشان تطلب وأنت مطمن. 
              ولو لسه محتار، فريقنا متاح على واتساب للمساعدة في اختيار المقاس المثالي.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://wa.me/201060456161?text=مرحباً%20عايز%20استفسر%20عن%20المقاس" className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black">اسأل عن المقاس</Link>
              <button className="border-2 border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-2xl font-black">عرض الجدول</button>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700">
              <span className="text-4xl mb-4 block">📏</span>
              <h4 className="font-bold mb-2">قياس دقيق</h4>
              <p className="text-sm opacity-60">كل قطعة بنقيسها بدقة عشان نضمن راحتك.</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700">
              <span className="text-4xl mb-4 block">🔄</span>
              <h4 className="font-bold mb-2">تبديل سهل</h4>
              <p className="text-sm opacity-60">المقاس مجاش مظبوط؟ بنبدلهولك في أسرع وقت.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">الأسئلة الشائعة</h2>
          <p className="opacity-60 font-bold">كل اللي محتاج تعرفه عن THREAD</p>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {[
            { q: "إيه هي مدة التوصيل؟", a: "التوصيل بياخد من يومين لـ 3 أيام عمل لمعظم المحافظات." },
            { q: "إزاي أقدر أبدل أو أرجع الأوردر؟", a: "تقدر تبدل أو ترجع خلال 14 يوم من الاستلام، بشرط تكون القطعة بحالتها الأصلية وبكل التيكيتات." },
            { q: "هل في مصاريف شحن؟", a: "الشحن مجاني للأوردرات فوق الـ 500 جنيه، وغير كدة بيبقى 50 جنيه." },
            { q: "إيه طرق الدفع المتاحة؟", a: "متاح الدفع عند الاستلام، الفيزا، فوري، وتقسيط من خلال (ValU, Tamara, سهلة)." },
            { q: "إزاي أعرف مقاسي المظبوط؟", a: "تقدر تشوف دليل المقاسات الموجود في صفحة كل منتج، أو تبعت لنا على واتساب (01060456161) وهنساعدك." },
            { q: "هل القطع قطن 100%؟", a: "معظم منتجاتنا مصنعة من القطن المصري الفاخر بنسبة 100% أو بمزيج عالي الجودة لضمان الراحة والمتانة." }
          ].map((item, idx) => (
            <details key={idx} className="group glass rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <summary className="p-6 cursor-pointer font-bold text-lg flex justify-between items-center list-none">
                {item.q}
                <ChevronLeft size={20} className="transition-transform group-open:-rotate-90" />
              </summary>
              <div className="p-6 pt-0 opacity-70 font-medium leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* App Download */}
      <section className="container mx-auto px-4">
        <div className="bg-brand-gold p-12 md:p-24 rounded-[4rem] flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
          <div className="md:w-1/2 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">تسوق أسرع مع تطبيق THREAD</h2>
            <p className="text-xl mb-10 font-bold opacity-90 leading-relaxed">
              احصل على خصومات حصرية، تنبيهات بأحدث التشكيلات، وتتبع طلبك لحظة بلحظة.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black px-8 py-4 rounded-2xl flex items-center gap-4 hover:scale-105 transition-transform">
                <Download size={24} />
                <div className="text-right">
                  <div className="text-[10px] opacity-60">تحميل من</div>
                  <div className="font-black">App Store</div>
                </div>
              </button>
              <button className="bg-black px-8 py-4 rounded-2xl flex items-center gap-4 hover:scale-105 transition-transform">
                <Download size={24} />
                <div className="text-right">
                  <div className="text-[10px] opacity-60">تحميل من</div>
                  <div className="font-black">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
             <div className="w-64 h-[500px] bg-black rounded-[3rem] border-8 border-zinc-900 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-900 flex justify-center items-center">
                  <div className="w-16 h-4 bg-zinc-800 rounded-full"></div>
                </div>
                <div className="p-4 pt-10 text-white">
                  <div className="text-xl font-black mb-4">THREAD</div>
                  <div className="w-full aspect-square bg-zinc-800 rounded-2xl mb-4 shimmer-bg"></div>
                  <div className="h-4 w-3/4 bg-zinc-800 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-zinc-800 rounded"></div>
                </div>
             </div>
             {/* Decorative element */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="contact" className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-6">انضم لعائلة THREAD</h2>
          <p className="text-lg opacity-60 mb-10 font-bold">اشترك في النشرة البريدية واحصل على خصم 15% على أول طلب وأخبار حصرية.</p>
          <form className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني" 
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 px-8 py-5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
            />
            <button className="bg-brand-gold text-white px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <span>اشترك الآن</span>
              <Send size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 pt-20 overflow-hidden relative">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-20">
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="flex flex-col mb-6">
                <span className="text-3xl font-black tracking-tighter leading-none italic uppercase">THREAD</span>
                <span className="text-[12px] font-bold opacity-70 tracking-widest">ستايلك، قصتك</span>
              </Link>
              <p className="opacity-60 font-medium mb-6">علامة تجارية مصرية رائدة في ملابس الشارع (Streetwear) تهدف للدمج بين الجودة العالمية والروح المصرية.</p>
              <div className="flex gap-4">
                <Link href="https://facebook.com" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:text-brand-gold transition-colors"><Facebook size={20} /></Link>
                <Link href="https://instagram.com" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:text-brand-gold transition-colors"><Instagram size={20} /></Link>
                <Link href="https://tiktok.com" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:text-brand-gold transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.17-1.35 1.97-.08.64.08 1.3.45 1.84.5.62 1.31.98 2.09.98 1.02-.01 1.93-.74 2.19-1.72.13-.51.13-1.05.13-1.58.02-3.87.01-7.74.01-11.61z"/>
                  </svg>
                </Link>
              </div>
          </div>
          <div>
            <h4 className="font-black text-xl mb-6">روابط سريعة</h4>
            <ul className="flex flex-col gap-4 opacity-70 font-bold">
              <li><Link href="/men" className="hover:text-brand-gold">رجالي</Link></li>
              <li><Link href="/women" className="hover:text-brand-gold">نسائي</Link></li>
              <li><Link href="/#new" className="hover:text-brand-gold">وصل حديثاً</Link></li>
              <li><Link href="/#sale" className="hover:text-brand-gold">تخفيضات</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl mb-6">الدعم والسياسات</h4>
            <ul className="flex flex-col gap-4 opacity-70 font-bold">
              <li><Link href="/privacy" className="hover:text-brand-gold">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="hover:text-brand-gold">الشروط والأحكام</Link></li>
              <li><Link href="/returns" className="hover:text-brand-gold">سياسة التبديل والاسترجاع</Link></li>
              <li><Link href="/#faq" className="hover:text-brand-gold">الأسئلة الشائعة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl mb-6">تواصل معنا</h4>
            <ul className="flex flex-col gap-4 opacity-70 font-bold relative z-30">
              <li>واتساب: <a 
                href="https://wa.me/201060456161" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open("https://wa.me/201060456161", "_blank", "noopener,noreferrer");
                }}
                className="hover:text-brand-gold transition-colors font-black"
              >01060456161</a></li>
              <li>إيميل: <a 
                href="mailto:nasserreem624@gmail.com" 
                className="hover:text-brand-gold transition-all underline underline-offset-4"
                onClick={(e) => { 
                  e.preventDefault();
                  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=nasserreem624@gmail.com&su=استفسار%20عن%20THREAD&body=مرحباً%20،%20عايز%20استفسر%20عن%20...";
                  window.open(gmailUrl, "_blank", "noopener,noreferrer");
                }}
              >nasserreem624@gmail.com</a></li>
              <li>المقر: القاهرة، مصر</li>
              <li className="text-sm italic opacity-50 mt-4 font-normal tracking-wide">"Your Style, Your Story"</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-10 flex flex-col md:flex-row items-center justify-between opacity-50 text-xs font-bold gap-4 relative z-20">
          <p>© 2024 THREAD Store. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 filter grayscale contrast-0" alt="Visa" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 filter grayscale contrast-0" alt="Mastercard" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 filter grayscale contrast-0" alt="PayPal" />
          </div>
        </div>
      </footer>
    </div>
  );
}

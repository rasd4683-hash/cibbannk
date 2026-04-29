import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  Gift,
  CreditCard,
  Shield,
  Clock,
  Smartphone,
  Wallet,
  Sparkles,
  MessageCircle,
  X,
} from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  Icon: typeof Gift;
  iconClass: string;
}

const FAQS: FaqItem[] = [
  {
    id: "q1",
    question: "كيف أحصل على الساعة الذكية المجانية؟",
    answer:
      "ادخل على صفحة الساعات، اختر الساعة التي تعجبك من بين 9 تصاميم فاخرة، ثم سجّل بياناتك واتبع خطوات التفعيل. سيتم شحن الساعة مجاناً إلى عنوانك خلال 5-7 أيام عمل دون أي رسوم إضافية.",
    category: "العروض",
    Icon: Gift,
    iconClass: "from-emerald-500 to-emerald-600",
  },
  {
    id: "q2",
    question: "هل هناك رسوم سنوية على البطاقة؟",
    answer:
      "بطاقة CIB الذهبية بدون رسوم سنوية في السنة الأولى تماماً. كما تحصل على كاش باك حتى 5% على جميع مشترياتك، بالإضافة إلى عروض حصرية لدى آلاف المتاجر الشريكة محلياً ودولياً.",
    category: "البطاقات",
    Icon: CreditCard,
    iconClass: "from-amber-500 to-orange-600",
  },
  {
    id: "q3",
    question: "هل بياناتي ومعلوماتي البنكية آمنة؟",
    answer:
      "نعم، نستخدم أحدث تقنيات التشفير المصرفي بمعيار 256-bit SSL، مع حماية ثنائية التحقق (2FA) على جميع المعاملات. بياناتك محمية بأعلى معايير الأمان العالمية ولا تتم مشاركتها مع أي طرف ثالث.",
    category: "الأمان",
    Icon: Shield,
    iconClass: "from-blue-500 to-indigo-600",
  },
  {
    id: "q4",
    question: "كم تستغرق عملية تفعيل البطاقة؟",
    answer:
      "تستغرق عملية التفعيل من 2 إلى 5 دقائق فقط عبر الموقع. بعد إدخال بياناتك سيتواصل معك فريق الدعم لتأكيد الطلب وإتمام التفعيل بشكل فوري وآمن.",
    category: "التفعيل",
    Icon: Clock,
    iconClass: "from-purple-500 to-pink-600",
  },
  {
    id: "q5",
    question: "هل يمكنني استخدام البطاقة دولياً؟",
    answer:
      "نعم، بطاقتك مدعومة من Visa و MasterCard وتعمل في أكثر من 200 دولة حول العالم. يمكنك استخدامها في الشراء عبر الإنترنت، السحب من ماكينات ATM، والدفع المباشر في أي متجر يقبل البطاقات الدولية.",
    category: "الاستخدام",
    Icon: Smartphone,
    iconClass: "from-cyan-500 to-blue-600",
  },
  {
    id: "q6",
    question: "ما الحد الأدنى للإيداع لفتح الحساب؟",
    answer:
      "لا يوجد حد أدنى للإيداع لفتح حسابك. يمكنك البدء بأي مبلغ تريده والاستفادة من جميع المزايا مباشرة، بما في ذلك التحويلات المجانية والكاش باك على المشتريات.",
    category: "الحسابات",
    Icon: Wallet,
    iconClass: "from-rose-500 to-red-600",
  },
  {
    id: "q7",
    question: "كيف أتواصل مع خدمة العملاء؟",
    answer:
      "خدمة عملائنا متاحة 24/7 عبر الموقع والتطبيق. كما يمكنك التواصل عبر الخط الساخن أو زيارة أقرب فرع. متوسط زمن الاستجابة أقل من دقيقتين.",
    category: "الدعم",
    Icon: MessageCircle,
    iconClass: "from-teal-500 to-emerald-600",
  },
  {
    id: "q8",
    question: "هل يمكنني تغيير اختياري للساعة بعد الطلب؟",
    answer:
      "نعم، يمكنك تغيير اختيار الساعة قبل بدء عملية الشحن بالتواصل مع خدمة العملاء. بعد الشحن لا يمكن تغيير الاختيار، لكن يمكنك الاستفادة من سياسة الاستبدال خلال 14 يوماً من الاستلام.",
    category: "العروض",
    Icon: Sparkles,
    iconClass: "from-violet-500 to-purple-600",
  },
];

const FaqSection = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return FAQS;
    return FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(term) ||
        f.answer.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <section className="py-14 px-4 relative z-10 bg-gradient-to-b from-transparent via-card/30 to-transparent">
      {/* Decorative orbs */}
      <div className="absolute top-10 -right-20 w-72 h-72 orb orb-primary opacity-15 pointer-events-none animate-orb-float" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 orb orb-accent opacity-10 pointer-events-none animate-orb-float-delay" />

      <div className="container mx-auto max-w-4xl relative">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <HelpCircle className="w-3 h-3 text-primary" />
            <span className="text-[11px] font-bold text-primary">الأسئلة الشائعة</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
            كل ما تحتاج معرفته
          </h2>
          <p className="text-sm text-muted-foreground">
            إجابات سريعة على أكثر الأسئلة شيوعاً من عملائنا
          </p>
          <div className="w-16 h-1 hero-gradient rounded-full mx-auto mt-3" />
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن سؤالك..."
            className="w-full bg-card/80 backdrop-blur-md border border-border/60 rounded-2xl pr-10 pl-10 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all card-shadow"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
              aria-label="مسح البحث"
            >
              <X className="w-3 h-3 text-foreground" />
            </button>
          )}
        </div>

        {/* Accordion */}
        {filtered.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((faq, i) => {
              const Icon = faq.Icon;
              return (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="group bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden card-shadow hover:card-hover-shadow transition-all duration-300 hover:-translate-y-0.5 data-[state=open]:border-primary/50 data-[state=open]:shadow-[0_8px_30px_hsl(213_76%_44%/0.15)]"
                  style={{
                    animation: `faqFadeIn 0.4s ease-out ${i * 60}ms backwards`,
                  }}
                >
                  <AccordionTrigger className="px-4 md:px-5 py-4 hover:no-underline group/trigger">
                    <div className="flex items-center gap-3 flex-1 text-right">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${faq.iconClass} flex items-center justify-center shadow-button group-data-[state=open]/trigger:scale-110 group-data-[state=open]/trigger:rotate-3 transition-all duration-300`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] font-bold text-muted-foreground mb-0.5">
                          {faq.category}
                        </span>
                        <h3 className="text-sm md:text-base font-extrabold text-foreground leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-5 pb-4">
                    <div className="pr-13 mr-13 relative pt-1">
                      {/* Connector line */}
                      <div className={`absolute right-5 -top-1 bottom-0 w-px bg-gradient-to-b ${faq.iconClass} opacity-30`} />
                      <div className="bg-muted/40 border border-border/40 rounded-xl p-3.5 mr-13" style={{ marginRight: "3.25rem" }}>
                        <p className="text-xs md:text-sm text-foreground/85 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-extrabold text-foreground mb-1">لا توجد نتائج</h3>
            <p className="text-xs text-muted-foreground mb-4">
              جرّب البحث بكلمات أخرى أو تصفّح جميع الأسئلة
            </p>
            <button
              onClick={() => setSearch("")}
              className="hero-gradient text-primary-foreground text-xs font-bold px-5 py-2 rounded-full shadow-button hover:scale-105 transition-transform"
            >
              عرض جميع الأسئلة
            </button>
          </div>
        )}

        {/* CTA contact */}
        <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50 p-5 md:p-6 card-shadow">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl hero-gradient flex items-center justify-center shadow-button flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-foreground">لم تجد إجابة لسؤالك؟</h3>
                <p className="text-xs text-muted-foreground">فريق الدعم متاح 24/7 للرد على استفساراتك</p>
              </div>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 hero-gradient text-primary-foreground font-bold text-xs px-5 py-2.5 rounded-full shadow-button hover:shadow-[0_8px_25px_hsl(213_76%_44%/0.35)] transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              تواصل معنا
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes faqFadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default FaqSection;

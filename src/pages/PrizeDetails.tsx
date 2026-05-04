import { Link, useParams, Navigate } from "react-router-dom";
import { Smartphone, Tv, Banknote, Gift, CalendarClock, Ticket, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Trophy } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type PrizeKey = "phones" | "appliances" | "cash";

const PRIZES: Record<PrizeKey, {
  icon: any;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  eligibility: string[];
  howToWin: string[];
  grad: string;
}> = {
  phones: {
    icon: Smartphone,
    title: "هواتف ذكية",
    tagline: "أحدث الهواتف من أشهر الماركات العالمية",
    description:
      "اربح أحدث إصدارات الهواتف الذكية من ماركات عالمية رائدة، تُسلَّم لك أصلية بضمان الوكيل الرسمي ومجاناً بالكامل.",
    items: [
      "iPhone 15 Pro Max",
      "Samsung Galaxy S24 Ultra",
      "Huawei Mate 60 Pro",
      "Google Pixel 8 Pro",
    ],
    eligibility: [
      "أن تكون عميلاً لدى البنك التجاري الدولي CIB",
      "تفعيل البطاقة البنكية بنجاح",
      "اكتمال بياناتك الشخصية في الحساب",
    ],
    howToWin: [
      "يتم اشتراكك تلقائياً في السحب الشهري عند تفعيل البطاقة",
      "يُجرى السحب في بداية كل شهر تحت إشراف لجنة رسمية",
      "يتم التواصل مع الفائز عبر الهاتف المسجّل في البنك",
      "تسليم الجائزة خلال 7 أيام عمل من تاريخ الإعلان",
    ],
    grad: "from-primary to-primary/60",
  },
  appliances: {
    icon: Tv,
    title: "أجهزة كهربائية",
    tagline: "أجهزة منزلية متكاملة لراحة عائلتك",
    description:
      "مجموعة واسعة من الأجهزة الكهربائية والمنزلية الفاخرة من علامات تجارية موثوقة، تُسلَّم إلى عنوانك مجاناً.",
    items: [
      "شاشات سمارت 65 بوصة",
      "ثلاجات نوفروست",
      "غسالات أوتوماتيكية",
      "مكيفات هواء سبليت",
      "أجهزة مطبخ متكاملة",
    ],
    eligibility: [
      "أن تكون عميلاً لدى البنك التجاري الدولي CIB",
      "تفعيل البطاقة البنكية بنجاح",
      "استخدام البطاقة في معاملة واحدة على الأقل",
    ],
    howToWin: [
      "اشتراك تلقائي في السحب الدوري لكل عميل مؤهل",
      "السحب يُجرى كل شهرين تحت إشراف لجنة رسمية",
      "الإعلان عن الفائزين عبر القنوات الرسمية للبنك",
      "توصيل مجاني للجائزة حتى باب المنزل",
    ],
    grad: "from-accent to-accent/60",
  },
  cash: {
    icon: Banknote,
    title: "جوائز مالية",
    tagline: "مبالغ نقدية تُودَع مباشرةً في حسابك",
    description:
      "اربح مبالغ نقدية قيّمة تُحوّل مباشرة إلى حسابك البنكي خلال ساعات من إعلان النتائج، دون أي رسوم أو خصومات.",
    items: [
      "الجائزة الكبرى: 100,000 جنيه",
      "الجائزة الثانية: 50,000 جنيه",
      "الجائزة الثالثة: 25,000 جنيه",
      "10 جوائز تشجيعية بقيمة 5,000 جنيه",
    ],
    eligibility: [
      "أن تكون عميلاً نشطاً لدى البنك التجاري الدولي CIB",
      "تفعيل البطاقة البنكية بنجاح",
      "الحفاظ على حساب نشط دون إيقاف",
    ],
    howToWin: [
      "كل عميل CIB مؤهل تلقائياً عند تفعيل بطاقته",
      "سحب شهري على الجوائز المالية",
      "إيداع المبلغ مباشرة في حسابك البنكي خلال 24 ساعة",
      "إشعار فوري عبر الرسائل النصية والبريد الإلكتروني",
    ],
    grad: "from-primary via-accent to-primary",
  },
};

const PrizeDetails = () => {
  const { category } = useParams<{ category: PrizeKey }>();
  if (!category || !(category in PRIZES)) return <Navigate to="/" replace />;

  const prize = PRIZES[category];
  const Icon = prize.icon;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <div className="fixed top-20 -right-20 w-72 h-72 orb orb-primary opacity-30 pointer-events-none animate-orb-float" />
      <div className="fixed bottom-40 -left-20 w-80 h-80 orb orb-purple opacity-25 pointer-events-none animate-orb-float-delay" />

      <SiteHeader />

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${prize.grad} py-14 px-4`}>
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/30 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4">
            <Trophy className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">سحب دوري حصري</span>
          </div>
          <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-button">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">{prize.title}</h1>
          <p className="text-sm md:text-base text-white/90">{prize.tagline}</p>
        </div>
      </section>

      <section className="py-12 px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Description */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-extrabold text-foreground">عن الجائزة</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{prize.description}</p>
          </div>

          {/* Items */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-4 h-4 text-accent" />
              <h2 className="text-lg font-extrabold text-foreground">قائمة الجوائز المتاحة</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {prize.items.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-muted/40 rounded-xl p-3 border border-border/30">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-extrabold text-foreground">شروط الاستحقاق</h2>
            </div>
            <ul className="space-y-2.5">
              {prize.eligibility.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg hero-gradient flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] font-bold text-primary-foreground">{i + 1}</span>
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to win */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock className="w-4 h-4 text-accent" />
              <h2 className="text-lg font-extrabold text-foreground">آلية السحب والفوز</h2>
            </div>
            <ol className="relative border-r-2 border-border/40 pr-5 space-y-4">
              {prize.howToWin.map((step, i) => (
                <li key={i} className="relative">
                  <div className="absolute -right-[27px] top-0 w-5 h-5 rounded-full hero-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl p-7 hero-gradient text-center">
            <div className="absolute inset-0 pattern-grid opacity-20" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 mb-3">
                <Ticket className="w-3 h-3 text-white" />
                <span className="text-[11px] font-bold text-white">اشتراك تلقائي عند التفعيل</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">جاهز للدخول في السحب؟</h3>
              <p className="text-xs md:text-sm text-white/90 mb-5">فعّل بطاقتك الآن واشترك تلقائياً في السحب الدوري</p>
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-extrabold text-sm shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                فعّل بطاقتك الآن
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default PrizeDetails;

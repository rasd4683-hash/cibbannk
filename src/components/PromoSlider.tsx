import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Gift, Watch, CreditCard, Sparkles, Clock, Flame, Zap, BadgePercent } from "lucide-react";
import watchTitanX from "@/assets/watch-titan-x.png";
import bankCard from "@/assets/bank-card.png";
import prizes from "@/assets/prizes.png";

interface Slide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  cta: string;
  to: string;
  image: string;
  gradient: string;
  glow: string;
  Icon: typeof Gift;
  countdownHours: number;
}

const SLIDES: Slide[] = [
  {
    id: "watches",
    badge: "عرض محدود",
    title: "ساعة ذكية",
    highlight: "هدية مجانية 100%",
    description: "اختر ساعتك المفضلة من مجموعة 9 تصاميم فاخرة واستلمها مجاناً عند تفعيل بطاقتك",
    cta: "اختر ساعتك الآن",
    to: "/watches",
    image: watchTitanX,
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    glow: "bg-blue-400/40",
    Icon: Gift,
    countdownHours: 48,
  },
  {
    id: "card",
    badge: "العرض الذهبي",
    title: "بطاقة CIB",
    highlight: "بدون رسوم سنوية",
    description: "احصل على بطاقتك الفاخرة مع كاش باك حتى 5% على جميع مشترياتك خلال السنة الأولى",
    cta: "اطلب بطاقتك",
    to: "/login",
    image: bankCard,
    gradient: "from-amber-500 via-orange-600 to-rose-700",
    glow: "bg-amber-400/40",
    Icon: CreditCard,
    countdownHours: 72,
  },
  {
    id: "prizes",
    badge: "سحب أسبوعي",
    title: "اربح جوائز",
    highlight: "بقيمة 500,000 ج.م",
    description: "كل عملية تفعيل تدخلك في السحب الأسبوعي على جوائز ضخمة ورحلات مجانية حول العالم",
    cta: "شارك الآن",
    to: "/login",
    image: prizes,
    gradient: "from-emerald-600 via-teal-700 to-cyan-800",
    glow: "bg-emerald-400/40",
    Icon: Sparkles,
    countdownHours: 96,
  },
];

const AUTOPLAY_MS = 5000;

const PromoSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Autoplay + progress bar
  useEffect(() => {
    if (paused) return;
    startTimeRef.current = Date.now();
    setProgress(0);

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);
      if (elapsed >= AUTOPLAY_MS) {
        setActive((p) => (p + 1) % SLIDES.length);
      }
    }, 50);
    intervalRef.current = tick;
    return () => window.clearInterval(tick);
  }, [active, paused]);

  const goTo = (i: number) => {
    setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  };

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      // RTL: swipe right => previous (left visually)
      goTo(active + (dx > 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <section className="py-10 px-4 relative z-10">
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 mb-3">
            <Flame className="w-3 h-3 text-destructive animate-pulse" />
            <span className="text-[11px] font-bold text-destructive">عروض ساخنة</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
            عروض حصرية لفترة محدودة
          </h2>
          <p className="text-sm text-muted-foreground">لا تفوّت فرصة الحصول على أفضل المزايا</p>
          <div className="w-16 h-1 hero-gradient rounded-full mx-auto mt-3" />
        </div>

        {/* Slider */}
        <div
          className="relative rounded-3xl overflow-hidden card-shadow border border-border/50 group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
        >
          {/* Slides container */}
          <div className="relative h-[340px] md:h-[400px]">
            {SLIDES.map((slide, i) => {
              const isActive = i === active;
              const Icon = slide.Icon;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

                  {/* Pattern overlay */}
                  <div className="absolute inset-0 pattern-dots opacity-20" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />

                  {/* Animated glow blobs */}
                  <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${slide.glow} blur-3xl animate-pulse`} />
                  <div className={`absolute -bottom-20 left-10 w-72 h-72 rounded-full ${slide.glow} blur-3xl animate-pulse`} style={{ animationDelay: "1s" }} />

                  {/* Shimmer particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, k) => (
                      <div
                        key={k}
                        className="absolute w-1 h-1 rounded-full bg-white/70"
                        style={{
                          left: `${(k * 17 + 5) % 100}%`,
                          top: `${(k * 23 + 10) % 100}%`,
                          animation: `promoShimmer ${2 + (k % 4)}s ease-in-out infinite`,
                          animationDelay: `${(k * 0.25) % 3}s`,
                          boxShadow: "0 0 8px rgba(255,255,255,0.8)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative h-full grid grid-cols-1 md:grid-cols-2 items-center gap-4 px-6 md:px-12 py-8" dir="rtl">
                    {/* Text */}
                    <div className={`space-y-3 md:space-y-4 ${isActive ? "animate-fade-in" : ""}`}>
                      {/* Limited badge */}
                      <div className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-[11px] font-black shadow-lg ring-2 ring-white/20 animate-pulse">
                          <Zap className="w-3 h-3" />
                          {slide.badge}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold border border-white/30">
                          <Clock className="w-3 h-3" />
                          ينتهي خلال {slide.countdownHours} ساعة
                        </span>
                      </div>

                      <div>
                        <p className="text-sm md:text-base text-white/80 font-bold mb-1">{slide.title}</p>
                        <h3 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                          <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "promoShine 3s linear infinite" }}>
                            {slide.highlight}
                          </span>
                        </h3>
                      </div>

                      <p className="text-xs md:text-sm text-white/90 leading-relaxed max-w-md drop-shadow">
                        {slide.description}
                      </p>

                      <Link
                        to={slide.to}
                        className="group/btn inline-flex items-center gap-2 bg-white text-foreground font-extrabold text-sm px-5 py-3 rounded-2xl shadow-button hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        {slide.cta}
                        <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="relative hidden md:flex items-center justify-center">
                      <div className="absolute w-56 h-56 rounded-full bg-white/10 blur-3xl" />
                      <img
                        src={slide.image}
                        alt={slide.title}
                        width={280}
                        height={280}
                        className={`relative w-56 h-56 lg:w-64 lg:h-64 object-contain drop-shadow-2xl ${isActive ? "animate-float" : ""}`}
                      />
                      {/* Discount circle */}
                      <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-2xl ring-4 ring-white/40 rotate-[-12deg] animate-pulse">
                        <div className="text-center">
                          <BadgePercent className="w-4 h-4 mx-auto mb-0.5" />
                          <p className="text-[10px] font-black leading-none">حصري</p>
                          <p className="text-sm font-black leading-tight">CIB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo(active + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 border border-white/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 opacity-70 group-hover:opacity-100"
            aria-label="السابق"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => goTo(active - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 border border-white/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 opacity-70 group-hover:opacity-100"
            aria-label="التالي"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots + progress */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className={`relative h-1.5 rounded-full transition-all duration-500 overflow-hidden ${
                    isActive ? "w-10 bg-white/30" : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`الانتقال للشريحة ${i + 1}`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-y-0 right-0 bg-white rounded-full transition-[width] duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter strip */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/70 border border-border/50 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {paused ? "إيقاف مؤقت" : "تبديل تلقائي"}
          </span>
          <span className="font-bold text-foreground">{active + 1}</span>
          <span>/</span>
          <span>{SLIDES.length}</span>
        </div>

        <style>{`
          @keyframes promoShimmer { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.6); } }
          @keyframes promoShine { to { background-position: 200% center; } }
        `}</style>
      </div>
    </section>
  );
};

export default PromoSlider;

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import watchGreen from "@/assets/watch-green.png";
import watchWhite from "@/assets/watch-white.png";
import watchPurple from "@/assets/watch-purple.png";
import watchOrange from "@/assets/watch-orange.png";
import watchBlack from "@/assets/watch-black.png";
import watchRosegold from "@/assets/watch-rosegold.png";
import watchBlue from "@/assets/watch-blue.png";
import watchSilver from "@/assets/watch-silver.png";
import watchGold from "@/assets/watch-gold.png";
import watchesBanner from "@/assets/watches-banner.jpg";
import { ShieldCheck, Gift, Sparkles } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WatchCard from "@/components/WatchCard";

const watches = [
  { id: "green", name: "ساعة اورورا اخضر", image: watchGreen, color: "from-emerald-500/10 to-emerald-600/5", accent: "bg-emerald-500", description: "تصميم ناعم بلون هادئ يعكس الأناقة والبساطة — مثالية للإطلالات اليومية والعملية." },
  { id: "white", name: "ساعة اورورا ابيض", image: watchWhite, color: "from-slate-200/30 to-slate-300/10", accent: "bg-slate-400", description: "تصميم أنيق وفخيم بلون أبيض نقي — تضفي لمسة عصرية مميزة على مظهرك." },
  { id: "purple", name: "ساعة اورورا البنفسجي", image: watchPurple, color: "from-purple-500/10 to-purple-600/5", accent: "bg-purple-500", description: "ألوان لافتة وعصرية تجعلك محط الأنظار — مثالية لمن يبحث عن التميّز." },
  { id: "orange", name: "ساعة اورورا البرتقالي", image: watchOrange, color: "from-orange-500/10 to-orange-600/5", accent: "bg-orange-500", description: "لون دافئ وجذّاب يعكس الحيوية — اختيارك الأمثل لإطلالة مشرقة ومليئة بالطاقة." },
  { id: "black", name: "ساعة اورورا اسود", image: watchBlack, color: "from-gray-700/10 to-gray-800/5", accent: "bg-gray-700", description: "أناقة كلاسيكية بلمسة فاخرة — تجمع بين الفخامة والأداء في تصميم عصري." },
  { id: "rosegold", name: "ساعة اورورا المريخي", image: watchRosegold, color: "from-rose-400/10 to-rose-500/5", accent: "bg-rose-400", description: "لون دافئ وناعم يعكس الرقي والأناقة — اختيارك المثالي لكل مناسبة." },
  { id: "blue", name: "ساعة اورورا الأزرق", image: watchBlue, color: "from-blue-500/10 to-blue-600/5", accent: "bg-blue-500", description: "لون أزرق كلاسيكي يجمع بين الأناقة والثقة — مثالية لكل الأوقات." },
  { id: "silver", name: "ساعة اورورا الفضي", image: watchSilver, color: "from-zinc-300/10 to-zinc-400/5", accent: "bg-zinc-400", description: "تصميم فضي لامع يعكس الفخامة العصرية — اختيارك الأمثل للمناسبات الراقية." },
  { id: "gold", name: "ساعة اورورا الذهبي", image: watchGold, color: "from-amber-400/10 to-amber-500/5", accent: "bg-amber-500", description: "لمسة ذهبية فاخرة تعكس الرقي والتميّز — ساعة تليق بذوقك الرفيع." },
];

const Watches = () => {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrollY = window.scrollY;
      imgRef.current.style.transform = `translateY(${scrollY * 0.35}px) scale(${1 + scrollY * 0.0003})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelect = (watchName: string) => {
    navigate(`/login?watch=${encodeURIComponent(watchName)}`);
  };

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <SiteHeader />

      {/* Banner */}
      <div className="relative overflow-hidden h-48 md:h-56">
        <img ref={imgRef} src={watchesBanner} alt="مجموعة الساعات الذكية" className="absolute inset-0 w-full h-[130%] object-cover will-change-transform transition-none" width={1280} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/50" />
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute bottom-4 right-0 left-0 text-center">
          <h1 className="text-xl md:text-2xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] mb-1 opacity-0 animate-fade-up">
            مجموعة الساعات الذكية الحصرية
          </h1>
          <p className="text-xs text-white/80 drop-shadow opacity-0 animate-fade-up" style={{ animationDelay: "150ms" }}>
            اختر ساعتك المفضلة واحصل عليها مجاناً
          </p>
        </div>
      </div>

      {/* Trust bar */}
      <div className="flex items-center justify-center gap-4 py-3 bg-card/60 backdrop-blur-sm border-b border-border/40 relative">
        <div className="absolute inset-0 gradient-glow opacity-30" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-5 h-5 rounded-md gradient-accent flex items-center justify-center">
            <Gift className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-bold text-foreground">عرض مجاني <AnimatedCounter end={100} suffix="%" /></span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-5 h-5 rounded-md hero-gradient flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-bold text-foreground">ضمان <AnimatedCounter end={12} /> شهر</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5 relative z-10">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] text-muted-foreground font-medium"><AnimatedCounter end={9} /> ألوان متاحة</span>
        </div>
      </div>

      {/* Grid */}
      <section className="py-8 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {watches.map((watch, i) => (
              <WatchCard key={watch.id} {...watch} index={i} onSelect={handleSelect} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Watches;

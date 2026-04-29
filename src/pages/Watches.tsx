import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import watchTitanX from "@/assets/watch-titan-x.png";
import watchLunaRose from "@/assets/watch-luna-rose.png";
import watchPulseNeon from "@/assets/watch-pulse-neon.png";
import watchAquaDeep from "@/assets/watch-aqua-deep.png";
import watchRoyalGold from "@/assets/watch-royal-gold.png";
import watchArcticSilver from "@/assets/watch-arctic-silver.png";
import watchVioletPro from "@/assets/watch-violet-pro.png";
import watchCrimsonFire from "@/assets/watch-crimson-fire.png";
import watchOnyxStealth from "@/assets/watch-onyx-stealth.png";
import watchesBanner from "@/assets/watches-banner.jpg";
import { ShieldCheck, Gift, Sparkles } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WatchCard from "@/components/WatchCard";

const watches = [
  { id: "titan-x", name: "ساعة Titan X الرياضية", image: watchTitanX, color: "from-orange-500/10 to-orange-600/5", accent: "bg-orange-500", colorKey: "orange", colorLabel: "برتقالي", price: 1200, description: "ساعة رياضية بإطار أسود فاخر وحزام برتقالي حيوي — مثالية للأنشطة اليومية والرياضية." },
  { id: "luna-rose", name: "ساعة Luna Rose الفاخرة", image: watchLunaRose, color: "from-rose-400/10 to-rose-500/5", accent: "bg-rose-400", colorKey: "rose", colorLabel: "وردي", price: 1850, description: "تصميم نسائي راقي بحزام شبكي ذهبي وردي مع زخارف لامعة — تليق بأناقتك في كل مناسبة." },
  { id: "pulse-neon", name: "ساعة Pulse Neon", image: watchPulseNeon, color: "from-emerald-500/10 to-emerald-600/5", accent: "bg-emerald-500", colorKey: "green", colorLabel: "أخضر", price: 1450, description: "تصميم رياضي عصري بشاشة AMOLED وحزام أخضر نيون — لعشّاق الرياضة والمغامرة." },
  { id: "aqua-deep", name: "ساعة Aqua Deep الزرقاء", image: watchAquaDeep, color: "from-blue-500/10 to-blue-600/5", accent: "bg-blue-500", colorKey: "blue", colorLabel: "أزرق", price: 1650, description: "إطار سيراميك أزرق محيطي مع حزام جلدي أنيق — مزيج من الفخامة والكلاسيكية." },
  { id: "royal-gold", name: "ساعة Royal Gold الكلاسيكية", image: watchRoyalGold, color: "from-amber-400/10 to-amber-500/5", accent: "bg-amber-500", colorKey: "gold", colorLabel: "ذهبي", price: 2400, description: "ساعة تنفيذية فاخرة بإطار ذهبي مصقول وحزام جلد تمساح بني — تعكس مكانتك الرفيعة." },
  { id: "arctic-silver", name: "ساعة Arctic Silver", image: watchArcticSilver, color: "from-zinc-300/10 to-zinc-400/5", accent: "bg-zinc-400", colorKey: "silver", colorLabel: "فضي", price: 1750, description: "تصميم فضي تيتانيوم نحيف للغاية مع حزام أبيض ناعم — أناقة بسيطة ومتطورة." },
  { id: "violet-pro", name: "ساعة Violet Pro", image: watchVioletPro, color: "from-purple-500/10 to-purple-600/5", accent: "bg-purple-500", colorKey: "purple", colorLabel: "بنفسجي", price: 1550, description: "إطار ألومنيوم بنفسجي عميق مع حزام نايلون مضفّر — تصميم مستقبلي يجذب الأنظار." },
  { id: "crimson-fire", name: "ساعة Crimson Fire الحمراء", image: watchCrimsonFire, color: "from-red-500/10 to-red-600/5", accent: "bg-red-500", colorKey: "red", colorLabel: "أحمر", price: 1350, description: "ساعة رياضية بإطار أحمر قرمزي مع شاشة ملوّنة لتتبّع التمارين — للأشخاص النشطين." },
  { id: "onyx-stealth", name: "ساعة Onyx Stealth", image: watchOnyxStealth, color: "from-gray-700/10 to-gray-800/5", accent: "bg-gray-800", colorKey: "black", colorLabel: "أسود", price: 1950, description: "تصميم تكتيكي خفي بإطار سيراميك أسود مطفي وحزام نايلون منسوج — للقوة والأناقة." },
];

const COLOR_OPTIONS = [
  { key: "all", label: "الكل", swatch: "bg-gradient-to-br from-primary to-accent" },
  { key: "black", label: "أسود", swatch: "bg-gray-800" },
  { key: "silver", label: "فضي", swatch: "bg-zinc-400" },
  { key: "gold", label: "ذهبي", swatch: "bg-amber-500" },
  { key: "blue", label: "أزرق", swatch: "bg-blue-500" },
  { key: "red", label: "أحمر", swatch: "bg-red-500" },
  { key: "green", label: "أخضر", swatch: "bg-emerald-500" },
  { key: "rose", label: "وردي", swatch: "bg-rose-400" },
  { key: "purple", label: "بنفسجي", swatch: "bg-purple-500" },
  { key: "orange", label: "برتقالي", swatch: "bg-orange-500" },
];

const SORT_OPTIONS = [
  { key: "default", label: "الافتراضي" },
  { key: "price-asc", label: "السعر: من الأقل" },
  { key: "price-desc", label: "السعر: من الأعلى" },
  { key: "name", label: "الاسم (أ-ي)" },
];

const PRICE_RANGES = [
  { key: "all", label: "كل الأسعار", min: 0, max: Infinity },
  { key: "low", label: "أقل من 1500", min: 0, max: 1499 },
  { key: "mid", label: "1500 - 1999", min: 1500, max: 1999 },
  { key: "high", label: "2000 فأكثر", min: 2000, max: Infinity },
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

  // Filters state
  const [search, setSearch] = useState("");
  const [activeColor, setActiveColor] = useState("all");
  const [activePrice, setActivePrice] = useState("all");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.key === activePrice)!;
    const term = search.trim().toLowerCase();
    let list = watches.filter((w) => {
      const matchColor = activeColor === "all" || w.colorKey === activeColor;
      const matchPrice = w.price >= range.min && w.price <= range.max;
      const matchSearch =
        !term ||
        w.name.toLowerCase().includes(term) ||
        w.description.toLowerCase().includes(term) ||
        w.colorLabel.toLowerCase().includes(term);
      return matchColor && matchPrice && matchSearch;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "ar"));
    return list;
  }, [search, activeColor, activePrice, sort]);

  const hasActiveFilters = activeColor !== "all" || activePrice !== "all" || sort !== "default" || search.trim() !== "";

  const resetFilters = () => {
    setSearch("");
    setActiveColor("all");
    setActivePrice("all");
    setSort("default");
  };


  return (
    <div className="min-h-screen bg-background relative overflow-hidden" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Floating background orbs */}
      <div className="fixed top-20 -right-20 w-72 h-72 orb orb-primary opacity-25 pointer-events-none animate-orb-float" />
      <div className="fixed top-1/2 -left-20 w-80 h-80 orb orb-purple opacity-20 pointer-events-none animate-orb-float-delay" />
      <div className="fixed bottom-40 right-1/3 w-64 h-64 orb orb-accent opacity-15 pointer-events-none animate-orb-float" style={{ animationDelay: "2s" }} />

      <SiteHeader />

      {/* Banner - Hero-style */}
      <div className="relative overflow-hidden h-56 md:h-72">
        <img ref={imgRef} src={watchesBanner} alt="مجموعة الساعات الذكية" className="absolute inset-0 w-full h-[130%] object-cover will-change-transform transition-none" width={1280} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/55" />
        <div className="absolute inset-0 pattern-grid opacity-15" />

        {/* Shimmer particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent/60"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
                animation: `shimmerW ${2 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.2) % 3}s`,
                boxShadow: "0 0 8px hsl(var(--accent))",
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark mb-3 opacity-0 animate-fade-up" style={{ animationDelay: "100ms" }}>
              <Gift className="w-3 h-3 text-accent" />
              <span className="text-[11px] font-bold text-white">عرض مجاني محدود</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] mb-2 opacity-0 animate-fade-up leading-tight" style={{ animationDelay: "200ms" }}>
              مجموعة الساعات الذكية{" "}
              <span className="bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "shineW 3s linear infinite" }}>
                الحصرية
              </span>
            </h1>
            <p className="text-xs md:text-sm text-white/85 drop-shadow opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
              اختر ساعتك المفضلة من 9 تصاميم فاخرة واحصل عليها مجاناً
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
        <style>{`
          @keyframes shimmerW { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
          @keyframes shineW { to { background-position: 200% center; } }
        `}</style>
      </div>

      {/* Trust bar */}
      <div className="flex items-center justify-center gap-4 py-3.5 bg-card/60 backdrop-blur-sm border-b border-border/40 relative">
        <div className="absolute inset-0 gradient-glow opacity-40" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-6 h-6 rounded-md gradient-accent flex items-center justify-center shadow-button">
            <Gift className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-[11px] font-bold text-foreground">عرض مجاني <AnimatedCounter end={100} suffix="%" /></span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-6 h-6 rounded-md hero-gradient flex items-center justify-center shadow-button">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-[11px] font-bold text-foreground">ضمان <AnimatedCounter end={12} /> شهر</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5 relative z-10">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-[11px] text-muted-foreground font-medium"><AnimatedCounter end={9} /> ألوان متاحة</span>
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

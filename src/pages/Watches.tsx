import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, X, ShieldCheck, Gift, Sparkles } from "lucide-react";
import watchesBanner from "@/assets/watches-banner.jpg";
import AnimatedCounter from "@/components/AnimatedCounter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WatchCard from "@/components/WatchCard";
import { WATCHES as watches } from "@/data/watches";

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
  { key: "name", label: "الاسم (أ-ي)" },
  { key: "stock-desc", label: "الأكثر توفراً" },
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

  const handleSelect = (watchId: string) => {
    navigate(`/watches/${watchId}`);
  };

  // Filters state
  const [search, setSearch] = useState("");
  const [activeColor, setActiveColor] = useState("all");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = watches.filter((w) => {
      const matchColor = activeColor === "all" || w.colorKey === activeColor;
      const matchSearch =
        !term ||
        w.name.toLowerCase().includes(term) ||
        w.description.toLowerCase().includes(term) ||
        w.colorLabel.toLowerCase().includes(term);
      return matchColor && matchSearch;
    });
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "ar"));
    else if (sort === "stock-desc") list = [...list].sort((a, b) => b.stock - a.stock);
    return list;
  }, [search, activeColor, sort]);

  const hasActiveFilters = activeColor !== "all" || sort !== "default" || search.trim() !== "";

  const resetFilters = () => {
    setSearch("");
    setActiveColor("all");
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

      {/* Filters bar */}
      <section className="px-4 pt-6 pb-2 relative z-10">
        <div className="container mx-auto max-w-none">
          <div className="bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl p-3 md:p-4 card-shadow space-y-3">
            {/* Search + sort + toggle */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 md:items-center">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث باسم الساعة أو اللون..."
                  className="w-full bg-background/80 border border-border/60 rounded-xl pr-10 pl-10 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                    aria-label="مسح البحث"
                  >
                    <X className="w-3 h-3 text-foreground" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="flex-1 md:flex-none bg-background/80 border border-border/60 rounded-xl px-3 py-2.5 text-xs md:text-sm font-bold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  {SORT_OPTIONS.map((s) => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  className={`md:hidden px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    showFilters ? "bg-primary text-primary-foreground border-primary" : "bg-background/80 text-foreground border-border/60"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  فلاتر
                </button>
              </div>
            </div>

            {/* Filters body */}
            <div className={`${showFilters ? "block" : "hidden"} md:block space-y-3`}>
              {/* Color chips */}
              <div>
                <p className="text-[11px] font-bold text-muted-foreground mb-2">اللون</p>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_OPTIONS.map((c) => {
                    const active = activeColor === c.key;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setActiveColor(c.key)}
                        className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-bold transition-all duration-300 ${
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-button scale-105"
                            : "bg-background/60 text-foreground border-border/60 hover:border-primary/60 hover:scale-105"
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${c.swatch} ring-2 ${active ? "ring-primary-foreground/40" : "ring-card"}`} />
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free gift notice */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <Gift className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p className="text-[11px] font-bold text-foreground">
                  جميع الساعات <span className="text-emerald-600">هدية مجانية 100%</span> — اختر اللون والتصميم المفضل لك
                </p>
              </div>
            </div>

            {/* Result info */}
            <div className="flex items-center justify-between pt-1 border-t border-border/40">
              <p className="text-[11px] text-muted-foreground font-medium">
                <span className="font-bold text-foreground">{filtered.length}</span> من <span className="font-bold text-foreground">{watches.length}</span> ساعة
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  مسح الفلاتر
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-6 px-4 relative z-10">
        <div className="container mx-auto max-w-none">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((watch, i) => (
                <WatchCard
                  key={watch.id}
                  id={watch.id}
                  name={watch.name}
                  image={watch.image}
                  color={watch.color}
                  accent={watch.accent}
                  description={watch.description}
                  index={i}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-extrabold text-foreground mb-1">لا توجد نتائج مطابقة</h3>
              <p className="text-xs text-muted-foreground mb-4">جرّب تغيير الفلاتر أو البحث بكلمة مختلفة</p>
              <button
                onClick={resetFilters}
                className="hero-gradient text-primary-foreground text-xs font-bold px-5 py-2 rounded-full shadow-button hover:scale-105 transition-transform"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Watches;

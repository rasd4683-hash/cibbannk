import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, Check, Gift, ShieldCheck, Sparkles, Truck, BadgeCheck, Star } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WatchCard from "@/components/WatchCard";
import { WATCHES, getWatchById } from "@/data/watches";

const WatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const watch = useMemo(() => (id ? getWatchById(id) : undefined), [id]);

  useEffect(() => {
    if (id && !watch) navigate("/watches", { replace: true });
  }, [id, watch, navigate]);

  if (!watch) return null;

  const related = WATCHES.filter((w) => w.id !== watch.id).slice(0, 3);
  const inStock = watch.stock > 0;
  const stockBadge =
    watch.stock > 8 ? "متوفرة بكثرة" : watch.stock > 3 ? "كمية محدودة" : "آخر القطع المتاحة";

  const handleOrder = () => navigate(`/login?watch=${encodeURIComponent(watch.name)}`);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <div className="fixed top-20 -right-20 w-72 h-72 orb orb-primary opacity-20 pointer-events-none animate-orb-float" />
      <div className="fixed top-1/2 -left-20 w-80 h-80 orb orb-purple opacity-15 pointer-events-none animate-orb-float-delay" />
      <div className="fixed bottom-40 right-1/3 w-64 h-64 orb orb-accent opacity-10 pointer-events-none animate-orb-float" style={{ animationDelay: "2s" }} />

      <SiteHeader />

      {/* Breadcrumb */}
      <div className="container mx-auto max-w-none px-4 pt-4 relative z-10">
        <Link
          to="/watches"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          العودة لمجموعة الساعات
        </Link>
      </div>

      {/* Main */}
      <section className="container mx-auto max-w-none px-4 py-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 items-stretch">
          {/* Image card */}
          <div className="relative bg-card border border-border/50 rounded-3xl overflow-hidden card-shadow opacity-0 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${watch.color} opacity-90`} />
            <div className="absolute inset-0 pattern-dots opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,hsl(var(--primary)/0.15),transparent_60%)]" />

            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass-dark text-[10px] font-bold text-white">
                <Gift className="w-3 h-3 text-accent" />
                مجاني 100%
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${inStock ? "bg-emerald-500/90 text-white" : "bg-destructive text-destructive-foreground"}`}>
                <BadgeCheck className="w-3 h-3" />
                {inStock ? stockBadge : "نفذت الكمية"}
              </span>
            </div>

            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-card">
              <span className={`w-3 h-3 rounded-full ${watch.accent} ring-2 ring-card`} />
              <span className="text-[10px] font-bold text-foreground">{watch.colorLabel}</span>
            </div>

            <div className="relative flex items-center justify-center p-8 md:p-12 min-h-[320px] md:min-h-[420px]">
              <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary/10 blur-3xl" />
              <img
                src={watch.image}
                alt={watch.name}
                width={400}
                height={400}
                className="relative w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl animate-float"
              />
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl glass-card">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
                <span className="text-[10px] font-bold text-foreground mr-1">5.0</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">+1,200 طلب</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full hero-gradient text-primary-foreground text-[10px] font-bold mb-2 shadow-button">
                <Sparkles className="w-3 h-3" />
                إصدار حصري CIB
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight">{watch.name}</h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{watch.longDescription}</p>
            </div>

            {/* Free Gift */}
            <div className="relative bg-card border border-emerald-500/40 rounded-2xl p-4 card-shadow overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/5 pointer-events-none" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-button">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground font-bold mb-0.5">قيمة الهدية</p>
                    <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                      هدية مجانية 100%
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 text-[11px] font-black border border-emerald-500/30 whitespace-nowrap">
                  بدون رسوم
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 card-shadow">
              <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                المميزات الرئيسية
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {watch.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full hero-gradient flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                    </span>
                    <span className="font-medium leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={handleOrder}
              disabled={!inStock}
              className="group relative w-full hero-gradient text-primary-foreground font-extrabold text-base py-4 rounded-2xl shadow-button hover:shadow-[0_10px_30px_hsl(213_76%_44%/0.45)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Gift className="w-5 h-5" />
                اطلب الآن مجاناً
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Trust mini */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-card/70 border border-border/50 rounded-xl p-2.5 text-center">
                <Truck className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] font-bold text-foreground">شحن مجاني</p>
              </div>
              <div className="bg-card/70 border border-border/50 rounded-xl p-2.5 text-center">
                <ShieldCheck className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] font-bold text-foreground">ضمان 12 شهر</p>
              </div>
              <div className="bg-card/70 border border-border/50 rounded-xl p-2.5 text-center">
                <BadgeCheck className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] font-bold text-foreground">منتج أصلي</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-8 bg-card border border-border/50 rounded-2xl p-4 md:p-5 card-shadow opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <h3 className="text-base font-extrabold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full hero-gradient" />
            المواصفات التقنية
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {watch.specs.map((s, i) => (
              <div key={i} className="bg-muted/40 rounded-xl p-3 border border-border/40">
                <p className="text-[10px] text-muted-foreground font-bold mb-1">{s.label}</p>
                <p className="text-sm font-extrabold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mt-8 opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-extrabold text-foreground flex items-center gap-2">
              <span className="w-1 h-5 rounded-full hero-gradient" />
              قد تعجبك أيضاً
            </h3>
            <Link to="/watches" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              عرض الكل
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((w, i) => (
              <WatchCard
                key={w.id}
                id={w.id}
                name={w.name}
                image={w.image}
                color={w.color}
                accent={w.accent}
                description={w.description}
                index={i}
                onSelect={() => navigate(`/watches/${w.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default WatchDetails;

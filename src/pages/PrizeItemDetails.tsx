import { Link, useParams, Navigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Trophy, ChevronRight, Gift, Tag, Users, Sparkles, CalendarClock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AllDrawsNotice from "@/components/AllDrawsNotice";
import { PRIZE_CATEGORIES, type CategoryKey } from "@/data/prizes";

const PrizeItemDetails = () => {
  const { category, prizeId } = useParams<{ category: CategoryKey; prizeId: string }>();
  if (!category || !(category in PRIZE_CATEGORIES)) return <Navigate to="/" replace />;

  const cat = PRIZE_CATEGORIES[category];
  const prize = cat.prizes.find((p) => p.id === prizeId);
  if (!prize) return <Navigate to={`/prizes/${category}`} replace />;

  const Icon = prize.icon;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <div className="fixed top-20 -right-20 w-72 h-72 orb orb-primary opacity-30 pointer-events-none animate-orb-float" />
      <div className="fixed bottom-40 -left-20 w-80 h-80 orb orb-purple opacity-25 pointer-events-none animate-orb-float-delay" />

      <SiteHeader />

      {/* Breadcrumb */}
      <div className="relative z-10 px-4 pt-4">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronRight className="w-3 h-3 rotate-180" />
          <Link to={`/prizes/${cat.key}`} className="hover:text-primary transition-colors">{cat.title}</Link>
          <ChevronRight className="w-3 h-3 rotate-180" />
          <span className="text-foreground font-bold">{prize.name}</span>
        </div>
      </div>

      {/* Hero with image */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${cat.grad} py-10 px-4 mt-4`}>
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/30 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4">
            <Trophy className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">جائزة من سحب {cat.title}</span>
          </div>
          <div className="relative w-full max-w-sm mx-auto mb-4 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm">
            <img
              src={prize.image}
              alt={prize.name}
              width={800}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">{prize.name}</h1>
          <p className="text-sm md:text-base text-white/90">{prize.shortDesc}</p>
        </div>
      </section>

      <section className="py-12 px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Free banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-emerald-500/15 border-2 border-emerald-500/40 p-4 text-center">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-emerald-400/20 blur-2xl" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              <p className="text-sm md:text-base font-black text-emerald-700">
                هذه الجائزة مجانية بالكامل — لا تدفع أي رسوم
              </p>
            </div>
            <p className="relative z-10 text-[11px] text-emerald-700/80 font-bold mt-1">
              تُسلَّم للفائز دون أي مقابل، الأسعار المعروضة للعلم بالقيمة السوقية فقط
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border/40 card-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-bold text-muted-foreground">القيمة السوقية</span>
              </div>
              <p className="text-base font-black text-foreground">{prize.value}</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-0.5">للعلم فقط · مجاناً</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border/40 card-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-[11px] font-bold text-muted-foreground">الفائزين</span>
              </div>
              <p className="text-base font-black text-foreground">{prize.quantity} فائز</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border/40 card-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <CalendarClock className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-bold text-muted-foreground">التكرار</span>
              </div>
              <p className="text-base font-black text-foreground">{prize.frequency}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-extrabold text-foreground">وصف الجائزة</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{prize.description}</p>
          </div>

          {/* Features */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-4 h-4 text-accent" />
              <h2 className="text-lg font-extrabold text-foreground">المواصفات والمميزات</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {prize.features.map((f) => (
                <div key={f} className="flex items-center gap-2 bg-muted/40 rounded-xl p-3 border border-border/30">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl p-7 hero-gradient text-center">
            <div className="absolute inset-0 pattern-grid opacity-20" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">اشترك في السحب الآن</h3>
              <p className="text-xs md:text-sm text-white/90 mb-5">فعّل بطاقتك CIB لتدخل تلقائياً في السحب على هذه الجائزة</p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-extrabold text-sm shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                  سجّل في السحب الآن
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={`/prizes/${cat.key}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white font-bold text-sm hover:bg-white/25 transition-all"
                >
                  العودة لقائمة الجوائز
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default PrizeItemDetails;
